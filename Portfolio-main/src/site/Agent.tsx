import React, { RefObject, useEffect, useRef, useState } from 'react'
import type { Look, OrbHandle } from '../scene/orb'

// The knitted ball behind the prompt bar. On open, its aura blooms in from white (CSS, so it never
// waits for a download); three.js loads in its own chunk once the page is idle, and the thread
// winds itself on inside the aura. Reduced motion and browsers without WebGL get a still of the
// finished ball instead and never download three.js.

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const webglAvailable = () => {
	try {
		const c = document.createElement('canvas')
		return !!(c.getContext('webgl2') || c.getContext('webgl'))
	} catch {
		return false
	}
}

// while the two looks are being compared: ?orb=knit-glass (the knitted net is the default)
const lookFromUrl = (): Look => {
	const v = new URLSearchParams(window.location.search).get('orb')
	return v === 'knit-glass' ? v : 'knit'
}

const Agent = ({ hero }: { hero: RefObject<HTMLElement> }) => {
	const canvas = useRef<HTMLCanvasElement>(null)
	const handle = useRef<OrbHandle | null>(null)
	const [still] = useState(() => reducedMotion() || !webglAvailable())

	useEffect(() => {
		if (still) return
		let cancelled = false
		const start = () => {
			import('../scene/orb')
				.then(m => {
					if (cancelled || !canvas.current || !hero.current) return
					handle.current = m.createOrb(canvas.current, { hero: hero.current, look: lookFromUrl() })
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
			if (w.requestIdleCallback) idle = w.requestIdleCallback(start, { timeout: 700 })
			else timer = window.setTimeout(start, 200)
		}
		if (document.readyState === 'complete') schedule()
		else window.addEventListener('load', schedule, { once: true })
		return () => {
			cancelled = true
			window.removeEventListener('load', schedule)
			if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle)
			window.clearTimeout(timer)
			handle.current?.dispose()
			handle.current = null
		}
	}, [still, hero])

	return (
		<div className="agent" aria-hidden="true">
			<span className="agent__aura" />
			{still ? (
				<img className="agent__still" src="/orb-still.webp" alt="" decoding="async" />
			) : (
				<canvas ref={canvas} className="agent__live" />
			)}
		</div>
	)
}

export default Agent
