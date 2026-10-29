import React, { useEffect, useRef } from 'react'
import { links } from '../content'
import { IconLeft, IconRight } from '../icons'
import { GAP, stopX } from '../world/geo'
import { smooth } from '../world/gfx'
import { RideStop, getWorld, rideStops, shopShot, stopIndex } from './ride'
import { isPhoneLayout, prefersReducedMotion, scrollToY } from './motion'

/* ---------- where each stop sits on the scroll ---------- */

type Span = { a: number; b: number }

const readArea = () => {
	const stage = document.querySelector<HTMLElement>('[data-stage]')
	const hud = document.querySelector<HTMLElement>('[data-hud]')
	const top = isPhoneLayout() && stage ? stage.getBoundingClientRect().height : hud ? hud.offsetHeight : 64
	return { top, h: window.innerHeight - top }
}

/** The scroll range over which the train waits at each stop: from the panel's arrival to its last lines. */
export const measureSpans = (): Span[] => {
	const area = readArea()
	const y = window.scrollY
	return Array.from(document.querySelectorAll<HTMLElement>('[data-stop]')).map(el => {
		const r = el.getBoundingClientRect()
		const a = r.top + y - (area.top + 0.58 * area.h)
		const b = Math.max(a, r.bottom + y - (area.top + 0.74 * area.h))
		return { a, b }
	})
}

export const rideTarget = (index: number) => {
	const spans = measureSpans()
	const s = spans[index]
	if (!s) return 0
	const footer = document.querySelector<HTMLElement>('.footer')
	const max = document.documentElement.scrollHeight - window.innerHeight - (footer ? footer.offsetHeight : 0)
	return Math.min(max, (s.a + s.b) / 2)
}

const cameraFor = (y: number, spans: Span[]) => {
	if (!spans.length || y <= spans[0].b) return { x: 0, index: 0, at: true }
	for (let i = 0; i < spans.length - 1; i++) {
		const next = spans[i + 1]
		if (y < next.a) {
			if (y <= spans[i].b) return { x: stopX(i), index: i, at: true }
			const u = (y - spans[i].b) / Math.max(1, next.a - spans[i].b)
			return { x: stopX(i) + smooth(u) * GAP, index: i, at: false }
		}
	}
	const last = spans.length - 1
	return { x: stopX(last), index: last, at: true }
}

/* ---------- the stage: the canvas, pinned, and the route bar ---------- */

export const Stage = ({
	current,
	onCurrent,
	onJump,
}: {
	current: { index: number; at: boolean }
	onCurrent: (c: { index: number; at: boolean }) => void
	onJump: (index: number, focus: boolean) => void
}) => {
	const stageRef = useRef<HTMLDivElement>(null)
	const viewRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const trainRef = useRef<HTMLSpanElement>(null)
	const last = useRef({ index: -1, at: true })

	useEffect(() => {
		const view = viewRef.current
		const canvas = canvasRef.current
		if (!view || !canvas) return
		const world = getWorld()
		const reduced = prefersReducedMotion()
		world.still = reduced
		world.attach(canvas)
		const lastX = stopX(rideStops.length - 1)
		world.onFrame = camX => {
			if (trainRef.current) trainRef.current.style.left = `${(camX / lastX) * 100}%`
		}
		let spans: Span[] = []
		const shotAt = stopIndex('shopify-visual-search')

		const update = () => {
			const c = cameraFor(window.scrollY, spans)
			world.setTarget(c.x)
			if (c.index >= shotAt - 2) world.loadBillboard(shopShot)
			if (c.index !== last.current.index || c.at !== last.current.at) {
				last.current = { index: c.index, at: c.at }
				onCurrent(last.current)
			}
		}
		const size = () => {
			const r = view.getBoundingClientRect()
			const phone = isPhoneLayout()
			const panel = document.querySelector<HTMLElement>('.hero__card')
			const cover = phone || !panel ? 0 : panel.getBoundingClientRect().right + 8
			world.resize(r.width, r.height, cover, phone ? 240 : 330)
		}
		const remeasure = () => {
			spans = measureSpans()
			update()
		}
		size()
		remeasure()
		world.jumpTo(cameraFor(window.scrollY, spans).x)

		const onScroll = () => update()
		const onResize = () => {
			size()
			remeasure()
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		window.addEventListener('resize', onResize)
		const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null
		const content = document.querySelector('[data-ride-content]')
		if (ro && content) ro.observe(content)
		const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts
		if (fonts) fonts.ready.then(remeasure).catch(() => undefined)
		const onVis = () => {
			if (document.hidden) world.stop()
			else world.wake()
		}
		document.addEventListener('visibilitychange', onVis)
		// load the billboard once the page has settled, even before the train gets there
		const idle = window.setTimeout(() => world.loadBillboard(shopShot), 2500)
		world.wake()
		return () => {
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', onResize)
			document.removeEventListener('visibilitychange', onVis)
			if (ro) ro.disconnect()
			window.clearTimeout(idle)
			world.stop()
			world.onFrame = null
		}
	}, [onCurrent])

	// station signs on the canvas are buttons for the mouse; the route bar is the keyboard way in
	const toInternal = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const c = e.currentTarget
		const r = c.getBoundingClientRect()
		return [((e.clientX - r.left) / r.width) * c.width, ((e.clientY - r.top) / r.height) * c.height]
	}
	const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const [x, y] = toInternal(e)
		const action = getWorld().hitAt(x, y)
		if (!action) return
		if (action.startsWith('stop:')) onJump(Number(action.slice(5)), false)
		else if (action === 'resume') window.open(links.resume, '_blank', 'noopener')
		else if (action === 'email') window.location.href = links.email
		else if (action === 'github') window.open(links.github, '_blank', 'noopener')
		else if (action === 'linkedin') window.open(links.linkedin, '_blank', 'noopener')
	}
	const onCanvasMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const [x, y] = toInternal(e)
		e.currentTarget.style.cursor = getWorld().hitAt(x, y) ? 'pointer' : ''
	}

	const here = rideStops[current.index]
	const next = rideStops[Math.min(rideStops.length - 1, current.index + 1)]
	const label = current.at ? here : next

	return (
		<div className="stage" ref={stageRef} data-stage="">
			<div className="stage__view" ref={viewRef}>
				<canvas
					ref={canvasRef}
					className="stage__canvas"
					aria-hidden="true"
					onClick={onCanvasClick}
					onMouseMove={onCanvasMove}
				/>
			</div>
			<nav className="route" aria-label="Stations">
				<button
					type="button"
					className="route__step"
					onClick={() => onJump(Math.max(0, current.index - (current.at ? 1 : 0)), false)}
					disabled={current.index === 0 && current.at}
					aria-label="Previous station"
				>
					<IconLeft />
				</button>
				<div className="route__main">
					<p className="route__now">
						<span className="route__state">{current.at ? 'Now' : 'Next'}</span>
						<span className="route__name">{routeName(label)}</span>
					</p>
					<ol className="route__line">
						{rideStops.map((s, i) => (
							<li key={s.id} style={{ left: `${(i / (rideStops.length - 1)) * 100}%` }}>
								<button
									type="button"
									className={`route__stop route__stop--${s.primary}${i === current.index && current.at ? ' is-here' : ''}`}
									aria-label={`Go to ${routeName(s)}`}
									aria-current={i === current.index && current.at ? 'location' : undefined}
									onClick={() => onJump(i, true)}
								/>
							</li>
						))}
					</ol>
					<span className="route__train" ref={trainRef} aria-hidden="true" />
				</div>
				<button
					type="button"
					className="route__step"
					onClick={() => onJump(Math.min(rideStops.length - 1, current.index + 1), false)}
					disabled={current.index === rideStops.length - 1}
					aria-label="Next station"
				>
					<IconRight />
				</button>
			</nav>
		</div>
	)
}

export const routeName = (s: RideStop) => (s.detail ? `${s.title} ${s.detail}` : s.title)

export const scrollToStop = (index: number) => scrollToY(rideTarget(index))
