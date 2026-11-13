import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import * as THREE from 'three';
import ts from 'typescript';

async function badgeLayout() {
  const source = await readFile(new URL('../src/utils/mapLabelLayout.ts', import.meta.url), 'utf8');
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

function assertSeparated(boxes, width, height) {
  for (const box of boxes) {
    assert.ok(box.x >= 8 && box.y >= 8, `${box.id} must stay inside the map margin`);
    assert.ok(box.x + box.width <= width - 8 && box.y + box.height <= height - 8,
      `${box.id} must not be clipped by the map edge`);
  }
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      const area = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
        Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
      assert.equal(area, 0, `${a.id} and ${b.id} must not overlap`);
    }
  }
}

// Replayed from the current Rasuwa DEM, Three.js perspective projection and
// Syabrubesi fly-to pose at the map sizes recorded by the monitor QA probe.
const projectedClusters = [
  {
    width: 903, height: 360,
    points: [
      { id: 'timure', anchorX: 386.11936182191977, anchorY: 59.22324339329247 },
      { id: 'rasuwagadhi_hydro', anchorX: 381.5708329829599, anchorY: 51.26803866974097 },
      { id: 'miteri_bridge', anchorX: 383.16128637524577, anchorY: 46.327260329088986 }
    ]
  },
  {
    width: 334, height: 340,
    points: [
      { id: 'timure', anchorX: 105.25161949847981, anchorY: 55.933063204776225 },
      { id: 'rasuwagadhi_hydro', anchorX: 100.95578670612882, anchorY: 48.4198142991998 },
      { id: 'miteri_bridge', anchorX: 102.45788157662099, anchorY: 43.7535236441396 }
    ]
  }
];

test('shared layout retains the close projected Timure, hydro and bridge badges when nearby space exists', async () => {
  const { layoutMapBadges } = await badgeLayout();
  for (const { width, height, points } of projectedClusters) {
    const anchors = points.map(point => ({ ...point, width: 57, height: 25 }));
    const before = structuredClone(anchors);
    const badges = layoutMapBadges(anchors, width, height);
    assert.equal(badges.length, anchors.length, `Retain all three projected badges at ${width}×${height}`);
    assert.deepEqual(badges.map(badge => badge.id).sort(), anchors.map(anchor => anchor.id).sort());
    assertSeparated(badges, width, height);
    assert.deepEqual(anchors, before, 'Move label rectangles, not their projected station anchors');
  }
});

// Exercise the actual animation/JSX expressions without constructing a WebGL
// renderer. Only the DOM measurement boundary is supplied by the fixture.
const nativeRequire = createRequire(import.meta.url);
const sourceModules = new Map();
function loadSource(file) {
  if (sourceModules.has(file)) return sourceModules.get(file).exports;
  if (file.endsWith('.json')) return JSON.parse(readFileSync(file, 'utf8'));
  const module = { exports: {} };
  sourceModules.set(file, module);
  const code = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true
    }
  }).outputText;
  const requireSource = specifier => {
    if (!specifier.startsWith('.')) return nativeRequire(specifier);
    const path = resolve(dirname(file), specifier);
    const target = [path, `${path}.ts`, `${path}.tsx`, `${path}.json`].find(existsSync);
    assert.ok(target, `Resolve the real source dependency ${specifier}`);
    return loadSource(target);
  };
  new Function('require', 'module', 'exports', code)(requireSource, module, module.exports);
  return module.exports;
}

function evaluate(expression, context) {
  const code = ts.transpileModule(`const result = (${expression});`, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 }
  }).outputText;
  return new Function(...Object.keys(context), `${code}\nreturn result;`)(...Object.values(context));
}

async function sceneExpressions() {
  const source = await readFile(new URL('../src/components/TerrainMap3D.tsx', import.meta.url), 'utf8');
  const root = ts.createSourceFile('TerrainMap3D.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let cameraPose, projection, marker;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(root) === 'getStationCameraPose') {
      cameraPose = node.initializer.getText(root);
    }
    if (ts.isIfStatement(node) && node.expression.getText(root).includes('frameCount % 2')) {
      projection = node.thenStatement.getText(root);
    }
    if (ts.isJsxElement(node)) {
      const className = node.openingElement.attributes.properties.find(attribute =>
        ts.isJsxAttribute(attribute) && attribute.name.getText(root) === 'className');
      if (className?.initializer.getText(root).includes('pin-3d-label')) marker = node;
    }
    ts.forEachChild(node, visit);
  }
  visit(root);
  assert.ok(cameraPose && projection && marker, 'Retain the real camera, projection loop and station buttons');
  const attributeExpression = name => {
    const attribute = marker.openingElement.attributes.properties.find(attribute =>
      ts.isJsxAttribute(attribute) && attribute.name.getText(root) === name);
    assert.ok(attribute && ts.isJsxExpression(attribute.initializer), `Retain the marker ${name}`);
    return attribute.initializer.expression.getText(root);
  };
  const projectionCode = ts.transpileModule(projection, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 }
  }).outputText;
  return {
    root,
    cameraPose: context => evaluate(cameraPose, context),
    project: context => new Function(...Object.keys(context), projectionCode)(...Object.values(context)),
    markerStyle: context => evaluate(attributeExpression('style'), context),
    markerClick: context => evaluate(attributeExpression('onClick'), context)
  };
}

async function projectionFixture(width, height) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const { GLOBAL_REGIONS_ATLAS } = loadSource(resolve(root, 'src/data/globalRegionsAtlas.ts'));
  const { getRegionalDem, sampleRegionalElevationAtUV } = loadSource(resolve(root, 'src/utils/regionalDemGenerator.ts'));
  const { uvToSceneXZ } = loadSource(resolve(root, 'src/utils/simulatedRadarPhysics.ts'));
  const { layoutMapBadges } = await badgeLayout();
  const expressions = await sceneExpressions();
  const regionId = 'rasuwa_nepal';
  const regDem = getRegionalDem(regionId);
  const regStations = GLOBAL_REGIONS_ATLAS[regionId].stations;
  const rectangles = new Map(regStations.map(station => [station.id, {
    width: station.id === 'rasuwagadhi_hydro' ? 67 : 57,
    height: station.id === 'rasuwagadhi_hydro' ? 33 : 25
  }]));
  const context = {
    THREE, regionId, regStations, sampleRegionalElevationAtUV, layoutMapBadges,
    mapCameraScale: Math.max(regDem.bounds.widthKm, regDem.bounds.heightKm) / 25.5,
    uvToWorldXZ: (u, v) => uvToSceneXZ(regDem.bounds, u, v),
    elevToUnit: elevation => (elevation - regDem.minElev) / 1000,
    mountRef: { current: { clientWidth: width, clientHeight: height } },
    pinLabelRefs: { current: new Map(regStations.map(station => [station.id, {
      getBoundingClientRect: () => rectangles.get(station.id)
    }])) },
    activeStationIdRef: { current: 'syabrubesi' },
    st: { extrude: 1 }, targetScale: 1.4
  };
  const pose = expressions.cameraPose(context)(regStations[0], 1.4);
  const camera = new THREE.PerspectiveCamera(44, width / height, 0.2, 180);
  camera.position.copy(pose.pos);
  camera.lookAt(pose.target);
  camera.updateMatrixWorld();
  context.objs = { camera };
  return {
    context, expressions, rectangles, regStations,
    project() {
      let pins;
      expressions.project({ ...context, setProjectedPins: value => { pins = value; } });
      assert.ok(pins, 'The real animation loop must update its projected pins');
      return pins;
    }
  };
}

test('3D projection and marker styles apply separated measured rectangles instead of raw anchor offsets', async () => {
  for (const { width, height, points } of projectedClusters) {
    const fixture = await projectionFixture(width, height);
    const pins = fixture.project();
    assert.deepEqual(pins.map(pin => pin.station.id), fixture.regStations.map(station => station.id),
      'Preserve every station ID in the projection data');
    const badges = [];
    for (const point of points) {
      const pin = pins.find(pin => pin.station.id === point.id);
      assert.ok(pin.visible, `${point.id} lies inside this camera viewport`);
      assert.ok(Math.abs(pin.screenX - point.anchorX) < 1e-9 && Math.abs(pin.screenY - point.anchorY) < 1e-9,
        'Preserve the actual Three.js mast projection when moving its badge');
      assert.ok(pin.badge, `Apply shared collision layout to the projected ${point.id} badge`);
      assert.equal(pin.badge.width, fixture.rectangles.get(point.id).width);
      assert.equal(pin.badge.height, fixture.rectangles.get(point.id).height);
      const style = fixture.expressions.markerStyle(pin);
      assert.equal(style.left, `${pin.badge.x}px`);
      assert.equal(style.top, `${pin.badge.y}px`);
      assert.equal(style.transform, 'none', 'Legacy centered/selected transforms must not move the placed rectangle');
      assert.equal(style.borderColor, pin.station.accentColor, 'Keep station data coloring');
      const clicks = [];
      fixture.expressions.markerClick({ ...pin, flyCameraToStation: station => clicks.push(station) })();
      assert.deepEqual(clicks, [pin.station], 'Keep the original station fly-to handler and identity');
      badges.push(pin.badge);
    }
    assertSeparated(badges, width, height);
  }
});

test('3D projection excludes offscreen stations before the shared layout can clamp them onto a map edge', async () => {
  const fixture = await projectionFixture(334, 340);
  const pins = fixture.project();
  const outside = pins.filter(pin => pin.screenX < 0 || pin.screenX > 334 || pin.screenY < 0 || pin.screenY > 340);
  assert.ok(outside.length > 0, 'This current fly-to pose puts at least one station outside the viewport');
  for (const pin of outside) {
    assert.equal(pin.visible, false, `${pin.station.id} must not be relocated from offscreen onto a map edge`);
    assert.equal(pin.badge, undefined, 'Offscreen stations must not consume room in the collision layout');
  }
});

test('displaced 3D badges retain a noninteractive leader to their original projected mast', async () => {
  const fixture = await projectionFixture(334, 340);
  const pins = fixture.project();
  const root = fixture.expressions.root;
  let overlay, line;
  const attributes = element => ts.isJsxElement(element) ? element.openingElement.attributes.properties : element.attributes.properties;
  const attribute = (element, name) => attributes(element).find(attribute =>
    ts.isJsxAttribute(attribute) && attribute.name.getText(root) === name)?.initializer;
  function visit(node) {
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText(root) === 'svg' &&
        attribute(node, 'className')?.getText(root).includes('pin-3d-leaders')) overlay = node;
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(root) === 'line') line = node;
    ts.forEachChild(node, visit);
  }
  visit(root);
  assert.ok(overlay && line, 'Displacing badges must not visually move the geographic station anchors');
  assert.equal(attribute(overlay, 'aria-hidden').text, 'true');
  const overlayStyle = evaluate(attribute(overlay, 'style').expression.getText(root), {});
  assert.equal(overlayStyle.position, 'absolute');
  assert.equal(overlayStyle.pointerEvents, 'none', 'Leader lines must not intercept map or station clicks');
  for (const point of projectedClusters[1].points) {
    const pin = pins.find(pin => pin.station.id === point.id);
    const value = name => evaluate(attribute(line, name).expression.getText(root), pin);
    assert.equal(value('key'), pin.station.id);
    assert.equal(value('x1'), pin.screenX);
    assert.equal(value('y1'), pin.screenY);
    assert.equal(value('x2'), Math.max(pin.badge.x, Math.min(pin.screenX, pin.badge.x + pin.badge.width)));
    assert.equal(value('y2'), Math.max(pin.badge.y, Math.min(pin.screenY, pin.badge.y + pin.badge.height)));
    assert.equal(value('stroke'), pin.station.accentColor);
  }
});
