import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Kind, Role, items, roles as roleList } from '../content'
import { FilterState, Shown, isFiltering, nearestIn, roleCounts, searchableTags } from '../lib/filter'
import { tagById } from '../lib/vocab'
import Shelf from './Shelf'
import { IconCheck, IconClose, IconPin, IconSearch } from './icons'

// Work: the role chips and the technology search filter both carousels at once. Experience holds
// internships, the contract, ambassador and teaching roles and the client deployments; Projects
// holds what he built on his own. Pinned work (from a posting, a question or a ?for= view) leads.

type Props = {
	filter: FilterState
	shown: Shown[]
	pinnedLabel: string
	onFilter: (patch: Partial<FilterState>) => void
	onToggleRole: (r: Role) => void
	onClear: () => void
	onOpen: (id: string) => void
}

export const EXPERIENCE: Kind[] = ['experience', 'client']
export const PROJECTS: Kind[] = ['project']

const allTags = searchableTags()

const TechSearch = ({ filter, onFilter }: { filter: FilterState; onFilter: Props['onFilter'] }) => {
	const [open, setOpen] = useState(false)
	const [active, setActive] = useState(0)
	const box = useRef<HTMLDivElement>(null)
	const q = filter.query.trim().toLowerCase()
	const options = useMemo(() => {
		const pool = allTags.filter(t => !filter.techs.includes(t.id))
		if (!q) return pool.slice(0, 8)
		// an exact match first, then labels that start with the text, then the rest
		const rankOf = (label: string) => {
			const l = label.toLowerCase()
			return l === q ? 0 : l.startsWith(q) ? 1 : 2
		}
		return pool
			.filter(t => t.label.toLowerCase().includes(q))
			.sort((a, b) => rankOf(a.label) - rankOf(b.label))
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


/** the technologies used most across the work, one click each */
const often = allTags.filter(t => t.group === 'tech').slice(0, 6)

const Empty = ({ kinds, noun, filter, onFilter, onClear }: { kinds: Kind[]; noun: string; filter: FilterState; onFilter: Props['onFilter']; onClear: () => void }) => {
	const near = nearestIn(kinds, filter)
	// say what was asked for: "No project matches Security."
	const asked = [
		filter.roles.map(r => roleList.find(x => x.id === r)!.label).join(' or '),
		filter.techs.map(t => tagById[t]?.label || t).join(' or '),
		filter.query.trim() ? `“${filter.query.trim()}”` : '',
	].filter(Boolean)
	return (
		<p className="shelf__empty-text">
			No {noun} matches {asked.length ? asked.join(' with ') : 'these filters'}.
			{near.length > 0 && ' Closest: '}
			{near.map((n, i) => (
				<React.Fragment key={n.label}>
					{i > 0 && ' or '}
					<button type="button" className="chip chip--small" onClick={() => onFilter(n.apply)}>
						{n.label}
						<span className="chip__count">{n.count}</span>
					</button>
				</React.Fragment>
			))}
			{near.length === 0 && (
				<button type="button" className="link-btn" onClick={onClear}>
					Clear the filters
				</button>
			)}
		</p>
	)
}

const Work = ({ filter, shown, pinnedLabel, onFilter, onToggleRole, onClear, onOpen }: Props) => {
	const counts = useMemo(() => roleCounts(filter), [filter])
	const filtering = isFiltering(filter)
	const exp = shown.filter(s => EXPERIENCE.includes(s.item.kind))
	const proj = shown.filter(s => PROJECTS.includes(s.item.kind))
	const toggleTech = (id: string) =>
		onFilter({ techs: filter.techs.includes(id) ? filter.techs.filter(x => x !== id) : [...filter.techs, id] })

	return (
		<section className="work" id="work" aria-labelledby="work-title">
			<div className="wrap work__head">
				<h2 id="work-title" className="h2">
					Work
				</h2>
				<p className="work__lede">
					Pick what your role needs and the closest work moves to the front of both rows. Open any card for the full story.
				</p>
			</div>
			<div className="wrap filters">
				<div className="filters__roles" role="group" aria-label="Filter by role">
					{roleList.map(r => {
						const on = filter.roles.includes(r.id)
						return (
							<button key={r.id} type="button" className="chip chip--count" aria-pressed={on} onClick={() => onToggleRole(r.id)}>
								<IconCheck className="chip__check" />
								{r.label}
								{r.id === 'fde' && <span className="sr-only"> (forward deployed engineer)</span>}
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
					<div className="filters__often" role="group" aria-label="Often used">
						<span className="filters__often-label">Often used:</span>
						{often.map(t => (
							<button key={t.id} type="button" className="tech" aria-pressed={filter.techs.includes(t.id)} onClick={() => toggleTech(t.id)}>
								{t.label}
							</button>
						))}
					</div>
				</div>
				{(filter.techs.length > 0 || filtering) && (
					<div className="filters__state">
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
						{pinnedLabel && filter.pinned.length > 0 && (
							<p className="filters__pinned">
								<IconPin />
								{pinnedLabel}
							</p>
						)}
					</div>
				)}
			</div>
			<Shelf
				id="experience"
				title="Experience"
				note="Internships, a contract, client deployments, ambassador and teaching roles"
				shown={exp}
				filtering={filtering}
				onOpen={onOpen}
				empty={<Empty kinds={EXPERIENCE} noun="experience" filter={filter} onFilter={onFilter} onClear={onClear} />}
			/>
			<Shelf
				id="projects"
				title="Projects"
				note="What he built on his own, most with public code on GitHub"
				shown={proj}
				filtering={filtering}
				onOpen={onOpen}
				empty={<Empty kinds={PROJECTS} noun="project" filter={filter} onFilter={onFilter} onClear={onClear} />}
			/>
		</section>
	)
}

export default Work
