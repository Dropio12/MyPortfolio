import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { itemById } from '../content'
import { track } from '../analytics'
import { tiltOf } from '../lib/paper'
import { Art } from './Art'
import { cardSub } from './Card'
import PaperBack from './Paper'
import { IconArrowLeft, IconArrowRight, IconCheck, IconClose, IconCode, IconGlobe, IconLink } from './icons'
import { useDialog } from './useDialog'

// A card opened full size: a large sheet of the same cut paper laid over the page, media on top
// (a demo video when one exists, else the screenshot, else the work's diagram), then the facts,
// the stack and the links. The URL hash names the work, so the sheet is linkable and Back closes it.

type Props = {
	id: string
	order: string[]
	onClose: () => void
	onGo: (id: string) => void
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Media = ({ id }: { id: string }) => {
	const item = itemById(id)!
	const video = useRef<HTMLVideoElement>(null)
	useEffect(() => {
		const v = video.current
		if (!v || reduced()) return
		v.play().catch(() => undefined)
	}, [id])
	if (item.demo)
		return (
			<video
				ref={video}
				className="sheet__video"
				src={item.demo}
				poster={item.poster}
				muted
				loop
				playsInline
				preload="metadata"
				controls={reduced()}
				aria-label={`Demo of ${item.title}`}
			/>
		)
	if (item.image) return <img className="sheet__img" src={item.image.src} alt={item.image.alt} style={{ objectPosition: item.image.position }} />
	return (
		<div className="sheet__art">
			<Art id={id} />
		</div>
	)
}

const CopyLink = ({ id }: { id: string }) => {
	const [copied, setCopied] = useState(false)
	useEffect(() => setCopied(false), [id])
	useEffect(() => {
		if (!copied) return
		const t = window.setTimeout(() => setCopied(false), 2200)
		return () => window.clearTimeout(t)
	}, [copied])
	return (
		<button
			type="button"
			className="btn btn--quiet sheet__copy"
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(window.location.href)
					setCopied(true)
					track('copy_link', { id })
				} catch {
					/* the address bar already holds the same link */
				}
			}}
		>
			{copied ? <IconCheck /> : <IconLink />}
			<span aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</span>
		</button>
	)
}

const Detail = ({ id, order, onClose, onGo }: Props) => {
	const scroller = useRef<HTMLDivElement>(null)
	const panel = useRef<HTMLDivElement>(null)
	const closeBtn = useRef<HTMLButtonElement>(null)
	useDialog(panel, onClose, closeBtn)
	const item = itemById(id)
	const i = order.indexOf(id)
	const prev = i > 0 ? order[i - 1] : null
	const next = i >= 0 && i < order.length - 1 ? order[i + 1] : null

	useEffect(() => {
		scroller.current?.scrollTo({ top: 0 })
		const onKey = (e: KeyboardEvent) => {
			const t = e.target as HTMLElement
			if (t.closest('video')) return
			if (e.key === 'ArrowLeft' && prev) onGo(prev)
			if (e.key === 'ArrowRight' && next) onGo(next)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [id, prev, next, onGo])

	if (!item) return null
	const sub = cardSub(item)
	return (
		<div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
			<div className="sheet__scrim" onClick={onClose} aria-hidden="true" />
			<div className="sheet__panel" ref={panel} style={{ '--tilt': `${tiltOf(`sheet:${id}`, 0.35)}deg` } as CSSProperties}>
				<PaperBack seed={`sheet:${id}`} />
				<div className="sheet__scroll" ref={scroller}>
					<div className="sheet__bar">
						<div className="sheet__nav">
							<button type="button" className="icon-btn icon-btn--line" onClick={() => prev && onGo(prev)} disabled={!prev} aria-label="Previous work">
								<IconArrowLeft />
							</button>
							<button type="button" className="icon-btn icon-btn--line" onClick={() => next && onGo(next)} disabled={!next} aria-label="Next work">
								<IconArrowRight />
							</button>
							{i >= 0 && (
								<span className="sheet__count">
									{i + 1} of {order.length}
								</span>
							)}
						</div>
						<div className="sheet__tools">
							<CopyLink id={id} />
							<button type="button" className="icon-btn sheet__close" ref={closeBtn} onClick={onClose} aria-label="Close">
								<IconClose />
							</button>
						</div>
					</div>
					<div className="sheet__media" key={`m-${id}`}>
						<Media id={id} />
					</div>
					<div className="sheet__body" key={`b-${id}`}>
						<h2 id="sheet-title" className="sheet__title">
							{item.title}
						</h2>
						<p className="sheet__meta">
							{sub.what}
							{sub.when && (
								<>
									<span className="dot" aria-hidden="true" />
									{sub.when}
								</>
							)}
						</p>
						<p className="sheet__line">{item.line}</p>
						{item.facts.length > 0 && (
							<ul className="facts">
								{item.facts.map(f => (
									<li key={f.figure + f.text} className="fact">
										<span className="fact__fig">{f.figure}</span>
										<span className="fact__text">{f.text}</span>
									</li>
								))}
							</ul>
						)}
						{item.notes && item.notes.length > 0 && (
							<ul className="notes">
								{item.notes.map(n => (
									<li key={n}>{n}</li>
								))}
							</ul>
						)}
						<div className="sheet__foot">
							<div>
								<h3 className="sheet__h3">Stack</h3>
								<ul className="stack">
									{item.stack.map(s => (
										<li key={s}>{s}</li>
									))}
								</ul>
							</div>
							{item.links.length > 0 && (
								<div className="sheet__links">
									{item.links.map(l => (
										<a key={l.href} className="btn btn--line" href={l.href} target="_blank" rel="noreferrer">
											{l.kind === 'code' ? <IconCode /> : <IconGlobe />}
											{l.kind === 'code' ? 'Code' : 'Site'}
											<span className="btn__sub">{l.label}</span>
										</a>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Detail
