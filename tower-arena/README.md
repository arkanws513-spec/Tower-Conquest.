# Tower Conquest — Arena Prototype

This is an isolated real-time tower-capture prototype added under `tower-arena/`. It does not replace the existing village-builder prototype at the repository root.

## Run locally

Because this prototype is a single self-contained HTML file, no build step or package installation is required:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/tower-arena/` or `http://localhost:8000/tower-arena/index.html`.

It uses Canvas 2D and vanilla JavaScript. There are no external libraries, APIs, accounts, or paid services required for this prototype.

## Prototype features

- Real-time tower capture with a human player and three AI opponents.
- Three AI behavior profiles: aggressive, defensive, and tactical.
- Tower production, connected paths, troop dispatch, capture resolution, match timer, pause, and rematch.
- A roster of 200 simulated AI commanders using varied Arabic, European, African, South Asian, and East Asian naming traditions.
- Local simulated leaderboard, weekly score view, and local player rating saved in browser storage.
- Responsive browser layout and touch/pointer controls.
- Clear disclosure that rival profiles and rankings are simulated AI, not real human accounts.

## Current limitations / next checks

- This is an early playable prototype, not a balanced or release-ready game.
- Battle rules are intentionally simplified; run repeated playtests and automated simulations before treating ratings as meaningful.
- Leaderboard values are local demonstration data and are not shared between devices or players.
- The game does not connect to a backend and does not implement real purchases, accounts, anti-cheat, cloud saves, or real online rankings.
- The current rival roster is generated deterministically from name lists and does not represent actual people.
- Test in current desktop and mobile browsers. Android packaging should only begin after touch controls, performance, pause/resume, and save behavior have been verified.

## Android direction

After the browser version is stable, package it with Capacitor or another maintained WebView wrapper. No Android package is included yet.
