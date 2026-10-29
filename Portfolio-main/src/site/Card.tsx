import React, { CSSProperties } from 'react'
import { Item, roles as roleList } from '../content'
import { Shown } from '../lib/filter'
import { tiltOf } from '../lib/paper'
import { tagById } from '../lib/vocab'
import { Art } from './Art'
import PaperBack from './Paper'
import { IconCheck, IconPin, IconPlay } from './icons'

const markFor = (s: Shown) => {
	if (s.pinned) return 'Best match'
	const words = [...s.roleHits.map(r => roleList.find(x => x.id === r)!.label), ...s.techHits.map(t => tagById[t]?.label || t)]
	return words.slice(0, 3).join(' · ')
}

/** the line under a card's title: the job and its dates, the client work and its dates, or the project */
export const cardSub = (item: Item) => {
	if (item.kind === 'experience') return { what: item.position || item.meta, when: item.dates || '' }
	if (item.kind === 'client') return { what: 'Client deployment', when: item.dates || '' }
	return { what: item.meta, when: '' }
}

/** the picture on a card: the supplied screenshot, or the work's diagram, on a glued scrap of paper */
export const Scrap = ({ item, seed }: { item: Item; seed: string }) => (
	<span className="scrap">
		<PaperBack seed={seed} tone="piece" />
		<span className="scrap__in">
			{item.image ? (
				<img src={item.image.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: item.image.position }} />
			) : (
				<Art id={item.id} />
			)}
		</span>
	</span>
)

type Props = { s: Shown; index: number; filtering: boolean; onOpen: (id: string) => void }

const Card = ({ s, index, filtering, onOpen }: Props) => {
	const { item } = s
	const mark = filtering ? markFor(s) : ''
	const sub = cardSub(item)
	const style = { '--tilt': `${tiltOf(item.id)}deg`, '--i': Math.min(index, 6) } as CSSProperties
	return (
		<a
			className={`card${mark ? ' is-match' : ''}${s.pinned ? ' is-pinned' : ''}`}
			href={`#${item.id}`}
			id={`card-${item.id}`}
			style={style}
			onClick={e => {
				if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
				e.preventDefault()
				onOpen(item.id)
			}}
		>
			<PaperBack seed={item.id} />
			<Scrap item={item} seed={`${item.id}:scrap`} />
			{mark && (
				<span className="card__mark">
					{s.pinned ? <IconPin /> : <IconCheck />}
					{mark}
				</span>
			)}
			{item.demo && (
				<span className="card__demo">
					<IconPlay />
					Demo
				</span>
			)}
			<span className="card__body">
				<h3 className="card__title">{item.org || item.title}</h3>
				<span className="card__sub">{sub.what}</span>
				{sub.when && <span className="card__when">{sub.when}</span>}
				<span className="card__line">{item.blurb || item.line}</span>
				<span className="card__foot">
					{item.key && (
						<span className="card__key">
							<span className="card__fig">{item.key.figure}</span>
							<span className="card__label">{item.key.label}</span>
						</span>
					)}
					<span className="card__stack">
						<span className="sr-only">Tech: </span>
						{item.stack.slice(0, 4).join(' · ')}
					</span>
				</span>
			</span>
		</a>
	)
}

export default Card
