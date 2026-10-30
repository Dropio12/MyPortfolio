// The only analytics on the site. It does nothing unless REACT_APP_POSTHOG_KEY is set at build time.
// When it is set, it sends plain events to PostHog's capture endpoint: no cookies, no session
// recording, no autocapture, and never the text of a question.

const KEY = process.env.REACT_APP_POSTHOG_KEY || ''
const HOST = (process.env.REACT_APP_POSTHOG_HOST || 'https://us.i.posthog.com').replace(/\/$/, '')

type Props = Record<string, string | number | boolean | undefined>

const enabled = () => {
	if (!KEY || typeof window === 'undefined') return false
	const dnt = (navigator as Navigator & { doNotTrack?: string }).doNotTrack
	return dnt !== '1'
}

let visitor = ''
const visitorId = () => {
	if (visitor) return visitor
	try {
		visitor = sessionStorage.getItem('pf-visitor') || ''
		if (!visitor) {
			visitor = `v_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
			sessionStorage.setItem('pf-visitor', visitor)
		}
	} catch {
		visitor = visitor || `v_${Math.random().toString(36).slice(2)}`
	}
	return visitor
}

export const track = (event: string, props: Props = {}) => {
	if (!enabled()) return
	try {
		void fetch(`${HOST}/i/v0/e/`, {
			method: 'POST',
			keepalive: true,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				api_key: KEY,
				event,
				distinct_id: visitorId(),
				properties: {
					...props,
					$current_url: window.location.origin + window.location.pathname + window.location.search,
					$process_person_profile: false,
				},
			}),
		}).catch(() => undefined)
	} catch {
		// analytics must never break the page
	}
}
