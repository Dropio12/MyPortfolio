// Station environments, part two: client deployments, Scale AI, the projects branch and the terminus.
import { Gfx, L, T, hash, lamps } from './gfx'
import { head, robot, seg, stander, walker } from './actors'
import { SceneArgs, blocks, lampPost, pad, win } from './scenes-a'

const ARC = (u: number) => 4 * u * (1 - u)

/** a floor plan that draws itself, one wall at a time */
const plan = (g: Gfx, x: number, y: number, w: number, h: number, t: number, seed: number, ink: string) => {
	const walls: [number, number, number, number][] = [
		[0, 0, w, 1],
		[0, h - 1, w, 1],
		[0, 0, 1, h],
		[w - 1, 0, 1, h],
		[Math.floor(w * 0.45), 0, 1, Math.floor(h * 0.6)],
		[0, Math.floor(h * 0.6), Math.floor(w * 0.7), 1],
		[Math.floor(w * 0.7), Math.floor(h * 0.35), 1, h - Math.floor(h * 0.35)],
		[Math.floor(w * 0.45), Math.floor(h * 0.35), Math.floor(w * 0.55), 1],
	]
	const shown = Math.floor((t * 1.6 + seed) % (walls.length + 4))
	walls.forEach(([wx, wy, ww, wh], i) => {
		if (i <= shown) g.r(x + wx, y + wy, ww, wh, ink)
	})
	if (shown > walls.length) {
		// door swings
		g.p(x + Math.floor(w * 0.2), y + Math.floor(h * 0.6) - 1, ink)
		g.p(x + Math.floor(w * 0.2) + 1, y + Math.floor(h * 0.6) - 2, ink)
		g.p(x + Math.floor(w * 0.85), y + Math.floor(h * 0.35) + 1, ink)
	}
}

/* ---------- immigration law firms: documents flying into folders ---------- */

export const law = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#c6c0b6', '#dcd6cc')
	const x0 = -134
	const w0 = 262
	g.r(x0, -96, w0, 85, T('#d8cfbf'))
	g.r(x0 - 3, -99, w0 + 6, 4, T('#b8ad98'))
	g.r(x0 - 1, -95, w0 + 2, 1, T('#9c917c'))
	for (let x = x0 + 4; x < x0 + w0; x += 26) g.r(x, -94, 3, 83, T('#c9bfac'))
	for (let k = 0; k < 9; k++) win(g, x0 + 10 + k * 28, -90, 8, 10, 200 + k, 0.1, '#efe8da')
	for (let k = 0; k < 3; k++) win(g, x0 + 10 + k * 28, -70, 8, 10, 230 + k, 0.1, '#efe8da')
	// front door with steps, out at the left
	g.r(x0 + 14, -30, 14, 19, T('#4a3428'))
	g.p(x0 + 25, -21, T('#e8c24a'))
	for (let s = 0; s < 3; s++) g.r(x0 + 10 - s * 2, -13 + s, 22 + s * 4, 1, T('#bdb3a2'))
	// the office, cut away on the second floor
	const ox = -6
	const ow = 128
	g.r(ox - 2, -78, ow + 4, 42, T('#8a7a64'))
	g.r(ox, -76, ow, 38, L('#efe6d2', '#fff0d0', 0.4))
	// shelf of folders
	const folders = ['#e3bc62', '#5b86c4', '#c45b5b', '#e3bc62', '#3f9a5a', '#e3bc62', '#5b86c4']
	g.r(ox + 6, -60, 46, 2, T('#7a5a3a'))
	const flight = 1.4
	folders.forEach((c, i) => {
		const landed = Math.floor((t / flight + i * 0.37) % folders.length) === i
		g.r(ox + 8 + i * 6, -70 - (landed ? 1 : 0), 5, 10, T(c))
		g.r(ox + 8 + i * 6, -70 - (landed ? 1 : 0), 5, 1, T('#ffffff'))
	})
	// desk, lamp, the stack and the person at work
	g.r(ox + 60, -50, 44, 3, T('#8a5a3a'))
	g.r(ox + 62, -47, 2, 9, T('#6a4430'))
	g.r(ox + 100, -47, 2, 9, T('#6a4430'))
	for (let s = 0; s < 5; s++) {
		g.r(ox + 66, -52 - s * 2, 9, 2, T('#ffffff'))
		g.r(ox + 67, -51 - s * 2, 7, 1, T('#c9cdd6'))
	}
	g.r(ox + 94, -58, 1, 8, T('#3a3e4c'))
	g.r(ox + 90, -60, 6, 2, L('#3a6a4a', '#ffe7a0', 0.5))
	head(g, ox + 82, -56, 5)
	// filing cabinet
	g.r(ox + 108, -72, 16, 34, T('#9aa3ae'))
	for (let d = 0; d < 4; d++) {
		g.r(ox + 109, -71 + d * 8, 14, 1, T('#7d8590'))
		g.r(ox + 114, -67 + d * 8, 4, 1, T('#d9dde4'))
	}
	// documents in flight: from the stack to a folder
	for (let i = 0; i < 3; i++) {
		const ph = ((t + i * (flight / 3)) % flight) / flight
		const dst = Math.floor((t + i * (flight / 3)) / flight + i * 2) % folders.length
		const sx = ox + 68
		const sy = -62
		const dx = ox + 9 + dst * 6
		const dy = -74
		const x = Math.round(sx + (dx - sx) * ph)
		const y = Math.round(sy + (dy - sy) * ph - ARC(ph) * 12)
		g.r(x, y, 4, 3, T('#ffffff'))
		g.r(x + 1, y + 1, 2, 1, T('#9aa3ae'))
	}
	// ground floor windows on the right, a tree and a mailbox
	for (let k = 0; k < 3; k++) win(g, 54 + k * 26, -30, 8, 12, 240 + k, 0.1, '#efe8da')
	g.r(140, -24, 2, 13, T('#5e4334'))
	g.disc(141, -30, 7, T('#2f5e33'))
	g.disc(139, -32, 5, T('#4f8a3a'))
	walker(g, 40, 140, -12, t, 71, 'case')
}

/* ---------- an architecture firm: a drafting table and a plan being drawn ---------- */

export const studio = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#bfbbb4', '#d6d2cb')
	const x0 = -138
	const w0 = 270
	g.r(x0, -84, w0, 73, T('#262a33'))
	g.r(x0 + 2, -82, w0 - 4, 69, L('#dfe3e8', '#fff2d6', 0.4))
	for (let x = x0 + 44; x < x0 + w0; x += 44) g.r(x, -82, 2, 69, T('#262a33'))
	g.r(x0 + 2, -40, w0 - 4, 2, T('#262a33'))
	g.r(x0 - 2, -87, w0 + 4, 3, T('#1a1d24'))
	// pinned plans on the wall, up high
	for (let k = 0; k < 4; k++) {
		g.r(x0 + 10 + k * 18, -78, 13, 16, T('#2f63a8'))
		g.r(x0 + 12 + k * 18, -76, 9, 12, T('#4c80c4'))
		g.p(x0 + 15 + k * 18, -78, T('#d94f4f'))
	}
	// the drafting table: a tilted board with the plan drawing itself
	const dx = 4
	for (let r = 0; r < 20; r++) g.r(dx + Math.floor(r * 0.6), -76 + r, 56, 1, T('#2f63a8'))
	plan(g, dx + 8, -73, 40, 15, t, 1, T('#eaf2ff'))
	g.r(dx + 12, -56, 2, 16, T('#3a3e4c'))
	g.r(dx + 54, -56, 2, 16, T('#3a3e4c'))
	g.r(dx + 8, -57, 54, 1, T('#3a3e4c'))
	// desk lamp arm
	seg(g, dx + 60, -56, dx + 66, -82, T('#3a3e4c'))
	seg(g, dx + 66, -82, dx + 48, -84, T('#3a3e4c'))
	g.r(dx + 44, -84, 6, 3, L('#b9bec8', '#ffe9a8', 0.5))
	if (lamps() > 0.1) {
		g.c.globalAlpha = 0.25
		for (let r = 0; r < 8; r++) g.r(dx + 46 - r, -81 + r, 3 + r * 2, 1, '#fff2c0')
		g.c.globalAlpha = 1
	}
	// the architect, pencil moving
	stander(g, dx - 8, -40, 81, false, '#2a2f3e')
	g.r(dx - 3, -46 - (Math.floor(t * 3) % 2), 4, 1, T('#f1c7a3'))
	// a white model on a side table
	const mx = 84
	g.r(mx, -50, 36, 2, T('#7a5a42'))
	g.r(mx + 2, -48, 1, 8, T('#5a4234'))
	g.r(mx + 33, -48, 1, 8, T('#5a4234'))
	g.r(mx + 4, -62, 12, 12, T('#f4f4f2'))
	g.r(mx + 16, -58, 14, 8, T('#e4e4e0'))
	g.r(mx + 8, -68, 6, 6, T('#ffffff'))
	for (let k = 0; k < 3; k++) g.r(mx + 6 + k * 3, -58, 1, 2, T('#9aa3ae'))
	// rolled plans in a bin, ground floor
	g.r(54, -26, 12, 13, T('#6a6f7c'))
	for (let k = 0; k < 4; k++) g.r(55 + k * 3, -34 + (k % 2) * 2, 2, 9, T('#e8eef8'))
	for (let k = 0; k < 2; k++) win(g, 76 + k * 26, -32, 14, 16, 260 + k, 0.4, '#262a33')
	walker(g, 60, 150, -12, t, 84)
}

/* ---------- Hotel Jaro: the front desk and a ringing phone ---------- */

export const hotel = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#c6beb2', '#ddd6ca')
	const x0 = -136
	const w0 = 272
	g.r(x0, -112, w0, 101, T('#e8dcc8'))
	g.r(x0 + w0 - 3, -112, 3, 101, T('#cbbda6'))
	g.r(x0 - 2, -114, w0 + 4, 3, T('#a08a6a'))
	// rooms with balconies
	for (let fl = 0; fl < 4; fl++) {
		const fy = -106 + fl * 16
		for (let k = 0; k < 10; k++) {
			const wx = x0 + 8 + k * 26
			win(g, wx, fy, 10, 9, 300 + fl * 11 + k, 0.2, '#f6efe2')
			g.r(wx - 2, fy + 10, 14, 1, T('#5a4a3e'))
			for (let b = 0; b < 14; b += 2) g.p(wx - 2 + b, fy + 9, T('#5a4a3e'))
		}
	}
	// the name on the roof, lit after dark
	const sx = -30
	g.r(sx - 3, -126, 66, 12, T('#3a2e2a'))
	g.r(sx - 1, -114, 1, 2, T('#3a2e2a'))
	g.r(sx + 60, -114, 1, 2, T('#3a2e2a'))
	g.t(sx + 1, -123, 'HOTEL JARO', L('#e8d8b8', '#ffcf6a', 0.35))
	// entrance with an awning, out at the left
	g.r(x0 + 8, -36, 26, 3, T('#8a2a3a'))
	for (let s = 0; s < 26; s += 4) g.r(x0 + 8 + s, -33, 2, 1, T('#8a2a3a'))
	g.r(x0 + 12, -32, 18, 21, L('#4a5a72', '#ffe2a8', 0.35))
	g.r(x0 + 20 + (Math.floor(t * 3) % 3), -32, 1, 21, T('#9fb6cf'))
	// lobby, cut away to the right of the train
	const lx = 44
	const lw = 90
	g.r(lx - 2, -44, lw + 4, 33, T('#7a5a42'))
	g.r(lx, -42, lw, 31, L('#f3e2c0', '#ffeccc', 0.45))
	// key rack
	for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) g.p(lx + 50 + c * 4, -38 + r * 4, T('#c99a2a'))
	g.r(lx + 48, -40, 22, 1, T('#8a5a3a'))
	// front desk, bell and phone
	g.r(lx + 6, -22, 64, 11, T('#6a4430'))
	g.r(lx + 6, -23, 64, 2, T('#a07050'))
	g.r(lx + 12, -25, 3, 2, T('#e8c24a'))
	g.p(lx + 13, -26, T('#e8c24a'))
	const ring = t % 2.6 < 1.3
	const shake = ring && Math.floor(t * 12) % 2 ? 1 : 0
	g.r(lx + 40 + shake, -26, 7, 3, T('#1b1d26'))
	g.r(lx + 39 + shake, -27, 9, 1, T('#1b1d26'))
	if (ring) {
		g.p(lx + 36, -29, T('#3a3e4c'))
		g.p(lx + 35, -30, T('#3a3e4c'))
		g.p(lx + 51, -29, T('#3a3e4c'))
		g.p(lx + 52, -30, T('#3a3e4c'))
		// the voice agent answers: a speech bubble with a moving waveform
		g.r(lx + 30, -41, 24, 9, T('#ffffff'))
		g.r(lx + 38, -32, 2, 1, T('#ffffff'))
		for (let k = 0; k < 10; k++) {
			const h = 1 + Math.floor(hash(k * 7 + Math.floor(t * 10)) * 6)
			g.r(lx + 32 + k * 2, -36 - Math.floor(h / 2), 1, h, '#0a5baa')
		}
	}
	// luggage cart and a plant
	g.r(lx + 74, -26, 1, 14, T('#c9a24a'))
	g.r(lx + 86, -26, 1, 14, T('#c9a24a'))
	g.r(lx + 74, -27, 13, 1, T('#c9a24a'))
	g.r(lx + 76, -20, 5, 7, T('#2f6fb0'))
	g.r(lx + 81, -17, 5, 4, T('#c45b5b'))
	g.r(lx + 74, -13, 13, 1, T('#c9a24a'))
	g.r(lx + 2, -16, 4, 4, T('#c26a3a'))
	g.disc(lx + 4, -20, 3, T('#3f8a3c'))
	walker(g, -110, -60, -12, t, 91, 'case')
	walker(g, 96, 150, -12, t + 5, 94, 'case')
}

/* ---------- Scale AI: a lab where code gets reviewed ---------- */

const CODE = ['#7fd0ff', '#ffb86b', '#c3e88d', '#ff7b9c', '#c792ea']

export const lab = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#c2c4c8', '#dadcdf')
	const x0 = -134
	const w0 = 274
	g.r(x0, -76, w0, 65, T('#e7e9ee'))
	for (let x = x0; x < x0 + w0; x += 22) g.r(x, -76, 1, 65, T('#cfd3da'))
	g.r(x0 - 2, -78, w0 + 4, 3, T('#9ea4ae'))
	g.r(x0 + 8, -74, w0 - 16, 6, L('#3a4560', '#cfe4ff', 0.2))
	// a dish on the roof
	g.r(x0 + 170, -86, 2, 8, T('#9aa3ae'))
	g.disc(x0 + 168, -90, 5, T('#d8dce4'))
	g.disc(x0 + 167, -91, 3, T('#b9bfca'))
	// the room
	const rx = x0 + 10
	const rw = 256
	g.r(rx - 2, -64, rw + 4, 50, T('#3a4052'))
	g.r(rx, -62, rw, 46, L('#dfe6ee', '#e8f0ff', 0.4))
	// wall screen: code lines, a scanning row, review marks
	const sx = rx + 100
	g.r(sx, -58, 84, 32, T('#14192a'))
	const scan = Math.floor(t * 2) % 10
	for (let line = 0; line < 7; line++) {
		const ly = -55 + line * 4
		if (line === scan % 7) g.r(sx + 1, ly - 1, 82, 3, '#26304a')
		const indent = [0, 4, 8, 8, 4, 8, 0][line]
		let cx = sx + 4 + indent
		for (let w = 0; w < 4; w++) {
			const len = 3 + Math.floor(hash(line * 11 + w) * 9)
			if (cx + len > sx + 66) break
			g.r(cx, ly, len, 1, CODE[(line + w) % CODE.length])
			cx += len + 2
		}
		if (line < scan) {
			const ok = hash(line * 5 + 3) > 0.3
			const mx = sx + 74
			if (ok) {
				g.p(mx, ly, '#47f08a')
				g.p(mx + 1, ly + 1, '#47f08a')
				g.p(mx + 2, ly, '#47f08a')
				g.p(mx + 3, ly - 1, '#47f08a')
			} else {
				g.p(mx, ly - 1, '#ff4a5a')
				g.p(mx + 2, ly - 1, '#ff4a5a')
				g.p(mx + 1, ly, '#ff4a5a')
				g.p(mx, ly + 1, '#ff4a5a')
				g.p(mx + 2, ly + 1, '#ff4a5a')
			}
		}
	}
	// desks with two monitors each, reviewers in headphones
	for (let d = 0; d < 2; d++) {
		const dx = rx + 196 + d * 30
		g.r(dx, -26, 26, 2, T('#7a8494'))
		g.r(dx + 2, -24, 1, 8, T('#5a6070'))
		g.r(dx + 23, -24, 1, 8, T('#5a6070'))
		for (let m = 0; m < 2; m++) {
			g.r(dx + 2 + m * 12, -36, 10, 8, T('#1b2032'))
			for (let k = 0; k < 3; k++) g.r(dx + 3 + m * 12, -34 + k * 2, 3 + Math.floor(hash(d * 7 + m * 3 + k) * 5), 1, CODE[(d + m + k) % CODE.length])
			g.r(dx + 6 + m * 12, -28, 2, 2, T('#3a3e4c'))
		}
		head(g, dx + 10, -22, 130 + d)
		g.r(dx + 9, -23, 5, 1, T('#2a2f3e'))
	}
	g.r(rx + 188, -30, 5, 14, T('#c26a3a'))
	g.disc(rx + 190, -34, 4, T('#3f8a3c'))
	walker(g, 84, 150, -12, t, 141, 'case')
}

/* ---------- AgentGym: robots lifting, getting stronger ---------- */

export const gym = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#a9a6a0', '#c4c1bb')
	const x0 = -140
	const w0 = 270
	g.r(x0, -70, w0, 59, T('#7d8796'))
	for (let x = x0; x < x0 + w0; x += 3) g.r(x, -70, 1, 59, T('#6c7584'))
	for (let k = 0; k < w0; k += 12) {
		g.r(x0 + k, -76, 6, 6, T('#5a6170'))
		g.r(x0 + k + 6, -72, 6, 2, T('#5a6170'))
	}
	// the open door
	const ix = x0 + 10
	const iw = 214
	g.r(ix - 2, -54, iw + 4, 43, T('#4a5160'))
	g.r(ix, -52, iw, 41, L('#d8dce4', '#fff2d0', 0.4))
	g.r(ix, -52, iw, 4, T('#9aa3ae'))
	for (let x = ix; x < ix + iw; x += 4) g.r(x, -49, 2, 1, T('#7d8796'))
	g.r(ix, -14, iw, 3, T('#3a3f4f'))
	// a wall chart: bars that keep rising
	const cx = ix + 150
	g.r(cx, -44, 30, 18, T('#ffffff'))
	const grow = (t / 2) % 6
	for (let k = 0; k < 5; k++) {
		const h = Math.min(14, 3 + Math.floor(k * 2.4 + Math.min(grow, k + 1)))
		g.r(cx + 3 + k * 5, -28 - h, 3, h, T('#00813f'))
	}
	g.r(cx + 2, -28, 26, 1, T('#3a3e4c'))
	// two robots pressing barbells; the plates grow every three reps
	const rep = 1.6
	for (let r = 0; r < 2; r++) {
		const rx = ix + 16 + r * 46
		const ph = ((t + r * 0.8) % rep) / rep
		const lift = Math.round(Math.sin(ph * Math.PI) * 9)
		const plates = 1 + (Math.floor((t + r * 0.8) / (rep * 3)) % 3)
		robot(g, rx, -14)
		const by = -24 - lift
		seg(g, rx, -9 - 1, rx - 3, by + 1, T('#9aa3b2'))
		seg(g, rx + 5, -9 - 1, rx + 8, by + 1, T('#9aa3b2'))
		g.r(rx - 10, by, 26, 1, T('#c9ced8'))
		for (let p = 0; p < plates; p++) {
			const col = T(['#2f6fb0', '#e0a23a', '#d94f4f'][p])
			g.r(rx - 9 + p * 2, by - 3, 2, 7, col)
			g.r(rx + 13 - p * 2, by - 3, 2, 7, col)
		}
		// strength meter over each lifter
		g.r(rx - 3, -44, 12, 3, T('#2a2e38'))
		g.r(rx - 2, -43, Math.min(10, 2 + plates * 3), 1, '#47f08a')
	}
	// a robot on the treadmill
	const tx = ix + 186
	g.r(tx - 4, -15, 18, 2, T('#2a2e38'))
	for (let k = 0; k < 18; k += 3) g.p(tx - 4 + ((k + Math.floor(t * 12)) % 18), -15, T('#6a7080'))
	g.r(tx + 12, -24, 1, 9, T('#2a2e38'))
	robot(g, tx, -15, Math.floor(t * 4) % 2 ? '#6ff0ff' : '#ffcf4a')
	// dumbbell rack
	g.r(ix + 110, -48, 20, 1, T('#3a3e4c'))
	for (let k = 0; k < 4; k++) {
		g.r(ix + 111 + k * 5, -51, 3, 2, T('#2a2e38'))
		g.r(ix + 112 + k * 5, -50, 1, 2, T('#9aa3ae'))
	}
}

/* ---------- Linea: the blueprint yard and a crane ---------- */

export const yard = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#9a9286', '#b2aa9e')
	// chain-link fence
	for (let x = -150; x < 150; x += 24) g.r(x, -34, 1, 23, T('#6a6f7c'))
	g.r(-150, -34, 300, 1, T('#6a6f7c'))
	g.d(-150, -33, 300, 21, T('#8b909a'))
	// site cabin
	g.r(-142, -34, 42, 23, T('#d9a43a'))
	g.r(-144, -36, 46, 2, T('#8a6a2a'))
	g.r(-136, -28, 10, 6, L('#3e4b66', '#ffd893', 0.3))
	g.r(-118, -28, 8, 17, T('#8a6a2a'))
	// tower crane with a trolley sliding along the jib
	const mx = -78
	const steel = T('#e0a23a')
	g.r(mx, -150, 1, 139, steel)
	g.r(mx + 5, -150, 1, 139, steel)
	for (let y = -150; y < -12; y += 6) {
		seg(g, mx, y, mx + 5, y + 6, steel)
		g.r(mx, y, 6, 1, steel)
	}
	g.r(mx - 36, -152, 140, 2, steel)
	for (let x = mx - 36; x < mx + 104; x += 6) g.p(x + 3, -153, steel)
	g.r(mx - 34, -150, 12, 7, T('#6a6f7c'))
	g.r(mx + 1, -160, 4, 8, steel)
	g.r(mx - 2, -146, 10, 6, T('#3a4258'))
	g.r(mx - 1, -145, 8, 3, L('#9fc4d4', '#ffe3a0', 0.3))
	const trolley = Math.round(mx + 30 + (Math.sin(t * 0.45) * 0.5 + 0.5) * 60)
	g.r(trolley - 2, -150, 5, 2, T('#3a3e4c'))
	g.r(trolley, -148, 1, 40, T('#2a2d38'))
	g.r(trolley - 6, -108, 13, 4, T('#2f63a8'))
	g.r(trolley - 6, -108, 13, 1, T('#eaf2ff'))
	if (Math.floor(t * 1.5) % 2 === 0) g.p(mx + 2, -161, '#ff4a3a')
	// two blueprint boards on easels, one drawing a plan
	const bx = -30
	g.r(bx, -98, 76, 52, T('#2a5ea8'))
	for (let x = bx + 4; x < bx + 76; x += 4) g.r(x, -98, 1, 52, T('#3a6eb8'))
	for (let y = -94; y < -46; y += 4) g.r(bx, y, 76, 1, T('#3a6eb8'))
	plan(g, bx + 8, -90, 60, 36, t, 3, T('#f4f8ff'))
	g.r(bx + 8, -46, 2, 35, T('#5a4234'))
	g.r(bx + 66, -46, 2, 35, T('#5a4234'))
	const ex = 60
	g.r(ex, -84, 62, 38, T('#2a5ea8'))
	for (let x = ex + 4; x < ex + 62; x += 4) g.r(x, -84, 1, 38, T('#3a6eb8'))
	// an elevation: a house front in white lines
	const ink = T('#f4f8ff')
	g.r(ex + 12, -66, 38, 1, ink)
	g.r(ex + 12, -66, 1, 16, ink)
	g.r(ex + 49, -66, 1, 16, ink)
	g.r(ex + 12, -51, 38, 1, ink)
	seg(g, ex + 10, -66, ex + 31, -78, ink)
	seg(g, ex + 31, -78, ex + 52, -66, ink)
	g.r(ex + 28, -60, 6, 9, ink)
	g.r(ex + 17, -62, 6, 5, ink)
	g.r(ex + 39, -62, 6, 5, ink)
	g.r(ex + 6, -46, 2, 35, T('#5a4234'))
	g.r(ex + 54, -46, 2, 35, T('#5a4234'))
	// a worker in a hard hat
	stander(g, 124, -12, 151, true, '#e0702a')
	g.r(124, -21, 4, 1, T('#ffc20e'))
	walker(g, 116, 150, -12, t, 152)
}

/* ---------- Cherry Hardware Agent: a circuit-board city and its inspector ---------- */

const TRACES: [number, number][][] = [
	[
		[-140, -20],
		[-100, -20],
		[-90, -30],
		[-60, -30],
	],
	[
		[-56, -42],
		[-20, -42],
		[-10, -52],
		[40, -52],
	],
	[
		[44, -26],
		[80, -26],
		[90, -16],
		[140, -16],
	],
	[
		[-110, -60],
		[-70, -60],
		[-60, -70],
		[10, -70],
	],
]

const along = (path: [number, number][], u: number): [number, number] => {
	const lens = path.slice(1).map((p, i) => Math.abs(p[0] - path[i][0]) + Math.abs(p[1] - path[i][1]))
	let d = u * lens.reduce((a, b) => a + b, 0)
	for (let i = 0; i < lens.length; i++) {
		if (d <= lens[i]) {
			const k = d / lens[i]
			return [path[i][0] + (path[i + 1][0] - path[i][0]) * k, path[i][1] + (path[i + 1][1] - path[i][1]) * k]
		}
		d -= lens[i]
	}
	return path[path.length - 1]
}

export const pcb = (g: Gfx, { t }: SceneArgs) => {
	const board = T('#1d6a44')
	const copper = T('#c9a24a')
	g.r(-152, -96, 304, 85, board)
	g.r(-152, -96, 304, 1, T('#2f8a5a'))
	g.r(-152, -12, 304, 10, T('#17583a'))
	for (let x = -150; x < 150; x += 8) g.p(x, -94, T('#2f8a5a'))
	// traces
	TRACES.forEach(path => {
		for (let i = 1; i < path.length; i++) seg(g, path[i - 1][0], path[i - 1][1], path[i][0], path[i][1], copper)
		g.disc(path[0][0], path[0][1], 1, copper)
		g.disc(path[path.length - 1][0], path[path.length - 1][1], 1, copper)
	})
	// components as buildings
	const chip = (x: number, y: number, w: number, h: number) => {
		g.r(x, y, w, h, T('#22252c'))
		g.r(x, y, w, 1, T('#3a3e4a'))
		for (let k = 2; k < w - 1; k += 3) {
			g.r(x + k, y - 2, 1, 2, T('#c8ccd4'))
			g.r(x + k, y + h, 1, 2, T('#c8ccd4'))
		}
		for (let k = 2; k < h - 1; k += 3) {
			g.r(x - 2, y + k, 2, 1, T('#c8ccd4'))
			g.r(x + w, y + k, 2, 1, T('#c8ccd4'))
		}
		g.p(x + 2, y + 2, T('#5a5e6a'))
	}
	chip(-126, -64, 40, 30)
	chip(0, -44, 24, 18)
	chip(70, -76, 30, 22)
	g.t(-114, -54, 'U1', T('#e8e8e0'), true)
	g.t(5, -38, 'U2', T('#e8e8e0'), true)
	g.t(78, -68, 'U3', T('#e8e8e0'), true)
	// capacitors: tall cylinders
	for (const [x, h, c] of [
		[-74, 40, '#2a6cb0'],
		[-62, 30, '#2a6cb0'],
		[44, 46, '#3a3e4a'],
		[118, 34, '#2a6cb0'],
	] as [number, number, string][]) {
		g.r(x, -12 - h, 9, h, T(c))
		g.r(x, -12 - h, 9, 2, T('#c8ccd4'))
		g.r(x + 1, -12 - h + 4, 2, h - 6, T('#7aa6d8'))
		g.r(x + 6, -12 - h + 2, 1, h - 2, T('#1a3a6a'))
	}
	// resistors with color bands
	for (const x of [-30, -16, 106]) {
		g.r(x, -20, 10, 4, T('#d8c49a'))
		g.r(x + 2, -20, 1, 4, T('#8a4a2a'))
		g.r(x + 4, -20, 1, 4, T('#2a2a2a'))
		g.r(x + 6, -20, 1, 4, T('#d94f4f'))
		g.r(x - 2, -18, 2, 1, T('#c8ccd4'))
		g.r(x + 10, -18, 2, 1, T('#c8ccd4'))
	}
	// an LED that blinks
	g.r(30, -22, 4, 4, Math.floor(t * 2) % 2 ? '#ff4a4a' : T('#7a2a2a'))
	g.r(31, -18, 1, 4, T('#c8ccd4'))
	// pulses running along the traces
	TRACES.forEach((path, i) => {
		const [px, py] = along(path, (t * 0.35 + i * 0.27) % 1)
		g.r(Math.round(px) - 1, Math.round(py) - 1, 3, 3, '#fff3b0')
	})
	// the inspector drone: scans a part, flags it, then clears it
	const cyc = t % 7
	const target = 0 + 12
	const dx = Math.round(-120 + Math.min(1, cyc / 3) * (target + 120))
	const dy = -86 + Math.round(Math.sin(t * 3))
	g.r(dx - 4, dy, 9, 2, T('#e4e7ee'))
	g.r(dx - 6, dy - 1, 3, 1, Math.floor(t * 10) % 2 ? T('#9aa3ae') : '#ffffff')
	g.r(dx + 4, dy - 1, 3, 1, Math.floor(t * 10) % 2 ? '#ffffff' : T('#9aa3ae'))
	g.p(dx, dy + 2, '#ff4a4a')
	g.c.globalAlpha = 0.18
	for (let r = 0; r < 34; r++) g.r(dx - Math.floor(r / 3), dy + 3 + r, 1 + Math.floor(r / 1.5), 1, '#7dffb0')
	g.c.globalAlpha = 1
	if (cyc > 3 && cyc < 5) {
		g.r(target - 1, -56, 3, 6, '#ff4a4a')
		g.r(target - 1, -48, 3, 2, '#ff4a4a')
	} else if (cyc >= 5) {
		g.p(target - 2, -52, '#47f08a')
		g.p(target - 1, -51, '#47f08a')
		g.p(target, -52, '#47f08a')
		g.p(target + 1, -53, '#47f08a')
		g.p(target + 2, -54, '#47f08a')
	}
}

/* ---------- Cherry Blossom: a workshop where a robot arm builds boards ---------- */

const BLOSSOM = ['#f6b6c8', '#f29ab4', '#ffd6e2']

export const workshop = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#b8b0a6', '#d0c8be')
	const x0 = -138
	const w0 = 220
	blocks(g, x0, -92, w0, 81, '#b07a5a', '#946248', 8, 4)
	g.r(x0 - 2, -94, w0 + 4, 3, T('#6a4430'))
	const ix = x0 + 8
	const iw = 204
	g.r(ix - 2, -84, iw + 4, 50, T('#5a3e30'))
	g.r(ix, -82, iw, 46, L('#e8e0d2', '#fff0d6', 0.45))
	// pegboard and tools, up high on the left
	g.r(ix + 6, -78, 44, 18, T('#c9a77a'))
	for (let y = -76; y < -60; y += 3) for (let x = ix + 8; x < ix + 50; x += 3) g.p(x, y, T('#9a7a52'))
	g.r(ix + 12, -74, 1, 10, T('#d94f4f'))
	g.r(ix + 11, -75, 3, 2, T('#3a3e4c'))
	g.r(ix + 20, -74, 1, 12, T('#2f6fb0'))
	g.r(ix + 28, -74, 4, 2, T('#3a3e4c'))
	g.r(ix + 29, -72, 1, 8, T('#3a3e4c'))
	g.r(ix + 38, -74, 6, 6, T('#e0a23a'))
	// an oscilloscope with a moving trace
	g.r(ix + 170, -80, 26, 16, T('#3a3e4c'))
	g.r(ix + 172, -78, 16, 11, T('#0e2418'))
	for (let x = 0; x < 16; x++) g.p(ix + 172 + x, -73 + Math.round(Math.sin(x * 0.8 + t * 6) * 3), '#7dffb0')
	g.r(ix + 190, -78, 4, 2, T('#d94f4f'))
	g.r(ix + 190, -74, 4, 2, T('#e0a23a'))
	// bench, raised behind the window line
	const by = -44
	g.r(ix + 60, by, 140, 3, T('#8a5a3a'))
	g.r(ix + 64, by + 3, 2, 8, T('#6a4430'))
	g.r(ix + 194, by + 3, 2, 8, T('#6a4430'))
	// the glowing board being populated
	const bx = ix + 96
	const k = lamps()
	g.c.globalAlpha = 0.25 + k * 0.25
	g.r(bx - 3, by - 5, 46, 6, '#7dffb0')
	g.c.globalAlpha = 1
	g.r(bx, by - 3, 40, 3, T('#1d6a44'))
	for (let x = bx + 2; x < bx + 40; x += 5) g.p(x, by - 2, '#9dffc4')
	const cycle = 0.9
	const n = Math.floor(t / cycle)
	const placed = n % 9
	for (let p = 0; p < placed; p++) g.r(bx + 3 + p * 4, by - 5, 3, 2, T(p % 3 === 0 ? '#22252c' : p % 3 === 1 ? '#2a6cb0' : '#d8c49a'))
	// parts tray
	const tray = bx + 66
	g.r(tray, by - 3, 14, 3, T('#3a3e4c'))
	for (let p = 0; p < 3; p++) g.r(tray + 1 + p * 4, by - 5, 3, 2, T('#22252c'))
	// the arm: base, shoulder, elbow, gripper moving tray -> board
	const ph = (t % cycle) / cycle
	const go = ph < 0.5 ? ph * 2 : 2 - ph * 2
	const fromX = tray + 6
	const toX = bx + 4 + placed * 4
	const hx = Math.round(toX + (fromX - toX) * (1 - go))
	const hy = Math.round(by - 7 - ARC(go) * 10)
	const baseX = bx + 54
	g.r(baseX - 3, by - 3, 7, 3, T('#e0a23a'))
	g.r(baseX - 1, by - 8, 3, 5, T('#c9881a'))
	const ex = Math.round((baseX + hx) / 2 + 2)
	const ey = Math.min(hy, by - 8) - 12
	seg(g, baseX, by - 8, ex, ey, T('#e0a23a'), 2)
	seg(g, ex, ey, hx, hy - 2, T('#e0a23a'), 2)
	g.r(ex - 1, ey - 1, 3, 3, T('#3a3e4c'))
	g.r(hx - 1, hy - 1, 1, 3, T('#3a3e4c'))
	g.r(hx + 1, hy - 1, 1, 3, T('#3a3e4c'))
	if (go > 0.5) g.r(hx - 1, hy + 1, 3, 2, T('#22252c'))
	// finished boards stacking up
	const stack = Math.floor(n / 9) % 7
	for (let s = 0; s < stack + 1; s++) {
		g.r(ix + 64, by - 2 - s * 3, 24, 2, T('#1d6a44'))
		g.r(ix + 64, by - 2 - s * 3, 24, 1, T('#3f9a6a'))
		g.p(ix + 66 + ((s * 5) % 18), by - 2 - s * 3, T('#c9a24a'))
	}
	// a little blossom in a pot on the bench
	g.r(ix + 180, by - 6, 6, 6, T('#c26a3a'))
	g.r(ix + 182, by - 14, 1, 8, T('#5e4334'))
	g.disc(ix + 183, by - 16, 3, T(BLOSSOM[0]))
	g.p(ix + 181, by - 17, T(BLOSSOM[2]))
	// outside: a cherry tree in bloom
	const tx = 124
	g.r(tx, -38, 3, 27, T('#5e4334'))
	seg(g, tx + 1, -30, tx - 8, -40, T('#5e4334'))
	seg(g, tx + 2, -32, tx + 12, -42, T('#5e4334'))
	g.disc(tx - 6, -46, 9, T(BLOSSOM[1]))
	g.disc(tx + 10, -48, 9, T(BLOSSOM[1]))
	g.disc(tx + 2, -54, 10, T(BLOSSOM[0]))
	g.disc(tx - 2, -57, 5, T(BLOSSOM[2]))
	g.disc(tx + 9, -51, 4, T(BLOSSOM[2]))
	walker(g, 90, 150, -12, t, 161, 'pack')
}

/* ---------- Used-Car Deal Finder: the lot and its price tags ---------- */

const CAR_COLS = ['#d94f4f', '#2f6fb0', '#e8e8ec', '#3f9a5a', '#e0a23a']

const auto = (g: Gfx, x: number, kind: number, col: string) => {
	const body = T(col)
	const glass = L('#8fb3d6', '#3a4560')
	const tire = T('#1b1d26')
	if (kind === 2) {
		// pickup
		g.r(x, -20, 34, 6, body)
		g.r(x + 2, -26, 13, 6, body)
		g.r(x + 4, -25, 9, 4, glass)
		g.r(x + 18, -21, 15, 1, T('#3a3e4c'))
	} else {
		const roofW = kind === 1 ? 18 : 16
		g.r(x, -20, 32, 6, body)
		g.r(x + 6, -26, roofW, 6, body)
		g.r(x + 8, -25, roofW - 4, 4, glass)
		g.r(x + 6 + Math.floor(roofW / 2), -25, 1, 4, body)
	}
	g.r(x, -15, 34, 1, T('#3a3e4c'))
	g.r(x + 33, -19, 1, 2, L('#f4f1dc', '#fff8cc', 0.3))
	for (const wx of [6, 25]) {
		g.disc(x + wx, -13, 3, tire)
		g.r(x + wx - 1, -14, 2, 2, T('#a5adb8'))
	}
}

export const carlot = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#55565e', '#6a6b73')
	// sales cabin
	g.r(-150, -40, 58, 29, T('#e8ecf1'))
	g.r(-152, -42, 62, 3, T('#2f6fb0'))
	g.r(-144, -34, 20, 10, L('#3e4b66', '#ffe3a0', 0.4))
	g.r(-116, -34, 10, 23, T('#3a3e4c'))
	g.r(-122, -76, 2, 34, T('#3a3e4c'))
	g.r(-130, -84, 18, 9, T('#ffc20e'))
	g.t(-124, -82, '$', T('#17142a'), true)
	// poles, floodlights and bunting
	for (const px of [-86, 146]) {
		g.r(px, -66, 2, 55, T('#3a3e4c'))
		g.r(px - 3, -68, 8, 3, L('#c8ccd6', '#fff6d0', 0.2))
	}
	const wave = Math.floor(t * 3) % 2
	const fl = ['#d94f4f', '#ffc20e', '#2f6fb0', '#3f9a5a']
	for (let x = -82; x < 144; x += 1) {
		const u = (x + 82) / 226
		const y = -62 + Math.round(ARC(u) * 6)
		g.p(x, y, T('#2a2d38'))
		if ((x + 82) % 8 === 0) {
			const c = T(fl[((x + 82) / 8) % 4])
			g.r(x, y + 1, 4, 2, c)
			g.r(x + 1, y + 3, 2, 1 + wave, c)
		}
	}
	// the cars, each with a tag; a scan passes and marks the best deal
	const scan = (t % 6) / 6
	const scanX = -90 + scan * 240
	const lot = [-84, 50, 92, -48]
	for (let k = 0; k < 4; k++) {
		const x = lot[k]
		auto(g, x, k % 3, CAR_COLS[k])
		const checked = scanX > x + 16
		const deal = k === 1
		const tag = checked && deal ? '#47f08a' : checked ? '#ffffff' : '#c9ccd4'
		g.r(x + 9, -36, 9, 7, T(tag))
		g.r(x + 13, -29, 1, 3, T('#3a3e4c'))
		g.t(x + 12, -35, '$', T('#17142a'), true)
		if (checked && deal && Math.floor(t * 4) % 2 === 0) {
			g.p(x + 20, -40, '#ffffff')
			g.p(x + 6, -38, '#ffffff')
		}
	}
	g.c.globalAlpha = 0.16
	g.r(Math.round(scanX), -60, 3, 48, '#7dd8ff')
	g.c.globalAlpha = 1
	walker(g, 60, 150, -12, t, 171)
}

/* ---------- CherryTerminal: a trading floor and a ticker ---------- */

export const trading = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#7c7a84', '#94929c')
	const x0 = -136
	const w0 = 216
	g.r(x0, -112, w0, 101, T('#2d3a52'))
	for (let y = -108; y < -64; y += 5) {
		for (let x = x0 + 4; x < x0 + w0 - 4; x += 6) {
			const on = hash(x * 3 + y * 7) > 0.4
			g.r(x, y, 4, 3, on ? L('#3e4e6a', '#ffd98a', 0.2) : T('#26324a'))
		}
	}
	// ticker band: arrows and bars scrolling by
	g.r(x0, -62, w0, 9, T('#0b0d14'))
	const shift = Math.floor(t * 14) % 12
	for (let x = x0 - shift; x < x0 + w0; x += 12) {
		if (x < x0 + 1 || x > x0 + w0 - 10) continue
		const up = hash(Math.floor((x + Math.floor(t * 14)) / 12)) > 0.4
		const c = up ? '#4ae08a' : '#ff5a6a'
		if (up) {
			g.p(x + 2, -60, c)
			g.r(x + 1, -59, 3, 1, c)
			g.r(x, -58, 5, 1, c)
		} else {
			g.r(x, -60, 5, 1, c)
			g.r(x + 1, -59, 3, 1, c)
			g.p(x + 2, -58, c)
		}
		g.r(x + 6, -59, 3, 1, '#ffb547')
		g.r(x + 6, -57, 4, 1, '#ffb547')
	}
	// the trading floor
	const fx = x0 + 8
	const fw = 200
	g.r(fx - 2, -50, fw + 4, 37, T('#1b2234'))
	g.r(fx, -48, fw, 35, L('#3a4660', '#4a5878', 0.3))
	// a wall screen with a line chart
	g.r(fx + 6, -46, 50, 18, T('#0b0d14'))
	let prev = -36
	for (let x = 0; x < 48; x++) {
		const y = -37 + Math.round(Math.sin(x * 0.3 + t * 1.2) * 3 + Math.sin(x * 0.11) * 3)
		g.r(fx + 7 + x, Math.min(prev, y), 1, Math.abs(prev - y) + 1, '#4ae08a')
		prev = y
	}
	// desks with three screens of candles
	for (let d = 0; d < 4; d++) {
		const dx = fx + 64 + d * 34
		g.r(dx, -22, 30, 2, T('#5a6070'))
		for (let m = 0; m < 3; m++) {
			const mx = dx + m * 10
			g.r(mx, -32, 9, 7, T('#0b0d14'))
			for (let c = 0; c < 3; c++) {
				const h = 1 + Math.floor(hash(d * 17 + m * 5 + c + Math.floor(t * 2)) * 4)
				const up = hash(d * 3 + m * 7 + c + Math.floor(t * 2)) > 0.45
				g.r(mx + 1 + c * 3, -27 - h, 2, h, up ? '#4ae08a' : '#ff5a6a')
			}
		}
		head(g, dx + 13, -19, 180 + d)
	}
	walker(g, 84, 150, -12, t, 181, 'case')
	lampPost(g, 96)
}

/* ---------- the depot at the end of the branch ---------- */

export const depot = (g: Gfx, { t }: SceneArgs) => {
	pad(g, -152, 152, '#7d7268', '#93887c')
	const x0 = -136
	const w0 = 180
	blocks(g, x0, -66, w0, 55, '#8a4a3a', '#6a3428', 6, 3)
	for (let k = 0; k < 7; k++) g.r(x0 + 10 + k * 24, -74, 10, 8, T('#5a3a30'))
	g.r(x0 - 2, -68, w0 + 4, 3, T('#4a2e26'))
	// three arched bays with parked cars inside
	const cars = ['#3f7a5a', '#8a2a3a', '#2f5ea8']
	for (let b = 0; b < 3; b++) {
		const bx = x0 + 12 + b * 56
		g.r(bx, -50, 44, 39, T('#1a1c26'))
		for (let r = 0; r < 6; r++) g.r(bx + 6 - r, -55 + r, 32 + r * 2, 1, T('#1a1c26'))
		g.r(bx + 6, -36, 32, 22, T(cars[b]))
		g.r(bx + 10, -32, 24, 6, L('#3e4b66', '#ffe39a', 0.3))
		g.disc(bx + 22, -18, 2, L('#d8d4c0', '#fff4c8', 0.4))
		g.r(bx + 6, -14, 32, 2, T('#2a2d38'))
	}
	// water tower on legs
	const wx = 64
	g.r(wx, -76, 26, 18, T('#7a5a42'))
	for (let y = -74; y < -58; y += 4) g.r(wx, y, 26, 1, T('#5a4030'))
	for (let r = 0; r < 6; r++) g.r(wx + r - 1, -82 + r, 28 - r * 2, 1, T('#4a3428'))
	g.r(wx + 2, -58, 2, 47, T('#4a3428'))
	g.r(wx + 22, -58, 2, 47, T('#4a3428'))
	seg(g, wx + 3, -56, wx + 23, -30, T('#4a3428'))
	seg(g, wx + 23, -56, wx + 3, -30, T('#4a3428'))
	// signal
	g.r(124, -50, 2, 39, T('#2a2d38'))
	g.r(120, -60, 10, 12, T('#1b1d26'))
	const go = Math.floor(t / 3) % 2 === 0
	g.disc(125, -57, 1, go ? '#47f08a' : T('#1f3a2a'))
	g.disc(125, -52, 1, go ? T('#3a1f1f') : '#ff4a4a')
	// fireflies after dusk
	if (lamps() > 0.5) {
		for (let i = 0; i < 7; i++) {
			if (Math.floor(t * 3 + i * 1.7) % 4 === 0) continue
			const fx = Math.round(-120 + hash(i * 7) * 240 + Math.sin(t + i) * 6)
			const fy = Math.round(-20 - hash(i * 7 + 1) * 30 + Math.cos(t * 1.3 + i) * 4)
			g.p(fx, fy, '#fff27a')
		}
	}
	lampPost(g, 52)
}

/* ---------- the terminus: a grand hall under the night sky ---------- */

export const EXITS = [
	{ label: 'RESUME', action: 'resume' },
	{ label: 'EMAIL', action: 'email' },
	{ label: 'GITHUB', action: 'github' },
	{ label: 'LINKEDIN', action: 'linkedin' },
]

export const terminus = (g: Gfx, { t, hit }: SceneArgs) => {
	pad(g, -170, 170, '#7c7a84', '#94929c')
	const x0 = -150
	const w0 = 300
	blocks(g, x0, -92, w0, 81, '#c9bfae', '#b3a994', 10, 5)
	g.r(x0 - 3, -95, w0 + 6, 4, T('#8a7f6c'))
	// wings: lit windows in two rows
	for (const side of [-1, 1]) {
		for (let r = 0; r < 2; r++) {
			for (let k = 0; k < 5; k++) {
				const wx = side < 0 ? x0 + 8 + k * 16 : 64 + k * 16
				win(g, wx, -84 + r * 22, 7, 12, 400 + r * 9 + k + side, 0.3, '#ddd3c0')
				g.r(wx + 1, -86 + r * 22, 5, 1, T('#ddd3c0'))
			}
		}
	}
	// the great arched window
	const ax = -54
	const aw = 108
	for (let x = 0; x <= aw; x++) {
		const u = x / aw - 0.5
		const top = -60 - Math.round(44 * Math.sqrt(Math.max(0, 0.25 - u * u)) * 2)
		g.r(ax + x, top - 2, 1, -32 - top + 2, T('#8a7f6c'))
		g.r(ax + x, top, 1, -34 - top, L('#3a4566', '#ffd98a', 0.15))
	}
	for (let x = ax + 9; x < ax + aw; x += 9) g.r(x, -104, 1, 70, T('#5a4e3c'))
	for (let y = -96; y < -34; y += 10) g.r(ax, y, aw, 1, T('#5a4e3c'))
	g.r(ax - 2, -34, aw + 4, 2, T('#8a7f6c'))
	// clock tower
	g.r(-12, -128, 24, 34, T('#c9bfae'))
	g.r(-14, -130, 28, 3, T('#8a7f6c'))
	for (let r = 0; r < 8; r++) g.r(-12 + r, -138 + r, 24 - r * 2, 1, T('#4f6e7a'))
	g.disc(0, -116, 7, T('#8a7f6c'))
	g.disc(0, -116, 6, L('#f1ede2', '#fff3c8', 0.4))
	const min = Math.floor(t * 0.4) % 12
	g.r(0, -121, 1, 5, T('#2a2a30'))
	const hand = [
		[0, -4],
		[2, -3],
		[3, -2],
		[4, 0],
		[3, 2],
		[2, 3],
		[0, 4],
		[-2, 3],
		[-3, 2],
		[-4, 0],
		[-3, -2],
		[-2, -3],
	][min]
	seg(g, 0, -116, hand[0], -116 + hand[1], T('#2a2a30'))
	// exit signs: Resume, Email, GitHub, LinkedIn
	EXITS.forEach((e, i) => {
		const sx = -134 + i * 70
		const sw = 50
		const sy = -46
		g.r(sx + 6, sy - 6, 1, 6, T('#3a3e4c'))
		g.r(sx + sw - 7, sy - 6, 1, 6, T('#3a3e4c'))
		g.r(sx, sy, sw, 12, '#0e5a2e')
		g.r(sx + 1, sy + 1, sw - 2, 10, '#00813f')
		g.r(sx + 1, sy + 1, sw - 2, 1, '#2fa860')
		const tw = e.label.length * 4 - 1
		g.t(sx + Math.floor((sw - tw) / 2), sy + 4, e.label, '#ffffff', true)
		hit(sx, sy, sw, 12, e.action)
	})
	// light spilling onto the plaza
	g.c.globalAlpha = 0.18 * lamps()
	g.r(ax - 10, -12, aw + 20, 10, '#ffd98a')
	g.c.globalAlpha = 1
	walker(g, -150, -60, -12, t, 191, 'case')
	walker(g, 60, 160, -12, t + 4, 195, 'pack')
}
