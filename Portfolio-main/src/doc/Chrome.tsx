import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { links, noteCount, person, sections } from '../content'
import Icon from './Icon'
import styles from './Chrome.module.scss'

const sectionIds = sections.map(s => s.id)

// The section whose heading has crossed the upper third of the viewport.
export function useActiveSection() {
	const [active, setActive] = useState(sectionIds[0])
	useEffect(() => {
		let frame = 0
		const measure = () => {
			frame = 0
			const line = window.innerHeight * 0.3
			let current = sectionIds[0]
			sectionIds.forEach(id => {
				const el = document.getElementById(id)
				if (el && el.getBoundingClientRect().top <= line) current = id
			})
			const doc = document.documentElement
			if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2)
				current = sectionIds[sectionIds.length - 1]
			setActive(current)
		}
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(measure)
		}
		measure()
		window.addEventListener('scroll', schedule, { passive: true })
		window.addEventListener('resize', schedule)
		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener('scroll', schedule)
			window.removeEventListener('resize', schedule)
		}
	}, [])
	return active
}

export function Toolbar({
	active,
	onTerminal,
}: {
	active: string
	onTerminal: () => void
}) {
	return (
		<header className={styles.toolbar}>
			<div className={styles.bar}>
				<div className={styles.left}>
					<a href="#top" className={styles.docLink}>
						<Icon name="doc" size={20} />
						<span className={styles.crumb}>
							<span className={styles.crumbName}>{person.shortName}</span>
							<span className={styles.crumbSep} aria-hidden="true">
								/
							</span>
							<span className={styles.crumbDoc}>Design doc</span>
						</span>
					</a>
					<JumpMenu active={active} />
				</div>
				<nav className={styles.right} aria-label="Resume and contact">
					<button
						type="button"
						className={styles.tool}
						onClick={onTerminal}
						aria-label="Open terminal"
						aria-keyshortcuts="`"
						title="Open terminal ( ` )"
					>
						<Icon name="terminal" />
					</button>
					<span className={styles.divider} aria-hidden="true" />
					<a className={`${styles.tool} ${styles.link}`} href={links.github} target="_blank" rel="noreferrer">
						<Icon name="github" />
						<span className={styles.toolLabel}>GitHub</span>
					</a>
					<a className={`${styles.tool} ${styles.link}`} href={links.linkedin} target="_blank" rel="noreferrer">
						<Icon name="linkedin" />
						<span className={styles.toolLabel}>LinkedIn</span>
					</a>
					<a className={`${styles.tool} ${styles.link}`} href={`mailto:${links.email}`}>
						<Icon name="mail" />
						<span className={styles.toolLabel}>Email</span>
					</a>
					<a
						className={styles.primary}
						href={links.resume}
						download={links.resumeFile}
						aria-label="Download PDF resume"
					>
						<Icon name="download" />
						<span className={styles.primaryLong}>Download PDF</span>
						<span className={styles.primaryShort}>PDF</span>
					</a>
				</nav>
			</div>
		</header>
	)
}

// Narrow screens: the outline becomes a jump menu that names the current section.
function JumpMenu({ active }: { active: string }) {
	const [open, setOpen] = useState(false)
	const rootRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const current = sections.find(s => s.id === active) ?? sections[0]

	useEffect(() => {
		if (!open) return
		const onPointer = (event: MouseEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
		}
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false)
				buttonRef.current?.focus()
			}
		}
		document.addEventListener('click', onPointer)
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('click', onPointer)
			document.removeEventListener('keydown', onKey)
		}
	}, [open])

	return (
		<div ref={rootRef} className={styles.jump}>
			<button
				ref={buttonRef}
				type="button"
				className={styles.jumpButton}
				aria-expanded={open}
				aria-controls="jump-list"
				onClick={() => setOpen(value => !value)}
			>
				<span className={styles.srOnly}>Contents. Current section: </span>
				<span className={styles.jumpNum}>{current.n}</span>
				<span className={styles.jumpTitle}>{current.title}</span>
				<Icon name="chevron" size={16} />
			</button>
			<ol id="jump-list" className={styles.jumpList} hidden={!open}>
				{sections.map(s => (
					<li key={s.id}>
						<a
							href={`#${s.id}`}
							aria-current={s.id === active ? 'location' : undefined}
							onClick={() => setOpen(false)}
						>
							<span className={styles.jumpNum}>{s.n}</span>
							{s.title}
						</a>
					</li>
				))}
			</ol>
		</div>
	)
}

// Wide screens: the outline rail, with a marker that follows the reader.
export function Outline({
	active,
	onTerminal,
}: {
	active: string
	onTerminal: () => void
}) {
	const listRef = useRef<HTMLOListElement>(null)
	const markRef = useRef<HTMLSpanElement>(null)

	useLayoutEffect(() => {
		const item = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`)
		const mark = markRef.current
		if (!item || !mark) return
		mark.style.height = `${item.offsetHeight}px`
		mark.style.transform = `translate3d(0, ${item.offsetTop}px, 0)`
	}, [active])

	return (
		<nav className={styles.rail} aria-labelledby="outline-title">
			<h2 id="outline-title" className={styles.railTitle}>
				Contents
			</h2>
			<div className={styles.track}>
				<span ref={markRef} className={styles.trackMark} aria-hidden="true" />
				<ol ref={listRef} className={styles.outline}>
					{sections.map(s => (
						<li key={s.id} data-id={s.id}>
							<a
								href={`#${s.id}`}
								aria-current={s.id === active ? 'location' : undefined}
							>
								<span className={styles.outlineNum}>{s.n}</span>
								{s.title}
							</a>
						</li>
					))}
				</ol>
			</div>
			<dl className={styles.railMeta}>
				<div>
					<dt>Source notes</dt>
					<dd>{noteCount}</dd>
				</div>
				<div>
					<dt>Terminal</dt>
					<dd>
						<button type="button" className={styles.kbdButton} onClick={onTerminal} aria-label="Open terminal">
							<kbd>`</kbd>
						</button>
					</dd>
				</div>
			</dl>
		</nav>
	)
}
