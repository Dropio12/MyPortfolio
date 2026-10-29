import React, { CSSProperties, useEffect, useState } from 'react'
import { links, person, privacyNote } from '../content'
import { track } from '../analytics'
import { AiState, aiState, onAiState } from '../lib/ask'
import { tiltOf } from '../lib/paper'
import PaperBack from './Paper'
import { IconArrowRight, IconCheck, IconCopy, IconDownload, IconTerminal } from './icons'

const tilt = (seed: string) => ({ '--tilt': `${tiltOf(seed, 0.6)}deg` } as CSSProperties)

// The close: two sheets side by side, the resume and the ways to reach him.
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
		<section className="close" id="contact" aria-labelledby="contact-title">
			<div className="wrap">
				<div className="close__head">
					<h2 id="contact-title" className="h2">
						Resume and contact
					</h2>
					<p className="close__lede">
						{person.targets}. {person.availability.join('. ')}.
					</p>
				</div>
				<div className="close__sheets">
					<div className="note note--resume" style={tilt('resume')}>
						<PaperBack seed="resume" />
						<h3 className="note__title">Resume</h3>
						<p className="note__text">Where every fact on this page comes from. A PDF, ready to forward.</p>
						<a
							className="btn btn--ink btn--lg note__cta"
							href={links.resume}
							target="_blank"
							rel="noreferrer"
							onClick={() => track('resume', { from: 'contact' })}
						>
							<IconDownload />
							Download resume
						</a>
					</div>
					<div className="note note--reach" style={tilt('reach')}>
						<PaperBack seed="reach" />
						<h3 className="note__title">Contact</h3>
						<div className="note__email">
							<a className="note__address" href={links.email} onClick={() => track('contact', { channel: 'email', from: 'contact' })}>
								{person.email}
							</a>
							<button type="button" className="btn btn--quiet" onClick={copy}>
								{copied ? <IconCheck /> : <IconCopy />}
								<span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
							</button>
						</div>
						<ul className="note__links">
							<li>
								<a href={links.github} target="_blank" rel="noreferrer" onClick={() => track('contact', { channel: 'github', from: 'contact' })}>
									<span className="note__k">GitHub</span>
									<span className="note__v">{links.githubLabel}</span>
									<IconArrowRight />
								</a>
							</li>
							<li>
								<a href={links.linkedin} target="_blank" rel="noreferrer" onClick={() => track('contact', { channel: 'linkedin', from: 'contact' })}>
									<span className="note__k">LinkedIn</span>
									<span className="note__v">{links.linkedinLabel}</span>
									<IconArrowRight />
								</a>
							</li>
						</ul>
					</div>
				</div>
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
