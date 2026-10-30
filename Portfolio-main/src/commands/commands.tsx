import React from 'react'
import styles from './commands.module.scss'
import { education, experienceOrder, itemById, items, links, person } from '../content'
import { Commands, Command } from '../typings'
import ListElement from '../ListElement/ListElement'

// Same facts as the page: everything here reads the content module.
const rawCommands: Command[] = [
	{
		name: 'help',
		description: 'List available commands',
		execute(app) {
			const { commands } = app.state
			return (
				<>
					Available commands:
					{[...commands.values()].map(({ name, description }, key) => (
						<ListElement key={key} name={name} description={description} help />
					))}
				</>
			)
		},
	},
	{
		name: 'about',
		description: 'Show about me',
		execute() {
			return (
				<div className={styles.infoWrapper}>
					<div className={styles.header}>
						<strong>{person.name}</strong>
						<p className="muted">{person.role}</p>
					</div>
					<div className={styles.info}>
						<p>{person.availability.join('. ')}.</p>
						<p>Education:</p>
						<ul>
							{education.map(d => (
								<li key={d.degree}>
									<b>{d.degree}</b>, {d.school}, {d.when}
									{d.detail ? `. ${d.detail}` : ''}
								</li>
							))}
						</ul>
						<p>Experience:</p>
						<ul>
							{experienceOrder.map(id => {
								const s = itemById(id)!
								return (
									<li key={s.id}>
										<b>{s.title}:</b> {s.position}, {s.dates}. {s.line}
									</li>
								)
							})}
						</ul>
						<p>
							Type <span className="highlighted">projects</span>,{' '}
							<span className="highlighted">links</span> or{' '}
							<span className="highlighted">help</span> below.
						</p>
					</div>
				</div>
			)
		},
	},
	{
		name: 'projects',
		description: 'List of my major projects',
		execute() {
			return (
				<>
					{items
						.filter(p => p.kind !== 'experience')
						.map(p => (
							<ListElement key={p.id} name={p.title} link={p.links[0]?.href} description={p.line} />
						))}
				</>
			)
		},
	},
	{
		name: 'links',
		description: 'Display social links',
		execute() {
			return (
				<>
					<ListElement name="Resume" link={links.resume} description="PDF" />
					<ListElement name="Email" link={links.email} description={person.email} />
					<ListElement name="GitHub" link={links.github} description={links.githubLabel} />
					<ListElement name="LinkedIn" link={links.linkedin} description={links.linkedinLabel} />
				</>
			)
		},
	},
	{
		name: 'clear',
		description: 'Clear terminal screen',
		execute(app) {
			app.setState({ record: [] })
		},
	},
]
const commands: Commands = new Map(rawCommands.map(cmd => [cmd.name, cmd]))

export default commands
