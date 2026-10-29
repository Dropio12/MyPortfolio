import React, { useMemo, useState } from 'react'
import type { C4Edge, C4Node, C4View } from '../deep'

// C4 diagrams drawn in the page's paper language: people, the system in focus (in the ice wash),
// the containers inside it within a dashed boundary, stores as cylinders, outside systems in gray
// on the right. The layout is computed from each node's layer, so the data stays a plain list.
// Two levels, switched with tabs: System context, then Containers.

const W = 960
const PAD = 24
const GAP_X = 28
const GAP_Y = 124
const EXT_W = 196

type Box = { n: C4Node; x: number; y: number; w: number; h: number }
type Label = { x: number; y: number; w: number; h: number }

const heightOf = (n: C4Node) => (n.kind === 'person' || n.kind === 'database' ? 122 : 100)

/** the drawn size of an edge's label box */
const labelSize = (e: C4Edge) => ({ w: Math.max((e.label || '').length, (e.tech || '').length + 2) * 6.7 + 16, h: e.tech ? 34 : 20 })

/** wrap a short description into at most two lines that fit the box */
const wrap = (text: string, width: number, px = 7.1) => {
	const budget = Math.max(8, Math.floor(width / px))
	const words = text.split(/\s+/)
	const lines: string[] = []
	let line = ''
	for (const w of words) {
		const next = line ? `${line} ${w}` : w
		if (next.length > budget && line) {
			lines.push(line)
			line = w
		} else line = next
	}
	if (line) lines.push(line)
	if (lines.length > 2) return [lines[0], `${lines.slice(1).join(' ').slice(0, budget - 1)}…`]
	return lines
}

// neighbours in a row that talk to each other get a gap wide enough for the label between them
const row = (nodes: C4Node[], y: number, left: number, width: number, maxW: number, edges: C4Edge[]): Box[] => {
	const n = nodes.length
	const gaps = nodes.slice(1).map((node, i) => {
		const prev = nodes[i]
		const e = edges.find(e => (e.from === prev.id && e.to === node.id) || (e.from === node.id && e.to === prev.id))
		return e && e.label ? Math.max(GAP_X, labelSize(e).w + 20) : GAP_X
	})
	// boxes never shrink below a readable width: wide label gaps give way first
	const MIN_W = 158
	let gapSum = gaps.reduce((a, b) => a + b, 0)
	const over = n * MIN_W + gapSum - width
	if (over > 0 && gapSum > GAP_X * gaps.length) {
		const extra = gapSum - GAP_X * gaps.length
		const keep = Math.max(0, extra - over) / extra
		gaps.forEach((g, i) => (gaps[i] = GAP_X + (g - GAP_X) * keep))
		gapSum = gaps.reduce((a, b) => a + b, 0)
	}
	const w = Math.min(maxW, (width - gapSum) / n)
	const total = n * w + gapSum
	let x = left + (width - total) / 2
	return nodes.map((node, i) => {
		const box = { n: node, x, y, w, h: heightOf(node) }
		x += w + (gaps[i] || 0)
		return box
	})
}

const byLayer = (nodes: C4Node[]) => {
	const layers = Array.from(new Set(nodes.map(n => n.layer))).sort((a, b) => a - b)
	return layers.map(l => nodes.filter(n => n.layer === l))
}

const layout = (view: C4View, level: 'context' | 'containers') => {
	const boxes: Box[] = []
	let y = PAD
	if (level === 'context') {
		for (const r of byLayer(view.nodes)) {
			const placed = row(r, y, PAD, W - PAD * 2, 230, view.edges)
			boxes.push(...placed)
			y += Math.max(...placed.map(b => b.h)) + GAP_Y
		}
		return { boxes, boundary: null, height: y - GAP_Y + PAD }
	}
	// containers: people across the top, outside systems in a column on the right, and the inside
	// of the system in rows inside a dashed boundary
	const people = view.nodes.filter(n => n.kind === 'person')
	const outside = view.nodes.filter(n => n.kind === 'external' || n.kind === 'system')
	const inside = view.nodes.filter(n => n.kind === 'container' || n.kind === 'database')
	const mainW = W - PAD * 2 - (outside.length ? EXT_W + 76 : 0)
	if (people.length) {
		const placed = row(people, y, PAD, mainW, 200, view.edges)
		boxes.push(...placed)
		y += 122 + GAP_Y - 20
	}
	const top = y
	y += 34
	const rows = byLayer(inside)
	const insideBoxes: Box[] = []
	for (const r of rows) {
		const placed = row(r, y, PAD + 22, mainW - 44, 200, view.edges)
		insideBoxes.push(...placed)
		y += Math.max(...placed.map(b => b.h)) + GAP_Y
	}
	boxes.push(...insideBoxes)
	const bottom = y - GAP_Y + 22
	const boundary = insideBoxes.length ? { x: PAD, y: top, w: mainW, h: bottom - top } : null
	if (outside.length) {
		const span = Math.max(bottom, top + outside.length * 128) - top
		const step = span / outside.length
		outside.forEach((n, i) => boxes.push({ n, x: W - PAD - EXT_W, y: top + i * step + (step - 100) / 2, w: EXT_W, h: 100 }))
	}
	const height = Math.max(bottom, ...boxes.map(b => b.y + b.h)) + PAD
	return { boxes, boundary, height }
}

/** where an edge leaves one box and enters the other */
const ports = (a: Box, b: Box): [number, number, number, number] => {
	const acx = a.x + a.w / 2
	const acy = a.y + a.h / 2
	const bcx = b.x + b.w / 2
	const bcy = b.y + b.h / 2
	const overlapY = a.y < b.y + b.h && b.y < a.y + a.h
	if (overlapY) {
		// side by side
		return acx < bcx ? [a.x + a.w, acy, b.x, bcy] : [a.x, acy, b.x + b.w, bcy]
	}
	const down = acy < bcy
	const ax = acx + Math.max(-a.w / 3, Math.min(a.w / 3, (bcx - acx) * 0.25))
	const bx = bcx + Math.max(-b.w / 3, Math.min(b.w / 3, (acx - bcx) * 0.25))
	return down ? [ax, a.y + a.h, bx, b.y] : [ax, a.y, bx, b.y + b.h]
}

const hit = (a: Label, b: Label) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h

/** does the segment cross the box (Liang-Barsky clip against the box grown by a few pixels) */
const crosses = (x1: number, y1: number, x2: number, y2: number, b: Box) => {
	const pad = 6
	const dx = x2 - x1
	const dy = y2 - y1
	let t0 = 0
	let t1 = 1
	const edges: [number, number][] = [
		[-dx, x1 - (b.x - pad)],
		[dx, b.x + b.w + pad - x1],
		[-dy, y1 - (b.y - pad)],
		[dy, b.y + b.h + pad - y1],
	]
	for (const [p, q] of edges) {
		if (p === 0) {
			if (q < 0) return false
		} else {
			const r = q / p
			if (p < 0) t0 = Math.max(t0, r)
			else t1 = Math.min(t1, r)
			if (t0 > t1) return false
		}
	}
	return t1 - t0 > 0.02
}

type Pt = [number, number]
type Route = { d: string; spots: Pt[]; clear: boolean }

const pathOf = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ')

/** label spots along a polyline: the middle of its longest run first, then other points on it */
const spotsOf = (pts: Pt[]): Pt[] => {
	const runs = pts.slice(1).map((p, i) => ({ a: pts[i], b: p, len: Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]) }))
	runs.sort((x, y) => y.len - x.len)
	const out: Pt[] = []
	for (const off of [0, 1, -1])
		for (const r of runs) {
			// a step off the line, across it: up or down for a level run, sideways for an upright one
			const level = Math.abs(r.b[1] - r.a[1]) < Math.abs(r.b[0] - r.a[0])
			const ox = level ? 0 : off * 64
			const oy = level ? off * 22 : 0
			for (const t of [0.5, 0.32, 0.68, 0.2, 0.8]) out.push([r.a[0] + (r.b[0] - r.a[0]) * t + ox, r.a[1] + (r.b[1] - r.a[1]) * t + oy])
		}
	return out
}

// a straight line when nothing is in the way; otherwise the first of a few right-angled paths that
// stays clear of every other box: through the gap under (or over) the source row, or around the
// right or left of the boxes in between
const route = (a: Box, b: Box, boxes: Box[], lane: number): Route => {
	const others = boxes.filter(o => o !== a && o !== b)
	const clearOf = (pts: Pt[]) => !pts.slice(1).some((p, i) => others.some(o => crosses(pts[i][0], pts[i][1], p[0], p[1], o)))
	const [x1, y1, x2, y2] = ports(a, b)
	const straight: Pt[] = [
		[x1, y1],
		[x2, y2],
	]
	if (clearOf(straight)) return { d: pathOf(straight), spots: spotsOf(straight), clear: true }

	const acx = a.x + a.w / 2
	const acy = a.y + a.h / 2
	const bcx = b.x + b.w / 2
	const bcy = b.y + b.h / 2
	const below = b.y >= a.y + a.h
	const above = b.y + b.h <= a.y
	const step = lane * 20
	const options: Pt[][] = []
	if (below || !above) {
		const ch = a.y + a.h + 26 + step
		if (b.y > ch + 10)
			options.push([
				[acx, a.y + a.h],
				[acx, ch],
				[bcx, ch],
				[bcx, b.y],
			])
		const side = b.x >= a.x + a.w ? b.x - 18 : b.x + b.w + 18
		options.push([
			[acx, a.y + a.h],
			[acx, ch],
			[side, ch],
			[side, bcy],
			[b.x >= a.x + a.w ? b.x : b.x + b.w, bcy],
		])
	}
	if (above) {
		const ch = a.y - 26 - step
		options.push([
			[acx, a.y],
			[acx, ch],
			[bcx, ch],
			[bcx, b.y + b.h],
		])
	}
	// around the right or the left of everything between the two rows
	const top = Math.min(a.y, b.y)
	const bottom = Math.max(a.y + a.h, b.y + b.h)
	const between = boxes.filter(o => o.y < bottom && o.y + o.h > top)
	const right = Math.max(...between.map(o => o.x + o.w)) + 18 + step
	const left = Math.min(...between.map(o => o.x)) - 18 - step
	options.push([
		[a.x + a.w, acy],
		[right, acy],
		[right, bcy],
		[b.x + b.w, bcy],
	])
	options.push([
		[a.x, acy],
		[left, acy],
		[left, bcy],
		[b.x, bcy],
	])
	const pick = options.find(clearOf) || options[0]
	return { d: pathOf(pick), spots: spotsOf(pick), clear: clearOf(pick) }
}

const Node = ({ b, focus }: { b: Box; focus: boolean }) => {
	const { n, x, y, w, h } = b
	const cx = x + w / 2
	const type =
		n.kind === 'person'
			? 'Person'
			: n.kind === 'system'
			? 'Software system'
			: n.kind === 'external'
			? 'External system'
			: n.kind === 'database'
			? n.tech || 'Store'
			: n.tech || 'Container'
	const desc = n.desc ? wrap(n.desc, w - 24) : []
	const top = n.kind === 'person' ? y + 56 : n.kind === 'database' ? y + 48 : y + 26
	return (
		<g className={`c4n c4n--${n.kind}${focus ? ' is-focus' : ''}`}>
			{n.kind === 'database' ? (
				<>
					<path className="c4n__shape" d={`M${x},${y + 12} a${w / 2},12 0 0 0 ${w},0 v${h - 24} a${w / 2},12 0 0 1 ${-w},0 Z`} />
					<ellipse className="c4n__shape" cx={cx} cy={y + 12} rx={w / 2} ry={12} />
				</>
			) : (
				<rect className="c4n__shape" x={x} y={y} width={w} height={h} rx={n.kind === 'person' ? 18 : 10} />
			)}
			{n.kind === 'person' && (
				<g className="c4n__glyph">
					<circle cx={cx} cy={y + 17} r={6.5} />
					<path d={`M${cx - 12},${y + 37} a12,10 0 0 1 24,0`} />
				</g>
			)}
			<text className="c4n__label" x={cx} y={top} textAnchor="middle">
				{n.label}
			</text>
			<text className="c4n__type" x={cx} y={top + 17} textAnchor="middle">
				[{type}]
			</text>
			{desc.map((line, i) => (
				<text key={i} className="c4n__desc" x={cx} y={top + 38 + i * 16} textAnchor="middle">
					{line}
				</text>
			))}
		</g>
	)
}

const View = ({ view, level, title, name }: { view: C4View; level: 'context' | 'containers'; title: string; name: string }) => {
	const drawn = useMemo(() => {
		const { boxes, boundary, height } = layout(view, level)
		const at = new Map(boxes.map(b => [b.n.id, b]))
		const placed: Label[] = []
		const lanes = new Map<string, number>()
		const edges = view.edges
			.map((e: C4Edge, i) => {
				const a = at.get(e.from)
				const b = at.get(e.to)
				if (!a || !b) return null
				const key = `${a.y}`
				const lane = lanes.get(key) || 0
				const r = route(a, b, boxes, lane)
				if (r.d.split('L').length > 2) lanes.set(key, lane + 1)
				let label: Label | null = null
				if (e.label) {
					const { w: tw, h: th } = labelSize(e)
					const free = (c: Label) => !placed.some(p => hit(p, c)) && !boxes.some(o => hit(o, c))
					const tries = r.spots.map(([x, y]) => ({ x: x - tw / 2, y: y - th / 2, w: tw, h: th }))
					// the first free spot, else the one that covers the fewest other labels and boxes
					const cost = (c: Label) => placed.filter(p => hit(p, c)).length * 2 + boxes.filter(o => hit(o, c)).length
					label = tries.find(free) || [...tries].sort((x, y) => cost(x) - cost(y))[0]
					placed.push(label)
				}
				return { e, i, d: r.d, label }
			})
			.filter(Boolean) as { e: C4Edge; i: number; d: string; label: Label | null }[]
		return { boxes, boundary, height, edges }
	}, [view, level])

	const systemName = name
	return (
		<svg className="c4" viewBox={`0 0 ${W} ${drawn.height}`} role="img" aria-label={title}>
			<defs>
				<marker id={`c4-arrow-${level}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
					<path d="M0,1 L9,5 L0,9" className="c4__arrow" />
				</marker>
			</defs>
			{drawn.boundary && (
				<g className="c4b">
					<rect x={drawn.boundary.x} y={drawn.boundary.y} width={drawn.boundary.w} height={drawn.boundary.h} rx={16} />
					<text x={drawn.boundary.x + 16} y={drawn.boundary.y + 22}>
						{systemName} <tspan className="c4b__type">[Software system]</tspan>
					</text>
				</g>
			)}
			{drawn.edges.map(({ i, d }) => (
				<path key={`l${i}`} className="c4e" d={d} markerEnd={`url(#c4-arrow-${level})`} />
			))}
			{drawn.boxes.map(b => (
				<Node key={b.n.id} b={b} focus={b.n.kind === 'system' && level === 'context'} />
			))}
			{drawn.edges.map(({ e, i, label }) =>
				label ? (
					<g key={`t${i}`} className="c4e__label">
						<rect x={label.x} y={label.y} width={label.w} height={label.h} rx={6} />
						<text x={label.x + label.w / 2} y={label.y + 14} textAnchor="middle">
							{e.label}
						</text>
						{e.tech && (
							<text className="c4e__tech" x={label.x + label.w / 2} y={label.y + 28} textAnchor="middle">
								[{e.tech}]
							</text>
						)}
					</g>
				) : null
			)}
		</svg>
	)
}

/** both C4 levels for one piece of work, behind two tabs */
const Diagram = ({ id, context, containers }: { id: string; context?: C4View | null; containers?: C4View | null }) => {
	const levels = [
		context && { key: 'context' as const, label: 'System context', view: context },
		containers && { key: 'containers' as const, label: 'Containers', view: containers },
	].filter(Boolean) as { key: 'context' | 'containers'; label: string; view: C4View }[]
	const [level, setLevel] = useState(levels[0]?.key)
	if (!levels.length) return null
	const shown = levels.find(l => l.key === level) || levels[0]
	const name = context?.nodes.find(n => n.kind === 'system')?.label || containers?.nodes.find(n => n.id === containers.system)?.label || ''
	return (
		<div className="diagram">
			{levels.length > 1 && (
				<div className="seg" role="tablist" aria-label="Diagram level">
					{levels.map(l => (
						<button
							key={l.key}
							type="button"
							role="tab"
							id={`${id}-tab-${l.key}`}
							aria-selected={l.key === shown.key}
							aria-controls={`${id}-panel`}
							className="seg__btn"
							onClick={() => setLevel(l.key)}
						>
							{l.label}
						</button>
					))}
				</div>
			)}
			<div className="diagram__scroll" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${shown.key}`} tabIndex={0}>
				<View key={shown.key} view={shown.view} level={shown.key} title={`${shown.label} diagram`} name={name} />
			</div>
			<p className="diagram__key">
				C4 model. {shown.key === 'context' ? 'Who uses it and what it talks to.' : 'The parts inside it and how they talk.'}
			</p>
		</div>
	)
}

export default Diagram
