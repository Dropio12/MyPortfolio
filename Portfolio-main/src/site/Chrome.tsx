import React, { Suspense, useEffect, useRef } from 'react'
import { lineOrder, links, person } from '../content'
import {
	IconClose,
	IconGitHub,
	IconLinkedIn,
	IconList,
	IconMail,
	IconResume,
	IconTerminal,
	IconTrain,
} from '../icons'
import { focusQuietly, scrollToY } from './motion'

const Terminal = React.lazy(() => import('../Terminal/Terminal'))

export type Mode = 'ride' | 'list'

/* ---------- the HUD: name, contact, the view switch and the Resume button ---------- */

export const Hud = ({ mode, onMode }: { mode: Mode; onMode: (m: Mode) => void }) => (
	<header className="hud" data-hud="">
		<a
			className="chip chip--brand"
			href="#top"
			onClick={e => {
				e.preventDefault()
				scrollToY(0)
				focusQuietly(document.getElementById('top'))
			}}
		>
			<span className="brand-mark" aria-hidden="true">
				{lineOrder.map(id => (
					<span key={id} className={`brand-mark__px brand-mark__px--${id}`} />
				))}
			</span>
			<span className="chip__label chip__label--brand">{person.shortName}</span>
			<span className="sr-only">, back to the top</span>
		</a>
		<nav className="hud__nav" aria-label="Contact and view">
			<button
				type="button"
				className="chip chip--view"
				aria-pressed={mode === 'list'}
				onClick={() => onMode(mode === 'list' ? 'ride' : 'list')}
			>
				{mode === 'list' ? <IconTrain className="chip__icon" /> : <IconList className="chip__icon" />}
				<span className="chip__label chip__label--view">{mode === 'list' ? 'Take the ride' : 'Skip the ride'}</span>
			</button>
			<a className="chip chip--icon" href={links.email} aria-label="Email">
				<IconMail className="chip__icon" />
				<span className="chip__label chip__label--wide">Email</span>
			</a>
			<a className="chip chip--icon" href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
				<IconGitHub className="chip__icon" />
				<span className="chip__label chip__label--wide">GitHub</span>
			</a>
			<a className="chip chip--icon" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
				<IconLinkedIn className="chip__icon" />
				<span className="chip__label chip__label--wide">LinkedIn</span>
			</a>
			<a className="chip chip--resume" href={links.resume} target="_blank" rel="noreferrer">
				<IconResume className="chip__icon" />
				<span>Resume</span>
			</a>
		</nav>
	</header>
)

/* ---------- footer and the service door (the old terminal) ---------- */

export const Footer = ({ onDoor }: { onDoor: (opener: HTMLElement) => void }) => (
	<footer className="footer">
		<div className="footer__inner">
			<p className="footer__name">
				{person.name} <span aria-hidden="true">/</span> {person.site}
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
			if (returnTo && document.contains(returnTo)) returnTo.focus()
		}
	}, [onClose, returnTo])

	return (
		<div className="door" role="dialog" aria-modal="true" aria-labelledby="door-title" ref={ref}>
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
