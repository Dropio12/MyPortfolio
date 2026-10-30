// Cut paper, drawn the way scissors cut it: each side is a run of nearly straight strokes, each
// stroke drifts a hair off the ideal line, the blade leaves a tiny step where it restarts, and the
// corners are either sharp or snipped. Everything is seeded by the card's id, so a card keeps the
// same outline on every render and every visit.

/** a small seeded generator (xmur3 hash into mulberry32) */
export const seeded = (seed: string) => {
	let h = 1779033703 ^ seed.length
	for (let i = 0; i < seed.length; i++) {
		h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
		h = (h << 13) | (h >>> 19)
	}
	let a = h >>> 0
	return () => {
		a = (a + 0x6d2b79f5) | 0
		let t = Math.imul(a ^ (a >>> 15), 1 | a)
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

/** the small resting tilt of a sheet, in degrees (about ±0.8) */
export const tiltOf = (seed: string, range = 0.8) => {
	const r = seeded(`${seed}:tilt`)
	return Math.round((r() * 2 - 1) * range * 100) / 100
}

type Pt = [number, number]

const round = (n: number) => Math.round(n * 10) / 10

/**
 * The outline of a sheet `w` by `h` pixels, as an SVG path. `inset` keeps the cut inside the box,
 * `drift` is how far a stroke may wander off the ideal edge.
 */
export const cutPath = (seed: string, w: number, h: number, inset = 4, drift = 3): string => {
	if (w < 24 || h < 24) return `M0 0H${w}V${h}H0Z`
	const r = seeded(seed)
	const j = (n: number) => r() * n
	// a hand never cuts a perfect right angle
	const corners: Pt[] = [
		[inset + j(1.6), inset + j(1.6)],
		[w - inset - j(1.6), inset + j(1.6)],
		[w - inset - j(1.6), h - inset - j(1.6)],
		[inset + j(1.6), h - inset - j(1.6)],
	]
	// longer strokes on bigger sheets, as with real scissors
	const reach = Math.min(1.8, Math.max(1, Math.max(w, h) / 420))
	const pts: Pt[] = []

	for (let c = 0; c < 4; c++) {
		const a = corners[c]
		const b = corners[(c + 1) % 4]
		const prev = corners[(c + 3) % 4]
		const len = Math.hypot(b[0] - a[0], b[1] - a[1])
		const dx = (b[0] - a[0]) / len
		const dy = (b[1] - a[1]) / len
		// inward normal for a clockwise outline in screen space
		const nx = -dy
		const ny = dx

		// the corner: sharp, or snipped with a tiny diagonal cut
		if (r() < 0.5) {
			const k = 2 + j(3.2)
			const pl = Math.hypot(a[0] - prev[0], a[1] - prev[1])
			pts.push([a[0] + ((prev[0] - a[0]) / pl) * k, a[1] + ((prev[1] - a[1]) / pl) * k])
			pts.push([a[0] + dx * k, a[1] + dy * k])
		} else pts.push(a)

		// the side: strokes of 38 to 96 px, each nearly straight
		let s = 0
		let off = 0
		while (true) {
			const step = (38 + j(58)) * reach
			const s1 = s + step
			if (s1 > len - 14) break
			// fade the drift near the corners so the outline meets them cleanly
			const ease = Math.min(1, s1 / 20, (len - s1) / 20)
			off = Math.max(0, Math.min(drift, off + (r() - 0.5) * 2.4)) * ease
			pts.push([a[0] + dx * s1 + nx * off, a[1] + dy * s1 + ny * off])
			// where the blade restarts, it leaves a step a fraction of a pixel deep
			const jump = (r() - 0.5) * 1.4
			const off2 = Math.max(0, Math.min(drift, off + jump)) * ease
			pts.push([a[0] + dx * (s1 + 0.7) + nx * off2, a[1] + dy * (s1 + 0.7) + ny * off2])
			off = off2
			s = s1
		}
	}
	return `M${pts.map(p => `${round(p[0])} ${round(p[1])}`).join('L')}Z`
}
