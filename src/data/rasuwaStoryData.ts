import { GlobalWaltzSite, Station, TimelinePass } from '../types';

export const TIMELINE_PASSES: TimelinePass[] = [
  {
    id: 'pass-0',
    index: 0,
    date: "SCENARIO STEP 1",
    shortLabel: "SCENARIO STEP 1",
    orbitPass: "SCENARIO STEP 1",
    phaseTag: 'BASELINE',
    title: 'Calm Before the Monsoon: Intact Trade & Hydropower Corridor',
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    cloudCoverPct: 14,
    puruguCreepMeters: 0.08,
    insarEastMm: 1.2,
    insarVertMm: -0.8,
    riverDischargeMultiplier: 1.0,
    soilMoisturePct: 24,
    bridgeIntact: true,
    hydropowerOperationalPct: 100,
    mentorNarration:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    mentorMood: 'welcome'
  },
  {
    id: 'pass-1',
    index: 1,
    date: "SCENARIO STEP 2",
    shortLabel: "SCENARIO STEP 2",
    orbitPass: "SCENARIO STEP 2",
    phaseTag: 'FLOOD_2025',
    title: "Illustrative surface-change investigation",
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    cloudCoverPct: 88,
    puruguCreepMeters: 0.42,
    insarEastMm: 4.5,
    insarVertMm: -3.4,
    riverDischargeMultiplier: 4.2,
    soilMoisturePct: 68,
    bridgeIntact: false,
    hydropowerOperationalPct: 38,
    mentorNarration:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    mentorMood: 'warning'
  },
  {
    id: 'pass-2',
    index: 2,
    date: "SCENARIO STEP 3",
    shortLabel: "SCENARIO STEP 3",
    orbitPass: "SCENARIO STEP 3",
    phaseTag: 'PRECURSOR',
    title: 'NISAR L-Band Detects Subtle Slope Unrest at Purugu / Langtang Lirung',
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    cloudCoverPct: 79,
    puruguCreepMeters: 0.95,
    insarEastMm: 9.4,
    insarVertMm: -7.1,
    riverDischargeMultiplier: 1.6,
    soilMoisturePct: 54,
    bridgeIntact: true,
    hydropowerOperationalPct: 82,
    mentorNarration:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    mentorMood: 'radar'
  },
  {
    id: 'pass-3',
    index: 3,
    date: "SCENARIO STEP 4",
    shortLabel: "SCENARIO STEP 4",
    orbitPass: "SCENARIO STEP 4",
    phaseTag: 'PRECURSOR',
    title: 'Accelerating Glacial-Bedrock Slip Hidden Behind 94% Monsoon Clouds',
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    cloudCoverPct: 94,
    puruguCreepMeters: 2.65,
    insarEastMm: 17.8,
    insarVertMm: -13.9,
    riverDischargeMultiplier: 2.3,
    soilMoisturePct: 78,
    bridgeIntact: true,
    hydropowerOperationalPct: 78,
    mentorNarration:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    mentorMood: 'radar'
  },
  {
    id: 'pass-4',
    index: 4,
    date: "SCENARIO STEP 5",
    shortLabel: "SCENARIO STEP 5",
    orbitPass: "SCENARIO STEP 5",
    phaseTag: 'CRITICAL_CREEP',
    title: "Illustrative surface-change investigation",
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    cloudCoverPct: 96,
    puruguCreepMeters: 5.35,
    insarEastMm: 24.85,
    insarVertMm: -19.03,
    riverDischargeMultiplier: 2.7,
    soilMoisturePct: 86,
    bridgeIntact: true,
    hydropowerOperationalPct: 75,
    mentorNarration:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    mentorMood: 'warning'
  },
  {
    id: 'pass-5',
    index: 5,
    date: "SCENARIO STEP 6",
    shortLabel: "SCENARIO STEP 6",
    orbitPass: "SCENARIO STEP 6",
    phaseTag: 'CATASTROPHE',
    title: "Illustrative surface-change investigation",
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    cloudCoverPct: 92,
    puruguCreepMeters: 99.0,
    insarEastMm: 999,
    insarVertMm: -999,
    riverDischargeMultiplier: 8.5,
    soilMoisturePct: 97,
    bridgeIntact: false,
    hydropowerOperationalPct: 6,
    mentorNarration:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    mentorMood: 'somber'
  },
  {
    id: 'pass-6',
    index: 6,
    date: "SCENARIO STEP 7",
    shortLabel: "SCENARIO STEP 7",
    orbitPass: "SCENARIO STEP 7",
    phaseTag: 'RECOVERY',
    title: "Illustrative surface-change investigation",
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    cloudCoverPct: 22,
    puruguCreepMeters: 0.35,
    insarEastMm: 2.1,
    insarVertMm: -1.5,
    riverDischargeMultiplier: 1.3,
    soilMoisturePct: 41,
    bridgeIntact: false,
    hydropowerOperationalPct: 28,
    mentorNarration:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    mentorMood: 'eureka'
  }
];

export const RASUWA_STATIONS: Station[] = [
  {
    id: 'syabrubesi',
    code: 'ST-01',
    name: 'Syabrubesi Confluence & Relay',
    nepaliSub: 'स्याफ्रुबेसी • 1,436m • Early Warning Hub',
    lat: 28.1622,
    lon: 85.3372,
    elevationM: 1436,
    u: 0.143,
    v: 0.847,
    iconType: 'relay',
    accentColor: '#38bdf8',
    shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
    humanEconomicStory:
      "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
    nisarInsight:
      "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
    physicalDriverHypothesis: {
      question: "Simulation question: What should an educator request after noticing a radar change?",
      options: ["Dated independent evidence and qualified review", "An automatic evacuation based only on a color", "A claim that every bright pixel is flooded"],
      correctIndex: 0,
      explanation: "A radar pattern supports a question, not a uniquely established cause. Request corroborating evidence before discussing action."
    },
    npcName: 'Pema Tamang',
    npcRole: 'Community Disaster Coordinator',
    npcDialoguePre:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    npcDialoguePost:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    baselineMetrics: {
      hhDb: -14.2,
      hvDb: -21.5,
      coherence: 0.78,
      displacementText: "Simulation: Stable (±1.1 mm)",
      surfaceState: 'Clear river channel & intact town terraces'
    },
    precursorMetrics: {
      hhDb: -12.8,
      hvDb: -19.9,
      coherence: 0.71,
      displacementText: "Simulation: Stable bank (+1.8 mm)",
      surfaceState: 'Monsoon swell; S-band detects 82% soil saturation'
    },
    catastropheMetrics: {
      hhDb: -3.4,
      hvDb: -11.2,
      coherence: 0.14,
      displacementText: "Simulation: Decorrelated (Debris Aggradation +8m)",
      surfaceState: 'Severe inundation, double-bounce urban flooding & sediment fan'
    }
  },
  {
    id: 'chilime',
    code: 'ST-02',
    name: 'Chilime–Goljung Agro & Grid Terrace',
    nepaliSub: 'चिलिमे–गोल्जुङ • 1,640m • Farming & Power',
    lat: 28.208,
    lon: 85.351,
    elevationM: 1640,
    u: 0.196,
    v: 0.629,
    iconType: 'agro',
    accentColor: '#4ade80',
    shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
    humanEconomicStory:
      "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
    nisarInsight:
      "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
    physicalDriverHypothesis: {
      question: "Simulation question: Does a brighter radar return uniquely measure local soil moisture?",
      options: ["No; roughness, vegetation and viewing geometry also matter", "Yes; every bright pixel is saturated soil", "Yes; a color is a direct volumetric moisture measurement"],
      correctIndex: 0,
      explanation: "Radar responds to several surface properties. This toy wetness layer is not a retrieval of volumetric moisture."
    },
    npcName: 'Dawa Gyaljen',
    npcRole: 'Terrace Farmer & Micro-Grid Tech',
    npcDialoguePre:
      "Fictional dialogue: Watch our terraces turn bright in S-band as monsoon rain soaks the soil! Healthy crops and transmission towers keep the whole district running.",
    npcDialoguePost:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    baselineMetrics: {
      hhDb: -10.6,
      hvDb: -15.4,
      coherence: 0.74,
      displacementText: "Simulation: Stable (-0.9 mm)",
      surfaceState: 'Healthy canopy volume scatter (HV) & moderate soil moisture'
    },
    precursorMetrics: {
      hhDb: -7.9,
      hvDb: -13.8,
      coherence: 0.62,
      displacementText: "Simulation: Shallow creep (-4.2 mm)",
      surfaceState: 'High dielectric soil wetness (86%) raising HH/VV return'
    },
    catastropheMetrics: {
      hhDb: -5.1,
      hvDb: -18.7,
      coherence: 0.21,
      displacementText: "Simulation: GullyToe Undercut (-1.4 m)",
      surfaceState: 'HV drop from stripped riparian forest; rough boulder scar'
    }
  },
  {
    id: 'timure',
    code: 'ST-03',
    name: 'Timure Settlement & Highway Gorge',
    nepaliSub: 'टिमुरे • 1,821m • Heritage Trade Town',
    lat: 28.2529,
    lon: 85.3685,
    elevationM: 1821,
    u: 0.264,
    v: 0.415,
    iconType: 'village',
    accentColor: '#fb923c',
    shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
    humanEconomicStory:
      "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
    nisarInsight:
      "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
    physicalDriverHypothesis: {
      question: "Simulation question: Can two radar viewing directions guarantee visibility in a steep gorge?",
      options: ["No; check layover, shadow and quality masks", "Yes; they see every surface", "No quality information is ever necessary"],
      correctIndex: 0,
      explanation: "Additional geometry can help interpretation but does not guarantee complete coverage or remove every ambiguity."
    },
    npcName: 'Aama Dolma',
    npcRole: 'Timure Tea-House Elder',
    npcDialoguePre:
      "Fictional dialogue: Generations of traders walked past Timure’s prayer flags between Kathmandu and Kyirong. Never have the summer rains felt so warm high on the peaks.",
    npcDialoguePost:
      "Fictional dialogue: The mountain roared at night when no eye could see. Promise me your radar map will speak for small mountain towns like ours.",
    baselineMetrics: {
      hhDb: -6.8,
      hvDb: -14.9,
      coherence: 0.84,
      displacementText: "Simulation: Coherent urban (+0.5 mm)",
      surfaceState: 'Strong dihedral building returns & intact highway bench'
    },
    precursorMetrics: {
      hhDb: -6.5,
      hvDb: -14.4,
      coherence: 0.76,
      displacementText: "Simulation: Roadcut creep (-6.8 mm)",
      surfaceState: 'Highway cut-slope moisture seepage detected'
    },
    catastropheMetrics: {
      hhDb: -4.2,
      hvDb: -12.1,
      coherence: 0.11,
      displacementText: "Simulation: Severe Decorrelation (CCD Damage Alert)",
      surfaceState: 'Debris fan overtopping lower town & severed Pasang Lhamu Hwy'
    }
  },
  {
    id: 'rasuwagadhi_hydro',
    code: 'ST-04',
    name: '111 MW Rasuwagadhi Hydro & Dry Port',
    nepaliSub: 'रसुवागढी जलविद्युत • 1,825m • Energy & Port',
    lat: 28.2705,
    lon: 85.375,
    elevationM: 1825,
    u: 0.289,
    v: 0.331,
    iconType: 'hydro',
    accentColor: '#facc15',
    shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
    humanEconomicStory:
      "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
    nisarInsight:
      "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
    physicalDriverHypothesis: {
      question: "Simulation question: Can this simulator determine a safe dam-gate setting?",
      options: ["No; qualified engineers and independent records are required", "Yes; the game checklist is an engineering model", "Yes; a checkbox connects the real dam"],
      correctIndex: 0,
      explanation: "The game has no engineering flow model, real gauge integration or validated operational thresholds."
    },
    npcName: 'Er. Bikash Adhikari',
    npcRole: 'Hydropower Civil Engineer',
    npcDialoguePre:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    npcDialoguePost:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    baselineMetrics: {
      hhDb: 1.8,
      hvDb: -13.2,
      coherence: 0.89,
      displacementText: "Simulation: Engineered rock (+0.2 mm)",
      surfaceState: 'Crisp metallic corner reflections from dam & EV port yard'
    },
    precursorMetrics: {
      hhDb: 1.4,
      hvDb: -12.9,
      coherence: 0.83,
      displacementText: "Simulation: Stable dam; upstream warning!",
      surfaceState: 'Local dam stable while upstream Purugu creep accelerates'
    },
    catastropheMetrics: {
      hhDb: -5.8,
      hvDb: -9.6,
      coherence: 0.09,
      displacementText: "Simulation: Headworks & Port Inundated",
      surfaceState: 'Metallic reflectors lost under coarse boulder-debris sheet'
    }
  },
  {
    id: 'miteri_bridge',
    code: 'ST-05',
    name: 'Miteri Bridge & Lhende Border Gorge',
    nepaliSub: 'मितेरी पुल • 1,831m • Nepal–China Crossing',
    lat: 28.2825,
    lon: 85.382,
    elevationM: 1831,
    u: 0.315,
    v: 0.274,
    iconType: 'bridge',
    accentColor: '#f43f5e',
    shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
    humanEconomicStory:
      "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
    nisarInsight:
      "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
    physicalDriverHypothesis: {
      question: "Simulation question: Does a local photo filename establish the event and acquisition date?",
      options: ["No; verify the original source and metadata", "Yes; filenames are authoritative observations", "Yes; a supplied credit string proves the exact location"],
      correctIndex: 0,
      explanation: "A source link, author, date, location and permissions are required. Unverified assets are illustrations, not ground truth."
    },
    npcName: 'Inspector Suman Karki',
    npcRole: 'Border Customs & Rescue Liaison',
    npcDialoguePre:
      "Fictional dialogue: Hundreds of electric vehicles and cargo trucks cross Miteri Bridge weekly. Notice how clearly the bridge span stands out over the canyon!",
    npcDialoguePost:
      "Fictional dialogue: Twice in fourteen months the Lhende Khola swallowed the crossing. Cross-border satellite data sharing across the Himalaya is the only way forward.",
    baselineMetrics: {
      hhDb: 3.1,
      hvDb: -14.1,
      coherence: 0.86,
      displacementText: "Simulation: Bridge Span Intact",
      surfaceState: 'Bright bridge deck & abutment return across narrow river'
    },
    precursorMetrics: {
      hhDb: 0.9,
      hvDb: -13.5,
      coherence: 0.79,
      displacementText: "Simulation: Temporary crossing active",
      surfaceState: 'Rising Lhende Khola discharge & turbidity roughness'
    },
    catastropheMetrics: {
      hhDb: -6.4,
      hvDb: -8.9,
      coherence: 0.07,
      displacementText: "Simulation: Span Swept Away / Channel +140m Wide",
      surfaceState: 'Bridge echo absent; massive rough boulder-choked channel'
    }
  },
  {
    id: 'purugu_glacier',
    code: 'ST-06',
    name: 'Schematic glacier headwall (location unverified)',
    nepaliSub: 'पुरुगु / लाङटाङ लिरुङ • 5,366m–7,160m • Source Zone',
    lat: 28.284,
    lon: 85.492,
    elevationM: 5366,
    u: 0.739,
    v: 0.267,
    iconType: 'glacier',
    accentColor: '#c084fc',
    shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
    humanEconomicStory:
      "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
    nisarInsight:
      "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
    physicalDriverHypothesis: {
      question: "Simulation question: What change does repeat-pass InSAR constrain?",
      options: ["Line-of-sight phase change, subject to geometry and coherence", "Exact earthquake or landslide timing", "A unique East/vertical displacement pair from one viewing direction"],
      correctIndex: 0,
      explanation: "Line-of-sight change is not a unique vector displacement. Phase wrapping, coherence and physical interpretation are distinct issues; a longer wavelength does not guarantee coherence."
    },
    npcName: 'Dr. Rudra’s Field Beacon',
    npcRole: 'Autonomous Cryosphere Transponder',
    npcDialoguePre:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    npcDialoguePost:
      "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
    baselineMetrics: {
      hhDb: -8.4,
      hvDb: -16.2,
      coherence: 0.81,
      displacementText: "Simulation: +1.2 mm East / -0.8 mm Vert",
      surfaceState: 'Frozen dry snow/ice (low dielectric loss, deep L-band penetration)'
    },
    precursorMetrics: {
      hhDb: -11.9,
      hvDb: -17.8,
      coherence: 0.68,
      displacementText: "Simulation: author-chosen deformation, not a measurement",
      surfaceState: 'CONCENTRIC INSAR FRINGES + wet meltwater lowering backscatter!'
    },
    catastropheMetrics: {
      hhDb: -2.9,
      hvDb: -9.1,
      coherence: 0.05,
      displacementText: "Simulation: author-chosen deformation, not a measurement",
      surfaceState: 'Fresh angular bedrock scar with extreme rough backscatter'
    }
  }
];

// Normalized river polyline coordinates (u, v) tracing the real DEM canyon from Tibet/Purugu -> Lhende -> Rasuwagadhi -> Timure -> Chilime -> Syabrubesi -> South
export const LHENDE_BHOTE_RIVER_PATH: Array<[number, number]> = [
  [0.745, 0.258], // Purugu glacial headwaters
  [0.665, 0.232],
  [0.585, 0.212],
  [0.495, 0.198],
  [0.415, 0.215],
  [0.352, 0.245],
  [0.315, 0.274], // Miteri Bridge
  [0.289, 0.331], // Rasuwagadhi Hydro
  [0.264, 0.415], // Timure
  [0.235, 0.520],
  [0.196, 0.629], // Chilime
  [0.168, 0.742],
  [0.143, 0.847], // Syabrubesi Confluence
  [0.118, 0.935],
  [0.095, 0.995]
];

// Kerung / Northern tributary joining near Rasuwagadhi
export const KERUNG_TRIBUTARY_PATH: Array<[number, number]> = [
  [0.255, 0.020],
  [0.272, 0.110],
  [0.295, 0.195],
  [0.315, 0.274]
];

// Langtang Khola joining from the East into Syabrubesi
export const LANGTANG_KHOLA_PATH: Array<[number, number]> = [
  [0.920, 0.565],
  [0.780, 0.610],
  [0.620, 0.675],
  [0.450, 0.745],
  [0.285, 0.805],
  [0.143, 0.847]
];

export const GLOBAL_WALTZ_SITES: GlobalWaltzSite[] = [
  {
    id: 'rasuwa',
    name: 'Rasuwa–Langtang Corridor',
    country: 'Nepal (Primary Study Area)',
    coords: '28.28°N, 85.38°E',
    changeType: 'Cryosphere Slope Creep & Glacial Cascade Floods',
    bestBand: 'L-Band (24 cm) + S-Band (9 cm)',
    bestPol: 'HH (Double-Bounce Flood) + InSAR Phase/Offset',
    roughnessRole: 'Churning boulder debris & fresh avalanche bedrock scars spike diffuse HH/HV backscatter.',
    dielectricRole: 'Meltwater & monsoon soil saturation (εr ≈ 80) shift surface reflectivity and pore pressure.',
    comparisonToRasuwa:
      'Our flagship study: 12-day L-band interferometry captured >5 m pre-collapse slope motion under 96% monsoon cloud cover before the $2.7B Aug 26, 2026 tragedy.',
    accent: '#c084fc'
  },
  {
    id: 'pantanal',
    name: 'Pantanal & Koshi Floodplains',
    country: 'Brazil / South Asia',
    coords: '17.70°S, 57.38°W',
    changeType: 'Seasonal Wetland Expansion & Sub-Canopy Inundation',
    bestBand: 'L-Band (24 cm)',
    bestPol: 'HH (Canopy-Trunk Double Bounce)',
    roughnessRole: 'Emergent reeds and flooded trees create corner reflectors instead of dark open-water mirrors.',
    dielectricRole: 'Rising water beneath green tree canopies boosts HH return by +6 to +10 dB.',
    comparisonToRasuwa:
      'Just like flooded buildings in Syabrubesi, flooded forests glow bright in L-band HH—tracking ecological wetland rhythms and wildfire recovery.',
    accent: '#38bdf8'
  },
  {
    id: 'amazon',
    name: 'Tapajós Rainforest Frontier',
    country: 'Brazil (Amazonia)',
    coords: '3.25°S, 54.95°W',
    changeType: 'Deforestation, Wildfire Scars & Biomass Loss',
    bestBand: 'L-Band (24 cm)',
    bestPol: 'HV (Cross-Pol Volume Scattering)',
    roughnessRole: 'Intact 3D branches depolarize radar waves (strong HV); cleared pastures look flat and dark in HV.',
    dielectricRole: 'Canopy water content modulates woody biomass backscatter across dry vs wet seasons.',
    comparisonToRasuwa:
      'In Rasuwa, HV polarization loss along the Bhote Koshi canyon similarly mapped riparian pine forests stripped away by the debris surge.',
    accent: '#4ade80'
  },
  {
    id: 'sanjoaquin',
    name: 'San Joaquin & Kathmandu Basins',
    country: 'USA / Nepal',
    coords: '36.60°N, 120.15°W',
    changeType: 'Groundwater Depletion Subsidence & Crop Cycles',
    bestBand: 'L-Band InSAR + S-Band CropPol',
    bestPol: 'VV/VH & Repeat-Pass Interferometry',
    roughnessRole: 'Plowing, crop emergence, and harvest alter S-band backscatter every 12 days.',
    dielectricRole: 'Irrigation spikes topsoil dielectric constant while deep aquifer pumping sinks the land.',
    comparisonToRasuwa:
      'Demonstrates the same centimeter-scale InSAR phase fringes used on Purugu Glacier, applied to slow urban & agricultural land subsidence!',
    accent: '#facc15'
  }
];

