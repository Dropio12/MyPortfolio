import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Outline, Toolbar, useActiveSection } from '../doc/Chrome'
import { DocBody, DocFooter, DocHeader } from '../doc/Document'
import { NotesProvider } from '../doc/Notes'
import styles from './App.module.scss'

// The old terminal lives on as an easter egg, loaded only when someone opens it.
const TerminalOverlay = lazy(() => import('../Terminal/TerminalOverlay'))

const isEditable = (target: EventTarget | null) =>
	target instanceof HTMLElement &&
	(target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))

export default function App() {
	const appRef = useRef<HTMLDivElement>(null)
	const pageRef = useRef<HTMLElement>(null)
	const active = useActiveSection()
	const [terminal, setTerminal] = useState(false)
	const openTerminal = useCallback(() => setTerminal(true), [])
	const closeTerminal = useCallback(() => setTerminal(false), [])

	// Backtick toggles the terminal, unless you are typing somewhere.
	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			if (event.key !== '`' || event.metaKey || event.ctrlKey || event.altKey) return
			if (isEditable(event.target)) return
			event.preventDefault()
			setTerminal(open => !open)
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [])

	// While the terminal is open, the document behind it is out of reach.
	useEffect(() => {
		const app = appRef.current
		if (!app) return
		if (terminal) {
			app.setAttribute('inert', '')
			app.setAttribute('aria-hidden', 'true')
			document.documentElement.style.overflow = 'hidden'
		} else {
			app.removeAttribute('inert')
			app.removeAttribute('aria-hidden')
			document.documentElement.style.overflow = ''
		}
	}, [terminal])

	return (
		<>
			<div ref={appRef} className={styles.app}>
				<a className={styles.skip} href="#doc">
					Skip to the document
				</a>
				<Toolbar active={active} onTerminal={openTerminal} />
				<div className={styles.desk}>
					<div className={styles.railCol}>
						<Outline active={active} onTerminal={openTerminal} />
					</div>
					<main id="doc" className={styles.main} tabIndex={-1}>
						<article
							ref={pageRef}
							id="top"
							className={styles.page}
							data-notes-page=""
							aria-labelledby="doc-title"
						>
							<NotesProvider pageRef={pageRef}>
								<DocHeader />
								<DocBody />
								<DocFooter onTerminal={openTerminal} />
							</NotesProvider>
						</article>
					</main>
				</div>
			</div>
			{terminal && (
				<Suspense fallback={null}>
					<TerminalOverlay onClose={closeTerminal} />
				</Suspense>
			)}
		</>
	)
}
