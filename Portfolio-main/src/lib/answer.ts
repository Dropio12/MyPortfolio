import {
	Item,
	Role,
	education,
	itemById,
	items,
	person,
	recognition,
	roles as roleList,
	scripts,
	tailored,
	defaultQuestions,
} from '../content'
import { matchesAny, roleWords, rx, tagById, tags } from './vocab'

// The deterministic answerer: no network, no model. It reads a question or a pasted job posting,
// finds the roles, technologies and domains in it, ranks the work on the page, and answers with
// short sentences assembled only from content.ts. The AI path (api/ask.ts) replaces the words,
// never the evidence rows, and only when it is configured.

export type AnswerKind = 'local' | 'ai' | 'scripted' | 'tailored'

export type Evidence = { id: string; tags: string[] }

export type Answer = {
	kind: AnswerKind
	/** what the visitor asked, shortened for the echo line */
	prompt: string
	isPosting: boolean
	heading?: string
	paragraphs: string[]
	bullets?: string[]
	evidence: Evidence[]
	/** roles the catalogue should switch to when the visitor asks to see these */
	roles: Role[]
	/** vocabulary ids found in the question or posting */
	matched: string[]
	suggestions?: string[]
	/** a note under the answer, e.g. when the AI was busy */
	note?: string
}

const roleLabel = (r: Role) => roleList.find(x => x.id === r)!.noun

const joinWords = (words: string[]) =>
	words.length <= 1 ? words.join('') : `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`

const sentenceFacts = (item: Item) =>
	item.facts
		.filter(f => /\d/.test(f.figure))
		.map(f => `${f.figure} ${f.text.replace(/\.$/, '')}`)

export const looksLikePosting = (text: string) => {
	const t = text.trim()
	const lines = t.split(/\n+/).filter(Boolean).length
	return (
		t.length > 320 ||
		(lines >= 4 && t.length > 160) ||
		/(responsibilities|qualifications|requirements|about the role|what you('ll| will) do|we('re| are) looking for|you will|nice to have|must have)/i.test(
			t
		)
	)
}

export const scriptFor = (text: string) => scripts.find(s => matchesAny(text, s.patterns))

export type Extracted = { tags: string[]; roles: Role[] }

/** how strongly a text speaks about a role: distinct phrases that name it (the role's own name
 * counts double), then where it first shows up. A long posting mentions every role once. */
const roleStrength = (text: string, r: Role) => {
	let count = 0
	let first = Infinity
	roleWords[r].forEach((p, i) => {
		const m = rx(p).exec(text)
		if (!m) return
		count += i === 0 ? 2 : 1
		first = Math.min(first, m.index)
	})
	return { r, count, first }
}

/** roles strongest first, at most three: a long posting mentions everything once */
export const extract = (text: string): Extracted => ({
	tags: tags.filter(t => matchesAny(text, t.patterns)).map(t => t.id),
	roles: (Object.keys(roleWords) as Role[])
		.map(r => roleStrength(text, r))
		.filter(s => s.count > 0)
		.sort((a, b) => b.count - a.count || a.first - b.first)
		.slice(0, 3)
		.map(s => s.r),
})

export type Ranked = { item: Item; score: number; tags: string[]; roles: Role[] }

const roleWeights = [2.5, 1.5, 1]

/** rank every item against a set of tags and roles; items with no overlap are dropped */
export const rank = (found: Extracted, opts: { boost?: string[]; posting?: boolean } = {}): Ranked[] => {
	const boost = opts.boost || []
	// in a posting the domain (legal, finance, hotels) is the strongest story, so it counts more
	const tagWeight = (t: string) => (tagById[t]?.weight ?? 1) * (opts.posting && tagById[t]?.group === 'domain' ? 3.5 : 1)
	return items
		.map((item, index) => {
			const hitTags = item.tags.filter(t => found.tags.includes(t))
			const hitRoles = item.roles.filter(r => found.roles.includes(r))
			let score =
				hitTags.reduce((s, t) => s + tagWeight(t), 0) +
				hitRoles.reduce((s, r) => s + roleWeights[found.roles.indexOf(r)], 0)
			if (score > 0) score += 0.4 * (1 - index / items.length)
			if (boost.includes(item.id)) score += 3
			// most specific first: show the tags that drove the match, heaviest first
			hitTags.sort((a, b) => (tagById[b]?.weight ?? 1) - (tagById[a]?.weight ?? 1))
			return { item, score, tags: hitTags, roles: hitRoles }
		})
		.filter(r => r.score > 0.4)
		.sort((a, b) => b.score - a.score)
}

const ev = (ids: string[], found?: Extracted): Evidence[] =>
	ids
		.filter(id => itemById(id))
		.map(id => ({ id, tags: found ? itemById(id)!.tags.filter(t => found.tags.includes(t)) : [] }))

const shorten = (text: string, n = 120) => {
	const t = text.replace(/\s+/g, ' ').trim()
	return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t
}

const availability = `His resume has his graduation and start dates. He is open to relocating anywhere in Canada or the US.`

const base = (prompt: string, isPosting = false): Answer => ({
	kind: 'local',
	prompt: isPosting ? `Your job posting (${prompt.trim().length.toLocaleString('en-US')} characters)` : shorten(prompt),
	isPosting,
	paragraphs: [],
	evidence: [],
	roles: [],
	matched: [],
})

/* ---------- hand-written answers for the questions the page itself suggests ---------- */

type Intent = { test: RegExp; build: (a: Answer) => Answer }

const shopify = itemById('shopify-visual-search')!
const infra = itemById('shopify-infra-security')!

const intents: Intent[] = [
	{
		test: /\b(contact|reach (him|out)|e-?mail|phone|call him|get in touch|linkedin|github|resume|r[ée]sum[ée]|\bcv\b)/i,
		build: a => ({
			...a,
			paragraphs: [
				`Email is the best way to reach him: ${person.email}.`,
				'His resume (PDF) is the button at the top right. GitHub and LinkedIn are in the header and at the bottom of the page.',
			],
		}),
	},
	{
		test: /(start|graduat|availab|when can|full[- ]time|relocat|remote|move to|location|based|where (does|is) he|notice period)/i,
		build: a => ({
			...a,
			paragraphs: [availability, 'He is finishing an M.Sc. in Computer Science (Artificial Intelligence) at Université Laval.'],
		}),
	},
	{
		test: /(degree|\bgpa\b|school|universit|master|m\.?\s?sc|b\.?\s?sc|bachelor|stud(y|ies|ying)|education|laval|ohio|grades|dean)/i,
		build: a => ({
			...a,
			paragraphs: [
				`${education[0].degree}, ${education[0].school}: ${education[0].when}.`,
				`${education[1].degree}, ${education[1].school}, ${education[1].when}: ${education[1].detail}.`,
				`${education[2].degree} at ${education[2].school} (${education[2].when}): ${education[2].detail}.`,
			],
		}),
	},
	{
		test: /(hackathon|award|\bwon\b|\bwins?\b|putnam|scholarship|recogni|prize|hono(u)?r|wall of fame|competition)/i,
		build: a => ({
			...a,
			paragraphs: [
				`${recognition[0].figure} ${recognition[0].label}: ${recognition[0].detail}. His Shopify hackathon prototype became Shop App’s photo search.`,
				`Putnam: top 600, on Laval’s team in 2024 and 2025. $80K+ in scholarships. GitHub Community Wall of Fame 2025.`,
			],
			evidence: ev(['shopify-visual-search', 'used-car-deal-finder']),
		}),
	},
	{
		test: /shopify|shop app|photo search|visual search/i,
		build: a => ({
			...a,
			paragraphs: [
				`Two internships at Shopify in 2025.`,
				`Visual Search: he took Shop App’s photo search from his hackathon win to 20M+ users, searching 55M+ images in under 3 seconds with image embeddings, vector search and a self-hosted LLM. He co-led a 10-person team with PMs and designers.`,
				`Infrastructure Security: he cut internal request latency 10x by moving services from HTTP/1 to gRPC, fixed a firewall misconfiguration affecting 75+ Google Cloud resources, and got a security-feature PR merged into Redpanda’s open-source C++ code.`,
			],
			evidence: ev([shopify.id, infra.id]),
			roles: ['ai', 'backend'],
		}),
	},
	{
		test: /(forward[- ]deployed|\bfde\b|for clients|client work|clients?\b|customers?\b|consult)/i,
		build: a => ({
			...a,
			paragraphs: [
				'He has built AI tools end to end for 4 business clients.',
				'A document workflow used by 10+ immigration law firms, with 10,000+ documents processed and about 8 hours saved per client. A building-code agent for an architecture firm that answers in under 1 second. A front-desk voice agent for Hotel Jaro that handled 1,000+ guest calls.',
				'He has also taught 1,500+ students AI tools in hands-on workshops, and co-led a 10-person team with PMs and designers at Shopify.',
			],
			evidence: ev(['law-firm-workflow', 'architecture-rag-agent', 'hotel-jaro-voice', 'intel-ambassador']),
			roles: ['fde'],
		}),
	},
	{
		test: /(most users|biggest|largest|scale of|how many users)/i,
		build: a => ({
			...a,
			paragraphs: [
				'Shop App’s photo search, which he took from a hackathon win to 20M+ users at Shopify.',
				'Of his own projects: Used-Car Deal Finder has 2,000+ users and Cherry Blossom has 1,500+ monthly users.',
			],
			evidence: ev(['shopify-visual-search', 'used-car-deal-finder', 'cherry-blossom']),
		}),
	},
	{
		test: /(best|favou?rite|proudest|strongest|most impressive|top)\b.*\b(project|ai|work|thing|build)/i,
		build: a => ({
			...a,
			paragraphs: [
				'Two stand out. At Shopify he took Shop App’s photo search from his hackathon win to 20M+ users.',
				'On his own: AgentGym, a self-improving agent framework, reached +38% task success over the base agent, measured on 24,000 traces, with 98% lower compute cost.',
			],
			evidence: ev(['shopify-visual-search', 'agentgym', 'cherry-blossom']),
			roles: ['ai'],
		}),
	},
	{
		test: /(end to end|end-to-end|whole product|full product|shipped)/i,
		build: a => ({
			...a,
			paragraphs: [
				'Whole products, from the model to the users. Cherry Blossom: an AI agent that designs circuit boards from plain English, 1,500+ monthly users, on a TypeScript backend on Convex.',
				'AI tools built end to end for 4 business clients, including a document workflow used by 10+ immigration law firms. And Used-Car Deal Finder: 2,000+ users, rebuilt as a Go crawler and a Rust pricing engine on Cloudflare Workers.',
			],
			evidence: ev(['cherry-blossom', 'law-firm-workflow', 'used-car-deal-finder', 'hotel-jaro-voice']),
			roles: ['fullstack'],
		}),
	},
	{
		test: /(at scale|scalab|high[- ]traffic|latency|performance)/i,
		build: a => ({
			...a,
			paragraphs: [
				'Search over 55M+ images in under 3 seconds for Shop App’s photo search. Internal request latency cut 10x by moving Shopify services from HTTP/1 to gRPC.',
				'Payroll processing 87% faster for 17,000+ weekly salaries at iA Financial Group, with an automated Python/C# pipeline.',
			],
			evidence: ev(['shopify-visual-search', 'shopify-infra-security', 'ia-financial', 'used-car-deal-finder']),
			roles: ['backend'],
		}),
	},
	{
		test: /(security|secure|vulnerab|privacy|firewall|what did he fix)/i,
		build: a => ({
			...a,
			paragraphs: [
				'At Shopify, on Infrastructure Security, he fixed a firewall misconfiguration affecting 75+ Google Cloud resources and got a security-feature PR merged into Redpanda’s open-source C++ code, unblocking Shopify’s data-streaming rollout.',
				'At iA Financial Group he found a critical privacy flaw in a database review and helped fix it, protecting 10,000+ clients’ data.',
			],
			evidence: ev(['shopify-infra-security', 'ia-financial']),
			roles: ['security'],
		}),
	},
	{
		test: /(infrastructure|\binfra\b|monitoring|on-?call|observability|alert|dashboards?|devops|\bsre\b)/i,
		build: a => ({
			...a,
			paragraphs: [
				'At Shopify he turned 300+ telemetry signals into 9 Grafana dashboards and 50+ alerts, with runbooks for on-call engineers. On Infrastructure Security he moved services from HTTP/1 to gRPC (10x lower latency) and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.',
				'On his own work: a voice agent on AWS and Redis, and a Rust pricing engine on Cloudflare Workers.',
			],
			evidence: ev(['shopify-visual-search', 'shopify-infra-security', 'hotel-jaro-voice', 'used-car-deal-finder']),
			roles: ['platform'],
		}),
	},
	{
		test: /(\brag\b|retrieval|agents?\b|agentic|\bmcp\b)/i,
		build: a => ({
			...a,
			paragraphs: [
				'Yes, both, for clients and in public. A building-code agent for an architecture firm uses RAG over tens of thousands of rules and answers in under 1 second.',
				'Linea is an MCP server with GraphRAG and vector search over 500K+ building-code and permit nodes. AgentGym improves agents with Hindsight Experience Replay and DPO: +38% task success over the base agent.',
			],
			evidence: ev(['architecture-rag-agent', 'linea', 'agentgym', 'cherry-hardware-agent']),
			roles: ['ai'],
		}),
	},
	{
		test: /(who is|about him|tell me about|summary|summari[sz]e|overview|why (should|would)|strengths?|what makes him|tl;?dr)/i,
		build: a => ({
			...a,
			paragraphs: [
				`${person.role} At Shopify he took Shop App’s photo search from his hackathon win to 20M+ users.`,
				'He has built AI tools end to end for 4 business clients, including a document workflow used by 10+ immigration law firms, and he has 8 hackathon wins.',
				availability,
			],
			evidence: ev(['shopify-visual-search', 'law-firm-workflow', 'agentgym']),
		}),
	},
]

/* ---------- the answers ---------- */

const nameHit = (q: string) =>
	items.filter(i => {
		const names = [i.title, i.id.replace(/-/g, ' '), ...i.links.map(l => l.label.split('/').pop() || '')]
		if (i.id === 'ia-financial') names.push('\\bia\\b', 'industrielle')
		if (i.id === 'intel-ambassador') names.push('intel', 'ambassador', 'oneapi')
		if (i.id === 'adobe-ambassador') names.push('adobe', 'ambassador')
		if (i.id === 'laval-ta') names.push('teaching assistant', '\\bta\\b', 'probability', 'theory of computation')
		if (i.id === 'scale-ai') names.push('scale ai')
		if (i.id === 'hotel-jaro-voice') names.push('jaro', 'hotel')
		if (i.id === 'law-firm-workflow') names.push('law firm', 'lawyer', 'legal')
		if (i.id === 'architecture-rag-agent') names.push('architecture firm', 'building code')
		if (i.id === 'used-car-deal-finder') names.push('used[- ]car', 'car deal')
		return names.some(n => n && rx(n.includes('\\') ? n : n.replace(/[.*+?^${}()|[\]]/g, '\\$&')).test(q))
	})

const describeItems = (a: Answer, found: Item[]): Answer => ({
	...a,
	paragraphs: found.slice(0, 3).map(i => {
		const head = i.position ? `${i.title} (${i.position}, ${i.dates})` : i.title
		const facts = sentenceFacts(i)
		// the facts already carry the line's number; fall back to the line when there are none
		const detail = facts.length ? `${facts.join('. ')}.` : i.line
		const notes = (i.notes || []).join(' ')
		return `${head}: ${detail} ${notes}`.replace(/\s+/g, ' ').trim()
	}),
	evidence: ev(found.slice(0, 4).map(i => i.id)),
})

const fromRanking = (a: Answer, found: Extracted, ranked: Ranked[], question: string): Answer => {
	// when the question names a technology, only work that actually uses it counts as evidence
	const withTags = ranked.filter(r => r.tags.length)
	const top = (found.tags.length && withTags.length ? withTags : ranked).slice(0, 4)
	const asksYesNo = /^(has|does|did|is|can|have)\b/i.test(question.trim())
	const tagLabels = Array.from(new Set(top.flatMap(r => r.tags))).map(t => tagById[t].label)
	const roleNames = found.roles.map(roleLabel)
	const subject = tagLabels.length ? joinWords(tagLabels.slice(0, 3)) : ''
	const lead = subject
		? asksYesNo
			? `Yes. ${subject} shows up in ${joinWords(top.map(r => r.item.title))}.`
			: `${subject}: here is where it shows up, strongest first.`
		: `${roleNames.length ? joinWords(roleNames) : 'Matching'} work on this page, strongest first.`.replace(/^./, c =>
				c.toUpperCase()
		  )
	const firstFacts = top
		.slice(0, 2)
		.map(r => `${r.item.title}: ${r.item.line.replace(/\.$/, '')}.`)
		.join(' ')
	return {
		...a,
		paragraphs: [lead, firstFacts],
		evidence: top.map(r => ({ id: r.item.id, tags: r.tags })),
		roles: found.roles,
		matched: found.tags,
	}
}

const answerPosting = (a: Answer, text: string): Answer => {
	const found = extract(text)
	const ranked = rank(found, { posting: true })
	const top = ranked.slice(0, 4)
	if (!top.length)
		return {
			...a,
			paragraphs: [
				'I could not match this posting to specific work on this page. Here is his broadest evidence instead.',
				availability,
			],
			evidence: ev(['shopify-visual-search', 'law-firm-workflow', 'agentgym']),
		}
	// the roles the posting names; when it names none, the roles its best matches share
	let postingRoles = found.roles
	if (!postingRoles.length) {
		const counts = new Map<Role, number>()
		top.forEach(r => r.item.roles.forEach(x => counts.set(x, (counts.get(x) || 0) + 1)))
		postingRoles = Array.from(counts.entries())
			.filter(([, n]) => n >= 2)
			.map(([r]) => r)
	}
	const labels = Array.from(new Set(top.flatMap(r => r.tags)))
		.slice(0, 8)
		.map(t => tagById[t].label)
	const roleText = joinWords(postingRoles.slice(0, 3).map(roleLabel))
	const lead = postingRoles.length
		? `This reads like ${/^(ai|a|e|i|o|u)/i.test(roleText) ? 'an' : 'a'} ${roleText} role. Here is his closest work, strongest first.`
		: 'Here is his closest work for this posting, strongest first.'
	return {
		...a,
		heading: 'Why Anass fits this posting',
		paragraphs: [lead, labels.length ? `What matched: ${labels.join(', ')}.` : '', availability].filter(Boolean),
		evidence: top.map(r => ({ id: r.item.id, tags: r.tags })),
		// the catalogue filters on the two strongest roles; three or more shows nearly everything
		roles: postingRoles.slice(0, 2),
		matched: found.tags,
	}
}

export const fallback = (a: Answer, selected: Role[]): Answer => ({
	...a,
	paragraphs: [
		'I answer from the facts on this page: his work, projects, education and how to reach him. Try one of these, or paste a job posting.',
	],
	suggestions: questionsFor(selected),
})

export const questionsFor = (selected: Role[]) => {
	if (!selected.length) return defaultQuestions
	const qs = selected.flatMap(r => roleList.find(x => x.id === r)!.questions)
	return Array.from(new Set(qs)).slice(0, 3)
}

export const answerLocal = (question: string, selected: Role[] = []): Answer | null => {
	const q = question.trim()
	if (!q) return null
	const posting = looksLikePosting(q)
	const a = base(q, posting)
	if (posting) return answerPosting(a, q)

	const script = scriptFor(q)
	if (script) return { ...a, kind: 'scripted', paragraphs: [script.answer] }

	const named = nameHit(q).filter(i => !/shopify/i.test(i.id) || !/shopify/i.test(q))
	const intent = intents.find(i => i.test.test(q))
	// a named project or client beats the generic intents, except the contact and availability ones
	if (named.length && (!intent || intents.indexOf(intent) > 4)) return describeItems(a, named)
	if (intent) {
		const built = intent.build(a)
		return { ...built, matched: extract(q).tags }
	}
	const found = extract(q)
	if (found.tags.length || found.roles.length) {
		const ranked = rank(found)
		if (ranked.length) return fromRanking(a, found, ranked, q)
	}
	// "has he used Kubernetes?": say plainly when the page has no evidence, never guess
	const asked = q.match(
		/(?:used|use|using|know|knows|worked with|work with|experience (?:with|in)|familiar with|built with)\s+([a-z0-9#+.\- ]{1,40}?)\s*\??$/i
	)
	if (asked)
		return {
			...fallback(a, selected),
			paragraphs: [`${asked[1]} does not show up in the work on this page. Try one of these, or paste a job posting.`],
		}
	return fallback(a, selected)
}

/* ---------- ?for=<slug> ---------- */

export const tailoredAnswer = (slug: string): Answer | null => {
	const t = tailored[slug]
	if (!t) return null
	return {
		kind: 'tailored',
		prompt: `${t.company} · ${t.role}`,
		isPosting: false,
		heading: `Why Anass fits ${t.company}`,
		paragraphs: [],
		bullets: t.why,
		evidence: ev(t.pinned),
		roles: t.roles,
		matched: [],
	}
}
