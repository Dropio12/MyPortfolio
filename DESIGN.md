---
name: badredinne.com
description: Anass El Hallaoui's portfolio, written as an engineering design doc with every number footnoted to its source.
colors:
  ink-blue: "#2f45c6"
  ink-blue-deep: "#2234a6"
  status-green: "#17663f"
  status-green-tint: "#e1f1e7"
  desk: "#eceef1"
  sheet: "#ffffff"
  canvas: "#f5f6f8"
  ink: "#16181d"
  ink-soft: "#454b56"
  ink-quiet: "#5c6370"
  rule: "#e3e6ea"
  rule-strong: "#c9ced6"
typography:
  display:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 1rem + 4.2vw, 4rem)"
    fontWeight: 720
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 660
    lineHeight: 1.2
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 640
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  abstract:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.55vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.38
  body:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  figure:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 660
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  label:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.45
  caption:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.45
  code:
    fontFamily: "Fira Code, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
rounded:
  sheet: "6px"
  control: "8px"
  card: "10px"
  figure: "12px"
  frame: "14px"
  chip: "999px"
spacing:
  block: "18px"
  entry: "44px"
  section: "88px"
  gutter: "40px"
  sheet-pad: "72px"
components:
  button-primary:
    backgroundColor: "{colors.ink-blue}"
    textColor: "{colors.sheet}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 14px 0 12px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.ink-blue-deep}"
    textColor: "{colors.sheet}"
  toolbar-tool:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.control}"
    height: "36px"
  chip-status:
    backgroundColor: "{colors.status-green-tint}"
    textColor: "{colors.status-green}"
    rounded: "{rounded.chip}"
    padding: "0 9px"
    height: "22px"
  chip-neutral:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.chip}"
    padding: "0 9px"
    height: "22px"
  footnote-marker:
    textColor: "{colors.ink-blue}"
    rounded: "6px"
    height: "20px"
    padding: "0 5px"
  comment-card:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.card}"
    padding: "10px 12px 11px"
  diagram-node:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px 14px"
  diagram-node-core:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.card}"
    padding: "12px 14px"
---

# Design System: badredinne.com

## Overview

**Creative North Star: "The Design Doc"**

The site is the engineering design doc of one engineer: a white sheet lying on a quiet desk, a doc toolbar above it, an outline rail on its left and a margin of comment threads on its right. It reads the way engineers read RFCs every day: a title, an abstract, a properties table with a Status chip, then numbered sections, tables where a doc would use tables, and numbered Figures with captions. Nothing is decoration borrowed from the portfolio category; every device is native to a well-made internal doc tool.

The proof layer is the signature. Each claim that carries a number is highlighted and followed by a numbered footnote marker; its comment thread sits in the right margin, pinned to the claim by a thin leader line, and says where the number comes from (the role and dates, the section that proves it, the repo). On wide screens the threads slide in as their claims scroll into view and the claim's highlight sweeps in behind it; clicking a marker focuses the thread, aligns it to its claim and draws the leader back through the nearest gap. On narrow screens the same marker expands the note in place, like a footnote. Motion is quiet, precise and fast, and is off entirely under reduced motion.

Density is a document's density: long reading measure (68ch), generous section spacing, compact tables. Light by use scene: recruiters read this at a desk or on a phone in daylight.

**Key Characteristics:**
- A white sheet with a soft shadow on a cool gray desk; full-bleed sheet on phones.
- Numbered sections whose numbers hang in the sheet's left margin.
- Margin comment threads with leader lines as the proof layer; inline footnotes on narrow screens.
- One action color (ink blue) for links, markers and the primary action; status green only on status chips.
- Figures drawn as architecture diagrams on a dot-grid canvas until a demo video replaces them.
- A hidden terminal (the old site) opened from the toolbar or the backtick key.

## Colors

Restrained: cool neutrals for the desk, the sheet and the text, one ink-blue accent with a job, and one status green.

### Primary
- **Ink Blue** (#2f45c6): the only action and link color. Text links, footnote markers, comment badges, the primary "Download PDF" button, the outline rail's position mark, the focused thread's ring and leader, and the claim highlight (at 10% and 20% alpha). 7.4:1 on the sheet.
- **Deep Ink Blue** (#2234a6): hover state of links and the primary button.

### Secondary
- **Status Green** (#17663f on #e1f1e7): status chips only ("Shipped", "Live"). Never text, never links, never decoration.

### Neutral
- **Desk** (#eceef1): the ground under the sheet, the toolbar, the theme color.
- **Sheet** (#ffffff): the document page, comment cards, diagram nodes.
- **Canvas** (#f5f6f8): figure canvases (with a #d3d8df dot grid every 16px) and inline notes on narrow screens.
- **Ink** (#16181d): headings, body text, core diagram nodes.
- **Soft Ink** (#454b56): secondary text, table cells, the abstract.
- **Quiet Ink** (#5c6370): labels, section numbers, captions, meta lines. 5.8:1 on the sheet, 5.0:1 on the desk.
- **Rule** (#e3e6ea) and **Strong Rule** (#c9ced6): table rules and hairlines; strong rules under table heads, node strokes and leader lines at rest.

### Named Rules
**The One Job Rule.** Ink blue means "you can act on this" or "this is the proof link". It never fills a region and never decorates.

**The Green Means Shipped Rule.** Status green appears only inside a status chip.

## Typography

**Display Font:** Schibsted Grotesk Variable (with ui-sans-serif, system-ui)
**Body Font:** Source Serif 4 (with Iowan Old Style, Georgia)
**Code Font:** Fira Code (repo paths, the email address, the terminal)

**Character:** A newsroom grotesk for the doc's chrome, headings, tables and numbers, set tight and confident; a document serif for the reading text, the way a good doc tool sets long-form prose. Schibsted Grotesk was drawn for a publishing house's editorial products, so it carries headlines and dense data with equal ease; Source Serif 4 is Adobe's text serif built for documents and reads well at 17 to 18px on phones; Fira Code was already the terminal's face and is used only for literal code-like strings. All three are self-hosted (Fontsource, latin subsets, font-display swap).

### Hierarchy
- **Display** (720, clamp 38px to 64px, 1.02, -0.035em): the doc title, his name, set on two lines.
- **Abstract** (Source Serif 4, 400, clamp 20px to 24px, 1.38): the one-line abstract under the title.
- **Headline** (660, 28px desktop, 24px phone, 1.2): numbered section headings; the number hangs in the margin in Quiet Ink.
- **Title** (640, 20px, 1.3): subsection headings (2.1, 4.3) with their number in Quiet Ink.
- **Body** (Source Serif 4, 400, 18px desktop, 17px phone, 1.6, max 68ch): all reading text and bullets; bold claims at 600.
- **Figure** (660, 30px, tabular numerals): the TL;DR numbers.
- **Label** (500 to 600, 13.5px to 15px): table text, properties, chips, toolbar, captions ("Table 1.", "Figure 3." set in 600 Soft Ink).

### Named Rules
**The Sentence Case Rule.** Labels, table heads and chips are sentence case at normal tracking. No tracked uppercase micro-labels.

**The Mono Is Literal Rule.** Fira Code only for strings that are literally code-like: repo paths, the email address, the terminal.

## Layout

Three columns on a centered grid at 1280px and up: outline rail (208px), the sheet (up to 800px, 72px inner padding), and the comment margin (288px), 40px apart. From 1080 to 1279px the rail folds into a toolbar jump menu that names the current section; under 1080px the margin folds too and comments become inline footnotes; under 560px the sheet goes full bleed with 20px padding. The toolbar is sticky (56px, 52px on phones) and always carries the primary "Download PDF" action.

Spacing rhythm: 18px between blocks, 44px between entries, 88px between sections (64px on phones), more space above a heading than below it. Reading measure caps at 68ch. Tables stack into labelled rows under 640px; flow diagrams turn vertical.

### Named Rules
**The Margin Is For Proof Rule.** The right margin holds only comment threads tied to a claim on the sheet. Nothing else lives there.

## Elevation & Depth

Depth is physical and sparse: the sheet sits on the desk, comment cards sit on the desk beside it, and everything on the sheet is flat. Each surface declares elevation once, as a soft offset shadow, never a border plus a shadow.

### Shadow Vocabulary
- **Sheet** (`0 1px 2px rgba(22,24,29,.05), 0 18px 40px -18px rgba(22,24,29,.18)`): the document page.
- **Comment** (`0 1px 2px rgba(22,24,29,.06), 0 6px 18px -8px rgba(22,24,29,.2)`): margin cards at rest.
- **Comment focused** (`0 0 0 1.5px #2f45c6, 0 2px 4px rgba(22,24,29,.07), 0 16px 34px -12px rgba(22,24,29,.3)`): the focused thread.
- **Popover** (`0 2px 6px rgba(22,24,29,.08), 0 18px 40px -14px rgba(22,24,29,.28)`): the jump menu.

### Named Rules
**The Flat Sheet Rule.** Nothing on the sheet casts a shadow except diagram nodes' 1px contact shadow. Structure on the sheet comes from rules and type.

## Shapes

Gently squared corners: 6px for the sheet, 8px for controls, 10px for comment cards and diagram nodes, 12px for figure canvases, 14px for diagram boundaries. Pills only for small status chips. Lines are 1px hairlines for rules and leaders, 1.5px for diagram arrows, boundaries and focus rings.

## Components

### Buttons
- **Primary ("Download PDF"):** Ink Blue fill, white 600 label with a download icon, 36px tall, 8px radius; Deep Ink Blue on hover; 2px Ink Blue focus outline offset 2px. On phones the label shortens to "PDF" while the accessible name stays "Download PDF resume".
- **Toolbar tools:** transparent 36px squares (or icon plus label at 1280px and up) in Soft Ink; 6% ink wash on hover.

### Chips
- **Status:** green tint, green 600 text, a 6px dot, 22px pill. "Shipped" and "Live".
- **Neutral:** white with a Strong Rule inner stroke, Soft Ink text. "Open source".

### Footnote markers and comment threads (signature)
- **Marker:** a 20px (24px on phones) Ink Blue tint square with the note number, raised like a superscript; fills Ink Blue on hover or focus.
- **Claim highlight:** an Ink Blue 10% background behind the claim that follows it across line wraps (20% when hot or focused); it sweeps in left to right in 900ms on first view.
- **Comment card:** white, 10px radius, Comment shadow; a numbered badge, a 600 title, a one-line source, and a jump link ("2.2") or repo link. Cards are laid out by script to sit beside their claim and push neighbours apart; the focused one aligns to its claim, gains the Ink Blue ring and shifts 10px toward the sheet.
- **Leader line:** a 1px Strong Rule curve across the gutter at rest; on hover or focus it turns Ink Blue and a dotted Ink Blue line runs back to the marker through the nearest gap (a table's row rule, or the space under the claim's line), never through letters.
- **Inline footnote (narrow):** the marker expands a Canvas box in place (320ms height reveal).

### Tables
Full-width, Label type; a Strong Rule under the head, Rule between rows, row heads in Ink 600; numbered captions below ("Table 2. Client deployments."). Under 640px rows stack into label and value pairs.

### Figures
A Canvas panel with a 16px dot grid, 2:1 for diagrams and 16:9 for demo video. Diagrams are HTML boxes and SVG arrows: white nodes with a Strong Rule stroke, core nodes in solid Ink, dashed boundaries for runtimes, a solid Ink frame for a single binary, arrowed wires and forks. Captions are numbered and explain the notation ("Dark boxes mark the core of the system."). A demo video, when present, is muted, looping, lazy, paused off screen and never autoplays under reduced motion.

### Navigation
- **Outline rail:** sentence-case section list with Quiet Ink numbers on a 1px Strong Rule track; a 2px Ink Blue mark slides to the current section (420ms); the current item goes Ink 600.
- **Jump menu (under 1280px):** a white toolbar button naming the current section; opens a popover list with the current item tinted.

### Action items
The closing "Next steps" are doc action items: a 20px checkbox square that fills Ink Blue with a white check once its link is followed.

## Do's and Don'ts

### Do:
- **Do** footnote every headline number to its source with a marker and a margin thread.
- **Do** use a table wherever a doc would (metrics, clients, project index, degrees) and caption it "Table N.".
- **Do** draw project figures as diagrams of the real mechanism, using only facts from the content module.
- **Do** keep motion document-native: 200 to 900ms, ease-out (cubic-bezier(0.16, 1, 0.3, 1)), off under reduced motion, content visible without it.
- **Do** keep the "Download PDF" action in the sticky toolbar at every width.

### Don't:
- **Don't** use a dark hero, gradients, a project card grid or a tech-icon wall.
- **Don't** use Ink Blue for anything that is not an action, a link or the proof layer, or status green outside a chip.
- **Don't** put anything in the right margin that is not a comment thread tied to a claim.
- **Don't** set big-number stat tiles; numbers live in tables, prose and diagrams.
- **Don't** add tracked uppercase labels or eyebrows above headings.
- **Don't** draw leader lines through text.
