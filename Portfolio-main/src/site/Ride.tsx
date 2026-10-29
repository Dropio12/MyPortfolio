import React, { useEffect, useRef, useState } from 'react'
import {
	Fact,
	LineId,
	Project,
	Station,
	featuredProjects,
	lineOrder,
	links,
	moreProjects,
	msc,
	person,
	stations,
} from '../content'
import { IconArrow, IconExternal, IconGitHub, IconLinkedIn, IconMail, IconResume } from '../icons'
import { Bullet, Bullets, Parts, TrackNode, laneIndex } from './parts'
import { loadMotion, prefersReducedMotion } from './motion'

/* ---------- pieces ---------- */

const Facts = ({ facts }: { facts: Fact[] }) =>
	facts.length ? (
		<dl className="facts">
			{facts.map(f => (
				<div className="fact" key={f.figure + f.text}>
					<dt>{f.figure}</dt>
					<dd>{f.text}</dd>
				</div>
			))}
		</dl>
	) : null

const YearMark = ({ year }: { year: string }) => (
	<p className="year">
		<span>{year}</span>
	</p>
)

const stationStyle = (primary: LineId) =>
	({ '--c': `var(--line-${primary})`, '--on-c': `var(--on-${primary})` } as React.CSSProperties)

const StationItem = ({ s }: { s: Station }) => (
	<li
		id={`st-${s.id}`}
		className={`station${s.band ? ` band band--${s.band}` : ''}`}
		data-station=""
		data-lines={s.lines.join(' ')}
		style={stationStyle(s.primary)}
	>
		{s.yearMark && <YearMark year={s.yearMark} />}
		<div className="station__head">
			<h3 className="station__sign">
				<TrackNode lines={s.lines} primary={s.primary} kind={s.kind} main />
				<Bullets ids={s.lines} labelled />
				<span className="station__name">
					{s.name}
					{s.detail && <span className="station__detail"> {s.detail}</span>}
				</span>
			</h3>
			{s.dates && (
				<>
					<span className="station__leader" aria-hidden="true" />
					<p className="station__when">
						<Parts text={s.dates} />
					</p>
				</>
			)}
		</div>
		<p className="station__meta">
			<Parts text={s.role} />
		</p>
		<Facts facts={s.facts} />
		{s.notes && (
			<ul className="station__notes">
				{s.notes.map(n => (
					<li key={n}>{n}</li>
				))}
			</ul>
		)}
		{s.substops && (
			<ol className="substops">
				{s.substops.map(sub => (
					<li className="substop" key={sub.id}>
						<h4 className="substop__name">
							<TrackNode lines={sub.lines} primary="F" />
							{sub.name}
						</h4>
						<p className="substop__summary">{sub.summary}</p>
						<Facts facts={sub.facts} />
					</li>
				))}
			</ol>
		)}
	</li>
)

/* ---------- platform screen: the demo slot ---------- */

const callingAt = (stops: string[]) =>
	stops.length > 1
		? `${stops.slice(0, -1).join(', ')} and ${stops[stops.length - 1]}.`
		: `${stops[0]}.`

const PlatformScreen = ({ p }: { p: Project }) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [src, setSrc] = useState<string | undefined>(undefined)
	const reduced = prefersReducedMotion()

	useEffect(() => {
		const video = videoRef.current
		if (!p.demo || !video || typeof IntersectionObserver === 'undefined') return
		const io = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setSrc(p.demo)
						if (!reduced) video.play().catch(() => undefined)
					} else {
						video.pause()
					}
				})
			},
			{ rootMargin: '200px 0px', threshold: 0.25 }
		)
		io.observe(video)
		return () => io.disconnect()
	}, [p.demo, reduced])

	return (
		<figure className="screen">
			<figcaption className="screen__bar">
				<Bullet id="A" size="sm" />
				<span className="screen__repo">{p.repo}</span>
			</figcaption>
			<div className="screen__display">
				{p.demo ? (
					<video
						ref={videoRef}
						src={src}
						poster={p.poster}
						muted
						loop
						playsInline
						preload="none"
						controls={reduced}
						aria-label={`${p.name} demo video`}
					/>
				) : (
					<div className="screen__board">
						<p className="screen__title" aria-hidden="true">
							{p.name}
						</p>
						<p className="screen__calling">
							<span className="screen__label">Calling at</span>
							<span className="screen__stops">{callingAt(p.stack)}</span>
						</p>
					</div>
				)}
			</div>
		</figure>
	)
}

const ProjectItem = ({ p }: { p: Project }) => (
	<li id={`pr-${p.id}`} className="station project" data-station="" data-lines="A" style={stationStyle('A')}>
		<div className="project__text">
			<div className="station__head">
				<h3 className="station__sign">
					<TrackNode lines={['A']} primary="A" main />
					<Bullets ids={['A']} labelled />
					<span className="station__name">{p.name}</span>
				</h3>
			</div>
			<p className="project__line">{p.line}</p>
			<Facts facts={p.facts} />
			{p.demo && (
				<p className="project__stack">
					<Parts text={p.stack.join(' · ')} />
				</p>
			)}
			<a className="plate-link" href={p.href} target="_blank" rel="noreferrer">
				<IconGitHub className="plate-link__icon" />
				<span>{p.hrefLabel}</span>
				<IconExternal className="plate-link__go" />
			</a>
		</div>
		<PlatformScreen p={p} />
	</li>
)

/* ---------- the track: four lanes drawn by scroll ---------- */

type Lane = { line: LineId; x: number; y1: number; y2: number }
type Geo = { h: number; lanes: Lane[]; stroke: number; casing: number; trainX: number; terminusY: number }
type Stop = { y: number; el: HTMLElement }

const useTrack = (rootRef: React.RefObject<HTMLDivElement>) => {
	const [geo, setGeo] = useState<Geo | null>(null)
	const stops = useRef<Stop[]>([])

	useEffect(() => {
		const root = rootRef.current
		if (!root) return
		let raf = 0
		const measure = () => {
			cancelAnimationFrame(raf)
			raf = requestAnimationFrame(() => {
				const rr = root.getBoundingClientRect()
				const cs = getComputedStyle(root)
				const num = (name: string) => parseFloat(cs.getPropertyValue(name)) || 0
				const lane0 = num('--lane0')
				const gap = num('--lane-gap')
				const ys: { [k: string]: number[] } = {}
				const found: Stop[] = []
				root.querySelectorAll<HTMLElement>('[data-node]').forEach(n => {
					const r = n.getBoundingClientRect()
					const y = Math.round(r.top + r.height / 2 - rr.top)
					;(n.dataset.lines || '').split(' ').forEach(l => {
						if (!ys[l]) ys[l] = []
						ys[l].push(y)
					})
					if (n.hasAttribute('data-main')) {
						const el = n.closest<HTMLElement>('[data-station]')
						if (el) found.push({ y, el })
					}
				})
				stops.current = found.sort((a, b) => a.y - b.y)
				const lanes: Lane[] = lineOrder
					.filter(l => ys[l] && ys[l].length)
					.map(l => ({
						line: l,
						x: lane0 + laneIndex[l] * gap,
						y1: Math.min(...ys[l]),
						y2: Math.max(...ys[l]),
					}))
				const s = lanes.find(l => l.line === 'S')
				setGeo({
					h: Math.round(rr.height),
					lanes,
					stroke: num('--stroke'),
					casing: num('--casing'),
					trainX: lane0 + laneIndex.S * gap,
					terminusY: s ? s.y2 : rr.height,
				})
			})
		}
		measure()
		const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
		if (ro) ro.observe(root)
		window.addEventListener('resize', measure)
		const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts
		if (fonts) fonts.ready.then(measure).catch(() => undefined)
		return () => {
			cancelAnimationFrame(raf)
			if (ro) ro.disconnect()
			window.removeEventListener('resize', measure)
		}
	}, [rootRef])

	return { geo, stops }
}

const Track = ({
	rootRef,
}: {
	rootRef: React.RefObject<HTMLDivElement>
}) => {
	const { geo, stops } = useTrack(rootRef)
	const strokes = useRef<(SVGPathElement | null)[]>([])
	const train = useRef<HTMLDivElement>(null)
	const lit = useRef<HTMLElement | null>(null)
	const [moving, setMoving] = useState(false)

	useEffect(() => {
		const root = rootRef.current
		if (!geo || !root) return
		let dead = false
		let trigger: { kill: () => void } | null = null

		const paint = () => {
			const vh = window.innerHeight
			const top = root.getBoundingClientRect().top + window.scrollY
			const y = window.scrollY
			const max = Math.max(0, document.documentElement.scrollHeight - vh)
			let head = y + vh * 0.62 - top
			// near the bottom of the page, pull the head on so the line reaches the terminus
			const shortfall = geo.terminusY + 4 - (max + vh * 0.62 - top)
			if (shortfall > 0) {
				const t = Math.min(1, Math.max(0, (y - (max - vh)) / vh))
				head += shortfall * t
			}
			geo.lanes.forEach((lane, i) => {
				const path = strokes.current[i]
				if (!path) return
				const len = lane.y2 - lane.y1
				const drawn = Math.min(len, Math.max(0, head - lane.y1))
				path.style.strokeDashoffset = `${len - drawn}`
			})
			const s = geo.lanes.find(l => l.line === 'S')
			if (train.current && s) {
				const ty = Math.min(s.y2, Math.max(s.y1, head))
				train.current.style.transform = `translate3d(0, ${ty}px, 0)`
				train.current.style.opacity = head < s.y1 - 40 ? '0' : '1'
			}
			let current: HTMLElement | null = null
			for (const stop of stops.current) {
				if (stop.y <= head + 1) current = stop.el
				else break
			}
			if (current !== lit.current) {
				if (lit.current) lit.current.classList.remove('is-lit')
				if (current) current.classList.add('is-lit')
				lit.current = current
			}
		}

		loadMotion().then(kit => {
			if (!kit || dead) return
			setMoving(true)
			trigger = kit.ScrollTrigger.create({
				trigger: root,
				start: 'top bottom',
				end: 'max',
				onUpdate: paint,
				onRefresh: paint,
			})
			paint()
		})

		return () => {
			dead = true
			if (trigger) trigger.kill()
		}
	}, [geo, stops, rootRef])

	if (!geo) return null
	return (
		<div className={`track${moving ? ' track--moving' : ''}`} aria-hidden="true">
			<svg className="track__svg" width="100%" height={geo.h}>
				{geo.lanes.map(l => (
					<g key={l.line} className={`lane lane--${l.line}`}>
						<path className="lane__casing" d={`M${l.x} ${l.y1} V${l.y2}`} strokeWidth={geo.casing} />
						<path className="lane__ghost" d={`M${l.x} ${l.y1} V${l.y2}`} strokeWidth={geo.stroke} />
					</g>
				))}
				{geo.lanes.map((l, i) => (
					<path
						key={l.line}
						ref={el => {
							strokes.current[i] = el
						}}
						className={`lane__stroke lane__stroke--${l.line}`}
						d={`M${l.x} ${l.y1} V${l.y2}`}
						strokeWidth={geo.stroke}
						strokeDasharray={`${l.y2 - l.y1} ${l.y2 - l.y1}`}
					/>
				))}
			</svg>
			<div className="train" ref={train} style={{ left: geo.trainX }} />
		</div>
	)
}

/* ---------- the whole line: ride, branch, terminus ---------- */

export const Ride = () => {
	const rootRef = useRef<HTMLDivElement>(null)
	return (
		<div className="line" ref={rootRef}>
			<Track rootRef={rootRef} />

			<section className="ride" id="ride" aria-labelledby="ride-title">
				<header className="section-head">
					<h2 id="ride-title">The ride, 2023 to 2027</h2>
					<p>Stations in time order. Every number sits on the job or the repo it comes from.</p>
				</header>
				<ol className="stations">
					{stations.map(s => (
						<StationItem key={s.id} s={s} />
					))}
				</ol>
			</section>

			<section className="branch band band--A" id="branch" aria-labelledby="branch-title">
				<header className="section-head">
					<h2 id="branch-title">Branch line: projects</h2>
					<p>Built in public alongside the main line, so these stations carry no dates. Each one links to its code.</p>
				</header>
				<ol className="stations projects">
					{featuredProjects.map(p => (
						<ProjectItem key={p.id} p={p} />
					))}
				</ol>
				<div className="more">
					<h3 className="more__title">More stops on this branch</h3>
					<ul className="more__list">
						{moreProjects.map(m => (
							<li key={m.name} className="more__item">
								<TrackNode lines={['A']} primary="A" kind="sub" />
								<a href={m.href} target="_blank" rel="noreferrer">
									<span className="more__name">{m.name}</span>
									<span className="more__line">{m.line}</span>
									<span className="more__stack">{m.stack}</span>
									<span className="more__go">
										{m.hrefLabel}
										<IconExternal />
									</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="ride ride--last" aria-label="Next station">
				<ol className="stations">
					<StationItem s={msc} />
				</ol>
			</section>

			<section className="terminus band band--S" id="terminus" data-station="" aria-labelledby="terminus-title">
				<div className="station__head terminus__head">
					<h2 id="terminus-title" className="terminus__title">
						<TrackNode lines={['S']} primary="S" kind="terminus" main />
						End of the line
					</h2>
				</div>
				<p className="terminus__lede">
					{person.availability.join('. ')}. Looking for a {person.targets.toLowerCase()} role.
				</p>
				<ul className="exits">
					<li>
						<a className="exit exit--primary" href={links.resume} target="_blank" rel="noreferrer">
							<IconResume className="exit__icon" />
							<span className="exit__label">Resume</span>
							<span className="exit__sub">PDF, opens in a new tab</span>
							<IconArrow className="exit__go" />
						</a>
					</li>
					<li>
						<a className="exit" href={links.email}>
							<IconMail className="exit__icon" />
							<span className="exit__label">Email</span>
							<span className="exit__sub">
								{person.email.split('@')[0]}@<wbr />
								{person.email.split('@')[1]}
							</span>
							<IconArrow className="exit__go" />
						</a>
					</li>
					<li>
						<a className="exit" href={links.github} target="_blank" rel="noreferrer">
							<IconGitHub className="exit__icon" />
							<span className="exit__label">GitHub</span>
							<span className="exit__sub">{links.githubLabel}</span>
							<IconArrow className="exit__go" />
						</a>
					</li>
					<li>
						<a className="exit" href={links.linkedin} target="_blank" rel="noreferrer">
							<IconLinkedIn className="exit__icon" />
							<span className="exit__label">LinkedIn</span>
							<span className="exit__sub">{links.linkedinLabel}</span>
							<IconArrow className="exit__go" />
						</a>
					</li>
				</ul>
			</section>
		</div>
	)
}
