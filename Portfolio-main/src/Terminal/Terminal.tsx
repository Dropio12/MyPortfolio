import React, { Component, createRef, RefObject } from 'react'
import styles from './Terminal.module.scss'
import commands from '../commands/commands'
import { AppState, TerminalProps } from '../typings'
import InputManager from '../InputManager/InputManager'
import { PROMPT_USER } from './prompt'

class Terminal extends Component<TerminalProps, AppState> {
	mainRef: RefObject<HTMLDivElement>
	handleExecute: (arg: string) => void

	constructor(props: TerminalProps) {
		super(props)
		this.state = {
			record: [],
			commands: commands,
		}

		this.mainRef = createRef()

		this.handleExecute = arg => {
			const { commands } = this.state
			const commandName = arg.trim()
			let output
			if (!commandName) output = <></>
			else if (!commands.has(commandName))
				output = (
					<>
						Command not found: {commandName}
						<br></br>Type "help" to list the available commands
					</>
				)
			else output = commands.get(commandName)?.execute(this)
			if (output)
				this.setState({
					...this.state,
					record: [
						...this.state.record,
						{
							command: commandName,
							output: output,
						},
					],
				})
		}
	}

	componentDidMount() {
		// show "about" on open so visitors don't land on an empty terminal
		this.handleExecute('about')
	}

	componentDidUpdate(_: TerminalProps, prevState: AppState) {
		// auto scroll, except for the "about" shown on open, which should be read from its top
		if (
			prevState.record.length > 0 &&
			prevState.record.length !== this.state.record.length &&
			this.mainRef?.current
		)
			this.mainRef.current.scrollTo({
				top: this.mainRef.current.scrollHeight,
				left: 0,
				behavior: 'smooth',
			})
	}

	render() {
		const { record } = this.state
		return (
			<div ref={this.mainRef} className={styles.mainContent}>
				{record.map(({ command, output }, index) => (
					<div key={index}>
						<span className={styles.promptPrefix}>
							<span>{PROMPT_USER}</span>@badredinne <span>~</span>{' '}
							<span>$</span>
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
		)
	}
}

export default Terminal
