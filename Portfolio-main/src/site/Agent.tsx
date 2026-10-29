import React, { RefObject, useEffect, useRef, useState } from 'react'
import type { OrbHandle } from '../scene/orb'

// The orb behind the prompt bar. On open, its aura blooms in from white and a still of the orb
// condenses into place (CSS, so it never waits for a download). three.js loads in its own chunk
// once the page is idle, and the live orb takes over from the still after the entrance.
// Reduced motion and browsers without WebGL keep the still and never download three.js.

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const webglAvailable = () => {
	try {
		const c = document.createElement('canvas')
		return !!(c.getContext('webgl2') || c.getContext('webgl'))
	} catch {
		return false
	}
}

/** the live orb waits until the entrance has played */
const ENTRANCE_MS = 1300

const Agent = ({ hero }: { hero: RefObject<HTMLElement> }) => {
	const canvas = useRef<HTMLCanvasElement>(null)
	const handle = useRef<OrbHandle | null>(null)
	const [live, setLive] = useState(false)
	const [still] = useState(() => reducedMotion() || !webglAvailable())

	useEffect(() => {
		if (still) return
		let cancelled = false
		const born = performance.now()
		let reveal = 0
		const start = () => {
			import('../scene/orb')
				.then(m => {
					if (cancelled || !canvas.current || !hero.current) return
					handle.current = m.createOrb(canvas.current, {
						hero: hero.current,
						onReady: () => {
							reveal = window.setTimeout(() => !cancelled && setLive(true), Math.max(0, ENTRANCE_MS - (performance.now() - born)))
						},
					})
				})
				.catch(() => undefined)
		}
		const w = window as Window & {
			requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
			cancelIdleCallback?: (id: number) => void
		}
		let idle = 0
		let timer = 0
		const schedule = () => {
			if (w.requestIdleCallback) idle = w.requestIdleCallback(start, { timeout: 900 })
			else timer = window.setTimeout(start, 200)
		}
		if (document.readyState === 'complete') schedule()
		else window.addEventListener('load', schedule, { once: true })
		return () => {
			cancelled = true
			window.removeEventListener('load', schedule)
			if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle)
			window.clearTimeout(timer)
			window.clearTimeout(reveal)
			handle.current?.dispose()
			handle.current = null
		}
	}, [still, hero])

	return (
		<div className={`agent${live ? ' is-live' : ''}`} aria-hidden="true">
			<span className="agent__aura" />
			<img className="agent__still" src="/orb-still.webp" alt="" decoding="async" />
			{!still && <canvas ref={canvas} className="agent__live" />}
		</div>
	)
}

export default Agent
