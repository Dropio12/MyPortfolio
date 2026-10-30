import { Item, Kind, Role, items, roles as roleList } from '../content'
import { extract } from './answer'
import { tagById } from './vocab'

// Catalogue filtering: role chips (any of), technology tokens (any of), free text, and pinned
// items that always lead. Ranking puts pins first, then the items that match the most.

export type FilterState = { roles: Role[]; techs: string[]; query: string; pinned: string[] }

export type Shown = { item: Item; roleHits: Role[]; techHits: string[]; pinned: boolean; score: number }

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export const textMatch = (item: Item, q: string) => {
	const needle = norm(q.trim())
	if (!needle) return true
	const hay = norm(
		[item.title, item.line, item.meta, item.position || '', ...item.stack, ...item.tags.map(t => tagById[t]?.label || t)].join(' ')
	)
	return needle.split(/\s+/).every(w => hay.includes(w))
}

const passes = (item: Item, f: FilterState, ignoreRoles = false) =>
	(ignoreRoles || !f.roles.length || item.roles.some(r => f.roles.includes(r))) &&
	(!f.techs.length || item.tags.some(t => f.techs.includes(t))) &&
	textMatch(item, f.query)

export const isFiltering = (f: FilterState) => !!(f.roles.length || f.techs.length || f.query.trim() || f.pinned.length)

export const visibleItems = (f: FilterState): Shown[] =>
	items
		.map((item, index) => {
			const roleHits = item.roles.filter(r => f.roles.includes(r))
			const techHits = item.tags.filter(t => f.techs.includes(t))
			const pinIndex = f.pinned.indexOf(item.id)
			const pinned = pinIndex >= 0
			const score =
				(pinned ? 1000 - pinIndex * 10 : 0) + roleHits.length * 4 + techHits.length * 3 + (items.length - index) * 0.01
			return { item, roleHits, techHits, pinned, score }
		})
		.filter(s => s.pinned || passes(s.item, f))
		.sort((a, b) => b.score - a.score)

export const roleCounts = (f: FilterState) =>
	Object.fromEntries(roleList.map(r => [r.id, items.filter(i => i.roles.includes(r.id) && passes(i, f, true)).length])) as Record<
		Role,
		number
	>

/** the tags worth suggesting in the technology search, most used first */
export const searchableTags = () => {
	const counts = new Map<string, number>()
	items.forEach(i => i.tags.forEach(t => counts.set(t, (counts.get(t) || 0) + 1)))
	return Array.from(counts.entries())
		.filter(([t]) => tagById[t])
		.map(([t, n]) => ({ id: t, label: tagById[t].label, group: tagById[t].group, count: n }))
		.sort((a, b) => (a.group === 'tech' ? 0 : 1) - (b.group === 'tech' ? 0 : 1) || b.count - a.count)
}

export type Nearest = { label: string; apply: Partial<FilterState>; count: number }

/** when nothing matches: the single change that brings the most work back */
export const nearest = (f: FilterState): Nearest[] => {
	const out: Nearest[] = []
	const count = (g: FilterState) => visibleItems(g).length
	if (f.roles.length && (f.techs.length || f.query.trim())) {
		const g = { ...f, techs: [], query: '' }
		out.push({ label: `${roleList.filter(r => f.roles.includes(r.id)).map(r => r.label).join(' or ')} only`, apply: { techs: [], query: '' }, count: count(g) })
	}
	if (f.techs.length && f.roles.length) {
		const g = { ...f, roles: [] }
		out.push({ label: `${f.techs.map(t => tagById[t]?.label || t).join(' or ')} only`, apply: { roles: [] }, count: count(g) })
	}
	if (f.query.trim()) {
		// the words in the search may name a role or a technology the chips understand
		const found = extract(f.query)
		const role = found.roles[0]
		if (role) {
			const g: FilterState = { roles: [role], techs: [], query: '', pinned: f.pinned }
			out.push({ label: roleList.find(r => r.id === role)!.label, apply: { roles: [role], techs: [], query: '' }, count: count(g) })
		}
		const tag = found.tags.find(t => items.some(i => i.tags.includes(t)))
		if (tag) {
			const g: FilterState = { roles: [], techs: [tag], query: '', pinned: f.pinned }
			out.push({ label: tagById[tag].label, apply: { roles: [], techs: [tag], query: '' }, count: count(g) })
		}
	}
	if (!out.some(o => o.count > 0)) {
		// fall back to the busiest role chip
		const counts = roleCounts({ roles: [], techs: [], query: '', pinned: [] })
		const best = roleList.slice().sort((a, b) => counts[b.id] - counts[a.id])[0]
		out.push({ label: best.label, apply: { roles: [best.id], techs: [], query: '' }, count: counts[best.id] })
	}
	return out.filter(o => o.count > 0).slice(0, 2)
}

/** when one carousel is empty: the closest change that brings work of its kind back */
export const nearestIn = (kinds: Kind[], f: FilterState): Nearest[] => {
	const countIn = (g: FilterState) => visibleItems(g).filter(s => kinds.includes(s.item.kind)).length
	const out: Nearest[] = []
	if (f.techs.length || f.query.trim()) {
		const g = { ...f, techs: [], query: '' }
		const label = f.roles.length ? `${roleList.filter(r => f.roles.includes(r.id)).map(r => r.label).join(' or ')} only` : 'Without the search'
		out.push({ label, apply: { techs: [], query: '' }, count: countIn(g) })
	}
	// the role chip with the most work of this kind, keeping the search
	const best = roleList
		.filter(r => !f.roles.includes(r.id))
		.map(r => ({ r, n: countIn({ roles: [r.id], techs: f.techs, query: f.query, pinned: [] }) }))
		.sort((a, b) => b.n - a.n)[0]
	if (best && best.n > 0) out.push({ label: best.r.label, apply: { roles: [best.r.id] }, count: best.n })
	return out.filter(o => o.count > 0).slice(0, 2)
}
