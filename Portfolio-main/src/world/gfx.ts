// Pixel drawing kit: integer rects in local coordinates, sprites, bitmap text,
// and a palette tint so one set of colors reads as dawn, noon, sunset or night.
import { glyph } from './font'

export type RGB = [number, number, number]

export const rgb = (h: string): RGB => [
	parseInt(h.slice(1, 3), 16),
	parseInt(h.slice(3, 5), 16),
	parseInt(h.slice(5, 7), 16),
]

const hx = (n: number) => {
	const v = Math.max(0, Math.min(255, Math.round(n)))
	return (v < 16 ? '0' : '') + v.toString(16)
}

export const toHex = (c: RGB) => `#${hx(c[0])}${hx(c[1])}${hx(c[2])}`

export const mixRGB = (a: RGB, b: RGB, k: number): RGB => [
	a[0] + (b[0] - a[0]) * k,
	a[1] + (b[1] - a[1]) * k,
	a[2] + (b[2] - a[2]) * k,
]

export const mix = (a: string, b: string, k: number) => toHex(mixRGB(rgb(a), rgb(b), k))

/* ---------- light: the ambient tint and how far the lamps are on ---------- */

let amb: RGB = [255, 255, 255]
let lampK = 0
let hazeTo: RGB = [200, 220, 240]
let tintCache = new Map<string, string>()

export const setLight = (ambient: RGB, lamps: number, haze: RGB) => {
	amb = ambient
	lampK = lamps
	hazeTo = haze
	tintCache = new Map()
}

export const lamps = () => lampK

/** A surface color under the current light. */
export const T = (h: string) => {
	let v = tintCache.get(h)
	if (!v) {
		const c = rgb(h)
		v = toHex([(c[0] * amb[0]) / 255, (c[1] * amb[1]) / 255, (c[2] * amb[2]) / 255])
		tintCache.set(h, v)
	}
	return v
}

/** A lamp or window: its unlit surface by day, its own light after dark. */
export const L = (off: string, on: string, boost = 0) => {
	const key = `L${off}${on}${boost}`
	let v = tintCache.get(key)
	if (!v) {
		const k = Math.min(1, lampK + boost)
		v = toHex(mixRGB(rgb(T(off)), rgb(on), k))
		tintCache.set(key, v)
	}
	return v
}

/** A distant surface: tinted, then pushed toward the sky by k. */
export const F = (h: string, k: number) => {
	const key = `F${h}${k}`
	let v = tintCache.get(key)
	if (!v) {
		v = toHex(mixRGB(rgb(T(h)), hazeTo, k))
		tintCache.set(key, v)
	}
	return v
}

/* ---------- deterministic noise ---------- */

export const hash = (n: number) => {
	let x = Math.imul((n | 0) ^ 0x9e3779b9, 0x85ebca6b)
	x ^= x >>> 13
	x = Math.imul(x, 0xc2b2ae35)
	x ^= x >>> 16
	return (x >>> 0) / 4294967296
}

export const noise1 = (x: number, seed = 0) => {
	const i = Math.floor(x)
	const f = x - i
	const u = f * f * (3 - 2 * f)
	return hash(i + seed * 7919) * (1 - u) + hash(i + 1 + seed * 7919) * u
}

export const smooth = (u: number) => {
	const t = Math.max(0, Math.min(1, u))
	return t * t * (3 - 2 * t)
}

/* ---------- sprites ---------- */

export type Sprite = { w: number; h: number; runs: (number | string)[] }

/** Compile rows of characters; '.' is transparent, every other char is a palette key. */
export const sprite = (rows: string[]): Sprite => {
	const runs: (number | string)[] = []
	rows.forEach((row, y) => {
		let x = 0
		while (x < row.length) {
			const ch = row[x]
			if (ch === '.') {
				x++
				continue
			}
			let e = x
			while (e < row.length && row[e] === ch) e++
			runs.push(x, y, e - x, ch)
			x = e
		}
	})
	return { w: rows[0].length, h: rows.length, runs }
}

/* ---------- the drawing context ---------- */

export class Gfx {
	c: CanvasRenderingContext2D
	W: number
	H: number
	ox = 0
	oy = 0

	constructor(c: CanvasRenderingContext2D, W: number, H: number) {
		this.c = c
		this.W = W
		this.H = H
	}

	at(ox: number, oy: number) {
		this.ox = Math.round(ox)
		this.oy = Math.round(oy)
		return this
	}

	r(x: number, y: number, w: number, h: number, col: string) {
		if (w <= 0 || h <= 0) return
		this.c.fillStyle = col
		this.c.fillRect(Math.floor(this.ox + x), Math.floor(this.oy + y), Math.round(w), Math.round(h))
	}

	p(x: number, y: number, col: string) {
		this.r(x, y, 1, 1, col)
	}

	/** checkerboard of one color over a box: the pixel artist's 50% tone */
	d(x: number, y: number, w: number, h: number, col: string, phase = 0) {
		this.c.fillStyle = col
		const bx = Math.floor(this.ox + x)
		const by = Math.floor(this.oy + y)
		for (let j = 0; j < h; j++) {
			const start = (j + phase + bx + by) & 1
			for (let i = start; i < w; i += 2) this.c.fillRect(bx + i, by + j, 1, 1)
		}
	}

	spr(x: number, y: number, s: Sprite, pal: Record<string, string>, flip = false) {
		const runs = s.runs
		for (let i = 0; i < runs.length; i += 4) {
			const col = pal[runs[i + 3] as string]
			if (!col) continue
			const rx = runs[i] as number
			const w = runs[i + 2] as number
			this.r(flip ? x + s.w - rx - w : x + rx, y + (runs[i + 1] as number), w, 1, col)
		}
	}

	/** filled pixel disc */
	disc(cx: number, cy: number, r: number, col: string) {
		for (let y = -r; y <= r; y++) {
			const half = Math.floor(Math.sqrt(r * r - y * y + r * 0.8))
			this.r(cx - half, cy + y, half * 2 + 1, 1, col)
		}
	}

	/** bitmap text; returns its width */
	t(x: number, y: number, s: string, col: string, small = false) {
		let cx = x
		this.c.fillStyle = col
		for (const ch of s) {
			const g = glyph(ch, small)
			if (!g) {
				cx += 4
				continue
			}
			const runs = g.runs
			for (let i = 0; i < runs.length; i += 3) {
				this.c.fillRect(
					Math.floor(this.ox + cx + runs[i]),
					Math.floor(this.oy + y + g.dy + runs[i + 1]),
					runs[i + 2],
					1
				)
			}
			cx += g.w + 1
		}
		return cx - x - 1
	}
}
