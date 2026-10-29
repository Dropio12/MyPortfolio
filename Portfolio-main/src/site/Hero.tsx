import React, { forwardRef } from 'react'
import { Role, itemById, person, proof, roles as roleList, workedAt } from '../content'
import { Answer } from '../lib/answer'
import Agent from './Agent'
import Ask from './Ask'
import { IconCheck } from './icons'

type Props = {
	roles: Role[]
	onToggleRole: (r: Role) => void
	answer: Answer | null
	onAnswer: React.ComponentProps<typeof Ask>['onAnswer']
	onClear: () => void
	onShowMe: (id: string) => void
	onApply: (a: Answer) => void
}

export const RoleChips = ({ roles, onToggle, id }: { roles: Role[]; onToggle: (r: Role) => void; id: string }) => (
	<div className="hiring" role="group" aria-labelledby={`${id}-label`}>
		<span id={`${id}-label`} className="hiring__label">
			I’m hiring for:
		</span>
		<div className="hiring__chips">
			{roleList.map(r => {
				const on = roles.includes(r.id)
				return (
					<button key={r.id} type="button" className="chip" aria-pressed={on} onClick={() => onToggle(r.id)}>
						<IconCheck className="chip__check" />
						{r.label}
						{r.id === 'fde' && <span className="sr-only"> (forward deployed engineer)</span>}
					</button>
				)
			})}
		</div>
	</div>
)

const Hero = forwardRef<HTMLElement, Props>(({ roles, onToggleRole, answer, onAnswer, onClear, onShowMe, onApply }, ref) => (
	<section className="hero" id="top" ref={ref} aria-labelledby="hero-name" tabIndex={-1}>
		<div className="hero__inner">
			<h1 id="hero-name" className="hero__name">
				<span>Anass</span> <span>El{' '}Hallaoui</span>
			</h1>
			<p className="hero__role">{person.role}</p>
			<p className="hero__avail">
				{person.availability.map((a, i) => (
					<span key={a}>
						{i > 0 && <span className="dot" aria-hidden="true" />}
						{a}
					</span>
				))}
			</p>
			<div className="hero__orb">
				<Agent hero={ref as React.RefObject<HTMLElement>} />
			</div>
			<Ask roles={roles} answer={answer} onAnswer={onAnswer} onClear={onClear} onShowMe={onShowMe} onApply={onApply} />
			<RoleChips roles={roles} onToggle={onToggleRole} id="hero-hiring" />
		</div>
	</section>
))

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
