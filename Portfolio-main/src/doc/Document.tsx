import React, { ReactNode, useState } from 'react'
import {
	clients,
	clientsIntro,
	education,
	featured,
	links,
	nextIntro,
	person,
	projectIndex,
	projectsIntro,
	recognition,
	repoUrl,
	roles,
	Section as SectionDef,
	sections,
	tldr,
	tldrSummary,
} from '../content'
import Figure from './Figure'
import Icon from './Icon'
import { NoteAnchor, NoteCard } from './Notes'
import Rich, { NotesFor } from './Rich'
import styles from './Document.module.scss'

const section = (id: string) => sections.find(s => s.id === id) as SectionDef

function Section({ id, children }: { id: string; children: ReactNode }) {
	const s = section(id)
	return (
		<section id={s.id} className={styles.section} aria-labelledby={`${s.id}-title`}>
			<h2 id={`${s.id}-title`} className={styles.h2}>
				<span className={styles.num}>{s.n}</span>
				{s.title}
			</h2>
			{children}
		</section>
	)
}

function Chip({ children, tone }: { children: ReactNode; tone?: 'ok' }) {
	return (
		<span className={styles.chip} data-tone={tone}>
			{tone === 'ok' && <span className={styles.chipDot} aria-hidden="true" />}
			{children}
		</span>
	)
}

function Para({ text }: { text: string }) {
	return (
		<div className={styles.block}>
			<p className={styles.para}>
				<Rich text={text} />
			</p>
			<NotesFor text={text} />
		</div>
	)
}

function Caption({ n, children }: { n: number; children: ReactNode }) {
	return (
		<caption className={styles.caption}>
			<span className={styles.capNum}>Table {n}.</span> {children}
		</caption>
	)
}

export function DocHeader() {
	return (
		<header className={styles.docHeader}>
			<h1 id="doc-title" className={styles.title}>
				{person.name}
			</h1>
			<p className={styles.abstract}>{person.abstract}</p>
			<table className={styles.props}>
				<caption className={styles.srOnly}>Document properties</caption>
				<tbody>
					<tr>
						<th scope="row">Author</th>
						<td>{person.shortName}</td>
					</tr>
					<tr>
						<th scope="row">Status</th>
						<td>
							<Chip tone="ok">Shipped</Chip>
						</td>
					</tr>
					<tr>
						<th scope="row">Role sought</th>
						<td>
							<span className={styles.role}>{person.rolesSought[0]}</span>
							<span className={`${styles.sep} ${styles.roleSep}`} aria-hidden="true">
								·
							</span>
							<span className={styles.srOnly}>, </span>
							<span className={styles.role}>{person.rolesSought[1]}</span>
						</td>
					</tr>
					<tr>
						<th scope="row">Available</th>
						<td>{person.available}</td>
					</tr>
					<tr>
						<th scope="row">Location</th>
						<td>{person.location}</td>
					</tr>
					<tr className={styles.contactRow}>
						<th scope="row">Contact</th>
						<td>
							<a href={`mailto:${links.email}`}>Email</a>
							<span className={styles.sep} aria-hidden="true">
								·
							</span>
							<a href={links.github} target="_blank" rel="noreferrer">
								GitHub
							</a>
							<span className={styles.sep} aria-hidden="true">
								·
							</span>
							<a href={links.linkedin} target="_blank" rel="noreferrer">
								LinkedIn
							</a>
						</td>
					</tr>
					<tr>
						<th scope="row">Last updated</th>
						<td>{person.lastUpdated}</td>
					</tr>
				</tbody>
			</table>
		</header>
	)
}

export function DocBody() {
	return (
		<>
			<Section id="tldr">
				<table className={styles.metrics}>
					<Caption n={1}>Headline numbers. Each one links to its source.</Caption>
					<thead className={styles.srOnly}>
						<tr>
							<th scope="col">Number</th>
							<th scope="col">What it measures</th>
						</tr>
					</thead>
					<tbody>
						{tldr.map(row => (
							<tr key={row.note}>
								<td className={styles.metricValue}>
									<NoteAnchor id={row.note}>{row.value}</NoteAnchor>
								</td>
								<td className={styles.metricText}>
									{row.text}
									<NoteCard id={row.note} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<p className={styles.para}>{tldrSummary}</p>
			</Section>

			<Section id="shipped">
				<p className={styles.para}>Most recent first. Every number here matches the resume.</p>
				{roles.map(role => (
					<div key={role.id} id={role.id} className={styles.entry}>
						<h3 className={styles.h3}>
							<span className={styles.subnum}>{role.n}</span>
							<span>
								{role.org}
								{role.team && `, ${role.team}`}
							</span>
							{role.chip && <Chip tone="ok">{role.chip}</Chip>}
						</h3>
						<p className={styles.entryMeta}>
							{role.title}
							<span className={styles.sep} aria-hidden="true">
								·
							</span>
							<span className={styles.srOnly}>, </span>
							{role.dates}
						</p>
						<ul className={styles.points}>
							{role.points.map(point => (
								<li key={point}>
									<Rich text={point} />
									<NotesFor text={point} />
								</li>
							))}
						</ul>
					</div>
				))}
			</Section>

			<Section id="clients">
				<Para text={clientsIntro} />
				<table className={styles.table} data-stack="">
					<Caption n={2}>Client deployments.</Caption>
					<thead>
						<tr>
							<th scope="col">Client</th>
							<th scope="col">What he built</th>
							<th scope="col">Result</th>
						</tr>
					</thead>
					<tbody>
						{clients.map(c => (
							<tr key={c.client}>
								<th scope="row">{c.client}</th>
								<td data-label="What he built">
									<Rich text={c.built} />
								</td>
								<td data-label="Result">
									<Rich text={c.result} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Section>

			<Section id="projects">
				<p className={styles.para}>{projectsIntro}</p>
				{featured.map((p, i) => (
					<div key={p.id} id={p.id} className={styles.entry}>
						<h3 className={styles.h3}>
							<span className={styles.subnum}>{p.n}</span>
							<span>{p.name}</span>
							{p.chip && <Chip>{p.chip}</Chip>}
						</h3>
						<Para text={p.summary} />
						<dl className={styles.facts}>
							<div>
								<dt>Stack</dt>
								<dd>{p.stack.join(', ')}</dd>
							</div>
							<div>
								<dt>Repo</dt>
								<dd>
									<a href={repoUrl(p.repo)} target="_blank" rel="noreferrer" className={styles.repo}>
										<code>github.com/Dropio12/{p.repo}</code>
										<Icon name="external" size={14} />
									</a>
								</dd>
							</div>
						</dl>
						<Figure project={p} number={i + 1} />
					</div>
				))}
				<div id="project-index" className={styles.entry}>
					<h3 className={styles.h3}>
						<span className={styles.subnum}>4.6</span>
						<span>Index</span>
					</h3>
					<table className={styles.table} data-stack="">
						<Caption n={3}>More projects.</Caption>
						<thead>
							<tr>
								<th scope="col">Project</th>
								<th scope="col">What it does</th>
								<th scope="col">Stack</th>
							</tr>
						</thead>
						<tbody>
							{projectIndex.map(p => (
								<tr key={p.name}>
									<th scope="row">
										<a href={p.href} target="_blank" rel="noreferrer" className={styles.rowLink}>
											{p.name}
											<Icon name="external" size={14} />
										</a>
										{p.chip && <Chip tone="ok">{p.chip}</Chip>}
									</th>
									<td data-label="What it does">{p.what}</td>
									<td data-label="Stack" className={styles.stackCell}>
										{p.stack}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Section>

			<Section id="education">
				<table className={styles.table} data-stack="">
					<Caption n={4}>Degrees.</Caption>
					<thead>
						<tr>
							<th scope="col">Degree</th>
							<th scope="col">School</th>
							<th scope="col">Date</th>
							<th scope="col">Notes</th>
						</tr>
					</thead>
					<tbody>
						{education.map(e => (
							<tr key={e.degree}>
								<th scope="row">{e.degree}</th>
								<td data-label="School">{e.school}</td>
								<td data-label="Date" className={styles.nowrap}>
									{e.date}
								</td>
								<td data-label="Notes" data-empty={e.note ? undefined : ''}>
									{e.note}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Section>

			<Section id="recognition">
				<ul className={styles.points}>
					{recognition.map(item => (
						<li key={item}>
							<Rich text={item} />
						</li>
					))}
				</ul>
			</Section>

			<Section id="next">
				<p className={styles.para}>{nextIntro}</p>
				<ul className={styles.actions} aria-label="Action items">
					<ActionItem href={links.resume} icon="download" download={links.resumeFile}>
						Download the resume (PDF)
					</ActionItem>
					<ActionItem href={`mailto:${links.email}`} icon="mail">
						Email <span className={styles.mono}>{links.email}</span>
					</ActionItem>
					<ActionItem href={links.github} icon="github" external>
						Read the code on GitHub
					</ActionItem>
					<ActionItem href={links.linkedin} icon="linkedin" external>
						Connect on LinkedIn
					</ActionItem>
				</ul>
			</Section>
		</>
	)
}

// A doc action item: the box ticks once you follow it.
function ActionItem({
	href,
	icon,
	download,
	external,
	children,
}: {
	href: string
	icon: string
	download?: string
	external?: boolean
	children: ReactNode
}) {
	const [done, setDone] = useState(false)
	return (
		<li className={styles.action} data-done={done || undefined}>
			<span className={styles.box} aria-hidden="true">
				<Icon name="check" size={14} />
			</span>
			<a
				href={href}
				download={download}
				target={external ? '_blank' : undefined}
				rel={external ? 'noreferrer' : undefined}
				onClick={() => setDone(true)}
			>
				<Icon name={icon} size={18} />
				<span>{children}</span>
			</a>
		</li>
	)
}

export function DocFooter({ onTerminal }: { onTerminal: () => void }) {
	return (
		<footer className={styles.docFooter}>
			<p>
				{person.shortName}
				<span className={styles.sep} aria-hidden="true">
					·
				</span>
				<a href={links.site}>badredinne.com</a>
				<span className={styles.sep} aria-hidden="true">
					·
				</span>
				Last updated {person.lastUpdated}
			</p>
			<p>
				<button type="button" className={styles.textButton} onClick={onTerminal}>
					Open the terminal
				</button>{' '}
				or press <kbd>`</kbd>
			</p>
		</footer>
	)
}
