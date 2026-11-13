# Game theme and monitor QA

Verified: 2026-11-12T09:58:49+05:45
Target: http://127.0.0.1:4173/

## Result

The expedition UI now uses one field-equipment palette: forest-green screens, beige casing, paper text, brass actions, sage completion and clay error states. The existing pixel artwork, photos, raster/terrain palettes and scientific legend ramps remain separate from interface chrome.

The computer is a Monitor/Inspect surface: its map has a dedicated viewport and instrument readouts; station detail is a disclosure instead of a competing column. Projected 3D badges use measured collision-aware rectangles and noninteractive leaders without relocating station anchors. Narrow overlays use shrinkable single columns and accessible scrolling rather than squeezed desktop grids.

## Verified coverage

- 11 inventoried surfaces: launch, field HUD, radio/topics, field exercise, logbook, sites, atlas, assets, community exercise, evidence trail and computer.
- 50 primary surface/state snapshots at 1440×900 and 390×844, including all five computer applications and field-exercise default/aligned/error/correct states.
- 24 additional expanded-control states at those two sizes: 2D/3D layers, open notebook, quiz retry/correct, 3D fly-to/marker selection, comparison wipe/preset, radar canopy/double-bounce, NASA context, checklist and acknowledged hypothetical exercise targets.
- Each computer interaction run selected all six layers in both 2D and 3D and all seven scenario steps in each mode. The observed layer legends and scenario labels agree between modes.
- Comparison, dielectric, roughness and checklist range inputs changed through native keyboard events. Notebook and checkbox tests follow actual visible UI state.
- 8 map-layout cases across 1258×552, 1440×900, 390×844 and 640×360: no measured instrument collisions, clipped projected badges or horizontal document overflow; pixel and mono fonts reported loaded.
- 74 final chrome snapshots: no out-of-palette direct DOM text, decorative gradients, leftover blue backgrounds, unscrollable horizontal content overflow or collected script errors in the measured scope.
- 17 declared foreground/background token pairs tested; minimum contrast 5.01:1. This is not a full accessibility certification.

## Build and tests

- npm test: 42 passed, 0 failed.
- npm run typecheck: exit 0.
- npm run build: exit 0.
- Vite still reports the existing >500 kB bundle warning. No bundle splitting was included in this UI task.

## Evidence and reproduction

- Machine-readable results, exact observed states and current source/build hashes: game-theme-verified.json.
- Raw append-only evidence: theme-browser-measurements.jsonl and theme-controls-measurements.jsonl.
- Surface ownership/selectors: theme-surface-inventory.json.
- Map geometry: monitor-layout-verified.json.
- Screenshots: screenshots/theme-*.png and screenshots/monitor-*.png. Snapshot filenames identify the surface, state and viewport.
- browser_exec helpers: theme-probe.py and theme-controls-probe.py. Load both in the named browser session and run theme_basic_surfaces, theme_field_exercise and theme_computer_controls with an explicit preview URL and the required viewport. These helpers use the rendered application rather than injected app state or fabricated API responses.

## Limits and resolved harness blockers

Screenshots were captured as evidence; verification here consists of observed DOM geometry, computed styles and interactions, not a comprehensive manual/vision design review. Scientific canvas/SVG colors and legend ramps are intentionally excluded from the UI-color audit. NASA service success, geoscience validity, hardware touch coverage and full offline behavior are not certified by this pass.

The interrupted preview process was restarted after confirming ERR_CONNECTION_REFUSED and the missing listener. The notebook QA now opens its hypothesis subtab before looking for quiz options; checkbox tests inspect existing state before enabling a control. These were harness/setup corrections, not additional game defects.

No new official NASA resources were supplied or integrated in this pass.
