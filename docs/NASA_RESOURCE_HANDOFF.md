# Pending NASA resource integration

## Timing and scope

The user plans to provide the official NASA resources on November 13. Wait for that package or its exact official links. This is a user-supplied milestone, not a claim that all NASA data are unavailable before that date. No new local NISAR product ingestion is complete at this handoff.

The current NASA published browse comparison and archived/context services remain available. Regional radar, scenario values and schematic terrain retain their simulation/illustration labels. Do not replace those labels simply because an HTTP request succeeds.

## When the resources arrive

1. Inventory the actual files and documentation: product type, format, region/extent, acquisition dates, processing version, source URL, permission/credit and file checksums. Preserve original identifiers and filenames.
2. Establish what each resource can support. Distinguish published browse imagery from calibrated products, model output and reported estimates. Do not transfer another site's measurements to Rasuwa.
3. Trace the existing adapters before choosing an integration path: `src/services/nasaEarthDataService.ts`, `src/utils/regionalDemGenerator.ts`, `src/utils/terrainHydrology.ts`, and the observatory renderers. Choose dependencies only after inspecting the supplied formats and project manifest; do not invent endpoints or parser APIs.
4. For quantitative local products, verify CRS/co-registration, units/scaling, nodata values, acquisition/processing metadata and applicable quality/coherence masks. Keep missing or invalid samples missing; no simulated replacement masquerading as a NASA observation.
5. Preserve the map-first layout and game identity. Put acquisition/source/units and quality state beside the actual layer. Keep long provenance in the notebook/context view without concealing the layer's data category.
6. Profile realistic files before rendering them. Use appropriate overviews/chunks or an explicitly tested preprocessing/worker path if needed; keep camera, layer changes and keyboard controls responsive.
7. Add regression fixtures from the supplied resources, test known pixels/units/date selection and failure states, then exercise 2D/3D and comparison controls in a production build. Report the actual scope of quantitative analysis and remaining independent-validation needs.

Toy quizzes, scenario controls and community worksheets remain educational. New NASA resources do not themselves connect gauges, establish field validation, validate warning thresholds or make the app an operational warning service.
