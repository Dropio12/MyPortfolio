# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, hiring managers and engineers at companies hiring a new-grad **software engineer** or **forward deployed engineer (FDE)** (user-confirmed target, 2026-10-28). They arrive from the "badredinne.com" link on his resume or LinkedIn, usually in the middle of screening many candidates, often on a phone, and give the page one to two minutes. Their job: decide whether to interview him, check that the resume is real, and find proof (code, demos), the resume PDF, and a way to reach him.

## Product Purpose

The personal portfolio of Anass Badreddine El Hallaoui at badredinne.com. It shows who he is, what he has built and the proof behind it. Success: within seconds a visitor knows he is a new-grad software engineer who ships AI products end to end, and within a minute they open the resume, GitHub or email.

## Positioning

He builds AI products for real users and real customers, end to end: co-created Shop App's photo search at Shopify and shipped it to 20M+ users; built AI agents for clients (immigration law firms, an architecture firm, a hotel front desk), which is the forward-deployed shape of the work; builds his own AI tools in public (AgentGym, Linea, Cherry Hardware Agent). Eight hackathon wins.

## Operating Context

- Linked from every tailored resume header and LinkedIn; read on phones and laptops.
- Repo `Dropio12/MyPortfolio`, app in `Portfolio-main/` (Create React App, React 17, TypeScript, Sass), deployed on Vercel (two projects watch the repo); Node 24 pinned in `package.json`.
- v3 ("Orb + Paper", 2026-10-29, refines v2 "Ask + Catalogue"): a pure white page with one living presence, a liquid blue orb (three.js, lazy) behind a pill-shaped prompt bar ("Paste a job posting, see why Anass fits", typed or by voice). The orb follows the pointer, moves with the visitor's voice, brightens while they type and shimmers while it answers; a one-second aura opens the page. Below: a words-only "where he has worked" strip and four proof numbers, education on one paper sheet, then Work: role chips and a technology search filter two carousels of cut-paper cards, Experience (every role and client deployment, dated, by impact) and Projects. Resume and contact close the page as two paper notes. The user found v2's floating toy objects childlike; v3 is the grown-up refinement.
- Answers come from a deterministic local matcher over `src/content.ts` and need no key. When `OPENROUTER_API_KEY` is set on Vercel, `Portfolio-main/api/ask.ts` answers with a model, grounded in the same facts (exported to `api/_facts.ts` by `npm run facts`); every number it writes must already be in the facts, or the page falls back to the local answer. Pay, work status, references and team-fit verdicts always get fixed answers.
- Per-job views: `?for=<slug>` (first: `?for=harvey`) preset the role chips, pin chosen work and show three "why he fits" bullets that restate facts.
- Analytics: `src/analytics.ts` sends plain events to PostHog only when `REACT_APP_POSTHOG_KEY` is set; no cookies, no recording, never the text of a question.
- Nothing on the page depends on the GitHub API (v1 fetched project cards live; removed).

## Capabilities and Constraints

- Every fact and number must match his current resume. Never: Georgia Tech, OpenAI as a job, a user count for Linea, money or revenue figures (the $80K+ scholarship total is allowed), visa or sponsorship words, "Founder" or "CEO", em dashes in copy, his phone number, company logos (company names as plain text are fine). Cherry Blossom is a project, never a company or startup. Hotel Jaro may be named (user OK, 2026-10-28).
- Keep the old terminal (commands `help`, `about`, `projects`, `links`, `clear`) as a hidden easter egg; it is no longer the main page.
- No photo of him (user decision 2026-10-28).
- The Experience carousel lists every role as its own card with its dates (user, 2026-10-29): Shopify Visual Search, Shopify Infrastructure Security, Scale AI, iA Financial Group, the three client deployments, then Intel, Adobe and the Laval teaching assistant role; filters and `?for=` may reorder.
- The only color on the page is the orb's (blues); everything else is white paper and black type (user, 2026-10-29).
- Demo videos: the user will send real demos later; the page needs demo slots that look finished without them. Generated demo videos (Hypit) are an open request.
- Resume PDF: `Portfolio-main/public/AnassBadreddine_El_Hallaoui_Resume.pdf`.

## Evidence on Hand

- Experience: Shopify (Software Engineer Intern, Visual Search and Infrastructure Security, Jan to Jul 2025): photo search to 20M+ users, image matching over 55M+ images in under 3 s, 10x lower latency via gRPC, 9 Grafana dashboards and 50+ alerts. Scale AI (Full Stack Software Engineer Expert, contract, Feb to Apr 2026): 200+ AI training tasks, code audits in 4 languages. iA Financial Group (Software Engineer Intern, 2023): payroll processing 87% faster for 17,000+ weekly salaries; privacy flaw fixed for 10,000+ clients. Intel oneAPI and Adobe Software Engineer Ambassador: 1,500+ students taught across both roles. Université Laval teaching assistant (2023, 2024): 500+ students helped.
- Client work: document workflow used by 10+ immigration law firms (10,000+ documents, about 8 hours saved per client); building-code agent for an architecture firm (RAG over tens of thousands of rules, under 1 s); Hotel Jaro front-desk voice agent (1,000+ calls).
- Projects (public repos): AgentGym/AARL (+38% task success over the base agent, 24,000 traces, compute cost -98%), Linea/archigen (MCP + GraphRAG over 500K+ building-code and permit nodes), Cherry Hardware Agent (808,000+ automated checks across 5,800+ projects), NeuroVision, CherryTerminal (C++20/Qt6, 18 QuantLib modules, 16 brokers, 100+ data connectors, 37 agents), used-car-deal-finder (Go + Rust/WASM on Cloudflare), Valorant spike-plant predictor, FlightO, Translator-AI.
- Education: M.Sc. Machine Learning, Université Laval, expected April 2027; B.Sc. Computer Science, Laval, 2026; exchange semester at The Ohio State University.
- Awards: 8 hackathon wins (Stanford 2x, NASA, Waterloo, Shopify); Putnam top 600 and Laval team 2024 and 2025; $80K+ scholarships; GitHub Community Wall of Fame 2025.
- Absent, never fabricate: testimonials, quotes, logos used as endorsements, project screenshots or demo footage (until the user sends them), metrics not listed above.

## Product Principles

1. Proof over claims: every line points at something real (a number from the resume, a repo, a demo).
2. Readable in a minute on a phone; the important facts never wait behind an interaction.
3. Personality without friction: the craft and the hidden terminal show who he is, never block the content.
4. The site and the resume tell the same story, word for word on numbers.
5. Fast first paint; nothing essential depends on a third-party API.
6. The page answers the visitor's hiring need: a pasted posting, a question or a role chip re-ranks the work, and every answer points at the page's own evidence.
7. Calm and grown-up: one living object, paper and type; motion is felt (the orb listening), never decoration.

## Accessibility & Inclusion

Mobile-first reading, WCAG AA contrast, full keyboard use, and `prefers-reduced-motion` honored for every animation.
