import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Footer, Hud, Mode, ServiceDoor } from '../site/Chrome'
import { HeroCard, Still, StopPanel, TerminusPanel } from '../site/Panels'
import { Stage, rideTarget, scrollToStop } from '../site/Stage'
import { domId, rideStops } from '../site/ride'
import { focusQuietly, prefersReducedMotion, scrollToElement } from '../site/motion'

const typingTarget = (el: EventTarget | null) =>
	el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))

const VIEW_KEY = 'pixel-metro-view'

/** the last stop whose top has passed under the header */
const stopNearTop = () => {
	let here = 0
	rideStops.forEach((s, i) => {
		const el = document.getElementById(domId(s))
		if (el && el.getBoundingClientRect().top <= 140) here = i
	})
	return here
}

const initialMode = (): Mode => {
	if (prefersReducedMotion()) return 'list'
	try {
		if (window.localStorage.getItem(VIEW_KEY) === 'list') return 'list'
	} catch (e) {
		// storage can be blocked; the ride is the default
	}
	return 'ride'
}

const App = () => {
	const [mode, setMode] = useState<Mode>(initialMode)
	const [current, setCurrent] = useState({ index: 0, at: true })
	const [doorOpen, setDoorOpen] = useState(false)
	const opener = useRef<HTMLElement | null>(null)
	const modeRef = useRef(mode)
	modeRef.current = mode

	const currentRef = useRef(current)
	currentRef.current = current
	const pending = useRef<number | null>(null)

	const chooseMode = useCallback((m: Mode) => {
		// keep the visitor at the same stop across the switch
		pending.current = window.scrollY < 200 ? null : modeRef.current === 'ride' ? currentRef.current.index : stopNearTop()
		setMode(m)
		try {
			window.localStorage.setItem(VIEW_KEY, m)
		} catch (e) {
			// a convenience only
		}
	}, [])

	const jump = useCallback((index: number, focus: boolean) => {
		const s = rideStops[index]
		if (!s) return
		const el = document.getElementById(domId(s))
		if (modeRef.current === 'ride') scrollToStop(index)
		else scrollToElement(el)
		if (focus && el) focusQuietly(el.querySelector<HTMLElement>('h2, h3'))
	}, [])

	const openDoor = useCallback((from: HTMLElement | null) => {
		opener.current = from
		setDoorOpen(true)
	}, [])
	const closeDoor = useCallback(() => setDoorOpen(false), [])

	// Left and Right step between stations; the backtick key opens the service door
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (doorOpen || typingTarget(e.target) || e.altKey || e.ctrlKey || e.metaKey) return
			if (e.key === '`') {
				e.preventDefault()
				openDoor(document.activeElement instanceof HTMLElement ? document.activeElement : null)
				return
			}
			if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
			const forward = e.key === 'ArrowRight'
			let index = current.index
			if (forward) index = Math.min(rideStops.length - 1, index + 1)
			else if (current.at) index = Math.max(0, index - 1)
			if (modeRef.current === 'list') {
				const here = stopNearTop()
				const el = document.getElementById(domId(rideStops[here]))
				const aligned = !el || el.getBoundingClientRect().top > 40
				index = forward ? Math.min(rideStops.length - 1, here + 1) : Math.max(0, aligned ? here - 1 : here)
			}
			e.preventDefault()
			jump(index, false)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [doorOpen, openDoor, jump, current])

	// after a view switch, land on the stop the visitor was reading
	useEffect(() => {
		const index = pending.current
		pending.current = null
		if (index === null) return
		const el = document.getElementById(domId(rideStops[index]))
		if (mode === 'list' && el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 84 })
		else if (mode === 'ride') window.scrollTo({ top: rideTarget(index) })
	}, [mode])

	const terminus = rideStops.length - 1

	return (
		<div className="app" data-mode={mode}>
			<a className="skip" href={`#${domId(rideStops[0])}`}>
				Skip to the first stop
			</a>
			<Hud mode={mode} onMode={chooseMode} />
			<main id="top" className="ride" tabIndex={-1}>
				{mode === 'ride' && <Stage current={current} onCurrent={setCurrent} onJump={jump} />}
				<div className="ride__content" data-ride-content="">
					<HeroCard mode={mode} onMode={chooseMode} onJump={jump} />
					<section aria-labelledby="ride-title">
						<h2 id="ride-title" className="sr-only">
							The ride: education, jobs, client work and projects
						</h2>
						<ol className="stops">
							{rideStops.slice(0, terminus).map((s, i) => (
								<li key={s.id} id={domId(s)} className="stop">
									{mode === 'list' && <Still index={i} label={s.title} />}
									<StopPanel s={s} index={i} count={rideStops.length} />
								</li>
							))}
						</ol>
					</section>
					<div id={domId(rideStops[terminus])} className="stop stop--terminus">
						{mode === 'list' && <Still index={terminus} label={rideStops[terminus].title} />}
						<TerminusPanel s={rideStops[terminus]} index={terminus} />
					</div>
				</div>
			</main>
			<Footer onDoor={openDoor} />
			{doorOpen && <ServiceDoor onClose={closeDoor} returnTo={opener.current} />}
		</div>
	)
}

export default App
