// Authentic 2D Cultural Overworlds, Regional Scientific Observatories & Local Community Halls
// for all 5 Global NISAR Hotspots!
// Region 1 (Rasuwa, Nepal) uses the flagship 58x86 Himalayan Confluence world from worldMapData.ts.
// Regions 2..5 (Pantanal/Amazon Brazil, San Joaquin California, Hatay/Anatolia Türkiye, Yukon–Kuskokwim Yup'ik Alaska)
// each feature authentic real-life biome terrain textures, organic landforms, traditional architecture,
// enterable Regional NISAR Labs (with Giant 2D/3D Supercomputer!), enterable Cultural Community Halls,
// and visible post-intervention infrastructure recovery!

import {
  buildAllMaps as buildRasuwaMaps,
  BuiltMap,
  DOOR_WARPS as RASUWA_DOOR_WARPS,
  DoorWarp,
  FAST_TRAVEL_POINTS as RASUWA_FAST_TRAVEL,
  FastTravelPoint,
  FLOOD_IMPACT_ZONES as RASUWA_IMPACT_ZONES,
  FloodImpactZone,
  GAME_NPCS as RASUWA_NPCS,
  GameNpc,
  MapId,
  OVERWORLD_ZONES as RASUWA_ZONES,
  WorldProp,
  ZoneBannerDef
} from './worldMapData';
import { GlobalRegionId } from '../services/nasaEarthDataService';

export interface RegionalWorldBundle {
  regionId: GlobalRegionId;
  maps: Record<MapId, BuiltMap>;
  doorWarps: DoorWarp[];
  fastTravelPoints: FastTravelPoint[];
  zones: ZoneBannerDef[];
  impactZones: FloodImpactZone[];
  npcs: GameNpc[];
  spawnOverworld: { tx: number; ty: number };
  spawnLab: { tx: number; ty: number };
  openingBanner: { title: string; nepali: string; sub: string };
  labBanner: { title: string; nepali: string; sub: string };
  openingRadio: { speaker: string; role: string; text: string };
}

function addProp(props: WorldProp[], solid: boolean[][], p: WorldProp) {
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

function carveOrganicTrail(
  tiles: string[][],
  solid: boolean[][],
  points: Array<[number, number]>,
  walkableTile: string,
  bridgeTile: string,
  waterSet: Set<string>,
  halfWidth = 0
) {
  const H = tiles.length;
  const W = tiles[0].length;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2 + 1;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const cx = Math.round(x0 + (x1 - x0) * t);
      const cy = Math.round(y0 + (y1 - y0) * t);
      for (let dy = -halfWidth; dy <= halfWidth; dy++) {
        for (let dx = -halfWidth; dx <= halfWidth; dx++) {
          const x = cx + dx;
          const y = cy + dy;
          if (x > 2 && x < W - 3 && y > 2 && y < H - 3) {
            const cur = tiles[y][x];
            tiles[y][x] = waterSet.has(cur) ? bridgeTile : walkableTile;
            solid[y][x] = false;
          }
        }
      }
    }
  }
}

function buildSharedRegionalLabInterior(
  labTitle: string,
  shelf1Text: string,
  shelf2Text: string,
  seismoText: string,
  reliefText: string
): BuiltMap {
  const W = 18;
  const H = 12;
  const tiles: string[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) =>
      y === 0
        ? 'lab_wall_top'
        : y === 1
          ? 'lab_wall_bottom'
          : (x + y) % 2 === 0
            ? 'lab_floor_shadow'
            : 'lab_floor'
    )
  );
  const solid: boolean[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => y <= 1 || x === 0 || x === W - 1 || y === H - 1)
  );
  const props: WorldProp[] = [];

  tiles[11][8] = 'lab_mat';
  tiles[11][9] = 'lab_mat';
  solid[11][8] = false;
  solid[11][9] = false;

  addProp(props, solid, {
    id: 'lab_giant_computer',
    kind: 'giant_supercomputer',
    tx: 2,
    ty: 1,
    wTiles: 8,
    hTiles: 3,
    solidRowsFromBottom: 2,
    opensComputer: true,
    interactText: `BOOTING ${labTitle} 2D/3D SUPERCOMPUTER...`
  });

  addProp(props, solid, {
    id: 'lab_wall_posters',
    kind: 'lab_wall_chart',
    tx: 10,
    ty: 0,
    wTiles: 3,
    hTiles: 2,
    solidRowsFromBottom: 0
  });

  addProp(props, solid, {
    id: 'shelf_13',
    kind: 'lab_bookshelf',
    tx: 13,
    ty: 1,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 2,
    interactText: shelf1Text
  });

  addProp(props, solid, {
    id: 'shelf_15',
    kind: 'lab_bookshelf',
    tx: 15,
    ty: 1,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 2,
    interactText: shelf2Text
  });

  addProp(props, solid, {
    id: 'lab_seismograph_rack',
    kind: 'lab_seismograph',
    tx: 1,
    ty: 4,
    wTiles: 2,
    hTiles: 3,
    solidRowsFromBottom: 2,
    interactText: seismoText
  });

  addProp(props, solid, {
    id: 'lab_photo_board',
    kind: 'photo_evidence_stand',
    tx: 1,
    ty: 7,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1,
    opensPhotosStationId: 'all'
  });

  addProp(props, solid, {
    id: 'lab_3d_relief_model',
    kind: 'lab_relief_table',
    tx: 11,
    ty: 5,
    wTiles: 5,
    hTiles: 3,
    solidRowsFromBottom: 2,
    opensIntervention: true,
    interactText: reliefText
  });

  addProp(props, solid, {
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

  return { id: 'nisar_lab_interior', width: W, height: H, tiles, solid, props };
}

function buildCulturalHallInterior(
  regionId: Exclude<GlobalRegionId, 'rasuwa_nepal'>
): BuiltMap {
  const W = 14;
  const H = 10;
  const floorTile =
    regionId === 'hatay_turkiye'
      ? 'limestone_paving'
      : regionId === 'pantanal_brazil' || regionId === 'yukon_alaska'
        ? 'boardwalk'
        : 'house_floor';

  const tiles: string[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      if (y === 0) return 'house_wall_top';
      if (y === 1) return 'house_wall_bottom';
      if (y >= 4 && y <= 6 && x >= 5 && x <= 8) return 'kilim_carpet';
      return floorTile;
    })
  );
  const solid: boolean[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => y <= 1 || x === 0 || x === W - 1 || y === H - 1)
  );
  tiles[9][6] = 'lab_mat';
  tiles[9][7] = 'lab_mat';
  solid[9][6] = false;
  solid[9][7] = false;

  const props: WorldProp[] = [];
  const hearthKind = regionId === 'hatay_turkiye' ? 'samovar_hearth' : 'agenu_hearth';
  const hearthText =
    regionId === 'pantanal_brazil'
      ? '🍲 RIBEIRINHO MANIOC HEARTH & HAMMOCK PORCH: Floodplain families read river rise on stilt posts—pairing local wisdom with NISAR sub-canopy flood maps!'
      : regionId === 'san_joaquin_usa'
        ? '💧 COOPERATIVA CAMPESINA WELL LOGBOOK: Tracks community domestic well depths alongside USGS piezometers & NASA GRACE-FO!'
        : regionId === 'hatay_turkiye'
          ? '🫖 ANTAKYA BRASS SEMAVER & TULIP GLASSES: Neighbours gather over hot Turkish tea to coordinate AFAD civil-engineer building safety checks!'
          : '🔥 YUP’IK QASGIQ ELDERS HEARTH: Elders share generational sea-ice & permafrost freeze-up observations with NASA ABoVE & NISAR scientists!';

  addProp(props, solid, {
    id: 'cultural_hearth',
    kind: hearthKind,
    tx: 2,
    ty: 3,
    wTiles: 3,
    hTiles: 2,
    solidRowsFromBottom: 2,
    interactText: hearthText
  });

  addProp(props, solid, {
    id: 'cultural_counter',
    kind: 'tea_counter',
    tx: 10,
    ty: 2,
    wTiles: 2,
    hTiles: 4,
    solidRowsFromBottom: 4,
    interactText: '📜 COMMUNITY ADAPTATION BOARD: Press [I] or click ⚡ Field Action anytime to test community solutions!'
  });

  addProp(props, solid, {
    id: 'cultural_photo_stand',
    kind: 'photo_evidence_stand',
    tx: 2,
    ty: 6,
    wTiles: 2,
    hTiles: 2,
    solidRowsFromBottom: 1,
    opensPhotosStationId: 'all'
  });

  return { id: 'timure_house_interior', width: W, height: H, tiles, solid, props };
}

// ============================================================================
// REGION 2 BUILDER: PANTANAL & SOUTHERN AMAZON, BRAZIL (46 x 46)
// Authentic Mato Grosso Floodplain: Meandering Corixo Oxbow Channels,
// Flooded Gallery Marsh, Laterite Cordilheira Ridges & Sub-Canopy Peat Pockets
// ============================================================================
function buildPantanalBrazilBundle(interventionDeployed: boolean): RegionalWorldBundle {
  const W = 46;
  const H = 46;
  const waterSet = new Set(['corixo_water', 'water']);

  const tiles: string[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      // Meandering Cuiabá–Paraguai River & Oxbow Lagoon (Baía)
      const mainRiverX = 16 + Math.sin(y * 0.16) * 3.2 + Math.cos(y * 0.07) * 1.4;
      const distMain = Math.abs(x - mainRiverX);
      const oxbowDist = Math.hypot((x - 11) * 0.9, (y - 25) * 1.15);
      if (distMain <= 1.35 || (oxbowDist >= 3.0 && oxbowDist <= 4.3 && x < 15)) {
        return 'corixo_water';
      }
      // Seasonal flooded marshland & Mauritia palm baías
      if (distMain <= 3.3 || (x <= 18 && y >= 18 && y <= 37)) {
        return 'wetland_marsh';
      }
      // NW Corixo Peatland Channel (partially re-wetted when check-dams deployed!)
      const peatDist = Math.hypot((x - 9.5) / 6.2, (y - 12.5) / 5.5);
      if (peatDist <= 1.0) {
        return interventionDeployed && peatDist < 0.55 ? 'wetland_marsh' : 'peat_soil';
      }
      // NE Selective Understory Logging Frontier beneath canopy
      const logDist = Math.hypot((x - 34.5) / 6.8, (y - 11.5) / 5.2);
      if (logDist <= 1.0) {
        return 'peat_soil';
      }
      // Natural tropical gallery forest floor (cordilheira)
      return 'tropical_forest_floor';
    })
  );

  const solid: boolean[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      if (x <= 1 || x >= W - 2 || y <= 1 || y >= H - 2) return true;
      return waterSet.has(tiles[y][x]);
    })
  );

  // Organic Pantanal laterite cordilheira trails & raised hardwood boardwalk bridges over corixos!
  carveOrganicTrail(
    tiles,
    solid,
    [
      [10, 34],
      [18, 34],
      [25, 34],
      [34, 34]
    ],
    'boardwalk',
    'boardwalk',
    waterSet,
    0
  );
  carveOrganicTrail(
    tiles,
    solid,
    [
      [25, 39],
      [25, 33],
      [24, 24],
      [26, 17],
      [31, 14]
    ],
    'laterite_path',
    'boardwalk',
    waterSet,
    0
  );
  carveOrganicTrail(
    tiles,
    solid,
    [
      [26, 17],
      [19, 15],
      [14, 14],
      [10, 14]
    ],
    'boardwalk',
    'boardwalk',
    waterSet,
    0
  );
  carveOrganicTrail(
    tiles,
    solid,
    [
      [10, 14],
      [9, 22],
      [11, 30],
      [11, 34]
    ],
    'boardwalk',
    'boardwalk',
    waterSet,
    0
  );
  // Ensure plaza around Palafita & Estação Lab is clear walkable laterite/boardwalk
  for (let y = 33; y <= 40; y++) {
    for (let x = 20; x <= 31; x++) {
      if (!waterSet.has(tiles[y][x])) {
        tiles[y][x] = y <= 35 ? 'laterite_path' : 'boardwalk';
        solid[y][x] = false;
      }
    }
  }

  const props: WorldProp[] = [];
  // Gallery forest border & golden Ipê-Amarelo canopy clusters
  for (let x = 2; x < W - 2; x += 4) {
    addProp(props, solid, { id: `br_top_${x}`, kind: x % 8 === 0 ? 'ipe_amarelo_tree' : 'pine_tree', tx: x, ty: 1, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1 });
    addProp(props, solid, { id: `br_bot_${x}`, kind: 'ipe_amarelo_tree', tx: x, ty: H - 4, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1 });
  }
  for (const [ix, iy] of [[20, 25], [33, 25], [39, 21], [21, 18], [28, 7], [40, 8], [38, 16], [4, 6]]) {
    addProp(props, solid, { id: `ipe_${ix}_${iy}`, kind: 'ipe_amarelo_tree', tx: ix, ty: iy, wTiles: 2, hTiles: 3, solidRowsFromBottom: 1 });
  }

  // Enterable Estação INPE–NISAR Pantanal Lab (tx = 26, ty = 28, door at tx = 29, ty = 32)
  addProp(props, solid, {
    id: 'br_inpe_lab',
    kind: 'inpe_nisar_estacao',
    tx: 26,
    ty: 28,
    wTiles: 7,
    hTiles: 5,
    solidRowsFromBottom: 3
  });
  solid[32][29] = false;

  // Enterable Casa Palafita Ribeirinha (tx = 19, ty = 35, door at tx = 21, ty = 39)
  addProp(props, solid, {
    id: 'br_palafita_1',
    kind: 'palafita_house',
    tx: 19,
    ty: 35,
    wTiles: 5,
    hTiles: 5,
    solidRowsFromBottom: 2
  });
  solid[39][21] = false;

  // Second Palafita Stilt House + Dugout Wooden Canoes
  addProp(props, solid, { id: 'br_palafita_2', kind: 'palafita_house', tx: 4, ty: 26, wTiles: 5, hTiles: 5, solidRowsFromBottom: 2 });
  addProp(props, solid, { id: 'br_canoe_1', kind: 'wooden_canoe', tx: 14, ty: 32, wTiles: 3, hTiles: 1, solidRowsFromBottom: 1, interactText: '🛶 RIBEIRINHO WOODEN CANOA: Essential river transport stranded when sub-canopy wetland channels drain early!' });
  addProp(props, solid, { id: 'br_canoe_2', kind: 'wooden_canoe', tx: 15, ty: 20, wTiles: 3, hTiles: 1, solidRowsFromBottom: 1 });

  // Hidden Change Scars + NISAR Radar Beacons
  addProp(props, solid, { id: 'br_logging_scar', kind: 'peat_drainage_scar', tx: 34, ty: 9, wTiles: 4, hTiles: 3, solidRowsFromBottom: 1, opensPhotosStationId: 'br_logging_front' });
  addProp(props, solid, { id: 'br_peat_scar', kind: 'peat_drainage_scar', tx: 5, ty: 10, wTiles: 4, hTiles: 3, solidRowsFromBottom: 1, opensPhotosStationId: 'br_peat_channel' });

  addProp(props, solid, { id: 'beacon_br_vila', kind: 'radar_beacon', tx: 23, ty: 32, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'br_palafita_vila' });
  addProp(props, solid, { id: 'beacon_br_peat', kind: 'radar_beacon', tx: 11, ty: 11, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'br_peat_channel' });
  addProp(props, solid, { id: 'beacon_br_log', kind: 'radar_beacon', tx: 31, ty: 11, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'br_logging_front' });

  if (interventionDeployed) {
    addProp(props, solid, {
      id: 'br_deployed_dam_1',
      kind: 'timber_check_dam',
      tx: 12,
      ty: 16,
      wTiles: 3,
      hTiles: 2,
      solidRowsFromBottom: 1,
      interactText:
        "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
    });
    addProp(props, solid, {
      id: 'br_deployed_dam_2',
      kind: 'timber_check_dam',
      tx: 6,
      ty: 16,
      wTiles: 3,
      hTiles: 2,
      solidRowsFromBottom: 1,
      interactText:
        "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
    });
  }

  const labMap = buildSharedRegionalLabInterior(
    'ESTAÇÃO INPE–NISAR PANTANAL',
    '📚 L-BAND HV BIOMASS ARCHIVE: 24 cm L-band penetrates green upper leaves to scatter off branches—catching selective logging that optical NDVI misses! (Requires NASA GEDI lidar to resolve dense-forest saturation.)',
    '📚 L-BAND HH DOUBLE-BOUNCE LOGS: Standing water beneath gallery trees creates a +6.5 dB trunk-water corner reflection—revealing wetland & peat drainage beneath full canopy!',
    '📈 NASA POWER & PIEZOMETER TELEMETRY: Tracks root-zone wetness (GWETROOT) & rainfall to separate rain-wet leaf brightness from true peatland water-table collapse.',
    '🌳 CLICK / SPACE — INTERACTIVE PANTANAL INTERVENTION TABLE: Dispatch Indigenous/IBAMA boat patrols & place timber peat check-dams!'
  );
  const hallMap = buildCulturalHallInterior('pantanal_brazil');

  return {
    regionId: 'pantanal_brazil',
    maps: { overworld: { id: 'overworld', width: W, height: H, tiles, solid, props }, nisar_lab_interior: labMap, timure_house_interior: hallMap },
    doorWarps: [
      { fromMap: 'overworld', tx: 29, ty: 32, toMap: 'nisar_lab_interior', destTx: 8, destTy: 9, destDir: 'up', label: 'Entering Estação INPE–NISAR Pantanal...' },
      { fromMap: 'nisar_lab_interior', tx: 8, ty: 11, toMap: 'overworld', destTx: 29, destTy: 34, destDir: 'down', label: 'Stepping onto Pantanal Cordilheira Trail...' },
      { fromMap: 'nisar_lab_interior', tx: 9, ty: 11, toMap: 'overworld', destTx: 29, destTy: 34, destDir: 'down', label: 'Stepping onto Pantanal Cordilheira Trail...' },
      { fromMap: 'overworld', tx: 21, ty: 39, toMap: 'timure_house_interior', destTx: 6, destTy: 8, destDir: 'up', label: 'Climbing into Casa Palafita Ribeirinha...' },
      { fromMap: 'timure_house_interior', tx: 6, ty: 9, toMap: 'overworld', destTx: 21, destTy: 40, destDir: 'down', label: 'Descending Palafita Wooden Ladder...' },
      { fromMap: 'timure_house_interior', tx: 7, ty: 9, toMap: 'overworld', destTx: 21, destTy: 40, destDir: 'down', label: 'Descending Palafita Wooden Ladder...' }
    ],
    fastTravelPoints: [
      { id: 'ft_br_vila', name: 'Vila Palafita & Estação INPE', nepaliName: 'Comunidade Ribeirinha (118m)', sub: 'Stilt Houses, Canoas & Regional Lab', mapId: 'overworld', tx: 25, ty: 34, dir: 'up', stationId: 'br_palafita_vila' },
      { id: 'ft_br_lab', name: 'Inside Estação INPE–NISAR Lab', nepaliName: 'Supercomputador 2D/3D', sub: 'Dra. Camila & Canopy-Wetland Mainframe', mapId: 'nisar_lab_interior', tx: 8, ty: 8, dir: 'up', stationId: 'br_palafita_vila' },
      { id: 'ft_br_peat', name: 'Corixo Drained Peat Channel', nepaliName: 'Turfeira Seca Sub-Dossel', sub: 'HH Double-Bounce Drop & Indigenous Patrol', mapId: 'overworld', tx: 10, ty: 14, dir: 'up', stationId: 'br_peat_channel' },
      { id: 'ft_br_log', name: 'NE Sub-Canopy Logging Scar', nepaliName: 'Extração Seletiva Oculta', sub: 'Optical Green vs. L-Band HV Drop', mapId: 'overworld', tx: 31, ty: 14, dir: 'up', stationId: 'br_logging_front' }
    ],
    zones: [
      { xMin: 18, xMax: 38, yMin: 26, yMax: 44, title: 'VILA PALAFITA & ESTAÇÃO INPE', nepaliTitle: 'Comunidade Ribeirinha • Pantanal (118m)', subtitle: 'Wooden Palafita Stilt Houses, Dugout Canoas & L-Band Radar Lab' },
      { xMin: 2, xMax: 17, yMin: 4, yMax: 22, title: 'CORIXO DRAINED PEAT CHANNEL', nepaliTitle: 'Canal de Turfeira Sub-Dossel', subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
      { xMin: 26, xMax: 44, yMin: 4, yMax: 20, title: 'SUB-CANOPY LOGGING FRONTIER', nepaliTitle: 'Degradação Florestal Oculta', subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." }
    ],
    impactZones: [
      { id: 'iz_br_log', stationId: 'br_logging_front', title: 'Sub-Canopy Selective Logging Frontier', nepaliTitle: 'Mato Grosso • Amazônia Meridional', xMin: 29, xMax: 39, yMin: 8, yMax: 16, caption: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.", previewImageUrl: '/incident_photos/brazil_mato_grosso_nasa.jpg' },
      { id: 'iz_br_peat', stationId: 'br_peat_channel', title: 'Drained Sub-Canopy Peatland Channel', nepaliTitle: 'Pantanal • Perda de Água Sub-Dossel', xMin: 5, xMax: 15, yMin: 8, yMax: 16, caption: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.", previewImageUrl: '/incident_photos/brazil_pantanal_floodplain.jpg' }
    ],
    npcs: [
      {
        id: 'npc_br_camila',
        mapId: 'nisar_lab_interior',
        tx: 6,
        ty: 5,
        dir: 'down',
        palette: 'br_scientist',
        name: 'Dra. Camila Oliveira',
        role: 'INPE–IBAMA–NISAR Forest & Wetland Scientist',
        questIdToGive: 'quest_br_hidden_logging',
        greeting: interventionDeployed
          ? 'Parabéns! Look outside on the corixo channels: your NISAR + GEDI patrol coordinates halted the understory loggers, and the community timber check-dams have restored standing water beneath the palms!'
          : 'Bem-vindo to Mato Grosso! Optical satellites say our gallery forest is 95% green—yet NISAR’s 24 cm L-band radar sees chainsaws hollowing the understory and wetlands drying beneath the palms!',
        voiceMood: interventionDeployed ? 'eureka' : 'radar',
        topics: [
          { question: '⚡ [ACTION MISSION] Dispatch Ranger Boats & Peat Check-Dams!', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'eureka', opensIntervention: true },
          { question: '🖥️ Boot the Estação 2D/3D Canopy-Wetland Supercomputer!', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'radar', opensComputer: true },
          { question: '⚠️ Why is SAR alone not enough in tropical forests?', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'warning' }
        ]
      },
      {
        id: 'npc_br_raoni',
        mapId: 'overworld',
        tx: 13,
        ty: 14,
        dir: 'down',
        palette: 'br_indigenous',
        name: 'Guardião Cauã',
        role: 'Indigenous Terena Forest & Peatland Guardian',
        questIdToGive: 'quest_br_peat_witness',
        greeting: interventionDeployed
          ? 'Look at the timber check-dams right below us! Clear rainwater is pooling back under the buriti palms, and the peat soil is cool and wet again!'
          : 'Look beneath these buriti palms: from an airplane the canopy looks emerald green, yet the standing floodwater vanished and the dark peat is cracking dry!',
        voiceMood: interventionDeployed ? 'eureka' : 'warning',
        topics: [
          { question: '📷 Show Real Pantanal Wetland & NASA Satellite Photos!', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'radar', opensPhotosStationId: 'br_peat_channel' },
          { question: '⚡ Help us place timber check-dams to re-wet the peat!', answer: "Fictional dialogue: Opening the Community Peatland & Ranger Dispatch Simulator!", voiceMood: 'eureka', opensIntervention: true }
        ]
      },
      {
        id: 'npc_br_tiago',
        mapId: 'overworld',
        tx: 30,
        ty: 15,
        dir: 'left',
        palette: 'br_ranger',
        name: 'Pantaneiro Tiago',
        role: 'IBAMA Field Boat Ranger',
        greeting: interventionDeployed
          ? 'Our river patrol boats intercepted the illegal logging barge before they could clear-cut the Ipê ridge—your L-band HV + GEDI coordinates were spot-on!'
          : 'Right behind me, illegal loggers took the biggest Ipê trunks while leaving upper vine crowns intact so optical cameras wouldn’t flag a clearing—NISAR L-band HV caught the -3.8 dB biomass drop!',
        voiceMood: interventionDeployed ? 'eureka' : 'warning',
        topics: [
          { question: '📷 Inspect NASA Terra ASTER Forest Frontier Photo!', answer: "Fictional dialogue: See how intact-looking canopy borders degraded plots in Mato Grosso!", voiceMood: 'radar', opensPhotosStationId: 'br_logging_front' }
        ]
      },
      {
        id: 'npc_br_iara',
        mapId: 'timure_house_interior',
        tx: 6,
        ty: 5,
        dir: 'down',
        palette: 'br_ribeirinha',
        name: 'Dona Iara',
        role: 'Ribeirinha Fisherwoman & Palafita Host',
        greeting: interventionDeployed
          ? 'Obrigada, friend! With the check-dams holding water in the upper corixos, our spawning lagoons stayed wet and zero peat smoke reached our Palafita porch!'
          : 'Welcome up into our Casa Palafita! For generations we built on tall hardwood stilts calibrated to the Pantanal flood waltz. When upstream peat dries, underground smoke fills our river.',
        voiceMood: interventionDeployed ? 'welcome' : 'somber',
        topics: [
          { question: '📷 Show Real Photo of Traditional Palafita Stilt Homes!', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'welcome', opensPhotosStationId: 'br_palafita_vila' },
          { question: '⚡ Launch Community Peat Re-Wetting Action!', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'eureka', opensIntervention: true }
        ]
      }
    ],
    spawnOverworld: { tx: 25, ty: 35 },
    spawnLab: { tx: 8, ty: 8 },
    openingBanner: { title: 'VILA PALAFITA • PANTANAL', nepali: 'Mato Grosso, Brasil (17.72°S, 57.38°W)', sub: 'Hidden Sub-Canopy Forest Degradation & Wetland Peat Loss' },
    labBanner: { title: 'ESTAÇÃO INPE–NISAR PANTANAL', nepali: 'Laboratório de Radar Florestal e Áreas Úmidas', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
    openingRadio: {
      speaker: '📻 INPE–IBAMA Field Radio — Dra. Camila Oliveira',
      role: 'Pantanal & Southern Amazon • Hidden Canopy Crisis',
      text: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred."
    }
  };
}

// ============================================================================
// REGION 3 BUILDER: SAN JOAQUIN CENTRAL VALLEY, CALIFORNIA (46 x 46)
// Authentic Tulare / Corcoran Basin: Sun-Baked Valley Alluvial Loam,
// Diablo Foothill Scrub, Irrigated Almond & Alfalfa Parcels & Concrete Aqueduct
// ============================================================================
function buildSanJoaquinUsaBundle(interventionDeployed: boolean): RegionalWorldBundle {
  const W = 46;
  const H = 46;
  const waterSet = new Set(['aqueduct_water', 'water']);

  const tiles: string[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      // Diagonal-sweeping California Concrete Aqueduct along Western Alluvial Fan!
      const canalCenter = 9.5 + (y - 4) * 0.08;
      const dc = Math.abs(x - canalCenter);
      if (dc <= 0.85) return 'aqueduct_water';
      if (dc <= 1.85) return 'concrete_canal';

      // Western Coast Range / Kettleman Arid Foothills
      if (x < canalCenter - 2.2) return 'arid_scrub';

      // NE Drip-Irrigated Almond Orchard Blocks (Corcoran Subsidence Bowl)
      if (x >= 25 && x <= 41 && y >= 6 && y <= 23) return 'orchard_soil';

      // Irrigated Emerald Alfalfa Rotation Parcels
      if (
        (x >= 15 && x <= 22 && y >= 8 && y <= 18) ||
        (x >= 35 && x <= 42 && y >= 31 && y <= 41)
      ) {
        return 'alfalfa_crop';
      }

      // Authentic Central Valley Golden Alluvial Loam
      return 'valley_loam';
    })
  );

  const solid: boolean[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      if (x <= 1 || x >= W - 2 || y <= 1 || y >= H - 2) return true;
      return waterSet.has(tiles[y][x]);
    })
  );

  // Graded County Farm Roads & Concrete Aqueduct Overpass Bridges
  carveOrganicTrail(
    tiles,
    solid,
    [
      [5, 34],
      [16, 34],
      [25, 34],
      [35, 34]
    ],
    'path',
    'bridge_wood',
    waterSet,
    0
  );
  carveOrganicTrail(
    tiles,
    solid,
    [
      [6, 20],
      [15, 20],
      [24, 20],
      [26, 15]
    ],
    'path',
    'bridge_wood',
    waterSet,
    0
  );
  carveOrganicTrail(
    tiles,
    solid,
    [
      [24, 39],
      [24, 27],
      [24, 20],
      [25, 14]
    ],
    'path',
    'bridge_wood',
    waterSet,
    0
  );
  for (let y = 33; y <= 40; y++) {
    for (let x = 18; x <= 30; x++) {
      if (!waterSet.has(tiles[y][x])) {
        tiles[y][x] = 'path';
        solid[y][x] = false;
      }
    }
  }

  const props: WorldProp[] = [];
  // Blooming California Almond Orchard Rows
  for (const oy of [7, 12, 17]) {
    for (const ox of [28, 33, 38]) {
      addProp(props, solid, { id: `alm_${ox}_${oy}`, kind: 'almond_tree', tx: ox, ty: oy, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1 });
    }
  }
  // Steel water silos
  addProp(props, solid, { id: 'ca_silo_1', kind: 'steel_water_silo', tx: 16, ty: 26, wTiles: 3, hTiles: 4, solidRowsFromBottom: 2, interactText: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." });
  addProp(props, solid, { id: 'ca_silo_2', kind: 'steel_water_silo', tx: 40, ty: 25, wTiles: 3, hTiles: 4, solidRowsFromBottom: 2 });

  // Enterable USGS–SGMA Hydro-Observatory (tx = 26, ty = 28, door tx = 29, ty = 32)
  addProp(props, solid, { id: 'ca_usgs_lab', kind: 'usgs_hydro_lab', tx: 26, ty: 28, wTiles: 7, hTiles: 5, solidRowsFromBottom: 3 });
  solid[32][29] = false;

  // Enterable Cooperativa Campesina Hall with Papel Picado (tx = 17, ty = 35, door tx = 19, ty = 38)
  addProp(props, solid, { id: 'ca_coop_hall', kind: 'campesino_coop_hall', tx: 17, ty: 35, wTiles: 6, hTiles: 4, solidRowsFromBottom: 2 });
  solid[38][19] = false;

  // Iconic 1925–2026 USGS Subsidence Benchmark Pole + Authentic Concrete Aqueduct Buckle Scar!
  addProp(props, solid, { id: 'ca_pole_prop', kind: 'subsidence_pole', tx: 30, ty: 10, wTiles: 3, hTiles: 4, solidRowsFromBottom: 1, opensPhotosStationId: 'ca_corcoran_bowl' });
  addProp(props, solid, { id: 'ca_canal_scar', kind: 'aqueduct_buckle_scar', tx: 13, ty: 16, wTiles: 3, hTiles: 3, solidRowsFromBottom: 1, opensPhotosStationId: 'ca_aqueduct_levee' });

  addProp(props, solid, { id: 'beacon_ca_town', kind: 'radar_beacon', tx: 22, ty: 32, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'ca_hydro_station' });
  addProp(props, solid, { id: 'beacon_ca_bowl', kind: 'radar_beacon', tx: 26, ty: 11, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'ca_corcoran_bowl' });
  addProp(props, solid, { id: 'beacon_ca_canal', kind: 'radar_beacon', tx: 14, ty: 21, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'ca_aqueduct_levee' });

  if (interventionDeployed) {
    addProp(props, solid, {
      id: 'ca_deployed_mar_1',
      kind: 'mar_recharge_basin',
      tx: 17,
      ty: 21,
      wTiles: 4,
      hTiles: 3,
      solidRowsFromBottom: 2,
      interactText:
        "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
    });
    addProp(props, solid, {
      id: 'ca_deployed_mar_2',
      kind: 'mar_recharge_basin',
      tx: 34,
      ty: 21,
      wTiles: 4,
      hTiles: 3,
      solidRowsFromBottom: 2,
      interactText:
        "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
    });
  }

  const labMap = buildSharedRegionalLabInterior(
    'USGS–SGMA VALLEY HYDRO-OBSERVATORY',
    '📚 NISAR L-BAND InSAR ARCHIVE: 24 cm L-band maintains phase coherence across growing almond & alfalfa rows where 5.6 cm C-band turns to static—mapping -28 cm/yr subsidence!',
    '📚 NASA GRACE-FO + SMAP FUSION: InSAR sees surface sinking; GRACE-FO gravity twins measure total regional groundwater mass loss in gigatons!',
    '📈 USGS BOREHOLE EXTENSOMETER: Distinguishes elastic winter rebound from irreversible inelastic compaction of the Corcoran Clay aquitard!',
    '💧 CLICK / SPACE — SGMA DRIP & AQUIFER RECHARGE SIMULATOR: Convert flood blocks to drip irrigation & route Managed Aquifer Recharge!'
  );
  const hallMap = buildCulturalHallInterior('san_joaquin_usa');

  return {
    regionId: 'san_joaquin_usa',
    maps: { overworld: { id: 'overworld', width: W, height: H, tiles, solid, props }, nisar_lab_interior: labMap, timure_house_interior: hallMap },
    doorWarps: [
      { fromMap: 'overworld', tx: 29, ty: 32, toMap: 'nisar_lab_interior', destTx: 8, destTy: 9, destDir: 'up', label: 'Entering USGS–SGMA Valley Hydro-Observatory...' },
      { fromMap: 'nisar_lab_interior', tx: 8, ty: 11, toMap: 'overworld', destTx: 29, destTy: 34, destDir: 'down', label: 'Returning to San Joaquin Valley...' },
      { fromMap: 'nisar_lab_interior', tx: 9, ty: 11, toMap: 'overworld', destTx: 29, destTy: 34, destDir: 'down', label: 'Returning to San Joaquin Valley...' },
      { fromMap: 'overworld', tx: 19, ty: 38, toMap: 'timure_house_interior', destTx: 6, destTy: 8, destDir: 'up', label: 'Entering Cooperativa Campesina Water Hall...' },
      { fromMap: 'timure_house_interior', tx: 6, ty: 9, toMap: 'overworld', destTx: 19, destTy: 40, destDir: 'down', label: 'Stepping out to Central Valley Plaza...' },
      { fromMap: 'timure_house_interior', tx: 7, ty: 9, toMap: 'overworld', destTx: 19, destTy: 40, destDir: 'down', label: 'Stepping out to Central Valley Plaza...' }
    ],
    fastTravelPoints: [
      { id: 'ft_ca_town', name: 'Cooperativa & Hydro-Observatory', nepaliName: 'Comunidad del Valle (66m)', sub: 'Farmworker Water Hall & USGS Lab', mapId: 'overworld', tx: 24, ty: 34, dir: 'up', stationId: 'ca_hydro_station' },
      { id: 'ft_ca_lab', name: 'Inside USGS–SGMA Hydro-Lab', nepaliName: '2D/3D Subsidence Mainframe', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.", mapId: 'nisar_lab_interior', tx: 8, ty: 8, dir: 'up', stationId: 'ca_hydro_station' },
      { id: 'ft_ca_pole', name: '1925–2026 Subsidence Benchmark Pole', nepaliName: 'Corcoran Bowl (-28 cm/yr)', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.", mapId: 'overworld', tx: 25, ty: 14, dir: 'right', stationId: 'ca_corcoran_bowl' },
      { id: 'ft_ca_canal', name: 'California Aqueduct Sag & Levee', nepaliName: 'Acueducto de California', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.", mapId: 'overworld', tx: 15, ty: 20, dir: 'up', stationId: 'ca_aqueduct_levee' }
    ],
    zones: [
      { xMin: 16, xMax: 42, yMin: 26, yMax: 44, title: 'COOPERATIVA & HYDRO-OBSERVATORY', nepaliTitle: 'Valle de San Joaquín, California (66m)', subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
      { xMin: 23, xMax: 44, yMin: 4, yMax: 25, title: 'CORCORAN SUBSIDENCE BOWL', nepaliTitle: 'Cuenca de Hundimiento (-28 cm/año)', subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
      { xMin: 4, xMax: 22, yMin: 6, yMax: 25, title: 'CALIFORNIA AQUEDUCT & LEVEE', nepaliTitle: 'Acueducto y Dique Hundido', subtitle: 'Gravity Canal Liner Buckled by Deep Groundwater Drawdown' }
    ],
    impactZones: [
      { id: 'iz_ca_pole', stationId: 'ca_corcoran_bowl', title: 'USGS 9-Meter Land Subsidence Benchmark', nepaliTitle: 'San Joaquin Valley • Aquifer Compaction', xMin: 25, xMax: 35, yMin: 9, yMax: 16, caption: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.", previewImageUrl: '/incident_photos/california_subsidence_pole.jpg' },
      { id: 'iz_ca_canal', stationId: 'ca_aqueduct_levee', title: 'California Aqueduct Subsidence Trough', nepaliTitle: 'Concrete Conveyance Freeboard Loss', xMin: 8, xMax: 17, yMin: 15, yMax: 22, caption: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.", previewImageUrl: '/incident_photos/california_aqueduct_subsidence.jpg' }
    ],
    npcs: [
      {
        id: 'npc_ca_elena',
        mapId: 'nisar_lab_interior',
        tx: 6,
        ty: 5,
        dir: 'down',
        palette: 'ca_hydrologist',
        name: 'Dr. Elena Morales',
        role: 'USGS–SGMA–NISAR Aquifer Geodesist',
        questIdToGive: 'quest_ca_benchmark',
        greeting: interventionDeployed
          ? '¡Excelente! Step outside to see our new Managed Aquifer Recharge (MAR) percolation basins in action—NISAR’s latest 12-day pass confirms subsidence slowed below 1.8 cm/yr!'
          : '¡Bienvenidos to the San Joaquin Valley! Look outside: the valley loam and orchards look completely flat in optical photos, yet NISAR L-band InSAR reveals the basin sinking 28 centimeters a year beneath our boots!',
        voiceMood: interventionDeployed ? 'eureka' : 'radar',
        topics: [
          { question: '⚡ [ACTION MISSION] Launch Drip Conversion & Aquifer Recharge (MAR)!', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'eureka', opensIntervention: true },
          { question: '🖥️ Boot the 2D/3D Subsidence Bowl Supercomputer!', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'radar', opensComputer: true },
          { question: '⚠️ Why do we pair NISAR with NASA GRACE-FO & Boreholes?', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'warning' }
        ]
      },
      {
        id: 'npc_ca_mateo',
        mapId: 'overworld',
        tx: 26,
        ty: 15,
        dir: 'up',
        palette: 'ca_campesino',
        name: 'Don Mateo',
        role: 'Central Valley Irrigation Mayordomo',
        questIdToGive: 'quest_ca_campesino_wells',
        greeting: interventionDeployed
          ? '¡Mil gracias! Converting our almond blocks to precision micro-drip cut deep pumping by 38%, and the new MAR basins are refilling the aquifer right below us!'
          : 'Buenas tardes! Look way up to the top sign on that wooden USGS pole—in 1925 the soil of this valley stood 28 feet above my sombrero! You can’t see the ground sinking until canals crack.',
        voiceMood: interventionDeployed ? 'eureka' : 'warning',
        topics: [
          { question: '📷 Show USGS Subsidence Pole & California Aqueduct Photos!', answer: "Fictional dialogue: Opening the real USGS San Joaquin subsidence archive and California Aqueduct aerial photographs!", voiceMood: 'radar', opensPhotosStationId: 'ca_corcoran_bowl' },
          { question: '⚡ Convert flood blocks to precision drip & winter recharge!', answer: "Fictional dialogue: Let’s balance crop harvests with sustainable groundwater recharge!", voiceMood: 'eureka', opensIntervention: true }
        ]
      },
      {
        id: 'npc_ca_rosa',
        mapId: 'timure_house_interior',
        tx: 6,
        ty: 5,
        dir: 'down',
        palette: 'ca_waterboard',
        name: 'Doña Rosa',
        role: 'Cooperativa Campesina Water Board Chair',
        greeting: interventionDeployed
          ? '¡Qué alegría! Since you established the 2 km pumping setback and winter MAR recharge basins, water pressure in our community’s 60-meter drinking wells rose 4 meters!'
          : 'Welcome inside our Cooperativa Hall! When industrial turbines pump 400-meter aquifers nonstop in drought summers, our farmworker families’ 60-meter drinking wells run dry first.',
        voiceMood: interventionDeployed ? 'welcome' : 'somber',
        topics: [
          { question: '⚡ Establish a 2 km Community Well Buffer & MAR Basin!', answer: "Fictional dialogue: Opening the SGMA Community Water Action Simulator!", voiceMood: 'eureka', opensIntervention: true }
        ]
      }
    ],
    spawnOverworld: { tx: 24, ty: 35 },
    spawnLab: { tx: 8, ty: 8 },
    openingBanner: { title: 'VALLE DE SAN JOAQUÍN, CA', nepali: 'Tulare & Corcoran Aquifer Basin (36.10°N, 119.55°W)', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
    labBanner: { title: 'USGS–SGMA HYDRO-OBSERVATORY', nepali: 'NISAR + GRACE-FO + SMAP Geodesy Center', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
    openingRadio: {
      speaker: '📻 USGS–SGMA Radio — Dr. Elena Morales',
      role: 'San Joaquin Valley • Invisible Subsidence Crisis',
      text: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred."
    }
  };
}

// ============================================================================
// REGION 4 BUILDER: HATAY–PAZARCIK FAULT CORRIDOR, TÜRKIYE (46 x 46)
// Authentic Anatolian / Amik Rift Geography: Reddish Terra Rossa Soil,
// Terraced Olive Hills, Amanos Limestone Ridges, Asi River & Havuş Courtyards
// ============================================================================
function buildHatayTurkiyeBundle(interventionDeployed: boolean): RegionalWorldBundle {
  const W = 46;
  const H = 46;
  const waterSet = new Set(['asi_water', 'water']);

  const tiles: string[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      // Upstream Earthen Dam Reservoir in NW (x = 6..15, y = 4..11)
      const resDist = Math.hypot((x - 10.5) / 4.8, (y - 7.5) / 3.6);
      if (resDist <= 1.0 && y <= 11) return 'asi_water';

      // Meandering Asi (Orontes) River flowing South from the Dam!
      const riverX = 9.5 + Math.sin(y * 0.15) * 1.8;
      if (y >= 11 && Math.abs(x - riverX) <= 1.1) return 'asi_water';

      // Amanos & Habib-i Neccar Limestone Crags on High Margins
      if ((x <= 5 && y <= 16) || (x >= 39 && y <= 10)) return 'limestone_ridge';

      // Historic Antakya Carved Cream-Limestone Courtyard Streets
      if (x >= 16 && x <= 35 && y >= 29 && y <= 40) return 'limestone_paving';

      // Terraced Olive Hills in NE Fault Zone
      if (x >= 23 && x <= 42 && y >= 5 && y <= 22) return 'olive_terrace';

      // Authentic Mediterranean Reddish-Ochre Terra Rossa Soil
      return 'terra_rossa';
    })
  );

  const solid: boolean[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      if (x <= 1 || x >= W - 2 || y <= 1 || y >= H - 2) return true;
      return waterSet.has(tiles[y][x]) || tiles[y][x] === 'limestone_ridge';
    })
  );

  // Winding Anatolian Stone Roads & Asi River Bridges
  carveOrganicTrail(
    tiles,
    solid,
    [
      [6, 34],
      [16, 34],
      [25, 34],
      [34, 34]
    ],
    'limestone_paving',
    'bridge_wood',
    waterSet,
    0
  );
  carveOrganicTrail(
    tiles,
    solid,
    [
      [24, 33],
      [24, 24],
      [25, 18],
      [26, 15]
    ],
    'path',
    'bridge_wood',
    waterSet,
    0
  );
  carveOrganicTrail(
    tiles,
    solid,
    [
      [25, 18],
      [18, 17],
      [14, 17],
      [6, 17]
    ],
    'path',
    'bridge_wood',
    waterSet,
    0
  );

  const props: WorldProp[] = [];
  // Displaced Ancient Olive Grove Rows (Northern row shifted 2 tiles West across the 4.5m left-lateral fault!)
  for (const ox of [27, 32, 37]) {
    addProp(props, solid, { id: `ol_n_${ox}`, kind: 'olive_tree', tx: ox - 2, ty: 8, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1 });
    addProp(props, solid, { id: `ol_s_${ox}`, kind: 'olive_tree', tx: ox, ty: 15, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1 });
  }
  // Mediterranean Cypress Trees framing Antakya & the Valley Road
  for (const [cx, cy] of [[15, 25], [35, 24], [40, 35], [20, 22]]) {
    addProp(props, solid, { id: `cyp_${cx}_${cy}`, kind: 'cypress_tree', tx: cx, ty: cy, wTiles: 2, hTiles: 3, solidRowsFromBottom: 1 });
  }

  // Co-seismic Left-Lateral Fault Rupture Scar
  addProp(props, solid, { id: 'tr_fault_scar', kind: 'fault_rupture_scar', tx: 29, ty: 11, wTiles: 5, hTiles: 3, solidRowsFromBottom: 1, opensPhotosStationId: 'tr_fault_olive' });

  // Upstream Earthen Reservoir Dam (tx = 6, ty = 11)
  addProp(props, solid, { id: 'tr_dam_prop', kind: 'hydro_dam', tx: 6, ty: 11, wTiles: 6, hTiles: 4, solidRowsFromBottom: 2, interactText: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." });

  // Historic Antakya Courtyard Stone Houses + Enterable Kandilli Lab & Çay Evi Tea House
  addProp(props, solid, { id: 'tr_house_1', kind: 'antakya_courtyard_house', tx: 35, ty: 30, wTiles: 5, hTiles: 4, solidRowsFromBottom: 2 });
  addProp(props, solid, { id: 'tr_kandilli_lab', kind: 'kandilli_nisar_lab', tx: 26, ty: 28, wTiles: 7, hTiles: 5, solidRowsFromBottom: 3 });
  solid[32][29] = false;

  addProp(props, solid, { id: 'tr_cay_evi', kind: 'cay_evi_teahouse', tx: 17, ty: 35, wTiles: 5, hTiles: 4, solidRowsFromBottom: 2 });
  solid[38][19] = false;

  addProp(props, solid, { id: 'beacon_tr_town', kind: 'radar_beacon', tx: 22, ty: 32, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'tr_antakya_havus' });
  addProp(props, solid, { id: 'beacon_tr_fault', kind: 'radar_beacon', tx: 26, ty: 12, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'tr_fault_olive' });
  addProp(props, solid, { id: 'beacon_tr_dam', kind: 'radar_beacon', tx: 13, ty: 13, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'tr_dam_crest' });

  if (interventionDeployed) {
    addProp(props, solid, {
      id: 'tr_deployed_triage',
      kind: 'seismic_retrofit_station',
      tx: 18,
      ty: 30,
      wTiles: 3,
      hTiles: 3,
      solidRowsFromBottom: 1,
      interactText:
        '⛺ DEPLOYED AFAD STRUCTURAL INSPECTION & GNSS COMMAND POST: Guided by OPERA Δγ coherence maps, certified human civil engineers inspect interior columns block-by-block!'
    });
    addProp(props, solid, {
      id: 'tr_deployed_dam_gnss',
      kind: 'seismic_retrofit_station',
      tx: 16,
      ty: 12,
      wTiles: 3,
      hTiles: 3,
      solidRowsFromBottom: 1,
      interactText:
        "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
    });
  }

  const labMap = buildSharedRegionalLabInterior(
    'AFAD–KANDİLLİ TECTONIC OBSERVATORY',
    '📚 CO-SEISMIC L-BAND InSAR: Maps 4.5 m strike-slip crustal deformation across rural olive hills where shorter radar wavelengths lose phase coherence! (Note: Deformation NEVER predicts earthquake timing!)',
    '📚 JPL OPERA COHERENCE PROXY (Δγ): Flags rubble decorrelation under night/winter storm clouds—ALWAYS followed by certified human structural engineers before re-entry!',
    '📈 BROADBAND SEISMOMETER & REAL-TIME GNSS: Resolves near-fault multi-meter jumps where tight InSAR fringes alias.',
    '🚨 CLICK / SPACE — POST-QUAKE TRIAGE & DAM DRAWDOWN TABLE: Route AFAD structural engineers & relieve earthen dam pressure!'
  );
  const hallMap = buildCulturalHallInterior('hatay_turkiye');

  return {
    regionId: 'hatay_turkiye',
    maps: { overworld: { id: 'overworld', width: W, height: H, tiles, solid, props }, nisar_lab_interior: labMap, timure_house_interior: hallMap },
    doorWarps: [
      { fromMap: 'overworld', tx: 29, ty: 32, toMap: 'nisar_lab_interior', destTx: 8, destTy: 9, destDir: 'up', label: 'Entering AFAD–Kandilli Tectonic Observatory...' },
      { fromMap: 'nisar_lab_interior', tx: 8, ty: 11, toMap: 'overworld', destTx: 29, destTy: 34, destDir: 'down', label: 'Stepping onto Antakya Limestone Courtyard...' },
      { fromMap: 'nisar_lab_interior', tx: 9, ty: 11, toMap: 'overworld', destTx: 29, destTy: 34, destDir: 'down', label: 'Stepping onto Antakya Limestone Courtyard...' },
      { fromMap: 'overworld', tx: 19, ty: 38, toMap: 'timure_house_interior', destTx: 6, destTy: 8, destDir: 'up', label: 'Entering Antakya Çay Evi (Tea House)...' },
      { fromMap: 'timure_house_interior', tx: 6, ty: 9, toMap: 'overworld', destTx: 19, destTy: 40, destDir: 'down', label: 'Returning to Antakya Street...' },
      { fromMap: 'timure_house_interior', tx: 7, ty: 9, toMap: 'overworld', destTx: 19, destTy: 40, destDir: 'down', label: 'Returning to Antakya Street...' }
    ],
    fastTravelPoints: [
      { id: 'ft_tr_town', name: 'Antakya Courtyard & Kandilli Lab', nepaliName: 'Tarihi Taş Mahalle (618m)', sub: 'Havuş Stone Homes, Çay Evi & Observatory', mapId: 'overworld', tx: 24, ty: 34, dir: 'up', stationId: 'tr_antakya_havus' },
      { id: 'ft_tr_lab', name: 'Inside AFAD–Kandilli Observatory', nepaliName: '2D/3D InSAR & OPERA Mainframe', sub: 'Prof. Leyla Kaya & Fault Interferogram', mapId: 'nisar_lab_interior', tx: 8, ty: 8, dir: 'up', stationId: 'tr_antakya_havus' },
      { id: 'ft_tr_fault', name: 'Split Olive Grove Fault Scarp', nepaliName: '4.5m Sol Yanal Fay Kırığı', sub: 'Displaced Olive Rows & Real Hatay Archive', mapId: 'overworld', tx: 26, ty: 16, dir: 'up', stationId: 'tr_fault_olive' },
      { id: 'ft_tr_dam', name: 'Strained Earthen Irrigation Dam', nepaliName: 'Baraj Gövdesi (-11 cm Slump)', sub: 'Post-Quake Embankment Settlement Check', mapId: 'overworld', tx: 14, ty: 17, dir: 'up', stationId: 'tr_dam_crest' }
    ],
    zones: [
      { xMin: 16, xMax: 42, yMin: 26, yMax: 44, title: 'ANTAKYA COURTYARD QUARTER', nepaliTitle: 'Hatay • Tarihi Taş Evler ve Çay Evi', subtitle: 'Carved Limestone Havuş Homes, AFAD Triage & Kandilli Lab' },
      { xMin: 24, xMax: 44, yMin: 4, yMax: 22, title: 'PAZARCIK SPLIT OLIVE GROVE', nepaliTitle: 'Doğu Anadolu Fayı (4.5 m Offset)', subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
      { xMin: 4, xMax: 23, yMin: 4, yMax: 22, title: 'EARTHEN RESERVOIR DAM CREST', nepaliTitle: 'Toprak Dolgu Baraj (-11.2 cm)', subtitle: 'Cloud-Penetrating Post-Seismic Dam Settlement Monitoring' }
    ],
    impactZones: [
      { id: 'iz_tr_fault', stationId: 'tr_fault_olive', title: "Illustrative surface-change investigation", nepaliTitle: 'Hatay–Pazarcık Co-Seismic Slip', xMin: 25, xMax: 36, yMin: 10, yMax: 17, caption: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.", previewImageUrl: '/incident_photos/turkiye_hatay_quake_fault.jpg' }
    ],
    npcs: [
      {
        id: 'npc_tr_leyla',
        mapId: 'nisar_lab_interior',
        tx: 6,
        ty: 5,
        dir: 'down',
        palette: 'tr_geodesist',
        name: 'Prof. Dr. Leyla Kaya',
        role: 'Kandilli–AFAD–NISAR Tectonicist',
        questIdToGive: 'quest_tr_olive_fault',
        greeting: interventionDeployed
          ? 'Çok teşekkürler! Your OPERA coherence triage & 6-meter reservoir drawdown saved 18 critical hours under storm clouds, and AFAD civil engineers are now safely inspecting every courtyard home!'
          : 'Merhaba! When earthquakes strike at 4 AM in winter storms, optical satellites are blind. NISAR L-band maps fault strain and OPERA Coherence Change guides rescue—while we strictly teach what radar CANNOT see alone!',
        voiceMood: interventionDeployed ? 'eureka' : 'radar',
        topics: [
          { question: '⚡ [ACTION MISSION] Coordinate AFAD Triage & Dam Drawdown!', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'eureka', opensIntervention: true },
          { question: '🖥️ Boot the 2D/3D Fault Interferogram Supercomputer!', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'radar', opensComputer: true },
          { question: '⚠️ Can InSAR predict earthquakes or certify building interiors?', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'warning' }
        ]
      },
      {
        id: 'npc_tr_kerem',
        mapId: 'overworld',
        tx: 25,
        ty: 16,
        dir: 'up',
        palette: 'tr_elder',
        name: 'Kerem Amca',
        role: 'Antakya Olive Grower',
        questIdToGive: 'quest_tr_cay_evi',
        greeting: interventionDeployed
          ? 'Sağ olasın! Using your L-band fault-splay map, municipal engineers routed our new welded steel water pipeline safely around the active shear zone!'
          : 'Hoş geldiniz! Look at my grandfather’s olive terraces on this red terra rossa hillside: overnight the fault shifted the northern row 4.5 meters west!',
        voiceMood: interventionDeployed ? 'eureka' : 'warning',
        topics: [
          { question: '📷 Show Real Hatay Fault & Antakya Courtyard Photos!', answer: "Fictional dialogue: Opening real archive photographs from Hatay and historic Antakya stone streets!", voiceMood: 'radar', opensPhotosStationId: 'tr_fault_olive' }
        ]
      },
      {
        id: 'npc_tr_zeynep',
        mapId: 'timure_house_interior',
        tx: 6,
        ty: 5,
        dir: 'down',
        palette: 'tr_weaver',
        name: 'Zeynep Teyze',
        role: 'Antakya Çay Evi Host',
        greeting: interventionDeployed
          ? 'Drink hot tea from our copper semaver! AFAD structural engineers inspected our street on day one thanks to your triage map, and lowering the upstream dam let every family sleep in peace!'
          : 'Have a warm glass of tea from our copper semaver! After the quake, roofs that looked whole from the sky still had sheared pillars downstairs—pairing satellite maps with AFAD engineers saved our neighbors.',
        voiceMood: interventionDeployed ? 'welcome' : 'somber',
        topics: [
          { question: '⚡ Help prioritize AFAD engineer dispatch & dam safety!', answer: "Fictional dialogue: Opening the Post-Earthquake Triage & Dam Drawdown Simulator!", voiceMood: 'eureka', opensIntervention: true }
        ]
      }
    ],
    spawnOverworld: { tx: 24, ty: 35 },
    spawnLab: { tx: 8, ty: 8 },
    openingBanner: { title: 'ANTAKYA • HATAY FAULT ZONE', nepali: 'Doğu Anadolu Fay Koridoru (37.29°N, 37.04°E)', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
    labBanner: { title: 'AFAD–KANDİLLİ OBSERVATORY', nepali: 'NISAR + OPERA + GNSS Sismotektonik Merkezi', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
    openingRadio: {
      speaker: '📻 AFAD–Kandilli Field Radio — Prof. Dr. Leyla Kaya',
      role: 'Hatay–Pazarcık Fault Corridor • Night/Cloud Seismic Response',
      text: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred."
    }
  };
}

// ============================================================================
// REGION 5 BUILDER: YUKON–KUSKOKWIM YUP'IK TUNDRA COAST, ALASKA (46 x 46)
// Authentic Sub-Arctic Bering Delta: Whitecap Bering Surf, Thawing Silt Bluff,
// Polygonal Russet Tundra with Ice-Wedge Ponds, Raised Boardwalks & Gravel Ridge
// ============================================================================
function buildYukonAlaskaBundle(interventionDeployed: boolean): RegionalWorldBundle {
  const W = 46;
  const H = 46;
  const waterSet = new Set(['bering_surf', 'permafrost_ice', 'water']);

  const tiles: string[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      // Bering Sea / Ninglick Eroding Coast along West
      const coastEdge = 8.2 + Math.sin(y * 0.19) * 1.6 + Math.cos(y * 0.08) * 0.9;
      if (x <= coastEdge) return 'bering_surf';
      // Scalloped Thawing Permafrost Silt Bluff Edge
      if (x <= coastEdge + 1.8) return 'coastal_mud';

      // Thawing thermokarst polygon ice-wedge ponds in West-Center
      if (
        (x >= 12 && x <= 17 && y >= 9 && y <= 14 && (x + y * 2) % 4 === 0) ||
        (x >= 11 && x <= 15 && y >= 21 && y <= 25 && (x * 3 + y) % 4 === 0)
      ) {
        return 'permafrost_ice';
      }

      // Stable Ice-Poor Eastern Upland Gravel Terrace (Mertarvik-style safe ground!)
      const ridgeDist = Math.hypot((x - 36.5) / 7.2, (y - 13.5) / 8.0);
      if (ridgeDist <= 1.0) return 'upland_gravel';

      return 'tundra_moss';
    })
  );

  const solid: boolean[][] = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      if (x <= 1 || x >= W - 2 || y <= 1 || y >= H - 2) return true;
      return waterSet.has(tiles[y][x]);
    })
  );

  // Authentic Raised Wooden Tundra Boardwalks (zero asphalt roads in Y-K Delta!)
  carveOrganicTrail(
    tiles,
    solid,
    [
      [11, 34],
      [20, 34],
      [29, 34],
      [38, 34]
    ],
    'boardwalk',
    'boardwalk',
    waterSet,
    0
  );
  carveOrganicTrail(
    tiles,
    solid,
    [
      [24, 39],
      [24, 26],
      [24, 16]
    ],
    'boardwalk',
    'boardwalk',
    waterSet,
    0
  );
  carveOrganicTrail(
    tiles,
    solid,
    [
      [13, 16],
      [24, 16],
      [35, 16]
    ],
    'boardwalk',
    'boardwalk',
    waterSet,
    0
  );
  for (let y = 33; y <= 40; y++) {
    for (let x = 19; x <= 30; x++) {
      if (!waterSet.has(tiles[y][x])) {
        tiles[y][x] = 'boardwalk';
        solid[y][x] = false;
      }
    }
  }

  const props: WorldProp[] = [];
  // Elevated Yup'ik Stilt Houses on Pilings + Traditional Cedar Salmon Smokehouse
  addProp(props, solid, { id: 'ak_house_1', kind: 'yupik_stilt_house', tx: 35, ty: 29, wTiles: 5, hTiles: 4, solidRowsFromBottom: 2 });
  addProp(props, solid, { id: 'ak_smokehouse', kind: 'salmon_smokehouse', tx: 13, ty: 29, wTiles: 4, hTiles: 3, solidRowsFromBottom: 2, interactText: '🐟 YUP’IK CEDAR SALMON SMOKEHOUSE: Subsistence King & Chum salmon dry on spruce poles—tilted when underground ice wedges thaw!' });

  // Enterable NASA ABoVE–NISAR Permafrost Observatory (tx = 26, ty = 28, door tx = 29, ty = 32)
  addProp(props, solid, { id: 'ak_above_lab', kind: 'above_arctic_lab', tx: 26, ty: 28, wTiles: 7, hTiles: 5, solidRowsFromBottom: 3 });
  solid[32][29] = false;

  // Enterable Qasgiq Elders & Community Hall (tx = 18, ty = 35, door tx = 20, ty = 38)
  addProp(props, solid, { id: 'ak_qasgiq_hall', kind: 'yupik_stilt_house', tx: 18, ty: 35, wTiles: 5, hTiles: 4, solidRowsFromBottom: 2 });
  solid[38][20] = false;

  // Western Permafrost Coastal Bluff Collapse Scar
  addProp(props, solid, { id: 'ak_thaw_scar', kind: 'thermokarst_scar', tx: 11, ty: 11, wTiles: 4, hTiles: 3, solidRowsFromBottom: 1, opensPhotosStationId: 'ak_bluff_erosion' });

  addProp(props, solid, { id: 'beacon_ak_village', kind: 'radar_beacon', tx: 21, ty: 31, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'ak_yupik_boardwalk' });
  addProp(props, solid, { id: 'beacon_ak_bluff', kind: 'radar_beacon', tx: 15, ty: 13, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'ak_bluff_erosion' });
  addProp(props, solid, { id: 'beacon_ak_ridge', kind: 'radar_beacon', tx: 34, ty: 12, wTiles: 2, hTiles: 2, solidRowsFromBottom: 1, beaconStationId: 'ak_stable_ridge' });

  if (interventionDeployed) {
    addProp(props, solid, {
      id: 'ak_deployed_thermo_1',
      kind: 'thermosyphon_array',
      tx: 18,
      ty: 30,
      wTiles: 2,
      hTiles: 3,
      solidRowsFromBottom: 1,
      interactText:
        "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
    });
    addProp(props, solid, {
      id: 'ak_deployed_ridge_home',
      kind: 'yupik_stilt_house',
      tx: 36,
      ty: 8,
      wTiles: 5,
      hTiles: 4,
      solidRowsFromBottom: 2,
      interactText:
        "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
    });
  }

  const labMap = buildSharedRegionalLabInterior(
    'ABoVE–NISAR PERMAFROST OBSERVATORY',
    '📚 SEASONAL THAW InSAR ("ACTIVE-LAYER BREATHING"): NISAR measures 3–9 cm summer thaw subsidence beneath intact tundra moss to pinpoint ice-rich ground before collapse!',
    '📚 ICESat-2 + BOREHOLE VALIDATION: Wet moss & snowmelt shift radar phase—so we fuse NASA ICESat-2 laser elevation + borehole thermistors + Yup’ik Elder wisdom!',
    '📈 PERMAFROST THERMISTOR STRING: Tracks ground temperature warming from -3.2°C toward the critical 0°C ice-wedge melting point.',
    '❄️ CLICK / SPACE — YUP’IK PERMAFROST & RELOCATION PLANNER: Deploy thermosyphon cooling pilings & route safe boardwalks onto the Eastern Gravel Ridge!'
  );
  const hallMap = buildCulturalHallInterior('yukon_alaska');

  return {
    regionId: 'yukon_alaska',
    maps: { overworld: { id: 'overworld', width: W, height: H, tiles, solid, props }, nisar_lab_interior: labMap, timure_house_interior: hallMap },
    doorWarps: [
      { fromMap: 'overworld', tx: 29, ty: 32, toMap: 'nisar_lab_interior', destTx: 8, destTy: 9, destDir: 'up', label: 'Entering ABoVE–NISAR Permafrost Observatory...' },
      { fromMap: 'nisar_lab_interior', tx: 8, ty: 11, toMap: 'overworld', destTx: 29, destTy: 34, destDir: 'down', label: 'Stepping onto Yup’ik Tundra Boardwalk...' },
      { fromMap: 'nisar_lab_interior', tx: 9, ty: 11, toMap: 'overworld', destTx: 29, destTy: 34, destDir: 'down', label: 'Stepping onto Yup’ik Tundra Boardwalk...' },
      { fromMap: 'overworld', tx: 20, ty: 38, toMap: 'timure_house_interior', destTx: 6, destTy: 8, destDir: 'up', label: 'Entering Qasgiq Elders & Community Hall...' },
      { fromMap: 'timure_house_interior', tx: 6, ty: 9, toMap: 'overworld', destTx: 20, destTy: 40, destDir: 'down', label: 'Returning to Village Boardwalk...' },
      { fromMap: 'timure_house_interior', tx: 7, ty: 9, toMap: 'overworld', destTx: 20, destTy: 40, destDir: 'down', label: 'Returning to Village Boardwalk...' }
    ],
    fastTravelPoints: [
      { id: 'ft_ak_village', name: 'Yup’ik Boardwalk & Smokehouse', nepaliName: 'Yup’ik Nuna Village (9m)', sub: 'Piling Homes, Salmon Rack & ABoVE Lab', mapId: 'overworld', tx: 24, ty: 34, dir: 'up', stationId: 'ak_yupik_boardwalk' },
      { id: 'ft_ak_lab', name: 'Inside ABoVE–NISAR Observatory', nepaliName: '2D/3D Permafrost Mainframe', sub: 'Dr. Panigkaq & Thaw-Strain Supercomputer', mapId: 'nisar_lab_interior', tx: 8, ty: 8, dir: 'up', stationId: 'ak_yupik_boardwalk' },
      { id: 'ft_ak_bluff', name: 'Western Thawing Permafrost Bluff', nepaliName: '15 m/yr Coastal Retreat', sub: 'Thermokarst Ice Wedge & USGS Photo', mapId: 'overworld', tx: 14, ty: 16, dir: 'up', stationId: 'ak_bluff_erosion' },
      { id: 'ft_ak_ridge', name: 'Eastern Stable Gravel Ridge', nepaliName: 'Mertarvik-Style Safe Ground', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.", mapId: 'overworld', tx: 34, ty: 16, dir: 'up', stationId: 'ak_stable_ridge' }
    ],
    zones: [
      { xMin: 14, xMax: 42, yMin: 26, yMax: 44, title: 'YUP’IK BOARDWALK VILLAGE', nepaliTitle: 'Yukon–Kuskokwim Delta, Alaska (9m)', subtitle: 'Piling Homes, Cedar Salmon Smokehouse, Qasgiq & ABoVE Lab' },
      { xMin: 8, xMax: 23, yMin: 6, yMax: 24, title: 'THAWING PERMAFROST BLUFF', nepaliTitle: 'Thermokarst Slump (-8.9 cm/summer)', subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
      { xMin: 28, xMax: 44, yMin: 6, yMax: 24, title: 'STABLE UPLAND GRAVEL RIDGE', nepaliTitle: 'Safe Community Relocation Terrace (26m)', subtitle: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." }
    ],
    impactZones: [
      { id: 'iz_ak_bluff', stationId: 'ak_bluff_erosion', title: "Illustrative surface-change investigation", nepaliTitle: 'Alaska Arctic Coast • Ice-Wedge Thaw', xMin: 10, xMax: 18, yMin: 10, yMax: 17, caption: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning.", previewImageUrl: '/incident_photos/alaska_permafrost_bluff.jpg' }
    ],
    npcs: [
      {
        id: 'npc_ak_panigkaq',
        mapId: 'nisar_lab_interior',
        tx: 6,
        ty: 5,
        dir: 'down',
        palette: 'ak_scientist',
        name: 'Dr. Panigkaq',
        role: 'Yup’ik–NASA ABoVE Permafrost Geodesist',
        questIdToGive: 'quest_ak_bluff',
        greeting: interventionDeployed
          ? 'Quyana! Step outside onto the boardwalk: passive thermosyphon pilings are keeping our village core frozen, and the first resilient home is already standing firm on the Eastern Gravel Ridge!'
          : 'Waqaa! Welcome to the Yukon–Kuskokwim Delta! Persistent Bering fog blinds optical cameras, and mossy tundra looks solid right above melting underground ice. NISAR L-band maps where ground is sinking—and where firm gravel stands strong!',
        voiceMood: interventionDeployed ? 'eureka' : 'radar',
        topics: [
          { question: '⚡ [ACTION MISSION] Plan Thermosyphon Pilings & Safe Ridge Relocation!', answer: "Fictional dialogue: Opening our Yup’ik Community Permafrost & Relocation Simulator!", voiceMood: 'eureka', opensIntervention: true },
          { question: '🖥️ Boot the 2D/3D Permafrost Strain Supercomputer!', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'radar', opensComputer: true },
          { question: '⚠️ Why pair SAR with ICESat-2, Boreholes & Yup’ik Elders?', answer: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.", voiceMood: 'warning' }
        ]
      },
      {
        id: 'npc_ak_wassillie',
        mapId: 'overworld',
        tx: 17,
        ty: 16,
        dir: 'left',
        palette: 'ak_hunter',
        name: 'Wassillie',
        role: 'Yup’ik Coastal Harvester & Boardwalk Builder',
        questIdToGive: 'quest_ak_elder',
        greeting: interventionDeployed
          ? 'Quyana! Your 12-day all-weather SAR shoreline map helped our Tribal Council unlock relocation funding, and the new boardwalk to the Eastern Gravel Ridge is rock-solid!'
          : 'Walk carefully on this west boardwalk! Beneath the russet moss, an ancient ice wedge melted 9 centimeters this summer, and October storm waves carved 45 feet off the bluff.',
        voiceMood: interventionDeployed ? 'eureka' : 'warning',
        topics: [
          { question: '📷 Show USGS Bluff Collapse & Mertarvik Yup’ik Relocation Photos!', answer: "Fictional dialogue: Opening real photos of Alaska permafrost bluff erosion and Mertarvik’s elevated resilient homes!", voiceMood: 'radar', opensPhotosStationId: 'ak_bluff_erosion' }
        ]
      },
      {
        id: 'npc_ak_elena_elder',
        mapId: 'timure_house_interior',
        tx: 6,
        ty: 5,
        dir: 'down',
        palette: 'ak_yupik_elder',
        name: 'Grandma Elena',
        role: 'Yup’ik Elder & Knowledge Bearer',
        greeting: interventionDeployed
          ? 'Quyana cakneq, grandchild! With passive thermosyphon pilings cooling our smokehouse and new homes rising on firm eastern gravel, our village’s future is anchored for generations!'
          : 'Come warm up inside our Qasgiq hall! Like our neighbors at Newtok who built Mertarvik on firm volcanic bluff ground, combining our Elders’ knowledge with NISAR strain maps keeps our grandchildren safe.',
        voiceMood: 'welcome',
        topics: [
          { question: '⚡ Help site new boardwalks & thermosyphons for our village!', answer: "Fictional dialogue: Opening the Community Permafrost Resilience Planner!", voiceMood: 'eureka', opensIntervention: true }
        ]
      }
    ],
    spawnOverworld: { tx: 24, ty: 35 },
    spawnLab: { tx: 8, ty: 8 },
    openingBanner: { title: 'YUP’IK NUNA • Y-K DELTA, AK', nepali: 'Yukon–Kuskokwim Permafrost Coast (61.20°N, 163.50°W)', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
    labBanner: { title: 'ABoVE–NISAR ARCTIC STATION', nepali: 'NISAR + ICESat-2 + Elder Co-Production Lab', sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning." },
    openingRadio: {
      speaker: '📻 ABoVE–NISAR Arctic Radio — Dr. Panigkaq',
      role: 'Yukon–Kuskokwim Yup’ik Coast • Permafrost & Bluff Watch',
      text: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred."
    }
  };
}

const bundleCache = new Map<string, RegionalWorldBundle>();

export function getRegionalWorldBundle(
  regionId: GlobalRegionId,
  interventionDeployed = false
): RegionalWorldBundle {
  const cacheKey = `${regionId}:${interventionDeployed ? 'post' : 'pre'}`;
  const hit = bundleCache.get(cacheKey);
  if (hit) return hit;

  let bundle: RegionalWorldBundle;
  if (regionId === 'rasuwa_nepal') {
    const enrichedRasuwaNpcs: GameNpc[] = RASUWA_NPCS.map((n) => {
      if (n.id === 'npc_rudra_lab') {
        return {
          ...n,
          greeting: interventionDeployed
            ? 'Dhanyabad, Researcher! Look outside in Syabrubesi and Timure: our automated DHM–NISAR Early-Warning Siren Masts are armed and linked to the 111 MW hydropower spillway gates—giving 4,850 residents +95 minutes of life-saving evacuation time!'
            : n.greeting,
          topics: [
            {
              question: '⚡ [ACTION MISSION] Calibrate Rasuwa Siren & 111 MW Dam Spillway!',
              answer:
                "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
              voiceMood: 'eureka',
              opensIntervention: true
            },
            ...n.topics
          ]
        };
      }
      if (n.id === 'npc_dolma' && interventionDeployed) {
        return {
          ...n,
          greeting:
            "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred."
        };
      }
      return n;
    });

    bundle = {
      regionId: 'rasuwa_nepal',
      maps: buildRasuwaMaps(interventionDeployed),
      doorWarps: RASUWA_DOOR_WARPS,
      fastTravelPoints: RASUWA_FAST_TRAVEL,
      zones: RASUWA_ZONES,
      impactZones: RASUWA_IMPACT_ZONES,
      npcs: enrichedRasuwaNpcs,
      spawnOverworld: { tx: 28.5, ty: 72.2 },
      spawnLab: { tx: 8.5, ty: 7.5 },
      openingBanner: {
        title: 'SYABRUBESI DOBHAN',
        nepali: 'स्याफ्रुबेसी दोभान (१,४३६ मि.)',
        sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
      },
      labBanner: {
        title: 'DHM–NISAR HIMALAYAN KENDRA',
        nepali: 'निसार वैज्ञानिक प्रयोगशाला',
        sub: "Illustrative field scene: schematic layout, fictional instruments and unverified local assets. No measured hazard, calibration or warning."
      },
      openingRadio: {
        speaker: '📻 DHM–NISAR Field Radio — Prof. Dr. Rudra ("Radar Bajey")',
        role: 'Syabrubesi Geomatics Kendra • Rasuwa Flagship Expedition',
        text: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred."
      }
    };
  } else if (regionId === 'pantanal_brazil') {
    bundle = buildPantanalBrazilBundle(interventionDeployed);
  } else if (regionId === 'san_joaquin_usa') {
    bundle = buildSanJoaquinUsaBundle(interventionDeployed);
  } else if (regionId === 'hatay_turkiye') {
    bundle = buildHatayTurkiyeBundle(interventionDeployed);
  } else {
    bundle = buildYukonAlaskaBundle(interventionDeployed);
  }

  bundleCache.set(cacheKey, bundle);
  return bundle;
}
