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

export const defaultQuestions = ['What did he ship at Shopify?', 'What has he built for real clients?']

export const person = {
	name: 'Anass Badreddine El Hallaoui',
	shortName: 'Anass El Hallaoui',
	firstName: 'Anass',
	role: 'Software engineer who ships AI products to real users.',
	targets: 'Software engineer (new grad) or forward deployed engineer',
	availability: ['Open to relocating anywhere in Canada or the US'],
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

export type Item = {
	id: string
	kind: Kind
	title: string
	/** the employer, when the title names a team (cards lead with the employer) */
	org?: string
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
	/** the one number a card leads with; restates a fact above, word for word on the figure */
	key?: { figure: string; label: string }
	/** the card's line when `line` already carries the key number: what was built and how */
	blurb?: string
}

export const items: Item[] = [
	{
		id: 'shopify-visual-search',
		kind: 'experience',
		org: 'Shopify',
		title: 'Shopify Visual Search',
		meta: 'Internship · 2025',
		position: 'Software Engineer Intern, Visual Search',
		dates: 'May to Jul 2025',
		line: 'Took Shop App’s photo search from his hackathon win to 20M+ users.',
		key: { figure: '20M+', label: 'Shop App users reached' },
		blurb: 'Took Shop App’s photo search from his hackathon win into the app: snap a photo, see similar products.',
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
		tags: ['embeddings', 'vector', 'llm', 'search', 'cv', 'ml', 'grafana', 'prometheus', 'observability', 'leadership', 'ecommerce', 'hackathon'],
		roles: ['ai', 'backend', 'platform'],
		links: [],
		image: {
			src: '/shop-photo-search.webp',
			tile: '/shop-photo-search-tile.webp',
			alt: 'The shop.com home page. A star marks the photo search button in the search bar.',
			position: '50% 0%',
		},
		demo: '',
	},
	{
		id: 'shopify-infra-security',
		kind: 'experience',
		org: 'Shopify',
		title: 'Shopify Infrastructure Security',
		meta: 'Internship · 2025',
		position: 'Software Engineer Intern, Infrastructure Security',
		dates: 'Jan to Apr 2025',
		line: 'Cut internal request latency 10x by moving services from HTTP/1 to gRPC.',
		key: { figure: '10x', label: 'lower internal request latency' },
		blurb: 'Moved internal services from HTTP/1 to gRPC, and got a security feature merged into Redpanda’s open-source C++.',
		facts: [
			{ figure: '10x', text: 'lower internal request latency, by moving services from HTTP/1 to gRPC.' },
			{ figure: '75+', text: 'Google Cloud resources: fixed the firewall misconfiguration affecting them.' },
		],
		notes: ['Got a security-feature PR merged into Redpanda’s open-source C++ code, unblocking Shopify’s data-streaming rollout.'],
		stack: ['gRPC', 'Google Cloud', 'C++', 'Redpanda'],
		tags: ['grpc', 'gcp', 'cpp', 'terraform', 'cicd', 'networking', 'security', 'streaming', 'opensource', 'cloud', 'ecommerce'],
		roles: ['security', 'backend', 'platform'],
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
		key: { figure: '200+', label: 'coding tasks built as AI training data' },
		blurb: 'Wrote coding problems and ranked model answers as AI training data, and caught bugs in AI-written code.',
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
		id: 'ia-financial',
		kind: 'experience',
		title: 'iA Financial Group',
		meta: 'Internship · 2023',
		position: 'Software Engineer Intern',
		dates: 'May to Sep 2023',
		line: 'Cut payroll processing time 87% for 17,000+ weekly salaries.',
		key: { figure: '87%', label: 'faster payroll processing' },
		blurb: 'Automated payroll processing with a Python/C# pipeline, and found a critical privacy flaw in a database review.',
		facts: [
			{ figure: '87%', text: 'faster payroll processing for 17,000+ weekly salaries, with an automated Python/C# pipeline.' },
			{
				figure: '10,000+',
				text: 'clients’ data protected: found a critical privacy flaw in a database review and helped fix it.',
			},
		],
		stack: ['Python', 'C#'],
		tags: ['python', 'csharp', 'pipelines', 'cicd', 'privacy', 'security', 'databases', 'finance'],
		roles: ['backend', 'security'],
		links: [],
		demo: '',
	},
	{
		id: 'law-firm-workflow',
		kind: 'client',
		title: 'Immigration law firms',
		meta: 'Client work · 2025 to 2026',
		dates: '2025 to 2026',
		line: 'A document workflow used by 10+ law firms, with 10,000+ documents processed.',
		key: { figure: '10+', label: 'immigration law firms use it' },
		blurb: 'An AI document workflow for immigration law firms, built end to end.',
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
		image: {
			src: '/work/law-firm-workflow/ircc-imm5257.webp',
			alt: 'The canada.ca page for the IRCC visitor visa form (IMM 5257), one of the forms the app reads and fills.',
			position: '0% 0%',
		},
		demo: '',
	},
	{
		id: 'architecture-rag-agent',
		kind: 'client',
		title: 'Architecture firm',
		meta: 'Client work · 2025 to 2026',
		dates: '2025 to 2026',
		line: 'An AI agent that checks building designs against the building code, in under 1 second.',
		key: { figure: 'Under 1 s', label: 'per answer, over tens of thousands of rules' },
		blurb: 'An AI agent that checks building designs against the building code and the Quebec building code, using RAG.',
		facts: [
			{ figure: 'Under 1 s', text: 'per answer.' },
			{ figure: 'RAG', text: 'over tens of thousands of rules from the building code and the Quebec building code.' },
		],
		notes: ['One of the AI tools he built end to end for 4 business clients.'],
		stack: ['RAG', 'AI agent'],
		tags: ['rag', 'agents', 'llm', 'search', 'construction', 'customers'],
		roles: ['fde', 'ai', 'backend'],
		links: [],
		image: {
			src: '/work/architecture-rag-agent/code-check.webp',
			alt: 'A code checker flagging a bedroom below the National Building Code minimum area on a sample floor plan.',
			position: '100% 0%',
		},
		demo: '',
	},
	{
		id: 'hotel-jaro-voice',
		kind: 'client',
		title: 'Hotel Jaro',
		meta: 'Client work · 2025 to 2026',
		dates: '2025 to 2026',
		line: 'A voice AI agent for the front desk that handled 1,000+ guest calls.',
		key: { figure: '80%', label: 'of calls handled with no staff' },
		blurb: 'A voice AI agent that answers guest calls at the hotel’s front desk.',
		facts: [
			{ figure: '1,000+', text: 'guest calls handled by the voice agent at the front desk.' },
			{ figure: '80%', text: 'of those calls handled with no staff involved, at a natural receptionist pace.' },
		],
		notes: ['One of the AI tools he built end to end for 4 business clients.'],
		stack: ['Whisper', 'Twilio', 'AWS', 'Redis'],
		tags: ['whisper', 'twilio', 'aws', 'redis', 'voice', 'agents', 'hospitality', 'cloud', 'customers'],
		roles: ['fde', 'ai', 'backend', 'platform'],
		links: [],
		image: {
			src: '/work/hotel-jaro-voice/dashboard-recreation.webp',
			alt: 'A recreation, with sample data, of the Hotel Jaro front-desk agent dashboard: live calls by room, a live transcript, guest needs and stats. The real dashboard is private.',
			position: '50% 0%',
		},
		demo: '',
	},
	{
		id: 'intel-ambassador',
		kind: 'experience',
		title: 'Intel',
		meta: 'Ambassador · 2024 to 2025',
		position: 'oneAPI Software Engineer Ambassador',
		dates: 'Feb 2024 to Sep 2025',
		line: 'Taught AI tools in hands-on workshops as Intel’s oneAPI Software Engineer Ambassador.',
		key: { figure: '1,500+', label: 'students taught across his Intel and Adobe roles' },
		facts: [
			{
				figure: '1,500+',
				text: 'students taught AI tools in hands-on workshops at 10+ universities and hackathons, across his Intel and Adobe ambassador roles.',
			},
		],
		stack: ['oneAPI', 'AI tools', 'Workshops'],
		tags: ['teaching', 'education', 'customers', 'hackathon'],
		roles: ['fde', 'ai'],
		links: [],
		image: {
			src: '/work/intel-ambassador/oneapi.webp',
			alt: 'The Intel oneAPI page on intel.com.',
			position: '20% 50%',
		},
		demo: '',
	},
	{
		id: 'adobe-ambassador',
		kind: 'experience',
		title: 'Adobe',
		meta: 'Ambassador · 2025',
		position: 'Software Engineer Ambassador',
		dates: 'Jun to Dec 2025',
		line: 'Taught AI tools in hands-on workshops at universities and hackathons as Adobe’s Software Engineer Ambassador.',
		key: { figure: '1,500+', label: 'students taught across his Intel and Adobe roles' },
		facts: [
			{
				figure: '1,500+',
				text: 'students taught AI tools in hands-on workshops at 10+ universities and hackathons, across his Intel and Adobe ambassador roles.',
			},
		],
		stack: ['AI tools', 'Workshops'],
		tags: ['teaching', 'education', 'customers', 'hackathon'],
		roles: ['fde', 'ai'],
		links: [],
		image: {
			src: '/work/adobe-ambassador/summit-2025.webp',
			alt: 'The Adobe Summit 2025 sessions page on adobe.com.',
			position: '0% 0%',
		},
		demo: '',
	},
	{
		id: 'laval-ta',
		kind: 'experience',
		title: 'Université Laval',
		meta: 'Teaching assistant · 2023, 2024',
		position: 'Teaching Assistant, Probability & Statistics and Theory of Computation',
		dates: '2023, 2024',
		line: 'Teaching assistant in Probability & Statistics and in Theory of Computation.',
		key: { figure: '500+', label: 'students helped' },
		facts: [{ figure: '500+', text: 'students helped in Probability & Statistics and Theory of Computation.' }],
		stack: ['Probability & Statistics', 'Theory of Computation'],
		tags: ['teaching', 'education'],
		roles: ['fde'],
		links: [],
		demo: '',
	},
	{
		id: 'agentgym',
		kind: 'project',
		title: 'AgentGym',
		meta: 'Project · on GitHub',
		line: 'Self-improving agent framework: +38% task success over the base agent.',
		key: { figure: '+38%', label: 'task success over the base agent' },
		blurb: 'A self-improving agent framework built on Hindsight Experience Replay and DPO.',
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
		image: {
			src: '/work/agentgym/runs.webp',
			alt: "AgentGym's run browser listing agent runs, filled with sample runs from the repo's own data generator.",
			position: '0% 0%',
		},
		demo: '/demos/agentgym.mp4',
		poster: '/demos/agentgym.webp',
	},
	{
		id: 'cherry-blossom',
		kind: 'project',
		title: 'Cherry Blossom',
		meta: 'Project · live',
		line: 'AI agent that designs circuit boards from plain English: 1,500+ monthly users.',
		key: { figure: '1,500+', label: 'monthly users' },
		blurb: 'An AI agent that designs circuit boards from plain English and flags mistakes before manufacturing.',
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
		image: {
			src: '/work/cherry-blossom/editor.webp',
			alt: 'The Cherry Blossom editor showing an ESP32 robot controller board in PCB view.',
			position: '50% 40%',
		},
		demo: '/demos/cherry-blossom.mp4',
		poster: '/demos/cherry-blossom.webp',
	},
	{
		id: 'linea',
		kind: 'project',
		title: 'Linea',
		meta: 'Project · on GitHub',
		line: 'Turns plain-language requests into legally compliant floor plans.',
		key: { figure: '500K+', label: 'building-code and permit nodes' },
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
		image: {
			src: '/work/linea/editor.webp',
			alt: "Linea's plan editor showing a floor plan with its rooms, running with its built-in sample plan.",
			position: '40% 40%',
		},
		demo: '/demos/linea.mp4',
		poster: '/demos/linea.webp',
	},
	{
		id: 'cherry-hardware-agent',
		kind: 'project',
		title: 'Cherry Hardware Agent',
		meta: 'Project · inside Cherry Blossom',
		line: 'Cherry Blossom’s board agent: edits, simulates and checks a circuit board before it is ordered.',
		key: { figure: '15,000', label: 'past circuits it learns from' },
		facts: [{ figure: '15,000', text: 'past circuits in a vector database the agent searches before it designs or fixes a board.' }],
		notes: ['Built on the open-source kicad-happy (MIT) by Andrew Klofas and extended for Cherry Blossom, where that version runs privately.'],
		stack: ['Python', 'KiCad', 'Falstad', 'Vector search'],
		tags: ['python', 'agents', 'llm', 'hardware', 'vector', 'testing'],
		roles: ['ai'],
		links: [],
		demo: '/demos/cherry-hardware-agent.mp4',
		poster: '/demos/cherry-hardware-agent.webp',
	},
	{
		id: 'used-car-deal-finder',
		kind: 'project',
		title: 'Used-Car Deal Finder',
		meta: 'Project · Hack the North 2026',
		line: 'Finds underpriced used cars by pricing each listing against similar local ones. 2,000+ users.',
		key: { figure: '2,000+', label: 'users' },
		blurb: 'Finds underpriced used cars by pricing each listing against similar local ones. Built at Hack the North 2026.',
		facts: [{ figure: '2,000+', text: 'users.' }],
		notes: [
			'Built at Hack the North 2026.',
			'Rebuilt as a Go crawler and a Rust pricing engine (WebAssembly) on Cloudflare Workers.',
		],
		stack: ['Go', 'Rust', 'WebAssembly', 'Cloudflare'],
		tags: ['go', 'rust', 'wasm', 'cloudflare', 'automotive', 'hackathon', 'cloud', 'pipelines'],
		roles: ['backend', 'platform', 'fullstack'],
		links: [{ label: 'Dropio12/used-car-deal-finder', href: repo('used-car-deal-finder'), kind: 'code' }],
		image: {
			src: '/work/used-car-deal-finder/dashboard.webp',
			alt: 'The live Used-Car Deal Finder dashboard listing cars priced under the local market.',
			position: '0% 0%',
		},
		demo: '/demos/used-car-deal-finder.mp4',
		poster: '/demos/used-car-deal-finder.webp',
	},
	{
		id: 'neurovision',
		kind: 'project',
		title: 'NeuroVision',
		meta: 'Project · on GitHub',
		line: 'Predicts how an audience’s brain responds to a video and suggests edits.',
		key: { figure: '20,000+', label: 'neural response signals per second' },
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
		image: {
			src: '/work/valorant-spike-predictor/overlay-concept.webp',
			alt: 'Concept image of the Spike Predictor in-game overlay prototype: site odds, the last rounds and this round, over a Valorant scene. It is not a capture from a real match.',
			position: '50% 8%',
		},
		demo: '',
	},
	{
		id: 'flighto',
		kind: 'project',
		title: 'FlightO',
		meta: 'Project · on GitHub',
		line: 'Finds the cheapest flights for a trip through several cities: an exact search picks the visit order and the dates, in C++.',
		facts: [],
		stack: ['C++17', 'Dynamic programming', 'Travelpayouts API'],
		tags: ['cpp', 'travel'],
		roles: ['backend'],
		links: [{ label: 'Dropio12/FlightO', href: repo('FlightO'), kind: 'code' }],
		demo: '/demos/flighto.mp4',
		poster: '/demos/flighto.webp',
	},
	{
		id: 'translator-ai',
		kind: 'project',
		title: 'Translator-AI',
		meta: 'Project · on GitHub',
		line: 'Translates the text inside any photo. Built in Python at a 2022 hackathon, now rebuilt as an Android app in Kotlin with on-device ML Kit.',
		facts: [],
		stack: ['Kotlin', 'ML Kit', 'Python'],
		tags: ['kotlin', 'android', 'mobile', 'python', 'ocr', 'cv', 'ml', 'kivy'],
		roles: ['ai'],
		links: [
			{ label: 'Dropio12/Translator-AI', href: repo('Translator-AI'), kind: 'code' },
			{ label: 'The Python original', href: `${repo('Translator-AI')}/tree/v0-python`, kind: 'code' },
		],
		image: {
			src: '/work/translator-ai/pipeline.webp',
			alt: 'The Python version of Translator-AI reading a sample French sign with OCR and detecting that it is French.',
			position: '0% 0%',
		},
		demo: '/demos/translator-ai.mp4',
		poster: '/demos/translator-ai.webp',
	},
]

export const itemById = (id: string) => items.find(i => i.id === id)

/** the experience list in the terminal's `about`, by impact (same order as the Experience carousel) */
export const experienceOrder = [
	'shopify-visual-search',
	'shopify-infra-security',
	'scale-ai',
	'ia-financial',
	'intel-ambassador',
	'adobe-ambassador',
	'laval-ta',
]

export const clientWork = {
	title: 'Client deployments',
	meta: 'Side project · 2025 to 2026',
	line: 'AI tools built end to end for 4 business clients: immigration law firms, an architecture firm, Hotel Jaro.',
}

export type Degree = { degree: string; school: string; when: string; detail?: string }

export const education: Degree[] = [
	{ degree: 'M.Sc. Computer Science, Artificial Intelligence', school: 'Université Laval', when: 'In progress' },
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

/* ---------- the quiet strip under the hero ---------- */

/** where he has worked, as plain words: never logos */
export const workedAt = ['Shopify', 'Scale AI', 'iA Financial Group', 'Intel', 'Adobe']

export type Proof = { figure: string; label: string; /** the card that proves it (an item id) or a section id */ target: string }

export const proof: Proof[] = [
	{ figure: '20M+', label: 'Shop App users reached', target: 'shopify-visual-search' },
	{ figure: '55M+', label: 'images searched in under 3 s', target: 'shopify-visual-search' },
	{ figure: '10x', label: 'lower request latency', target: 'shopify-infra-security' },
	{ figure: '8', label: 'hackathon wins', target: 'education' },
]

/* ---------- per-job views: badredinne.com/?for=<slug> ---------- */

/** one of their posting's requirements, quoted word for word, and the work that answers it */
export type Match = { asked: string; did: string; item: string }

export type Tailored = {
	company: string
	role: string
	/** the role in a few words, for the greeting: "Backend Intern" */
	short?: string
	/** role chips picked on load */
	roles: Role[]
	/** tiles pinned first, in this order */
	pinned: string[]
	/** exactly 3 bullets; each one only restates facts from this file */
	why: string[]
	/** 3 rows: a requirement quoted from their posting, and the proof from this file; shown instead of `why` */
	matches?: Match[]
	/** questions this role's recruiter might ask the AI, offered under the answer */
	questions?: string[]
}

/** the reasons a per-job view can give, each one restating facts from this file */
const fit = {
	shop: 'He ships AI to real users at scale: at Shopify he took Shop App’s photo search from his hackathon win to 20M+ users.',
	shopSpeed:
		'He builds search that stays fast at scale: photo search over 55M+ images in under 3 seconds, with image embeddings, vector search and a self-hosted LLM.',
	shopOps:
		'He makes systems easy to run: at Shopify he built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals, with runbooks for on-call engineers.',
	infra: 'He works close to the infrastructure: at Shopify he cut internal request latency 10x by moving services from HTTP/1 to gRPC, and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.',
	redpanda: 'He works in systems code: his security-feature PR was merged into Redpanda’s open-source C++ code, unblocking Shopify’s data-streaming rollout.',
	law: 'He builds AI with and for clients: a document workflow used by 10+ immigration law firms, with 10,000+ documents processed and about 8 hours saved per client.',
	clients: 'He works directly with customers: he built AI tools end to end for 4 business clients, from immigration law firms to an architecture firm and Hotel Jaro.',
	rules: 'He builds retrieval over large bodies of rules: an agent that checks building designs against the building code, using RAG over tens of thousands of rules and answering in under 1 second.',
	voice: 'He has shipped a voice agent: Hotel Jaro’s front-desk voice AI agent handled 1,000+ guest calls, 80% of them with no staff involved.',
	agents: 'He measures agents, not just builds them: AgentGym, his self-improving agent framework, raised task success 38% over the base agent across 24,000 traces.',
	payroll: 'He automates the slow parts: at iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries with an automated Python/C# pipeline.',
	product: 'He builds whole products in TypeScript and React: Cherry Blossom, an AI agent that designs circuit boards from plain English, has 1,500+ monthly users and 10,000+ boards built.',
	lean: 'He ships lean web apps: the Used-Car Deal Finder, rebuilt as a Go crawler and a Rust pricing engine (WebAssembly) on Cloudflare Workers, has 2,000+ users.',
	multimodal: 'He works with multimodal models: NeuroVision runs a PyTorch pipeline over 20,000+ neural response signals per second to predict how an audience responds to a video.',
	review: 'He reads code carefully: at Scale AI he built 200+ coding tasks as AI training data and reviewed AI-written code in 4 languages.',
	hardware: 'He builds for physical products: Cherry Blossom’s board agent edits, simulates and checks a circuit board before it is ordered, drawing on 15,000 past circuits.',
}

export const tailored: Record<string, Tailored> = {
	harvey: {
		company: 'Harvey',
		role: 'Software Engineer, New Grad 2027',
		roles: ['ai', 'fullstack'],
		pinned: ['law-firm-workflow', 'architecture-rag-agent', 'shopify-visual-search', 'agentgym'],
		why: [fit.law, fit.rules, fit.shop],
	},
	'sierra-agent': {
		company: 'Sierra',
		role: 'Software Engineer, Agent (New Grad 2027)',
		roles: ['ai', 'fde'],
		pinned: ['hotel-jaro-voice', 'law-firm-workflow', 'shopify-visual-search', 'agentgym'],
		why: [fit.voice, fit.law, fit.shop],
	},
	'sierra-apx': {
		company: 'Sierra',
		role: 'APX (New Grad 2027)',
		roles: ['fde', 'ai'],
		pinned: ['law-firm-workflow', 'hotel-jaro-voice', 'architecture-rag-agent', 'shopify-visual-search'],
		why: [fit.clients, fit.voice, fit.shop],
	},
	'sierra-intern': {
		company: 'Sierra',
		role: 'Software Engineer Intern, Agent (Summer 2027)',
		roles: ['ai', 'fde'],
		pinned: ['hotel-jaro-voice', 'agentgym', 'shopify-visual-search', 'law-firm-workflow'],
		why: [fit.voice, fit.agents, fit.shop],
	},
	'netic-fde': {
		company: 'Netic',
		role: 'Forward Deployed Engineer, New Grad',
		roles: ['fde', 'ai'],
		pinned: ['hotel-jaro-voice', 'law-firm-workflow', 'architecture-rag-agent', 'shopify-visual-search'],
		why: [fit.voice, fit.law, fit.shop],
	},
	'netic-platform': {
		company: 'Netic',
		role: 'Software Engineer, Agent Platform (New Grad)',
		roles: ['ai', 'backend'],
		pinned: ['hotel-jaro-voice', 'agentgym', 'shopify-visual-search', 'shopify-infra-security'],
		why: [fit.voice, fit.agents, fit.infra],
	},
	decagon: {
		company: 'Decagon',
		role: 'Engineering Intern (Summer 2027)',
		roles: ['ai', 'fde'],
		pinned: ['hotel-jaro-voice', 'law-firm-workflow', 'agentgym', 'shopify-visual-search'],
		why: [fit.voice, fit.agents, fit.shop],
	},
	'domino-fde': {
		company: 'Domino Data Lab',
		role: 'Forward Deployed Engineer, New Grad 2027',
		roles: ['fde', 'ai'],
		pinned: ['law-firm-workflow', 'architecture-rag-agent', 'shopify-visual-search', 'agentgym'],
		why: [fit.law, fit.rules, fit.shop],
	},
	'domino-swe': {
		company: 'Domino Data Lab',
		role: 'Software Engineer, New Grad 2027',
		roles: ['backend', 'ai'],
		pinned: ['shopify-infra-security', 'shopify-visual-search', 'agentgym', 'used-car-deal-finder'],
		why: [fit.infra, fit.shopSpeed, fit.agents],
	},
	vercel: {
		company: 'Vercel',
		role: 'Software Engineering Intern (Summer 2027)',
		roles: ['frontend', 'fullstack'],
		pinned: ['cherry-blossom', 'used-car-deal-finder', 'shopify-visual-search', 'linea'],
		why: [fit.product, fit.lean, fit.shop],
	},
	palantir: {
		company: 'Palantir',
		role: 'Software Engineer, New Grad, Query Engines',
		roles: ['backend'],
		pinned: ['shopify-infra-security', 'shopify-visual-search', 'linea', 'flighto'],
		why: [fit.redpanda, fit.infra, fit.shopSpeed],
	},
	atlassian: {
		company: 'Atlassian',
		role: 'Software Engineer, 2027 Graduate (Canada)',
		roles: ['fullstack', 'backend'],
		pinned: ['shopify-visual-search', 'shopify-infra-security', 'cherry-blossom', 'ia-financial'],
		why: [fit.shop, fit.infra, fit.product],
	},
	'atlassian-intern': {
		company: 'Atlassian',
		role: 'Software Engineer Intern 2027 (Canada)',
		roles: ['fullstack', 'backend'],
		pinned: ['shopify-visual-search', 'ia-financial', 'cherry-blossom', 'shopify-infra-security'],
		why: [fit.shop, fit.payroll, fit.product],
	},
	cibc: {
		company: 'CIBC',
		role: 'AI Developer Co-op, Bilingual (Winter 2027)',
		roles: ['ai'],
		pinned: ['law-firm-workflow', 'architecture-rag-agent', 'agentgym', 'shopify-visual-search'],
		why: [fit.law, fit.rules, fit.agents],
	},
	otter: {
		company: 'Otter.ai',
		role: 'Software Engineer, Front-End (New Grad)',
		roles: ['frontend', 'fullstack'],
		pinned: ['cherry-blossom', 'used-car-deal-finder', 'hotel-jaro-voice', 'shopify-visual-search'],
		why: [fit.product, fit.lean, fit.voice],
	},
	freeform: {
		company: 'Freeform',
		role: 'Software Engineer (New Grad, Summer 2027)',
		roles: ['backend', 'ai'],
		pinned: ['cherry-hardware-agent', 'cherry-blossom', 'shopify-infra-security', 'flighto'],
		why: [fit.hardware, fit.redpanda, fit.product],
	},
	'lyft-backend': {
		company: 'Lyft',
		role: 'Software Engineer Intern, Backend (Summer 2027, Montreal)',
		roles: ['backend'],
		pinned: ['shopify-infra-security', 'shopify-visual-search', 'used-car-deal-finder', 'ia-financial'],
		why: [fit.infra, fit.shopSpeed, fit.payroll],
	},
	'lyft-ml': {
		company: 'Lyft',
		role: 'Software Engineer Intern, Machine Learning (Summer 2027, Toronto)',
		roles: ['ai'],
		pinned: ['shopify-visual-search', 'agentgym', 'neurovision', 'valorant-spike-predictor'],
		why: [fit.shopSpeed, fit.agents, fit.multimodal],
	},
	'nintendo-devops': {
		company: 'Nintendo',
		role: 'Software Engineer Intern, DevOps',
		roles: ['platform'],
		pinned: ['shopify-infra-security', 'shopify-visual-search', 'ia-financial', 'used-car-deal-finder'],
		why: [fit.infra, fit.shopOps, fit.payroll],
	},
	'nintendo-multimedia': {
		company: 'Nintendo',
		role: 'Software Engineer Intern, Multimedia',
		roles: ['ai'],
		pinned: ['shopify-visual-search', 'neurovision', 'translator-ai', 'agentgym'],
		why: [fit.shopSpeed, fit.multimodal, fit.shop],
	},
	'nintendo-it': {
		company: 'Nintendo',
		role: 'IT Software Engineer Intern',
		roles: ['fullstack'],
		pinned: ['cherry-blossom', 'ia-financial', 'used-car-deal-finder', 'shopify-visual-search'],
		why: [fit.product, fit.payroll, fit.lean],
	},
	sonos: {
		company: 'Sonos',
		role: 'Junior CI/CD Engineer',
		roles: ['platform'],
		pinned: ['shopify-infra-security', 'shopify-visual-search', 'ia-financial', 'scale-ai'],
		why: [fit.shopOps, fit.payroll, fit.review],
	},
	'amazon-cupertino': {
		company: 'Amazon',
		role: 'Software Development Engineer',
		roles: ['backend', 'ai'],
		pinned: ['shopify-infra-security', 'shopify-visual-search', 'flighto', 'cherry-blossom'],
		why: [fit.redpanda, fit.hardware, fit.shopSpeed],
	},
	'amd-collectives': {
		company: 'AMD',
		role: 'Distributed Systems Software Engineer, Collectives',
		roles: ['platform', 'backend'],
		pinned: ['shopify-infra-security', 'shopify-visual-search', 'neurovision', 'flighto'],
		why: [fit.redpanda, fit.infra, fit.shopOps],
	},
	'axon-intern': {
		company: 'Axon',
		role: '2027 US Software Engineering Internship (Dedrone)',
		roles: ['backend', 'fullstack'],
		pinned: ['shopify-visual-search', 'shopify-infra-security', 'ia-financial', 'used-car-deal-finder'],
		why: [fit.shop, fit.infra, fit.payroll],
	},
	'blackberry-qnx': {
		company: 'BlackBerry QNX',
		role: 'Application Engineering Student',
		roles: ['backend', 'ai'],
		pinned: ['cherry-hardware-agent', 'cherry-blossom', 'shopify-infra-security', 'flighto'],
		why: [fit.hardware, fit.redpanda, fit.infra],
	},
	'boston-scientific': {
		company: 'Boston Scientific',
		role: 'AI Solutions Engineering Intern',
		roles: ['ai', 'fullstack'],
		pinned: ['architecture-rag-agent', 'cherry-hardware-agent', 'law-firm-workflow', 'shopify-visual-search'],
		why: [fit.rules, fit.hardware, fit.law],
	},
	'disney-animation': {
		company: 'Walt Disney Animation Studios',
		role: 'Full Stack Web Development Intern, Summer 2027',
		roles: ['fullstack', 'platform'],
		pinned: ['shopify-visual-search', 'cherry-blossom', 'shopify-infra-security', 'ia-financial'],
		why: [fit.shopOps, fit.product, fit.infra],
	},
	draftkings: {
		company: 'DraftKings',
		role: 'Software Engineer (December 2026 Grads)',
		roles: ['backend', 'fullstack'],
		pinned: ['shopify-visual-search', 'shopify-infra-security', 'law-firm-workflow', 'cherry-blossom'],
		why: [fit.shop, fit.infra, fit.product],
	},
	exelixis: {
		company: 'Exelixis',
		role: 'Associate AI and Agentic Engineer',
		roles: ['ai', 'fullstack'],
		pinned: ['law-firm-workflow', 'architecture-rag-agent', 'agentgym', 'shopify-visual-search'],
		why: [fit.law, fit.rules, fit.agents],
	},
	'gm-av': {
		company: 'General Motors',
		role: '2027 Summer Intern - AI/ML Engineer - Autonomous Vehicles',
		roles: ['platform', 'ai'],
		pinned: ['shopify-infra-security', 'shopify-visual-search', 'used-car-deal-finder', 'agentgym'],
		why: [fit.infra, fit.shopOps, fit.agents],
	},
	golden: {
		company: 'Golden Analytics',
		role: 'Software Engineer Intern (Summer 2027)',
		roles: ['fullstack', 'ai'],
		pinned: ['shopify-visual-search', 'cherry-blossom', 'law-firm-workflow', 'used-car-deal-finder'],
		why: [fit.shop, fit.product, fit.clients],
	},
	kla: {
		company: 'KLA',
		role: 'Software Engineer Intern',
		roles: ['backend', 'platform'],
		pinned: ['shopify-visual-search', 'ia-financial', 'cherry-blossom', 'shopify-infra-security'],
		why: [fit.shopSpeed, fit.payroll, fit.hardware],
	},
	morningstar: {
		company: 'Morningstar',
		role: 'Associate Software Engineer - Central Tech AI',
		roles: ['ai', 'fullstack'],
		pinned: ['shopify-visual-search', 'law-firm-workflow', 'used-car-deal-finder', 'ia-financial'],
		why: [fit.shop, fit.law, fit.payroll],
	},
	'nvidia-ai-systems': {
		company: 'NVIDIA',
		role: 'AI Systems Software Engineering Intern - Summer 2027',
		roles: ['ai', 'backend'],
		pinned: ['agentgym', 'shopify-visual-search', 'flighto', 'scale-ai'],
		why: [fit.agents, fit.shopSpeed, fit.review],
	},
	'path-robotics': {
		company: 'Path Robotics',
		role: 'Machine Learning & Robotics Intern',
		roles: ['ai', 'backend'],
		pinned: ['agentgym', 'shopify-visual-search', 'shopify-infra-security', 'flighto'],
		why: [fit.agents, fit.shopSpeed, fit.redpanda],
	},
	pure: {
		company: 'Pure',
		role: 'iOS / UI Engineer',
		roles: ['frontend', 'fullstack'],
		pinned: ['shopify-visual-search', 'cherry-blossom', 'used-car-deal-finder', 'translator-ai'],
		why: [fit.shop, fit.product, fit.lean],
	},
	'soti-xsight': {
		company: 'SOTI',
		role: 'Software Developer Intern - SOTI XSight (May 2027, 12 Months)',
		roles: ['backend', 'fullstack'],
		pinned: ['shopify-visual-search', 'shopify-infra-security', 'ia-financial', 'flighto'],
		why: [fit.shop, fit.infra, fit.payroll],
	},
	startree: {
		company: 'StarTree',
		role: 'Software Engineer I',
		roles: ['backend', 'platform'],
		pinned: ['shopify-infra-security', 'shopify-visual-search', 'used-car-deal-finder', 'linea'],
		why: [fit.redpanda, fit.shopSpeed, fit.shopOps],
	},
}
// each view's requirement rows, short role and questions are in jobs.ts; views.ts joins the two

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
		answer: `Happy to get that sorted. Anass talks about pay personally, so the fastest route is a quick email to ${person.email}, and he answers himself.`,
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
		answer: `Good one to settle early. Anass answers work-status questions himself so the answer fits your country exactly: email him at ${person.email}.`,
	},
	{
		id: 'references',
		patterns: ['reference', 'referee', 'recommendation letter', 'vouch'],
		answer: `Of course. Email Anass at ${person.email} and he will put you in touch with his references.`,
	},
	{
		id: 'personal',
		patterns: ['\\bage\\b', 'how old', 'religio', 'married', 'marital', 'ethnic', 'gender', '\\bkids\\b', 'pregnan', 'disabilit', 'health'],
		answer: `This page is all about his work, so it doesn't cover that. For anything else, ${emailLine}`,
	},
]

export const privacyNote = {
	local: 'Answers are generated from this page’s facts.',
	ai: 'Questions you ask are answered by an AI model; we do not store them.',
}
