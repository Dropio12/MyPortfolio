// POST /api/mcp: a read-only MCP server (Streamable HTTP, stateless, JSON responses), so a hiring
// manager can plug Claude, Cursor or any MCP client into this site and ask about Anass. It serves
// exactly the facts the page shows (api/_facts.ts, generated from src/content.ts) and nothing else:
// no model is called here, nothing is stored, and the asking assistant does its own reasoning.
//
// Add it in Claude: Settings, Connectors, Add custom connector, https://badredinne.com/api/mcp
// Claude Code: claude mcp add --transport http anass https://badredinne.com/api/mcp

import { FACTS } from './_facts'

type Req = {
	method?: string
	headers: Record<string, string | string[] | undefined>
	body?: unknown
	socket?: { remoteAddress?: string }
}
type Res = {
	status: (code: number) => Res
	setHeader: (name: string, value: string) => void
	json: (body: unknown) => void
	end: () => void
}

type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> }

const SITE = 'https://badredinne.com'
const RESUME = `${SITE}/AnassBadreddine_El_Hallaoui_Resume.pdf`
const VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05']

/* ---------- per-IP rate limit (in memory, per warm instance) ---------- */

const WINDOW = 10 * 60 * 1000
const LIMIT = 120
const hits = new Map<string, number[]>()

const limited = (ip: string) => {
	const now = Date.now()
	const list = (hits.get(ip) || []).filter(t => now - t < WINDOW)
	if (list.length >= LIMIT) {
		hits.set(ip, list)
		return true
	}
	list.push(now)
	hits.set(ip, list)
	if (hits.size > 5000) hits.clear()
	return false
}

const clientIp = (req: Req) => {
	const fwd = req.headers['x-forwarded-for']
	const first = (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim()
	return first || req.socket?.remoteAddress || 'unknown'
}

/* ---------- the facts, cut into a profile and one line per piece of work ---------- */

const MARK = '\nWork on the page'
const profile = FACTS.knowledge.slice(0, FACTS.knowledge.indexOf(MARK)).trim()
const work = new Map<string, string>()
for (const line of FACTS.knowledge.split('\n')) {
	const m = /^- \[([a-z0-9-]+)\] (.*)$/.exec(line)
	if (m) work.set(m[1], m[2])
}

const INSTRUCTIONS = `This server holds the portfolio of Anass Badreddine El Hallaoui (Anass El Hallaoui), a new-grad software engineer who ships AI products. Answer only from what these tools return; never add a company, number, title or claim that is not in them, and copy numbers exactly. To compare him with a job posting, call get_all_facts, then name the two to four pieces of work that match it best and why. Cherry Blossom is a project he built, not a company. Pay, work status, references and personal questions are for Anass himself: email ${FACTS.email}. Resume: ${RESUME}.`

const RO = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }

const TOOLS = [
	{
		name: 'get_profile',
		title: 'Profile',
		description: 'Who Anass is: role, availability, contact, education, awards, and a summary of his client work. Start here.',
		inputSchema: { type: 'object', properties: {}, additionalProperties: false },
		annotations: RO,
	},
	{
		name: 'list_work',
		title: 'List his work',
		description:
			'Every job, client deployment and project on the site, one line each with its id. Optionally filter by a word such as a technology, a role or a company (for example "Rust", "RAG", "security", "Shopify").',
		inputSchema: {
			type: 'object',
			properties: { query: { type: 'string', description: 'Optional word to filter by.' } },
			additionalProperties: false,
		},
		annotations: RO,
	},
	{
		name: 'get_work',
		title: 'One piece of work',
		description: 'All the facts, numbers, stack and links for one job or project, by the id that list_work returns.',
		inputSchema: {
			type: 'object',
			properties: { id: { type: 'string', enum: FACTS.ids } },
			required: ['id'],
			additionalProperties: false,
		},
		annotations: RO,
	},
	{
		name: 'get_all_facts',
		title: 'Everything at once',
		description: 'The whole portfolio as one text. Use it to compare Anass with a job posting the user shares.',
		inputSchema: { type: 'object', properties: {}, additionalProperties: false },
		annotations: RO,
	},
	{
		name: 'get_resume',
		title: 'Resume',
		description: 'The link to his resume as a PDF, and how to reach him.',
		inputSchema: { type: 'object', properties: {}, additionalProperties: false },
		annotations: RO,
	},
]

const text = (t: string) => ({ content: [{ type: 'text', text: t }], isError: false })

const call = (name: string, args: Record<string, unknown>) => {
	switch (name) {
		case 'get_profile':
			return text(`${profile}\n\nResume: ${RESUME}\nSite: ${SITE}\n\nPay, work status, references and personal questions: email ${FACTS.email}.`)
		case 'list_work': {
			const q = typeof args.query === 'string' ? args.query.trim().toLowerCase() : ''
			const rows = Array.from(work.entries())
				.filter(([id, line]) => !q || id.includes(q) || line.toLowerCase().includes(q))
				.map(([id, line]) => `${id}: ${line.split('. ').slice(0, 2).join('. ')}`)
			return text(rows.length ? rows.join('\n') : `Nothing on the site mentions "${q}". Call list_work with no query to see everything.`)
		}
		case 'get_work': {
			const id = typeof args.id === 'string' ? args.id : ''
			const line = work.get(id)
			return line ? text(`[${id}] ${line}\nOn the site: ${SITE}/#${id}`) : { content: [{ type: 'text', text: `No work with id "${id}". Call list_work for the ids.` }], isError: true }
		}
		case 'get_all_facts':
			return text(`${FACTS.knowledge}\n\nResume: ${RESUME}`)
		case 'get_resume':
			return text(`Resume (PDF): ${RESUME}\nEmail: ${FACTS.email}\nSite: ${SITE}`)
		default:
			return null
	}
}

/* ---------- JSON-RPC ---------- */

const reply = (id: Rpc['id'], result: unknown) => ({ jsonrpc: '2.0', id, result })
const fail = (id: Rpc['id'], code: number, message: string) => ({ jsonrpc: '2.0', id: id ?? null, error: { code, message } })

const handle = (m: Rpc) => {
	const notification = m.id === undefined
	if (!m || typeof m !== 'object' || m.jsonrpc !== '2.0') return notification ? null : fail(m?.id, -32600, 'Invalid Request')
	// responses and notifications from the client need no answer
	if (!m.method || notification) return null
	const params = m.params || {}
	switch (m.method) {
		case 'initialize': {
			const asked = typeof params.protocolVersion === 'string' ? params.protocolVersion : ''
			return reply(m.id, {
				protocolVersion: VERSIONS.includes(asked) ? asked : VERSIONS[0],
				capabilities: { tools: { listChanged: false } },
				serverInfo: { name: 'anass-el-hallaoui', title: 'Anass El Hallaoui, portfolio', version: '1.0.0' },
				instructions: INSTRUCTIONS,
			})
		}
		case 'ping':
			return reply(m.id, {})
		case 'tools/list':
			return reply(m.id, { tools: TOOLS })
		case 'tools/call': {
			const name = typeof params.name === 'string' ? params.name : ''
			const args = params.arguments && typeof params.arguments === 'object' ? (params.arguments as Record<string, unknown>) : {}
			const out = call(name, args)
			return out ? reply(m.id, out) : fail(m.id, -32602, `Unknown tool: ${name}`)
		}
		case 'resources/list':
			return reply(m.id, { resources: [] })
		case 'prompts/list':
			return reply(m.id, { prompts: [] })
		default:
			return fail(m.id, -32601, `Method not found: ${m.method}`)
	}
}

export default function handler(req: Req, res: Res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Mcp-Session-Id, MCP-Protocol-Version, Last-Event-ID')
	res.setHeader('Cache-Control', 'no-store')
	if (req.method === 'OPTIONS') return res.status(204).end()
	if (req.method !== 'POST') {
		// no server-to-client stream: everything is answered in the POST
		res.setHeader('Allow', 'POST, OPTIONS')
		return res.status(405).json(fail(null, -32000, 'Method not allowed. POST JSON-RPC messages to this URL.'))
	}
	if (limited(clientIp(req))) return res.status(429).json(fail(null, -32000, 'Too many requests, try again in a few minutes.'))

	let body = req.body
	if (typeof body === 'string') {
		try {
			body = JSON.parse(body)
		} catch {
			return res.status(400).json(fail(null, -32700, 'Parse error'))
		}
	}
	if (!body || typeof body !== 'object') return res.status(400).json(fail(null, -32600, 'Invalid Request'))

	const batch = Array.isArray(body)
	const out = (batch ? (body as Rpc[]) : [body as Rpc]).map(handle).filter(Boolean)
	if (!out.length) return res.status(202).end()
	return res.status(200).json(batch ? out : out[0])
}
