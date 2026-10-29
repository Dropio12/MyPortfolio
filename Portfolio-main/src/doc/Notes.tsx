import React, {
	createContext,
	ReactNode,
	RefObject,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { notes, noteNumber } from '../content'
import { useMedia } from './useMedia'
import Icon from './Icon'
import styles from './Notes.module.scss'

// Margin comments, the proof layer of the doc.
// Wide screens: each note sits in the right margin, pinned to the claim it supports,
// slides in as that claim enters view, and aligns to its claim when its marker is clicked.
// Narrow screens: the marker expands the note in place, like a footnote.

type Mode = 'margin' | 'inline'

type NotesState = {
	mode: Mode
	active: string | null
	open: Record<string, boolean>
	press: (id: string) => void
	activate: (id: string | null) => void
}

const NotesContext = createContext<NotesState | null>(null)

const useNotes = () => {
	const ctx = useContext(NotesContext)
	if (!ctx) throw new Error('Note used outside NotesProvider')
	return ctx
}

export const MARGIN_QUERY = '(min-width: 1080px)'
const GAP = 12

const noteIds = Object.keys(notes).filter(id => noteNumber(id) > 0)

const linked = (page: HTMLElement, id: string) =>
	page.querySelectorAll<HTMLElement>(
		`[data-note-anchor="${id}"], [data-note-card="${id}"], [data-note-edge="${id}"], [data-note-reach="${id}"], [data-note-marker="${id}"]`
	)

const setHot = (page: HTMLElement | null, id: string, on: boolean) => {
	if (!page) return
	linked(page, id).forEach(el => {
		if (on) el.setAttribute('data-hot', '')
		else el.removeAttribute('data-hot')
	})
}

const reveal = (page: HTMLElement, id: string, delay = 0) => {
	linked(page, id).forEach(el => {
		if (el.hasAttribute('data-in')) return
		if (delay) {
			el.style.setProperty('--d', `${delay}ms`)
			window.setTimeout(() => el.style.removeProperty('--d'), delay + 1000)
		}
		el.setAttribute('data-in', '')
	})
}

export function NotesProvider({
	pageRef,
	children,
}: {
	pageRef: RefObject<HTMLElement>
	children: ReactNode
}) {
	const wide = useMedia(MARGIN_QUERY)
	const mode: Mode = wide ? 'margin' : 'inline'
	const [active, setActive] = useState<string | null>(null)
	const [open, setOpen] = useState<Record<string, boolean>>({})
	const edgesRef = useRef<SVGSVGElement>(null)

	const layout = useCallback(() => {
		const page = pageRef.current
		if (!page) return
		const cards = Array.from(
			page.querySelectorAll<HTMLElement>('[data-note-card]')
		)
		if (mode !== 'margin') {
			cards.forEach(card => {
				card.style.transform = ''
			})
			return
		}
		const pageBox = page.getBoundingClientRect()
		const items = cards
			.map(card => {
				const id = card.dataset.noteCard as string
				const marker = page.querySelector<HTMLElement>(
					`[data-note-marker="${id}"]`
				)
				const box = marker?.getBoundingClientRect()
				const anchorY = box ? box.top - pageBox.top + box.height / 2 : 0
				// Leaders travel through gaps, never through letters: the row rule in a table,
				// otherwise the space between this line and the next.
				const row = marker?.closest('tr')?.getBoundingClientRect()
				const claim = page.querySelector(`[data-note-anchor="${id}"]`)?.getClientRects()
				const lineBottom = claim?.length ? claim[claim.length - 1].bottom : box?.bottom ?? 0
				const gapY = row ? row.bottom - 0.5 : lineBottom + 2.5
				return {
					id,
					card,
					markerX: box ? box.left - pageBox.left + box.width / 2 : 0,
					markerBottom: box ? box.bottom - pageBox.top : 0,
					gapY: gapY - pageBox.top,
					want: anchorY - 22,
					h: card.offsetHeight,
					y: 0,
				}
			})
			.sort((a, b) => a.want - b.want)

		const at = active ? items.findIndex(item => item.id === active) : -1
		if (at < 0) {
			let floor = -Infinity
			items.forEach(item => {
				item.y = Math.max(item.want, floor)
				floor = item.y + item.h + GAP
			})
		} else {
			// The focused thread lines up with its claim; its neighbours make room.
			items[at].y = items[at].want
			for (let i = at + 1; i < items.length; i++)
				items[i].y = Math.max(items[i].want, items[i - 1].y + items[i - 1].h + GAP)
			for (let i = at - 1; i >= 0; i--)
				items[i].y = Math.min(items[i].want, items[i + 1].y - items[i].h - GAP)
		}

		// Leader lines: a stub across the gutter at rest; on hover or focus it reaches back to the claim.
		const svg = edgesRef.current
		const firstCard = items[0]?.card.getBoundingClientRect()
		const width = page.offsetWidth
		const gap = firstCard ? firstCard.left - pageBox.right : 0
		if (svg) {
			svg.style.width = `${width + Math.max(gap, 0)}px`
			svg.style.height = `${page.offsetHeight}px`
		}
		items.forEach(item => {
			item.card.style.transform = `translate3d(0, ${Math.round(item.y)}px, 0)`
			const y1 = Math.round(item.gapY) + 0.5
			const y2 = Math.round(item.y) + 21.5
			const mid = width + gap / 2
			const x0 = Math.round(item.markerX) + 0.5
			svg
				?.querySelector(`[data-note-edge="${item.id}"]`)
				?.setAttribute('d', `M${width} ${y1} C${mid} ${y1} ${mid} ${y2} ${width + gap} ${y2}`)
			svg
				?.querySelector(`[data-note-reach="${item.id}"]`)
				?.setAttribute('d', `M${x0} ${Math.round(item.markerBottom) + 1} V${y1} H${width}`)
		})
		if (!page.hasAttribute('data-notes-placed'))
			requestAnimationFrame(() => page.setAttribute('data-notes-placed', ''))
	}, [mode, active, pageRef])

	const layoutRef = useRef(layout)
	useLayoutEffect(() => {
		layoutRef.current = layout
		layout()
	}, [layout])

	// Re-pin when anything moves: viewport width, late fonts, images.
	useEffect(() => {
		const page = pageRef.current
		if (!page) return
		let frame = 0
		const schedule = () => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(() => layoutRef.current())
		}
		const observer = new ResizeObserver(schedule)
		observer.observe(page)
		document.fonts?.ready.then(schedule)
		return () => {
			cancelAnimationFrame(frame)
			observer.disconnect()
		}
	}, [pageRef])

	// Proof-on-demand: a note arrives as its claim enters view.
	useEffect(() => {
		const page = pageRef.current
		if (!page || !document.documentElement.classList.contains('js-motion')) {
			if (page) noteIds.forEach(id => reveal(page, id))
			return
		}
		const io = new IntersectionObserver(
			entries => {
				entries
					.filter(entry => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
					.forEach((entry, i) => {
						const el = entry.target as HTMLElement
						reveal(page, el.dataset.noteAnchor as string, i * 110)
						io.unobserve(el)
					})
			},
			{ rootMargin: '0px 0px -10% 0px' }
		)
		page
			.querySelectorAll<HTMLElement>('[data-note-anchor]:not([data-in])')
			.forEach(el => io.observe(el))
		return () => io.disconnect()
	}, [pageRef, mode])

	// Click elsewhere or press Escape to let go of the focused thread.
	useEffect(() => {
		if (!active) return
		const onPointer = (event: MouseEvent) => {
			const target = event.target as Element | null
			if (!target?.closest('[data-note-marker], [data-note-card]')) setActive(null)
		}
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setActive(null)
		}
		document.addEventListener('click', onPointer)
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('click', onPointer)
			document.removeEventListener('keydown', onKey)
		}
	}, [active])

	const activate = useCallback(
		(id: string | null) => {
			if (id && pageRef.current) reveal(pageRef.current, id)
			setActive(id)
		},
		[pageRef]
	)

	const press = useCallback(
		(id: string) => {
			if (mode === 'margin') activate(active === id ? null : id)
			else setOpen(prev => ({ ...prev, [id]: !prev[id] }))
		},
		[mode, active, activate]
	)

	const value = useMemo(
		() => ({ mode, active, open, press, activate }),
		[mode, active, open, press, activate]
	)

	return (
		<NotesContext.Provider value={value}>
			{children}
			<svg
				ref={edgesRef}
				className={styles.edges}
				aria-hidden="true"
				focusable="false"
			>
				{noteIds.map(id => (
					<React.Fragment key={id}>
						<path
							className={styles.reach}
							data-note-reach={id}
							data-active={active === id || undefined}
						/>
						<path
							data-note-edge={id}
							data-active={active === id || undefined}
							pathLength={1}
						/>
					</React.Fragment>
				))}
			</svg>
		</NotesContext.Provider>
	)
}

const isOn = (state: NotesState, id: string) =>
	state.mode === 'margin' ? state.active === id : !!state.open[id]

// The highlighted claim plus its footnote marker.
export function NoteAnchor({ id, children }: { id: string; children: ReactNode }) {
	const state = useNotes()
	const n = noteNumber(id)
	const on = isOn(state, id)
	const hover = (flag: boolean) => (event: React.MouseEvent) =>
		setHot(
			(event.currentTarget as HTMLElement).closest('[data-notes-page]') as HTMLElement,
			id,
			flag
		)
	return (
		<>
			<mark
				className={styles.anchor}
				data-note-anchor={id}
				data-active={on || undefined}
				onMouseEnter={hover(true)}
				onMouseLeave={hover(false)}
			>
				{children}
			</mark>
			<button
				type="button"
				className={styles.marker}
				data-note-marker={id}
				data-active={on || undefined}
				aria-label={`Source note ${n}`}
				aria-controls={`note-${id}`}
				aria-expanded={state.mode === 'inline' ? on : undefined}
				onClick={() => state.press(id)}
				onMouseEnter={hover(true)}
				onMouseLeave={hover(false)}
			>
				{n}
			</button>
		</>
	)
}

// The comment thread itself. Lives right after its claim in the DOM, so it reads in order.
export function NoteCard({ id }: { id: string }) {
	const state = useNotes()
	const note = notes[id]
	const n = noteNumber(id)
	const on = isOn(state, id)
	const shown = state.mode === 'margin' || on
	const hover = (flag: boolean) => (event: React.MouseEvent) =>
		setHot(
			(event.currentTarget as HTMLElement).closest('[data-notes-page]') as HTMLElement,
			id,
			flag
		)
	return (
		<div
			id={`note-${id}`}
			className={styles.slot}
			data-note-card={id}
			data-active={on || undefined}
			data-open={shown}
			role="note"
			aria-label={`Source note ${n}: ${note.title}`}
			onClick={state.mode === 'margin' ? () => state.activate(id) : undefined}
			onMouseEnter={hover(true)}
			onMouseLeave={hover(false)}
		>
			<div className={styles.collapse}>
				<div className={styles.card}>
					<p className={styles.cardHead}>
						<span className={styles.badge} aria-hidden="true">
							{n}
						</span>
						<span className={styles.cardTitle}>{note.title}</span>
						{note.jump && (
							<a
								className={styles.cardJump}
								href={note.jump.href}
								aria-label={`Go to section ${note.jump.label}`}
							>
								{note.jump.label}
								<Icon name="arrowDown" size={13} />
							</a>
						)}
					</p>
					<p className={styles.cardBody}>{note.body}</p>
					{note.link && (
						<a
							className={styles.cardLink}
							href={note.link.href}
							target="_blank"
							rel="noreferrer"
						>
							<Icon name="github" size={14} />
							<span className={styles.repo}>{note.link.label}</span>
						</a>
					)}
				</div>
			</div>
		</div>
	)
}
