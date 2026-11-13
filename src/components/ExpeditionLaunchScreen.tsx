import React, { useEffect, useRef, useState } from 'react';
import { getCharacterSprite, getPropSprite, getTerrainTile } from '../game/biomePixelArtEngine';
import { ORDERED_GLOBAL_REGIONS } from '../data/globalRegionsAtlas';
import { GlobalRegionId } from '../services/nasaEarthDataService';

interface ExpeditionLaunchScreenProps {
  onStartGame: (
    mode: 'world_atlas' | 'syabrubesi' | 'inside_lab' | 'judge_demo',
    initialRegionId?: GlobalRegionId
  ) => void;
}

type PreviewSceneMode = 'all' | GlobalRegionId;

export const ExpeditionLaunchScreen: React.FC<ExpeditionLaunchScreenProps> = ({
  onStartGame
}) => {
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [sceneMode, setSceneMode] = useState<PreviewSceneMode>('rasuwa_nepal');

  useEffect(() => {
    let raf = 0;
    let tick = 0;

    const draw = () => {
      tick++;
      const c = heroCanvasRef.current;
      if (!c) return;
      const W = 448;
      const H = 128;
      if (c.width !== W || c.height !== H) {
        c.width = W;
        c.height = H;
      }
      const ctx = c.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;
      const anim = Math.floor(tick / 18) % 4;
      const walkF = (Math.floor(tick / 14) % 2 === 0 ? 1 : 2) as 1 | 2;

      for (let ty = 0; ty < H / 16; ty++) {
        for (let tx = 0; tx < W / 16; tx++) {
          let kind = 'grass';

          if (sceneMode === 'all') {
            // 5-Biome Seamless Global Transect: Himalaya -> Pantanal -> San Joaquin -> Hatay -> Alaska
            if (tx <= 5) {
              kind =
                ty === 5
                  ? tx <= 2
                    ? 'bridge_wood'
                    : 'path'
                  : tx === 1
                    ? 'rapids'
                    : tx === 2
                      ? 'river_cobble'
                      : ty <= 1 && tx >= 4
                        ? 'snow'
                        : 'grass';
            } else if (tx <= 11) {
              kind =
                ty === 5
                  ? 'boardwalk'
                  : tx === 7
                    ? 'corixo_water'
                    : ty >= 3
                      ? 'wetland_marsh'
                      : 'tropical_forest_floor';
            } else if (tx <= 16) {
              kind =
                ty === 5
                  ? 'path'
                  : tx === 12
                    ? 'aqueduct_water'
                    : ty <= 3
                      ? 'orchard_soil'
                      : 'valley_loam';
            } else if (tx <= 22) {
              kind =
                ty === 5
                  ? 'limestone_paving'
                  : tx === 17
                    ? 'asi_water'
                    : ty <= 3
                      ? 'olive_terrace'
                      : 'terra_rossa';
            } else {
              kind =
                ty === 5
                  ? 'boardwalk'
                  : tx === 23
                    ? 'bering_surf'
                    : tx === 24
                      ? 'coastal_mud'
                      : tx >= 26 && ty <= 3
                        ? 'upland_gravel'
                        : 'tundra_moss';
            }
          } else if (sceneMode === 'rasuwa_nepal') {
            kind =
              ty === 5
                ? tx >= 4 && tx <= 8
                  ? 'bridge_wood'
                  : 'path'
                : tx >= 5 && tx <= 7
                  ? tx === 6
                    ? 'rapids'
                    : 'water'
                  : tx === 4 || tx === 8
                    ? 'river_cobble'
                    : tx >= 21 && ty <= 2
                      ? 'glacier_ice'
                      : tx >= 18 && ty <= 3
                        ? 'snow'
                        : 'grass';
          } else if (sceneMode === 'pantanal_brazil') {
            kind =
              ty === 5
                ? 'boardwalk'
                : Math.abs(tx - 8 - Math.round(Math.sin(ty * 0.7))) <= 1
                  ? 'corixo_water'
                  : tx <= 13
                    ? 'wetland_marsh'
                    : tx >= 21 && ty <= 3
                      ? 'peat_soil'
                      : 'tropical_forest_floor';
          } else if (sceneMode === 'san_joaquin_usa') {
            kind =
              ty === 5
                ? tx >= 6 && tx <= 8
                  ? 'bridge_wood'
                  : 'path'
                : tx === 7
                  ? 'aqueduct_water'
                  : tx === 6 || tx === 8
                    ? 'concrete_canal'
                    : tx <= 4
                      ? 'arid_scrub'
                      : tx >= 16 && ty <= 4
                        ? 'orchard_soil'
                        : tx >= 10 && tx <= 14 && ty <= 3
                          ? 'alfalfa_crop'
                          : 'valley_loam';
          } else if (sceneMode === 'hatay_turkiye') {
            kind =
              ty === 5
                ? tx === 6 || tx === 7
                  ? 'bridge_wood'
                  : 'limestone_paving'
                : tx === 6 || tx === 7
                  ? 'asi_water'
                  : tx >= 17 && ty <= 4
                    ? 'olive_terrace'
                    : 'terra_rossa';
          } else {
            kind =
              ty === 5
                ? 'boardwalk'
                : tx <= 5
                  ? 'bering_surf'
                  : tx <= 7
                    ? 'coastal_mud'
                    : tx >= 20 && ty <= 4
                      ? 'upland_gravel'
                      : 'tundra_moss';
          }

          ctx.drawImage(getTerrainTile(kind, anim, tx, ty), tx * 16, ty * 16);
        }
      }

      if (sceneMode === 'all') {
        ctx.drawImage(getPropSprite('buddhist_stupa', anim), 42, 26);
        ctx.drawImage(getPropSprite('palafita_house', anim), 118, 12);
        ctx.drawImage(getPropSprite('subsidence_pole', anim), 214, 14);
        ctx.drawImage(getPropSprite('cay_evi_teahouse', anim), 288, 18);
        ctx.drawImage(getPropSprite('salmon_smokehouse', anim), 382, 24);

        ctx.drawImage(getCharacterSprite('player', 'right', walkF), 64, 72);
        ctx.drawImage(getCharacterSprite('br_indigenous', 'down', 0), 148, 72);
        ctx.drawImage(getCharacterSprite('ca_campesino', 'down', 0), 236, 72);
        ctx.drawImage(getCharacterSprite('tr_geodesist', 'left', walkF), 324, 72);
        ctx.drawImage(getCharacterSprite('ak_yupik_elder', 'left', 0), 408, 72);
      } else if (sceneMode === 'rasuwa_nepal') {
        ctx.drawImage(getPropSprite('laliguras_tree', anim), 20, 16);
        ctx.drawImage(getPropSprite('dhm_nisar_kendra', anim), 142, -6);
        ctx.drawImage(getPropSprite('flood_siren_tower', anim), 268, 28);
        ctx.drawImage(getPropSprite('radar_beacon', anim), 336, 44);
        ctx.drawImage(getCharacterSprite('rudra', 'down', 0), 186, 72);
        ctx.drawImage(getCharacterSprite('player', 'right', walkF), 112, 74);
      } else if (sceneMode === 'pantanal_brazil') {
        ctx.drawImage(getPropSprite('palafita_house', anim), 40, 12);
        ctx.drawImage(getPropSprite('inpe_nisar_estacao', anim), 186, 0);
        ctx.drawImage(getPropSprite('timber_check_dam', anim), 312, 42);
        ctx.drawImage(getCharacterSprite('br_scientist', 'down', 0), 226, 72);
        ctx.drawImage(getCharacterSprite('br_ranger', 'right', walkF), 156, 74);
      } else if (sceneMode === 'san_joaquin_usa') {
        ctx.drawImage(getPropSprite('usgs_hydro_lab', anim), 152, 0);
        ctx.drawImage(getPropSprite('subsidence_pole', anim), 286, 14);
        ctx.drawImage(getPropSprite('mar_recharge_basin', anim), 344, 28);
        ctx.drawImage(getCharacterSprite('ca_hydrologist', 'down', 0), 192, 72);
        ctx.drawImage(getCharacterSprite('ca_campesino', 'right', walkF), 258, 74);
      } else if (sceneMode === 'hatay_turkiye') {
        ctx.drawImage(getPropSprite('hydro_dam', anim), 20, 14);
        ctx.drawImage(getPropSprite('kandilli_nisar_lab', anim), 154, 0);
        ctx.drawImage(getPropSprite('fault_rupture_scar', anim), 296, 26);
        ctx.drawImage(getPropSprite('seismic_retrofit_station', anim), 378, 26);
        ctx.drawImage(getCharacterSprite('tr_afad_engineer', 'right', walkF), 246, 74);
        ctx.drawImage(getCharacterSprite('tr_geodesist', 'down', 0), 192, 72);
      } else {
        ctx.drawImage(getPropSprite('salmon_smokehouse', anim), 118, 22);
        ctx.drawImage(getPropSprite('above_arctic_lab', anim), 188, 0);
        ctx.drawImage(getPropSprite('thermosyphon_array', anim), 312, 26);
        ctx.drawImage(getPropSprite('yupik_stilt_house', anim), 356, 16);
        ctx.drawImage(getCharacterSprite('ak_scientist', 'right', walkF), 232, 74);
        ctx.drawImage(getCharacterSprite('ak_yupik_elder', 'down', 0), 154, 72);
      }

      // Subtle NISAR orbital swath scanline sweeping across the top sky band
      const beamX = ((tick * 2.2) % (W + 120)) - 60;
      const grad = ctx.createLinearGradient(beamX - 36, 0, beamX + 36, 0);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.22)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(beamX - 36, 0, 72, H);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [sceneMode]);

  const activeRegionMeta =
    sceneMode === 'all'
      ? null
      : ORDERED_GLOBAL_REGIONS.find((r) => r.id === sceneMode) || null;

  return (
    <div className="expedition-launch-overlay">
      <div className="expedition-terminal-frame">
        <div className="expedition-top-telemetry">
          <div className="expedition-mission-id">
            <span className="pulse-dot-live" />
            <span>NASA–ISRO NISAR // L-BAND (24 cm) + S-BAND (9 cm) FIELD EXPEDITION SIMULATOR</span>
          </div>
          <div className="expedition-provenance-tag">
            ARCHIVED NISAR REFERENCE • NASA CONTEXT • EDUCATIONAL SIMULATION
          </div>
        </div>

        {/* Interactive Biome Panorama Switcher */}
        <div className="expedition-panorama-wrap">
          <canvas ref={heroCanvasRef} className="expedition-hero-canvas" role="img" aria-label="Illustrated pixel-art regional landscapes" />
          <div className="expedition-biome-tabs">
            <button
              type="button"
              className={`biome-preview-pill ${sceneMode === 'all' ? 'active' : ''}`}
              onClick={() => setSceneMode('all')}
            >
              🌍 All 5 Biomes
            </button>
            {ORDERED_GLOBAL_REGIONS.map((reg) => (
              <button
                key={reg.id}
                type="button"
                className={`biome-preview-pill ${sceneMode === reg.id ? 'active' : ''}`}
                onClick={() => setSceneMode(reg.id)}
              >
                {reg.flag} {reg.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="expedition-title-section">
          <div className="expedition-kicker">
            RADAR CHANGE → EVIDENCE → UNCERTAINTY → COMMUNITY DISCUSSION
          </div>
          <h1 className="expedition-main-title">ECHOES OF RASUWA: GLOBAL WALTZ</h1>
          <p className="expedition-subtitle">
            Help a <strong>Rasuwa community-preparedness educator</strong> decide what evidence to request before discussing flood risk.
            Compare <strong>real, dated NISAR browse images at Hubbard Glacier</strong>, then explore a clearly labeled Rasuwa scenario in 2D/3D.
            Connect radar observations to people and possible actions—without pretending to predict a disaster.
          </p>
          <p className="launch-challenge-line">
            <a href="https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars/" target="_blank" rel="noreferrer">2026 challenge: Dancing with the SARs</a>
            {' '}• Browse-level NISAR demonstration; local scientific-product analysis remains incomplete.
          </p>
          {activeRegionMeta && <p className="launch-secondary-region">Free exploration: {activeRegionMeta.flag} {activeRegionMeta.name} • culture-inspired fictional scene, not a surveyed map.</p>}
        </div>

        <div className="expedition-cta-grid">
          <button type="button" className="expedition-launch-btn primary judge-launch" onClick={() => onStartGame('judge_demo')}>
            <span className="cta-title">▶ START GUIDED EVIDENCE TRAIL</span>
            <small>Judge path • One user, one decision • No walking, audio or shortcuts required</small>
          </button>
          <button
            type="button"
            className="expedition-launch-btn secondary"
            onClick={() => onStartGame('world_atlas')}
          >
            <span className="cta-title">🌍 OPEN GLOBAL RADAR ATLAS</span>
            <small>
              Secondary Exploration • NASA Climatology &amp; Curated Event Context
            </small>
          </button>

          <button
            type="button"
            className="expedition-launch-btn secondary"
            onClick={() =>
              onStartGame(
                'syabrubesi',
                sceneMode === 'all' ? 'rasuwa_nepal' : sceneMode
              )
            }
          >
            <span className="cta-title">
              {activeRegionMeta
                ? `${activeRegionMeta.flag} DEPLOY TO ${activeRegionMeta.name.split(' ')[0].toUpperCase()} FIELD`
                : '🇳🇵 BEGIN FIELD EXPEDITION (RASUWA)'}
            </span>
            <small>
              Explore Pixel Terrain • Fictional Characters, Simulated Beacons &amp; Quests
            </small>
          </button>

          <button
            type="button"
            className="expedition-launch-btn observatory"
            onClick={() =>
              onStartGame(
                'inside_lab',
                sceneMode === 'all' ? 'rasuwa_nepal' : sceneMode
              )
            }
          >
            <span className="cta-title">
              🏛️ ENTER 2D/3D OBSERVATORY LAB
            </span>
            <small>
              Explore Simulated Radar Layers, Illustrative 3D Terrain &amp; Action Exercise
            </small>
          </button>
        </div>

        <div className="expedition-footer-bar">
          <span>
            ⌨️ Controls: WASD / Arrows or Click-to-Walk • [SPACE] Interact / Calibrate • [G] Atlas • [I] Action Sim • [P] Archive Photos
          </span>
          <span>
            🔬 Strict Science: Observable ≠ Interpretation • Detection ≠ Earthquake/Collapse Timing Prediction
          </span>
        </div>
      </div>
    </div>
  );
};

