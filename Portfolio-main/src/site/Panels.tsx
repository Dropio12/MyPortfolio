import React, { useEffect, useRef, useState } from 'react'
import { Fact, LineId, Project, links, person } from '../content'
import { IconDown, IconExternal, IconGitHub, IconLinkedIn, IconList, IconMail, IconResume } from '../icons'
import { Bullets, Parts } from './parts'
import { RideStop, domId, getWorld, shopShot, stopIndex } from './ride'
import { Mode } from './Chrome'
import { prefersReducedMotion } from './motion'

const lineStyle = (id: LineId) => ({ '--c': `var(--line-${id})`, '--on-c': `var(--on-${id})` } as React.CSSProperties)

/* ---------- the opening card ---------- */

const HEADLINE: { figure: string; text: string; source: string; to: string }[] = [
	{ figure: '20M+', text: 'Shop App users reached by the photo search he co-created', source: 'Shopify', to: 'shopify-visual-search' },
	{ figure: '10x', text: 'lower internal request latency, moving services to gRPC', source: 'Shopify', to: 'shopify-security' },
	{ figure: '10+', text: 'law firms use the document workflow he built', source: 'Client work', to: 'law' },
	{ figure: '8', text: 'hackathon wins: Stanford (2x), NASA, Waterloo, Shopify', source: 'Recognition', to: 'recognition' },
]

export const HeroCard = ({
	mode,
	onMode,
	onJump,
}: {
	mode: Mode
	onMode: (m: Mode) => void
	onJump: (index: number, focus: boolean) => void
}) => (
	<section className="hero" aria-labelledby="hero-name">
		<div className="box hero__card">
			<h1 id="hero-name" className="hero__name">
				<span>Anass Badreddine</span> <span>El Hallaoui</span>
			</h1>
			<p className="hero__role">{person.role}</p>
			<p className="hero__meta">
				<Parts text={`New-grad software engineer or forward deployed engineer · ${person.availability.join(' · ')}`} />
			</p>
			<ol className="board board--hero" aria-label="Four numbers, each from the station it was earned at">
				{HEADLINE.map(h => (
					<li key={h.figure}>
						<a
							className="board__row"
							href={`#stop-${h.to}`}
							onClick={e => {
								e.preventDefault()
								onJump(stopIndex(h.to), true)
							}}
						>
							<span className="board__figure">{h.figure}</span>
							<span className="board__text">
								{h.text.split('co-created').map((part, i) =>
									i === 0 ? part : (
										<React.Fragment key={part}>
											<span className="nowrap">co-created</span>
											{part}
										</React.Fragment>
									)
								)}{' '}
								<span className="board__source">{h.source}</span>
							</span>
						</a>
					</li>
				))}
			</ol>
			<div className="hero__actions">
				<a className="pbtn pbtn--primary" href={links.resume} target="_blank" rel="noreferrer">
					<IconResume className="pbtn__icon" />
					<span>Resume</span>
				</a>
				<a className="pbtn" href={links.email}>
					<IconMail className="pbtn__icon" />
					<span>Email</span>
				</a>
				<a className="pbtn" href={links.github} target="_blank" rel="noreferrer">
					<IconGitHub className="pbtn__icon" />
					<span>GitHub</span>
				</a>
				<a className="pbtn" href={links.linkedin} target="_blank" rel="noreferrer">
					<IconLinkedIn className="pbtn__icon" />
					<span>LinkedIn</span>
				</a>
			</div>
			<div className="hero__ride">
				{mode === 'ride' ? (
					<p className="hero__cue">
						<IconDown className="hero__cue-icon" />
						Scroll to ride
					</p>
				) : (
					<p className="hero__cue">Every stop below is a job, a client deployment or a project.</p>
				)}
				{mode === 'ride' && (
					<button type="button" className="textbtn" onClick={() => onMode('list')}>
						<IconList className="textbtn__icon" />
						Skip the ride
					</button>
				)}
			</div>
		</div>
	</section>
)

/* ---------- pieces of a stop ---------- */

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

const callingAt = (stops: string[]) =>
	stops.length > 1 ? `${stops.slice(0, -1).join(', ')} and ${stops[stops.length - 1]}` : stops[0]

/** The demo slot: a departure board until a video exists, then the video. */
const DemoSlot = ({ p }: { p: Project }) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [src, setSrc] = useState<string | undefined>(undefined)
	const reduced = prefersReducedMotion()

	useEffect(() => {
		const video = videoRef.current
		if (!p.demo || !video || typeof IntersectionObserver === 'undefined') return
		const io = new IntersectionObserver(
			entries =>
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setSrc(p.demo)
						if (!reduced) video.play().catch(() => undefined)
					} else video.pause()
				}),
			{ rootMargin: '200px 0px', threshold: 0.25 }
		)
		io.observe(video)
		return () => io.disconnect()
	}, [p.demo, reduced])

	if (p.demo)
		return (
			<figure className="screen">
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
				<figcaption className="screen__caption">{p.stack.join(', ')}</figcaption>
			</figure>
		)
	return (
		<div className="board board--depart">
			<p className="board__dest" aria-hidden="true">
				{p.name}
			</p>
			<p className="board__calling">
				<span className="board__label">Calling at</span> {callingAt(p.stack)}
			</p>
		</div>
	)
}

const ShopShot = () => (
	<figure className="shot">
		<img
			src={shopShot}
			width={1600}
			height={1000}
			loading="lazy"
			decoding="async"
			alt="The shop.com home page. A star marks the camera button at the right end of its search bar."
		/>
		<figcaption>
			shop.com today: the image button in the search bar (starred) opens Shop’s photo search, the feature he
			co-created. Captured October 2026.
		</figcaption>
	</figure>
)

/** The still of a stop's scene, drawn once when it comes near the screen. */
export const Still = ({ index, label }: { index: number; label: string }) => {
	const ref = useRef<HTMLCanvasElement>(null)
	useEffect(() => {
		const canvas = ref.current
		if (!canvas) return
		const world = getWorld()
		const paint = () => world.drawStill(canvas, index)
		if (rideStopsNeedShot(index)) world.loadBillboard(shopShot, paint)
		if (typeof IntersectionObserver === 'undefined') {
			paint()
			return
		}
		const io = new IntersectionObserver(
			entries => {
				if (entries.some(e => e.isIntersecting)) {
					paint()
					io.disconnect()
				}
			},
			{ rootMargin: '400px 0px' }
		)
		io.observe(canvas)
		return () => io.disconnect()
	}, [index])
	return (
		<div className="still" aria-hidden="true">
			<canvas ref={ref} className="still__canvas" width={300} height={170} data-label={label} />
		</div>
	)
}

const SHOT_INDEX = stopIndex('shopify-visual-search')
const rideStopsNeedShot = (index: number) => index === SHOT_INDEX

/* ---------- a stop's panel ---------- */

export const StopPanel = ({ s, index, count }: { s: RideStop; index: number; count: number }) => {
	const p = s.project
	return (
		<article className="box panel" style={lineStyle(s.primary)} aria-labelledby={`${domId(s)}-title`} data-stop={index}>
			<header className="plate">
				<Bullets ids={s.lines} labelled />
				<h3 id={`${domId(s)}-title`} className="plate__name" tabIndex={-1}>
					{s.title}
					{s.detail && <span className="plate__detail"> {s.detail}</span>}
				</h3>
				{s.dates && (
					<p className="plate__when">
						<Parts text={s.dates} />
					</p>
				)}
			</header>
			<div className="panel__body">
				{s.role && (
					<p className="panel__role">
						<Parts text={s.role} />
					</p>
				)}
				{s.summary && <p className="panel__summary">{s.summary}</p>}
				<Facts facts={s.facts} />
				{s.notes && (
					<ul className="notes">
						{s.notes.map(n => (
							<li key={n}>{n}</li>
						))}
					</ul>
				)}
				{s.media === 'shop' && <ShopShot />}
				{s.more && (
					<ul className="more">
						{s.more.map(m => (
							<li key={m.name}>
								<a className="more__item" href={m.href} target="_blank" rel="noreferrer">
									<span className="more__name">{m.name}</span>
									<span className="more__line">{m.line}</span>
									<span className="more__meta">
										<span>{m.stack}</span>
										<span className="more__go">
											{m.hrefLabel}
											<IconExternal className="more__icon" />
										</span>
									</span>
								</a>
							</li>
						))}
					</ul>
				)}
				{p && (
					<>
						<DemoSlot p={p} />
						<a className="pbtn pbtn--link" href={p.href} target="_blank" rel="noreferrer">
							{p.linkKind === 'code' ? <IconGitHub className="pbtn__icon" /> : <IconExternal className="pbtn__icon" />}
							<span>{p.linkKind === 'code' ? 'Code on GitHub' : 'Visit trycherryblossom.com'}</span>
							<span className="sr-only">: {p.hrefLabel}</span>
						</a>
					</>
				)}
				<p className="panel__count" aria-hidden="true">
					Stop {index + 1} of {count}
				</p>
			</div>
		</article>
	)
}

/* ---------- the terminus ---------- */

export const TerminusPanel = ({ s, index }: { s: RideStop; index: number }) => (
	<section className="box panel panel--terminus" style={lineStyle('S')} aria-labelledby="terminus-title" data-stop={index}>
		<header className="plate">
			<Bullets ids={['S']} labelled />
			<h2 id="terminus-title" className="plate__name" tabIndex={-1}>
				{s.title}
			</h2>
		</header>
		<div className="panel__body">
			<p className="panel__summary">
				{person.availability.join('. ')}. Looking for a new-grad software engineer or forward deployed engineer
				role.
			</p>
			<ul className="exits">
				<li>
					<a className="exit exit--primary" href={links.resume} target="_blank" rel="noreferrer">
						<IconResume className="exit__icon" />
						<span className="exit__label">Resume</span>
						<span className="exit__sub">PDF, opens in a new tab</span>
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
					</a>
				</li>
				<li>
					<a className="exit" href={links.github} target="_blank" rel="noreferrer">
						<IconGitHub className="exit__icon" />
						<span className="exit__label">GitHub</span>
						<span className="exit__sub">{links.githubLabel}</span>
					</a>
				</li>
				<li>
					<a className="exit" href={links.linkedin} target="_blank" rel="noreferrer">
						<IconLinkedIn className="exit__icon" />
						<span className="exit__label">LinkedIn</span>
						<span className="exit__sub">{links.linkedinLabel}</span>
					</a>
				</li>
			</ul>
		</div>
	</section>
)
