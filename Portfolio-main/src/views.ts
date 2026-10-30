import { Tailored, tailored as base } from './content'
import { jobs } from './jobs'

// The per-job views as the page uses them: each one from content.ts, with its requirement rows,
// short role and questions from jobs.ts. Kept apart from content.ts, which `npm run facts` loads in
// Node on its own.
export const tailored: Record<string, Tailored> = Object.fromEntries(Object.entries(base).map(([slug, view]) => [slug, { ...view, ...jobs[slug] }]))
