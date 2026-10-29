import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Role, itemById } from '../content'
import { Answer, looksLikePosting, questionsFor } from '../lib/answer'
import { MAX_CHARS, ask } from '../lib/ask'
import { tagById } from '../lib/vocab'
import { Art } from './Art'
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
	const heading = useRef<HTMLHeadingElement>(null)
	return (
		<article className={`answer answer--${answer.kind}`} aria-labelledby="answer-title">
			<div className="answer__head">
				<p className="answer__prompt">
					<span className="sr-only">You asked: </span>
					{answer.prompt}
				</p>
				<button type="button" className="icon-btn answer__close" onClick={onClear} aria-label="Clear the answer">
					<IconClose />
				</button>
			</div>
			<h2 id="answer-title" ref={heading} className={answer.heading ? 'answer__title' : 'sr-only'}>
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
				<span className="answer__mode">
					<IconFacts />
					{modeLabel[answer.kind]}
				</span>
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

const Ask = ({ roles, answer, onAnswer, onClear, onShowMe, onApply }: Props) => {
	const [text, setText] = useState('')
	const [busy, setBusy] = useState(false)
	const input = useRef<HTMLTextAreaElement>(null)
	const how = useRef<'typed' | 'pasted' | 'suggested' | 'voice'>('typed')
	const canVoice = useRef(voiceSupported()).current
	const voice = useVoice((heard, final) => {
		setText(heard)
		how.current = 'voice'
		if (final) input.current?.focus()
	})

	// grow the box with its text, up to a limit
	useLayoutEffect(() => {
		const el = input.current
		if (!el) return
		el.style.height = 'auto'
		el.style.height = `${Math.min(el.scrollHeight, 220)}px`
	}, [text])

	const submit = async (q: string, via: typeof how.current) => {
		const question = q.trim()
		if (!question || busy) return
		if (voice.listening) voice.stop()
		setBusy(true)
		try {
			const a = await ask(question, roles)
			if (a) {
				onAnswer(a, via)
				// the answer echoes what was asked, so the bar is ready for the next question
				setText('')
			}
		} finally {
			setBusy(false)
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

	return (
		<div className="ask">
			<form
				className={`ask__bar${listening ? ' is-listening' : ''}${busy ? ' is-busy' : ''}`}
				onSubmit={e => {
					e.preventDefault()
					void submit(text, how.current)
				}}
			>
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
					placeholder={listening ? 'Listening. Your words land here to review before you send.' : 'Paste a job posting, see why Anass fits.'}
					onChange={e => {
						setText(e.target.value)
						how.current = 'typed'
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
				<div className="ask__tools">
					<p id="ask-hint" className="ask__hint">
						{busy ? (
							'Reading the page’s facts…'
						) : (
							<>
								Ask anything about his work.<span className="ask__keys"> Enter to send, Shift+Enter for a new line.</span>
							</>
						)}
					</p>
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
			{voice.error && (
				<p className="ask__error" role="status">
					{voice.error}
				</p>
			)}
			<div className="try" aria-label="Suggested questions" role="group">
				<span className="try__label">Try</span>
				{questions.map(q => (
					<button key={q} type="button" className="pill" onClick={() => onAsk(q)} disabled={busy}>
						{q}
					</button>
				))}
			</div>
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
		</div>
	)
}

export default Ask
