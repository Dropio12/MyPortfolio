import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Role, items, roles as roleList } from '../content'
import { FilterState, Shown, isFiltering, nearest, roleCounts, searchableTags } from '../lib/filter'
import { tagById } from '../lib/vocab'
import { Art } from './Art'
import { IconCheck, IconClose, IconPin, IconPlay, IconSearch } from './icons'

type Props = {
	filter: FilterState
	shown: Shown[]
	pinnedLabel: string
	onFilter: (patch: Partial<FilterState>) => void
	onToggleRole: (r: Role) => void
	onClear: () => void
	onOpen: (id: string) => void
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** animate tiles from where they were to where they are after a filter change (FLIP) */
const useFlip = (grid: React.RefObject<HTMLElement>, key: string) => {
	const prev = useRef(new Map<string, { x: number; y: number }>())
	const measure = () => {
		const el = grid.current
		const m = new Map<string, { x: number; y: number }>()
		el?.querySelectorAll<HTMLElement>('[data-flip]').forEach(n => m.set(n.dataset.flip!, { x: n.offsetLeft, y: n.offsetTop }))
		return m
	}
	useLayoutEffect(() => {
		const el = grid.current
		if (!el) return
		const next = measure()
		const r = el.getBoundingClientRect()
		const near = r.top < window.innerHeight * 1.5 && r.bottom > -window.innerHeight * 0.5
		if (prev.current.size && near && !reduced() && 'animate' in el) {
			el.querySelectorAll<HTMLElement>('[data-flip]').forEach(n => {
				const id = n.dataset.flip!
				const a = prev.current.get(id)
				const b = next.get(id)!
				if (!a) {
					n.animate([{ opacity: 0, transform: 'scale(0.94)' }, { opacity: 1, transform: 'none' }], {
						duration: 340,
						delay: 90,
						easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
						fill: 'backwards',
					})
					return
				}
				const dx = a.x - b.x
				const dy = a.y - b.y
				if (dx || dy)
					n.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], {
						duration: 460,
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

const allTags = searchableTags()

const TechSearch = ({ filter, onFilter }: { filter: FilterState; onFilter: Props['onFilter'] }) => {
	const [open, setOpen] = useState(false)
	const [active, setActive] = useState(0)
	const box = useRef<HTMLDivElement>(null)
	const q = filter.query.trim().toLowerCase()
	const options = useMemo(() => {
		const pool = allTags.filter(t => !filter.techs.includes(t.id))
		if (!q) return pool.slice(0, 8)
		return pool
			.filter(t => t.label.toLowerCase().includes(q))
			.sort((a, b) => Number(!a.label.toLowerCase().startsWith(q)) - Number(!b.label.toLowerCase().startsWith(q)))
			.slice(0, 8)
	}, [q, filter.techs])

	useEffect(() => {
		const off = (e: PointerEvent) => {
			if (box.current && !box.current.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener('pointerdown', off)
		return () => document.removeEventListener('pointerdown', off)
	}, [])

	const choose = (id: string) => {
		onFilter({ techs: [...filter.techs, id], query: '' })
		setOpen(false)
		setActive(0)
	}

	return (
		<div className="search" ref={box}>
			<IconSearch className="search__icon" />
			<input
				className="search__input"
				type="search"
				role="combobox"
				aria-expanded={open && options.length > 0}
				aria-controls="tech-options"
				aria-autocomplete="list"
				aria-activedescendant={open && options[active] ? `tech-${options[active].id}` : undefined}
				aria-label="Search by technology"
				placeholder="Search tech: Python, gRPC, RAG…"
				value={filter.query}
				onFocus={() => setOpen(true)}
				onChange={e => {
					onFilter({ query: e.target.value })
					setOpen(true)
					setActive(0)
				}}
				onKeyDown={e => {
					if (e.key === 'ArrowDown') {
						e.preventDefault()
						setOpen(true)
						setActive(a => Math.min(a + 1, options.length - 1))
					} else if (e.key === 'ArrowUp') {
						e.preventDefault()
						setActive(a => Math.max(a - 1, 0))
					} else if (e.key === 'Enter') {
						e.preventDefault()
						if (open && options[active] && q) choose(options[active].id)
						else setOpen(false)
					} else if (e.key === 'Escape') {
						if (open) {
							e.stopPropagation()
							setOpen(false)
						}
					} else if (e.key === 'Backspace' && !filter.query && filter.techs.length) {
						onFilter({ techs: filter.techs.slice(0, -1) })
					}
				}}
			/>
			{open && options.length > 0 && (
				<ul className="search__list" id="tech-options" role="listbox" aria-label="Technologies">
					{options.map((o, i) => (
						<li
							key={o.id}
							id={`tech-${o.id}`}
							role="option"
							aria-selected={i === active}
							className={i === active ? 'is-active' : ''}
							onPointerDown={e => {
								e.preventDefault()
								choose(o.id)
							}}
							onPointerEnter={() => setActive(i)}
						>
							<span>{o.label}</span>
							<span className="search__count">{o.count}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

const markFor = (s: Shown) => {
	if (s.pinned) return 'Best match'
	const words = [...s.roleHits.map(r => roleList.find(x => x.id === r)!.label), ...s.techHits.map(t => tagById[t]?.label || t)]
	return words.slice(0, 3).join(' · ')
}

export const Tile = ({ s, onOpen, filtering }: { s: Shown; onOpen: (id: string) => void; filtering: boolean }) => {
	const { item } = s
	const mark = filtering ? markFor(s) : ''
	return (
		<a
			className={`tile${mark ? ' is-match' : ''}${s.pinned ? ' is-pinned' : ''}`}
			href={`#${item.id}`}
			id={`tile-${item.id}`}
			onClick={e => {
				if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
				e.preventDefault()
				onOpen(item.id)
			}}
		>
			<div className="tile__art">
				{item.image ? (
					<img src={item.image.tile || item.image.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: item.image.position }} />
				) : (
					<Art id={item.id} />
				)}
				{mark && (
					<span className="tile__mark">
						{s.pinned ? <IconPin /> : <IconCheck />}
						{mark}
					</span>
				)}
				{item.demo && (
					<span className="tile__demo">
						<IconPlay />
						Demo
					</span>
				)}
			</div>
			<div className="tile__body">
				<h3 className="tile__title">{item.title}</h3>
				<p className="tile__line">{item.line}</p>
				<p className="tile__foot">
					<span className="tile__stack">{item.stack.slice(0, 3).join(' · ')}</span>
					<span className="tile__meta">{item.meta}</span>
				</p>
			</div>
		</a>
	)
}

const Catalogue = ({ filter, shown, pinnedLabel, onFilter, onToggleRole, onClear, onOpen }: Props) => {
	const grid = useRef<HTMLUListElement>(null)
	const counts = useMemo(() => roleCounts(filter), [filter])
	const filtering = isFiltering(filter)
	const orderKey = shown.map(s => s.item.id).join(',')
	useFlip(grid, orderKey)
	const empty = shown.length === 0 ? nearest(filter) : []

	return (
		<section className="work" id="work" aria-labelledby="work-title">
			<div className="wrap">
				<div className="work__head">
					<h2 id="work-title" className="h2">
						Work
					</h2>
					<p className="work__lede">
						Internships, client deployments and projects. Pick what your role needs and the closest work moves to the front. Open any
						tile for the full story.
					</p>
				</div>
				<div className="filters">
					<div className="filters__roles" role="group" aria-label="Filter by role">
						{roleList.map(r => {
							const on = filter.roles.includes(r.id)
							return (
								<button key={r.id} type="button" className="chip chip--count" aria-pressed={on} onClick={() => onToggleRole(r.id)}>
									<IconCheck className="chip__check" />
									{r.label}
									<span className="chip__count">
										<span className="sr-only">, </span>
										{counts[r.id]}
									</span>
								</button>
							)
						})}
					</div>
					<div className="filters__row">
						<TechSearch filter={filter} onFilter={onFilter} />
						{filter.techs.length > 0 && (
							<ul className="tokens" aria-label="Technologies picked">
								{filter.techs.map(t => (
									<li key={t}>
										<button type="button" className="token" onClick={() => onFilter({ techs: filter.techs.filter(x => x !== t) })}>
											{tagById[t]?.label || t}
											<IconClose />
											<span className="sr-only">, remove</span>
										</button>
									</li>
								))}
							</ul>
						)}
						<p className="filters__count" aria-live="polite">
							{shown.length === items.length ? `All ${items.length}` : `${shown.length} of ${items.length}`}
						</p>
						{filtering && (
							<button type="button" className="link-btn link-btn--small" onClick={onClear}>
								Clear
							</button>
						)}
					</div>
					{pinnedLabel && filter.pinned.length > 0 && (
						<p className="filters__pinned">
							<IconPin />
							{pinnedLabel}
						</p>
					)}
				</div>
				<ul className="grid" ref={grid}>
					{shown.map(s => (
						<li key={s.item.id} data-flip={s.item.id}>
							<Tile s={s} onOpen={onOpen} filtering={filtering} />
						</li>
					))}
				</ul>
				{shown.length === 0 && (
					<div className="empty" role="status">
						<p className="empty__title">Nothing here matches all of that.</p>
						<p className="empty__text">
							{empty.length ? 'The nearest filters that do:' : 'Clear the filters to see everything.'}
						</p>
						<div className="empty__actions">
							{empty.map(n => (
								<button key={n.label} type="button" className="chip" onClick={() => onFilter(n.apply)}>
									{n.label}
									<span className="chip__count">{n.count}</span>
								</button>
							))}
							<button type="button" className="link-btn" onClick={onClear}>
								Clear all
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}

export default Catalogue
