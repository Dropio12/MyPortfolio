import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LineId } from '../content'
import { Footer, Header, ServiceDoor } from '../site/Chrome'
import { Hero } from '../site/Hero'
import { Ride } from '../site/Ride'
import { loadMotion } from '../site/motion'

const typingTarget = (el: EventTarget | null) =>
	el instanceof HTMLElement &&
	(el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))

const App = () => {
	const [focus, setFocus] = useState<LineId | null>(null)
	const [doorOpen, setDoorOpen] = useState(false)
	const opener = useRef<HTMLElement | null>(null)

	const openDoor = useCallback((from: HTMLElement | null) => {
		opener.current = from
		setDoorOpen(true)
	}, [])
	const closeDoor = useCallback(() => setDoorOpen(false), [])

	// smooth scroll and scroll-linked drawing start after first paint
	useEffect(() => {
		loadMotion()
	}, [])

	// the backtick key opens the service door
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key !== '`' || doorOpen || typingTarget(e.target)) return
			e.preventDefault()
			openDoor(document.activeElement instanceof HTMLElement ? document.activeElement : null)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [doorOpen, openDoor])

	return (
		<>
			<a className="skip" href="#ride">
				Skip to the ride
			</a>
			<Header />
			<main id="top" className="page" data-focus={focus || undefined} tabIndex={-1}>
				<Hero focus={focus} onFocus={setFocus} />
				<Ride />
			</main>
			<Footer onDoor={openDoor} />
			{doorOpen && <ServiceDoor onClose={closeDoor} returnTo={opener.current} />}
		</>
	)
}

export default App
