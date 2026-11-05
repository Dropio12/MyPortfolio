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
	'amazon-cupertino': {
		short: 'Software Development Engineer',
		questions: ['Where has he written C++?', 'What hardware work has he done?'],
		matches: [
			{
				asked: 'Write clean, maintainable code (C, C++, Python, or Rust)',
				did: "During his Shopify internship he got a security-feature pull request merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'leverage GenAI tools to enhance development productivity',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight, hitting the under-3-second target over 55M+ images in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'hardware-adjacent development',
				did: 'He built Cherry Blossom, an AI circuit-board design tool with 1,500+ monthly users that checks every AI edit before export, and 94% of its boards work on the first manufacturing run.',
				item: 'cherry-blossom',
			},
		],
	},
	'amd-collectives': {
		short: 'Distributed Systems Engineer',
		questions: ['What did he contribute to Redpanda?', 'What performance work has he done?'],
		matches: [
			{
				asked: 'work with internal teams and open-source communities to get changes reviewed and integrated',
				did: "During his Shopify internship he got a security-feature pull request merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'comfortable profiling and debugging performance issues',
				did: 'To get photo search under 3 seconds across 55M+ images, his team accepted a 5% drop in matching precision and split the image library by category and color.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Proficiency in C++ and Python, with experience in debugging, profiling and writing tests',
				did: 'Wrote FlightO in C++17, built with CMake and tested with CTest; its exact Held-Karp search plans 8 cities over a 90-day window in about 20 ms and 9 MB.',
				item: 'flighto',
			},
		],
	},
	'axon-intern': {
		short: 'Software Engineering Intern',
		questions: ['What did he ship at Shopify with PMs and designers?', 'What database work has he done?'],
		matches: [
			{
				asked: 'Owning and driving end-to-end features with Product and Design',
				did: "He took Shop App's photo search from his hackathon win to 20M+ users, co-leading a 10-person team with PMs and designers.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Ensuring that your code hits a high bar for quality and performance',
				did: 'At Shopify he cut internal request latency 10x by moving services from HTTP/1 to gRPC, and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Working knowledge of database technology such as SQL or NoSQL',
				did: "At iA Financial Group he worked with SQL and MongoDB data in an automated payroll pipeline, and caught a critical privacy flaw in a database review that protected 10,000+ clients' data.",
				item: 'ia-financial',
			},
		],
	},
	'blackberry-qnx': {
		short: 'Application Engineering Student',
		questions: ['What hardware work has he done?', 'Where has he written C++?'],
		matches: [
			{
				asked: 'Build a hardware prototype that uses the software your team has developed',
				did: "He extended open-source KiCad review scripts into Cherry Blossom's board agent, which edits, simulates and checks a circuit board before it is ordered, drawing on 15,000 past circuits.",
				item: 'cherry-hardware-agent',
			},
			{
				asked: 'Comfortable working with Linux and Windows development environments',
				did: 'At Shopify he worked day to day in Linux and Bash, writing scripts and using kubectl to get into Kubernetes pods.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Strong communication skills',
				did: 'He taught 1,500+ students AI tools in hands-on workshops at 10+ universities and hackathons, across his Intel and Adobe ambassador roles.',
				item: 'intel-ambassador',
			},
		],
	},
	'boston-scientific': {
		short: 'AI Solutions Engineering Intern',
		questions: ['Has he built RAG over documents?', 'What has he built for engineers?'],
		matches: [
			{
				asked: 'Work with the team to find and implement engineering solutions for information retrieval, documentation review, or test automation.',
				did: 'Wrote the form-reading and auto-fill code for an immigration form workflow used by 10+ law firms, where an AI step checks each uploaded document such as a passport and pre-fills the answers; 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Assist in developing and building tools that support engineering workflows leveraging AI and machine learning tools.',
				did: "Extended open-source KiCad review scripts into Cherry Blossom's board agent, which edits, simulates and checks a circuit board before it is ordered, drawing on 15,000 past circuits.",
				item: 'cherry-hardware-agent',
			},
			{
				asked: 'Collaborate with engineers to analyze requirements and design effective AI-assisted engineering solutions.',
				did: 'Scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and built it with RAG to answer in under 1 second.',
				item: 'architecture-rag-agent',
			},
		],
	},
	'disney-animation': {
		short: 'Full Stack Web Development Intern',
		questions: ['How did he build monitoring at Shopify?', 'Has he used React and TypeScript?'],
		matches: [
			{
				asked: 'Familiarity with web application fundamentals and how systems log and trace errors',
				did: 'At Shopify he wired 300+ telemetry signals through Prometheus into 9 Grafana dashboards and 50+ alerts, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience with modern web frameworks (e.g., React) and typed languages like TypeScript',
				did: "He wrote Cherry Blossom's TypeScript backend on Convex for its React app, where an AI agent designs circuit boards for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Knowledge of DevOps practices, CI/CD pipelines',
				did: 'At iA Financial Group he built CI/CD pipelines with Buildkite and Yarn, so changes were built, tested and shipped automatically.',
				item: 'ia-financial',
			},
		],
	},
	draftkings: {
		short: 'New Grad Software Engineer',
		questions: ['What back-end work has he done at scale?', 'Has he worked with Swift and Kotlin?'],
		matches: [
			{
				asked: 'Develop APIs and backend services',
				did: 'He wrote Python services with FastAPI and asyncio for a form workflow used by 10+ immigration law firms, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'at least one object-oriented language (e.g. TypeScript, C#, Java, Swift, Kotlin)',
				did: "At Shopify he worked in Swift and Kotlin on Shop App's photo search, which shipped on iOS and Android to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Debug and triage production issues',
				did: "On Shopify's Infrastructure Security team he diagnosed and fixed a major Google Cloud firewall misconfiguration affecting 75+ resources.",
				item: 'shopify-infra-security',
			},
		],
	},
	exelixis: {
		short: 'AI and Agentic Engineer',
		questions: ['What workflow automations has he built?', 'How does he use AI coding tools?'],
		matches: [
			{
				asked: 'Assist in building simple AI-enabled prototypes, internal tools, and workflow automations.',
				did: 'Built a workflow that reads and fills immigration forms for 10+ law firms, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Support prompt engineering, basic agent workflows, retrieval-assisted use cases, and API integrations.',
				did: 'Built an AI agent for an architecture firm that uses RAG over tens of thousands of building-code rules and answers in under 1 second.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Use approved AI-assisted development tools, such as coding copilots or agentic coding tools',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	'gm-av': {
		short: 'AI/ML Engineer Intern',
		questions: ['Has he used gRPC, Kubernetes and Linux?', 'How does he use AI coding agents?'],
		matches: [
			{
				asked: 'Experience writing Go or other languages commonly used for production services',
				did: 'He built the Used-Car Deal Finder (2,000+ users) at Hack the North 2026, then rebuilt it as a Go crawler and a Rust pricing engine (WebAssembly) on Cloudflare Workers.',
				item: 'used-car-deal-finder',
			},
			{
				asked: 'Understanding of Unix/Linux, SSH, and networking fundamentals',
				did: 'At Shopify he worked day to day in Linux and Bash, used kubectl to get into Kubernetes pods, and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Hands-on experience utilizing agentic developer tools',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of the expected 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	golden: {
		short: 'Software Engineer Intern',
		questions: ['How does he use AI coding agents?', 'What has he built in React and TypeScript?'],
		matches: [
			{
				asked: 'Hands-on experience building with AI coding tools (Claude Code, Cursor, Copilot, etc.)',
				did: 'At Shopify he built with Claude Code and ran a team of AI agents that tested search approaches overnight, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience building with JavaScript or TypeScript and React',
				did: "He wrote Cherry Blossom's TypeScript backend on Convex for its React app, where an AI agent designs circuit boards for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'the best code is the code that delivers the most customer value',
				did: 'He built a document workflow now used by 10+ immigration law firms, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
		],
	},
	kla: {
		short: 'Software Engineer Intern',
		questions: ['What image work has he done?', 'Has he built tools for other engineers?'],
		matches: [
			{
				asked: 'identify opportunities to improve performance, execution time, reliability, and engineering productivity',
				did: 'At iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries by rebuilding it as an automated Python/C# pipeline.',
				item: 'ia-financial',
			},
			{
				asked: 'Work on projects involving image processing and engineering data analysis',
				did: "Built the image-matching engine behind Shop App's photo search: image embeddings and vector search find similar products across 55M+ images in under 3 seconds.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Develop scripts and engineering tools for automation, data analysis, visualization, and debugging',
				did: 'Wired 300+ telemetry signals through Prometheus into 9 Grafana dashboards and 50+ alerts across 10 Shop App products, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
		],
	},
	morningstar: {
		short: 'Associate Software Engineer',
		questions: ['What AI tools has he built for business users?', 'How does he use AI coding tools?'],
		matches: [
			{
				asked: 'Design, build, and enhance AI-enabled solutions, leveraging modern AI tools, frameworks, and programming languages such as Python.',
				did: 'Wrote the Python form-reading and filling services, with FastAPI and asyncio, for an immigration form workflow used by 10+ law firms that saves about 8 hours per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Experience using AI tools, platforms, or frameworks (e.g., generative AI tools, machine learning libraries, or AI-assisted development workflows)',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Demonstrated ability to work independently as a self-starter, taking initiative and ownership of projects.',
				did: 'Built the first Used-Car Deal Finder solo at Hack the North 2026; it reached 2,000+ users, and he then rebuilt it as a Go crawler and a Rust price engine on Cloudflare.',
				item: 'used-car-deal-finder',
			},
		],
	},
	'nvidia-ai-systems': {
		short: 'AI Systems Engineering Intern',
		questions: ['How does AgentGym measure agents?', 'How did AI agents speed up photo search?'],
		matches: [
			{
				asked: 'Experience building AI agents, LLM applications, evaluation systems, coding workflows, or developer tools',
				did: 'Built AgentGym, whose proxy logs every step of every agent run and turns failures into training data, raising task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'Ability to design experiments, analyze results, investigate technical problems, and communicate findings clearly',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target over 55M+ images in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'projects that measure runtime, compile time, resource use, code quality, or developer productivity',
				did: 'Wrote FlightO in C++17, built with CMake and tested with CTest; its exact Held-Karp search plans 8 cities over a 90-day window in about 20 ms and 9 MB.',
				item: 'flighto',
			},
		],
	},
	'path-robotics': {
		short: 'ML & Robotics Intern',
		questions: ['What has he built with reinforcement learning?', 'How strong is his C++?'],
		matches: [
			{
				asked: 'machine learning (computer vision, deep learning, reinforcement learning)',
				did: 'He built AgentGym, a self-improving agent framework on Hindsight Experience Replay and DPO that raised task success 38% over the base agent, measured on 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'vision-based perception',
				did: "At Shopify he built the image-matching engine behind Shop App's photo search, using image embeddings and vector search to search 55M+ images in under 3 seconds.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Strong programming skills in C++ and/or Python.',
				did: "He got a security-feature PR merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
		],
	},
	pure: {
		short: 'iOS / UI Engineer',
		questions: ['What did he build for iOS at Shopify?', 'Has he used React and TypeScript?'],
		matches: [
			{
				asked: 'Own UI features from design handoff through production',
				did: "He co-led a 10-person team with PMs and designers that shipped Shop App's photo search on iOS and Android, behind feature flags with an A/B test, to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'TypeScript, React Native, SQL, and AWS are relevant to what we build',
				did: 'He built Cherry Blossom on React and TypeScript, with a TypeScript backend on Convex, SQL and AWS; it has 1,500+ monthly users.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Ability to adapt very quickly and learn fast',
				did: 'He built the Used-Car Deal Finder solo at Hack the North 2026 (2,000+ users), then rebuilt it as a Go crawler and a Rust pricing engine on Cloudflare.',
				item: 'used-car-deal-finder',
			},
		],
	},
	'soti-xsight': {
		short: 'Software Developer Intern',
		questions: ['What C++ has he written?', 'Has he worked with SQL databases?'],
		matches: [
			{
				asked: 'Knowledge of algorithms, data structures, and database fundamentals',
				did: 'His C++17 planner FlightO finds the cheapest multi-city trip exactly with Held-Karp dynamic programming, in about 20 ms for 8 cities over a 90-day window.',
				item: 'flighto',
			},
			{
				asked: 'Basic knowledge of programming in one or more of the following programming languages',
				did: "At Shopify he got a security-feature PR merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Most importantly, curiosity, a desire to learn, and being part of a team',
				did: "He co-led a 10-person team with PMs and designers that took Shop App's photo search from his hackathon win to 20M+ users.",
				item: 'shopify-visual-search',
			},
		],
	},
	startree: {
		short: 'Software Engineer I',
		questions: ['What did he contribute to Redpanda?', 'How does he use AI tools when he builds?'],
		matches: [
			{
				asked: 'able to take an idea from concept through implementation and deliver it to production',
				did: "His Shopify hackathon win became Shop App's photo search, shipped in 6 weeks behind feature flags with an A/B test and rolled out to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Strong distributed systems fundamentals and experience solving problems at scale',
				did: "On Shopify's Infrastructure Security team he moved internal services from HTTP/1 to gRPC, cutting internal request latency 10x, and got a security feature merged into the open-source C++ code of Redpanda, a data-streaming tool.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'a strong focus on reliability, observability, performance, and ease of use',
				did: 'At Shopify he wired 300+ telemetry signals through Prometheus into 9 Grafana dashboards and 50+ alerts, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
		],
	},
	abbvie: {
		short: 'AI Engineer',
		questions: ['Has he built RAG pipelines?', 'How does he evaluate AI agents?'],
		matches: [
			{
				asked: 'basic RAG pipelines (chunking, embeddings, vector search)',
				did: 'He built an AI agent for an architecture firm that uses RAG over tens of thousands of building-code rules and answers in under 1 second.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Serve models and AI services through RESTAPIs and containers',
				did: 'He wrote the Python services, with FastAPI and asyncio, for an AI form workflow used by 10+ immigration law firms, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Agents: tool use, multi-step workflows, basic evaluation, and guardrails',
				did: 'He built AgentGym, which logs every step of every agent run, scores each run and raised task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
		],
	},
	'amazon-db': {
		short: 'Database Software Engineer',
		questions: ['What database work has he done?', 'How does he debug production issues?'],
		matches: [
			{
				asked: 'Database systems (SQL and NoSQL)',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline working with SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
			{
				asked: 'Debugging and troubleshooting complex systems',
				did: "On Shopify's Infrastructure Security team he diagnosed and fixed a major Google Cloud firewall misconfiguration affecting 75+ resources.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'critically validate, verify, and integrate AI-generated code',
				did: 'At Scale AI he audited AI-written code in Python, JavaScript/React, Java and C++, flagging bugs, code quality, tests and Git issues.',
				item: 'scale-ai',
			},
		],
	},
	'amazon-intern': {
		short: 'Software Development Engineer',
		questions: ['Where has he written C++?', 'What performance work has he done?'],
		matches: [
			{
				asked: 'Write clean, maintainable code (C, C++, Python, or Rust)',
				did: "During his Shopify internship he got a security-feature pull request merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Familiarity with modern C++ (17, 20, etc.)',
				did: 'He built FlightO, a C++17 command line program built with CMake and tested with CTest, whose exact search plans 8 cities over a 90-day window in about 20 ms and 9 MB.',
				item: 'flighto',
			},
			{
				asked: 'leverage GenAI tools to enhance development productivity',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight, hitting the under-3-second target over 55M+ images in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	'amazon-ml-intern': {
		short: 'Software Development Engineer Intern',
		questions: ['How does he check AI-written code?', 'What ML has he built?'],
		matches: [
			{
				asked: 'critically validate, verify, and integrate AI-generated code',
				did: 'At Scale AI he audited AI-written code in Python, JavaScript/React, Java and C++, flagging bugs, code quality, tests and Git issues.',
				item: 'scale-ai',
			},
			{
				asked: 'optimizing machine learning models',
				did: 'He built AgentGym, which logs every step of every agent run and trains models on their own failures with DPO, raising task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'contributing to open-source projects',
				did: "During his Shopify internship he got a security-feature pull request merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
		],
	},
	blackline: {
		short: 'Associate Software Engineer',
		questions: ['What back-end work has he done at scale?', 'Has he automated finance work?'],
		matches: [
			{
				asked: 'research, test, benchmark and evaluate new technologies',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, which hit the under-3-second target over 55M+ images in 1 week instead of the expected 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'optimize existing features while writing clean code',
				did: "On Shopify's Infrastructure Security team he moved internal services from HTTP/1 to gRPC, which cut internal request latency 10x.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'delivering high quality releases to our customers',
				did: 'At iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries with an automated Python/C# pipeline, and built CI/CD with Buildkite and Yarn so changes were built, tested and shipped automatically.',
				item: 'ia-financial',
			},
		],
	},
	botpress: {
		short: 'Software Developer Intern',
		questions: ['Has he built a customer support agent?', 'What has he shipped in React and TypeScript?'],
		matches: [
			{
				asked: 'Develop and maintain customer-impacting features using React & Node.js (Typescript)',
				did: "At Shopify he took Shop App's photo search, built with React, TypeScript and Node.js, from his hackathon win to 20M+ users in 6 weeks.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience with chatbots, AI, or related technologies is a plus',
				did: "He built a voice AI agent for Hotel Jaro's front desk that has handled 1,000+ guest calls, about 80% of them with no staff involved.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'Add tracking and monitoring to capture user journeys',
				did: 'He shipped photo search behind feature flags with an A/B test and built its observability: 300+ telemetry signals wired into 9 Grafana dashboards and 50+ alerts.',
				item: 'shopify-visual-search',
			},
		],
	},
	braze: {
		short: 'Software Engineering Intern',
		questions: ['How does he use AI tools to ship faster?', 'What has he built with clients?'],
		matches: [
			{
				asked: 'Leverage the latest AI tools to accelerate learning, discovery and delivery in our production codebase',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of the expected 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Team up with business leaders and key stakeholders to accomplish project objectives',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Work on individual and group projects focused on the full project lifecycle',
				did: 'He built the Used-Car Deal Finder solo at Hack the North 2026, took it to 2,000+ users, then rebuilt it as a Go crawler and a Rust price engine on Cloudflare.',
				item: 'used-car-deal-finder',
			},
		],
	},
	built: {
		short: 'Innovation Software Engineer',
		questions: ['What has he built for construction?', 'How does he work with customers?'],
		matches: [
			{
				asked: 'help build AI-powered features, including document extraction, data validation, agent-driven workflows, and automation',
				did: 'He wrote the form-reading and filling code for an AI app that fills official immigration PDF forms; 10+ law firms use it, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Participate in customer discovery conversations, observe how people use the products',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Experience using AI coding tools or experimenting with LLMs to build something',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	clio: {
		short: 'Software Developer Co-op',
		questions: ['What has he built for law firms?', 'How does he use AI to write code?'],
		matches: [
			{
				asked: 'Drive the implementation of new features and deliver timely software solutions for customer-impacting issues',
				did: 'He built an app that reads and fills Canadian and Quebec immigration forms for law firms; 10+ firms use it, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'A keen interest in improving your craft by using AI.',
				did: "He used Claude Code on Shop App's photo search and ran a team of AI agents that tested approaches overnight, hitting the under-3-second target in 1 week instead of 3.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Participate in thorough code reviews',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, catching bugs, test gaps and Git issues, and built 200+ coding tasks as AI training data.',
				item: 'scale-ai',
			},
		],
	},
	cna: {
		short: 'AI Engineering Intern',
		questions: ['What AI work has he shipped?', 'Has he automated infrastructure?'],
		matches: [
			{
				asked: 'work experience in Artificial Intelligence or Machine Learning',
				did: "At Shopify he built the image-matching engine and the AI query step for Shop App's photo search, which reached 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Participate in designing and building IT automation capabilities',
				did: 'At Shopify he wrote Terraform to manage infrastructure as code, and fixed a Google Cloud firewall misconfiguration affecting 75+ resources.',
				item: 'shopify-infra-security',
			},
			{
				asked: '1+ years of coding proficiency in at least one programming language (Python, R, SQL)',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline working with SQL data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
		],
	},
	datacor: {
		short: 'AI Engineer Intern',
		questions: ['What has he built for real clients?', 'Has he fine-tuned LLMs?'],
		matches: [
			{
				asked: 'Iterate from problem framing to prototyping and deploying production-grade solutions',
				did: "Took Shop App's photo search from his hackathon win to launch in 6 weeks, shipping it behind feature flags with an A/B test to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Collaborate with stakeholders to identify new AI opportunities and create intelligent AI applications',
				did: 'Built AI tools end to end for 4 business clients, including an app that fills immigration forms for 10+ law firms, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Proven expertise in implementing and fine-tuning generative AI LLMs',
				did: 'Built AgentGym, where failed runs become a better and a worse answer that self-hosted models train on with DPO, raising task success 38% over the base agent.',
				item: 'agentgym',
			},
		],
	},
	ema: {
		short: 'AI Resident',
		questions: ['How does AgentGym improve agents?', 'How did he measure AgentGym?'],
		matches: [
			{
				asked: 'post-training (SFT/DPO/GRPO-family RL)',
				did: 'Built AgentGym, where a hindsight step turns failed runs into a better and a worse answer that self-hosted models then train on with DPO; task success rose 38% over the base agent.',
				item: 'agentgym',
			},
			{
				asked: 'Honest measurement as a habit',
				did: "To get Shop App's photo search under 3 seconds over 55M+ images, the team accepted a 5% drop in matching precision, then shipped it behind feature flags with an A/B test.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'agent and tool-use systems',
				did: "Built the agent harness for Cherry Blossom's AI agent on LangChain and CrewAI, with a research step that searches Pinecone embeddings; 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
		],
	},
	google: {
		short: 'Software Engineer II',
		questions: ['What did he ship at Shopify?', 'What search and ML work has he done?'],
		matches: [
			{
				asked: 'Machine Learning or AI, Information Retrieval',
				did: "He took Shop App's photo search to 20M+ users, finding similar products across 55M+ images in under 3 seconds with image embeddings, vector search and a self-hosted LLM writing 7 search queries per photo.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience developing infrastructure, distributed systems or networks',
				did: 'At Shopify he moved internal services from HTTP/1 to gRPC, cutting internal request latency 10x, and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Experience utilizing AI productivity tools to streamline business or development workflows',
				did: 'He built an app that uses Google Gemini to explain each immigration form field and pre-fill answers; 10+ law firms use it, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
		],
	},
	'hp-aiml': {
		short: 'AIML Platform Intern',
		questions: ['How did he fine-tune models in AgentGym?', 'Has he built agent workflows with LangChain?'],
		matches: [
			{
				asked: 'orchestration frameworks (LangGraph, LangChain)',
				did: "He built the agent harness for Cherry Blossom's AI agent with LangChain and CrewAI, and the tool has 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Participate in model customization and fine-tuning',
				did: "He built AgentGym, where self-hosted models train with DPO on the agent's own failures, raising task success 38% over the base agent across 24,000 traces.",
				item: 'agentgym',
			},
			{
				asked: 'evaluate technical tradeoffs, and make reasonable decisions when multiple approaches are viable',
				did: 'To search 55M+ images in under 3 seconds at Shopify, he had AI agents test approaches overnight, and the team accepted a 5% drop in matching precision for speed.',
				item: 'shopify-visual-search',
			},
		],
	},
	instead: {
		short: 'Software Engineering Intern',
		questions: ['How did he automate the law firm forms?', 'How does he use Claude Code?'],
		matches: [
			{
				asked: 'Build and test AI-powered components including inference pipelines and prompt engineering',
				did: 'He built an app that reads official immigration PDF forms, has Gemini explain and pre-fill each field, then fills the forms automatically; 10+ law firms use it, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Fix bugs and make product improvements based on real customer feedback',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'You already use AI tools in your coding workflow and understand how they change the way software gets built',
				did: 'At Shopify he built with Claude Code and ran a team of AI agents that tested search approaches overnight, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	intel: {
		short: 'Software Application Engineer',
		questions: ['Has he worked with end users on requirements?', 'What did he do as an Intel ambassador?'],
		matches: [
			{
				asked: 'Modern programming languages such as Python, C#',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated pipeline written in Python and C#, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
			{
				asked: 'Interact with end users to gather requirements and propose necessary modifications.',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Automate builds, deployments, and testing processes to streamline development workflows.',
				did: "He shipped Shop App's photo search in 6 weeks through Buildkite CI/CD and canary deployments, behind feature flags with an A/B test, rolling it out to millions of users step by step.",
				item: 'shopify-visual-search',
			},
		],
	},
	intuitive: {
		short: 'AI/ML Engineer Intern',
		questions: ['Has he built LLM pipelines over documents?', 'How does his similarity search work?'],
		matches: [
			{
				asked: 'integrating additional large language model (LLM) workflows',
				did: 'He built an app that reads official immigration PDF forms, has an AI model explain every field, and fills them; 10+ law firms use it, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Experience with NLP techniques such as vector embeddings and semantic similarity.',
				did: 'At Shopify he built photo search that finds the most similar products across 55M+ images in under 3 seconds, using image embeddings and vector search.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'including prompt engineering and structured outputs',
				did: 'He built Linea, which turns plain-language requests into structured output 98% of the time, with an MCP server that searches 500K+ building-code and permit nodes.',
				item: 'linea',
			},
		],
	},
	'kla-ai': {
		short: 'AI/ML Software Engineer Intern',
		questions: ['Has he trained classic ML models like XGBoost?', 'What C++ work has he done?'],
		matches: [
			{
				asked: 'machine learning model training and inference solutions',
				did: "He built the image-matching engine behind Shop App's photo search, which searches 55M+ images in under 3 seconds with image embeddings and vector search for 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Traditional machine learning using Random Forest, XG Boost, Logistic Regression.',
				did: 'He built a Valorant predictor that trains one XGBoost model per map, tuned with Optuna and scored by log-loss against a most-common-site baseline.',
				item: 'valorant-spike-predictor',
			},
			{
				asked: 'development in Python, C++, C# or Java',
				did: 'At iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries with an automated Python/C# pipeline.',
				item: 'ia-financial',
			},
		],
	},
	'labcorp-agentic': {
		short: 'Agentic AI Developer Co-op',
		questions: ['Has he built RAG or agents?', 'How does AgentGym trace agent runs?'],
		matches: [
			{
				asked: 'agentic frameworks (LangChain, LangGraph, CrewAI, AutoGen, or custom orchestration layers)',
				did: "He built the agent harness for Cherry Blossom's AI agent on LangChain and CrewAI, with GraphRAG and vector search over Pinecone; it has 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Contribute to observability and tracing infrastructure for agent execution',
				did: 'He built AgentGym, whose proxy logs every step of every agent run and scores each run, turning failures into training data that raised task success 38%.',
				item: 'agentgym',
			},
			{
				asked: 'retrieval augmented generation (RAG) pipelines with vector databases',
				did: "He built an AI agent that uses RAG over tens of thousands of building-code rules and answers an architect's question in under 1 second.",
				item: 'architecture-rag-agent',
			},
		],
	},
	'labcorp-fullstack': {
		short: 'Full-Stack Engineer Co-op',
		questions: ['What has he built for law firms?', 'How does he check AI output before it ships?'],
		matches: [
			{
				asked: 'familiarity with Python and/or Node.js for backend development',
				did: 'He wrote the form-reading and filling services in Python with FastAPI and asyncio for an app used by 10+ immigration law firms, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'building observability, logging, and alerting into API surfaces',
				did: 'At Shopify he wired 300+ telemetry signals through Prometheus into 9 Grafana dashboards and 50+ alerts across 10 Shop App products, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Help implement architectural guardrails',
				did: "Cherry Blossom's AI agent designs circuit boards from plain English, and a verification step checks every AI edit before a board goes to manufacturing; it has 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
		],
	},
	'micron-ai': {
		short: 'AI Engineering Intern',
		questions: ['What AI tools has he built for clients?', 'Has he built RAG or MCP servers?'],
		matches: [
			{
				asked: 'Retrieval-Augmented Generation (RAG), vector databases, embeddings, Model Context Protocol (MCP)',
				did: 'He built an MCP server for Linea that searches 500K+ building-code and permit nodes with GraphRAG and vector search.',
				item: 'linea',
			},
			{
				asked: 'translate business requirements into scalable technical solutions',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office, and built it to answer from tens of thousands of rules in under 1 second.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Demonstrated experience using AI-enabled tools and large language models (LLMs)',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	'microsoft-coreai': {
		short: 'CoreAI Engineering Intern',
		questions: ['How does he use AI coding tools?', 'What AI has he shipped to real users?'],
		matches: [
			{
				asked: 'implementing AI solutions in real-world applications',
				did: "He took Shop App's photo search from his hackathon win to 20M+ users, matching each photo across 55M+ images in under 3 seconds with image embeddings, vector search and a self-hosted LLM.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Familiarity with AI frameworks and libraries like TensorFlow, PyTorch, or scikit-learn',
				did: 'He built AgentGym, a self-improving agent framework where self-hosted models train on their own failures with DPO in PyTorch, raising task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'with an understanding of their strengths and limitations',
				did: 'At Scale AI he reviewed AI-written code in Python, JavaScript/React, Java and C++, catching bugs, test gaps and Git issues, and built 200+ coding tasks as AI training data.',
				item: 'scale-ai',
			},
		],
	},
	'microsoft-intern': {
		short: 'Software Engineer Intern',
		questions: ['What has he shipped end to end?', 'Has he built mobile apps?'],
		matches: [
			{
				asked: 'Coursework, projects, or prior experience building end-to-end applications',
				did: 'He built Cherry Blossom on the open-source tscircuit stack, writing its TypeScript backend on Convex for a React app where an AI agent designs circuit boards for 1,500+ monthly users.',
				item: 'cherry-blossom',
			},
			{
				asked: 'collaborate with engineers, designers, and product managers',
				did: "He co-led a 10-person team with PMs and designers that took Shop App's photo search from his hackathon win to 20M+ users on iOS and Android.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'improve the availability, reliability, efficiency, observability, and performance of products',
				did: 'At Shopify he cut internal request latency 10x by moving services from HTTP/1 to gRPC, and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.',
				item: 'shopify-infra-security',
			},
		],
	},
	'microsoft-vancouver': {
		short: 'Software Engineer',
		questions: ['Has he built data pipelines?', 'What has he done with C# and SQL?'],
		matches: [
			{
				asked: 'Familiarity with data connectivity, APIs, databases, or data integration technologies',
				did: 'For the Used-Car Deal Finder he built a Go crawler that reads new car ads every 5 minutes and a Rust Cloudflare Worker that stores every car and price change in D1.',
				item: 'used-car-deal-finder',
			},
			{
				asked: 'source control, code reviews, automated testing, and continuous integration',
				did: 'At Scale AI he reviewed AI-written code in 4 languages for bugs, test gaps and Git issues, and built 200+ coding tasks as AI training data.',
				item: 'scale-ai',
			},
			{
				asked: 'Experience or familiarity with technologies such as C#, .NET, TypeScript, SQL, Azure',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline working with SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
		],
	},
	mitel: {
		short: 'Junior Full Stack Developer',
		questions: ['Has he built web apps in TypeScript?', 'How does he use Claude Code?'],
		matches: [
			{
				asked: 'Writing code in Typescript in Node.js to support front-end features',
				did: "He wrote Cherry Blossom's backend logic in TypeScript on Convex for its React web app, where an AI agent designs circuit boards for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Using agentic coding tools (e.g. Claude Code, GitHub Copilot) to accelerate development',
				did: "He used Claude Code while building Shop App's photo search and ran a team of AI agents that tested approaches overnight, hitting the under-3-second target in 1 week instead of 3.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Basic understanding of CI/CD pipelines, ideally on AWS',
				did: "On Shopify's Infrastructure Security team he worked with Buildkite CI/CD, Terraform and AWS Lambda, and cut internal request latency 10x by moving services to gRPC.",
				item: 'shopify-infra-security',
			},
		],
	},
	mitre: {
		short: 'Trustworthy AI Intern',
		questions: ['How does he check AI outputs?', 'Has he built RAG or agents?'],
		matches: [
			{
				asked: 'Prototype AI and/or LLM-based tools to meet operational needs',
				did: 'Scoped a building-code agent with an architecture firm, visited their office to see how architects work, and built it to answer in under 1 second with RAG over tens of thousands of rules.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Experience using AI coding assistants like Codex',
				did: 'At Shopify he used Claude Code while building photo search and ran a team of AI agents that tested search approaches overnight, hitting the speed target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Familiarity with PyTorch, Tensorflow, and/or LangChain frameworks',
				did: "Built the agent harness for Cherry Blossom's AI agent on LangChain and CrewAI, with a step that checks every AI edit before a board goes to manufacturing; 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
		],
	},
	nebius: {
		short: 'ML Solutions Architect Intern',
		questions: ['Has he optimized model inference?', 'What multimodal work has he done?'],
		matches: [
			{
				asked: 'including multimodal models (text, vision, audio)',
				did: "Built NeuroVision's multimodal PyTorch pipeline, which turns a video's picture and sound into 20,000+ neural response signals per second on a 48GB VRAM GPU.",
				item: 'neurovision',
			},
			{
				asked: 'Run performance and quality experiments to support proof-of-concept work',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight; accepting a 5% drop in matching precision hit the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Knowledge of model architectures and fine-tuning approaches',
				did: 'Built AgentGym, where failed runs become a better and a worse answer that self-hosted models train on with DPO, raising task success 38% over the base agent.',
				item: 'agentgym',
			},
		],
	},
	nyt: {
		short: 'Backend Engineering Intern',
		questions: ['Has he built CI/CD pipelines?', 'How has he cut latency?'],
		matches: [
			{
				asked: 'Experience working with CI/CD workflows, especially for automating quality checks and code deployment',
				did: 'At iA Financial Group he built CI/CD pipelines with Buildkite and Yarn, so changes were built, tested and shipped automatically.',
				item: 'ia-financial',
			},
			{
				asked: 'Experience or project work focused on web application performance optimization or latency reduction',
				did: 'At Shopify he cut internal request latency 10x by moving services from HTTP/1 to gRPC.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Experience working with AI tools and agents like Claude Code',
				did: 'At Shopify he built with Claude Code and ran a team of AI agents that tested search approaches overnight, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	olg: {
		short: 'Front End Developer Student',
		questions: ['What has he built in React?', 'Has he worked with designers and clients?'],
		matches: [
			{
				asked: 'JavaScript, CSS, HTML, Node.js, React/Vue.js, RESTful API',
				did: "At Shopify he built Shop App's photo search with React, TypeScript and Node.js, and shipped it on iOS, Android and the shop.com front page to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Sound interest in designing and developing user interfaces and Single Page Apps',
				did: 'He built Cherry Blossom, a React and TypeScript web app where an AI agent designs circuit boards from plain English, now with 1,500+ monthly users.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Gather business requirements from lab team.',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
		],
	},
	patreon: {
		short: 'Software Engineering Intern',
		questions: ['What did he ship at Shopify?', 'What has he built for creators?'],
		matches: [
			{
				asked: 'working closely with engineers, product managers, designers, and data scientists to bring your project to life',
				did: "He co-led a 10-person team with PMs and designers that took Shop App's photo search from his hackathon win to 20M+ users on iOS and Android in 6 weeks.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Proficiency in one or more programming languages such as Python, Swift, Kotlin, or TypeScript.',
				did: "He wrote Cherry Blossom's TypeScript backend on Convex for its React app, where an AI agent designs circuit boards for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Genuine passion for Patreon’s mission and supporting the creator economy.',
				did: 'He built NeuroVision, a web app for content creators that predicts how viewers respond to a short video and suggests what to change.',
				item: 'neurovision',
			},
		],
	},
	'pratt-whitney': {
		short: 'Business Intelligence Intern',
		questions: ['Has he built dashboards and reports?', 'What processes has he automated?'],
		matches: [
			{
				asked: 'Data visualization tools (e.g., Power BI, Tableau, or similar)',
				did: 'At Shopify he built 9 Grafana dashboards and 50+ alerts from 300+ telemetry signals, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Assist in improving digital workflows and automation processes.',
				did: 'At iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries with an automated Python/C# pipeline.',
				item: 'ia-financial',
			},
			{
				asked: 'Ability to translate business requirements into technical solutions.',
				did: 'He built an app for immigration law firms that reads the official PDF forms and fills them, now used by 10+ firms with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
		],
	},
	'qualtrics-data': {
		short: 'Software Development Engineer I',
		questions: ['What LLM and agent features has he shipped?', 'Has he used Java?'],
		matches: [
			{
				asked: 'Build and ship features that leverage LLMs and agentic systems',
				did: "He built the agent harness for Cherry Blossom's AI agent with LangChain and CrewAI, with a research step using vector search and GraphRAG, for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'A track record of shipping features or projects',
				did: "He took Shop App's photo search from his hackathon win to launch in 6 weeks with a 10-person team he co-led, reaching 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Writes clean, well-tested code and understands the importance of code reviews',
				did: 'At Scale AI he audited AI-written code in Python, JavaScript/React, Java and C++, flagging bugs, code quality, tests and Git issues.',
				item: 'scale-ai',
			},
		],
	},
	'qualtrics-xmd': {
		short: 'Software Engineer I',
		questions: ['Has he used Elasticsearch and Redis?', 'How does he ship and test code?'],
		matches: [
			{
				asked: 'Exposure to web infrastructure and distributed systems',
				did: "At Shopify he moved internal services from HTTP/1 to gRPC, cutting internal request latency 10x, and got a security feature merged into Redpanda's open-source C++ data-streaming code.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Familiarity or experience with modern developer tools, git, unit testing, and continuous deployment concepts',
				did: "He shipped Shop App's photo search in 6 weeks through Buildkite CI/CD and canary deployments, behind feature flags with an A/B test, rolling it out to millions of users step by step.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'review your own and AI-assisted work carefully',
				did: 'At Scale AI he audited AI-written code in Python, JavaScript/React, Java and C++, flagging bugs, code quality, tests and Git issues.',
				item: 'scale-ai',
			},
		],
	},
	revvity: {
		short: 'Full-stack AI Developer Intern',
		questions: ['What AI tools has he built for businesses?', 'How does he measure if an AI tool works?'],
		matches: [
			{
				asked: 'AI-powered features that can boost employee productivity',
				did: 'He built an AI app that fills immigration forms for law firms; 10+ firms use it, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Build relationships across various departments to understand their unique challenges and AI opportunities',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'evaluating and benchmarking AI performance against business KPIs',
				did: 'AgentGym scores every agent run; against the base agent, task success rose 38% on 24,000 traces and compute cost fell 98%.',
				item: 'agentgym',
			},
		],
	},
	rhoda: {
		short: 'Platform Software Engineer Intern',
		questions: ['Has he worked on networking or gRPC?', 'What hardware has he built software for?'],
		matches: [
			{
				asked: 'Familiarity with networking, IPC, or communication protocols',
				did: 'At Shopify he cut internal request latency 10x by moving services from HTTP/1 to gRPC, and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Work on telemetry and observability systems that give the team real-time visibility',
				did: 'At Shopify he built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Prior work on prototype or pre-production hardware',
				did: "He extended Cherry Blossom's board agent to simulate and check a circuit board before it is ordered, drawing on 15,000 past circuits.",
				item: 'cherry-hardware-agent',
			},
		],
	},
	salesforce: {
		short: 'AI Labs Intern',
		questions: ['What has he built with AI agents?', 'Has he worked directly with customers?'],
		matches: [
			{
				asked: 'experience using modern AI development tools to accelerate experimentation',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Portfolio evidence of building, deploying, or open-sourcing software or AI applications',
				did: 'Built Cherry Blossom, an AI agent that designs circuit boards from plain English, now live with 1,500+ monthly users and 10,000+ boards built.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Experience working across engineering, product, design, or customer-facing teams',
				did: 'Built AI tools end to end for 4 business clients, including an app that fills immigration forms for 10+ law firms, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
		],
	},
	sambanova: {
		short: 'New Grad ML Engineer',
		questions: ['How does AgentGym use DPO?', 'How does he evaluate AI agents?'],
		matches: [
			{
				asked: 'Familiarity with reinforcement learning or preference optimization (RLHF, DPO, GRPO, reward modeling)',
				did: "AgentGym turns an agent's useful failures into better and worse answer pairs and trains self-hosted models on them with DPO, raising task success 38% over the base agent across 24,000 traces.",
				item: 'agentgym',
			},
			{
				asked: 'Build and evaluate agentic systems: tool calling, multi-step planning, retrieval',
				did: 'He built an MCP server that lets AI agents search 500K+ building-code and permit nodes with GraphRAG and vector search.',
				item: 'linea',
			},
			{
				asked: 'quantify the trade-offs between model quality, latency, and resource efficiency',
				did: 'To search 55M+ images in under 3 seconds, the Shop App photo search team accepted a 5% drop in matching precision and split the image library by category and color with a first AI pass.',
				item: 'shopify-visual-search',
			},
		],
	},
	'samsung-agentic': {
		short: 'Agentic AI Intern',
		questions: ['What voice agents has he built?', 'How does AgentGym improve agents?'],
		matches: [
			{
				asked: 'Develop Intelligent systems that use the LLM backed agentic framework',
				did: "Built Hotel Jaro's front-desk voice AI agent with Whisper, ElevenLabs and Twilio; it has handled 1,000+ guest calls, 80% of them with no staff involved.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'Set up processes to monitor and continually improve efficiency and performance of models',
				did: 'Built AgentGym, which logs every step of every agent run, scores each run and turns failures into training data, raising task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'Participate in new product concepts and create proof-of-concept prototypes',
				did: "Took Shop App's photo search from his hackathon win to launch in 6 weeks, co-leading a 10-person team, and it reached 20M+ users on iOS and Android.",
				item: 'shopify-visual-search',
			},
		],
	},
	shopback: {
		short: 'Software Engineer Intern',
		questions: ['What has he built with AI agents?', 'How does he check AI-written code?'],
		matches: [
			{
				asked: 'You use coding agents to move fast, and you learn to review, test, and verify what they produce.',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, catching bugs, test gaps and Git issues, and built 200+ coding tasks as AI training data.',
				item: 'scale-ai',
			},
			{
				asked: 'a boring task you automated end to end',
				did: 'He built an app that reads and fills Canadian and Quebec immigration forms for 10+ law firms: 10,000+ documents processed, about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'You write evals and tests so you can prove that your AI-powered work is good.',
				did: 'He built AgentGym, which scores every agent run; measured against the base agent across 24,000 traces, task success rose 38%.',
				item: 'agentgym',
			},
		],
	},
	solink: {
		short: 'Software Engineer Co-op',
		questions: ['What AI agents has he built?', 'Has he shipped React and TypeScript?'],
		matches: [
			{
				asked: 'You have proficiency in TypeScript, or similar languages (TypeScript preferred)',
				did: "He wrote Cherry Blossom's backend logic in TypeScript on Convex and built its AI agent's harness, for 1,500+ monthly users and 10,000+ boards built.",
				item: 'cherry-blossom',
			},
			{
				asked: 'collaborating with cross-functional teams, including product managers, to translate requirements into technical solutions',
				did: 'At Shopify he co-led a 10-person team with PMs and designers and wrote the design docs, taking photo search from his hackathon win to 20M+ users in 6 weeks.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'You have experience in high-velocity startup or AI-first environments',
				did: "He built a voice AI agent for Hotel Jaro's front desk that has handled 1,000+ guest calls, about 80% of them with no staff involved.",
				item: 'hotel-jaro-voice',
			},
		],
	},
	'stripe-ml': {
		short: 'Machine Learning Engineer Intern',
		questions: ['What ML models has he trained?', 'How did he measure AgentGym?'],
		matches: [
			{
				asked: 'Develop and deploy large-scale machine learning systems',
				did: "He took Shop App's photo search to 20M+ users, matching each photo across 55M+ images in under 3 seconds with image embeddings, vector search and a self-hosted LLM.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Engage in the end-to-end process of designing, training, improving, and launching machine learning models',
				did: 'AgentGym logs every agent run, turns useful failures into training pairs and trains self-hosted models on them with DPO, raising task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'libraries such as Pandas, NumPy, and Scikit-learn',
				did: 'He built the Valorant Spike Predictor in Python with XGBoost, scikit-learn, pandas and NumPy, training one model per map and tuning them with Optuna on log-loss.',
				item: 'valorant-spike-predictor',
			},
		],
	},
	'tesla-apps': {
		short: 'Fullstack Engineer Intern',
		questions: ['What infrastructure has he worked on?', 'What internal tools has he built?'],
		matches: [
			{
				asked: 'Experience with building and/or maintaining infrastructure and services',
				did: "He moved Shopify's internal services from HTTP/1 to gRPC, cutting internal request latency 10x, and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'designs and implements a diverse set of services and tools that power our internal software and processes',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python/C# pipeline, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
			{
				asked: 'Excellent grasp of fundamental computer science concepts and ability to write well-organized code',
				did: 'He built FlightO, a C++17 program that uses Held-Karp dynamic programming to find the cheapest multi-city trip, planning 8 cities over 90 days in about 20 ms.',
				item: 'flighto',
			},
		],
	},
	'tesla-backend-infra': {
		short: 'Backend Engineer Intern',
		questions: ['Has he used gRPC?', 'What back-end work has he done at scale?'],
		matches: [
			{
				asked: 'Experience with REST/gRPC APIs, messaging queues, or distributed systems',
				did: "He moved Shopify's internal services from HTTP/1 to gRPC, cutting internal request latency 10x, and shipped a security feature into Redpanda's open-source C++ data-streaming code.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Exposure to testing, observability, or performance tuning',
				did: 'At Shopify he built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals, and helped get photo search over 55M+ images under 3 seconds.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Solid grasp of CS fundamentals (data structures, algorithms, complexity)',
				did: 'He built FlightO, a C++17 program that uses Held-Karp dynamic programming to find the cheapest multi-city trip, planning 8 cities over 90 days in about 20 ms.',
				item: 'flighto',
			},
		],
	},
	'tesla-fleetnet': {
		short: 'Fullstack Engineer Intern',
		questions: ['What has he shipped with React and Rails?', 'Has he moved systems to faster designs?'],
		matches: [
			{
				asked: 'Experience with Rails, React, Ruby or Webpack',
				did: "He took Shop App's photo search to 20M+ users on React, Ruby on Rails and GraphQL, releasing it behind feature flags with an A/B test.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Migrate systems to designs with improved maintainability and performance',
				did: "He moved Shopify's internal services from HTTP/1 to gRPC, which cut internal request latency 10x.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Experience with gathering and building requirements from multiple stakeholders',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
		],
	},
	'tesla-ml-factory': {
		short: 'ML Engineer Intern',
		questions: ['How does his image search work?', 'Has he trained models himself?'],
		matches: [
			{
				asked: 'large batches of images for machine vision projects',
				did: 'At Shopify he built the image-matching engine that searches 55M+ images in under 3 seconds, after the team split the image library by category and color with a first AI pass.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'model training, iteration, and retraining, as well as model accuracy improvement',
				did: "He built AgentGym, which turns AI agents' failed runs into training pairs and trains models on them with DPO, raising task success 38% over the base agent across 24,000 traces.",
				item: 'agentgym',
			},
			{
				asked: 'They utilize natural language processing to do question answering',
				did: "He built an AI agent that uses RAG over tens of thousands of building-code rules and answers an architect's question in under 1 second.",
				item: 'architecture-rag-agent',
			},
		],
	},
	'tesla-si-tooling': {
		short: 'Fullstack Engineer Intern',
		questions: ['What web tools has he built in React?', 'Has he built tooling for machine learning work?'],
		matches: [
			{
				asked: 'Experience building modern web applications using React',
				did: "He wrote Cherry Blossom's TypeScript backend on Convex for its React app, where an AI agent designs circuit boards for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Build metrics and monitor performance + reliability of our systems',
				did: 'At Shopify he wired 300+ telemetry signals through Prometheus into 9 Grafana dashboards and 50+ alerts across 10 Shop App products, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Work with controls, planning, and machine learning engineers to build tooling tailored to their workflows',
				did: 'He built AgentGym, a tool that logs every step of every AI agent run, scores each run and turns failures into training data, raising task success 38% over the base agent.',
				item: 'agentgym',
			},
		],
	},
	tesla: {
		short: 'Software Engineering Intern',
		questions: ['What web apps has he shipped end to end?', 'How does he work with the people who use his tools?'],
		matches: [
			{
				asked: 'scope, design, build, and deliver with the people who will use it',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Monitor what you launch and iterate rapidly',
				did: "He shipped Shop App's photo search behind feature flags with an A/B test, rolling it out step by step, with 50+ alerts and 9 Grafana dashboards built from 300+ telemetry signals.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience with JavaScript/TypeScript and a frontend framework such as React/Vue/Svelte',
				did: "He wrote Cherry Blossom's TypeScript backend on Convex for its React app, where an AI agent designs circuit boards for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
		],
	},
	'tiktok-fullstack': {
		short: 'Fullstack Engineer Intern',
		questions: ['What did he ship at Shopify?', 'How does he use AI coding tools?'],
		matches: [
			{
				asked: 'Contribute to both frontend and backend development',
				did: "He took Shop App's photo search to 20M+ users on iOS and Android, working across SwiftUI and React clients and a Rails, GraphQL and Postgres back end.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Learn and apply AI-assisted development practices',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'AI-enabled product features, workflow automation',
				did: 'He built an AI workflow that reads and fills immigration forms for 10+ law firms, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
		],
	},
	'tiktok-visual-search': {
		short: 'ML Engineer Intern',
		questions: ['How did he make photo search fast?', 'Has he trained ML models himself?'],
		matches: [
			{
				asked: 'Experience with search, recommendation, machine learning, information retrieval',
				did: "He built the matching engine behind Shop App's photo search: image embeddings and vector search over 55M+ images in under 3 seconds, for 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Work with large-scale data, logs, metrics, or experiments',
				did: 'He launched photo search behind feature flags with an A/B test, and built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience using data to investigate product, user, or system problems',
				did: 'He built AgentGym, which logs and scores every agent run and trains on the failures, raising task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
		],
	},
	tmobile: {
		short: 'Software Engineering Intern',
		questions: ['Has he built frontend and backend features?', 'What did he ship at Shopify?'],
		matches: [
			{
				asked: 'Build, test, and maintain features across frontend applications and backend services',
				did: "He wrote Cherry Blossom's TypeScript backend on Convex for its React app, where an AI agent designs circuit boards for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Investigate issues and identify improvements that raise software quality and reliability',
				did: 'At Shopify he diagnosed and fixed a Google Cloud firewall misconfiguration affecting 75+ resources, and cut internal request latency 10x by moving services to gRPC.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Clear communication, a collaborative mindset, and the initiative to take ownership',
				did: "He and another intern co-led a 10-person team with PMs and designers, taking Shop App's photo search from his hackathon win to 20M+ users in 6 weeks.",
				item: 'shopify-visual-search',
			},
		],
	},
	toshiba: {
		short: 'AI Software Engineering Intern',
		questions: ['How does he use AI coding tools?', 'What AI features has he shipped?'],
		matches: [
			{
				asked: 'Use AI coding assistants such as Claude or Codex as a core part of your daily workflow',
				did: "He used Claude Code while building Shop App's photo search and ran a team of AI agents that tested approaches overnight, hitting the under-3-second target in 1 week instead of 3.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'natural-language search, smart form validation, intelligent data entry, and automated data extraction',
				did: 'He wrote the AI step that explains every field of the official immigration forms and auto-fills them; 10+ law firms use the app, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Understanding of large language models (LLMs), including how they work, prompt engineering',
				did: 'At Scale AI he built 200+ coding tasks as AI training data, writing problems and ranking model answers, and reviewed AI-written code in 4 languages.',
				item: 'scale-ai',
			},
		],
	},
	tribalscale: {
		short: 'Software Engineer Co-op',
		questions: ['What has he built for clients?', 'What voice agents has he built?'],
		matches: [
			{
				asked: 'Work on real client projects across a variety of industries',
				did: 'He built AI tools end to end for 4 business clients, from immigration law firms to an architecture firm and Hotel Jaro.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Design and build agentic workflows where AI systems',
				did: "He built the harness for Sakura, Cherry Blossom's AI agent, with LangChain and CrewAI, plus a research step that searches embeddings in Pinecone; Cherry Blossom has 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Collaborate with engineers through pair programming and AI-assisted development',
				did: 'At Shopify he used Claude Code and ran a team of AI agents that tested search approaches overnight, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	trimble: {
		short: 'AI Developer Intern',
		questions: ['What AI automations has he built for businesses?', 'Has he built RAG over building codes?'],
		matches: [
			{
				asked: 'evaluate intelligent prototypes, agentic workflows, and automated pipelines',
				did: 'He built an app that reads official immigration PDF forms, has an AI model explain every field, and fills them; 10+ law firms use it, saving about 8 hours per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'turn complex workflow requirements into functional AI-driven automations',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office, and built it to answer from tens of thousands of rules in under 1 second.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Conduct rapid prototyping and sandbox testing to evaluate model performance, test technical hypotheses',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	unity: {
		short: 'New Grad Software Developer',
		questions: ['What C++ work has he done?', 'What has he built that people use?'],
		matches: [
			{
				asked: 'a contribution to an open source project',
				did: "He got a security-feature PR merged into Redpanda's open-source C++ code, which unblocked Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'a university project you took further than the assignment required',
				did: 'FlightO began as a university C++ project that planned bus trips across Quebec City; he rebuilt it as a C++17 flight finder that plans 8 cities over a 90-day window in about 20 ms.',
				item: 'flighto',
			},
			{
				asked: 'how they think when they do not know the answer',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, which hit the under-3-second target in 1 week instead of the expected 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	verizon: {
		short: 'GenAI Systems Engineer',
		questions: ['What voice agents has he built?', 'Has he built multi-agent systems?'],
		matches: [
			{
				asked: 'Exposure to voice recognition',
				did: "Built Hotel Jaro's front-desk voice AI agent: Twilio connects the call, Whisper turns the guest's speech into text, and it has handled 1,000+ calls, 80% with no staff.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'building multi-agent AI systems with LangChain',
				did: "Built the agent harness for Cherry Blossom's AI agent on LangChain and CrewAI, with GraphRAG and vector search over Pinecone; 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Hands-on experience with Graph Databases (Neo4j)',
				did: "Built Linea's MCP server, which combines GraphRAG and vector search over 500K+ building-code and permit nodes, and checks plans against a Neo4j graph of code clauses.",
				item: 'linea',
			},
		],
	},
	verkada: {
		short: 'Backend Software Engineer',
		questions: ['Has he built low-latency services?', 'What computer vision work has he shipped?'],
		matches: [
			{
				asked: 'Define and improve low-latency, high-throughput, high-reliability microservice architectures',
				did: 'At Shopify he cut internal request latency 10x by moving services from HTTP/1 to gRPC.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Design and develop features incorporating cutting edge computer vision',
				did: "He built the image-matching engine behind Shop App's photo search, which finds similar products across 55M+ images in under 3 seconds with image embeddings and vector search.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Design clean APIs and implement them using Python and/or Go',
				did: 'He wrote Python services with FastAPI and asyncio for a form workflow used by 10+ immigration law firms, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
		],
	},
	vsp: {
		short: 'Agentic AI and ML Intern',
		questions: ['Has he built RAG or agents?', 'What ML models has he trained?'],
		matches: [
			{
				asked: 'Develop, test, and optimize AI agents, prompts, workflows',
				did: 'Built AgentGym, which logs every step of every agent run, scores each run and turns failures into training data, raising task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'Build, train, and evaluate ML models for tasks such as classification',
				did: 'Built Valorant Spike Predictor: one XGBoost model per map, tuned with Optuna and scored with accuracy and log-loss against a most-common-site baseline.',
				item: 'valorant-spike-predictor',
			},
			{
				asked: 'Collaborate with cross-functional stakeholders to design and deliver AI and machine learning solutions that address business needs',
				did: 'Scoped a building-code agent with an architecture firm, visited their office to see how architects work, and built it to answer in under 1 second with RAG over tens of thousands of rules.',
				item: 'architecture-rag-agent',
			},
		],
	},
	zebra: {
		short: 'Software/AI Engineer Intern',
		questions: ['Has he built Android apps with the camera?', 'Has he built AI agents that read documents?'],
		matches: [
			{
				asked: 'integrating RFID, Vision AI, Barcode Scanner, and Camera into Android applications',
				did: "He shipped Shop App's photo search on iOS and Android, where a shopper snaps a photo and sees similar products, to 20M+ Shop App users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'LLM-powered agents to automate workflow parsing, extract system insights from unstructured data',
				did: 'He built an app that reads official immigration PDF forms, has an AI model explain every field, and fills them; 10+ law firms use it, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'data logging pipelines to compile structured datasets for machine learning training',
				did: 'He built AgentGym, whose proxy logs every step of every agent run and turns useful failures into training pairs, raising task success 38% across 24,000 traces.',
				item: 'agentgym',
			},
		],
	},
	zus: {
		short: 'Platform Engineering Co-op',
		questions: ['What data systems has he worked on?', 'Has he handled sensitive data?'],
		matches: [
			{
				asked: 'a strong desire to ensure that patient data is secure and used appropriately',
				did: 'At iA Financial Group he found a critical privacy flaw in a database review and helped fix it, protecting the data of 10,000+ clients.',
				item: 'ia-financial',
			},
			{
				asked: 'curious about both high and low-level technical details of data stores and pipelines',
				did: "He shipped a security feature into Redpanda's open-source C++ code, a data-streaming tool, which unblocked Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'improve the usability, scalability, and performance of the platform',
				did: 'At Shopify he built search that finds the closest match for a photo across 55M+ images in under 3 seconds, for 20M+ Shop App users.',
				item: 'shopify-visual-search',
			},
		],
	},
	alarm: {
		short: 'Software Rotation Associate',
		questions: ['Has he built anything that touches hardware?', 'Has he worked directly with customers?'],
		matches: [
			{
				asked: 'Experience or coursework in machine learning, computer vision, or AI-adjacent domains',
				did: "He took Shop App's photo search from his hackathon win to 20M+ users, searching 55M+ images in under 3 seconds with image embeddings and vector search.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Genuine curiosity about AI, IoT, and the intersection of software and hardware',
				did: 'He built Cherry Blossom, an AI agent that designs circuit boards from plain English and flags mistakes before manufacturing; it has 1,500+ monthly users.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Experience working on or directly adjacent to customer-facing features, products, or support',
				did: "He built a voice AI agent that answers guest calls at Hotel Jaro's front desk: 1,000+ calls handled, 80% of them with no staff involved.",
				item: 'hotel-jaro-voice',
			},
		],
	},
	'amat-tpm': {
		short: 'Program Management Intern',
		questions: ['Has he built dashboards for key metrics?', 'What has he automated?'],
		matches: [
			{
				asked: 'dashboards and automated reports to monitor key metrics',
				did: 'Built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals at Shopify, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'identify opportunities for process improvement, automation and data driven optimization',
				did: 'At iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries with an automated Python/C# pipeline.',
				item: 'ia-financial',
			},
			{
				asked: 'Quick learner and able to solve problems creatively and analytically.',
				did: 'Built Cherry Blossom, an AI agent that designs circuit boards from plain English for 1,500+ monthly users, and 94% of its boards work on the first manufacturing run.',
				item: 'cherry-blossom',
			},
		],
	},
	amfam: {
		short: 'GenAI and ML Intern',
		questions: ['What AI has he built for real clients?', 'Has he worked with financial data?'],
		matches: [
			{
				asked: 'Build and develop ML applications to address business problems.',
				did: "He built a voice AI agent for Hotel Jaro's front desk that has handled 1,000+ guest calls, 80% of them with no staff involved.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'Demonstrated experience providing customer-driven solutions, support, or service.',
				did: 'He built an AI workflow that reads and fills immigration forms for 10+ law firms, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Assist with data cleaning, preparation, and analysis.',
				did: 'The Used-Car Deal Finder compares each car with similar local listings to find its usual price and flags the ones 15% or more under it, and it has 2,000+ users.',
				item: 'used-car-deal-finder',
			},
		],
	},
	'asml-bsai': {
		short: 'Business Systems AI Intern',
		questions: ['What workflows has he automated with AI?', 'Has he taught teams to use AI tools?'],
		matches: [
			{
				asked: 'Identify and map high-value, repetitive workflows that are candidates for agentic automation',
				did: 'He built an AI workflow that reads and fills immigration forms for 10+ law firms, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Engage stakeholders to identify knowledge gaps and pain points for AI adoption',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Ability to document and communicate complex concepts to audiences without expertise in the subject.',
				did: 'As an Intel and Adobe ambassador he taught 1,500+ students AI tools in hands-on workshops at 10+ universities and hackathons.',
				item: 'intel-ambassador',
			},
		],
	},
	'asml-euv': {
		short: 'Machine Learning Intern',
		questions: ['What image analysis has he done?', 'How does he check that a metric holds up?'],
		matches: [
			{
				asked: 'Familiar with ML/AI-based image analysis methods.',
				did: "He built the image-matching engine behind Shop App's photo search, where image embeddings and vector search find similar products across 55M+ images in under 3 seconds.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Knowledge or experience using Python for data analysis.',
				did: 'He built the Valorant Spike Predictor in Python with pandas and XGBoost, turning every round into a row and scoring one model per map against a most-common-site baseline.',
				item: 'valorant-spike-predictor',
			},
			{
				asked: 'Ability to analyze technical data and communicate findings and recommendations.',
				did: 'NeuroVision turns a video into 20,000+ neural response signals per second, maps them into heatmaps and writes a plain-English report with suggested fixes.',
				item: 'neurovision',
			},
		],
	},
	blackhawk: {
		short: 'Associate Product Manager',
		questions: ['How has he automated manual work?', 'Has he written product requirements?'],
		matches: [
			{
				asked: 'Explore and leverage AI technologies, workflow automation, and self-service capabilities to reduce manual effort',
				did: 'He built an app that reads and fills Canadian and Quebec immigration forms for law firms; 10+ firms use it, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Work with cross-functional teams to define product requirements',
				did: 'At Shopify he co-led a 10-person team with PMs and designers, wrote the design docs at the start, and shipped photo search in 6 weeks behind feature flags with an A/B test.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Analyze complex business workflows and identify opportunities to simplify onboarding, improve operational efficiency',
				did: 'At iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries with an automated Python/C# pipeline.',
				item: 'ia-financial',
			},
		],
	},
	bmo: {
		short: 'Software Developer Co-op',
		questions: ['What has he shipped at Shopify?', 'Has he worked at a financial company?'],
		matches: [
			{
				asked: 'Translates user needs into technical specifications',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Ensures that code/configurations adhere to the security, logging, error handling, and performance standards',
				did: "On Shopify's Infrastructure Security team he cut internal request latency 10x by moving services to gRPC and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Performs preventative and corrective maintenance, troubleshooting and fault rectification',
				did: 'At Shopify he built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
		],
	},
	'boston-sci': {
		short: 'Software Engineering Co-op',
		questions: ['Has he built software for physical products?', 'What C++ work has he done?'],
		matches: [
			{
				asked: 'Experience using at least one programming language, such as C, C++, C# or Python, in a professional setting',
				did: "At Shopify he got a security-feature PR merged into Redpanda's open-source C++ code, which unblocked Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'software development tools, such as Claude Code, Codex and GitHub Copilot',
				did: "He used Claude Code while building Shop App's photo search and ran a team of AI agents that tested approaches overnight, hitting the under-3-second target in 1 week instead of 3.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Contribute to the development of new product concepts, software designs and processes',
				did: 'He built Cherry Blossom, where an AI agent designs circuit boards from plain English and every AI edit is checked before manufacturing; 94% of the boards work on the first manufacturing run.',
				item: 'cherry-blossom',
			},
		],
	},
	candid: {
		short: 'Deployment New Grad',
		questions: ['Has he worked directly with customers?', 'What workflows has he automated with AI?'],
		matches: [
			{
				asked: 'iterating on prompts for agent phone calls to navigate payer IVRs',
				did: "He built Hotel Jaro's front-desk voice agent with Whisper, ElevenLabs and Twilio; it has handled 1,000+ guest calls, 80% of them with no staff involved.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'Lead end-to-end implementations for new customers',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'your instinct is to fix the system, not work around it',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
		],
	},
	ciena: {
		short: 'Software Developer Co-op',
		questions: ['Has he built data pipelines at work?', 'How strong is he in statistics?'],
		matches: [
			{
				asked: 'Develop pipelines for data transformation and presentation.',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline over SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
			{
				asked: 'Skills in statistics.',
				did: 'He was a teaching assistant at Laval in Probability & Statistics, helping 500+ students and grading 1,000+ assignments.',
				item: 'laval-ta',
			},
			{
				asked: 'Collaborate closely with validation engineers to understand needs and define optimum solutions.',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
		],
	},
	cisco: {
		short: 'Full Stack Software Engineer',
		questions: ['What observability has he built?', 'What has he shipped with React?'],
		matches: [
			{
				asked: 'Application Performance Monitoring (APM), distributed tracing, cloud telemetry, or metrics platforms',
				did: 'At Shopify he wired 300+ telemetry signals through Prometheus into 9 Grafana dashboards and 50+ alerts across 10 Shop App products, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Hands-on experience building interactive web applications and user interfaces using React',
				did: "He wrote the TypeScript backend on Convex for Cherry Blossom's React app, where an AI agent designs circuit boards for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Demonstrated experience developing backend services and applications using Java (or Python / Go)',
				did: 'He rebuilt the Used-Car Deal Finder as a Go crawler and a Rust pricing engine (WebAssembly) on Cloudflare Workers; it has 2,000+ users.',
				item: 'used-car-deal-finder',
			},
		],
	},
	'constellation-fullstack': {
		short: 'Full Stack Intern',
		questions: ['What has he built with React?', 'What hackathons has he won?'],
		matches: [
			{
				asked: 'Have you participated in a hackathon?',
				did: "His Shopify hackathon prototype became Shop App's photo search, which he co-led with PMs and designers in a 10-person team and shipped to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Develop new features for our web using React',
				did: 'He built Cherry Blossom, a React and TypeScript web app where an AI agent designs circuit boards from plain English, used by 1,500+ people a month.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Create or update JavaScript and Python APIs',
				did: 'He wrote the form-reading and filling code for an immigration law-firm workflow, with FastAPI and asyncio for the services; 10+ law firms use it, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
		],
	},
	constellation: {
		short: 'AI and Automation Intern',
		questions: ['How has he taught people to use AI tools?', 'How does he test whether an AI tool works?'],
		matches: [
			{
				asked: 'Help develop and refine enablement materials such as quick-start guides, FAQs, office-hours content',
				did: 'He taught 1,500+ students AI tools in hands-on workshops at 10+ universities and hackathons, across his Intel and Adobe ambassador roles.',
				item: 'intel-ambassador',
			},
			{
				asked: 'Contribute to lightweight testing of AI solutions and workflows',
				did: 'At Scale AI he wrote coding problems, ranked the answers AI models gave, and reviewed AI-written code in 4 languages for bugs and test gaps.',
				item: 'scale-ai',
			},
			{
				asked: 'simple time-saved or quality proxy measures',
				did: 'He built a document workflow for immigration law firms that 10+ firms use, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
		],
	},
	datavisor: {
		short: 'Software Engineer Intern',
		questions: ['Has he worked with streaming systems like Kafka?', 'How does he design for scale?'],
		matches: [
			{
				asked: 'Experience with messaging systems (Kafka or similar).',
				did: "His security-feature PR was merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Basic system design skills (scalability, reliability, performance).',
				did: "He took Shop App's photo search to 20M+ users, searching 55M+ images in under 3 seconds, with 50+ alerts and 9 Grafana dashboards watching it.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Strong CS fundamentals (data structures, algorithms, OS, networking).',
				did: 'He built FlightO in C++17, an exact Held-Karp dynamic-programming search that plans 8 cities over a 90-day window in about 20 ms and 9 MB.',
				item: 'flighto',
			},
		],
	},
	dimensional: {
		short: 'Software Engineer Intern',
		questions: ['What infrastructure work has he done?', 'Has he worked in financial services?'],
		matches: [
			{
				asked: 'Experience writing automated tests and using version control.',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, catching bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
			{
				asked: 'Familiarity with one or more of the following areas: DevOps, database platforms, server infrastructure, or cybersecurity.',
				did: "On Shopify's Infrastructure Security team he cut internal request latency 10x by moving services to gRPC and fixed a firewall misconfiguration affecting 75+ Google Cloud resources.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Experience writing applications in one or more programing languages.',
				did: 'At iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries with an automated Python/C# pipeline.',
				item: 'ia-financial',
			},
		],
	},
	empower: {
		short: 'Full Stack Software Engineer',
		questions: ['Has he used React and TypeScript in production?', 'How does he check AI-written code?'],
		matches: [
			{
				asked: 'using approved AI-assisted coding and testing tools with human review',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, catching bugs, test gaps and Git issues, and built 200+ coding tasks as AI training data.',
				item: 'scale-ai',
			},
			{
				asked: 'Foundational knowledge of full stack development, API design, and microservices',
				did: "He took Shop App's photo search from his hackathon win to 20M+ users, with React and TypeScript on the front end and Ruby on Rails, GraphQL and Node.js on the back end.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'follow company requirements for data protection and responsible AI use',
				did: 'At iA Financial Group he found a critical privacy flaw in a database review and helped fix it, protecting the data of 10,000+ clients.',
				item: 'ia-financial',
			},
		],
	},
	endeavor: {
		short: 'Forward Deployed Engineer',
		questions: ['What has he built for clients?', 'How does he work with customers on site?'],
		matches: [
			{
				asked: 'work side by side with our customers, rapidly understanding their toughest issues',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'own the end-to-end execution and implementation of high-stakes projects',
				did: 'He built an AI workflow end to end that reads and fills immigration forms; 10+ law firms use it, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'built inside their own stack, in production in weeks',
				did: "He took Shop App's photo search from his hackathon win to launch in 6 weeks with a 10-person team he co-led, reaching 20M+ users.",
				item: 'shopify-visual-search',
			},
		],
	},
	enfos: {
		short: 'Software Engineer Intern',
		questions: ['Has he built AI that reads documents?', 'Has he worked with financial data?'],
		matches: [
			{
				asked: 'projects involving document intelligence, natural-language interfaces, automation',
				did: 'He built an app that reads official immigration PDF forms, uses AI to explain every field and fills them; 10+ law firms use it, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Interest in using AI-assisted development tools effectively as part of the software development process',
				did: "While building Shop App's photo search he ran a team of AI agents that tested approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of the expected 3.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'processing, validating, transforming, and presenting complex environmental, financial, and transactional data',
				did: 'At iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries with an automated Python/C# pipeline working with SQL and MongoDB data.',
				item: 'ia-financial',
			},
		],
	},
	'engramme-fullstack': {
		short: 'Full-Stack Co-op',
		questions: ['What has he built in React and TypeScript?', 'Has he shipped AI features to users?'],
		matches: [
			{
				asked: 'Proficiency in React, TypeScript, and modern JavaScript (ES6+)',
				did: "He wrote Cherry Blossom's TypeScript backend on Convex for its React app, where an AI agent designs circuit boards for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Integrate with AI/ML services and handle complex data visualization',
				did: 'At Shopify he built the image-matching engine and the AI query step for photo search, and wired 300+ telemetry signals into 9 Grafana dashboards and 50+ alerts.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Strong understanding of database design and SQL',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline over SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
		],
	},
	'engramme-ml': {
		short: 'Machine Learning Co-op',
		questions: ['How does AgentGym measure agents?', 'Has he built retrieval or vector search?'],
		matches: [
			{
				asked: 'Background in eval pipelines, model testing, or benchmarking.',
				did: 'He built AgentGym, which logs every step of every agent run, scores each run, and raised task success 38% over the base agent, measured on 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'Understanding of LLMs, embeddings, or retrieval systems.',
				did: 'At Shopify he built photo search with image embeddings and vector search across 55M+ images in under 3 seconds, plus a self-hosted LLM writing 7 search queries per photo.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Analyze model behavior, surface failure modes, and define quality metrics.',
				did: 'At Scale AI he built 200+ coding tasks as AI training data, ranking model answers, and reviewed AI-written code in 4 languages for bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
		],
	},
	equitable: {
		short: 'Product Management Intern',
		questions: ['Has he run an A/B test?', 'How does he gather customer insights?'],
		matches: [
			{
				asked: 'Analyze product metrics, funnels and experiment (A/B test) results',
				did: "Shipped Shop App's photo search behind feature flags with an A/B test, rolling it out to millions of users step by step while watching for problems.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Gather and synthesize customer insights from feedback, app reviews, support contacts and user research',
				did: 'Scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Partner with customer-facing teams (e.g., Customer Service)',
				did: "Built a voice AI agent for Hotel Jaro's front desk that handled 1,000+ guest calls, 80% of them with no staff involved.",
				item: 'hotel-jaro-voice',
			},
		],
	},
	'extra-space': {
		short: 'Associate Software Engineer',
		questions: ['Has he written C# and SQL at work?', 'Has he trained people on a tool he built?'],
		matches: [
			{
				asked: 'Proficiency in at least two of the following: C#, VB.NET, ASP.NET, Salesforce APEX, PHP, T-SQL',
				did: 'At iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries with an automated Python/C# pipeline working with SQL data.',
				item: 'ia-financial',
			},
			{
				asked: 'Ability to present technical concepts clearly to non-technical audiences',
				did: 'He taught 1,500+ students AI tools in hands-on workshops at 10+ universities and hackathons, across his Intel and Adobe ambassador roles.',
				item: 'intel-ambassador',
			},
			{
				asked: 'partners with business teams to understand requirements and deliver technology',
				did: 'He built a document workflow for immigration law firms end to end: 10+ firms use it, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
		],
	},
	firework: {
		short: 'Data Engineer Intern',
		questions: ['What data pipelines has he built?', 'Has he worked with video or commerce data?'],
		matches: [
			{
				asked: 'Write and optimize SQL queries and Python scripts to support data processing, reporting, and analysis',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline over SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
			{
				asked: 'Help build and maintain data tools and dashboards that provide actionable insights',
				did: 'At Shopify he wired 300+ telemetry signals through Prometheus into 9 Grafana dashboards and 50+ alerts across 10 Shop App products, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Support the development of ETL/ELT processes to collect, transform, and organize data from various sources',
				did: 'He built the Used-Car Deal Finder, which prices each listing against similar local listings and flags cars 15% or more under market; it has 2,000+ users.',
				item: 'used-car-deal-finder',
			},
		],
	},
	'first-citizens': {
		short: 'Applied AI Intern',
		questions: ['How does he know an AI model works?', 'Has he built retrieval over documents?'],
		matches: [
			{
				asked: 'Help create evaluation datasets and run evaluations',
				did: 'At Scale AI he built 200+ coding tasks as AI training data, writing coding problems and ranking the answers AI models gave to them.',
				item: 'scale-ai',
			},
			{
				asked: 'Some exposure to model evaluation and test design',
				did: 'He measured AgentGym against the base agent without its learning loop: task success rose 38% on computer-use and repeated tasks, measured on 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'Genuine interest in both conventional machine learning and generative AI',
				did: 'He trained one XGBoost model per map to predict where Valorant attackers plant, scored with accuracy and log-loss against a most-common-site baseline.',
				item: 'valorant-spike-predictor',
			},
		],
	},
	gaig: {
		short: 'DevOps Developer Intern',
		questions: ['How does he use AI to ship faster?', 'Has he worked in large codebases?'],
		matches: [
			{
				asked: 'Utilize AI to improve software quality, performance and delivery time',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of the expected 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Ability to dive into a large polyglot codebase and contribute as you learn.',
				did: "He got a security-feature PR merged into Redpanda's open-source C++ code, which unblocked Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'developer experience, code quality and technical debt',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, Python, JavaScript/React, Java and C++, catching bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
		],
	},
	'global-relay': {
		short: 'Java Developer Co-op',
		questions: ['Has he worked with Java?', 'How does he compare design options?'],
		matches: [
			{
				asked: 'Course work or work experience with Java',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, including Java, catching bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
			{
				asked: 'research different implementation options',
				did: "For Shop App's photo search he wrote the design docs, then ran a team of AI agents that tested approaches overnight, hitting the under-3-second target in 1 week instead of 3.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Continuous integration systems',
				did: 'At iA Financial Group he built CI/CD pipelines with Buildkite and Yarn, so changes were built, tested and shipped automatically.',
				item: 'ia-financial',
			},
		],
	},
	'gm-labeling': {
		short: 'Software Systems Engineer',
		questions: ['How has he worked with AI training data?', 'How does he use AI tools when he codes?'],
		matches: [
			{
				asked: 'create reliable training data at scale',
				did: 'At Scale AI he built 200+ coding tasks as AI training data, writing coding problems and ranking the answers AI models gave to them.',
				item: 'scale-ai',
			},
			{
				asked: 'Collaborate with ML engineers to design and integrate ML',
				did: "He built AgentGym, where a hindsight step turns agents' failed runs into better and worse answers and self-hosted models train on those pairs with DPO, raising task success 38% over the base agent across 24,000 traces.",
				item: 'agentgym',
			},
			{
				asked: 'Hands-on experience leveraging AI tools',
				did: "He used Claude Code while building Shop App's photo search and ran a team of AI agents that tested approaches overnight, hitting the under-3-second target in 1 week instead of 3.",
				item: 'shopify-visual-search',
			},
		],
	},
	'greatamerica-platform': {
		short: 'Platform Engineering Intern',
		questions: ['What infrastructure has he worked on?', 'Has he written SQL at work?'],
		matches: [
			{
				asked: 'Write SQL queries and assist in optimizing database interactions in support of platform data and reporting needs.',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline working with SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
			{
				asked: 'Assist with automation and CI/CD pipeline exposure (Azure DevOps, GitHub) and help troubleshoot and resolve platform issues.',
				did: 'At Shopify he fixed a firewall misconfiguration affecting 75+ Google Cloud resources and wrote Terraform to manage infrastructure as code.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Document technical processes, configuration standards',
				did: 'At Shopify he built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
		],
	},
	'greatamerica-swe': {
		short: 'Software Engineer Intern',
		questions: ['Has he used C# and SQL at work?', 'What did he ship at Shopify?'],
		matches: [
			{
				asked: 'asp.NET, SQL',
				did: 'At iA Financial Group he built an automated payroll pipeline in Python and C# working with SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
			{
				asked: 'Familiarity with software development lifecycle fundamentals',
				did: "He co-led Shop App's photo search from design docs to launch in 6 weeks, rolled out behind feature flags and an A/B test to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'passion for software/application development and a working knowledge of development fundamentals',
				did: "He wrote Cherry Blossom's TypeScript backend on Convex; its AI agent designs circuit boards from plain English for 1,500+ monthly users, with 10,000+ boards built.",
				item: 'cherry-blossom',
			},
		],
	},
	guidewire: {
		short: 'Software Engineer',
		questions: ['What data pipelines has he built?', 'What did he do at iA Financial Group?'],
		matches: [
			{
				asked: 'Demonstrated ability to embrace AI and apply it to your current role',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience with Big Data and distributed systems',
				did: "He shipped a security feature into Redpanda's open-source C++ code, a data-streaming tool, which unblocked Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Experience in the insurance or SaaS industry',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline over SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
		],
	},
	hearst: {
		short: 'Editorial AI Intern',
		questions: ['What AI prototypes has he built?', 'How does he test and evaluate AI output?'],
		matches: [
			{
				asked: 'Experience with AI tooling and a proven track record of building prototypes with AI.',
				did: 'At Shopify he ran a team of AI agents that tested photo-search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Familiarity with prompt design, evaluation workflows or AI product prototyping.',
				did: 'At Scale AI he built 200+ coding tasks as AI training data, writing problems and ranking model answers.',
				item: 'scale-ai',
			},
			{
				asked: 'Contribute to internal tooling that makes our workflows and development processes more repeatable and scalable.',
				did: 'He built a workflow that reads and fills immigration forms for 10+ law firms, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
		],
	},
	highmark: {
		short: 'AI Platforms Intern',
		questions: ['Has he built RAG or agent backends?', 'Has he shipped Python services with FastAPI?'],
		matches: [
			{
				asked: 'Experience with backend frameworks such as FastAPI, Flask, Django',
				did: 'He wrote the form-reading and filling services of an immigration-forms app with FastAPI and asyncio; 10+ law firms use it, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'building backend capabilities for RAG and AI agent solutions',
				did: 'He built an AI agent that uses RAG over tens of thousands of building-code rules and answers an architect in under 1 second, with the retrieval layer written in Rust.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'improving system performance and observability',
				did: 'At Shopify he wired 300+ telemetry signals through Prometheus into 9 Grafana dashboards and 50+ alerts for photo search, which matches 55M+ images in under 3 seconds.',
				item: 'shopify-visual-search',
			},
		],
	},
	indeed: {
		short: 'Machine Learning Engineer Intern',
		questions: ['What models has he fine-tuned?', 'How does he evaluate a model?'],
		matches: [
			{
				asked: 'Significant domain knowledge with training, fine-tuning, and evaluating machine learning models.',
				did: "AgentGym trains self-hosted models with DPO on pairs built from the agents' own failed runs, raising task success 38% over the base agent across 24,000 traces.",
				item: 'agentgym',
			},
			{
				asked: 'Develop a variety of models from prototype to production.',
				did: "He took Shop App's photo search from his hackathon win to 20M+ users, shipping it behind feature flags with an A/B test.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'practical experience working on ML/LLM/Deep Learning models (e.g., Torch, Tensorflow, Huggingface, XGBoost).',
				did: 'For the Valorant Spike Predictor he trained one XGBoost model per map and tuned them with Optuna on log-loss against a most-common-site baseline.',
				item: 'valorant-spike-predictor',
			},
		],
	},
	'intel-compiler': {
		short: 'Compiler Engineer',
		questions: ['What C++ has he written?', 'What did he do as Intel oneAPI ambassador?'],
		matches: [
			{
				asked: 'C/C++, SYCL, CUDA, DSLs programming, object-oriented design principles, and complex data structures',
				did: 'He built FlightO in C++17, an exact Held-Karp dynamic program over cities and days that plans 8 cities over a 90-day window in about 20 ms and 9 MB.',
				item: 'flighto',
			},
			{
				asked: 'Collaborate with internal engineering teams and open-source communities',
				did: "He shipped a security feature into Redpanda's open-source C++ code, which unblocked Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Knowledge of performance analysis, optimization, and debugging techniques',
				did: 'At Shopify his team accepted a 5% drop in matching precision and split the image library by category and color to search 55M+ images in under 3 seconds.',
				item: 'shopify-visual-search',
			},
		],
	},
	jerry: {
		short: 'Product Manager in Training',
		questions: ['What products has he built himself?', 'How fast does he ship?'],
		matches: [
			{
				asked: 'work on building or scaling one of our new product verticals',
				did: 'He built the Used-Car Deal Finder at Hack the North 2026: it finds underpriced used cars by pricing each listing against similar local ones, and it has 2,000+ users.',
				item: 'used-car-deal-finder',
			},
			{
				asked: 'You have a strong bias for action',
				did: "He took Shop App's photo search from his hackathon win to launch in 6 weeks, and ran AI agents overnight to hit the under-3-second target in 1 week instead of 3.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'You act like your name is on the door',
				did: 'He built Cherry Blossom, an AI agent that designs circuit boards from plain English; it has 1,500+ monthly users and 10,000+ boards built.',
				item: 'cherry-blossom',
			},
		],
	},
	jmfamily: {
		short: 'AI COE Intern',
		questions: ['How does he use AI coding agents?', 'How does AgentGym evaluate agents?'],
		matches: [
			{
				asked: 'experimenting with agentic workflows, AI coding agents, development harnesses, Model Context Protocol (MCP)',
				did: 'At Shopify he ran a team of AI agents that tested approaches overnight in a sandbox, which hit the under-3-second target for photo search in 1 week instead of the expected 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Conduct AI model and agent evaluations through hands-on experimentation, benchmarking, testing',
				did: 'He built AgentGym, which logs every step of every agent run, scores each run, and raised task success 38% over the base agent, measured on 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'support technical workshops, demonstrations, innovation events',
				did: 'He taught 1,500+ students AI tools in hands-on workshops at 10+ universities and hackathons, across his Intel and Adobe ambassador roles.',
				item: 'intel-ambassador',
			},
		],
	},
	'kla-algorithm': {
		short: 'Algorithm Engineering Intern',
		questions: ['What image work has he done?', 'How does he cut compute cost?'],
		matches: [
			{
				asked: 'Experiment with new and novel techniques to improve results or reduce compute cost',
				did: 'AgentGym pairs Hindsight Experience Replay with DPO to train agents on their own failures, raising task success 38% over the base agent while compute cost fell 98%.',
				item: 'agentgym',
			},
			{
				asked: 'Build signal/image processing and analysis tools for more efficient experimentation.',
				did: 'He ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target over 55M+ images in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Develop software tools and solutions processing and analyzing measurements and images',
				did: 'NeuroVision splits each video into chunks with ffmpeg and runs a multimodal PyTorch pipeline that turns video and audio into 20,000+ neural response signals per second.',
				item: 'neurovision',
			},
		],
	},
	lexisnexis: {
		short: 'Software Engineer I',
		questions: ['Has he worked with sensitive client data?', 'How does he review code?'],
		matches: [
			{
				asked: 'Collaborating with stakeholders to gather and analyze requirements',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Implementing successful development processes, coding best practices, and code reviews',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, Python, JavaScript/React, Java and C++, catching bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
			{
				asked: 'upholding the highest standards of security and privacy',
				did: 'At iA Financial Group he found a critical privacy flaw in a database review and helped fix it, protecting the data of 10,000+ clients.',
				item: 'ia-financial',
			},
		],
	},
	longitude: {
		short: 'Deployment Strategist',
		questions: ['What AI training data has he built?', 'How does he find where models fail?'],
		matches: [
			{
				asked: 'Own data labeling programs end to end',
				did: 'At Scale AI he built 200+ coding tasks as AI training data, writing problems and ranking model answers, and reviewed AI-written code in 4 languages.',
				item: 'scale-ai',
			},
			{
				asked: 'Translate messy, expert-level workflows into labeling tasks',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and built it to search tens of thousands of rules in under 1 second.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Hunt down model failure modes and quality gaps',
				did: "He built AgentGym, which logs every step of an agent's runs and turns useful failures into better training pairs, raising task success 38% over the base agent across 24,000 traces.",
				item: 'agentgym',
			},
		],
	},
	'meta-tpm': {
		short: 'Technical Program Manager Intern',
		questions: ['What has he built for hardware manufacturing?', 'How does he use AI to speed up delivery?'],
		matches: [
			{
				asked: 'first-pass and last-pass yield',
				did: 'Built Cherry Blossom, where 94% of the boards designed with it work on the first manufacturing run, for 1,500+ monthly users.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Experience using AI tools, such as workflow automation or scripting, to speed up program delivery or improve operations',
				did: "Ran a team of AI agents that tested approaches overnight, which hit Shop App photo search's under-3-second target in 1 week instead of the expected 3.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Communication skills, including the ability to turn complex engineering data into clear recommendations',
				did: 'Built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals at Shopify, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
		],
	},
	'microsoft-redmond': {
		short: 'Software Engineer',
		questions: ['What production issues has he debugged?', 'What data pipelines has he built?'],
		matches: [
			{
				asked: 'Developing data ingestion and processing features',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline over SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
			{
				asked: 'Troubleshooting production issues',
				did: "On Shopify's Infrastructure Security team he diagnosed and fixed a Google Cloud firewall misconfiguration affecting 75+ resources.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Building and operating cloud services',
				did: "He shipped Shop App's photo search to 20M+ users on Google Cloud with Kubernetes, and built its 50+ alerts, 9 Grafana dashboards and on-call runbooks.",
				item: 'shopify-visual-search',
			},
		],
	},
	mtb: {
		short: 'Software Engineer',
		questions: ['What mobile app work has he shipped?', 'Has he worked at a financial company?'],
		matches: [
			{
				asked: 'customer-facing mobile and online banking applications',
				did: "He took Shop App's photo search from his hackathon win to 20M+ users, shipping it on iOS and Android and on the shop.com front page.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'platform engineering, production reliability',
				did: 'At Shopify he fixed a firewall misconfiguration affecting 75+ Google Cloud resources and cut internal request latency 10x by moving services from HTTP/1 to gRPC.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Experience from technology internships',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated Python and C# pipeline, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
		],
	},
	'myriad360': {
		short: 'AI and Automation Engineer',
		questions: ['What automations has he built for clients?', 'Has he built RAG or worked with MCP?'],
		matches: [
			{
				asked: 'reviewing outputs for accuracy and usefulness',
				did: 'At Scale AI he built 200+ coding tasks as AI training data, writing problems and ranking model answers, and reviewed AI-written code in 4 languages.',
				item: 'scale-ai',
			},
			{
				asked: 'Build and update workflow automations, scripts, and integrations',
				did: 'He built an app that reads immigration PDF forms, uses Google Gemini to explain and pre-fill each field, and fills the forms with Puppeteer; 10+ law firms use it.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Participate in discovery sessions, capture requirements',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
		],
	},
	nex: {
		short: 'Game Development Intern',
		questions: ['Has he built games or used Unity?', 'What did he ship at Shopify?'],
		matches: [
			{
				asked: 'Passion for games and curiosity about what makes them fun.',
				did: 'He built Valorant Spike Predictor, which guesses where attackers will plant from round history, agents and economy, with one XGBoost model per map.',
				item: 'valorant-spike-predictor',
			},
			{
				asked: 'Brainstorm, prototype, and evaluate new game ideas in close collaboration with designers and fellow engineers.',
				did: "His Shopify hackathon prototype became Shop App's photo search, which he co-led with PMs and designers in a 10-person team and shipped to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Solid foundation in software development and algorithms.',
				did: 'He wrote FlightO in C++17: an exact Held-Karp dynamic-programming search that plans 8 cities over a 90-day window in about 20 ms.',
				item: 'flighto',
			},
		],
	},
	nooks: {
		short: 'Software Engineer',
		questions: ['What voice agents has he built?', 'How does AgentGym evaluate agents?'],
		matches: [
			{
				asked: 'Build low-latency voice AI on live calls that power live coaching and voice agents',
				did: "He built Hotel Jaro's front-desk voice agent with Whisper, ElevenLabs and Twilio; it has handled 1,000+ guest calls, 80% of them with no staff involved.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'from agent-building to simulations and evals to monitoring and feedback loops',
				did: 'He built AgentGym, which logs every step of every agent run, scores each run and learns from the failures, raising task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'Own projects from initial idea through deployment, monitoring, and iteration',
				did: "He took Shop App's photo search from his hackathon win to 20M+ users in 6 weeks, rolled it out behind feature flags with an A/B test, and built its 50+ alerts and 9 Grafana dashboards.",
				item: 'shopify-visual-search',
			},
		],
	},
	'nyt-pm': {
		short: 'Product Management Intern',
		questions: ['How does he learn what users need?', 'How did he launch the photo search?'],
		matches: [
			{
				asked: 'learn how they work, where the friction is, and what a better workflow looks like',
				did: 'Scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'contribute to active product work alongside product, design, and engineering',
				did: "Co-led a 10-person team with PMs and designers that took Shop App's photo search from his hackathon win to 20M+ users in 6 weeks.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'including the ability to explain complex ideas simply',
				did: 'Taught 1,500+ students AI tools in hands-on workshops at 10+ universities and hackathons, across his Intel and Adobe ambassador roles.',
				item: 'intel-ambassador',
			},
		],
	},
	paccar: {
		short: 'Data Engineer Intern',
		questions: ['Has he built data pipelines?', 'What computer vision work has he done?'],
		matches: [
			{
				asked: 'Design and implement AI vision solutions for image-based data processing and analytics.',
				did: 'At Shopify he built photo search over 55M+ images in under 3 seconds, with image embeddings, vector search and a self-hosted LLM writing 7 search queries per photo.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Build and support automated data pipelines from a wide range of data sources',
				did: 'His Used-Car Deal Finder reads new ads from several car sites every 5 minutes and a Rust price engine compares each car with similar local listings; it has 2,000+ users.',
				item: 'used-car-deal-finder',
			},
			{
				asked: 'Basic proficiency with SQL and Python for data manipulation, query writing, and script development',
				did: 'At iA Financial Group he built an automated payroll pipeline in Python and C# working with SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
		],
	},
	parallel: {
		short: 'Product Management Intern',
		questions: ['How does he turn user interviews into requirements?', 'What has he built for physical products?'],
		matches: [
			{
				asked: 'interviewing operators, rail partners, and internal teams to understand workflows and pain points',
				did: 'Scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'working with engineering and design to scope, prioritize, build, and launch a feature',
				did: "Co-led a 10-person team with PMs and designers, wrote the design docs, and shipped Shop App's photo search in 6 weeks behind feature flags with an A/B test.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Excitement about working in a hard-tech environment where software meets physical vehicles and real operations',
				did: 'Built Cherry Blossom, an AI agent that designs circuit boards from plain English for 1,500+ monthly users, and 94% of its boards work on the first manufacturing run.',
				item: 'cherry-blossom',
			},
		],
	},
	'paypal-ml': {
		short: 'Machine Learning Engineer Intern',
		questions: ['What ML models has he trained?', 'How did he measure AgentGym?'],
		matches: [
			{
				asked: 'Run experiments and evaluate model performance using appropriate methods and metrics',
				did: "He measured AgentGym against the base agent across 24,000 traces, and training on the agents' own failed runs with DPO raised task success 38%.",
				item: 'agentgym',
			},
			{
				asked: 'support scalable ML pipelines and the deployment and monitoring of models in production',
				did: "He took Shop App's photo search to 20M+ users, matching each photo across 55M+ images in under 3 seconds, and built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Exposure machine learning frameworks or tools such as scikit-learn, TensorFlow, or similar',
				did: 'He built the Valorant Spike Predictor in Python with XGBoost, scikit-learn, pandas and NumPy, training one model per map and tuning them with Optuna on log-loss.',
				item: 'valorant-spike-predictor',
			},
		],
	},
	'paypal-mobile': {
		short: 'Mobile Engineer Intern',
		questions: ['What mobile apps has he built?', 'Has he shipped to iOS and Android?'],
		matches: [
			{
				asked: 'Proficiency in Swift or Objective-C.',
				did: "Shop App's photo search, which he co-led, shipped on iOS and Android to 20M+ users, built with SwiftUI, Xcode and Android Studio.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience with Android development.',
				did: 'He rebuilt Translator-AI as an Android app in Kotlin, with Jetpack Compose screens, CameraX and on-device ML Kit that translates the text in a photo.',
				item: 'translator-ai',
			},
			{
				asked: 'Knowledge of cloud platforms (AWS, GCP, Azure).',
				did: 'Cherry Blossom, his circuit-board design app with 1,500+ monthly users, runs on Vercel, Convex Cloud, AWS and Azure.',
				item: 'cherry-blossom',
			},
		],
	},
	'paypal-swe': {
		short: 'Software Engineer Intern',
		questions: ['What did he ship at Shopify?', 'Has he built REST APIs and React apps?'],
		matches: [
			{
				asked: 'help triage production issues',
				did: 'At Shopify he diagnosed and fixed a Google Cloud firewall misconfiguration affecting 75+ resources.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'Collaborate with managers, project leads, peers, and cross-functional partners',
				did: "He co-led a 10-person team with PMs and designers that took Shop App's photo search from his hackathon win to 20M+ users in 6 weeks.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'scalable front-end and/or back-end software',
				did: 'He built the Used-Car Deal Finder, rebuilt as a Go crawler and a Rust pricing engine (WebAssembly) on Cloudflare Workers, and it has 2,000+ users.',
				item: 'used-car-deal-finder',
			},
		],
	},
	'pear-fde': {
		short: 'Forward Deployed Engineer',
		questions: ['What has he built for clients?', 'Has he automated software that has no API?'],
		matches: [
			{
				asked: 'Sit with doctors and staff to understand their workflows and requirements, and turn them into working software',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Experience with browser or desktop automation, or reverse engineering systems with no APIs',
				did: 'He built an app that reads immigration PDF forms, uses Google Gemini to explain and pre-fill each field, and fills the forms with Puppeteer; 10+ law firms use it.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Built LLM-powered products before',
				did: 'He built Cherry Blossom, an AI agent that designs circuit boards from plain English: 1,500+ monthly users, 10,000+ boards built, and 94% of the boards work on the first manufacturing run.',
				item: 'cherry-blossom',
			},
		],
	},
	playstation: {
		short: 'Software Developer Co-op',
		questions: ['What CI/CD work has he done?', 'How did he monitor systems at Shopify?'],
		matches: [
			{
				asked: 'Hands-on experience with CI/CD systems like Jenkins, GitHub Actions or similar tools.',
				did: 'At iA Financial Group he built CI/CD pipelines with Buildkite and Yarn, so changes were built, tested and shipped automatically.',
				item: 'ia-financial',
			},
			{
				asked: 'Constructing better tooling and metrics so that we, and other developers we work with, understand the health of our systems',
				did: 'At Shopify he wired 300+ telemetry signals through Prometheus into 9 Grafana dashboards and 50+ alerts across 10 Shop App products, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience in Python, C++, or Javascript (C++, JS experience preferred)',
				did: "His security-feature PR was merged into Redpanda's open-source C++ code, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
		],
	},
	plusgrade: {
		short: 'Applied AI Engineer Intern',
		questions: ['Has he built Python services with FastAPI?', 'How does he review AI-written code?'],
		matches: [
			{
				asked: 'You write clean, readable Python and understand how to build web services with frameworks like FastAPI',
				did: 'He wrote the form-reading and filling code for an immigration law-firm workflow, with FastAPI and asyncio for the services; 10+ law firms use it, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'pairing rapid code generation with the engineering judgment needed to audit and refine the output before it reaches production',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, catching bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
			{
				asked: 'keep response times fast under strict SLAs',
				did: 'At Shopify he built photo search over 55M+ images that answers in under 3 seconds, using image embeddings, vector search and a self-hosted LLM writing 7 search queries per photo.',
				item: 'shopify-visual-search',
			},
		],
	},
	'polished-snow': {
		short: 'Inference Research Engineer',
		questions: ['How did he get photo search under 3 seconds?', 'What has he built end to end?'],
		matches: [
			{
				asked: 'Profile and improve latency, throughput and cost across the inference stack.',
				did: 'At Shopify he got photo search over 55M+ images under 3 seconds by testing approaches overnight with a team of AI agents and accepting a 5% drop in matching precision.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'A builder with public work to show.',
				did: 'He built Cherry Blossom, where an AI agent designs circuit boards from plain English and every AI edit is checked: 1,500+ monthly users, 10,000+ boards built, and 94% of boards work on the first manufacturing run.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Solid in Python and at home with ML tooling.',
				did: 'He built NeuroVision, a multimodal PyTorch pipeline that turns video and audio into 20,000+ neural response signals per second on a 48GB VRAM GPU.',
				item: 'neurovision',
			},
		],
	},
	prologis: {
		short: 'AI and Automation Intern',
		questions: ['What has he automated for real clients?', 'How does he test AI agents?'],
		matches: [
			{
				asked: 'Identify and prioritize opportunities to improve employee productivity and automate repeatable business processes.',
				did: 'He built a workflow that reads and fills immigration forms for 10+ law firms, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Conduct user testing and quality evaluations, summarize findings, and prepare demos and handoff materials.',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Experience creating prompts, prototypes, or workflow automations with ChatGPT, Codex, workspace agents, or comparable tools.',
				did: 'At Shopify he ran a team of AI agents that tested photo-search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	'raydar-pm': {
		short: 'Product Manager',
		questions: ['How does he work with clients?', 'What automation has he launched?'],
		matches: [
			{
				asked: 'Meet with client teams to learn how they operate, collect needs and pinpoint where effort will matter most.',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Work side by side with engineers to define, build and launch automation features.',
				did: 'He built an app that reads and fills Canadian and Quebec immigration forms; 10+ law firms use it, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'A risk-tolerant, entrepreneurial mindset with a strong drive for ownership.',
				did: "He turned his Shopify hackathon win into Shop App's photo search, co-leading a 10-person team from design docs to launch in 6 weeks and on to 20M+ users.",
				item: 'shopify-visual-search',
			},
		],
	},
	'raydar-rpm': {
		short: 'Research Product Manager',
		questions: ['How does AgentGym measure agents?', 'What AI training data has he built?'],
		matches: [
			{
				asked: 'Fluency in LLM evaluations, benchmarks, coding agents',
				did: 'He built AgentGym, a self-improving agent framework that learns from its own failures, and measured it against the base agent: task success rose 38% across 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'Design data-curation programs using domain experts and synthetic-data generation',
				did: 'At Scale AI he built 200+ coding tasks as AI training data, writing problems and ranking model answers.',
				item: 'scale-ai',
			},
			{
				asked: 'Run experiments and benchmarks using simulation infrastructure and evaluation tooling',
				did: 'At Shopify he ran a team of AI agents that tested search approaches overnight in a sandbox, hitting the under-3-second target in 1 week instead of 3.',
				item: 'shopify-visual-search',
			},
		],
	},
	raydar: {
		short: 'Full-Stack Software Engineer',
		questions: ['Has he built software with the people who use it?', 'Has he worked on hardware products?'],
		matches: [
			{
				asked: 'Experience shipping rough prototypes to users and iterating on their feedback.',
				did: "He took Shop App's photo search from his hackathon win to 20M+ users in 6 weeks, shipping it behind feature flags with an A/B test and rolling it out step by step.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Prior work pairing code with hardware or mechanical equipment.',
				did: 'He built Cherry Blossom, an AI agent that designs circuit boards from plain English and checks every AI edit before a board goes to manufacturing, with 10,000+ boards built.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Spend regular time on the shop floor gathering feedback from machinists and mechanical engineers.',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
		],
	},
	rbc: {
		short: 'AI Engineer Co-op',
		questions: ['How does AgentGym train agents?', 'How strong is he in statistics?'],
		matches: [
			{
				asked: 'Loss Function Design, Deep learning, Reinforcement Learning',
				did: "He built AgentGym, where a hindsight step turns agents' failed runs into better and worse answers and self-hosted models train on those pairs with DPO, raising task success 38% over the base agent across 24,000 traces.",
				item: 'agentgym',
			},
			{
				asked: 'Strong understanding of probability concepts and statistical methods.',
				did: 'He was a teaching assistant at Laval in Probability & Statistics, helping 500+ students and grading 1,000+ assignments.',
				item: 'laval-ta',
			},
			{
				asked: 'Skilled in conveying quantitative concepts to non-technical stakeholders.',
				did: 'He taught 1,500+ students AI tools in hands-on workshops at 10+ universities and hackathons, across his Intel and Adobe ambassador roles.',
				item: 'intel-ambassador',
			},
		],
	},
	servicenow: {
		short: 'Agent Eval Engineer',
		questions: ['How does AgentGym measure and improve agents?', 'What observability has he built for real traffic?'],
		matches: [
			{
				asked: 'Comfort making a non-deterministic system measurable',
				did: 'He built AgentGym, which logs every step of every agent run and scores each run, and it raised task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
			{
				asked: 'Experience designing and operating systems that handle real traffic at scale',
				did: "He took Shop App's photo search to 20M+ users, searching 55M+ images in under 3 seconds, and built its 50+ alerts and 9 Grafana dashboards with runbooks for on-call engineers.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'gRPC/protobuf service and interface design',
				did: 'At Shopify he moved internal services from HTTP/1 to gRPC, cutting internal request latency 10x.',
				item: 'shopify-infra-security',
			},
		],
	},
	'simon-data': {
		short: 'Data Engineering Intern',
		questions: ['Has he built data pipelines?', 'What data agents has he built?'],
		matches: [
			{
				asked: 'Build data pipelines to connect to and ingest data from various data sources',
				did: 'His Used-Car Deal Finder reads new ads from several car sites every 5 minutes and stores every car and price change in D1; it has 2,000+ users.',
				item: 'used-car-deal-finder',
			},
			{
				asked: 'Build/enhance data agents as needed',
				did: "He built an AI agent that uses RAG over tens of thousands of building-code rules and answers an architect's question in under 1 second.",
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Working knowledge of Python for data manipulation',
				did: 'At iA Financial Group he built an automated payroll pipeline in Python and C# working with SQL and MongoDB data, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
		],
	},
	'simon-frontend': {
		short: 'Front End Developer Intern',
		questions: ['What has he built in React?', 'Has he worked with designers?'],
		matches: [
			{
				asked: 'Collaborate directly with the UX Design Intern and design team to translate mockups into working interfaces',
				did: "At Shopify he co-led a 10-person team with PMs and designers, taking Shop App's photo search from his hackathon win to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Coursework, personal projects, or a portfolio demonstrating relevant skills',
				did: "He wrote Cherry Blossom's TypeScript backend on Convex for its React app, where an AI agent designs circuit boards from plain English for 1,500+ monthly users.",
				item: 'cherry-blossom',
			},
			{
				asked: 'Familiarity with version control (Git) and general development workflow',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, catching bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
		],
	},
	sunlife: {
		short: 'Software Engineer Co-op',
		questions: ['What automations has he built for business teams?', 'Has he written C#?'],
		matches: [
			{
				asked: 'Regularly meets with operations colleagues to identify and design automations',
				did: 'For an architecture firm, he scoped a building-code agent with them in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Implements prioritized automations using object-oriented programming techniques',
				did: 'At iA Financial Group he rebuilt payroll processing as an automated pipeline in Python and C#, cutting processing time 87% for 17,000+ weekly salaries.',
				item: 'ia-financial',
			},
			{
				asked: 'Monitors and manages execution of the automations and resolves issues as they arise',
				did: 'At Shopify he built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
		],
	},
	teledyne: {
		short: 'Software Engineering Co-op',
		questions: ['Has he written C++ for real systems?', 'Has he built anything for hardware products?'],
		matches: [
			{
				asked: 'electronics design and development',
				did: 'He built Cherry Blossom, an AI agent that designs circuit boards from plain English and checks every AI edit before a board goes to manufacturing, with 10,000+ boards built.',
				item: 'cherry-blossom',
			},
			{
				asked: 'require advanced technology and high reliability',
				did: 'At Shopify he fixed a firewall misconfiguration affecting 75+ Google Cloud resources and cut internal request latency 10x by moving services from HTTP/1 to gRPC.',
				item: 'shopify-infra-security',
			},
			{
				asked: 'thrive on making an impact',
				did: "He took Shop App's photo search from his hackathon win to 20M+ users, searching 55M+ images in under 3 seconds.",
				item: 'shopify-visual-search',
			},
		],
	},
	terranova: {
		short: 'AI Intern',
		questions: ['What has he built for hardware?', 'Which manual workflows has he automated?'],
		matches: [
			{
				asked: 'Identify repetitive, manual, or cumbersome processes and develop software solutions to automate them.',
				did: 'He built an AI workflow that reads and fills immigration forms for 10+ law firms, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Interest in physical engineering systems, manufacturing, robotics, or industrial operations.',
				did: 'Cherry Blossom, his AI agent that designs circuit boards from plain English, has 10,000+ boards built, and 94% of them work on the first manufacturing run.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Build dashboards, reporting tools, and data pipelines to visualize performance and identify opportunities for improvement.',
				did: 'At Shopify he wired 300+ telemetry signals through Prometheus into 9 Grafana dashboards and 50+ alerts, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
		],
	},
	'tesla-people': {
		short: 'Software Engineering Intern',
		questions: ['Has he built tools with the people who use them?', 'What has he shipped end to end?'],
		matches: [
			{
				asked: 'deliver with the people who will use it',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Experience with a backend language; experience with Python or Go is preferred',
				did: 'He wrote the form-reading and filling services of an immigration-forms app in Python with FastAPI and asyncio; 10+ law firms use it and it saves about 8 hours per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'Monitor what you launch and iterate rapidly',
				did: "He shipped Shop App's photo search behind feature flags with an A/B test, rolled it out to millions of users step by step while watching for problems, and built 9 Grafana dashboards and 50+ alerts.",
				item: 'shopify-visual-search',
			},
		],
	},
	'tesla-pm': {
		short: 'Product Management Intern',
		questions: ['What hardware has he worked on?', 'How does he make product tradeoffs?'],
		matches: [
			{
				asked: 'A blend of engineering depth (electrical or mechanical) and commercial judgment.',
				did: "Cherry Blossom's board agent runs Falstad circuit simulations and electrical, design-rule, thermal and EMC checks, and compares part prices for cheaper or better parts.",
				item: 'cherry-hardware-agent',
			},
			{
				asked: 'Track regulatory, certification, and compliance requirements in key markets and flag gaps',
				did: 'Built an AI agent that checks building designs against the building code and the Quebec building code, answering in under 1 second.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'explain a tradeoff clearly to engineering, commercial, and leadership audiences',
				did: "To hit Shop App photo search's under-3-second target over 55M+ images, the team accepted a 5% drop in matching precision.",
				item: 'shopify-visual-search',
			},
		],
	},
	tih: {
		short: 'Software Engineering Intern',
		questions: ['Has he worked at an insurance or finance company?', 'Has he built tools for business users?'],
		matches: [
			{
				asked: 'requirements gathering, design, development, testing, deployment, and production support',
				did: 'He built an AI document workflow end to end for immigration law firms as client work; 10+ law firms use it, with 10,000+ documents processed and about 8 hours saved per client.',
				item: 'law-firm-workflow',
			},
			{
				asked: 'C#.NET or similar programming experience is a plus',
				did: 'At iA Financial Group he cut payroll processing time 87% for 17,000+ weekly salaries with an automated Python/C# pipeline.',
				item: 'ia-financial',
			},
			{
				asked: 'Excellent written and verbal communication and presentation skills',
				did: 'He taught 1,500+ students AI tools in hands-on workshops at 10+ universities and hackathons, across his Intel and Adobe ambassador roles.',
				item: 'intel-ambassador',
			},
		],
	},
	'tmobile-ads': {
		short: 'Software Engineering Intern',
		questions: ['What has he shipped to real users?', 'Has he worked on high-scale backend systems?'],
		matches: [
			{
				asked: 'Built something real: a team project, hackathon, internship, or open-source work',
				did: "His Shopify hackathon prototype became Shop App's photo search, which he and another intern took to 20M+ users, co-leading a 10-person team.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Experience with at least one language (Python, JavaScript/TypeScript, Go, or Scala) and Git',
				did: 'He rebuilt his Used-Car Deal Finder as a Go crawler and a Rust pricing engine (WebAssembly) on Cloudflare Workers; the project has 2,000+ users.',
				item: 'used-car-deal-finder',
			},
			{
				asked: 'comfortable with code reviews',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, catching bugs, test gaps and Git issues, and built 200+ coding tasks as AI training data.',
				item: 'scale-ai',
			},
		],
	},
	'tmobile-atlanta': {
		short: 'Software Engineering Intern',
		questions: ['What has he built for customer service teams?', 'What did he ship at Shopify?'],
		matches: [
			{
				asked: 'Frontline Experts supporting our customers in Care and Retail',
				did: "He built Hotel Jaro's front-desk voice AI agent, which handled 1,000+ guest calls, 80% of them with no staff involved.",
				item: 'hotel-jaro-voice',
			},
			{
				asked: 'Will work on projects that will deliver capabilities on our website',
				did: "He took Shop App's photo search from his hackathon win to 20M+ Shop App users, and it is also on the shop.com front page.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Will deliver analytical insights',
				did: 'At Shopify he built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals, with runbooks for on-call engineers.',
				item: 'shopify-visual-search',
			},
		],
	},
	'tmobile-pm': {
		short: 'Product Management Intern',
		questions: ['How does he run product discovery?', 'Has he launched a feature with an A/B test?'],
		matches: [
			{
				asked: 'Gather customer and stakeholder feedback to support product discovery',
				did: 'Scoped a building-code agent with an architecture firm in a design doc, visited their office to see how the architects work, and iterated with them over a week.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'Scope requirements and partner on designs and builds with Engineering and Design',
				did: "Co-led a 10-person team with PMs and designers, wrote the design docs at the start, and shipped Shop App's photo search in 6 weeks to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Comfortable working across technical and business teams and turning feedback into clear next steps',
				did: 'Built AI tools end to end for 4 business clients, including a document workflow now used by 10+ immigration law firms.',
				item: 'law-firm-workflow',
			},
		],
	},
	'trimble-swe': {
		short: 'Software Engineering Intern',
		questions: ['Has he built software for construction or architecture?', 'What C++ work has he done?'],
		matches: [
			{
				asked: 'Partner with product managers and developers to gather feedback during beta releases and refine user features',
				did: "He and another intern co-led a 10-person team with PMs and designers and shipped Shop App's photo search behind feature flags with an A/B test, rolling it out to millions of users step by step.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Hands-on coding experience in programming languages such as Python, Java, C, C#, C++',
				did: "At Shopify he got a security-feature PR merged into Redpanda's open-source C++ code, which unblocked Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
			{
				asked: 'Develop, test, and maintain high-quality software features aligned with core product requirements',
				did: 'He scoped a building-code agent with an architecture firm in a design doc, visited their office, and built it to answer from tens of thousands of rules in under 1 second.',
				item: 'architecture-rag-agent',
			},
		],
	},
	twg: {
		short: 'AI Engineering Intern',
		questions: ['Has he built RAG pipelines and AI agents?', 'Has he tuned language models?'],
		matches: [
			{
				asked: 'agentic frameworks and applications, RAG pipelines and retrieval architectures',
				did: 'He built an AI agent for an architecture firm that uses RAG over tens of thousands of building-code rules and answers in under 1 second.',
				item: 'architecture-rag-agent',
			},
			{
				asked: 'personalized large language models (LLMs) to enhance search and recommendation systems',
				did: 'At Shopify he built photo search over 55M+ images in under 3 seconds, with image embeddings, vector search and a self-hosted LLM writing 7 search queries per photo.',
				item: 'shopify-visual-search',
			},
			{
				asked: 'small language model tuning',
				did: 'In AgentGym, his self-improving agent framework, self-hosted models train with DPO on relabeled failures, raising task success 38% over the base agent across 24,000 traces.',
				item: 'agentgym',
			},
		],
	},
	vizient: {
		short: 'Associate Software Engineer',
		questions: ['How does he review AI-written code?', 'Has he shipped features behind feature flags?'],
		matches: [
			{
				asked: 'Use AI-assisted development tools responsibly and validate generated code',
				did: 'At Scale AI he reviewed AI-written code in 4 languages, catching bugs, test gaps and Git issues.',
				item: 'scale-ai',
			},
			{
				asked: 'observability, accessibility, feature flags, or production monitoring',
				did: "He shipped Shop App's photo search behind feature flags with an A/B test, and built 50+ alerts and 9 Grafana dashboards from 300+ telemetry signals, with runbooks for on-call engineers.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Familiarity with cloud-native development or event-driven architecture',
				did: "He got a security-feature PR merged into Redpanda's open-source C++ code, a data-streaming tool, unblocking Shopify's data-streaming rollout.",
				item: 'shopify-infra-security',
			},
		],
	},
	'wolters-kluwer': {
		short: 'Front-End Developer Intern',
		questions: ['Has he built web front ends in React?', 'Does he write unit tests for his UI code?'],
		matches: [
			{
				asked: "Contribuer au développement d'interfaces Web graphiques riches et dynamiques.",
				did: 'He built Cherry Blossom, a React and TypeScript web app where an AI agent designs circuit boards from plain English, used by 1,500+ people a month.',
				item: 'cherry-blossom',
			},
			{
				asked: 'Connaissance des bibliothèques de tests unitaires JavaScript.',
				did: "He worked with Jest at Shopify and shipped Shop App's photo search behind feature flags with an A/B test.",
				item: 'shopify-visual-search',
			},
			{
				asked: "Collaborer avec le spécialiste de l'expérience utilisateur (UX), l'analyste fonctionnel et le responsable de produit",
				did: "At Shopify he co-led a 10-person team with PMs and designers and wrote the design docs at the start of Shop App's photo search.",
				item: 'shopify-visual-search',
			},
		],
	},
	workshop: {
		short: 'Software Engineer Intern',
		questions: ['What has he shipped to real users?', 'How does he use Claude Code?'],
		matches: [
			{
				asked: 'Work closely with our engineers and designers to build product features into our app.',
				did: "He co-led a 10-person team with PMs and designers to take Shop App's photo search from his hackathon win to 20M+ users.",
				item: 'shopify-visual-search',
			},
			{
				asked: 'Have the autonomy and support to ship code to production regularly and frequently.',
				did: 'At iA Financial Group he built CI/CD pipelines with Buildkite and Yarn, so changes were built, tested and shipped automatically, and cut payroll processing time 87%.',
				item: 'ia-financial',
			},
			{
				asked: 'Have meaningful work that makes an impact on our customers and our business.',
				did: 'He built an app that fills immigration forms for law firms; 10+ firms use it, it has processed 10,000+ documents, and it saves about 8 hours per client.',
				item: 'law-firm-workflow',
			},
		],
	},
	'zebra-ai': {
		short: 'Software Engineer Intern',
		questions: ['Has he built AI features that read documents?', 'How does he check what an AI model returns?'],
		matches: [
			{
				asked: 'turn an uploaded policy or SOP document into a complete draft template',
				did: 'He built an app that reads official immigration PDF forms, has an AI model explain every field, and fills them; 10+ law firms use it, with 10,000+ documents processed.',
				item: 'law-firm-workflow',
			},
			{
				asked: "validation of the model's structured (JSON) output",
				did: 'In Linea, a language model turns a plain-language request into a structured spec, with natural language turned into structured output 98% of the time, and a three-tier checker tests the plan against building-code rules.',
				item: 'linea',
			},
			{
				asked: 'Experience using AI coding assistants (e.g. Cursor, GitHub Copilot)',
				did: "He used Claude Code while building Shop App's photo search and ran a team of AI agents that tested approaches overnight, hitting the under-3-second target in 1 week instead of 3.",
				item: 'shopify-visual-search',
			},
		],
	},
}
