import React, { useEffect, useRef } from 'react'
import Terminal from './Terminal'
import Icon from '../doc/Icon'
import styles from './Terminal.module.scss'

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'

// The old terminal, as a window over the doc. Esc closes it; focus stays inside and returns on close.
export default function TerminalOverlay({ onClose }: { onClose: () => void }) {
	const dialogRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const previous = document.activeElement as HTMLElement | null
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault()
				onClose()
				return
			}
			if (event.key !== 'Tab') return
			const dialog = dialogRef.current
			const items = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)) : []
			if (!dialog || !items.length) return
			const first = items[0]
			const last = items[items.length - 1]
			if (!dialog.contains(document.activeElement)) {
				event.preventDefault()
				first.focus()
			} else if (event.shiftKey && document.activeElement === first) {
				event.preventDefault()
				last.focus()
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault()
				first.focus()
			}
		}
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('keydown', onKey)
			previous?.focus?.()
		}
	}, [onClose])

	return (
		<div
			className={styles.backdrop}
			onMouseDown={event => {
				if (event.target === event.currentTarget) onClose()
			}}
		>
			<div
				ref={dialogRef}
				className={styles.window}
				role="dialog"
				aria-modal="true"
				aria-labelledby="terminal-title"
			>
				<div className={styles.titlebar}>
					<span id="terminal-title" className={styles.titleText}>
						Terminal
						<span className={styles.titlePath}>dropio12@badredinne: ~</span>
					</span>
					<button type="button" className={styles.close} onClick={onClose}>
						<span className={styles.closeHint}>Esc</span>
						<Icon name="close" size={16} />
						<span className={styles.srOnly}>Close terminal</span>
					</button>
				</div>
				<Terminal onClose={onClose} />
			</div>
		</div>
	)
}
