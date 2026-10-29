import { Matrix4, Mesh, PerspectiveCamera, PlaneGeometry, Quaternion, Scene, ShaderMaterial, SphereGeometry, Vector3, WebGLRenderer } from 'three'
import { agent, agentLevel } from '../lib/agent'

// The agent: a liquid blue orb. A sphere displaced by smooth 3D noise, shaded in iridescent
// blues (deep indigo, electric blue, cyan, pale ice, a faint violet at the rim) over a soft halo
// that bleeds into the white page. It leans toward the pointer and bulges where the pointer is,
// with a small ripple, and eases back when the pointer leaves. While the visitor speaks, the mic
// level drives the displacement's amplitude and frequency; typing brightens it and speeds the
// flow; answering sweeps a shimmer across it; idle, it settles. It stops drawing off screen and
// in a hidden tab, and caps the pixel ratio.

export type OrbHandle = { dispose: () => void }

type Options = {
	hero: HTMLElement
	onReady: () => void
}

const NOISE = /* glsl */ `
	// 3D simplex noise (Ashima Arts, MIT)
	vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
	vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
	vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
	vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
	float snoise(vec3 v) {
		const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
		const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
		vec3 i = floor(v + dot(v, C.yyy));
		vec3 x0 = v - i + dot(i, C.xxx);
		vec3 g = step(x0.yzx, x0.xyz);
		vec3 l = 1.0 - g;
		vec3 i1 = min(g.xyz, l.zxy);
		vec3 i2 = max(g.xyz, l.zxy);
		vec3 x1 = x0 - i1 + C.xxx;
		vec3 x2 = x0 - i2 + C.yyy;
		vec3 x3 = x0 - D.yyy;
		i = mod289(i);
		vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
		float n_ = 0.142857142857;
		vec3 ns = n_ * D.wyz - D.xzx;
		vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
		vec4 x_ = floor(j * ns.z);
		vec4 y_ = floor(j - 7.0 * x_);
		vec4 x = x_ * ns.x + ns.yyyy;
		vec4 y = y_ * ns.x + ns.yyyy;
		vec4 h = 1.0 - abs(x) - abs(y);
		vec4 b0 = vec4(x.xy, y.xy);
		vec4 b1 = vec4(x.zw, y.zw);
		vec4 s0 = floor(b0) * 2.0 + 1.0;
		vec4 s1 = floor(b1) * 2.0 + 1.0;
		vec4 sh = -step(h, vec4(0.0));
		vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
		vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
		vec3 p0 = vec3(a0.xy, h.x);
		vec3 p1 = vec3(a0.zw, h.y);
		vec3 p2 = vec3(a1.xy, h.z);
		vec3 p3 = vec3(a1.zw, h.w);
		vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
		p0 *= norm.x;
		p1 *= norm.y;
		p2 *= norm.z;
		p3 *= norm.w;
		vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
		m = m * m;
		return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
	}
`

const ORB_VERT = /* glsl */ `
	uniform float uPhase;
	uniform float uAmp;
	uniform float uFreq;
	uniform float uTime;
	uniform float uBulge;
	uniform vec3 uPoint;
	varying vec3 vN;
	varying vec3 vV;
	varying vec3 vObj;
	varying float vDisp;
	${NOISE}
	float field(vec3 p) {
		float n = snoise(p * uFreq + vec3(0.0, uPhase, uPhase * 0.6)) * 0.76
			+ snoise(p * uFreq * 2.03 + vec3(uPhase * 0.8, 1.7, -uPhase)) * 0.24;
		float d = n * uAmp;
		// the pointer: a soft bulge with one ripple ring around it
		float c = dot(p, uPoint);
		float cap = exp((c - 1.0) * 7.0);
		float ring = sin((1.0 - c) * 22.0 - uTime * 4.5) * exp((c - 1.0) * 4.0);
		return d + uBulge * (cap * 0.13 + ring * 0.012);
	}
	vec3 displaced(vec3 p) { return p * (1.0 + field(p)); }
	void main() {
		vec3 p = normalize(position);
		vec3 t = normalize(cross(p, abs(p.y) < 0.98 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
		vec3 b = normalize(cross(p, t));
		vec3 a0 = displaced(p);
		vec3 a1 = displaced(normalize(p + t * 0.01));
		vec3 a2 = displaced(normalize(p + b * 0.01));
		vec3 n = normalize(cross(a1 - a0, a2 - a0));
		if (dot(n, p) < 0.0) n = -n;
		vObj = p;
		vDisp = length(a0) - 1.0;
		vec4 wp = modelMatrix * vec4(a0, 1.0);
		vN = normalize(mat3(modelMatrix) * n);
		vV = normalize(cameraPosition - wp.xyz);
		gl_Position = projectionMatrix * viewMatrix * wp;
	}
`

const ORB_FRAG = /* glsl */ `
	uniform float uTime;
	uniform float uPhase;
	uniform float uEnergy;
	uniform float uShimmer;
	uniform float uPulse;
	varying vec3 vN;
	varying vec3 vV;
	varying vec3 vObj;
	varying float vDisp;
	float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
	void main() {
		vec3 n = normalize(vN);
		vec3 v = normalize(vV);
		float ndv = clamp(dot(n, v), 0.0, 1.0);
		vec3 indigo = vec3(0.106, 0.098, 0.451);
		vec3 electric = vec3(0.141, 0.341, 0.988);
		vec3 cyan = vec3(0.243, 0.792, 1.0);
		vec3 ice = vec3(0.886, 0.957, 1.0);
		vec3 violet = vec3(0.627, 0.573, 1.0);
		// the body: lit from the upper left, deep indigo turning away from the light, electric blue,
		// then cyan and pale ice where it faces the light, with a slow liquid swirl travelling across
		vec3 L = normalize(vec3(-0.5, 0.7, 0.55));
		float lit = dot(n, L) * 0.5 + 0.5;
		float swirl = sin(vObj.x * 2.2 + vObj.y * 1.7 - vObj.z * 1.1 + uPhase * 1.2 + vDisp * 12.0) * 0.5 + 0.5;
		float tone = lit * 0.92 + (swirl - 0.5) * 0.34 + vDisp * 2.0;
		vec3 col = mix(indigo, electric, smoothstep(0.1, 0.56, tone));
		col = mix(col, cyan, smoothstep(0.56, 0.92, tone));
		col = mix(col, ice, smoothstep(0.9, 1.18, tone));
		// light passing through the liquid glows on the far side, as in a glass of water
		float through = pow(max(dot(n, -L), 0.0), 1.6);
		col = mix(col, mix(cyan, ice, 0.2), through * 0.26);
		// iridescence: an even band all the way round the edge, drifting between cyan and violet,
		// then the rim melts into pale ice and faint violet
		float rim = pow(1.0 - ndv, 1.2);
		vec3 film = mix(cyan, violet, 0.5 + 0.5 * sin(uPhase * 0.7 + vObj.y * 2.0 + vObj.x));
		col = mix(col, film, smoothstep(0.22, 0.62, rim) * 0.5);
		vec3 edge = mix(ice, violet, 0.32 + 0.22 * sin(atan(n.y, n.x) * 2.0 + uPhase * 0.5));
		// the same pale band on every side, lit or not
		col = mix(col, edge, smoothstep(0.5, 0.92, rim) * 0.9);
		// a crisp key highlight, a soft broad sheen, and a cooler second highlight lower right
		float hl = max(dot(reflect(-L, n), v), 0.0);
		col += pow(hl, 48.0) * 0.42 + pow(hl, 7.0) * 0.08;
		vec3 L2 = normalize(vec3(0.62, -0.38, 0.62));
		col += pow(max(dot(reflect(-L2, n), v), 0.0), 14.0) * 0.16 * ice;
		// typing brightens; the voice lifts it a little
		col = mix(col, min(col * 1.14 + vec3(0.04, 0.07, 0.1), vec3(1.0)), uEnergy * 0.65 + uPulse * 0.25);
		// answering: a band of light sweeps across
		float sweep = dot(vObj, normalize(vec3(0.82, 0.5, 0.28))) - (fract(uTime * 0.45) * 3.4 - 1.7);
		col += exp(-sweep * sweep * 12.0) * uShimmer * 0.32 * vec3(0.82, 0.94, 1.0);
		col += (hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) * 0.02;
		// the silhouette softens into the page
		float a = 1.0 - smoothstep(0.8, 1.0, rim) * 0.5;
		gl_FragColor = vec4(col, a);
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
	varying vec2 vP;
	float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
	void main() {
		float r = length(vP) / uRadius;
		// a close blue glow, and a wide, quiet aura that turns from ice to faint violet
		float near = exp(-pow(max(r - 0.92, 0.0) / 0.55, 1.5));
		float far = exp(-pow(max(r - 0.9, 0.0) / 1.15, 2.0));
		float ang = atan(vP.y, vP.x);
		float drift = 0.5 + 0.5 * sin(ang * 2.0 + uTime * 0.35);
		vec3 blue = mix(vec3(0.33, 0.55, 1.0), vec3(0.45, 0.8, 1.0), drift);
		vec3 aura = mix(vec3(0.6, 0.78, 1.0), vec3(0.7, 0.66, 1.0), smoothstep(1.2, 2.6, r));
		vec3 col = mix(aura, blue, near);
		float a = near * (0.34 + uEnergy * 0.12 + uPulse * 0.3) + far * (0.17 + uEnergy * 0.04 + uPulse * 0.1);
		a += (hash(gl_FragCoord.xy) - 0.5) * 0.01 * smoothstep(0.0, 0.04, a);
		gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
	}
`

const damp = (from: number, to: number, rate: number, dt: number) => from + (to - from) * (1 - Math.exp(-rate * dt))

export const createOrb = (canvas: HTMLCanvasElement, { hero, onReady }: Options): OrbHandle => {
	const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
	renderer.setClearColor(0x000000, 0)
	const scene = new Scene()
	const camera = new PerspectiveCamera(30, 1, 0.1, 60)
	camera.position.set(0, 0, 10)

	const shared = {
		uTime: { value: 0 },
		uEnergy: { value: 0 },
		uPulse: { value: 0 },
	}
	const orbUniforms = {
		...shared,
		uPhase: { value: 0 },
		uAmp: { value: 0.036 },
		uFreq: { value: 0.95 },
		uBulge: { value: 0 },
		uShimmer: { value: 0 },
		uPoint: { value: new Vector3(0, 0, 1) },
	}
	const geo = new SphereGeometry(1, 176, 132)
	const orbMat = new ShaderMaterial({ vertexShader: ORB_VERT, fragmentShader: ORB_FRAG, uniforms: orbUniforms, transparent: true })
	const orb = new Mesh(geo, orbMat)
	orb.renderOrder = 2

	const haloGeo = new PlaneGeometry(1, 1)
	const haloMat = new ShaderMaterial({
		vertexShader: HALO_VERT,
		fragmentShader: HALO_FRAG,
		uniforms: { ...shared, uSize: { value: 1 }, uRadius: { value: 1 } },
		transparent: true,
		depthWrite: false,
	})
	const halo = new Mesh(haloGeo, haloMat)
	halo.renderOrder = 1
	scene.add(halo, orb)

	/* ---------- size ---------- */

	let radius = 1
	let pxPerUnit = 1
	const resize = () => {
		const w = canvas.clientWidth
		const h = canvas.clientHeight
		if (!w || !h) return
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
		renderer.setSize(w, h, false)
		camera.aspect = w / h
		camera.updateProjectionMatrix()
		pxPerUnit = h / (2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360))
		// the orb fills the height of its place in the column (.hero__orb); the canvas spills past it
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

	const s = { energy: 0, shimmer: 0, pulse: 0, bulge: 0, lx: 0, ly: 0, phase: 0, amp: 0.036, freq: 0.95 }
	const ndc = new Vector3()
	const dir = new Vector3()
	const toOrb = new Vector3()
	const hit = new Vector3()
	const point = new Vector3(0, 0, 1)
	const spin = new Quaternion()
	const inv = new Matrix4()
	let visible = true
	let raf = 0
	let last = performance.now()
	let t = 0
	let readied = false

	const frame = (now: number) => {
		raf = 0
		const dt = Math.min(0.05, (now - last) / 1000)
		last = now
		t += dt

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
		s.pulse = damp(s.pulse, level, agent.listening ? 16 : 3, dt)

		// the voice drives amplitude and frequency; typing speeds the flow; idle settles it
		s.amp = damp(s.amp, 0.036 + s.energy * 0.018 + s.pulse * 0.19 + bloom * 0.025, 8, dt)
		s.freq = damp(s.freq, 0.95 + s.pulse * 1.45 + s.energy * 0.2, 4, dt)
		s.phase += dt * (0.2 + s.energy * 0.42 + s.pulse * 1.1)

		// the pointer: lean toward it, and find where it touches the sphere
		const rect = canvas.getBoundingClientRect()
		const fresh = pointer.active && now - pointer.at < 4000
		let bulgeTo = 0
		let leanX = 0
		let leanY = 0
		if (fresh && rect.width && rect.height) {
			ndc.set(((pointer.x - rect.left) / rect.width) * 2 - 1, -(((pointer.y - rect.top) / rect.height) * 2 - 1), 0.5)
			ndc.unproject(camera)
			dir.copy(ndc).sub(camera.position).normalize()
			// closest approach of the pointer's ray to the orb's center
			toOrb.copy(orb.position).sub(camera.position)
			const along = toOrb.dot(dir)
			hit.copy(dir).multiplyScalar(along).add(camera.position)
			const miss = hit.distanceTo(orb.position)
			const r = radius * orb.scale.x
			if (miss < r) {
				// on the surface: step back to the front of the sphere
				const back = Math.sqrt(r * r - miss * miss)
				hit.copy(dir).multiplyScalar(along - back).add(camera.position)
			}
			point.copy(hit).sub(orb.position).normalize()
			// how near the pointer is decides how strongly the surface answers
			bulgeTo = Math.exp(-Math.max(0, miss / r - 0.75) * 1.6)
			leanX = Math.max(-1, Math.min(1, (hit.x - orb.position.x) / (r * 3)))
			leanY = Math.max(-1, Math.min(1, (hit.y - orb.position.y) / (r * 3)))
		}
		s.bulge = damp(s.bulge, bulgeTo, fresh ? 3.2 : 1.8, dt)
		s.lx = damp(s.lx, leanX, 2.4, dt)
		s.ly = damp(s.ly, leanY, 2.4, dt)

		const scrolled = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / Math.max(1, hero.offsetHeight)))
		const breath = 1 + 0.012 * Math.sin(t * 0.9) + s.pulse * 0.05 + s.energy * 0.01 + bloom * 0.02
		orb.scale.setScalar(radius * breath)
		orb.position.set(s.lx * radius * 0.16, s.ly * radius * 0.12 - scrolled * radius * 0.6, 0)
		orb.rotation.set(-s.ly * 0.25 + Math.sin(t * 0.13) * 0.1, s.lx * 0.35 + t * 0.05, 0)
		halo.position.x = orb.position.x
		halo.position.y = orb.position.y

		// the bulge direction lives in the orb's own space, so undo its spin
		orb.updateMatrixWorld()
		spin.setFromRotationMatrix(inv.extractRotation(orb.matrixWorld)).invert()
		orbUniforms.uPoint.value.copy(point).applyQuaternion(spin).normalize()

		shared.uTime.value = t
		shared.uEnergy.value = s.energy
		shared.uPulse.value = s.pulse
		orbUniforms.uPhase.value = s.phase
		orbUniforms.uAmp.value = s.amp
		orbUniforms.uFreq.value = s.freq
		orbUniforms.uBulge.value = s.bulge
		orbUniforms.uShimmer.value = s.shimmer

		renderer.render(scene, camera)
		if (!readied) {
			readied = true
			onReady()
		}
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
			geo.dispose()
			haloGeo.dispose()
			orbMat.dispose()
			haloMat.dispose()
			renderer.dispose()
		},
	}
}
