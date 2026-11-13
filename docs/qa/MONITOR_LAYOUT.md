# Observatory layout / field-computer skin

Scope: the existing in-game observatory, including its 2D/3D views and computer applications. This is a UI revision, not NASA product ingestion or scientific validation.

## Baseline

A clean browser launch at 1280 × 577 reproduced an intersection between the top-left 3D actions and top-right shader/relief panel. The measured intersection was 4531.25 CSS square pixels. Baseline bounds are recorded in the browser workspace as `monitor-layout-before.json`.

The map also contained a duplicate shader menu, an overlaid station strip, and long projected labels. The old station sidebar took a permanent viewport column even when its context was not being read.

## Design decision

Primary surface: Explore. Give the map its own bounded canvas, put 3D instruments in a separate layout cell, and move secondary station context into a closed-by-default notebook. Preserve explicit simulation/illustration labels and the scientific data color ramps.

Source-level design self-audit: 2/10 on the ten-tell anti-slop checklist (glossy tech-gradient chrome; wrong surface composition). This is a qualitative source/layout assessment, not a visual score or user study. The composition is corrected before the palette. The skin will use field-lab hardware cues—warm casing, olive display, brass selection and square keys—instead of neon dashboard treatment.

## Verification

Pending final responsive browser checks and build. Image-analysis service was unavailable; screenshot capture and DOM geometry checks must be reported separately from visual inspection.
