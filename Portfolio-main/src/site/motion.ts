// Motion is an enhancement: the page is complete before this file's chunks load,
// and nothing here runs when the visitor asks for reduced motion.
import type { gsap as GsapType } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

export type MotionKit = {
	gsap: typeof GsapType
	ScrollTrigger: typeof ScrollTriggerType
	lenis: Lenis
}

const query = '(prefers-reduced-motion: reduce)'

export const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	typeof window.matchMedia === 'function' &&
	window.matchMedia(query).matches

let kitPromise: Promise<MotionKit | null> | null = null
let kit: MotionKit | null = null

export function loadMotion(): Promise<MotionKit | null> {
	if (prefersReducedMotion()) return Promise.resolve(null)
	if (kitPromise) return kitPromise
	kitPromise = Promise.all([
		import('gsap'),
		import('gsap/ScrollTrigger'),
		import('lenis'),
	])
		.then(([g, st, l]) => {
			const gsap = g.gsap
			const ScrollTrigger = st.ScrollTrigger
			gsap.registerPlugin(ScrollTrigger)
			const LenisCtor = l.default
			const lenis = new LenisCtor({ lerp: 0.12, smoothWheel: true })
			lenis.on('scroll', ScrollTrigger.update)
			gsap.ticker.add(time => lenis.raf(time * 1000))
			gsap.ticker.lagSmoothing(0)
			kit = { gsap, ScrollTrigger, lenis }
			return kit
		})
		.catch(() => null)
	return kitPromise
}

export const getMotion = () => kit

const headerOffset = () => {
	const header = document.querySelector<HTMLElement>('[data-site-header]')
	return (header ? header.offsetHeight : 64) + 12
}

/** Scroll to an in-page target and move focus there, with or without smooth scroll. */
export function goTo(id: string) {
	const target = document.getElementById(id)
	if (!target) return
	const focusTarget = () => {
		if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
		target.focus({ preventScroll: true })
	}
	if (kit) {
		kit.lenis.scrollTo(target, { offset: -headerOffset(), onComplete: focusTarget })
	} else {
		const top = target.getBoundingClientRect().top + window.scrollY - headerOffset()
		window.scrollTo({ top, behavior: 'auto' })
		focusTarget()
	}
	if (window.history && window.history.replaceState)
		window.history.replaceState(null, '', `#${id}`)
}

export function pauseScroll(paused: boolean) {
	if (!kit) return
	if (paused) kit.lenis.stop()
	else kit.lenis.start()
}
