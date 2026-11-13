# Local QA and verification report

Review dates: initial review 2026-11-10; follow-up 2026-11-11. Scope is the focused educational judge path and preservation of regional entry points, not operational science validation or exhaustive application QA.

## Automated checks actually run

- `npm test`: **19 tests passed, 0 failed** in the final follow-up run. Node built-in test runner; existing TypeScript and React dependencies. Coverage includes the original service, narrative, keyboard and guide checks plus numerical LOS/fringe/wrapped-hue/scene-unit/grid-gradient fixtures and source-binding, palette, credit and exercise-copy guards. Source guards are not pixel-level renderer tests.
- `npm run typecheck`: passed (`tsc --noEmit`).
- `npm run build`: passed (`tsc -b && vite build`), Vite 6.4.5. A large-chunk warning remains; the final JavaScript bundle was reported as 1,176.79 kB (336.93 kB gzip), `index-CBgEgBW5.js`. No bundle-performance benchmark was performed.
- Citation verification: README, science/provenance review and the additional science-research register passed their ledgers' `verify --evidence` gates. Unused registered sources produce warnings, not citation failures. These gates check citation/evidence consistency; they are not independent scientific peer review.
- Both NISAR reference files' SHA-256 values matched their provenance manifest. Images are 1280 × 977 JPGs downloaded from the linked NASA article, not generated images.
- DEM structural inspection: 148 rows, 160 columns in every row; actual min/max 1,310/7,216 m match file declarations. This proves internal structure only, not SRTM origin, geodetic accuracy or vertical datum.
- No Git repository exists at the supplied project root; Git diff/history verification was unavailable. No commit or push was performed.

## Browser checks actually exercised

Tools: Browser Use CLI / CDP in the local browser. Most controls were exercised via DOM/native events; the final clean launch used an actual viewport mouse click. Native keyboard checks included the NISAR wipe slider (50 → 51 with ArrowRight) and Shift+Tab focus wrapping inside the observatory.

- Clean guided launch on development server and local production preview; the guide mounted and both bundled NISAR images loaded.
- Problem, observation, evidence/asset review, interpretation, action and limitations navigation; returning to the guide preserves its selected step.
- Rasuwa 2D observatory, scenario controls and 3D transition. WebGL canvas mounted. After fixing stylesheet precedence, the compact desktop map was 336 px high and the WebGL canvas 852 × 334; the chassis scrolls instead of crushing the map.
- Hypothetical action configuration: 18 mm and 75%, acknowledgement checkbox, completion button enabled, exercise state recorded. Generated worksheet text was read from the actual browser Blob and included non-operational status, simulated quantities and unquantified priorities. No real warning or external agency action was made.
- Rasuwa asset review: local thumbnail/main assets loaded; visible unknown date/location/permissions and supplied-credit labels inspected via DOM. Assets remain unverified illustrations, not proven field evidence.
- Actual online NASA POWER response and GIBS optical tile: climatological period/source classification visible; GIBS image loaded at 256 px width for the requested dated regional tile. EONET returned 20 curated records in the observed online atlas check, not a comprehensive inventory.
- All **five** regional entry points were exercised and recorded. Each mounted the field canvas and closed the atlas; no captured JavaScript error occurred. `region-travel.json` records the limited checks. This is not completion of all quests or a full 3D test of every region.
- Responsive guide at 390 × 844: guide width 362 px, client/scroll width 356 px; no horizontal overflow in that guide container. This was not a full mobile-app accessibility audit.
- Narration and background music start off; essential interactions do not depend on sound. No screen-reader or formal WCAG conformance test was run.

Captured error/unhandled-rejection/console-error arrays were empty in the described successful paths. No broad claim is made about every browser console/network event or every feature.

## API failure test and blockers

A browser attempt to block all external requests was refused by tool policy. **A full offline-browser test was not completed.** Instead, a cold-page browser `fetch` fault injection rejected only POWER and EONET requests. The guide's local NISAR images still loaded; POWER displayed “ILLUSTRATION — unavailable / unverified local example,” EONET displayed unavailable with zero invented records, and no captured JavaScript error occurred. See `api-failure-check.json`.

The injection was confined to the review browser, not real services or project code. A subsequent clean page was checked with native `window.fetch`; the final production smoke test used that normal page. This does not prove offline installation, service-worker support or slow-stream behavior across all browsers.

Image-analysis tooling returned an authorization error for an attempted source-image inspection. Screenshots below are real captures, but **DOM/interaction checks are not a comprehensive visual-art/contrast review**. No video recording or broad user study was produced.

## Production preview

`npm run preview -- --host 127.0.0.1 --port 4173` started locally. HTTP checks returned **200 text/html** for `/` and **200 image/jpeg** for the bundled NISAR asset. Browser loaded the preview and opened the guide with both images. Local preview: http://localhost:4173/

This is local serving, not deployment, publication or submission. The development server also remains available at http://localhost:5173/ while its process is running.

## Real captures / records

- `screenshots/guide-desktop.png`
- `screenshots/guide-mobile.png`
- `screenshots/observatory-3d.png`
- `screenshots/action-exercise.png`
- `screenshots/asset-review.png`
- `region-travel.json`
- `api-failure-check.json`

## Follow-up verification — 2026-11-11

The rebuilt production page loaded `index-CBgEgBW5.js`. A self-contained clean-launch browser script exercised the Rasuwa guide → interpretation → 3D → action → limitations path. Launch used a viewport mouse click; most later controls used actual React handlers through DOM clicks and native input-value setters/events. This is limited interaction verification, not a full visual or accessibility audit.

- Both archived reference images loaded at 1280 × 977 and their fuller producer/preparation credit was visible.
- 3D canvas was 852 × 334. The actual caption read “ARTISTIC LOS→HEIGHT ×490; not vertical ground motion.” Its computed font size was 12 px. Captured image: `screenshots/followup-observatory-3d.png`.
- An export **before** completing the exercise said **0/5** region exercises recorded and its completion button was disabled. After setting the toy controls to **18 mm / 75%**, acknowledging missing evidence and completing the exercise, the actual exported Blob said **1/5**, not five protected communities. Filename: `Educational_Scenario_Worksheet_rasuwa_nepal.md`.
- The actual field HUD changed to “🧩 Exercise recorded” and “⚡ EXERCISE COMPLETE”; no “Deployed” tag. The expanded limitations panel said no live observations in the core demo.
- Error/unhandled-rejection/console-error captures during this instrumented interaction path were empty. This does not cover errors before instrumentation or all console/network events.
- All **five** actual regional DEM modules were checked: array shapes, finite elevation values and gradients at every cell, and conversion of their declared domains to scene corners. Four secondary grids declare 38 × 34 km; Rasuwa declares 25.5 × 23.3 km. These are internal consistency checks, not verification of real elevations, surveyed extents or all regional 3D flows.
- Both served JPGs returned **200 image/jpeg** and byte hashes matched the local provenance manifest. This checks file identity, not rights for unrelated local assets.

Durable records: `followup-verification.json`, `worksheet-before-completion.md`, `worksheet-after-completion.md`. The worksheets are real outputs of the app's exporter, not fabricated examples. Browser hooks observed Blob text/download filenames while retaining the real methods; no external warning service was changed.

Browser retention across long tool gaps was unavailable and an asynchronous image-decode RPC timed out. A self-contained scenario with synchronous image-readiness polling completed; an initially incorrect whitespace assertion was corrected to the app's actual “18 mm” unit string. Image-analysis tooling was retried and again returned authorization error 401. The screenshot is a real capture, but a comprehensive visual-art/contrast review remains unperformed.

## Remaining release / judging risks

- Pre-event work: official eligibility must be resolved with organizers before submission.
- No calibrated local NISAR ingestion, quantitative change analysis, quality masks or independent Rasuwa field validation.
- Unverified local image rights/provenance, cultural representation and translations; code license and public source availability need human confirmation.
- No user testing, adoption, institutional agreement, engineering validation or operational readiness.
- Bundle size and broad secondary-region content still warrant future performance/presentation review. No dependency was added to mask these limits.

Readiness assessment: a working, substantially clearer and more scientifically candid educational demonstration. **Not operational-ready or eligibility-certified, and not yet a strong original quantitative-science submission.**
