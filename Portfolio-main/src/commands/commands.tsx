import React from 'react'
import styles from './commands.module.scss'
import {
	education,
	featured,
	links,
	person,
	plain,
	projectIndex,
	recognition,
	repoUrl,
	roles,
} from '../content'
import { Commands, Command } from '../typings'
import ListElement from '../ListElement/ListElement'

// Same content module as the page, so the terminal can never drift from the doc.
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
					<p className={styles.header}>
						<strong>{person.name}</strong>
					</p>
					<p>{person.abstract}</p>
					<p>
						{education[0].degree}, {education[0].school} ({education[0].date}).{' '}
						{person.available}. {person.location}.
					</p>
					<p className="muted">Where I've worked:</p>
					<ul className={styles.list}>
						{roles.map(role => (
							<li key={role.id}>
								<span className="highlighted">
									{role.org}
									{role.team && `, ${role.team}`}
								</span>
								: {plain(role.points[0])}
							</li>
						))}
					</ul>
					<p className="muted">Recognition:</p>
					<ul className={styles.list}>
						{recognition.map(item => (
							<li key={item}>{plain(item)}</li>
						))}
					</ul>
					<p>
						Type <span className="highlighted">projects</span>,{' '}
						<span className="highlighted">links</span> or{' '}
						<span className="highlighted">help</span>. Type{' '}
						<span className="highlighted">exit</span> or press Esc to close.
					</p>
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
					{featured.map(p => (
						<ListElement
							key={p.id}
							name={p.name}
							link={repoUrl(p.repo)}
							description={plain(p.summary)}
						/>
					))}
					{projectIndex.map(p => (
						<ListElement key={p.name} name={p.name} link={p.href} description={p.what} />
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
					<ListElement name="LinkedIn" link={links.linkedin} description="Connect with me" />
					<ListElement name="GitHub" link={links.github} description={links.githubLabel} />
					<ListElement name="Email" link={`mailto:${links.email}`} description={links.email} />
					<ListElement name="Resume" link={links.resume} description="PDF" />
				</>
			)
		},
	},
	{
		name: 'clear',
		description: 'Clear terminal screen',
		execute(app) {
			app.setState({
				...app.state,
				record: [],
			})
		},
	},
	{
		name: 'exit',
		description: 'Close the terminal',
		execute(app) {
			app.props.onClose?.()
		},
	},
]
const commands: Commands = new Map(rawCommands.map(cmd => [cmd.name, cmd]))

export default commands
