# 👋 My Portfolio
My personal portfolio, live at [badredinne.com](https://badredinne.com): a pixel-art metro ride. Scroll and a little train rolls through a world drawn in code, stopping at a station for each job, client deployment and project, from a snowy morning at Université Laval to the night terminus with my resume and contact links.

## 🌱 Usage
- Scroll to ride, or use the route bar and the Left / Right arrow keys to jump between stations.
- "Skip the ride" shows every station as a plain list with a still of its scene (the default when your system asks for reduced motion).
- The original terminal still lives behind the service door in the footer, or the backtick key: try `about`, `projects`, `links`, `help`.

## ✨ How it is built
- React 17, TypeScript and Sass (Create React App).
- One canvas at a low internal resolution, scaled by whole device pixels: sky, hills, city, 18 station scenes, the track and the train are all drawn in code (`Portfolio-main/src/world/`).
- Every fact lives in `Portfolio-main/src/content.ts`, so a change on the resume is a one-line edit here. Project demo videos plug into each project's `demo` field.

## 💡 Contributions
Feedback is welcome: open an issue or reach out by email.
