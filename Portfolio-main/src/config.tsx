import React from 'react'
const github_username = 'Dropio12'
const discord_usertag = '5kg'
const discord_userid = '157839368453750784'
const email = 'anass.elhallaoui@gmail.com'

const projects = [
	'Dropio12/FlightO',
	'Dropio12/Translator-AI',
	'Dropio12/MTF-EMA-ALMA-Strategy-with-RSI-Supertrend-and-Advanced-Volume-Delta-Divergence-Visualization',
	'Dropio12/TrustFile',
	'Dropio12/Canadian-Tech-Internships-Summer-2024',
	'Dropio12/Multi-Timeframe-ALMA-Distance-Change-Table',
	'Dropio12/SmollBot'
	// 'Isaaruwu/EstateGuardian', private repo
	// 'Isaaruwu/StockAI2', private repo
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
	}
]

const info = (
	<>
		<div style={{ lineHeight: '30px' }}>
			<p>Hi!👋</p><br></br>
			<p>
				I'm <span className="highlighted">Anass Badreddine El Hallaoui</span>,  soon to be a
				<span className="highlighted"> graduate with a Bachelor's
				degree in Computer Science from Laval University</span>. With a strong foundation in
				software development and a passion for continuous learning, I thrive on creating innovative solutions to complex problems.
			</p>
			<br></br>
			<p>
			Throughout my academic journey, I have specialized in automating tasks through scripting 
			and have developed a keen interest in Data Engineering and Artificial Intelligence. My projects, 
			both in school and during my spare time, have allowed me to gain hands-on experience in these fields. 
			Additionally, I enjoy designing and building full-stack web applications, 
			constantly pushing the boundaries of what I can achieve.
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
