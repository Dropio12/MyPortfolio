import React from 'react'
import { LineId, lineOrder, lines, person } from '../content'
import { Bullet, Bullets } from './parts'
import { goTo } from './motion'

type Focus = LineId | null

/* ---------- the big station sign ---------- */

const StationSign = () => (
	<div className="sign">
		<div className="sign__plate">
			<Bullets ids={lineOrder} size="lg" />
			<h1 className="sign__name">
				{person.nameLines.map(l => (
					<span key={l}>{l}</span>
				))}
			</h1>
			<p className="sign__role">{person.role}</p>
			<ul className="sign__meta">
				<li>{person.targets}</li>
				{person.availability.map(a => (
					<li key={a}>{a}</li>
				))}
			</ul>
		</div>
		<div className="sign__stripe" aria-hidden="true" />
	</div>
)

/* ---------- legend: also the line filter ---------- */

export const Legend = ({ focus, onFocus }: { focus: Focus; onFocus: (f: Focus) => void }) => (
	<section className="legend" aria-labelledby="legend-title">
		<h2 id="legend-title" className="legend__title">
			Lines
		</h2>
		<ul className="legend__list">
			{lineOrder.map(id => {
				const on = focus === id
				return (
					<li key={id}>
						<button
							type="button"
							className={`legend__item legend__item--${id}`}
							aria-pressed={on}
							onClick={() => onFocus(on ? null : id)}
						>
							<span className="legend__swatch" aria-hidden="true">
								<Bullet id={id} />
							</span>
							<span className="legend__text">
								<span className="legend__name">
									{lines[id].name.replace(/ line$/, '')}
									<span className="legend__suffix"> line</span>
								</span>
								<span className="legend__carries">{lines[id].carries}</span>
							</span>
						</button>
					</li>
				)
			})}
		</ul>
		<p className="legend__hint" aria-live="polite">
			{focus ? (
				<>
					Lit: the {lines[focus].name}.{' '}
					<button type="button" className="legend__clear" onClick={() => onFocus(null)}>
						Show every line
					</button>
				</>
			) : (
				'Select a line to light its stations.'
			)}
		</p>
	</section>
)

/* ---------- the network map, on a true 2023 to 2027 time scale ---------- */

// x = 60 + (year - 2023) * 240, so May 2025 (2025.33) sits at x 620.
const years = [2023, 2024, 2025, 2026, 2027]
const yearX = (y: number) => 60 + (y - 2023) * 240

const tracks: { line: LineId; d: string }[] = [
	{ line: 'R', d: 'M60 70 H456 L604 218 H636' },
	{ line: 'F', d: 'M680 90 H780 L844 154 H950' },
	{ line: 'A', d: 'M320 170 H520 L584 234 H656 L720 170 H1080' },
	{ line: 'A', d: 'M980 170 L1020 130 H1110' },
	{ line: 'S', d: 'M60 250 H1120' },
]

type MapLabel = { x: number; y: number; anchor: 'start' | 'middle' | 'end'; name: string; figure?: string; rest?: string }
type MapStation = {
	id: string
	target: string
	lines: LineId[]
	aria: string
	marker:
		| { type: 'tick'; x: number; y: number; dir: 'up' | 'down' }
		| { type: 'capsule'; x: number; y1: number; y2: number }
		| { type: 'circle'; x: number; y: number }
		| { type: 'bar'; x: number; y: number }
		| { type: 'pair'; x: number; y1: number; y2: number }
	label: MapLabel
	hit: [number, number, number, number]
}

const mapStations: MapStation[] = [
	{
		id: 'laval',
		target: 'st-laval',
		lines: ['S', 'R'],
		aria: 'Université Laval, origin',
		marker: { type: 'pair', x: 60, y1: 70, y2: 250 },
		label: { x: 80, y: 150, anchor: 'start', name: 'Université Laval', rest: 'Origin' },
		hit: [40, 54, 180, 212],
	},
	{
		id: 'ia',
		target: 'st-ia',
		lines: ['S'],
		aria: 'iA Financial Group, 2023: 87% faster payroll',
		marker: { type: 'tick', x: 140, y: 250, dir: 'down' },
		label: { x: 132, y: 290, anchor: 'start', name: 'iA Financial Group', figure: '87%', rest: ' faster payroll' },
		hit: [124, 238, 170, 82],
	},
	{
		id: 'recognition',
		target: 'st-recognition',
		lines: ['R'],
		aria: 'Recognition: 8 hackathon wins',
		marker: { type: 'tick', x: 380, y: 70, dir: 'up' },
		label: { x: 380, y: 44, anchor: 'middle', name: '', figure: '8', rest: ' hackathon wins' },
		hit: [300, 24, 160, 56],
	},
	{
		id: 'ambassador',
		target: 'st-ambassador',
		lines: ['A'],
		aria: 'Intel and Adobe ambassador, 2024: 1,500+ students taught',
		marker: { type: 'circle', x: 320, y: 170 },
		label: { x: 300, y: 128, anchor: 'start', name: 'Intel + Adobe', figure: '1,500+', rest: ' students taught' },
		hit: [292, 108, 190, 76],
	},
	{
		id: 'shopify-security',
		target: 'st-shopify-security',
		lines: ['S'],
		aria: 'Shopify Infrastructure Security, January 2025: 10x lower latency',
		marker: { type: 'tick', x: 540, y: 250, dir: 'down' },
		label: { x: 548, y: 290, anchor: 'end', name: 'Shopify Infra Security', figure: '10x', rest: ' lower latency' },
		hit: [380, 238, 172, 82],
	},
	{
		id: 'shopify-visual-search',
		target: 'st-shopify-visual-search',
		lines: ['S', 'A', 'R'],
		aria: 'Shopify Visual Search, May 2025, interchange: 20M+ users',
		marker: { type: 'capsule', x: 620, y1: 218, y2: 250 },
		label: { x: 606, y: 290, anchor: 'start', name: 'Shopify Visual Search', figure: '20M+', rest: ' users' },
		hit: [600, 204, 196, 116],
	},
	{
		id: 'clients',
		target: 'st-clients',
		lines: ['F', 'A'],
		aria: 'Client deployments, 2025 to 2026: 10+ law firms',
		marker: { type: 'capsule', x: 900, y1: 154, y2: 170 },
		label: { x: 856, y: 110, anchor: 'start', name: 'Client deployments', figure: '10+', rest: ' law firms' },
		hit: [848, 92, 152, 92],
	},
	{
		id: 'scale',
		target: 'st-scale',
		lines: ['S'],
		aria: 'Scale AI, February 2026: 200+ coding tasks',
		marker: { type: 'tick', x: 800, y: 250, dir: 'up' },
		label: { x: 792, y: 204, anchor: 'start', name: 'Scale AI', figure: '200+', rest: ' coding tasks' },
		hit: [784, 186, 148, 70],
	},
	{
		id: 'branch',
		target: 'branch',
		lines: ['A'],
		aria: 'Projects branch line: AgentGym, Linea and more',
		marker: { type: 'bar', x: 1110, y: 130 },
		label: { x: 1036, y: 82, anchor: 'start', name: 'Projects', rest: 'AgentGym, Linea and more' },
		hit: [1028, 64, 170, 58],
	},
	{
		id: 'msc',
		target: 'st-msc',
		lines: ['A'],
		aria: 'M.Sc. Machine Learning, expected April 2027',
		marker: { type: 'circle', x: 1080, y: 170 },
		label: { x: 1094, y: 202, anchor: 'end', name: 'M.Sc. ML', rest: 'April 2027' },
		hit: [1010, 160, 92, 70],
	},
	{
		id: 'terminus',
		target: 'terminus',
		lines: ['S'],
		aria: 'Terminus: full-time from Summer 2027, contact',
		marker: { type: 'bar', x: 1120, y: 250 },
		label: { x: 1136, y: 290, anchor: 'end', name: 'Full-time', rest: 'Summer 2027' },
		hit: [1040, 236, 110, 82],
	},
]

const Marker = ({ m }: { m: MapStation['marker'] }) => {
	switch (m.type) {
		case 'tick':
			return (
				<line
					className="map__tick"
					x1={m.x}
					x2={m.x}
					y1={m.y}
					y2={m.dir === 'down' ? m.y + 15 : m.y - 15}
				/>
			)
		case 'capsule':
			return (
				<rect
					className="map__capsule"
					x={m.x - 11}
					y={m.y1 - 11}
					width={22}
					height={m.y2 - m.y1 + 22}
					rx={11}
				/>
			)
		case 'circle':
			return <circle className="map__capsule" cx={m.x} cy={m.y} r={10} />
		case 'bar':
			return <rect className="map__bar" x={m.x - 3} y={m.y - 13} width={6} height={26} rx={1} />
		case 'pair':
			return (
				<g>
					<line className="map__connector" x1={m.x} x2={m.x} y1={m.y1} y2={m.y2} />
					<circle className="map__capsule" cx={m.x} cy={m.y1} r={10} />
					<circle className="map__capsule" cx={m.x} cy={m.y2} r={10} />
				</g>
			)
	}
}

const onJump = (target: string) => (e: React.MouseEvent) => {
	e.preventDefault()
	goTo(target)
}

const NetworkMap = () => (
	<figure className="map" aria-labelledby="map-caption">
		<svg className="map__svg" viewBox="0 14 1200 344" role="group" aria-labelledby="map-caption">
			<g className="map__graticule" aria-hidden="true">
				{years.map(y => (
					<g key={y}>
						<line x1={yearX(y)} x2={yearX(y)} y1={18} y2={322} />
						<text x={yearX(y)} y={350} textAnchor="middle">
							{y}
						</text>
					</g>
				))}
				{Array.from({ length: 19 }, (_, i) => 60 + i * 60).map(x => (
					<line key={x} className="map__quarter" x1={x} x2={x} y1={322} y2={x % 240 === 60 ? 332 : 328} />
				))}
				<line className="map__axis" x1={60} x2={1140} y1={322} y2={322} />
			</g>
			<g className="map__tracks" aria-hidden="true">
				{tracks.map((t, i) => (
					<g key={i} className={`map__line map__line--${t.line}`} style={{ '--i': i } as React.CSSProperties}>
						<path className="map__casing" d={t.d} pathLength={1} />
						<path className="map__stroke" d={t.d} pathLength={1} />
					</g>
				))}
				<rect className="map__bar" x={677} y={77} width={6} height={26} rx={1} />
			</g>
			{mapStations.map(s => (
				<a
					key={s.id}
					href={`#${s.target}`}
					className="map__station"
					data-lines={s.lines.join(' ')}
					aria-label={s.aria}
					onClick={onJump(s.target)}
				>
					<rect className="map__hit" x={s.hit[0]} y={s.hit[1]} width={s.hit[2]} height={s.hit[3]} rx={8} />
					<Marker m={s.marker} />
					<text className="map__label" x={s.label.x} y={s.label.y} textAnchor={s.label.anchor} aria-hidden="true">
						{s.label.name && <tspan className="map__name">{s.label.name}</tspan>}
						{(s.label.figure || s.label.rest) && (
							<tspan x={s.label.x} dy={s.label.name ? 21 : 0}>
								{s.label.figure && <tspan className="map__figure">{s.label.figure}</tspan>}
								{s.label.rest && <tspan className="map__rest">{s.label.rest}</tspan>}
							</tspan>
						)}
					</text>
				</a>
			))}
		</svg>
		<figcaption id="map-caption" className="map__caption">
			Network map, 2023 to 2027. Dated stations sit at their start date. Select a station to ride to it.
		</figcaption>
	</figure>
)

/* ---------- phone: the in-car strip map ---------- */

const strip: { target: string; when: string; name: string; figure: string; lines: LineId[]; primary: LineId; kind?: 'end' }[] = [
	{ target: 'st-laval', when: '', name: 'Université Laval', figure: 'Origin', lines: ['S', 'R'], primary: 'S' },
	{ target: 'st-ia', when: '2023', name: 'iA Financial Group', figure: '87% faster payroll', lines: ['S'], primary: 'S' },
	{ target: 'st-recognition', when: '', name: 'Recognition', figure: '8 hackathon wins', lines: ['R'], primary: 'R' },
	{ target: 'st-ambassador', when: '2024', name: 'Intel + Adobe', figure: '1,500+ students taught', lines: ['A'], primary: 'A' },
	{ target: 'st-shopify-security', when: '2025', name: 'Shopify Infra Security', figure: '10x lower latency', lines: ['S'], primary: 'S' },
	{ target: 'st-shopify-visual-search', when: '2025', name: 'Shopify Visual Search', figure: '20M+ users', lines: ['S', 'A', 'R'], primary: 'A' },
	{ target: 'st-clients', when: '2025', name: 'Client deployments', figure: '10+ law firms', lines: ['F', 'A'], primary: 'F' },
	{ target: 'st-scale', when: '2026', name: 'Scale AI', figure: '200+ coding tasks', lines: ['S'], primary: 'S' },
	{ target: 'branch', when: '', name: 'Projects branch', figure: 'AgentGym, Linea and more', lines: ['A'], primary: 'A' },
	{ target: 'st-msc', when: '2027', name: 'M.Sc. Machine Learning', figure: 'April 2027', lines: ['A'], primary: 'A' },
	{ target: 'terminus', when: '2027', name: 'Full-time', figure: 'Summer 2027', lines: ['S'], primary: 'S', kind: 'end' },
]

const StripMap = () => (
	<nav className="strip" aria-label="Stations">
		<ol className="strip__list">
			{strip.map(s => (
				<li
					key={s.target}
					className={`strip__stop strip__stop--${s.primary}${s.lines.length > 1 ? ' strip__stop--x' : ''}${
						s.kind ? ' strip__stop--end' : ''
					}`}
					data-lines={s.lines.join(' ')}
				>
					<a href={`#${s.target}`} onClick={onJump(s.target)}>
						<span className="strip__when">{s.when}</span>
						<span className="strip__node" aria-hidden="true" />
						<span className="strip__text">
							<span className="strip__name">{s.name}</span>
							<span className="strip__figure">{s.figure}</span>
						</span>
					</a>
				</li>
			))}
		</ol>
	</nav>
)

export const Hero = ({ focus, onFocus }: { focus: Focus; onFocus: (f: Focus) => void }) => (
	<section className="hero" aria-label="Introduction">
		<div className="hero__top">
			<StationSign />
			<Legend focus={focus} onFocus={onFocus} />
		</div>
		<NetworkMap />
		<StripMap />
	</section>
)
