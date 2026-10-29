import React from 'react'

// One icon family: 24px grid, 1.75 stroke, round joins. Decorative by default (aria-hidden);
// the control that holds an icon carries the label.

type P = { className?: string }

const Svg = ({ className, children }: P & { children: React.ReactNode }) => (
	<svg
		className={className ? `icon ${className}` : 'icon'}
		viewBox="0 0 24 24"
		width="24"
		height="24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.75"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		focusable="false"
	>
		{children}
	</svg>
)

export const IconArrowUp = (p: P) => (
	<Svg {...p}>
		<path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
	</Svg>
)
export const IconArrowRight = (p: P) => (
	<Svg {...p}>
		<path d="M5 12h14M13 5.5l6.5 6.5-6.5 6.5" />
	</Svg>
)
export const IconArrowLeft = (p: P) => (
	<Svg {...p}>
		<path d="M19 12H5M11 5.5 4.5 12l6.5 6.5" />
	</Svg>
)
export const IconExternal = (p: P) => (
	<Svg {...p}>
		<path d="M8 16 17 7M9 7h8v8" />
	</Svg>
)
export const IconMic = (p: P) => (
	<Svg {...p}>
		<rect x="9" y="3" width="6" height="11" rx="3" />
		<path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
	</Svg>
)
export const IconStop = (p: P) => (
	<Svg {...p}>
		<rect x="7" y="7" width="10" height="10" rx="2" />
	</Svg>
)
export const IconClose = (p: P) => (
	<Svg {...p}>
		<path d="M6 6l12 12M18 6 6 18" />
	</Svg>
)
export const IconCheck = (p: P) => (
	<Svg {...p}>
		<path d="m5 12.5 4.5 4.5L19 7.5" />
	</Svg>
)
export const IconSearch = (p: P) => (
	<Svg {...p}>
		<circle cx="11" cy="11" r="6.5" />
		<path d="m16 16 4 4" />
	</Svg>
)
export const IconMail = (p: P) => (
	<Svg {...p}>
		<rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
		<path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
	</Svg>
)
export const IconDownload = (p: P) => (
	<Svg {...p}>
		<path d="M12 4v11M6.5 10 12 15.5 17.5 10M5 20h14" />
	</Svg>
)
export const IconCopy = (p: P) => (
	<Svg {...p}>
		<rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
		<path d="M15.5 5.5V5A1.5 1.5 0 0 0 14 3.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h.5" />
	</Svg>
)
export const IconCode = (p: P) => (
	<Svg {...p}>
		<path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5" />
	</Svg>
)
export const IconGlobe = (p: P) => (
	<Svg {...p}>
		<circle cx="12" cy="12" r="8.5" />
		<path d="M3.5 12h17M12 3.5c2.4 2.5 3.5 5.3 3.5 8.5s-1.1 6-3.5 8.5c-2.4-2.5-3.5-5.3-3.5-8.5S9.6 6 12 3.5Z" />
	</Svg>
)
export const IconTerminal = (p: P) => (
	<Svg {...p}>
		<rect x="3" y="4.5" width="18" height="15" rx="2.5" />
		<path d="m7 9.5 3 2.5-3 2.5M12.5 15h4.5" />
	</Svg>
)
/** a page of facts: marks answers built from the page itself */
export const IconFacts = (p: P) => (
	<Svg {...p}>
		<path d="M6.5 3.5h7l4 4v13h-11z" />
		<path d="M13.5 3.5v4h4M9 12h6M9 15.5h6" />
	</Svg>
)
export const IconPin = (p: P) => (
	<Svg {...p}>
		<path d="M9 4h6l-1 5 3.5 3.5h-11L10 9z" />
		<path d="M12 12.5V20" />
	</Svg>
)
export const IconPlay = (p: P) => (
	<Svg {...p}>
		<path d="M8 5.5v13l10-6.5z" />
	</Svg>
)
export const IconLink = (p: P) => (
	<Svg {...p}>
		<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2" />
		<path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
	</Svg>
)
export const IconArrowDown = (p: P) => (
	<Svg {...p}>
		<path d="M12 5v14M5.5 12.5 12 19l6.5-6.5" />
	</Svg>
)
/** a plug: connecting another AI to this one */
export const IconPlug = (p: P) => (
	<Svg {...p}>
		<path d="M9 3v4M15 3v4M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0V7ZM12 16v5" />
	</Svg>
)
