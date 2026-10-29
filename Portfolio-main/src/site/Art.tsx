import React from 'react'

// Card art: one diagram per piece of work, drawn from what the work does (latency bars for the
// gRPC move, a floor plan for Linea, a price scatter for the car deals). Geometry only, in ink and
// grays on a scrap of paper; the accent layer turns to the orb's blue foil only when the work
// matches. Decorative: the card's text
// carries the information.

const ink = 'var(--ink)'
const paper = 'var(--paper)'
const gray = 'var(--art-gray)'
const soft = 'var(--art-soft)'
// the accent is white at rest and turns to blue foil when the card matches (see .art in site.scss)
const accent = 'var(--art-accent)'

const Frame = ({ children, label }: { children: React.ReactNode; label?: string }) => (
	<svg className="art" viewBox="0 0 240 240" aria-hidden="true" focusable="false" data-art={label}>
		{children}
	</svg>
)

// small deterministic random, so the scatter and waves are the same on every render
const seeded = (seed: number) => () => {
	seed = (seed * 16807) % 2147483647
	return (seed - 1) / 2147483646
}

const Check = ({ x, y, r = 9, fill = accent }: { x: number; y: number; r?: number; fill?: string }) => (
	<g>
		<circle cx={x} cy={y} r={r} fill={fill} stroke={ink} strokeWidth="2" />
		<path
			d={`M${x - r * 0.42} ${y + r * 0.02} l${r * 0.3} ${r * 0.3} l${r * 0.55} -${r * 0.6}`}
			fill="none"
			stroke={ink}
			strokeWidth="2.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</g>
)

/* ---------- experience ---------- */

const Latency = () => {
	const unit = 16.8
	return (
		<Frame label="latency">
			<text className="art-t" x="36" y="78">
				HTTP/1
			</text>
			<rect x="36" y="88" width={unit * 10} height="24" rx="12" fill={gray} />
			{Array.from({ length: 9 }, (_, i) => (
				<circle key={i} cx={36 + unit * (i + 0.5) + 2} cy="100" r="3.2" fill={paper} />
			))}
			<text className="art-t" x="36" y="146">
				gRPC
			</text>
			<rect x="36" y="156" width={unit} height="24" rx="12" fill={accent} stroke={ink} strokeWidth="2" />
			<path d="M36 196h168" stroke={ink} strokeWidth="2" />
			{Array.from({ length: 11 }, (_, i) => (
				<path key={i} d={`M${36 + unit * i} 192v8`} stroke={ink} strokeWidth="2" strokeLinecap="round" />
			))}
			<text className="art-t art-t--strong" x="204" y="174" textAnchor="end">
				10x
			</text>
		</Frame>
	)
}

const CodeReview = () => {
	const lines = [88, 120, 64, 132, 96, 110, 72]
	return (
		<Frame label="code-review">
			<rect x="30" y="34" width="180" height="150" rx="14" fill={paper} stroke={ink} strokeWidth="2" />
			{lines.map((w, i) => {
				const y = 52 + i * 18
				const hit = i === 2 || i === 5
				return (
					<g key={i}>
						{hit && <rect x="31" y={y - 6} width="178" height="16" fill={i === 2 ? accent : soft} />}
						<text className="art-t art-t--mono" x="40" y={y + 6}>
							{i === 2 ? '+' : i === 5 ? '−' : ''}
						</text>
						<rect x="56" y={y - 1} width={w} height="6" rx="3" fill={hit ? ink : gray} />
					</g>
				)
			})}
			<Check x={190} y={56} r={10} />
			{['py', 'js', 'java', 'c++'].map((l, i) => (
				<g key={l}>
					<rect x={30 + i * 47} y="196" width="40" height="22" rx="11" fill={i === 1 ? ink : paper} stroke={ink} strokeWidth="2" />
					<text className="art-t art-t--chip" x={50 + i * 47} y="211" textAnchor="middle" style={{ fill: i === 1 ? paper : ink }}>
						{l}
					</text>
				</g>
			))}
		</Frame>
	)
}

const Payroll = () => (
	<Frame label="payroll">
		{Array.from({ length: 30 }, (_, i) => (
			<rect key={i} x={30 + (i % 5) * 13} y={62 + Math.floor(i / 5) * 18} width="9" height="12" rx="2" fill={i % 7 === 3 ? ink : gray} />
		))}
		<path d="M100 92h46M100 136h46" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
		<path d="M114 104l12 10-12 10" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
		{Array.from({ length: 5 }, (_, i) => (
			<g key={i}>
				<rect x="158" y={64 + i * 22} width="52" height="14" rx="7" fill={paper} stroke={ink} strokeWidth="2" />
				<circle cx="203" cy={71 + i * 22} r="4" fill={accent} stroke={ink} strokeWidth="1.5" />
			</g>
		))}
		<rect x="30" y="186" width="180" height="10" rx="5" fill={soft} />
		<rect x="30" y="186" width={180 * 0.13} height="10" rx="5" fill={accent} stroke={ink} strokeWidth="2" />
		<text className="art-t art-t--strong" x="210" y="224" textAnchor="end">
			87%
		</text>
	</Frame>
)

const Workshop = () => {
	const seats: { x: number; y: number }[] = []
	const rows = [7, 9, 11, 13]
	rows.forEach((n, r) => {
		const radius = 50 + r * 21
		for (let i = 0; i < n; i++) {
			const a = Math.PI * (0.16 + (0.68 * i) / (n - 1))
			seats.push({ x: 120 + Math.cos(a) * radius * 1.12, y: 78 + Math.sin(a) * radius * 0.92 })
		}
	})
	return (
		<Frame label="workshop">
			<rect x="78" y="34" width="84" height="40" rx="8" fill={ink} />
			<rect x="88" y="42" width="64" height="24" rx="4" fill={accent} />
			<path d="M100 54h28M100 60h18" stroke={ink} strokeWidth="2" strokeLinecap="round" />
			{seats.map((s, i) => (
				<rect key={i} x={s.x - 5} y={s.y - 4} width="10" height="8" rx="3" fill={i % 9 === 4 ? ink : gray} />
			))}
		</Frame>
	)
}

/* ---------- client work ---------- */

const Documents = () => (
	<Frame label="documents">
		<rect x="62" y="60" width="100" height="128" rx="10" fill={soft} stroke={ink} strokeWidth="2" transform="rotate(-8 112 124)" />
		<rect x="70" y="52" width="100" height="128" rx="10" fill={paper} stroke={ink} strokeWidth="2" transform="rotate(-3 120 116)" />
		<g>
			<path d="M78 44h70l22 22v118a8 8 0 0 1-8 8H78a8 8 0 0 1-8-8V52a8 8 0 0 1 8-8Z" fill={paper} stroke={ink} strokeWidth="2" />
			<path d="M148 44v22h22" fill="none" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
			{[78, 94, 110, 126, 142].map((y, i) => (
				<rect key={y} x="84" y={y} width={i === 2 ? 46 : 70} height="6" rx="3" fill={i === 0 ? ink : gray} />
			))}
			<rect x="84" y="158" width="40" height="14" rx="7" fill={accent} stroke={ink} strokeWidth="2" />
		</g>
		<Check x={170} y={176} r={16} />
	</Frame>
)

const BuildingCheck = () => (
	<Frame label="building-code">
		<path d="M70 196V92l50-34 50 34v104Z" fill={paper} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
		{[118, 146, 174].map(y => (
			<path key={y} d={`M70 ${y}h100`} stroke={gray} strokeWidth="2" />
		))}
		{[0, 1, 2].map(r =>
			[0, 1, 2].map(c => <rect key={`${r}${c}`} x={82 + c * 28} y={124 + r * 28} width="16" height="16" rx="3" fill={soft} stroke={ink} strokeWidth="1.5" />)
		)}
		<path d="M48 92v104M43 92h10M43 196h10" stroke={ink} strokeWidth="2" strokeLinecap="round" />
		<path d="M170 106l22-18M170 146h24M120 58l40-22" stroke={ink} strokeWidth="1.5" strokeDasharray="3 4" />
		<Check x={200} y={82} r={11} />
		<Check x={204} y={146} r={11} />
		<circle cx="166" cy="32" r="11" fill={paper} stroke={ink} strokeWidth="2" />
		<path d="M166 26v7M166 37.5v.5" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
	</Frame>
)

const VoiceCall = () => {
	const rand = seeded(7)
	const bars = Array.from({ length: 21 }, (_, i) => {
		const env = Math.sin((Math.PI * (i + 0.5)) / 21)
		return 12 + env * (36 + rand() * 46)
	})
	return (
		<Frame label="voice">
			<circle cx="46" cy="120" r="30" fill="none" stroke={gray} strokeWidth="2" />
			<circle cx="46" cy="120" r="20" fill="none" stroke={gray} strokeWidth="2" />
			<circle cx="46" cy="120" r="11" fill={ink} />
			{bars.map((h, i) => (
				<rect
					key={i}
					x={88 + i * 6.6}
					y={120 - h / 2}
					width="4"
					height={h}
					rx="2"
					fill={i > 11 ? (i % 3 === 0 ? accent : ink) : gray}
					stroke={i > 11 && i % 3 === 0 ? ink : 'none'}
					strokeWidth="1.2"
				/>
			))}
			<path d="M88 190h134" stroke={ink} strokeWidth="2" strokeLinecap="round" />
			<rect x="166" y="183" width="56" height="14" rx="7" fill={accent} stroke={ink} strokeWidth="2" />
		</Frame>
	)
}

/* ---------- projects ---------- */

const Curves = () => (
	<Frame label="curves">
		<path d="M40 40v156h164" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M44 186c30-40 54-62 84-74s50-14 72-16" fill="none" stroke={gray} strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
		<path d="M44 186c26-58 50-96 82-114s54-20 74-22" fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
		<path d="M196 52v42" stroke={ink} strokeWidth="2" />
		<rect x="186" y="50" width="20" height="46" rx="10" fill={accent} stroke={ink} strokeWidth="2" opacity="0.95" />
		<circle cx="200" cy="50" r="5" fill={ink} />
		<circle cx="200" cy="96" r="5" fill={paper} stroke={ink} strokeWidth="2" />
		<text className="art-t art-t--strong" x="52" y="62">
			+38%
		</text>
	</Frame>
)

const FloorPlan = () => (
	<Frame label="floor-plan">
		<rect x="128" y="40" width="72" height="70" fill={accent} />
		<rect x="40" y="40" width="160" height="160" rx="4" fill="none" stroke={ink} strokeWidth="5" />
		<path d="M128 40v46M128 106v4h72M40 130h52M112 130h24v70M136 160h64" fill="none" stroke={ink} strokeWidth="3.5" strokeLinejoin="round" />
		<path d="M128 86a20 20 0 0 1 20 20" fill="none" stroke={ink} strokeWidth="1.5" />
		<path d="M92 130a20 20 0 0 0 20-20" fill="none" stroke={ink} strokeWidth="1.5" />
		<path d="M136 182a18 18 0 0 1 18-18" fill="none" stroke={ink} strokeWidth="1.5" />
		<rect x="54" y="54" width="34" height="22" rx="4" fill={soft} stroke={ink} strokeWidth="1.5" />
		<rect x="54" y="146" width="22" height="38" rx="4" fill={soft} stroke={ink} strokeWidth="1.5" />
		<circle cx="164" cy="182" r="9" fill={paper} stroke={ink} strokeWidth="1.5" />
	</Frame>
)

const Pcb = () => (
	<Frame label="pcb">
		<rect x="30" y="30" width="180" height="180" rx="16" fill={paper} stroke={ink} strokeWidth="2.5" />
		{[
			'M56 60h40l16 16v24',
			'M184 64h-34l-14 14v22',
			'M56 184h46l12-12v-30',
			'M184 182h-36l-12-12v-28',
			'M56 120h44',
			'M140 120h44',
		].map(d => (
			<path key={d} d={d} fill="none" stroke={gray} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
		))}
		<rect x="98" y="98" width="44" height="44" rx="6" fill={ink} />
		{[0, 1, 2, 3].map(i => (
			<g key={i}>
				<rect x={104 + i * 10} y="92" width="4" height="6" fill={ink} />
				<rect x={104 + i * 10} y="142" width="4" height="6" fill={ink} />
			</g>
		))}
		<circle cx="106" cy="106" r="2.5" fill={paper} />
		{[
			[56, 60],
			[184, 64],
			[56, 184],
			[184, 182],
			[56, 120],
			[184, 120],
		].map(([x, y]) => (
			<circle key={`${x}${y}`} cx={x} cy={y} r="6" fill={paper} stroke={ink} strokeWidth="2" />
		))}
		<circle cx="150" cy="78" r="17" fill="none" stroke={ink} strokeWidth="2" strokeDasharray="4 4" />
		<Check x={163} y={64} r={9} />
	</Frame>
)

const PromptToBoard = () => (
	<Frame label="prompt-to-board">
		<rect x="28" y="34" width="184" height="52" rx="26" fill={paper} stroke={ink} strokeWidth="2" />
		<rect x="48" y="50" width="88" height="6" rx="3" fill={ink} />
		<rect x="48" y="63" width="58" height="6" rx="3" fill={gray} />
		<circle cx="186" cy="60" r="14" fill={accent} stroke={ink} strokeWidth="2" />
		<path d="M186 66v-12M181 59l5-5 5 5" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M120 94v18" stroke={ink} strokeWidth="2" strokeDasharray="3 4" />
		<rect x="58" y="118" width="124" height="88" rx="10" fill={accent} stroke={ink} strokeWidth="2.5" />
		<path d="M74 136h30l10 10v22M166 140h-24l-8 8v16M74 190h40M136 190h30" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
		<rect x="104" y="150" width="32" height="28" rx="4" fill={ink} />
		{[
			[74, 136],
			[166, 140],
			[74, 190],
			[166, 190],
		].map(([x, y]) => (
			<circle key={`${x}${y}`} cx={x} cy={y} r="4.5" fill={paper} stroke={ink} strokeWidth="2" />
		))}
	</Frame>
)

const PriceScatter = () => {
	const rand = seeded(42)
	const dots = Array.from({ length: 26 }, (_, i) => {
		const x = 48 + (i / 25) * 150
		const line = 60 + ((x - 48) / 150) * 104
		return { x: x + (rand() - 0.5) * 8, y: line + (rand() - 0.5) * 30 }
	})
	return (
		<Frame label="price-scatter">
			<path d="M38 36v164h170" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M46 58l158 108" stroke={ink} strokeWidth="2" strokeDasharray="5 5" />
			{dots.map((d, i) => (
				<circle key={i} cx={d.x} cy={d.y} r="4.5" fill={gray} />
			))}
			<path d="M118 150v-40" stroke={ink} strokeWidth="1.5" />
			<circle cx="118" cy="160" r="9" fill={accent} stroke={ink} strokeWidth="2.5" />
			<rect x="132" y="168" width="58" height="20" rx="10" fill={ink} />
			<text className="art-t art-t--chip" x="161" y="182" textAnchor="middle" style={{ fill: paper }}>
				deal
			</text>
		</Frame>
	)
}

const Signals = () => {
	const wave = (amp: number, freq: number, phase: number, y: number) => {
		let d = ''
		for (let x = 0; x <= 168; x += 4) {
			const v = y + Math.sin((x / 168) * Math.PI * freq + phase) * amp * Math.sin((x / 168) * Math.PI)
			d += `${x === 0 ? 'M' : 'L'}${36 + x} ${v.toFixed(1)}`
		}
		return d
	}
	return (
		<Frame label="signals">
			<rect x="36" y="34" width="96" height="62" rx="10" fill={ink} />
			<path d="M76 52v26l20-13Z" fill={paper} />
			<rect x="142" y="34" width="62" height="28" rx="6" fill={soft} />
			<rect x="142" y="68" width="40" height="28" rx="6" fill={soft} />
			<path d={wave(12, 6, 0, 130)} fill="none" stroke={gray} strokeWidth="2.5" strokeLinecap="round" />
			<path d={wave(16, 4, 1.2, 160)} fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
			<path d={wave(10, 9, 2.4, 190)} fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
			<path d="M150 112v94" stroke={ink} strokeWidth="1.5" />
			<rect x="144" y="106" width="12" height="12" rx="3" fill={accent} stroke={ink} strokeWidth="2" />
		</Frame>
	)
}

const SiteMap = () => (
	<Frame label="sites">
		<path
			d="M40 70h50v-30h60v40h50v70h-40v40H90v-30H40Z"
			fill={paper}
			stroke={ink}
			strokeWidth="2.5"
			strokeLinejoin="round"
		/>
		<path d="M90 70v50h70M150 80v40" fill="none" stroke={gray} strokeWidth="2" />
		<path d="M120 196c0-30-8-44-30-56M120 196c10-36 30-56 54-62" fill="none" stroke={ink} strokeWidth="2" strokeDasharray="4 5" />
		<circle cx="120" cy="196" r="6" fill={ink} />
		<circle cx="74" cy="132" r="18" fill={accent} stroke={ink} strokeWidth="2.5" />
		<text className="art-t art-t--strong" x="74" y="138" textAnchor="middle">
			A
		</text>
		<circle cx="178" cy="114" r="18" fill={paper} stroke={ink} strokeWidth="2.5" />
		<text className="art-t art-t--strong" x="178" y="120" textAnchor="middle">
			B
		</text>
	</Frame>
)

const Routes = () => {
	const pts = [
		[46, 150],
		[90, 74],
		[126, 140],
		[168, 66],
		[198, 128],
	]
	return (
		<Frame label="routes">
			<path d="M46 150Q60 96 90 74M90 74Q140 52 168 66M46 150Q90 170 126 140M126 140Q140 92 168 66M168 66Q196 86 198 128M126 140Q170 156 198 128" fill="none" stroke={gray} strokeWidth="2" strokeDasharray="4 5" />
			<path d="M46 150Q90 170 126 140Q170 156 198 128" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
			{pts.map(([x, y], i) => (
				<circle key={i} cx={x} cy={y} r={i === 0 || i === 4 ? 8 : 6} fill={i === 0 || i === 2 || i === 4 ? accent : paper} stroke={ink} strokeWidth="2" />
			))}
			{Array.from({ length: 7 }, (_, i) => (
				<rect key={i} x={40 + i * 24} y="184" width="18" height="18" rx="4" fill={i >= 2 && i <= 4 ? ink : soft} />
			))}
		</Frame>
	)
}

const PhotoText = () => (
	<Frame label="photo-text">
		<rect x="28" y="44" width="110" height="140" rx="10" fill={soft} stroke={ink} strokeWidth="2" />
		<path d="M28 150l36-34 26 22 18-14 30 28v22a10 10 0 0 1-10 10H38a10 10 0 0 1-10-10Z" fill={gray} />
		<rect x="40" y="58" width="64" height="24" rx="4" fill="none" stroke={ink} strokeWidth="2" strokeDasharray="4 3" />
		<rect x="46" y="66" width="40" height="7" rx="3" fill={ink} />
		<rect x="58" y="92" width="66" height="22" rx="4" fill="none" stroke={ink} strokeWidth="2" strokeDasharray="4 3" />
		<rect x="64" y="99" width="46" height="7" rx="3" fill={ink} />
		<path d="M146 112h20M160 105l7 7-7 7" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
		<rect x="176" y="62" width="40" height="20" rx="4" fill={accent} stroke={ink} strokeWidth="2" />
		<rect x="176" y="94" width="40" height="20" rx="4" fill={accent} stroke={ink} strokeWidth="2" />
		<rect x="183" y="69" width="24" height="6" rx="3" fill={ink} />
		<rect x="183" y="101" width="18" height="6" rx="3" fill={ink} />
	</Frame>
)

const PhotoSearch = () => (
	<Frame label="photo-search">
		{Array.from({ length: 9 }, (_, i) => (
			<rect key={i} x={52 + (i % 3) * 48} y={52 + Math.floor(i / 3) * 48} width="40" height="40" rx="8" fill={i === 4 ? accent : soft} stroke={i === 4 ? ink : 'none'} strokeWidth="2.5" />
		))}
		<circle cx="190" cy="190" r="22" fill={ink} />
		<circle cx="190" cy="190" r="9" fill="none" stroke={paper} strokeWidth="2.5" />
	</Frame>
)

const Laptops = () => (
	<Frame label="laptops">
		{Array.from({ length: 12 }, (_, i) => {
			const x = 34 + (i % 4) * 44
			const y = 58 + Math.floor(i / 4) * 52
			const lit = i === 5
			return (
				<g key={i}>
					<rect x={x} y={y} width="36" height="24" rx="4" fill={lit ? accent : paper} stroke={ink} strokeWidth="2" />
					<path d={`M${x - 4} ${y + 30}h44`} stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
					{!lit && <rect x={x + 7} y={y + 8} width="16" height="4" rx="2" fill={gray} />}
				</g>
			)
		})}
		<rect x="70" y="26" width="100" height="16" rx="8" fill={ink} />
	</Frame>
)

const Automaton = () => {
	const pt = (i: number) => {
		const z = (i - 20) / 7
		return `${(30 + i * 4.5).toFixed(1)} ${(112 - Math.exp(-z * z) * 70).toFixed(1)}`
	}
	const curve = Array.from({ length: 41 }, (_, i) => `${i ? 'L' : 'M'}${pt(i)}`).join('')
	// the shaded band: one standard deviation each side of the mean
	const band = Array.from({ length: 15 }, (_, k) => `L${pt(13 + k)}`).join('')
	return (
		<Frame label="automaton">
			<path d={`${curve}L210 112Z`} fill={soft} />
			<path d={`M88.5 112${band}L151.5 112Z`} fill={accent} />
			<path d={curve} fill="none" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
			<path d="M30 112h180" stroke={ink} strokeWidth="2" />
			{[
				[58, 170],
				[120, 170],
				[182, 170],
			].map(([x, y], i) => (
				<g key={i}>
					<circle cx={x} cy={y} r="18" fill={i === 2 ? accent : paper} stroke={ink} strokeWidth="2" />
					{i === 2 && <circle cx={x} cy={y} r="12" fill="none" stroke={ink} strokeWidth="2" />}
				</g>
			))}
			<path d="M77 170h20M137 170h20" stroke={ink} strokeWidth="2" strokeLinecap="round" />
			<path d="M92 165l6 5-6 5M152 165l6 5-6 5" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M108 156c4-18 20-18 24 0" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
		</Frame>
	)
}

const registry: Record<string, () => JSX.Element> = {
	'shopify-visual-search': PhotoSearch,
	'shopify-infra-security': Latency,
	'scale-ai': CodeReview,
	'ia-financial': Payroll,
	'intel-ambassador': Workshop,
	'adobe-ambassador': Laptops,
	'laval-ta': Automaton,
	'law-firm-workflow': Documents,
	'architecture-rag-agent': BuildingCheck,
	'hotel-jaro-voice': VoiceCall,
	agentgym: Curves,
	linea: FloorPlan,
	'cherry-hardware-agent': Pcb,
	'cherry-blossom': PromptToBoard,
	'used-car-deal-finder': PriceScatter,
	neurovision: Signals,
	'valorant-spike-predictor': SiteMap,
	flighto: Routes,
	'translator-ai': PhotoText,
}

export const Art = ({ id }: { id: string }) => {
	const A = registry[id] || PhotoSearch
	return <A />
}
