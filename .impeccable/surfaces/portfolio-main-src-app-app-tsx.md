---
version: 1
slug: "portfolio-main-src-app-app-tsx"
primary_target: "Portfolio-main/src/App/App.tsx"
related_targets: []
---

# Surface brief: badredinne.com one-page portfolio (v2, "Ask + Catalogue")

Scope: the whole one-page site (`Portfolio-main/src/App/App.tsx` and everything it renders). Visitor mode: Experience with a Persuade job (the visitor decides whether to interview him and acts: resume, email, GitHub).

Audience and job: recruiters and hiring managers screening new-grad software engineer and forward deployed engineer candidates, 1 to 2 minutes, often on a phone. Proof: FACTS.md only. Constraints: CRA 5 + React 17, main JS under ~95 kB gzip, three.js lazy, no photo, no phone number, no logos, works with no API key.

Memorable moment: a recruiter pastes their job posting into the bar and the page re-sorts itself around it.

## Direction contract

THESIS: The page answers the visitor's hiring need instead of making them read a CV. It refuses the category default (hero, about, timeline, project cards in a fixed order); one prompt bar and one row of role chips re-rank the whole page around the role being hired for.

OWN-WORLD: Airy porcelain ground (cool off-white), near-black ink, one highlighter-lime accent whose only job is "this matches": matched chips, match marks on tiles, the highlighter under key numbers, the send key. Soft matte clay 3D objects (white, ink, lime) float behind the hero, each one a piece of his work (chip, floor plan, car, shopping bag with camera, dumbbell, terminal). Mona Sans: wide and heavy for the name, plain for text. Rounded 16px tiles with square code-drawn diagram art (geometry, never pictures).

STORY: In 5 seconds: new-grad software engineer who ships AI to real users (Shopify photo search, 20M+). In 30: he fits my role (chips or pasted posting light up the matching work with the number and a "Show me"). In 90: education, any tile opened full size with media and facts, then Resume, email, GitHub.

FIRST VIEWPORT: Desktop 1440: header (name left; Work, Education, Contact; GitHub, LinkedIn, email icons; ink Resume pill right). Centered: the name at ~104px wide-heavy on two lines, the role line, a quiet availability line, then the prompt bar (720px, textarea, mic, lime send) with three suggested questions under it, then "I'm hiring for:" and seven role chips. 3D objects ring the column at the edges and drift with scroll and pointer. Primary action: the prompt bar; Resume is always in the header. Phone 390: name 44px, bar full width, chips in one scrolling row, objects small at the corners.

FORM: User-pinned "Ask + Catalogue" world (DIRECTION-v2.md; Cherry Blossom feel without its assets), ordered list position 1 of 1 (pinned, no roll), seed key e6cc7b6a. Signature interaction: pasting a posting or picking a role re-ranks the catalogue (FLIP re-order, lime match marks), pins the best matches, retunes the suggested questions, and the matching 3D objects step forward. Motion grammar: quick (180 to 420 ms), ease-out, transform and opacity only; scroll drives only the 3D drift; reduced motion swaps the canvas for a still and turns every transition into an instant state change.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Adaptations (recorded at the finish review, 2026-10-29)

- Header profile links (GitHub, LinkedIn, Email) are text links, not icons: GitHub and LinkedIn icons are company logos, which the user ruled out, and text reads faster for a skimming recruiter. Section links follow page order (Education, Work, Contact) and hide below 980px wide.
- Phone 3D objects form a band of four above the name (chip, terminal, bag, floor plan) instead of sitting at the corners: at 390px wide, corner objects would cover the name, the prompt bar or the chips. The car and the dumbbell show from 1080px up, where the side margins hold all six.
- Tile diagrams stay ink and gray at rest; their lime layer fades on only when the tile matches the chips, the search or a posting (evidence thumbnails in answers are matches, so they are lime).

## Unresolved

- Demo videos arrive later (slots ready). AI answers go live when OPENROUTER_API_KEY is set.
