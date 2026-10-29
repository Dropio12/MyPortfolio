import React, { Suspense, useEffect, useRef } from 'react'
import { lineOrder, links, person } from '../content'
import { IconClose, IconGitHub, IconLinkedIn, IconMail, IconResume, IconTerminal } from '../icons'
import { goTo, pauseScroll } from './motion'
import { Parts } from './parts'

const Terminal = React.lazy(() => import('../Terminal/Terminal'))

export const Header = () => (
	<header className="header" data-site-header="">
		<div className="header__inner">
			<a
				className="brand"
				href="#top"
				onClick={e => {
					e.preventDefault()
					goTo('top')
				}}
			>
				<span className="brand__mark" aria-hidden="true">
					{lineOrder.map(id => (
						<span key={id} className={`brand__bar brand__bar--${id}`} />
					))}
				</span>
				<span className="brand__name">{person.shortName}</span>
			</a>
			<nav className="header__nav" aria-label="Contact">
				<a className="hlink" href={links.email} aria-label="Email">
					<IconMail className="hlink__icon" />
					<span className="hlink__text">Email</span>
				</a>
				<a className="hlink" href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
					<IconGitHub className="hlink__icon" />
					<span className="hlink__text">GitHub</span>
				</a>
				<a className="hlink" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
					<IconLinkedIn className="hlink__icon" />
					<span className="hlink__text">LinkedIn</span>
				</a>
				<a className="resume-sign" href={links.resume} target="_blank" rel="noreferrer">
					<IconResume className="resume-sign__icon" />
					<span>Resume</span>
				</a>
			</nav>
		</div>
	</header>
)

export const Footer = ({ onDoor }: { onDoor: (opener: HTMLElement) => void }) => (
	<footer className="footer">
		<div className="footer__inner">
			<p className="footer__name">
				<Parts text={`${person.name} · ${person.site}`} />
			</p>
			<button
				type="button"
				className="door-btn"
				onClick={e => onDoor(e.currentTarget)}
				title="Opens a terminal. Shortcut: the backtick key"
			>
				<IconTerminal className="door-btn__icon" />
				<span>Service door</span>
				<kbd>`</kbd>
			</button>
		</div>
	</footer>
)

const focusables = (root: HTMLElement) =>
	Array.from(
		root.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
		)
	).filter(el => el.offsetParent !== null || el === document.activeElement)

export const ServiceDoor = ({ onClose, returnTo }: { onClose: () => void; returnTo: HTMLElement | null }) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const root = ref.current
		pauseScroll(true)
		document.documentElement.classList.add('is-locked')
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault()
				onClose()
				return
			}
			if (e.key !== 'Tab' || !root) return
			const items = focusables(root)
			if (!items.length) return
			const first = items[0]
			const last = items[items.length - 1]
			if (e.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) {
				e.preventDefault()
				last.focus()
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault()
				first.focus()
			}
		}
		document.addEventListener('keydown', onKey)
		const closeBtn = root && root.querySelector<HTMLElement>('[data-door-close]')
		if (closeBtn && !root!.contains(document.activeElement)) closeBtn.focus()
		return () => {
			document.removeEventListener('keydown', onKey)
			document.documentElement.classList.remove('is-locked')
			pauseScroll(false)
			if (returnTo && document.contains(returnTo)) returnTo.focus()
		}
	}, [onClose, returnTo])

	return (
		<div className="door" role="dialog" aria-modal="true" aria-labelledby="door-title" ref={ref} data-lenis-prevent="">
			<div className="door__scrim" onClick={onClose} aria-hidden="true" />
			<div className="door__window">
				<div className="door__bar">
					<h2 id="door-title" className="door__title">
						Service door
					</h2>
					<p className="door__hint">Type help. Esc closes.</p>
					<button type="button" className="door__close" onClick={onClose} aria-label="Close the terminal" data-door-close="">
						<IconClose />
					</button>
				</div>
				<Suspense fallback={<p className="door__loading">Opening the door</p>}>
					<Terminal />
				</Suspense>
			</div>
		</div>
	)
}
