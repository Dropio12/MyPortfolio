import React from 'react'

// One stroke family on a 24px grid (paths after Lucide, ISC license).
const paths: Record<string, React.ReactNode> = {
	doc: (
		<>
			<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z" />
			<path d="M14 2.5V8h5.5" />
			<path d="M8.5 13h7M8.5 17h5" />
		</>
	),
	download: (
		<>
			<path d="M12 3.5v11" />
			<path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
			<path d="M4.5 16.5v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2" />
		</>
	),
	terminal: (
		<>
			<path d="m5 7.5 4.5 4.5L5 16.5" />
			<path d="M12.5 17h6.5" />
		</>
	),
	github: (
		<>
			<path d="M15 21.5v-3.6a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C5.9 1.1 4.8 1.4 4.8 1.4a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6v3.6" />
			<path d="M8.6 19.2c-3.4 1-3.4-1.8-4.8-2.2" />
		</>
	),
	linkedin: (
		<>
			<path d="M16 8.5a6 6 0 0 1 6 6v6.5h-4v-6.5a2 2 0 0 0-4 0v6.5h-4v-6.5a6 6 0 0 1 6-6z" />
			<path d="M2.5 9.5h4V21h-4z" />
			<circle cx="4.5" cy="4.5" r="2" />
		</>
	),
	mail: (
		<>
			<rect x="2.5" y="4.5" width="19" height="15" rx="2" />
			<path d="m21.5 7.5-8.5 5.6a1.9 1.9 0 0 1-2 0L2.5 7.5" />
		</>
	),
	arrowDown: (
		<>
			<path d="M12 5v14" />
			<path d="m6 13 6 6 6-6" />
		</>
	),
	external: (
		<>
			<path d="M7 17 17 7" />
			<path d="M8.5 7H17v8.5" />
		</>
	),
	chevron: <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
	check: <path d="m5.5 12.5 4.5 4.5 8.5-9.5" />,
	close: (
		<>
			<path d="M6 6l12 12" />
			<path d="M18 6 6 18" />
		</>
	),
}

export type IconName = keyof typeof paths

export default function Icon({ name, size = 18 }: { name: string; size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.75}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			{paths[name]}
		</svg>
	)
}
