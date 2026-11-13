# Echoes of Rasuwa: Global Waltz

A pixel-art Earth-observation learning expedition: **compare an observation, ask what it means, seek corroboration, and discuss a possible community response**. React + TypeScript + Vite; the five-region field world and 2D/3D observatory remain available.

## Problem, user and decision

Primary user: a **community-preparedness educator in Rasuwa, Nepal**. The supported decision is **which independent evidence and professional review to request before discussing flood preparedness**—not whether to evacuate, operate a dam, or declare a site safe.

NDRRMA's situation report of 1 September 2026 describes the 26 August avalanche/debris-flood emergency along the Bhote Koshi–Trishuli corridor. This dated, preliminary government report supplies context, not a team measurement or final casualty assessment.[11] ICIMOD also describes the event and says understanding its consequences takes time.[10]

The real radar reference is at **Hubbard Glacier / St. Elias Mountains near the Yukon–Alaska border**, not Rasuwa or the schematic Yukon–Kuskokwim game map. NASA published NISAR acquisitions from **2025-11-26 and 2025-12-08**; judges can compare them interactively.[8] Rasuwa then provides a clearly simulated setting for practicing evidence-to-action reasoning. Do not conflate the locations.

## Selected official 2026 challenge

**Dancing with the SARs**

https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars/

The full description asks for interactive use of NISAR radar data to visualize surface change, make observations understandable, and hypothesize physical drivers.[1]

This prototype integrates actual NASA-published, two-date NISAR **browse imagery** and a guided interpretation exercise. This is a defensible browse-level response, **not** calibrated NISAR product ingestion, original quantitative change detection, or a measured Rasuwa time series. Those remain incomplete. The selection is a local review recommendation, not a verified selection on a registered team's page.

## Judge demo

1. Select **START GUIDED EVIDENCE TRAIL**. Narration and music start off; no traversal, sound or shortcuts required.
2. Read **Problem → Observation**. Move the NISAR wipe with mouse or keyboard. Look for newly green patches and already-green terrain. NASA relates stronger returns to rougher debris-covered surfaces, not hazard probabilities.[8]
3. Open **Evidence**. Distinguish NASA-reported follow-up flights from unverified Rasuwa assets and fictional NPC dialogue. The app has not collected ground truth.
4. Open **Interpretation → Open Rasuwa observatory**. Compare scenario steps, then **SHOW IN 3D**. Relief helps discuss slope–river–settlement relationships. Local radar values are simulation; terrain and elevations illustration. The visible LOS-to-height warp is artistically exaggerated, not measured vertical motion.
5. Return with **Evidence trail / sources**. Open **Possible action → hypothetical action simulator**. Try **18 mm** and **75%** within the author-chosen game ranges, acknowledge missing evidence, complete the exercise and export an **educational worksheet**, not an advisory.
6. Finish at **Limitations**; expand **Data labels, provenance & challenge connection**. Other regions are secondary exploration.

Presenter script / fallback plan: [docs/JUDGE_WALKTHROUGH.md](docs/JUDGE_WALKTHROUGH.md).

## Actual data integrations

| Integration | Actual implementation | Classification and limits |
| --- | --- | --- |
| NASA-published NISAR | Bundled, unchanged rendered images from 2025-11-26 and 2025-12-08 | **Archived observation** at Hubbard Glacier. Visual comparison only; no calibrated pixel-to-unit calculation. Dates, credit, source URLs and checksums: `public/nisar-reference/provenance.json`.[8] |
| NASA POWER climatology | Point API: `PRECTOTCORR`, `GWETTOP`, `GWETROOT`, `T2M`; returned period and retrieval time displayed | **Model output**, not live weather. Rain mm/day, temperature °C, wetness dimensionless—not volumetric %. Five-minute memory cache. Fill/missing values rejected. Unverified local fallback values are **illustration**.[5] |
| NASA GIBS WMTS | Fixed-date VIIRS SNPP optical tile at each region's context point | **Archived observation** when loaded. Regional context, not co-registered to schematic DEM. Unavailable imagery is labeled, not fabricated. |
| NASA EONET v3 | At most 20 open events requested; returned Point geometry, dates and source links displayed | **Reported estimate / curated source report**, not exhaustive local hazards or an operational warning. No invented fallback events.[6] |
| Regional SAR / InSAR / wetness | Procedural raster generation and hard-coded scenario/station values | **Simulation**. No calibrated NISAR, OPERA, GEDI, GRACE-FO, SMAP or ICESat-2 product ingestion or real sensor fusion. |
| DEM, field world, local images | Existing height grid, generated terrain, culture-inspired artwork and unverified assets | **Illustration**. SRTM provenance, survey accuracy and original photo date/permission not established. Characters are fictional, not interviews. |
| Community-action exercise | Author-defined ranges, checkbox, game-visit bonuses | **Simulation**. No engineering or impact model, real gauge, siren, agency or spillway connection. No calculated lives, money or warning time saved. |

No core data item is a **live observation**. A request made today does not make historical imagery or climatology live.

## Scientific limitations

InSAR compares repeat radar phase; orbital/topographic effects, coherence and other errors need treatment before physical interpretation.[9] Backscatter or line-of-sight change is not a unique cause, a full displacement vector, or a disaster-timing prediction. The app is **not an operational warning service**.

No local field validation, adoption, user study, agency partnership or achieved impact is established. Supplied photo labels/credits are not proof of origin. The schematic glacier headwall's precise location and local elevations need confirmation. Cultural representation and translations need consenting local review.

Audit and corrections: [docs/SCIENCE_AND_PROVENANCE.md](docs/SCIENCE_AND_PROVENANCE.md), `docs/claim-changes.json`, [docs/PRE_EDIT_AUDIT.md](docs/PRE_EDIT_AUDIT.md). Additional primary-literature reconciliation is in [docs/SCIENCE_RESEARCH.md](docs/SCIENCE_RESEARCH.md), with a separate evidence ledger; external study estimates are not app measurements.

## Judging / awards case

- **Impact:** a concrete intended educational decision, not measured benefits.
- **Creativity:** pixel expedition, interactive evidence trail and 2D/3D spatial learning.
- **Validity:** explicit provenance and uncertainty; observation separated from interpretation and simulation.
- **Relevance:** actual NISAR browse comparison and verified official description, with analytical work unfinished.
- **Presentation:** direct guided launch, visible controls, optional audio and locally bundled reference imagery.

The strongest current case is **Best Use of Storytelling**, with **Art & Technology** also applicable under the official award descriptions.[4] Local Impact remains potential, not demonstrated impact. Do not claim validated science or original NISAR analytics. Recheck the final 2026 judging guide when available; these are the requested review dimensions, not certification of an unseen rubric.

## Run locally

Node.js 22+ recommended and npm; reviewed with Node 26 and the existing installed dependencies.

```sh
npm install
npm run dev
```

Open the localhost URL Vite prints (normally `http://localhost:5173`). No API key or login required. With dependencies installed, the reference pair and educational scenarios work without external APIs. Keep the local server running; this is not a service-worker/PWA installation.

```sh
npm test
npm run typecheck
npm run build
npm run preview
```

Tests use Node's built-in runner and existing TypeScript/React dependencies; none was added. Scope: numerical simulation-helper fixtures, source/copy/binding guards, server-rendered guide and service parsing/failure tests—not pixel-level renderer, comprehensive scientific or cross-browser validation. Execution evidence and limited browser checks: `docs/qa/REPORT.md`. A large JavaScript chunk warning remains.

## Sources

[1] https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars
[2] https://www.spaceappschallenge.org/resources/participant-faqs
[3] https://www.spaceappschallenge.org/resources/team-formation-guide
[4] https://www.spaceappschallenge.org/awards
[5] https://power.larc.nasa.gov/docs/services/api/temporal/climatology
[6] https://eonet.gsfc.nasa.gov/docs/v3
[8] https://science.nasa.gov/earth/earth-observatory/landslide-and-avalanche-debris-litter-hubbard-glacier
[9] https://science.nasa.gov/mission/nisar/interferometry
[10] https://www.icimod.org/kyirong-rasuwa-flood-2026-nepal-china-border
[11] https://ndrrma.gov.np/mediafiles/rasuwa/Rasuwa_Flood_SitRep_Temp_ENG_01_01092026.pdf
#   n a s a  
 