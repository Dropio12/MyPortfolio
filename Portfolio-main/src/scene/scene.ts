import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import gsap from 'gsap'
import { SceneObject } from '../content'
import { buildModel, makeMaterials, poses } from './models'

// The hero's 3D layer, loaded after first paint. One fixed canvas behind the hero; six objects sit
// in the side margins around the content column (a band above the name on a phone). They float,
// lean toward the pointer, drift up at their own depth as the page scrolls, and step forward when
// the work they stand for matches what the visitor is hiring for. The loop stops when the hero
// is off screen or the tab is hidden.

export type SceneHandle = {
	setFocus: (objects: SceneObject[]) => void
	dispose: () => void
}

type Options = {
	hero: HTMLElement
	onPick: (o: SceneObject) => void
	onReady?: () => void
}

type Placed = {
	kind: SceneObject
	outer: any
	inner: any
	shadow: any
	radius: number
	/** px offsets and size from the layout */
	px: number
	py: number
	size: number
	depth: number
	phase: number
	visible: boolean
	state: { intro: number; focus: number; hover: number; spin: number; z: number }
}

const ORDER: SceneObject[] = ['chip', 'floorplan', 'bag', 'terminal', 'car', 'dumbbell']
const DEPTHS: Record<SceneObject, number> = { chip: 0.72, floorplan: 1.18, bag: 0.9, terminal: 1.32, car: 0.62, dumbbell: 1.05 }

export const createScene = (canvas: HTMLCanvasElement, opts: Options): SceneHandle => {
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })
	renderer.setClearColor(0x000000, 0)
	renderer.outputColorSpace = THREE.SRGBColorSpace
	renderer.toneMapping = THREE.NeutralToneMapping
	renderer.toneMappingExposure = 1.02

	const scene = new THREE.Scene()
	const pmrem = new THREE.PMREMGenerator(renderer)
	const envScene = new RoomEnvironment()
	scene.environment = pmrem.fromScene(envScene, 0.035).texture
	envScene.traverse((o: any) => {
		o.geometry?.dispose?.()
		o.material?.dispose?.()
	})
	pmrem.dispose()

	// a strong key from the upper left and a cool rim from behind give the white clay its form
	scene.add(new THREE.HemisphereLight(0xffffff, 0xb4bbc6, 0.5))
	const key = new THREE.DirectionalLight(0xffffff, 1.75)
	key.position.set(-6, 9, 7)
	scene.add(key)
	const rim = new THREE.DirectionalLight(0xe8eefc, 0.55)
	rim.position.set(7, 3, -6)
	scene.add(rim)

	// a soft contact shadow under each object, drawn once into a small texture
	const shadowCanvas = document.createElement('canvas')
	shadowCanvas.width = shadowCanvas.height = 128
	const sctx = shadowCanvas.getContext('2d')!
	const grad = sctx.createRadialGradient(64, 64, 0, 64, 64, 64)
	grad.addColorStop(0, 'rgba(21, 23, 28, 0.34)')
	grad.addColorStop(0.45, 'rgba(21, 23, 28, 0.14)')
	grad.addColorStop(1, 'rgba(21, 23, 28, 0)')
	sctx.fillStyle = grad
	sctx.fillRect(0, 0, 128, 128)
	const shadowTex = new THREE.CanvasTexture(shadowCanvas)
	shadowTex.colorSpace = THREE.SRGBColorSpace
	const shadowGeo = new THREE.PlaneGeometry(1, 1)

	const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
	const DIST = 18
	camera.position.set(0, 0, DIST)

	const mats = makeMaterials()
	const placed: Placed[] = ORDER.map((kind, i) => {
		const { group, radius } = buildModel(kind, mats)
		const inner = new THREE.Group()
		inner.add(group)
		const [rx, ry, rz] = poses[kind]
		group.rotation.set(rx, ry, rz)
		const outer = new THREE.Group()
		outer.add(inner)
		const shadow = new THREE.Mesh(
			shadowGeo,
			new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, toneMapped: false })
		)
		shadow.renderOrder = -1
		outer.add(shadow)
		scene.add(outer)
		return {
			kind,
			outer,
			inner,
			shadow,
			radius,
			px: 0,
			py: 0,
			size: 160,
			depth: DEPTHS[kind],
			phase: i * 1.37,
			visible: true,
			state: { intro: 0, focus: 1, hover: 0, spin: 0, z: 0 },
		}
	})

	/* ---------- layout, in CSS pixels, converted to world units per frame ---------- */

	let W = 1
	let H = 1
	let wide = true
	let unit = 1 // world units per CSS pixel at z = 0

	const layout = () => {
		W = canvas.clientWidth || window.innerWidth
		H = canvas.clientHeight || window.innerHeight
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
		renderer.setSize(W, H, false)
		camera.aspect = W / H
		camera.updateProjectionMatrix()
		const halfH = Math.tan((camera.fov * Math.PI) / 360) * DIST
		unit = (2 * halfH) / H
		const contentHalf = Math.min(410, W / 2)
		const margin = W / 2 - contentHalf
		wide = margin >= 130
		if (wide) {
			// desktop: three objects in each side margin
			const size = Math.max(120, Math.min(200, margin * 0.74))
			const xs = contentHalf + margin * 0.5
			const slots: Record<SceneObject, [number, number]> = {
				chip: [-xs + margin * 0.02, 0.25],
				bag: [-xs + margin * 0.1, 0.53],
				car: [-xs - margin * 0.02, 0.8],
				floorplan: [xs - margin * 0.12, 0.26],
				terminal: [xs - margin * 0.06, 0.54],
				dumbbell: [xs + margin * 0.02, 0.8],
			}
			placed.forEach(p => {
				p.visible = true
				p.px = slots[p.kind][0]
				p.py = slots[p.kind][1] * Math.min(H, 980)
				p.size = size * (p.kind === 'floorplan' ? 0.86 : p.kind === 'dumbbell' || p.kind === 'car' ? 0.92 : 1)
			})
		} else {
			// phone and tablet: a band of four small objects above the name
			const band: SceneObject[] = ['chip', 'terminal', 'bag', 'floorplan']
			const size = Math.min(118, W / 4)
			const step = Math.min(W - 24, 560) / band.length
			placed.forEach(p => {
				const i = band.indexOf(p.kind)
				p.visible = i >= 0
				p.px = (i - (band.length - 1) / 2) * step
				p.py = 104 + (i % 2) * 16
				p.size = size
			})
		}
		placed.forEach(p => (p.outer.visible = p.visible))
	}

	/* ---------- input: scroll, pointer, picking ---------- */

	let scrollTarget = window.scrollY
	let scrollNow = scrollTarget
	const pointer = { x: 0, y: 0, tx: 0, ty: 0, cx: -1, cy: -1 }
	let hovered: Placed | null = null
	const raycaster = new THREE.Raycaster()
	const ndc = new THREE.Vector2()
	const sphere = new THREE.Sphere()
	const tmp = new THREE.Vector3()

	const pick = (cx: number, cy: number): Placed | null => {
		ndc.set((cx / W) * 2 - 1, -(cy / H) * 2 + 1)
		raycaster.setFromCamera(ndc, camera)
		let best: Placed | null = null
		let bestD = Infinity
		placed.forEach(p => {
			if (!p.visible || p.state.intro < 0.6) return
			p.inner.getWorldPosition(tmp)
			sphere.set(tmp, p.radius * p.inner.scale.x * 0.9)
			const hit = raycaster.ray.intersectSphere(sphere, new THREE.Vector3())
			if (hit) {
				const d = hit.distanceTo(camera.position)
				if (d < bestD) {
					bestD = d
					best = p
				}
			}
		})
		return best
	}

	const interactive = (el: EventTarget | null) =>
		el instanceof Element && !!el.closest('a, button, input, textarea, select, label, [role="dialog"], [data-no-pick]')

	const onScroll = () => {
		scrollTarget = window.scrollY
		wake()
	}
	const onMove = (e: PointerEvent) => {
		pointer.tx = (e.clientX / W) * 2 - 1
		pointer.ty = (e.clientY / H) * 2 - 1
		pointer.cx = e.clientX
		pointer.cy = e.clientY
		const over = !interactive(e.target) && opts.hero.contains(e.target as Node) ? pick(e.clientX, e.clientY) : null
		if (over !== hovered) {
			hovered = over
			opts.hero.toggleAttribute('data-object-hover', !!over)
		}
		wake()
	}
	const onClick = (e: MouseEvent) => {
		if (interactive(e.target) || !opts.hero.contains(e.target as Node)) return
		const hit = pick(e.clientX, e.clientY)
		if (hit) opts.onPick(hit.kind)
	}
	const onLeave = () => {
		pointer.tx = 0
		pointer.ty = 0
		if (hovered) {
			hovered = null
			opts.hero.removeAttribute('data-object-hover')
		}
	}

	/* ---------- the loop ---------- */

	let raf = 0
	let running = false
	let heroVisible = true
	// time only advances while frames run, so a hidden tab resumes where it stopped
	let t = 0
	let last = 0

	const frame = (now: number) => {
		raf = 0
		t += Math.min(0.05, last ? (now - last) / 1000 : 0.016)
		last = now
		scrollNow += (scrollTarget - scrollNow) * 0.14
		pointer.x += (pointer.tx - pointer.x) * 0.06
		pointer.y += (pointer.ty - pointer.y) * 0.06

		// where the paper sheet starts on screen: the bottom of the hero
		const sheetTop = opts.hero.getBoundingClientRect().bottom
		placed.forEach(p => {
			if (!p.visible) return
			const s = p.state
			const hoverTarget = hovered === p ? 1 : 0
			s.hover += (hoverTarget - s.hover) * 0.15
			const lift = (1 - s.intro) * 70
			const x = p.px + pointer.x * 14 * p.depth
			const y = p.py - scrollNow * p.depth + lift + pointer.y * 10 * p.depth
			p.outer.position.set(x * unit, (H / 2 - y) * unit, s.z)
			const scale = ((p.size * unit) / (p.radius * 2)) * (0.55 + 0.45 * s.intro) * s.focus * (1 + s.hover * 0.07)
			p.inner.scale.setScalar(scale)
			const bob = Math.sin(t * 0.7 + p.phase)
			p.inner.position.y = bob * 0.09
			// the shadow sits under the object and softens as it rises
			const reach = p.size * unit * (0.55 + 0.45 * s.intro) * s.focus
			p.shadow.position.set(0, -reach * 0.56, -0.4)
			p.shadow.scale.set(reach * (1.05 - bob * 0.06), reach * 0.24, 1)
			// shadows only where the objects have room (the desktop margins); each one fades as its object
			// slides under the header, and before it would touch the paper sheet's top edge
			const shadowY = y + (p.size * (0.55 + 0.45 * s.intro) * s.focus) * 0.68
			const underHeader = Math.min(1, Math.max(0, (y - 70) / 90))
			const aboveSheet = Math.min(1, Math.max(0, (sheetTop - 28 - shadowY) / 48))
			p.shadow.visible = wide
			p.shadow.material.opacity = s.intro * (0.85 - bob * 0.12) * underHeader * aboveSheet
			p.inner.rotation.set(
				Math.sin(t * 0.33 + p.phase) * 0.1 + pointer.y * 0.18 + scrollNow * 0.0004 * p.depth,
				Math.sin(t * 0.27 + p.phase) * 0.32 + pointer.x * 0.28 + scrollNow * 0.0012 * (p.depth > 1 ? -1 : 1) + s.spin,
				Math.sin(t * 0.21 + p.phase) * 0.05
			)
		})
		renderer.render(scene, camera)
		// the idle float runs while the hero is on screen; once it is covered, the loop stops
		if (running && heroVisible) raf = requestAnimationFrame(frame)
		else {
			running = false
			last = 0
		}
	}

	const wake = () => {
		if (document.hidden || !heroVisible) return
		running = true
		if (!raf) raf = requestAnimationFrame(frame)
	}

	const io = new IntersectionObserver(
		entries => {
			heroVisible = entries[0].isIntersecting
			if (heroVisible) wake()
		},
		{ rootMargin: '120px 0px 120px 0px' }
	)
	io.observe(opts.hero)

	const onVisibility = () => {
		if (document.hidden) {
			running = false
			if (raf) cancelAnimationFrame(raf)
			raf = 0
			last = 0
		} else wake()
	}

	let resizeRaf = 0
	const onResize = () => {
		if (resizeRaf) return
		resizeRaf = requestAnimationFrame(() => {
			resizeRaf = 0
			layout()
			wake()
		})
	}

	layout()
	window.addEventListener('scroll', onScroll, { passive: true })
	window.addEventListener('pointermove', onMove, { passive: true })
	window.addEventListener('click', onClick)
	document.documentElement.addEventListener('pointerleave', onLeave)
	window.addEventListener('resize', onResize)
	document.addEventListener('visibilitychange', onVisibility)

	// entrance: the objects rise into place one after another
	gsap.to(
		placed.map(p => p.state),
		{ intro: 1, duration: 1.3, ease: 'back.out(1.35)', stagger: 0.09, delay: 0.1 }
	)
	wake()
	opts.onReady?.()

	let focused: SceneObject[] = []

	return {
		setFocus(objects) {
			const any = objects.length > 0
			placed.forEach(p => {
				const on = objects.includes(p.kind)
				const was = focused.includes(p.kind)
				gsap.to(p.state, {
					focus: any ? (on ? 1.12 : 0.84) : 1,
					z: any && on ? 0.9 : 0,
					duration: 0.7,
					ease: on ? 'back.out(1.8)' : 'power3.out',
					overwrite: 'auto',
				})
				if (on && !was) gsap.to(p.state, { spin: `+=${Math.PI * 2}`, duration: 1.2, ease: 'power3.out' })
			})
			focused = objects
			wake()
		},
		dispose() {
			running = false
			if (raf) cancelAnimationFrame(raf)
			io.disconnect()
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('pointermove', onMove)
			window.removeEventListener('click', onClick)
			document.documentElement.removeEventListener('pointerleave', onLeave)
			window.removeEventListener('resize', onResize)
			document.removeEventListener('visibilitychange', onVisibility)
			gsap.killTweensOf(placed.map(p => p.state))
			scene.traverse((o: any) => o.geometry?.dispose?.())
			Object.values(mats).forEach((m: any) => m.dispose())
			placed.forEach(p => p.shadow.material.dispose())
			shadowTex.dispose()
			scene.environment?.dispose?.()
			renderer.dispose()
		},
	}
}
