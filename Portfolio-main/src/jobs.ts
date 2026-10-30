// What each per-job view (?for=<slug>) adds to its entry in content.ts: the role in a few words for the
// greeting, three of their posting's requirements quoted word for word beside the proof from this site,
// and two questions for the AI. For a new job, add its entry here by hand: the quote must be copied
// exactly from the posting, and the proof may only restate facts already in content.ts or deep.ts.
import type { Tailored } from './content'

export const jobs: Record<string, Pick<Tailored, 'short' | 'matches' | 'questions'>> = {
	harvey: {
		short: 'New Grad Software Engineer',
		questions: ['How did he build the law-firm workflow?', 'Has he built RAG over documents?'],
		matches: [
			{
				asked: "build the AI-powered systems that serve the world's leading law firms",
				did: 'Built an AI workflow that reads and fills immigration forms; 10+ law firms use it, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'retrieval over large document collections',
				did: "Built an AI agent that uses RAG over tens of thousands of building-code rules and answers an architect's question in under 1 second.",
				item: 'architecture-rag-agent',
			},
			{
				asked: "You've built something start to finish",
				did: "Took Shop App's photo search from his hackathon win to launch in 6 weeks with a 10-person team he co-led, reaching 20M+ users.",
				item: 'shopify-visual-search',
			},
		],
	},
	'sierra-agent': {
		short: 'Agent Software Engineer',
		questions: ['What voice agents has he built?', 'Has he worked directly with customers?'],
		matches: [
			{
				asked: 'building or deploying AI/LLM systems in production',
				did: "Built a voice AI agent for Hotel Jaro's front desk that has handled 1,000+ guest calls, 80% of them with no staff involved.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'Experience building and scaling end-to-end production systems',
				did: "Took Shop App's photo search from his hackathon win to 20M+ users, matching each photo across 55M+ images in under 3 seconds.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Comfort working directly with customers to understand their needs and solve real-world problems',
				did: 'Scoped a building-code agent with an architecture firm, visited their office to see how architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
		],
	},
	'sierra-apx': {
		short: 'APX New Grad',
		questions: ['What has he built for clients?', 'Has he used React and TypeScript?'],
		matches: [
			{
				asked: 'Build and ship AI agents with Sierra’s customers in a fast-paced, production environment',
				did: "Built and shipped a voice AI agent that answers guest calls at Hotel Jaro's front desk: 1,000+ calls, 80% handled with no staff.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'Professional experience in software engineering or product management, especially with customer-facing responsibilities',
				did: 'Built AI tools end to end for 4 business clients, including a document workflow now used by 10+ immigration law firms.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Expertise in React, TypeScript, Python, Go, and other modern programming languages',
				did: "Wrote Cherry Blossom's TypeScript backend on Convex for its React app, where an AI agent designs circuit boards for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
		],
	},
	'sierra-intern': {
		short: 'Agent Software Engineer Intern',
		questions: ['How does AgentGym measure agents?', 'What voice agents has he built?'],
		matches: [
			{
				asked: 'building or deploying AI/LLM systems in production',
				did: "Built Hotel Jaro's front-desk voice agent with Whisper, ElevenLabs and Twilio; it has handled 1,000+ guest calls, 80% with no staff.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'eval frameworks, agent tooling, RAG pipelines, and prompt engineering',
				did: 'Built AgentGym, a self-improving agent framework that scores each run and learns from failures, raising task success 38% across 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'find creative ways to overcome obstacles and ship',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	'netic-fde': {
		short: 'Forward Deployed Engineer',
		questions: ['How does the hotel voice agent work?', 'Has he worked directly with customers?'],
		matches: [
			{
				asked: 'Hands-on experience with LLM, TTS and speech APIs',
				did: "Built Hotel Jaro's front-desk voice agent with Whisper for speech to text, ElevenLabs for the voice and Twilio for calls: 1,000+ guest calls handled.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'Work directly with enterprise stakeholders to map workflows and deploy our product',
				did: 'Scoped a building-code agent with an architecture firm, visited their office to see how architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Build reliable systems that support thousands of concurrent interactions with strong performance',
				did: "Took Shop App's photo search to 20M+ users, searching 55M+ images in under 3 seconds with image embeddings and vector search.",
				item: 'shopify-visual-search',
			},
		],
	},
	'netic-platform': {
		short: 'Agent Platform Software Engineer',
		questions: ['How does AgentGym improve agents?', 'Has he used FastAPI and asyncio?'],
		matches: [
			{
				asked: 'eval loops agents use to test and validate their own outputs',
				did: 'Built AgentGym, which logs every step of every agent run, scores each run and turns failures into training data, raising task success 38%.',
				item: 'agentgym',
			},
			{
				asked: 'Comfort with Python (asyncio, FastAPI) and TypeScript (Node, React)',
				did: 'Wrote Python services with FastAPI and asyncio and a multilingual React questionnaire app for a form workflow used by 10+ immigration law firms.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'LLM APIs, eval frameworks, RAG, or agent frameworks (LangChain, MCP, or similar)',
				did: "Built the agent harness for Cherry Blossom's AI agent on LangChain and CrewAI, with GraphRAG and vector search over Pinecone; 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
		],
	},
	decagon: {
		short: 'Engineering Intern',
		questions: ['What voice agents has he built?', 'How did AI agents speed up photo search?'],
		matches: [
			{
				asked: 'deploys mission-critical AI agents to our customers',
				did: "Built a voice AI agent that answers guest calls at Hotel Jaro's front desk; it has handled 1,000+ calls, 80% with no staff involved.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'Experience using AI coding agents as part of development',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight, hitting the speed target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience with distributed systems, data pipelines, or production infrastructure',
				did: "Moved Shopify's internal services from HTTP/1 to gRPC, cutting internal request latency 10x, and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.",
				item: 'shopify-infra-security',
			},
		],
	},
	'domino-fde': {
		short: 'Forward Deployed Engineer',
		questions: ['What has he built for clients?', 'Has he built RAG pipelines?'],
		matches: [
			{
				asked: 'move quickly from an ambiguous customer problem to a real solution',
				did: 'Scoped a building-code agent with an architecture firm in a design doc, then built it with RAG to answer in under 1 second.',
				item: 'architecture-rag-agent',
			},
			{
				asked: "a software solution that automates a customer's internal processes",
				did: 'Built a workflow that reads and fills immigration forms for 10+ law firms, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'building applied AI systems such as RAG pipelines, agentic workflows, or model evaluation',
				did: 'Built AgentGym, an agent framework that scores every run and learns from failures; measured on 24,000 traces, task success rose 38% over the base agent.',
				item: 'agentgym',
			},
		],
	},
	'domino-swe': {
		short: 'New Grad Software Engineer',
		questions: ['Has he used gRPC?', 'What back-end work has he done at scale?'],
		matches: [
			{
				asked: 'Python, Go, TypeScript, React, GraphQL, Kubernetes, Docker, Postgres, Redis, Kafka',
				did: "Took Shop App's photo search to 20M+ users on a stack of Rails, GraphQL, Postgres, Docker and Kubernetes, matching 55M+ images in under 3 seconds.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'from backend services and APIs, to frontend features',
				did: 'Built AgentGym end to end: a FastAPI proxy and API, Celery workers on Postgres and Redis Streams, and a Next.js dashboard.',
				item: 'agentgym',
			},
			{
				asked: 'contributing to scalable enterprise systems',
				did: "Moved Shopify's internal services from HTTP/1 to gRPC, cutting internal request latency 10x, and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.",
				item: 'shopify-infra-security',
			},
		],
	},
	vercel: {
		short: 'Software Engineering Intern',
		questions: ['What has he built in TypeScript?', 'What did he merge into Redpanda?'],
		matches: [
			{
				asked: 'Built and shipped at least one project in JavaScript or TypeScript',
				did: "Wrote Cherry Blossom's TypeScript backend on Convex; its AI agent designs circuit boards from plain English for 1,500+ monthly users, with 10,000+ boards built.",
				item: 'cherry-blossom',
			},
			{
				asked: 'can explain and debug every line you ship',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, catching bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
			{
				asked: 'Have contributed a merged pull request to an open-source project',
				did: "Got a security-feature pull request merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
		],
	},
	palantir: {
		short: 'Query Engines Software Engineer',
		questions: ['What did he contribute to Redpanda?', 'How does FlightO find the cheapest trip?'],
		matches: [
			{
				asked: 'Contributions to open-source projects',
				did: "Got a security-feature pull request merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Proficiency in at least one language such as Java, Rust, Scala, C++, or C',
				did: 'Wrote FlightO in C++17: an exact Held-Karp dynamic-programming search that plans 8 cities over a 90-day window in about 20 ms.',
				item: 'flighto',
			},
			{
				asked: 'A practical approach to performance, grounded in measurement rather than intuition',
				did: 'He ran AI agents overnight to test photo-search approaches, hitting the under-3-second target over 55M+ images in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	atlassian: {
		short: 'Graduate Software Engineer',
		questions: ['What did he ship at Shopify?', 'Has he built agentic AI systems?'],
		matches: [
			{
				asked: 'Take ownership of features from design through deployment',
				did: "Co-led Shop App's photo search from design docs to launch in 6 weeks, rolled out behind feature flags and an A/B test to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Tackle challenging issues related to distributed systems, data processing',
				did: "Moved Shopify's internal services from HTTP/1 to gRPC, cutting internal request latency 10x, and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Exposure to agentic AI systems, autonomous agents',
				did: "Built the agent harness for Cherry Blossom's AI agent on LangChain and CrewAI; it designs circuit boards from plain English for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
		],
	},
	'atlassian-intern': {
		short: 'Software Engineer Intern',
		questions: ['What did he ship at Shopify?', 'Has he built an MCP server?'],
		matches: [
			{
				asked: 'dream up and code new features that can be shipped straight into our products',
				did: "His Shopify hackathon win became Shop App's photo search, shipped in 6 weeks and rolled out to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Proficiency in Java, Python, C, C++, or other object-oriented programming languages',
				did: "Cut iA Financial Group's payroll processing time 87% for 17,000+ weekly salaries with an automated pipeline in Python and C#.",
				item: 'ia-financial',
			},
			{
				asked: 'emerging AI technologies (MCP, agentic AI)',
				did: 'Built an MCP server for Linea that combines GraphRAG and vector search over 500K+ building-code and permit nodes.',
				item: 'linea',
			},
		],
	},
	cibc: {
		short: 'AI Developer Co-op',
		questions: ['Has he connected AI to business workflows?', 'What AI tools has he built?'],
		matches: [
			{
				asked: 'experience connecting AI solutions to business workflows',
				did: 'Wrote the Python services and the Gemini step that explains and auto-fills each immigration form field, in a workflow used by 10+ law firms.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Support the design, development, and improvement of artificial intelligence tools, prompts, and personas',
				did: "Built AgentGym, which learns from an agent's failures and either retrains its model or gives it a better system prompt, raising task success 38%.",
				item: 'agentgym',
			},
			{
				asked: 'test new ideas, gather feedback, and continuously refine tools and processes',
				did: 'Scoped a building-code agent with an architecture firm, visited their office to see how architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
		],
	},
	otter: {
		short: 'Front-End Engineer',
		questions: ['What has he built in React?', 'How did he review code at Scale AI?'],
		matches: [
			{
				asked: 'experience developing single-page web apps using a JavaScript framework',
				did: 'Wrote a multilingual React and TypeScript questionnaire app for an immigration form workflow now used by 10+ law firms.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'writing clean, reusable, optimized HTML/CSS, Typescript and JavaScript',
				did: 'Built the Used-Car Deal Finder, now at 2,000+ users, including its HTML, CSS and JavaScript dashboard on Cloudflare Pages.',
				item: 'used-car-deal-finder',
			},
			{
				asked: 'lead code review sessions to maintain high-quality code',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, including JavaScript/React, catching bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
		],
	},
	freeform: {
		short: 'New Grad Software Engineer',
		questions: ['What hardware work has he done?', 'Where has he written C++?'],
		matches: [
			{
				asked: 'programming with C/C++ or Rust',
				did: "During his Shopify internship he got a security-feature pull request merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'hardware that operates with the physical world',
				did: "Extended open-source KiCad review scripts into Cherry Blossom's board agent, which edits, simulates and checks a circuit board before it is ordered.",
				item: 'cherry-hardware-agent',
			},
			{
				asked: 'Implement processes for converting customer part geometries into machine print instructions',
				did: 'Cherry Blossom, his AI circuit-board design tool, exports each board as Gerbers, drill files and pick-and-place files ready for any board house.',
				item: 'cherry-blossom',
			},
		],
	},
	'lyft-backend': {
		short: 'Backend Intern',
		questions: ['Has he used gRPC?', 'What back-end work has he done at scale?'],
		matches: [
			{
				asked: 'Experience solving real-time technology problems',
				did: "Took Shop App's photo search to 20M+ users, finding similar products across 55M+ images in under 3 seconds.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Contributions to open source projects',
				did: "Got a security-feature pull request merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Experience working with databases',
				did: "Rebuilt iA Financial Group's payroll processing as a Python/C# pipeline on SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.",
				item: 'ia-financial',
			},
		],
	},
	'lyft-ml': {
		short: 'Machine Learning Intern',
		questions: ['What ML models has he built?', 'How does AgentGym improve agents?'],
		matches: [
			{
				asked: 'Write production-level code to convert ML models into working pipelines',
				did: "Built the image-matching engine and AI query step for Shop App's photo search: image embeddings and vector search over 55M+ images in under 3 seconds.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Proven ability to effectively turn research ML papers into working code',
				did: "Built AgentGym on Hindsight Experience Replay and DPO: it learns from an agent's failures, raising task success 38% across 24,000 traces.",
				item: 'agentgym',
			},
			{
				asked: 'knowledge of ML libraries like scikit-learn, Tensorflow, PyTorch',
				did: "Built NeuroVision's multimodal PyTorch pipeline, which turns video and audio into 20,000+ neural response signals per second.",
				item: 'neurovision',
			},
		],
	},
	'nintendo-devops': {
		short: 'DevOps Intern',
		questions: ['Has he done monitoring and on-call?', 'Has he built CI/CD pipelines?'],
		matches: [
			{
				asked: 'Experience with Continuous Integration & Continuous Delivery services',
				did: 'At iA Financial Group he built CI/CD pipelines with Buildkite and Yarn, so changes were built, tested and shipped automatically.',
				item: 'ia-financial',
			},
			{
				asked: 'CI infrastructure revolving around automation, observability & metrics',
				did: 'At Shopify he built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals through Prometheus, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience with Terraform, CDK, or equivalent infrastructure deployment language',
				did: "Wrote Terraform to manage infrastructure as code on Shopify's Infrastructure Security team and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.",
				item: 'shopify-infra-security',
			},
		],
	},
	'nintendo-multimedia': {
		short: 'Multimedia Intern',
		questions: ['Has he worked with computer vision?', 'What has he built with video?'],
		matches: [
			{
				asked: 'Familiarity with Computer Vision',
				did: "Built the image-matching engine for Shop App's photo search: each photo becomes an image embedding, matched across 55M+ images in under 3 seconds.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Strong knowledge of software engineering fundamentals',
				did: 'Wrote FlightO in C++17: an exact Held-Karp dynamic-programming search that plans 8 cities over a 90-day window in about 20 ms.',
				item: 'flighto',
			},
			{
				asked: 'An effective communicator with strong writing skills',
				did: 'Taught 1,500+ students AI tools in hands-on workshops at 10+ universities and hackathons, across his Intel and Adobe ambassador roles.',
				item: 'intel-ambassador',
			},
		],
	},
	'nintendo-it': {
		short: 'IT Software Engineer Intern',
		questions: ['What web apps has he built?', 'Has he worked in a DevOps setup?'],
		matches: [
			{
				asked: 'develop, design and implement internal/external web-based application features',
				did: 'Wrote the TypeScript backend on Convex and designed the data schema for Cherry Blossom, a web app with 1,500+ monthly users.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Preferred programming languages include Java, Python, JavaScript, and TypeScript',
				did: 'At Scale AI he reviewed AI-written code in Python, JavaScript/React, Java and C++, catching bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
			{
				asked: 'Partner closely with the team in a DevOps environment',
				did: 'At iA Financial Group he built CI/CD pipelines with Buildkite and an automated Python/C# payroll pipeline that cut processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
		],
	},
	sonos: {
		short: 'Junior CI/CD Engineer',
		questions: ['Has he built CI/CD pipelines?', 'Has he done monitoring and on-call?'],
		matches: [
			{
				asked: 'Hands-on experience with CI/CD tools such as Jenkins or GitHub Actions',
				did: 'At iA Financial Group he built CI/CD pipelines with Buildkite and Yarn, so changes were built, tested and shipped automatically.',
				item: 'ia-financial',
			},
			{
				asked: 'Monitoring, dashboards and data visualization of test and performance metrics',
				did: "Built 9 Grafana dashboards and 50+ alerts from 300+ telemetry signals for Shop App's photo search, with runbooks for on-call engineers.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Basic programming experience with Python and/or Bash',
				did: 'At Shopify he worked day to day in Linux and Bash, writing scripts and using kubectl to get into Kubernetes pods, and wrote Terraform.',
				item: 'shopify-infra-security',
			},
		],
	},
}
