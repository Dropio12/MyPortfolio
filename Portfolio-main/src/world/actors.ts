// People, the train and a few small machines: the moving parts of the world.
import { Gfx, L, T, hash, lamps, sprite } from './gfx'

/* ---------- people ---------- */

const WALK_A = sprite(['.hh.', '.ss.', 'cccc', 'cccc', 'ccc.', '.pp.', 'p..p', 'p..p'])
const WALK_B = sprite(['.hh.', '.ss.', 'cccc', 'cccc', '.ccc', '.pp.', '.pp.', '.pp.'])
const STAND = sprite(['.hh.', '.ss.', 'cccc', 'cccc', 'cccc', '.pp.', '.pp.', '.pp.'])

const SKIN = ['#f1c7a3', '#d9a07a', '#a8694a', '#7a4a32', '#e8b48e']
const HAIR = ['#2a1d18', '#5a3a22', '#c99a52', '#1b1b22', '#8a4a2a', '#d8d2c8']
const SHIRT = ['#d94f4f', '#2f6fb0', '#3f9a5a', '#e0a23a', '#6a5acd', '#2a2f3e', '#e66a9a', '#20a0a8']
const PANTS = ['#2a2f3e', '#3d4a6a', '#5a4a3a', '#22252e']

export const palFor = (seed: number, shirt?: string) => ({
	h: T(HAIR[Math.floor(hash(seed * 5 + 1) * HAIR.length)]),
	s: T(SKIN[Math.floor(hash(seed * 5 + 2) * SKIN.length)]),
	c: T(shirt || SHIRT[Math.floor(hash(seed * 5 + 3) * SHIRT.length)]),
	p: T(PANTS[Math.floor(hash(seed * 5 + 4) * PANTS.length)]),
})

/** A person pacing between x0 and x1; feet on y. */
export const walker = (
	g: Gfx,
	x0: number,
	x1: number,
	y: number,
	t: number,
	seed: number,
	extra?: 'bag' | 'pack' | 'case' | 'scarf'
) => {
	const span = x1 - x0
	const speed = 6 + hash(seed) * 6
	const d = (t * speed + hash(seed + 9) * span * 2) % (span * 2)
	const right = d < span
	const x = Math.round(right ? x0 + d : x1 - (d - span))
	const step = Math.floor(t * 4 + seed) % 2 === 0
	const pal = palFor(seed)
	g.spr(x, y - 8, step ? WALK_A : WALK_B, pal, !right)
	const back = right ? x - 1 : x + 4
	const front = right ? x + 4 : x - 1
	if (extra === 'bag') {
		g.r(front, y - 4, 2, 3, T(SHIRT[(seed + 3) % SHIRT.length]))
		g.p(front, y - 5, T('#2a2f3e'))
	} else if (extra === 'pack') g.r(back, y - 7, 1, 4, T('#3d4a6a'))
	else if (extra === 'case') g.r(front, y - 3, 2, 3, T('#4a3428'))
	else if (extra === 'scarf') g.r(x, y - 6, 4, 1, T('#d0323a'))
}

export const stander = (g: Gfx, x: number, y: number, seed: number, flip = false, shirt?: string) =>
	g.spr(x, y - 8, STAND, palFor(seed, shirt), flip)

/** head and shoulders, seen from behind: audiences and desks */
export const head = (g: Gfx, x: number, y: number, seed: number) => {
	const p = palFor(seed)
	g.r(x, y, 3, 2, p.h)
	g.r(x - 1, y + 2, 5, 2, p.c)
}

/* ---------- robots ---------- */

const ROBOT = sprite(['.eeee.', 'eVVVVe', '.eeee.', '..ee..', 'bbbbbb', 'bbLLbb', 'bbbbbb', '.b..b.', '.b..b.', 'bb..bb'])

export const robot = (g: Gfx, x: number, y: number, eye = '#6ff0ff') =>
	g.spr(x, y - 10, ROBOT, { e: T('#c9ced8'), V: eye, b: T('#9aa3b2'), L: '#ffcf4a' })

/* ---------- lines for arms and cranes ---------- */

export const seg = (g: Gfx, x0: number, y0: number, x1: number, y1: number, col: string, w = 1) => {
	const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1)
	for (let i = 0; i <= n; i++) {
		const x = Math.round(x0 + ((x1 - x0) * i) / n)
		const y = Math.round(y0 + ((y1 - y0) * i) / n)
		g.r(x, y, w, w, col)
	}
}

/* ---------- the train ---------- */

const car = (g: Gfx, x: number, w: number, stripe: string, front: boolean, rear: boolean, phase: number, seed: number) => {
	const body = T('#e8ecf1')
	const shade = T('#b9c2cd')
	const band = T('#2b3346')
	g.r(x, -25, w, 20, body)
	g.r(x, -25, w, 1, T('#ffffff'))
	g.r(x + 3, -27, w - 6, 2, T('#aeb6c2'))
	g.r(x + 10, -29, 12, 2, T('#97a0ad'))
	g.r(x, -6, w, 1, shade)
	// window band and windows, some with a passenger
	g.r(x + 2, -21, w - (front ? 9 : 4), 7, band)
	for (let k = 0; k < 5; k++) {
		const wx = x + 4 + k * 7
		if (front && wx > x + w - 13) break
		g.r(wx, -20, 5, 5, L('#7fa3c8', '#ffe39a'))
		g.p(wx, -20, L('#d6e8f7', '#fff4c8'))
		if (hash(seed * 13 + k) > 0.45) g.r(wx + 1 + (k % 2), -17, 2, 2, T('#2a2333'))
	}
	// doors
	for (const dx of [9, w - 15]) {
		if (front && dx > w - 15) continue
		g.r(x + dx, -22, 1, 16, shade)
		g.r(x + dx + 6, -22, 1, 16, shade)
	}
	// line stripe and skirt
	g.r(x, -12, w, 3, stripe)
	g.r(x, -9, w, 1, T('#c9d0da'))
	g.r(x + 1, -8, w - 2, 3, T('#8d96a3'))
	// bogies with turning wheels
	for (const bx of [5, w - 16]) {
		g.r(x + bx, -6, 11, 3, T('#2c3038'))
		for (const wx of [2, 8]) {
			const cx = x + bx + wx
			g.r(cx - 2, -5, 5, 3, T('#1c1f26'))
			g.r(cx - 1, -6, 3, 5, T('#1c1f26'))
			const hub = [
				[0, -1],
				[1, 0],
				[0, 1],
				[-1, 0],
			][phase & 3]
			g.p(cx + hub[0], -4 + hub[1], T('#a5adb8'))
		}
	}
	if (front) {
		// nose: a raked windscreen and the headlight
		for (let r = 0; r < 6; r++) g.r(x + w - 6 + r, -25 + r, 6 - r, 1, T('#1d2436'))
		g.r(x + w - 8, -21, 6, 7, T('#1d2436'))
		g.p(x + w - 6, -20, T('#6d86b0'))
		g.p(x + w - 5, -19, T('#6d86b0'))
		g.r(x + w - 9, -24, 4, 1, '#ffb547')
		g.r(x + w - 2, -11, 2, 2, L('#f4f1dc', '#fff8cc', 0.4))
	}
	if (rear) g.r(x, -11, 1, 2, '#ff4a3a')
}

export const TRAIN_HALF = 44

/** The train at screen x (its middle), wheels on the rail. */
export const drawTrain = (
	g: Gfx,
	x: number,
	gy: number,
	stripe: string,
	travel: number,
	moving: boolean
) => {
	const bob = moving && Math.floor(travel / 9) % 3 === 0 ? -1 : 0
	const phase = Math.floor(travel / 2)
	g.at(x - TRAIN_HALF, gy + bob)
	car(g, 0, 42, stripe, false, true, phase, 1)
	g.r(42, -10, 3, 2, T('#3a3f4c'))
	car(g, 45, 44, stripe, true, false, phase + 1, 2)
	const k = lamps()
	if (k > 0.25) {
		// headlight beam along the rail
		g.c.globalAlpha = (k - 0.25) * 0.26
		for (let i = 0; i < 46; i++) {
			const spread = Math.floor(i / 6)
			g.r(89 + i, -10 - spread, 1, 2 + spread * 2, '#fff3c4')
		}
		g.c.globalAlpha = 1
	}
	g.at(x - TRAIN_HALF, gy)
	if (moving && k > 0.3 && Math.floor(travel / 5) % 7 === 0) {
		g.p(12, -1, '#ffe08a')
		g.p(70, -1, '#ffe08a')
	}
}
