---
name: badredinne.com
description: The portfolio of Anass Badreddine El Hallaoui, a white room with one listening presence and his work on cut paper.
colors:
  orb-indigo: "#1b1973"
  orb-electric: "#2457fc"
  orb-cyan: "#3ecaff"
  orb-ice: "#e2f4ff"
  orb-violet: "#a092ff"
  focus-blue: "#1f4fe0"
  ice-wash: "#cfe6ff"
  page-white: "#ffffff"
  ink: "#0f1013"
  ink-soft: "#43464d"
  ink-muted: "#686c74"
  hairline: "#ececef"
  hairline-strong: "#d9dbe0"
  wash: "#f6f6f7"
  scrap: "#f4f4f2"
  diagram-gray: "#c6c9cf"
  diagram-soft: "#e2e3e6"
  paper-shadow: "#16141c"
typography:
  display:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 0.9rem + 5.2vw, 5.5rem)"
    fontWeight: 640
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.35rem + 2vw, 3.25rem)"
    fontWeight: 640
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  sheet-title:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem)"
    fontWeight: 640
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  lead:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 0.95rem + 0.7vw, 1.625rem)"
    fontWeight: 470
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  figure:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 640
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 640
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 560
    lineHeight: 1.4
  meta:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.35
rounded:
  cut: "0px"
  media: "3px"
  item: "9px"
  menu: "14px"
  prompt: "28px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "18px"
  xl: "28px"
  2xl: "40px"
  3xl: "64px"
  section: "104px"
  section-lg: "120px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  button-ink-large:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-quiet:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "38px"
  prompt-pill:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.prompt}"
    padding: "8px 8px 8px 24px"
    height: "56px"
  send-key:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.pill}"
    size: "40px"
  send-key-disabled:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
    size: "40px"
  chip:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 15px"
    height: "38px"
  chip-selected:
    backgroundColor: "{colors.ice-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  suggestion-pill:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "34px"
  search-input:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px 0 42px"
    height: "42px"
  paper-card:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cut}"
    padding: "14px 16px 20px"
  paper-scrap:
    backgroundColor: "{colors.scrap}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cut}"
    padding: "8px"
---

# Design System: badredinne.com

## Overview

**Creative North Star: "The Listening Room"**

A white room with one presence in it and papers on the table. The page is pure white, the type is near-black, and the only color anywhere is a big hollow ball knitted from blue thread (a hexagon net with nothing inside its cells, the far side showing through thin and pale) that sits behind a pill-shaped prompt bar and listens. It leans toward the pointer and the net swells and lights cyan where the pointer touches it. It ripples with the visitor's voice, deepens and spins a little faster while they type, sweeps a band of light across itself while it answers, and barely breathes when nothing happens. The first screen holds only this: one quiet line with his name and role, the ball, the prompt bar, and two ways on (read the portfolio, or connect your own AI over MCP). Everything else on the page is paper: real white sheets cut with scissors, each with its own outline, a faint grain, a hairline on the cut, a soft lift shadow and a small tilt, as if laid on a desk by hand.

Density is low and the type is calm: Mona Sans at normal width, set tight, in a few weights. The page opens with one authored moment: an aura blooms from white while the thread winds itself onto the ball row by row from the top, then the name line, the pill and the two buttons fade up. After that, motion belongs to two things only. The orb reacts to the visitor. The paper is dealt, lifted and laid down. The rejected look is the previous version's playful floating toys: nothing on this page is decoration for its own sake.

**Key Characteristics:**
- Pure white ground, near-black ink, one blue presence; controls borrow only its palest wash and its deep electric blue for focus.
- A live WebGL knitted ball (the dual of a geodesic sphere drawn as screen-space lines, near and far layers, small knots, a soft halo) that answers pointer, voice, typing and answering states, with a still image of the thread for reduced motion.
- Paper as the only container: seeded scissor-cut SVG outlines, grain, hairline cut edge, layered lift shadow, seeded tilt of about ±0.8°.
- Pills for every control, including the prompt bar, which grows into a rounded box only for a long posting.
- Proof numbers set in a calm figure style inside their cards, never as a hero stat wall.

## Colors

A neutral white-and-ink page; all chroma lives in the orb, and controls take only its quietest tints.

### Primary
- **Orb Electric Blue** (#2457fc): the body of the orb and the voice-level bars; the orb's dominant hue. Never used as a fill on a control.
- **Orb Deep Indigo** (#1b1973): the orb's core and shadowed base, the depth that makes the presence read in a white room.
- **Orb Cyan** (#3ecaff): the lit face of the orb, light passing through it, and the first voice-level bar.
- **Orb Pale Ice** (#e2f4ff): the orb's rim melting into the page, its highlight, and the start of the ice wash.
- **Orb Faint Violet** (#a092ff): the far edge of the rim and the outer aura, and the last voice-level bar.
- **Focus Blue** (#1f4fe0): focus rings and the prompt bar's focus ring; the orb's electric blue deepened until it holds 5.9:1 on white.

### Secondary
- **Ice Wash** (#cfe6ff, the middle of a gradient from #e4f3ff to #dcd8ff): the only fill a control ever wears. Selected role chips, selected technology terms, picked technology tokens, match stickers on cards, evidence tags in answers, and bullet dots. It always carries ink text.

### Neutral
- **Page White** (#ffffff): the page, every paper sheet, the prompt pill, chips and buttons on paper.
- **Ink** (#0f1013): text, the Resume and Download buttons, the send key, the active mic.
- **Ink Soft** (#43464d): secondary text (role lines, card lines, labels that sit near the orb).
- **Ink Muted** (#686c74): meta, dates, hints and placeholders; 5.1:1 on white.
- **Hairline** (#ececef) and **Hairline Strong** (#d9dbe0): dividers inside paper, chip and input outlines, the carousel track.
- **Wash** (#f6f6f7): hover grounds for quiet controls and the disabled send key.
- **Scrap** (#f4f4f2): the slightly grayer paper of the scraps glued onto cards and of media frames in sheets.
- **Diagram Gray** (#c6c9cf) and **Diagram Soft** (#e2e3e6): secondary marks inside the card diagrams only.
- **Paper Shadow** (#16141c): the only shadow color for paper, always at low opacity and blurred.

### Named Rules
**The One Presence Rule.** The orb is the only saturated color on the page. If something else needs attention, it gets weight, size or an ink fill, never a new hue.

**The Ice Means Match Rule.** The ice wash marks a selection or a match, and nothing else: a selected chip, a picked technology, a "Best match" sticker, an evidence tag. Card diagrams turn their accent shapes into ice-to-blue foil only when the card matches.

## Typography

**Display Font:** Mona Sans (variable, self-hosted latin subset, `font-display: swap`), with ui-sans-serif and system-ui fallbacks
**Body Font:** Mona Sans
**Label/Mono Font:** the platform monospace only inside the terminal easter egg and for code glyphs in diagrams

**Character:** one plain, modern grotesk at normal width, set tight for the name and headings and loose enough for reading at small sizes on a phone. The voice is calm confidence, not engineering costume.

### Hierarchy
- **Display** (640, clamp(2.75rem, 0.9rem + 5.2vw, 5.5rem), 0.98, -0.04em): the name in the hero, on one line on desktop and two on a phone.
- **Headline** (640, clamp(2rem, 1.35rem + 2vw, 3.25rem), 1.04, -0.035em): section titles (Education, Work, Resume and contact).
- **Sheet Title** (640, clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem), 1.08): the title of an opened paper sheet.
- **Lead** (470, clamp(1.125rem, 0.95rem + 0.7vw, 1.625rem), 1.3): the role line under the name, and (at 1.0625 to 1.25rem) the lead line of a sheet.
- **Figure** (640, 1.5rem, 1.1, -0.035em): the key number on a card, the facts in a sheet, the proof numbers under the hero (at 600).
- **Title** (640, 1.1875rem, 1.2): card titles, degree names, shelf titles at 1.5rem.
- **Body** (400, 1rem, 1.55): answers, ledes and notes; measure kept to 46 to 62ch.
- **Label** (560, 0.875rem): chips, pills, labels and controls.
- **Meta** (400, 0.8125rem): dates, stacks, hints and the figure labels.

### Named Rules
**The Plain Zero Rule.** Never turn on tabular figures; Mona Sans's tabular set slashes the zero.

**The Quiet Number Rule.** A proof number is set in the Figure style next to a small label that says what it counts, inside its card or its row. It never grows into a hero stat wall.

## Layout

A centered column for the hero (960px max, the prompt pill at 640px) and a 1240px container with a fluid gutter (clamp(16px, 4vw, 48px)) for everything below. The hero fills the first screen (100svh) and centers its column. The ball's size is one variable, `--orb-r` (clamp(150px, min(25vw, 30vh), 300px) on desktop, clamp(128px, 40vw, 178px) on phones). The orb's place in the column is exactly two radii tall. The pill sits 0.35 radii above the orb's base, so about a sixth of the orb shows below it. The rows that follow start below the orb's base.

The two work carousels run full bleed. Their first card aligns with the container's left edge, and the next card peeks off the right edge: cards are wide rectangles, the picture scrap on the left (45% of the card, 38% on small phones) and the words on the right: about 2.3 cards on desktop (470 to 600px each, 28px apart), 1.5 between 980 and 1100px, and 1.1 on a phone (16px apart). The track scroll-snaps to card starts. Education is one wide sheet in two columns (1.2fr and 1fr) that stack below 980px. The close is two notes side by side (1fr and 1.25fr) that stack below 980px.

Spacing follows a loose 4px base: 8 to 14px inside controls, 14 to 20px inside cards, 28 to 40px between groups, and 104 to 120px between sections (72 to 88px on phones). There is always more space above a heading than below it. Breakpoints: 420, 760, 980 and 1100px. Chip rows on phones scroll sideways inside the gutter.

## Elevation & Depth

Depth is paper on a desk. Every surface that holds content is a sheet with two blurred shadow copies of its own cut outline: a tight contact shadow (1px down, 1.1px blur, 20% opacity) and a soft cast shadow (12px down, 13px blur, 96.5% scale, 11% opacity). Lifting a card moves the card up 6px and grows the cast shadow to 24px down at 18% opacity. The prompt pill and the search menu float with a small soft shadow. Chips, pills and inputs carry a 1px outline and no shadow. The ball is the only lit object: its near threads are darker and thicker than its far ones, and a soft halo hugs it and fades into the white.

### Shadow Vocabulary
- **Paper contact** (`filter: blur(1.1px); opacity: 0.2; transform: translateY(1px)` on a copy of the outline): the edge of every sheet.
- **Paper cast** (`filter: blur(13px); opacity: 0.11; transform: translateY(12px) scale(0.965)` on a copy of the outline): the lift of every sheet; 18% and 24px down on hover; 20% and 26px blur for an open sheet.
- **Prompt float** (`box-shadow: 0 0 0 1px rgba(15, 16, 19, 0.06), 0 2px 4px rgba(15, 16, 19, 0.04), 0 26px 60px -30px rgba(15, 16, 19, 0.34)`): the prompt pill and the per-job banner.
- **Menu float** (`box-shadow: 0 2px 6px rgba(15, 16, 19, 0.06), 0 30px 80px -30px rgba(15, 16, 19, 0.4)`): the technology suggestions and the terminal window.

### Named Rules
**The Paper Lift Rule.** Sheets rise by moving and by growing their cast shadow, transform and opacity only; the rotation eases to 0° as a card is picked up.

## Shapes

Two shape families, never mixed on one element. Controls are pills (999px): buttons, chips, suggestion pills, tokens, the search field and the stack tags. The prompt bar is a 28px radius, which is a pill at its one-line height of 56px and becomes a rounded box when it grows. Containers are cut paper: no border radius. Instead each sheet has an SVG outline generated from its id, made of straight scissor strokes 38 to 96px long (longer on big sheets), drifting up to 3px off the ideal edge, with a small step where each stroke restarts and corners that are either sharp or snipped 2 to 5px. Scraps glued onto cards use the same cut with less drift on a grayer paper. Media inside sheets sits in a 3px frame, and the technology menu uses 14px.

## Components

### Buttons
- **Shape:** pill (999px), 44px tall (52px for the closing Download button).
- **Primary:** ink background, white text, 18px side padding (Resume in the header, Download resume).
- **Hover / Focus:** ink lightens to #2a2c31. Focus is a 2px Focus Blue outline, 3px out.
- **Quiet:** white with a 1px Hairline Strong inset ring and Ink Soft text, 38px tall (Copy, Copy link). The ring turns Ink Muted on hover.
- **Line:** white with a 1px inset ring that turns ink on hover (Code and Site links in sheets).

### Chips
- **Style:** white pill, 38px, 1px Hairline Strong outline, ink label at 560. Role chips in the Work section carry a count on a Wash circle.
- **State:** selected chips take the ice wash with a darker outline and a check that pops in. Suggestion pills ("Try") are 34px outlined pills that go straight to an answer.

### Cards / Containers
- **Corner Style:** cut paper, no radius (see Shapes).
- **Background:** Page White sheet with grain at 30% and a hairline on the cut. The picture or diagram sits on a Scrap piece tilted against the card.
- **Shadow Strategy:** Paper contact plus Paper cast (see Elevation & Depth).
- **Border:** none beyond the hairline on the cut.
- **Internal Padding:** 14px 16px 20px. Inside, from top: the scrap, title, job or kind line, dates, the one line of what was built, then a hairline, the key figure with its label, and the stack.

### Inputs / Fields
- **Style:** the technology search is a white pill, 42px, with a 1px Hairline Strong outline and a leading search icon.
- **Focus:** the outline turns Focus Blue with a 1px ring. Suggestions float below on the Menu float shadow, with the active option on Wash.

### Navigation
- **Style:** a fixed header, transparent over the hero, then white at 97% with a hairline once scrolled. The name sits left at 620 weight. Education, Work and Contact are centered. GitHub, LinkedIn and Email are words, never logos, with the ink Resume pill on the right.
- **Phone:** below 980px the section links hide. Below 760px only the name and Resume remain. Below 420px the name shortens to "Anass".

### Prompt Pill (signature component)
- **Shape and size:** a white pill, 56px tall (28px radius), with the Prompt float shadow. The mic (outlined circle; ink with three blue level bars while listening) and the ink send key sit inside on the right.
- **Placeholder:** it morphs through example prompts letter by letter, with blur and fade in and out every 3.6s. It pauses while the field is focused and hides once it has text. Narrow fields under 330px use phone-length examples. Screen readers get a static label.
- **Growth:** a long posting grows the field smoothly (height measured on a hidden twin) into a rounded box. The tools stay bottom right.
- **Focus and listening:** focus draws a 1.5px Focus Blue ring. Listening adds a pale cyan halo.
- **Answers:** an answer lands below as a paper sheet with its evidence rows (scrap thumbnail, title, line, ice tags, "Show me").

### The Orb (signature component)
- **Form and color:** a sphere displaced by smooth simplex noise, shaded indigo to electric blue to cyan by the light, with an iridescent cyan-to-violet band all round and a rim melting into pale ice and faint violet, over a two-part halo (a close blue glow and a wide ice-to-violet aura).
- **Reactions:** it leans toward the pointer and bulges with one ripple ring where the pointer meets it, easing back when the pointer leaves. While the mic is on, the voice level drives displacement amplitude (from 0.036 at rest to about 0.24) and frequency. Typing brightens it and speeds the flow. Answering sweeps a band of light across it. A soft bloom follows when the answer lands.
- **Performance:** three.js loads lazily after idle. The pixel ratio is capped at 1.5. Drawing pauses off screen and in hidden tabs. A still image paints first and stays under reduced motion.

### Paper Sheet (dialog)
- **Layout:** a large cut-paper sheet laid over a white scrim (86%), tilted about 0.35°. A sticky white bar holds previous and next, "n of m", Copy link and Close. Media sits on top, then the title, meta, lead line, facts (figure plus text on hairlines), notes, stack tags and links.
- **Entrance:** it is laid down with a 28px rise and a 1.2° turn that settles.

## Do's and Don'ts

### Do:
- **Do** keep the page white (#ffffff) and the type ink; let the orb be the only color.
- **Do** build every content container as cut paper with `PaperBack` (seeded outline, contact and cast shadows, grain, hairline cut) and a seeded tilt of at most ±0.8°.
- **Do** use the ice wash only for selection and matches, always with ink text.
- **Do** give every control a pill shape and a 1px outline, and focus a 2px Focus Blue ring.
- **Do** animate paper with transform and opacity on the ease-out curve (cubic-bezier(0.16, 1, 0.3, 1)), 200 to 550ms, and keep the orb's reactions damped so nothing jitters.
- **Do** keep a still of the orb for reduced motion and no WebGL, and keep three.js out of the main bundle.

### Don't:
- **Don't** add a second saturated color, gradient text, or colored side stripes.
- **Don't** put floating 3D props, toys or decorative objects on the page; the orb is the one living object.
- **Don't** round paper containers or give them a border plus a wide shadow; paper is cut, not boxed.
- **Don't** set proof numbers as a big-number stat wall; they stay in the Figure style beside their label.
- **Don't** turn on tabular figures (the zero becomes slashed).
- **Don't** put a photo of him, his phone number, company logos or em dashes on the page.
