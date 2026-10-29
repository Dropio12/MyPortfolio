import React, { RefObject, useEffect, useRef, useState } from 'react'
import { SceneObject } from '../content'
import type { SceneHandle } from '../scene/scene'

// The hero's 3D layer. three.js loads in its own chunk after the first paint, when the browser
// is idle. Visitors who ask for reduced motion, and browsers without WebGL, get a still render
// of the same objects instead, and never download three.js.

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const webglAvailable = () => {
	try {
		const c = document.createElement('canvas')
		return !!(c.getContext('webgl2') || c.getContext('webgl'))
	} catch {
		return false
	}
}

type Props = {
	hero: RefObject<HTMLElement>
	focus: SceneObject[]
	onPick: (o: SceneObject) => void
}

const Stage = ({ hero, focus, onPick }: Props) => {
	const canvas = useRef<HTMLCanvasElement>(null)
	const handle = useRef<SceneHandle | null>(null)
	const pick = useRef(onPick)
	pick.current = onPick
	const focusRef = useRef(focus)
	focusRef.current = focus
	const [mode, setMode] = useState<'pending' | 'live' | 'still'>(() =>
		reducedMotion() || !webglAvailable() ? 'still' : 'pending'
	)

	useEffect(() => {
		if (mode !== 'pending') return
		let cancelled = false
		const start = () => {
			import('../scene/scene')
				.then(m => {
					if (cancelled || !canvas.current || !hero.current) return
					handle.current = m.createScene(canvas.current, {
						hero: hero.current,
						onPick: o => pick.current(o),
						onReady: () => setMode('live'),
					})
					handle.current.setFocus(focusRef.current)
				})
				.catch(() => !cancelled && setMode('still'))
		}
		const w = window as Window & {
			requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
			cancelIdleCallback?: (id: number) => void
		}
		let idle = 0
		let timer = 0
		const schedule = () => {
			if (w.requestIdleCallback) idle = w.requestIdleCallback(start, { timeout: 1200 })
			else timer = window.setTimeout(start, 300)
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
		// the scene is created once; focus changes go through setFocus below
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const focusKey = focus.join(',')
	useEffect(() => {
		handle.current?.setFocus(focusRef.current)
	}, [focusKey])

	if (mode === 'still')
		return (
			<div className="stage stage--still" aria-hidden="true">
				<picture>
					<source media="(min-width: 1080px)" srcSet="/hero-objects-wide.webp" />
					<img src="/hero-objects-narrow.webp" alt="" decoding="async" />
				</picture>
			</div>
		)
	return <canvas ref={canvas} className={`stage${mode === 'live' ? ' is-live' : ''}`} aria-hidden="true" />
}

export default Stage
