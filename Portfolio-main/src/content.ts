// Every word and number on the page comes from this file (source: the resume, FACTS.md).
// Inline markup in text fields:
//   **bold**            emphasis
//   [[anchor|noteId]]   highlighted claim with a numbered source note in the margin

export const person = {
	name: 'Anass Badreddine El Hallaoui',
	shortName: 'Anass El Hallaoui',
	abstract: 'Software engineer who ships AI products to real users.',
	rolesSought: ['Software Engineer (new grad)', 'Forward Deployed Engineer'],
	available: 'Full-time from Summer 2027',
	location: 'Open to relocating anywhere in Canada or the US',
	lastUpdated: 'October 2026',
}

const resumeFile = 'AnassBadreddine_El_Hallaoui_Resume.pdf'

export const links = {
	resumeFile,
	resume: `${process.env.PUBLIC_URL}/${resumeFile}`,
	github: 'https://github.com/Dropio12',
	githubLabel: 'github.com/Dropio12',
	linkedin: 'https://www.linkedin.com/in/anass-badreddine-el-hallaoui-027a08228/',
	email: 'anass.elhallaoui@gmail.com',
	site: 'https://badredinne.com',
}

export const repoUrl = (repo: string) => `https://github.com/Dropio12/${repo}`

export type Section = { id: string; n: string; title: string }

export const sections: Section[] = [
	{ id: 'tldr', n: '1', title: 'TL;DR' },
	{ id: 'shipped', n: '2', title: 'Shipped work' },
	{ id: 'clients', n: '3', title: 'Client deployments' },
	{ id: 'projects', n: '4', title: 'Projects' },
	{ id: 'education', n: '5', title: 'Education' },
	{ id: 'recognition', n: '6', title: 'Recognition' },
	{ id: 'next', n: '7', title: 'Next steps' },
]

// Margin comments: the proof layer. Each one says where a claim comes from.
export type Note = {
	title: string
	body: string
	link?: { href: string; label: string }
	jump?: { href: string; label: string }
}

export const notes: Record<string, Note> = {
	photo: {
		title: 'Shopify, Visual Search',
		body: 'Intern, May to Jul 2025.',
		jump: { href: '#shopify-visual-search', label: '2.2' },
	},
	grpc: {
		title: 'Shopify, Infra Security',
		body: 'Intern, Jan to Apr 2025. HTTP/1 to gRPC.',
		jump: { href: '#shopify-infra', label: '2.3' },
	},
	lawfirms: {
		title: 'Client work, 2025 to 2026',
		body: '10,000+ documents processed.',
		jump: { href: '#clients', label: '3' },
	},
	hackathons: {
		title: 'Recognition',
		body: 'Stanford (2x), NASA, Waterloo, Shopify.',
		jump: { href: '#recognition', label: '6' },
	},
	origin: {
		title: 'Where it started',
		body: "His Shopify hackathon prototype became Shop App's photo search.",
		jump: { href: '#recognition', label: '6' },
	},
	languages: {
		title: '4 languages',
		body: 'Python, JavaScript/React, Java and C++.',
	},
	private: {
		title: 'Who the clients are',
		body: 'Immigration law firms, an architecture firm, a hotel front desk. Side project, 2025 to 2026.',
	},
	agentgym: {
		title: 'How it was measured',
		body: 'On 24,000 traces, against the base agent.',
		link: { href: repoUrl('AARL'), label: 'Dropio12/AARL' },
	},
	linea: {
		title: 'What it searches',
		body: 'Building-code and permit nodes, through GraphRAG and vector search.',
		link: { href: repoUrl('archigen'), label: 'Dropio12/archigen' },
	},
	hardware: {
		title: 'Scale',
		body: 'Checks run across 5,800+ real circuit-board projects.',
		link: { href: repoUrl('Cherry-Hardware-Agent'), label: 'Dropio12/Cherry-Hardware-Agent' },
	},
	usedcar: {
		title: 'Hack the North 2026',
		body: 'Built at the hackathon, then rebuilt as a Go crawler and a Rust pricing engine.',
		link: { href: repoUrl('used-car-deal-finder'), label: 'Dropio12/used-car-deal-finder' },
	},
}

// 1. TL;DR: four headline numbers, each tied to its source note.
export const tldr = [
	{
		value: '20M+',
		note: 'photo',
		text: "Shop App users reached by the photo search he co-created at Shopify.",
	},
	{
		value: '10x',
		note: 'grpc',
		text: 'lower internal request latency after moving Shopify services to gRPC.',
	},
	{
		value: '10+',
		note: 'lawfirms',
		text: 'law firms use the document workflow he built.',
	},
	{
		value: '8',
		note: 'hackathons',
		text: 'hackathon wins, including Stanford (2x) and NASA.',
	},
]

export const tldrSummary =
	'He finishes an M.Sc. in Machine Learning at Université Laval in April 2027. He builds AI products end to end: at Shopify, for business clients, and in public on GitHub.'

// 2. Shipped work
export type Role = {
	id: string
	n: string
	org: string
	team?: string
	title: string
	dates: string
	chip?: string
	points: string[]
}

export const roles: Role[] = [
	{
		id: 'scale-ai',
		n: '2.1',
		org: 'Scale AI',
		title: 'Full Stack Software Engineer Expert (contract)',
		dates: 'Feb to Apr 2026',
		points: [
			'Built **200+ coding tasks** as AI training data, writing problems and ranking model answers.',
			'Caught bugs, test gaps and Git issues in AI-written code across [[4 languages|languages]].',
		],
	},
	{
		id: 'shopify-visual-search',
		n: '2.2',
		org: 'Shopify',
		team: 'Visual Search',
		title: 'Software Engineer Intern',
		dates: 'May to Jul 2025',
		chip: 'Shipped',
		points: [
			"Took Shop App's photo search (snap a photo, see similar products) [[from his hackathon win|origin]] to **20M+ users**. Co-led a 10-person team with PMs and designers.",
			'Built search over **55M+ images in under 3 seconds**: image embeddings, vector search, and a self-hosted LLM writing 7 search queries per photo.',
			'Turned 300+ telemetry signals into **9 Grafana dashboards and 50+ alerts**, with runbooks for on-call engineers.',
		],
	},
	{
		id: 'shopify-infra',
		n: '2.3',
		org: 'Shopify',
		team: 'Infrastructure Security',
		title: 'Software Engineer Intern',
		dates: 'Jan to Apr 2025',
		points: [
			'Cut internal request latency **10x** by moving services from HTTP/1 to gRPC.',
			'Fixed a firewall misconfiguration affecting **75+ Google Cloud resources**.',
			"Got a security-feature PR merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
		],
	},
	{
		id: 'ia',
		n: '2.4',
		org: 'iA Financial Group',
		title: 'Software Engineer Intern',
		dates: 'May to Sep 2023',
		points: [
			'Cut payroll processing time **87%** for 17,000+ weekly salaries with an automated Python/C# pipeline.',
			"Found a critical privacy flaw in a database review and helped fix it, protecting **10,000+ clients'** data.",
		],
	},
	{
		id: 'teaching',
		n: '2.5',
		org: 'Teaching',
		title: 'Intel and Adobe ambassador, Université Laval teaching assistant',
		dates: '2023 to 2025',
		points: [
			'Taught **1,500+ students** AI tools in hands-on workshops at 10+ universities and hackathons, as Intel oneAPI Software Engineer Ambassador (Feb 2024 to Sep 2025) and Adobe Software Engineer Ambassador (Jun 2025 to Dec 2025).',
			'Teaching assistant for Probability & Statistics and Theory of Computation at Université Laval (2023, 2024): helped 500+ students.',
		],
	},
]

// 3. Client deployments (the forward-deployed side)
export const clientsIntro =
	'A side project from 2025 to 2026: AI tools built end to end for [[4 business clients|private]].'

export const clients = [
	{
		client: 'Immigration law firms',
		built: 'A document workflow.',
		result: 'Used by **10+ law firms**. 10,000+ documents processed; about 8 hours saved per client.',
	},
	{
		client: 'An architecture firm',
		built:
			'An AI agent that checks building designs against the building code and the Quebec building code, using RAG over tens of thousands of rules.',
		result: 'Answers in **under 1 second**.',
	},
	{
		client: 'A hotel front desk',
		built: 'A voice AI agent built on Whisper, Twilio, AWS and Redis.',
		result: 'Handled **1,000+ guest calls**.',
	},
]

// 4. Projects
export type FlowNode = { label: string; detail?: string; core?: boolean }
export type Diagram =
	| { kind: 'flow'; nodes: FlowNode[]; loop?: string; host?: string }
	| {
			// One boundary (the binary) holding its parts, wired out to external systems
			kind: 'system'
			frame: string
			inside: FlowNode[]
			outside: FlowNode[]
	  }

export type FeaturedProject = {
	id: string
	n: string
	name: string
	repo: string
	chip?: string
	summary: string
	stack: string[]
	figure: { caption: string; diagram: Diagram }
	// Demo slot: drop a file in public/demos and set its path here, e.g. '/demos/agentgym.mp4'.
	demo?: string
	poster?: string
	demoCaption?: string
}

export const projectsIntro =
	'He builds his own AI tools in public. Five are drawn below as figures; the rest are in the index (4.6).'

export const featured: FeaturedProject[] = [
	{
		id: 'agentgym',
		n: '4.1',
		name: 'AgentGym',
		repo: 'AARL',
		summary:
			'A self-improving agent framework (Hindsight Experience Replay + DPO): [[+38% task success|agentgym]] over the base agent, with compute cost cut 98%.',
		stack: ['Python', 'DPO', 'AutoGen', 'CrewAI'],
		figure: {
			caption: "AgentGym's training loop.",
			diagram: {
				kind: 'flow',
				nodes: [
					{ label: 'Agent', detail: 'runs tasks' },
					{ label: 'Traces', detail: '24,000 measured' },
					{ label: 'Hindsight Experience Replay', core: true },
					{ label: 'DPO', detail: 'training', core: true },
				],
				loop: 'next round',
			},
		},
		demoCaption: 'AgentGym demo.',
	},
	{
		id: 'linea',
		n: '4.2',
		name: 'Linea',
		repo: 'archigen',
		summary:
			'Turns plain-language requests into legally compliant floor plans: an MCP server with GraphRAG and vector search over [[500K+ building-code and permit nodes|linea]].',
		stack: ['MCP', 'GraphRAG', 'Vector search', 'Diffusion models'],
		figure: {
			caption: 'How Linea answers a request.',
			diagram: {
				kind: 'flow',
				nodes: [
					{ label: 'Plain-language request' },
					{ label: 'MCP server', core: true },
					{ label: 'GraphRAG + vector search', detail: '500K+ nodes', core: true },
					{ label: 'Compliant floor plan' },
				],
			},
		},
		demoCaption: 'Linea demo.',
	},
	{
		id: 'cherry-hardware-agent',
		n: '4.3',
		name: 'Cherry Hardware Agent',
		repo: 'Cherry-Hardware-Agent',
		chip: 'Open source',
		summary:
			'An open-source AI agent that catches circuit-board design errors before manufacturing: [[808,000+ automated checks|hardware]].',
		stack: ['Python'],
		figure: {
			caption: 'Where Cherry Hardware Agent sits.',
			diagram: {
				kind: 'flow',
				nodes: [
					{ label: 'Circuit-board design' },
					{ label: 'Automated checks', detail: '808,000+ run', core: true },
					{ label: 'Errors caught', detail: 'before manufacturing' },
				],
			},
		},
		demoCaption: 'Cherry Hardware Agent demo.',
	},
	{
		id: 'used-car-deal-finder',
		n: '4.4',
		name: 'Used-Car Deal Finder',
		repo: 'used-car-deal-finder',
		summary:
			'Finds underpriced used cars by pricing each listing against similar local ones, for [[2,000+ users|usedcar]].',
		stack: ['Go', 'Rust', 'WebAssembly', 'Cloudflare'],
		figure: {
			caption: 'The Used-Car Deal Finder pipeline.',
			diagram: {
				kind: 'flow',
				nodes: [
					{ label: 'Go crawler', detail: 'local listings' },
					{ label: 'Rust pricing engine', detail: 'WebAssembly', core: true },
					{ label: 'Underpriced cars', detail: 'vs similar local ones' },
				],
				host: 'Cloudflare Workers',
			},
		},
		demoCaption: 'Used-Car Deal Finder demo.',
	},
	{
		id: 'cherryterminal',
		n: '4.5',
		name: 'CherryTerminal',
		repo: 'CherryTerminal',
		summary: 'A native financial terminal in one binary, written in C++20 with Qt6.',
		stack: ['C++20', 'Qt6', 'Python'],
		figure: {
			caption: "Inside CherryTerminal's single binary, and what it connects to.",
			diagram: {
				kind: 'system',
				frame: 'One native binary, C++20 and Qt6',
				inside: [
					{ label: 'Qt6 interface' },
					{ label: 'QuantLib modules', detail: '18', core: true },
					{ label: 'AI agents', detail: '37', core: true },
				],
				outside: [
					{ label: 'broker integrations', detail: '16' },
					{ label: 'data connectors', detail: '100+' },
				],
			},
		},
		demoCaption: 'CherryTerminal demo.',
	},
]

export type IndexProject = {
	name: string
	what: string
	stack: string
	href: string
	hrefLabel: string
	chip?: string
}

export const projectIndex: IndexProject[] = [
	{
		name: 'Cherry Blossom',
		what: 'AI agent that designs circuit boards from plain English and flags mistakes before manufacturing. 1,500+ monthly users, 10,000+ boards built.',
		stack: 'TypeScript, React, Convex, AWS',
		href: 'https://trycherryblossom.com',
		hrefLabel: 'trycherryblossom.com',
		chip: 'Live',
	},
	{
		name: 'NeuroVision',
		what: "Predicts how an audience's brain responds to a video and suggests edits. A multimodal PyTorch pipeline, 20,000+ neural response signals per second.",
		stack: 'Python, PyTorch',
		href: repoUrl('NeuroVision'),
		hrefLabel: 'NeuroVision',
	},
	{
		name: 'Valorant Spike Predictor',
		what: 'Predicts which site attackers plant on from round history, agents and economy. One XGBoost model per map, tuned with Optuna.',
		stack: 'Python, XGBoost, Optuna, FastAPI, React',
		href: repoUrl('ValorantTSpikePlantPredictor'),
		hrefLabel: 'ValorantTSpikePlantPredictor',
	},
	{
		name: 'FlightO',
		what: 'Plans the cheapest full vacation from travel dates, places and stay lengths.',
		stack: 'C++',
		href: repoUrl('FlightO'),
		hrefLabel: 'FlightO',
	},
	{
		name: 'Translator-AI',
		what: 'Translates the text inside any photo: OCR, language detection, translation.',
		stack: 'Python, OCR, Kivy',
		href: repoUrl('Translator-AI'),
		hrefLabel: 'Translator-AI',
	},
]

// 5. Education
export const education = [
	{
		degree: 'M.Sc. Machine Learning',
		school: 'Université Laval',
		date: 'Expected April 2027',
		note: '',
	},
	{
		degree: 'B.Sc. Computer Science',
		school: 'Université Laval',
		date: 'May 2026',
		note: "GPA 3.7, Dean's List (2x)",
	},
	{
		degree: 'Exchange semester, Computer Science',
		school: 'The Ohio State University',
		date: '2024',
		note: 'Full-ride scholarship',
	},
]

// 6. Recognition
export const recognition = [
	"**8 hackathon wins**: Stanford (2x), NASA, Waterloo and Shopify. His Shopify hackathon prototype became Shop App's photo search.",
	"**Putnam**: top 600; on Laval's team in 2024 and 2025.",
	'**Scholarships**, including a full-ride U.S. exchange semester.',
	'**GitHub Community Wall of Fame**, 2025.',
	'**Research**: a fractal mathematics trading research project assigned by a Princeton professor.',
]

// 7. Next steps
export const nextIntro =
	'Hiring a new-grad software engineer or a forward deployed engineer? He is available full-time from Summer 2027 and open to relocating anywhere in Canada or the US.'

// Markup helpers shared by the page and the terminal.
const NOTE_RE = /\[\[([^|\]]+)\|([^\]]+)\]\]/g

export const noteIdsIn = (text: string) =>
	Array.from(text.matchAll(NOTE_RE), m => m[2])

export const plain = (text: string) =>
	text.replace(NOTE_RE, '$1').replace(/\*\*/g, '')

// Notes are numbered in reading order, like footnotes.
const readingOrder: string[] = [
	...tldr.map(row => `[[x|${row.note}]]`),
	...roles.flatMap(r => r.points),
	clientsIntro,
	...clients.flatMap(c => [c.built, c.result]),
	...featured.map(p => p.summary),
]

const noteOrder: string[] = []
readingOrder.forEach(text =>
	noteIdsIn(text).forEach(id => {
		if (!noteOrder.includes(id)) noteOrder.push(id)
	})
)

export const noteNumber = (id: string) => noteOrder.indexOf(id) + 1
export const noteCount = noteOrder.length
