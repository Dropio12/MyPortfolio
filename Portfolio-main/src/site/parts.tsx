import React from 'react'
import { LineId, lines, lineOrder } from '../content'

export const laneIndex: Record<LineId, number> = { R: 0, S: 1, A: 2, F: 3 }

export const sortLines = (ids: LineId[]) =>
	[...ids].sort((a, b) => lineOrder.indexOf(a) - lineOrder.indexOf(b))

/** Renders 'a · b · c' with drawn separators that screen readers hear as commas. */
export const Parts = ({ text }: { text: string }) => (
	<>
		{text.split(' · ').map((part, i) => (
			<React.Fragment key={part}>
				{i > 0 && (
					<span className="sep">
						<span className="sr-only">, </span>
					</span>
				)}
				<span className="part">{part}</span>
			</React.Fragment>
		))}
	</>
)

export const Bullet = ({
	id,
	size = 'md',
	labelled = false,
}: {
	id: LineId
	size?: 'sm' | 'md' | 'lg'
	labelled?: boolean
}) => (
	<span
		className={`bullet bullet--${id} bullet--${size}`}
		role={labelled ? 'img' : undefined}
		aria-label={labelled ? lines[id].name : undefined}
		aria-hidden={labelled ? undefined : true}
	>
		{id}
	</span>
)

export const Bullets = ({
	ids,
	size = 'md',
	labelled = false,
}: {
	ids: LineId[]
	size?: 'sm' | 'md' | 'lg'
	labelled?: boolean
}) => (
	<span className="bullets">
		{sortLines(ids).map(id => (
			<Bullet key={id} id={id} size={size} labelled={labelled} />
		))}
	</span>
)

/** Node on the ride track: a dot for one line, an interchange capsule for several. */
export const TrackNode = ({
	lines: ids,
	primary,
	kind,
	main = false,
}: {
	lines: LineId[]
	primary: LineId
	kind?: 'origin' | 'terminus' | 'sub'
	main?: boolean
}) => {
	const idx = ids.map(id => laneIndex[id])
	const i0 = Math.min(...idx)
	const i1 = Math.max(...idx)
	const interchange = ids.length > 1 || kind === 'origin' || kind === 'terminus'
	const style = { '--i0': i0, '--i1': i1 } as React.CSSProperties
	return (
		<span
			className={`node node--${interchange ? 'interchange' : 'dot'} node--${primary}${
				kind ? ` node--${kind}` : ''
			}`}
			data-node=""
			data-lines={ids.join(' ')}
			data-main={main ? '' : undefined}
			style={style}
			aria-hidden="true"
		/>
	)
}
