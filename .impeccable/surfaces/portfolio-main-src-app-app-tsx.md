---
version: 1
slug: "portfolio-main-src-app-app-tsx"
primary_target: "Portfolio-main/src/App/App.tsx"
related_targets: []
---

# Surface brief: badredinne.com one-page portfolio (v3, "Orb + Paper")

Scope: the whole one-page site (`Portfolio-main/src/App/App.tsx` and everything it renders). Visitor mode: Experience with a Persuade job (the visitor decides whether to interview him and acts: resume, email, GitHub). v3 refines v2 ("Ask + Catalogue", PR #6): same content, prompt bar, matcher, voice, `?for=` views, hash-linked sheets and terminal; the v2 porcelain-and-lime world with six floating clay toys is replaced because the user found it childlike.

Audience and job: recruiters and hiring managers screening new-grad software engineer and forward deployed engineer candidates, 1 to 2 minutes, often on a phone. Proof: FACTS.md only. Constraints: CRA 5 + React 17, main JS under ~95 kB gzip, three.js lazy, no photo, no phone number, no logos, works with no API key.

Memorable moment: the page opens on an aura that blooms from white around a liquid blue orb; when a recruiter types, speaks or pastes a posting, the orb answers (brighter, moving with the voice, shimmering while it reads) and the paper cards below re-deal around the role.

## Direction contract

THESIS: One calm white page with one living presence: his agent, a liquid blue orb you talk to through a pill-shaped prompt bar, and below it his work as real paper cut with scissors that a recruiter can deal and filter. It refuses the portfolio default (hero, about, timeline, uniform rounded cards in a fixed grid) and v2's playful props.

OWN-WORLD: Pure white ground (#fff), near-black ink, plain Mona Sans at normal width set tight. The only color is the orb's: deep indigo, electric blue, cyan, pale ice, a faint violet at the rim, in a soft halo that bleeds into the page; controls take only its palest end (an ice wash for active chips and match stickers) and a deep electric blue focus ring. Everything else is paper: white sheets with deterministic scissor-cut outlines (straight strokes, small blade-restart steps, snipped or sharp corners), faint grain, a hairline cut edge, a soft layered lift shadow and a small seeded tilt.

STORY: In 5 seconds: Anass El Hallaoui, software engineer who ships AI products to real users, graduating April 2027. In 30: the pill answers his fit for my posting from the page's facts; the words strip and four proof numbers say where and how much. In 90: education, two carousels of paper cards (Experience: every role and client deployment, dated; Projects) filtered to my role, any card opened as a large paper sheet with media and facts, then resume and email.

FIRST VIEWPORT: Desktop 1440x900: header (name left; Education, Work, Contact centered; GitHub, LinkedIn, Email words and a black Resume pill right). Centered: the name at about 88px, tight, one line; the role line; a small availability line. Below them, big and centered, the orb (about 380px across) in its aura. The prompt pill (640px, fully rounded, one line, mic and send inside on the right) crosses the orb's lower edge; its placeholder morphs through example prompts. Then "Try" pills and a quiet "I'm hiring for:" chip row. The words strip sits at the fold. Phone 390: name on two lines, orb about 270px, full-width pill, chip rows scroll sideways.

FORM: User-pinned "Orb + Paper" world (DIRECTION-v3.md, with the user's hero update: a blue liquid orb replaces the holographic slab, the prompt becomes a pill), ordered list position 1 of 1 (pinned, no roll), seed key e6cc7b6a. Code-led. Signature interaction: the orb listens (leans toward the pointer and bulges where it touches, eases back when it leaves; the mic level drives its displacement amplitude and frequency; typing brightens it and speeds its flow; answering sweeps a shimmer; idle, it settles), and answers or role chips re-deal the paper cards (pinned first, FLIP slide, match stickers). Motion grammar: a one-second aura entrance (glow blooms from white, orb condenses, words fade up); 200 to 500 ms exponential ease-out for paper (lift on hover, dealt in once on scroll, sheet laid down on open); the placeholder morphs letter by letter (blur and fade, never a typewriter); reduced motion shows a still orb, no entrance, instant paper.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Demo videos arrive later (slots ready). AI answers go live when OPENROUTER_API_KEY is set.
- No structured question tool in this run: the direction is user-pinned in DIRECTION-v3.md plus the user's hero update relayed mid-build, so build decisions were taken from those.
