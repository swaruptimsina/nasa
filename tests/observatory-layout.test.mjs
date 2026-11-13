import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function jsx(file) {
  const text = await readFile(new URL(`../src/components/${file}.tsx`, import.meta.url), 'utf8');
  return ts.createSourceFile(`${file}.tsx`, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

function elements(root) {
  const result = [];
  const visit = node => {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) result.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return result;
}

function attribute(node, name) {
  const opening = ts.isJsxElement(node) ? node.openingElement : node;
  return opening.attributes.properties.find(a => ts.isJsxAttribute(a) && a.name.getText() === name);
}

function hasClass(node, name) {
  const value = attribute(node, 'className')?.initializer;
  return value && value.getText().includes(name);
}

test('3D instruments are outside the geographic canvas rather than floating over it', async () => {
  const nodes = elements(await jsx('TerrainMap3D'));
  const scene = nodes.find(n => hasClass(n, 'terrain-3d-wrapper'));
  assert.ok(scene, 'The existing 3D canvas must be retained');
  const controls = elements(scene).filter(n => ['world-overlay-actions', 'panel-3d-controls', 'scientific-legend-overlay', 'flyto-bar-3d'].some(c => hasClass(n, c)));
  assert.equal(controls.length, 0, 'Action, relief, legend and station panels must not cover the canvas');
  const rack = nodes.find(n => hasClass(n, 'terrain-3d-instruments'));
  assert.ok(rack, '3D controls need a separate instrument rack');
  assert.ok(attribute(rack, 'aria-label'), 'The instrument rack must have an accessible name');
});

test('projected station markers keep compact codes and accessible names', async () => {
  const nodes = elements(await jsx('TerrainMap3D'));
  const marker = nodes.find(n => hasClass(n, 'pin-3d-label'));
  assert.ok(marker, 'Keep selectable geographic station markers');
  assert.equal(elements(marker).filter(n => hasClass(n, 'pin-name') || hasClass(n, 'pin-elev')).length, 0, 'Long names and elevations must not stack on the map');
  assert.ok(attribute(marker, 'aria-label')?.initializer.getText().includes('station.name'), 'The full station name must remain accessible');
  assert.ok(attribute(marker, 'title'), 'Pointer users need a full marker description');
});

test('2D and 3D share one accessible layer menu instead of duplicate shader buttons', async () => {
  assert.equal(elements(await jsx('TerrainMap3D')).filter(n => hasClass(n, 'mini-shader-row')).length, 0, 'Do not repeat the layer menu inside the 3D controls');
  const layers = elements(await jsx('LabSupercomputerScreen')).find(n => hasClass(n, 'layer-btn'));
  assert.ok(layers, 'The shared layer menu must stay available');
  assert.ok(attribute(layers, 'aria-pressed'), 'Expose the selected layer to assistive technology');
});

test('2D legend and cursor have a dedicated readout row outside the map surface', async () => {
  const nodes = elements(await jsx('LabSupercomputerScreen'));
  const surface = nodes.find(n => hasClass(n, 'obs-map-surface'));
  assert.ok(surface, 'Give the 2D canvas its own bounded map surface');
  assert.ok(elements(surface).some(n => hasClass(n, 'mainframe-2d-canvas')), 'Keep the interactive canvas');
  assert.equal(elements(surface).filter(n => hasClass(n, 'scientific-legend-overlay') || hasClass(n, 'cursor-geodetic-pill')).length, 0, 'Readouts must not collide over the map');
  const readouts = nodes.find(n => hasClass(n, 'obs-map-readouts'));
  assert.ok(readouts, 'Reserve normal-flow space for the legend and cursor');
});

test('2D map badges are drawn in display coordinates instead of a squashed fixed canvas', async () => {
  const root = await jsx('LabSupercomputerScreen');
  let draw;
  const visit = node => {
    if (!draw && ts.isVariableDeclaration(node) && node.name.getText() === 'draw' && ts.isArrowFunction(node.initializer)) draw = node.initializer;
    ts.forEachChild(node, visit);
  };
  visit(root);
  assert.ok(draw, 'Retain the actual 2D drawing loop');
  const declarations = draw.body.statements.filter(ts.isVariableStatement).flatMap(s => [...s.declarationList.declarations]);
  for (const [name, dimension] of [['W', 'clientWidth'], ['H', 'clientHeight']]) {
    const value = declarations.find(d => d.name.getText() === name)?.initializer;
    assert.ok(value, `Retain the ${name} map dimension`);
    assert.ok(value.getText().includes(`c.${dimension}`), `Map ${name} must follow its displayed ${dimension}, not squeeze text from a fixed bitmap`);
  }
});

test('2D station badges keep compact codes while full names stay in the notebook', async () => {
  const root = await jsx('LabSupercomputerScreen');
  let tag;
  const visit = node => {
    if (ts.isVariableDeclaration(node) && node.name.getText() === 'tag') tag = node.initializer;
    ts.forEachChild(node, visit);
  };
  visit(root);
  assert.ok(tag?.getText().includes('st.code'), 'Keep the station code on the map');
  assert.ok(!tag.getText().includes('cleanName'), 'Long names must not collide over neighboring map sites');
  const notebook = elements(root).find(n => hasClass(n, 'observatory-notebook'));
  assert.ok(notebook.getText().includes('activeStation.name'), 'The selected full name must remain in the notebook');
});

test('2D label layout separates neighboring badges without moving their map anchors', async () => {
  let source;
  try {
    source = await readFile(new URL('../src/utils/mapLabelLayout.ts', import.meta.url), 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    assert.fail('Map badges need collision-aware positioning, not fixed offsets');
  }
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
  const { layoutMapBadges } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  const anchors = [
    { id: 'selected', anchorX: 100, anchorY: 100, width: 58, height: 24, selected: true },
    { id: 'neighbor', anchorX: 108, anchorY: 120, width: 58, height: 24 }
  ];
  const before = structuredClone(anchors);
  const labels = layoutMapBadges(anchors, 300, 200);
  assert.equal(labels.length, 2, 'Both neighboring stations should retain a label when space exists');
  const [a, b] = labels;
  const area = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  assert.equal(area, 0, 'Badges must not cover each other');
  assert.deepEqual(anchors, before, 'Label placement must not move geographic anchors');
  assert.equal(labels[0].id, 'selected', 'Give the selected station placement priority');
});

test('2D renderer applies the collision-aware badge layout', async () => {
  const source = await readFile(new URL('../src/components/LabSupercomputerScreen.tsx', import.meta.url), 'utf8');
  assert.ok(source.includes("from '../utils/mapLabelLayout'"), 'Bind the tested placement utility into the real renderer');
  assert.ok(source.includes('layoutMapBadges('), 'Use collision-aware positions during map drawing');
});

test('comparison captions stay outside the wipe canvas rather than covering each other', async () => {
  const root = await jsx('LabSupercomputerScreen');
  const nodes = elements(root);
  const stage = nodes.find(n => hasClass(n, 'curtain-stage'));
  assert.equal(elements(stage).filter(n => hasClass(n, 'curtain-tag')).length, 0, 'Long optical and radar captions must not share a canvas corner');
  const row = nodes.find(n => hasClass(n, 'curtain-caption-row'));
  assert.ok(row, 'Give the comparison captions a normal-flow row');
  assert.equal(elements(row).filter(n => hasClass(n, 'curtain-tag')).length, 2, 'Keep both source/category captions visible');
});

test('station notebook is a closed-by-default disclosure, not a competing viewport column', async () => {
  const nodes = elements(await jsx('LabSupercomputerScreen'));
  const notebook = nodes.find(n => hasClass(n, 'observatory-notebook'));
  assert.ok(notebook, 'Move station cards into a notebook');
  assert.equal(notebook.openingElement.tagName.getText(), 'details');
  assert.equal(attribute(notebook, 'open'), undefined, 'Start with the map, not every card expanded');
  assert.ok(elements(notebook).some(n => hasClass(n, 'observatory-side-telemetry')), 'Keep all existing station context available');
});

test('secondary reading copy is collapsed without hiding the simulation category', async () => {
  const nodes = elements(await jsx('LabSupercomputerScreen'));
  for (const name of ['science-details', 'mainframe-mentor']) {
    const disclosure = nodes.find(n => hasClass(n, name));
    assert.ok(disclosure, `${name} must not consume the default map workspace`);
    assert.equal(disclosure.openingElement.tagName.getText(), 'details');
    assert.equal(attribute(disclosure, 'open'), undefined);
  }
  const science = nodes.find(n => hasClass(n, 'science-details'));
  assert.match(science.getText(), /SIMULATION/);
});

test('field-computer chrome uses a readable local palette without decorative gradients', async () => {
  const css = await readFile(new URL('../src/observatory.css', import.meta.url), 'utf8');
  const color = token => {
    const match = css.match(new RegExp(`--${token}:\\s*(#[0-9a-f]{6})`, 'i'));
    assert.ok(match, `Define the ${token} game-theme token`);
    return match[1];
  };
  const luminance = hex => {
    const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const [text, background] of [['lab-ink', 'lab-case'], ['lab-text', 'lab-screen'], ['lab-muted', 'lab-panel'], ['lab-ink', 'lab-accent']]) {
    const a = luminance(color(text)), b = luminance(color(background));
    assert.ok((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 4.5, `${text} must remain readable on ${background}`);
  }
  assert.doesNotMatch(css, /(?:linear|radial)-gradient\(/, 'Keep decorative chrome flat; scientific color ramps remain in the data renderer');
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
  assert.ok(app.indexOf("import './observatory.css'") > app.indexOf("import './judge.css'"), 'The game-computer skin must load after legacy styles');
});
