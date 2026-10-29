import React, { CSSProperties } from 'react'
import { education, hackathonNote, recognition, research } from '../content'
import { tiltOf } from '../lib/paper'
import PaperBack from './Paper'

// Education first, on one sheet: the degrees, then the recognition beside them.
const Education = () => (
	<section className="edu" id="education" aria-labelledby="edu-title">
		<div className="wrap">
			<div className="edu__sheet" style={{ '--tilt': `${tiltOf('education', 0.3)}deg` } as CSSProperties}>
				<PaperBack seed="education" />
				<div className="edu__main">
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
				</div>
				<div className="edu__side">
					<h3 className="edu__h3" id="recognition">
						Recognition
					</h3>
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
					<p className="edu__note">{hackathonNote}</p>
					<p className="edu__note">{research}</p>
				</div>
			</div>
		</div>
	</section>
)

export default Education
