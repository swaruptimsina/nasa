"""Exercise the actual production UI inside browser_exec; no app-state injection."""


def theme_checked_state(variant):
    row = theme_snapshot('computer', '.mainframe-bezel-chassis', variant, 'controls-production')
    assert not any(row.get(key) for key in ['outside', 'gradients', 'blueBackgrounds', 'overflow', 'errors']) and not row['documentOverflow'], 'Expanded computer chrome must stay readable and themed'
    return row


def theme_native_range(selector, key='ArrowRight', code='ArrowRight', virtual_key=39):
    theme_wait(selector)
    before = js(f'document.querySelector({json.dumps(selector)}).value')
    js(f'document.querySelector({json.dumps(selector)}).focus()')
    theme_key(key, code, virtual_key)
    after = js(f'document.querySelector({json.dumps(selector)}).value')
    assert before != after, 'Native range keyboard input must change the actual form value'
    return {'selector': selector, 'before': before, 'after': after}


def theme_computer_controls(width, height, url='http://localhost:4173/'):
    theme_launch(width, height, url)
    theme_field()
    theme_dismiss_radio()
    theme_click('.lab-shortcut')
    theme_wait('.mainframe-bezel-chassis')
    operations = {'viewport': {'w': width, 'h': height}, 'url': url, 'layers': [], 'steps': [], 'ranges': []}
    for mode in ['2D', '3D']:
        if mode == '3D':
            theme_click('.show-3d-hero-btn')
            theme_wait('.terrain-3d-wrapper')
            time.sleep(2.8)
        count = js('document.querySelectorAll(".obs-layer-strip .layer-btn").length')
        assert count == 6, 'The shared layer menu must retain all six source-defined layers'
        for index in range(1, count + 1):
            selector = f'.obs-layer-strip .layer-btn:nth-child({index})'
            theme_click(selector)
            state = js(f'(()=>{{const e=document.querySelector({json.dumps(selector)});return {{mode:{json.dumps(mode)},label:e.innerText,pressed:e.getAttribute("aria-pressed"),legend:document.querySelector(".sci-legend-head")?.innerText}}}})()')
            assert state['pressed'] == 'true' and state['legend']
            operations['layers'].append(state)
        count = js('document.querySelectorAll(".timeline-steps-row .time-step-pill").length')
        assert count > 1
        for index in range(1, count + 1):
            theme_click(f'.timeline-steps-row .time-step-pill:nth-child({index})')
            state = js('({label:document.querySelector(".time-step-pill.active")?.innerText,status:document.querySelector(".pass-status-summary")?.innerText})')
            assert state['label'] and state['status']
            operations['steps'].append({'mode': mode, **state})
        theme_checked_state(mode.lower() + '-layer-controls')
        if mode == '2D':
            theme_click('.observatory-notebook > summary')
            assert js('document.querySelector(".observatory-notebook").open')
            theme_click('.st-mini-btn:first-child')
            theme_checked_state('notebook-open')
            theme_click('.inspector-subtabs .subtab-btn:nth-child(2)')
            theme_click('.quiz-opt-btn:nth-child(2)')
            theme_wait('.quiz-feedback.retry')
            theme_checked_state('notebook-quiz-retry')
            theme_click('.quiz-opt-btn:first-child')
            theme_wait('.quiz-feedback.ok')
            theme_checked_state('notebook-quiz-correct')
            theme_click('.observatory-notebook > summary')
            assert not js('document.querySelector(".observatory-notebook").open')
        else:
            expected = js('document.querySelector(".flyto-bar-3d .flyto-chip:last-child").innerText.trim()')
            theme_click('.flyto-bar-3d .flyto-chip:last-child')
            time.sleep(1.3)
            assert js('document.querySelector(".terrain-station-caption strong").innerText').startswith(expected)
            js('(()=>{const b=[...document.querySelectorAll(".pin-3d-label")].find(e=>getComputedStyle(e).visibility==="visible");if(!b)throw Error("No projected station button");window.__clickedStationCode=b.innerText.trim();b.click()})()')
            time.sleep(1.3)
            assert js('document.querySelector(".terrain-station-caption strong").innerText.startsWith(window.__clickedStationCode)')
            theme_checked_state('3d-station-selection')
            theme_click('.return-2d-hero-btn')
            time.sleep(2.8)
            theme_wait('.obs-map-surface')
    theme_click('.mainframe-fkeys-bar .fkey-btn:nth-child(2)')
    operations['ranges'].append(theme_native_range('.curtain-invisible-slider'))
    theme_click('.curtain-toolbar button:nth-child(2)')
    theme_checked_state('compare-preset-and-wipe')
    theme_click('.mainframe-fkeys-bar .fkey-btn:nth-child(3)')
    for index in [1, 2]:
        operations['ranges'].append(theme_native_range(f'.lab-control:nth-of-type({index}) input[type=range]'))
    theme_click('.physics-controls-col .shader-pill:nth-child(2)')
    theme_click('.physics-controls-col .shader-pill:nth-child(4)')
    for index in [2, 1]:
        selector = f'.physics-controls-col .check-pill:nth-child({index}) input'
        if not js(f'document.querySelector({json.dumps(selector)}).checked'):
            theme_click(selector)
        assert js(f'document.querySelector({json.dumps(selector)}).checked')
        theme_checked_state('radar-canopy' if index == 2 else 'radar-controls')
    theme_click('.mainframe-fkeys-bar .fkey-btn:nth-child(4)')
    theme_checked_state('nasa-source-disclosure')
    theme_click('.mainframe-fkeys-bar .fkey-btn:nth-child(5)')
    selector = '.warning-builder-col .lab-control:first-of-type input'
    value = int(js(f'document.querySelector({json.dumps(selector)}).value'))
    if value != 8:
        operations['ranges'].append(theme_native_range(selector, 'Home', 'Home', 36))
    if not js('document.querySelector(".warning-builder-col .check-pill input").checked'):
        theme_click('.warning-builder-col .check-pill input')
    theme_wait('.triage-result-banner.good')
    assert js('!document.querySelector(".warning-builder-col .deploy-warning-btn").disabled')
    theme_checked_state('checklist-enabled')
    theme_click('.step-back-lab-btn')
    assert not js('Boolean(document.querySelector(".mainframe-bezel-chassis"))')
    theme_wait('.expedition-top-hud')
    theme_click('.action-hud-btn')
    for selector in ['#action-control-0', '#action-control-1']:
        js(f'(()=>{{const e=document.querySelector({json.dumps(selector)}),card=e.closest(".calib-card");if(card.classList.contains("optimal"))return;const match=card.querySelector(".calib-head strong").innerText.match(/Target:\\s*(-?[\\d.]+)–/);if(!match)throw Error("Missing displayed game target");Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set.call(e,match[1]);e.dispatchEvent(new Event("input",{{bubbles:true}}));e.dispatchEvent(new Event("change",{{bubbles:true}}))}})()')
        time.sleep(.15)
    theme_click('.fusion-check-card input')
    theme_wait('.deploy-impact-btn.ready')
    row = theme_snapshot('action', '.intervention-modal', 'acknowledged-game-targets', 'controls-production')
    assert not any(row.get(key) for key in ['outside', 'gradients', 'blueBackgrounds', 'overflow', 'errors']) and not row['documentOverflow']
    with (THEME_OUTPUT / 'theme-controls-measurements.jsonl').open('a') as output:
        output.write(json.dumps(operations) + '\n')
    print(json.dumps({'verified_controls': operations}))
    cdp('Emulation.clearDeviceMetricsOverride')
