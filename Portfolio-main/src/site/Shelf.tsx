import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Shown } from '../lib/filter'
import Card from './Card'
import { IconArrowLeft, IconArrowRight } from './icons'

// One carousel of paper cards: scroll-snap, arrow buttons, arrow keys, trackpad and touch,
// a peek of the next card, and "3 / 9" progress. Re-ranking slides the cards to their new
// places (FLIP); the first time the shelf scrolls into view its cards are dealt in.

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** animate cards from where they were to where they are after a filter change */
const useFlip = (list: React.RefObject<HTMLElement>, key: string) => {
	const prev = useRef(new Map<string, number>())
	const measure = () => {
		const m = new Map<string, number>()
		list.current?.querySelectorAll<HTMLElement>('[data-flip]').forEach(n => m.set(n.dataset.flip!, n.offsetLeft))
		return m
	}
	useLayoutEffect(() => {
		const el = list.current
		if (!el) return
		const next = measure()
		const r = el.getBoundingClientRect()
		const near = r.top < window.innerHeight * 1.5 && r.bottom > -window.innerHeight * 0.5
		if (prev.current.size && near && !reduced() && 'animate' in el) {
			el.querySelectorAll<HTMLElement>('[data-flip]').forEach(n => {
				const id = n.dataset.flip!
				const a = prev.current.get(id)
				if (a === undefined) {
					n.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], {
						duration: 420,
						delay: 80,
						easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
						fill: 'backwards',
					})
					return
				}
				const dx = a - next.get(id)!
				if (dx)
					n.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], {
						duration: 520,
						easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
					})
			})
		}
		prev.current = next
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key])
	useEffect(() => {
		const on = () => (prev.current = measure())
		window.addEventListener('resize', on)
		return () => window.removeEventListener('resize', on)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

type Props = {
	id: string
	title: string
	note: string
	shown: Shown[]
	filtering: boolean
	onOpen: (id: string) => void
	/** what to say when nothing of this kind matches */
	empty: React.ReactNode
}

const Shelf = ({ id, title, note, shown, filtering, onOpen, empty }: Props) => {
	const section = useRef<HTMLElement>(null)
	const track = useRef<HTMLDivElement>(null)
	const list = useRef<HTMLUListElement>(null)
	const [dealt, setDealt] = useState(() => reduced() || typeof IntersectionObserver === 'undefined')
	const [pos, setPos] = useState({ last: 0, start: true, end: true, fill: 1 })
	const orderKey = shown.map(s => s.item.id).join(',')
	useFlip(list, orderKey)

	// where the shelf is: the last card fully in view, and whether either end is reached
	const read = useCallback(() => {
		const t = track.current
		const l = list.current
		if (!t || !l) return
		const box = t.getBoundingClientRect()
		let last = 0
		Array.from(l.children).forEach((c, i) => {
			const r = (c as HTMLElement).getBoundingClientRect()
			if (r.right <= box.right + 2 && r.left >= box.left - 2) last = i + 1
		})
		const max = t.scrollWidth - t.clientWidth
		const next = {
			last: Math.max(last, Math.min(1, shown.length)),
			start: t.scrollLeft <= 2,
			end: t.scrollLeft >= max - 2,
			fill: max > 0 ? (t.scrollLeft + t.clientWidth) / t.scrollWidth : 1,
		}
		setPos(p => (p.last === next.last && p.start === next.start && p.end === next.end && Math.abs(p.fill - next.fill) < 0.005 ? p : next))
	}, [shown.length])

	useEffect(() => {
		const t = track.current
		if (!t) return
		let raf = 0
		const on = () => {
			if (!raf)
				raf = requestAnimationFrame(() => {
					raf = 0
					read()
				})
		}
		read()
		t.addEventListener('scroll', on, { passive: true })
		window.addEventListener('resize', on)
		return () => {
			t.removeEventListener('scroll', on)
			window.removeEventListener('resize', on)
			cancelAnimationFrame(raf)
		}
	}, [read])

	// a new ranking starts from its best match
	useEffect(() => {
		track.current?.scrollTo({ left: 0 })
		read()
	}, [orderKey, read])

	// deal the cards in the first time the shelf comes into view
	useEffect(() => {
		if (dealt || !section.current) return
		const io = new IntersectionObserver(
			entries => {
				if (entries.some(e => e.isIntersecting)) {
					setDealt(true)
					io.disconnect()
				}
			},
			{ rootMargin: '0px 0px -12% 0px' }
		)
		io.observe(section.current)
		return () => io.disconnect()
	}, [dealt])

	const step = () => {
		const first = list.current?.firstElementChild as HTMLElement | null
		const gap = list.current ? parseFloat(getComputedStyle(list.current).columnGap) || 0 : 0
		return first ? first.offsetWidth + gap : 300
	}
	const go = (dir: number) => track.current?.scrollBy({ left: dir * step(), behavior: reduced() ? 'auto' : 'smooth' })

	const onKey = (e: React.KeyboardEvent) => {
		const cards = Array.from(list.current?.querySelectorAll<HTMLAnchorElement>('.card') || [])
		const at = cards.indexOf(e.target as HTMLAnchorElement)
		const move = (to: number) => {
			e.preventDefault()
			const c = cards[Math.max(0, Math.min(cards.length - 1, to))]
			c?.focus({ preventScroll: true })
			c?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' })
		}
		const t = track.current
		if (!t) return
		if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
			const dir = e.key === 'ArrowRight' ? 1 : -1
			if (at >= 0) move(at + dir)
			else {
				e.preventDefault()
				go(dir)
			}
		} else if (e.key === 'Home' || e.key === 'End') {
			const toEnd = e.key === 'End'
			if (at >= 0) move(toEnd ? cards.length - 1 : 0)
			else {
				e.preventDefault()
				t.scrollTo({ left: toEnd ? t.scrollWidth : 0 })
			}
		}
	}

	const titleId = `${id}-title`
	return (
		<section className={`shelf${dealt ? ' is-dealt' : ''}`} ref={section} aria-labelledby={titleId}>
			<div className="wrap shelf__head">
				<div className="shelf__name">
					<h3 id={titleId} className="shelf__title">
						{title}
					</h3>
					<p className="shelf__note">{note}</p>
				</div>
				{shown.length > 0 && (
					<div className="shelf__ctrl">
						<p className="shelf__count" aria-live="polite">
							<span className="sr-only">Showing up to card </span>
							{pos.last} <span aria-hidden="true">/</span>
							<span className="sr-only"> of</span> {shown.length}
						</p>
						<button type="button" className="icon-btn icon-btn--line" onClick={() => go(-1)} disabled={pos.start} aria-label={`Previous ${title.toLowerCase()}`}>
							<IconArrowLeft />
						</button>
						<button type="button" className="icon-btn icon-btn--line" onClick={() => go(1)} disabled={pos.end} aria-label={`Next ${title.toLowerCase()}`}>
							<IconArrowRight />
						</button>
					</div>
				)}
			</div>
			{shown.length > 0 ? (
				<>
					<div
						className="shelf__track"
						ref={track}
						tabIndex={0}
						role="region"
						aria-label={`${title}, ${shown.length} cards. Use the arrow keys to move.`}
						onKeyDown={onKey}
					>
						<ul className="shelf__list" ref={list}>
							{shown.map((s, i) => (
								<li key={s.item.id} data-flip={s.item.id}>
									<Card s={s} index={i} filtering={filtering} onOpen={onOpen} />
								</li>
							))}
						</ul>
					</div>
					<div className="wrap" aria-hidden="true">
						<span className="shelf__bar">
							<i style={{ transform: `scaleX(${pos.fill})` }} />
						</span>
					</div>
				</>
			) : (
				<div className="wrap">
					<div className="shelf__empty" role="status">
						{empty}
					</div>
				</div>
			)}
		</section>
	)
}

export default Shelf
