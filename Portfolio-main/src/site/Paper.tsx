import React, { useLayoutEffect, useRef, useState } from 'react'
import { cutPath } from '../lib/paper'

// The sheet behind any paper surface: a cast shadow, a contact shadow, the white sheet with a
// faint grain, and a hairline on the cut. It fills its parent (which sets position: relative)
// and redraws its outline when the parent's size changes. Decorative only.

type Props = {
	seed: string
	/** 'piece' is the smaller, grayer scrap glued onto a card */
	tone?: 'sheet' | 'piece'
	className?: string
}

const PaperBack = ({ seed, tone = 'sheet', className }: Props) => {
	const box = useRef<HTMLSpanElement>(null)
	const [size, setSize] = useState<{ w: number; h: number } | null>(null)

	useLayoutEffect(() => {
		const el = box.current
		if (!el) return
		const read = () => {
			const w = Math.round(el.offsetWidth)
			const h = Math.round(el.offsetHeight)
			setSize(s => (s && s.w === w && s.h === h ? s : { w, h }))
		}
		read()
		if (typeof ResizeObserver === 'undefined') return
		const ro = new ResizeObserver(read)
		ro.observe(el)
		return () => ro.disconnect()
	}, [])

	const d = size ? cutPath(seed, size.w, size.h, tone === 'piece' ? 2 : 4, tone === 'piece' ? 1.8 : 3) : ''
	const view = size ? `0 0 ${size.w} ${size.h}` : undefined
	return (
		<span ref={box} className={`paper paper--${tone}${className ? ` ${className}` : ''}`} aria-hidden="true">
			{size && (
				<>
					<svg className="paper__cast" viewBox={view} focusable="false">
						<path d={d} />
					</svg>
					<svg className="paper__contact" viewBox={view} focusable="false">
						<path d={d} />
					</svg>
					<svg className="paper__sheet" viewBox={view} focusable="false">
						<path className="paper__fill" d={d} />
						<path className="paper__grain" d={d} />
						<path className="paper__edge" d={d} />
					</svg>
				</>
			)}
		</span>
	)
}

export default PaperBack

/** shared SVG paint servers: the paper grain, and the orb-blue foil that matching art turns to */
export const PaperDefs = () => (
	<svg className="defs" width="0" height="0" aria-hidden="true" focusable="false">
		<defs>
			<pattern id="paper-grain" patternUnits="userSpaceOnUse" width="256" height="256">
				<image href="/paper-grain.webp" width="256" height="256" />
			</pattern>
			<linearGradient id="aura" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stopColor="#e2f4ff" />
				<stop offset="0.45" stopColor="#8fdcff" />
				<stop offset="1" stopColor="#6f8dff" />
			</linearGradient>
		</defs>
	</svg>
)
