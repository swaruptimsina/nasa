// Multi-Biome Geomorphic & Cultural Expedition Pixel Art Engine
// 100% original procedural pixel art honoring real-world geology, hydrology, vegetation,
// regional architecture, field instruments, and cultural heritage across all 5 NASA–ISRO NISAR hotspots.

export type Direction = 'down' | 'up' | 'left' | 'right';

export type CharacterPaletteId =
  | 'player'
  | 'rudra'
  | 'coordinator'
  | 'pilot'
  | 'farmer'
  | 'tech'
  | 'elder'
  | 'driver'
  | 'engineer'
  | 'inspector'
  | 'sherpa'
  | 'scientist'
  | 'br_ranger'
  | 'br_indigenous'
  | 'br_ribeirinha'
  | 'br_scientist'
  | 'ca_campesino'
  | 'ca_hydrologist'
  | 'ca_waterboard'
  | 'tr_afad_engineer'
  | 'tr_elder'
  | 'tr_geodesist'
  | 'tr_weaver'
  | 'ak_yupik_elder'
  | 'ak_scientist'
  | 'ak_hunter';

interface NepaliCharStyle {
  headwear:
    | 'dhaka'
    | 'shyade_scarf'
    | 'army_beret'
    | 'hardhat'
    | 'sherpa_topa'
    | 'monk'
    | 'straw_hat'
    | 'feather_band'
    | 'fur_hood'
    | 'anatolian_cap'
    | 'headscarf_clean';
  topPrimary: string;
  topPattern: string;
  topAccent: string;
  hair: string;
  skin: string;
  skinShade: string;
  garment: string;
  garmentShade: string;
  collarOrSash: string;
  lower: string;
  shoe: string;
  hasPangden?: boolean; // Rainbow-striped Tamang/Sherpa woven apron
  hasDoko?: boolean;    // Hand-woven bamboo Doko basket on back
  hasGpsPack?: boolean; // Field SAR/GPS rover backpack
  isLabCoat?: boolean;  // Research white field coat
  hasMustache?: boolean;
  hasKuspukHem?: boolean; // Yup'ik Qaspeq patterned geometric hem
}

const NEPALI_STYLES: Record<CharacterPaletteId, NepaliCharStyle> = {
  // Aarav — Junior Nepali DHM-NISAR Geomatics Researcher (Palpali Dhaka Topi + Daura-Suruwal + Field Jacket + GPS Pack!)
  player: {
    headwear: 'dhaka',
    topPrimary: '#c82438',
    topPattern: '#28b8a8',
    topAccent: '#f8d038',
    hair: '#1c202c',
    skin: '#eeb484',
    skinShade: '#cc8c5c',
    garment: '#1c6c88',
    garmentShade: '#12485c',
    collarOrSash: '#f4ebd0',
    lower: '#3c4454',
    shoe: '#5c3824',
    hasGpsPack: true
  },
  // Prof. Dr. Rudra ("Radar Bajey") — Palpali Dhaka Topi, Tika, Mustache, Nepali Askot Waistcoat + DHM-NISAR Lab Coat
  rudra: {
    headwear: 'dhaka',
    topPrimary: '#242838',
    topPattern: '#d83438',
    topAccent: '#f4cc38',
    hair: '#dce4f0',
    skin: '#eab080',
    skinShade: '#c88c5c',
    garment: '#f8fafc',
    garmentShade: '#cbd5e1',
    collarOrSash: '#982434',
    lower: '#475569',
    shoe: '#28303c',
    isLabCoat: true,
    hasMustache: true
  },
  // Didi Sita — Syabrubesi Ward Disaster Relief Coordinator (Tamang Bakhu + Pangden Apron!)
  coordinator: {
    headwear: 'shyade_scarf',
    topPrimary: '#a82040',
    topPattern: '#f8cc38',
    topAccent: '#38bdf8',
    hair: '#241818',
    skin: '#f0b888',
    skinShade: '#d09060',
    garment: '#881c3c',
    garmentShade: '#5c1028',
    collarOrSash: '#38bdf8',
    lower: '#4c1428',
    shoe: '#301820',
    hasPangden: true
  },
  // Capt. Kanchha — Nepali Army / NDRRMA Mountain Search & Rescue Pilot
  pilot: {
    headwear: 'army_beret',
    topPrimary: '#245838',
    topPattern: '#f8d030',
    topAccent: '#f8d030',
    hair: '#20242c',
    skin: '#e8ac7c',
    skinShade: '#c48858',
    garment: '#2c6840',
    garmentShade: '#1c482c',
    collarOrSash: '#eab308',
    lower: '#243c2c',
    shoe: '#1c2024'
  },
  // Kaka Maila — Chilime Terrace Farmer (Dhaka Topi + Daura-Suruwal + Patuki Sash + Woven Bamboo Doko!)
  farmer: {
    headwear: 'dhaka',
    topPrimary: '#8c3028',
    topPattern: '#f0c848',
    topAccent: '#48a868',
    hair: '#28201c',
    skin: '#df9e6e',
    skinShade: '#b87848',
    garment: '#d8ccb4',
    garmentShade: '#b0a084',
    collarOrSash: '#b82834',
    lower: '#8c7c68',
    shoe: '#4c3420',
    hasDoko: true
  },
  // Pemba — DHM Hydrological & S-Band Telemetry Technician
  tech: {
    headwear: 'hardhat',
    topPrimary: '#0284c7',
    topPattern: '#bae6fd',
    topAccent: '#facc15',
    hair: '#202028',
    skin: '#eeb484',
    skinShade: '#cc8c5c',
    garment: '#2563eb',
    garmentShade: '#1d4ed8',
    collarOrSash: '#facc15',
    lower: '#1e293b',
    shoe: '#334155'
  },
  // Aama Dolma — Timure Tamang Tea-House Elder (Maroon Bakhu, Shyade Hat & Rainbow Pangden!)
  elder: {
    headwear: 'shyade_scarf',
    topPrimary: '#9c2848',
    topPattern: '#f4c848',
    topAccent: '#2dd4bf',
    hair: '#d4dce8',
    skin: '#e4a878',
    skinShade: '#c08454',
    garment: '#7c1d3c',
    garmentShade: '#541028',
    collarOrSash: '#facc15',
    lower: '#3c1020',
    shoe: '#2c1418',
    hasPangden: true
  },
  // Pasang — Kerung-Rasuwagadhi Container & EV Transport Driver
  driver: {
    headwear: 'dhaka',
    topPrimary: '#1e40af',
    topPattern: '#f87171',
    topAccent: '#fde047',
    hair: '#1e2028',
    skin: '#e8ac7c',
    skinShade: '#c48858',
    garment: '#475569',
    garmentShade: '#334155',
    collarOrSash: '#f97316',
    lower: '#1e293b',
    shoe: '#18181b'
  },
  // Er. Bikram — Nepal Electricity Authority (NEA) 111 MW Rasuwagadhi Chief Engineer
  engineer: {
    headwear: 'hardhat',
    topPrimary: '#eab308',
    topPattern: '#fef08a',
    topAccent: '#dc2626',
    hair: '#24242c',
    skin: '#eab080',
    skinShade: '#c88c5c',
    garment: '#ea580c',
    garmentShade: '#c2410c',
    collarOrSash: '#bef264',
    lower: '#1e3a5f',
    shoe: '#1e293b'
  },
  // Officer Ramesh — Rasuwa Customs & Border Post Inspector
  inspector: {
    headwear: 'army_beret',
    topPrimary: '#1e3a8a',
    topPattern: '#facc15',
    topAccent: '#ef4444',
    hair: '#181c28',
    skin: '#eab080',
    skinShade: '#c88c5c',
    garment: '#1d4ed8',
    garmentShade: '#1e3a8a',
    collarOrSash: '#fde047',
    lower: '#172554',
    shoe: '#0f172a'
  },
  // Dawa Sherpa — Langtang & Purugu High-Altitude Glaciology Guide
  sherpa: {
    headwear: 'sherpa_topa',
    topPrimary: '#9333ea',
    topPattern: '#f43f5e',
    topAccent: '#fde047',
    hair: '#1c1c24',
    skin: '#df9e6e',
    skinShade: '#b87848',
    garment: '#0d9488',
    garmentShade: '#0f766e',
    collarOrSash: '#f43f5e',
    lower: '#1e293b',
    shoe: '#451a03'
  },
  // Dr. Anjali — Nepali InSAR & Cryosphere Scientist inside DHM-NISAR Kendra
  scientist: {
    headwear: 'shyade_scarf',
    topPrimary: '#0284c7',
    topPattern: '#facc15',
    topAccent: '#f43f5e',
    hair: '#2c1c18',
    skin: '#f0b888',
    skinShade: '#d09060',
    garment: '#f8fafc',
    garmentShade: '#cbd5e1',
    collarOrSash: '#0284c7',
    lower: '#334155',
    shoe: '#1e293b',
    isLabCoat: true
  },
  // --- BRAZIL (PANTANAL & SOUTHERN AMAZON) AUTHENTIC CHARACTERS ---
  br_ranger: {
    headwear: 'straw_hat',
    topPrimary: '#e7c97e',
    topPattern: '#92400e',
    topAccent: '#dc2626',
    hair: '#241a14',
    skin: '#d2956a',
    skinShade: '#aa7048',
    garment: '#2e6f40',
    garmentShade: '#1b4728',
    collarOrSash: '#dc2626', // Traditional Pantaneiro red kerchief!
    lower: '#5c4028',
    shoe: '#3b2314',
    hasGpsPack: true
  },
  br_indigenous: {
    headwear: 'feather_band',
    topPrimary: '#dc2626',
    topPattern: '#0284c7',
    topAccent: '#facc15',
    hair: '#141418',
    skin: '#c48356',
    skinShade: '#9c623a',
    garment: '#b45309',
    garmentShade: '#78350f',
    collarOrSash: '#22d3ee',
    lower: '#451a03',
    shoe: '#291509'
  },
  br_ribeirinha: {
    headwear: 'headscarf_clean',
    topPrimary: '#f59e0b',
    topPattern: '#10b981',
    topAccent: '#ec4899',
    hair: '#1f1512',
    skin: '#c9885c',
    skinShade: '#a1663e',
    garment: '#0d9488',
    garmentShade: '#0f766e',
    collarOrSash: '#fde047',
    lower: '#b45309',
    shoe: '#451a03'
  },
  br_scientist: {
    headwear: 'straw_hat',
    topPrimary: '#dfd2ad',
    topPattern: '#15803d',
    topAccent: '#facc15',
    hair: '#2c1c14',
    skin: '#dca176',
    skinShade: '#b87c52',
    garment: '#f8fafc',
    garmentShade: '#cbd5e1',
    collarOrSash: '#16a34a',
    lower: '#334155',
    shoe: '#1e293b',
    isLabCoat: true
  },
  // --- CALIFORNIA (SAN JOAQUIN CENTRAL VALLEY) AUTHENTIC CHARACTERS ---
  ca_campesino: {
    headwear: 'straw_hat',
    topPrimary: '#f3d999',
    topPattern: '#b45309',
    topAccent: '#dc2626',
    hair: '#1c1917',
    skin: '#d4966a',
    skinShade: '#ad7248',
    garment: '#2563eb', // Classic denim work shirt + red bandana!
    garmentShade: '#1d4ed8',
    collarOrSash: '#dc2626',
    lower: '#1e3a8a',
    shoe: '#5c3824',
    hasMustache: true
  },
  ca_hydrologist: {
    headwear: 'hardhat',
    topPrimary: '#facc15',
    topPattern: '#ca8a04',
    topAccent: '#0284c7',
    hair: '#291d18',
    skin: '#e2a87e',
    skinShade: '#be8359',
    garment: '#f8fafc',
    garmentShade: '#cbd5e1',
    collarOrSash: '#ea580c',
    lower: '#334155',
    shoe: '#451a03',
    isLabCoat: true,
    hasGpsPack: true
  },
  ca_waterboard: {
    headwear: 'headscarf_clean',
    topPrimary: '#be123c',
    topPattern: '#fde047',
    topAccent: '#38bdf8',
    hair: '#1c1917',
    skin: '#d89b70',
    skinShade: '#b2764c',
    garment: '#c2410c',
    garmentShade: '#9a3412',
    collarOrSash: '#fde047',
    lower: '#1e293b',
    shoe: '#291509'
  },
  // --- TÜRKIYE (ANTAKYA–PAZARCIK ANATOLIAN CORRIDOR) AUTHENTIC CHARACTERS ---
  tr_afad_engineer: {
    headwear: 'hardhat',
    topPrimary: '#dc2626',
    topPattern: '#f8fafc',
    topAccent: '#facc15',
    hair: '#1e293b',
    skin: '#ecc09c',
    skinShade: '#c99974',
    garment: '#0f172a', // AFAD navy-and-red rescue jacket!
    garmentShade: '#1e293b',
    collarOrSash: '#ef4444',
    lower: '#334155',
    shoe: '#0f172a',
    hasGpsPack: true
  },
  tr_elder: {
    headwear: 'anatolian_cap',
    topPrimary: '#57534e',
    topPattern: '#78716c',
    topAccent: '#d6d3d1',
    hair: '#e2e8f0',
    skin: '#e8b994',
    skinShade: '#c4926c',
    garment: '#7f1d1d', // Traditional Anatolian burgundy Yelek vest over white shirt!
    garmentShade: '#450a0a',
    collarOrSash: '#f8fafc',
    lower: '#44403c',
    shoe: '#292524',
    hasMustache: true
  },
  tr_geodesist: {
    headwear: 'headscarf_clean',
    topPrimary: '#881337',
    topPattern: '#fda4af',
    topAccent: '#fbbf24',
    hair: '#1e1b18',
    skin: '#f1c6a4',
    skinShade: '#cfa07c',
    garment: '#f8fafc',
    garmentShade: '#cbd5e1',
    collarOrSash: '#be123c',
    lower: '#334155',
    shoe: '#1e293b',
    isLabCoat: true
  },
  tr_weaver: {
    headwear: 'headscarf_clean',
    topPrimary: '#f5f5f4',
    topPattern: '#eab308',
    topAccent: '#10b981',
    hair: '#292524',
    skin: '#eec29e',
    skinShade: '#ca9a74',
    garment: '#3f6212',
    garmentShade: '#365314',
    collarOrSash: '#fde047',
    lower: '#78350f',
    shoe: '#292524'
  },
  // --- ALASKA (YUKON–KUSKOKWIM YUP'IK TUNDRA COAST) AUTHENTIC CHARACTERS ---
  ak_yupik_elder: {
    headwear: 'fur_hood',
    topPrimary: '#d6c7b2', // Warm wolverine/wolf ruff trim
    topPattern: '#be123c',
    topAccent: '#38bdf8',
    hair: '#cbd5e1',
    skin: '#d99e74',
    skinShade: '#b47850',
    garment: '#be123c', // Berry-red Yup'ik Kuspuk (Qaspeq) with geometric border!
    garmentShade: '#881337',
    collarOrSash: '#38bdf8',
    lower: '#57534e',
    shoe: '#78350f', // Seal/caribou Mukluk boots
    hasKuspukHem: true
  },
  ak_scientist: {
    headwear: 'fur_hood',
    topPrimary: '#e2d6c5',
    topPattern: '#0284c7',
    topAccent: '#facc15',
    hair: '#1e293b',
    skin: '#e0a67c',
    skinShade: '#ba7e54',
    garment: '#0284c7',
    garmentShade: '#0369a1',
    collarOrSash: '#facc15',
    lower: '#1e293b',
    shoe: '#451a03',
    hasGpsPack: true,
    hasKuspukHem: true
  },
  ak_hunter: {
    headwear: 'fur_hood',
    topPrimary: '#c8b8a0',
    topPattern: '#15803d',
    topAccent: '#f97316',
    hair: '#18181b',
    skin: '#d69a70',
    skinShade: '#b0744c',
    garment: '#15803d',
    garmentShade: '#166534',
    collarOrSash: '#fde047',
    lower: '#3f3f46',
    shoe: '#451a03',
    hasKuspukHem: true
  }
};

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  return [c, ctx];
}

function px(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  col: string
) {
  ctx.fillStyle = col;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function drawPixelGrid(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  rows: string[],
  palette: Record<string, string>
) {
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === '.' || ch === ' ') continue;
      const col = palette[ch];
      if (col) {
        ctx.fillStyle = col;
        ctx.fillRect(ox + x, oy + y, 1, 1);
      }
    }
  }
}

// ============================================================================
// 100% ORIGINAL NEPALI HIMALAYAN CHARACTERS (16x22 px — Dhaka Topi, Bakhu, Doko!)
// ============================================================================
const charCache = new Map<string, HTMLCanvasElement>();

export function getCharacterSprite(
  paletteId: CharacterPaletteId,
  dir: Direction,
  frame: 0 | 1 | 2
): HTMLCanvasElement {
  const key = `${paletteId}_${dir}_${frame}`;
  const cached = charCache.get(key);
  if (cached) return cached;

  const [c, ctx] = makeCanvas(16, 22);
  const s = NEPALI_STYLES[paletteId];
  const OL = '#161922';
  const bob = frame === 0 ? 0 : 1;
  const lStep = frame === 1 ? -1 : 0;
  const rStep = frame === 2 ? -1 : 0;

  // Soft ground shadow
  px(ctx, 3, 19, 10, 2, 'rgba(12, 32, 20, 0.32)');

  // --- BACKPACK / WOVEN BAMBOO DOKO WHEN SEEN FROM BEHIND OR SIDE ---
  if (s.hasDoko && dir !== 'down') {
    // Authentic Nepali Trapezoidal Woven Bamboo Doko Basket!
    const dx = dir === 'left' ? 9 : dir === 'right' ? 1 : 3;
    const dw = dir === 'up' ? 10 : 6;
    px(ctx, dx, 8 - bob, dw, 8, '#4a3219');
    px(ctx, dx + 1, 9 - bob, dw - 2, 6, '#c89d54');
    for (let y = 9; y <= 14; y += 2) {
      px(ctx, dx + 1, y - bob, dw - 2, 1, '#9c7234');
    }
  }

  // --- BOOTS / SHOES ---
  px(ctx, 3, 17 + lStep, 4, 3, OL);
  px(ctx, 4, 17 + lStep, 2, 2, s.shoe);
  px(ctx, 9, 17 + rStep, 4, 3, OL);
  px(ctx, 10, 17 + rStep, 2, 2, s.shoe);

  const pal: Record<string, string> = {
    O: OL,
    A: s.topPrimary,
    B: s.topPattern,
    C: s.topAccent,
    H: s.hair,
    S: s.skin,
    s: s.skinShade,
    G: s.garment,
    g: s.garmentShade,
    T: s.collarOrSash,
    L: s.lower,
    W: '#f8fafc',
    R: '#dc2626', // Crimson Tika!
    r: '#ef4444',
    y: '#facc15',
    e: '#22c55e',
    c: '#38bdf8',
    M: '#cbd5e1',
    K: '#b48246'
  };

  // --- TORSO, NEPALI DAURA / BAKHU / PANGDEN / LAB COAT (y = 11..17) ---
  if (dir === 'down') {
    let bodyRows: string[];
    if (s.hasPangden) {
      // Traditional Tamang/Sherpa Bakhu + Rainbow-Striped Pangden Apron!
      bodyRows = [
        '..OOOOOOOOOOOO..',
        '.OGGGTTTTTTGGGO.',
        '.OSGGGGGGGGGGSO.',
        '.OSSGrrrrrrGSSO.',
        '..OOGyyyyyyGOO..',
        '..OOGeeeeeeGOO..',
        '...OOccccccOO...'
      ];
    } else if (s.hasKuspukHem) {
      // Authentic Alaska Native Yup'ik Kuspuk (Qaspeq) Parka with Geometric Hem Trim!
      bodyRows = [
        '..OOOOOOOOOOOO..',
        '.OGGGTTTTTTGGGO.',
        '.OSGGGGGGGGGGSO.',
        '.OSSGGGGGGGGSSO.',
        '..OOGccccccGOO..',
        '..OOGyyyyyyGOO..',
        '...OOLLLLLLOO...'
      ];
    } else if (s.isLabCoat) {
      // Open DHM-NISAR White Coat over Nepali Askot Waistcoat!
      bodyRows = [
        '..OOOOOOOOOOOO..',
        '.OGGGTTTTTTGGGO.',
        '.OSGGGTTTTGGGSO.',
        '.OSSGGGTTGGGSSO.',
        '..OOggGLLGggOO..',
        '...OOLLLLLLOO...'
      ];
    } else {
      // Nepali Daura crossover tunic / Himalayan jacket + Dhaka strap!
      bodyRows = [
        '..OOOOOOOOOOOO..',
        '.OGGGTTTTTTGGGO.',
        '.OSGGCTGGGGGGSO.',
        '.OSSGGGCTGGGSSO.',
        '..OOggTTTTggOO..',
        '...OOLLLLLLOO...'
      ];
    }
    drawPixelGrid(ctx, 0, 11 - bob, bodyRows, pal);
  } else if (dir === 'up') {
    const bodyRows = s.hasGpsPack
      ? [
          '...........c....',
          '..OOOOOOOOOMOO..',
          '.OGGMMMMMMMMGGO.',
          '.OSGMccccccMGSO.',
          '.OSSMMMMMMMMSSO.',
          '..OOggLLLLggOO..',
          '...OOLLLLLLOO...'
        ]
      : s.hasDoko
        ? [
            '..OOOOOOOOOOOO..',
            '.OGKKKKKKKKKKGO.',
            '.OSKBBBBBBBBKSO.',
            '.OSSKKKKKKKKSSO.',
            '..OOggLLLLggOO..',
            '...OOLLLLLLOO...'
          ]
        : [
            '..OOOOOOOOOOOO..',
            '.OGGGGGGGGGGGGO.',
            '.OSGGGGGGGGGGSO.',
            '.OSSggggggggSSO.',
            '..OOggLLLLggOO..',
            '...OOLLLLLLOO...'
          ];
    drawPixelGrid(ctx, 0, (s.hasGpsPack ? 10 : 11) - bob, bodyRows, pal);
  } else if (dir === 'left') {
    const bodyRows = [
      '...OOOOOOOOOO...',
      '..OGGGGGGGGGGO..',
      '..OGGGSSOGGGGO..',
      '..OGGGSSOggggO..',
      '...OOOLLLLLOO...',
      '....OOLLLLOO....'
    ];
    drawPixelGrid(ctx, 0, 11 - bob, bodyRows, pal);
  } else {
    const bodyRows = [
      '...OOOOOOOOOO...',
      '..OGGGGGGGGGGO..',
      '..OGGGGGOSSGGGO.',
      '..OggggOSSGGGGO.',
      '...OOLLLLLOOO...',
      '....OOLLLLOO....'
    ];
    drawPixelGrid(ctx, 0, 11 - bob, bodyRows, pal);
  }

  // --- DISTINCTIVE NEPALI HEAD & TRADITIONAL HEADWEAR (y = 0..11) ---
  if (dir === 'down') {
    let headRows: string[];
    if (s.headwear === 'dhaka') {
      // Asymmetric Peaked Nepali Palpali Dhaka Topi + Red Forehead Tika!
      headRows = [
        '.......OOOOO....',
        '....OOOAAACOO...',
        '...OAAABBBAAAO..',
        '..OAABBAAACCAAO.',
        '..OAAACCAABBBAAO',
        '.OHSSSSSSSSSSSHO',
        '.OHSSSSSRSSSSSHO',
        'OOsSSSOSSSOSSsOO',
        'OOsSSSOSSSOSSsOO',
        s.hasMustache ? '.OOsSSWWWWSSsOO.' : '.OOsSSSSSSSSsOO.',
        '..OOssssssssOO..',
        '...OOOOOOOOOO...'
      ];
    } else if (s.headwear === 'shyade_scarf') {
      // Tamang Shyade Brocade Crown / Headscarf + Earrings + Tika!
      headRows = [
        '....OOOOOOOO....',
        '..OOAAAAAAAHOO..',
        '.OAABBBBBBBBAAO.',
        '.OAAACCCCCCAAAO.',
        '.OHHSSSSSSSSSHHO',
        '.OHSSSSSRSSSSSHO',
        'OOCSSSOSSSOSSCOO',
        'OOsSSSOSSSOSSsOO',
        '.OOsSSSSSSSSsOO.',
        '..OOssssssssOO..',
        '...OOOOOOOOOO...'
      ];
    } else if (s.headwear === 'straw_hat') {
      // Wide-Brim Straw Chapéu Pantaneiro (Brazil) / Campesino Sun Sombrero (California)!
      headRows = [
        '....OOOOOOOO....',
        '...OAAAAAAAAO...',
        '..OAAABBBBAAAO..',
        'OOCCCCCCCCCCCCOO',
        'OAAAAAAAAAAAAAAO',
        '.OHSSSSSSSSSSSHO',
        'OOsSSSOSSSOSSsOO',
        'OOsSSSOSSSOSSsOO',
        s.hasMustache ? '.OOsSSWWWWSSsOO.' : '.OOsSSSSSSSSsOO.',
        '..OOssssssssOO..',
        '...OOOOOOOOOO...'
      ];
    } else if (s.headwear === 'feather_band') {
      // Indigenous Amazon/Pantanal Woven Headband with Macaw Feather Crest!
      headRows = [
        '.....OOCCOO.....',
        '....OABBBBBAO...',
        '...OAAACCAAAAO..',
        '..OHHHHHHHHHHHO.',
        '.OAAACCCCCCAAAO.',
        '.OHSSSSSSSSSSSHO',
        'OOsSSSOSSSOSSsOO',
        'OOsSSSOSSSOSSsOO',
        '.OOsSSSSSSSSsOO.',
        '..OOssssssssOO..',
        '...OOOOOOOOOO...'
      ];
    } else if (s.headwear === 'fur_hood') {
      // Yup'ik Kuspuk / Arctic Fur-Ruff Parka Hood Framing the Face!
      headRows = [
        '...OOOOOOOOOO...',
        '..OAAAAAAAAAAO..',
        '.OAABBBBBBBBAAO.',
        '.OAAASSSSSSAAAO.',
        'OOAASSSSSSSSSAOO',
        'OOAASSSOSSSOAAOO',
        'OOAASSSOSSSOAAOO',
        '.OAASSSSSSSSAAO.',
        '..OOAssssssAOO..',
        '...OOOOOOOOOO...'
      ];
    } else if (s.headwear === 'anatolian_cap') {
      // Traditional Anatolian Flat Wool Cap + Mustache!
      headRows = [
        '....OOOOOOOO....',
        '..OOAAAAAAAAOO..',
        '.OAAABBBBBBBAAO.',
        '.OCCCCCCCCCCCCO.',
        '.OHSSSSSSSSSSSHO',
        'OOsSSSOSSSOSSsOO',
        'OOsSSSOSSSOSSsOO',
        s.hasMustache ? '.OOsSSWWWWSSsOO.' : '.OOsSSSSSSSSsOO.',
        '..OOssssssssOO..',
        '...OOOOOOOOOO...'
      ];
    } else if (s.headwear === 'headscarf_clean') {
      // Traditional Patterned Headscarf (Anatolia / Ribeirinha / Cooperativa — no forehead tika)
      headRows = [
        '....OOOOOOOO....',
        '..OOAAAAAAAHOO..',
        '.OAABBBBBBBBAAO.',
        '.OAAACCCCCCAAAO.',
        '.OAAASSSSSSAAAO.',
        'OOAASSSOSSSOAAOO',
        'OOAASSSOSSSOAAOO',
        '.OAASSSSSSSSAAO.',
        '..OOssssssssOO..',
        '...OOOOOOOOOO...'
      ];
    } else if (s.headwear === 'sherpa_topa') {
      // Himalayan Ear-Flap Wool Topa Hat!
      headRows = [
        '....OOOOOOOO....',
        '..OOAAAAAAAAOO..',
        '.OAAABBBBBBBAAO.',
        '.OAAACCCCCCCAAO.',
        '.OAASSSSSSSSSAAO',
        '.OAASSSSRSSSSAAO',
        'OOASSSOSSSOSSAOO',
        'OOASSSOSSSOSSAOO',
        '.OOsSSSSSSSSsOO.',
        '..OOssssssssOO..',
        '...OOOOOOOOOO...'
      ];
    } else {
      // Army Rescue Beret / NEA Safety Hardhat
      headRows = [
        '....OOOOOOOO....',
        '..OOAAAAAAAHOO..',
        '.OAAAAACAAAAAHO.',
        '.OBBBBBBBBBBBBO.',
        '.OHSSSSSSSSSSSHO',
        '.OHSSSSSSSSSSSHO',
        'OOsSSSOSSSOSSsOO',
        'OOsSSSOSSSOSSsOO',
        '.OOsSSSSSSSSsOO.',
        '..OOssssssssOO..',
        '...OOOOOOOOOO...'
      ];
    }
    drawPixelGrid(ctx, 0, 0 - bob, headRows, pal);
  } else if (dir === 'up') {
    const headRows =
      s.headwear === 'dhaka'
        ? [
            '.......OOOOO....',
            '....OOOAAACOO...',
            '...OAAABBBAAAO..',
            '..OAABBAAACCAAO.',
            '..OAAACCAABBBAAO',
            '.OHHHHHHHHHHHHHO',
            'OOHHHHHHHHHHHHOO',
            'OOHHHHHHHHHHHHOO',
            '.OOsHHHHHHHHsOO.',
            '..OOOOOOOOOOOO..'
          ]
        : [
            '....OOOOOOOO....',
            '..OOAAAAAAAAOO..',
            '.OAAABBBBBBBAAO.',
            '.OAAACCCCCCCAAO.',
            '.OHHHHHHHHHHHHHO',
            'OOHHHHHHHHHHHHOO',
            'OOHHHHHHHHHHHHOO',
            '.OOHHHHHHHHHHOO.',
            '..OOOOOOOOOOOO..'
          ];
    drawPixelGrid(ctx, 0, 1 - bob, headRows, pal);
  } else if (dir === 'left') {
    const headRows = [
      '.....OOOOOOO....',
      '...OOAAACAAOO...',
      '..OAABBBAAAAAO..',
      '.OAAACCAAABBBAAO',
      '.OSSSSSHHHHHHHO.',
      '.OSSOSSSHHHHHHO.',
      '.OSSOSSsHHHHHO..',
      '..OSSSSsHHHHO...',
      '...OOssssOOO....',
      '....OOOOOO......'
    ];
    drawPixelGrid(ctx, 0, 1 - bob, headRows, pal);
  } else {
    const headRows = [
      '....OOOOOOO.....',
      '...OOAAACAAOO...',
      '..OAAAAABBBAAO..',
      '.OAABBBAAACCCAAO',
      '.OHHHHHHHSSSSSO.',
      '.OHHHHHHSSSOSSO.',
      '..OHHHHHsSSOSSO.',
      '...OHHHHsSSSSO..',
      '....OOOssssOO...',
      '......OOOOOO....'
    ];
    drawPixelGrid(ctx, 0, 1 - bob, headRows, pal);
  }

  charCache.set(key, c);
  return c;
}

// ============================================================================
// REAL-LIFE MULTI-BIOME GEOMORPHIC TERRAIN & INTERIOR TILES (SEAMLESS 64x64 MACRO-VARIATION)
// ============================================================================
const tileCache = new Map<string, HTMLCanvasElement>();

function microHash(x: number, y: number, seed: number): number {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041);
  n = (n ^ (n >>> 13)) >>> 0;
  n = Math.imul(n, 1274126177) >>> 0;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function paintSeamlessNaturalSoil(
  ctx: CanvasRenderingContext2D,
  vx: number,
  vy: number,
  seed: number,
  palette: [string, string, string, string],
  speckColor?: string
) {
  px(ctx, 0, 0, 16, 16, palette[1]);
  const ox = vx * 16;
  const oy = vy * 16;
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      // Smooth 2x2 clustered organic blotches + fine mineral grain
      const macro = microHash(Math.floor((ox + x) / 3), Math.floor((oy + y) / 3), seed);
      const fine = microHash(ox + x, oy + y, seed + 97);
      const v = macro * 0.68 + fine * 0.32;
      if (v < 0.24) {
        px(ctx, x, y, 1, 1, palette[0]);
      } else if (v > 0.78) {
        px(ctx, x, y, 1, 1, palette[3]);
      } else if (v > 0.56) {
        px(ctx, x, y, 1, 1, palette[2]);
      }
      if (speckColor && fine > 0.965) {
        px(ctx, x, y, 1, 1, speckColor);
      }
    }
  }
}

export function getTerrainTile(
  kind: string,
  animFrame = 0,
  tx = 0,
  ty = 0
): HTMLCanvasElement {
  const vx = ((tx % 4) + 4) % 4;
  const vy = ((ty % 4) + 4) % 4;
  const isAnimated =
    kind === 'water' ||
    kind === 'rapids' ||
    kind === 'wetland_marsh' ||
    kind === 'corixo_water' ||
    kind === 'aqueduct_water' ||
    kind === 'asi_water' ||
    kind === 'bering_surf' ||
    kind === 'flower' ||
    kind === 'tall_grass' ||
    kind === 'bridge_wood';
  const fKey = isAnimated ? animFrame % 4 : 0;
  const key = `${kind}_${fKey}_${vx}_${vy}`;
  const hit = tileCache.get(key);
  if (hit) return hit;

  const [c, ctx] = makeCanvas(16, 16);

  const paintHimalayanMeadow = () => {
    // Authentic Montane Himalayan Turf, Moss, Fern & Gneiss Grit (organic, non-grid!)
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      101,
      ['#365936', '#466e42', '#55804c', '#69945a'],
      '#8b9286'
    );
    // Occasional tiny white/gold alpine edelweiss or clover fleck
    const h = microHash(vx, vy, 313);
    if (h > 0.62) {
      const fx = Math.floor(h * 11) + 2;
      const fy = Math.floor(microHash(vy, vx, 317) * 11) + 2;
      px(ctx, fx, fy, 2, 1, '#dce8c6');
      px(ctx, fx, fy + 1, 1, 1, '#2c4a2c');
    }
  };

  if (kind === 'grass' || kind === 'grass_alt' || kind === 'alpine_meadow') {
    paintHimalayanMeadow();
  } else if (kind === 'river_cobble') {
    // Braided Himalayan Granite & Slate Riverbank Cobbles
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      151,
      ['#57534e', '#78716c', '#a8a29e', '#d6d3d1'],
      '#e7e5e4'
    );
    for (let i = 0; i < 3; i++) {
      const cx = Math.floor(microHash(vx * 3 + i, vy, 163) * 11) + 1;
      const cy = Math.floor(microHash(vx, vy * 3 + i, 167) * 12) + 1;
      px(ctx, cx, cy, 3, 2, '#cbd5e1');
      px(ctx, cx, cy + 2, 3, 1, '#44403c');
    }
  } else if (kind === 'alpine_scree') {
    // High-Altitude Frost-Shattered Gneiss Scree & Moraine Gravel
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      181,
      ['#475569', '#64748b', '#94a3b8', '#cbd5e1'],
      '#f1f5f9'
    );
  } else if (kind === 'tropical_forest_floor') {
    // Pantanal / Southern Amazon Rich Humus, Dappled Canopy Shade & Leaf Litter
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      211,
      ['#1e3f24', '#2b5431', '#3b6b3e', '#4d7f48'],
      '#8f6232'
    );
    if (microHash(vx, vy, 223) > 0.45) {
      const lx = Math.floor(microHash(vx, vy, 227) * 11) + 2;
      const ly = Math.floor(microHash(vy, vx, 229) * 11) + 2;
      px(ctx, lx, ly, 2, 1, '#a16207');
    }
  } else if (kind === 'corixo_water') {
    // Tannin-Rich Olive-Teal Pantanal Oxbow / Corixo Channel + Drifting Aguapé
    paintSeamlessNaturalSoil(ctx, vx, vy, 241, ['#133c3a', '#1b4f4a', '#24635c', '#2e786e']);
    const s = (animFrame * 2 + vx * 3) % 13;
    px(ctx, s, (4 + vy * 3) % 14, 4, 1, '#5eead4');
    if ((vx + vy) % 3 === 0) {
      px(ctx, 5, 8, 4, 2, '#2d7a3e');
      px(ctx, 6, 8, 2, 1, '#65a30d');
    }
  } else if (kind === 'laterite_path') {
    // Authentic Brazilian Red-Ochre Tropical Laterite Packed Trail
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      263,
      ['#7c321d', '#9a4226', '#b45332', '#c96b46'],
      '#e2956e'
    );
  } else if (kind === 'valley_loam') {
    // Sun-Baked Golden California San Joaquin Alluvial Valley Loam
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      307,
      ['#9c7e4e', '#b59460', '#caa974', '#dfc08c'],
      '#efe0be'
    );
  } else if (kind === 'arid_scrub') {
    // Semi-Arid Golden Foothill Dry Oat-Grass & Sage Scrub
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      331,
      ['#967c46', '#b09356', '#c7ab6b', '#d9bf82'],
      '#65734b'
    );
    const tx0 = Math.floor(microHash(vx, vy, 337) * 10) + 2;
    const ty0 = Math.floor(microHash(vy, vx, 347) * 10) + 2;
    px(ctx, tx0, ty0, 3, 2, '#6b7846');
    px(ctx, tx0 + 1, ty0 - 1, 2, 1, '#8c9960');
  } else if (kind === 'alfalfa_crop') {
    // Irrigated Central Valley Row Crop Furrows
    px(ctx, 0, 0, 16, 16, '#6e5536');
    for (let y = 0; y < 16; y += 4) {
      px(ctx, 0, y, 16, 3, (y + vx) % 2 === 0 ? '#3f7a38' : '#4a8840');
      px(ctx, (vx * 3) % 12, y + 1, 4, 1, '#68a852');
    }
  } else if (kind === 'aqueduct_water') {
    // Deep Engineered California Aqueduct Conveyance Channel
    px(ctx, 0, 0, 16, 16, '#0e5a8a');
    const s = (animFrame * 3 + vy * 4) % 12;
    px(ctx, 2, s, 5, 1, '#38bdf8');
    px(ctx, 9, (s + 6) % 14, 4, 1, '#bae6fd');
  } else if (kind === 'terra_rossa') {
    // Mediterranean Hatay Reddish-Ochre Terra Rossa Soil & Pale Limestone Grit
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      401,
      ['#8c5239', '#a66547', '#bf7a59', '#d49270'],
      '#e7dfd3'
    );
    if (microHash(vx, vy, 409) > 0.4) {
      const gx = Math.floor(microHash(vx, vy, 419) * 11) + 2;
      const gy = Math.floor(microHash(vy, vx, 421) * 11) + 2;
      px(ctx, gx, gy, 3, 2, '#5e7042'); // Mediterranean garrigue thyme tuft
    }
  } else if (kind === 'olive_terrace') {
    // Dry-Stone Retained Anatolian Olive Hillside Terrace
    paintSeamlessNaturalSoil(ctx, vx, vy, 433, ['#6e7849', '#828d58', '#96a168', '#aab57a']);
    px(ctx, 0, 13, 16, 3, '#a8a29e');
    px(ctx, 0, 13, 16, 1, '#e7e5e4');
    px(ctx, 4, 14, 1, 2, '#57534e');
    px(ctx, 11, 14, 1, 2, '#57534e');
  } else if (kind === 'limestone_ridge') {
    // Karst Limestone & Amanos Mountain Rock Outcrop
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      457,
      ['#57534e', '#78716c', '#a8a29e', '#d6d3d1'],
      '#f5f5f4'
    );
    px(ctx, 2, (vx * 3) % 12 + 2, 11, 1, '#44403c'); // Karst joint fracture
  } else if (kind === 'asi_water') {
    // Silty Mediterranean Blue-Green Asi (Orontes) River & Upland Reservoir
    paintSeamlessNaturalSoil(ctx, vx, vy, 479, ['#165b73', '#1e6f88', '#28849e', '#3aa0ba']);
    const s = (animFrame * 2 + vx * 3) % 13;
    px(ctx, s, (3 + vy * 3) % 13, 4, 1, '#a5f3fc');
  } else if (kind === 'bering_surf') {
    // Turbid Slate-Blue/Silt Bering Sea with Wind-Driven Whitecaps
    paintSeamlessNaturalSoil(ctx, vx, vy, 503, ['#1e3f52', '#285166', '#35637a', '#48788f']);
    const waveX = (animFrame * 3 + vy * 2) % 13;
    px(ctx, waveX, 3, 2, 10, '#cbd5e1');
    px(ctx, waveX + 1, 5, 1, 6, '#f8fafc');
  } else if (kind === 'coastal_mud') {
    // Thawing Permafrost Silt & Coastal Erosion Mudbank
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      523,
      ['#29221d', '#3b3129', '#4f4237', '#635346'],
      '#7dd3fc'
    );
  } else if (kind === 'upland_gravel') {
    // Firm Well-Drained Pleistocene Upland Gravel & Lichen Ridge (Alaska Safe Zone)
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      547,
      ['#6e6a63', '#878279', '#a39d93', '#bfb9ae'],
      '#e2e8f0'
    );
  } else if (kind === 'flower') {
    paintHimalayanMeadow();
    const sway = animFrame % 2 === 0 ? 0 : 1;
    const rows = [
      '...RRRR...rrr...',
      '..RMMMMR.rMMMr..',
      '..RMwwMRgRMwMR..',
      '.ggRRRRgggRRRRg.',
      'ggGGGGGGGGGGGGGg',
      'gGGRRRRgggRRRRGg',
      'gGRMMMMRgRMMMMRg',
      '.gGRwMRgggRwMRg.',
      '.ggGGGGGGGGGGgg.',
      '..gggggggggggg..'
    ];
    drawPixelGrid(ctx, sway, 3, rows, {
      g: '#1a4c20',
      G: '#2e7434',
      R: '#9f1239',
      r: '#881337',
      M: '#e11d48',
      w: '#fda4af'
    });
  } else if (kind === 'tall_grass') {
    paintHimalayanMeadow();
    const s = animFrame % 2;
    const blades = [
      '..l....L....l...',
      '.lG...LG...lG...',
      '.GG..lGG..lGG..l',
      'dGG.lGGG.dGGG.lG',
      'dGGdGGGGdGGGGdGG',
      '.dGGGGGGGGGGGGd.',
      '..dddddddddddd..'
    ];
    drawPixelGrid(ctx, s, 6, blades, {
      d: '#1e4c28',
      G: '#387c3c',
      l: '#68b058',
      L: '#a4d878'
    });
  } else if (kind === 'path' || kind === 'door_sand') {
    // Hand-Laid Mountain Slate Flagstone Trail (Dhunge Bato) with natural variation
    paintSeamlessNaturalSoil(ctx, vx, vy, 571, ['#786b59', '#8c7d68', '#a3937c', '#b8a890']);
    const shift = (vx % 2) * 2;
    px(ctx, 1 + shift, 1, 5, 5, '#cfc0a6');
    px(ctx, 1 + shift, 1, 4, 1, '#e4d8c0');
    px(ctx, 8, 2, 6, 5, '#c4b49a');
    px(ctx, 2, 8, 6, 6, '#c8b89e');
    px(ctx, 9, 8, 5, 6, '#d2c4aa');
  } else if (kind === 'flood_silt') {
    // Scoured Debris-Flood Boulder & Silt Deposit
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      593,
      ['#44403c', '#57534e', '#78716c', '#a8a29e'],
      '#d6d3d1'
    );
    px(ctx, 2 + (vx % 3), 3, 4, 3, '#a8a29e');
    px(ctx, 9, 9 + (vy % 3), 5, 3, '#cbd5e1');
  } else if (kind === 'paved') {
    px(ctx, 0, 0, 16, 16, '#64748b');
    px(ctx, 1, 1, 6, 6, '#cbd5e1');
    px(ctx, 9, 1, 6, 6, '#cbd5e1');
    px(ctx, 1, 9, 6, 6, '#cbd5e1');
    px(ctx, 9, 9, 6, 6, '#cbd5e1');
  } else if (kind === 'cliff_top') {
    // Foliated Metamorphic Gneiss & Slate Ledge Rim
    paintHimalayanMeadow();
    px(ctx, 0, 4, 16, 2, '#273d27');
    px(ctx, 0, 6, 16, 10, '#2e2c30');
    for (let x = 0; x < 16; x += 4) {
      const hOff = ((x + vx * 3) % 3);
      px(ctx, x, 6 + hOff, 3, 8 - hOff, '#52525b');
      px(ctx, x, 6 + hOff, 3, 1, '#9ca3af');
    }
  } else if (kind === 'cliff_face') {
    paintHimalayanMeadow();
    px(ctx, 0, 0, 16, 12, '#2e2c30');
    for (let x = 0; x < 16; x += 5) {
      px(ctx, x, 0, 4, 10, (x + vx) % 2 === 0 ? '#64748b' : '#52525b');
      px(ctx, x + 1, 2, 2, 3, '#94a3b8');
    }
    px(ctx, 0, 12, 16, 2, 'rgba(15, 32, 20, 0.42)');
  } else if (kind === 'stairs') {
    px(ctx, 0, 0, 16, 16, '#4b5563');
    for (let y = 0; y < 16; y += 4) {
      px(ctx, 2, y, 12, 2, '#e5e7eb');
      px(ctx, 2, y + 2, 12, 1, '#9ca3af');
      px(ctx, 2, y + 3, 12, 1, '#374151');
    }
    px(ctx, 0, 0, 2, 16, '#6b7280');
    px(ctx, 14, 0, 2, 16, '#6b7280');
  } else if (kind === 'water') {
    // Glacial-Flour Turquoise Himalayan River
    paintSeamlessNaturalSoil(ctx, vx, vy, 613, ['#13536b', '#196885', '#217d9c', '#2c92b3']);
    const s = (animFrame * 3 + vx * 4) % 13;
    px(ctx, s, 3, 4, 1, '#7dd3fc');
    px(ctx, (s + 6) % 12, 10, 4, 1, '#e0f2fe');
  } else if (kind === 'rapids') {
    px(ctx, 0, 0, 16, 16, '#155e75');
    const s = (animFrame * 4 + vy * 3) % 13;
    px(ctx, 1, (1 + s) % 14, 6, 2, '#67e8f9');
    px(ctx, 2, (2 + s) % 14, 4, 1, '#ffffff');
    px(ctx, 8, (7 + s) % 14, 6, 2, '#a5f3fc');
    px(ctx, 9, (8 + s) % 14, 4, 1, '#ffffff');
  } else if (kind === 'bridge_wood') {
    px(ctx, 0, 0, 16, 16, '#155e75');
    px(ctx, 0, 0, 16, 2, '#cbd5e1');
    px(ctx, 0, 2, 16, 1, '#475569');
    px(ctx, 0, 13, 16, 1, '#475569');
    px(ctx, 0, 14, 16, 2, '#94a3b8');
    const fCols = ['#3b82f6', '#f8fafc', '#ef4444', '#22c55e', '#facc15'];
    px(ctx, 3, 1, 3, 2, fCols[animFrame % 5]);
    px(ctx, 11, 1, 3, 2, fCols[(animFrame + 2) % 5]);
    for (let x = 0; x < 16; x += 4) {
      px(ctx, x, 3, 3, 10, '#94a3b8');
      px(ctx, x, 3, 3, 1, '#e2e8f0');
      px(ctx, x + 3, 3, 1, 10, '#334155');
    }
  } else if (kind === 'crop_terrace') {
    px(ctx, 0, 0, 16, 16, '#6e5236');
    px(ctx, 0, 7, 16, 2, '#78716c');
    px(ctx, 0, 15, 16, 1, '#78716c');
    for (const ry of [1, 9]) {
      px(ctx, 0, ry, 16, 5, '#467d34');
      px(ctx, 1, ry, 14, 2, '#75b84c');
    }
  } else if (kind === 'snow') {
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      641,
      ['#cbdceb', '#dceaf7', '#eef6fc', '#ffffff'],
      '#94a3b8'
    );
  } else if (kind === 'glacier_ice') {
    paintSeamlessNaturalSoil(ctx, vx, vy, 659, ['#0284c7', '#38bdf8', '#7dd3fc', '#e0f2fe']);
    px(ctx, (3 + vx * 2) % 12, 2, 2, 12, '#0369a1');
  } else if (kind === 'lab_floor' || kind === 'lab_floor_shadow') {
    const base = kind === 'lab_floor_shadow' ? '#cbd5e1' : '#e8eef5';
    const seam = kind === 'lab_floor_shadow' ? '#94a3b8' : '#cfd8e3';
    px(ctx, 0, 0, 16, 16, base);
    px(ctx, 0, 0, 16, 1, seam);
    px(ctx, 0, 0, 1, 16, seam);
    px(ctx, 7, 7, 2, 2, seam);
  } else if (kind === 'lab_wall_top') {
    px(ctx, 0, 0, 16, 3, '#5c3420');
    px(ctx, 0, 3, 16, 2, '#9a3412');
    px(ctx, 0, 5, 16, 11, '#f5efe0');
  } else if (kind === 'lab_wall' || kind === 'lab_wall_bottom') {
    px(ctx, 0, 0, 16, 6, '#f5efe0');
    px(ctx, 0, 6, 16, 2, '#7c2d12');
    px(ctx, 0, 8, 16, 7, '#784c28');
    for (let x = 1; x < 16; x += 4) {
      px(ctx, x, 9, 2, 5, '#9a6438');
    }
    px(ctx, 0, 15, 16, 1, '#451a03');
  } else if (kind === 'house_wall_top') {
    px(ctx, 0, 0, 16, 4, '#451a03');
    px(ctx, 0, 4, 16, 2, '#78350f');
    px(ctx, 0, 6, 16, 10, '#ecd9b8');
  } else if (kind === 'house_wall_bottom') {
    px(ctx, 0, 0, 16, 8, '#ecd9b8');
    px(ctx, 0, 8, 16, 2, '#991b1b');
    px(ctx, 0, 10, 16, 5, '#78350f');
    px(ctx, 0, 15, 16, 1, '#451a03');
  } else if (kind === 'house_floor') {
    px(ctx, 0, 0, 16, 16, '#d6b482');
    for (let y = 3; y < 16; y += 4) {
      px(ctx, 0, y, 16, 1, '#9c7444');
      px(ctx, (y * 3) % 13, y - 1, 2, 1, '#e8cca0');
    }
  } else if (kind === 'lab_mat') {
    px(ctx, 0, 0, 16, 16, '#cbd5e1');
    px(ctx, 0, 2, 16, 12, '#7f1d1d');
    px(ctx, 1, 3, 14, 10, '#b91c1c');
    px(ctx, 3, 5, 10, 6, '#f59e0b');
    px(ctx, 5, 6, 6, 4, '#14b8a6');
  } else if (kind === 'wetland_marsh') {
    // Pantanal Flooded Sedge Marsh + Floating Macrophytes & Water Lilies
    paintSeamlessNaturalSoil(ctx, vx, vy, 701, ['#11423b', '#17574d', '#226e5e', '#2d826c']);
    const shift = (animFrame * 2 + vx * 3) % 11;
    px(ctx, shift, 4, 4, 1, '#5eead4');
    px(ctx, 2 + (vy % 4), 8, 5, 3, '#2f7a3e');
    px(ctx, 9, 2 + (vx % 4), 4, 3, '#4d9444');
    if ((vx + vy) % 2 === 0) px(ctx, 10, 3 + (vx % 4), 2, 1, '#fbcfe8');
  } else if (kind === 'peat_soil') {
    // Sub-Canopy Organic Peat Soil & Exposed Root Mat
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      733,
      ['#2e1f16', '#422d20', '#593e2c', '#70503a'],
      '#9ca3af'
    );
  } else if (kind === 'boardwalk') {
    px(ctx, 0, 0, 16, 16, '#785330');
    for (let y = 0; y < 16; y += 4) {
      px(ctx, 0, y, 16, 3, (y + vx) % 2 === 0 ? '#a87646' : '#b58250');
      px(ctx, 0, y + 3, 16, 1, '#3d2510');
    }
    px(ctx, 1, 0, 2, 16, '#5c3c1e');
    px(ctx, 13, 0, 2, 16, '#5c3c1e');
  } else if (kind === 'orchard_soil') {
    // Laser-Leveled California Orchard Loam with Moist Drip-Irrigation Lines
    paintSeamlessNaturalSoil(ctx, vx, vy, 761, ['#a68453', '#bd9a66', '#cfa976', '#dec090']);
    px(ctx, 0, 3, 16, 2, '#6b4f2e'); // Dark moist drip-emitter strip
    px(ctx, 0, 11, 16, 2, '#6b4f2e');
    px(ctx, 4 + (vx % 4), 3, 2, 1, '#38bdf8');
  } else if (kind === 'concrete_canal') {
    // Sloped Trapezoidal Concrete Aqueduct Liner Panels
    px(ctx, 0, 0, 16, 16, '#cbd5e1');
    px(ctx, 0, 0, 16, 2, '#94a3b8');
    px(ctx, 0, 14, 16, 2, '#64748b');
    px(ctx, 7, 0, 1, 16, '#94a3b8');
    px(ctx, 2, 5, 4, 1, '#f1f5f9');
  } else if (kind === 'limestone_paving') {
    // Historic Antakya Cut Cream-Limestone Courtyard Paving
    paintSeamlessNaturalSoil(ctx, vx, vy, 797, ['#d4c5ab', '#e2d5be', '#ede2ce', '#f5ede0']);
    px(ctx, 0, 7, 16, 1, '#b09c7d');
    px(ctx, 0, 15, 16, 1, '#b09c7d');
    px(ctx, (6 + (vy % 2) * 3) % 15, 0, 1, 7, '#b09c7d');
    px(ctx, (11 + (vx % 2) * 2) % 15, 8, 1, 7, '#b09c7d');
  } else if (kind === 'tundra_moss') {
    // Authentic Polygonal Yup'ik Autumn Tundra (Russet Sedge, Dwarf Birch & Pale Reindeer Lichen)
    paintSeamlessNaturalSoil(
      ctx,
      vx,
      vy,
      829,
      ['#5c6132', '#787338', '#997336', '#b38642'],
      '#d6ddd0'
    );
    // Polygonal ice-wedge trough edge on every 4th tile boundary
    if (vx === 0) px(ctx, 0, 0, 2, 16, '#3f4526');
    if (vy === 0) px(ctx, 0, 0, 16, 2, '#3f4526');
    if ((vx + vy) % 3 === 0) {
      px(ctx, 5, 6, 4, 2, '#9f3a28'); // Crimson dwarf birch / tundra berry patch
    }
  } else if (kind === 'permafrost_ice') {
    // Thawing Ice-Wedge / Thermokarst Meltwater Pond
    paintSeamlessNaturalSoil(ctx, vx, vy, 853, ['#1e4e68', '#2b6cb0', '#63b3ed', '#bee3f8']);
  } else if (kind === 'kilim_carpet') {
    px(ctx, 0, 0, 16, 16, '#991b1b');
    px(ctx, 1, 1, 14, 14, '#dc2626');
    px(ctx, 3, 3, 10, 10, '#f59e0b');
    px(ctx, 5, 5, 6, 6, '#1e3a8a');
    px(ctx, 7, 7, 2, 2, '#fef08a');
  }

  tileCache.set(key, c);
  return c;
}

// ============================================================================
// NEPALI BUILDINGS, CULTURAL HERITAGE, FLOOD SCARS & SCIENTIFIC LAB PROPS!
// ============================================================================
const propCache = new Map<string, HTMLCanvasElement>();

function drawLeafPuff(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  cOutline: string,
  cShadow: string,
  cMid: string,
  cLight: string,
  cPeak?: string
) {
  const r2 = r * r;
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      const d2 = dx * dx + dy * dy;
      if (d2 > r2 + 1) continue;
      let col = cMid;
      if (d2 >= r2 - r * 1.35) {
        col = dy < 0 ? cShadow : cOutline;
      } else if (dy >= r * 0.38) {
        col = cShadow;
      } else if (dy <= -r * 0.25 && Math.abs(dx) <= r * 0.65) {
        col = cPeak && dy <= -r * 0.5 ? cPeak : cLight;
      } else if ((dx + dy) % 3 === 0 && dy < r * 0.2) {
        col = cLight;
      }
      ctx.fillStyle = col;
      ctx.fillRect(Math.round(cx + dx), Math.round(cy + dy), 1, 1);
    }
  }
}

// Helper to draw Nepal's iconic non-rectangular Crimson Double-Pennant Flag!
function drawNepalFlag(ctx: CanvasRenderingContext2D, poleX: number, topY: number, flutter = 0) {
  px(ctx, poleX, topY, 2, 24, '#cbd5e1');
  px(ctx, poleX, topY - 1, 2, 2, '#facc15');
  // Upper pennant triangle
  for (let row = 0; row < 7; row++) {
    const w = 10 - row;
    px(ctx, poleX + 2, topY + 1 + row, w + 1, 1, '#1d4ed8');
    px(ctx, poleX + 2, topY + 2 + row, Math.max(1, w - 1), 1, '#dc2626');
  }
  // Lower pennant triangle
  for (let row = 0; row < 9; row++) {
    const w = 11 - Math.floor(row * 1.1);
    const dy = topY + 7 + row + (row > 5 ? flutter : 0);
    px(ctx, poleX + 2, dy, w + 1, 1, '#1d4ed8');
    px(ctx, poleX + 2, dy, Math.max(1, w - 1), 1, '#dc2626');
  }
  // White moon & sun emblems!
  px(ctx, poleX + 4, topY + 4, 2, 2, '#ffffff');
  px(ctx, poleX + 4, topY + 11, 3, 3, '#ffffff');
}

export function getPropSprite(kind: string, animFrame = 0): HTMLCanvasElement {
  const key = `${kind}_${animFrame}`;
  const hit = propCache.get(key);
  if (hit) return hit;

  if (kind === 'pine_tree' || kind === 'snow_tree' || kind === 'laliguras_tree') {
    // Himalayan Deodar Pine, Snow Fir, or Crimson Blooming Laliguras (Rhododendron) Tree!
    const [c, ctx] = makeCanvas(32, 44);
    const snow = kind === 'snow_tree';
    const rhodo = kind === 'laliguras_tree';

    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -13; dx <= 13; dx++) {
        if ((dx * dx) / 169 + (dy * dy) / 16 <= 1) {
          ctx.fillStyle = 'rgba(18, 52, 28, 0.44)';
          ctx.fillRect(16 + dx, 38 + dy, 1, 1);
        }
      }
    }

    px(ctx, 12, 31, 8, 9, '#281c16');
    px(ctx, 13, 32, 6, 7, '#543828');
    px(ctx, 14, 32, 2, 6, '#74523c');

    if (rhodo) {
      // Spreading Himalayan Rhododendron (Laliguras) Canopy Bursting with Crimson Blossoms!
      const puffs: Array<[number, number, number]> = [
        [9, 26, 6],
        [23, 26, 6],
        [16, 28, 6],
        [10, 18, 6],
        [22, 18, 6],
        [16, 20, 7],
        [14, 12, 6],
        [19, 13, 5]
      ];
      for (const [pxX, pxY, r] of puffs) {
        drawLeafPuff(ctx, pxX, pxY, r, '#14381c', '#1e5428', '#347c3c', '#5ca854');
      }
      // Crimson-red Laliguras flower clusters!
      for (const [bx, by] of [
        [8, 23],
        [15, 25],
        [22, 23],
        [10, 15],
        [17, 17],
        [21, 15],
        [14, 10]
      ]) {
        px(ctx, bx, by, 4, 3, '#be123c');
        px(ctx, bx + 1, by, 2, 2, '#fb7185');
      }
    } else {
      const cOut = snow ? '#163848' : '#143818';
      const cShad = snow ? '#28586c' : '#225824';
      const cMid = snow ? '#4c8ca0' : '#3e8434';
      const cLit = snow ? '#98d8ec' : '#6cb44c';
      const cTop = snow ? '#f4fcff' : '#a4dc6c';

      const puffs: Array<[number, number, number, boolean]> = [
        [7, 30, 5, false],
        [25, 30, 5, false],
        [12, 31, 6, false],
        [20, 31, 6, false],
        [16, 29, 6, false],
        [8, 24, 5, false],
        [24, 24, 5, false],
        [13, 24, 6, true],
        [19, 24, 6, true],
        [10, 18, 5, false],
        [22, 18, 5, false],
        [16, 17, 6, true],
        [12, 12, 5, true],
        [20, 12, 5, true],
        [16, 10, 5, true],
        [16, 6, 4, true],
        [16, 3, 2, true]
      ];
      for (const [pxX, pxY, rad, sunlit] of puffs) {
        drawLeafPuff(ctx, pxX, pxY, rad, cOut, cShad, cMid, cLit, sunlit ? cTop : undefined);
      }
    }

    propCache.set(key, c);
    return c;
  }

  if (kind === 'nisar_lab' || kind === 'dhm_nisar_kendra') {
    // DR. RUDRA'S DHM–NISAR HIMALAYAN GEOMATICS KENDRA (116x92 px)
    // Authentic Nepali Malla Terracotta Brick, Dressed Mountain Stone, Pagoda Slate Roof,
    // Carved Wooden Jhyal Windows, Nepal Double-Pennant Flag & Spinning Gold NISAR Dish!
    const [c, ctx] = makeCanvas(116, 92);
    const OL = '#27201c';
    px(ctx, 6, 84, 104, 5, 'rgba(18, 48, 26, 0.42)');

    // Lower Stone Plinth (Dressed Himalayan Slate)
    px(ctx, 4, 74, 108, 11, OL);
    for (let x = 6; x < 110; x += 8) {
      px(ctx, x, 75, 7, 4, '#64748b');
      px(ctx, x + 2, 80, 7, 4, '#475569');
    }

    // Main Nepali Terracotta Brick Facade (y = 44..75)
    px(ctx, 6, 44, 104, 31, OL);
    px(ctx, 8, 45, 100, 29, '#b4533c');
    for (let wy = 48; wy < 73; wy += 4) {
      px(ctx, 8, wy, 100, 1, '#8c3824');
    }
    // Carved Dark-Wood Nepali Corner & Door Pillars
    for (const pxCol of [8, 44, 68, 102]) {
      px(ctx, pxCol, 45, 5, 29, '#451a03');
      px(ctx, pxCol + 1, 45, 3, 29, '#78350f');
    }

    // Upper Tier Pagoda Pavilion + Carved Tundal Roof Struts!
    px(ctx, 2, 26, 112, 19, OL);
    for (let rx = 4; rx < 112; rx += 6) {
      px(ctx, rx, 28, 4, 15, '#334155');
      px(ctx, rx, 28, 2, 15, '#64748b');
    }
    // Copper-Gold Pagoda Eave Trim!
    px(ctx, 2, 42, 112, 3, '#d97706');
    px(ctx, 3, 42, 110, 1, '#fde047');

    // Second Upper Pagoda Tier (x = 22..94, y = 13..28)
    px(ctx, 22, 13, 72, 15, OL);
    for (let rx = 24; rx < 92; rx += 6) {
      px(ctx, rx, 15, 4, 11, '#334155');
      px(ctx, rx, 15, 2, 11, '#64748b');
    }
    px(ctx, 20, 25, 76, 3, '#d97706');

    // Spinning Golden NASA-ISRO NISAR Parabolic Dish + DHM Anemometer on Upper Roof!
    px(ctx, 76, 6, 6, 8, '#334155');
    const dw = animFrame % 2 === 0 ? 22 : 16;
    px(ctx, 79 - dw / 2, 0, dw, 8, OL);
    px(ctx, 80 - dw / 2, 1, dw - 2, 6, '#eab308');
    px(ctx, 82 - dw / 2, 2, Math.max(4, dw - 6), 3, '#fef08a');

    // Traditional Carved Nepali Lattice Windows (Ankhi-Jhyal) Left & Right
    for (const wx of [16, 77]) {
      px(ctx, wx, 49, 22, 16, '#451a03');
      px(ctx, wx + 2, 51, 18, 12, '#78350f');
      px(ctx, wx + 3, 52, 7, 10, '#38bdf8');
      px(ctx, wx + 12, 52, 7, 10, '#38bdf8');
      // Lattice wood crossbars
      px(ctx, wx + 3, 56, 16, 2, '#451a03');
      px(ctx, wx - 1, 47, 24, 2, '#d97706');
    }

    // Blue Nepali Signboard ("DHM • NISAR KENDRA") above Main Carved Door!
    px(ctx, 43, 46, 30, 6, '#1e3a8a');
    px(ctx, 44, 47, 28, 4, '#1d4ed8');
    px(ctx, 46, 48, 24, 2, '#fef08a');

    // Enterable Carved Timber Double Doorway (Center x = 50..66, y = 53..83)
    px(ctx, 49, 53, 18, 30, '#271408');
    px(ctx, 51, 55, 14, 28, '#92400e');
    px(ctx, 57, 55, 2, 28, '#451a03');
    px(ctx, 53, 58, 4, 6, '#fbbf24'); // Brass kalash/ring!
    px(ctx, 59, 58, 4, 6, '#fbbf24');

    // Proudly Fluttering Nepal Double-Pennant National Flag in Front Right!
    drawNepalFlag(ctx, 98, 56, animFrame % 2);

    propCache.set(key, c);
    return c;
  }

  if (kind === 'house_red' || kind === 'tamang_stone_house') {
    // AUTHENTIC TAMANG / CHILIME DRY-STONE & CARVED-CEDAR BALCONY HOUSE (80x72 px — modeled directly on chilime_village_houses.jpg!)
    const [c, ctx] = makeCanvas(80, 72);
    const OL = '#24201c';
    px(ctx, 5, 65, 70, 5, 'rgba(18, 48, 26, 0.42)');

    // Prayer flag poles (Darchog) rising from roof corners!
    px(ctx, 6, 1, 2, 16, '#78350f');
    px(ctx, 72, 1, 2, 16, '#78350f');
    ['#3b82f6', '#f8fafc', '#ef4444', '#22c55e', '#eab308'].forEach((col, i) => {
      px(ctx, 10 + i * 12, 3 + ((animFrame + i) % 2), 9, 3, col);
    });

    // Pitched Himalayan Slate Roof Weighted with White Quartz Stones (y = 10..30)
    px(ctx, 3, 10, 74, 21, OL);
    for (let rx = 5; rx < 74; rx += 6) {
      px(ctx, rx, 12, 5, 17, '#475569');
      px(ctx, rx, 12, 2, 17, '#64748b');
    }
    // Stones weighting roof against gorge winds (authentic Langtang/Tamang detail!)
    for (const sx of [12, 28, 46, 62]) {
      px(ctx, sx, 13, 4, 2, '#cbd5e1');
      px(ctx, sx + 4, 22, 4, 2, '#cbd5e1');
    }

    // Stacked Firewood Logs Tucked Under Roof Eaves!
    px(ctx, 6, 30, 68, 4, '#451a03');
    for (let lx = 8; lx < 72; lx += 3) {
      px(ctx, lx, 31, 2, 2, '#d97706');
    }

    // Upper Story: Warm Carved Pine/Cedar Balcony (Dalan, y = 34..48)
    px(ctx, 5, 34, 70, 32, OL);
    px(ctx, 7, 34, 66, 15, '#b45309');
    px(ctx, 7, 44, 66, 4, '#78350f'); // Carved balcony railing!
    for (let bx = 9; bx < 71; bx += 4) {
      px(ctx, bx, 35, 2, 9, '#f59e0b');
    }
    // Upper wooden windows
    for (const wx of [16, 36, 54]) {
      px(ctx, wx, 36, 9, 7, '#271408');
      px(ctx, wx + 1, 37, 7, 5, '#38bdf8');
    }

    // Ground Floor: Dry-Stacked Grey-Brown Mountain Slate Masonry (y = 49..65)
    px(ctx, 7, 49, 66, 16, '#57534e');
    for (let sy = 50; sy < 64; sy += 4) {
      for (let sx = 8 + (sy % 8 === 0 ? 0 : 3); sx < 68; sx += 7) {
        px(ctx, sx, sy, 5, 3, '#78716c');
        px(ctx, sx, sy, 4, 1, '#a8a29e');
      }
    }
    // Red-ochre (Rato Mato) band & Enterable Carved Wooden Door (x = 44..58, y = 46..65)
    px(ctx, 14, 52, 14, 9, '#451a03');
    px(ctx, 16, 54, 10, 6, '#38bdf8');

    px(ctx, 44, 46, 14, 20, '#271408');
    px(ctx, 46, 48, 10, 18, '#9a3412');
    px(ctx, 48, 51, 6, 4, '#fde047'); // Auspicious brass kalash plaque above door!
    px(ctx, 47, 57, 2, 2, '#facc15');

    propCache.set(key, c);
    return c;
  }

  if (kind === 'house_blue' || kind === 'syabrubesi_lodge') {
    // SYABRUBESI CONFLUENCE HIMALAYAN BAZAAR LODGE (80x72 px — modeled directly on syabrubesi_confluence.jpg!)
    const [c, ctx] = makeCanvas(80, 72);
    const OL = '#1e293b';
    px(ctx, 5, 65, 70, 5, 'rgba(18, 48, 26, 0.42)');

    // Corrugated Mountain Roof + Solar Water Heater Tubes!
    px(ctx, 4, 10, 72, 18, OL);
    for (let rx = 6; rx < 74; rx += 5) {
      px(ctx, rx, 12, 3, 14, '#0284c7');
      px(ctx, rx, 12, 1, 14, '#7dd3fc');
    }
    // Rooftop solar heater
    px(ctx, 50, 5, 16, 8, '#334155');
    px(ctx, 52, 6, 12, 5, '#38bdf8');

    // Two-Story Ochre & Turquoise Painted Rasuwa Bazaar Facade
    px(ctx, 6, 28, 68, 38, OL);
    px(ctx, 8, 29, 64, 17, '#f59e0b'); // Warm mustard-ochre upper floor
    px(ctx, 8, 43, 64, 4, '#0d9488'); // Turquoise balcony rail (exact syabrubesi_confluence.jpg!)
    px(ctx, 8, 47, 64, 18, '#e7e5e4'); // Whitewashed stone ground floor
    px(ctx, 8, 60, 64, 5, '#991b1b'); // Rato Mato red-clay base!

    for (const wx of [14, 34, 54]) {
      px(ctx, wx, 32, 10, 9, '#451a03');
      px(ctx, wx + 1, 33, 8, 7, '#7dd3fc');
    }
    px(ctx, 14, 50, 16, 9, '#451a03');
    px(ctx, 16, 51, 12, 7, '#38bdf8');

    // Lodge Doorway
    px(ctx, 45, 48, 13, 17, '#271408');
    px(ctx, 47, 50, 9, 15, '#b45309');
    px(ctx, 48, 57, 2, 2, '#fde047');

    propCache.set(key, c);
    return c;
  }

  if (kind === 'timure_customs_post') {
    // REAL TIMURE CUSTOMS POST (84x58 px — modeled directly on timure_customs_office.jpg!)
    const [c, ctx] = makeCanvas(84, 58);
    const OL = '#27272a';
    px(ctx, 4, 51, 76, 5, 'rgba(18, 48, 26, 0.38)');
    // Overhanging flat concrete monsoon slab roof
    px(ctx, 2, 14, 80, 6, OL);
    px(ctx, 3, 15, 78, 4, '#d4d4d8');
    // Whitewashed wall with red Nepali government signboard & dark louver shutters
    px(ctx, 6, 20, 72, 32, OL);
    px(ctx, 8, 21, 68, 30, '#f8fafc');
    px(ctx, 26, 22, 32, 5, '#991b1b');
    px(ctx, 28, 24, 28, 1, '#fef08a');
    for (const wx of [13, 55]) {
      px(ctx, wx, 28, 15, 13, '#451a03');
      px(ctx, wx + 2, 30, 5, 9, '#78350f');
      px(ctx, wx + 8, 30, 5, 9, '#78350f');
    }
    // Red-and-white paneled Nepali office door
    px(ctx, 36, 28, 12, 23, '#451a03');
    px(ctx, 38, 30, 8, 9, '#e2e8f0');
    px(ctx, 38, 41, 8, 9, '#dc2626');
    // Nepal National Flag on front pole!
    drawNepalFlag(ctx, 66, 27, animFrame % 2);
    propCache.set(key, c);
    return c;
  }

  if (kind === 'rasuwagadhi_fort') {
    // HISTORIC 1855 RASUWAGADHI STONE FORT RAMPART (88x50 px — modeled directly on rasuwagadhi_fort.jpg!)
    const [c, ctx] = makeCanvas(88, 50);
    px(ctx, 2, 44, 84, 5, 'rgba(15, 23, 42, 0.42)');
    px(ctx, 2, 8, 84, 38, '#1c1917');
    // Dry-stacked dark slate masonry blocks
    for (let y = 10; y < 44; y += 4) {
      for (let x = 4 + (y % 8 === 0 ? 0 : 4); x < 82; x += 8) {
        px(ctx, x, y, 7, 3, '#57534e');
        px(ctx, x, y, 6, 1, '#78716c');
      }
    }
    // Rectangular cannon / musket embrasure loopholes (signature detail of rasuwagadhi_fort.jpg!)
    for (const ex of [14, 32, 50, 68]) {
      px(ctx, ex, 18, 8, 10, '#0c0a09');
      px(ctx, ex, 28, 8, 2, '#a8a29e');
    }
    drawNepalFlag(ctx, 42, 0, animFrame % 2);
    propCache.set(key, c);
    return c;
  }

  if (kind === 'buddhist_stupa') {
    // Himalayan Whitewashed Buddhist Chorten / Stupa with Wisdom Eyes & Prayer Flags (44x54 px)!
    const [c, ctx] = makeCanvas(44, 54);
    const OL = '#27272a';
    px(ctx, 6, 48, 32, 4, 'rgba(18, 48, 26, 0.4)');
    // Prayer flag lines radiating from spire
    ['#3b82f6', '#f8fafc', '#ef4444', '#22c55e', '#eab308'].forEach((col, i) => {
      px(ctx, 3 + i * 3, 12 + i * 2, 3, 3, col);
      px(ctx, 38 - i * 3, 12 + i * 2, 3, 3, col);
    });
    // Golden Pinnacle & 13 Spire Rings
    px(ctx, 20, 2, 4, 4, '#fef08a');
    for (let y = 6; y < 16; y += 2) {
      const w = 6 + Math.floor((y - 6) * 0.8);
      px(ctx, 22 - Math.floor(w / 2), y, w, 2, '#eab308');
    }
    // Golden Harmika Cube with Painted Buddha Wisdom Eyes!
    px(ctx, 15, 16, 14, 8, OL);
    px(ctx, 16, 17, 12, 6, '#facc15');
    px(ctx, 17, 19, 3, 2, '#ffffff');
    px(ctx, 18, 19, 1, 2, '#1e3a8a');
    px(ctx, 24, 19, 3, 2, '#ffffff');
    px(ctx, 25, 19, 1, 2, '#1e3a8a');
    px(ctx, 21, 18, 2, 1, '#dc2626');
    // Whitewashed Dome (Garbha) + Saffron Garland
    px(ctx, 10, 24, 24, 13, OL);
    px(ctx, 11, 25, 22, 11, '#f8fafc');
    px(ctx, 12, 27, 20, 2, '#f97316');
    // Stepped Stone Base
    px(ctx, 6, 37, 32, 12, OL);
    px(ctx, 8, 38, 28, 4, '#e2e8f0');
    px(ctx, 7, 43, 30, 5, '#cbd5e1');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'mani_wall') {
    // Traditional Tamang / Tibetan Carved Mantra Mani Stone Wall (48x26 px)
    const [c, ctx] = makeCanvas(48, 26);
    px(ctx, 2, 21, 44, 4, 'rgba(18, 48, 26, 0.4)');
    px(ctx, 2, 4, 44, 18, '#27272a');
    px(ctx, 4, 5, 40, 4, '#64748b');
    // Carved white/ochre mantra tablets along the wall!
    for (const [mx, col] of [
      [6, '#f8fafc'],
      [16, '#fde68a'],
      [26, '#e2e8f0'],
      [36, '#fecdd3']
    ] as Array<[number, string]>) {
      px(ctx, mx, 10, 8, 6, col);
      px(ctx, mx + 1, 12, 6, 1, '#475569');
      px(ctx, mx + 1, 14, 5, 1, '#dc2626');
    }
    px(ctx, 4, 17, 40, 4, '#57534e');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'chautari_peepal') {
    // Traditional Nepali Stone Chautari Resting Platform & Sacred Peepal Tree (56x58 px)!
    const [c, ctx] = makeCanvas(56, 58);
    px(ctx, 4, 50, 48, 6, 'rgba(18, 48, 26, 0.42)');
    // Stepped stone Chautari platform
    px(ctx, 6, 38, 44, 14, '#27272a');
    px(ctx, 8, 39, 40, 5, '#cbd5e1');
    px(ctx, 8, 45, 40, 6, '#64748b');
    // Spreading gnarled Peepal trunk & broad sacred canopy
    px(ctx, 23, 24, 10, 16, '#3f2e21');
    px(ctx, 25, 25, 5, 14, '#6b4f3a');
    for (const [lx, ly, r] of [
      [15, 20, 9],
      [41, 20, 9],
      [28, 22, 10],
      [20, 12, 9],
      [36, 12, 9],
      [28, 9, 8]
    ]) {
      drawLeafPuff(ctx, lx, ly, r, '#14381c', '#1e5828', '#388e3c', '#76c858', '#bef264');
    }
    propCache.set(key, c);
    return c;
  }

  if (kind === 'flood_debris_scar') {
    // WALK-IN FLOOD DESTRUCTION EVIDENCE ZONE: Glacial Boulders, Snapped Pier & Swept EV Container! (64x38 px)
    const [c, ctx] = makeCanvas(64, 38);
    // Mud-buried tilted shipping/EV container
    px(ctx, 4, 12, 28, 16, '#1e293b');
    px(ctx, 6, 14, 24, 12, '#0284c7');
    for (let x = 8; x < 28; x += 4) {
      px(ctx, x, 15, 2, 10, '#0369a1');
    }
    px(ctx, 4, 23, 30, 6, '#78716c'); // Brown flood silt burying lower half!
    // Huge grey-brown Himalayan granite boulders & snapped bridge rebar!
    for (const [bx, by, bw, bh] of [
      [34, 18, 14, 11],
      [46, 22, 12, 9],
      [24, 24, 11, 8]
    ]) {
      px(ctx, bx, by, bw, bh, '#292524');
      px(ctx, bx + 1, by + 1, bw - 2, bh - 2, '#78716c');
      px(ctx, bx + 2, by + 1, bw - 5, 3, '#a8a29e');
    }
    // Bent steel rebar sticking out of broken concrete pier
    px(ctx, 40, 8, 8, 12, '#57534e');
    px(ctx, 41, 4, 1, 5, '#dc2626');
    px(ctx, 45, 5, 1, 4, '#dc2626');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'photo_evidence_stand') {
    // Interactive Field Incident Photo Display Board ("📸 REAL FLOOD PHOTOS") (24x28 px)
    const [c, ctx] = makeCanvas(24, 28);
    px(ctx, 4, 23, 16, 4, 'rgba(18, 48, 26, 0.42)');
    px(ctx, 6, 16, 2, 10, '#451a03');
    px(ctx, 16, 16, 2, 10, '#451a03');
    // Crimson-and-gold Nepali photo frame
    px(ctx, 2, 3, 20, 15, '#7f1d1d');
    px(ctx, 3, 4, 18, 13, '#facc15');
    px(ctx, 4, 5, 16, 11, '#0f172a');
    // Mini landscape + camera flash glint inside board!
    px(ctx, 5, 6, 14, 5, '#38bdf8');
    px(ctx, 8, 8, 8, 4, '#e2e8f0');
    px(ctx, 5, 11, 14, 4, '#78716c');
    if (animFrame % 2 === 0) {
      px(ctx, 16, 6, 2, 2, '#fef08a');
    }
    propCache.set(key, c);
    return c;
  }

  if (kind === 'signpost') {
    // Carved Wooden Nepali Trail Signboard (22x24 px)
    const [c, ctx] = makeCanvas(22, 24);
    px(ctx, 4, 19, 14, 3, 'rgba(18, 48, 26, 0.42)');
    px(ctx, 9, 13, 4, 9, '#451a03');
    px(ctx, 2, 3, 18, 12, '#451a03');
    px(ctx, 3, 4, 16, 10, '#b45309');
    px(ctx, 4, 5, 14, 2, '#fef08a');
    px(ctx, 4, 8, 11, 1, '#fde68a');
    px(ctx, 4, 10, 13, 1, '#fde68a');
    propCache.set(key, c);
    return c;
  }

  // ==========================================================================
  // AUTHENTIC REGIONAL SCIENTIFIC OBSERVATORY LAB PROPS
  // ==========================================================================
  if (kind === 'lab_wall_chart') {
    // Nepal Flag Crest + Rasuwa Elevation Profile Chart + Himalayan Window (56x24 px)
    const [c, ctx] = makeCanvas(56, 24);
    // Framed Rasuwa Hazard Map
    px(ctx, 1, 2, 18, 17, '#451a03');
    px(ctx, 2, 3, 16, 15, '#f8fafc');
    px(ctx, 4, 5, 12, 5, '#0284c7');
    px(ctx, 6, 8, 8, 4, '#22c55e');
    px(ctx, 9, 6, 3, 9, '#ef4444'); // Red Lhende flood corridor line!
    // Framed InSAR Phase Poster
    px(ctx, 21, 2, 16, 17, '#451a03');
    px(ctx, 22, 3, 14, 15, '#0f172a');
    px(ctx, 24, 5, 10, 10, '#a855f7');
    px(ctx, 26, 7, 6, 6, '#38bdf8');
    px(ctx, 28, 9, 2, 2, '#facc15');
    // Carved Nepali Window Looking Out to Snow Peaks!
    px(ctx, 39, 1, 16, 18, '#451a03');
    px(ctx, 41, 3, 12, 14, '#7dd3fc');
    px(ctx, 43, 8, 8, 5, '#ffffff');
    px(ctx, 41, 12, 12, 5, '#15803d');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'lab_bookshelf') {
    // Carved Walnut Nepali Archive Cabinet with Hydrological Logs & Survey Binders (32x42 px)
    const [c, ctx] = makeCanvas(32, 42);
    px(ctx, 0, 0, 32, 40, '#3b1d0a');
    px(ctx, 2, 2, 28, 36, '#78350f');
    px(ctx, 2, 2, 28, 3, '#b45309');
    for (const sy of [8, 20]) {
      px(ctx, 3, sy, 26, 9, '#271408');
      const cols = ['#dc2626', '#0284c7', '#eab308', '#16a34a', '#9333ea', '#ea580c', '#38bdf8'];
      cols.forEach((col, i) => {
        px(ctx, 4 + i * 3 + (i > 3 ? 2 : 0), sy + 1 + (i % 2), 2, 8 - (i % 2), col);
      });
    }
    px(ctx, 4, 31, 11, 5, '#92400e');
    px(ctx, 17, 31, 11, 5, '#92400e');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'lab_relief_table' || kind === 'lab_specimen_table') {
    // 3D PHYSICAL SCALE RELIEF MODEL TABLE OF REGIONAL WATERSHED (72x44 px)
    const [c, ctx] = makeCanvas(72, 44);
    px(ctx, 3, 38, 66, 5, 'rgba(15, 23, 42, 0.25)');
    // Carved hardwood legs
    px(ctx, 5, 33, 6, 8, '#451a03');
    px(ctx, 61, 33, 6, 8, '#451a03');
    // Illuminated glass-rimmed topographic table chassis
    px(ctx, 2, 2, 68, 33, '#1e293b');
    px(ctx, 4, 4, 64, 25, '#082f49');
    // Sculpted 3D miniature Himalayan relief inside the table!
    // Green Chilime/Syabrubesi foothills
    px(ctx, 6, 16, 60, 11, '#15803d');
    px(ctx, 10, 12, 52, 8, '#166534');
    // High snow-capped Langtang Lirung & Purugu Glacier massif on upper-right!
    px(ctx, 38, 7, 24, 9, '#64748b');
    px(ctx, 42, 5, 16, 6, '#e2e8f0');
    px(ctx, 46, 4, 8, 4, '#ffffff');
    // Glowing fiber-optic Lhende -> Bhote Koshi + Langtang Khola river confluence!
    const pulseCol = animFrame % 2 === 0 ? '#38bdf8' : '#facc15';
    px(ctx, 20, 7, 3, 20, pulseCol); // N->S Bhote Koshi
    px(ctx, 22, 21, 24, 2, '#38bdf8'); // E->W Langtang Khola joining at Syabrubesi!
    px(ctx, 45, 9, 3, 6, '#ef4444'); // Red Purugu detachment LED!
    // Brass plaque on front apron
    px(ctx, 4, 30, 64, 4, '#475569');
    px(ctx, 26, 31, 20, 2, '#facc15');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'lab_sar_workbench') {
    // METALLIC TRIHEDRAL SAR CORNER REFLECTOR & SURVEY DRONE RIG (48x42 px)!
    const [c, ctx] = makeCanvas(48, 42);
    px(ctx, 2, 36, 44, 5, 'rgba(15, 23, 42, 0.22)');
    px(ctx, 2, 16, 44, 22, '#451a03');
    px(ctx, 4, 18, 40, 10, '#b45309');
    px(ctx, 4, 29, 40, 7, '#78350f');
    // Left: Metallic Aluminum Trihedral SAR Corner Reflector!
    px(ctx, 8, 4, 14, 14, '#1e293b');
    px(ctx, 9, 5, 12, 12, '#94a3b8');
    px(ctx, 10, 6, 9, 9, '#e2e8f0');
    px(ctx, 12, 8, 5, 5, '#ffffff');
    // Right: Himalayan Quadcopter LiDAR/SAR Calibration Drone + Oscilloscope!
    px(ctx, 27, 10, 14, 3, '#334155');
    px(ctx, 31, 8, 6, 6, '#f97316');
    px(ctx, 25, 8, 5, 1, '#38bdf8');
    px(ctx, 38, 8, 5, 1, '#38bdf8');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'lab_seismograph' || kind === 'lab_cryo_unit') {
    // LIVE DRUM SEISMOGRAPH & DHM RIVER STAGE TELEMETRY RACK (30x46 px)
    const [c, ctx] = makeCanvas(30, 46);
    px(ctx, 2, 40, 26, 5, 'rgba(15, 23, 42, 0.22)');
    px(ctx, 3, 4, 24, 38, '#1e293b');
    px(ctx, 5, 6, 20, 34, '#cbd5e1');
    // Rotating white paper drum with red seismic avalanche trace!
    px(ctx, 7, 9, 16, 13, '#0f172a');
    px(ctx, 8, 10, 14, 11, '#fefce8');
    const shift = animFrame % 3;
    px(ctx, 9, 15, 12, 1, '#dc2626');
    px(ctx, 12 + shift, 12, 2, 7, '#dc2626');
    px(ctx, 15 - shift, 13, 2, 5, '#dc2626');
    // Digital river gauge LEDs
    px(ctx, 7, 25, 16, 6, '#0f172a');
    px(ctx, 9, 27, 10, 2, '#22c55e');
    px(ctx, 8, 34, 5, 3, animFrame % 2 === 0 ? '#38bdf8' : '#22c55e');
    px(ctx, 16, 34, 6, 3, '#f59e0b');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'giant_supercomputer') {
    // DHM–NISAR HIMALAYAN 2D/3D COMMAND SUPERCOMPUTER (128x58 px)
    const [c, ctx] = makeCanvas(128, 58);
    const OL = '#1e293b';
    px(ctx, 2, 51, 124, 6, 'rgba(15, 23, 42, 0.28)');
    px(ctx, 2, 4, 124, 48, OL);

    // Carved Himalayan Walnut & Brushed Steel Console Desk
    px(ctx, 4, 30, 120, 11, '#78350f');
    px(ctx, 4, 30, 120, 2, '#b45309');
    // Illuminated Mechanical Console Keyboard, Trackball & Brass Chiya Cup!
    px(ctx, 38, 32, 36, 6, '#0f172a');
    px(ctx, 39, 33, 34, 4, '#cbd5e1');
    px(ctx, 78, 33, 7, 5, '#0f172a');
    px(ctx, 80, 34, 3, 3, '#38bdf8');
    px(ctx, 92, 32, 5, 5, '#eab308'); // Brass Nepali chiya cup!

    px(ctx, 4, 41, 120, 9, '#334155');
    for (const dx of [10, 44, 78, 102]) {
      px(ctx, dx, 43, 16, 6, '#475569');
      px(ctx, dx + 6, 45, 4, 1, '#38bdf8');
    }

    // Left & Right Dark Slate NISAR Telemetry Server Racks
    for (const tx of [5, 105]) {
      px(ctx, tx, 5, 18, 26, OL);
      px(ctx, tx + 2, 7, 14, 22, '#334155');
      px(ctx, tx + 4, 10, 10, 2, '#38bdf8');
      px(ctx, tx + 4, 14, 10, 2, '#94a3b8');
      px(ctx, tx + 4, 18, 10, 2, '#94a3b8');
      px(ctx, tx + 4, 23, 4, 3, animFrame % 2 === 0 ? '#22c55e' : '#38bdf8');
      px(ctx, tx + 10, 23, 4, 3, animFrame % 2 === 1 ? '#facc15' : '#ef4444');
    }

    // Center Panoramic 3-Screen 2D/3D NISAR Display!
    px(ctx, 25, 4, 78, 27, OL);
    px(ctx, 27, 6, 74, 23, '#94a3b8');
    px(ctx, 29, 8, 70, 19, '#04101f');

    // Left Screen: L-Band InSAR Fringes
    px(ctx, 31, 10, 18, 15, '#0c2844');
    px(ctx, 33, 11, 14, 13, '#a855f7');
    px(ctx, 35, 13, 10, 9, '#ec4899');
    px(ctx, 37, 15, 6, 5, '#38bdf8');
    px(ctx, 39, 16, 2, 3, '#facc15');

    // Center Screen: 3D Extruded Langtang Lirung + Sweeping NISAR Swath
    px(ctx, 51, 10, 28, 15, '#082038');
    px(ctx, 62, 11, 6, 3, '#f8fafc');
    px(ctx, 59, 14, 12, 3, '#bae6fd');
    px(ctx, 56, 17, 18, 4, '#0284c7');
    px(ctx, 53, 21, 24, 3, '#10b981');
    const sweepX = 31 + ((animFrame * 14) % 64);
    px(ctx, sweepX, 9, 2, 17, 'rgba(250, 204, 21, 0.9)');

    // Right Screen: S-Band & River Surge Bars
    px(ctx, 81, 11, 15, 3, '#4ade80');
    px(ctx, 81, 16, 10 + (animFrame % 5), 3, '#38bdf8');
    px(ctx, 81, 21, 13, 3, '#f43f5e');

    propCache.set(key, c);
    return c;
  }

  if (kind === 'hydro_dam') {
    const [c, ctx] = makeCanvas(96, 60);
    const OL = '#1e293b';
    px(ctx, 2, 4, 92, 54, OL);
    px(ctx, 4, 6, 88, 50, '#94a3b8');
    px(ctx, 4, 6, 88, 7, '#e2e8f0');
    px(ctx, 6, 4, 84, 2, '#dc2626');
    const shift = (animFrame * 3) % 8;
    for (const sx of [14, 40, 66]) {
      px(ctx, sx - 2, 14, 20, 42, '#475569');
      px(ctx, sx, 16, 16, 38, '#155e75');
      px(ctx, sx + 2, 18 + shift, 12, 6, '#67e8f9');
      px(ctx, sx + 3, 32 + shift, 10, 6, '#ffffff');
    }
    propCache.set(key, c);
    return c;
  }

  if (kind === 'radar_beacon') {
    const [c, ctx] = makeCanvas(24, 30);
    px(ctx, 4, 25, 16, 4, 'rgba(18, 48, 26, 0.42)');
    px(ctx, 6, 18, 3, 9, '#334155');
    px(ctx, 15, 18, 3, 9, '#334155');
    px(ctx, 11, 11, 2, 15, '#cbd5e1');
    px(ctx, 4, 4, 16, 11, '#1e293b');
    px(ctx, 5, 5, 14, 9, '#0ea5e9');
    px(ctx, 7, 6, 10, 7, '#7dd3fc');
    px(ctx, 9, 7, 6, 4, '#f0f9ff');
    px(ctx, 10, 1, 4, 3, animFrame % 2 === 0 ? '#4ade80' : '#facc15');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'helicopter') {
    // Nepali NDRRMA / Army Mountain Rescue Helicopter!
    const [c, ctx] = makeCanvas(52, 36);
    px(ctx, 8, 29, 34, 5, 'rgba(18, 48, 26, 0.4)');
    px(ctx, 11, 29, 26, 2, '#334155');
    px(ctx, 15, 26, 2, 3, '#475569');
    px(ctx, 29, 26, 2, 3, '#475569');
    px(ctx, 34, 16, 13, 5, '#365314');
    px(ctx, 44, 11, 5, 9, '#1e293b');
    px(ctx, 45, 12, 3, 7, '#facc15');
    px(ctx, 11, 11, 24, 15, '#1e293b');
    px(ctx, 12, 12, 22, 13, '#3f6212'); // Nepali rescue olive-green & high-vis orange stripe!
    px(ctx, 12, 20, 22, 3, '#f97316');
    px(ctx, 12, 14, 11, 7, '#7dd3fc');
    px(ctx, 26, 15, 6, 5, '#ffffff');
    px(ctx, 28, 16, 2, 3, '#dc2626');
    px(ctx, 22, 6, 3, 5, '#475569');
    const bladeW = animFrame % 2 === 0 ? 44 : 26;
    px(ctx, 23 - bladeW / 2, 5, bladeW, 2, '#1e293b');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'prayer_flags') {
    const [c, ctx] = makeCanvas(48, 24);
    px(ctx, 2, 4, 2, 19, '#5c381c');
    px(ctx, 44, 4, 2, 19, '#5c381c');
    px(ctx, 4, 6, 40, 1, '#f8fafc');
    ['#3b82f6', '#f8fafc', '#ef4444', '#22c55e', '#eab308'].forEach((col, i) => {
      const fy = 7 + ((animFrame + i) % 2);
      px(ctx, 6 + i * 8, fy, 6, 5, col);
    });
    propCache.set(key, c);
    return c;
  }

  if (kind === 'agenu_hearth') {
    // Traditional Tamang Indoor Clay-and-Stone Agenu Fire Hearth + Brass Chiya Kettle! (40x36 px)
    const [c, ctx] = makeCanvas(40, 36);
    px(ctx, 4, 8, 32, 24, '#57534e');
    px(ctx, 6, 10, 28, 20, '#a84c32'); // Rato-mato clay hearth base
    px(ctx, 11, 14, 18, 12, '#1c1917');
    // Flickering wood fire embers!
    const fH = animFrame % 2 === 0 ? 7 : 5;
    px(ctx, 14, 23 - fH, 12, fH, '#ea580c');
    px(ctx, 16, 23 - fH + 1, 8, fH - 1, '#facc15');
    // Iron tripod + brass Nepali tea kettle (Chiya/Karwa)
    px(ctx, 15, 9, 10, 8, '#ca8a04');
    px(ctx, 16, 10, 6, 5, '#fde047');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'tea_counter') {
    // Tamang Tea-House Carved Wooden Shelf, Butter-Tea Thermoses & Woven Muda Stools (36x64 px)!
    const [c, ctx] = makeCanvas(36, 64);
    px(ctx, 13, 2, 20, 58, '#3b1d0a');
    px(ctx, 15, 4, 16, 52, '#92400e');
    px(ctx, 15, 4, 3, 52, '#b45309');
    // Brass bowls & red Tibetan tea thermos on counter
    px(ctx, 19, 8, 7, 11, '#dc2626');
    px(ctx, 20, 9, 5, 3, '#fde047');
    px(ctx, 19, 25, 6, 5, '#eab308');
    // Two woven bamboo Muda stools beside counter!
    for (const sy of [18, 38]) {
      px(ctx, 1, sy, 10, 10, '#451a03');
      px(ctx, 2, sy + 1, 8, 8, '#d97706');
      px(ctx, 2, sy + 4, 8, 2, '#991b1b');
    }
    propCache.set(key, c);
    return c;
  }

  if (kind === 'indoor_plants') {
    // Brass Nepali Gamala / Copper Vessels with Blooming Crimson Laliguras! (32x34 px)
    const [c, ctx] = makeCanvas(32, 34);
    px(ctx, 2, 14, 28, 16, '#451a03');
    px(ctx, 4, 16, 24, 12, '#78350f');
    for (const fx of [6, 18]) {
      px(ctx, fx, 15, 8, 8, '#b45309');
      px(ctx, fx + 1, 16, 6, 6, '#f59e0b');
      drawLeafPuff(ctx, fx + 4, 10, 5, '#14381c', '#1e5828', '#388e3c', '#76c858');
      px(ctx, fx + 2, 7, 3, 2, '#e11d48');
      px(ctx, fx + 5, 9, 3, 2, '#fb7185');
    }
    propCache.set(key, c);
    return c;
  }

  // ==========================================================================
  // GLOBAL REGION 2: BRAZIL (PANTANAL & AMAZON) BUILDINGS & CULTURAL PROPS
  // ==========================================================================
  if (kind === 'palafita_house') {
    // Authentic Amazon/Pantanal Elevated Wooden Stilt House (Palafita — 80x76 px)!
    const [c, ctx] = makeCanvas(80, 76);
    const OL = '#24160c';
    // Tall hardwood stilts standing over seasonal floodplain water
    for (const sx of [12, 28, 50, 66]) {
      px(ctx, sx, 52, 4, 22, OL);
      px(ctx, sx + 1, 52, 2, 21, '#784c28');
    }
    px(ctx, 8, 60, 64, 2, '#5c381c'); // Cross-bracing beam
    // Elevated wooden deck + front ladder
    px(ctx, 6, 48, 68, 6, OL);
    px(ctx, 8, 49, 64, 4, '#b47b44');
    px(ctx, 36, 52, 8, 22, '#5c381c');
    for (let ly = 55; ly <= 71; ly += 4) px(ctx, 37, ly, 6, 1, '#eab308');
    // Painted tropical timber walls (warm sky-turquoise & ochre trim)
    px(ctx, 10, 24, 60, 25, OL);
    px(ctx, 12, 26, 56, 22, '#38bdf8');
    px(ctx, 12, 40, 56, 8, '#0284c7');
    // Colorful woven hammock on porch!
    px(ctx, 50, 35, 14, 5, '#f43f5e');
    px(ctx, 52, 37, 10, 3, '#fde047');
    // Doorway & shuttered windows
    px(ctx, 33, 30, 14, 18, '#451a03');
    px(ctx, 35, 32, 10, 16, '#1c1917');
    px(ctx, 17, 30, 10, 9, '#fef08a');
    // Palm-thatch / clay hipped roof
    for (let i = 0; i < 16; i++) {
      px(ctx, 4 + i * 2, 24 - i, 72 - i * 4, 2, i % 3 === 0 ? '#92400e' : '#b45309');
    }
    px(ctx, 28, 7, 24, 3, '#78350f');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'inpe_nisar_estacao') {
    // INPE–IBAMA–NISAR Pantanal Field Estação on Flood Stilts (112x88 px)!
    const [c, ctx] = makeCanvas(112, 88);
    const OL = '#1e293b';
    for (const sx of [14, 36, 72, 94]) {
      px(ctx, sx, 68, 5, 18, '#334155');
    }
    px(ctx, 8, 64, 96, 5, '#92400e');
    px(ctx, 10, 30, 92, 35, OL);
    px(ctx, 12, 32, 88, 32, '#f8fafc');
    px(ctx, 12, 52, 88, 12, '#15803d'); // Brazilian emerald band
    px(ctx, 12, 50, 88, 2, '#facc15');  // Gold stripe
    // Roof + Solar + L-Band Canopy Radar Dish + Brazilian Flag!
    for (let i = 0; i < 14; i++) {
      px(ctx, 6 + i * 2, 30 - i, 100 - i * 4, 2, i % 2 === 0 ? '#0f766e' : '#115e59');
    }
    // Brazilian Flag (Green + Yellow diamond + Blue orb)
    px(ctx, 18, 4, 2, 18, '#cbd5e1');
    px(ctx, 20, 5, 14, 9, '#16a34a');
    px(ctx, 23, 7, 8, 5, '#facc15');
    px(ctx, 25, 8, 4, 3, '#1d4ed8');
    // Rotating L-band dish
    px(ctx, 80, 6, 16, 10, '#e2e8f0');
    px(ctx, 86, 3, 4, 3, animFrame % 2 === 0 ? '#22c55e' : '#38bdf8');
    // Signboard & Entry Door
    px(ctx, 32, 34, 48, 8, '#064e3b');
    px(ctx, 34, 36, 44, 4, '#fde047');
    px(ctx, 48, 45, 16, 19, '#1e293b');
    px(ctx, 50, 47, 12, 17, '#0f172a');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'wooden_canoe') {
    const [c, ctx] = makeCanvas(48, 22);
    px(ctx, 4, 8, 40, 9, '#451a03');
    px(ctx, 2, 10, 44, 5, '#78350f');
    px(ctx, 6, 9, 36, 6, '#b45309');
    px(ctx, 14, 10, 20, 4, '#d97706');
    px(ctx, 18, 5, 16, 2, '#fde047'); // Wooden paddle
    propCache.set(key, c);
    return c;
  }

  if (kind === 'ipe_amarelo_tree') {
    // Blazing Golden Ipê-Amarelo Canopy Tree of Brazil (36x44 px)!
    const [c, ctx] = makeCanvas(36, 44);
    px(ctx, 8, 36, 20, 6, 'rgba(12, 36, 20, 0.35)');
    px(ctx, 15, 24, 6, 15, '#4a2e16');
    drawLeafPuff(ctx, 18, 16, 13, '#713f12', '#ca8a04', '#eab308', '#facc15', '#fef08a');
    drawLeafPuff(ctx, 11, 19, 8, '#713f12', '#ca8a04', '#facc15', '#fef08a');
    drawLeafPuff(ctx, 25, 19, 8, '#713f12', '#ca8a04', '#facc15', '#fef08a');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'peat_drainage_scar') {
    // Sub-Canopy Selective Logging Stumps & Drained Smoldering Peat Fissures (64x48 px)
    const [c, ctx] = makeCanvas(64, 48);
    px(ctx, 4, 6, 56, 36, '#3b2818');
    px(ctx, 10, 10, 44, 28, '#291c12');
    // Cut timber stumps hidden beneath canopy
    for (const [sx, sy] of [[14, 14], [42, 16], [26, 30]]) {
      px(ctx, sx, sy, 9, 7, '#78350f');
      px(ctx, sx + 1, sy + 1, 7, 4, '#fde68a');
    }
    // Glowing orange dry-peat fissure!
    px(ctx, 18, 22, 26, 3, animFrame % 2 === 0 ? '#ea580c' : '#facc15');
    propCache.set(key, c);
    return c;
  }

  // ==========================================================================
  // GLOBAL REGION 3: CALIFORNIA (SAN JOAQUIN VALLEY) BUILDINGS & PROPS
  // ==========================================================================
  if (kind === 'usgs_hydro_lab') {
    // USGS–SGMA–NISAR Central Valley Hydro-Observatory (112x84 px)!
    const [c, ctx] = makeCanvas(112, 84);
    px(ctx, 8, 28, 96, 50, '#1e293b');
    px(ctx, 10, 30, 92, 46, '#f5ebd6'); // Warm California mission stucco
    for (let i = 0; i < 13; i++) {
      px(ctx, 6 + i * 2, 28 - i, 100 - i * 4, 2, i % 2 === 0 ? '#b45309' : '#9a3412'); // Terracotta tile roof
    }
    // Continuous GNSS / InSAR Corner Reflector + US/California Flag
    px(ctx, 20, 5, 14, 10, '#1d4ed8');
    px(ctx, 24, 5, 10, 6, '#dc2626');
    px(ctx, 80, 6, 14, 10, '#38bdf8');
    px(ctx, 32, 34, 48, 8, '#1e3a8a');
    px(ctx, 34, 36, 44, 4, '#fde047');
    px(ctx, 48, 52, 16, 24, '#451a03');
    px(ctx, 50, 54, 12, 22, '#0f172a');
    for (const wx of [18, 76]) {
      px(ctx, wx, 46, 16, 14, '#0284c7');
      px(ctx, wx + 2, 48, 12, 10, '#bae6fd');
    }
    propCache.set(key, c);
    return c;
  }

  if (kind === 'campesino_coop_hall') {
    // Cooperativa Campesina Community Water Hall with Festive Papel Picado! (88x72 px)
    const [c, ctx] = makeCanvas(88, 72);
    px(ctx, 6, 24, 76, 44, '#451a03');
    px(ctx, 8, 26, 72, 40, '#fde68a');
    for (let i = 0; i < 12; i++) {
      px(ctx, 4 + i * 2, 24 - i, 80 - i * 4, 2, i % 2 === 0 ? '#c2410c' : '#9a3412');
    }
    // Colorful Mexican Papel Picado banners along porch!
    ['#ef4444', '#22c55e', '#3b82f6', '#ec4899', '#eab308', '#14b8a6'].forEach((col, i) => {
      px(ctx, 12 + i * 11, 28, 8, 5, col);
    });
    px(ctx, 36, 44, 16, 22, '#78350f');
    px(ctx, 38, 46, 12, 20, '#1c1917');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'steel_water_silo') {
    const [c, ctx] = makeCanvas(40, 56);
    px(ctx, 6, 12, 28, 40, '#334155');
    px(ctx, 8, 14, 24, 36, '#cbd5e1');
    for (let y = 18; y <= 46; y += 5) px(ctx, 8, y, 24, 1, '#94a3b8');
    px(ctx, 10, 6, 20, 6, '#64748b');
    px(ctx, 14, 3, 12, 3, '#e2e8f0');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'almond_tree') {
    // Blooming Pink-and-White California Almond Orchard Tree (32x38 px)
    const [c, ctx] = makeCanvas(32, 38);
    px(ctx, 13, 22, 6, 13, '#5c381c');
    drawLeafPuff(ctx, 16, 14, 11, '#831843', '#db2777', '#f472b6', '#fbcfe8', '#ffffff');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'subsidence_pole') {
    // Iconic USGS San Joaquin "1925 -> 1977 -> 2026" Subsidence Pole + Cracked Canal Scar (48x64 px)!
    const [c, ctx] = makeCanvas(48, 64);
    px(ctx, 4, 46, 40, 14, '#78716c');
    px(ctx, 10, 50, 28, 4, '#1c1917'); // Subsidence tension crack!
    // Tall benchmark pole with year elevation signs!
    px(ctx, 22, 2, 4, 56, '#451a03');
    px(ctx, 12, 5, 24, 7, '#f8fafc');
    px(ctx, 14, 7, 20, 3, '#dc2626'); // 1925 level at top!
    px(ctx, 12, 24, 24, 7, '#f8fafc');
    px(ctx, 14, 26, 20, 3, '#2563eb'); // 1977 level
    px(ctx, 12, 42, 24, 7, '#fef08a');
    px(ctx, 14, 44, 20, 3, '#16a34a'); // 2026 level
    propCache.set(key, c);
    return c;
  }

  // ==========================================================================
  // GLOBAL REGION 4: TÜRKIYE (ANTAKYA / ANATOLIA) BUILDINGS & CULTURAL PROPS
  // ==========================================================================
  if (kind === 'antakya_courtyard_house') {
    // Historic Antakya Carved Limestone Havuş House with Arched Windows & Terracotta Roof (80x72 px)!
    const [c, ctx] = makeCanvas(80, 72);
    px(ctx, 6, 22, 68, 46, '#44403c');
    px(ctx, 8, 24, 64, 42, '#f5ebd6'); // Cream cut Antakya stone
    px(ctx, 8, 44, 64, 2, '#a8a29e');
    // Wrought-iron Cumba balcony
    px(ctx, 26, 30, 28, 12, '#78350f');
    px(ctx, 28, 32, 24, 8, '#fde68a');
    // Twin stone arches & arched wooden door
    px(ctx, 33, 47, 14, 19, '#5c381c');
    px(ctx, 15, 48, 11, 12, '#0ea5e9');
    px(ctx, 54, 48, 11, 12, '#0ea5e9');
    for (let i = 0; i < 12; i++) {
      px(ctx, 4 + i * 2, 22 - i, 72 - i * 4, 2, i % 2 === 0 ? '#dc2626' : '#b91c1c');
    }
    propCache.set(key, c);
    return c;
  }

  if (kind === 'kandilli_nisar_lab') {
    // AFAD–Kandilli–NISAR Tectonic Observatory with Turkish Flag & GNSS Radome (112x84 px)!
    const [c, ctx] = makeCanvas(112, 84);
    px(ctx, 8, 28, 96, 50, '#1e293b');
    px(ctx, 10, 30, 92, 46, '#e7e5e4');
    px(ctx, 10, 30, 92, 6, '#dc2626');
    for (let i = 0; i < 12; i++) {
      px(ctx, 6 + i * 2, 28 - i, 100 - i * 4, 2, '#475569');
    }
    // Turkish Flag (Red + White Crescent/Star)
    px(ctx, 18, 4, 2, 16, '#cbd5e1');
    px(ctx, 20, 5, 14, 9, '#dc2626');
    px(ctx, 24, 7, 4, 5, '#ffffff');
    px(ctx, 26, 8, 3, 3, '#dc2626');
    px(ctx, 29, 9, 2, 2, '#ffffff');
    // GNSS Geodetic Dome
    px(ctx, 82, 8, 12, 8, '#f8fafc');
    px(ctx, 48, 52, 16, 24, '#1e293b');
    px(ctx, 50, 54, 12, 22, '#0f172a');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'cay_evi_teahouse') {
    // Traditional Anatolian Çay Evi (Tea House) with Stone Arches & Crimson Awning (84x70 px)!
    const [c, ctx] = makeCanvas(84, 70);
    px(ctx, 6, 22, 72, 44, '#44403c');
    px(ctx, 8, 24, 68, 40, '#ede0c8');
    // Striped red-and-white Turkish tea awning
    for (let x = 8; x < 74; x += 8) {
      px(ctx, x, 36, 4, 6, '#dc2626');
      px(ctx, x + 4, 36, 4, 6, '#ffffff');
    }
    for (let i = 0; i < 11; i++) {
      px(ctx, 4 + i * 2, 22 - i, 76 - i * 4, 2, '#b45309');
    }
    px(ctx, 35, 45, 14, 19, '#451a03');
    px(ctx, 37, 47, 10, 17, '#1c1917');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'olive_tree') {
    // Ancient Mediterranean Silver-Green Olive Tree (32x38 px)
    const [c, ctx] = makeCanvas(32, 38);
    px(ctx, 13, 22, 6, 13, '#57534e');
    drawLeafPuff(ctx, 16, 14, 11, '#365314', '#4d7c0f', '#84cc16', '#bef264', '#ecfccb');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'fault_rupture_scar') {
    // Co-Seismic Left-Lateral Strike-Slip Ground Rupture Offsetting Stone Wall (72x44 px)!
    const [c, ctx] = makeCanvas(72, 44);
    px(ctx, 4, 16, 64, 12, '#44403c');
    px(ctx, 6, 19, 60, 6, '#1c1917'); // Deep fault trench
    // Displaced stone wall showing 4.5m left-lateral offset!
    px(ctx, 18, 2, 8, 16, '#d6d3d1');
    px(ctx, 44, 26, 8, 16, '#d6d3d1');
    px(ctx, 26, 20, 20, 2, '#ef4444');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'samovar_hearth') {
    // Traditional Brass Turkish Tea Semaver & Tulip Glasses! (40x36 px)
    const [c, ctx] = makeCanvas(40, 36);
    px(ctx, 6, 14, 28, 18, '#78350f');
    px(ctx, 15, 4, 10, 16, '#eab308');
    px(ctx, 17, 6, 6, 12, '#fef08a');
    px(ctx, 9, 16, 4, 5, '#dc2626'); // Crimson tulip tea glass
    px(ctx, 27, 16, 4, 5, '#dc2626');
    propCache.set(key, c);
    return c;
  }

  // ==========================================================================
  // GLOBAL REGION 5: ALASKA (YUP'IK TUNDRA COAST) BUILDINGS & PROPS
  // ==========================================================================
  if (kind === 'yupik_stilt_house') {
    // Authentic Yup'ik Tundra House Elevated on Adjustable Permafrost Pilings (80x72 px)!
    const [c, ctx] = makeCanvas(80, 72);
    for (const sx of [12, 28, 50, 66]) {
      px(ctx, sx, 54, 4, 15, '#475569'); // Steel thermosyphon permafrost pilings!
      px(ctx, sx - 1, 56, 6, 2, '#94a3b8'); // Radiator fins
    }
    px(ctx, 8, 24, 64, 30, '#1e293b');
    px(ctx, 10, 26, 60, 26, '#38bdf8'); // Bright Arctic sky-blue insulated siding
    px(ctx, 10, 44, 60, 8, '#e2e8f0');
    for (let i = 0; i < 12; i++) {
      px(ctx, 6 + i * 2, 24 - i, 68 - i * 4, 2, '#334155');
    }
    px(ctx, 34, 34, 12, 18, '#78350f');
    px(ctx, 36, 36, 8, 16, '#0f172a');
    px(ctx, 34, 52, 12, 16, '#b47b44'); // Boardwalk stairs
    propCache.set(key, c);
    return c;
  }

  if (kind === 'above_arctic_lab') {
    // NASA ABoVE–NISAR Yup'ik Permafrost Observatory on Steel Pilings (112x84 px)!
    const [c, ctx] = makeCanvas(112, 84);
    for (const sx of [16, 38, 72, 92]) {
      px(ctx, sx, 66, 5, 15, '#475569');
    }
    px(ctx, 10, 28, 92, 38, '#1e293b');
    px(ctx, 12, 30, 88, 34, '#f8fafc');
    px(ctx, 12, 52, 88, 12, '#0284c7');
    for (let i = 0; i < 12; i++) {
      px(ctx, 8 + i * 2, 28 - i, 96 - i * 4, 2, '#ea580c'); // High-vis Arctic orange roof!
    }
    // Alaska Flag (Deep Blue + Gold Big Dipper & North Star!)
    px(ctx, 20, 5, 14, 9, '#1e3a8a');
    px(ctx, 30, 6, 2, 2, '#facc15');
    px(ctx, 23, 9, 5, 3, '#facc15');
    px(ctx, 80, 6, 14, 10, '#e2e8f0');
    px(ctx, 48, 46, 16, 18, '#0f172a');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'salmon_smokehouse') {
    // Traditional Yup'ik Cedar Smokehouse & Red Salmon Drying Rack (68x52 px)!
    const [c, ctx] = makeCanvas(68, 52);
    // Spruce fish-drying rack with bright crimson salmon strips!
    px(ctx, 4, 14, 2, 32, '#5c381c');
    px(ctx, 30, 14, 2, 32, '#5c381c');
    px(ctx, 4, 16, 28, 2, '#784c28');
    for (let fx = 7; fx <= 25; fx += 5) {
      px(ctx, fx, 18, 3, 11, '#ef4444');
      px(ctx, fx + 1, 19, 1, 9, '#fca5a5');
    }
    // Cedar smokehouse cabin
    px(ctx, 34, 16, 30, 30, '#451a03');
    px(ctx, 36, 18, 26, 26, '#92400e');
    px(ctx, 46, 6, 4, 10, '#64748b'); // Smoke pipe
    propCache.set(key, c);
    return c;
  }

  if (kind === 'thermokarst_scar') {
    // Active-Layer Permafrost Thaw Slump & Exposed Ice Wedge (64x44 px)!
    const [c, ctx] = makeCanvas(64, 44);
    px(ctx, 4, 6, 56, 32, '#5c4028');
    px(ctx, 10, 10, 44, 24, '#0284c7');
    px(ctx, 16, 14, 32, 14, '#bae6fd'); // Exposed underground ice lens!
    px(ctx, 22, 8, 20, 4, '#ef4444');   // Warped sunken boardwalk plank
    propCache.set(key, c);
    return c;
  }

  if (kind === 'aqueduct_buckle_scar') {
    // Buckled & Subsided Concrete California Aqueduct Liner + Grade Drop Scar (64x36 px)!
    const [c, ctx] = makeCanvas(64, 36);
    px(ctx, 2, 8, 60, 22, '#64748b');
    px(ctx, 4, 10, 26, 18, '#cbd5e1');
    px(ctx, 32, 13, 28, 16, '#94a3b8'); // Subsided concrete slab!
    // Jagged compression buckle & water seepage crack
    px(ctx, 28, 9, 5, 20, '#1e293b');
    px(ctx, 29, 12, 3, 14, '#0284c7');
    px(ctx, 8, 6, 14, 4, '#ef4444'); // Warning grade gauge bar
    px(ctx, 10, 7, 10, 2, '#fef08a');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'cypress_tree') {
    // Tall Columnar Mediterranean Cypress Tree for Hatay / Antakya Hills (28x46 px)
    const [c, ctx] = makeCanvas(28, 46);
    px(ctx, 12, 34, 4, 10, '#44403c');
    for (let y = 4; y <= 34; y++) {
      const halfW = Math.max(2, Math.round(Math.sin(((y - 2) / 34) * Math.PI) * 7.5));
      px(ctx, 14 - halfW, y, halfW * 2, 1, y % 3 === 0 ? '#1e3f20' : '#2d572c');
      px(ctx, 14 - halfW + 1, y, Math.max(1, halfW - 1), 1, '#477840');
    }
    propCache.set(key, c);
    return c;
  }

  // ==========================================================================
  // VISIBLE COMMUNITY INTERVENTION RECOVERY STRUCTURES (POST-ACTION WORLD!)
  // ==========================================================================
  if (kind === 'flood_siren_tower') {
    // Solar-Powered DHM–NISAR Automated Acoustic Early-Warning Mast (32x52 px)
    const [c, ctx] = makeCanvas(32, 52);
    px(ctx, 8, 42, 16, 8, '#475569');
    px(ctx, 14, 10, 4, 34, '#cbd5e1');
    // Solar wing
    px(ctx, 4, 24, 10, 6, '#1d4ed8');
    px(ctx, 5, 25, 8, 4, '#60a5fa');
    // Acoustic horn cluster
    px(ctx, 7, 11, 7, 5, '#eab308');
    px(ctx, 18, 11, 7, 5, '#eab308');
    // Pulsing emerald/cyan active telemetry beacon!
    px(ctx, 13, 4, 6, 6, animFrame % 2 === 0 ? '#4ade80' : '#38bdf8');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'timber_check_dam') {
    // Community Pantanal Corixo Water-Retention Check-Dam & Rewetted Marsh Pool (64x36 px)
    const [c, ctx] = makeCanvas(64, 36);
    px(ctx, 4, 6, 56, 24, '#0d9488');
    px(ctx, 8, 9, 48, 18, '#2dd4bf');
    // Timber check-dam logs holding back clear moisture
    for (let x = 10; x <= 50; x += 6) {
      px(ctx, x, 14, 4, 14, '#78350f');
      px(ctx, x + 1, 15, 2, 12, '#b45309');
    }
    px(ctx, 8, 18, 48, 4, '#92400e');
    // Thriving green sedge shoots
    px(ctx, 12, 8, 6, 4, '#22c55e');
    px(ctx, 44, 9, 7, 4, '#4ade80');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'mar_recharge_basin') {
    // San Joaquin Managed Aquifer Recharge Percolation Gate & Shimmering Basin (64x40 px)
    const [c, ctx] = makeCanvas(64, 40);
    px(ctx, 2, 6, 60, 30, '#a88954');
    px(ctx, 6, 10, 52, 22, '#0284c7');
    px(ctx, 10, 13, 44, 16, animFrame % 2 === 0 ? '#38bdf8' : '#7dd3fc');
    // Concrete turnout headgate
    px(ctx, 26, 2, 12, 10, '#e2e8f0');
    px(ctx, 29, 4, 6, 6, '#22c55e');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'seismic_retrofit_station') {
    // AFAD–Kandilli Strong-Motion Accelerograph & Structural Safety Post (48x44 px)
    const [c, ctx] = makeCanvas(48, 44);
    px(ctx, 6, 26, 36, 14, '#cbd5e1');
    px(ctx, 10, 12, 28, 16, '#f8fafc');
    px(ctx, 12, 14, 24, 5, '#16a34a'); // Certified green structural tag banner
    px(ctx, 22, 3, 4, 10, '#475569');
    px(ctx, 20, 2, 8, 4, animFrame % 2 === 0 ? '#4ade80' : '#facc15');
    propCache.set(key, c);
    return c;
  }

  if (kind === 'thermosyphon_array') {
    // Passive Arctic Permafrost Cooling Thermosyphon Radiator Array (48x48 px)
    const [c, ctx] = makeCanvas(48, 48);
    px(ctx, 4, 34, 40, 10, '#94a3b8');
    for (const sx of [10, 22, 34]) {
      px(ctx, sx, 8, 4, 28, '#e2e8f0');
      for (let fy = 10; fy <= 24; fy += 4) {
        px(ctx, sx - 2, fy, 8, 2, '#38bdf8'); // Sub-zero CO2 condenser fins
      }
    }
    px(ctx, 8, 36, 32, 3, '#22c55e');
    propCache.set(key, c);
    return c;
  }

  const [fb] = makeCanvas(16, 16);
  return fb;
}
