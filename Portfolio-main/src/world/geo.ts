// World geometry shared by every layer. Units are world pixels.
import { LineId } from '../content'

export type SceneId =
	| 'campus'
	| 'tower'
	| 'arena'
	| 'lecture'
	| 'datacenter'
	| 'street'
	| 'law'
	| 'studio'
	| 'hotel'
	| 'lab'
	| 'gym'
	| 'yard'
	| 'pcb'
	| 'workshop'
	| 'carlot'
	| 'trading'
	| 'depot'
	| 'terminus'

export type WorldStop = {
	scene: SceneId
	sign: string
	sub?: string
	lines: LineId[]
	primary: LineId
	hour: number
	/** half the platform length */
	platform?: number
}

export const GAP = 380
/** rows of ground below the rail */
export const GROUND = 18

export const stopX = (i: number) => i * GAP

export const LINE_COLOR: Record<LineId, string> = {
	S: '#00813f',
	A: '#f26a1b',
	F: '#0a5baa',
	R: '#ffc20e',
}

export const LINE_INK: Record<LineId, string> = {
	S: '#ffffff',
	A: '#17142a',
	F: '#ffffff',
	R: '#17142a',
}

export type Region = 'snow' | 'city' | 'works'

/** Laval and its approach are snowy; the jobs and clients run through the city; projects are the works. */
export const makeRegions = (stops: WorldStop[]) => {
	const first = (scene: SceneId) => stops.findIndex(s => s.scene === scene)
	const cityFrom = stopX(Math.max(1, first('tower'))) - GAP / 2
	const worksFrom = stopX(Math.max(1, first('gym'))) - GAP / 2
	return (x: number): Region => (x < cityFrom ? 'snow' : x < worksFrom ? 'city' : 'works')
}
