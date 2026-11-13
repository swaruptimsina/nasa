"""Run inside browser_exec with its pre-imported browser helpers.

Checks the actual production monitor at desktop and mobile viewport sizes.
Writes measured evidence and screenshots; does not require new npm packages.
"""
import json
import shutil
import time
from pathlib import Path

URL = 'http://localhost:4173/'
ROOT = Path('/home/safal0715/Documents/Projects/NASA')
OUTPUT = ROOT / 'docs/qa'
SIZES = [(1258, 552), (1440, 900), (390, 844), (640, 360)]

MEASURE = """(() => {const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};};const map=document.querySelector('.terrain-3d-wrapper')||document.querySelector('.obs-map-surface'),r=map.getBoundingClientRect();let top=r.top,bottom=r.bottom;for(let p=map.parentElement;p;p=p.parentElement){if(/auto|scroll|hidden|clip/.test(getComputedStyle(p).overflowY)){const b=p.getBoundingClientRect();top=Math.max(top,b.top+p.clientTop);bottom=Math.min(bottom,b.top+p.clientTop+p.clientHeight);}}const is3D=Boolean(document.querySelector('.terrain-3d-wrapper'));const names=is3D?['.terrain-3d-wrapper','.world-overlay-actions.top-left-3d','.terrain-settings','.illustrative-height-note','.scientific-legend-overlay','.flyto-bar-3d','.terrain-station-caption']:['.obs-map-surface','.scientific-legend-overlay','.cursor-geodetic-pill'];const panels=names.map(selector=>({selector,...rect(document.querySelector(selector))}));const collisions=[];for(let i=0;i<panels.length;i++)for(let j=i+1;j<panels.length;j++){const a=panels[i],b=panels[j];if(Math.min(a.x+a.w,b.x+b.w)>Math.max(a.x,b.x)+1&&Math.min(a.y+a.h,b.y+b.h)>Math.max(a.y,b.y)+1)collisions.push([a.selector,b.selector]);}const caseEl=document.querySelector('.mainframe-bezel-chassis');const shortTargets=innerWidth<=820?[...caseEl.querySelectorAll('button:not(.pin-3d-label),summary')].filter(e=>e.getClientRects().length&&e.getBoundingClientRect().height<43.9).map(e=>({text:e.innerText.slice(0,60),height:e.getBoundingClientRect().height})):[];return {viewport:{w:innerWidth,h:innerHeight},mode:is3D?'3D':'2D',map:rect(map),visibleMapHeight:Math.max(0,bottom-top),fullyVisible:bottom-top>=r.height-2,caseOverflow:caseEl.scrollWidth>caseEl.clientWidth+2,documentOverflow:document.documentElement.scrollWidth>innerWidth,panels,collisions,shortTargets,errors:__layoutErrors,fonts:{pixel:document.fonts.check('16px "Press Start 2P"'),mono:document.fonts.check('16px "JetBrains Mono"')},transition:Boolean(document.querySelector('.retro-morph-banner'))};})()"""
ALIGN_MAP = """(() => {const map=document.querySelector('.terrain-3d-wrapper')||document.querySelector('.obs-map-surface'),screen=document.querySelector('.mainframe-crt-screen'),chassis=document.querySelector('.mainframe-bezel-chassis');screen.scrollTop=0;if(getComputedStyle(screen).overflowY==='visible')chassis.scrollTop+=map.getBoundingClientRect().top-chassis.getBoundingClientRect().top-chassis.clientTop;else screen.scrollTop+=map.getBoundingClientRect().top-screen.getBoundingClientRect().top-screen.clientTop;})()"""

records = []
OUTPUT.mkdir(parents=True, exist_ok=True)
(OUTPUT / 'screenshots').mkdir(exist_ok=True)
for width, height in SIZES:
    new_tab(URL)
    wait_for_load()
    cdp('Page.bringToFront')
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=height, deviceScaleFactor=1, mobile=width<=820)
    for _ in range(50):
        if js("Boolean(document.querySelector('.expedition-launch-btn.observatory'))"):
            break
        time.sleep(.1)
    assert js("Boolean(document.querySelector('.expedition-launch-btn.observatory'))"), 'Launch must actually render'
    js("window.__layoutErrors=[];addEventListener('error',e=>__layoutErrors.push(e.message));addEventListener('unhandledrejection',e=>__layoutErrors.push(String(e.reason)));document.querySelector('.expedition-launch-btn.observatory').click()")
    time.sleep(.3)
    js("document.querySelector('.lab-shortcut').click()")
    time.sleep(.4)
    for mode in ['2D', '3D']:
        if mode == '3D':
            js("document.querySelector('.show-3d-hero-btn').click()")
            time.sleep(2.8)
            js("document.querySelector('.flyto-bar-3d .flyto-chip:nth-child(2)').click()")
            time.sleep(1.3)
        js(ALIGN_MAP)
        time.sleep(.2)
        row = js(MEASURE)
        if mode == '3D':
            row['badges'] = js("(()=>{const root=document.querySelector('.terrain-3d-wrapper'),r=root.getBoundingClientRect(),labels=[...root.querySelectorAll('.pin-3d-label')].filter(e=>e.getClientRects().length&&getComputedStyle(e).visibility==='visible').map(e=>{const b=e.getBoundingClientRect();return {code:e.innerText.trim(),label:e.getAttribute('aria-label'),x:b.x-r.x,y:b.y-r.y,w:b.width,h:b.height}}),collisions=[];for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];if(Math.min(a.x+a.w,b.x+b.w)>Math.max(a.x,b.x)+.5&&Math.min(a.y+a.h,b.y+b.h)>Math.max(a.y,b.y)+.5)collisions.push([a.code,b.code])}return {labels,collisions,clipped:labels.filter(b=>b.x<0||b.y<0||b.x+b.w>r.width+1||b.y+b.h>r.height+1)}})()")
            assert row['badges']['labels'], 'Projected station badges must actually render'
            assert not row['badges']['collisions'] and not row['badges']['clipped'], 'Projected badges must not overlap or clip'
        assert row['mode'] == mode
        row['screenshot'] = f'screenshots/monitor-{width}x{height}-{mode.lower()}.png'
        shot = capture_screenshot()
        if isinstance(shot, str):
            shutil.copy2(shot, OUTPUT / row['screenshot'])
        else:
            # Browser harness reports this exact path when returning no value.
            shutil.copy2('/home/safal0715/.config/browser-harness/tmp/shot.png', OUTPUT / row['screenshot'])
        records.append(row)
        with (OUTPUT / 'monitor-layout-measurements.jsonl').open('a') as f:
            f.write(json.dumps(row) + '\n')
        print(json.dumps(row))
        assert row['fullyVisible'], 'A complete map must be reachable, not clipped by a second scroll viewport'
        assert not row['caseOverflow'] and not row['documentOverflow'], 'No horizontal overflow'
        assert row['collisions'] == [], 'Instrument groups must not overlap each other or the map'
        assert row['shortTargets'] == [], 'Phone controls/disclosures need 44px targets; compact pins have full-size alternatives'
        assert row['errors'] == [] and not row['transition']
        assert all(row['fonts'].values()), 'Check the actual fonts used, not unused declared font families'

expected = {(w, h, mode) for w, h in SIZES for mode in ['2D', '3D']}
actual = {(r['viewport']['w'], r['viewport']['h'], r['mode']) for r in records}
assert actual == expected and len(records) == len(expected)
(OUTPUT / 'monitor-layout-verified.json').write_text(json.dumps(records, indent=2) + '\n')
print('Verified production viewport/mode cases:', len(records))
cdp('Emulation.clearDeviceMetricsOverride')
