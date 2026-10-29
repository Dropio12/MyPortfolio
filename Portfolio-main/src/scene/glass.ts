import { Mesh, PlaneGeometry, ShaderMaterial, SphereGeometry } from 'three'

// The glass for the knitted ball, while it is being compared (?orb=knit-glass): a thin glass shell
// around the net (a cool rim and one crisp highlight), and a soft blue core of light in the middle
// that swells while the visitor speaks.

type Shared = { uTime: { value: number }; uEnergy: { value: number }; uPulse: { value: number } }

const SHELL_VERT = /* glsl */ `
	varying vec3 vN;
	varying vec3 vV;
	void main() {
		vec4 wp = modelMatrix * vec4(position, 1.0);
		vN = normalize(mat3(modelMatrix) * normal);
		vV = normalize(cameraPosition - wp.xyz);
		gl_Position = projectionMatrix * viewMatrix * wp;
	}
`

const SHELL_FRAG = /* glsl */ `
	uniform float uReveal;
	uniform float uPulse;
	uniform float uEnergy;
	varying vec3 vN;
	varying vec3 vV;
	void main() {
		vec3 n = normalize(vN);
		vec3 v = normalize(vV);
		float ndv = clamp(dot(n, v), 0.0, 1.0);
		float fres = pow(1.0 - ndv, 3.0);
		vec3 L = normalize(vec3(-0.55, 0.65, 0.6));
		float r = max(dot(reflect(-L, n), v), 0.0);
		// a cool tinted rim, a crisp highlight and a broad faint sheen: glass on a white page
		vec3 rim = vec3(0.42, 0.58, 1.0);
		vec3 col = mix(rim, vec3(1.0), pow(r, 40.0));
		float a = fres * (0.42 + uPulse * 0.25 + uEnergy * 0.1) + pow(r, 80.0) * 0.95 + pow(r, 8.0) * 0.07;
		gl_FragColor = vec4(col, clamp(a * uReveal, 0.0, 1.0));
	}
`

const CORE_VERT = /* glsl */ `
	varying vec2 vP;
	void main() {
		vP = uv - 0.5;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`

const CORE_FRAG = /* glsl */ `
	uniform float uTime;
	uniform float uPulse;
	uniform float uEnergy;
	uniform float uReveal;
	varying vec2 vP;
	void main() {
		float r = length(vP) * 2.0;
		float breathe = 0.9 + 0.1 * sin(uTime * 1.3);
		float glow = exp(-r * r * (3.2 - uPulse * 1.6));
		vec3 col = mix(vec3(0.24, 0.5, 1.0), vec3(0.45, 0.85, 1.0), glow);
		float a = glow * (0.16 * breathe + uPulse * 0.38 + uEnergy * 0.08) * uReveal;
		gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
	}
`

export const makeShell = (shared: Shared) => {
	const uniforms = { ...shared, uReveal: { value: 0 } }
	const geo = new SphereGeometry(1.035, 96, 72)
	const mat = new ShaderMaterial({ vertexShader: SHELL_VERT, fragmentShader: SHELL_FRAG, uniforms, transparent: true, depthTest: false, depthWrite: false })
	const mesh = new Mesh(geo, mat)
	mesh.renderOrder = 5
	return {
		mesh,
		uniforms,
		dispose: () => {
			geo.dispose()
			mat.dispose()
		},
	}
}

export const makeCore = (shared: Shared) => {
	const uniforms = { ...shared, uReveal: { value: 0 } }
	const geo = new PlaneGeometry(1, 1)
	const mat = new ShaderMaterial({ vertexShader: CORE_VERT, fragmentShader: CORE_FRAG, uniforms, transparent: true, depthTest: false, depthWrite: false })
	const mesh = new Mesh(geo, mat)
	mesh.renderOrder = 1.5
	return {
		mesh,
		uniforms,
		dispose: () => {
			geo.dispose()
			mat.dispose()
		},
	}
}
