# Science research and claim audit

**Audit date:** 10 November 2026, Asia/Kathmandu (UTC+05:45). **Scope:** README.md; all four files under `src/data`; read-only inspection of `src/services/nasaEarthDataService.ts` and related claim occurrences. Line references below describe the source snapshot initially read during this audit; concurrent implementation edits may move or remove them. No application code was edited by this researcher.

## Decision summary

- The strongest official 2026 match is **Dancing with the SARs**, not the README's “Earth's Endless Waltz / Through the Radar Looking Glass.” The challenge expressly asks for an interactive application using **NISAR radar remote-sensing data**; an educational pixel-art interface is an appropriate medium but is not itself evidence of NISAR data use.[1][6]
- Rasuwa's 26 August 2026 rock–ice disaster is a documented event, not a fictional future event as of this audit. Its mechanisms and several quantities remain under investigation. Do not label the real disaster itself simulated; label the application's invented radar fields, reconstructions, characters and intervention outcomes simulated.[5][11]
- Some apparently unsupported README numbers have genuine research origins: an NRSC-authored study reports numerous pixels with **>5 m horizontal offset** over 26 July–19 August, and a different study reports **+24.85 mm east / −19.03 mm vertical** medians. They are **different observables, samples and methods**, not one measured NISAR “5.35 m warning” time series.[7][8]
- The “five-meter secret seven days before collapse” framing overstates evidence. The last acquisition was seven days before failure, but its interval integrates 24 days; a newer perspective explicitly cautions that pixel offsets did not statistically resolve pre-failure motion or isolate the final week. Preserve this scientific disagreement rather than claiming a proven, missed operational alarm.[7][29]
- A NASA-published **Hubbard Glacier NISAR browse-image pair** is a defensible real reference for qualitative radar surface-change learning. Keep it separate from Rasuwa's simulation. This audit verifies the reference and its interpretation, **not its implementation in the application**, and does not certify full challenge satisfaction or raw-product analysis.[15]
- **Eligibility risk remains unresolved:** project work before 14 November 2026, 09:00 local time conflicts with the published start-work instruction. The already-developed application predates that window. Do not claim competition compliance, conceal prior work, or imply that a later timestamp fixes this problem.[2][3]

## 1. Official challenge verification

**Official list:** https://www.spaceappschallenge.org/2026/challenges/

The fetched list declares 14 challenges; programmatic extraction found 14 distinct challenge-description URLs. It includes **Dancing with the SARs** under Earth Science, Intermediate/Advanced.[1][6]

**Full strongest description:** https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars/

> “Your challenge is to build an interactive application that uses radar remote sensing data from the NASA-ISRO Synthetic Aperture Radar (NISAR) mission to track and visualize one or more types of surface change at locations around the world.”[6]

> “Second, download freely available NISAR data using the list of resources provided.”[6]

> “The desired outcome is an open-source, user-friendly solution that translates complex radar observations into actionable insights, helping scientists, resource managers, educators, decision-makers, and the public better understand the patterns and rhythms of Earth’s surface at different time steps.”[6]

The description permits a hometown study area, supplementary optical/GIS data, storytelling, interactive maps or sliders, hypotheses about physical drivers, and future applications. Multiple countries, every polarization, dual-frequency analysis and a production warning system are not compulsory features.[6]

| Requirement | Evidence in initially inspected repo | Assessment / correction |
|---|---|---|
| Use NISAR observations | Hardcoded regional numeric series; no acquisition IDs, products, processing records or downloaded Rasuwa radar grids in `src/data`; service integrates POWER, EONET and GIBS, not NISAR | No raw NISAR Rasuwa analysis established by inspection. Describe radar values as simulation. Actual NASA browse imagery can support a **browse-level** demonstration, not processing claims. |
| Track and visualize surface change | Timeline, scenes, scientific explanations; parent proposes the real Hubbard before/after reference | Strong conceptual fit; separately verify that real imagery and source attribution actually appear in the guided path before claiming delivered functionality.[6][15] |
| Understand physical drivers | Roughness, double bounce, dielectric and deformation learning content | Retain bounded explanations, remove universal thresholds and false certainty; distinguish observations from hypotheses.[6][16] |
| Open-source, user-friendly outcome | Local code present, no public repository or license established by this research | Publish source and choose an appropriate license if entering. Do not equate a local folder with a verified public open-source release.[6] |
| Select one official challenge | README names do not match the strongest 2026 title; official team/challenge field is not supplied | Recommend exact title and URL; official team selection and registration remain unknown.[3][6] |

Recommended description: **“Educational EO demo conceptually aligned with Dancing with the SARs: a qualitative comparison of NASA-published NISAR browse observations, plus an explicitly simulated Rasuwa learning scenario. We have not processed raw georeferenced Rasuwa NISAR products or built an operational warning system.”** Do not replace “conceptually aligned” with “fully compliant.”

### Competition dates and restrictions

The Participant FAQs are dated **5 November 2026**; the Team Formation Guide is dated **23 September 2026**. They state a **14–15 November 2026** event, challenge statements available **28 October**, and challenge resources/submission/judging guides available **13 November**.[2][3]

> “However, participants should NOT begin working on their project until the hackathon begins on November 14, 2026 (9:00 a.m. local time) to ensure a fair and equitable process.”[3]

> “To be eligible for Global Judging and Global Awards, teams must respond to one of the challenges.”[3]

> “Each team's project submission must include a description of how SI tools were used during the development of their project.”[2]

**Action:** disclose pre-existing work and ask the Local Lead/organizers for an eligibility ruling before further challenge-specific development. The report documents the risk; it neither makes a final disqualification ruling nor guarantees that reuse is allowed. Team size, same-event registration, official submission, AI/SI disclosure and permissions for any under-18 likenesses also require team-specific checks.[2][3]

## 2. NASA NISAR mission facts and availability

Primary mission page: https://science.nasa.gov/mission/nisar/

Mission overview: https://science.nasa.gov/mission/nisar/mission-overview/

Availability guide linked by NASA: https://hyp3-docs.asf.alaska.edu/nisar-docs/availability-overview/

| Claim | Retrieved evidence / date | Correct bounded wording |
|---|---|---|
| NASA–ISRO joint mission | NASA lists NASA and ISRO, launch **30 July 2025**, and instruments “L-band SAR (24 cm wavelength) and S-band SAR (9.4 cm wavelength)” | Joint NASA–ISRO mission; nominal L-band 24 cm, S-band 9.4 cm. “9 cm” is an approximation, not the precise specification.[4] |
| Revisit and swath | Overview gives 12-day exact repeat, ascending/descending coverage, average revisit around six days and a >240 km swath | A repeating observing mission, not a continuous live camera over one slope. Preserve actual acquisition dates and geometry.[10] |
| S-band over all five demo regions | NASA overview: “L-band Global, S-band (India and over cal/val sites)”; Bhoonidhi says S-band Indian landmass plus global locations according to ISRO's observation plan | Do not promise routine coincident L+S coverage at every Nepal/Brazil/California/Türkiye/Alaska site without product-level confirmation.[10][24] |
| Public data now unavailable / purely prospective | NASA and ASF report provisional L-band release **20 July 2026**; current provisional products cover acquisitions from **17 June 2026**, with supplemental older frames | As of the audit, actual NISAR data exist. The demo may still be simulated because it has not ingested them. Do not conflate mission data availability with application implementation.[4][13] |
| All products validated and operationally dependable | Provisional datasets are calibrated and validated at a limited number of sites, with known issues and further validation/reprocessing planned | Label maturity **PROVISIONAL** where relevant; do not claim full validation or local hazard readiness.[4][13] |
| “Instant”, “within hours” derived damage maps | ASF: “Level 1-3 products have a nominal latency of 36-72 hours.” Level-0 raw products have a different latency | Acquisition wait plus processing/distribution latency matters. NISAR does not guarantee immediate post-event coverage or a fixed evacuation lead time.[13] |
| NISAR observed May / 8 July 2025 baseline | Both dates precede its launch | Those frames cannot be measured NISAR acquisitions. Use historical optical/other-sensor context, or clearly synthetic baseline values.[4] |

Do not silently apply the instrument's finest advertised resolution to derived products: geocoded displacement, multilooking and browse images can be much coarser. The Rasuwa study with +24.85/−19.03 mm used an **80 m** final ascending LOS product and a derived geographic grid with roughly 75.3 × 85.3 m cells.[8]

## 3. Real NISAR reference: Hubbard Glacier

**Primary NASA page:** https://science.nasa.gov/earth/earth-observatory/landslide-and-avalanche-debris-litter-hubbard-glacier/

**Publication:** NASA Earth Observatory Image of the Day, **25 February 2026**. **Observations:** **26 November 2025** and **8 December 2025**, 12 days apart. **Event:** magnitude 7.0 earthquake on **6 December 2025** in the St. Elias Mountains, spanning the Yukon–Alaska border.[15]

> “The debris is visible in radar imagery acquired by NISAR on December 8, two days after the quake (right). For comparison, the NISAR image on the left shows the same area on November 26, a week and a half before the quake.”[15]

### Exact legend meaning

> “Where the slides have deposited rock, snow, and other debris, surfaces have become rougher, which scatters more energy back toward the sensor and makes those areas appear bright in the December 8 image (the roughest areas are shown in dark green).”[15]

> “Areas with smooth surfaces reflect little of the radar’s energy directly back to the satellite sensor, so these parts of the images appear dark (shown in purple).”[15]

> “Note that there are some exceptionally rough, green surfaces beyond the new slide areas that remain relatively unchanged between the two images.”[15]

**Use:** dark green denotes relatively rough/high-return surfaces in this rendering; purple denotes smooth/low-return surfaces. New or enlarged green areas between the pair support NASA's debris/roughness interpretation. **Not every green pixel is a new landslide**, and the colors are false-color rendering, not natural color, centimeters of motion, soil moisture, building damage or measured probabilities.[15]

### Exact credit

The visible caption credit is **“NASA Earth Observatory / Lauren Dauphin.”** The fuller attribution is:[15]

> “Images by Eric Fielding and Gustavo H. X. Shiroma (JPL) of the NISAR Algorithm Development Team using data from the NISAR GSLC product, and prepared for NASA Earth Observatory by Lauren Dauphin. Story by Kathryn Hansen.”[15]

Use the fuller credit in the evidence/reference panel, and retain the original dates and source link. NASA links the underlying **NISAR GSLC BETA** catalog from this publication; do not relabel this published reference as a freshly generated provisional displacement analysis.[15][13]

### Exact image URLs retrieved from NASA

Wide scene before:
https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/iotd/2026/landslide-and-avalanche-debris-litter-hubbard-glacier/hubbardearthquakewide_nisar_20251126.jpg

Wide scene after:
https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/iotd/2026/landslide-and-avalanche-debris-litter-hubbard-glacier/hubbardearthquakewide_nisar_20251208.jpg

Zoomed before:
https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/iotd/2026/landslide-and-avalanche-debris-litter-hubbard-glacier/hubbardearthquakezoom_nisar_20251126.jpg

Zoomed after:
https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/iotd/2026/landslide-and-avalanche-debris-litter-hubbard-glacier/hubbardearthquakezoom_nisar_20251208.jpg

NASA downloadable full scenes:
https://assets.science.nasa.gov/content/dam/science/esd/eo/images/iotd/2026/landslide-and-avalanche-debris-litter-hubbard-glacier/hubbardearthquake_nisar_20251126_lrg.jpg

https://assets.science.nasa.gov/content/dam/science/esd/eo/images/iotd/2026/landslide-and-avalanche-debris-litter-hubbard-glacier/hubbardearthquake_nisar_20251208_lrg.jpg

All six links above are from the primary page, not guessed filenames.[15]

### Crucial limitation

NASA explains that ground-displacement interferograms are not possible **in this case** because the ground lies beneath at least 700 m of glacial ice: “The cryosphere is covering up the geosphere.” This reference demonstrates surface backscatter/roughness change, **not earthquake ground-motion InSAR**.[15]

Appropriate guided question: **“What changed from purple/low return toward green/high return, and how could deposited rough debris explain it? Which green areas were already present before the earthquake?”** Claim only qualitative browse-level change demonstration. No calibrated dB differences, georeferenced area/volume calculations, raw GSLC processing, automated landslide classification or Rasuwa early-warning validation is established by displaying JPEGs.[15]

## 4. Rasuwa: source reconciliation, not one authoritative-looking number

### 4.1 Event identity and chronology

The **8 July 2025** flood is associated with sudden drainage of a supraglacial lake on **Purepu Glacier in China**, approximately 35 km upstream of the Nepal–China crossing and at approximately 5,150 m elevation. The **26 August 2026** event originated in the Langtang Lirung rock–ice source zone in Nepal and is not a conventional GLOF. They share a downstream corridor but **are not the same glacier, source point or failure mechanism**.[27][11]

The NRSC-affiliated study places the 2026 source near **28.29°N, 85.53°E**, elevation approximately **5,130 m**; the ICIMOD synthesis describes approximately **5,200 m** and names Langtang Lirung, a **7,227 m** peak. Repo source-zone labels “Purugu / Langtang Lirung”, “5,366 m” and “7,160 m” need geographic reconciliation, not cosmetic respelling.[7][11]

ICIMOD reports collapse around **08:37 Nepal Standard Time**, arrival in the border corridor within approximately **seven minutes**, and SMS alerts around **09:15–09:16** after that corridor had been impacted. The narrator's “mountain roared at night” is incompatible with this morning event if presented as a witness account.[5]

### 4.2 Deformation: distinguish three evidence chains

| Source / publication date | Verbatim or precisely attributed finding | Meaning / uncertainty |
|---|---|---|
| ICIMOD synthesis and press release, **13 October 2026** | Sentinel-1: up to **40 cm LOS** over **7 July–24 August 2026**; synthesis also mentions NISAR up to **~30 cm LOS** over **26 July–19 August**, explicitly attributed to Quinn Brencher on LinkedIn | Sentinel-1 result is not NISAR. The NISAR figure is a synthesis of a reported analysis, not a downloaded and independently verified application raster.[5][11] |
| Roy et al., Journal of the Indian Society of Remote Sensing, **16 October 2026**; NRSC/ISRO authors | “with numerous pixels exceeding 5 m of cumulative horizontal offset” in the final **26 July–19 August, 24-day** interval, **Track T098 ascending** | Amplitude pixel-offset displacement, not interferometric phase, not a single value of 5.35 m, and not seven-day temporal resolution. Article acknowledges coherence loss and phase-unwrapping limits in its InSAR analysis.[7] |
| Kutoğlu, Softa and Akgün, Remote Sensing, **29 October 2026** | “median eastward and vertical displacements are +24.85 and −19.03 mm within the sampled possible detachment” | Median estimates for **28 paired pixels** in the sampled detachment relative to an exterior ring, using ASC **26 July–19 August** and DES **23 July–16 August**. Not point telemetry from a beacon and not an NRSC-authority validation of the app's numbers.[8] |
| Silwal and Dahal, npj Natural Hazards perspective, **3 November 2026** | “at Rasuwa, satellite pixel offsets did not statistically resolve pre-failure motion or isolate the final week before the collapse” | A newer scientific caution about statistical detectability and forecasting. Cite alongside the earlier >5 m finding; do not hide the conflict or convert it into a claim that all deformation was absent.[14][29] |

The MDPI study also finds that its high-coherence positive LOS cluster **does not overlap** the possible detachment and is separated from its boundary by **1.393 km**. It discusses incomplete sampling, geometry, reference dependence and spatial uncertainty. Thus “clear coherent fringes throughout the detachment core” and “L-band prevented decorrelation” are not justified.[8]

### 4.3 Volume and descent

Roy et al. estimate initial detached volume **~99 ±10 million m³** using mapped source area and mean depth. ICIMOD estimates **~132 million m³**, including approximately 115 million m³ rock and 17 million m³ glacier ice. These are distinct estimates/methods; do not silently harmonize them into one exact volume.[7][11]

Roy et al. describe approximately **1,300 m initial free-fall**, then an additional approximately **870 m descent** and approximately **5.9 km runout to Lhende Khola**. “Plunged 2,100 vertical meters” should not imply a single free fall. Distinguish initial detachment, impact, entrainment, debris-flow transformation and further downstream flooding.[7]

Safe short copy: **“A large rock–ice collapse on 26 August 2026 triggered a cascading debris flood. Published source-volume estimates differ, around 99 ±10 to 132 million m³. Post-event studies report deformation before failure, but it did not establish an exact collapse forecast.”**[7][11][29]

### 4.4 Human impact: use date and categories

Primary Government of Nepal source:
https://ndrrma.gov.np/mediafiles/rasuwa/SitRep_ENG_20_21092026.pdf

**Situation report 20, 21 September 2026, 19:00**, records **1,451** under recovered/rescued bodies/deaths reporting, **5,745 missing**, and **13,784 rescued**. Its deceased detail includes **530 human body remains**, separate from female/male categories; DNA identification and missing-person verification are ongoing.[12]

ICIMOD repeats **1,451 deaths / 5,745 missing** in its 13 October release, but the synthesis explicitly dates those totals to **21 September**. A later publication date is not automatically a later casualty count.[5][11]

**Correction:** present these as dated, provisional reported categories; do not turn partial remains into a verified unique-person death count, combine Nepal and China indiscriminately, attach all basin-wide deaths to Timure, or call “13,000 rescued” proof of a NISAR-enabled rescue program. Avoid sensational invented survivor testimony.[11][12]

### 4.5 Economic impact: scope and estimate maturity

The Nepal Economic Forum's **24 September 2026** analysis of the RDNA reports **NPR 274.48 billion direct damage**, **NPR 133.81 billion economic loss**, **NPR 408.29 billion total effects**, and **NPR 723.32 billion recovery needs** for the five-district assessment (Rasuwa, Nuwakot, Dhading, Gorkha and Chitwan). It gives corresponding approximate USD totals of **$2.70B total effects**, **$1.81B direct damage**, and **$4.78B recovery needs**.[26]

The **5 October 2026** Tribhuvan University presentation hosted by Tohoku University's IRIDeS corroborates the broad totals and explicitly calls the figures preliminary pending the full PDNA. It is a secondary university presentation, **not the official assessment itself**.[23]

**Corrections:** keep damage, lost economic activity and recovery need separate; call USD values approximate/source-converted, not today's exchange-rate calculation. Do not assign the full $2.7B to one dam or bridge. The audit did not establish the specific **NPR 79.17B private household/livelihood** claim or the **$1.66B lower endpoint** used in the README; remove those or cite an exact applicable assessment edition. “Recovery needs topping $4.8B” is stronger than the retrieved approximate $4.7–4.8B estimates.[23][26]

## 5. Claim-by-claim correction register: Rasuwa and radar physics

**Status legend:** Supported = bounded external evidence; Partial = source exists but repo interpretation overreaches; Unsupported = not established in retrieved sources or local data lineage; Simulated = explicit illustrative content, not measurements. “Unsupported” is not a claim that something has been proven impossible.

| ID / local occurrence | Claim | Status / correction |
|---|---|---|
| R01 — README:3 | Challenge “Earth's Endless Waltz / Through the Radar Looking Glass” | **Wrong 2026 identification.** Use exact **Dancing with the SARs** title/URL and retain eligibility caveat.[1][6] |
| R02 — README:8–11; story:29–45,117–133 | 2025 and 2026 corridor disasters | **Supported, distinct events.** Separate Purepu supraglacial drainage from Langtang Lirung rock–ice failure.[11][27] |
| R03 — story:55–111,464–486; README:11 | Exact “>5.35 m”, June20 start, Aug19 missed warning | **Partial/unsupported precision.** >5 m appears in one study; exact 5.35 m does not. Cite interval, track, amplitude-offset method and statistical caution, not an operational alarm.[7][29] |
| R04 — story:101–105,468; README:11 | +24.85 East / −19.03 vertical “detachment fringes” | **Real source, wrong attribution/scope.** Median paired-pixel component estimates from a different study, 24-day windows, exterior-ring reference. Do not interpolate as point beacons or merge with offset metrics.[8] |
| R05 — timeline numeric fields, all passes | Cloud %, soil moisture %, discharge multiplier, creep, power-operation %, East/Vert measurements | **Simulated absent lineage.** Label every displayed field synthetic; numerical precision does not make it observational. Prelaunch NISAR values are impossible as mission acquisitions.[4] |
| R06 — station baseline/precursor/catastrophe metrics | Exact HH/HV dB, coherence, bank/road settlement, channel +140 m, aggradation +8 m | **Unsupported as local measurements.** No raw radar product, pixel sampling, grid, date pair, calibration or uncertainty accompanies them. Use “illustrative” values, not “measured/verified”. |
| R07 — story:121–133,466,505; README:11 | 99 million m³ and 2,100 m plunge | **Partial.** Retain ~99 ±10 as an attributed estimate; disclose ~132 estimate and staged descent rather than one plunge.[7][11] |
| R08 — story:79,466; atlas:313 | Heat/permafrost thaw proved cause | **Unconfirmed mechanism.** Geological weaknesses, glacier change and possible permafrost degradation are hypotheses/conditioning factors; warming alone does not demonstrate the immediate trigger.[5][11][29] |
| R09 — story:145–155; quests:248–260 | Live early-warning relay, “no valley ever caught unawares” | **Unsupported operational/absolute promise.** Toy educational simulation; not connected to authorities/sirens and cannot guarantee collapse timing.[5][29] |
| R10 — atlas:326–363 | 18 mm/12d +72% thresholds, +95 min lead, 4,850 protected, $185M saved | **Simulated, not evidence-based safety criteria.** Label game thresholds and scores; do not use them as evacuation, dam gate or engineering instructions. No performance study supports them. |
| R11 — story:294–305 | Coherence <0.20 instantly pinpoints damaged neighborhoods “within hours” | **Overstated.** Coherence change is a possible surface-change proxy, also affected by snow, moisture, vegetation, geometry and processing. Acquisition/processing latency prevents guaranteed immediacy.[13][8] |
| R12 — story:178–189,421; global:544–551 | Smooth water often dark; water–wall/tree double bounce often bright HH | **Supported qualitative teaching.** Conditions/geometry matter. Exact −21 or +3/−4/+4.1 dB values are illustrative without calibration and local sampling; water does not universally appear dark or urban floods universally bright.[15][16] |
| R13 — story:236–247; photo:136 | S-band uniquely reads crop leaves/top-5 cm moisture; saturated soil ε≈80 | **Overgeneralized/unsupported precision.** Both bands respond to roughness, vegetation and dielectric properties. Do not use bulk-water ε as a measured soil dielectric or percent saturation; do not claim a unique universal penetration depth. S-band coverage must be checked.[16][10][18] |
| R14 — story:479 | λ/2=12 cm L-band vs 2.8 cm C-band “prevents phase aliasing (‘decorrelation’)” | **Correct illustrative fringe scale, wrong conclusion.** Tool calculation gives 12 and 2.8 cm for the stated wavelengths. Phase wrapping/aliasing and decorrelation are different problems; longer wavelength does not guarantee coherent fast-slip measurements.[28][7][8] |
| R15 — story:471–479 | Only NISAR L-band can see through monsoon clouds | **False exclusivity.** Cloud/night capability is a SAR advantage, not uniquely L-band; ICIMOD's Sentinel-1 measurements are a concrete counterexample.[6][5] |
| R16 — photo:106; atlas:200; story:468 | Ascending+descending “resolve” shadow and yield all motion components | **Conditional.** Additional looks can improve visibility; they cannot recover every hidden canyon surface. Two LOS views yield constrained components under assumptions, not unrestricted 3D motion. Report geometry, masks and north–south assumptions.[8][28] |
| R17 — story:363 | “Continuous” 240 km upstream monitoring | **Wrong temporal implication.** Swath is spatial coverage; exact repeat is 12 days, not continuous telemetry.[10][13] |
| R18 — story:196,254,370; quests rewards | Thousands would have had days; orbital soil moisture warns before failure; national priority already adopted | **Unsupported deployment/counterfactual.** Use prospective monitoring and closer field observation wording, not proven lives saved or official policy endorsement.[5][29] |
| R19 — atlas:303–304,409–410,668–669,927–928,1190–1191 | Optical sees 5–14%, SAR sees 91–96% | **Invented performance metrics.** No metric definition, validation dataset or comparison experiment. Remove or explicitly show as gameplay values, never sensor accuracy. |
| R20 — atlas integrity profiles | Caveats elsewhere cure all factual-looking copy | **Insufficient disclosure.** A regional badge saying “simulated” does not neutralize specific “verified”, “ground-truth”, “recorded”, “live” or “operationalized” assertions in quests/photos/dialogue. Keep the label next to each synthetic visualization and score. |
| R21 — atlas:294–295; quests:255 | Dr. Rudra / DHM–NISAR center and official agency job titles | **Fictional unless independently verified.** Label characters/institutions fictional, inspired by a region; named agencies are context, not project partners or endorsers. |
| R22 — quests:212–215,242–245 | Survivor testimonies and ground-truth permafrost fractures documented by player | **Unsupported evidence.** Scripted dialogue/game actions are not real interviews, field observations, consented testimony or validation. Rename narrative/learning outcomes. |
| R23 — README:30; `rasuwaDem.json` | Real SRTM terrain 1,310–7,160 m | **Origin unverified; local extent discrepancy.** JSON is 148 rows ×160 columns and observed/stored min/max are **1,310/7,216 m**. It contains bounds and heights but no dataset ID, tile IDs, datum, resolution, acquisition date, preprocessing or license. Retain stylized terrain, disclose missing DEM lineage; do not call its sampled maximum the summit height. |

## 6. Photograph provenance and corrections

Local inspection finds **10 Rasuwa photo records** and **9 extra global photo records**. These are asset counts, not a count of independently authenticated disaster captures. General scene photos cannot prove event-specific radar values, dates or rescue outcomes.

| Asset / record | Retrieved provenance | Correction / residual uncertainty |
|---|---|---|
| `landsat_rasuwa_flood_2026_08_26.png`, `photo_landsat_after_2026` | Commons page identifies **26 August 2026**, **Landsat 9 via USGS, processed by User:Chorchapu**, source USGS EarthExplorer; public-domain federal-data attribution.[21] | Cite exact file page and processor, not generic “NASA / USGS via Commons.” A Landsat observation is optical, not NISAR or direct proof of pre-failure radar slip. OLI-2 and exact “hours after” metadata should be tied to a scene ID before stated precisely. Local asset is 960×548; remote original 1,918×1,094. Pixel/byte identity was not verified. |
| `nepal_flood_2026_before_after.webp`, `photo_optical_before_2026` | Commons describes an **animation combining Sentinel-2 pre-event 24 August and Landsat post-event 26 August**; derivative creation **27 August 2026**, ESA and USGS; exact attribution “Contains modified Copernicus Sentinel data 2026”.[20] | **Not a single pre-event photo.** The local WEBP has two frames. Show both dates and mixed sensors; include Copernicus modification notice and source processor/derivative credit. The pre-event source link is a Commons redlink in the fetched page; primary scene metadata remain unresolved. |
| `gyirong_rasuwagadhi_mudslide_2025.png`, `photo_mudslide_border_live` | Candidate source Commons **2026 Nepal floods.gif**, says **26 August 2026, 10:59:51**, author **Fixed camera**, extracted from **Mudslide at Gyirong Port 2.webm**, sourced to https://x.com/resoundnews/status/2092542957060841592.[22] | Local filename containing 2025 does **not** prove a 2025 capture. Repo's 10:59:53 might be another frame but is not verified. The candidate CCTV clock/timezone is not the independently established 08:37 NPT source-failure time. Do not infer timezone or exact Miteri-bridge position from the clock. Source identity remains candidate, not pixel-confirmed. |
| CCTV public domain credit | Commons uses **PD-automated**, but explicitly says most jurisdictions lack clear precedent.[22] | Attribute the uploader/source and state Commons' classification; do not present universal copyright clearance as a legal certainty. |
| `chilime_hydropower_dam.jpg` linked to Rasuwagadhi-headworks station | Filename suggests Chilime; repo text combines several hydropower projects | Separate an illustrative corridor/dam photograph from an authenticated image of a particular 111 MW facility. No exact file-page identification was supplied. |
| Fort, customs, houses, confluence, glacier and spacecraft photos | Generic Commons/NASA/USGS credits only in records | Add exact original file page, author, date, license URL/version and changes for each. “CC BY-SA 3.0” alone is not attribution; “via Commons” is not provenance. No claim of complete verification is justified. |
| All photo `nisarCorrelation` numeric fields | Narrative numbers, no paired radar products | Treat as physical interpretation hypotheses or illustrative examples, not measured correlation with the photographed scene. |

**Retrieval limits:** image vision calls failed with authorization errors; local image dimensions/frame counts were read with Pillow. Direct Wikimedia originals and an alternate thumbnail returned HTTP 403, preventing pixel matching. No invented OCR or visual inspection is used in this report. Commons metadata establish candidate sources, not forensic confirmation of the local crops.

## 7. Global-region claims: preserve optional lessons, remove fabricated outcomes

These entries are secondary to a focused Rasuwa/Hubbard demonstration. Their hardcoded metrics should remain visibly simulated if retained. Basic physical mechanisms can be taught without claiming locally measured 2026 phenomena.[16]

| ID / region and occurrence in `globalRegionsAtlas.ts` | Claim | Evidence / correction |
|---|---|---|
| G01 — helper:240–270 | Regional East/Vert measurements from real repeat passes | **Simulated by code.** `insarEastMm = round(input×42)` and `insarVertMm = −round(input×65)` derive from an input, not radar geometry/phase. `orbitPass` labels are generated and dates do not form a uniform 12-day series. Do not call them observations. |
| G02 — Brazil:101–119,414,420 | 35–45% biomass loss while 95% green; −3.8 dB HV identifies logging months early; optics reflect only top 2 mm | **Unsupported site-specific numbers and absolutes.** HV can be sensitive to vegetation volume scattering; optical methods also detect some disturbance. Do not claim a universal invisibility/degradation threshold.[16] |
| G03 — Brazil:422 | Biomass saturation always at 150–200 Mg/ha | **Unverified universal cutoff.** Keep qualitative saturation/ambiguity and need for independent data; cite a region/method-specific study before retaining exact range. |
| G04 — Brazil:573–592,464–469 | Local peat channels, buried fire risk, ten check-dams save 14,200 ha /1.8M tonnes/1,900 families | **Simulated ecology/intervention/outcomes.** No site peat survey, carbon accounting, intervention model or community authorization provided. Do not infer peat-water-table observations from coarse POWER indices. |
| G05 — California:144–151,741,843 | Joseph Poland historic pole at Tulare/Corcoran, “1925–2026” measurement | **Correct historical phenomenon, incorrect location/date framing.** USGS: signs show **1925,1955,1977**, site southwest of **Mendota**. It is not a 2026 NISAR benchmark or evidence of uniform whole-valley sinking.[19] |
| G06 — California:662–679,818–880 | −28 cm/yr everywhere, 60% canal-capacity loss, 25% US food, exact 54 cm sag | **Unverified values in this audit.** Specify study, area, period and metric denominator or remove; optical invisibility is not absolute. Coherent L-band/InSAR does not guarantee every orchard pixel.[28][16] |
| G07 — California:681–686,835–839 | GRACE-FO directly measures the particular aquifer's groundwater loss | **Method caveat needed.** Do not claim parcel/well-scale or direct isolated groundwater observation without regional water-budget separation and product resolution. No GRACE product is actually provided in inspected data. |
| G08 — California:707–728,815,844 | 75% drip +110–180 TAF recharge arrests compaction, 38% pumping cut, wells +4 m,1,240 saved | **Invented intervention results.** No groundwater model, water budget or observed implementation. Do not promise automatic recovery of inelastic storage or claim all drip conversion reduces total basin extraction. |
| G09 — Türkiye:182,913,1147–1150 | 2023 archive earthquake reenacted as measured **6 February 2026** NISAR rupture | **Chronology conflict.** Historical imagery is not a new 2026 earthquake. NISAR was not launched in 2023. Label any 2026 reenactment fictional, or preserve the actual historical event/date with its actual sensors.[4] |
| G10 — Türkiye:943,958–987 | “OPERA Coherence Damage Proxy (RTC/DISP)” for Hatay within six hours | **Unverified product identity, coverage and latency.** No specific OPERA product supplied; do not equate backscatter RTC/displacement products with a dedicated damage proxy or promise global coverage/immediacy. |
| G11 — Türkiye:940,1062–1069 | SAR cannot certify interior building safety | **Retain this limit.** It is appropriately cautious; it does not validate unrelated invented strain, damage or dispatch values. |
| G12 — Türkiye:978,982–987,1139–1140 | A six-metre drawdown prevents breach,22,000 protected,18 hours saved | **Simulated high-stakes engineering advice.** No dam identity, hydrology, structural/geotechnical assessment, outlet capacity or safe drawdown study supplied. Do not give numeric operations guidance. |
| G13 — Alaska:1186–1203,1371–1373 | Local 3–9 cm thaw /15 m-year retreat /20-hour polar twilight prove instability | **Unverified local rates; overbroad geography and light claim.** Need acquisition season, latitude-specific daylight and field surveys. Wet surfaces/geometry complicate deformation interpretation. |
| G14 — Alaska:233,1245–1250,1389–1406 | Multi-year NISAR proves eastern ridge safe for generations;180 m setback yields40 years | **Unsupported safety guarantee.** Mission launch July2025 limits available record; no geotechnical survey or multi-year product inventory supplied. Call a fictional planning exercise, not verified siting.[4] |
| G15 — all scientific profiles/interventions | GEDI, GRACE-FO, SMAP, ICESat-2,GNSS,boreholes fused live | **Prospective only absent actual data files/API integration.** Naming complementary datasets does not establish download, processing, co-registration, uncertainty propagation or ground validation. |
| G16 — all cultural/personnel labels | “Authentic” cultures, named scientists and INPE/IBAMA/USGS/AFAD/ABoVE affiliated labs | **Unverified representational/endorsement claims.** Label fictional/composite characters, seek community-informed review and avoid implying consultation, partnerships or agency authorization. |

## 8. Live-data provenance: POWER, GIBS and EONET are not NISAR

Read-only service inspection finds a **POWER climatology** request, an **EONET open-events** request and an optical **GIBS true-color** tile URL builder. None ingests a georeferenced NISAR product.

| Claim / service occurrence | Correction |
|---|---|
| `LIVE NASA POWER` in atlas; service:219 | A live HTTP retrieval of climatology is **live retrieval of a historical climatological product**, not real-time monsoon, soil, glacier or gauge telemetry. Display data period and retrieval time separately. The official documentation explicitly distinguishes climatology products and grids.[17] |
| POWER `GWETTOP/GWETROOT` treated as percent saturation or direct S-band observations | These are modeled **wetness-fraction** variables, distinct from volumetric moisture parameters. They are not local radar-derived percent saturation, observed peat water tables or pore pressure.[18] |
| Coarse grid mapped onto exact terraces, glacier permafrost temperature and dam gate triggers | Spatial resolution and model-grid elevation matter. Official metadata describe a MERRA-2 meteorological grid of ½°×⅝° and higher-resolution pathways; the application's standard climatology call is not a borehole or slope-scale measurement.[18] |
| `FALLBACK_POWER` comment: “verified exact snapshots” | No saved API response, request timestamp, climatological period/version or reproducible comparison is attached. Treat as unverified hand-entered reference values pending a real response/archive comparison. This audit did not verify each fallback number. |
| `FALLBACK_EONET` IDs such as `EONET_GLOF_NEPAL`, `EONET_ANATOLIA_SEISMIC` | Locally authored objects, no source URLs or authentic event lookup established. Label synthetic placeholders, not “NASA EONET Reference Snapshot.” An online event list alone does not authenticate these IDs. |
| GIBS photos prove all optical data blocked at fixed cloud % | GIBS true-color is optical context, not radar; a tile is not a measured regional cloud fraction or sensor success-rate experiment. Preserve actual layer/date/geographic extent; do not fabricate cloud percentages. |
| One `isLiveApi=true` badge certifies every displayed value | Service allows some fields to fall back to hardcoded numbers on an otherwise successful response. Provenance must be field-specific or state mixed-source content plainly. |

## 9. Judge-safe disclosure and acceptance checks

Recommended persistent disclosure:

> **Educational demo — not an early-warning or engineering decision tool.** Rasuwa radar fields, thresholds, characters and intervention outcomes are illustrative simulations. The Hubbard reference uses NASA-published NISAR browse imagery dated 26 November and 8 December 2025; we demonstrate qualitative surface-change interpretation, not raw georeferenced radar processing. Historical disaster facts are cited, estimates are dated and uncertain, and no NASA/ISRO/DHM endorsement is claimed.

Before any judged release:

1. Resolve pre-event work eligibility with organizers; retain the disclosure and do not backdate work.[3]
2. State exactly one official challenge and verify the team-page selection; describe browse-level versus raw-data use honestly.[3][6]
3. Verify the Hubbard image pair, dates, false-color explanation, full credit and working source link in the actual guided path. Keep pre-existing green terrain distinct from new green patches.[15]
4. Label every synthetic graph, beacon metric, timeline pass, score and fictional dialogue at point of use. Do not leave “verified 5.35 m”, “operationalized sirens” or guaranteed protection in hidden quests or photo descriptions.
5. Use dated Rasuwa totals and definitions.[11][12]

   Disclose scientific disagreement on deformation and volume; do not manufacture certainty by combining unrelated studies.[7][8][29]
6. Document exact asset file-page attribution and permissions, DEM lineage, live API response period and synthetic fallbacks. Research provenance does not imply agency endorsement.
7. Do not claim product processing, validation, deployment, rescue impact or raw NISAR Rasuwa ingestion without artifacts and an exercised, reproducible workflow.

## Research limits and deliverable verification

No raw Rasuwa radar products, calibrated local retrievals, authenticated survivor interviews, operational siren/dam integrations, geotechnical safety assessments or measured intervention outcomes were verified. The audit assessed claims and documentary sources, not application runtime behavior. The parent agent's intended Hubbard integration is a proposed implementation, not a completed feature verified by this researcher.

The report's numbered sources are managed in `docs/research-ledger.json`, separate from the parent agent's `docs/sources-ledger.json`. Verbatim evidence was attached from saved retrieval text. Some uncited retrieved records remain in the ledger for traceability; they do not support an uncited claim by default. Source blocks and citation/evidence verification are generated by the grounded-citations helper, not manually renumbered.

## Sources

[1] https://www.spaceappschallenge.org/2026/challenges
    > "Choose from 14 challenges for you and your team to address at this year's hackathon!"
[2] https://www.spaceappschallenge.org/resources/participant-faqs
    > "The [2026 NASA Space Apps Challenge](https://www.spaceappschallenge.org/2026/) will take place November 14-15, 2026."
    > "October 28: Challenge Statements available."
    > "Each team's project submission must include a description of how SI tools were used during the development of their project."
[3] https://www.spaceappschallenge.org/resources/team-formation-guide
    > "However, participants should NOT begin working on their project until the hackathon begins on November 14, 2026 (9:00 a.m. local time) to ensure a fair and equitable process."
    > "To be eligible for Global Judging and Global Awards, teams must respond to one of the challenges."
[4] https://science.nasa.gov/mission/nisar
    > "L-band SAR (24 cm wavelength) and S-band SAR (9.4 cm wavelength)"
    > "NISAR Provisional Data Released on July 20, 2026

These L-band data products are fully calibrated and have undergone validation at a limited number of sites around the world."
[5] https://www.icimod.org/press-releases/second-major-himalayan-flood-in-seven-weeks-raises-new-questions-about-mountain-risk
    > "Sentinel-1 InSAR satellite observations recorded up to 40 centimetres of line-of-sight deformation between 7 July and 24 August 2026, indicating measurable movement of the slope before failure. The disaster killed at least 1,451 people and left 5,745 people missing in Nepal, according to the National Disaster Risk Reduction and Management Authority. Chinese authorities reported 43 deaths and 519 people missing.

The report, [Understanding the Gyirong–Rasuwa disaster of 26 August 2026](https://icimod-my.sharepoint.com/:b:/g/personal/sumaharjan_icimod_org/IQC3w9i4DGUwR6KrcmFyKyzYAdsV2D8dNAkoflCgDoxcYFc?e=G29xNE) was launched today by Pema Gyamtsho, Director General of ICIMOD, at Nepal’s National Conference on Disaster Risk Reduction, where policymakers, practitioners and researchers gathered to discuss lessons from recent disasters and emerging risks across the Himalaya.

The finding comes as scientists investigate a recent flood in the Budhi Gandaki basin, where satellite imagery has confirmed another ice-rock avalanche and glacier collapse . Assessments of the event sequence, impacts and implications for future risk reduction are continuing. Researchers say the two disasters, occurring within seven weeks of each other, highlight the growing challenge of cascading mountain hazards across the Himalaya.

Published today in [Understanding the Gyirong–Rasuwa disaster of 26 August 2026](https://icimod-my.sharepoint.com/:b:/g/personal/sumaharjan_icimod_org/IQC3w9i4DGUwR6KrcmFyKyzYAdsV2D8dNAkoflCgDoxcYFc?e=G29xNE): A preliminary synthesis, the analysis found significant ground deformation at the collapse site before an estimated 132 million cubic metres of rock and glacier ice detached from the northern face of Langtang Lirung and plunged into the Lhende Khola valley.

Sentinel-1 InSAR satellite observations recorded up to 40 centimetres of line-of-sight deformation between 7 July and 24 August 2026, a 48-day period before the collapse, suggesting progressive destabilisation of the rock and ice mass prior to failure."
    > "Researchers caution that the observed movement could not have predicted exactly when the collapse would occur."
    > "Approximately 132 million cubic metres of rock and glacier ice detached from Langtang Lirung."
    > "No single trigger has yet been confirmed."
    > "The collapse occurred at 08:37 Nepal Standard Time and the debris surge reached the border corridor within approximately seven minutes. SMS alerts were issued at approximately 09:15 to 09:16, around 25 to 30 minutes after the corridor had already been impacted."
[6] https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars
    > "Your challenge is to build an interactive application that uses radar remote sensing data from the NASA-ISRO Synthetic Aperture Radar (NISAR) mission to track and visualize one or more types of surface change at locations around the world."
    > "Second, download freely available NISAR data using the list of resources provided."
    > "The desired outcome is an open-source, user-friendly solution that translates complex radar observations into actionable insights, helping scientists, resource managers, educators, decision-makers, and the public better understand the patterns and rhythms of Earth’s surface at different time steps."
[7] https://link.springer.com/article/10.1007/s12524-026-02611-x
    > "The resulting value of ~ 99 (± 10) million m³, estimated using pre event DEM, should therefore be regarded as an approximate estimate of the initial detached mass rather than the final transported or deposited volume,"
    > "In the final, longer 26 July–19 August interval (24 days), the failure zone displays the largest and most spatially extensive displacement vectors of the entire series,"
    > "with numerous pixels exceeding 5 m of cumulative horizontal offset and a coherent downslope flow pattern extending across nearly the full width of the mapped escarpment"
    > "However, given the steep terrain and dynamic surface conditions, the InSAR results are subjected to coherence loss and phase unwrapping limitations."
[8] https://www.mdpi.com/2072-4292/18/21/3727
    > "P4 spans 24-day windows ending on 19 and 16 August 2026."
    > "Relative to the surrounding terrain, median eastward and vertical displacements are +24.85 and −19.03 mm within the sampled possible detachment mapped by the United Nations Satellite Centre (UNOSAT), compared with +41.05 and +33.12 mm in the neighboring LOS deformation area."
    > "The positive ascending LOS feature contains 203 pixels (1.2992 km2) at LOS ≥ +50 mm and γ ≥ 0.30, with median LOS +63.01 mm and median coherence 0.799."
    > "The cluster does not overlap D; its minimum footprint-to-boundary separation is 1.393 km."
[10] https://science.nasa.gov/mission/nisar/mission-overview
    > "L-band Global, S-band (India and over cal/val sites)"
[11] https://lib.icimod.org/records/qdvc1-tc123/files/Understanding_the_Gyirong%E2%80%93Rasuwa_disasterof26Aug2026.pdf?download=1
    > "All mechanisms 
discussed remain working hypotheses and require verification through field 
investigations, high-resolution comparison between pre- and post-event terrain, 
and reconciliation of seismic, satellite, meteorological, and streamflow-gauge 
records."
    > "Similarly, pre-event LOS displacement 
of up to ~30 cm was observed using NISAR InSAR 
over 26 July–19 August 2026 (a 24-day period) across 
the same area, as reported by Quinn Brencher on 
LinkedIn (not shown here)."
    > "although its presence at the 
exact failure surface cannot be confirmed without 
direct ground observations."
[12] https://ndrrma.gov.np/mediafiles/rasuwa/SitRep_ENG_20_21092026.pdf
    > "Date: 21 September 2026 Time: 07:00PM"
    > "Total Recovered/Rescued Bodies: 1,451"
    > "Total Rescued**
**13,784"
    > "Total Missing 5,745"
[13] https://hyp3-docs.asf.alaska.edu/nisar-docs/availability-overview
    > "NISARPROVISIONAL datasets were released July 20, 2026. These products are fully calibrated and have undergone validation at a limited set of sites around the world."
    > "Level 1-3 products have a nominal latency of 36-72 hours."
[14] https://www.nature.com/articles/s44304-026-00292-7
    > "Published: 03 November 2026"
[15] https://science.nasa.gov/earth/earth-observatory/landslide-and-avalanche-debris-litter-hubbard-glacier
    > "The debris is visible in radar imagery acquired by NISAR on December 8, two days after the quake (right). For comparison, the NISAR image on the left shows the same area on November 26, a week and a half before the quake."
    > "Where the slides have deposited rock, snow, and other debris, surfaces have become rougher, which scatters more energy back toward the sensor and makes those areas appear bright in the December 8 image (the roughest areas are shown in dark green). Areas with smooth surfaces reflect little of the radar’s energy directly back to the satellite sensor, so these parts of the images appear dark (shown in purple). Note that there are some exceptionally rough, green surfaces beyond the new slide areas that remain relatively unchanged between the two images."
    > "Images by Eric Fielding and Gustavo H. X. Shiroma (JPL) of the NISAR Algorithm Development Team using data from the_ [_NISAR GSLC product_](https://www.earthdata.nasa.gov/data/catalog/asf-nisar-l2-gslc-beta-v1-1) _, and prepared for NASA Earth Observatory by Lauren Dauphin. Story by Kathryn Hansen."
    > "such maps—known as [interferograms](https://science.nasa.gov/mission/nisar/interferometry/)—are not possible because the ground lies buried beneath a layer of glacial ice that’s at least 700 meters (2,000 feet) thick."
[16] https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/sar
    > "Volume scattering caused by the leaves and branches in a forest canopy is most sensitive to cross-polarized data like VH or HV"
    > "Double bounce scattering is caused by buildings, tree trunks, or inundated vegetation and is most sensitive to an HH polarized signal"
[17] https://power.larc.nasa.gov/docs/services/api/temporal/climatology
    > "Below are examples for returning a climatology for a region on a 0.5 x 0.5 degree grid."
[18] https://power.larc.nasa.gov/docs/methodology/data/sources_hydrology
    > "`GWETTOP`, `GWETROOT`, and `GWETPROF` represent surface, root-zone, and full-profile soil wetness. `SFMC`, `RZMC`, and `PRMC` provide volumetric moisture content at those depths."
[19] https://www.usgs.gov/water-science-school/science/land-subsidence
    > "Signs on pole show approximate altitude of land surface in 1925, 1955, and 1977. The site is in the San Joaquin Valley southwest of Mendota, California."
[20] https://commons.wikimedia.org/wiki/File:Nepal_flood_2026_before_after.webp
    > "Animation of satellite imagery based on \[\[:File:Nepal\_flood\_before\_2026-08-24\_Copernicus\_Sentinel2-L1C.png\]\] and \[\[:File:Landsat\_Nepal\_flood\_2026-08-26.png\]\]."
    > "Attribution: Contains modified Copernicus Sentinel data 2026"
[21] https://commons.wikimedia.org/wiki/File:Landsat_Nepal_flood_2026-08-26.png
    > "Landsat 9 via USGS, processed by [User:Chorchapu"
[22] https://commons.wikimedia.org/wiki/File:2026_Nepal_floods.gif
    > "Taken on 26 August 2026, 10:59:51"
    > "Most jurisdictions do not have clear legal precedent on the copyright status of such works, see [Threshold of originality § Pre-positioned recording devices](https://en.wikipedia.org/wiki/Threshold_of_originality#Pre-positioned_recording_devices "w:Threshold of originality") for more information."
[23] https://irides.tohoku.ac.jp/media/files/disaster/flood/2026NepalFloods_Parajuri.pdf
    > "Date: Oct 5, 2026"
[24] https://bhoonidhi.nrsc.gov.in/NISAR/NisarProducts.html
    > "The data comprises of S-Band SAR acquisitions over the Indian landmass,
along with global locations spanning across diverse NISAR science themes, acquired in accordance with the ISRO observation plan."
[26] https://nepaleconomicforum.org/bhotekoshi-flood-sectoral-impacts
    > "total disaster effects (damage plus economic losses) at NPR 408.29 billion (USD 2.70 billion)."
    > "Total damage | NPR 274.48 billion (USD 1,812.01 million)"
[27] https://www.stimson.org/2025/investigating-an-emerging-climate-hazard-transboundary-glacial-floods-on-the-china-nepal-border
    > "This event has been attributed to the rapid expansion and sudden drainage of a supraglacial lake system that formed atop the Purepu Glacier, approximately 35 kilometers upstream from the Nepal-China border at an elevation of about 5,150 meters above sea level."
[28] https://science.nasa.gov/mission/nisar/interferometry
    > "If the ground moves between passes, the phase difference is proportional to the ground deformation between passes along the LOS direction."
[29] https://www.nature.com/articles/s44304-026-00292-7_reference.pdf
    > "at Rasuwa, satellite pixel offsets did not statistically resolve pre-failure
motion or isolate the final week before the collapse"
    > "At Rasuwa in 2026, pre-failure deformation coincided with anomalous
warming<sup>22</sup>, which is consistent with warming as a conditioning factor but
does not demonstrate that warming directly caused the initial failure."
