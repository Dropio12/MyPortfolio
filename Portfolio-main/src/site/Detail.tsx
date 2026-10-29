import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { itemById } from '../content'
import { track } from '../analytics'
import { Shot, deep } from '../deep'
import { tiltOf } from '../lib/paper'
import { Art } from './Art'
import { cardSub } from './Card'
import Diagram from './Diagram'
import PaperBack from './Paper'
import { IconArrowLeft, IconArrowRight, IconCheck, IconClose, IconCode, IconGlobe, IconLink } from './icons'
import { useDialog } from './useDialog'

// A card opened full size: a large sheet of the same cut paper laid over the page. Media on top (the
// demo film, the screenshots, or the work's drawing), then what it is and how it works, the numbers,
// the C4 diagrams, the languages and the whole stack, and the links. The URL hash names the work,
// so the sheet is linkable and Back closes it.

type Props = {
	id: string
	order: string[]
	onClose: () => void
	onGo: (id: string) => void
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

type Frame = { kind: 'video'; src: string; poster?: string } | ({ kind: 'image' } & Shot)

const framesOf = (id: string): Frame[] => {
	const item = itemById(id)!
	const frames: Frame[] = []
	if (item.demo) frames.push({ kind: 'video', src: item.demo, poster: item.poster })
	if (item.image) frames.push({ kind: 'image', src: item.image.src, alt: item.image.alt, position: item.image.position })
	for (const shot of deep[id]?.gallery || []) frames.push({ kind: 'image', ...shot })
	return frames
}

const Media = ({ id }: { id: string }) => {
	const item = itemById(id)!
	const frames = framesOf(id)
	const [at, setAt] = useState(0)
	const video = useRef<HTMLVideoElement>(null)
	useEffect(() => setAt(0), [id])
	const frame = frames[Math.min(at, frames.length - 1)]
	useEffect(() => {
		const v = video.current
		if (!v || reduced()) return
		v.play().catch(() => undefined)
	}, [id, at])
	if (!frame)
		return (
			<div className="sheet__media">
				<div className="sheet__art">
					<Art id={id} />
				</div>
			</div>
		)
	return (
		<>
			<figure className="sheet__media">
				{frame.kind === 'video' ? (
					<video
						ref={video}
						className="sheet__video"
						src={frame.src}
						poster={frame.poster}
						muted
						loop
						playsInline
						preload="metadata"
						controls={reduced()}
						aria-label={`Demo of ${item.title}`}
					/>
				) : (
					<img className="sheet__img" src={frame.src} alt={frame.alt} style={{ objectPosition: frame.position }} />
				)}
				{frame.kind === 'image' && frame.caption && <figcaption className="sheet__cap">{frame.caption}</figcaption>}
			</figure>
			{frames.length > 1 && (
				<div className="thumbs" role="group" aria-label="Media">
					{frames.map((f, i) => (
						<button
							key={f.src}
							type="button"
							className="thumbs__btn"
							aria-pressed={i === at}
							aria-label={f.kind === 'video' ? 'Demo film' : f.alt}
							onClick={() => setAt(i)}
						>
							<img src={f.kind === 'video' ? f.poster || '' : f.src} alt="" loading="lazy" decoding="async" />
							{f.kind === 'video' && <span className="thumbs__play" aria-hidden="true" />}
						</button>
					))}
				</div>
			)}
		</>
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
	const more = deep[id]
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
					<div className="sheet__top" key={`m-${id}`}>
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
						{more && more.overview.length > 0 && (
							<div className="sheet__overview">
								{more.overview.map(p => (
									<p key={p}>{p}</p>
								))}
							</div>
						)}
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
						{more?.c4 && (more.c4.context || more.c4.containers) && (
							<section className="sheet__sec" aria-labelledby={`${id}-built`}>
								<h3 id={`${id}-built`} className="sheet__h2">
									How it’s built
								</h3>
								<Diagram id={id} context={more.c4.context} containers={more.c4.containers} />
							</section>
						)}
						{more && (more.languages?.length || more.stack.some(g => g.items.length)) ? (
							<section className="sheet__sec tech" aria-labelledby={`${id}-tech`}>
								<h3 id={`${id}-tech`} className="sheet__h2">
									Languages and tools
								</h3>
								{more.languages && more.languages.length > 0 && (
									<div className="langs">
										{more.languages.some(l => l.share) && (
											<div className="langs__bar" aria-hidden="true">
												{more.languages
													.filter(l => l.share)
													.map((l, i) => (
														<i key={l.name} style={{ flexGrow: l.share, '--shade': i } as CSSProperties} />
													))}
											</div>
										)}
										<ul className="langs__list">
											{more.languages.map((l, i) => (
												<li key={l.name}>
													<span className="langs__dot" style={{ '--shade': i } as CSSProperties} aria-hidden="true" />
													{l.name}
													{l.share ? <span className="langs__share">{l.share}%</span> : null}
												</li>
											))}
										</ul>
									</div>
								)}
								<dl className="groups">
									{more.stack
										.filter(g => g.items.length)
										.map(g => (
											<div key={g.group} className="groups__row">
												<dt>{g.group}</dt>
												<dd>
													<ul className="stack">
														{g.items.map(s => (
															<li key={s}>{s}</li>
														))}
													</ul>
												</dd>
											</div>
										))}
								</dl>
							</section>
						) : null}
						<div className="sheet__foot">
							{!more && (
								<div>
									<h3 className="sheet__h3">Stack</h3>
									<ul className="stack">
										{item.stack.map(s => (
											<li key={s}>{s}</li>
										))}
									</ul>
								</div>
							)}
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
