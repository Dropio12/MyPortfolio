import { RefObject, useEffect, useRef } from 'react'

// Modal behaviour shared by the detail sheet and the terminal: lock the page scroll, trap Tab
// inside, close on Escape, and hand focus back to whatever opened it.

const focusables = (root: HTMLElement) =>
	Array.from(
		root.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'
		)
	).filter(el => el.getClientRects().length > 0)

export const useDialog = (root: RefObject<HTMLElement>, onClose: () => void, initial?: RefObject<HTMLElement>) => {
	const close = useRef(onClose)
	close.current = onClose

	useEffect(() => {
		const opener = document.activeElement as HTMLElement | null
		const html = document.documentElement
		// only a real desktop scrollbar is compensated; anything wider means the layout is off, not a scrollbar
		const gap = window.innerWidth - html.clientWidth
		const scrollbar = gap > 0 && gap < 30 ? gap : 0
		html.classList.add('is-locked')
		html.style.setProperty('--scrollbar', `${scrollbar}px`)
		const el = root.current
		const first = initial?.current || (el && focusables(el)[0])
		first?.focus({ preventScroll: true })

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault()
				close.current()
				return
			}
			if (e.key !== 'Tab' || !el) return
			const items = focusables(el)
			if (!items.length) return
			const a = items[0]
			const z = items[items.length - 1]
			if (e.shiftKey && (document.activeElement === a || !el.contains(document.activeElement))) {
				e.preventDefault()
				z.focus()
			} else if (!e.shiftKey && (document.activeElement === z || !el.contains(document.activeElement))) {
				e.preventDefault()
				a.focus()
			}
		}
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('keydown', onKey)
			html.classList.remove('is-locked')
			html.style.removeProperty('--scrollbar')
			if (opener && document.contains(opener)) opener.focus({ preventScroll: true })
		}
		// opened once per mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
