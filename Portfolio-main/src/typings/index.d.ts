import { Component } from 'react'

export type TerminalProps = {
	onClose?: () => void
}

export type AppState = {
	record: Array<{ command: string; output: JSX.Element }>
	commands: Map<string, Command>
}

export type InputManagerState = {
	value: string
	suggestedValue: string
}

export type ListElementProps = {
	name: string
	link?: string
	description: string
	help?: boolean
}

export type Command = {
	name: string
	description: string
	execute(app: Component<TerminalProps, AppState>): JSX.Element | void
}

export type Commands = Map<string, Command>
