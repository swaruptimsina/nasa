import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = file => readFile(new URL(`../src/${file}`, import.meta.url), 'utf8');

test('shared game theme loads after legacy chrome and before the observatory layout', async () => {
  const app = await source('App.tsx');
  const theme = app.indexOf("import './game-theme.css'");
  assert.ok(theme > app.indexOf("import './judge.css'"), 'Every page and modal needs the shared field-game theme, not just the computer');
  assert.ok(theme < app.indexOf("import './observatory.css'"), 'Keep the verified observatory layout overrides last');
  const css = await source('game-theme.css');
  assert.match(css, /:root\s*\{/, 'The palette must be available outside the computer overlay');
  assert.doesNotMatch(css, /(?:linear|radial)-gradient\(|backdrop-filter:\s*blur|text-shadow:[^;]*0 0/i, 'No glossy gradients, glass blur or neon text glow in shared chrome');
});

test('inner panels use the shared field palette rather than leftover blue surfaces', async () => {
  const css = await source('game-theme.css');
  const rules = [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]+)\}/g)];
  const panels = ['field-gt-card', 'field-gt-align-box', 'field-gt-witness-card', 'quest-journal-item', 'photo-caption-col', 'world-atlas-detail-col', 'hidden-change-callout', 'region-culture-box', 'live-nasa-power-card', 'intervention-prompt-box', 'calib-card', 'fusion-check-card', 'power-sparkline-box', 'readiness-meter-box', 'impact-stat'];
  for (const panel of panels) {
    const name = new RegExp(`\\.${panel}(?![\\w-])`);
    assert.ok(rules.some(([, selectors, declarations]) => name.test(selectors) && /background:\s*var\(--game-(?:panel|key|screen)\)/.test(declarations)), `${panel} must not retain legacy blue/glass chrome`);
  }
});

test('inline page and modal chrome follows the palette instead of bypassing it', async () => {
  const components = ['ExpeditionLaunchScreen', 'FieldExpeditionViewport', 'FieldGroundTruthModal', 'PixelWorldGlobeScreen', 'IncidentPhotoModal', 'ImpactInterventionModal', 'JudgeBriefing', 'LabSupercomputerScreen'];
  for (const component of components) {
    const text = await source(`components/${component}.tsx`);
    const root = ts.createSourceFile(`${component}.tsx`, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = node => {
      if (ts.isJsxAttribute(node) && node.name.getText() === 'style') {
        assert.doesNotMatch(node.initializer.getText(), /#[0-9a-f]{3,8}\b|station\.accentColor/i, `${component} has an inline chrome color that bypasses the shared theme`);
      }
      ts.forEachChild(node, visit);
    };
    visit(root);
  }
});

test('field navigation and zone captions use the shared text palette', async () => {
  const css = await source('game-theme.css');
  const rules = [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]+)\}/g)];
  for (const caption of ['fieldnav-sub', 'zone-banner-nepali']) {
    const name = new RegExp(`\\.${caption}(?![\\w-])`);
    assert.ok(rules.some(([, selectors, declarations]) => name.test(selectors) && /color:\s*var\(--game-(?:text|muted|accent)\)/.test(declarations)), `${caption} must not retain the legacy blue/yellow subtitle color`);
  }
});

test('computer channel indicators use flat theme colors, not neon gradients', async () => {
  const css = await source('game-theme.css');
  const rules = [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]+)\}/g)];
  for (const channel of ['hh', 'hv']) {
    const name = new RegExp(`\\.pol-fill\\.${channel}(?![\\w-])`);
    assert.ok(rules.some(([, selectors, declarations]) => name.test(selectors) && /background:\s*var\(--game-(?:accent|safe)\)/.test(declarations)), `${channel} indicator needs a flat channel color; preserve its numeric width and the separate scientific legend`);
  }
});

test('field exercise return action follows the shared palette instead of the legacy green gradient', async () => {
  const css = await source('game-theme.css');
  const rules = [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]+)\}/g)];
  assert.ok(rules.some(([, selectors, declarations]) => /\.field-gt-done-btn(?![\w-])/.test(selectors) && /background:\s*var\(--game-(?:key|accent)\)/.test(declarations)), 'The save/return action must not bypass the shared game chrome');
});

test('phone overlay content has one shrinkable column instead of squeezed desktop grids', async () => {
  const css = await source('game-theme.css');
  const start = css.search(/@media\s*\(max-width:\s*820px\)/);
  assert.ok(start >= 0, 'Overlay grids need the same narrow-screen breakpoint as the computer');
  const rules = [...css.slice(start).replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]+)\}/g)];
  for (const grid of ['photo-viewer-body', 'intervention-grid', 'world-atlas-body', 'fieldnav-grid', 'field-gt-pass-grid']) {
    const name = new RegExp(`\\.${grid}(?![\\w-])`);
    assert.ok(rules.some(([, selectors, declarations]) => name.test(selectors) && /grid-template-columns:\s*minmax\(0,\s*1fr\)/.test(declarations)), `${grid} must not crush its first column on phones`);
  }
});
