# Conquer the World by knowing Countries and Capitals

A browser-based geography game. Identify the correct country and its capital from 3 choices each to conquer it on the world map.

## Features
- Single-player mode (Player 1 = Blue)
- Simplified SVG world map of major countries, initially gray
- Random flags and multiple-choice questions (country + capital)
- Conquer on correct answers; win when you control more than half
- Responsive UI for desktop and mobile
- Modular JS for easy future expansion to two-player mode

## Run locally

### Option 1: Vite dev server (recommended)
1. Install dependencies:
	```powershell
	npm install
	```
2. Start the dev server with hot reload:
	```powershell
	npm run dev
	```
3. Open the printed local URL (usually http://localhost:5173).

Build production bundle:
```powershell
npm run build
```

Preview the production build locally:
```powershell
npm run preview
```

### Option 2: Open statically
Still works fine—just open `index.html` directly in a modern browser.

Optional static serving (helps with some browser security settings):

PowerShell (Windows):
```powershell
powershell -NoProfile -Command "Start-Process msedge index.html"
```
Or use any static server extension (e.g., VS Code Live Server) or:
```powershell
npx serve .
```

## Project structure
- `index.html` — App shell and layout
- `styles.css` — Responsive styles and map colors
- `src/app.js` — App wiring: UI events, turn flow, scoreboard, overlay
- `src/game.js` — Core game logic and state, question generation, scoring
- `src/data.js` — Major countries with names, capitals, flags, and simplified SVG paths
- `src/map.js` — Renders the world map as SVG with interactive paths
- `src/ui.js` — Small DOM helpers and choice button factory
- `src/utils.js` — Utility functions (`shuffle`, `sampleSize`)

## Notes
- Country shapes are intentionally simplified, abstract rectangles/polylines, meant only for gameplay visualization.
- Flags use emoji for portability; you can swap to images later if desired.

## Extend to two-player
- Add a `players = ['p1','p2']` queue and alternate `this.player` each turn.
- Scoreboard: show both players and current turn indicator.
- On correct answers, set `owner = this.player`; on wrong, either pass or enqueue for later.
- Optional: add timers, streak bonuses, or head-to-head rounds.

## License
Use freely for personal or educational purposes. Replace this section with your preferred license.