import React from 'react'
const github_username = 'Dropio12'
const discord_usertag = '5kg'
const discord_userid = '157839368453750784'
const email = 'anass.elhallaoui@gmail.com'

const projects = [
	'Dropio12/AARL',
	'Dropio12/NeuroVision',
	'Dropio12/FlightO',
	'Dropio12/Translator-AI',
	'Dropio12/MTF-EMA-ALMA-Strategy-with-RSI-Supertrend-and-Advanced-Volume-Delta-Divergence-Visualization',
	'Matt717/TrustFile',
	'Dropio12/Canadian-Tech-Internships-Summer-2024',
	'Dropio12/Multi-Timeframe-ALMA-Distance-Change-Table',
]

const projectDescriptions: Record<string, string> = {
	'Dropio12/AARL': 'Engineered an AI-native self-improving framework, implementing Hindsight Experience Replay (AgentHER) and DPO to increase autonomous task success by 38% while cutting compute costs by 98%.',
	'Dropio12/NeuroVision': 'Developed an AI video analyzer that predicts how an audience\'s brain will respond to content, providing automated suggestions to optimize visual engagement. Engineered a multimodal PyTorch pipeline that processes video/audio into 20,000+ cortical data points per second.',
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
				I'm <span className="highlighted">Anass Badreddine El Hallaoui</span>, an M.Sc. Candidate in Computer Science (AI Specialization) at Georgia Tech and a B.Sc. graduate from Laval University.
				My journey includes winning <span className="highlighted">NASA, Stanford, Shopify, and 5 other hackathons</span>, becoming a GitHub Community Wall of Famer (2025), and securing $80K+ in scholarships.
			</p>
			<p>
				I have hands-on experience at top tech companies and institutions:
			</p>
			<ul>
				<li><b>Shopify:</b> Software Engineer Intern – Co-created the Visual Search Division, led a 10-person squad to ship it to 25M+ users, and engineered a gRPC-based PoC that achieved 10x faster internal requests.</li>
				<li><b>Intel:</b> oneAPI Software Engineer Ambassador – Directed AI workshops at 10+ universities, upskilling 1,000+ students, and optimized Intel Tiber Cloud UI/UX.</li>
				<li><b>iA Financial Group:</b> Software Engineer Intern – Modernized a legacy payroll system handling $20M+ weekly, and patched a critical privacy vulnerability for 10,000+ clients.</li>
				<li><b>OpenAI:</b> AI Research – Evaluated early GPT-3.5 foundational models for alignment and edge-case behavior.</li>
			</ul>
			<p>
				Academically, I've also contributed to <span className="highlighted">research at Princeton University</span> in Fractal Mathematics applied to trading systems.
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
