import React, { Component, createRef, RefObject } from 'react'
import styles from './Terminal.module.scss'
import commands from '../commands/commands'
import { AppState } from '../typings'
import InputManager from '../InputManager/InputManager'
import { githubUser } from '../content'

// The original terminal portfolio, kept as an easter egg behind the service door.
class Terminal extends Component<{}, AppState> {
	mainRef: RefObject<HTMLDivElement>
	handleExecute: (arg: string) => void

	constructor(props: {}) {
		super(props)
		this.state = {
			record: [],
			commands: commands,
		}

		this.mainRef = createRef()

		this.handleExecute = arg => {
			const { commands } = this.state
			const commandName = arg.trim()
			let output: JSX.Element | void
			if (!commandName) output = <></>
			else if (!commands.has(commandName))
				output = (
					<>
						Command not found: {commandName}
						<br></br>Type "help" to list the available commands
					</>
				)
			else output = commands.get(commandName)?.execute(this)
			if (output) {
				const entry = { command: commandName, output }
				this.setState(state => ({ record: [...state.record, entry] }))
			}
		}
	}

	componentDidMount() {
		// show "about" on open so the terminal never starts empty
		this.handleExecute('about')
	}

	componentDidUpdate(_: {}, prevState: AppState) {
		// auto scroll, except for the "about" shown on open, which should be read from its top
		if (
			prevState.record.length > 0 &&
			prevState.record.length !== this.state.record.length &&
			this.mainRef.current
		)
			this.mainRef.current.scrollTo({
				top: this.mainRef.current.scrollHeight,
				left: 0,
			})
	}

	render() {
		const { record } = this.state
		return (
			<div className={styles.wrapper}>
				<div ref={this.mainRef} className={styles.mainContent}>
					{record.map(({ command, output }, index) => (
						<div key={index}>
							<span className={styles.promptPrefix}>
								<span>{githubUser}</span> ~ <span>{'>>'}</span>
								<span
									className={
										commands.has(command)
											? styles.validCommand
											: styles.invalidCommand
									}
								>
									{command}
								</span>
							</span>
							<div>{output}</div>
						</div>
					))}
					<InputManager handleExecute={this.handleExecute} />
				</div>
			</div>
		)
	}
}

export default Terminal
