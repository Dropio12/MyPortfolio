// Station environments, part one: education and the jobs.
// Local coordinates: x around the platform's middle, y = 0 at the rail, up is negative.
import { Gfx, L, T, hash, lamps, mix } from './gfx'
import { head, stander, walker } from './actors'

export type Hit = (x: number, y: number, w: number, h: number, action: string) => void

export type SceneArgs = { t: number; hit: Hit; img: HTMLCanvasElement | null }

/* ---------- shared pieces ---------- */

export const pad = (g: Gfx, x0: number, x1: number, col: string, edge?: string) => {
	g.r(x0, -12, x1 - x0, 10, T(col))
	if (edge) g.r(x0, -12, x1 - x0, 1, T(edge))
}

export const lampPost = (g: Gfx, x: number, y = -12, h = 22) => {
	g.r(x, y - h, 1, h, T('#3a3e4c'))
	g.r(x - 1, y - h - 1, 4, 1, T('#3a3e4c'))
	g.r(x + 1, y - h, 3, 2, L('#c8ccd6', '#fff2c0'))
	const k = lamps()
	if (k > 0.2) {
		g.c.globalAlpha = (k - 0.2) * 0.3
		g.disc(x + 2, y - h + 4, 6, '#ffe7a0')
		g.c.globalAlpha = 1
	}
}

/** a window with a frame; lit after dark (or always, with boost) */
export const win = (g: Gfx, x: number, y: number, w: number, h: number, seed: number, boost = 0, frame = '#e6e0d4') => {
	g.r(x - 1, y - 1, w + 2, h + 2, T(frame))
	const lit = hash(seed) > 0.42
	g.r(x, y, w, h, lit ? L('#3e4b66', '#ffd893', boost) : L('#3e4b66', '#55618a'))
	g.p(x, y, lit ? L('#7f95b8', '#fff1c4', boost) : T('#7f95b8'))
}

export const blocks = (g: Gfx, x: number, y: number, w: number, h: number, base: string, mortar: string, bw = 6, bh = 3) => {
	g.r(x, y, w, h, T(base))
	const m = T(mortar)
	for (let r = 0; r * bh < h; r++) {
		const yy = y + r * bh
		g.r(x, yy, w, 1, m)
		const off = r % 2 ? Math.floor(bw / 2) : 0
		for (let xx = x + off; xx < x + w; xx += bw) g.r(xx, yy, 1, bh, m)
	}
}

const pine = (g: Gfx, x: number, y: number, h: number) => {
	const body = T('#2c5545')
	const dark = T('#21443a')
	const snow = T('#f4f7fb')
	const tiers = 4
	const th = Math.floor(h / tiers) + 3
	for (let k = 0; k < tiers; k++) {
		const top = y - h + k * (th - 3)
		for (let r = 0; r < th; r++) {
			const half = Math.floor((r + k * 1.8) * 0.66) + 1
			g.r(x - half, top + r, half * 2 + 1, 1, body)
			g.r(x + 1, top + r, half, 1, dark)
			if (r === 1 || (r === 2 && half > 3)) g.r(x - half, top + r, half + 1, 1, snow)
		}
	}
	g.r(x, y, 1, 3, T('#4a3428'))
}

const snowCap = (g: Gfx, x: number, y: number, w: number, seed: number) => {
	const s = T('#f4f7fb')
	g.r(x - 1, y - 2, w + 2, 2, s)
	for (let k = 0; k < w; k += 3) if (hash(seed + k) > 0.55) g.p(x + k, y, s)
	for (let k = 2; k < w; k += 7) if (hash(seed * 3 + k) > 0.5) g.r(x + k, y, 1, 2, T('#cfe2f6'))
}

/* ---------- Université Laval: stone pavilions under snow ---------- */

export const campus = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#eef2f8', '#ffffff')
	// stone pavilion with a mansard roof and dormers
	const x0 = -140
	const w0 = 80
	blocks(g, x0, -60, w0, 49, '#9d978e', '#878178', 7, 4)
	g.r(x0, -60, w0, 2, T('#b9b2a6'))
	for (let row = 0; row < 2; row++) {
		for (let k = 0; k < 6; k++) {
			const wx = x0 + 6 + k * 12
			const wy = -52 + row * 18
			win(g, wx, wy, 5, 9, 11 + k + row * 7, 0.15)
			g.r(wx + 1, wy - 2, 3, 1, T('#e6e0d4'))
		}
	}
	g.r(x0 + 34, -22, 10, 11, T('#5a3e30'))
	g.r(x0 + 35, -21, 8, 10, L('#6a4a38', '#ffcf7a', 0.2))
	snowCap(g, x0 + 33, -22, 12, 4)
	// mansard roof, mostly under snow
	for (let r = 0; r < 16; r++) g.r(x0 - 2 + Math.floor(r / 2), -61 - r, w0 + 4 - r, 1, T('#5f8a84'))
	for (let r = 4; r < 16; r++) g.r(x0 + Math.floor(r / 2), -61 - r, w0 - r + 2, 1, T('#f4f7fb'))
	for (let k = 0; k < w0; k += 4) if (hash(k + 77) > 0.4) g.r(x0 + k, -61, 1, 1 + Math.floor(hash(k) * 3), T('#cfe2f6'))
	for (const dx of [12, 34, 56]) {
		const dxp = x0 + dx
		g.r(dxp, -72, 8, 7, T('#9d978e'))
		g.r(dxp + 2, -70, 4, 5, L('#3e4b66', '#ffd893', 0.25))
		for (let r = 0; r < 4; r++) g.r(dxp - 1 + r, -73 - r, 10 - r * 2, 1, T('#f4f7fb'))
	}
	// chimney and its smoke
	g.r(x0 + 66, -86, 5, 12, T('#8a7f74'))
	g.r(x0 + 65, -87, 7, 2, T('#f4f7fb'))
	for (let k = 0; k < 4; k++) {
		const ph = (t * 0.6 + k / 4) % 1
		g.c.globalAlpha = 0.5 * (1 - ph)
		g.disc(x0 + 68 + Math.round(ph * 10 + Math.sin(ph * 6 + k) * 2), -90 - Math.round(ph * 26), 2 + Math.floor(ph * 3), T('#e8ecf3'))
	}
	g.c.globalAlpha = 1

	// bell tower with a clock and a copper spire
	const tx = -56
	blocks(g, tx, -96, 16, 85, '#a59e93', '#8b847a', 8, 4)
	g.r(tx + 3, -84, 3, 7, T('#2a2f3e'))
	g.r(tx + 10, -84, 3, 7, T('#2a2f3e'))
	g.r(tx + 3, -85, 3, 1, T('#a59e93'))
	g.disc(tx + 8, -70, 4, T('#3c3a40'))
	g.disc(tx + 8, -70, 3, L('#f1ede2', '#fff3c8', 0.3))
	g.r(tx + 8, -73, 1, 3, T('#2a2a30'))
	g.r(tx + 8, -70, 2, 1, T('#2a2a30'))
	for (let r = 0; r < 26; r++) {
		const half = Math.floor(r / 3)
		g.r(tx + 8 - half, -122 + r, half * 2 + 1, 1, T('#5f8a84'))
		if (r > 4) g.r(tx + 8 - half, -122 + r, Math.max(1, half - 1), 1, T('#f4f7fb'))
	}
	g.r(tx + 8, -125, 1, 3, T('#e8c24a'))
	g.r(tx - 1, -97, 18, 2, T('#f4f7fb'))

	// modernist pavilion with ribbon windows
	const bx = 24
	const bw = 120
	g.r(bx, -54, bw, 43, T('#c9c4ba'))
	g.r(bx + bw - 3, -54, 3, 43, T('#aaa49a'))
	for (let row = 0; row < 3; row++) {
		const wy = -48 + row * 12
		g.r(bx + 4, wy, bw - 10, 5, L('#45566f', '#ffe3a0', 0.12))
		for (let k = bx + 4; k < bx + bw - 6; k += 6) g.r(k, wy, 1, 5, T('#9ea5b1'))
		g.r(bx + 4, wy + 5, bw - 10, 1, T('#e9e5dc'))
	}
	snowCap(g, bx, -54, bw, 9)
	g.r(bx + 44, -22, 22, 11, L('#45566f', '#ffe3a0', 0.25))
	g.r(bx + 54, -22, 1, 11, T('#9ea5b1'))
	snowCap(g, bx + 42, -23, 26, 15)

	// courtyard: pines, a lamp, a snowed-in bench, students
	pine(g, -26, -12, 30)
	pine(g, 0, -12, 22)
	pine(g, 148, -12, 26)
	lampPost(g, 14)
	g.r(-14, -16, 9, 1, T('#8a5a3a'))
	g.r(-14, -17, 9, 1, T('#f4f7fb'))
	g.disc(-36, -11, 4, T('#ffffff'))
	g.disc(118, -11, 5, T('#ffffff'))
	walker(g, -118, -40, -12, t, 3, 'pack')
	walker(g, 30, 110, -12, t, 8, 'scarf')
	walker(g, -30, 40, -12, t + 7, 14, 'pack')
}

/* ---------- iA Financial Group: a glass tower with lit floors ---------- */

export const tower = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#bdbab4', '#d9d6d0')
	// brick block with a fire escape
	blocks(g, -146, -74, 76, 63, '#a8604a', '#8a4c3a', 6, 3)
	for (let row = 0; row < 4; row++)
		for (let k = 0; k < 5; k++) win(g, -140 + k * 15, -68 + row * 14, 6, 8, 40 + row * 5 + k, 0, '#e9e2d6')
	const iron = T('#2c2f38')
	for (let row = 0; row < 3; row++) {
		g.r(-118, -56 + row * 14, 18, 1, iron)
		for (let k = 0; k < 7; k++) g.p(-118 + k * 2 + (row % 2) * 4, -57 + row * 14 - Math.floor(k / 2), iron)
	}
	g.r(-136, -84, 9, 7, T('#7a5a48'))
	g.r(-137, -85, 11, 1, T('#5a4034'))
	g.r(-134, -77, 1, 3, iron)
	g.r(-129, -77, 1, 3, iron)

	// the tower
	const x0 = -58
	const w0 = 72
	const top = -178
	const glass = T('#5a84ad')
	g.r(x0, top + 14, w0, -top - 14 - 11, glass)
	g.r(x0 + 6, top, w0 - 12, 14, glass)
	g.r(x0 + 10, top - 8, w0 - 20, 8, T('#3f5f84'))
	g.r(x0 + 34, top - 30, 1, 22, T('#3a3e4c'))
	if (Math.floor(t * 1.5) % 2 === 0) g.r(x0 + 33, top - 31, 3, 2, '#ff4a3a')
	for (let y = top + 14; y < -26; y += 6) {
		const fl = Math.floor((y - top) / 6)
		g.r(x0, y, w0, 1, T('#88afd2'))
		const lit = hash(fl * 7 + 1)
		if (lit > 0.38) {
			const a = Math.floor(hash(fl * 7 + 2) * 30)
			const b = a + 20 + Math.floor(hash(fl * 7 + 3) * 22)
			g.r(x0 + 1 + a, y + 1, Math.min(w0 - 2, b) - a, 4, L('#6b93bb', '#ffe2a0', 0.55))
		}
	}
	for (let x = x0 + 4; x < x0 + w0; x += 5) g.r(x, top + 14, 1, -top - 14 - 26, T('#41678e'))
	// sun streak across the glass
	g.c.globalAlpha = 0.22 * (1 - lamps())
	for (let y = top + 14; y < -26; y++) {
		const sx = x0 + ((Math.floor((y - top) * 0.55) + 6) % (w0 + 30)) - 10
		g.r(Math.max(x0, sx), y, Math.max(0, Math.min(8, x0 + w0 - sx)), 1, '#ffffff')
	}
	g.c.globalAlpha = 1
	g.r(x0 + w0 - 2, top + 14, 2, -top - 14 - 11, T('#3d5f85'))
	// lobby
	g.r(x0, -26, w0, 15, T('#2b3448'))
	g.r(x0 + 2, -24, w0 - 4, 13, L('#41506a', '#ffe7b0', 0.35))
	for (let x = x0 + 6; x < x0 + w0; x += 10) g.r(x, -24, 1, 13, T('#2b3448'))
	g.r(x0 + 26, -30, 20, 4, T('#2c3446'))
	const door = Math.floor(t * 3) % 3
	g.r(x0 + 32 + door * 2, -24, 1, 13, T('#9fb6cf'))

	// stone podium with a roof garden
	const px = 22
	g.r(px, -48, 128, 37, T('#cdbf9f'))
	for (let row = 0; row < 3; row++) {
		g.r(px, -44 + row * 11, 128, 1, T('#b5a687'))
		for (let k = 0; k < 9; k++) win(g, px + 5 + k * 14, -41 + row * 11, 7, 6, 90 + row * 9 + k, 0.1, '#e6dcc6')
	}
	for (let k = 0; k < 6; k++) g.disc(px + 10 + k * 22, -50, 3, T(k % 2 ? '#3f7a3c' : '#4f8a3a'))
	g.r(px, -49, 128, 1, T('#9a8b6c'))

	walker(g, -150, -60, -12, t, 21, 'case')
	walker(g, 20, 140, -12, t + 3, 25, 'case')
	walker(g, -40, 60, -12, t + 9, 29)
}

/* ---------- Recognition: a hackathon hall with eight trophies ---------- */

export const arena = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#cbc5ba', '#e2ddd3')
	const R = 134
	g.r(-R + 4, -58, R * 2 - 8, 47, T('#e2ded6'))
	for (let x = -R + 4; x < R - 4; x += 30) g.r(x, -58, 3, 47, T('#c4beb2'))
	// arched roof with ribs
	for (let x = -R; x <= R; x++) {
		const ry = -58 - Math.round(34 * Math.sqrt(Math.max(0, 1 - (x / R) ** 2)))
		const rib = (x + R) % 12 === 0
		g.r(x, ry, 1, -58 - ry + 1, T(rib ? '#4a5878' : '#5d6c8f'))
		g.p(x, ry, T('#8fa0c2'))
	}
	// flags on the crown
	const wave = Math.floor(t * 3) % 2
	for (const fx of [-40, 0, 40]) {
		const fy = -58 - Math.round(34 * Math.sqrt(1 - (fx / R) ** 2))
		g.r(fx, fy - 12, 1, 12, T('#3a3e4c'))
		g.r(fx + 1, fy - 12, 6, 2, T(fx === 0 ? '#ffc20e' : fx < 0 ? '#00813f' : '#f26a1b'))
		g.r(fx + 1, fy - 10, 6 - wave, 2, T(fx === 0 ? '#e0a800' : fx < 0 ? '#00672f' : '#d2561a'))
	}
	// glass front, lit inside
	const gx = -114
	const gw = 228
	g.r(gx, -54, gw, 40, L('#7896b6', '#ffe6b4', 0.3))
	g.r(gx, -54, gw, 1, T('#3a4258'))
	// screen over the stage
	g.r(-30, -51, 60, 14, T('#1b2034'))
	g.t(-15, -48, '8 WINS', '#ffc20e')
	// stage and the shelf of trophies
	g.r(-46, -30, 92, 16, T('#5a3f6e'))
	g.r(-46, -30, 92, 1, T('#7d5c96'))
	g.r(-42, -35, 84, 2, T('#6a4630'))
	const spark = Math.floor(t * 4) % 8
	for (let k = 0; k < 8; k++) {
		const cx = -37 + k * 10
		g.r(cx - 2, -42, 5, 3, T('#f2c230'))
		g.r(cx - 1, -39, 3, 1, T('#d8a520'))
		g.r(cx, -38, 1, 2, T('#c08a1a'))
		g.r(cx - 1, -36, 3, 1, T('#8a6a2a'))
		g.p(cx - 1, -42, '#fff3b0')
		if (k === spark) {
			g.p(cx + 2, -46, '#ffffff')
			g.p(cx + 1, -45, '#fff6c8')
			g.p(cx + 3, -45, '#fff6c8')
			g.p(cx + 2, -44, '#fff6c8')
			g.p(cx + 2, -47, '#fff6c8')
		}
	}
	// tables with laptops on both sides
	for (const side of [-1, 1]) {
		for (let k = 0; k < 3; k++) {
			const tx = side * (58 + k * 18) - 7
			head(g, tx + 4, -30, k * 3 + (side > 0 ? 20 : 0))
			g.r(tx, -24, 14, 2, T('#7a5a42'))
			g.r(tx + 1, -22, 1, 8, T('#5a4234'))
			g.r(tx + 12, -22, 1, 8, T('#5a4234'))
			g.r(tx + 3, -28, 6, 4, '#7fe0ff')
			g.r(tx + 3, -24, 7, 1, T('#c9ced8'))
		}
	}
	for (let x = gx; x <= gx + gw; x += 19) g.r(x, -54, 1, 40, T('#46506a'))
	// banners and bunting
	const cols = ['#00813f', '#f26a1b', '#0a5baa', '#ffc20e']
	cols.forEach((c, i) => {
		const bx = i < 2 ? -104 + i * 22 : 70 + (i - 2) * 22
		g.r(bx, -52, 7, 12, T(c))
		g.p(bx + 3, -40, T(c))
		g.r(bx, -40, 2, 1, T(c))
		g.r(bx + 5, -40, 2, 1, T(c))
	})
	for (let x = gx + 2; x < gx + gw - 2; x += 6) {
		const c = T(cols[Math.floor((x - gx) / 6) % 4])
		g.r(x, -53, 4, 1, c)
		g.r(x + 1, -52, 2, 1, c)
	}
	// spotlights sweeping
	g.c.globalAlpha = 0.1 + lamps() * 0.08
	for (const s of [-1, 1]) {
		const sway = Math.sin(t * 0.8 + s) * 10
		for (let r = 0; r < 24; r++) {
			const cx = s * 20 + Math.round((sway * r) / 24)
			g.r(cx - Math.floor(r / 5), -22 - r, 1 + Math.floor(r / 2.5), 1, '#fff6d0')
		}
	}
	g.c.globalAlpha = 1
	walker(g, -150, -120, -12, t, 33, 'pack')
	walker(g, 116, 150, -12, t + 2, 35, 'pack')
}

/* ---------- Intel and Adobe: a workshop room full of students ---------- */

export const lecture = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#c4bdb2', '#d8d2c6')
	blocks(g, -134, -80, 262, 69, '#9a5a48', '#7c4636', 6, 3)
	g.r(-136, -82, 266, 3, T('#6a3a2e'))
	for (let k = 0; k < 13; k++) win(g, -128 + k * 20, -74, 8, 7, 120 + k, 0.1, '#e9e2d6')
	// the room
	const rx = -112
	const rw = 204
	g.r(rx - 2, -62, rw + 4, 50, T('#5a3a2e'))
	g.r(rx, -60, rw, 48, L('#d9cbb2', '#f2e2c2', 0.35))
	// screen with a small network diagram
	const scx = rx + 144
	g.r(scx, -56, 50, 26, T('#f4f2ea'))
	g.r(scx, -56, 50, 1, T('#c9c4b8'))
	const nodes = [
		[14, 8],
		[14, 16],
		[14, 24 - 4],
		[30, 6],
		[30, 13],
		[30, 20],
		[44, 13],
	]
	const pulse = Math.floor(t * 3) % 7
	nodes.forEach(([nx, ny], i) => {
		if (i < 3) nodes.slice(3, 6).forEach(([mx, my]) => seg2(g, scx + nx, -56 + ny, scx + mx, -56 + my, T('#b9c4d6')))
		if (i >= 3 && i < 6) seg2(g, scx + nx, -56 + ny, scx + 44, -56 + 13, T('#b9c4d6'))
	})
	nodes.forEach(([nx, ny], i) => {
		g.r(scx - 1 + nx, -57 + ny, 3, 3, T(i === pulse ? '#f26a1b' : i < 3 ? '#0a5baa' : i < 6 ? '#00813f' : '#f26a1b'))
	})
	// presenter, pointing now and then
	stander(g, scx - 14, -16, 7, false, '#0a5baa')
	if (Math.floor(t / 1.5) % 2 === 0) g.r(scx - 10, -22, 4, 1, T('#f1c7a3'))
	// tiered rows of students, rising away from the screen
	for (let row = 0; row < 4; row++) {
		const ry = -20 - row * 9
		const x0 = rx + 6
		const len = 110 - row * 10
		g.r(x0 - 4, ry + 4, len, 2, T('#8a5a3a'))
		g.r(x0 - 4, ry + 6, len, 1, T('#6a4430'))
		for (let k = 0; k < 9 - row; k++) {
			const sx = x0 + k * 12
			if (sx > x0 + len - 8) break
			head(g, sx, ry, row * 11 + k)
			if (hash(row * 7 + k) > 0.6) g.r(sx - 1, ry + 3, 4, 1, '#bfe9ff')
			if (row === 1 && k === 3 && Math.floor(t / 2) % 3 === 0) g.r(sx + 3, ry - 4, 1, 4, T('#d9a07a'))
		}
	}
	// bikes outside
	for (let k = 0; k < 3; k++) {
		const bx = 108 + k * 12
		g.r(bx, -16, 1, 1, T('#2a2f3e'))
		g.disc(bx - 3, -14, 2, T('#2a2f3e'))
		g.disc(bx + 4, -14, 2, T('#2a2f3e'))
		g.disc(bx - 3, -14, 1, T('#c4bdb2'))
		g.disc(bx + 4, -14, 1, T('#c4bdb2'))
		g.r(bx - 2, -17, 6, 1, T(k === 1 ? '#d94f4f' : '#2f6fb0'))
	}
	walker(g, -150, -120, -12, t, 41, 'pack')
	walker(g, 96, 150, -12, t + 4, 44, 'pack')
}

const seg2 = (g: Gfx, x0: number, y0: number, x1: number, y1: number, col: string) => {
	const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1)
	for (let i = 0; i <= n; i++) g.p(Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n), col)
}

/* ---------- Shopify Infrastructure Security: racks, cables and a firewall gate ---------- */

export const datacenter = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#b3b0aa', '#cfccc6')
	const x0 = -142
	const w0 = 158
	const lift = -36
	g.r(x0, -72 + lift, w0, 61 - lift, T('#d5d8de'))
	for (let y = -66 + lift; y < -11; y += 8) g.r(x0, y, w0, 1, T('#bfc3cb'))
	g.r(x0, -73 + lift, w0, 2, T('#9ea4ae'))
	// cooling units on the roof
	for (let k = 0; k < 3; k++) {
		const cx = x0 + 18 + k * 44
		g.r(cx, -82 + lift, 22, 9, T('#aab0ba'))
		g.r(cx, -82 + lift, 22, 1, T('#cdd2da'))
		g.disc(cx + 11, -78 + lift, 3, T('#3a3f4c'))
		const blade = Math.floor(t * 8 + k) % 2
		g.r(cx + 8, -78 + lift, 7, 1, T(blade ? '#8a919e' : '#3a3f4c'))
		g.r(cx + 11, -81 + lift, 1, 7, T(blade ? '#3a3f4c' : '#8a919e'))
	}
	// the server room
	const rx = x0 + 10
	const rw = 136
	g.r(rx - 2, -60 + lift, rw + 4, 46, T('#3a3f4c'))
	g.r(rx, -58 + lift, rw, 44, L('#1a2030', '#121828'))
	const cables = ['#d94f4f', '#ffc04a', '#2f8fd8', '#3fbf6a']
	cables.forEach((c, i) => g.r(rx, -57 + lift + i, rw, 1, c))
	const step = Math.floor(t * 6)
	for (let k = 0; k < 7; k++) {
		const kx = rx + 6 + k * 19
		g.r(kx, -50 + lift, 13, 34, T('#2a303e'))
		g.r(kx, -50 + lift, 13, 1, T('#4a5264'))
		g.r(kx + 6, -56 + lift, 1, 6, cables[k % 4])
		for (let r = 0; r < 8; r++) {
			g.r(kx + 1, -48 + lift + r * 4, 11, 3, T('#1d222d'))
			for (let c = 0; c < 3; c++) {
				const h = hash(k * 97 + r * 13 + c * 5 + Math.floor((step + k * 3 + r) / (2 + c)))
				const col = h > 0.93 ? '#ff4a4a' : h > 0.72 ? '#ffc04a' : h > 0.32 ? '#47f08a' : '#1d4a32'
				g.p(kx + 2 + c * 2, -47 + lift + r * 4, col)
			}
			g.r(kx + 9, -47 + lift + r * 4, 2, 1, T('#4a5264'))
		}
	}
	g.r(rx, -16 + lift, rw, 2, T('#5a6070'))
	// the ground floor: a loading door and a cable riser down from the racks
	g.r(x0 + 12, -30, 26, 19, T('#9ea4ae'))
	for (let y = -29; y < -11; y += 3) g.r(x0 + 12, y, 26, 1, T('#c0c5cd'))
	for (let i = 0; i < 4; i++) g.r(x0 + w0 - 10 + i, -54, 1, 37, cables[i])
	// cable run to the gate
	g.r(x0 + w0, -17, 112, 2, T('#2c303c'))
	g.r(x0 + w0, -18, 112, 1, T('#4a5060'))
	// the firewall: brick, a steel gate, flames on top
	const fx = 34
	blocks(g, fx, -36, 96, 25, '#b4553f', '#8a3e2e', 6, 3)
	g.r(fx + 36, -30, 24, 19, T('#2a2e38'))
	for (let x = fx + 38; x < fx + 58; x += 3) g.r(x, -30, 1, 19, T('#7a8290'))
	g.r(fx + 36, -22, 24, 1, T('#7a8290'))
	g.r(fx + 46, -23, 4, 3, T('#e8c24a'))
	const fstep = Math.floor(t * 10)
	for (let x = fx; x < fx + 96; x++) {
		if (x >= fx + 34 && x < fx + 62) continue
		const h = 2 + Math.floor(hash(x * 7 + fstep) * 5)
		g.r(x, -36 - h, 1, h, x % 3 ? '#ff7a2a' : '#e0402a')
		g.r(x, -36 - Math.max(1, h - 2), 1, Math.max(1, h - 2), '#ffd04a')
	}
	// packets: green ones pass the gate into the racks, red ones are stopped
	for (let i = 0; i < 9; i++) {
		const period = 6.3
		const ph = ((t + i * 0.7) % period) / period
		const bad = hash(i * 31 + 7) < 0.34
		const startX = 150
		const gateX = fx + 61
		let x = startX - ph * 300
		if (bad && x < gateX) {
			if (x < gateX - 20) continue
			x = gateX
			if (Math.floor(t * 6) % 2 === 0) continue
		}
		if (x < x0 + w0) continue
		g.r(Math.round(x), -19, 3, 2, bad ? '#ff4a4a' : '#47f08a')
	}
	walker(g, -10, 30, -12, t + 5, 51, 'case')
}

/* ---------- Shopify Visual Search: the shopping street and the billboard ---------- */

const AWNINGS = ['#d94f4f', '#2f8f9a', '#e0a23a', '#6a5acd', '#3f9a5a']
const FRONTS = ['#ece0cc', '#cfdde2', '#f0d0c0', '#dcd6e8', '#d6e6cf']

const product = (g: Gfx, kind: number, x: number, y: number) => {
	switch (kind) {
		case 0: // sneakers
			for (const dx of [0, 12, 24]) {
				g.r(x + dx, y - 3, 7, 2, T('#f4f4f4'))
				g.r(x + dx, y - 5, 4, 2, T(dx === 12 ? '#2f6fb0' : '#d94f4f'))
				g.r(x + dx, y - 1, 8, 1, T('#3a3a44'))
			}
			break
		case 1: // lamps
			for (const dx of [2, 16, 30]) {
				g.r(x + dx + 2, y - 10, 1, 9, T('#3a3a44'))
				g.r(x + dx, y - 13, 5, 3, L('#e8d8a8', '#ffe9a0', 0.5))
				g.r(x + dx + 1, y - 1, 3, 1, T('#3a3a44'))
			}
			break
		case 2: // shirts on a rail
			g.r(x, y - 15, 40, 1, T('#6a6a74'))
			for (const [dx, c] of [
				[2, '#2f6fb0'],
				[12, '#e0a23a'],
				[22, '#ffffff'],
				[32, '#3f9a5a'],
			] as [number, string][]) {
				g.r(x + dx, y - 14, 7, 2, T(c))
				g.r(x + dx + 1, y - 12, 5, 7, T(c))
			}
			break
		case 3: // a bag and a hat
			g.r(x + 4, y - 8, 10, 7, T('#8a4a2a'))
			g.r(x + 6, y - 11, 6, 1, T('#5a2e1a'))
			g.r(x + 5, y - 10, 1, 2, T('#5a2e1a'))
			g.r(x + 12, y - 10, 1, 2, T('#5a2e1a'))
			g.r(x + 22, y - 6, 14, 2, T('#d8c49a'))
			g.r(x + 25, y - 10, 8, 4, T('#d8c49a'))
			g.r(x + 25, y - 7, 8, 1, T('#2a2f3e'))
			break
		default: // plants
			for (const dx of [4, 18, 32]) {
				g.r(x + dx, y - 4, 5, 4, T('#c26a3a'))
				g.disc(x + dx + 2, y - 8, 3, T('#3f8a3c'))
				g.p(x + dx + 1, y - 10, T('#7cc05a'))
			}
	}
}

export const street = (g: Gfx, { t, img }: SceneArgs) => {
	pad(g, -170, 170, '#cbc4b8', '#e2dcd2')
	// apartments over five shops
	for (let k = 0; k < 5; k++) {
		const x = -160 + k * 64
		const up = -80 - (k % 2) * 8 - (k === 2 ? 4 : 0)
		g.r(x, up, 64, -up - 46, T(mix(FRONTS[k], '#9a8a7a', 0.35)))
		g.r(x, up, 64, 2, T('#6a5c50'))
		for (let r = up + 6; r < -50; r += 12) for (let c = 0; c < 4; c++) win(g, x + 6 + c * 15, r, 6, 7, k * 31 + r + c, 0, '#efe7da')
		g.r(x, -48, 64, 37, T(FRONTS[k]))
		g.r(x, -48, 1, 37, T('#a8a096'))
		// awning, striped with a scalloped edge
		for (let s = 0; s < 60; s += 4) g.r(x + 2 + s, -46, 4, 6, T(s % 8 ? '#ffffff' : AWNINGS[k]))
		for (let s = 0; s < 60; s += 4) g.r(x + 3 + s, -40, 2, 1, T(s % 8 ? '#e8e8e8' : AWNINGS[k]))
		// display window with its goods
		g.r(x + 5, -36, 40, 22, L('#a7c7d6', '#fff0c8', 0.3))
		g.r(x + 5, -36, 40, 1, T('#5a5560'))
		product(g, k, x + 7, -16)
		g.r(x + 49, -34, 10, 22, T('#5a4034'))
		g.p(x + 57, -24, T('#e8c24a'))
	}
	// the billboard: the real shop.com page, pixelated
	const bx = -60
	const by = -158
	g.r(bx + 18, by + 74, 2, 18, T('#3a3e4c'))
	g.r(bx + 100, by + 74, 2, 18, T('#3a3e4c'))
	g.r(bx + 14, by + 88, 92, 2, T('#3a3e4c'))
	g.r(bx, by, 120, 76, T('#23262f'))
	if (img) g.c.drawImage(img, g.ox + bx + 4, g.oy + by + 3)
	else {
		g.r(bx + 4, by + 3, 112, 70, '#f6f6f8')
		g.r(bx + 34, by + 6, 52, 6, '#ffffff')
		g.r(bx + 34, by + 12, 52, 1, '#d8d8de')
		g.r(bx + 10, by + 22, 100, 46, '#ffffff')
		g.r(bx + 14, by + 40, 30, 6, '#17142a')
		g.r(bx + 14, by + 52, 14, 5, '#5a31f4')
	}
	// a twinkle on the starred image-search button
	if (Math.floor(t * 2) % 2 === 0) {
		const sx = bx + 4 + 76
		const sy = by + 3 + 4
		g.p(sx, sy - 3, '#ffffff')
		g.p(sx, sy + 3, '#ffffff')
		g.p(sx - 3, sy, '#ffffff')
		g.p(sx + 3, sy, '#ffffff')
	}
	// chase lights around the frame
	const chase = Math.floor(t * 6) % 3
	for (let i = 0, x = bx + 2; x < bx + 118; x += 4, i++) {
		const on = i % 3 === chase
		g.p(x, by + 1, on ? '#ffe48a' : T('#7a6a3a'))
		g.p(x, by + 74, on ? '#ffe48a' : T('#7a6a3a'))
	}
	// someone snapping a photo of the sneakers in the window
	const px = -122
	stander(g, px, -12, 61, false, '#6a5acd')
	g.r(px + 3, -15, 1, 4, T('#f1c7a3'))
	g.r(px + 3, -18, 3, 4, T('#1b1d26'))
	const cyc = t % 3.2
	if (cyc < 0.25) {
		g.c.globalAlpha = 0.85
		g.disc(px + 5, -17, 3, '#ffffff')
		g.c.globalAlpha = 1
	}
	if (cyc > 0.3 && cyc < 2.4) {
		// similar products pop up over the phone
		const n = Math.min(3, Math.floor((cyc - 0.3) / 0.25) + 1)
		for (let k = 0; k < n; k++) {
			g.r(px - 4 + k * 8, -30, 7, 7, T('#ffffff'))
			g.r(px - 3 + k * 8, -27, 5, 2, T(['#d94f4f', '#2f6fb0', '#e0a23a'][k]))
			g.r(px - 3 + k * 8, -25, 5, 1, T('#3a3a44'))
		}
	}
	walker(g, -60, 40, -12, t, 63, 'bag')
	walker(g, 20, 150, -12, t + 3, 66, 'bag')
	walker(g, -170, -132, -12, t + 6, 69, 'bag')
	lampPost(g, 58)
}
