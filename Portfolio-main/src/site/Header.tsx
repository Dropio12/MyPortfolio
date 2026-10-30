import React, { useEffect, useState } from 'react'
import { Tailored, links, person } from '../content'
import { track } from '../analytics'
import { IconDownload } from './icons'

type Props = {
	tailored: Tailored | null
	onSeeEverything: () => void
}

const Header = ({ tailored, onSeeEverything }: Props) => {
	const [scrolled, setScrolled] = useState(false)
	// on the first screen the header holds only the resume; the name and the links arrive once the
	// visitor has scrolled into the portfolio
	const [deep, setDeep] = useState(false)
	useEffect(() => {
		const on = () => {
			setScrolled(window.scrollY > 8)
			setDeep(window.scrollY > window.innerHeight * 0.55)
		}
		on()
		window.addEventListener('scroll', on, { passive: true })
		return () => window.removeEventListener('scroll', on)
	}, [])

	return (
		<header className={`top${scrolled ? ' is-scrolled' : ''}${deep || tailored ? ' is-deep' : ''}`}>
			<div className="top__inner">
				<a className="top__name" href="#top" aria-label={`${person.shortName}, back to the top`}>
					<span className="top__name-full">{person.shortName}</span>
					<span className="top__name-short" aria-hidden="true">
						{person.firstName}
					</span>
				</a>
				<nav className="top__nav" aria-label="Sections">
					<a href="#education">Education</a>
					<a href="#work">Work</a>
					<a href="#contact">Contact</a>
				</nav>
				<nav className="top__links" aria-label="Profiles and resume">
					<a href={links.github} target="_blank" rel="noreferrer" onClick={() => track('contact', { channel: 'github', from: 'header' })}>
						GitHub
					</a>
					<a href={links.linkedin} target="_blank" rel="noreferrer" onClick={() => track('contact', { channel: 'linkedin', from: 'header' })}>
						LinkedIn
					</a>
					<a href={links.email} onClick={() => track('contact', { channel: 'email', from: 'header' })}>
						Email
					</a>
					<a
						className="btn btn--ink top__resume"
						href={links.resume}
						target="_blank"
						rel="noreferrer"
						onClick={() => track('resume', { from: 'header' })}
					>
						<IconDownload />
						Resume
					</a>
				</nav>
			</div>
			{tailored && (
				<div className="for-note" role="status">
					<p>
						<strong>Hi {tailored.company} team,</strong> this page is set up for your{' '}
						{tailored.short ? (
							`${tailored.short} role`
						) : (
							<>
								<span className="for-note__role">{tailored.role} role</span>
								<span className="for-note__short">role</span>
							</>
						)}
						.
					</p>
					<button type="button" className="link-btn link-btn--small" onClick={onSeeEverything}>
						See everything
					</button>
				</div>
			)}
		</header>
	)
}

export default Header
