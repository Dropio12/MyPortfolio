// The parallax layers between the sky and the stations: far hills, a hazy skyline,
// a mid city that changes with the region, roadside things, the ground and the track.
import { F, Gfx, L, T, hash, lamps, mix, noise1 } from './gfx'
import { Light } from './sky'
import { GAP, Region } from './geo'

/* ---------- far hills: the Laurentians, snow-capped at the start ---------- */

export const drawHills = (g: Gfx, l: Light, camX: number, base: number, snowK: number) => {
	g.at(0, 0)
	const tall = Math.max(1, g.H / 190)
	const body = l.hill
	const cap = mix(l.hill, '#ffffff', 0.5 * snowK)
	const shade = mix(l.hill, '#1a1c3a', 0.12)
	let runStart = 0
	let runH = -1
	const flush = (x: number) => {
		if (runH < 0) return
		const w = x - runStart
		g.r(runStart, base - runH, w, runH + 30, body)
		if (snowK > 0.02) g.r(runStart, base - runH, w, 2, cap)
	}
	for (let x = 0; x <= g.W; x++) {
		const fx = x + camX * 0.07
		const h = x === g.W ? -2 : Math.round((16 + 24 * noise1(fx / 74, 1) + 8 * noise1(fx / 23, 2)) * tall)
		if (h !== runH) {
			flush(x)
			runStart = x
			runH = h
		}
	}
	// a second, nearer ridge in a deeper tone
	runH = -1
	for (let x = 0; x <= g.W; x++) {
		const fx = x + camX * 0.11
		const h = x === g.W ? -2 : Math.round((6 + 12 * noise1(fx / 52, 5)) * tall)
		if (h !== runH) {
			if (runH >= 0) g.r(runStart, base - runH + 4, x - runStart, runH + 26, shade)
			runStart = x
			runH = h
		}
	}
}

/* ---------- far skyline: silhouettes that light up after dusk ---------- */

export const drawSkyline = (g: Gfx, camX: number, base: number, cityK: number, t: number) => {
	if (cityK <= 0.01) return
	g.at(0, 0)
	const p = 0.18
	const slot = 13
	const off = camX * p
	const s0 = Math.floor(off / slot) - 1
	const s1 = s0 + Math.ceil(g.W / slot) + 2
	const body = F('#46527a', 0.55)
	const lit = lamps()
	for (let s = s0; s <= s1; s++) {
		const h1 = hash(s * 13 + 1)
		if (h1 < 0.12) continue
		const w = 8 + Math.floor(hash(s * 13 + 2) * 9)
		const ht = Math.floor((14 + hash(s * 13 + 3) * 46) * cityK * Math.max(1, g.H / 210))
		if (ht < 4) continue
		const x = Math.floor(s * slot - off)
		g.r(x, base - ht, w, ht + 20, body)
		if (hash(s * 13 + 4) > 0.7) g.r(x + Math.floor(w / 2), base - ht - 5, 1, 5, body)
		if (lit > 0.3) {
			g.c.globalAlpha = Math.min(1, (lit - 0.3) * 1.6)
			for (let wy = base - ht + 3; wy < base - 2; wy += 3) {
				for (let wx = x + 1; wx < x + w - 1; wx += 2) {
					if (hash(wx * 31 + wy * 7 + s) > 0.78) g.p(wx, wy, '#ffd98a')
				}
			}
			g.c.globalAlpha = 1
		}
		if (hash(s * 13 + 5) > 0.82 && Math.floor(t * 1.5 + s) % 3 === 0) g.p(x + Math.floor(w / 2), base - ht - 6, '#ff5a4a')
	}
}

/* ---------- mid layer: forest and houses, city blocks, then the works ---------- */

const FACADES = ['#9b8577', '#8d8f9c', '#a8907a', '#7f8a99', '#9c8c95', '#8a9488', '#b09a86']

const pine = (g: Gfx, x: number, y: number, h: number, body: string, snow: string | null) => {
	const tiers = h > 16 ? 4 : 3
	const th = Math.floor(h / tiers) + 2
	for (let k = 0; k < tiers; k++) {
		const top = y - h + k * (th - 2)
		for (let r = 0; r < th; r++) {
			const half = Math.floor((r + k * 1.6) * 0.62) + 1
			g.r(x - half, top + r, half * 2 + 1, 1, body)
			if (snow && r === 1) g.r(x - half, top + r, half * 2 + 1, 1, snow)
		}
	}
	g.r(x, y, 1, 2, body)
}

export const drawMid = (
	g: Gfx,
	camX: number,
	focal: number,
	base: number,
	region: (x: number) => Region,
	t: number
) => {
	g.at(0, 0)
	const p = 0.42
	const slot = 30
	const off = camX * p - focal * p
	const s0 = Math.floor(off / slot) - 1
	const s1 = s0 + Math.ceil(g.W / slot) + 2
	const haze = 0.32
	for (let s = s0; s <= s1; s++) {
		const x = Math.floor(s * slot - off)
		const wx = (s * slot) / p
		const reg = region(wx)
		const h1 = hash(s * 17 + 1)
		const h2 = hash(s * 17 + 2)
		const h3 = hash(s * 17 + 3)
		if (reg === 'snow') {
			const body = F('#2f5546', haze)
			const snow = F('#f2f5fa', haze)
			pine(g, x + 6, base, 16 + Math.floor(h1 * 12), body, snow)
			pine(g, x + 17, base, 12 + Math.floor(h2 * 10), body, snow)
			if (h3 > 0.55) {
				const hx = x + 20
				g.r(hx, base - 10, 14, 10, F('#a7765e', haze))
				g.r(hx - 1, base - 13, 16, 3, F('#f4f6fb', haze))
				g.r(hx + 3, base - 7, 2, 3, L('#5b6680', '#ffd68a'))
				g.r(hx + 9, base - 7, 2, 3, L('#5b6680', '#ffd68a'))
			} else pine(g, x + 26, base, 10 + Math.floor(h3 * 8), body, snow)
			continue
		}
		if (reg === 'works') {
			const wall = F(h1 > 0.5 ? '#8a5d4c' : '#6f7684', haze)
			const roof = F('#4c4f5c', haze)
			const w = 24 + Math.floor(h2 * 6)
			const ht = 14 + Math.floor(h3 * 14)
			g.r(x, base - ht, w, ht + 4, wall)
			for (let k = 0; k < w; k += 6) {
				g.r(x + k, base - ht - 3, 3, 3, roof)
				g.r(x + k + 3, base - ht - 1, 3, 1, roof)
			}
			for (let k = 2; k < w - 2; k += 4) g.r(x + k, base - ht + 4, 2, 3, L('#5c6070', '#ffcf7a'))
			if (h1 > 0.62) {
				g.r(x + w - 6, base - ht - 16, 3, 16, F('#7a5246', haze))
				const puff = Math.floor(t * 2 + s) % 4
				g.c.globalAlpha = 0.55
				g.disc(x + w - 5 + puff, base - ht - 19 - puff * 2, 2 + (puff >> 1), F('#d7d4d8', haze))
				g.c.globalAlpha = 1
			}
			continue
		}
		// city block
		const w = 18 + Math.floor(h1 * 12)
		const ht = 26 + Math.floor(h2 * 52)
		const face = F(FACADES[Math.floor(h3 * FACADES.length)], haze)
		const edge = F('#3f4558', haze + 0.1)
		g.r(x, base - ht, w, ht + 4, face)
		g.r(x + w - 1, base - ht, 1, ht + 4, edge)
		g.r(x - 1, base - ht - 1, w + 2, 2, edge)
		const off2 = F('#55607a', haze)
		for (let wy = base - ht + 4; wy < base - 3; wy += 5) {
			for (let wxp = x + 2; wxp < x + w - 2; wxp += 4) {
				const on = hash(wxp * 13 + wy * 3 + s) > 0.5
				g.r(wxp, wy, 2, 3, on ? L('#55607a', '#ffd98a') : off2)
			}
		}
		const roofKind = hash(s * 17 + 4)
		if (roofKind > 0.78) {
			// water tower
			const tx = x + 3
			g.r(tx, base - ht - 9, 7, 6, F('#7a5a48', haze))
			g.r(tx - 1, base - ht - 10, 9, 1, F('#5a4034', haze))
			g.r(tx + 1, base - ht - 3, 1, 3, edge)
			g.r(tx + 5, base - ht - 3, 1, 3, edge)
		} else if (roofKind > 0.58) {
			g.r(x + Math.floor(w / 2), base - ht - 10, 1, 10, edge)
			if (Math.floor(t * 1.2 + s) % 2 === 0) g.p(x + Math.floor(w / 2), base - ht - 11, '#ff4a3a')
		} else if (roofKind > 0.3) {
			g.r(x + 2, base - ht - 3, 5, 3, F('#9aa1ae', haze))
			g.r(x + w - 8, base - ht - 2, 4, 2, F('#9aa1ae', haze))
		}
	}
}

/* ---------- roadside things between stations ---------- */

type Item = { x: number; kind: string; v: number }

export const makeFiller = (count: number, region: (x: number) => Region) => {
	const items: Item[] = []
	const poles: number[] = []
	const last = (count - 1) * GAP
	const clear = (x: number, pad: number) => {
		const i = Math.round(x / GAP)
		return i < 0 || i >= count || Math.abs(x - i * GAP) > pad
	}
	let x = -560
	let n = 0
	while (x < last + 640) {
		n++
		const h = hash(n * 7 + 3)
		if (clear(x, 152)) {
			const reg = region(x)
			let kind = 'bush'
			if (reg === 'snow') kind = h < 0.5 ? 'pine' : h < 0.66 ? 'fence' : h < 0.78 ? 'house' : h < 0.86 ? 'snowman' : 'lamp'
			else if (reg === 'city') kind = h < 0.32 ? 'tree' : h < 0.5 ? 'lamp' : h < 0.64 ? 'bench' : h < 0.76 ? 'shelter' : 'bush'
			else kind = h < 0.34 ? 'container' : h < 0.52 ? 'lamp' : h < 0.68 ? 'fence' : h < 0.8 ? 'tank' : 'bush'
			items.push({ x, kind, v: hash(n * 7 + 5) })
		}
		x += 30 + Math.floor(hash(n * 7 + 9) * 34)
	}
	for (let p = -540; p < last + 620; p += 104) if (clear(p, 166)) poles.push(p)
	return { items, poles }
}

const lampPost = (g: Gfx, x: number, y: number) => {
	const pole = T('#3a3e4c')
	g.r(x, y - 22, 1, 22, pole)
	g.r(x - 1, y - 23, 4, 1, pole)
	g.r(x + 1, y - 22, 3, 2, L('#c8ccd6', '#fff2c0'))
	const k = lamps()
	if (k > 0.2) {
		g.c.globalAlpha = (k - 0.2) * 0.32
		g.disc(x + 2, y - 18, 6, '#ffe7a0')
		g.r(x - 4, y - 2, 13, 2, '#ffe7a0')
		g.c.globalAlpha = 1
	}
}

export const drawFiller = (
	g: Gfx,
	filler: { items: Item[]; poles: number[] },
	camX: number,
	focal: number,
	gy: number
) => {
	const left = camX - focal - 40
	const right = camX - focal + g.W + 40
	const y = -3
	// poles and their wires first, so trees can stand in front
	const poles = filler.poles
	for (let i = 0; i < poles.length; i++) {
		const px = poles[i]
		if (px < left - 110 || px > right + 110) continue
		g.at(px - camX + focal, gy)
		const wood = T('#5a4636')
		g.r(0, y - 40, 2, 40, wood)
		g.r(-4, y - 37, 10, 1, wood)
		g.p(-4, y - 38, T('#c9ccd4'))
		g.p(5, y - 38, T('#c9ccd4'))
		const next = poles[i + 1]
		if (next !== undefined && next - px < 120) {
			const span = next - px
			const wire = T('#2b2d38')
			for (let k = 0; k <= span; k += 1) {
				const u = k / span
				const sag = Math.round(5 * 4 * u * (1 - u))
				g.p(-4 + k, y - 38 + sag, wire)
				g.p(5 + k, y - 38 + sag, wire)
			}
		}
	}
	for (const it of filler.items) {
		if (it.x < left || it.x > right) continue
		g.at(it.x - camX + focal, gy)
		switch (it.kind) {
			case 'pine':
				pine(g, 0, y, 18 + Math.floor(it.v * 14), T('#2c5545'), T('#f4f7fb'))
				break
			case 'fence': {
				const wood = T(it.v > 0.5 ? '#8a6a52' : '#6f7480')
				for (let k = 0; k < 22; k += 4) g.r(k, y - 7, 1, 7, wood)
				g.r(0, y - 6, 22, 1, wood)
				g.r(0, y - 3, 22, 1, wood)
				break
			}
			case 'house': {
				g.r(-10, y - 14, 22, 14, T(it.v > 0.5 ? '#b0604c' : '#5f7d96'))
				for (let k = 0; k < 7; k++) g.r(-12 + k, y - 15 - k, 26 - k * 2, 1, T('#f4f7fb'))
				g.r(-6, y - 9, 4, 4, L('#4c5872', '#ffd27a'))
				g.r(4, y - 9, 4, 4, L('#4c5872', '#ffd27a'))
				g.r(-1, y - 7, 3, 7, T('#4a3428'))
				g.r(6, y - 23, 3, 6, T('#7a4a3c'))
				break
			}
			case 'snowman': {
				g.disc(0, y - 3, 3, T('#f6f8fc'))
				g.disc(0, y - 9, 2, T('#f6f8fc'))
				g.p(-1, y - 10, '#1b1d28')
				g.p(1, y - 10, '#1b1d28')
				g.p(0, y - 9, T('#f08a2c'))
				g.r(-2, y - 7, 5, 1, T('#d0323a'))
				g.r(-2, y - 13, 5, 2, T('#23252e'))
				break
			}
			case 'lamp':
				lampPost(g, 0, y)
				break
			case 'tree': {
				g.r(0, y - 9, 2, 9, T('#5e4334'))
				const leaf = T(it.v > 0.5 ? '#3f7a3c' : '#4f8a3a')
				g.disc(1, y - 15, 6, T('#2f5e33'))
				g.disc(0, y - 16, 5, leaf)
				g.disc(-1, y - 18, 2, T('#7cb05a'))
				break
			}
			case 'bench':
				g.r(-6, y - 4, 13, 1, T('#8a5a3a'))
				g.r(-6, y - 7, 13, 1, T('#8a5a3a'))
				g.r(-5, y - 3, 1, 3, T('#33353f'))
				g.r(5, y - 3, 1, 3, T('#33353f'))
				break
			case 'shelter':
				g.r(-10, y - 18, 22, 2, T('#3d4252'))
				g.r(-9, y - 16, 1, 16, T('#3d4252'))
				g.r(10, y - 16, 1, 16, T('#3d4252'))
				g.r(-8, y - 15, 17, 11, L('#9cc4d8', '#d8ecf4'))
				g.r(-8, y - 15, 17, 1, T('#c8e2ee'))
				g.r(-6, y - 13, 6, 8, T('#e0703c'))
				break
			case 'container': {
				const cols = ['#a7553a', '#2f6f8a', '#c9902f', '#4d7a4a']
				const c1 = T(cols[Math.floor(it.v * 4)])
				g.r(-12, y - 10, 24, 10, c1)
				for (let k = -11; k < 12; k += 2) g.r(k, y - 9, 1, 8, T('#2a2a32'))
				if (it.v > 0.4) g.r(-8, y - 19, 22, 9, T(cols[Math.floor(it.v * 7) % 4]))
				break
			}
			case 'tank':
				g.r(-8, y - 16, 16, 16, T('#a9adb6'))
				g.r(-8, y - 17, 16, 1, T('#d9dce2'))
				g.r(5, y - 16, 3, 16, T('#8a8f99'))
				g.r(-6, y - 12, 12, 1, T('#7b808a'))
				break
			default: {
				const leaf = T('#3f6e3a')
				g.disc(0, y - 3, 4, leaf)
				g.disc(-1, y - 4, 2, T('#5f9a4a'))
			}
		}
	}
}

/* ---------- ground and track ---------- */

const GROUND_COL: Record<Region, [string, string, string]> = {
	snow: ['#eef2f8', '#cbd5e6', '#ffffff'],
	city: ['#6f8a4e', '#5a7440', '#86a25e'],
	works: ['#6a5f55', '#564c44', '#7d7268'],
}

export const drawGround = (
	g: Gfx,
	camX: number,
	focal: number,
	gy: number,
	region: (x: number) => Region
) => {
	g.at(0, gy)
	const worldLeft = camX - focal
	// verge behind the track and ground in front, in 8px chunks so regions blend
	const step = 8
	const start = -(((Math.floor(worldLeft) % step) + step) % step)
	for (let x = start; x < g.W; x += step) {
		const wx = Math.floor(worldLeft + x)
		const reg = region(wx)
		const [base, shade, light] = GROUND_COL[reg]
		g.r(x, -4, step, 2, T(light))
		g.r(x, 6, step, g.H - gy, T(base))
		g.r(x, 6, step, 1, T(light))
		const hv = hash(Math.floor(wx / step))
		g.r(x + Math.floor(hv * 6), 9 + Math.floor(hv * 5), 2, 1, T(shade))
		g.r(x + Math.floor(hv * 3), 13, 1, 1, T(shade))
	}
	// ballast
	g.r(0, -2, g.W, 8, T('#77706a'))
	const s0 = -(((Math.floor(worldLeft) % 6) + 6) % 6)
	for (let x = s0; x < g.W; x += 6) {
		const hv = hash(Math.floor((worldLeft + x) / 6) * 3 + 1)
		g.r(x + 1, 0, 3, 2, T('#4a3a30'))
		g.p(x + Math.floor(hv * 5), 3, T('#958d84'))
		g.p(x + Math.floor(hv * 4) + 1, 4, T('#5b544e'))
	}
	// rails: head, web and the glint along the top
	g.r(0, -2, g.W, 1, T('#c3c9d2'))
	g.r(0, -1, g.W, 1, T('#6b717c'))
}

/* ---------- the platform, its canopy and the sign ---------- */

export const drawPlatform = (g: Gfx, half: number, canopy: string, roof: boolean) => {
	const top = T('#e4e1da')
	const face = T('#aaa69e')
	const seam = T('#8f8b84')
	g.r(-half, -11, half * 2, 1, top)
	g.r(-half, -10, half * 2, 1, T('#efc23a'))
	g.r(-half, -9, half * 2, 7, face)
	g.r(-half, -3, half * 2, 1, T('#7a766f'))
	for (let x = -half + 10; x < half; x += 14) g.r(x, -9, 1, 6, seam)
	// ramps
	for (let k = 0; k < 4; k++) {
		g.r(-half - 4 + k, -8 + k * 2, 1, 6 - k * 2, face)
		g.r(half + 3 - k, -8 + k * 2, 1, 6 - k * 2, face)
	}
	if (!roof) return
	// a lamp and a bench at the far right end, clear of the scene behind
	const post = T('#3b4052')
	const lx = half - 8
	g.r(lx, -34, 1, 23, post)
	g.r(lx - 2, -35, 5, 1, post)
	g.r(lx - 1, -34, 3, 2, L('#c9ccd4', '#fff4c8'))
	g.r(lx - 22, -15, 16, 2, T('#8a5a3a'))
	g.r(lx - 21, -13, 1, 2, post)
	g.r(lx - 8, -13, 1, 2, post)
	const k = lamps()
	if (k > 0.2) {
		g.c.globalAlpha = (k - 0.2) * 0.25
		g.disc(lx, -30, 7, '#ffe9a8')
		g.c.globalAlpha = 1
	}

}
