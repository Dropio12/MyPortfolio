import React from 'react'
const github_username = 'Dropio12'
const discord_usertag = '5kg'
const discord_userid = '157839368453750784'
const email = 'anass.elhallaoui@gmail.com'

const projects = [
	'Dropio12/AARL',
	'Dropio12/archigen',
	'Dropio12/Cherry-Hardware-Agent',
	'Dropio12/NeuroVision',
	'Dropio12/CherryTerminal',
	'Dropio12/used-car-deal-finder',
	'Dropio12/ValorantTSpikePlantPredictor',
	'Dropio12/FlightO',
	'Dropio12/Translator-AI',
]

const projectDescriptions: Record<string, string> = {
	'Dropio12/AARL': 'AgentGym: a self-improving agent framework (Hindsight Experience Replay + DPO) that raised task success 38% over the base agent, measured on 24,000 traces, while cutting compute costs 98%.',
	'Dropio12/archigen': 'Linea: turns plain-language requests into legally compliant floor plans. An MCP server combines GraphRAG and vector search over 500K+ building code and permit nodes.',
	'Dropio12/Cherry-Hardware-Agent': 'Open-source AI agent that catches errors in circuit board designs before they are manufactured, by reviewing, simulating and sourcing parts. 808,000+ automated checks across 5,800+ real projects.',
	'Dropio12/NeuroVision': 'Predicts how an audience\'s brain will respond to a video and suggests edits to improve engagement. A multimodal PyTorch pipeline turns video and audio into 20,000+ neural response signals per second.',
	'Dropio12/CherryTerminal': 'Native C++20/Qt6 financial terminal in a single binary: 18 QuantLib modules, 16 broker integrations, 100+ data connectors and 37 AI agents.',
	'Dropio12/used-car-deal-finder': 'Finds underpriced used cars by pricing each listing against similar local ones. Go crawler and Rust pricing engine (WebAssembly) on Cloudflare Workers.',
	'Dropio12/ValorantTSpikePlantPredictor': 'Predicts which site attackers will plant the spike on from round history, agents and economy. One XGBoost model per map tuned with Optuna, Riot API data, FastAPI and React.',
	'Dropio12/FlightO': 'Plans the cheapest full vacation from your travel dates, places and stay lengths (C++).',
	'Dropio12/Translator-AI': 'Translates the text inside any photo: OCR reads it, a machine learning model detects the language, and a simple app translates it (Python, Kivy).',
}

const links = [
	{
		name: 'Linkedin',
		icon: 'fab fa-fw fa-linkedin-in',
		link: 'https://www.linkedin.com/in/anass-badreddine-el-hallaoui-027a08228/',
		description: 'Connect with me!',
	},
	{
		name: 'GitHub',
		icon: 'fab fa-fw fa-github',
		link: 'https://github.com/Dropio12',
		description: 'My Github profile',
	},
	{
		name: 'E-mail',
		icon: 'fas fa-fw fa-at',
		link: `mailto:${email}`,
		description: 'Lets get in touch!',
	},
	{
		name: 'Resume',
		icon: 'fas fa-fw fa-file',
		link: `./AnassBadreddine_El_Hallaoui_Resume.pdf`,
		description: 'Here\'s my resume!',
	},
	{
		name: 'Discord',
		icon: 'fab fa-fw fa-discord',
		link: `https://discord.com/users/${discord_userid}`,
		description: 'Here\'s my discord if you need to!',
	}
]

const info = (
	<>
		<div style={{ lineHeight: '28px' }}>
			<p>Hi! 👋</p>
			<p>
				I'm <span className="highlighted">Anass Badreddine El Hallaoui</span>, an M.Sc. student in Machine Learning at Université Laval (graduating April 2027), with a B.Sc. in Computer Science from Laval (2026).
				I've won <span className="highlighted">8 hackathons, including Stanford (2x), NASA, Waterloo and Shopify</span>, was on Laval's 2024 and 2025 Putnam team, joined the GitHub Community Wall of Fame (2025), and earned $80K+ in scholarships.
			</p>
			<p>
				Where I've worked:
			</p>
			<ul>
				<li><b>Shopify:</b> Software Engineer Intern. Co-created Shop App's photo search and co-led a 10-person team to ship it to 20M+ users. Built its image-matching engine (55M+ images, under 3 seconds) and cut internal request latency 10x by moving services to gRPC.</li>
				<li><b>Scale AI:</b> Full Stack Software Engineer Expert (contract). Wrote 200+ AI training tasks and audited AI-written code in 4 languages.</li>
				<li><b>iA Financial Group:</b> Software Engineer Intern. Cut payroll processing time 87% for 17,000+ weekly salaries and helped fix a privacy flaw, protecting the data of 10,000+ clients.</li>
				<li><b>Intel:</b> oneAPI Software Engineer Ambassador. Taught 1,000+ students Intel's AI tools at 10+ universities and hackathons.</li>
				<li><b>Adobe:</b> Software Engineer Ambassador. Trained 500+ students on Adobe's AI tools.</li>
			</ul>
			<p>
				I also did a <span className="highlighted">fractal mathematics trading research project</span> assigned by a Princeton professor.
			</p>
			<p>
				Type <span className="highlighted">projects</span>, <span className="highlighted">links</span> or <span className="highlighted">help</span> below.
			</p>
			<p>
				Here's a snapshot of my recent technologies from public repos:
			</p>
			<img
				alt="stats"
				style={{ display: 'block', margin: 'auto' }}
				src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${github_username}&show_icons=true&theme=dark&bg_color=0A0A0A&locale=en`}
			/>
		</div>
	</>
)

export {
	github_username,
	discord_usertag,
	discord_userid,
	email,
	projects,
	projectDescriptions,
	links,
	info,
}
