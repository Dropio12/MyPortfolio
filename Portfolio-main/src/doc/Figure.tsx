import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { Diagram, FeaturedProject, FlowNode } from '../content'
import { useMedia } from './useMedia'
import styles from './Figure.module.scss'

// A numbered doc figure. With a demo file it plays the demo; without one it shows
// the project's architecture diagram, so the slot always reads as a finished figure.
export default function Figure({
	project,
	number,
}: {
	project: FeaturedProject
	number: number
}) {
	const { figure, demo, poster } = project
	const captionId = `figure-${project.id}`
	return (
		<figure className={styles.figure} aria-labelledby={captionId}>
			<div className={styles.canvas} data-kind={demo ? 'video' : figure.diagram.kind}>
				{demo ? (
					<DemoVideo
						src={withBase(demo)}
						poster={poster && withBase(poster)}
						label={`${project.name} demo video`}
					/>
				) : (
					<DiagramView diagram={figure.diagram} />
				)}
			</div>
			<figcaption id={captionId} className={styles.caption}>
				<span className={styles.figNum}>Figure {number}.</span>{' '}
				{demo ? project.demoCaption : figure.caption}
				{!demo && hasCore(figure.diagram) && ' Dark boxes mark the core of the system.'}
			</figcaption>
		</figure>
	)
}

const hasCore = (diagram: Diagram) =>
	(diagram.kind === 'flow' ? diagram.nodes : diagram.inside).some(node => node.core)

function NodeBox({ node, wired }: { node: FlowNode; wired?: boolean }) {
	return (
		<li className={styles.node} data-core={node.core || undefined}>
			<span className={styles.nodeLabel}>
				{node.detail && <span className={styles.nodeCount}>{node.detail}</span>}
				{node.label}
			</span>
			{wired && (
				<svg className={styles.wire} viewBox="0 0 22 12" aria-hidden="true" focusable="false">
					<path d="M0 6h17" />
					<path d="m13 1.5 4.5 4.5-4.5 4.5" />
				</svg>
			)}
		</li>
	)
}

const withBase = (path: string) =>
	path.startsWith('/') ? `${process.env.PUBLIC_URL}${path}` : path

function DiagramView({ diagram }: { diagram: Diagram }) {
	if (diagram.kind === 'system')
		return (
			<div className={styles.system}>
				<div className={styles.frame}>
					<span className={styles.frameLabel}>{diagram.frame}</span>
					<ul className={styles.inside}>
						{diagram.inside.map(node => (
							<NodeBox key={node.label} node={node} />
						))}
					</ul>
				</div>
				<ul className={styles.outside} aria-label="Connected to">
					{diagram.outside.map(node => (
						<NodeBox key={node.label} node={node} wired />
					))}
				</ul>
			</div>
		)

	const count = diagram.nodes.length
	const flow = (
		<ol className={styles.flow}>
			{diagram.nodes.map((node, i) => (
				<li key={node.label} className={styles.node} data-core={node.core || undefined}>
					<span className={styles.nodeLabel}>{node.label}</span>
					{node.detail && <span className={styles.nodeDetail}>{node.detail}</span>}
					{i < count - 1 && <Edge />}
				</li>
			))}
		</ol>
	)
	return (
		<div
			className={styles.flowWrap}
			data-loop={diagram.loop ? '' : undefined}
			style={{ '--n': count } as CSSProperties}
		>
			{diagram.host ? (
				<div className={styles.boundary}>
					<span className={styles.boundaryLabel}>{diagram.host}</span>
					{flow}
				</div>
			) : (
				flow
			)}
			{diagram.loop && (
				<p className={styles.loop}>
					<span className={styles.loopLabel}>
						<span className={styles.srOnly}>Then back to the start: </span>
						{diagram.loop}
					</span>
				</p>
			)}
		</div>
	)
}

function Edge() {
	return (
		<>
			<svg className={styles.edgeX} viewBox="0 0 36 12" aria-hidden="true" focusable="false">
				<path d="M3 6h28" />
				<path d="m26.5 1.5 4.5 4.5-4.5 4.5" />
			</svg>
			<svg className={styles.edgeY} viewBox="0 0 12 28" aria-hidden="true" focusable="false">
				<path d="M6 3v20" />
				<path d="m1.5 18.5 4.5 4.5 4.5-4.5" />
			</svg>
		</>
	)
}

// Muted, looping, lazy, paused off screen; never autoplays under reduced motion.
function DemoVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
	const ref = useRef<HTMLVideoElement>(null)
	const reduced = useMedia('(prefers-reduced-motion: reduce)')
	const [near, setNear] = useState(false)

	useEffect(() => {
		const video = ref.current
		if (!video) return
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setNear(true)
					io.disconnect()
				}
			},
			{ rootMargin: '400px 0px' }
		)
		io.observe(video)
		return () => io.disconnect()
	}, [])

	useEffect(() => {
		const video = ref.current
		if (!video || !near || reduced) return
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) video.play().catch(() => undefined)
				else video.pause()
			},
			{ threshold: 0.35 }
		)
		io.observe(video)
		return () => {
			io.disconnect()
			video.pause()
		}
	}, [near, reduced])

	return (
		<video
			ref={ref}
			className={styles.video}
			src={near ? src : undefined}
			poster={poster}
			muted
			loop
			playsInline
			preload="none"
			controls={reduced}
			aria-label={label}
		/>
	)
}
