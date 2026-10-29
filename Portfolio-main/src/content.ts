// Every fact on the site lives here, so a fact, a tag or a demo video is a one-line edit.
// Source: the resume (FACTS.md). Never add a number, company or claim that is not on the resume.
// After editing, run `npm run facts` so the AI function (api/ask.ts) answers from the same facts.

export type Role = 'fde' | 'fullstack' | 'backend' | 'frontend' | 'security' | 'platform' | 'ai'

export type RoleInfo = {
	id: Role
	label: string
	/** said in sentences: "a back-end role" */
	noun: string
	/** suggested questions for the prompt bar when this role is picked */
	questions: string[]
}

export const roles: RoleInfo[] = [
	{
		id: 'fde',
		label: 'FDE',
		noun: 'forward deployed',
		questions: ['Why forward deployed?', 'What has he built for clients?', 'Has he worked with customers?'],
	},
	{
		id: 'fullstack',
		label: 'Full-stack',
		noun: 'full-stack',
		questions: ['What has he shipped end to end?', 'Has he used React?', 'What did he ship at Shopify?'],
	},
	{
		id: 'backend',
		label: 'Back-end',
		noun: 'back-end',
		questions: ['What back-end work has he done at scale?', 'Has he used gRPC?', 'What did he ship at Shopify?'],
	},
	{
		id: 'frontend',
		label: 'Front-end',
		noun: 'front-end',
		questions: ['What has he built in React?', 'Which project has the most users?', 'What did he ship at Shopify?'],
	},
	{
		id: 'security',
		label: 'Security',
		noun: 'security',
		questions: ['What security work has he done?', 'What did he fix at iA?', 'What did he do at Shopify?'],
	},
	{
		id: 'platform',
		label: 'Platform',
		noun: 'platform',
		questions: ['What infrastructure has he worked on?', 'Has he done monitoring and on-call?', 'Has he used AWS?'],
	},
	{
		id: 'ai',
		label: 'AI',
		noun: 'AI',
		questions: ['Best AI project?', 'Has he built RAG or agents?', 'What did he ship at Shopify?'],
	},
]

export const defaultQuestions = ['What did he ship at Shopify?', 'Why forward deployed?', 'Best AI project?']

export const person = {
	name: 'Anass Badreddine El Hallaoui',
	shortName: 'Anass El Hallaoui',
	firstName: 'Anass',
	role: 'Software engineer who ships AI products to real users.',
	targets: 'Software engineer (new grad) or forward deployed engineer',
	availability: ['Graduating April 2027', 'Full-time from Summer 2027', 'Open to relocating anywhere in Canada or the US'],
	email: 'anass.elhallaoui@gmail.com',
	site: 'badredinne.com',
}

export const githubUser = 'Dropio12'
export const repo = (name: string) => `https://github.com/${githubUser}/${name}`

export const links = {
	resume: './AnassBadreddine_El_Hallaoui_Resume.pdf',
	github: 'https://github.com/Dropio12',
	githubLabel: 'github.com/Dropio12',
	linkedin: 'https://www.linkedin.com/in/anass-badreddine-el-hallaoui-027a08228/',
	linkedinLabel: 'in/anass-badreddine-el-hallaoui',
	email: 'mailto:anass.elhallaoui@gmail.com',
}

export type Fact = { figure: string; text: string }

export type Link = { label: string; href: string; kind: 'code' | 'site' }

export type Kind = 'experience' | 'client' | 'project'

/** the 3D objects in the hero; each one stands for a piece of work */
export type SceneObject = 'chip' | 'floorplan' | 'car' | 'bag' | 'dumbbell' | 'terminal'

export type Item = {
	id: string
	kind: Kind
	title: string
	/** small line under the title: what kind of work and when */
	meta: string
	/** the job title, for experience */
	position?: string
	dates?: string
	/** the one line on the tile; carries the headline number */
	line: string
	facts: Fact[]
	notes?: string[]
	/** tech shown on the tile and in the detail view */
	stack: string[]
	/** vocabulary ids (src/lib/vocab.ts) used by search, filters and the answer matcher */
	tags: string[]
	roles: Role[]
	links: Link[]
	/** a real image for the detail view (and a square crop for the tile); otherwise the art is drawn in code */
	image?: { src: string; tile?: string; alt: string; position?: string }
	/** a compact date range for the experience list, when `dates` is long */
	span?: string
	/** demo video path, e.g. '/demos/agentgym.mp4'. Leave empty until the file exists. */
	demo?: string
	poster?: string
	object?: SceneObject
}

export const items: Item[] = [
	{
		id: 'shopify-visual-search',
		kind: 'experience',
		title: 'Shopify Visual Search',
		meta: 'Internship · 2025',
		position: 'Software Engineer Intern, Visual Search',
		dates: 'May to Jul 2025',
		line: 'Took Shop App’s photo search from his hackathon win to 20M+ users.',
		facts: [
			{ figure: '20M+', text: 'Shop App users reached by photo search: snap a photo, see similar products.' },
			{
				figure: '55M+',
				text: 'images searched in under 3 seconds: image embeddings, vector search, and a self-hosted LLM writing 7 search queries per photo.',
			},
			{
				figure: '50+',
				text: 'alerts and 9 Grafana dashboards built from 300+ telemetry signals, with runbooks for on-call engineers.',
			},
		],
		notes: ['Co-led a 10-person team with PMs and designers.'],
		stack: ['Image embeddings', 'Vector search', 'Self-hosted LLM', 'Grafana'],
		tags: ['embeddings', 'vector', 'llm', 'search', 'cv', 'ml', 'grafana', 'observability', 'leadership', 'ecommerce', 'hackathon'],
		roles: ['ai', 'backend', 'platform'],
		links: [],
		image: {
			src: '/shop-photo-search.webp',
			tile: '/shop-photo-search-tile.webp',
			alt: 'The shop.com home page. A star marks the photo search button in the search bar.',
			position: '50% 0%',
		},
		demo: '',
		object: 'bag',
	},
	{
		id: 'law-firm-workflow',
		kind: 'client',
		title: 'Immigration law firms',
		meta: 'Client work · 2025 to 2026',
		dates: '2025 to 2026',
		line: 'A document workflow used by 10+ law firms, with 10,000+ documents processed.',
		facts: [
			{ figure: '10+', text: 'immigration law firms use it.' },
			{ figure: '10,000+', text: 'documents processed.' },
			{ figure: 'About 8 h', text: 'saved per client.' },
		],
		notes: ['One of the AI tools he built end to end for 4 business clients.'],
		stack: ['AI', 'Document workflow'],
		tags: ['pipelines', 'documents', 'legal', 'customers'],
		roles: ['fde', 'ai', 'fullstack'],
		links: [],
		demo: '',
	},
	{
		id: 'agentgym',
		kind: 'project',
		title: 'AgentGym',
		meta: 'Project · on GitHub',
		line: 'Self-improving agent framework: +38% task success over the base agent.',
		facts: [
			{ figure: '+38%', text: 'task success over the base agent.' },
			{ figure: '24,000', text: 'traces measured.' },
			{ figure: '98%', text: 'lower compute cost.' },
		],
		notes: ['Hindsight Experience Replay plus DPO.'],
		stack: ['Python', 'DPO', 'AutoGen', 'CrewAI'],
		tags: ['python', 'dpo', 'rl', 'agents', 'autogen', 'crewai', 'llm', 'ml'],
		roles: ['ai', 'backend'],
		links: [{ label: 'Dropio12/AARL', href: repo('AARL'), kind: 'code' }],
		demo: '',
		object: 'dumbbell',
	},
	{
		id: 'shopify-infra-security',
		kind: 'experience',
		title: 'Shopify Infrastructure Security',
		meta: 'Internship · 2025',
		position: 'Software Engineer Intern, Infrastructure Security',
		dates: 'Jan to Apr 2025',
		line: 'Cut internal request latency 10x by moving services from HTTP/1 to gRPC.',
		facts: [
			{ figure: '10x', text: 'lower internal request latency, by moving services from HTTP/1 to gRPC.' },
			{ figure: '75+', text: 'Google Cloud resources: fixed the firewall misconfiguration affecting them.' },
		],
		notes: ['Got a security-feature PR merged into Redpanda’s open-source C++ code, unblocking Shopify’s data-streaming rollout.'],
		stack: ['gRPC', 'Google Cloud', 'C++', 'Redpanda'],
		tags: ['grpc', 'gcp', 'cpp', 'networking', 'security', 'streaming', 'opensource', 'cloud', 'ecommerce'],
		roles: ['security', 'backend', 'platform'],
		links: [],
		demo: '',
		object: 'terminal',
	},
	{
		id: 'cherry-blossom',
		kind: 'project',
		title: 'Cherry Blossom',
		meta: 'Project · live',
		line: 'AI agent that designs circuit boards from plain English: 1,500+ monthly users.',
		facts: [
			{ figure: '1,500+', text: 'monthly users.' },
			{ figure: '10,000+', text: 'boards built.' },
		],
		notes: [
			'A TypeScript backend on Convex, with a verification step that checks every AI edit before a board goes to manufacturing.',
		],
		stack: ['TypeScript', 'React', 'Convex', 'AWS'],
		tags: ['typescript', 'react', 'convex', 'aws', 'agents', 'llm', 'hardware', 'cloud'],
		roles: ['ai', 'fullstack', 'frontend', 'backend'],
		links: [{ label: 'trycherryblossom.com', href: 'https://trycherryblossom.com', kind: 'site' }],
		demo: '',
		object: 'chip',
	},
	{
		id: 'architecture-rag-agent',
		kind: 'client',
		title: 'Architecture firm',
		meta: 'Client work · 2025 to 2026',
		dates: '2025 to 2026',
		line: 'An AI agent that checks building designs against the building code, in under 1 second.',
		facts: [
			{ figure: 'Under 1 s', text: 'per answer.' },
			{ figure: 'RAG', text: 'over tens of thousands of rules from the building code and the Quebec building code.' },
		],
		notes: ['One of the AI tools he built end to end for 4 business clients.'],
		stack: ['RAG', 'AI agent'],
		tags: ['rag', 'agents', 'llm', 'search', 'construction', 'customers'],
		roles: ['fde', 'ai', 'backend'],
		links: [],
		demo: '',
		object: 'floorplan',
	},
	{
		id: 'hotel-jaro-voice',
		kind: 'client',
		title: 'Hotel Jaro',
		meta: 'Client work · 2025 to 2026',
		dates: '2025 to 2026',
		line: 'A voice AI agent for the front desk that handled 1,000+ guest calls.',
		facts: [{ figure: '1,000+', text: 'guest calls handled by the voice agent at the front desk.' }],
		notes: ['One of the AI tools he built end to end for 4 business clients.'],
		stack: ['Whisper', 'Twilio', 'AWS', 'Redis'],
		tags: ['whisper', 'twilio', 'aws', 'redis', 'voice', 'agents', 'hospitality', 'cloud', 'customers'],
		roles: ['fde', 'ai', 'backend', 'platform'],
		links: [],
		demo: '',
	},
	{
		id: 'scale-ai',
		kind: 'experience',
		title: 'Scale AI',
		meta: 'Contract · 2026',
		position: 'Full Stack Software Engineer Expert (contract)',
		dates: 'Feb to Apr 2026',
		line: 'Built 200+ coding tasks as AI training data and reviewed AI-written code in 4 languages.',
		facts: [
			{ figure: '200+', text: 'coding tasks built as AI training data: wrote problems and ranked model answers.' },
			{
				figure: '4',
				text: 'languages of AI-written code reviewed, catching bugs, test gaps and Git issues: Python, JavaScript/React, Java, C++.',
			},
		],
		stack: ['Python', 'JavaScript/React', 'Java', 'C++'],
		tags: ['python', 'javascript', 'react', 'java', 'cpp', 'codereview', 'testing', 'git', 'llm'],
		roles: ['fullstack', 'ai', 'frontend', 'backend'],
		links: [],
		demo: '',
	},
	{
		id: 'linea',
		kind: 'project',
		title: 'Linea',
		meta: 'Project · on GitHub',
		line: 'Turns plain-language requests into legally compliant floor plans.',
		facts: [
			{
				figure: '500K+',
				text: 'building-code and permit nodes, searched with GraphRAG and vector search through an MCP server.',
			},
		],
		stack: ['MCP', 'GraphRAG', 'Vector search', 'Diffusion models'],
		tags: ['mcp', 'graphrag', 'rag', 'vector', 'diffusion', 'llm', 'construction'],
		roles: ['ai', 'backend'],
		links: [{ label: 'Dropio12/archigen', href: repo('archigen'), kind: 'code' }],
		demo: '',
		object: 'floorplan',
	},
	{
		id: 'cherry-hardware-agent',
		kind: 'project',
		title: 'Cherry Hardware Agent',
		meta: 'Project · open source',
		line: 'Open-source AI agent that catches circuit-board design errors before manufacturing.',
		facts: [
			{ figure: '808,000+', text: 'automated checks.' },
			{ figure: '5,800+', text: 'real projects checked.' },
		],
		stack: ['Python'],
		tags: ['python', 'agents', 'llm', 'hardware', 'opensource', 'testing'],
		roles: ['ai'],
		links: [{ label: 'Dropio12/Cherry-Hardware-Agent', href: repo('Cherry-Hardware-Agent'), kind: 'code' }],
		demo: '',
		object: 'chip',
	},
	{
		id: 'ia-financial',
		kind: 'experience',
		title: 'iA Financial Group',
		meta: 'Internship · 2023',
		position: 'Software Engineer Intern',
		dates: 'May to Sep 2023',
		line: 'Cut payroll processing time 87% for 17,000+ weekly salaries.',
		facts: [
			{ figure: '87%', text: 'faster payroll processing for 17,000+ weekly salaries, with an automated Python/C# pipeline.' },
			{
				figure: '10,000+',
				text: 'clients’ data protected: found a critical privacy flaw in a database review and helped fix it.',
			},
		],
		stack: ['Python', 'C#'],
		tags: ['python', 'csharp', 'pipelines', 'privacy', 'security', 'databases', 'finance'],
		roles: ['backend', 'security'],
		links: [],
		demo: '',
	},
	{
		id: 'used-car-deal-finder',
		kind: 'project',
		title: 'Used-Car Deal Finder',
		meta: 'Project · Hack the North 2026',
		line: 'Finds underpriced used cars by pricing each listing against similar local ones. 2,000+ users.',
		facts: [{ figure: '2,000+', text: 'users.' }],
		notes: [
			'Built at Hack the North 2026.',
			'Rebuilt as a Go crawler and a Rust pricing engine (WebAssembly) on Cloudflare Workers.',
		],
		stack: ['Go', 'Rust', 'WebAssembly', 'Cloudflare'],
		tags: ['go', 'rust', 'wasm', 'cloudflare', 'automotive', 'hackathon', 'cloud', 'pipelines'],
		roles: ['backend', 'platform', 'fullstack'],
		links: [{ label: 'Dropio12/used-car-deal-finder', href: repo('used-car-deal-finder'), kind: 'code' }],
		demo: '',
		object: 'car',
	},
	{
		id: 'cherryterminal',
		kind: 'project',
		title: 'CherryTerminal',
		meta: 'Project · on GitHub',
		line: 'Native C++20/Qt6 financial terminal in one binary, with 37 AI agents.',
		facts: [
			{ figure: '18', text: 'QuantLib modules.' },
			{ figure: '16', text: 'broker integrations.' },
			{ figure: '100+', text: 'data connectors.' },
			{ figure: '37', text: 'AI agents.' },
		],
		stack: ['C++20', 'Qt6', 'Python'],
		tags: ['cpp', 'qt', 'python', 'finance', 'agents'],
		roles: ['backend', 'frontend', 'ai'],
		links: [{ label: 'Dropio12/CherryTerminal', href: repo('CherryTerminal'), kind: 'code' }],
		demo: '',
		object: 'terminal',
	},
	{
		id: 'ambassador',
		kind: 'experience',
		title: 'Intel and Adobe',
		meta: 'Ambassador · 2024 to 2025',
		position: 'Intel oneAPI Software Engineer Ambassador · Adobe Software Engineer Ambassador',
		dates: 'Intel Feb 2024 to Sep 2025 · Adobe Jun to Dec 2025',
		span: 'Feb 2024 to Dec 2025',
		line: 'Taught 1,500+ students AI tools in hands-on workshops.',
		facts: [
			{ figure: '1,500+', text: 'students taught AI tools in hands-on workshops at 10+ universities and hackathons.' },
		],
		stack: ['oneAPI', 'AI tools', 'Workshops'],
		tags: ['teaching', 'education', 'customers', 'hackathon'],
		roles: ['fde', 'ai'],
		links: [],
		demo: '',
	},
	{
		id: 'neurovision',
		kind: 'project',
		title: 'NeuroVision',
		meta: 'Project · on GitHub',
		line: 'Predicts how an audience’s brain responds to a video and suggests edits.',
		facts: [{ figure: '20,000+', text: 'neural response signals per second, in a multimodal PyTorch pipeline.' }],
		stack: ['Python', 'PyTorch'],
		tags: ['python', 'pytorch', 'ml', 'media'],
		roles: ['ai'],
		links: [{ label: 'Dropio12/NeuroVision', href: repo('NeuroVision'), kind: 'code' }],
		demo: '',
	},
	{
		id: 'valorant-spike-predictor',
		kind: 'project',
		title: 'Valorant Spike Predictor',
		meta: 'Project · on GitHub',
		line: 'Predicts which site attackers plant on, from round history, agents and economy.',
		facts: [{ figure: 'One model per map', text: 'XGBoost, tuned with Optuna.' }],
		stack: ['Python', 'XGBoost', 'Optuna', 'FastAPI', 'React'],
		tags: ['python', 'xgboost', 'optuna', 'fastapi', 'react', 'ml', 'gaming'],
		roles: ['ai', 'fullstack', 'frontend', 'backend'],
		links: [{ label: 'Dropio12/ValorantTSpikePlantPredictor', href: repo('ValorantTSpikePlantPredictor'), kind: 'code' }],
		demo: '',
	},
	{
		id: 'flighto',
		kind: 'project',
		title: 'FlightO',
		meta: 'Project · on GitHub',
		line: 'Plans the cheapest full vacation from travel dates, places and stay lengths.',
		facts: [],
		stack: ['C++'],
		tags: ['cpp', 'travel'],
		roles: ['backend'],
		links: [{ label: 'Dropio12/FlightO', href: repo('FlightO'), kind: 'code' }],
		demo: '',
	},
	{
		id: 'translator-ai',
		kind: 'project',
		title: 'Translator-AI',
		meta: 'Project · on GitHub',
		line: 'Translates the text inside any photo: OCR, language detection, translation.',
		facts: [],
		stack: ['Python', 'OCR', 'Kivy'],
		tags: ['python', 'ocr', 'cv', 'ml', 'kivy'],
		roles: ['ai'],
		links: [{ label: 'Dropio12/Translator-AI', href: repo('Translator-AI'), kind: 'code' }],
		demo: '',
	},
]

export const itemById = (id: string) => items.find(i => i.id === id)

/** which piece of work each 3D object stands for; the first id opens on click */
export const objectItems: Record<SceneObject, string[]> = {
	bag: ['shopify-visual-search'],
	chip: ['cherry-blossom', 'cherry-hardware-agent'],
	floorplan: ['linea', 'architecture-rag-agent'],
	car: ['used-car-deal-finder'],
	dumbbell: ['agentgym'],
	terminal: ['cherryterminal', 'shopify-infra-security', 'scale-ai'],
}

/** the experience list in the CV block, newest first */
export const experienceOrder = ['scale-ai', 'shopify-visual-search', 'shopify-infra-security', 'ambassador', 'ia-financial']

export const clientWork = {
	title: 'Client deployments',
	meta: 'Side project · 2025 to 2026',
	line: 'AI tools built end to end for 4 business clients: immigration law firms, an architecture firm, Hotel Jaro.',
}

export type Degree = { degree: string; school: string; when: string; detail?: string }

export const education: Degree[] = [
	{ degree: 'M.Sc. Machine Learning', school: 'Université Laval', when: 'Expected April 2027' },
	{
		degree: 'B.Sc. Computer Science',
		school: 'Université Laval',
		when: 'May 2026',
		detail: 'GPA 3.7 · Dean’s List (2x)',
	},
	{
		degree: 'Exchange semester, Computer Science',
		school: 'The Ohio State University',
		when: '2024',
		detail: 'A full-ride U.S. exchange semester',
	},
]

export const teaching =
	'Teaching assistant at Laval in Probability & Statistics and Theory of Computation (2023, 2024): helped 500+ students.'

export const research = 'Research: a fractal mathematics trading research project assigned by a Princeton professor.'

export type Recognition = { figure: string; label: string; detail?: string }

export const recognition: Recognition[] = [
	{ figure: '8', label: 'hackathon wins', detail: 'Stanford (2x), NASA, Waterloo, Shopify' },
	{ figure: 'Top 600', label: 'on the Putnam', detail: 'On Laval’s team in 2024 and 2025' },
	{ figure: '$80K+', label: 'in scholarships', detail: 'Including a full-ride U.S. exchange semester' },
	{ figure: '2025', label: 'GitHub Community Wall of Fame' },
]

export const hackathonNote = 'His Shopify hackathon prototype became Shop App’s photo search.'

/* ---------- per-job views: badredinne.com/?for=<slug> ---------- */

export type Tailored = {
	company: string
	role: string
	/** role chips picked on load */
	roles: Role[]
	/** tiles pinned first, in this order */
	pinned: string[]
	/** exactly 3 bullets; each one only restates facts from this file */
	why: string[]
}

export const tailored: Record<string, Tailored> = {
	harvey: {
		company: 'Harvey',
		role: 'Software Engineer, New Grad 2027',
		roles: ['ai', 'fullstack'],
		pinned: ['law-firm-workflow', 'architecture-rag-agent', 'shopify-visual-search', 'agentgym'],
		why: [
			'He already builds AI for law firms: a document workflow used by 10+ immigration law firms, with 10,000+ documents processed and about 8 hours saved per client.',
			'He builds retrieval over large bodies of rules: an agent that checks building designs against the building code, using RAG over tens of thousands of rules and answering in under 1 second.',
			'He ships AI to real users at scale: at Shopify he took Shop App’s photo search from his hackathon win to 20M+ users.',
		],
	},
}

/* ---------- fixed answers: these questions never reach a model ---------- */

export type Script = { id: string; patterns: string[]; answer: string }

const emailLine = `email Anass at ${person.email}.`

export const scripts: Script[] = [
	{
		id: 'pay',
		patterns: [
			'\\bsalary\\b',
			'compensation',
			'\\bwages?\\b',
			'pay range',
			'hourly rate',
			'expected pay',
			'desired pay',
			'how much (does|would|will) he (cost|charge|want|expect|make|ask)',
		],
		answer: `Pay is a conversation to have with Anass directly: ${emailLine}`,
	},
	{
		id: 'status',
		patterns: [
			'visa',
			'sponsor',
			'work permit',
			'work authori[sz]ation',
			'authori[sz]ed to work',
			'right to work',
			'eligible to work',
			'citizen',
			'green card',
			'h-?1b',
			'\\btn\\b',
			'\\bopt\\b',
			'nationality',
			'where is he from',
		],
		answer: `Questions about his work status are best answered by Anass himself: ${emailLine}`,
	},
	{
		id: 'references',
		patterns: ['reference', 'referee', 'recommendation letter', 'vouch'],
		answer: `For references, ${emailLine}`,
	},
	{
		id: 'verdict',
		patterns: [
			'(good|great|right|strong|best) (fit|hire|choice|addition|match) for (my|our|the) team',
			'good for (my|our) team',
			'should (i|we) hire',
			'is he (any )?(good|better|worth)',
			'better than',
			'culture fit',
			'weakness',
			'red flags?',
			'rate him',
		],
		answer: `This page shows the evidence, not a verdict: his work, numbers and code are all here. For a conversation about your team, ${emailLine}`,
	},
	{
		id: 'personal',
		patterns: ['\\bage\\b', 'how old', 'religio', 'married', 'marital', 'ethnic', 'gender', '\\bkids\\b', 'pregnan', 'disabilit', 'health'],
		answer: `This page only covers his work. Anything else, ${emailLine}`,
	},
]

export const privacyNote = {
	local: 'Answers are generated from this page’s facts.',
	ai: 'Questions you ask are answered by an AI model; we do not store them.',
}
