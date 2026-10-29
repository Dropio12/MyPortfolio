---
name: Anass El Hallaoui · Pixel Metro
description: A career ridden as a pixel-art metro line, one hand-built station scene per job, client and project, with readable text boxes over the world.
colors:
  ink: "#17142a"
  ink-secondary: "#46425f"
  box: "#f7f8fc"
  box-shade: "#e3e6f2"
  rule: "#d8dcea"
  bed: "#1c1b33"
  sign-navy: "#1f2750"
  sign-edge: "#0c1030"
  sign-sub: "#c9d2ff"
  software-green: "#00813f"
  ai-orange: "#f26a1b"
  forward-blue: "#0a5baa"
  recognition-yellow: "#ffc20e"
  board-amber: "#ffb547"
  board-black: "#0b0d14"
  board-ink: "#ebe9f6"
  board-dim: "#a3a9d6"
  footer-night: "#100f20"
typography:
  display:
    fontFamily: "Pixelify Sans Variable, Pixelify Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(40px, 4.3vw, 62px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Pixelify Sans Variable, Pixelify Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(24px, 2.2vw, 31px)"
    fontWeight: 600
    lineHeight: 1.08
  figure:
    fontFamily: "Silkscreen, Pixelify Sans Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.05
  body:
    fontFamily: "Atkinson Hyperlegible Next Variable, Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Silkscreen, Pixelify Sans Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1
  hud:
    fontFamily: "Silkscreen, Pixelify Sans Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1
rounded:
  none: "0px"
spacing:
  pixel: "4px"
  pixel-phone: "3px"
  gutter: "clamp(16px, 3.4vw, 48px)"
  hud: "64px"
  panel: "min(600px, 44vw)"
  stop-gap: "24vh"
components:
  resume-chip:
    backgroundColor: "{colors.recognition-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "40px"
  hud-chip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.box}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "40px"
  pixel-button:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  pixel-button-primary:
    backgroundColor: "{colors.recognition-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "44px"
  pixel-button-code:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    height: "44px"
  text-box:
    backgroundColor: "{colors.box}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    width: "{spacing.panel}"
  station-plate:
    backgroundColor: "{colors.sign-navy}"
    textColor: "#ffffff"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "14px 18px 17px"
  departure-board:
    backgroundColor: "{colors.board-black}"
    textColor: "{colors.board-ink}"
    rounded: "{rounded.none}"
    padding: "9px 14px"
  route-bar:
    backgroundColor: "{colors.sign-navy}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "8px 10px"
---

# Design System: Anass El Hallaoui · Pixel Metro

## Overview

**Creative North Star: "The Pixel Metro"**

The page is a ride. One canvas, drawn entirely in code at a low internal resolution and scaled up by whole device pixels, holds a side-scrolling world: a Bayer-dithered sky, far hills, a hazy skyline, a mid city that changes from snowy pines to downtown blocks to industrial works, the track, and a small two-car train. Scrolling moves the train along the line. Each job, client deployment and project is a station with its own hand-built scene (a snowy stone campus, a glass tower with lit floors, a hackathon hall with eight trophies, a server room behind a burning firewall, a shopping street under a billboard showing the real shop.com page, a law office where papers fly into folders, a hotel front desk whose phone rings, a robot gym, a circuit-board city, a workshop arm building boards, a car lot, a trading floor, a depot) and the day moves with the career: snowy dawn at Laval, noon at Shopify, golden afternoon for client work, sunset over the projects branch, night at the terminus.

Over the world sit game text boxes, and they carry every fact. The world is scenery and never a claim; the boxes are where a recruiter reads the company, role, dates, numbers and links. A box is a clean cool-white panel with a stepped pixel frame, a navy station plate on top (the same navy as the signboards drawn on the platforms), Pixelify Sans for large names, Silkscreen for figures and labels, and Atkinson Hyperlegible Next for every sentence and date. The HUD (name, contact chips, the view switch, the yellow Resume button) is a navy band across the top on desktop and floats over the world's sky on phones, and a route bar shows where the train is on the line.

The world has two quiet modes. "Skip the ride" turns the page into a plain list: each stop as a still of its scene beside its box. Visitors who ask the system for reduced motion start there, and nothing moves.

**Key Characteristics:**
- One canvas, whole-pixel scaling, no anti-aliasing: every scene, sign, person and train is authored in code.
- Time of day is a palette tint over one set of surface colors; lamps and windows switch on through their own lit colors.
- Facts live only in HTML text boxes with stepped pixel frames, never in the canvas.
- The four line colors (green, orange, blue, yellow) mark lines, bullets, plate stripes and the train's stripe.
- Square corners everywhere; depth comes from stepped frames, bevels and one soft drop under boxes.

## Colors

A night-navy and cool-white system on top of a full-color pixel world, with four line colors as the only accents.

### Primary
- **Software Line Green**: the Software line: bullets, plate stripes, the terminus plate and exit signs drawn on the canvas.
- **AI Line Orange**: the AI line and the projects branch: bullets, plate stripes, fact markers on project boxes. Carries ink, never white.

### Secondary
- **Forward Deployed Blue**: the client deployments: bullets, plate stripes, the hotel's voice-agent waveform, the pressed view switch.
- **Recognition Yellow**: the Recognition line and the one primary action. The Resume chip, the Resume button and the Resume exit are yellow with ink text; text selection and the focus ring on dark chips use it too.

### Tertiary
- **Board Amber** on **Board Black**: departure boards only (the four headline numbers in the opening box, the "Calling at" board on each project). Board Ink carries sentences on the board and Board Dim carries each number's source.

### Neutral
- **Ink**: all text on boxes, every pixel frame and outline, HUD chips.
- **Ink Secondary**: role lines, dates under plates, captions; AA on the box.
- **Box** and **Box Shade**: the text-box ground and its inner bottom bevel.
- **Rule**: the 2px dividers between fact rows and list items.
- **Bed**: the page ground under the world (the list view, the phone reading area, the gaps between stops).
- **Sign Navy**, **Sign Edge** and **Sign Sub**: station plates, the route bar, the signboards drawn on the canvas, and their secondary text.
- **Footer Night**: the footer.

### Named Rules
**The Line Colors Mark Lines Rule.** Green, orange, blue and yellow appear as line bullets, plate stripes, fact markers, the train's stripe and route dots. Yellow is also the single primary action. No other decorative use.

**The Text On Line Rule.** White goes on green and blue; ink goes on orange and yellow.

**The Facts Off Canvas Rule.** Nothing a visitor must read lives only in the canvas. Station names drawn on platform signs are repeated in the box plate; the terminus exit signs repeat the HTML exits.

## Typography

**Display Font:** Pixelify Sans Variable (with Segoe UI, system-ui)
**Body Font:** Atkinson Hyperlegible Next Variable (with Segoe UI, system-ui)
**Label and Figure Font:** Silkscreen

**Character:** Pixelify Sans is drawn on a pixel grid but keeps real lowercase and proportional widths, so long names ("Anass Badreddine El Hallaoui", "Cherry Hardware Agent") stay readable at display sizes. It is kept to large names because it draws 5 like S at every size and G like B below about 20px. Silkscreen keeps 5, S and G distinct, so it carries every number and every label, set in its own caps like an LED board. Atkinson Hyperlegible Next keeps 1, l, I and 0, O apart for sentences and dates. The canvas has its own 5x7 and 3x5 bitmap fonts for signboards. All faces are self-hosted, latin subset, font-display swap; ligatures are switched off after every pixel-face shorthand because Pixelify's "fi" reads as an "A".

### Hierarchy
- **Display** (700, clamp(36px, 3.4vw, 50px), 1): the name in the opening box, two lines on desktop.
- **Title** (600, clamp(24px, 2.2vw, 31px), 1.08): station names on plates; a lighter 450 weight carries the second half of a name ("Shopify **Visual Search**").
- **Figure** (Silkscreen 400, 24px; 21px on phones): the number that opens each fact row; 22px amber on the opening board.
- **Body** (400, 17 to 17.5px, 1.5): fact sentences, summaries, notes; held near 62ch.
- **Label** (Silkscreen 400, 13 to 15px): buttons, chips, the route name, the scroll cue, sources on the board.
- **Date** (Atkinson 600, 15.5px, tabular): dates on plates; long date lines wrap between parts, never inside one.
- **HUD** (Silkscreen 400, 11 to 16px, uppercase): "Now / Next", "Stop 6 of 18", board destinations.

### Named Rules
**The Two Voices Rule.** What is read at a glance is a pixel face: Pixelify Sans for large names, Silkscreen for numbers and labels. What is read as a sentence, and every date, is Atkinson. Never set a sentence in a pixel face, and never set a number in Pixelify Sans.

## Layout

Desktop (900px and up): the canvas fills the viewport, pinned while the ride scrolls over it. Text boxes sit in one left column (`min(600px, 44vw)`, gutter `clamp(16px, 3.4vw, 48px)`); the world's scale is chosen so the open area right of the boxes shows about 280 world pixels, and the camera puts each station in the middle of that open area. Each stop is a block with 24vh above and below its box, so the train has track to travel between stops; scroll position maps to the camera through per-stop dwell ranges (the train waits while a box is read, then travels). The HUD is a solid navy band (64px) on desktop so boxes never pass under its chips; the route bar sits top right under it, and the sun and moon stay below both. The ground strip under the rail is only about 70px tall and holds the train's wheels, so nothing is placed over it.

Phone (899px and below): the world becomes a window pinned at the top (`min(36svh, 72vw, 380px)` tall) with the HUD chips over its sky and the route bar under it; boxes scroll beneath it on the night bed, full width with a 12px gutter. The world scale targets about 280 world pixels across.

List view: a centered two-column grid (`400px` still, `648px` box) per stop on desktop, the still sticky beside a long box; one column on phones. The opening box spans both columns: name, role and the four buttons in a 2x2 grid on the left, the departure board on the right. In the list the hero cue is a sentence, so it is set in Atkinson.

## Elevation & Depth

Depth is built from whole pixels. Every box, chip, button, board and still has a stepped frame: four offset fills (`0 -4px 0 0`, `0 4px 0 0`, `-4px 0 0 0`, `4px 0 0 0` in ink; 3px on phones and on controls) that leave the corners notched, the way a game draws a window. Buttons add a 3px inner bevel (a lighter top, a darker bottom) so they read as pressable, and press down 2px when active. Text boxes add one soft drop so they float over the moving world.

### Shadow Vocabulary
- **Box drop** (`0 24px 40px -20px rgba(6, 5, 20, 0.62)`): under every text box, after the stepped frame and the inner bottom bevel.
- **Button bevel** (`inset 0 -3px 0 0` darker, `inset 0 3px 0 0` lighter): chips and buttons.
- **Band edge** (`0 3px 0 0 #000`): under the desktop HUD band, the pinned phone window, and the list view's HUD.

### Named Rules
**The Whole Pixel Rule.** Frames, bevels, separators and markers are whole pixels (2, 3 or 4px) with square ends. No radius, no hairline borders, no blur glows on chrome.

## Shapes

Square corners throughout (0px radius); corners are notched by the stepped frame instead. Line bullets are 9x9 pixel discs with a 3x5 letter, drawn as crisp SVG and repeated in the canvas signboards. Separators inside text are one square pixel. Fact markers and note bullets are small squares in the stop's line color with a 2px ink ring.

## Components

### Buttons
- **Shape:** square, stepped 3px ink frame, 44px tall (40px chips in the HUD, 36px on phones).
- **Primary (Resume):** Recognition Yellow with ink text and a pixel document icon; yellow bevel; present in the HUD on every screen, first in the opening box, first at the terminus.
- **Secondary:** white with ink text (Email, GitHub, LinkedIn); the project link is ink with white text ("Code on GitHub", or "Visit trycherryblossom.com").
- **Hover / Active / Focus:** lift 1px and a lighter fill on hover, press 2px on active; focus is a 3px outline offset 3px, yellow on dark chips and ink on boxes.

### Chips
- **HUD chips:** ink with white Silkscreen labels and 12px pixel icons, in the order Email, GitHub, LinkedIn, the view switch, Resume; the view switch toggles between "Skip the ride" and "Take the ride" (aria-pressed, blue when pressed). On narrow screens chips go icon-only (34px on phones) with labels kept for screen readers.

### Cards / Containers
- **Text box:** Box ground, stepped 4px ink frame, inner bottom bevel, box drop; a navy station plate on top with line bullets, the name and the dates, and a 5px stripe in the stop's line color along its bottom edge. Body padding 18px 22px.
- **Facts:** one grid for all rows so figures share a column; each row a figure (Silkscreen 24px with a line-color square) and a sentence; rows divided by a 2px rule.

### Navigation
- **Route bar:** the in-car line display. "Now" or "Next" in a yellow Silkscreen tag, the station name, then a line of 18 square stops in their line colors with 22px hit areas and a white train marker that moves with the camera; previous and next buttons at the ends. On phones the stops collapse into a progress line under the name.
- **Keyboard:** Left and Right arrows step stations; the backtick key opens the service door (the old terminal) as a dialog.

### Departure Board (signature)
- Board Black with a stepped black frame; amber Silkscreen figures, Board Ink sentences, Board Dim Silkscreen sources. In the opening box each row is a link that rides to the station where that number was earned. On projects without a video, the board shows the project name in Silkscreen amber and "Calling at" its stack; with a video, the slot becomes a 16:9 muted looping player that pauses off screen.

### The World (signature)
- Canvas drawn at about 300 to 480 by 180 to 330 world pixels, scaled by an integer number of device pixels with `image-rendering: pixelated`. Layers: dithered sky, stars and moon or sun, clouds, birds and a plane by day, far hills (snow-capped at the start), a skyline that lights up after dusk, a regional mid city, roadside things, the station scene, the platform with a navy signboard on posts, the track, the train (stripe in the current line color, lit windows, doors that slide open once it has stood at a platform, headlight beam at night), snow at Laval and blossom petals at the workshop. Ambient life ticks at about 12 fps; the camera eases toward the scroll target; drawing pauses when the tab is hidden. Signboards on the canvas are mouse shortcuts to their station; the route bar is the accessible way in.

## Do's and Don'ts

### Do:
- **Do** put every fact in an HTML text box; the canvas may repeat a name, never carry a number on its own.
- **Do** draw scenery in code on the world's pixel grid, and make each station's scene say something true about the stop (papers into folders for a document workflow, a ringing phone for a voice agent) without inventing numbers or logos.
- **Do** keep the stepped frame on every box, chip, board and still (4px boxes, 3px controls).
- **Do** keep the Resume button yellow and reachable from every scroll position.
- **Do** keep reduced motion and "Skip the ride" a complete page: stills, every box, no movement.

### Don't:
- **Don't** draw a real company's logo or brand mark in the world; company names appear only as text on station signs and plates.
- **Don't** round corners or use hairline borders on chrome; use the stepped frame.
- **Don't** set sentences in Pixelify Sans or Silkscreen, or numbers in Pixelify Sans.
- **Don't** hide a fact behind hover, scroll position or the canvas.
- **Don't** add a second scroll-driven motion: the ride is the one authored movement.
