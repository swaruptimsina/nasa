import React, { useEffect, useRef, useState } from 'react';

interface JudgeBriefingProps {
  onClose: () => void;
  onOpenObservatory: () => void;
  onOpenEvidence: () => void;
  onOpenAction: () => void;
  initialStep?: number;
  isOpen?: boolean;
}

const source = 'https://science.nasa.gov/earth/earth-observatory/landslide-and-avalanche-debris-litter-hubbard-glacier/';
const challenge = 'https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars/';
const steps = ['Problem', 'Observation', 'Evidence', 'Interpretation', 'Possible action', 'Limitations'];

export const JudgeBriefing: React.FC<JudgeBriefingProps> = ({ onClose, onOpenObservatory, onOpenEvidence, onOpenAction, initialStep = 0, isOpen = true }) => {
  const [step, setStep] = useState(Math.max(0, Math.min(5, initialStep)));
  const [split, setSplit] = useState(50);
  const [imageFailed, setImageFailed] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    headingRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const controls = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, summary') || [])];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === headingRef.current)) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); previous?.focus(); };
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="judge-backdrop">
      <div className="judge-briefing" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="judge-title">
        <header className="judge-header">
          <div><span className="judge-kicker">ECHOES OF RASUWA • GUIDED EVIDENCE TRAIL</span>
            <h2 id="judge-title" ref={headingRef} tabIndex={-1}>From radar echoes to better questions</h2></div>
          <button type="button" onClick={onClose}>Explore freely / close</button>
        </header>
        <p className="judge-purpose">For a community-preparedness educator in Rasuwa: decide which corroborating evidence to request before discussing flood preparedness. No operational warning, evacuation advice or dam control.</p>
        <nav className="judge-steps" aria-label="Guided evidence trail">
          {steps.map((label, index) => <button key={label} type="button" aria-current={step === index ? 'step' : undefined} onClick={() => setStep(index)}>{index + 1}. {label}</button>)}
        </nav>
        <div className="judge-body">
          <section className="judge-story" aria-live="polite">
            <span className="judge-kicker">{step + 1} / {steps.length} • {steps[step]}</span>
            {step === 0 && <><h3>A map can show change. Who checks what it means?</h3><p>Mountain communities need understandable evidence, not another unexplained hazard color. This expedition connects an observation to questions about people, places and uncertainty.</p><p>REPORTED ESTIMATE / historical context: Nepal’s NDRRMA situation report dated 2026-09-01 describes an ice–rock avalanche and debris-flood event on 2026-08-26 affecting the Bhote Koshi–Trishuli corridor. This is preliminary, externally reported context—not an observation measured by this app. <a href="https://ndrrma.gov.np/mediafiles/rasuwa/Rasuwa_Flood_SitRep_Temp_ENG_01_01092026.pdf" target="_blank" rel="noreferrer">Government report &amp; its limitations</a></p><p>Start with a real NISAR example at Hubbard Glacier, near the Yukon–Alaska border. Then explore how the same evidence-seeking workflow might inform a Rasuwa discussion. The regions are not interchangeable.</p><p>Our contribution is the reasoning trail: compare, question, seek corroboration and discuss an action. Impact is intended educational value—not measured adoption or lives saved.</p></>}
            {step === 1 && <><h3>Compare two actual NISAR acquisitions</h3><p>Move the wipe or use its arrow keys. Look for green patches that appear on December 8 but not November 26. Also look for green terrain that was already there.</p><p>NASA explains that rougher debris-covered surfaces returned more radar energy after the December 6, 2025 earthquake. These are NASA-rendered false-color browse images, not a calibrated numerical raster or an app-generated change map.</p><p>The colors are not hazard probabilities. We do not derive displacement, a debris volume or collapse timing from this pair.</p></>}
            {step === 2 && <><h3>What supports the interpretation?</h3><p>NASA's source article reports Yukon Geological Survey follow-up flights on December 12, 2025. That is external corroboration reported by NASA—not a field survey conducted by this team.</p><p>For Rasuwa, local photos, precise locations and acquisition dates are still unverified. NPCs are fictional. A reflector-alignment game is a simulation, not a calibration record.</p><p>Request dated site photos, gauge records, surveyed coordinates, community consent and qualified geoscience review before transferring an interpretation.</p><button type="button" onClick={onOpenEvidence}>Inspect Rasuwa evidence gaps</button></>}
            {step === 3 && <><h3>Relief explains the question—not the answer</h3><p>Open the existing observatory. Compare its scenario steps in 2D, then select SHOW IN 3D. The schematic relief makes slope–river–settlement relationships easier to discuss than a flat color layer.</p><p>All Rasuwa radar quantities, cloud masks and deformation are simulation; terrain elevations are illustration with unverified DEM origin. They are not Rasuwa measurements. InSAR senses line-of-sight change; geometry, coherence and other observations constrain an interpretation.</p><button type="button" onClick={onOpenObservatory}>Open Rasuwa observatory</button><p className="judge-hint">Use the persistent “Evidence trail” button to return here. No walking or keyboard shortcuts required.</p></>}
            {step === 4 && <><h3>Discuss a hypothetical community action</h3><p>In the existing action simulator, change the two author-chosen controls and acknowledge missing corroboration. Watch the game checklist change. It is not a forecast, an optimization result or scientific validation.</p><p>A plausible next action is to request professional review and discuss preparedness with consenting community members. No real gauges, sirens, agencies or spillways are connected.</p><button type="button" onClick={onOpenAction}>Open hypothetical action simulator</button><p>The exported worksheet records the toy configuration and unresolved evidence—not an operational advisory.</p></>}
            {step === 5 && <><h3>What this prototype cannot establish</h3><ul><li>No operational readiness, real-time disaster prediction or validated warning thresholds.</li><li>No calibrated NISAR product ingestion or quantitative local surface-change analysis. The real integration is a published, two-date NISAR browse comparison.</li><li>No verified Rasuwa field validation, interview dataset or disaster-loss estimates.</li><li>POWER is coarse-grid climatological model output, not a current local gauge. EONET is a curated event feed, not exhaustive local hazard coverage.</li><li>Local cultural representation and image permissions still need human review.</li></ul><p>Next scientific milestone: ingest a documented local NISAR product pair, retain acquisition/processing metadata and quality masks, and compare interpretations with independent evidence.</p></>}
          </section>
          <section className="judge-observation" aria-label="Archived NASA NISAR comparison">
            <span className="judge-data-badge">ARCHIVED OBSERVATION • NISAR PUBLISHED BROWSE</span>
            <h3>Hubbard Glacier reference—not Rasuwa</h3>
            <div className="judge-date-row"><span>2025-11-26</span><span>2025-12-08</span></div>
            {imageFailed ? <div className="judge-image-unavailable" role="status">Reference imagery unavailable. Do not substitute a simulated observation. Read the linked NASA source; the Rasuwa educational scenario remains available.</div> : <div className="judge-image-wipe">
              <img src="/nisar-reference/hubbard-2025-12-08.jpg" alt="NASA NISAR false-color radar browse near Hubbard Glacier on December 8, 2025" onLoad={() => setImageCount(n => n + 1)} onError={() => setImageFailed(true)} />
              <img className="judge-before" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }} src="/nisar-reference/hubbard-2025-11-26.jpg" alt="Same NASA NISAR browse area on November 26, 2025, before the earthquake" onLoad={() => setImageCount(n => n + 1)} onError={() => setImageFailed(true)} />
              <div className="judge-wipe-line" style={{ left: `${split}%` }} />
            </div>}
            <label className="judge-wipe-control">Compare acquisitions: {split}% before / {100 - split}% after
              <input type="range" min={0} max={100} value={split} aria-label="Compare archived NISAR dates" onChange={e => setSplit(Number(e.target.value))} />
            </label>
            <p role="status" className="judge-hint">{imageFailed ? 'Image load failed' : imageCount >= 2 ? 'Local archived assets loaded • available without NASA API access' : 'Loading local archived assets…'}</p>
            <p className="judge-legend">NASA legend: green = rougher / stronger radar return; purple = smoother / weaker return. No calibrated σ⁰ scale is supplied here. Some green terrain is unchanged.</p>
            <p className="judge-credit">Credit: Images by Eric Fielding and Gustavo H. X. Shiroma (JPL/NISAR Algorithm Development Team), using NISAR GSLC data; prepared for NASA Earth Observatory by Lauren Dauphin. Published 2026-02-25. <a href={source} target="_blank" rel="noreferrer">Source, dates, interpretation &amp; original images</a></p>
          </section>
        </div>
        <details className="judge-provenance"><summary>Data labels, provenance &amp; challenge connection</summary>
          <p><a href={challenge} target="_blank" rel="noreferrer">2026 challenge: Dancing with the SARs</a> asks for interactive use of NISAR observations to visualize surface change. This pair provides browse-level change exploration; the Rasuwa layers remain an educational simulation. We do not claim a completed quantitative NISAR workflow.</p>
          <dl><dt>Archived observation</dt><dd>Dated NASA-rendered NISAR reference pair; fixed-date GIBS optical tiles where successfully loaded.</dd><dt>Model output</dt><dd>NASA POWER climatology fetched over the network, with returned period and retrieval time. Not live weather.</dd><dt>Reported estimate</dt><dd>EONET curated source reports when fetched; external corroboration attributed to NASA. No team-generated casualty estimates.</dd><dt>Simulation</dt><dd>Radar layers, scenario metrics, quizzes, reflector exercise and action checklist.</dd><dt>Illustration</dt><dd>Schematic terrain, fictional characters, unverified local imagery and author-supplied API fallback numbers.</dd><dt>Live observation</dt><dd>None in the core demo. A successful HTTP request does not make old data live.</dd></dl>
          <p>Review date: 2026-11-10. Challenge and event registration not submitted or verified. Official guidance prohibits project work before November 14 at 09:00 local time: disclose this pre-existing prototype and review to organizers before any submission.</p>
        </details>
        <footer className="judge-footer"><button type="button" disabled={step === 0} onClick={() => setStep(n => n - 1)}>Previous</button><span>Educational prototype • observation ≠ interpretation ≠ warning</span><button type="button" onClick={() => step < steps.length - 1 ? setStep(n => n + 1) : onClose()}>{step < steps.length - 1 ? `Next: ${steps[step + 1]}` : 'Finish / explore'}</button></footer>
      </div>
    </div>
  );
};
