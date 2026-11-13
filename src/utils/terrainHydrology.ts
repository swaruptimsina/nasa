import rawDem from '../data/rasuwaDem.json';
import { getGridGradient, getSimulatedRasuwaMotion, losToPhaseCycles, phaseCyclesToHue } from './simulatedRadarPhysics';
import {
  KERUNG_TRIBUTARY_PATH,
  LANGTANG_KHOLA_PATH,
  LHENDE_BHOTE_RIVER_PATH
} from '../data/rasuwaStoryData';
import { DemData, RadarLayerMode, TimelinePass } from '../types';

export const DEM: DemData = rawDem as DemData;

export interface PrecomputedCell {
  elev: number;
  slope: number;
  shade: number; // 0..1 hillshade
  distMainRiver: number; // normalized uv distance
  distTributary: number;
  distPurugu: number;
  inAvalancheChute: boolean;
}

function distToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function minDistToPolyline(u: number, v: number, path: Array<[number, number]>): number {
  let best = 999;
  for (let i = 0; i < path.length - 1; i++) {
    const d = distToSegment(u, v, path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]);
    if (d < best) best = d;
  }
  return best;
}

// Deterministic fast hash for pixel dithering & SAR speckle
function hash2d(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

// Smooth value noise for monsoon clouds & moisture patches
function valueNoise(u: number, v: number, scale: number, seed = 0): number {
  const x = u * scale + seed * 13.7;
  const y = v * scale + seed * 7.3;
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const n00 = hash2d(ix, iy);
  const n10 = hash2d(ix + 1, iy);
  const n01 = hash2d(ix, iy + 1);
  const n11 = hash2d(ix + 1, iy + 1);
  const nx0 = n00 + (n10 - n00) * sx;
  const nx1 = n01 + (n11 - n01) * sx;
  return nx0 + (nx1 - nx0) * sy;
}

export function fbmClouds(u: number, v: number, seed = 1): number {
  return (
    0.55 * valueNoise(u, v, 5.5, seed) +
    0.30 * valueNoise(u, v, 12.0, seed + 4) +
    0.15 * valueNoise(u, v, 25.0, seed + 9)
  );
}

// Precompute DEM properties once
export const GRID_CELLS: PrecomputedCell[][] = (() => {
  const { rows, cols, elevations } = DEM;
  const out: PrecomputedCell[][] = [];

  // Purugu detachment crown center
  const puruguU = 0.739;
  const puruguV = 0.267;

  for (let r = 0; r < rows; r++) {
    const rowArr: PrecomputedCell[] = [];
    const v = r / (rows - 1);
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1);
      const elev = elevations[r][c];
      const { dzdx, dzdy } = getGridGradient(DEM, r, c);
      const slope = Math.hypot(dzdx, dzdy);

      // Sun from NW-Upper
      const nx = -dzdx * 1.45;
      const ny = -dzdy * 1.45;
      const nz = 1.0;
      const invLen = 1.0 / Math.hypot(nx, ny, nz);
      const lx = -0.58;
      const ly = -0.52;
      const lz = 0.63;
      const shade = Math.max(0.15, Math.min(1.0, (nx * lx + ny * ly + nz * lz) * invLen));

      const distMainRiver = minDistToPolyline(u, v, LHENDE_BHOTE_RIVER_PATH);
      const distTrib1 = minDistToPolyline(u, v, KERUNG_TRIBUTARY_PATH);
      const distTrib2 = minDistToPolyline(u, v, LANGTANG_KHOLA_PATH);
      const distTributary = Math.min(distTrib1, distTrib2);

      const distPurugu = Math.hypot((u - puruguU) * 1.1, v - puruguV);
      const distChute = distToSegment(u, v, 0.77, 0.31, 0.65, 0.23);

      rowArr.push({
        elev,
        slope,
        shade,
        distMainRiver,
        distTributary,
        distPurugu,
        inAvalancheChute: distChute < 0.042
      });
    }
    out.push(rowArr);
  }
  return out;
})();

export function sampleElevationAtUV(u: number, v: number): number {
  const cu = Math.max(0, Math.min(1, u)) * (DEM.cols - 1);
  const cv = Math.max(0, Math.min(1, v)) * (DEM.rows - 1);
  const c0 = Math.floor(cu);
  const r0 = Math.floor(cv);
  const c1 = Math.min(DEM.cols - 1, c0 + 1);
  const r1 = Math.min(DEM.rows - 1, r0 + 1);
  const tx = cu - c0;
  const ty = cv - r0;
  const e00 = DEM.elevations[r0][c0];
  const e10 = DEM.elevations[r0][c1];
  const e01 = DEM.elevations[r1][c0];
  const e11 = DEM.elevations[r1][c1];
  return (e00 * (1 - tx) + e10 * tx) * (1 - ty) + (e01 * (1 - tx) + e11 * tx) * ty;
}

export function uvToLatLon(u: number, v: number): { lat: number; lon: number } {
  const lon = DEM.bounds.lonMin + u * (DEM.bounds.lonMax - DEM.bounds.lonMin);
  const lat = DEM.bounds.latMax - v * (DEM.bounds.latMax - DEM.bounds.latMin);
  return { lat, lon };
}

// HSL helper for rainbow InSAR phase fringes (-π to +π)
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

/**
 * Generates a crisp pixel-aligned raster canvas (e.g. 320x296 or 480x444)
 * used both as the 2D Pixel Overworld base AND draped directly onto the 3D SRTM Himalayan Mesh!
 */
export function buildRasterLayerCanvas(
  mode: RadarLayerMode,
  pass: TimelinePass,
  animPhase = 0,
  scale = 2
): HTMLCanvasElement {
  const width = DEM.cols * scale;
  const height = DEM.rows * scale;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(width, height);
  const data = img.data;

  const riverBaseHalfWidth = 0.0075;
  const floodHalfWidth =
    riverBaseHalfWidth * (1 + (pass.riverDischargeMultiplier - 1) * 0.42);
  const debrisSheetHalfWidth =
    pass.phaseTag === 'CATASTROPHE'
      ? 0.028
      : pass.phaseTag === 'FLOOD_2025'
        ? 0.017
        : pass.phaseTag === 'RECOVERY'
          ? 0.019
          : 0;

  const isCatastropheOrAfter =
    pass.phaseTag === 'CATASTROPHE' || pass.phaseTag === 'RECOVERY';

  for (let py = 0; py < height; py++) {
    const r = Math.min(DEM.rows - 1, Math.floor(py / scale));
    const v = py / (height - 1);

    for (let px = 0; px < width; px++) {
      const c = Math.min(DEM.cols - 1, Math.floor(px / scale));
      const u = px / (width - 1);
      const cell = GRID_CELLS[r][c];
      const dither = ((px + py) & 1) === 0 ? 1 : -1;
      const idx = (py * width + px) * 4;

      let R = 0;
      let G = 0;
      let B = 0;

      const inMainWater = cell.distMainRiver < floodHalfWidth;
      const inTribWater = cell.distTributary < riverBaseHalfWidth * 0.72;
      const inDebris =
        (debrisSheetHalfWidth > 0 && cell.distMainRiver < debrisSheetHalfWidth) ||
        (isCatastropheOrAfter && cell.inAvalancheChute);

      if (mode === 'pixel' || mode === 'optical') {
        // 16-bit SNES Himalayan Biome Palette (crisp quantized tones for 'pixel', smooth for 'optical')
        const e = cell.elev + (mode === 'pixel' ? dither * 38 : 0);
        if (e < 2050) {
          // Lush subtropical Bhote Koshi canyon green
          R = 42;
          G = 118;
          B = 64;
        } else if (e < 3150) {
          // Temperate pine & rhododendron forest
          R = 34;
          G = 94;
          B = 58;
          // Occasional blooming red rhododendron pixel clusters in pixel mode!
          if (mode === 'pixel' && hash2d(px, py) > 0.965) {
            R = 218;
            G = 58;
            B = 82;
          }
        } else if (e < 4150) {
          // Subalpine olive-ochre yak meadows
          R = 98;
          G = 122;
          B = 68;
        } else if (e < 5050) {
          // High Himalayan slate rock & moraine
          R = 112;
          G = 116;
          B = 128;
        } else if (e < 5850) {
          // Glacial cyan-ice zone
          R = 166;
          G = 214;
          B = 238;
        } else {
          // High 7,000m snow summit (Langtang Lirung)
          R = 238;
          G = 247;
          B = 255;
        }

        // Apply crisp quantized 16-bit hillshade
        const shadeFactor =
          mode === 'pixel'
            ? Math.round(cell.shade * 5) / 5 + 0.18
            : cell.shade * 0.85 + 0.25;
        R = Math.min(255, Math.round(R * shadeFactor));
        G = Math.min(255, Math.round(G * shadeFactor));
        B = Math.min(255, Math.round(B * shadeFactor));

        // Pixel contour lines every 600m for nostalgic 16-bit cartography feel
        if (mode === 'pixel' && Math.abs((cell.elev % 600) - 300) < 22 && cell.elev < 5600) {
          R = Math.round(R * 0.86);
          G = Math.round(G * 0.88);
          B = Math.round(B * 0.9);
        }

        // Landslide / Avalanche Detachment Scar & Flood Mudflow Sheet
        if (inDebris) {
          const boulderNoise = hash2d(px * 0.7, py * 0.7);
          if (pass.phaseTag === 'CATASTROPHE') {
            R = boulderNoise > 0.5 ? 146 : 118;
            G = boulderNoise > 0.5 ? 104 : 84;
            B = boulderNoise > 0.5 ? 76 : 64;
          } else {
            // Grey-brown alluvial boulder fan in recovery / 2025 flood
            R = 138;
            G = 126;
            B = 112;
          }
        }

        // River channel (animated pixel shimmer!)
        if (inMainWater || inTribWater) {
          const wave = Math.sin((u + v) * 95 - animPhase * 3.5) > 0.25;
          if (
            inMainWater &&
            (pass.phaseTag === 'CATASTROPHE' || pass.phaseTag === 'FLOOD_2025')
          ) {
            // Turbulent sediment-laden glacial flood torrent
            R = wave ? 196 : 152;
            G = wave ? 148 : 108;
            B = wave ? 96 : 68;
          } else {
            // Crisp Himalayan glacial turquoise-blue water
            R = wave ? 94 : 38;
            G = wave ? 208 : 148;
            B = wave ? 248 : 212;
          }
        }

        // Optical Monsoon Cloud Blockage in 'optical' mode!
        if (mode === 'optical') {
          const cloudVal = fbmClouds(u + animPhase * 0.008, v, pass.index + 3);
          const threshold = 1.0 - (pass.cloudCoverPct / 100) * 0.94;
          if (cloudVal > threshold) {
            const alpha = Math.min(0.97, (cloudVal - threshold) * 3.6 + 0.35);
            const cBright = 228 + Math.round(cloudVal * 27);
            R = Math.round(R * (1 - alpha) + cBright * alpha);
            G = Math.round(G * (1 - alpha) + (cBright + 2) * alpha);
            B = Math.round(B * (1 - alpha) + Math.min(255, cBright + 8) * alpha);
          }
        }
      } else if (mode === 'lband_insar') {
        // NISAR L-Band (24 cm) Interferogram: Dark radar hillshade + Wrapped Rainbow Phase Fringes!
        const base = Math.round(cell.shade * 96 + 22);
        R = Math.round(base * 0.85);
        G = Math.round(base * 0.95);
        B = Math.min(255, Math.round(base * 1.22));

        // Purugu / Langtang Lirung precursory deformation bullseye
        if (cell.distPurugu < 0.16 && pass.puruguCreepMeters > 0.2) {
          const motion = getSimulatedRasuwaMotion(u, v, pass);
          const falloff = Math.exp(-Math.pow(Math.hypot((u - 0.739) * 1.1, v - 0.267), 2) * 85);
          if (!motion.isValid) {
            // Complete interferometric decorrelation (speckle noise!) after collapse
            const sp = hash2d(px + animPhase, py);
            R = sp > 0.5 ? 245 : 70;
            G = sp > 0.5 ? 50 : 25;
            B = sp > 0.5 ? 180 : 120;
          } else {
            // Wrapped phase fringes (-π to +π): each fringe = 12 cm LOS motion!
            const cycles = losToPhaseCycles(motion.losMeters);
            const hue = phaseCyclesToHue(cycles);
            const [fr, fg, fb] = hslToRgb(hue, 0.95, 0.56);
            const blend = Math.min(0.92, falloff * 1.45);
            R = Math.round(R * (1 - blend) + fr * blend);
            G = Math.round(G * (1 - blend) + fg * blend);
            B = Math.round(B * (1 - blend) + fb * blend);
          }
        }

        // Coherence Change Detection (CCD) flood damage corridor in red/magenta speckle
        if (inDebris && (pass.phaseTag === 'CATASTROPHE' || pass.phaseTag === 'FLOOD_2025')) {
          const sp = hash2d(px * 1.3, py * 1.3);
          R = sp > 0.35 ? 250 : 140;
          G = 38;
          B = sp > 0.35 ? 130 : 85;
        } else if (inMainWater) {
          R = 16;
          G = 32;
          B = 56;
        }
      } else if (mode === 'sar_rgb') {
        // NISAR Dual-Pol RGB Composite (R: HH, G: HV, B: HH/HV)
        const speckle = 0.84 + hash2d(px, py) * 0.32;
        const s = cell.shade * speckle;
        if (cell.elev > 4950) {
          // Glacier & steep rock: high HH/VV surface + volume ice scatter -> crisp cyan/violet
          R = Math.min(255, Math.round(135 * s));
          G = Math.min(255, Math.round(150 * s));
          B = Math.min(255, Math.round(235 * s));
        } else if (cell.elev < 3700) {
          // Forest canopy: strong HV cross-pol volume scatter -> bright radar green!
          R = Math.min(255, Math.round(52 * s));
          G = Math.min(255, Math.round(168 * s));
          B = Math.min(255, Math.round(68 * s));
        } else {
          // Alpine rock/tundra
          R = Math.min(255, Math.round(115 * s));
          G = Math.min(255, Math.round(110 * s));
          B = Math.min(255, Math.round(130 * s));
        }

        // Calm water = specular dark; Raging boulder flood & inundated buildings = bright HH/HV!
        if (inDebris) {
          // High roughness boulder sheet + double bounce -> bright yellow/magenta/white!
          R = Math.min(255, Math.round(242 * speckle));
          G = Math.min(255, Math.round(165 * speckle));
          B = Math.min(255, Math.round(225 * speckle));
        } else if (inMainWater || inTribWater) {
          if (pass.riverDischargeMultiplier > 3.5 && inMainWater) {
            // Churning flood rapids backscatter strongly
            R = Math.min(255, Math.round(215 * speckle));
            G = Math.min(255, Math.round(95 * speckle));
            B = Math.min(255, Math.round(235 * speckle));
          } else {
            // Calm water mirror reflection -> dark radar return (-21 dB)
            R = 10;
            G = 14;
            B = 24;
          }
        }
      } else if (mode === 'sband_moisture') {
        // ISRO S-Band (9 cm) Soil Moisture & Wet Glacial Snow Map
        const baseM = pass.soilMoisturePct / 100;
        const valleyBoost = Math.max(0, 1 - cell.distMainRiver * 7) * 0.25;
        const patch = valueNoise(u, v, 14, pass.index) * 0.22;
        const m = Math.min(1, Math.max(0.05, baseM * 0.78 + valleyBoost + patch));
        const sh = cell.shade * 0.55 + 0.45;

        if (m < 0.38) {
          // Dry ochre/amber soil
          R = Math.round(194 * sh);
          G = Math.round(142 * sh);
          B = Math.round(68 * sh);
        } else if (m < 0.68) {
          // Moist emerald-teal soil
          R = Math.round(42 * sh);
          G = Math.round(176 * sh);
          B = Math.round(168 * sh);
        } else {
          // Saturated dielectric alert (deep electric cyan-blue)
          R = Math.round(36 * sh);
          G = Math.round(138 * sh);
          B = Math.min(255, Math.round(252 * sh));
        }

        // Wet meltwater zone around Purugu ~5000-5600m
        if (cell.distPurugu < 0.12 && pass.soilMoisturePct > 50) {
          R = 236;
          G = 72;
          B = 153;
        }
      } else {
        // 'retro_wireframe' — 1990s Phosphor CRT Radar Contour Matrix
        R = 6;
        G = 18;
        B = 16;
        const isGrid = px % (scale * 8) === 0 || py % (scale * 8) === 0;
        const isContour = Math.abs((cell.elev % 350) - 175) < 18;
        if (isContour) {
          R = 24;
          G = 225;
          B = 158;
        } else if (isGrid) {
          R = 14;
          G = 68;
          B = 56;
        }
        if (inMainWater || inTribWater) {
          R = 56;
          G = 189;
          B = 248;
        }
        if (cell.distPurugu < 0.11 && pass.puruguCreepMeters > 0.5) {
          const ring = Math.abs(((cell.distPurugu * 90 - animPhase * 0.6) % 3) - 1.5) < 0.45;
          if (ring) {
            R = 244;
            G = 63;
            B = 94;
          }
        }
      }

      data[idx] = R;
      data[idx + 1] = G;
      data[idx + 2] = B;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas;
}

