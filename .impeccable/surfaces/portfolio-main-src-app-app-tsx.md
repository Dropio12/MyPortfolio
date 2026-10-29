---
version: 1
slug: "portfolio-main-src-app-app-tsx"
primary_target: "Portfolio-main/src/App/App.tsx"
related_targets: []
---

## Scope

One-page portfolio at badredinne.com (`Portfolio-main/src/App/App.tsx` and its children). Mode: Experience surface for a hiring audience: clarity first, craft second, both at full commitment. Build path: code-led (no image generation on this machine).

Audience: recruiters and hiring managers screening new-grad software engineer and forward deployed engineer candidates; 1 to 2 minutes, often on a phone. Job: decide to interview, verify the resume, find proof, the PDF, and a way to reach him. Content: FACTS.md only.

## Direction contract

THESIS: The portfolio is Anass's engineering design doc: status Shipped, numbered sections, every number footnoted to its source. It refuses the category default (dark hero, gradient, project card grid, tech-icon wall).

OWN-WORLD: A well-made internal doc tool on a quiet desk-like ground. A document page with a header block and metadata table (Author, Status chip Shipped, Role sought, Available Summer 2027, Location, Last updated); numbered sections 1 TL;DR to 7 Next steps; a left outline rail tracking scroll; a top doc toolbar with Download PDF as primary, plus GitHub, LinkedIn, Email and a prompt-glyph terminal control. Margin comment threads pinned to the sentences they support; status chips (Shipped, Live, Open source); tables where a doc uses tables; featured projects as numbered Figures with captions. Restrained color: neutrals, one link/action accent, status green only on chips. Faces chosen as a document tool would carry them, none from the banned list, not the italic-serif-plus-tracked-mono cluster.

STORY: In 10 seconds a recruiter reads the title (his name), the status line, a 4-number TL;DR, and sees Download PDF. In 60 seconds a hiring manager scans Shipped work and Client deployments (law firms, an architecture firm, a hotel front desk), opens a margin comment or repo, and downloads the resume or emails him.

FIRST VIEWPORT: Desktop 1440: toolbar strip on top with doc label left and Download PDF right; below, the doc title "Anass Badreddine El Hallaoui" at large display size, the one-line abstract, the metadata table, then section 1 TL;DR with the four headline numbers as a compact metrics table, each with a margin comment naming its source; outline rail on the left. Phone 390: slim toolbar with Download PDF always visible, outline as a section jump menu, margin comments as inline footnote markers that expand in place. Signature interaction, proof-on-demand: each claim carries a footnote marker; on desktop its comment slides into the margin and the number gets a brief highlight sweep as the paragraph enters view; clicking a marker focuses the thread; the outline tracks the current section. Motion is quiet, precise, fast; no parallax, no scroll-jacking; off under reduced motion.

FORM: Design doc / RFC, ranked #1 of 7 on the grounded list; seed key e6cc7b6a.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions

- Demo videos arrive later; figures render a designed frame until then.
