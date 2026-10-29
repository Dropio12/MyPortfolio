// Motion preferences and in-page travel. Native scroll everywhere; the world's camera
// eases on its own, so nothing here hijacks the wheel.

const query = '(prefers-reduced-motion: reduce)'

export const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	typeof window.matchMedia === 'function' &&
	window.matchMedia(query).matches

export const isPhoneLayout = () =>
	typeof window !== 'undefined' &&
	typeof window.matchMedia === 'function' &&
	window.matchMedia('(max-width: 899px)').matches

/** Scroll the page to y; smooth unless the visitor asked for less motion. */
export const scrollToY = (y: number) => {
	window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/** Move focus to an element without scrolling it a second time. */
export const focusQuietly = (el: HTMLElement | null) => {
	if (!el) return
	if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
	el.focus({ preventScroll: true })
}

const hudHeight = () => {
	const hud = document.querySelector<HTMLElement>('[data-hud]')
	return hud ? hud.offsetHeight : 64
}

/** In the list view: bring a stop's top under the header. */
export const scrollToElement = (el: HTMLElement | null) => {
	if (!el) return
	scrollToY(el.getBoundingClientRect().top + window.scrollY - hudHeight() - 12)
}
