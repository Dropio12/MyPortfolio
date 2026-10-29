import React, { useEffect, useRef } from 'react'
import { itemById } from '../content'
import { Art } from './Art'
import { IconArrowLeft, IconArrowRight, IconClose, IconCode, IconGlobe } from './icons'
import { useDialog } from './useDialog'

type Props = {
	id: string
	order: string[]
	onClose: () => void
	onGo: (id: string) => void
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** the media slot: a demo video when one exists, else the screenshot, else the drawn diagram */
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
	if (item.image)
		return <img className="sheet__img" src={item.image.src} alt={item.image.alt} style={{ objectPosition: item.image.position }} />
	return (
		<div className="sheet__art">
			<Art id={id} />
		</div>
	)
}

const Detail = ({ id, order, onClose, onGo }: Props) => {
	const panel = useRef<HTMLDivElement>(null)
	const closeBtn = useRef<HTMLButtonElement>(null)
	useDialog(panel, onClose, closeBtn)
	const item = itemById(id)
	const i = order.indexOf(id)
	const prev = i > 0 ? order[i - 1] : null
	const next = i >= 0 && i < order.length - 1 ? order[i + 1] : null

	useEffect(() => {
		panel.current?.scrollTo({ top: 0 })
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
	return (
		<div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
			<div className="sheet__scrim" onClick={onClose} aria-hidden="true" />
			<div className="sheet__panel" ref={panel}>
				<div className="sheet__bar">
					<div className="sheet__nav">
						<button type="button" className="icon-btn" onClick={() => prev && onGo(prev)} disabled={!prev} aria-label="Previous work">
							<IconArrowLeft />
						</button>
						<button type="button" className="icon-btn" onClick={() => next && onGo(next)} disabled={!next} aria-label="Next work">
							<IconArrowRight />
						</button>
						{i >= 0 && (
							<span className="sheet__count">
								{i + 1} of {order.length}
							</span>
						)}
					</div>
					<button type="button" className="icon-btn sheet__close" ref={closeBtn} onClick={onClose} aria-label="Close">
						<IconClose />
					</button>
				</div>
				<div className="sheet__media" key={`m-${id}`}>
					<Media id={id} />
				</div>
				<div className="sheet__body" key={`b-${id}`}>
					<h2 id="sheet-title" className="sheet__title">
						{item.title}
					</h2>
					<p className="sheet__meta">{item.position ? `${item.position} · ${item.dates}` : item.meta}</p>
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
						<ul className="stack" aria-label="Tech used">
							{item.stack.map(s => (
								<li key={s}>{s}</li>
							))}
						</ul>
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
	)
}

export default Detail
