import React from 'react'
import { ListElementProps } from '../typings'
import styles from './ListElement.module.scss'

const ListElement = (props: ListElementProps) => {
	const { name, link, description, help } = props
	return (
		<div className={styles.listElement}>
			<strong className={help ? styles.alt : ''}>
				{link ? (
					<a href={link} target={'_blank'} rel="noreferrer">
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
