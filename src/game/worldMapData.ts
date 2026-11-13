import { CharacterPaletteId, Direction } from './biomePixelArtEngine';

export type MapId = 'overworld' | 'nisar_lab_interior' | 'timure_house_interior';

export interface DialogueTopic {
  question: string;
  answer: string;
  voiceMood?: 'welcome' | 'radar' | 'warning' | 'somber' | 'eureka';
  opensComputer?: boolean;
  opensFastTravel?: boolean;
  opensPhotosStationId?: string;
  givesQuestId?: string;
  opensIntervention?: boolean;
  opensWorldGlobe?: boolean;
}

export interface GameNpc {
  id: string;
  mapId: MapId;
  tx: number;
  ty: number;
  dir: Direction;
  palette: CharacterPaletteId;
  name: string;
  role: string;
  greeting: string;
  voiceMood: 'welcome' | 'radar' | 'warning' | 'somber' | 'eureka';
  questIdToGive?: string;
  topics: DialogueTopic[];
}

export interface WorldProp {
  id: string;
  kind: string;
  tx: number; // Top-left tile X
  ty: number; // Top-left tile Y
  wTiles: number;
  hTiles: number;
  solidRowsFromBottom?: number;
  interactText?: string;
  beaconStationId?: string;
  opensComputer?: boolean;
  opensPhotosStationId?: string;
  opensIntervention?: boolean;
}

export interface DoorWarp {
  fromMap: MapId;
  tx: number;
  ty: number;
  toMap: MapId;
  destTx: number;
  destTy: number;
  destDir: Direction;
  label: string;
}

export interface FastTravelPoint {
  id: string;
  name: string;
  nepaliName: string;
  sub: string;
  mapId: MapId;
  tx: number;
  ty: number;
  dir: Direction;
  stationId: string;
}

export interface ZoneBannerDef {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  title: string;
  nepaliTitle: string;
  subtitle: string;
}

export interface FloodImpactZone {
  id: string;
  stationId: string;
  title: string;
  nepaliTitle: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  caption: string;
  previewImageUrl: string;
}

// ============================================================================
// AUTHENTIC RASUWA CORRIDOR ZONES (MATCHING REAL NEPAL GEOGRAPHY!)
// South-Center: Syabrubesi Dobhan (1,436m, Bhote Koshi + Langtang Khola confluence)
// West Across River: Chilime & Goljung Tamang Terraces (1,640m)
// North Gorge: Timure (1,821m) -> 111MW Rasuwagadhi Dam (1,825m) -> 1855 Fort & Miteri Bridge (1,831m)
// East-Northeast Ascent: Langtang Khola Trail -> Purugu Glacier Detachment Crown (5,366m–7,160m)
// ============================================================================
export const OVERWORLD_ZONES: ZoneBannerDef[] = [
  {
    xMin: 18,
    xMax: 40,
    yMin: 63,
    yMax: 85,
    title: 'SYABRUBESI DOBHAN',
    nepaliTitle: 'स्याफ्रुबेसी दोभान (१,४३६ मि.)',
    subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  },
  {
    xMin: 0,
    xMax: 17,
    yMin: 44,
    yMax: 76,
    title: 'CHILIME & GOLJUNG TERRACES',
    nepaliTitle: 'चिलिमे र गोल्जुङ तामाङ बस्ती',
    subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  },
  {
    xMin: 18,
    xMax: 39,
    yMin: 36,
    yMax: 62,
    title: 'TIMURE BORDER BAZAAR',
    nepaliTitle: 'टिमुरे भन्सार र बाढी क्षेत्र',
    subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  },
  {
    xMin: 18,
    xMax: 39,
    yMin: 23,
    yMax: 35,
    title: '111 MW RASUWAGADHI DAM',
    nepaliTitle: 'रसुवागढी जलविद्युत आयोजना',
    subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  },
  {
    xMin: 0,
    xMax: 39,
    yMin: 0,
    yMax: 22,
    title: 'RASUWAGADHI FORT & MITERI BRIDGE',
    nepaliTitle: 'ऐतिहासिक रसुवागढी किल्ला र मितेरी पुल',
    subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  },
  {
    xMin: 40,
    xMax: 57,
    yMin: 26,
    yMax: 78,
    title: 'LANGTANG RHODODENDRON TRAIL',
    nepaliTitle: 'लाङटाङ लालीगुराँस पदमार्ग',
    subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  },
  {
    xMin: 40,
    xMax: 57,
    yMin: 0,
    yMax: 25,
    title: 'PURUGU / LANGTANG GLACIER CROWN',
    nepaliTitle: 'पुरुगु हिमनदी उद्गमस्थल (५,३६६ मि.)',
    subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  }
];

// Designated Flood Locations: Walking onto these exact coordinates surfaces
// real ground/satellite photographs of the incident automatically!
export const FLOOD_IMPACT_ZONES: FloodImpactZone[] = [
  {
    id: 'fz_miteri',
    stationId: 'miteri_bridge',
    title: 'Miteri Bridge & Rasuwagadhi Mudslide Throat',
    nepaliTitle: 'मितेरी पुल बाढीग्रस्त नाका',
    xMin: 16,
    xMax: 28,
    yMin: 14,
    yMax: 20,
    caption: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.",
    previewImageUrl: '/incident_photos/gyirong_rasuwagadhi_mudslide_2025.png'
  },
  {
    id: 'fz_timure',
    stationId: 'timure',
    title: 'Timure Buried EV Port & Customs Gorge',
    nepaliTitle: 'टिमुरे डुबान र भन्सार क्षेत्र',
    xMin: 22,
    xMax: 32,
    yMin: 41,
    yMax: 47,
    caption: 'Inundated EV container staging yard & undercut Pasang Lhamu Highway',
    previewImageUrl: '/incident_photos/timure_customs_office.jpg'
  },
  {
    id: 'fz_hydro',
    stationId: 'rasuwagadhi_hydro',
    title: '111 MW Rasuwagadhi Hydropower Intake Scar',
    nepaliTitle: '१११ मेगावाट जलविद्युत बाँध क्षति क्षेत्र',
    xMin: 21,
    xMax: 29,
    yMin: 26,
    yMax: 32,
    caption: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.",
    previewImageUrl: '/incident_photos/chilime_hydropower_dam.jpg'
  },
  {
    id: 'fz_purugu',
    stationId: 'purugu_glacier',
    title: 'Purugu 5,366m Rock-Ice Detachment Headwall',
    nepaliTitle: 'पुरुगु हिमपहिरो उद्गम क्षेत्र',
    xMin: 43,
    xMax: 54,
    yMin: 7,
    yMax: 14,
    caption: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.",
    previewImageUrl: '/incident_photos/landsat_rasuwa_flood_2026_08_26.png'
  },
  {
    id: 'fz_chilime',
    stationId: 'chilime',
    title: 'Chilime Saturated Tamang Terraces',
    nepaliTitle: 'चिलिमे तामाङ बस्ती र भिरालो जमिन',
    xMin: 7,
    xMax: 14,
    yMin: 53,
    yMax: 60,
    caption: 'Traditional dry-stone Tamang homes & S-band monsoon-saturated terraces',
    previewImageUrl: '/incident_photos/chilime_village_houses.jpg'
  },
  {
    id: 'fz_syabru',
    stationId: 'syabrubesi',
    title: 'Syabrubesi River Confluence (Dobhan)',
    nepaliTitle: 'स्याफ्रुबेसी दोभान जोखिम तटीय क्षेत्र',
    xMin: 22,
    xMax: 32,
    yMin: 70,
    yMax: 75,
    caption: 'Settlements tightly hugging the Langtang Khola + Bhote Koshi confluence',
    previewImageUrl: '/incident_photos/syabrubesi_confluence.jpg'
  }
];

export const FAST_TRAVEL_POINTS: FastTravelPoint[] = [
  {
    id: 'ft_lab_inside',
    name: '🏛️ Inside DHM–NISAR Kendra (Lab)',
    nepaliName: 'निसार वैज्ञानिक प्रयोगशाला भित्र',
    sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.",
    mapId: 'nisar_lab_interior',
    tx: 8,
    ty: 8,
    dir: 'up',
    stationId: 'syabrubesi'
  },
  {
    id: 'ft_syabrubesi',
    name: '🏘️ Syabrubesi Dobhan (Confluence)',
    nepaliName: 'स्याफ्रुबेसी दोभान (१,४३६ मि.)',
    sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.",
    mapId: 'overworld',
    tx: 28,
    ty: 72,
    dir: 'up',
    stationId: 'syabrubesi'
  },
  {
    id: 'ft_chilime',
    name: '🏡 Chilime Tamang Terraces (West Slope)',
    nepaliName: 'चिलिमे तामाङ बस्ती (१,६४० मि.)',
    sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.",
    mapId: 'overworld',
    tx: 11,
    ty: 58,
    dir: 'up',
    stationId: 'chilime'
  },
  {
    id: 'ft_timure',
    name: '🏮 Timure Customs & Flood Scar',
    nepaliName: 'टिमुरे भन्सार र तामाङ चियाघर (१,८२१ मि.)',
    sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.",
    mapId: 'overworld',
    tx: 27,
    ty: 43,
    dir: 'up',
    stationId: 'timure'
  },
  {
    id: 'ft_hydro',
    name: '⚡ 111 MW Rasuwagadhi Hydropower Dam',
    nepaliName: 'रसुवागढी जलविद्युत बाँध (१,८२५ मि.)',
    sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.",
    mapId: 'overworld',
    tx: 26,
    ty: 30,
    dir: 'left',
    stationId: 'rasuwagadhi_hydro'
  },
  {
    id: 'ft_bridge',
    name: '🌉 Miteri Bridge & 1855 Rasuwagadhi Fort',
    nepaliName: 'मितेरी पुल र रसुवागढी किल्ला (१,८३१ मि.)',
    sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.",
    mapId: 'overworld',
    tx: 25,
    ty: 17,
    dir: 'left',
    stationId: 'miteri_bridge'
  },
  {
    id: 'ft_purugu',
    name: '🏔️ Purugu / Langtang Glacier Crown',
    nepaliName: 'पुरुगु हिमनदी उद्गमस्थल (५,३६६ मि.)',
    sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.",
    mapId: 'overworld',
    tx: 47,
    ty: 11,
    dir: 'up',
    stationId: 'purugu_glacier'
  }
];

export const DOOR_WARPS: DoorWarp[] = [
  // Enter DHM–NISAR Kendra in Syabrubesi (prop at tx=25, ty=64, w=7, h=6 -> door at x=28..29, y=69)
  {
    fromMap: 'overworld',
    tx: 28,
    ty: 69,
    toMap: 'nisar_lab_interior',
    destTx: 8,
    destTy: 10,
    destDir: 'up',
    label: 'नमस्ते • Entering DHM–NISAR Himalayan Geomatics Kendra...'
  },
  {
    fromMap: 'overworld',
    tx: 29,
    ty: 69,
    toMap: 'nisar_lab_interior',
    destTx: 9,
    destTy: 10,
    destDir: 'up',
    label: 'नमस्ते • Entering DHM–NISAR Himalayan Geomatics Kendra...'
  },
  // Exit DHM–NISAR Kendra via Nepali Galaicha Carpet (x=8..9, y=11)
  {
    fromMap: 'nisar_lab_interior',
    tx: 8,
    ty: 11,
    toMap: 'overworld',
    destTx: 28,
    destTy: 70,
    destDir: 'down',
    label: 'Stepping out to Syabrubesi Dobhan...'
  },
  {
    fromMap: 'nisar_lab_interior',
    tx: 9,
    ty: 11,
    toMap: 'overworld',
    destTx: 29,
    destTy: 70,
    destDir: 'down',
    label: 'Stepping out to Syabrubesi Dobhan...'
  },
  // Enter Timure Tamang Tea-House Shelter (prop at tx=23, ty=37, w=5, h=4 -> door at x=25..26, y=40)
  {
    fromMap: 'overworld',
    tx: 25,
    ty: 40,
    toMap: 'timure_house_interior',
    destTx: 5,
    destTy: 8,
    destDir: 'up',
    label: 'Entering Aama Dolma’s Tamang Tea-House Shelter...'
  },
  {
    fromMap: 'overworld',
    tx: 26,
    ty: 40,
    toMap: 'timure_house_interior',
    destTx: 6,
    destTy: 8,
    destDir: 'up',
    label: 'Entering Aama Dolma’s Tamang Tea-House Shelter...'
  },
  // Exit Timure Tea-House (x=5..6, y=9)
  {
    fromMap: 'timure_house_interior',
    tx: 5,
    ty: 9,
    toMap: 'overworld',
    destTx: 25,
    destTy: 41,
    destDir: 'down',
    label: 'Returning to Timure Canyon...'
  },
  {
    fromMap: 'timure_house_interior',
    tx: 6,
    ty: 9,
    toMap: 'overworld',
    destTx: 26,
    destTy: 41,
    destDir: 'down',
    label: 'Returning to Timure Canyon...'
  }
];

export interface BuiltMap {
  id: MapId;
  width: number;
  height: number;
  tiles: string[][];
  solid: boolean[][];
  props: WorldProp[];
}

export function buildAllMaps(interventionDeployed = false): Record<MapId, BuiltMap> {
  return {
    overworld: buildOverworldMap(interventionDeployed),
    nisar_lab_interior: buildNisarLabInterior(),
    timure_house_interior: buildTimureHouseInterior()
  };
}

function addPropWithCollision(
  props: WorldProp[],
  solid: boolean[][],
  p: WorldProp
) {
  props.push(p);
  const solidRows = p.solidRowsFromBottom ?? p.hTiles;
  const startY = p.ty + (p.hTiles - solidRows);
  for (let y = startY; y < p.ty + p.hTiles; y++) {
    for (let x = p.tx; x < p.tx + p.wTiles; x++) {
      if (y >= 0 && y < solid.length && x >= 0 && x < solid[0].length) {
        solid[y][x] = true;
      }
    }
  }
}

// ============================================================================
// REALISTIC RASUWA DISTRICT GEOGRAPHY OVERWORLD (58 x 86 TILES)
// ============================================================================
function buildOverworldMap(interventionDeployed = false): BuiltMap {
  const W = 58;
  const H = 86;
  const tiles: string[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      // High alpine moraine scree transition between tree line and snowpack
      if (x >= 40 && y >= 22 && y <= 36 && (x + y * 3) % 5 < 3) {
        return 'alpine_scree';
      }
      return 'grass';
    })
  );
  const solid: boolean[][] = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => false)
  );
  const props: WorldProp[] = [];

  // 1. High-Altitude Cryosphere Snow & Purugu Glacier Ice Wall in North-East (x >= 40, y <= 24)
  for (let y = 0; y <= 24; y++) {
    for (let x = 39; x < W; x++) {
      if (y + (57 - x) * 0.25 < 25) {
        const isIceHeadwall = y <= 6 && x >= 43;
        tiles[y][x] = isIceHeadwall ? 'glacier_ice' : 'snow';
        if (isIceHeadwall) solid[y][x] = true;
      }
    }
  }

  // 2. Stepped Himalayan Schist/Gneiss Cliff Terraces Across Elevation Zones (with Stone Stairs!)
  for (let x = 3; x < W - 3; x++) {
    // Western Chilime Terrace Step (x = 4..17, y = 63)
    if (x >= 4 && x <= 17) {
      if (x === 11 || x === 12) {
        tiles[63][x] = 'stairs';
        tiles[64][x] = 'stairs';
      } else {
        tiles[63][x] = 'cliff_top';
        tiles[64][x] = 'cliff_face';
        solid[63][x] = true;
        solid[64][x] = true;
      }
    }

    // Central Gorge Cliff Steps (x = 22..38):
    // y = 61 (Syabrubesi -> Pasang Lhamu Highway), y = 49 (-> Timure), y = 35 (-> 111MW Dam), y = 22 (-> Rasuwagadhi/Miteri)
    if (x >= 22 && x <= 38) {
      for (const cy of [61, 49, 35, 22]) {
        if (x === 28 || x === 29) {
          tiles[cy][x] = 'stairs';
          tiles[cy + 1][x] = 'stairs';
        } else {
          tiles[cy][x] = 'cliff_top';
          tiles[cy + 1][x] = 'cliff_face';
          solid[cy][x] = true;
          solid[cy + 1][x] = true;
        }
      }
    }

    // Eastern Langtang -> Purugu High Ascent Switchbacks (x = 42..54):
    // y = 56, y = 40, y = 24
    if (x >= 42 && x <= 54) {
      for (const cy of [56, 40, 24]) {
        if (x === 47 || x === 48) {
          tiles[cy][x] = 'stairs';
          tiles[cy + 1][x] = 'stairs';
        } else {
          tiles[cy][x] = 'cliff_top';
          tiles[cy + 1][x] = 'cliff_face';
          solid[cy][x] = true;
          solid[cy + 1][x] = true;
        }
      }
    }
  }

  // 3. REAL RASUWA RIVER CONFLUENCE HYDROLOGY!
  // (A) North -> South Lhende Khola / Bhote Koshi Gorge (x ~ 18..21) widening into Trishuli below Syabrubesi (y >= 77)
  for (let y = 2; y < H - 2; y++) {
    const bend = Math.round(Math.sin(y * 0.14));
    const center = 19 + bend;
    const halfW = y >= 77 ? 2 : 1;
    for (let cx = center - 1; cx <= center + halfW + 1; cx++) {
      if (cx > 2 && cx < W - 2) {
        tiles[y][cx] = y < 48 || cx === center ? 'rapids' : 'water';
        solid[y][cx] = true;
      }
    }
  }

  // (B) Upper Lhende Meltwater Channel draining Purugu Glacier (x = 43 -> 20 along y = 13..14) into Miteri Gorge!
  for (let x = 20; x <= 43; x++) {
    const ry = 13 + (x % 5 === 0 ? 1 : 0);
    tiles[ry][x] = 'rapids';
    tiles[ry + 1][x] = 'water';
    solid[ry][x] = true;
    solid[ry + 1][x] = true;
  }

  // (C) Langtang Khola descending East Gorge (x = 39..41, y = 25..76) and turning West at Syabrubesi Dobhan (y = 76..78, x = 20..41)!
  for (let y = 25; y <= 77; y++) {
    for (const lx of [39, 40, 41]) {
      tiles[y][lx] = lx === 40 || y < 52 ? 'rapids' : 'water';
      solid[y][lx] = true;
    }
  }
  for (let x = 20; x <= 41; x++) {
    for (const ly of [76, 77, 78]) {
      tiles[ly][x] = ly === 77 ? 'rapids' : 'water';
      solid[ly][x] = true;
    }
  }

  // Natural Himalayan river-cobble boulder bars flanking active river channels
  for (let y = 3; y < H - 3; y++) {
    for (let x = 3; x < W - 3; x++) {
      if (!solid[y][x] && tiles[y][x] === 'grass') {
        const nearRiver =
          tiles[y][x - 1] === 'water' ||
          tiles[y][x - 1] === 'rapids' ||
          tiles[y][x + 1] === 'water' ||
          tiles[y][x + 1] === 'rapids' ||
          tiles[y - 1][x] === 'water' ||
          tiles[y + 1][x] === 'water';
        if (nearRiver) {
          tiles[y][x] = 'river_cobble';
        }
      }
    }
  }

  // 4. AUTHENTIC NEPALI JHOLUNGE PUL (SUSPENSION BRIDGES) ACROSS THE GORGES!
  // Bridge 1: Western Syabrubesi -> Chilime Suspension Bridge across Bhote Koshi (y = 69..70, x = 16..23)
  for (let y = 69; y <= 70; y++) {
    for (let x = 16; x <= 23; x++) {
      tiles[y][x] = 'bridge_wood';
      solid[y][x] = false;
    }
  }
  // Bridge 2: Upper Chilime -> Timure Gorge Footbridge across Bhote Koshi (y = 46..47, x = 16..23)
  for (let y = 46; y <= 47; y++) {
    for (let x = 16; x <= 23; x++) {
      tiles[y][x] = 'bridge_wood';
      solid[y][x] = false;
    }
  }
  // Bridge 3: Eastern Syabrubesi -> Langtang Trail Jholunge Pul across Langtang Khola (y = 70..71, x = 38..43)
  for (let y = 70; y <= 71; y++) {
    for (let x = 38; x <= 43; x++) {
      tiles[y][x] = 'bridge_wood';
      solid[y][x] = false;
    }
  }
  // Bridge 4: Miteri Border Crossing Temporary Span across Lhende Khola (y = 16..17, x = 15..23)
  for (let y = 16; y <= 17; y++) {
    for (let x = 15; x <= 23; x++) {
      tiles[y][x] = 'bridge_wood';
      solid[y][x] = false;
    }
  }
  // Bridge 5: High Alpine Traverse Bridge from Miteri Gorge East to Purugu Glacier (x = 34..35, y = 12..16)
  for (let y = 12; y <= 16; y++) {
    for (const bx of [34, 35]) {
      tiles[y][bx] = 'bridge_wood';
      solid[y][bx] = false;
    }
  }

  // 5. NEPALI DHUNGE BATO (SLATE FLAGSTONE TRAILS) CONNECTING EVERY SETTLEMENT!
  const carvePath = (x1: number, y1: number, x2: number, y2: number) => {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (
          !solid[y][x] &&
          tiles[y][x] !== 'bridge_wood' &&
          tiles[y][x] !== 'stairs'
        ) {
          tiles[y][x] = 'path';
        }
      }
    }
  };

  // Syabrubesi Plaza & Main North-South Pasang Lhamu Highway (routing cleanly around Kendra!)
  carvePath(23, 70, 37, 71); // East-West Syabrubesi main bazaar street connecting both suspension bridges!
  carvePath(28, 71, 29, 74); // South spur to Dobhan overlook
  carvePath(32, 63, 33, 70); // Bypass east of DHM-NISAR Kendra up to cliff stairs
  carvePath(28, 62, 33, 63);
  carvePath(28, 16, 29, 60); // Pasang Lhamu Highway straight through Timure, 111MW Dam & Miteri!
  carvePath(23, 16, 35, 17); // Miteri border plaza & east traverse to high bridge

  // Western Chilime Trail
  carvePath(11, 65, 16, 70);
  carvePath(11, 46, 12, 62);
  carvePath(12, 46, 16, 47);

  // Eastern Langtang -> Purugu Alpine Trail + Fort Rampart Walkway
  carvePath(43, 70, 48, 71);
  carvePath(47, 10, 48, 71);
  carvePath(24, 12, 48, 12);

  // 6. WALK-IN FLOOD SILT & BOULDER IMPACT ZONES (Tactile Visual Evidence on Ground!)
  const paintFloodSilt = (x1: number, y1: number, x2: number, y2: number) => {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        if (!solid[y][x] && tiles[y][x] !== 'bridge_wood' && tiles[y][x] !== 'stairs') {
          tiles[y][x] = 'flood_silt';
        }
      }
    }
  };
  paintFloodSilt(22, 15, 27, 19); // Miteri Bridge washed-out boulder bank
  paintFloodSilt(22, 26, 27, 31); // 111 MW Rasuwagadhi Dam silted intake bank
  paintFloodSilt(22, 42, 27, 46); // Timure buried EV dry port & customs bank
  paintFloodSilt(44, 7, 52, 11);  // Purugu rock-ice detachment debris fan

  // 7. CHILIME AGRICULTURAL TERRACES (GARA) & WILD LALIGURAS FLOWERS
  for (let y = 53; y <= 60; y++) {
    for (let x = 5; x <= 10; x++) {
      tiles[y][x] = 'crop_terrace';
    }
    for (let x = 13; x <= 16; x++) {
      if (!solid[y][x]) tiles[y][x] = y % 2 === 0 ? 'crop_terrace' : 'tall_grass';
    }
  }

  // ==========================================================================
  // 8. LANDMARKS & BUILDINGS BY REGION
  // ==========================================================================

  // --- REGION A: SYABRUBESI DOBHAN (1,436m) ---
  // DHM–NISAR Himalayan Geomatics Kendra (tx=25, ty=64, w=7, h=6 -> doorway at x=28..29, y=69)
  addPropWithCollision(props, solid, {
    id: 'prop_nisar_lab',
    kind: 'dhm_nisar_kendra',
    tx: 25,
    ty: 64,
    wTiles: 7,
    hTiles: 6,
    solidRowsFromBottom: 4
  });
  solid[69][28] = false;
  solid[69][29] = false;
  tiles[70][28] = 'door_sand';
  tiles[70][29] = 'door_sand';

  // Crimson Laliguras blossoms flanking Kendra
  tiles[70][26] = 'flower';

  addPropWithCollision(props, solid, {
    id: 'sign_lab',
    kind: 'signpost',
    tx: 25,
    ty: 70,
    wTiles: 1,
    hTiles: 1,
    solidRowsFromBottom: 1,
    interactText:
      "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  });

  // Whitewashed Buddhist Chorten / Stupa near Bhote Koshi Jholunge Pul
  addPropWithCollision(props, solid, {
    id: 'syabru_stupa',
    kind: 'buddhist_stupa',
    tx: 22,
    ty: 65,
    wTiles: 3,
    hTiles: 3,
    solidRowsFromBottom: 2,
    interactText:
      '☸️ SYABRUBESI CHORTEN (माने छोर्तेन) — Built by local Tamang and Hyolmo elders overlooking the Bhote Koshi and Langtang Khola river confluence.'
  });

  // Sacred Chautari Peepal Resting Platform at Dobhan
  addPropWithCollision(props, solid, {
    id: 'syabru_chautari',
    kind: 'chautari_peepal',
    tx: 23,
    ty: 72,
    wTiles: 4,
    hTiles: 3,
    solidRowsFromBottom: 2,
    interactText:
      '🌿 NEPALI CHAUTARI & PEEPAL TREE — Porters, trekkers, and villagers rest their woven Doko baskets on this cool stone platform above the roaring Dobhan confluence.'
  });

  // Syabrubesi Bazaar Lodge (with solar water tubes & turquoise balcony)
  addPropWithCollision(props, solid, {
    id: 'syabru_lodge',
    kind: 'syabrubesi_lodge',
    tx: 34,
    ty: 64,
    wTiles: 5,
    hTiles: 4,
    solidRowsFromBottom: 3,
    interactText:
      "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  });

  // NDRRMA Rescue Helipad
  for (let y = 72; y <= 74; y++) {
    for (let x = 33; x <= 37; x++) {
      tiles[y][x] = 'paved';
    }
  }
  addPropWithCollision(props, solid, {
    id: 'syabru_heli',
    kind: 'helicopter',
    tx: 34,
    ty: 72,
    wTiles: 3,
    hTiles: 2,
    solidRowsFromBottom: 2,
    interactText:
      "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  });

  // Syabrubesi Real Photo Evidence Stand
  addPropWithCollision(props, solid, {
    id: 'photo_stand_syabru',
    kind: 'photo_evidence_stand',
    tx: 30,
    ty: 72,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1,
    opensPhotosStationId: 'syabrubesi'
  });

  // --- REGION B: CHILIME & GOLJUNG TAMANG TERRACES (1,640m, WEST) ---
  addPropWithCollision(props, solid, {
    id: 'chilime_tamang_house',
    kind: 'tamang_stone_house',
    tx: 6,
    ty: 48,
    wTiles: 5,
    hTiles: 4,
    solidRowsFromBottom: 3,
    interactText:
      '🏡 TRADITIONAL TAMANG STONE HOUSE (चिलिमे) — Built with dry-stacked Himalayan slate, carved cedar balcony (Dalan), firewood tucked under eaves, and roof stones against gorge winds.'
  });

  addPropWithCollision(props, solid, {
    id: 'chilime_mani',
    kind: 'mani_wall',
    tx: 13,
    ty: 49,
    wTiles: 3,
    hTiles: 2,
    solidRowsFromBottom: 1,
    interactText:
      '🪨 CARVED MANI STONE WALL — Slate tablets inscribed with "Om Mani Padme Hum" along the ancient Chilime–Goljung heritage trail.'
  });

  addPropWithCollision(props, solid, {
    id: 'photo_stand_chilime',
    kind: 'photo_evidence_stand',
    tx: 8,
    ty: 57,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1,
    opensPhotosStationId: 'chilime'
  });

  // --- REGION C: TIMURE BORDER BAZAAR & FLOOD SCAR (1,821m, NORTH GORGE) ---
  // Enterable Tamang Relief Tea-House (tx=23, ty=37, w=5, h=4 -> door at x=25..26, y=40!)
  addPropWithCollision(props, solid, {
    id: 'timure_teahouse',
    kind: 'tamang_stone_house',
    tx: 23,
    ty: 37,
    wTiles: 5,
    hTiles: 4,
    solidRowsFromBottom: 3
  });
  solid[40][25] = false;
  solid[40][26] = false;
  tiles[41][25] = 'door_sand';
  tiles[41][26] = 'door_sand';

  // Authentic Timure Customs Post with Fluttering Nepal Flag!
  addPropWithCollision(props, solid, {
    id: 'timure_customs',
    kind: 'timure_customs_post',
    tx: 31,
    ty: 37,
    wTiles: 5,
    hTiles: 4,
    solidRowsFromBottom: 3,
    interactText:
      "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  });

  // Timure Flood Debris Scar (Buried EV Container & Boulders)
  addPropWithCollision(props, solid, {
    id: 'timure_debris_scar',
    kind: 'flood_debris_scar',
    tx: 22,
    ty: 43,
    wTiles: 4,
    hTiles: 2,
    solidRowsFromBottom: 2,
    opensPhotosStationId: 'timure'
  });

  addPropWithCollision(props, solid, {
    id: 'photo_stand_timure',
    kind: 'photo_evidence_stand',
    tx: 31,
    ty: 43,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1,
    opensPhotosStationId: 'timure'
  });

  addPropWithCollision(props, solid, {
    id: 'timure_flags',
    kind: 'prayer_flags',
    tx: 30,
    ty: 46,
    wTiles: 3,
    hTiles: 1,
    solidRowsFromBottom: 0
  });

  // --- REGION D: 111 MW RASUWAGADHI HYDROPOWER HEADWORKS (1,825m) ---
  addPropWithCollision(props, solid, {
    id: 'rasuwagadhi_dam_prop',
    kind: 'hydro_dam',
    tx: 16,
    ty: 26,
    wTiles: 6,
    hTiles: 4,
    solidRowsFromBottom: 3,
    interactText:
      "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  });

  addPropWithCollision(props, solid, {
    id: 'hydro_debris_scar',
    kind: 'flood_debris_scar',
    tx: 23,
    ty: 26,
    wTiles: 4,
    hTiles: 2,
    solidRowsFromBottom: 2,
    opensPhotosStationId: 'rasuwagadhi_hydro'
  });

  addPropWithCollision(props, solid, {
    id: 'photo_stand_hydro',
    kind: 'photo_evidence_stand',
    tx: 30,
    ty: 28,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1,
    opensPhotosStationId: 'rasuwagadhi_hydro'
  });

  // --- REGION E: HISTORIC 1855 RASUWAGADHI FORT & MITERI BRIDGE (1,831m) ---
  addPropWithCollision(props, solid, {
    id: 'prop_rasuwagadhi_fort',
    kind: 'rasuwagadhi_fort',
    tx: 24,
    ty: 9,
    wTiles: 6,
    hTiles: 3,
    solidRowsFromBottom: 2,
    interactText:
      "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  });

  addPropWithCollision(props, solid, {
    id: 'miteri_debris_scar',
    kind: 'flood_debris_scar',
    tx: 22,
    ty: 18,
    wTiles: 4,
    hTiles: 2,
    solidRowsFromBottom: 2,
    opensPhotosStationId: 'miteri_bridge'
  });

  addPropWithCollision(props, solid, {
    id: 'photo_stand_miteri',
    kind: 'photo_evidence_stand',
    tx: 30,
    ty: 14,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1,
    opensPhotosStationId: 'miteri_bridge'
  });

  // --- REGION F: PURUGU / LANGTANG GLACIER DETACHMENT CROWN (5,366m, EAST-NORTHEAST) ---
  addPropWithCollision(props, solid, {
    id: 'purugu_debris_scar',
    kind: 'flood_debris_scar',
    tx: 49,
    ty: 7,
    wTiles: 4,
    hTiles: 2,
    solidRowsFromBottom: 2,
    opensPhotosStationId: 'purugu_glacier'
  });

  addPropWithCollision(props, solid, {
    id: 'photo_stand_purugu',
    kind: 'photo_evidence_stand',
    tx: 44,
    ty: 9,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1,
    opensPhotosStationId: 'purugu_glacier'
  });

  addPropWithCollision(props, solid, {
    id: 'purugu_flags',
    kind: 'prayer_flags',
    tx: 49,
    ty: 12,
    wTiles: 3,
    hTiles: 1,
    solidRowsFromBottom: 0
  });

  // 9. PLACE ALL 6 SCANNABLE NISAR CORNER-REFLECTOR FIELD BEACONS!
  const beacons: Array<[string, number, number, string]> = [
    ['beacon_1', 27, 73, 'syabrubesi'],
    ['beacon_2', 13, 56, 'chilime'],
    ['beacon_3', 26, 45, 'timure'],
    ['beacon_4', 24, 30, 'rasuwagadhi_hydro'],
    ['beacon_5', 26, 18, 'miteri_bridge'],
    ['beacon_6', 50, 10, 'purugu_glacier']
  ];
  for (const [id, bx, by, stId] of beacons) {
    solid[by][bx] = false;
    addPropWithCollision(props, solid, {
      id,
      kind: 'radar_beacon',
      tx: bx,
      ty: by,
      wTiles: 1,
      hTiles: 2,
      solidRowsFromBottom: 1,
      beaconStationId: stId
    });
  }

  // 10. HIMALAYAN DEODAR PINES, SNOW FIRS & BLOOMING NATIONAL LALIGURAS (RHODODENDRONS)!
  const scenicTrees: Array<[number, number, 'pine_tree' | 'snow_tree' | 'laliguras_tree']> = [
    // Syabrubesi Dobhan lush valley trees
    [22, 61, 'laliguras_tree'],
    [35, 60, 'pine_tree'],
    [22, 80, 'pine_tree'],
    [26, 80, 'laliguras_tree'],
    [31, 80, 'pine_tree'],
    [35, 80, 'pine_tree'],
    // Chilime Tamang slopes with crimson Laliguras!
    [4, 48, 'laliguras_tree'],
    [5, 61, 'laliguras_tree'],
    [14, 60, 'pine_tree'],
    [6, 67, 'pine_tree'],
    [9, 71, 'laliguras_tree'],
    // Langtang Rhododendron Trail (East valley ascent!)
    [44, 65, 'laliguras_tree'],
    [50, 66, 'pine_tree'],
    [43, 58, 'laliguras_tree'],
    [51, 59, 'laliguras_tree'],
    [44, 48, 'laliguras_tree'],
    [51, 49, 'pine_tree'],
    [44, 34, 'snow_tree'],
    [51, 35, 'snow_tree'],
    // High Purugu & Rasuwagadhi alpine snow firs
    [31, 10, 'snow_tree'],
    [35, 19, 'snow_tree'],
    [42, 6, 'snow_tree'],
    [53, 10, 'snow_tree'],
    [52, 16, 'snow_tree']
  ];
  for (const [tx, ty, tk] of scenicTrees) {
    if (tx >= 0 && tx + 2 <= W && ty >= 0 && ty + 3 <= H) {
      let ok = true;
      for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 2; dx++) {
          const t = tiles[ty + dy][tx + dx];
          if (
            solid[ty + dy][tx + dx] ||
            t === 'path' ||
            t === 'bridge_wood' ||
            t === 'stairs' ||
            t === 'water' ||
            t === 'rapids' ||
            t === 'door_sand' ||
            t === 'paved'
          ) {
            ok = false;
          }
        }
      }
      if (ok) {
        addPropWithCollision(props, solid, {
          id: `scenic_${tx}_${ty}`,
          kind: tk,
          tx,
          ty,
          wTiles: 2,
          hTiles: 3,
          solidRowsFromBottom: 2
        });
      }
    }
  }

  // Outer Himalayan Forest Borders
  for (let y = 0; y < H; y += 3) {
    for (let x = 0; x < W; x += 2) {
      const isEdge = x <= 2 || x >= W - 3 || y >= H - 3 || (y <= 2 && x < 40);
      if (!isEdge) continue;
      let clear = true;
      for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 2; dx++) {
          const cy = y + dy;
          const cx = x + dx;
          if (
            cy >= H ||
            cx >= W ||
            solid[cy][cx] ||
            tiles[cy][cx] !== 'grass' && tiles[cy][cx] !== 'snow'
          ) {
            clear = false;
          }
        }
      }
      if (clear) {
        const treeKind =
          tiles[y][x] === 'snow' || y < 18
            ? 'snow_tree'
            : (x + y) % 7 === 0
              ? 'laliguras_tree'
              : 'pine_tree';
        addPropWithCollision(props, solid, {
          id: `edge_${x}_${y}`,
          kind: treeKind,
          tx: x,
          ty: y,
          wTiles: 2,
          hTiles: 3,
          solidRowsFromBottom: 2
        });
      }
    }
  }

  // Post-Intervention World Recovery: Automated NISAR + DHM Early-Warning Siren Masts!
  if (interventionDeployed) {
    addPropWithCollision(props, solid, {
      id: 'deployed_siren_syabru',
      kind: 'flood_siren_tower',
      tx: 22,
      ty: 68,
      wTiles: 2,
      hTiles: 3,
      solidRowsFromBottom: 1,
      interactText:
        "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
    });
    addPropWithCollision(props, solid, {
      id: 'deployed_siren_timure',
      kind: 'flood_siren_tower',
      tx: 30,
      ty: 40,
      wTiles: 2,
      hTiles: 3,
      solidRowsFromBottom: 1,
      interactText:
        "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
    });
  }

  return { id: 'overworld', width: W, height: H, tiles, solid, props };
}

// ============================================================================
// AUTHENTIC DHM–NISAR HIMALAYAN GEOMATICS KENDRA INTERIOR
// ============================================================================
function buildNisarLabInterior(): BuiltMap {
  const W = 18;
  const H = 12;
  const tiles: string[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, () =>
      y === 0
        ? 'lab_wall_top'
        : y === 1
          ? 'lab_wall_bottom'
          : y === 2
            ? 'lab_floor_shadow'
            : 'lab_floor'
    )
  );
  const solid: boolean[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => y <= 1 || x === 0 || x === W - 1 || y === H - 1)
  );
  const props: WorldProp[] = [];

  // Woven Nepali Galaicha Exit Carpet at bottom center (x = 8..9, y = 11)
  tiles[11][8] = 'lab_mat';
  tiles[11][9] = 'lab_mat';
  solid[11][8] = false;
  solid[11][9] = false;

  // THE GIANT 2D/3D NISAR SUPERCOMPUTER MAINFRAME on North Wall (tx = 2, ty = 1, w = 8!)
  addPropWithCollision(props, solid, {
    id: 'lab_giant_computer',
    kind: 'giant_supercomputer',
    tx: 2,
    ty: 1,
    wTiles: 8,
    hTiles: 3,
    solidRowsFromBottom: 2,
    opensComputer: true,
    interactText: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  });

  // Rasuwa Elevation Hazard Chart, InSAR Phase Poster & Himalayan Peak Window!
  addPropWithCollision(props, solid, {
    id: 'lab_wall_posters',
    kind: 'lab_wall_chart',
    tx: 10,
    ty: 0,
    wTiles: 3,
    hTiles: 2,
    solidRowsFromBottom: 0
  });

  // Carved Walnut Nepali Hydrological Archive Cabinets (tx = 13, 15)
  for (const bx of [13, 15]) {
    addPropWithCollision(props, solid, {
      id: `shelf_${bx}`,
      kind: 'lab_bookshelf',
      tx: bx,
      ty: 1,
      wTiles: 2,
      hTiles: 2,
      solidRowsFromBottom: 2,
      interactText:
        bx === 13
          ? "Illustration / simulation: unverified historical or measurement claim removed"
          : '📚 ISRO S-BAND POLARIMETRY LOGS: 9 cm S-band waves measure dielectric moisture saturation (εr ≈ 80) across Chilime’s terraced hillsides!'
    });
  }

  // Left Wall: Live Rotating Drum Seismograph & DHM River Telemetry Rack!
  addPropWithCollision(props, solid, {
    id: 'lab_seismograph_rack',
    kind: 'lab_seismograph',
    tx: 1,
    ty: 4,
    wTiles: 2,
    hTiles: 3,
    solidRowsFromBottom: 2,
    interactText:
      "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  });

  // Left Wall: Real Incident Photo Lightbox Board inside the Lab!
  addPropWithCollision(props, solid, {
    id: 'lab_photo_board',
    kind: 'photo_evidence_stand',
    tx: 1,
    ty: 7,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1,
    opensPhotosStationId: 'all'
  });

  // Right Floor: 3D Physical Raised-Relief Scale Model Table of Rasuwa–Langtang!
  addPropWithCollision(props, solid, {
    id: 'lab_3d_relief_model',
    kind: 'lab_relief_table',
    tx: 11,
    ty: 5,
    wTiles: 5,
    hTiles: 3,
    solidRowsFromBottom: 2,
    interactText:
      "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  });

  // Lower-Right Workbench: Metallic Aluminum Trihedral SAR Corner Reflector & Survey Drone!
  addPropWithCollision(props, solid, {
    id: 'lab_sar_rig',
    kind: 'lab_sar_workbench',
    tx: 12,
    ty: 8,
    wTiles: 3,
    hTiles: 3,
    solidRowsFromBottom: 2,
    interactText:
      "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
  });

  // Brass Nepali Gamala Vessels with Crimson Laliguras flanking entrance
  addPropWithCollision(props, solid, {
    id: 'lab_plant_l',
    kind: 'indoor_plants',
    tx: 1,
    ty: 9,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1
  });
  addPropWithCollision(props, solid, {
    id: 'lab_plant_r',
    kind: 'indoor_plants',
    tx: 15,
    ty: 9,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1
  });

  return { id: 'nisar_lab_interior', width: W, height: H, tiles, solid, props };
}

// ============================================================================
// AUTHENTIC TIMURE TAMANG TEA-HOUSE & SURVIVOR SHELTER INTERIOR
// ============================================================================
function buildTimureHouseInterior(): BuiltMap {
  const W = 13;
  const H = 10;
  const tiles: string[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, () =>
      y === 0 ? 'house_wall_top' : y === 1 ? 'house_wall_bottom' : 'house_floor'
    )
  );
  const solid: boolean[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => y <= 1 || x === 0 || x === W - 1 || y === H - 1)
  );
  const props: WorldProp[] = [];

  tiles[9][5] = 'lab_mat';
  tiles[9][6] = 'lab_mat';
  solid[9][5] = false;
  solid[9][6] = false;

  // Traditional Tamang Clay-and-Stone Agenu Fire Hearth + Brass Chiya Kettle!
  addPropWithCollision(props, solid, {
    id: 'timure_agenu',
    kind: 'agenu_hearth',
    tx: 5,
    ty: 2,
    wTiles: 3,
    hTiles: 2,
    solidRowsFromBottom: 2,
    interactText:
      '🔥 TRADITIONAL TAMANG AGENU HEARTH (अगेनु): Wood fire warming salted butter tea (Suja) and spiced Nepali Chiya for displaced families in Timure.'
  });

  // Carved Wooden Tea Counter & Woven Bamboo Muda Stools
  addPropWithCollision(props, solid, {
    id: 'timure_counter',
    kind: 'tea_counter',
    tx: 1,
    ty: 3,
    wTiles: 2,
    hTiles: 4,
    solidRowsFromBottom: 3,
    interactText:
      '🍵 BUTTER TEA THERMOSES & BAMBOO MUDA STOOLS: Neighbours gather here whenever heavy monsoon rain swells the Bhote Koshi.'
  });

  // Photo Evidence Frame inside Shelter
  addPropWithCollision(props, solid, {
    id: 'timure_indoor_photos',
    kind: 'photo_evidence_stand',
    tx: 10,
    ty: 2,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1,
    opensPhotosStationId: 'timure'
  });

  addPropWithCollision(props, solid, {
    id: 'timure_plants_2',
    kind: 'indoor_plants',
    tx: 10,
    ty: 6,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1
  });

  return { id: 'timure_house_interior', width: W, height: H, tiles, solid, props };
}

// ============================================================================
// AUTHENTIC NEPALI CHARACTERS WITH QUESTS, REAL PHOTOS & FLOOD TESTIMONIES
// ============================================================================
export const GAME_NPCS: GameNpc[] = [
  // --- INSIDE DHM–NISAR HIMALAYAN GEOMATICS KENDRA ---
  {
    id: 'npc_rudra_lab',
    mapId: 'nisar_lab_interior',
    tx: 8,
    ty: 4,
    dir: 'down',
    palette: 'rudra',
    name: 'Prof. Dr. Rudra ("Radar Bajey")',
    role: 'Chief DHM–NISAR Glaciologist • Palpali Dhaka Topi',
    questIdToGive: 'quest_miteri_scar',
    greeting:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    voiceMood: 'welcome',
    topics: [
      {
        question: '🎯 [QUEST] Assign me the Miteri Border Flood Investigation!',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'warning',
        givesQuestId: 'quest_miteri_scar'
      },
      {
        question: '🖥️ Boot the Giant 2D/3D Rasuwa Supercomputer!',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'radar',
        opensComputer: true,
        givesQuestId: 'quest_arm_siren'
      },
      {
        question: '📷 Show Real Photographs of the Rasuwa Floods & Satellite Scars!',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'somber',
        opensPhotosStationId: 'all'
      },
      {
        question: '🛰️ How did NISAR detect the flood 7 days before Aug 26?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'eureka'
      }
    ]
  },
  {
    id: 'npc_anjali_lab',
    mapId: 'nisar_lab_interior',
    tx: 4,
    ty: 6,
    dir: 'right',
    palette: 'scientist',
    name: 'Dr. Anjali Shrestha',
    role: 'DHM InSAR & Polarimetry Specialist',
    greeting:
      "Fictional dialogue: Jojolapa & Namaste! Check out our trihedral corner reflector on the right workbench and our live drum seismograph on the left—zero cartoon gimmicks here, pure Himalayan radar science!",
    voiceMood: 'radar',
    topics: [
      {
        question: 'Why combine NASA L-Band (24cm) + ISRO S-Band (9cm)?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'radar'
      },
      {
        question: '🖥️ Open the Giant 2D/3D Supercomputer Console!',
        answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'eureka',
        opensComputer: true
      }
    ]
  },

  // --- SYABRUBESI DOBHAN (1,436m) ---
  {
    id: 'npc_sita_syabru',
    mapId: 'overworld',
    tx: 26,
    ty: 71,
    dir: 'right',
    palette: 'coordinator',
    name: 'Didi Sita Tamang',
    role: 'Gosaikunda Ward Relief Coordinator',
    questIdToGive: 'quest_timure_witness',
    greeting:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    voiceMood: 'welcome',
    topics: [
      {
        question: '🎯 [QUEST] How can I help flood-affected families in Timure?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'warning',
        givesQuestId: 'quest_timure_witness'
      },
      {
        question: '📷 Show Real Photo of Syabrubesi River Confluence!',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'somber',
        opensPhotosStationId: 'syabrubesi'
      },
      {
        question: 'How does radar spot flooded bazaar streets at night?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'radar'
      }
    ]
  },
  {
    id: 'npc_pilot',
    mapId: 'overworld',
    tx: 33,
    ty: 73,
    dir: 'left',
    palette: 'pilot',
    name: 'Capt. Kanchha Gurung',
    role: 'Nepali NDRRMA Mountain Rescue Pilot',
    greeting:
      "Fictional dialogue: Jai Nepal! You can trek across the steel Jholunge Pul suspension bridges to Chilime, Timure, Miteri Bridge, and Purugu Glacier on foot—OR hop into my rescue helicopter anytime!",
    voiceMood: 'welcome',
    topics: [
      {
        question: '🚁 Fly me to a Rasuwa flood location now! (Fast-Travel)',
        answer: "Fictional dialogue: Rotors spinning! Select any landing zone in Rasuwa District:",
        voiceMood: 'eureka',
        opensFastTravel: true
      },
      {
        question: 'What were air rescues like after August 26, 2026?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'warning'
      }
    ]
  },

  // --- CHILIME & GOLJUNG TERRACES (1,640m, WEST SLOPE) ---
  {
    id: 'npc_maila_chilime',
    mapId: 'overworld',
    tx: 10,
    ty: 57,
    dir: 'right',
    palette: 'farmer',
    name: 'Kaka Maila Tamang',
    role: 'Chilime Terrace Farmer (Carrying Bamboo Doko)',
    questIdToGive: 'quest_hydro_terrace',
    greeting:
      "Fictional dialogue: Lhaso! Welcome across the western suspension bridge to Chilime. Behind me stand our hand-built millet terraces and dry-stone Tamang homes.",
    voiceMood: 'welcome',
    topics: [
      {
        question: '🎯 [QUEST] Check S-Band Soil Moisture & the 111 MW Dam!',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'radar',
        givesQuestId: 'quest_hydro_terrace'
      },
      {
        question: '📷 Show Real Photo of Chilime’s Traditional Tamang Houses!',
        answer:
          "Fictional dialogue: Here is a real photograph of our stone-and-carved-wood Tamang homes in Chilime above the terraced slopes!",
        voiceMood: 'welcome',
        opensPhotosStationId: 'chilime'
      }
    ]
  },
  {
    id: 'npc_tech_chilime',
    mapId: 'overworld',
    tx: 15,
    ty: 52,
    dir: 'left',
    palette: 'tech',
    name: 'Er. Pemba Lama',
    role: 'NEA Chilime–Trishuli Grid Engineer',
    greeting:
      "Fictional dialogue: Chilime pioneered Nepal’s community-led hydropower! When glacial boulder surges knocked out the Rasuwa–Trishuli corridor, clean electricity exports and local grids took a massive hit.",
    voiceMood: 'warning',
    topics: [
      {
        question: 'How much did the floods cost Nepal’s economy?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'somber'
      }
    ]
  },

  // --- TIMURE BAZAAR & INSIDE TAMANG TEA-HOUSE (1,821m) ---
  {
    id: 'npc_tashi',
    mapId: 'overworld',
    tx: 30,
    ty: 45,
    dir: 'left',
    palette: 'driver',
    name: 'Pasang Tamang',
    role: 'Rasuwagadhi–Kathmandu EV & Container Driver',
    greeting:
      "Fictional dialogue: Look at that mud-buried container scar right beside the river in Timure! Step inside Aama Dolma’s Tamang Tea-House just north of me to warm up by the Agenu fire.",
    voiceMood: 'somber',
    topics: [
      {
        question: '📷 Show Real Photo of Timure Customs Gorge!',
        answer:
          "Fictional dialogue: Look at the sheer Himalayan rock walls towering right over Timure Customs Post and the narrow highway bench!",
        voiceMood: 'warning',
        opensPhotosStationId: 'timure'
      },
      {
        question: 'What happened to the EV dry port here?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'somber'
      }
    ]
  },
  {
    id: 'npc_dolma',
    mapId: 'timure_house_interior',
    tx: 4,
    ty: 5,
    dir: 'right',
    palette: 'elder',
    name: 'Aama Dolma Tamang',
    role: 'Timure Elder & Flood Witness',
    greeting:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    voiceMood: 'somber',
    topics: [
      {
        question: 'What happened in Timure that day?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'somber',
        givesQuestId: 'quest_arm_siren'
      },
      {
        question: '📷 View Real Timure Canyon Photo Archive',
        answer: "Fictional dialogue: Here are the real photographs from our narrow Timure border canyon.",
        voiceMood: 'welcome',
        opensPhotosStationId: 'timure'
      }
    ]
  },
  {
    id: 'npc_nima_worker',
    mapId: 'timure_house_interior',
    tx: 8,
    ty: 6,
    dir: 'left',
    palette: 'engineer',
    name: 'Nima Dorje',
    role: 'Rescued Hydropower Tunnel Technician',
    greeting:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    voiceMood: 'radar',
    topics: [
      {
        question: 'How does SAR Coherence Change Detection save lives?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'eureka'
      }
    ]
  },

  // --- 111 MW RASUWAGADHI HYDROPOWER DAM (1,825m) ---
  {
    id: 'npc_bikash',
    mapId: 'overworld',
    tx: 27,
    ty: 29,
    dir: 'left',
    palette: 'engineer',
    name: 'Chief Er. Bikram Adhikari',
    role: '111 MW Rasuwagadhi Hydropower Engineer',
    greeting:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    voiceMood: 'warning',
    topics: [
      {
        question: '📷 Show Real Photo of Rasuwa Hydropower Headworks!',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'radar',
        opensPhotosStationId: 'rasuwagadhi_hydro'
      },
      {
        question: 'How would 12-day NISAR passes protect hydropower?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'eureka'
      }
    ]
  },

  // --- MITERI BRIDGE & 1855 RASUWAGADHI FORT (1,831m) ---
  {
    id: 'npc_suman',
    mapId: 'overworld',
    tx: 28,
    ty: 18,
    dir: 'up',
    palette: 'inspector',
    name: 'Inspector Ramesh Karki',
    role: 'Rasuwagadhi Border Post Officer',
    greeting:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    voiceMood: 'warning',
    topics: [
      {
        question: "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence.",
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'warning',
        opensPhotosStationId: 'miteri_bridge'
      },
      {
        question: "Illustration / simulation: unverified historical or measurement claim removed",
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'radar',
        givesQuestId: 'quest_purugu_crown'
      }
    ]
  },

  // --- PURUGU / LANGTANG GLACIER DETACHMENT CROWN (5,366m, EAST-NORTHEAST) ---
  {
    id: 'npc_dawa_glacier',
    mapId: 'overworld',
    tx: 46,
    ty: 11,
    dir: 'right',
    palette: 'sherpa',
    name: 'Dawa Sherpa',
    role: 'High-Altitude Cryosphere Guide (5,366m)',
    questIdToGive: 'quest_purugu_crown',
    greeting:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    voiceMood: 'radar',
    topics: [
      {
        question: '📷 Show NASA Landsat-9 Before & After Satellite Photos!',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'warning',
        opensPhotosStationId: 'purugu_glacier'
      },
      {
        question: 'What did NISAR L-Band measure right here on Aug 19?',
        answer:
          "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'eureka'
      },
      {
        question: '🚁 Fly back to DHM–NISAR Kendra to view this in 3D!',
        answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        voiceMood: 'welcome',
        opensFastTravel: true
      }
    ]
  }
];
