// The ride: every stop in order, built from the content module, with the pixel scene
// each one gets and the hour of day the world shows when the train stops there.
import {
	Fact,
	LineId,
	MinorProject,
	Project,
	Station,
	featuredProjects,
	moreProjects,
	msc,
	stations,
} from '../content'
import { SceneId, WorldStop } from '../world/geo'
import { World } from '../world/world'

export type RideStop = {
	id: string
	title: string
	detail?: string
	role?: string
	dates?: string
	summary?: string
	lines: LineId[]
	primary: LineId
	facts: Fact[]
	notes?: string[]
	project?: Project
	media?: 'shop'
	more?: MinorProject[]
	kind?: 'terminus'
	world: WorldStop
}

const station = (id: string) => {
	const s = stations.find(x => x.id === id)
	if (!s) throw new Error(`missing station ${id}`)
	return s
}

const fromStation = (s: Station, scene: SceneId, sign: string, sub: string | undefined, hour: number): RideStop => ({
	id: s.id,
	title: s.name,
	detail: s.detail,
	role: s.role,
	dates: s.dates,
	lines: s.lines,
	primary: s.primary,
	facts: s.facts,
	notes: s.notes,
	world: { scene, sign, sub, lines: s.lines, primary: s.primary, hour },
})

const laval = station('laval')
const clients = station('clients')
const sub = (id: string) => {
	const x = (clients.substops || []).find(s => s.id === id)
	if (!x) throw new Error(`missing client ${id}`)
	return x
}

const client = (id: string, scene: SceneId, sign: string, subSign: string, hour: number, first: boolean): RideStop => {
	const c = sub(id)
	return {
		id,
		title: c.name,
		role: first
			? `Client deployment. ${clients.role} (${clients.dates}).`
			: `Client deployment, ${clients.dates}.`,
		summary: c.summary,
		lines: ['A', 'F'],
		primary: 'F',
		facts: c.facts,
		world: { scene, sign, sub: subSign, lines: ['A', 'F'], primary: 'F', hour },
	}
}

const project = (id: string, scene: SceneId, sign: string, subSign: string | undefined, hour: number): RideStop => {
	const p = featuredProjects.find(x => x.id === id)
	if (!p) throw new Error(`missing project ${id}`)
	return {
		id,
		title: p.name,
		summary: p.line,
		lines: ['A'],
		primary: 'A',
		facts: p.facts,
		project: p,
		world: { scene, sign, sub: subSign, lines: ['A'], primary: 'A', hour },
	}
}

export const rideStops: RideStop[] = [
	{
		...fromStation(laval, 'campus', 'UNIVERSITÉ LAVAL', undefined, 7.4),
		lines: ['S', 'A', 'R'],
		role: `${msc.role}, ${msc.dates.charAt(0).toLowerCase()}${msc.dates.slice(1)} · ${laval.role}`,
		world: { scene: 'campus', sign: 'UNIVERSITÉ LAVAL', lines: ['S', 'A', 'R'], primary: 'S', hour: 7.4 },
	},
	fromStation(station('ia'), 'tower', 'IA FINANCIAL GROUP', undefined, 8.5),
	fromStation(station('recognition'), 'arena', 'RECOGNITION', 'HACKATHONS', 9.6),
	fromStation(station('ambassador'), 'lecture', 'INTEL AND ADOBE', 'AMBASSADOR', 10.8),
	fromStation(station('shopify-security'), 'datacenter', 'SHOPIFY', 'INFRASTRUCTURE SECURITY', 12),
	{
		...fromStation(station('shopify-visual-search'), 'street', 'SHOPIFY', 'VISUAL SEARCH', 13.2),
		media: 'shop',
		world: {
			scene: 'street',
			sign: 'SHOPIFY',
			sub: 'VISUAL SEARCH',
			lines: ['S', 'A', 'R'],
			primary: 'A',
			hour: 13.2,
			platform: 142,
		},
	},
	client('law', 'law', 'IMMIGRATION', 'LAW FIRMS', 14.4, true),
	client('architecture', 'studio', 'ARCHITECTURE', 'FIRM', 15.2, false),
	client('hotel', 'hotel', 'HOTEL JARO', 'FRONT DESK', 16, false),
	fromStation(station('scale'), 'lab', 'SCALE AI', undefined, 16.8),
	{
		...project('agentgym', 'gym', 'AGENTGYM', 'BRANCH LINE', 17.5),
		role: 'Branch line: projects built in public.',
	},
	project('linea', 'yard', 'LINEA', undefined, 18.1),
	project('cherry-hardware-agent', 'pcb', 'CHERRY', 'HARDWARE AGENT', 18.6),
	project('cherry-blossom', 'workshop', 'CHERRY BLOSSOM', undefined, 19),
	project('used-car-deal-finder', 'carlot', 'USED-CAR', 'DEAL FINDER', 19.45),
	project('cherryterminal', 'trading', 'CHERRYTERMINAL', undefined, 19.9),
	{
		id: 'more',
		title: 'More on the branch line',
		summary: 'Smaller projects, each with its code.',
		lines: ['A'],
		primary: 'A',
		facts: [],
		more: moreProjects,
		world: { scene: 'depot', sign: 'BRANCH DEPOT', sub: 'MORE PROJECTS', lines: ['A'], primary: 'A', hour: 20.6 },
	},
	{
		id: 'terminus',
		title: 'End of the line',
		lines: ['S'],
		primary: 'S',
		facts: [],
		kind: 'terminus',
		world: { scene: 'terminus', sign: 'END OF THE LINE', sub: 'CONTACT', lines: ['S'], primary: 'S', hour: 21.8 },
	},
]

export const stopIndex = (id: string) => rideStops.findIndex(s => s.id === id)

export const domId = (s: RideStop) => `stop-${s.id}`

let worldInstance: World | null = null

/** One world for the ride and the stills. */
export const getWorld = () => {
	if (!worldInstance) worldInstance = new World(rideStops.map(s => s.world))
	return worldInstance
}

export const shopShot = `${process.env.PUBLIC_URL || ''}/shop-photo-search.webp`
