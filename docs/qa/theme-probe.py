"""Helpers for browser_exec's native browser session; evidence is observed DOM.

Load with exec(open(path).read()), then run one bounded scenario batch.
No network mocking, artificial data, new dependencies or app-state injection.
"""
import json
import shutil
import time
from pathlib import Path

THEME_ROOT = Path('/home/safal0715/Documents/Projects/NASA')
THEME_OUTPUT = THEME_ROOT / 'docs/qa'
THEME_LOG = THEME_OUTPUT / 'theme-browser-measurements.jsonl'

THEME_MEASURE = (
    '(() => {'
    'const frame=document.querySelector(window.__themeSelector);if(!frame)throw Error("Missing surface "+window.__themeSelector);'
    'const root=getComputedStyle(document.documentElement),style=getComputedStyle(frame);'
    'const tokens=["case","ink","screen","panel","key","line","text","muted","accent","safe","danger"];'
    'const rgb=hex=>"rgb("+[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)).join(", ")+")";'
    'const palette=Object.fromEntries(tokens.map(t=>[t,rgb(root.getPropertyValue("--game-"+t).trim())]));'
    'const allowed=new Set(Object.values(palette));'
    'const direct=e=>[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join(" ").trim();'
    'const excluded=e=>Boolean(e.closest("svg,canvas,.pin-3d-label"));'
    'const visible=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=="hidden";'
    'const nodes=[frame,...frame.querySelectorAll("*")].filter(e=>visible(e)&&!excluded(e));'
    'const outside=nodes.filter(e=>direct(e)&&!allowed.has(getComputedStyle(e).color)).map(e=>({cls:e.className||e.tagName,text:direct(e).slice(0,90),color:getComputedStyle(e).color}));'
    'const gradients=nodes.filter(e=>getComputedStyle(e).backgroundImage.includes("gradient")&&!e.matches(".sci-legend-bar")).map(e=>({cls:e.className,image:getComputedStyle(e).backgroundImage}));'
    'const blueBackgrounds=nodes.filter(e=>{if(e.matches(".sci-legend-bar"))return false;const c=getComputedStyle(e).backgroundColor.match(/[\\d.]+/g)?.map(Number);return c&&c[2]>c[0]+12&&c[2]>c[1]&&(c.length<4||c[3]>.1)}).map(e=>({cls:e.className||e.tagName,color:getComputedStyle(e).backgroundColor}));'
    'const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};};'
    'const overflow=nodes.filter(e=>e.clientWidth>0&&e.scrollWidth>e.clientWidth+2&&!e.matches(".curtain-divider-line")&&!/auto|scroll/.test(getComputedStyle(e).overflowX)).map(e=>({cls:e.className||e.tagName,client:e.clientWidth,scroll:e.scrollWidth}));'
    'const controls=nodes.filter(e=>e.matches("button,input[type=checkbox],summary"));'
    'return {viewport:{w:innerWidth,h:innerHeight},url:location.href,visibility:document.visibilityState,selector:window.__themeSelector,frame:{...rect(frame),background:style.backgroundColor,image:style.backgroundImage,border:style.borderColor},palette,outside,gradients,blueBackgrounds,overflow,documentOverflow:document.documentElement.scrollWidth>innerWidth,controls:controls.map(e=>({cls:e.className,text:e.innerText?.slice(0,90),h:e.getBoundingClientRect().height,background:getComputedStyle(e).backgroundColor,color:getComputedStyle(e).color,disabled:e.disabled===true})),images:[...frame.querySelectorAll("img")].map(e=>({src:e.getAttribute("src"),w:e.naturalWidth,h:e.naturalHeight,filter:getComputedStyle(e).filter,opacity:getComputedStyle(e).opacity})),errors:window.__themeErrors||[]};'
    '})()'
)


def theme_wait(selector, timeout=6):
    for _ in range(round(timeout * 10)):
        if js(f'Boolean(document.querySelector({json.dumps(selector)}))'):
            return
        time.sleep(.1)
    raise AssertionError('UI did not render: ' + selector)


def theme_click(selector):
    theme_wait(selector)
    js(f'document.querySelector({json.dumps(selector)}).click()')
    time.sleep(.15)


def theme_launch(width, height, url='http://127.0.0.1:5173/'):
    goto_url(url)
    wait_for_load()
    cdp('Page.bringToFront')
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=height, deviceScaleFactor=1, mobile=width<=820)
    theme_wait('.expedition-launch-btn.observatory')
    actual = js('({w:innerWidth,h:innerHeight,visibility:document.visibilityState})')
    assert actual == {'w': width, 'h': height, 'visibility': 'visible'}, actual
    js('window.__themeErrors=[];addEventListener("error",e=>{if(e.message)__themeErrors.push(e.message)});addEventListener("unhandledrejection",e=>__themeErrors.push(String(e.reason)))')


def theme_field():
    theme_click('.expedition-launch-btn.observatory')
    theme_wait('.expedition-top-hud')


def theme_dismiss_radio():
    js('document.querySelector(".field-radio-close")?.click()')
    time.sleep(.1)


def theme_key(key, code, virtual_key):
    cdp('Input.dispatchKeyEvent', type='keyDown', key=key, code=code, windowsVirtualKeyCode=virtual_key)
    cdp('Input.dispatchKeyEvent', type='keyUp', key=key, code=code, windowsVirtualKeyCode=virtual_key)
    time.sleep(.12)


def theme_snapshot(surface, selector, variant='default', phase='baseline', screenshot=True):
    theme_wait(selector)
    js(f'window.__themeSelector={json.dumps(selector)}')
    row = js(THEME_MEASURE)
    row.update(surface=surface, variant=variant, phase=phase)
    if screenshot:
        name = f'theme-{surface}-{variant}-{row["viewport"]["w"]}x{row["viewport"]["h"]}.png'
        shot = capture_screenshot()
        source = shot if isinstance(shot, str) else '/home/safal0715/.config/browser-harness/tmp/shot.png'
        (THEME_OUTPUT / 'screenshots').mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, THEME_OUTPUT / 'screenshots' / name)
        row['screenshot'] = 'screenshots/' + name
    THEME_OUTPUT.mkdir(parents=True, exist_ok=True)
    with THEME_LOG.open('a') as output:
        output.write(json.dumps(row) + '\n')
    print(json.dumps({key: row[key] for key in ['surface', 'variant', 'phase', 'viewport', 'frame', 'outside', 'gradients', 'blueBackgrounds', 'overflow', 'documentOverflow', 'errors']}))
    return row


def theme_basic_surfaces(width, height, phase='baseline', url='http://127.0.0.1:5173/'):
    theme_launch(width, height, url)
    theme_snapshot('launch', '.expedition-terminal-frame', phase=phase)
    theme_click('.biome-preview-pill:last-child')
    theme_snapshot('launch', '.expedition-terminal-frame', 'biome-selected', phase)
    theme_click('.biome-preview-pill:first-child')
    theme_field()
    theme_snapshot('field', '.expedition-fullscreen-stage', phase=phase)
    theme_snapshot('radio', '.field-radio-frame', 'intro', phase)
    theme_dismiss_radio()
    for surface, button, selector in [
        ('logbook', '.quest-hud-btn', '.quest-journal-card'),
        ('sites', '.map-btn', '.fieldnav-card:not(.quest-journal-card)'),
        ('photos', '.photo-hud-btn', '.photo-archive-modal:not(.intervention-modal)'),
        ('action', '.action-hud-btn', '.intervention-modal'),
    ]:
        theme_click(button)
        theme_snapshot(surface, selector, phase=phase)
        theme_click(selector + ' .modal-close-btn')
    theme_click('.world-hud-btn')
    theme_snapshot('atlas', '.world-atlas-shell', phase=phase)
    theme_click('.atlas-region-tab:last-child')
    theme_snapshot('atlas', '.world-atlas-shell', 'region-selected', phase)
    theme_click('.world-atlas-shell .modal-close-btn')
    theme_click('.judge-resume')
    theme_snapshot('evidence', '.judge-briefing', phase=phase)
    theme_click('.judge-steps button:nth-child(2)')
    theme_snapshot('evidence', '.judge-briefing', 'comparison', phase)
    theme_click('.judge-provenance > summary')
    theme_snapshot('evidence', '.judge-briefing', 'provenance', phase)
    theme_click('.judge-header button')
    theme_click('.lab-shortcut')
    theme_wait('.mainframe-bezel-chassis')
    theme_snapshot('computer', '.mainframe-bezel-chassis', 'map-2d', phase)
    for index, app in [(2, 'compare'), (3, 'radar-lab'), (4, 'nasa-context'), (5, 'checklist')]:
        theme_click(f'.mainframe-fkeys-bar .fkey-btn:nth-child({index})')
        theme_snapshot('computer', '.mainframe-bezel-chassis', app, phase)
    cdp('Emulation.clearDeviceMetricsOverride')


def theme_source_site_click(kind):
    """Use source-defined spawn/prop coordinates, through real UI and pointer input."""
    theme_click('.map-btn')
    js("[...document.querySelectorAll('.fieldnav-dest-btn')].find(e=>e.innerText.includes('Syabrubesi Dobhan')).click()")
    time.sleep(1)
    canvas = js('(()=>{const c=document.querySelector(".expedition-main-canvas"),r=c.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,cw:c.width}})()')
    cam_x = round((28 + .5) * 16 - canvas['cw'] / 2)
    cam_y = round((72 + .5) * 16 - 120)
    world_x, world_y = ((27 + .5) * 16, 74 * 16) if kind == 'beacon' else ((26 + .5) * 16, (71 + .5) * 16)
    click_at_xy(canvas['x'] + (world_x - cam_x) / canvas['cw'] * canvas['w'], canvas['y'] + (world_y - cam_y) / 240 * canvas['h'])
    time.sleep(.4)


def theme_field_exercise(width, height, phase='verified', url='http://127.0.0.1:5173/'):
    theme_launch(width, height, url)
    theme_field()
    theme_dismiss_radio()
    theme_source_site_click('beacon')
    theme_snapshot('ground-truth', '.field-gt-modal', phase=phase)
    theme_click('.field-gt-auto-btn')
    assert js('document.querySelector(".field-gt-status-pill.locked")?.innerText.includes("COMPLETE")')
    theme_snapshot('ground-truth', '.field-gt-modal', 'aligned', phase)
    theme_click('.field-gt-opt-btn:nth-child(2)')
    theme_wait('.field-gt-feedback.wrong')
    theme_snapshot('ground-truth', '.field-gt-modal', 'wrong', phase)
    theme_click('.field-gt-opt-btn:first-child')
    theme_wait('.field-gt-feedback.correct')
    theme_snapshot('ground-truth', '.field-gt-modal', 'correct', phase)
    theme_click('.field-gt-close-btn')
    theme_source_site_click('sita')
    theme_snapshot('radio', '.field-radio-frame', 'interview', phase)
    theme_snapshot('radio', '.field-radio-choice-menu', 'topics', phase)
    js('document.activeElement?.blur()')
    theme_key('ArrowDown', 'ArrowDown', 40)
    theme_snapshot('radio', '.field-radio-choice-menu', 'topic-selected', phase)
    cdp('Emulation.clearDeviceMetricsOverride')
