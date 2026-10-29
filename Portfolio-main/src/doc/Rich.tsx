import React from 'react'
import { noteIdsIn } from '../content'
import { NoteAnchor, NoteCard } from './Notes'

const TOKEN = /(\*\*[^*]+\*\*|\[\[[^|\]]+\|[^\]]+\]\])/g

// Renders the content markup: **bold** and [[claim|noteId]].
export default function Rich({ text }: { text: string }) {
	return (
		<>
			{text.split(TOKEN).map((part, i) => {
				if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
				if (part.startsWith('[[')) {
					const [label, id] = part.slice(2, -2).split('|')
					return (
						<NoteAnchor key={i} id={id}>
							{label}
						</NoteAnchor>
					)
				}
				return <React.Fragment key={i}>{part}</React.Fragment>
			})}
		</>
	)
}

// The source notes a block of text points to, placed right after it.
export function NotesFor({ text }: { text: string }) {
	return (
		<>
			{noteIdsIn(text).map(id => (
				<NoteCard key={id} id={id} />
			))}
		</>
	)
}
