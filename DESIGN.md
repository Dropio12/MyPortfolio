---
name: Anass El Hallaoui · Transit Line Map
description: A career drawn as a metro network on enamel, four colored lines on a real 2023 to 2027 time scale.
colors:
  enamel: "#eef2f4"
  plate: "#ffffff"
  plate-calm: "#e3e8eb"
  ink: "#111417"
  ink-secondary: "#4a525b"
  ink-tertiary: "#5f6872"
  rule: "#cbd3d9"
  ghost-track: "#d3dade"
  software-green: "#00813f"
  ai-orange: "#f26a1b"
  forward-blue: "#0a5baa"
  recognition-yellow: "#ffc20e"
  platform-amber: "#ffb547"
  screen-black: "#06080a"
typography:
  display:
    fontFamily: "Overpass Variable, Overpass, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(44px, 5.9vw, 86px)"
    fontWeight: 800
    lineHeight: 0.93
    letterSpacing: "-0.032em"
  headline:
    fontFamily: "Overpass Variable, Overpass, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(36px, 4.6vw, 64px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Overpass Variable, Overpass, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(22px, 2.3vw, 31px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Overpass Variable, Overpass, Segoe UI, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontFeature: "tnum"
  body:
    fontFamily: "Atkinson Hyperlegible Next Variable, Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Overpass Variable, Overpass, Segoe UI, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 700
    lineHeight: 1.45
rounded:
  control: "8px"
  plate: "10px"
  panel: "14px"
  sign: "16px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 3.4vw, 48px)"
  track: "92px"
  track-gap: "20px"
  lane: "16px"
  station: "52px"
  band: "76px"
components:
  resume-sign:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 18px 2px 14px"
    height: "44px"
  station-sign:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.plate}"
    padding: "10px 22px 15px 12px"
  station-sign-lit-software:
    backgroundColor: "{colors.software-green}"
    textColor: "{colors.plate}"
    rounded: "{rounded.plate}"
  station-sign-lit-ai:
    backgroundColor: "{colors.ai-orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
  station-sign-lit-forward:
    backgroundColor: "{colors.forward-blue}"
    textColor: "{colors.plate}"
    rounded: "{rounded.plate}"
  station-sign-lit-recognition:
    backgroundColor: "{colors.recognition-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
  legend-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "10px 8px"
  exit-plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "22px"
  exit-plate-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate}"
    rounded: "{rounded.panel}"
    padding: "22px"
  plate-link:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
  platform-screen:
    backgroundColor: "{colors.screen-black}"
    textColor: "{colors.platform-amber}"
    rounded: "{rounded.sign}"
    padding: "10px 10px 12px"
---

# Design System: Anass El Hallaoui · Transit Line Map

## Overview

**Creative North Star: "The Transit Line Map"**

The portfolio is a metro network. Jobs, client work and projects are stations; four colored lines carry them; the page is ridden from the origin at Université Laval to a terminus that holds the resume and contact. The grammar is the schematic transit diagram: orthogonal and 45-degree track only, white interchange capsules with ink rings, station dots, terminus bars, a framed legend, and round line bullets lettered S, A, F and R. The material is enamel signage seen in daylight: a cool off-white ground, near-black ink, white enamel plates, and saturated line colors that fill whole plates and whole bands rather than dotting the page with accents.

The page is built for a recruiter who skims for a minute, often on a phone. Every number sits on the station that earned it, so the diagram never hides a fact: station text is always readable without any interaction, and the motion only adds orientation. The signature behavior is the ride: the four-lane track draws itself as the visitor scrolls, a train marker rides the draw head, and only the current station's sign lights up in its line color. The legend doubles as a filter that lights one line's stations across the map, the strip map and the ride.

Density is deliberately uneven: a dense first viewport (sign, legend, network map), calm timetable passages for each station, then full-bleed color bands that change the pace (yellow for recognition, blue for client work, orange for the projects branch, green for the terminus).

**Key Characteristics:**
- Enamel ground, ink type, four line colors that own plates and full-bleed bands.
- Schematic geometry only: vertical lanes, horizontal map tracks, 45-degree joins, capsules and dots.
- Signage type (Overpass) for everything that is read at a glance; a legibility face (Atkinson Hyperlegible Next) for sentences.
- Figures first: every fact is a timetable row with the number set large in tabular figures.
- One authored motion idea: the line draws as you ride it; nothing else animates for show.

## Colors

A full palette of four named line roles on a cool enamel and ink neutral base.

### Primary
- **Software Line Green** (#00813f): the Software line. Lane, bullets, station dots, lit signs with white text, and the terminus band. White on it passes AA (5:1).
- **AI Line Orange** (#f26a1b): the AI line and the projects branch band. Always carries ink text (6:1), never white.

### Secondary
- **Forward Deployed Blue** (#0a5baa): the Forward Deployed line and the client-work band, with white text (6.8:1).
- **Recognition Yellow** (#ffc20e): the Recognition line and its band, with ink text (11.4:1). On the light map it takes a hairline darker edge so the line holds on enamel.

### Tertiary
- **Platform Amber** (#ffb547) on **Screen Black** (#06080a): only inside the platform screens (the demo slots), the way a station display reads.

### Neutral
- **Enamel** (#eef2f4): the page ground and the header.
- **Plate White** (#ffffff): calm station signs, the legend box, link plates, contact plates, and the white casing around every lane.
- **Calm Plate** (#e3e8eb): a sign that is not on the line chosen in the legend.
- **Ink** (#111417): text, the big station sign, interchange rings, terminus bars, the footer.
- **Ink Secondary** (#4a525b): dates, captions and supporting text on enamel and white.
- **Ink Tertiary** (#5f6872): year plates on the track and de-emphasized map labels; still AA on enamel.
- **Rule** (#cbd3d9): timetable hairlines and graticule lines.
- **Ghost Track** (#d3dade): track not yet ridden, and lines not chosen in the legend.

### Named Rules
**The Line Owns Its Color Rule.** Each of the four colors means one line and nothing else. A color never appears as decoration; if it is on screen, it is that line's lane, bullet, station, sign or band.

**The Whole Band Rule.** A line color is used at full strength over large areas (signs, bands, the sign stripe), never as a thin accent border or a tinted wash. Tints exist only as the pressed state of a legend toggle.

**The Text On Line Rule.** White text goes on green and blue; ink text goes on orange and yellow. On a band, secondary text is tinted from the band's own ink, never grey.

## Typography

**Display Font:** Overpass Variable (with Segoe UI, system-ui)
**Body Font:** Atkinson Hyperlegible Next Variable (with Segoe UI, system-ui)
**Label Font:** Overpass Variable

**Character:** Overpass descends from the highway gothic lettering of road and rail wayfinding, drawn to be read at speed and at distance, which is exactly the job of a station sign, a line name and a figure. Atkinson Hyperlegible Next was drawn for low-vision legibility and keeps 1, l, I and 0, O apart, which matters on a page made of numbers like 10,000+ and 808,000+. Both faces carry tabular figures, used for years, dates and every fact figure. Both are self-hosted, latin subset only, with font-display swap. The hidden terminal keeps its own Fira Code, loaded only when the terminal opens.

### Hierarchy
- **Display** (800, clamp(44px, 5.9vw, 86px), 0.93): the name on the big station sign; the terminus title uses the same voice up to 110px.
- **Headline** (800, clamp(36px, 4.6vw, 64px), 0.98): section titles such as the ride and the branch line.
- **Title** (800, clamp(22px, 2.3vw, 31px), 1.08): station names on enamel signs; a lighter 500 weight carries the second half of a name (Shopify **Visual Search**).
- **Figure** (800, 30px, tabular): the number that starts every timetable row; 26 to 27px on phones and in projects.
- **Body** (400, 18px, 1.5): fact sentences and notes, held to 60 characters per line.
- **Label** (700, 15 to 16.5px): roles, dates, map labels, header links, stacks.

### Named Rules
**The Signage Voice Rule.** Anything a visitor reads at a glance (a name, a number, a date, a line) is set in Overpass; anything read as a sentence is set in Atkinson. Never mix them inside one line of text.

**The Tabular Figures Rule.** Years, dates and fact figures always use tabular numerals so stacked rows align like a timetable.

## Layout

One centered column of 1344px maximum with a fluid gutter (16px on phones to 48px). The first viewport is a two-column grid on desktop: the station sign takes the remaining width and the legend box a fixed 300 to 372px; the network map spans the full width below them on a true time scale (240 units per year, 2023 to 2027). At 1099px and below the map gives way to the vertical strip map and the legend becomes a single row of four bullets.

The ride reserves a track column on the left (92px plus a 20px gap on desktop, 46px plus 12px on phones) where four lanes run 16px apart (10px on phones) in a fixed order: Recognition, Software, AI, Forward Deployed. All content starts at the same left edge to the right of the track, so every station node lines up with its sign. Stations are spaced 52px over and 60px under (40/46 on phones); banded stations get 76/84. Year plates sit above the first station of each year with a rule that crosses the lanes like a graticule tick. On desktop each station's dates sit at the right edge, joined to the sign by a dotted leader, like a timetable; on phones they drop under the sign.

Full-bleed bands run edge to edge behind their stations while the track keeps running over them.

## Elevation & Depth

Mostly flat enamel. Signs are mounted, not floating: a thin rim and a short contact shadow, the way an enamel nameboard sits on a wall. Lit signs gain a white enamel ring so they hold on any band. Only the objects that are not signs (link and contact plates, platform screens) lift off the ground with a soft shadow.

### Shadow Vocabulary
- **Mounted sign** (`box-shadow: inset 0 0 0 2px rgba(17,20,23,.14), 0 2px 0 rgba(17,20,23,.12)`): calm station signs.
- **Lit sign** (`box-shadow: 0 0 0 3px #fff, 0 3px 0 3px rgba(17,20,23,.16)`): the current station, or stations on the chosen legend line.
- **Big sign rim** (`box-shadow: inset 0 0 0 3px #2b3036, 0 2px 0 rgba(17,20,23,.18)`): the ink station sign in the first viewport.
- **Lifted plate** (`box-shadow: 0 1px 2px rgba(17,20,23,.16), 0 10px 20px -14px rgba(17,20,23,.5)`): repo link plates; contact plates use a deeper `0 16px 30px -20px rgba(0,0,0,.6)`.
- **Display housing** (`box-shadow: 0 34px 60px -34px rgba(17,20,23,.85)`): platform screens.

### Named Rules
**The Mounted Not Floating Rule.** Signs sit on the wall: a rim and a 2 to 3px contact shadow, never a soft float. Lifted shadows are for things you pick up (link plates, contact plates, screens), and always carry a downward offset. No zero-offset glows, no hard offset blocks.

## Shapes

Enamel corners: gently rounded plates (10px for station signs, 14px for the legend and contact plates, 16px for the big sign and platform screens, 8px for small controls). Line geometry is exact: lanes and map tracks have flat (butt) ends, 45-degree joins with round line joins, and terminus bars. Interchanges are pill capsules (white, 3px ink ring) that span exactly the lanes they serve; single-line stations are white dots with a ring in the line color. Line bullets are perfect circles with one letter.

## Components

### Buttons
- **Shape:** rounded control (8px).
- **Resume sign (primary):** ink plate, white Overpass 800 label, a download-document icon, and the four-line stripe along its bottom edge; 44px tall; sticky in the header on every screen.
- **Hover / Focus:** lifts 1px with a deeper shadow; focus is a 3px ink ring with 3px offset (white on green and blue bands).
- **Header links:** icon plus label in Overpass 700; white plate on hover; icon-only (44px square, labelled) below 760px.

### Station Sign (signature)
- **Calm:** white enamel plate, line bullets for every line serving the station, the name in Overpass 800, a 4px stripe in the station's line color along the bottom.
- **Lit:** the plate fills with the line color, text switches per the Text On Line Rule, bullets gain a white ring, the stripe fades to the text color. Only one station is lit by scroll at a time.
- **Dimmed by the legend:** calm-grey plate with secondary ink; facts below stay full contrast.

### Track and Train (signature)
- Four vertical lanes in an SVG, each a colored stroke over a white casing; the unridden part shows as ghost track. A stroke-dashoffset scrubbed by ScrollTrigger draws each lane to the draw head at 62% of the viewport. The train is a small ink capsule with white windows and a yellow headlight riding the Software lane. Under reduced motion the lanes are fully drawn, there is no train, and nothing lights.

### Legend
- **Style:** white box, 2px ink frame, title "Lines". Each line is a toggle button: a short sample of the line with its bullet on it, the line name, and what it carries.
- **State:** pressed shows a tint of the line color and a 2px ink inset ring; a live hint offers "Show every line".

### Cards / Containers
- **Contact plates (terminus):** 14px corners, white with ink text (Resume in ink with white text), an icon top left, an arrow top right that slides 4px on hover, the label in Overpass 800 28px and the address below.
- **Platform screen (demo slot):** ink housing with the A bullet and the repo slug in amber above a black 16:9 display. Without a video it is a departure board: the project name in amber at the top, and at the bottom a "Calling at" line listing the stack. It never repeats the station's figures. With a video: muted, looping, inline, lazy, paused off screen, and the stack moves into the station text.

### Navigation
- **Network map:** every station label is a link to its station on the ride, with a white hit plate on hover and an ink-ringed plate on focus.
- **Strip map (phone):** one vertical line colored per segment, dots and capsules for stations, the year on the left and the headline number under each name.

### Service Door
- A discreet footer control (and the backtick key) opens the original terminal as a dialog with its own dark theme; focus is trapped and returns to the opener on close.

## Do's and Don'ts

### Do:
- **Do** put every number on the station (job or repo) it comes from, as a timetable row with the figure first.
- **Do** keep track geometry orthogonal or at 45 degrees, with interchange capsules spanning exactly the lanes they serve.
- **Do** use a line color at full strength for a whole sign or a whole band (Whole Band Rule).
- **Do** use tabular figures for years, dates and figures.
- **Do** keep every fact readable with motion off: the track draws fully and nothing hides behind the animation.

### Don't:
- **Don't** use a line color for anything other than its line (Line Owns Its Color Rule).
- **Don't** put white text on orange or yellow.
- **Don't** use transit-agency names, logos or roundels; the grammar is generic schematic mapping.
- **Don't** add date labels to undated items; they sit between their dated neighbors, and the projects branch says it carries no dates.
- **Don't** add a second animated idea; the ride is the only scroll-driven motion, and the map draws once on load.
