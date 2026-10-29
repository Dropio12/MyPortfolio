import { Role } from '../content'

// The words the site understands: every tag an item can carry, and the phrases that detect it
// in a question or a pasted job posting. Patterns are case-insensitive regex sources.

export type TagGroup = 'tech' | 'skill' | 'domain'

export type Tag = {
	id: string
	label: string
	group: TagGroup
	patterns: string[]
	/** how much a match on this tag counts when ranking work for a posting */
	weight?: number
}

export const tags: Tag[] = [
	// languages and frameworks
	{ id: 'python', label: 'Python', group: 'tech', patterns: ['\\bpython\\b', '\\bpandas\\b', '\\bnumpy\\b'] },
	{ id: 'typescript', label: 'TypeScript', group: 'tech', patterns: ['typescript'] },
	{ id: 'javascript', label: 'JavaScript', group: 'tech', patterns: ['javascript', '\\bjs\\b', 'ecmascript'] },
	{ id: 'react', label: 'React', group: 'tech', patterns: ['\\breact(\\.js|js)?\\b'] },
	{ id: 'go', label: 'Go', group: 'tech', patterns: ['\\bgolang\\b', '\\bgo(?=\\s*[,/)]|\\s+(and|or)\\s)', '(?<=[,(/]\\s?)go\\b'] },
	{ id: 'rust', label: 'Rust', group: 'tech', patterns: ['\\brust\\b'] },
	{ id: 'wasm', label: 'WebAssembly', group: 'tech', patterns: ['webassembly', '\\bwasm\\b'] },
	{ id: 'cpp', label: 'C++', group: 'tech', patterns: ['c\\+\\+', '\\bcpp\\b'] },
	{ id: 'csharp', label: 'C#', group: 'tech', patterns: ['c#', '\\.net\\b', 'dotnet'] },
	{ id: 'java', label: 'Java', group: 'tech', patterns: ['\\bjava\\b(?!\\s*script)'] },
	{ id: 'qt', label: 'Qt6', group: 'tech', patterns: ['\\bqt\\s?6?\\b'] },
	{ id: 'pytorch', label: 'PyTorch', group: 'tech', patterns: ['pytorch', '\\btorch\\b'] },
	{ id: 'xgboost', label: 'XGBoost', group: 'tech', patterns: ['xgboost', 'gradient boost'] },
	{ id: 'optuna', label: 'Optuna', group: 'tech', patterns: ['optuna', 'hyperparameter'] },
	{ id: 'fastapi', label: 'FastAPI', group: 'tech', patterns: ['fastapi'] },
	{ id: 'kivy', label: 'Kivy', group: 'tech', patterns: ['\\bkivy\\b'] },
	// infrastructure
	{ id: 'grpc', label: 'gRPC', group: 'tech', patterns: ['grpc', 'protobuf', 'protocol buffers'], weight: 2 },
	{ id: 'gcp', label: 'Google Cloud', group: 'tech', patterns: ['google cloud', '\\bgcp\\b'] },
	{ id: 'aws', label: 'AWS', group: 'tech', patterns: ['\\baws\\b', 'amazon web services', '\\bs3\\b', '\\blambda\\b'] },
	{ id: 'cloudflare', label: 'Cloudflare Workers', group: 'tech', patterns: ['cloudflare', 'edge computing'] },
	{ id: 'cloud', label: 'Cloud', group: 'tech', patterns: ['\\bcloud\\b'], weight: 0.5 },
	{ id: 'redis', label: 'Redis', group: 'tech', patterns: ['\\bredis\\b'] },
	{ id: 'convex', label: 'Convex', group: 'tech', patterns: ['\\bconvex\\b'] },
	{ id: 'grafana', label: 'Grafana', group: 'tech', patterns: ['grafana', 'dashboards?'] },
	{ id: 'prometheus', label: 'Prometheus', group: 'tech', patterns: ['prometheus'] },
	{ id: 'terraform', label: 'Terraform', group: 'tech', patterns: ['terraform', 'infrastructure as code', '\\biac\\b'] },
	{
		id: 'cicd',
		label: 'CI/CD',
		group: 'skill',
		patterns: ['ci ?/ ?cd', '\\bci\\b', 'continuous (integration|delivery|deployment)', 'buildkite', 'github actions', 'jenkins', 'deploy(ment)? pipelines?'],
	},
	{
		id: 'observability',
		label: 'Monitoring and on-call',
		group: 'skill',
		patterns: ['observability', 'monitoring', 'alerting', '\\balerts?\\b', 'on-?call', '\\bsre\\b', 'telemetry', 'incident', 'reliability'],
		weight: 1.5,
	},
	{ id: 'streaming', label: 'Data streaming', group: 'tech', patterns: ['streaming', '\\bkafka\\b', 'redpanda', 'event-driven'] },
	{
		id: 'networking',
		label: 'Network security',
		group: 'skill',
		patterns: ['firewall', 'network security', '\\bvpc\\b', 'zero trust', 'networking', '\\bhttp/?[123]?\\b', 'latency'],
		weight: 1.5,
	},
	// AI
	{ id: 'llm', label: 'LLMs', group: 'tech', patterns: ['\\bllms?\\b', 'large language model', 'language models?', '\\bgpt', 'generative ai', '\\bgenai\\b', 'prompt'] },
	{ id: 'rag', label: 'RAG', group: 'tech', patterns: ['\\brag\\b', 'retrieval', 'knowledge base'], weight: 2 },
	{ id: 'graphrag', label: 'GraphRAG', group: 'tech', patterns: ['graph ?rag', 'knowledge graph'], weight: 2 },
	{ id: 'vector', label: 'Vector search', group: 'tech', patterns: ['vector', 'pgvector', 'pinecone', 'faiss', 'similarity search'], weight: 2 },
	{ id: 'embeddings', label: 'Embeddings', group: 'tech', patterns: ['embeddings?'] },
	{ id: 'mcp', label: 'MCP', group: 'tech', patterns: ['\\bmcp\\b', 'model context protocol'], weight: 2 },
	{ id: 'agents', label: 'AI agents', group: 'tech', patterns: ['\\bagents?\\b', 'agentic', 'langchain', 'langgraph', 'tool use', 'tool calling'], weight: 1.5 },
	{ id: 'autogen', label: 'AutoGen', group: 'tech', patterns: ['autogen'] },
	{ id: 'crewai', label: 'CrewAI', group: 'tech', patterns: ['crew ?ai'] },
	{ id: 'dpo', label: 'DPO', group: 'tech', patterns: ['\\bdpo\\b', 'preference optimi[sz]ation', 'rlhf', 'post-?training', 'fine-?tun'] },
	{ id: 'rl', label: 'Reinforcement learning', group: 'tech', patterns: ['reinforcement learning', '\\brl\\b', 'experience replay'] },
	{ id: 'diffusion', label: 'Diffusion models', group: 'tech', patterns: ['diffusion', 'image generation'] },
	{ id: 'ml', label: 'Machine learning', group: 'tech', patterns: ['machine learning', '\\bml\\b', 'deep learning', 'model training', 'data science', 'neural'] },
	{ id: 'cv', label: 'Computer vision', group: 'tech', patterns: ['computer vision', '\\bimages?\\b', '\\bvision\\b', 'visual', '\\bphoto'] },
	{ id: 'ocr', label: 'OCR', group: 'tech', patterns: ['\\bocr\\b', 'text recognition'] },
	{ id: 'voice', label: 'Voice AI', group: 'tech', patterns: ['voice', 'speech', 'telephony', '\\baudio\\b', 'phone calls?'] },
	{ id: 'whisper', label: 'Whisper', group: 'tech', patterns: ['whisper'] },
	{ id: 'twilio', label: 'Twilio', group: 'tech', patterns: ['twilio'] },
	{ id: 'search', label: 'Search', group: 'skill', patterns: ['\\bsearch\\b', 'ranking', 'recommendation'] },
	// practice
	{ id: 'security', label: 'Security', group: 'skill', patterns: ['security', 'secure', 'vulnerab', 'appsec', 'infosec', 'threat'], weight: 1.5 },
	{ id: 'privacy', label: 'Privacy', group: 'skill', patterns: ['privacy', 'personal data', '\\bpii\\b', 'gdpr', 'compliance'], weight: 1.5 },
	{ id: 'opensource', label: 'Open source', group: 'skill', patterns: ['open[- ]source', '\\boss\\b'] },
	{ id: 'pipelines', label: 'Data pipelines', group: 'skill', patterns: ['pipelines?', '\\betl\\b', 'automation', 'automate', 'workflows?', 'batch'] },
	{ id: 'documents', label: 'Document processing', group: 'skill', patterns: ['documents?', 'contract (review|analysis|drafting)', 'paperwork', '\\bpdfs?\\b'] },
	{ id: 'databases', label: 'Databases', group: 'skill', patterns: ['database', '\\bsql\\b', 'postgres', 'mysql'] },
	{ id: 'codereview', label: 'Code review', group: 'skill', patterns: ['code review', 'reviewing code', 'code quality'] },
	{ id: 'testing', label: 'Testing', group: 'skill', patterns: ['testing', 'unit tests?', 'test coverage', 'verification'] },
	{ id: 'git', label: 'Git', group: 'tech', patterns: ['\\bgit\\b', 'github'] },
	{ id: 'teaching', label: 'Teaching and workshops', group: 'skill', patterns: ['teach', 'workshops?', 'mentor', 'presentations?', 'communicat', 'evangel', 'developer relations', 'devrel'] },
	{ id: 'customers', label: 'Working with clients', group: 'skill', patterns: ['customers?', 'clients?', 'stakeholders?', 'client-facing', 'customer-facing'] },
	{ id: 'leadership', label: 'Team leadership', group: 'skill', patterns: ['lead(ing|ership)?\\b', 'cross-functional', 'product managers?', '\\bpms?\\b', 'designers?', 'ownership'] },
	{ id: 'hackathon', label: 'Hackathons', group: 'skill', patterns: ['hackathons?'] },
	// domains
	{ id: 'legal', label: 'Legal', group: 'domain', patterns: ['legal', '\\blaw\\b', 'lawyers?', 'attorneys?', 'law firms?', 'litigation'], weight: 2.5 },
	{ id: 'finance', label: 'Finance', group: 'domain', patterns: ['financ', 'fintech', 'trading', 'banking', '\\bbank\\b', 'insurance', 'payroll', 'quant'], weight: 1.5 },
	{ id: 'hospitality', label: 'Hospitality', group: 'domain', patterns: ['hotel', 'hospitality', 'front desk'], weight: 2 },
	{ id: 'ecommerce', label: 'E-commerce', group: 'domain', patterns: ['e-?commerce', 'retail', 'shopping', 'merchants?', 'commerce', 'shopify'], weight: 1.5 },
	{ id: 'hardware', label: 'Hardware and PCBs', group: 'domain', patterns: ['hardware', '\\bpcbs?\\b', 'circuit', 'electronics', 'embedded'], weight: 2 },
	{ id: 'construction', label: 'Building codes', group: 'domain', patterns: ['building codes?', 'construction', 'architecture firm', 'architects?\\b', 'proptech', 'real estate', 'permits?', 'floor plans?'], weight: 2 },
	{ id: 'automotive', label: 'Cars', group: 'domain', patterns: ['automotive', '\\bcars?\\b', 'vehicles?', 'marketplace', 'pricing'], weight: 1.5 },
	{ id: 'gaming', label: 'Games', group: 'domain', patterns: ['gaming', '\\bgames?\\b', 'esports', 'valorant'], weight: 1.5 },
	{ id: 'media', label: 'Video', group: 'domain', patterns: ['video', '\\bmedia\\b', 'creators?', 'neuro', 'brain'], weight: 1.5 },
	{ id: 'travel', label: 'Travel', group: 'domain', patterns: ['travel', 'flights?', 'vacation', 'trips?'], weight: 1.5 },
	{ id: 'education', label: 'Education', group: 'domain', patterns: ['education', 'edtech', 'students?', 'universit'], weight: 1 },
]

export const tagById: Record<string, Tag> = Object.fromEntries(tags.map(t => [t.id, t]))

export const roleWords: Record<Role, string[]> = {
	fde: [
		'forward[- ]deployed',
		'\\bfde\\b',
		'solutions? (engineer|architect)',
		'deployment (strategist|engineer)',
		'customer engineer',
		'implementation engineer',
		'client-facing',
		'customer-facing',
		'for clients',
		'with clients',
		'with customers',
	],
	fullstack: ['full[- ]?stack', 'end[- ]to[- ]end', 'product engineer'],
	backend: ['back[- ]?end', 'server[- ]side', '\\bapis?\\b', 'distributed systems', 'microservices', 'scalab', 'at scale', 'systems engineer'],
	frontend: ['front[- ]?end', '\\bui\\b', 'user interface', '\\bweb app'],
	security: ['security', 'appsec', 'infosec', 'vulnerab', 'privacy', 'secure'],
	platform: ['platform', 'infrastructure', '\\binfra\\b', 'devops', '\\bsre\\b', 'site reliability', 'on-?call', 'monitoring', 'observability', '\\bcloud\\b'],
	ai: [
		'\\bai\\b',
		'\\bml\\b',
		'machine learning',
		'\\bllms?\\b',
		'genai',
		'generative',
		'applied ai',
		'\\bagents?\\b',
		'agentic',
		'\\bnlp\\b',
		'computer vision',
		'\\brag\\b',
		'models?\\b',
	],
}

const compiled = new Map<string, RegExp>()
export const rx = (source: string) => {
	let r = compiled.get(source)
	if (!r) {
		try {
			r = new RegExp(source, 'i')
		} catch {
			// a pattern the browser cannot parse (old engines and lookbehind) just never matches
			r = /$^/
		}
		compiled.set(source, r)
	}
	return r
}

export const matchesAny = (text: string, patterns: string[]) => patterns.some(p => rx(p).test(text))
