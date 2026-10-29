import React, { useEffect, useState } from 'react'
import { links, person, privacyNote } from '../content'
import { track } from '../analytics'
import { AiState, aiState, onAiState } from '../lib/ask'
import { IconCheck, IconCopy, IconDownload, IconMail, IconTerminal } from './icons'

export const Contact = () => {
	const [copied, setCopied] = useState(false)
	useEffect(() => {
		if (!copied) return
		const t = window.setTimeout(() => setCopied(false), 2200)
		return () => window.clearTimeout(t)
	}, [copied])

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(person.email)
			setCopied(true)
			track('contact', { channel: 'copy-email', from: 'contact' })
		} catch {
			window.location.href = links.email
		}
	}

	return (
		<section className="contact" id="contact" aria-labelledby="contact-title">
			<div className="wrap contact__inner">
				<h2 id="contact-title" className="contact__title">
					Resume and contact
				</h2>
				<p className="contact__lede">
					{person.targets}. {person.availability.join('. ')}.
				</p>
				<div className="contact__actions">
					<a
						className="btn btn--paper btn--lg"
						href={links.resume}
						target="_blank"
						rel="noreferrer"
						onClick={() => track('resume', { from: 'contact' })}
					>
						<IconDownload />
						Resume (PDF)
					</a>
					<a className="btn btn--outline btn--lg" href={links.email} onClick={() => track('contact', { channel: 'email', from: 'contact' })}>
						<IconMail />
						{person.email}
					</a>
					<button type="button" className="btn btn--quiet" onClick={copy} aria-live="polite">
						{copied ? <IconCheck /> : <IconCopy />}
						{copied ? 'Copied' : 'Copy email'}
					</button>
				</div>
				<ul className="contact__links">
					<li>
						<a href={links.github} target="_blank" rel="noreferrer" onClick={() => track('contact', { channel: 'github', from: 'contact' })}>
							<span className="contact__k">GitHub</span>
							<span className="contact__v">{links.githubLabel}</span>
						</a>
					</li>
					<li>
						<a href={links.linkedin} target="_blank" rel="noreferrer" onClick={() => track('contact', { channel: 'linkedin', from: 'contact' })}>
							<span className="contact__k">LinkedIn</span>
							<span className="contact__v">{links.linkedinLabel}</span>
						</a>
					</li>
				</ul>
			</div>
		</section>
	)
}

export const Footer = ({ onTerminal }: { onTerminal: (opener: HTMLElement) => void }) => {
	const [ai, setAi] = useState<AiState>(aiState())
	useEffect(() => onAiState(setAi), [])
	return (
		<footer className="foot">
			<div className="wrap foot__inner">
				<p className="foot__name">
					{person.name} · {person.site}
				</p>
				<p className="foot__privacy">{ai === 'live' ? privacyNote.ai : privacyNote.local}</p>
				<button
					type="button"
					className="foot__door"
					onClick={e => onTerminal(e.currentTarget)}
					title="Opens the old terminal. Shortcut: the backtick key"
				>
					<IconTerminal />
					Terminal
					<kbd>`</kbd>
				</button>
			</div>
		</footer>
	)
}
