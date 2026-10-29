import { useEffect, useState } from 'react'

// Tracks a media query; reads it synchronously on first render so layout never flashes.
export function useMedia(query: string) {
	const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
	useEffect(() => {
		const list = window.matchMedia(query)
		const onChange = () => setMatches(list.matches)
		onChange()
		if (list.addEventListener) list.addEventListener('change', onChange)
		else list.addListener(onChange)
		return () => {
			if (list.removeEventListener) list.removeEventListener('change', onChange)
			else list.removeListener(onChange)
		}
	}, [query])
	return matches
}
