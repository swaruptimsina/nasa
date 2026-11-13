export type ViewDimension = '2d' | 'transition-to-3d' | '3d' | 'transition-to-2d';

export type RadarLayerMode =
  | 'pixel'
  | 'optical'
  | 'lband_insar'
  | 'sar_rgb'
  | 'sband_moisture'
  | 'retro_wireframe';

export type MentorMood = 'welcome' | 'radar' | 'warning' | 'somber' | 'eureka';

export interface TimelinePass {
  id: string;
  index: number;
  date: string;
  shortLabel: string;
  orbitPass: string;
  phaseTag: 'BASELINE' | 'FLOOD_2025' | 'PRECURSOR' | 'CRITICAL_CREEP' | 'CATASTROPHE' | 'RECOVERY';
  title: string;
  summary: string;
  cloudCoverPct: number; // Optical cloud blockage %
  puruguCreepMeters: number; // Cumulative slope displacement (m)
  insarEastMm: number; // 12-day Eastward shift in detachment fringe (mm)
  insarVertMm: number; // 12-day Vertical subsidence in detachment fringe (mm)
  riverDischargeMultiplier: number; // 1.0 normal -> 8.5 catastrophic
  soilMoisturePct: number; // S-band volumetric moisture
  bridgeIntact: boolean;
  hydropowerOperationalPct: number;
  mentorNarration: string;
  mentorMood: MentorMood;
}

export interface StationMetricsByPhase {
  hhDb: number; // Co-pol HH backscatter (dB)
  hvDb: number; // Cross-pol HV backscatter (dB)
  coherence: number; // InSAR coherence 0..1
  displacementText: string;
  surfaceState: string;
}

export interface Station {
  id: string;
  code: string;
  name: string;
  nepaliSub: string;
  lat: number;
  lon: number;
  elevationM: number;
  // Normalized [0..1] position on our 160x148 DEM grid (u = West->East, v = North->South)
  u: number;
  v: number;
  iconType: 'relay' | 'agro' | 'village' | 'hydro' | 'bridge' | 'glacier';
  accentColor: string;
  shortDesc: string;
  humanEconomicStory: string;
  nisarInsight: string;
  physicalDriverHypothesis: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  npcName: string;
  npcRole: string;
  npcDialoguePre: string;
  npcDialoguePost: string;
  baselineMetrics: StationMetricsByPhase;
  precursorMetrics: StationMetricsByPhase;
  catastropheMetrics: StationMetricsByPhase;
}

export interface GlobalWaltzSite {
  id: string;
  name: string;
  country: string;
  coords: string;
  changeType: string;
  bestBand: string;
  bestPol: string;
  roughnessRole: string;
  dielectricRole: string;
  comparisonToRasuwa: string;
  accent: string;
}

export interface MentorPromptAction {
  label: string;
  actionId: string;
}

export interface DemData {
  bounds: {
    latMin: number;
    latMax: number;
    lonMin: number;
    lonMax: number;
    widthKm: number;
    heightKm: number;
  };
  cols: number;
  rows: number;
  minElev: number;
  maxElev: number;
  elevations: number[][];
}

