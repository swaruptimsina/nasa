import React, { useEffect, useRef, useState } from 'react';
import {
  GlobalRegionDefinition,
  ORDERED_GLOBAL_REGIONS
} from '../data/globalRegionsAtlas';
import {
  fetchNasaEonetEvents,
  fetchNasaPowerTelemetry,
  GlobalRegionId,
  NasaEonetEvent,
  NasaPowerTelemetry
} from '../services/nasaEarthDataService';
import { getCharacterSprite, getPropSprite } from '../game/biomePixelArtEngine';
import { retroAudio } from '../audio/retroAudioAndVoice';

interface PixelWorldGlobeScreenProps {
  isOpen: boolean;
  activeRegionId: GlobalRegionId;
  completedInterventions: GlobalRegionId[];
  completedQuestCountByRegion: Record<GlobalRegionId, { done: number; total: number }>;
  onSelectRegionAndPlay: (regionId: GlobalRegionId, spawnInLab: boolean) => void;
  onClose?: () => void; // Optional when opened from boot screen vs in-game overlay
}

// Handcrafted low-res pixel landmask polygons [lon, lat] for crisp 16-bit Pixel Earth Continents!
const CONTINENT_POLYS: Array<{ color: string; hiColor: string; pts: Array<[number, number]> }> = [
  // North America + Alaska + Central America
  {
    color: '#2d7a47',
    hiColor: '#4ade80',
    pts: [
      [-168, 66], [-162, 71], [-135, 70], [-110, 74], [-82, 72], [-62, 60], [-55, 48],
      [-70, 41], [-81, 25], [-90, 21], [-84, 10], [-78, 8], [-95, 16], [-106, 23],
      [-117, 32], [-124, 42], [-132, 55], [-152, 60], [-166, 60]
    ]
  },
  // Greenland (Ice sheet)
  {
    color: '#cbd5e1',
    hiColor: '#f8fafc',
    pts: [[-54, 60], [-44, 60], [-20, 70], [-22, 82], [-56, 81], [-60, 74]]
  },
  // South America (Amazon & Pantanal emerald core!)
  {
    color: '#1f8a4c',
    hiColor: '#86efac',
    pts: [
      [-78, 9], [-62, 10], [-50, 1], [-35, -6], [-39, -18], [-48, -28],
      [-58, -38], [-68, -54], [-74, -50], [-71, -30], [-70, -18], [-81, -5]
    ]
  },
  // Europe + Anatolia
  {
    color: '#3b8246',
    hiColor: '#a3e635',
    pts: [
      [-10, 36], [5, 37], [15, 38], [28, 36], [42, 41], [55, 55], [45, 68],
      [25, 71], [10, 63], [3, 52], [-9, 44]
    ]
  },
  // Africa
  {
    color: '#b48a46',
    hiColor: '#fde047',
    pts: [
      [-17, 15], [-13, 28], [-5, 35], [11, 37], [32, 31], [43, 12], [51, 11],
      [40, -11], [35, -24], [20, -35], [14, -22], [9, -2], [-8, 5]
    ]
  },
  // Asia + India + Himalayas + Japan/SE Asia
  {
    color: '#347d4e',
    hiColor: '#6ee7b7',
    pts: [
      [28, 36], [36, 36], [48, 30], [58, 24], [68, 24], [77, 8], [88, 22],
      [98, 16], [104, 2], [109, 14], [122, 24], [132, 42], [142, 52],
      [170, 64], [178, 68], [140, 73], [95, 75], [60, 70], [50, 52], [38, 42]
    ]
  },
  // Himalayan & Tibetan High Plateau Snow Cap
  {
    color: '#e2e8f0',
    hiColor: '#ffffff',
    pts: [[73, 35], [82, 28], [94, 28], [98, 35], [86, 38]]
  },
  // Maritime SE Asia (Sumatra / Borneo / Java)
  {
    color: '#1f8a4c',
    hiColor: '#4ade80',
    pts: [[96, 5], [118, 6], [120, -8], [104, -8]]
  },
  // Australia
  {
    color: '#c2783e',
    hiColor: '#fdba74',
    pts: [[114, -22], [132, -12], [146, -16], [153, -28], [146, -39], [130, -33], [115, -34]]
  },
  // Antarctica
  {
    color: '#dbeafe',
    hiColor: '#ffffff',
    pts: [[-180, -72], [-60, -68], [20, -70], [110, -68], [180, -72], [180, -89], [-180, -89]]
  }
];

function lonLatToCanvas(lon: number, lat: number, W: number, H: number): [number, number] {
  const x = ((lon + 180) / 360) * W;
  const y = ((84 - lat) / 162) * H; // Cropped nicely from 84°N to 78°S
  return [x, y];
}

export const PixelWorldGlobeScreen: React.FC<PixelWorldGlobeScreenProps> = ({
  isOpen,
  activeRegionId,
  completedInterventions,
  completedQuestCountByRegion,
  onSelectRegionAndPlay,
  onClose
}) => {
  const [selectedId, setSelectedId] = useState<GlobalRegionId>(activeRegionId);
  const [eonetEvents, setEonetEvents] = useState<NasaEonetEvent[]>([]);
  const [eonetLive, setEonetLive] = useState<boolean>(false);
  const [eonetFetchedAt, setEonetFetchedAt] = useState('');
  const [powerData, setPowerData] = useState<NasaPowerTelemetry | null>(null);
  const [showLiveEonetPins, setShowLiveEonetPins] = useState<boolean>(true);

  const mapCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dioramaCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedRegion: GlobalRegionDefinition =
    ORDERED_GLOBAL_REGIONS.find((r) => r.id === selectedId) || ORDERED_GLOBAL_REGIONS[0];

  useEffect(() => {
    setSelectedId(activeRegionId);
  }, [activeRegionId]);

  // Fetch Live NASA EONET v3 global active events!
  useEffect(() => {
    if (!isOpen) return;
    fetchNasaEonetEvents().then((res) => {
      setEonetEvents(res.events);
      setEonetLive(res.isLive);
      setEonetFetchedAt(res.fetchedAt);
    });
  }, [isOpen]);

  // Fetch Live NASA POWER climatology for whichever region pin is selected!
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setPowerData(null);
    fetchNasaPowerTelemetry(selectedRegion.id, selectedRegion.lat, selectedRegion.lon).then((d) => {
      if (!cancelled) setPowerData(d);
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen, selectedRegion.id]);

  // Draw Crisp 16-Bit Pixel Earth Map + Orbiting NISAR Swath + Live NASA EONET Pins!
  useEffect(() => {
    if (!isOpen) return;
    let raf = 0;
    let tick = 0;

    // Pre-bake pixelated base continents onto an offscreen low-res pixel buffer (270 x 140) so continents have authentic chunky pixel edges!
    const lowW = 270;
    const lowH = 140;
    const off = document.createElement('canvas');
    off.width = lowW;
    off.height = lowH;
    const octx = off.getContext('2d')!;
    octx.imageSmoothingEnabled = false;

    // Deep pixelated ocean bands
    for (let y = 0; y < lowH; y++) {
      const latNorm = Math.abs(y / lowH - 0.52);
      octx.fillStyle = latNorm > 0.38 ? '#0c2d48' : latNorm > 0.2 ? '#0a3a5e' : '#0b4a72';
      octx.fillRect(0, y, lowW, 1);
    }

    // Fill continents on low-res grid for true 16-bit pixel coastline look!
    for (const poly of CONTINENT_POLYS) {
      octx.fillStyle = poly.color;
      octx.beginPath();
      poly.pts.forEach(([lon, lat], idx) => {
        const [px, py] = lonLatToCanvas(lon, lat, lowW, lowH);
        if (idx === 0) octx.moveTo(px, py);
        else octx.lineTo(px, py);
      });
      octx.closePath();
      octx.fill();

      octx.strokeStyle = poly.hiColor;
      octx.lineWidth = 1;
      octx.stroke();
    }

    const draw = () => {
      tick++;
      const c = mapCanvasRef.current;
      if (!c) return;
      const W = 810;
      const H = 420;
      if (c.width !== W) {
        c.width = W;
        c.height = H;
      }
      const ctx = c.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;

      // 1. Blit 3x scaled crisp pixel Earth!
      ctx.drawImage(off, 0, 0, W, H);

      // 2. Subtle Lat/Lon Graticule Lines
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.14)';
      ctx.lineWidth = 1;
      for (let lon = -150; lon <= 150; lon += 30) {
        const [gx] = lonLatToCanvas(lon, 0, W, H);
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H);
        ctx.stroke();
      }
      for (const lat of [-60, -30, 0, 30, 60]) {
        const [, gy] = lonLatToCanvas(0, lat, W, H);
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }

      // 3. Animated NISAR Sun-Synchronous Polar Orbit Ground Track & 240 km L+S Swath!
      const orbitShift = (tick * 0.9) % W;
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 18;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 6) {
        const y = H * 0.5 + Math.sin(((x + orbitShift) / W) * Math.PI * 2) * (H * 0.42);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // NISAR Satellite Pixel Icon flying along orbit!
      const satX = (tick * 2.2) % W;
      const satY = H * 0.5 + Math.sin(((satX + orbitShift) / W) * Math.PI * 2) * (H * 0.42);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(satX - 12, satY - 3, 24, 6);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(satX - 4, satY - 6, 8, 12);
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#e0f2fe';
      ctx.fillText('🛰️ NISAR (L+S)', satX + 14, satY - 6);
      ctx.restore();

      // 4. Live NASA EONET Active Global Hazard Telemetry Blips!
      if (showLiveEonetPins) {
        for (const ev of eonetEvents) {
          const [ex, ey] = lonLatToCanvas(ev.lon, ev.lat, W, H);
          ctx.fillStyle = 'rgba(251, 146, 60, 0.35)';
          ctx.beginPath();
          ctx.arc(ex, ey, 6 + Math.sin(tick * 0.12) * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fb923c';
          ctx.fillRect(Math.round(ex - 2), Math.round(ey - 2), 4, 4);
        }
      }

      // 5. Draw the 5 Playable "Hidden Earth Changes" Global Hotspots!
      ORDERED_GLOBAL_REGIONS.forEach((reg) => {
        const [rx, ry] = lonLatToCanvas(reg.lon, reg.lat, W, H);
        const isSel = reg.id === selectedId;
        const isDone = completedInterventions.includes(reg.id);
        const pulse = Math.sin(tick * 0.12) * 4;

        // Outer radar pulse ring
        ctx.strokeStyle = isSel ? '#fde047' : reg.accentColor;
        ctx.lineWidth = isSel ? 3 : 2;
        ctx.beginPath();
        ctx.arc(rx, ry, (isSel ? 17 : 11) + pulse * 0.5, 0, Math.PI * 2);
        ctx.stroke();

        // Crisp pixel marker box
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(rx - 9, ry - 9, 18, 18);
        ctx.fillStyle = isDone ? '#22c55e' : isSel ? '#fde047' : reg.accentColor;
        ctx.fillRect(rx - 7, ry - 7, 14, 14);
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.fillText(String(reg.order), rx - 3, ry + 4);

        // Label tag
        const shortPinName =
          reg.id === 'rasuwa_nepal'
            ? 'Rasuwa'
            : reg.id === 'pantanal_brazil'
              ? 'Pantanal'
              : reg.id === 'san_joaquin_usa'
                ? 'San Joaquin'
                : reg.id === 'hatay_turkiye'
                  ? 'Hatay'
                  : 'Yukon Delta';
        const label = `${reg.flag} ${shortPinName}`;
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        const tw = ctx.measureText(label).width + 10;
        const lx = Math.min(W - tw - 6, Math.max(6, rx - tw / 2));
        const ly = ry > H * 0.72 ? ry - 28 : ry + 14;
        ctx.fillStyle = isSel ? 'rgba(15, 23, 42, 0.96)' : 'rgba(15, 23, 42, 0.82)';
        ctx.fillRect(lx, ly, tw, 18);
        ctx.strokeStyle = isSel ? '#fde047' : reg.accentColor;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(lx, ly, tw, 18);
        ctx.fillStyle = isSel ? '#fde047' : '#f8fafc';
        ctx.fillText(label, lx + 5, ly + 13);
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [isOpen, selectedId, eonetEvents, showLiveEonetPins, completedInterventions]);

  // Draw Live Cultural Pixel Mini-Diorama Preview of Selected Region!
  useEffect(() => {
    if (!isOpen) return;
    const c = dioramaCanvasRef.current;
    if (!c) return;
    c.width = 220;
    c.height = 82;
    const ctx = c.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 220, 82);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 56, 220, 26);

    const bldgKind =
      selectedRegion.id === 'rasuwa_nepal'
        ? 'tamang_stone_house'
        : selectedRegion.id === 'pantanal_brazil'
          ? 'palafita_house'
          : selectedRegion.id === 'san_joaquin_usa'
            ? 'campesino_coop_hall'
            : selectedRegion.id === 'hatay_turkiye'
              ? 'antakya_courtyard_house'
              : 'yupik_stilt_house';

    const treeKind =
      selectedRegion.id === 'rasuwa_nepal'
        ? 'laliguras_tree'
        : selectedRegion.id === 'pantanal_brazil'
          ? 'ipe_amarelo_tree'
          : selectedRegion.id === 'san_joaquin_usa'
            ? 'almond_tree'
            : selectedRegion.id === 'hatay_turkiye'
              ? 'olive_tree'
              : 'salmon_smokehouse';

    const leadPal =
      selectedRegion.id === 'rasuwa_nepal'
        ? 'rudra'
        : selectedRegion.id === 'pantanal_brazil'
          ? 'br_indigenous'
          : selectedRegion.id === 'san_joaquin_usa'
            ? 'ca_campesino'
            : selectedRegion.id === 'hatay_turkiye'
              ? 'tr_elder'
              : 'ak_yupik_elder';

    ctx.drawImage(getPropSprite(treeKind, 0), 12, 22);
    ctx.drawImage(getPropSprite(bldgKind, 0), 66, 6);
    ctx.drawImage(getCharacterSprite(selectedRegion.playerPalette, 'down', 0), 160, 46);
    ctx.drawImage(getCharacterSprite(leadPal, 'down', 0), 186, 46);
  }, [isOpen, selectedRegion]);

  if (!isOpen) return null;

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 810;
    const cy = ((e.clientY - rect.top) / rect.height) * 420;
    for (const reg of ORDERED_GLOBAL_REGIONS) {
      const [rx, ry] = lonLatToCanvas(reg.lon, reg.lat, 810, 420);
      if (Math.hypot(cx - rx, cy - ry) <= 32) {
        retroAudio.playUiClick(660);
        setSelectedId(reg.id);
        return;
      }
    }
  };

  const qProg = completedQuestCountByRegion[selectedRegion.id] || {
    done: 0,
    total: selectedRegion.quests.length
  };
  const isInterventionDone = completedInterventions.includes(selectedRegion.id);

  return (
    <div className="world-atlas-overlay">
      <div className="world-atlas-shell" role="dialog" aria-modal="true" aria-label="Secondary regional atlas and NASA context">
        {/* TOP HEADER */}
        <div className="world-atlas-topbar">
          <div>
            <div className="atlas-kicker">
              🌍 PIXEL EARTH SURFACE-CHANGE ATLAS // NASA–ISRO NISAR + SCIENCE.NASA.GOV/EARTH
            </div>
            <h2>Choose a Global Community Facing Optically Unseen Surface Changes</h2>
          </div>

          <div className="atlas-topbar-right">
            <div className="impact-global-pill">
              🏆 Game exercises completed: <strong>{completedInterventions.length} / 5</strong>
            </div>
            {onClose && (
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  retroAudio.playUiClick(480);
                  onClose();
                }}
              >
                ✕ RETURN TO CURRENT MAP [ESC]
              </button>
            )}
          </div>
        </div>

        {/* REGION QUICK SELECTOR CHIPS */}
        <div className="atlas-region-tabs">
          {ORDERED_GLOBAL_REGIONS.map((reg) => {
            const done = completedInterventions.includes(reg.id);
            return (
              <button
                key={reg.id}
                type="button"
                className={`atlas-region-tab ${selectedId === reg.id ? 'active' : ''}`}
                onClick={() => {
                  retroAudio.playUiClick(620);
                  setSelectedId(reg.id);
                }}
              >
                <span>
                  {reg.flag} #{reg.order} {reg.name}
                </span>
                <small>
                  {done ? '✅ Impact Solved' : reg.hiddenPhenomenaBadge.split('•')[0].trim()}
                </small>
              </button>
            );
          })}
        </div>

        {/* MAIN SPLIT: PIXEL WORLD MAP CANVAS (LEFT) + CULTURAL & NASA SCIENCE BRIEFING (RIGHT) */}
        <div className="world-atlas-body">
          <div className="world-atlas-map-col">
            <div className="pixel-earth-frame">
              <canvas
                ref={mapCanvasRef}
                className="pixel-earth-canvas"
                onClick={handleCanvasClick}
              />
              <div className="earth-map-legend-bar">
                <span>🟦 Click any numbered Pixel Pin (#1–#5) to inspect region</span>
                <label className="eonet-toggle-label">
                  <input
                    type="checkbox"
                    checked={showLiveEonetPins}
                    onChange={(e) => setShowLiveEonetPins(e.target.checked)}
                  />
                  🟠 {eonetLive ? 'REPORTED ESTIMATE • EONET curated event feed' : 'EONET unavailable / not yet fetched; no events invented'} (
                  {eonetEvents.length})
                </label>
              </div>
            </div>

            <details className="science-boundary"><summary>EONET source reports &amp; retrieval status</summary>
              <p>{eonetLive ? `Fetched / session cached at ${eonetFetchedAt}` : 'API unavailable or pending; no events substituted.'} Returned Point geometries only, at most 20 requested events; not a complete local hazard inventory.</p>
              {eonetEvents.map(event => <p key={event.id}>REPORTED ESTIMATE • {event.title} • {event.dateIso} • {event.lat}°, {event.lon}° • <a href={event.sourceUrl || 'https://eonet.gsfc.nasa.gov/docs/v3'} target="_blank" rel="noreferrer">Original source</a></p>)}
            </details>
            {/* SCIENTIFIC LIMITATION BANNER (MANDATORY SCIENTIFIC RIGOR!) */}
            <div className="atlas-limitation-banner">
              <div className="limitation-title">
                ⚠️ SCIENTIFIC INTEGRITY &amp; COMPLEMENTARY DATA PRINCIPLE ({selectedRegion.name}):
              </div>
              <p>
                <strong>Simulated radar quantity:</strong>{' '}
                {selectedRegion.scientificIntegrity.measuredRadarObservable} &rarr;{' '}
                <strong>Interpretation:</strong>{' '}
                {selectedRegion.scientificIntegrity.physicalInterpretation}.{' '}
                <span className="limitation-warn-highlight">
                  {selectedRegion.scientificIntegrity.whySarAloneIsInsufficient}
                </span>
              </p>
            </div>
          </div>

          {/* RIGHT INSPECTOR CARD FOR SELECTED REGION */}
          <div className="world-atlas-detail-col">
            <div className="region-detail-header">
              <div>
                <span className="region-biome-chip">{selectedRegion.biomeBadge}</span>
                <h3>
                  {selectedRegion.flag} {selectedRegion.name}
                </h3>
                <div className="region-native-sub">
                  {selectedRegion.nativeTitle} • {selectedRegion.coordsLabel}
                </div>
              </div>
              <canvas ref={dioramaCanvasRef} className="region-diorama-canvas" />
            </div>

            <div className="hidden-change-callout">
              <div className="hc-label">🔍 OPTICALLY UNSEEN PHENOMENON FEATURED:</div>
              <strong>{selectedRegion.hiddenPhenomenaBadge}</strong>
              <div className="visibility-bars">
                <div className="vis-row">
                  <span>👁️ Illustrated optical visibility (not accuracy):</span>
                  <div className="vis-track">
                    <div
                      className="vis-fill optical"
                      style={{ width: `${selectedRegion.opticalVisibilityPct}%` }}
                    />
                  </div>
                  <strong>{selectedRegion.opticalVisibilityPct}%</strong>
                </div>
                <div className="vis-row">
                  <span>🛰️ Illustrated radar coverage (not accuracy):</span>
                  <div className="vis-track">
                    <div
                      className="vis-fill sar"
                      style={{ width: `${selectedRegion.sarVisibilityPct}%` }}
                    />
                  </div>
                  <strong>{selectedRegion.sarVisibilityPct}%</strong>
                </div>
              </div>
            </div>

            {/* LIVE NASA POWER DATA READOUT */}
            {powerData && (
              <div className="live-nasa-power-card">
                <div className="power-card-head">
                  <span>
                    {powerData.isLiveApi
                      ? 'MODEL OUTPUT • NASA POWER climatology'
                      : 'ILLUSTRATION • unverified local fallback'}
                  </span>
                  <small>Model grid elevation: {powerData.elevationM}m (not station altitude)</small>
                </div>
                <p className="science-boundary">{powerData.dataPeriod} • fetched {powerData.fetchedAtIso || 'not fetched'} • climatology, not current weather. GWETTOP / GWETROOT are dimensionless, not volumetric water %. <a href={powerData.sourceUrl} target="_blank" rel="noreferrer">Response / method</a></p>
                <div className="power-metrics-row">
                  <div>
                    <small>Peak climatological rain</small>
                    <strong>{powerData.peakPrecipMmDay.toFixed(1)} mm/d</strong>
                  </div>
                  <div>
                    <small>Dimensionless wetness × 100</small>
                    <strong>{Math.round(powerData.peakSurfaceWetness * 100)}%</strong>
                  </div>
                  <div>
                    <small>Root wetness index × 100</small>
                    <strong>{Math.round(powerData.rootZoneWetnessAnn * 100)}%</strong>
                  </div>
                  <div>
                    <small>Monthly mean temperature range</small>
                    <strong>
                      {powerData.coldestTempC.toFixed(0)}°..{powerData.warmestTempC.toFixed(0)}°C
                    </strong>
                  </div>
                </div>
              </div>
            )}

            <div className="region-culture-box">
              <div>
                <strong>🏘️ Culture-inspired fictional scenes (human review needed):</strong> {selectedRegion.culturalSummary}
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>🔗 Proposed complementary missions (not all integrated):</strong>{' '}
                {selectedRegion.scientificIntegrity.complementaryNasaDatasets.join(' + ')}
              </div>
            </div>

            <div className="region-progress-strip">
              <span>
                🎯 Regional Quests: <strong>{qProg.done}/{qProg.total}</strong>
              </span>
              <span>
                Toy exercise:{' '}
                <strong>{isInterventionDone ? 'EXERCISE COMPLETE' : '⏳ Needs Action'}</strong>
              </span>
            </div>

            <div className="atlas-launch-buttons">
              <button
                type="button"
                className="atlas-play-btn primary"
                onClick={() => {
                  retroAudio.playBadgeUnlock();
                  onSelectRegionAndPlay(selectedRegion.id, false);
                }}
              >
                ▶ EXPLORE 2D {selectedRegion.name.toUpperCase()} WORLD
                <small>Explore Fictional Characters • Game Quests &amp; Unverified Assets</small>
              </button>
              <button
                type="button"
                className="atlas-play-btn secondary"
                onClick={() => {
                  retroAudio.playUiClick(740);
                  onSelectRegionAndPlay(selectedRegion.id, true);
                }}
              >
                🏛️ ENTER {selectedRegion.labBuildingName.toUpperCase()}
                <small>Consult {selectedRegion.leadScientistName} &amp; 2D/3D Supercomputer</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

