import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { SceneObject } from '../content'

// The six hero objects, modelled from primitives: soft matte clay in white, ink and lime.
// Each one stands for a piece of his work. After building, each model is merged into one mesh
// per material, so the whole scene draws in a few dozen calls.

type Mat = 'white' | 'soft' | 'ink' | 'lime' | 'limeDeep' | 'metal' | 'screen'

const palette: Record<Mat, { color: number; roughness: number; metalness: number }> = {
	white: { color: 0xeceef2, roughness: 0.6, metalness: 0 },
	soft: { color: 0xcfd4dc, roughness: 0.62, metalness: 0 },
	ink: { color: 0x22252c, roughness: 0.42, metalness: 0 },
	lime: { color: 0xd3ef55, roughness: 0.5, metalness: 0 },
	limeDeep: { color: 0x9fbd2e, roughness: 0.55, metalness: 0 },
	metal: { color: 0xc3c8d0, roughness: 0.28, metalness: 0.75 },
	screen: { color: 0x17191e, roughness: 0.22, metalness: 0 },
}

export const makeMaterials = () => {
	const out = {} as Record<Mat, any>
	;(Object.keys(palette) as Mat[]).forEach(k => {
		out[k] = new THREE.MeshStandardMaterial({ ...palette[k], envMapIntensity: 0.72 })
	})
	return out
}

type Part = { geo: any; mat: Mat; at?: [number, number, number]; rot?: [number, number, number] }

const rb = (w: number, h: number, d: number, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, r)
const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d)
const cyl = (r: number, h: number, seg = 28) => new THREE.CylinderGeometry(r, r, h, seg)

const chip = (): Part[] => {
	const parts: Part[] = [
		{ geo: rb(2.1, 0.14, 1.7, 0.06), mat: 'lime' },
		{ geo: rb(0.8, 0.17, 0.8, 0.05), mat: 'ink', at: [0, 0.15, 0] },
		{ geo: cyl(0.05, 0.03), mat: 'white', at: [-0.26, 0.245, -0.26] },
	]
	// pins on four sides
	for (let i = 0; i < 5; i++) {
		const t = -0.28 + i * 0.14
		parts.push({ geo: box(0.07, 0.04, 0.18), mat: 'metal', at: [t, 0.1, 0.47] })
		parts.push({ geo: box(0.07, 0.04, 0.18), mat: 'metal', at: [t, 0.1, -0.47] })
		parts.push({ geo: box(0.18, 0.04, 0.07), mat: 'metal', at: [0.47, 0.1, t] })
		parts.push({ geo: box(0.18, 0.04, 0.07), mat: 'metal', at: [-0.47, 0.1, t] })
	}
	// traces with a bend, and a pad at each end
	const traces: [number, number, number, number][] = [
		[-0.28, 0.56, -0.28, 0.72],
		[0.0, 0.56, 0.0, 0.76],
		[0.28, 0.56, 0.62, 0.56],
		[0.56, -0.14, 0.92, -0.14],
		[0.56, 0.14, 0.86, 0.14],
		[-0.56, 0.0, -0.9, 0.0],
		[-0.14, -0.56, -0.14, -0.74],
		[0.14, -0.56, 0.5, -0.56],
	]
	traces.forEach(([x1, z1, x2, z2]) => {
		const len = Math.hypot(x2 - x1, z2 - z1)
		const ang = Math.atan2(z2 - z1, x2 - x1)
		parts.push({ geo: box(len, 0.012, 0.045), mat: 'limeDeep', at: [(x1 + x2) / 2, 0.076, (z1 + z2) / 2], rot: [0, -ang, 0] })
		parts.push({ geo: cyl(0.06, 0.02, 16), mat: 'white', at: [x2, 0.08, z2] })
	})
	;[
		[-0.92, -0.72],
		[0.92, -0.72],
		[-0.92, 0.72],
		[0.92, 0.72],
	].forEach(([x, z]) => parts.push({ geo: cyl(0.085, 0.16, 20), mat: 'ink', at: [x, 0.0, z] }))
	parts.push({ geo: rb(0.24, 0.12, 0.13, 0.04), mat: 'white', at: [-0.66, 0.12, 0.4] })
	parts.push({ geo: rb(0.24, 0.12, 0.13, 0.04), mat: 'white', at: [0.66, 0.12, -0.42] })
	return parts
}

const floorplan = (): Part[] => {
	const h = 0.34
	const t = 0.08
	const y = 0.06 + h / 2
	return [
		{ geo: rb(2.3, 0.12, 1.9, 0.06), mat: 'soft' },
		{ geo: box(0.86, 0.02, 0.86), mat: 'lime', at: [0.62, 0.07, -0.5] },
		// outer walls
		{ geo: box(2.2, h, t), mat: 'white', at: [0, y, -0.9] },
		{ geo: box(2.2, h, t), mat: 'white', at: [0, y, 0.9] },
		{ geo: box(t, h, 1.88), mat: 'white', at: [-1.1, y, 0] },
		{ geo: box(t, h, 1.88), mat: 'white', at: [1.1, y, 0] },
		// rooms, with door gaps
		{ geo: box(t, h, 0.6), mat: 'white', at: [0.18, y, -0.6] },
		{ geo: box(0.92, h, t), mat: 'white', at: [0.64, y, -0.06] },
		{ geo: box(0.7, h, t), mat: 'white', at: [-0.75, y, 0.2] },
		{ geo: box(t, h, 0.5), mat: 'white', at: [0.18, y, 0.65] },
		// door swings and furniture
		{ geo: new THREE.TorusGeometry(0.26, 0.012, 6, 18, Math.PI / 2), mat: 'ink', at: [0.18, 0.075, -0.3], rot: [-Math.PI / 2, 0, 0] },
		{ geo: new THREE.TorusGeometry(0.22, 0.012, 6, 18, Math.PI / 2), mat: 'ink', at: [-0.4, 0.075, 0.2], rot: [-Math.PI / 2, 0, Math.PI / 2] },
		{ geo: rb(0.5, 0.14, 0.3, 0.05), mat: 'ink', at: [-0.66, 0.13, -0.56] },
		{ geo: rb(0.26, 0.12, 0.42, 0.05), mat: 'white', at: [-0.82, 0.12, 0.6] },
		{ geo: cyl(0.14, 0.1, 20), mat: 'ink', at: [0.64, 0.11, 0.48] },
	]
}

const car = (): Part[] => {
	const parts: Part[] = [
		{ geo: rb(2.0, 0.46, 0.96, 0.2, 4), mat: 'white', at: [0, 0.36, 0] },
		{ geo: rb(1.06, 0.44, 0.86, 0.18, 4), mat: 'ink', at: [-0.12, 0.72, 0] },
		{ geo: rb(0.12, 0.08, 0.2, 0.03), mat: 'lime', at: [0.99, 0.42, 0.3] },
		{ geo: rb(0.12, 0.08, 0.2, 0.03), mat: 'lime', at: [0.99, 0.42, -0.3] },
		// the price tag over the roof: the deal
		{ geo: rb(0.5, 0.07, 0.3, 0.03), mat: 'lime', at: [0.1, 1.28, 0], rot: [0.5, 0.3, 0.2] },
		{ geo: cyl(0.012, 0.36, 8), mat: 'ink', at: [0.02, 1.04, 0], rot: [0, 0, 0.25] },
	]
	;[
		[0.62, 0.48],
		[0.62, -0.48],
		[-0.62, 0.48],
		[-0.62, -0.48],
	].forEach(([x, z]) => {
		parts.push({ geo: cyl(0.25, 0.2, 28), mat: 'ink', at: [x, 0.16, z], rot: [Math.PI / 2, 0, 0] })
		parts.push({ geo: cyl(0.11, 0.22, 20), mat: 'metal', at: [x, 0.16, z], rot: [Math.PI / 2, 0, 0] })
	})
	return parts
}

const bag = (): Part[] => [
	{ geo: rb(1.24, 1.4, 0.62, 0.06), mat: 'white' },
	{ geo: rb(1.26, 0.14, 0.64, 0.04), mat: 'soft', at: [0, 0.64, 0] },
	{ geo: new THREE.TorusGeometry(0.31, 0.045, 10, 36, Math.PI), mat: 'ink', at: [0, 0.7, 0] },
	// the camera in front: photo search
	{ geo: rb(0.8, 0.54, 0.34, 0.09), mat: 'ink', at: [0.36, -0.4, 0.46], rot: [0, -0.18, 0.06] },
	{ geo: cyl(0.17, 0.14, 32), mat: 'metal', at: [0.38, -0.42, 0.66], rot: [Math.PI / 2 - 0.06, 0, -0.18] },
	{ geo: new THREE.TorusGeometry(0.18, 0.035, 10, 36), mat: 'lime', at: [0.39, -0.42, 0.72], rot: [0.06, -0.18, 0] },
	{ geo: rb(0.16, 0.09, 0.05, 0.02), mat: 'white', at: [0.08, -0.24, 0.66], rot: [0, -0.18, 0.06] },
	{ geo: cyl(0.06, 0.07, 16), mat: 'lime', at: [0.6, -0.11, 0.42] },
]

const dumbbell = (): Part[] => {
	const parts: Part[] = [{ geo: cyl(0.055, 1.9, 16), mat: 'metal', rot: [0, 0, Math.PI / 2] }]
	;[1, -1].forEach(s => {
		parts.push({ geo: cyl(0.43, 0.17, 40), mat: 'ink', at: [s * 0.6, 0, 0], rot: [0, 0, Math.PI / 2] })
		parts.push({ geo: cyl(0.33, 0.13, 40), mat: 'lime', at: [s * 0.76, 0, 0], rot: [0, 0, Math.PI / 2] })
		parts.push({ geo: cyl(0.1, 0.1, 20), mat: 'metal', at: [s * 0.46, 0, 0], rot: [0, 0, Math.PI / 2] })
		parts.push({ geo: cyl(0.1, 0.08, 20), mat: 'metal', at: [s * 0.87, 0, 0], rot: [0, 0, Math.PI / 2] })
	})
	return parts
}

const terminal = (): Part[] => {
	const z = 0.085
	const parts: Part[] = [
		{ geo: rb(2.1, 1.46, 0.14, 0.08), mat: 'white' },
		{ geo: rb(1.92, 1.08, 0.03, 0.03), mat: 'screen', at: [0, -0.1, 0.07] },
		{ geo: cyl(0.05, 0.03, 16), mat: 'lime', at: [-0.88, 0.6, 0.07], rot: [Math.PI / 2, 0, 0] },
		{ geo: cyl(0.05, 0.03, 16), mat: 'soft', at: [-0.74, 0.6, 0.07], rot: [Math.PI / 2, 0, 0] },
		{ geo: cyl(0.05, 0.03, 16), mat: 'soft', at: [-0.6, 0.6, 0.07], rot: [Math.PI / 2, 0, 0] },
		// the prompt chevron and the cursor
		{ geo: box(0.16, 0.045, 0.012), mat: 'lime', at: [-0.76, 0.27, z], rot: [0, 0, -0.62] },
		{ geo: box(0.16, 0.045, 0.012), mat: 'lime', at: [-0.76, 0.19, z], rot: [0, 0, 0.62] },
		{ geo: box(0.08, 0.13, 0.012), mat: 'lime', at: [0.32, -0.47, z] },
	]
	const lines: [number, Mat][] = [
		[0.92, 'white'],
		[1.3, 'soft'],
		[0.66, 'white'],
		[1.08, 'soft'],
		[0.52, 'limeDeep'],
	]
	lines.forEach(([w, m], i) => {
		const left = -0.6
		parts.push({ geo: box(w, 0.055, 0.012), mat: m, at: [left + w / 2, 0.23 - i * 0.15, z] })
	})
	return parts
}

const builders: Record<SceneObject, () => Part[]> = { chip, floorplan, car, bag, dumbbell, terminal }

/** build a model and merge its parts into one mesh per material */
export const buildModel = (kind: SceneObject, mats: Record<Mat, any>) => {
	const parts = builders[kind]()
	const byMat = new Map<Mat, any[]>()
	const m = new THREE.Matrix4()
	const q = new THREE.Quaternion()
	const e = new THREE.Euler()
	const one = new THREE.Vector3(1, 1, 1)
	parts.forEach(p => {
		// merging needs every part in the same form; non-indexed is the one all primitives convert to
		let g = p.geo
		if (g.index !== null) {
			g = p.geo.toNonIndexed()
			p.geo.dispose()
		}
		e.set(...(p.rot || [0, 0, 0]))
		q.setFromEuler(e)
		m.compose(new THREE.Vector3(...(p.at || [0, 0, 0])), q, one)
		g.applyMatrix4(m)
		// every part needs the same attributes to merge: position, normal, uv
		;['position', 'normal', 'uv'].forEach(a => {
			if (!g.getAttribute(a)) throw new Error(`model part without ${a}`)
		})
		Object.keys(g.attributes).forEach(a => {
			if (!['position', 'normal', 'uv'].includes(a)) g.deleteAttribute(a)
		})
		const list = byMat.get(p.mat) || []
		list.push(g)
		byMat.set(p.mat, list)
	})
	const group = new THREE.Group()
	byMat.forEach((geos, mat) => {
		const merged = mergeGeometries(geos, false)
		geos.forEach(g => g.dispose())
		if (merged) group.add(new THREE.Mesh(merged, mats[mat]))
	})
	// center the model on its own bounds, so it turns around its middle
	const bounds = new THREE.Box3().setFromObject(group)
	const center = bounds.getCenter(new THREE.Vector3())
	group.children.forEach((c: any) => c.geometry.translate(-center.x, -center.y, -center.z))
	const size = bounds.getSize(new THREE.Vector3())
	return { group, radius: Math.max(size.x, size.y, size.z) * 0.62 }
}

/** the resting pose of each model: how it faces the camera */
export const poses: Record<SceneObject, [number, number, number]> = {
	chip: [0.95, -0.35, -0.18],
	floorplan: [0.9, 0.42, 0.12],
	car: [0.32, -0.62, 0.04],
	bag: [0.12, 0.5, -0.06],
	dumbbell: [0.35, 0.65, 0.42],
	terminal: [0.12, -0.38, 0.03],
}
