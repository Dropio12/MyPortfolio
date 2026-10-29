import React from 'react'
import { LineId, lineOrder, lines } from '../content'

export const sortLines = (ids: LineId[]) => [...ids].sort((a, b) => lineOrder.indexOf(a) - lineOrder.indexOf(b))

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

// The same 9x9 pixel disc and 3x5 letters the platform signs use on the canvas.
const DISC = ['..#####..', '.#######.', '#########', '#########', '#########', '#########', '#########', '.#######.', '..#####..']
const LETTER: Record<LineId, string[]> = {
	S: ['.##', '#..', '.#.', '..#', '##.'],
	A: ['.#.', '#.#', '###', '#.#', '#.#'],
	F: ['###', '#..', '##.', '#..', '#..'],
	R: ['##.', '#.#', '##.', '#.#', '#.#'],
}

const runs = (rows: string[], dx = 0, dy = 0) => {
	const out: string[] = []
	rows.forEach((row, y) => {
		let x = 0
		while (x < row.length) {
			if (row[x] !== '#') {
				x++
				continue
			}
			let e = x
			while (e < row.length && row[e] === '#') e++
			out.push(`M${x + dx} ${y + dy}h${e - x}v1h${x - e}z`)
			x = e
		}
	})
	return out.join('')
}

const DISC_PATH = runs(DISC)
const LETTER_PATH: Record<LineId, string> = {
	S: runs(LETTER.S, 3, 2),
	A: runs(LETTER.A, 3, 2),
	F: runs(LETTER.F, 3, 2),
	R: runs(LETTER.R, 3, 2),
}

/** A line bullet drawn on the pixel grid. Labelled bullets name their line for screen readers. */
export const Bullet = ({ id, labelled = false }: { id: LineId; labelled?: boolean }) => (
	<svg
		className={`bullet bullet--${id}`}
		viewBox="0 0 9 9"
		shapeRendering="crispEdges"
		role={labelled ? 'img' : undefined}
		aria-label={labelled ? lines[id].name : undefined}
		aria-hidden={labelled ? undefined : true}
		focusable="false"
	>
		<path className="bullet__disc" d={DISC_PATH} />
		<path className="bullet__letter" d={LETTER_PATH[id]} />
	</svg>
)

export const Bullets = ({ ids, labelled = false }: { ids: LineId[]; labelled?: boolean }) => (
	<span className="bullets">
		{sortLines(ids).map(id => (
			<Bullet key={id} id={id} labelled={labelled} />
		))}
	</span>
)
