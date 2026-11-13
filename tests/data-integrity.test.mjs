import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const files = ['data/rasuwaStoryData.ts','data/rasuwaQuestsAndPhotos.ts','data/globalRegionsAtlas.ts','game/worldMapData.ts','game/regionalMapsBuilder.ts'];
test('unsupported disaster totals and purported NISAR measurements are removed from narrative literals', async () => {
  const forbidden = /1,400|1400\+|408\.29|99 million|99M m|5\.35|24\.85|19\.03|13,000|NRSC\/NISAR|LIVE DISASTER CAPTURE|Operationalized NISAR|95 min evacuation|prevents phase aliasing|uniquely capable of tracking/i;
  for (const file of files) {
    const text = await readFile(new URL(`../src/${file}`, import.meta.url), 'utf8');
    const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    const failures = [];
    function visit(node) {
      if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && forbidden.test(node.text)) failures.push(ast.getLineAndCharacterOfPosition(node.getStart()).line + 1);
      ts.forEachChild(node, visit);
    }
    visit(ast);
    assert.equal(failures.length, 0, `${file}: unsupported copy at ${failures.join(', ')}`);
  }
});

test('regional station color literals stay valid after copy edits', async () => {
  const file = 'data/globalRegionsAtlas.ts';
  const text = await readFile(new URL(`../src/${file}`, import.meta.url), 'utf8');
  const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const invalid = [];
  function visit(node) {
    if (ts.isPropertyAssignment(node) && node.name.getText(ast) === 'accentColor' && ts.isStringLiteral(node.initializer) && !/^#[0-9a-f]{6}$/i.test(node.initializer.text)) invalid.push(ast.getLineAndCharacterOfPosition(node.getStart()).line + 1);
    ts.forEachChild(node, visit);
  }
  visit(ast);
  assert.deepEqual(invalid, [], `Invalid station color literals at ${invalid.join(', ')}`);
});
