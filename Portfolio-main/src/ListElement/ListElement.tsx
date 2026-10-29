import React from 'react'
import { ListElementProps } from '../typings'
import styles from './ListElement.module.scss'

const ListElement = (props: ListElementProps) => {
	const { name, link, description, help } = props
	const external = link && /^https?:/.test(link)
	return (
		<div className={styles.listElement}>
			<strong className={help ? styles.alt : ''}>
				{link ? (
					<a
						href={link}
						target={external ? '_blank' : undefined}
						rel={external ? 'noreferrer' : undefined}
					>
						{name}
					</a>
				) : (
					<>{name}</>
				)}
			</strong>{' '}
			<em>{description}</em>
		</div>
	)
}

export default ListElement
