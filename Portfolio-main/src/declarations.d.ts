declare module '*.module.scss'

// three.js ships types (@types/three) written for TypeScript 5, which the TypeScript 4 that
// Create React App 5 runs cannot parse. The 3D scene is one lazy file, so it uses three untyped.
declare module 'three'
declare module 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
declare module 'three/examples/jsm/environments/RoomEnvironment.js'
declare module 'three/examples/jsm/utils/BufferGeometryUtils.js'
