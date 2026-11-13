import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

async function component(name) {
  let code = ts.transpileModule(await readFile(new URL(`../src/components/${name}.tsx`, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2020 } }).outputText;
  code = code.replace(/import React[^;]+;/, 'const React = globalThis.__testReact; const {useState,useEffect,useRef} = React;');
  globalThis.__testReact = React;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

test('judge briefing shows the decision, real reference dates and a simulation boundary without needing audio', async () => {
  const { JudgeBriefing } = await component('JudgeBriefing');
  const html = renderToStaticMarkup(React.createElement(JudgeBriefing, { onClose() {}, onOpenObservatory() {}, onOpenEvidence() {}, onOpenAction() {}, initialStep: 3 }));
  assert.match(html, /community-preparedness educator/i);
  assert.match(html, /2025-11-26/);
  assert.match(html, /2025-12-08/);
  assert.match(html, /archived observation/i);
  assert.match(html, /not Rasuwa measurements/i);
  assert.match(html, /aria-label="Compare archived NISAR dates"/);
  assert.match(html, /Open Rasuwa observatory/);
  assert.match(html, /No operational warning/);
});

test('clean launch offers a direct judge path and audio is opt-in', async () => {
  const launch = await readFile(new URL('../src/components/ExpeditionLaunchScreen.tsx', import.meta.url), 'utf8');
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
  assert.match(launch, /onStartGame\('judge_demo'\)/);
  assert.match(launch, /START GUIDED EVIDENCE TRAIL/);
  assert.match(app, /\[voiceOn, setVoiceOn\] = useState\(false\)/);
  assert.match(app, /<JudgeBriefing/);
});
