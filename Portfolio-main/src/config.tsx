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
		link: `https://drive.google.com/file/d/1WeGgfM5jMFreI0QoBcDOX5oaqdbIDsc-/view?usp=sharing`,
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
        I'm <span className="highlighted">Anass El Hallaoui</span>, a Computer Science student at Laval University with a track record in hackathons, AI, and software engineering. 
        My journey includes awards from <span className="highlighted">Stanford TreeHacks, NASA, and multiple hackathon wins</span>, alongside $80K+ in scholarships.
      </p>
      <p>
        I have hands-on experience at top tech companies and institutions:
      </p>
      <ul>
        <li><b>Shopify:</b> Mobile & Infrastructure Engineer – Led a 10+ person team to ship Image Search to 25M+ users, built AI image similarity for 55M+ images.</li>
        <li><b>Adobe:</b> Software Engineer Ambassador – Ran SWE-focused workshops internationally, teaching 500+ students & developers to build real-world projects using Adobe tools.</li>
        <li><b>Intel:</b> Software Engineer Ambassador – Ran AI workshops at 10+ universities, boosted JupyterHub efficiency by 15%.</li>
        <li><b>iA Financial Group:</b> Software Engineer – Refactored payroll systems, improved data privacy, automated processes reducing errors by 50%.</li>
        <li><b>Laval University:</b> Teaching Assistant – Taught <span className="highlighted">Probability & Statistics</span> and <span className="highlighted">Theory of Computation</span> courses, mentoring students and supporting course delivery.</li>
        <li><b>OpenAI:</b> GPT-3 Beta Tester – Tested cutting-edge AI systems.</li>
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
	links,
	info,
}
