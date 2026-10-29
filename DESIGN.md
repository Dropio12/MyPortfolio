---
name: badredinne.com
description: The portfolio of Anass Badreddine El Hallaoui, built around the visitor's hiring need.
colors:
  highlighter-lime: "#d4f25a"
  lime-ink: "#4f6b00"
  lime-wash: "#f2fbd2"
  porcelain: "#f4f5f7"
  porcelain-deep: "#e9ecf0"
  paper: "#ffffff"
  ink: "#15171c"
  ink-soft: "#43474f"
  ink-muted: "#61656f"
  hairline: "#e1e4e9"
  hairline-strong: "#c7cbd3"
  diagram-gray: "#c3c8d1"
  diagram-soft: "#dde1e7"
typography:
  display:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 0.9rem + 6.4vw, 6rem)"
    fontWeight: 820
    lineHeight: 0.96
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 112"
  closing:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.3rem + 4.4vw, 5.25rem)"
    fontWeight: 820
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 116"
  headline:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.15rem + 1.9vw, 2.625rem)"
    fontWeight: 760
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 112"
  lead:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 0.95rem + 0.85vw, 1.5rem)"
    fontWeight: 560
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 720
    lineHeight: 1.25
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 106"
  body:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 560
    lineHeight: 1.4
rounded:
  pill: "999px"
  thumb: "9px"
  inner: "12px"
  frame: "14px"
  card: "16px"
  dialog: "20px"
  sheet: "28px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "22px"
  2xl: "36px"
  3xl: "56px"
  section: "88px"
  section-lg: "104px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  button-ink-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.highlighter-lime}"
  button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "54px"
  button-paper-hover:
    backgroundColor: "{colors.highlighter-lime}"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  chip-selected:
    backgroundColor: "{colors.highlighter-lime}"
    textColor: "{colors.ink}"
  send-key:
    backgroundColor: "{colors.highlighter-lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "40px"
  prompt-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
    padding: "20px 22px 4px"
  tile:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px 18px 18px"
  search-input:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 16px 0 42px"
---

# Design System: badredinne.com

## Overview

**Creative North Star: "The Recruiter's Highlighter"**

The page is a clean CV on porcelain paper, and the only color on it is the highlighter a recruiter would use to mark what fits the role. Everything a visitor does (pasting a posting, picking a role, asking a question) moves that highlighter: chips light up, matching tiles come to the front and their diagrams turn from ink and gray to lime, the numbers that prove it sit on a lime underline. Above the fold, soft matte clay objects (a circuit-board chip, a floor plan, a shopping bag with a camera, a terminal, a car with a price tag, a dumbbell) float around the name over soft contact shadows; each one is a piece of his work, steps forward when that work matches, and opens it on click.

Density is low and the type is large: one name set wide and heavy, one plain reading face, generous air. The page is built from three stacked sheets: the porcelain hero where the 3D lives, a white paper sheet for the CV and the catalogue that slides up over it, and an ink sheet that closes the page with the resume and contact. Motion is quick and purposeful: one entrance, a scroll drift in the 3D layer, and a re-ranking animation when the catalogue changes.

**Key Characteristics:**
- Porcelain, paper and ink neutrals with a single highlighter lime that always means "this matches" or "act here".
- Mona Sans throughout: wide and heavy for display, plain for reading, proportional figures so every zero is plain.
- Three layered sheets with large rounded tops (28px) as the depth model.
- Tile art drawn in code as geometric diagrams of each project's own mechanism.
- 3D clay objects in white, light gray, ink and lime, lit from the upper left over soft contact shadows, living only behind the hero.

## Colors

A cool neutral ground and near-black ink carry the page; one saturated highlighter lime is the only accent.

### Primary
- **Highlighter Lime** (#d4f25a): the "this matches" color. Selected role chips, match marks on tiles, the accent layer of a matching tile's diagram, the highlighter band under proof figures, the send key of the prompt bar, the per-job view banner, evidence tags and thumbnails in answers, text selection. Always carries ink text or an ink outline; never used as a text color on light grounds.
- **Lime Ink** (#4f6b00): the lime's text-safe shade, used for link underlines on light grounds.
- **Lime Wash** (#f2fbd2): the hover ground of evidence rows and the active option in the technology search.

### Neutral
- **Ink** (#15171c): text, primary buttons, focus rings, the closing sheet, the terminal.
- **Ink Soft** (#43474f): secondary text: tile lines, role lines, notes.
- **Ink Muted** (#61656f): tertiary text: meta, dates, hints, placeholders (5.2:1 or better on porcelain).
- **Porcelain** (#f4f5f7): the page ground and the hero, tile bodies, answer evidence rows, recognition band.
- **Porcelain Deep** (#e9ecf0): the ground behind tile art, media frames and header link hovers.
- **Paper** (#ffffff): the CV and catalogue sheet, the prompt bar, answer cards, dialogs, chips.
- **Hairline** (#e1e4e9) and **Hairline Strong** (#c7cbd3): dividers in lists and facts; chip and input outlines.
- **Diagram Gray** (#c3c8d1) and **Diagram Soft** (#dde1e7): the secondary marks inside tile diagrams only.

### Named Rules
**The Highlighter Rule.** Lime marks a match or the next action, and nothing else. If an element is lime, a visitor should be able to say what it matches or what pressing it does. Tile diagrams are ink and gray at rest; their accent layer fades to lime (0.5s) only when the tile matches.

**The No Gray Text On Lime Rule.** Text on lime is always ink.

## Typography

**Display Font:** Mona Sans (variable, width 75 to 125 and weight 200 to 900; self-hosted, latin subset), with ui-sans-serif and system-ui fallbacks
**Body Font:** Mona Sans
**Label/Mono Font:** the platform monospace only inside the terminal and for code glyphs in diagrams

**Character:** one family doing two jobs. Pushed wide and heavy it is a confident, engineered display voice for the name and section titles; at normal width and weight it reads plainly at small sizes on a phone.

### Hierarchy
- **Display** (820, clamp(2.75rem, 0.9rem + 6.4vw, 6rem), 0.96, width 112): the name in the hero, on two lines (three on a phone).
- **Closing** (820, clamp(2.5rem, 1.3rem + 4.4vw, 5.25rem), 0.98, width 116): the title of the ink closing sheet.
- **Headline** (760, clamp(1.75rem, 1.15rem + 1.9vw, 2.625rem), 1.05, width 112): section titles (Education, Experience, Work) and the detail sheet title.
- **Lead** (560, clamp(1.1875rem, 0.95rem + 0.85vw, 1.5rem), 1.3): the role line under the name and the one line at the top of a detail sheet.
- **Title** (720, 1.0625rem, 1.25, width 106): tile titles, degree names, company names, answer evidence titles.
- **Body** (400, 1rem, 1.55): answers, notes, ledes; measure kept to 52 to 66ch.
- **Label** (560, 0.8125rem, 1.4): meta lines, dates, hints, chip counts.

### Named Rules
**The Plain Zero Rule.** Never turn on tabular figures. Mona Sans's tabular set uses a slashed zero, and the brief asks for a plain one.

**The Highlighted Figure Rule.** A number that proves a claim (20M+, 87%, 10x) is set heavier and sits on a lime band covering its lower 44%. It stays inline in its sentence; it never becomes a big-number stat tile. Years are not proof numbers and get no band.

## Layout

A centered column for the hero (prompt bar 720px, text block 880px) with the 3D objects in the side margins on screens 1080px and wider; below that width the objects form a band of four above the name. The rest of the page uses a 1240px container with a fluid gutter (clamp(16px, 4vw, 48px)).

The CV block is a two-column grid (1fr and 1.3fr, 80px apart) that stacks below 900px. The catalogue is an auto-filling grid of tiles at least 250px wide (four across at 1440), two columns on phones with 12px gaps. The catalogue's filter bar is sticky under the header on screens 900px and wider.

Spacing follows a loose 4px base: 8 and 12 inside controls, 16 to 22 inside cards, 36 to 56 between groups, 88 to 104 between sections, always more space above a heading than below it. Breakpoints: 420, 760, 900, 980 and 1080px. Chip rows on phones scroll sideways and snap to the 16px gutter.

## Elevation & Depth

Depth comes from stacked sheets and a small, consistent shadow vocabulary tinted with the ink color. Surfaces at rest are flat (tiles, chips, the CV list, the answer's evidence rows); shadows appear on things that float above the page (the prompt bar, answers, dialogs) or in response to hover (tiles lift). In the 3D layer, each object casts a soft radial contact shadow onto the porcelain that softens as it rises, lit by a strong key from the upper left and a cool rim from behind.

### Shadow Vocabulary
- **Tight** (`box-shadow: 0 1px 2px rgba(21, 23, 28, 0.08)`): the edge of the prompt bar.
- **Lift** (`box-shadow: 0 1px 2px rgba(21, 23, 28, 0.06), 0 18px 44px -22px rgba(21, 23, 28, 0.3)`): answer cards.
- **Float** (`box-shadow: 0 2px 6px rgba(21, 23, 28, 0.06), 0 30px 80px -30px rgba(21, 23, 28, 0.42)`): dialogs, the terminal, the search list.
- **Sheet** (`box-shadow: 0 -1px 0 rgba(21, 23, 28, 0.05), 0 -30px 70px -40px rgba(21, 23, 28, 0.28)`): the paper sheet's upward cast over the hero.

### Named Rules
**The Three Sheets Rule.** Porcelain hero, white paper, ink close. A new layer of the page is a new sheet with a 28px rounded top (22px on phones), never a boxed card floating on the ground.

**The One Elevation Rule.** An element gets an outline or a shadow, never both. Chips and inputs use outlines; floating surfaces use shadows.

## Shapes

Pills for every small control (chips, buttons, tokens, the search field, tags): 999px. Cards and tiles at 16px, with art frames inside at 14px and thumbnails at 9px. The prompt bar and dialogs at 20px. Sheets at 28px on their top corners only.

Tile art lives in a square, drawn on a 240-unit grid: 2 to 2.5 unit ink strokes, round caps, small 2 to 8 unit corner radii, lime fills outlined in ink. The 3D objects follow the same language in clay: rounded boxes, soft bevels, ink and lime details.

## Components

### Buttons
- **Shape:** pill (999px), 44px tall (54px for the large closing actions).
- **Primary:** ink background, paper text (Resume in the header).
- **Hover / Focus:** ink buttons keep their ground and turn their text lime; paper buttons turn lime. Focus is a 2.5px ink outline 3px out (lime on the ink sheet).
- **Line:** paper with a 1.5px hairline-strong inset outline that turns ink on hover (detail sheet links).

### Chips
- **Style:** paper, 1px hairline-strong outline, ink text at 620 weight, 40px tall.
- **State:** selected chips turn lime with an ink outline and a check that pops in; catalogue chips carry a count pill on porcelain.

### Prompt Bar (signature component)
A paper panel (20px radius, tight plus soft shadow) holding an auto-growing textarea, a hint line, a voice button (outlined circle; ink with three lime level bars while listening) and the lime send key with an ink outline. Focus draws a 2px ink ring; listening adds a soft lime halo. Answers appear below it as one paper card: a heading when there is one, short paragraphs, then the evidence as a ruled list (56px lit thumbnail, title, full line, lime tags, "Show me"), never cards inside the card. What the answer was for (the posting, the question or the role) is said once, in the footer next to how it was answered.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** porcelain tiles on the white paper sheet; square art on porcelain deep at the top.
- **Shadow Strategy:** flat at rest; hover lifts 4px with a soft ink shadow.
- **Border:** none.
- **Internal Padding:** 16px 18px 18px (12px on phones).

### Inputs / Fields
- **Style:** the technology search is a porcelain pill with a hairline-strong outline and a leading search icon.
- **Focus:** turns paper with an ink outline; the suggestion list floats below with the Float shadow, the active option on lime wash.

### Navigation
- **Style:** a sticky header, transparent over the hero and paper with a hairline once scrolled. Name at 760 weight, section links and profile links as quiet pill-shaped text links (ink soft, porcelain-deep hover), the Resume button in ink. Profile links are words, not brand icons. Below 980px the section links hide; below 420px the name shortens to "Anass".

## Do's and Don'ts

### Do:
- **Do** keep lime for matches and actions (selected chips, match marks, highlighted figures, the send key, the per-job banner).
- **Do** draw tile art as geometry of the work's own mechanism, in ink and grays, with its accent layer on `var(--art-accent)` so it lights up only on a match.
- **Do** set proof numbers inline with the lime highlighter band, in a full sentence.
- **Do** keep the 3D layer behind the hero only, and swap it for the still image under reduced motion or without WebGL.
- **Do** animate transform and opacity only, with the ease-out curve (cubic-bezier(0.16, 1, 0.3, 1)).

### Don't:
- **Don't** turn on tabular figures (the zero becomes slashed).
- **Don't** use lime as a text color on paper or porcelain, or as decoration with no match behind it.
- **Don't** add kickers or eyebrow labels above headings; meta lines go under the title.
- **Don't** use big-number stat tiles; numbers stay inside sentences.
- **Don't** put a photo of him, his phone number or company logos on the page; the only screenshot is the supplied shop.com image for the Shopify tile.
- **Don't** add em dashes to copy.
