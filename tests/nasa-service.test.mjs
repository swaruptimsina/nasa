import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function freshService() {
  const source = await readFile(new URL('../src/services/nasaEarthDataService.ts', import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(code + '\n// ' + Math.random()).toString('base64')}`);
}

test('unavailable NASA services never manufacture NASA observations', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.window = globalThis;
  globalThis.fetch = async () => { throw new Error('offline test'); };
  try {
    const api = await freshService();
    const power = await api.fetchNasaPowerTelemetry('rasuwa_nepal', 28.28, 85.38);
    assert.equal(power.provenance, 'illustration');
    assert.equal(power.isLiveApi, false);
    assert.equal(power.fetchedAtIso, '');
    assert.match(power.sourceLabel, /illustration/i);
    const events = await api.fetchNasaEonetEvents();
    assert.deepEqual(events.events, []);
    assert.equal(events.isLive, false);
  } finally { globalThis.fetch = originalFetch; }
});

test('fetched POWER climatology carries its period and units; incomplete values are not observations', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.window = globalThis;
  // Synthetic test fixture only: not evidence or a NASA response.
  const parameter = Object.fromEntries(['PRECTOTCORR', 'GWETTOP', 'GWETROOT', 'T2M'].map(key =>
    [key, Object.fromEntries(['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC','ANN'].map(m => [m, key === 'T2M' ? 12 : key === 'PRECTOTCORR' ? 3 : 0.5]))]));
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ header: { range: 'TEST PERIOD', fill_value: -999 }, properties: { parameter }, geometry: { coordinates: [85.38,28.28,4000] } }) });
  try {
    const api = await freshService();
    const power = await api.fetchNasaPowerTelemetry('rasuwa_nepal', 28.28, 85.38);
    assert.equal(power.provenance, 'model output');
    assert.equal(power.dataPeriod, 'TEST PERIOD');
    assert.match(power.sourceUrl, /power\.larc\.nasa\.gov\/api/);
    assert.equal(power.monthly[0].precipMmDay, 3);
    parameter.GWETROOT.JAN = -999;
    const fresh = await freshService();
    const invalid = await fresh.fetchNasaPowerTelemetry('rasuwa_nepal', 28.28, 85.38);
    assert.equal(invalid.provenance, 'illustration');
  } finally { globalThis.fetch = originalFetch; }
});
