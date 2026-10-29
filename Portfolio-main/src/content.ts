// Every fact on the site lives here, so a fact or a demo video is a one-line edit.
// Source: the resume (FACTS.md). Never add a number that is not on the resume.

export type LineId = 'S' | 'A' | 'F' | 'R'

export type Line = {
	id: LineId
	name: string
	carries: string
}

export const lineOrder: LineId[] = ['S', 'A', 'F', 'R']

export const lines: Record<LineId, Line> = {
	S: {
		id: 'S',
		name: 'Software line',
		carries: 'Production code at Shopify, iA Financial Group and Scale AI.',
	},
	A: {
		id: 'A',
		name: 'AI line',
		carries: 'Search, agents and models, from photo search to AgentGym.',
	},
	F: {
		id: 'F',
		name: 'Forward Deployed line',
		carries: 'AI tools built end to end for 4 business clients.',
	},
	R: {
		id: 'R',
		name: 'Recognition line',
		carries: '8 hackathon wins, the Putnam, the GitHub Wall of Fame.',
	},
}

export const person = {
	name: 'Anass Badreddine El Hallaoui',
	nameLines: ['Anass Badreddine', 'El Hallaoui'],
	shortName: 'Anass El Hallaoui',
	role: 'Software engineer who ships AI products to real users.',
	targets: 'Software engineer (new grad) or forward deployed engineer',
	availability: [
		'Graduating April 2027',
		'Full-time from Summer 2027',
		'Open to relocating anywhere in Canada or the US',
	],
	email: 'anass.elhallaoui@gmail.com',
	site: 'badredinne.com',
}

export const links = {
	resume: './AnassBadreddine_El_Hallaoui_Resume.pdf',
	github: 'https://github.com/Dropio12',
	githubLabel: 'github.com/Dropio12',
	linkedin: 'https://www.linkedin.com/in/anass-badreddine-el-hallaoui-027a08228/',
	linkedinLabel: 'in/anass-badreddine-el-hallaoui',
	email: 'mailto:anass.elhallaoui@gmail.com',
}

export const githubUser = 'Dropio12'

export const repo = (name: string) => `https://github.com/${githubUser}/${name}`

export type Fact = { figure: string; text: string }

export type Substop = {
	id: string
	name: string
	lines: LineId[]
	summary: string
	facts: Fact[]
}

export type Station = {
	id: string
	/** text on the station sign */
	name: string
	/** second part of the sign, after the company */
	detail?: string
	role: string
	dates: string
	/** year plate drawn on the track just above this station */
	yearMark?: string
	lines: LineId[]
	/** the color the sign takes when the station is lit */
	primary: LineId
	/** full-bleed color band behind the station */
	band?: LineId
	kind?: 'origin' | 'terminus'
	facts: Fact[]
	notes?: string[]
	substops?: Substop[]
}

export const stations: Station[] = [
	{
		id: 'laval',
		name: 'Université Laval',
		role: 'B.Sc. Computer Science, May 2026 · GPA 3.7 · Dean’s List (2x)',
		dates: '',
		lines: ['S', 'R'],
		primary: 'S',
		kind: 'origin',
		facts: [
			{
				figure: '500+',
				text: 'students helped as a teaching assistant in Probability & Statistics and Theory of Computation (2023, 2024).',
			},
		],
		notes: [
			'Exchange semester in Computer Science at The Ohio State University (2024).',
		],
	},
	{
		id: 'ia',
		name: 'iA Financial Group',
		role: 'Software Engineer Intern',
		dates: 'May to Sep 2023',
		yearMark: '2023',
		lines: ['S'],
		primary: 'S',
		facts: [
			{
				figure: '87%',
				text: 'faster payroll processing for 17,000+ weekly salaries, with an automated Python/C# pipeline.',
			},
			{
				figure: '10,000+',
				text: 'clients’ data protected: found a critical privacy flaw in a database review and helped fix it.',
			},
		],
	},
	{
		id: 'recognition',
		name: 'Recognition',
		role: 'Hackathons: Stanford (2x), NASA, Waterloo, Shopify',
		dates: '',
		lines: ['R'],
		primary: 'R',
		band: 'R',
		facts: [
			{
				figure: '8',
				text: 'hackathon wins. The winning Shopify prototype became Shop App’s photo search.',
			},
			{
				figure: 'Top 600',
				text: 'on the Putnam, on Laval’s team in 2024 and 2025.',
			},
		],
		notes: [
			'GitHub Community Wall of Fame, 2025.',
			'$80K+ in scholarships, including a full-ride U.S. exchange semester.',
			'Research: a fractal mathematics trading research project assigned by a Princeton professor.',
		],
	},
	{
		id: 'ambassador',
		name: 'Intel and Adobe',
		detail: 'Ambassador',
		role: 'Intel oneAPI Software Engineer Ambassador · Adobe Software Engineer Ambassador',
		dates: 'Intel Feb 2024 to Sep 2025 · Adobe Jun to Dec 2025',
		yearMark: '2024',
		lines: ['A'],
		primary: 'A',
		facts: [
			{
				figure: '1,500+',
				text: 'students taught AI tools in hands-on workshops at 10+ universities and hackathons.',
			},
		],
	},
	{
		id: 'shopify-security',
		name: 'Shopify',
		detail: 'Infrastructure Security',
		role: 'Software Engineer Intern',
		dates: 'Jan to Apr 2025',
		yearMark: '2025',
		lines: ['S'],
		primary: 'S',
		facts: [
			{
				figure: '10x',
				text: 'lower internal request latency, by moving services from HTTP/1 to gRPC.',
			},
			{
				figure: '75+',
				text: 'Google Cloud resources: fixed the firewall misconfiguration affecting them.',
			},
		],
		notes: [
			'Got a security-feature PR merged into Redpanda’s open-source C++ code, unblocking Shopify’s data-streaming rollout.',
		],
	},
	{
		id: 'shopify-visual-search',
		name: 'Shopify',
		detail: 'Visual Search',
		role: 'Software Engineer Intern',
		dates: 'May to Jul 2025',
		lines: ['S', 'A', 'R'],
		primary: 'A',
		facts: [
			{
				figure: '20M+',
				text: 'Shop App users reached by photo search: snap a photo, see similar products.',
			},
			{
				figure: '55M+',
				text: 'images searched in under 3 seconds: image embeddings, vector search, and a self-hosted LLM writing 7 search queries per photo.',
			},
			{
				figure: '50+',
				text: 'alerts and 9 Grafana dashboards built from 300+ telemetry signals, with runbooks for on-call engineers.',
			},
		],
		notes: [
			'Took it from a hackathon win to 20M+ users, co-leading a 10-person team with PMs and designers.',
		],
	},
	{
		id: 'clients',
		name: 'Client deployments',
		role: 'Side project: AI tools built end to end for 4 business clients',
		dates: '2025 to 2026',
		lines: ['A', 'F'],
		primary: 'F',
		band: 'F',
		facts: [],
		substops: [
			{
				id: 'law',
				name: 'Immigration law firms',
				lines: ['F'],
				summary: 'A document workflow.',
				facts: [
					{ figure: '10+', text: 'law firms use it.' },
					{ figure: '10,000+', text: 'documents processed.' },
					{ figure: 'About 8 h', text: 'saved per client.' },
				],
			},
			{
				id: 'architecture',
				name: 'An architecture firm',
				lines: ['F'],
				summary:
					'An AI agent that checks building designs against the building code and the Quebec building code, using RAG over tens of thousands of rules.',
				facts: [{ figure: 'Under 1 s', text: 'per answer.' }],
			},
			{
				id: 'hotel',
				name: 'A hotel front desk',
				lines: ['F'],
				summary: 'A voice AI agent on Whisper, Twilio, AWS and Redis.',
				facts: [{ figure: '1,000+', text: 'guest calls handled.' }],
			},
		],
	},
	{
		id: 'scale',
		name: 'Scale AI',
		role: 'Full Stack Software Engineer Expert (contract)',
		dates: 'Feb to Apr 2026',
		yearMark: '2026',
		lines: ['S'],
		primary: 'S',
		facts: [
			{
				figure: '200+',
				text: 'coding tasks built as AI training data: wrote problems and ranked model answers.',
			},
			{
				figure: '4',
				text: 'languages of AI-written code reviewed, catching bugs, test gaps and Git issues: Python, JavaScript/React, Java, C++.',
			},
		],
	},
]

export const msc: Station = {
	id: 'msc',
	name: 'Université Laval',
	role: 'M.Sc. Machine Learning',
	dates: 'Expected April 2027',
	yearMark: '2027',
	lines: ['S', 'A'],
	primary: 'A',
	facts: [],
	notes: ['Then full-time from Summer 2027.'],
}

export type Project = {
	id: string
	name: string
	repo?: string
	href: string
	hrefLabel: string
	line: string
	facts: Fact[]
	stack: string[]
	/** demo video path, e.g. '/demos/agentgym.mp4'. Leave empty until the file exists. */
	demo?: string
	poster?: string
}

export const featuredProjects: Project[] = [
	{
		id: 'agentgym',
		name: 'AgentGym',
		repo: 'AARL',
		href: repo('AARL'),
		hrefLabel: 'Dropio12/AARL',
		line: 'Self-improving agent framework: Hindsight Experience Replay plus DPO.',
		facts: [
			{ figure: '+38%', text: 'task success over the base agent' },
			{ figure: '24,000', text: 'traces measured' },
			{ figure: '98%', text: 'lower compute cost' },
		],
		stack: ['Python', 'DPO', 'AutoGen', 'CrewAI'],
		demo: '',
	},
	{
		id: 'linea',
		name: 'Linea',
		repo: 'archigen',
		href: repo('archigen'),
		hrefLabel: 'Dropio12/archigen',
		line: 'Turns plain-language requests into legally compliant floor plans, through an MCP server with GraphRAG and vector search.',
		facts: [{ figure: '500K+', text: 'building-code and permit nodes' }],
		stack: ['MCP', 'GraphRAG', 'Vector search', 'Diffusion models'],
		demo: '',
	},
	{
		id: 'cherry-hardware-agent',
		name: 'Cherry Hardware Agent',
		repo: 'Cherry-Hardware-Agent',
		href: repo('Cherry-Hardware-Agent'),
		hrefLabel: 'Dropio12/Cherry-Hardware-Agent',
		line: 'Open-source AI agent that catches circuit-board design errors before manufacturing.',
		facts: [
			{ figure: '808,000+', text: 'automated checks' },
			{ figure: '5,800+', text: 'real projects' },
		],
		stack: ['Python'],
		demo: '',
	},
	{
		id: 'used-car-deal-finder',
		name: 'Used-Car Deal Finder',
		repo: 'used-car-deal-finder',
		href: repo('used-car-deal-finder'),
		hrefLabel: 'Dropio12/used-car-deal-finder',
		line: 'Finds underpriced used cars by pricing each listing against similar local ones. Built at Hack the North 2026, then rebuilt as a Go crawler and a Rust pricing engine (WebAssembly) on Cloudflare Workers.',
		facts: [{ figure: '2,000+', text: 'users' }],
		stack: ['Go', 'Rust', 'WebAssembly', 'Cloudflare'],
		demo: '',
	},
	{
		id: 'cherryterminal',
		name: 'CherryTerminal',
		repo: 'CherryTerminal',
		href: repo('CherryTerminal'),
		hrefLabel: 'Dropio12/CherryTerminal',
		line: 'Native C++20/Qt6 financial terminal in one binary.',
		facts: [
			{ figure: '18', text: 'QuantLib modules' },
			{ figure: '16', text: 'broker integrations' },
			{ figure: '100+', text: 'data connectors' },
			{ figure: '37', text: 'AI agents' },
		],
		stack: ['C++20', 'Qt6', 'Python'],
		demo: '',
	},
]

export type MinorProject = {
	name: string
	href: string
	hrefLabel: string
	line: string
	stack: string
}

export const moreProjects: MinorProject[] = [
	{
		name: 'Cherry Blossom',
		href: 'https://trycherryblossom.com',
		hrefLabel: 'trycherryblossom.com',
		line: 'AI agent that designs circuit boards from plain English and flags mistakes before manufacturing: 1,500+ monthly users, 10,000+ boards built.',
		stack: 'TypeScript, React, Convex, AWS',
	},
	{
		name: 'NeuroVision',
		href: repo('NeuroVision'),
		hrefLabel: 'Dropio12/NeuroVision',
		line: 'Predicts how an audience’s brain responds to a video and suggests edits. Multimodal pipeline, 20,000+ neural response signals per second.',
		stack: 'Python, PyTorch',
	},
	{
		name: 'Valorant Spike Predictor',
		href: repo('ValorantTSpikePlantPredictor'),
		hrefLabel: 'Dropio12/ValorantTSpikePlantPredictor',
		line: 'Predicts which site attackers plant on from round history, agents and economy. One XGBoost model per map, tuned with Optuna.',
		stack: 'Python, XGBoost, Optuna, FastAPI, React',
	},
	{
		name: 'FlightO',
		href: repo('FlightO'),
		hrefLabel: 'Dropio12/FlightO',
		line: 'Plans the cheapest full vacation from travel dates, places and stay lengths.',
		stack: 'C++',
	},
	{
		name: 'Translator-AI',
		href: repo('Translator-AI'),
		hrefLabel: 'Dropio12/Translator-AI',
		line: 'Translates the text inside any photo: OCR, language detection, translation.',
		stack: 'Python, OCR, Kivy',
	},
]

/** Overview map: dated stations sit at their start date on a 2023 to 2027 scale. */
export const mapYears = [2023, 2024, 2025, 2026, 2027]
