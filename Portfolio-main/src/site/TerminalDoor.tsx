import React, { Suspense, useRef } from 'react'
import { IconClose } from './icons'
import { useDialog } from './useDialog'

const Terminal = React.lazy(() => import('../Terminal/Terminal'))

// The original terminal portfolio, kept as an easter egg: the backtick key or the footer button.
const TerminalDoor = ({ onClose }: { onClose: () => void }) => {
	const win = useRef<HTMLDivElement>(null)
	const closeBtn = useRef<HTMLButtonElement>(null)
	useDialog(win, onClose, closeBtn)
	return (
		<div className="door" role="dialog" aria-modal="true" aria-labelledby="door-title">
			<div className="door__scrim" onClick={onClose} aria-hidden="true" />
			<div className="door__window" ref={win}>
				<div className="door__bar">
					<span className="door__dots" aria-hidden="true">
						<i />
						<i />
						<i />
					</span>
					<h2 id="door-title" className="door__title">
						terminal
					</h2>
					<p className="door__hint">Type help. Esc closes.</p>
					<button type="button" className="icon-btn door__close" ref={closeBtn} onClick={onClose} aria-label="Close the terminal">
						<IconClose />
					</button>
				</div>
				<Suspense fallback={<p className="door__loading">Opening the terminal</p>}>
					<Terminal />
				</Suspense>
			</div>
		</div>
	)
}

export default TerminalDoor
