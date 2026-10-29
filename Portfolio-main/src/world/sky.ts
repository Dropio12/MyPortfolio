// Time of day: one palette per hour keyframe, a Bayer-dithered sky, sun, moon,
// stars and clouds. The ride starts at a snowy dawn and ends under the night sky.
import { Gfx, RGB, hash, mixRGB, rgb, toHex } from './gfx'

type Key = {
	h: number
	top: string
	mid: string
	bot: string
	amb: string
	lamps: number
	hill: string
	cloud: string
	cloudShade: string
	sun: string
}

const KEYS: Key[] = [
	{ h: 6.0, top: '#1d2b5c', mid: '#6a6aa6', bot: '#f0a58f', amb: '#b4b2d6', lamps: 0.9, hill: '#6c6ea6', cloud: '#f2c4c8', cloudShade: '#9c8cb8', sun: '#ffd0a0' },
	{ h: 7.4, top: '#4a74c0', mid: '#a3b9e2', bot: '#f8d6c6', amb: '#e2e4f4', lamps: 0.5, hill: '#8790c4', cloud: '#fff1ee', cloudShade: '#c4bfdc', sun: '#fff0d0' },
	{ h: 9.2, top: '#4c86d3', mid: '#94c1ec', bot: '#dcedf7', amb: '#f5f7fc', lamps: 0.1, hill: '#7c9cc6', cloud: '#ffffff', cloudShade: '#cfdcee', sun: '#fff8e2' },
	{ h: 12.5, top: '#3a82dc', mid: '#73b3ee', bot: '#c6e5f8', amb: '#ffffff', lamps: 0, hill: '#6f98c4', cloud: '#ffffff', cloudShade: '#d4e2f2', sun: '#fffbe8' },
	{ h: 15.5, top: '#437ecd', mid: '#87b5e4', bot: '#f0dfb6', amb: '#fff5e4', lamps: 0.04, hill: '#7e98b8', cloud: '#fffaf0', cloudShade: '#dccfc0', sun: '#fff0c0' },
	{ h: 17.3, top: '#4c6cb6', mid: '#c49c8e', bot: '#ffcd88', amb: '#ffe0bc', lamps: 0.25, hill: '#8a7f9e', cloud: '#ffe6c4', cloudShade: '#cf9a90', sun: '#ffc070' },
	{ h: 18.6, top: '#383d84', mid: '#c26d7f', bot: '#ffa05a', amb: '#f0b49e', lamps: 0.55, hill: '#7b5a86', cloud: '#ffc4a2', cloudShade: '#a86080', sun: '#ff9a50' },
	{ h: 19.6, top: '#252966', mid: '#8c4d7c', bot: '#ee7c56', amb: '#c49aaa', lamps: 0.82, hill: '#4f3f6c', cloud: '#d88a8e', cloudShade: '#6c3f68', sun: '#ff7a44' },
	{ h: 20.6, top: '#131944', mid: '#383a72', bot: '#875476', amb: '#8a8ab8', lamps: 1, hill: '#2a2c56', cloud: '#59507e', cloudShade: '#2f2c58', sun: '#ff6a40' },
	{ h: 22.0, top: '#060a22', mid: '#0e1640', bot: '#1d295a', amb: '#5c66a2', lamps: 1, hill: '#151c42', cloud: '#2a3260', cloudShade: '#1a2048', sun: '#ff6a40' },
]

export type Light = {
	hour: number
	top: RGB
	mid: RGB
	bot: RGB
	amb: RGB
	lamps: number
	hill: string
	cloud: string
	cloudShade: string
	sun: string
	night: number
}

const C = (a: string, b: string, k: number) => toHex(mixRGB(rgb(a), rgb(b), k))

export const lightAt = (hour: number): Light => {
	let i = 0
	while (i < KEYS.length - 2 && hour > KEYS[i + 1].h) i++
	const a = KEYS[i]
	const b = KEYS[i + 1]
	const k = Math.max(0, Math.min(1, (hour - a.h) / (b.h - a.h)))
	return {
		hour,
		top: mixRGB(rgb(a.top), rgb(b.top), k),
		mid: mixRGB(rgb(a.mid), rgb(b.mid), k),
		bot: mixRGB(rgb(a.bot), rgb(b.bot), k),
		amb: mixRGB(rgb(a.amb), rgb(b.amb), k),
		lamps: a.lamps + (b.lamps - a.lamps) * k,
		hill: C(a.hill, b.hill, k),
		cloud: C(a.cloud, b.cloud, k),
		cloudShade: C(a.cloudShade, b.cloudShade, k),
		sun: C(a.sun, b.sun, k),
		night: Math.max(0, Math.min(1, (hour - 19.8) / 1.6)),
	}
}

/* ---------- the dithered gradient ---------- */

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16)
const BANDS = 14

let skyKey = ''
let skyData: ImageData | null = null

const grad = (l: Light, t: number): RGB =>
	t < 0.55 ? mixRGB(l.top, l.mid, t / 0.55) : mixRGB(l.mid, l.bot, (t - 0.55) / 0.45)

export const drawSky = (g: Gfx, l: Light, horizon: number) => {
	const { W, H } = g
	const key = `${W}x${H}:${horizon}:${l.hour.toFixed(2)}`
	if (key !== skyKey || !skyData) {
		const data = skyData && skyData.width === W && skyData.height === H ? skyData : g.c.createImageData(W, H)
		const px = new Uint32Array(data.data.buffer)
		const steps: number[] = []
		for (let s = 0; s <= BANDS; s++) {
			const c = grad(l, s / BANDS)
			steps.push((255 << 24) | (Math.round(c[2]) << 16) | (Math.round(c[1]) << 8) | Math.round(c[0]))
		}
		for (let y = 0; y < H; y++) {
			const f = Math.min(1, y / horizon) * BANDS
			const base = Math.min(BANDS - 1, Math.floor(f))
			const frac = f - base
			const row = y * W
			const by = (y & 3) * 4
			for (let x = 0; x < W; x++) px[row + x] = frac > BAYER[by + (x & 3)] ? steps[base + 1] : steps[base]
		}
		skyData = data
		skyKey = key
	}
	g.c.putImageData(skyData, 0, 0)
}

/* ---------- stars, moon, sun ---------- */

const STARS = Array.from({ length: 90 }, (_, i) => ({
	x: hash(i * 3 + 1),
	y: hash(i * 3 + 2) * 0.62,
	b: hash(i * 3 + 3),
}))

export const drawStars = (g: Gfx, l: Light, t: number, camX: number) => {
	if (l.night <= 0.02) return
	const c = g.c
	const span = g.W + 40
	STARS.forEach((s, i) => {
		const tw = 0.6 + 0.4 * Math.sin(t * (1.3 + s.b * 2) + i)
		c.globalAlpha = Math.min(1, l.night * (0.35 + s.b * 0.75) * tw)
		const x = Math.floor((((s.x * span - camX * 0.015) % span) + span) % span) - 20
		const y = Math.floor(s.y * g.H)
		c.fillStyle = s.b > 0.8 ? '#fff6d8' : '#dfe6ff'
		c.fillRect(x, y, 1, 1)
		if (s.b > 0.93) {
			c.globalAlpha *= 0.55
			c.fillRect(x - 1, y, 3, 1)
			c.fillRect(x, y - 1, 1, 3)
		}
	})
	c.globalAlpha = 1
}

export const drawSunMoon = (g: Gfx, l: Light, horizon: number) => {
	const h = l.hour
	if (h < 20.2) {
		const e = Math.sin((Math.PI * (h - 5.6)) / 14.6)
		const r = Math.round(7 + (1 - Math.max(0, e)) * 5)
		const x = Math.round(g.W * 0.8)
		const y = Math.round(horizon + 4 - Math.max(-0.2, e) * horizon * 0.7)
		g.at(0, 0)
		// a soft halo in the sun's own color
		g.c.globalAlpha = 0.18
		g.disc(x, y, r + 6, l.sun)
		g.c.globalAlpha = 0.3
		g.disc(x, y, r + 3, l.sun)
		g.c.globalAlpha = 1
		g.disc(x, y, r, l.sun)
		g.disc(x - 1, y - 1, Math.max(1, r - 3), '#fffdf4')
	}
	if (l.night > 0) {
		const x = Math.round(g.W * 0.66)
		const y = Math.round(g.H * 0.16)
		g.at(0, 0)
		g.c.globalAlpha = l.night * 0.25
		g.disc(x, y, 12, '#c8d2ff')
		g.c.globalAlpha = l.night
		g.disc(x, y, 8, '#f3f0dc')
		g.p(x - 3, y - 2, '#d9d5bd')
		g.p(x - 2, y - 2, '#d9d5bd')
		g.p(x + 2, y + 2, '#d9d5bd')
		g.p(x + 3, y - 4, '#d9d5bd')
		g.r(x - 1, y + 3, 2, 1, '#d9d5bd')
		g.c.globalAlpha = 1
	}
}

/* ---------- clouds: cumulus heaps with flat bottoms, lit from above ---------- */

const CLOUDS = Array.from({ length: 7 }, (_, i) => ({
	x: hash(i * 11 + 5),
	y: hash(i * 11 + 6),
	w: 22 + Math.floor(hash(i * 11 + 7) * 34),
	speed: 0.6 + hash(i * 11 + 8) * 1.2,
}))

/** the top half of a disc, cut flat one row under its middle */
const dome = (g: Gfx, cx: number, base: number, r: number, col: string) => {
	for (let y = -r; y <= 0; y++) {
		const half = Math.floor(Math.sqrt(r * r - y * y + r * 0.6))
		g.r(cx - half, base + y, half * 2 + 1, 1, col)
	}
}

export const drawClouds = (g: Gfx, l: Light, t: number, camX: number) => {
	const span = g.W + 140
	g.at(0, 0)
	CLOUDS.forEach((cl, i) => {
		const x = Math.floor(((((cl.x * span - camX * 0.05 - t * cl.speed) % span) + span) % span) - 70)
		const base = Math.floor(10 + cl.y * g.H * 0.36)
		const n = Math.max(3, Math.floor(cl.w / 7))
		const puffs: [number, number][] = []
		for (let k = 0; k < n; k++) {
			const u = k / (n - 1)
			const r = Math.round(3 + Math.sin(u * Math.PI) * (4 + cl.w / 12) + hash(i * 31 + k) * 2)
			puffs.push([x + Math.round(u * cl.w), r])
		}
		puffs.forEach(([cx, r]) => dome(g, cx, base + 2, r, l.cloudShade))
		puffs.forEach(([cx, r]) => dome(g, cx, base, r, l.cloud))
		g.r(x - 2, base + 1, cl.w + 4, 2, l.cloudShade)
		puffs.forEach(([cx, r]) => g.r(cx - Math.floor(r / 2), base - r + 1, Math.max(1, r - 1), 1, mixHi(l.cloud)))
	})
}

const hiCache = new Map<string, string>()
const mixHi = (c: string) => {
	let v = hiCache.get(c)
	if (!v) {
		v = toHex(mixRGB(rgb(c), [255, 255, 255], 0.55))
		hiCache.set(c, v)
	}
	return v
}

/* ---------- birds by day, a plane drawing its contrail ---------- */

export const drawFlyers = (g: Gfx, l: Light, t: number, camX: number) => {
	const day = l.lamps < 0.5
	if (!day) return
	g.at(0, 0)
	const span = g.W + 80
	const ink = toHex(mixRGB(l.top, [20, 22, 40], 0.7))
	for (let i = 0; i < 5; i++) {
		const x = Math.floor(((((g.W + 40 - t * 9 - i * 9 + camX * 0.03) % span) + span) % span) - 40)
		const y = Math.floor(g.H * 0.22 + (i % 2) * 4 + i * 2 + Math.sin(t * 2 + i) * 1.5)
		const up = Math.floor(t * 5 + i) % 2 === 0
		g.p(x, y, ink)
		g.p(x - 1, y - (up ? 1 : 0), ink)
		g.p(x + 1, y - (up ? 1 : 0), ink)
		g.p(x - 2, y - (up ? 2 : 0), ink)
		g.p(x + 2, y - (up ? 2 : 0), ink)
	}
	const pspan = g.W * 3
	const px = Math.floor((((t * 14 - camX * 0.01) % pspan) + pspan) % pspan) - g.W
	const py = Math.floor(g.H * 0.1)
	if (px > -10 && px < g.W + 10) {
		g.c.globalAlpha = 0.55
		g.r(px - 80, py + 1, 76, 1, '#ffffff')
		g.c.globalAlpha = 0.3
		g.r(px - 140, py + 1, 60, 1, '#ffffff')
		g.c.globalAlpha = 1
		g.r(px - 3, py, 8, 2, '#e8ecf3')
		g.r(px - 3, py - 2, 2, 2, '#e8ecf3')
		g.r(px + 1, py + 2, 3, 1, '#c3cad6')
		g.p(px + 5, py + 1, '#9aa3b2')
	}
}
