import { useCallback, useEffect, useRef, useState } from 'react'

// Voice input through the browser's own speech recognition. The words land in the prompt bar for
// review; nothing is sent until the visitor presses send, and no audio is kept by this site.

type Recognition = {
	lang: string
	interimResults: boolean
	continuous: boolean
	maxAlternatives: number
	start: () => void
	stop: () => void
	abort: () => void
	onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null
	onerror: ((e: { error: string }) => void) | null
	onend: (() => void) | null
}

type Ctor = new () => Recognition

const getCtor = (): Ctor | null => {
	if (typeof window === 'undefined') return null
	const w = window as unknown as { SpeechRecognition?: Ctor; webkitSpeechRecognition?: Ctor }
	return w.SpeechRecognition || w.webkitSpeechRecognition || null
}

export const voiceSupported = () => !!getCtor()

export const useVoice = (onText: (text: string, final: boolean) => void) => {
	const [listening, setListening] = useState(false)
	const [error, setError] = useState('')
	const rec = useRef<Recognition | null>(null)
	const textRef = useRef(onText)
	textRef.current = onText

	const stop = useCallback(() => {
		rec.current?.stop()
	}, [])

	const start = useCallback((prefix: string) => {
		const C = getCtor()
		if (!C) return
		setError('')
		const r = new C()
		r.lang = navigator.language || 'en-US'
		r.interimResults = true
		r.continuous = false
		r.maxAlternatives = 1
		const lead = prefix.trim() ? `${prefix.trim()} ` : ''
		r.onresult = e => {
			let heard = ''
			let final = false
			for (let i = 0; i < e.results.length; i++) {
				heard += e.results[i][0].transcript
				final = e.results[i].isFinal
			}
			textRef.current(lead + heard.trim(), final)
		}
		r.onerror = e => {
			if (e.error === 'not-allowed' || e.error === 'service-not-allowed')
				setError('Microphone access is blocked. You can type your question instead.')
			else if (e.error === 'no-speech') setError('No speech heard. Try again, or type your question.')
			else if (e.error !== 'aborted') setError('Voice input stopped. You can type your question instead.')
		}
		r.onend = () => {
			setListening(false)
			rec.current = null
		}
		rec.current = r
		try {
			r.start()
			setListening(true)
		} catch {
			setError('Voice input could not start. You can type your question instead.')
		}
	}, [])

	useEffect(() => () => rec.current?.abort(), [])

	return { listening, error, start, stop, clearError: () => setError('') }
}
