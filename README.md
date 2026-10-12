# Tower Conquest — Village Builder Prototype

A browser-based village-building strategy game prototype. This is a new direction for the project, replacing the previous tower-capture concept.

## Run

Open `index.html` through a local web server (recommended because it uses ES modules from a CDN). For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

The prototype loads Three.js from jsDelivr, so an internet connection is required.

## Current prototype features

- Interactive 3D scene with an orbiting camera, zoom, lighting, shadows, terrain, paths, trees, and decorative scenery.
- A starting village with a Town Hall, resource buildings, Barracks, Army Camp, Cannon, and Builder Hut.
- Building placement, selection, upgrades, and a basic move-building interaction.
- Gold and elixir production, resource counters, and local browser saving.
- Troop training queue with three troop roles.
- AI opponent selection and a simplified battle-resolution prototype.
- Responsive browser UI for desktop and mobile.

## Known limitations

This is an early playable foundation, not a finished game and not feature-equivalent to Clash of Clans. Combat is currently simplified and battle outcomes are simulated; enemy base layouts, animated deployed troops, real-time pathfinding, fully functional defensive combat, richer 3D assets, balancing, and comprehensive automated/browser testing still need development.

The game uses original placeholder procedural models rather than copied Clash of Clans assets. Future work should improve the art pipeline and replace the simple geometry with polished original models and animations.

## Next priorities

1. Run browser checks and fix all console/runtime issues.
2. Improve placement feedback, move-building behavior, save migration, and economy rules.
3. Build actual battle scenes with troop deployment, pathfinding, targeting, damage, and defenses.
4. Improve the village art with detailed original models, animation, and visual effects.
5. Add automated tests and repeatable browser-based gameplay checks.
