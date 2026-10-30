import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { track } from '../analytics'
import { tiltOf } from '../lib/paper'
import PaperBack from './Paper'
import { IconCheck, IconClose, IconCopy } from './icons'
import { useDialog } from './useDialog'

// "Connect your AI": the address of this site's MCP server (api/mcp.ts) and how to add it to
// Claude, Claude Code or Cursor, so a hiring manager can ask their own assistant about Anass.

const Copy = ({ value, what }: { value: string; what: string }) => {
	const [copied, setCopied] = useState(false)
	useEffect(() => {
		if (!copied) return
		const t = window.setTimeout(() => setCopied(false), 2200)
		return () => window.clearTimeout(t)
	}, [copied])
	return (
		<button
			type="button"
			className="btn btn--quiet mcp__copy"
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(value)
					setCopied(true)
					track('mcp', { action: 'copy', what })
				} catch {
					/* the text is on screen to select by hand */
				}
			}}
		>
			{copied ? <IconCheck /> : <IconCopy />}
			<span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
		</button>
	)
}

const Line = ({ value, what }: { value: string; what: string }) => (
	<div className="mcp__line">
		<code>{value}</code>
		<Copy value={value} what={what} />
	</div>
)

const Mcp = ({ onClose }: { onClose: () => void }) => {
	const panel = useRef<HTMLDivElement>(null)
	const closeBtn = useRef<HTMLButtonElement>(null)
	useDialog(panel, onClose, closeBtn)
	const url = `${window.location.origin}/api/mcp`
	const cursor = `{ "mcpServers": { "anass": { "url": "${url}" } } }`
	return (
		<div className="sheet" role="dialog" aria-modal="true" aria-labelledby="mcp-title">
			<div className="sheet__scrim" onClick={onClose} aria-hidden="true" />
			<div className="sheet__panel mcp" ref={panel} style={{ '--tilt': `${tiltOf('mcp', 0.35)}deg` } as CSSProperties}>
				<PaperBack seed="mcp" />
				<div className="sheet__scroll">
					<div className="sheet__bar">
						<span className="mcp__kicker">MCP server</span>
						<button type="button" className="icon-btn sheet__close" ref={closeBtn} onClick={onClose} aria-label="Close">
							<IconClose />
						</button>
					</div>
					<h2 id="mcp-title" className="mcp__title">
						Ask your own AI about Anass
					</h2>
					<p className="mcp__lede">
						Add this address to Claude, Cursor or any MCP client. Your assistant can then read his profile, every job and project with its
						numbers, and his resume, straight from this site.
					</p>
					<Line value={url} what="url" />
					<ol className="mcp__steps">
						<li>
							<h3 className="mcp__h3">Claude</h3>
							<p>Settings, then Connectors, then Add custom connector. Paste the address above.</p>
						</li>
						<li>
							<h3 className="mcp__h3">Claude Code</h3>
							<Line value={`claude mcp add --transport http anass ${url}`} what="claude-code" />
						</li>
						<li>
							<h3 className="mcp__h3">Cursor</h3>
							<Line value={cursor} what="cursor" />
						</li>
					</ol>
					<p className="mcp__try">Then try: “Here is our job posting. Where does Anass fit?”</p>
					<p className="mcp__note">Read only. It shares what this page shows, and nothing else.</p>
				</div>
			</div>
		</div>
	)
}

export default Mcp
