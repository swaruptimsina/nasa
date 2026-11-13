import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function physics() {
  const source = await readFile(new URL('../src/utils/simulatedRadarPhysics.ts', import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

test('shared simulated LOS produces one fringe per half wavelength', async () => {
  const p = await physics();
  assert.equal(p.losToPhaseCycles(p.L_BAND_WAVELENGTH_M / 2), 1);
  assert.equal(p.losToPhaseCycles(-p.L_BAND_WAVELENGTH_M / 2), -1);
  const pass = { phaseTag: 'PRECURSOR', puruguCreepMeters: 1 };
  const motion = p.getSimulatedRasuwaMotion(0.739, 0.267, pass);
  assert.equal(motion.losMeters, -0.15);
  assert.equal(motion.isValid, true);
  const failure = p.getSimulatedRasuwaMotion(0.739, 0.267, { ...pass, phaseTag: 'CATASTROPHE', puruguCreepMeters: 99 });
  assert.equal(failure.isValid, false);
  assert.equal(failure.losMeters, 0);
});

test('wrapped phase colors put zero at the legend center and wrap at half a cycle', async () => {
  const p = await physics();
  assert.equal(p.phaseCyclesToHue(0), 0.5);
  assert.equal(p.phaseCyclesToHue(1), 0.5);
  assert.equal(p.phaseCyclesToHue(0.5), 0);
  assert.equal(p.phaseCyclesToHue(-0.5), 0);
  const raster = await readFile(new URL('../src/utils/terrainHydrology.ts', import.meta.url), 'utf8');
  const regional = await readFile(new URL('../src/utils/regionalDemGenerator.ts', import.meta.url), 'utf8');
  assert.ok(raster.includes('phaseCyclesToHue(cycles)'));
  assert.ok(regional.includes('phaseCyclesToHue(cycles)'));
  assert.ok(regional.includes('#00ffff'));
});

test('illustrative scene uses each DEM extent and explicit meter-to-kilometer warp conversion', async () => {
  const p = await physics();
  assert.deepEqual(p.uvToSceneXZ({ widthKm: 38, heightKm: 34 }, 1, 0), { x: 19, z: -17 });
  assert.equal(p.artisticLosHeightKm(1000, 1), 1);
  assert.equal(p.artisticLosHeightKm(-0.5, 350), -0.175);
});

test('illustrative terrain gradients use declared cell spacing including grid edges', async () => {
  const p = await physics();
  const dem = { rows: 3, cols: 3, bounds: { widthKm: 2, heightKm: 4 },
    elevations: [[0, 1000, 2000], [200, 1200, 2200], [400, 1400, 2400]] };
  for (const [r, c] of [[1, 1], [0, 0], [2, 2]]) {
    assert.deepEqual(p.getGridGradient(dem, r, c), { dzdx: 1, dzdy: 0.1 });
  }
  const regional = await readFile(new URL('../src/utils/regionalDemGenerator.ts', import.meta.url), 'utf8');
  const rasuwa = await readFile(new URL('../src/utils/terrainHydrology.ts', import.meta.url), 'utf8');
  assert.ok(regional.includes('getGridGradient(dem, y0, x0)'));
  assert.ok(rasuwa.includes('getGridGradient(DEM, r, c)'));
  assert.ok(!regional.includes('const cellScale = elevSpan'));
});

test('3D adapter uses regional dimensions and discloses its artistic LOS height warp', async () => {
  const scene = await readFile(new URL('../src/components/TerrainMap3D.tsx', import.meta.url), 'utf8');
  assert.ok(scene.includes('const WORLD_W = regDem.bounds.widthKm;'));
  assert.ok(scene.includes('const WORLD_D = regDem.bounds.heightKm;'));
  assert.ok(scene.includes('uvToSceneXZ(regDem.bounds, u, v)'));
  assert.ok(scene.includes('artisticLosHeightKm(def.losMeters, losHeightExaggeration)'));
  assert.ok(scene.includes('ARTISTIC LOS→HEIGHT'));
  assert.ok(scene.includes('not vertical ground motion'));
  assert.ok(!scene.includes('99M m³ Purugu'));
  assert.ok(!scene.includes("purugu_glacier: 'Purugu Glacier'"));
  const lab = await readFile(new URL('../src/components/LabSupercomputerScreen.tsx', import.meta.url), 'utf8');
  assert.ok(!lab.includes('extrude the geodetic relief'));
  assert.ok(!lab.includes('multi-band X-Ray telemetry'));
});

test('uncalibrated radar palette does not attach dB values to its color ticks', async () => {
  const source = await readFile(new URL('../src/utils/regionalDemGenerator.ts', import.meta.url), 'utf8');
  const legend = source.slice(source.indexOf("case 'sar_rgb':"), source.indexOf("case 'sband_moisture':"));
  assert.ok(legend.includes('No numerical color scale'));
  assert.ok(!/dB/.test(legend));
});

test('completed exercise HUD and worksheet avoid deployed telemetry claims', async () => {
  const hud = await readFile(new URL('../src/components/FieldExpeditionViewport.tsx', import.meta.url), 'utf8');
  const action = await readFile(new URL('../src/components/ImpactInterventionModal.tsx', import.meta.url), 'utf8');
  assert.ok(!hud.includes('🛡️ Deployed'));
  assert.ok(!hud.includes("'IMPACT ACTIVE'"));
  assert.ok(hud.includes('EXERCISE COMPLETE'));
  assert.ok(!hud.includes('Calibrated NISAR Corner Reflectors'));
  assert.ok(!hud.includes('View Real Archive Photographs'));
  assert.ok(!action.includes('NASA POWER Hydro-Climatology Telemetry'));
  assert.ok(!action.includes('completedInterventions.includes(r.id) || r.id === regionId'));
  assert.ok(action.includes('Educational_Scenario_Worksheet_'));
  assert.ok(action.includes('Illustrative scenario themes:'));
});

test('NASA browse credit retains the image producers and Earth Observatory preparation credit', async () => {
  const record = JSON.parse(await readFile(new URL('../public/nisar-reference/provenance.json', import.meta.url), 'utf8'));
  const guide = await readFile(new URL('../src/components/JudgeBriefing.tsx', import.meta.url), 'utf8');
  for (const name of ['Eric Fielding', 'Gustavo H. X. Shiroma', 'Lauren Dauphin']) {
    assert.ok(record.credit.includes(name));
    assert.ok(guide.includes(name));
  }
  assert.ok(record.credit.includes('NISAR GSLC'));
});

test('Rasuwa raster and cursor adapters use the same stationary simulated phase field', async () => {
  const raster = await readFile(new URL('../src/utils/terrainHydrology.ts', import.meta.url), 'utf8');
  const cursor = await readFile(new URL('../src/utils/regionalDemGenerator.ts', import.meta.url), 'utf8');
  assert.ok(raster.includes('getSimulatedRasuwaMotion(u, v, pass)'));
  assert.ok(raster.includes('losToPhaseCycles(motion.losMeters)'));
  assert.ok(!raster.includes('puruguCreepMeters * 4.5'));
  assert.ok(cursor.includes('return getSimulatedRasuwaMotion(u, v, pass)'));
  assert.ok(!cursor.includes('- animTimeSec * 0.28'));
});

