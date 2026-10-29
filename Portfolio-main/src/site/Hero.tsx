import React, { forwardRef } from 'react'
import { Role, itemById, person, proof, workedAt } from '../content'
import { Answer } from '../lib/answer'
import Agent from './Agent'
import Ask from './Ask'
import { IconArrowDown, IconPlug, IconTerminal } from './icons'

type Props = {
	roles: Role[]
	answer: Answer | null
	onAnswer: React.ComponentProps<typeof Ask>['onAnswer']
	onClear: () => void
	onShowMe: (id: string) => void
	onApply: (a: Answer) => void
	onRead: () => void
	onConnect: () => void
	onTerminal: () => void
}

// The first screen is the agent and nothing else: one quiet line saying whose it is, the knitted
// ball, the prompt bar across it, and three ways on: read the portfolio as text, plug your own AI
// into this one over MCP, or open the old terminal. Everything a skimming recruiter needs starts one scroll down.

const Hero = forwardRef<HTMLElement, Props>(({ roles, answer, onAnswer, onClear, onShowMe, onApply, onRead, onConnect, onTerminal }, ref) => (
	<section className="hero" id="top" ref={ref} aria-labelledby="hero-name" tabIndex={-1}>
		<div className="hero__inner">
			<h1 id="hero-name" className="hero__id">
				<span className="hero__who">{person.shortName}</span>
				<span className="hero__what">Software engineer, AI products</span>
			</h1>
			<div className="hero__orb">
				<Agent hero={ref as React.RefObject<HTMLElement>} />
			</div>
			<Ask roles={roles} answer={answer} onAnswer={onAnswer} onClear={onClear} onShowMe={onShowMe} onApply={onApply} />
			<div className="hero__ways">
				<a
					className="way"
					href="#portfolio"
					onClick={e => {
						if (e.metaKey || e.ctrlKey || e.shiftKey) return
						e.preventDefault()
						onRead()
					}}
				>
					Read the portfolio
					<IconArrowDown />
				</a>
				<button type="button" className="way way--quiet" onClick={onConnect}>
					<IconPlug />
					Connect your AI
					<span className="way__tag">MCP</span>
				</button>
				<button type="button" className="way way--quiet" onClick={onTerminal} title="The terminal version of this site (or press the backtick key)">
					<IconTerminal />
					Terminal
				</button>
			</div>
		</div>
	</section>
))

/** the start of the portfolio in text: who he is, what he does, when he is free */
export const Intro = () => (
	<section className="intro" id="portfolio" aria-labelledby="intro-name" tabIndex={-1}>
		<div className="wrap">
			<p id="intro-name" className="intro__name">
				<span>Anass</span> <span>El{' '}Hallaoui</span>
			</p>
			<p className="intro__role">{person.role}</p>
			<p className="intro__avail">
				{person.availability.map((a, i) => (
					<span key={a}>
						{i > 0 && <span className="dot" aria-hidden="true" />}
						{a}
					</span>
				))}
			</p>
		</div>
	</section>
)

/** words, not logos: where he has worked, and four numbers that each open their proof */
export const Glance = ({ onOpen }: { onOpen: (id: string) => void }) => (
	<section className="glance" aria-label="At a glance">
		<div className="wrap glance__inner">
			<p className="glance__where">
				<span className="glance__label">Where he has worked</span>
				<span className="glance__names">
					{workedAt.map((w, i) => (
						<React.Fragment key={w}>
							{i > 0 && <span className="glance__sep" aria-hidden="true" />}
							<span className="glance__name">{w}</span>
						</React.Fragment>
					))}
				</span>
			</p>
			<ul className="glance__proof">
				{proof.map(p => {
					const item = itemById(p.target)
					return (
						<li key={p.label}>
							<a
								className="glance__num"
								href={`#${p.target}`}
								onClick={e => {
									if (!item || e.metaKey || e.ctrlKey || e.shiftKey) return
									e.preventDefault()
									onOpen(p.target)
								}}
							>
								<span className="glance__fig">{p.figure}</span>
								<span className="glance__what">{p.label}</span>
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	</section>
)

export default Hero
