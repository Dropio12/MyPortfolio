import React from 'react'
import { clientWork, education, experienceOrder, itemById, recognition, research, teaching } from '../content'
import { IconArrowRight } from './icons'

type Props = {
	onOpen: (id: string) => void
	onClientWork: () => void
}

// The plain CV block right after the hero: education first, then a one-glance experience list
// whose rows open the same detail sheets as the catalogue, then the recognition strip.
const Education = ({ onOpen, onClientWork }: Props) => (
	<section className="cv" id="education" aria-labelledby="edu-title">
		<div className="wrap">
			<div className="cv__grid">
				<div className="cv__col">
					<h2 id="edu-title" className="h2">
						Education
					</h2>
					<ol className="degrees">
						{education.map(d => (
							<li key={d.degree} className="degree">
								<h3 className="degree__name">{d.degree}</h3>
								<p className="degree__school">{d.school}</p>
								<p className="degree__when">
									{d.when}
									{d.detail && (
										<>
											<span className="dot" aria-hidden="true" />
											{d.detail}
										</>
									)}
								</p>
							</li>
						))}
					</ol>
					<p className="cv__note">{teaching}</p>
					<p className="cv__note">{research}</p>
				</div>
				<div className="cv__col">
					<h2 id="exp-title" className="h2">
						Experience
					</h2>
					<ol className="jobs" aria-labelledby="exp-title">
						{experienceOrder.map(id => {
							const item = itemById(id)!
							return (
								<li key={id}>
									<a
										className="job"
										href={`#${id}`}
										onClick={e => {
											e.preventDefault()
											onOpen(id)
										}}
									>
										<span className="job__org">{item.title}</span>
										<span className="job__role">{item.position}</span>
										<span className="job__when">{item.span || item.dates}</span>
										<IconArrowRight className="job__go" />
									</a>
								</li>
							)
						})}
						<li>
							<button type="button" className="job" onClick={onClientWork}>
								<span className="job__org">{clientWork.title}</span>
								<span className="job__role">{clientWork.line}</span>
								<span className="job__when">{clientWork.meta}</span>
								<IconArrowRight className="job__go" />
							</button>
						</li>
					</ol>
				</div>
			</div>
			<h2 className="sr-only">Recognition</h2>
			<ul className="honors">
				{recognition.map(r => (
					<li key={r.label} className="honor">
						<p className="honor__head">
							<span className="honor__fig">{r.figure}</span> {r.label}
						</p>
						{r.detail && <p className="honor__detail">{r.detail}</p>}
					</li>
				))}
			</ul>
		</div>
	</section>
)

export default Education
