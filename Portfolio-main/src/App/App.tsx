import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Role, Tailored, itemById } from '../content'
import { tailored as tailoredMap } from '../views'
import { track } from '../analytics'
import { Answer, tailoredAnswer } from '../lib/answer'
import { FilterState, visibleItems } from '../lib/filter'
import { Contact, Footer } from '../site/Contact'
import Detail from '../site/Detail'
import Education from '../site/Education'
import Header from '../site/Header'
import Hero, { Glance, Intro } from '../site/Hero'
import { PaperDefs } from '../site/Paper'
import Work, { PROJECTS } from '../site/Work'

const TerminalDoor = React.lazy(() => import('../site/TerminalDoor'))
const Mcp = React.lazy(() => import('../site/Mcp'))

const readSlug = () => {
	const slug = (new URLSearchParams(window.location.search).get('for') || '').toLowerCase().trim()
	return tailoredMap[slug] ? slug : null
}

const hashItem = () => {
	const id = decodeURIComponent(window.location.hash.replace(/^#/, ''))
	return itemById(id) ? id : null
}

const emptyFilter: FilterState = { roles: [], techs: [], query: '', pinned: [] }

const scrollToId = (id: string) => {
	const el = document.getElementById(id)
	if (!el) return
	const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
	el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
}

const App = () => {
	const initialSlug = useRef(readSlug()).current
	const [slug, setSlug] = useState<string | null>(initialSlug)
	const tailored: Tailored | null = slug ? tailoredMap[slug] : null

	const [filter, setFilter] = useState<FilterState>(() =>
		initialSlug ? { ...emptyFilter, roles: tailoredMap[initialSlug].roles, pinned: tailoredMap[initialSlug].pinned } : emptyFilter
	)
	const [pinnedLabel, setPinnedLabel] = useState(initialSlug ? `Pinned for ${tailoredMap[initialSlug].company}` : '')
	const [answer, setAnswer] = useState<Answer | null>(() => (initialSlug ? tailoredAnswer(initialSlug) : null))
	const [openId, setOpenId] = useState<string | null>(null)
	const [terminal, setTerminal] = useState(false)
	const [mcp, setMcp] = useState(false)
	const hero = useRef<HTMLElement>(null)

	const shown = useMemo(() => visibleItems(filter), [filter])

	useEffect(() => {
		track('page_view', { for: initialSlug || '' })
	}, [initialSlug])

	/* ---------- detail sheets live in the URL hash, so a card is linkable and Back closes it ---------- */

	useEffect(() => {
		const initial = hashItem()
		if (initial) setOpenId(initial)
		const onPop = () => setOpenId(hashItem())
		window.addEventListener('popstate', onPop)
		return () => window.removeEventListener('popstate', onPop)
	}, [])

	const openDetail = useCallback((id: string) => {
		if (!itemById(id)) return
		if (window.location.hash === `#${id}`) setOpenId(id)
		else {
			window.history.pushState({ detail: id }, '', `${window.location.pathname}${window.location.search}#${id}`)
			setOpenId(id)
		}
		track('tile_open', { id })
	}, [])

	const goDetail = useCallback((id: string) => {
		window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${id}`)
		setOpenId(id)
	}, [])

	const closeDetail = useCallback(() => {
		if (window.history.state && window.history.state.detail) window.history.back()
		else {
			window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
			setOpenId(null)
		}
	}, [])

	/* ---------- the backtick opens the old terminal ---------- */

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key !== '`' || e.ctrlKey || e.metaKey || e.altKey) return
			const t = e.target as HTMLElement
			if (t.closest('input, textarea, [contenteditable="true"], [role="dialog"]')) return
			e.preventDefault()
			setTerminal(true)
			track('terminal')
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [])

	/* ---------- filters and answers ---------- */

	const patchFilter = useCallback((patch: Partial<FilterState>) => setFilter(f => ({ ...f, ...patch })), [])

	const toggleRole = useCallback((r: Role) => {
		setFilter(f => {
			const on = f.roles.includes(r)
			track('role', { role: r, on: !on })
			return { ...f, roles: on ? f.roles.filter(x => x !== r) : [...f.roles, r] }
		})
	}, [])

	const clearFilter = useCallback(() => {
		setFilter(emptyFilter)
		setPinnedLabel('')
	}, [])

	const seeEverything = useCallback(() => {
		setSlug(null)
		setFilter(emptyFilter)
		setPinnedLabel('')
		setAnswer(a => (a && a.kind === 'tailored' ? null : a))
		const url = new URL(window.location.href)
		url.searchParams.delete('for')
		window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
	}, [])

	const applyAnswer = useCallback((a: Answer, scroll = true) => {
		setFilter({ roles: a.roles, techs: [], query: '', pinned: a.evidence.map(e => e.id) })
		setPinnedLabel(a.isPosting ? 'Pinned from your job posting' : `Pinned from your question: ${a.prompt}`)
		if (scroll) scrollToId('work')
	}, [])

	const onAnswer = useCallback(
		(a: Answer, how: string) => {
			setAnswer(a)
			track('ask', { kind: a.kind, posting: a.isPosting, how, evidence: a.evidence.length })
			// a pasted posting re-deals the whole page around it
			if (a.isPosting && a.evidence.length) applyAnswer(a, false)
		},
		[applyAnswer]
	)

	// the sheet's previous / next walk the same row the card sits in, in its current order
	const order = useMemo(() => {
		if (!openId) return []
		const project = PROJECTS.includes(itemById(openId)!.kind)
		const row = shown.filter(s => PROJECTS.includes(s.item.kind) === project).map(s => s.item.id)
		return row.includes(openId) ? row : [openId]
	}, [openId, shown])

	return (
		<>
			<PaperDefs />
			<a className="skip" href="#work">
				Skip to the work
			</a>
			<Header tailored={tailored} onSeeEverything={seeEverything} />
			<main id="main">
				<Hero
					ref={hero}
					roles={filter.roles}
					answer={answer}
					onAnswer={onAnswer}
					onClear={() => setAnswer(null)}
					onShowMe={openDetail}
					onApply={a => applyAnswer(a)}
					onRead={() => {
						scrollToId('portfolio')
						track('read_portfolio')
					}}
					onConnect={() => {
						setMcp(true)
						track('mcp', { action: 'open' })
					}}
					onTerminal={() => {
						setTerminal(true)
						track('terminal', { from: 'hero' })
					}}
				/>
				<Intro />
				<Glance onOpen={openDetail} />
				<Education />
				<Work
					filter={filter}
					shown={shown}
					pinnedLabel={pinnedLabel}
					onFilter={patchFilter}
					onToggleRole={toggleRole}
					onClear={clearFilter}
					onOpen={openDetail}
				/>
				<Contact />
			</main>
			<Footer onTerminal={() => setTerminal(true)} />
			{openId && <Detail id={openId} order={order} onClose={closeDetail} onGo={goDetail} />}
			{mcp && (
				<React.Suspense fallback={null}>
					<Mcp onClose={() => setMcp(false)} />
				</React.Suspense>
			)}
			{terminal && (
				<React.Suspense fallback={null}>
					<TerminalDoor onClose={() => setTerminal(false)} />
				</React.Suspense>
			)}
		</>
	)
}

export default App
