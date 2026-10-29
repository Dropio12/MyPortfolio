---
version: 1
slug: "portfolio-main-src-app-app-tsx"
primary_target: "Portfolio-main/src/App/App.tsx"
related_targets: []
---

## Direction contract

Mode: Experience (hiring audience). Build path: code-led (no image generation on this machine). Direction pinned by the user ("a pixel-like world for the metro transit thing, a station for each"); it replaces the flat Transit look and beats any roll.

THESIS: His career is a pixel-art metro ride. Scroll and a small train rolls through a living side-scrolling pixel world; every job, client deployment and project is a station with its own hand-built environment, and the facts panel for that station rides in beside it. It refuses flat lines on a pale ground, card grids and the dark gradient hero.

OWN-WORLD: One canvas drawn in code at a low internal resolution (about 300 to 390 by 180 to 230), integer device-pixel scale, image-rendering pixelated. Parallax sky, far hills or skyline, mid city, near station environments, track and train; Bayer-dithered skies; a multiply ambient tint with emissive lights drawn after it. Time moves with the career: snowy dawn at Laval, bright noon at Shopify, golden afternoon for client work, sunset on the projects branch, night with stars at the Contact terminus. Line colors stay as bullets and accents: Software green #00813f, AI orange #f26a1b, Forward Deployed blue #0a5baa, Recognition yellow #ffc20e. Platform signboards use a 5x7 bitmap font authored in code. HTML panels are game text boxes with stepped pixel borders: Pixelify Sans for names and figures, Silkscreen for HUD labels, Atkinson Hyperlegible Next for every sentence.

STORY: 10 seconds: name, role line, four sourced numbers and the Resume button over a living scene, with "Scroll to ride". 60 seconds: scroll drives the train; each station's environment rolls in while its panel states the company, role, dates, the numbers and links. Ends at the night terminus: Resume, Email, GitHub, LinkedIn.

FIRST VIEWPORT: Desktop 1440: the pixel world fills the screen, train idling at the snowy Laval platform right of center; HUD chips top (name left; Email, GitHub, LinkedIn, Skip the ride, Resume right); a text-box card on the left with the name at about 64px in two lines, role line, four numbers each naming its source, Resume / Email / GitHub / LinkedIn, and the scroll cue; a route minimap along the bottom. Phone 390: the scene is a framed window pinned at the top with the HUD over it and Resume always visible; the card sits below; panels scroll under the window while the scene changes per station.

SIGNATURE INTERACTION: Scroll position maps to world x through per-station dwell intervals (the train stops while a panel is read, travels between), with an eased camera, wheel and bob motion, and the train stripe taking the current line color. Canvas signboards and minimap stops jump to a station; Left and Right arrows step stations. "Skip the ride" switches to a plain list with a still of each scene; prefers-reduced-motion starts in that list with no movement. Ambient life (snow, blinking lights, walkers, sparkles) ticks at about 12 fps and pauses when hidden.

FORM: User-pinned Pixel Metro world, built on the Transit Line Map build (#7 of 7 on the grounded list, the roll's earlier assignment); seed key e6cc7b6a.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
