// Live NASA Earth Science API Integration (science.nasa.gov/earth)
// Connects real, keyless NASA Open Data APIs:
// 1. NASA POWER (Prediction Of Worldwide Energy Resources — MERRA-2 / GEOS / IMERG assimilated):
//    Surface Soil Wetness (GWETTOP), Root-Zone Soil Moisture (GWETROOT), Precipitation (PRECTOTCORR), 2m Air Temp (T2M)
// 2. NASA EONET v3 (Earth Observatory Natural Event Tracker):
//    Real-time open global wildfires, floods, landslides, volcanoes, sea/lake ice & severe storms
// 3. NASA GIBS WMTS (Global Imagery Browse Services):
//    Real VIIRS SNPP & MODIS Terra true-color satellite tiles for optical vs. SAR cloud/canopy comparison
// Includes transparent data-provenance badges (LIVE NASA API vs. CACHED SNAPSHOT vs. SIMULATED SAR SCENARIO).

export type GlobalRegionId =
  | 'rasuwa_nepal'
  | 'pantanal_brazil'
  | 'san_joaquin_usa'
  | 'hatay_turkiye'
  | 'yukon_alaska';

export interface MonthlyPowerPoint {
  month: string;
  precipMmDay: number;
  gwetTop: number;
  gwetRoot: number;
  tempC: number;
}

export interface NasaPowerTelemetry {
  regionId: GlobalRegionId;
  lat: number;
  lon: number;
  elevationM: number;
  annualPrecipMmDay: number;
  peakPrecipMmDay: number;
  surfaceWetnessAnn: number;
  peakSurfaceWetness: number;
  rootZoneWetnessAnn: number;
  meanTempC: number;
  warmestTempC: number;
  coldestTempC: number;
  monthly: MonthlyPowerPoint[];
  isLiveApi: boolean;
  fetchedAtIso: string;
  sourceLabel: string;
  provenance?: 'model output' | 'illustration';
  dataPeriod?: string;
  sourceUrl?: string;
}

export interface NasaEonetEvent {
  id: string;
  title: string;
  category: string;
  lon: number;
  lat: number;
  dateIso: string;
  sourceUrl?: string;
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// Author-supplied illustrative values: no original NASA response/date was retained.
// Never represent these as a verified NASA snapshot or a current observation.
const FALLBACK_POWER: Record<GlobalRegionId, Omit<NasaPowerTelemetry, 'isLiveApi' | 'fetchedAtIso'>> = {
  rasuwa_nepal: {
    regionId: 'rasuwa_nepal',
    lat: 28.28,
    lon: 85.38,
    elevationM: 4836,
    annualPrecipMmDay: 1.72,
    peakPrecipMmDay: 5.29,
    surfaceWetnessAnn: 0.64,
    peakSurfaceWetness: 0.79,
    rootZoneWetnessAnn: 0.62,
    meanTempC: -2.6,
    warmestTempC: 6.31,
    coldestTempC: -12.35,
    sourceLabel: 'NASA POWER MERRA-2 / GEOS Assimilation (28.28°N, 85.38°E)',
    monthly: [
      { month: 'JAN', precipMmDay: 0.22, gwetTop: 0.59, gwetRoot: 0.59, tempC: -12.35 },
      { month: 'FEB', precipMmDay: 0.44, gwetTop: 0.57, gwetRoot: 0.58, tempC: -11.24 },
      { month: 'MAR', precipMmDay: 0.54, gwetTop: 0.56, gwetRoot: 0.57, tempC: -7.9 },
      { month: 'APR', precipMmDay: 0.76, gwetTop: 0.54, gwetRoot: 0.55, tempC: -3.31 },
      { month: 'MAY', precipMmDay: 1.66, gwetTop: 0.56, gwetRoot: 0.55, tempC: 0.44 },
      { month: 'JUN', precipMmDay: 2.84, gwetTop: 0.60, gwetRoot: 0.57, tempC: 4.57 },
      { month: 'JUL', precipMmDay: 5.29, gwetTop: 0.70, gwetRoot: 0.63, tempC: 6.31 },
      { month: 'AUG', precipMmDay: 4.75, gwetTop: 0.78, gwetRoot: 0.71, tempC: 5.83 },
      { month: 'SEP', precipMmDay: 2.87, gwetTop: 0.79, gwetRoot: 0.73, tempC: 3.58 },
      { month: 'OCT', precipMmDay: 0.91, gwetTop: 0.74, gwetRoot: 0.69, tempC: -1.87 },
      { month: 'NOV', precipMmDay: 0.11, gwetTop: 0.68, gwetRoot: 0.65, tempC: -6.0 },
      { month: 'DEC', precipMmDay: 0.13, gwetTop: 0.62, gwetRoot: 0.62, tempC: -9.74 }
    ]
  },
  pantanal_brazil: {
    regionId: 'pantanal_brazil',
    lat: -17.72,
    lon: -57.38,
    elevationM: 118,
    annualPrecipMmDay: 3.48,
    peakPrecipMmDay: 7.42,
    surfaceWetnessAnn: 0.67,
    peakSurfaceWetness: 0.86,
    rootZoneWetnessAnn: 0.69,
    meanTempC: 25.9,
    warmestTempC: 28.4,
    coldestTempC: 21.8,
    sourceLabel: 'NASA POWER MERRA-2 / GEOS Assimilation (17.72°S, 57.38°W)',
    monthly: [
      { month: 'JAN', precipMmDay: 7.42, gwetTop: 0.85, gwetRoot: 0.84, tempC: 27.1 },
      { month: 'FEB', precipMmDay: 6.95, gwetTop: 0.86, gwetRoot: 0.86, tempC: 26.8 },
      { month: 'MAR', precipMmDay: 5.61, gwetTop: 0.83, gwetRoot: 0.84, tempC: 26.6 },
      { month: 'APR', precipMmDay: 3.12, gwetTop: 0.74, gwetRoot: 0.78, tempC: 25.4 },
      { month: 'MAY', precipMmDay: 1.65, gwetTop: 0.64, gwetRoot: 0.70, tempC: 23.1 },
      { month: 'JUN', precipMmDay: 0.78, gwetTop: 0.54, gwetRoot: 0.62, tempC: 21.9 },
      { month: 'JUL', precipMmDay: 0.52, gwetTop: 0.46, gwetRoot: 0.55, tempC: 21.8 },
      { month: 'AUG', precipMmDay: 0.64, gwetTop: 0.41, gwetRoot: 0.49, tempC: 24.5 },
      { month: 'SEP', precipMmDay: 1.74, gwetTop: 0.47, gwetRoot: 0.51, tempC: 27.3 },
      { month: 'OCT', precipMmDay: 3.45, gwetTop: 0.61, gwetRoot: 0.60, tempC: 28.4 },
      { month: 'NOV', precipMmDay: 4.88, gwetTop: 0.73, gwetRoot: 0.71, tempC: 27.8 },
      { month: 'DEC', precipMmDay: 6.32, gwetTop: 0.81, gwetRoot: 0.79, tempC: 27.4 }
    ]
  },
  san_joaquin_usa: {
    regionId: 'san_joaquin_usa',
    lat: 36.10,
    lon: -119.55,
    elevationM: 63,
    annualPrecipMmDay: 0.56,
    peakPrecipMmDay: 1.48,
    surfaceWetnessAnn: 0.31,
    peakSurfaceWetness: 0.54,
    rootZoneWetnessAnn: 0.34,
    meanTempC: 17.8,
    warmestTempC: 28.6,
    coldestTempC: 7.9,
    sourceLabel: 'NASA POWER MERRA-2 / GEOS Assimilation (36.10°N, 119.55°W)',
    monthly: [
      { month: 'JAN', precipMmDay: 1.48, gwetTop: 0.54, gwetRoot: 0.50, tempC: 7.9 },
      { month: 'FEB', precipMmDay: 1.36, gwetTop: 0.52, gwetRoot: 0.51, tempC: 10.2 },
      { month: 'MAR', precipMmDay: 1.15, gwetTop: 0.46, gwetRoot: 0.47, tempC: 13.1 },
      { month: 'APR', precipMmDay: 0.58, gwetTop: 0.35, gwetRoot: 0.39, tempC: 16.0 },
      { month: 'MAY', precipMmDay: 0.24, gwetTop: 0.24, gwetRoot: 0.31, tempC: 20.4 },
      { month: 'JUN', precipMmDay: 0.05, gwetTop: 0.17, gwetRoot: 0.24, tempC: 25.1 },
      { month: 'JUL', precipMmDay: 0.02, gwetTop: 0.14, gwetRoot: 0.20, tempC: 28.6 },
      { month: 'AUG', precipMmDay: 0.02, gwetTop: 0.14, gwetRoot: 0.19, tempC: 27.7 },
      { month: 'SEP', precipMmDay: 0.08, gwetTop: 0.16, gwetRoot: 0.20, tempC: 24.4 },
      { month: 'OCT', precipMmDay: 0.32, gwetTop: 0.23, gwetRoot: 0.24, tempC: 18.5 },
      { month: 'NOV', precipMmDay: 0.64, gwetTop: 0.34, gwetRoot: 0.32, tempC: 12.1 },
      { month: 'DEC', precipMmDay: 1.18, gwetTop: 0.48, gwetRoot: 0.43, tempC: 8.1 }
    ]
  },
  hatay_turkiye: {
    regionId: 'hatay_turkiye',
    lat: 37.29,
    lon: 37.04,
    elevationM: 642,
    annualPrecipMmDay: 1.68,
    peakPrecipMmDay: 3.92,
    surfaceWetnessAnn: 0.48,
    peakSurfaceWetness: 0.74,
    rootZoneWetnessAnn: 0.49,
    meanTempC: 16.4,
    warmestTempC: 28.9,
    coldestTempC: 4.2,
    sourceLabel: 'NASA POWER MERRA-2 / GEOS Assimilation (37.29°N, 37.04°E)',
    monthly: [
      { month: 'JAN', precipMmDay: 3.92, gwetTop: 0.74, gwetRoot: 0.69, tempC: 4.2 },
      { month: 'FEB', precipMmDay: 3.41, gwetTop: 0.73, gwetRoot: 0.71, tempC: 6.1 },
      { month: 'MAR', precipMmDay: 2.65, gwetTop: 0.66, gwetRoot: 0.67, tempC: 10.3 },
      { month: 'APR', precipMmDay: 1.92, gwetTop: 0.56, gwetRoot: 0.59, tempC: 15.2 },
      { month: 'MAY', precipMmDay: 1.18, gwetTop: 0.44, gwetRoot: 0.50, tempC: 20.4 },
      { month: 'JUN', precipMmDay: 0.32, gwetTop: 0.31, gwetRoot: 0.39, tempC: 25.3 },
      { month: 'JUL', precipMmDay: 0.09, gwetTop: 0.23, gwetRoot: 0.32, tempC: 28.9 },
      { month: 'AUG', precipMmDay: 0.11, gwetTop: 0.22, gwetRoot: 0.29, tempC: 28.8 },
      { month: 'SEP', precipMmDay: 0.38, gwetTop: 0.26, gwetRoot: 0.30, tempC: 24.6 },
      { month: 'OCT', precipMmDay: 1.28, gwetTop: 0.39, gwetRoot: 0.37, tempC: 18.4 },
      { month: 'NOV', precipMmDay: 2.15, gwetTop: 0.55, gwetRoot: 0.49, tempC: 11.2 },
      { month: 'DEC', precipMmDay: 3.58, gwetTop: 0.69, gwetRoot: 0.62, tempC: 5.9 }
    ]
  },
  yukon_alaska: {
    regionId: 'yukon_alaska',
    lat: 61.20,
    lon: -163.50,
    elevationM: 14,
    annualPrecipMmDay: 1.38,
    peakPrecipMmDay: 2.74,
    surfaceWetnessAnn: 0.74,
    peakSurfaceWetness: 0.88,
    rootZoneWetnessAnn: 0.76,
    meanTempC: -1.1,
    warmestTempC: 12.8,
    coldestTempC: -14.6,
    sourceLabel: 'NASA POWER MERRA-2 / GEOS Assimilation (61.20°N, 163.50°W)',
    monthly: [
      { month: 'JAN', precipMmDay: 0.92, gwetTop: 0.71, gwetRoot: 0.74, tempC: -14.2 },
      { month: 'FEB', precipMmDay: 0.85, gwetTop: 0.70, gwetRoot: 0.73, tempC: -14.6 },
      { month: 'MAR', precipMmDay: 0.78, gwetTop: 0.69, gwetRoot: 0.72, tempC: -11.4 },
      { month: 'APR', precipMmDay: 0.69, gwetTop: 0.72, gwetRoot: 0.73, tempC: -4.2 },
      { month: 'MAY', precipMmDay: 0.94, gwetTop: 0.83, gwetRoot: 0.80, tempC: 4.6 },
      { month: 'JUN', precipMmDay: 1.36, gwetTop: 0.81, gwetRoot: 0.82, tempC: 10.5 },
      { month: 'JUL', precipMmDay: 2.12, gwetTop: 0.82, gwetRoot: 0.81, tempC: 12.8 },
      { month: 'AUG', precipMmDay: 2.74, gwetTop: 0.88, gwetRoot: 0.85, tempC: 11.7 },
      { month: 'SEP', precipMmDay: 2.41, gwetTop: 0.87, gwetRoot: 0.85, tempC: 7.2 },
      { month: 'OCT', precipMmDay: 1.62, gwetTop: 0.80, gwetRoot: 0.80, tempC: -0.4 },
      { month: 'NOV', precipMmDay: 1.18, gwetTop: 0.74, gwetRoot: 0.76, tempC: -7.8 },
      { month: 'DEC', precipMmDay: 1.01, gwetTop: 0.72, gwetRoot: 0.75, tempC: -12.6 }
    ]
  }
};

async function fetchJsonWithTimeout(url: string): Promise<any> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 6500);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timer);
  }
}

const powerCache = new Map<GlobalRegionId, NasaPowerTelemetry>();
let eonetCache: { events: NasaEonetEvent[]; isLive: boolean; fetchedAt: string } | null = null;

export async function fetchNasaPowerTelemetry(
  regionId: GlobalRegionId,
  lat: number,
  lon: number
): Promise<NasaPowerTelemetry> {
  const cached = powerCache.get(regionId);
  if (cached && Date.now() - Date.parse(cached.fetchedAtIso) < 300_000 && cached.lat === lat && cached.lon === lon) {
    return { ...cached, sourceLabel: `${cached.sourceLabel} (session cached; fetched ${cached.fetchedAtIso})` };
  }

  const fallback = FALLBACK_POWER[regionId];
  try {
    const url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PRECTOTCORR,GWETROOT,GWETTOP,T2M&community=AG&longitude=${lon}&latitude=${lat}&format=JSON`;
    const data = await fetchJsonWithTimeout(url);
    const p = data?.properties?.parameter;
    const fillValue = data?.header?.fill_value ?? -999;
    for (const key of ['PRECTOTCORR', 'GWETTOP', 'GWETROOT', 'T2M']) {
      for (const month of [...MONTHS, 'ANN']) {
        const value = p?.[key]?.[month];
        if (typeof value !== 'number' || !Number.isFinite(value) || value === fillValue || value <= -900) {
          throw new Error(`Missing POWER value: ${key}/${month}`);
        }
        if ((key.startsWith('GWET') && (value < 0 || value > 1)) || (key === 'PRECTOTCORR' && value < 0)) {
          throw new Error(`Invalid POWER value: ${key}/${month}`);
        }
      }
    }

    const coords = data?.geometry?.coordinates;
    const elev = typeof coords?.[2] === 'number' ? Math.round(coords[2]) : fallback.elevationM;

    const monthly: MonthlyPowerPoint[] = MONTHS.map((m) => ({
      month: m,
      precipMmDay: Number(p.PRECTOTCORR[m] ?? 0),
      gwetTop: Number(p.GWETTOP[m] ?? 0),
      gwetRoot: Number(p.GWETROOT?.[m] ?? 0),
      tempC: Number(p.T2M?.[m] ?? 0)
    }));

    const peakPrecip = Math.max(...monthly.map((m) => m.precipMmDay));
    const peakWet = Math.max(...monthly.map((m) => m.gwetTop));
    const warmest = Math.max(...monthly.map((m) => m.tempC));
    const coldest = Math.min(...monthly.map((m) => m.tempC));

    const liveResult: NasaPowerTelemetry = {
      regionId,
      lat,
      lon,
      elevationM: elev,
      annualPrecipMmDay: Number(p.PRECTOTCORR.ANN ?? fallback.annualPrecipMmDay),
      peakPrecipMmDay: peakPrecip,
      surfaceWetnessAnn: Number(p.GWETTOP.ANN ?? fallback.surfaceWetnessAnn),
      peakSurfaceWetness: peakWet,
      rootZoneWetnessAnn: Number(p.GWETROOT?.ANN ?? fallback.rootZoneWetnessAnn),
      meanTempC: Number(p.T2M?.ANN ?? fallback.meanTempC),
      warmestTempC: warmest,
      coldestTempC: coldest,
      monthly,
      isLiveApi: true,
      fetchedAtIso: new Date().toISOString(),
      provenance: 'model output',
      dataPeriod: String(data?.header?.range || 'Climatology period not supplied'),
      sourceUrl: url,
      sourceLabel: `MODEL OUTPUT — NASA POWER climatology (${lat.toFixed(2)}°, ${lon.toFixed(2)}°); not current weather`
    };
    powerCache.set(regionId, liveResult);
    return liveResult;
  } catch {
    const snap: NasaPowerTelemetry = {
      ...fallback,
      isLiveApi: false,
      fetchedAtIso: '',
      provenance: 'illustration',
      dataPeriod: 'Undated author-supplied example; not a NASA observation',
      sourceUrl: 'https://power.larc.nasa.gov/docs/services/api/temporal/climatology/',
      sourceLabel: 'ILLUSTRATION — NASA POWER unavailable; unverified local example'
    };
    return snap;
  }
}


export async function fetchNasaEonetEvents(): Promise<{
  events: NasaEonetEvent[];
  isLive: boolean;
  fetchedAt: string;
}> {
  if (eonetCache?.isLive && Date.now() - Date.parse(eonetCache.fetchedAt) < 300_000) return eonetCache;
  try {
    const json = await fetchJsonWithTimeout('https://eonet.gsfc.nasa.gov/api/v3/events?limit=20&status=open');
    const parsed: NasaEonetEvent[] = [];
    for (const ev of json?.events || []) {
      const geom = ev?.geometry?.[ev.geometry.length - 1];
      const coords = geom?.coordinates;
      if (geom?.type === 'Point' && Array.isArray(coords) && Number.isFinite(coords[0]) && Number.isFinite(coords[1]) && Math.abs(coords[0]) <= 180 && Math.abs(coords[1]) <= 90) {
        parsed.push({
          id: String(ev.id),
          title: String(ev.title || 'Active Earth Event'),
          category: String(ev?.categories?.[0]?.title || 'Earth Event'),
          lon: coords[0],
          lat: coords[1],
          dateIso: String(geom?.date || '').slice(0, 10),
          sourceUrl: ev?.sources?.[0]?.url
        });
      }
    }
    if (!Array.isArray(json?.events)) throw new Error('Invalid EONET response');
    eonetCache = {
      events: parsed,
      isLive: true,
      fetchedAt: new Date().toISOString()
    };
    return eonetCache;
  } catch {
    eonetCache = {
      events: [],
      isLive: false,
      fetchedAt: ''
    };
    return eonetCache;
  }
}

// Convert Lat/Lon to NASA GIBS WebMercator WMTS Tile URL (Level 6..8)
export function getNasaGibsTileUrl(
  lat: number,
  lon: number,
  zoom = 6,
  dateStr = '2025-07-08',
  layer = 'VIIRS_SNPP_CorrectedReflectance_TrueColor'
): string {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lon + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer}/default/${dateStr}/GoogleMapsCompatible_Level9/${zoom}/${y}/${x}.jpg`;
}

