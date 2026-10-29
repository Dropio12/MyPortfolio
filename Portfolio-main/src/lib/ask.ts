import { Role, itemById } from '../content'
import { Answer, answerLocal, extract } from './answer'

// Asks our own /api/ask first (an AI model, grounded in this page's facts) and falls back to the
// local matcher whenever the function is missing, not configured (503), busy (429) or slow.
// Visitor text goes to /api/ask and nowhere else. Fixed answers (pay, work status, references,
// verdicts) never leave the browser.

export type AiState = 'unknown' | 'live' | 'off'

let state: AiState = 'unknown'
const listeners = new Set<(s: AiState) => void>()

const setState = (s: AiState) => {
	if (s === state) return
	state = s
	listeners.forEach(l => l(s))
}

export const aiState = () => state

export const onAiState = (fn: (s: AiState) => void) => {
	listeners.add(fn)
	return () => {
		listeners.delete(fn)
	}
}

const TIMEOUT_MS = 15000
export const MAX_CHARS = 6000

type ApiReply = { kind?: string; text?: unknown; items?: unknown }

export const ask = async (question: string, selected: Role[]): Promise<Answer | null> => {
	const local = answerLocal(question, selected)
	if (!local) return null
	if (local.kind === 'scripted' || state === 'off') return local

	const controller = new AbortController()
	const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)
	try {
		const res = await fetch('/api/ask', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ question: question.slice(0, MAX_CHARS), roles: selected }),
			signal: controller.signal,
		})
		const isJson = (res.headers.get('content-type') || '').includes('application/json')
		if (!isJson || res.status === 404 || res.status === 405 || res.status === 503) {
			// no function, or no key yet: stop asking for this visit
			setState('off')
			return local
		}
		if (res.status === 429) return { ...local, note: 'The AI is busy right now, so this answer comes straight from the page’s facts.' }
		if (!res.ok) return local
		const data = (await res.json()) as ApiReply
		if (typeof data.text !== 'string' || !data.text.trim()) return local
		const ids = Array.isArray(data.items) ? data.items.filter((x): x is string => typeof x === 'string' && !!itemById(x)) : []
		setState('live')
		const found = extract(question)
		return {
			...local,
			kind: data.kind === 'scripted' ? 'scripted' : 'ai',
			heading: local.heading,
			paragraphs: data.text
				.split(/\n{2,}/)
				.map(p => p.trim())
				.filter(Boolean),
			// the evidence rows always come from the page: the model only picks which ones
			evidence: ids.length
				? ids.slice(0, 4).map(id => ({ id, tags: itemById(id)!.tags.filter(t => found.tags.includes(t)) }))
				: local.evidence,
			suggestions: undefined,
		}
	} catch {
		return local
	} finally {
		window.clearTimeout(timer)
	}
}
