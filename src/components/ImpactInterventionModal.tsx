import React, { useEffect, useMemo, useState } from 'react';
import {
  GLOBAL_REGIONS_ATLAS,
  ORDERED_GLOBAL_REGIONS
} from '../data/globalRegionsAtlas';
import {
  fetchNasaPowerTelemetry,
  GlobalRegionId,
  NasaPowerTelemetry
} from '../services/nasaEarthDataService';
import { retroAudio } from '../audio/retroAudioAndVoice';

interface ImpactInterventionModalProps {
  isOpen: boolean;
  regionId: GlobalRegionId;
  scannedCountInRegion: number;
  interviewedCountInRegion: number;
  completedInterventions: GlobalRegionId[];
  onCompleteIntervention: (regionId: GlobalRegionId) => void;
  onClose: () => void;
}

export const ImpactInterventionModal: React.FC<ImpactInterventionModalProps> = ({
  isOpen,
  regionId,
  scannedCountInRegion,
  interviewedCountInRegion,
  completedInterventions,
  onCompleteIntervention,
  onClose
}) => {
  const region = GLOBAL_REGIONS_ATLAS[regionId];
  const spec = region.intervention;
  const [c0, c1] = spec.controls;

  const [val0, setVal0] = useState<number>(c0.defaultValue);
  const [val1, setVal1] = useState<number>(c1.defaultValue);
  const [fusedComplementaryData, setFusedComplementaryData] = useState<boolean>(false);
  const [powerData, setPowerData] = useState<NasaPowerTelemetry | null>(null);
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);

  useEffect(() => {
    setVal0(spec.controls[0].defaultValue);
    setVal1(spec.controls[1].defaultValue);
    setFusedComplementaryData(completedInterventions.includes(regionId));
    setCopiedBrief(false);
  }, [regionId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    setPowerData(null);
    fetchNasaPowerTelemetry(region.id, region.lat, region.lon).then(data => { if (active) setPowerData(data); });
    return () => { active = false; };
  }, [isOpen, region.id]);

  // Evaluate scientific & engineering calibration quality in real time!
  const evaluation = useMemo(() => {
    const inOpt0 = val0 >= c0.optimalMin && val0 <= c0.optimalMax;
    const inOpt1 = val1 >= c1.optimalMin && val1 <= c1.optimalMax;

    const dist0 = inOpt0
      ? 0
      : Math.min(val0 < c0.optimalMin ? c0.optimalMin - val0 : val0 - c0.optimalMax) /
        (c0.max - c0.min);
    const dist1 = inOpt1
      ? 0
      : Math.min(val1 < c1.optimalMin ? c1.optimalMin - val1 : val1 - c1.optimalMax) /
        (c1.max - c1.min);

    const paramScore = Math.round(Math.max(0, 1 - (dist0 + dist1) * 1.1) * 68);
    const fusionBonus = fusedComplementaryData ? 24 : 0;
    const fieldBonus = Math.min(8, scannedCountInRegion * 3 + interviewedCountInRegion * 2);
    const totalScore = Math.min(100, paramScore + fusionBonus + fieldBonus);

    let diagnosis = '';
    if (!inOpt0) {
      diagnosis =
        val0 < c0.optimalMin
          ? `⚠️ ${c0.label} (${val0}${c0.unit}) is below the author-chosen game range; try a different trade-off.`
          : `⚠️ ${c0.label} (${val0}${c0.unit}) is above the author-chosen game range; not a measured hazard threshold.`;
    } else if (!inOpt1) {
      diagnosis =
        val1 < c1.optimalMin
          ? `⚠️ ${c1.label} (${val1}${c1.unit}) is below the author-chosen game range; real infrastructure exposure is not computed.`
          : `⚠️ ${c1.label} (${val1}${c1.unit}) is above the author-chosen game range; no engineering sustainability model is implemented.`;
    } else if (!fusedComplementaryData) {
      diagnosis =
        'Game controls are in their author-chosen target range. Acknowledge missing independent evidence to complete this exercise; this is not operational readiness.';
    } else {
      diagnosis = 'Game checklist complete. No real sensors, warnings or interventions are connected.';
    }

    const readyToDeploy = inOpt0 && inOpt1 && fusedComplementaryData;
    return { inOpt0, inOpt1, totalScore, diagnosis, readyToDeploy };
  }, [val0, val1, c0, c1, fusedComplementaryData, scannedCountInRegion, interviewedCountInRegion, spec]);

  if (!isOpen) return null;

  const isAlreadySolved = completedInterventions.includes(regionId);

  const generateStakeholderMarkdown = () => {
    const lines = [
      `# Educational scenario worksheet — NOT an operational advisory`,
      `**Study Region:** ${region.flag} ${region.name} (${region.coordsLabel}) — ${region.country}`,
      `**Prospective stakeholders (no partnership established):** ${spec.stakeholderAgency}`,
      `**Illustrative scenario themes:** ${region.hiddenPhenomenaBadge}`,
      ``,
      `## 1. Data Provenance & Scientific Integrity Statement`,
      `- **Provenance:** ${region.scientificIntegrity.dataProvenanceBadge}`,
      `- **Simulated radar quantities:** ${region.scientificIntegrity.measuredRadarObservable}`,
      `- **Physical Interpretation:** ${region.scientificIntegrity.physicalInterpretation}`,
      `- **Why SAR Alone Is Insufficient:** ${region.scientificIntegrity.whySarAloneIsInsufficient}`,
      `- **Complementary datasets to investigate (not all integrated):** ${region.scientificIntegrity.complementaryNasaDatasets.join(', ')}`,
      `- **Field validation required, not performed:** ${region.scientificIntegrity.groundValidationRequired}`,
      ``,
      powerData
        ? `## 2. NASA POWER climatology context (${powerData.sourceLabel})\n- Data period: ${powerData.dataPeriod}\n- Fetched: ${powerData.fetchedAtIso || 'not fetched'}\n- Source: ${powerData.sourceUrl}\n- Peak monthly climatological precipitation: ${powerData.peakPrecipMmDay.toFixed(2)} mm/day\n- Peak climatological dimensionless wetness index (GWETTOP × 100, not volumetric %): ${(powerData.peakSurfaceWetness * 100).toFixed(0)}%\n- Annual dimensionless root-zone wetness index (GWETROOT × 100): ${(powerData.rootZoneWetnessAnn * 100).toFixed(0)}%\n- Temperature Range: ${powerData.coldestTempC.toFixed(1)}°C to ${powerData.warmestTempC.toFixed(1)}°C`
        : '',
      ``,
      `## 3. Hypothetical game configuration`,
      `- **${c0.label}:** ${val0}${c0.unit} (Author-chosen game target: ${c0.optimalMin}–${c0.optimalMax}${c0.unit})`,
      `- **${c1.label}:** ${val1}${c1.unit} (Author-chosen game target: ${c1.optimalMin}–${c1.optimalMax}${c1.unit})`,
      `- **Acknowledged evidence gaps (no real sensors connected):** ${fusedComplementaryData ? 'YES' : 'PENDING'}`,
      `- **Unquantified community discussion priority:** ${spec.impactMetrics.peopleProtectedLabel}`,
      `- **Unquantified infrastructure / ecosystem priority:** ${spec.impactMetrics.economicOrEcoSavedLabel}`,
      `- **Discussion prompt only:** ${spec.impactMetrics.actionableAdvisorySummary}`,
      ``,
      `*Game progress (not achieved impact): ${ORDERED_GLOBAL_REGIONS.filter((r) => completedInterventions.includes(r.id)).length}/5 region exercises recorded; no real communities protected.*`
    ];
    return lines.join('\n');
  };

  const handleDownloadBrief = () => {
    retroAudio.playUiClick(760);
    const md = generateStakeholderMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Educational_Scenario_Worksheet_${region.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedBrief(true);
  };

  return (
    <div className="photo-archive-backdrop" onClick={onClose}>
      <div
        className="photo-archive-modal intervention-modal" role="dialog" aria-modal="true" aria-label="Hypothetical community action exercise"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="photo-archive-header">
          <div>
            <span className="photo-kicker">
              ⚡ HANDS-ON COMMUNITY IMPACT SIMULATOR // {region.flag} {region.name.toUpperCase()}
            </span>
            <h2>{spec.missionTitle}</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              retroAudio.playUiClick(480);
              onClose();
            }}
          >
            ✕ CLOSE [ESC]
          </button>
        </div>

        <div className="intervention-grid">
          {/* LEFT: CALIBRATION CONTROLS + MULTI-SENSOR FUSION */}
          <div className="intervention-controls-col">
            <div className="intervention-prompt-box">
              <strong>🏛️ Prospective stakeholders (not project partners): {spec.stakeholderAgency}</strong>
              <p>{spec.challengePrompt}</p>
            </div>

            {/* Control 1 */}
            <div className={`calib-card ${evaluation.inOpt0 ? 'optimal' : ''}`}>
              <div className="calib-head">
                <label htmlFor="action-control-0">{c0.label}</label>
                <strong>
                  {val0}
                  {c0.unit}{' '}
                  {evaluation.inOpt0 ? '✅' : `(Target: ${c0.optimalMin}–${c0.optimalMax}${c0.unit})`}
                </strong>
              </div>
              <input
                type="range"
                id="action-control-0"
                min={c0.min}
                max={c0.max}
                step={c0.step}
                value={val0}
                onChange={(e) => setVal0(Number(e.target.value))}
              />
              <small>{c0.helpText}</small>
            </div>

            {/* Control 2 */}
            <div className={`calib-card ${evaluation.inOpt1 ? 'optimal' : ''}`}>
              <div className="calib-head">
                <label htmlFor="action-control-1">{c1.label}</label>
                <strong>
                  {val1}
                  {c1.unit}{' '}
                  {evaluation.inOpt1 ? '✅' : `(Target: ${c1.optimalMin}–${c1.optimalMax}${c1.unit})`}
                </strong>
              </div>
              <input
                type="range"
                id="action-control-1"
                min={c1.min}
                max={c1.max}
                step={c1.step}
                value={val1}
                onChange={(e) => setVal1(Number(e.target.value))}
              />
              <small>{c1.helpText}</small>
            </div>

            {/* Mandatory Complementary NASA Sensor + Ground Truth Fusion Toggle! */}
            <label className={`fusion-check-card ${fusedComplementaryData ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={fusedComplementaryData}
                onChange={(e) => {
                  retroAudio.playUiClick(690);
                  setFusedComplementaryData(e.target.checked);
                }}
              />
              <div>
                <strong>🔗 {spec.actionToggleLabel}</strong>
                <small>
                  No real sensors are integrated by this checkbox. {region.scientificIntegrity.whySarAloneIsInsufficient}
                </small>
              </div>
            </label>
          </div>

          {/* RIGHT: LIVE NASA POWER SPARKLINE + REAL-WORLD IMPACT OUTCOME */}
          <div className="intervention-outcome-col">
            {powerData && (
              <div className="power-sparkline-box">
                <div className="spark-head">
                  <span>
                    {powerData.isLiveApi
                      ? 'MODEL OUTPUT • NASA POWER CLIMATOLOGY (NOT CURRENT WEATHER)'
                      : 'ILLUSTRATION • UNVERIFIED LOCAL CLIMATOLOGY EXAMPLE'}
                  </span>
                  <small>{region.coordsLabel} • {powerData.dataPeriod}</small>
                </div>
                <div className="spark-bars">
                  {powerData.monthly.map((m) => (
                    <div key={m.month} className="spark-col" title={`${m.month}: Wetness ${Math.round(m.gwetTop * 100)}%, Precip ${m.precipMmDay} mm/d`}>
                      <div className="spark-bar-wrap">
                        <div
                          className="spark-bar-wet"
                          style={{ height: `${Math.max(8, Math.round(m.gwetTop * 100))}%` }}
                        />
                      </div>
                      <span>{m.month[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p style={{ fontSize: 12, lineHeight: 1.6 }}>SIMULATION: score = up to 68 points for toy controls + 24 for acknowledging missing evidence + up to 8 for fictional field-game visits. NASA climatology does not drive the score. Not a probability, validation or readiness estimate.</p>
            <div className="readiness-meter-box">
              <div className="readiness-top">
                <span>Game checklist • not scientific validity</span>
                <strong>{evaluation.totalScore}%</strong>
              </div>
              <div className="vis-track">
                <div
                  className="vis-fill sar"
                  style={{ width: `${evaluation.totalScore}%` }}
                />
              </div>
              <p className="diagnosis-line">{evaluation.diagnosis}</p>
            </div>

            <div className="impact-results-box">
              <div className="impact-stat">
                <span>Hypothetical discussion priority • no calculated impact</span>
                <strong>{spec.impactMetrics.peopleProtectedLabel}</strong>
              </div>
              <div className="impact-stat">
                <span>Hypothetical infrastructure / ecosystem concern</span>
                <strong>{spec.impactMetrics.economicOrEcoSavedLabel}</strong>
              </div>
            </div>

            <div className="intervention-cta-stack">
              <button
                type="button"
                className={`deploy-impact-btn ${evaluation.readyToDeploy ? 'ready' : 'locked'}`}
                disabled={!evaluation.readyToDeploy}
                onClick={() => {
                  retroAudio.playBadgeUnlock();
                  onCompleteIntervention(regionId);
                }}
              >
                {isAlreadySolved
                  ? 'EXERCISE COMPLETE • NO REAL INTERVENTION'
                  : evaluation.readyToDeploy
                    ? 'COMPLETE HYPOTHETICAL EXERCISE'
                    : 'SET TOY CONTROLS IN TARGET RANGES + ACKNOWLEDGE EVIDENCE GAPS'}
              </button>

              <button
                type="button"
                className="export-brief-btn"
                onClick={handleDownloadBrief}
              >
                📄 {copiedBrief ? 'DOWNLOADED EDUCATIONAL WORKSHEET (.MD)!' : 'EXPORT EDUCATIONAL WORKSHEET (.MD)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

