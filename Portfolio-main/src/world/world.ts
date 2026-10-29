// The world: one canvas, a camera on a long side-scrolling line, and the loop that
// draws it only when the camera moves or the ambient clock ticks (about 12 fps).
import { Gfx, T, hash, mix, setLight, smooth, sprite } from './gfx'
import { textWidth } from './font'
import { Light, drawClouds, drawFlyers, drawSky, drawStars, drawSunMoon, lightAt } from './sky'
import { drawFiller, drawGround, drawHills, drawMid, drawPlatform, drawSkyline, makeFiller } from './layers'
import { GROUND, LINE_COLOR, LINE_INK, SceneId, WorldStop, makeRegions, stopX } from './geo'
import { drawTrain } from './actors'
import { Hit, SceneArgs, arena, campus, datacenter, lecture, street, tower } from './scenes-a'
import { carlot, depot, gym, hotel, lab, law, pcb, studio, terminus, trading, workshop, yard } from './scenes-b'

type Painter = (g: Gfx, a: SceneArgs) => void

const SCENES: Record<SceneId, Painter> = {
	campus,
	tower,
	arena,
	lecture,
	datacenter,
	street,
	law,
	studio,
	hotel,
	lab,
	gym,
	yard,
	pcb,
	workshop,
	carlot,
	trading,
	depot,
	terminus,
}

const CANOPY: Partial<Record<SceneId, string>> = {
	campus: '#4f6e7a',
	tower: '#2f4a6a',
	arena: '#5a3f6e',
	street: '#6a5acd',
	hotel: '#8a2a3a',
	pcb: '#1d6a44',
	workshop: '#b05a7a',
	terminus: '#2a2e3a',
}

const BULLET = sprite(['.#####.', '#######', '#######', '#######', '#######', '#######', '.#####.'])

export type HitBox = { x: number; y: number; w: number; h: number; action: string }

export type Frame = { camX: number; index: number; u: number }

const SNOW = Array.from({ length: 110 }, (_, i) => ({ a: hash(i * 5 + 1), b: hash(i * 5 + 2), c: hash(i * 5 + 3) }))

export class World {
	stops: WorldStop[]
	region: ReturnType<typeof makeRegions>
	filler: ReturnType<typeof makeFiller>
	lastX: number
	canvas: HTMLCanvasElement | null = null
	g: Gfx | null = null
	W = 320
	H = 180
	focalFrac = 0.66
	camX = 0
	target = 0
	still = false
	hits: HitBox[] = []
	img: HTMLCanvasElement | null = null
	onFrame: ((camX: number) => void) | null = null
	private raf = 0
	private lastT = 0
	private lastTick = -1
	private dirty = true
	private running = false
	private clock = 0

	constructor(stops: WorldStop[]) {
		this.stops = stops
		this.region = makeRegions(stops)
		this.filler = makeFiller(stops.length, this.region)
		this.lastX = stopX(stops.length - 1)
	}

	/* ---------- sizing: an integer number of device pixels per world pixel ---------- */

	attach(canvas: HTMLCanvasElement) {
		this.canvas = canvas
	}

	/**
	 * cover: the CSS pixels on the left that a panel covers. The scale is a whole number of device
	 * pixels, picked so the open part of the screen shows about 280 world pixels.
	 */
	resize(cssW: number, cssH: number, cover: number, maxH: number) {
		const canvas = this.canvas
		if (!canvas || cssW < 1 || cssH < 1) return
		const dpr = window.devicePixelRatio || 1
		const devW = Math.round(cssW * dpr)
		const devH = Math.round(cssH * dpr)
		const open = Math.max(devW * 0.4, (cssW - cover) * dpr)
		const scale = Math.max(1, Math.ceil(devH / maxH), Math.round(open / 280))
		this.W = Math.ceil(devW / scale)
		this.H = Math.ceil(devH / scale)
		const coverPx = (cover * dpr) / scale
		this.focalFrac = Math.min(0.75, (coverPx + this.W) / 2 / this.W)
		canvas.width = this.W
		canvas.height = this.H
		canvas.style.width = `${(this.W * scale) / dpr}px`
		canvas.style.height = `${(this.H * scale) / dpr}px`
		const ctx = canvas.getContext('2d', { alpha: false })
		if (!ctx) return
		ctx.imageSmoothingEnabled = false
		this.g = new Gfx(ctx, this.W, this.H)
		this.dirty = true
		this.draw()
	}

	/* ---------- the line: hour of day, train stripe ---------- */

	segment(x: number) {
		const n = this.stops.length
		const f = Math.max(0, Math.min(n - 1, x / stopX(1)))
		const i = Math.min(n - 2, Math.floor(f))
		return { i, u: f - i }
	}

	hourAt(x: number) {
		const { i, u } = this.segment(x)
		return this.stops[i].hour + (this.stops[i + 1].hour - this.stops[i].hour) * u
	}

	stripeAt(x: number) {
		const { i, u } = this.segment(x)
		const a = LINE_COLOR[this.stops[i].primary]
		const b = LINE_COLOR[this.stops[i + 1].primary]
		return T(mix(a, b, smooth((u - 0.35) / 0.3)))
	}

	/* ---------- the billboard: the real shop.com page at 112 by 70 ---------- */

	private imgWaiters: (() => void)[] = []
	private imgLoading = false

	loadBillboard(url: string, then?: () => void) {
		if (this.img) {
			if (then) then()
			return
		}
		if (then) this.imgWaiters.push(then)
		if (this.imgLoading) return
		this.imgLoading = true
		const im = new Image()
		im.decoding = 'async'
		im.onload = () => {
			const mid = document.createElement('canvas')
			mid.width = 448
			mid.height = 280
			const mc = mid.getContext('2d')
			const out = document.createElement('canvas')
			out.width = 112
			out.height = 70
			const oc = out.getContext('2d')
			if (!mc || !oc) return
			mc.imageSmoothingQuality = 'high'
			mc.drawImage(im, 0, 0, 448, 280)
			oc.imageSmoothingQuality = 'high'
			oc.drawImage(mid, 0, 0, 112, 70)
			const data = oc.getImageData(0, 0, 112, 70)
			const d = data.data
			for (let k = 0; k < d.length; k += 4) {
				d[k] = Math.min(255, Math.round(d[k] / 36) * 36 + 8)
				d[k + 1] = Math.min(255, Math.round(d[k + 1] / 36) * 36 + 8)
				d[k + 2] = Math.min(255, Math.round(d[k + 2] / 36) * 36 + 10)
			}
			oc.putImageData(data, 0, 0)
			this.img = out
			this.dirty = true
			if (this.g) this.draw()
			this.imgWaiters.forEach(f => f())
			this.imgWaiters = []
		}
		im.src = url
	}

	/* ---------- drawing ---------- */

	/** the nameboard: on two posts at the platform's left end, or hung high at the terminus */
	private sign(g: Gfx, s: WorldStop, index: number, half: number, hung: boolean, hit: Hit) {
		const nameW = textWidth(s.sign)
		const subW = s.sub ? textWidth(s.sub, true) : 0
		const bw = s.lines.length * 8
		const w = bw + 2 + Math.max(nameW, subW) + 9
		const h = s.sub ? 21 : 14
		const bottom = hung ? -60 : -32
		const x = hung ? -Math.floor(w / 2) : -Math.min(half - 4, 118)
		const y = bottom - h
		if (!hung) {
			g.r(x + 5, bottom, 1, 21, T('#2a2d3a'))
			g.r(x + w - 6, bottom, 1, 21, T('#2a2d3a'))
		}
		g.r(x, y, w, h, '#0c1030')
		g.r(x + 1, y + 1, w - 2, h - 2, T('#1f2750'))
		g.r(x + 1, y + 1, w - 2, 1, T('#3a4478'))
		s.lines.forEach((id, k) => {
			const bx = x + 4 + k * 8
			g.spr(bx, y + 3, BULLET, { '#': LINE_COLOR[id] })
			g.t(bx + 2, y + 4, id, LINE_INK[id], true)
		})
		g.t(x + 5 + bw + 1, y + 4, s.sign, '#ffffff')
		if (s.sub) g.t(x + 5 + bw + 1, y + 13, s.sub, '#c9d2ff', true)
		hit(x, y, w, h, `stop:${index}`)
	}

	renderTo(g: Gfx, camX: number, t: number, focal: number, collectHits: boolean) {
		const { W, H } = g
		const gy = H - GROUND
		const hour = this.hourAt(camX)
		const l: Light = lightAt(hour)
		setLight(l.amb, l.lamps, l.bot)
		if (collectHits) this.hits = []
		const hit: Hit = (x, y, w, h, action) => {
			if (collectHits) this.hits.push({ x: g.ox + x, y: g.oy + y, w, h, action })
		}

		drawSky(g, l, gy - 6)
		drawStars(g, l, t, camX)
		drawSunMoon(g, l, gy - 30)
		drawClouds(g, l, t, camX)
		drawFlyers(g, l, t, camX)
		const x1 = stopX(1)
		const snowK = 1 - smooth((camX - x1 * 0.4) / (x1 * 1.4))
		drawHills(g, l, camX, gy - 20, snowK)
		drawSkyline(g, camX, gy - 14, smooth((camX - x1 * 0.3) / (x1 * 0.9)), t)
		drawMid(g, camX, focal, gy - 4, this.region, t)
		drawGround(g, camX, focal, gy, this.region)
		drawFiller(g, this.filler, camX, focal, gy)

		this.stops.forEach((s, i) => {
			const sx = stopX(i) - camX + focal
			if (sx < -190 || sx > W + 190) return
			g.at(sx, gy)
			SCENES[s.scene](g, { t, hit, img: this.img })
			const half = s.platform || 118
			const hung = s.scene === 'terminus'
			g.at(sx, gy)
			drawPlatform(g, half, CANOPY[s.scene] || '#3f4a63', !hung)
			this.sign(g, s, i, half, hung, hit)
		})

		drawTrain(g, focal, gy, this.stripeAt(camX), camX, Math.abs(this.target - camX) > 0.4)

		// weather: snow around Laval, blossom petals around the workshop
		const iShop = this.stops.findIndex(s => s.scene === 'workshop')
		const snow = 1 - smooth((camX - x1 * 0.35) / (x1 * 0.5))
		const petals = iShop < 0 ? 0 : 1 - smooth((Math.abs(camX - stopX(iShop)) - 120) / 160)
		if (snow > 0.02 || petals > 0.02) {
			const c = g.c
			const span = W + 24
			const count = Math.floor(SNOW.length * Math.max(snow, petals * 0.35))
			for (let k = 0; k < count; k++) {
				const f = SNOW[k]
				const speed = snow > petals ? 10 + f.c * 14 : 6 + f.c * 5
				const x = ((((f.a * span - camX * (0.8 + f.c * 0.3) + Math.sin(t * 1.3 + k) * 3 + t * (snow > petals ? 0 : 9)) % span) + span) % span) - 12
				const y = ((f.b * (H + 10) + t * speed) % (H + 10)) - 6
				c.globalAlpha = snow > petals ? 0.9 * snow : petals
				c.fillStyle = snow > petals ? '#ffffff' : k % 2 ? '#f6b6c8' : '#ffd6e2'
				c.fillRect(Math.floor(x), Math.floor(y), f.c > 0.82 ? 2 : 1, f.c > 0.82 && snow > petals ? 2 : 1)
			}
			c.globalAlpha = 1
		}
		g.at(0, 0)
	}

	/** draw the main canvas now */
	draw() {
		const g = this.g
		if (!g) return
		const focal = Math.round(this.W * this.focalFrac)
		this.renderTo(g, this.camX, this.clock, focal, true)
		this.dirty = false
		if (this.onFrame) this.onFrame(this.camX)
	}

	/** a still of one stop, for the list view and reduced motion */
	drawStill(canvas: HTMLCanvasElement, index: number) {
		const W = 300
		const H = 170
		canvas.width = W
		canvas.height = H
		const ctx = canvas.getContext('2d', { alpha: false })
		if (!ctx) return
		ctx.imageSmoothingEnabled = false
		const g = new Gfx(ctx, W, H)
		this.renderTo(g, stopX(index), 2.2, Math.round(W / 2), false)
	}

	/* ---------- the loop ---------- */

	setTarget(x: number) {
		this.target = Math.max(0, Math.min(this.lastX, x))
		if (this.still) {
			this.camX = this.target
			this.dirty = true
			if (!this.running) this.draw()
		}
		this.wake()
	}

	jumpTo(x: number) {
		this.target = x
		this.camX = x
		this.dirty = true
		this.draw()
	}

	wake() {
		if (this.running || typeof document === 'undefined' || document.hidden || this.still) {
			if (this.still && this.dirty) this.draw()
			return
		}
		this.running = true
		this.lastT = performance.now()
		this.raf = requestAnimationFrame(this.loop)
	}

	stop() {
		this.running = false
		cancelAnimationFrame(this.raf)
	}

	private loop = (now: number) => {
		if (!this.running) return
		const dt = Math.min(0.1, (now - this.lastT) / 1000)
		this.lastT = now
		const d = this.target - this.camX
		if (Math.abs(d) > 0.05) {
			this.camX += d * (1 - Math.exp(-dt * 6.5))
			this.dirty = true
		} else if (d !== 0) {
			this.camX = this.target
			this.dirty = true
		}
		this.clock += dt
		const tick = Math.floor(this.clock * 12)
		if (tick !== this.lastTick) {
			this.lastTick = tick
			this.dirty = true
		}
		if (this.dirty) {
			const t = this.clock
			this.clock = tick / 12
			this.draw()
			this.clock = t
		}
		this.raf = requestAnimationFrame(this.loop)
	}

	hitAt(px: number, py: number) {
		for (let k = this.hits.length - 1; k >= 0; k--) {
			const h = this.hits[k]
			if (px >= h.x && px < h.x + h.w && py >= h.y && py < h.y + h.h) return h.action
		}
		return null
	}
}
