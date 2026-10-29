import React, { forwardRef } from 'react'
import { Role, SceneObject, person, roles as roleList } from '../content'
import { Answer } from '../lib/answer'
import Ask from './Ask'
import Stage from './Stage'
import { IconCheck } from './icons'

type Props = {
	roles: Role[]
	onToggleRole: (r: Role) => void
	answer: Answer | null
	onAnswer: React.ComponentProps<typeof Ask>['onAnswer']
	onClear: () => void
	onShowMe: (id: string) => void
	onApply: (a: Answer) => void
	focus: SceneObject[]
	onPickObject: (o: SceneObject) => void
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

const Hero = forwardRef<HTMLElement, Props>(({ roles, onToggleRole, answer, onAnswer, onClear, onShowMe, onApply, focus, onPickObject }, ref) => (
	<section className="hero" id="top" ref={ref} aria-labelledby="hero-name" tabIndex={-1}>
		<Stage hero={ref as React.RefObject<HTMLElement>} focus={focus} onPick={onPickObject} />
		<div className="hero__inner">
			<h1 id="hero-name" className="hero__name">
				<span className="hero__line">Anass Badreddine</span> <span className="hero__line">El{'\u00a0'}Hallaoui</span>
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
			<Ask roles={roles} answer={answer} onAnswer={onAnswer} onClear={onClear} onShowMe={onShowMe} onApply={onApply} />
			<RoleChips roles={roles} onToggle={onToggleRole} id="hero-hiring" />
		</div>
	</section>
))

export default Hero
