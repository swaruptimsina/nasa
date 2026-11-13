import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('observatory and action UI state their simulation boundary instead of operational validity', async () => {
  const action = await readFile(new URL('../src/components/ImpactInterventionModal.tsx', import.meta.url), 'utf8');
  const lab = await readFile(new URL('../src/components/LabSupercomputerScreen.tsx', import.meta.url), 'utf8');
  assert.ok(action.includes('Game checklist'), 'Score must be a game checklist');
  assert.ok(!action.includes('Operational Readiness'), 'No operational score');
  assert.ok(!action.includes('Lead Operational Partners'), 'No fictitious partnerships in exports');
  assert.ok(action.includes('No real sensors'), 'Checkbox is not an integration');
  assert.ok(lab.includes('SIMULATION'), 'Radar values must be simulated');
  assert.ok(!lab.includes('Measured HH'), 'Hardcoded backscatter is not measured');
  assert.ok(!lab.includes('MULTI-SENSOR TRIGGER VALIDATED'), 'No fabricated warning validation');
});

test('toy wetness legend does not claim volumetric soil moisture', async () => {
  const source = await readFile(new URL('../src/utils/regionalDemGenerator.ts', import.meta.url), 'utf8');
  assert.ok(!source.includes("unit: 'Vol. %'"), 'No physical moisture retrieval is implemented');
  assert.ok(source.includes('Dimensionless illustration'));
});

test('judge layout overrides load after the base stylesheet', async () => {
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
  assert.ok(app.indexOf("import './judge.css'") > app.indexOf("import './App.css'"));
});

test('field keyboard interaction yields to dialog controls', async () => {
  const field = await readFile(new URL('../src/components/FieldExpeditionViewport.tsx', import.meta.url), 'utf8');
  assert.ok(field.includes('[role="dialog"]'), 'Modal controls must not move/interact with the player');
});
