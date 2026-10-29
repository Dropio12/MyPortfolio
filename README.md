# My Portfolio

The personal site of Anass Badreddine El Hallaoui, live at [badredinne.com](https://badredinne.com). React 17, TypeScript and Sass (Create React App), with a lazy-loaded three.js hero.

## What it does

- **Ask**: paste a job posting or ask a question (typed or by voice) and see why Anass fits, with links to the matching work. Works with no API key: a local matcher answers from the page's facts. With `OPENROUTER_API_KEY` set on Vercel, `Portfolio-main/api/ask.ts` answers with an AI model, grounded in the same facts.
- **I'm hiring for**: role chips (FDE, Full-stack, Back-end, Front-end, Security, Platform, AI) filter the catalogue and bring the best matches to the front.
- **Catalogue**: internships, client deployments and projects as tiles; search by technology; open any tile for the full story. Each tile has its own link (`badredinne.com/#agentgym`).
- **Per-job views**: `badredinne.com/?for=harvey` shows the version tailored to one role.
- **Terminal**: the original terminal portfolio is still there. Press the backtick key.

## Editing

- Every fact lives in `Portfolio-main/src/content.ts`. After editing it, run `npm run facts` in `Portfolio-main/` so the AI function uses the same facts.
- A demo video for a tile: put the file in `Portfolio-main/public/demos/` and set `demo: '/demos/<file>.mp4'` on the item.
- A new per-job view: add an entry to `tailored` in `content.ts` (company, role, role chips, pinned tile ids, 3 bullets that only restate facts). It is live at `?for=<key>`.

## Environment variables (Vercel, project `mymainportfolio`)

| Name | What it does |
|---|---|
| `OPENROUTER_API_KEY` | Turns on AI answers. Without it, answers come from the local matcher. |
| `OPENROUTER_MODEL` | Optional. The model to use (default: a free model). |
| `OPENROUTER_FALLBACK_MODEL` | Optional. A cheap paid model tried when the first fails. |
| `REACT_APP_POSTHOG_KEY` | Optional. Turns on privacy-light analytics (no cookies, no recording, never question text). Needs a redeploy. |

## Build

```
cd Portfolio-main
npm ci
CI=true GENERATE_SOURCEMAP=false npx react-scripts build
```
