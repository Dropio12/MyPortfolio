// What the prompt bar is doing, read by the agent shape on every frame (no React renders).
// typing: brighter; listening: a pulse driven by the mic level; busy: a shimmer; done: it settles.
// The mic level comes from Web Audio on desktop only. The stream is read for its loudness and
// dropped the moment listening stops; nothing is recorded or sent anywhere.

type State = {
	typedAt: number
	listening: boolean
	busy: boolean
	doneAt: number
	focused: boolean
}

export const agent: State = { typedAt: 0, listening: false, busy: false, doneAt: 0, focused: false }

export const agentTyped = () => {
	agent.typedAt = performance.now()
}

export const agentFocus = (on: boolean) => {
	agent.focused = on
}

export const agentBusy = (on: boolean) => {
	if (agent.busy && !on) agent.doneAt = performance.now()
	agent.busy = on
}

/* ---------- the mic level ---------- */

let stream: MediaStream | null = null
let ctx: AudioContext | null = null
let analyser: AnalyserNode | null = null
let buf: Uint8Array | null = null
let wanted = false

// phones and tablets share one microphone between speech recognition and Web Audio badly,
// so they get a gentle synthetic pulse instead of a second capture
const canMeter = () =>
	typeof window !== 'undefined' &&
	!!navigator.mediaDevices?.getUserMedia &&
	window.matchMedia('(pointer: fine)').matches &&
	!!(window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)

const stopMeter = () => {
	stream?.getTracks().forEach(t => t.stop())
	stream = null
	analyser = null
	buf = null
	ctx?.close().catch(() => undefined)
	ctx = null
}

export const agentListening = (on: boolean) => {
	agent.listening = on
	wanted = on
	if (!on) stopMeter()
}

/** called once speech recognition has the microphone, so the browser asks for it only once */
export const agentMeter = () => {
	if (!wanted || stream || !canMeter()) return
	navigator.mediaDevices
		.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
		.then(s => {
			if (!wanted) {
				s.getTracks().forEach(t => t.stop())
				return
			}
			const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
			stream = s
			ctx = new AC()
			const src = ctx.createMediaStreamSource(s)
			analyser = ctx.createAnalyser()
			analyser.fftSize = 512
			analyser.smoothingTimeConstant = 0.6
			src.connect(analyser)
			buf = new Uint8Array(analyser.fftSize)
		})
		.catch(() => undefined)
}

/** loudness 0..1 while listening; -1 when there is no real level to read */
export const agentLevel = () => {
	if (!analyser || !buf) return -1
	analyser.getByteTimeDomainData(buf)
	let sum = 0
	for (let i = 0; i < buf.length; i++) {
		const v = (buf[i] - 128) / 128
		sum += v * v
	}
	return Math.min(1, Math.sqrt(sum / buf.length) * 4.5)
}
