import { BufferAttribute, BufferGeometry, Group, IcosahedronGeometry, Matrix4, Mesh, PerspectiveCamera, PlaneGeometry, Points, Quaternion, Scene, ShaderMaterial, Vector3, WebGLRenderer } from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { agent, agentLevel } from '../lib/agent'

// The agent: a hollow sphere knitted from blue thread. Hexagon cells (a few pentagons) with
// nothing inside them, a small knot where three threads meet. When it first appears the thread
// winds itself on from the top, row by row. Threads facing you are darker and thicker, the far
// side shows through thin and pale, so it reads as one big open ball. It leans toward the
// pointer and the net swells where the pointer is, with one ripple running out; while the
// visitor speaks, the mic level makes the whole net ripple; typing deepens the blue and spins it
// a little faster; answering sweeps a band of light across it; idle, it barely breathes.
// It stops drawing off screen and in a hidden tab, and caps the pixel ratio.

export type OrbHandle = { dispose: () => void }

type Options = { hero: HTMLElement }

/** how finely it is knitted: each face of an icosahedron is split into (DETAIL + 1)² triangles */
const DETAIL = 12
/** thread width in CSS pixels, on the near side and the far side */
const LINE_NEAR = 1.25
const LINE_FAR = 0.65
/** seconds for the thread to wind on */
const WEAVE = 2.1

/* ---------- the net ---------- */

type Net = { verts: Float32Array; edges: Uint16Array }

// a geodesic sphere, then its dual: one knot at the centre of each triangle, one thread between
// triangles that share a side, which leaves hexagons and twelve pentagons
const knit = (detail: number): Net => {
	const pos = new IcosahedronGeometry(1, detail).getAttribute('position')
	const ids = new Map<string, number>()
	const pts: number[] = []
	const corners: number[] = []
	for (let i = 0; i < pos.count; i++) {
		const x = pos.getX(i)
		const y = pos.getY(i)
		const z = pos.getZ(i)
		const key = `${Math.round(x * 1e4)},${Math.round(y * 1e4)},${Math.round(z * 1e4)}`
		let id = ids.get(key)
		if (id === undefined) {
			id = pts.length / 3
			ids.set(key, id)
			const l = Math.hypot(x, y, z)
			pts.push(x / l, y / l, z / l)
		}
		corners.push(id)
	}
	const centres: number[] = []
	const owner = new Map<number, number>()
	const edges: number[] = []
	for (let f = 0; f < corners.length; f += 3) {
		const tri = f / 3
		let cx = 0
		let cy = 0
		let cz = 0
		for (let j = 0; j < 3; j++) {
			const v = corners[f + j] * 3
			cx += pts[v]
			cy += pts[v + 1]
			cz += pts[v + 2]
		}
		const l = Math.hypot(cx, cy, cz)
		centres.push(cx / l, cy / l, cz / l)
		for (let j = 0; j < 3; j++) {
			const a = corners[f + j]
			const b = corners[f + ((j + 1) % 3)]
			const side = a < b ? a * 65536 + b : b * 65536 + a
			const other = owner.get(side)
			if (other === undefined) owner.set(side, tri)
			else edges.push(other, tri)
		}
	}
	return { verts: new Float32Array(centres), edges: new Uint16Array(edges) }
}

/* ---------- colour ---------- */

type RGB = [number, number, number]
const hex = (h: number): RGB => [((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255]
const NEAR = hex(0x1f45f5)
const SIDE = hex(0x6c8cff)
const FAR = hex(0xd3dfff)
const CYAN = hex(0x14b4ff)
const VIOLET = hex(0x7b62ff)
const DEEP = hex(0x1530c8)

const smooth = (a: number, b: number, x: number) => {
	const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
	return t * t * (3 - 2 * t)
}

/* ---------- the swell: a few slow waves travelling over the sphere ---------- */

const WAVES = [
	{ d: [0.62, 0.55, 0.56], k: 3.1, s: 0.9, o: 0.0, a: 0.5 },
	{ d: [-0.48, 0.71, -0.51], k: 4.3, s: -1.2, o: 1.7, a: 0.3 },
	{ d: [0.12, -0.42, 0.9], k: 5.7, s: 1.5, o: 4.1, a: 0.2 },
	{ d: [-0.83, -0.2, 0.52], k: 7.9, s: -2.1, o: 2.6, a: 0.12 },
].map(w => {
	const l = Math.hypot(w.d[0], w.d[1], w.d[2])
	return { ...w, d: [w.d[0] / l, w.d[1] / l, w.d[2] / l] }
})
const WAVE_SUM = WAVES.reduce((s, w) => s + w.a, 0)

/* ---------- shaders: the knots, and the aura behind the ball ---------- */

const KNOT_VERT = /* glsl */ `
	attribute vec3 aColor;
	attribute float aSize;
	uniform float uDpr;
	varying vec3 vC;
	void main() {
		vC = aColor;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		gl_PointSize = aSize * uDpr;
	}
`

const KNOT_FRAG = /* glsl */ `
	varying vec3 vC;
	void main() {
		float d = length(gl_PointCoord - 0.5);
		if (d > 0.5) discard;
		gl_FragColor = vec4(vC, smoothstep(0.5, 0.3, d));
	}
`

const HALO_VERT = /* glsl */ `
	varying vec2 vP;
	uniform float uSize;
	void main() {
		vP = (uv - 0.5) * uSize;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`

const HALO_FRAG = /* glsl */ `
	uniform float uTime;
	uniform float uEnergy;
	uniform float uPulse;
	uniform float uRadius;
	uniform float uReveal;
	varying vec2 vP;
	float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
	void main() {
		float r = length(vP) / uRadius;
		// the inside stays almost white so the ball reads hollow; a soft glow hugs the thread
		// and a wide, quiet aura fades out into the page
		float inside = 1.0 - smoothstep(0.2, 1.05, r);
		float hug = exp(-pow((r - 1.0) / 0.3, 2.0));
		float far = exp(-pow(max(r - 0.7, 0.0) / 1.25, 2.0));
		float ang = atan(vP.y, vP.x);
		float drift = 0.5 + 0.5 * sin(ang * 2.0 + uTime * 0.35);
		vec3 col = mix(vec3(0.5, 0.68, 1.0), vec3(0.66, 0.62, 1.0), drift * 0.6);
		float a = inside * 0.035 + hug * (0.075 + uEnergy * 0.04 + uPulse * 0.14) + far * (0.085 + uEnergy * 0.02 + uPulse * 0.06);
		a *= uReveal;
		// a steady dither: the glow fades over many 8-bit alpha steps, and without it each step shows as a ring
		a += (hash(gl_FragCoord.xy) - 0.5) * (1.6 / 255.0) * step(0.0004, a);
		gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
	}
`

const damp = (from: number, to: number, rate: number, dt: number) => from + (to - from) * (1 - Math.exp(-rate * dt))

export const createOrb = (canvas: HTMLCanvasElement, { hero }: Options): OrbHandle => {
	const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
	renderer.setClearColor(0x000000, 0)
	const scene = new Scene()
	const camera = new PerspectiveCamera(30, 1, 0.1, 60)
	camera.position.set(0, 0, 10)

	/* ---------- the net, its two thread layers and its knots ---------- */

	const { verts, edges } = knit(DETAIL)
	const nv = verts.length / 3
	const ne = edges.length / 2

	// the order the thread winds on: top to bottom, with a slight spiral around the axis
	const vOrder = new Float32Array(nv)
	for (let v = 0; v < nv; v++) {
		const x = verts[v * 3]
		const y = verts[v * 3 + 1]
		const z = verts[v * 3 + 2]
		vOrder[v] = (Math.acos(Math.max(-1, Math.min(1, y))) / Math.PI) * 0.86 + (Math.atan2(z, x) / (2 * Math.PI) + 0.5) * 0.14
	}

	const layer = (width: number) => {
		const geo = new LineSegmentsGeometry()
		geo.setPositions(new Float32Array(ne * 6))
		geo.setColors(new Float32Array(ne * 6))
		const mat = new LineMaterial({ color: 0xffffff, linewidth: width, vertexColors: true, worldUnits: false, depthTest: false, depthWrite: false })
		const lines = new LineSegments2(geo, mat)
		lines.frustumCulled = false
		return {
			lines,
			geo,
			mat,
			pos: geo.attributes.instanceStart.data,
			col: geo.attributes.instanceColorStart.data,
		}
	}
	const far = layer(LINE_FAR)
	const near = layer(LINE_NEAR)
	far.lines.renderOrder = 2
	near.lines.renderOrder = 3

	const knotGeo = new BufferGeometry()
	const knotPos = new Float32Array(nv * 3)
	const knotCol = new Float32Array(nv * 3)
	const knotSize = new Float32Array(nv)
	knotGeo.setAttribute('position', new BufferAttribute(knotPos, 3))
	knotGeo.setAttribute('aColor', new BufferAttribute(knotCol, 3))
	knotGeo.setAttribute('aSize', new BufferAttribute(knotSize, 1))
	const knotMat = new ShaderMaterial({
		vertexShader: KNOT_VERT,
		fragmentShader: KNOT_FRAG,
		uniforms: { uDpr: { value: 1 } },
		transparent: true,
		depthTest: false,
		depthWrite: false,
	})
	const knots = new Points(knotGeo, knotMat)
	knots.frustumCulled = false
	knots.renderOrder = 4

	const ball = new Group()
	ball.add(far.lines, near.lines, knots)

	const shared = {
		uTime: { value: 0 },
		uEnergy: { value: 0 },
		uPulse: { value: 0 },
	}
	const haloGeo = new PlaneGeometry(1, 1)
	const haloMat = new ShaderMaterial({
		vertexShader: HALO_VERT,
		fragmentShader: HALO_FRAG,
		uniforms: { ...shared, uSize: { value: 1 }, uRadius: { value: 1 }, uReveal: { value: 0 } },
		transparent: true,
		depthTest: false,
		depthWrite: false,
	})
	const halo = new Mesh(haloGeo, haloMat)
	halo.renderOrder = 1
	scene.add(halo, ball)

	/* ---------- size ---------- */

	let radius = 1
	let pxPerUnit = 1
	const resize = () => {
		const w = canvas.clientWidth
		const h = canvas.clientHeight
		if (!w || !h) return
		const dpr = Math.min(window.devicePixelRatio || 1, 2)
		renderer.setPixelRatio(dpr)
		renderer.setSize(w, h, false)
		knotMat.uniforms.uDpr.value = dpr
		camera.aspect = w / h
		camera.updateProjectionMatrix()
		pxPerUnit = h / (2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360))
		// the ball fills the height of its place in the column (.hero__orb); the canvas spills past it
		const r = (canvas.parentElement?.clientHeight || h * 0.42) / 2
		radius = r / pxPerUnit
		const span = Math.max(w, h) / pxPerUnit
		halo.scale.set(span * 1.25, span * 1.25, 1)
		haloMat.uniforms.uSize.value = span * 1.25
		haloMat.uniforms.uRadius.value = radius
		halo.position.z = -radius * 1.2
	}
	resize()
	const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
	ro?.observe(canvas)

	/* ---------- the pointer (mouse, pen, or a finger dragging) ---------- */

	const pointer = { x: 0, y: 0, active: false, at: 0 }
	const place = (x: number, y: number) => {
		pointer.x = x
		pointer.y = y
		pointer.active = true
		pointer.at = performance.now()
	}
	const onMove = (e: PointerEvent) => place(e.clientX, e.clientY)
	const onTouch = (e: TouchEvent) => {
		const t = e.touches[0]
		if (t) place(t.clientX, t.clientY)
	}
	const onLeave = () => (pointer.active = false)
	const onOut = (e: MouseEvent) => {
		if (!e.relatedTarget) pointer.active = false
	}
	window.addEventListener('pointermove', onMove, { passive: true })
	window.addEventListener('touchmove', onTouch, { passive: true })
	window.addEventListener('touchend', onLeave, { passive: true })
	window.addEventListener('blur', onLeave)
	document.addEventListener('mouseout', onOut)

	/* ---------- the loop ---------- */

	const s = { energy: 0, shimmer: 0, pulse: 0, bulge: 0, lx: 0, ly: 0, phase: 0, spin: 0, amp: 0.016, freq: 1 }
	const disp = new Float32Array(nv * 3)
	const face = new Float32Array(nv)
	const col = new Float32Array(nv * 3)
	const shown = new Float32Array(nv)
	const ndc = new Vector3()
	const dir = new Vector3()
	const toBall = new Vector3()
	const hit = new Vector3()
	const point = new Vector3(0, 0, 1)
	const local = new Vector3(0, 0, 1)
	const spinQ = new Quaternion()
	const rot = new Matrix4()
	const sweepDir = new Vector3(0.82, 0.5, 0.28).normalize()
	let visible = true
	let raf = 0
	let last = performance.now()
	let t = 0

	const frame = (now: number) => {
		raf = 0
		const dt = Math.min(0.05, (now - last) / 1000)
		last = now
		t += dt
		const woven = Math.min(1, t / WEAVE)
		// the pointer and the voice only take hold once the ball has finished winding on
		const settled = smooth(0.7, 1, woven)

		const typing = now - agent.typedAt < 900
		const sinceDone = (now - agent.doneAt) / 1000
		const bloom = agent.doneAt && sinceDone < 1.6 ? Math.pow(1 - sinceDone / 1.6, 2) : 0
		const energyTo = Math.max(typing ? 1 : 0, agent.busy ? 0.55 : 0, agent.focused ? 0.28 : 0, bloom * 0.8)
		s.energy = damp(s.energy, energyTo, typing ? 6 : 2, dt)
		s.shimmer = damp(s.shimmer, agent.busy ? 1 : 0, agent.busy ? 5 : 1.5, dt)
		let level = 0
		if (agent.listening) {
			const real = agentLevel()
			level = real >= 0 ? real : 0.28 + 0.2 * Math.sin(t * 2.7) + 0.12 * Math.sin(t * 6.3 + 1.1)
		}
		s.pulse = damp(s.pulse, level * settled, agent.listening ? 16 : 3, dt)

		// the voice drives how high and how tight the ripples run; typing speeds the flow
		s.amp = damp(s.amp, 0.016 + s.energy * 0.012 + s.pulse * 0.13 + bloom * 0.02, 8, dt)
		s.freq = damp(s.freq, 1 + s.pulse * 0.9 + s.energy * 0.15, 4, dt)
		s.phase += dt * (0.35 + s.energy * 0.6 + s.pulse * 1.6)
		s.spin += dt * (0.06 + s.energy * 0.1 + s.pulse * 0.05)

		// the pointer: lean toward it, and find where it touches the ball
		const rect = canvas.getBoundingClientRect()
		const fresh = pointer.active && now - pointer.at < 4000
		let bulgeTo = 0
		let leanX = 0
		let leanY = 0
		if (fresh && rect.width && rect.height) {
			ndc.set(((pointer.x - rect.left) / rect.width) * 2 - 1, -(((pointer.y - rect.top) / rect.height) * 2 - 1), 0.5)
			ndc.unproject(camera)
			dir.copy(ndc).sub(camera.position).normalize()
			toBall.copy(ball.position).sub(camera.position)
			const along = toBall.dot(dir)
			hit.copy(dir).multiplyScalar(along).add(camera.position)
			const miss = hit.distanceTo(ball.position)
			const r = radius
			if (miss < r) {
				const back = Math.sqrt(r * r - miss * miss)
				hit.copy(dir).multiplyScalar(along - back).add(camera.position)
			}
			point.copy(hit).sub(ball.position).normalize()
			bulgeTo = Math.exp(-Math.max(0, miss / r - 0.75) * 1.6) * settled
			leanX = Math.max(-1, Math.min(1, (hit.x - ball.position.x) / (r * 3))) * settled
			leanY = Math.max(-1, Math.min(1, (hit.y - ball.position.y) / (r * 3))) * settled
		}
		s.bulge = damp(s.bulge, bulgeTo, fresh ? 3.2 : 1.8, dt)
		s.lx = damp(s.lx, leanX, 2.4, dt)
		s.ly = damp(s.ly, leanY, 2.4, dt)

		const scrolled = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / Math.max(1, hero.offsetHeight)))
		const grow = 0.9 + 0.1 * (1 - Math.pow(1 - woven, 3))
		const breath = grow * (1 + 0.01 * Math.sin(t * 0.9) + s.pulse * 0.04 + s.energy * 0.008 + bloom * 0.015)
		ball.scale.setScalar(radius * breath)
		ball.position.set(s.lx * radius * 0.14, s.ly * radius * 0.1 - scrolled * radius * 0.6, 0)
		ball.rotation.set(-s.ly * 0.25 + 0.32 + Math.sin(t * 0.13) * 0.06, s.lx * 0.35 + s.spin, 0.08)
		halo.position.x = ball.position.x
		halo.position.y = ball.position.y

		// the pointer's direction in the ball's own space
		ball.updateMatrixWorld()
		rot.makeRotationFromEuler(ball.rotation)
		spinQ.setFromRotationMatrix(rot).invert()
		local.copy(point).applyQuaternion(spinQ).normalize()
		const e = rot.elements

		/* the knots: where they sit, how much they face the viewer, their colour */
		const reveal = woven * 1.3
		for (let v = 0; v < nv; v++) {
			const i = v * 3
			const x = verts[i]
			const y = verts[i + 1]
			const z = verts[i + 2]
			let wave = 0
			for (let k = 0; k < WAVES.length; k++) {
				const w = WAVES[k]
				wave += w.a * Math.sin(w.k * s.freq * (x * w.d[0] + y * w.d[1] + z * w.d[2]) + s.phase * w.s + w.o)
			}
			const c = x * local.x + y * local.y + z * local.z
			const cap = Math.exp((c - 1) * 7)
			const ring = Math.sin((1 - c) * 22 - t * 4.5) * Math.exp((c - 1) * 4)
			const d = 1 + (wave / WAVE_SUM) * s.amp + s.bulge * (cap * 0.11 + ring * 0.014)
			disp[i] = x * d
			disp[i + 1] = y * d
			disp[i + 2] = z * d

			const f = e[2] * x + e[6] * y + e[10] * z
			face[v] = f
			const g = smooth(-0.95, 0.9, f)
			const toSide = smooth(0, 0.55, g)
			const toNear = smooth(0.5, 1, g)
			let r = FAR[0] + (SIDE[0] - FAR[0]) * toSide
			let gg = FAR[1] + (SIDE[1] - FAR[1]) * toSide
			let b = FAR[2] + (SIDE[2] - FAR[2]) * toSide
			r += (NEAR[0] - r) * toNear
			gg += (NEAR[1] - gg) * toNear
			b += (NEAR[2] - b) * toNear
			// typing deepens the blue; the voice tints it violet in travelling bands; the pointer lights it cyan
			const deep = s.energy * 0.35 * toNear
			r += (DEEP[0] - r) * deep
			gg += (DEEP[1] - gg) * deep
			b += (DEEP[2] - b) * deep
			const vio = s.pulse * 0.55 * (0.5 + 0.5 * Math.sin(wave * 3 + t * 3))
			r += (VIOLET[0] - r) * vio
			gg += (VIOLET[1] - gg) * vio
			b += (VIOLET[2] - b) * vio
			const sweep = x * sweepDir.x + y * sweepDir.y + z * sweepDir.z - (((t * 0.45) % 1) * 3.4 - 1.7)
			const lit = Math.min(1, s.bulge * cap * 0.9 + Math.exp(-sweep * sweep * 10) * s.shimmer * 0.8)
			r += (CYAN[0] - r) * lit
			gg += (CYAN[1] - gg) * lit
			b += (CYAN[2] - b) * lit
			col[i] = r
			col[i + 1] = gg
			col[i + 2] = b

			const on = smooth(0, 1, (reveal - vOrder[v]) / 0.3)
			shown[v] = on
			knotPos[i] = disp[i]
			knotPos[i + 1] = disp[i + 1]
			knotPos[i + 2] = disp[i + 2]
			knotCol[i] = r
			knotCol[i + 1] = gg
			knotCol[i + 2] = b
			knotSize[v] = f > -0.1 ? on * (1.1 + 1.5 * smooth(-0.1, 0.9, f) + lit * 1.0) : 0
		}

		/* the threads: each one grows from its first knot toward the second while winding on */
		const nearPos = near.pos.array as Float32Array
		const nearCol = near.col.array as Float32Array
		const farPos = far.pos.array as Float32Array
		const farCol = far.col.array as Float32Array
		let nn = 0
		let nf = 0
		for (let k = 0; k < ne; k++) {
			let a = edges[k * 2]
			let b = edges[k * 2 + 1]
			if (vOrder[b] < vOrder[a]) {
				const tmp = a
				a = b
				b = tmp
			}
			const grown = smooth(0, 1, (reveal - vOrder[a]) / 0.3)
			if (grown <= 0) continue
			const front = face[a] + face[b] > -0.2
			const P = front ? nearPos : farPos
			const C = front ? nearCol : farCol
			const o = (front ? nn++ : nf++) * 6
			const ia = a * 3
			const ib = b * 3
			P[o] = disp[ia]
			P[o + 1] = disp[ia + 1]
			P[o + 2] = disp[ia + 2]
			P[o + 3] = disp[ia] + (disp[ib] - disp[ia]) * grown
			P[o + 4] = disp[ia + 1] + (disp[ib + 1] - disp[ia + 1]) * grown
			P[o + 5] = disp[ia + 2] + (disp[ib + 2] - disp[ia + 2]) * grown
			C[o] = col[ia]
			C[o + 1] = col[ia + 1]
			C[o + 2] = col[ia + 2]
			C[o + 3] = col[ib]
			C[o + 4] = col[ib + 1]
			C[o + 5] = col[ib + 2]
		}
		near.geo.instanceCount = nn
		far.geo.instanceCount = nf
		near.pos.needsUpdate = true
		near.col.needsUpdate = true
		far.pos.needsUpdate = true
		far.col.needsUpdate = true
		knotGeo.attributes.position.needsUpdate = true
		knotGeo.attributes.aColor.needsUpdate = true
		knotGeo.attributes.aSize.needsUpdate = true


		shared.uTime.value = t
		shared.uEnergy.value = s.energy
		shared.uPulse.value = s.pulse
		haloMat.uniforms.uReveal.value = smooth(0, 0.8, woven)

		renderer.render(scene, camera)
		if (visible && !document.hidden) raf = requestAnimationFrame(frame)
	}

	const run = () => {
		if (raf || !visible || document.hidden) return
		last = performance.now()
		raf = requestAnimationFrame(frame)
	}

	const io =
		typeof IntersectionObserver !== 'undefined'
			? new IntersectionObserver(entries => {
					visible = entries[0].isIntersecting
					run()
			  })
			: null
	io?.observe(canvas)
	const onVis = () => run()
	document.addEventListener('visibilitychange', onVis)
	run()

	return {
		dispose: () => {
			if (raf) cancelAnimationFrame(raf)
			raf = 0
			visible = false
			io?.disconnect()
			ro?.disconnect()
			window.removeEventListener('pointermove', onMove)
			window.removeEventListener('touchmove', onTouch)
			window.removeEventListener('touchend', onLeave)
			window.removeEventListener('blur', onLeave)
			document.removeEventListener('mouseout', onOut)
			document.removeEventListener('visibilitychange', onVis)
			near.geo.dispose()
			far.geo.dispose()
			near.mat.dispose()
			far.mat.dispose()
			knotGeo.dispose()
			knotMat.dispose()
			haloGeo.dispose()
			haloMat.dispose()
			renderer.dispose()
		},
	}
}
