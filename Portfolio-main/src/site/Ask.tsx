import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Role, itemById } from '../content'
import { agentBusy, agentFocus, agentListening, agentMeter, agentTyped } from '../lib/agent'
import { Answer, looksLikePosting, questionsFor } from '../lib/answer'
import { MAX_CHARS, ask } from '../lib/ask'
import { tagById } from '../lib/vocab'
import { Art } from './Art'
import PaperBack from './Paper'
import { IconArrowRight, IconArrowUp, IconClose, IconFacts, IconMic, IconStop } from './icons'
import { useVoice, voiceSupported } from './useVoice'

type Props = {
	roles: Role[]
	answer: Answer | null
	onAnswer: (a: Answer, how: 'typed' | 'pasted' | 'suggested' | 'voice') => void
	onClear: () => void
	onShowMe: (id: string) => void
	onApply: (a: Answer) => void
}

const modeLabel: Record<Answer['kind'], string> = {
	local: 'Answered from this page’s facts',
	ai: 'AI answer, grounded in this page’s facts',
	scripted: 'A fixed answer: this one is for Anass himself',
	tailored: 'Written for this role, from this page’s facts',
}

/** a small scrap of paper with the work's picture or diagram on it */
export const Thumb = ({ id }: { id: string }) => {
	const item = itemById(id)
	if (!item) return null
	return item.image ? (
		<img src={item.image.tile || item.image.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: item.image.position }} />
	) : (
		<Art id={id} />
	)
}

const AnswerCard = ({
	answer,
	onClear,
	onShowMe,
	onApply,
	onAsk,
}: {
	answer: Answer
	onClear: () => void
	onShowMe: (id: string) => void
	onApply: (a: Answer) => void
	onAsk: (q: string) => void
}) => {
	// what this answers, said once at the foot: the posting, the question, or the role it was written for
	const source = answer.isPosting || answer.kind === 'tailored' ? answer.prompt : `“${answer.prompt}”`
	return (
		<article className={`answer answer--${answer.kind}${answer.heading ? '' : ' answer--plain'}`} aria-labelledby="answer-title">
			<PaperBack seed={`answer:${answer.kind}:${answer.prompt.length}`} />
			<button type="button" className="icon-btn answer__close" onClick={onClear} aria-label="Clear the answer">
				<IconClose />
			</button>
			<h2 id="answer-title" className={answer.heading ? 'answer__title' : 'sr-only'}>
				{answer.heading || 'Answer'}
			</h2>
			{answer.paragraphs.map((p, i) => (
				<p key={i} className="answer__p">
					{p}
				</p>
			))}
			{answer.bullets && (
				<ul className="answer__bullets">
					{answer.bullets.map(b => (
						<li key={b}>{b}</li>
					))}
				</ul>
			)}
			{answer.note && <p className="answer__note">{answer.note}</p>}
			{answer.evidence.length > 0 && (
				<ol className="evidence" aria-label="Evidence on this page">
					{answer.evidence.map(e => {
						const item = itemById(e.id)
						if (!item) return null
						return (
							<li key={e.id}>
								<button type="button" className="evi" onClick={() => onShowMe(e.id)}>
									<span className="evi__art" aria-hidden="true">
										<Thumb id={e.id} />
									</span>
									<span className="evi__text">
										<span className="evi__title">{item.title}</span>
										<span className="evi__line">{item.line}</span>
										{e.tags.length > 0 && (
											<span className="evi__tags">
												<span className="sr-only">Matches: </span>
												{e.tags.slice(0, 3).map(t => (
													<span key={t} className="evi__tag">
														{tagById[t]?.label || t}
													</span>
												))}
											</span>
										)}
									</span>
									<span className="evi__go">
										Show me
										<IconArrowRight />
									</span>
								</button>
							</li>
						)
					})}
				</ol>
			)}
			{answer.suggestions && (
				<div className="try try--inside">
					{answer.suggestions.map(q => (
						<button key={q} type="button" className="pill" onClick={() => onAsk(q)}>
							{q}
						</button>
					))}
				</div>
			)}
			<div className="answer__foot">
				<p className="answer__mode">
					<IconFacts />
					<span>
						{modeLabel[answer.kind]}
						<span className="answer__source">
							<span aria-hidden="true"> · </span>
							<span className="sr-only">, for </span>
							{source}
						</span>
					</span>
				</p>
				{answer.evidence.length > 0 && answer.kind !== 'scripted' && (
					<button type="button" className="link-btn" onClick={() => onApply(answer)}>
						See the matching work
						<IconArrowRight />
					</button>
				)}
			</div>
		</article>
	)
}

/* ---------- the placeholder that moves: example prompts, morphing one into the next ---------- */

/** each example in full, and in a phone-length form that fits a narrow pill whole */
export const EXAMPLES = [
	{ full: 'Paste a job posting, see why Anass fits.', short: 'Paste a job posting' },
	{ full: 'What did he ship at Shopify?', short: 'What did he ship at Shopify?' },
	{ full: 'Is he a fit for a forward deployed role?', short: 'Is he a fit for an FDE role?' },
	{ full: 'Show me his AI agent work.', short: 'Show me his AI agent work.' },
]

const HOLD_MS = 3600
/** below this field width, the phone-length examples are used */
const COMPACT_PX = 330

const Ghost = ({ paused }: { paused: boolean }) => {
	const [i, setI] = useState(0)
	const [leaving, setLeaving] = useState(false)
	const [compact, setCompact] = useState(false)
	const box = useRef<HTMLSpanElement>(null)
	const still = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current

	useLayoutEffect(() => {
		const el = box.current
		if (!el) return
		const read = () => setCompact(el.clientWidth < COMPACT_PX)
		read()
		window.addEventListener('resize', read)
		return () => window.removeEventListener('resize', read)
	}, [])

	useEffect(() => {
		if (paused || still) return
		const t = window.setTimeout(() => setLeaving(true), HOLD_MS)
		return () => window.clearTimeout(t)
	}, [i, paused, still])

	useEffect(() => {
		if (!leaving) return
		const t = window.setTimeout(() => {
			setI(n => (n + 1) % EXAMPLES.length)
			setLeaving(false)
		}, 420)
		return () => window.clearTimeout(t)
	}, [leaving])

	const text = compact ? EXAMPLES[i].short : EXAMPLES[i].full
	return (
		<span className={`ghost${leaving ? ' is-leaving' : ''}`} ref={box} aria-hidden="true">
			<span className="ghost__line" key={`${i}-${compact}`}>
				{still
					? text
					: Array.from(text).map((ch, n) => (
							<span key={n} className="ghost__ch" style={{ '--c': n } as React.CSSProperties}>
								{ch === ' ' ? '\u00a0' : ch}
							</span>
					  ))}
			</span>
		</span>
	)
}

const LINE = 24
const MAX_H = 240

const Ask = ({ roles, answer, onAnswer, onClear, onShowMe, onApply }: Props) => {
	const [text, setText] = useState('')
	const [busy, setBusy] = useState(false)
	const [focused, setFocused] = useState(false)
	const [tall, setTall] = useState(false)
	const input = useRef<HTMLTextAreaElement>(null)
	const measure = useRef<HTMLTextAreaElement>(null)
	const how = useRef<'typed' | 'pasted' | 'suggested' | 'voice'>('typed')
	const canVoice = useRef(voiceSupported()).current
	const voice = useVoice(
		(heard, final) => {
			setText(heard)
			agentTyped()
			how.current = 'voice'
			if (final) input.current?.focus()
		},
		() => agentMeter()
	)

	// one line in a pill; a long posting grows it into a rounded box. The height is measured on
	// a hidden twin, so the real field can animate from one height to the next.
	useLayoutEffect(() => {
		const el = input.current
		const twin = measure.current
		if (!el || !twin) return
		twin.value = text
		const h = Math.min(Math.max(twin.scrollHeight, LINE), MAX_H)
		el.style.height = `${h}px`
		el.style.overflowY = twin.scrollHeight > MAX_H ? 'auto' : 'hidden'
		setTall(h > LINE + 4)
	}, [text])

	// the orb listens with the bar
	useEffect(() => {
		agentListening(voice.listening)
	}, [voice.listening])
	useEffect(() => () => agentListening(false), [])

	const submit = async (q: string, via: typeof how.current) => {
		const question = q.trim()
		if (!question || busy) return
		if (voice.listening) voice.stop()
		setBusy(true)
		agentBusy(true)
		try {
			const a = await ask(question, roles)
			if (a) {
				onAnswer(a, via)
				// the answer echoes what was asked, so the bar is ready for the next question
				setText('')
			}
		} finally {
			setBusy(false)
			agentBusy(false)
		}
	}

	const onAsk = (q: string) => {
		setText(q)
		void submit(q, 'suggested')
	}

	useEffect(() => {
		if (!voice.error) return
		const t = window.setTimeout(voice.clearError, 6000)
		return () => window.clearTimeout(t)
	}, [voice.error, voice.clearError])

	const questions = questionsFor(roles)
	const listening = voice.listening
	const empty = !text

	return (
		<div className="ask">
			<form
				className={`ask__bar${tall ? ' is-tall' : ''}${listening ? ' is-listening' : ''}${busy ? ' is-busy' : ''}`}
				onSubmit={e => {
					e.preventDefault()
					void submit(text, how.current)
				}}
			>
				<div className="ask__field">
					<label htmlFor="ask-input" className="sr-only">
						Ask about Anass, or paste a job posting
					</label>
					<textarea
						id="ask-input"
						ref={input}
						className="ask__input"
						rows={1}
						maxLength={MAX_CHARS}
						value={text}
						placeholder={listening ? 'Listening. Your words land here to review before you send.' : EXAMPLES[0].full}
						onChange={e => {
							setText(e.target.value)
							agentTyped()
							how.current = 'typed'
						}}
						onFocus={() => {
							setFocused(true)
							agentFocus(true)
						}}
						onBlur={() => {
							setFocused(false)
							agentFocus(false)
						}}
						onKeyDown={e => {
							if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
								e.preventDefault()
								void submit(text, how.current)
							}
						}}
						onPaste={e => {
							// pasting a whole posting into an empty bar answers right away
							const pasted = e.clipboardData.getData('text')
							agentTyped()
							if (!text.trim() && looksLikePosting(pasted)) {
								e.preventDefault()
								const clipped = pasted.slice(0, MAX_CHARS)
								setText(clipped)
								how.current = 'pasted'
								void submit(clipped, 'pasted')
							}
						}}
						aria-describedby="ask-hint"
					/>
					<textarea ref={measure} className="ask__input ask__twin" rows={1} tabIndex={-1} aria-hidden="true" readOnly />
					{empty && !listening && <Ghost paused={focused} />}
					{empty && listening && (
						<span className="ghost" aria-hidden="true">
							<span className="ghost__line">Listening. Your words land here to review before you send.</span>
						</span>
					)}
				</div>
				<div className="ask__tools">
					{canVoice && (
						<button
							type="button"
							className={`icon-btn ask__mic${listening ? ' is-on' : ''}`}
							aria-pressed={listening}
							aria-label={listening ? 'Stop listening' : 'Ask by voice'}
							title={listening ? 'Stop listening' : 'Ask by voice (your browser’s speech recognition)'}
							onClick={() => (listening ? voice.stop() : voice.start(''))}
						>
							{listening ? (
								<>
									<IconStop />
									<span className="ask__levels" aria-hidden="true">
										<i />
										<i />
										<i />
									</span>
								</>
							) : (
								<IconMic />
							)}
						</button>
					)}
					<button type="submit" className="ask__send" aria-label="Ask" disabled={!text.trim() || busy}>
						<IconArrowUp />
					</button>
				</div>
			</form>
			<p id="ask-hint" className={`ask__hint${focused || tall || busy ? ' is-shown' : ''}`}>
				{busy ? (
					'Reading the page’s facts…'
				) : (
					<>
						<span className="ask__keys">Enter to send · Shift + Enter for a new line</span>
						<span className="ask__touch">Ask anything about his work, or paste a job posting</span>
					</>
				)}
			</p>
			{voice.error && (
				<p className="ask__error" role="status">
					{voice.error}
				</p>
			)}
			<div className="ask__out" aria-live="polite" aria-busy={busy}>
				{answer && (
					<AnswerCard
						key={answer.prompt + answer.kind + answer.paragraphs.join('').length}
						answer={answer}
						onClear={() => {
							onClear()
							setText('')
							input.current?.focus()
						}}
						onShowMe={onShowMe}
						onApply={onApply}
						onAsk={onAsk}
					/>
				)}
			</div>
			<div className="try" aria-label="Suggested questions" role="group">
				<span className="try__label">Try</span>
				<div className="try__row">
					{questions.map(q => (
						<button key={q} type="button" className="pill" onClick={() => onAsk(q)} disabled={busy}>
							{q}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default Ask
