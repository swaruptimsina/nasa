import type { DemData, TimelinePass } from '../types';

// Nominal educational wavelength, not metadata from an ingested radar product.
export const L_BAND_WAVELENGTH_M = 0.24;

// Chosen simulation convention: positive LOS is away, negative is toward the sensor.
// This field is authored for learning, not inferred from slope geometry or observations.
export function getSimulatedRasuwaMotion(
  u: number,
  v: number,
  pass: Pick<TimelinePass, 'phaseTag' | 'puruguCreepMeters'>
): { losMeters: number; coherenceLoss: number; isValid: boolean } {
  const distance = Math.hypot((u - 0.739) * 1.1, v - 0.267);
  const isValid = !(pass.phaseTag === 'CATASTROPHE' && distance < 0.14);
  return {
    losMeters: isValid ? -Math.exp(-distance * distance * 85) * pass.puruguCreepMeters * 0.15 : 0,
    coherenceLoss: isValid ? 0.04 : 0.85,
    isValid
  };
}

export function losToPhaseCycles(losMeters: number): number {
  return losMeters / (L_BAND_WAVELENGTH_M / 2);
}

// Map wrapped [-π, +π] display phase to the cyclic legend: zero is its center.
export function phaseCyclesToHue(cycles: number): number {
  return (((cycles + 0.5) % 1) + 1) % 1;
}


export function uvToSceneXZ(
  bounds: { widthKm: number; heightKm: number },
  u: number,
  v: number
): { x: number; z: number } {
  return { x: (u - 0.5) * bounds.widthKm, z: (v - 0.5) * bounds.heightKm };
}

// An explicitly exaggerated artistic LOS-to-height warp, not vertical displacement.
export function artisticLosHeightKm(losMeters: number, exaggeration: number): number {
  return (losMeters * exaggeration) / 1000;
}

// Elevation gradients in m/m of the declared illustrative grid; not a terrain survey.
export function getGridGradient(
  dem: Pick<DemData, 'rows' | 'cols' | 'bounds' | 'elevations'>,
  row: number,
  col: number
): { dzdx: number; dzdy: number } {
  const xm = Math.max(0, col - 1);
  const xp = Math.min(dem.cols - 1, col + 1);
  const ym = Math.max(0, row - 1);
  const yp = Math.min(dem.rows - 1, row + 1);
  const cellX = (dem.bounds.widthKm * 1000) / Math.max(1, dem.cols - 1);
  const cellY = (dem.bounds.heightKm * 1000) / Math.max(1, dem.rows - 1);
  return {
    dzdx: (dem.elevations[row][xp] - dem.elevations[row][xm]) / (Math.max(1, xp - xm) * cellX),
    dzdy: (dem.elevations[yp][col] - dem.elevations[ym][col]) / (Math.max(1, yp - ym) * cellY)
  };
}


