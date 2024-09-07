import React from 'react'
const github_username = 'Dropio12'
const discord_usertag = '5kg'
const discord_userid = '157839368453750784'
const email = 'anass.elhallaoui@gmail.com'

const projects = [
	'Dropio12/FlightO',
	'Dropio12/Translator-AI',
	'Dropio12/MTF-EMA-ALMA-Strategy-with-RSI-Supertrend-and-Advanced-Volume-Delta-Divergence-Visualization',
	'Matt717/TrustFile',
	'Dropio12/Canadian-Tech-Internships-Summer-2024',
	'Dropio12/Multi-Timeframe-ALMA-Distance-Change-Table',
]

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
		link: `https://docs.google.com/document/d/1WrbrkBIwy7-0WF6Bs1Qr32Aj4D-avDPc/edit?usp=sharing&ouid=101004210406969536241&rtpof=true&sd=true`,
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
		<div style={{ lineHeight: '30px' }}>
			<p>Hi!👋</p><br></br>
			<p>
				I'm <span className="highlighted">Anass Badreddine El Hallaoui</span>,  soon to be a
				<span className="highlighted"> graduate with a Bachelor's
				degree in Computer Science from Laval University</span>.  My journey has been shaped by a deep commitment 
				to leveraging technology for impactful solutions. From automating tasks through scripting to exploring the realms of 
				Data Engineering and Artificial Intelligence, I've cultivated a passion for innovation and problem-solving.
			</p>
			<br></br>
			<p>
			My academic and personal projects have been instrumental in honing my 
			skills across various tech stacks, from developing AI-powered 
			trading systems with Princeton to crafting advanced flight price engines. 
			Each endeavor has not only enhanced my technical prowess but also underscored my dedication to pushing boundaries and delivering excellence.
			</p><br></br>
			<p>
			I thrive in collaborative environments where creativity meets rigorous problem-solving, 
			aiming always to elevate standards and drive meaningful change. Let's connect and 
			explore how my skills and experiences can contribute to your team's success.
			</p><br></br>
			<p>
				Here's a list of some of the technologies I've been working with recently 
				(it's only from my public repos, so it's not exhaustive 😉 ):
			</p> <br></br>
			<img alt="stats" style={{
								display: 'block',
								marginLeft: 'auto',
								marginRight: 'auto',
							}} 
  				src="https://github-readme-stats.vercel.app/api/top-langs/?username=abdellahhn&show_icons=true&theme=dark&bg_color=0A0A0A&locale=en"/>
		</div>
	</>
)

export {
	github_username,
	discord_usertag,
	discord_userid,
	email,
	projects,
	links,
	info,
}
