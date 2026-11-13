import {
  IncidentPhotoRecord,
  RASUWA_QUESTS,
  RasuwaQuest,
  REAL_INCIDENT_PHOTOS
} from './rasuwaQuestsAndPhotos';
import { RASUWA_STATIONS, TIMELINE_PASSES } from './rasuwaStoryData';
import { GlobalRegionId } from '../services/nasaEarthDataService';
import { CharacterPaletteId } from '../game/biomePixelArtEngine';
import { Station, TimelinePass } from '../types';

export interface InterventionControlDef {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  optimalMin: number;
  optimalMax: number;
  helpText: string;
}

export interface RegionalInterventionSpec {
  missionTitle: string;
  stakeholderAgency: string;
  challengePrompt: string;
  complementarySensorRequiredLabel: string;
  controls: [InterventionControlDef, InterventionControlDef];
  actionToggleLabel: string;
  successHeadline: string;
  impactMetrics: {
    peopleProtectedLabel: string;
    economicOrEcoSavedLabel: string;
    actionableAdvisorySummary: string;
  };
}

export interface ScientificIntegrityProfile {
  dataProvenanceBadge: string;
  isForwardScenarioSimulated: boolean;
  measuredRadarObservable: string;
  physicalInterpretation: string;
  whyOpticalFails: string;
  whySarAloneIsInsufficient: string;
  complementaryNasaDatasets: string[];
  groundValidationRequired: string;
}

export interface GlobalRegionDefinition {
  id: GlobalRegionId;
  order: number;
  flag: string;
  name: string;
  nativeTitle: string;
  country: string;
  biomeBadge: string;
  lat: number;
  lon: number;
  coordsLabel: string;
  gibsDate: string;
  gibsZoom: number;
  accentColor: string;
  playerPalette: CharacterPaletteId;
  leadScientistName: string;
  leadScientistRole: string;
  labBuildingName: string;
  culturalHallName: string;
  hiddenPhenomenaBadge: string;
  secondaryPhenomena: string[];
  opticalVisibilityPct: number; // How little optical sees! (e.g. 4%..18%)
  sarVisibilityPct: number;     // NISAR + Multi-sensor visibility (e.g. 92%..97%)
  culturalSummary: string;
  communityStakesSummary: string;
  scientificIntegrity: ScientificIntegrityProfile;
  intervention: RegionalInterventionSpec;
  quests: RasuwaQuest[];
  photos: IncidentPhotoRecord[];
  stations: Station[];
  passes: TimelinePass[];
  riverOrFaultPathUV: Array<[number, number]>;
  terrainProfile: 'himalayan_gorge' | 'flooded_canopy' | 'subsidence_valley' | 'strike_slip_fault' | 'permafrost_coast';
}

// ============================================================================
// VERIFIED REGIONAL PHOTOGRAPHS FOR THE 4 NEW GLOBAL REGIONS
// ============================================================================
export const GLOBAL_EXTRA_PHOTOS: Record<Exclude<GlobalRegionId, 'rasuwa_nepal'>, IncidentPhotoRecord[]> = {
  pantanal_brazil: [
    {
      id: 'photo_br_aster_deforestation',
      stationId: 'br_logging_front',
      locationLabel: 'Southern Amazon & Mato Grosso Canopy Frontier',
      nepaliLabel: 'Mato Grosso • Amazônia Meridional (NASA Terra ASTER)',
      dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
      coords: "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence.",
      imageUrl: '/incident_photos/brazil_mato_grosso_nasa.jpg',
      title: 'NASA Satellite View of Intact-Looking Canopy Bordering Fragmented Forest Plots',
      description:
        "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
      nisarCorrelation:
        "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
      credit: "Supplied credit, unverified: NASA Earth Observatory / Terra ASTER via Wikimedia Commons (Public Domain); exact source, date, author and permissions require confirmation.",
      isDisasterCapture: true
    },
    {
      id: 'photo_br_pantanal_river',
      stationId: 'br_peat_channel',
      locationLabel: 'Cuiabá–Paraguai Floodplain & Sub-Canopy Wetlands',
      nepaliLabel: 'Pantanal Matogrossense • Pulso de Inundação',
      dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
      coords: "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence.",
      imageUrl: '/incident_photos/brazil_pantanal_floodplain.jpg',
      title: 'Seasonal Flood-Pulse Channels & Flooded Gallery Forests of the Pantanal',
      description:
        "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
      nisarCorrelation:
        "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
      credit: "Supplied credit, unverified: Wikimedia Commons (CC BY-SA 3.0); exact source, date, author and permissions require confirmation."
    },
    {
      id: 'photo_br_palafita_house',
      stationId: 'br_palafita_vila',
      locationLabel: 'Ribeirinho Elevated Stilt Village (Palafitas)',
      nepaliLabel: 'Comunidade Ribeirinha • Casas de Palafita',
      dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
      coords: "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence.",
      imageUrl: '/incident_photos/brazil_palafita_stilt.jpg',
      title: 'Traditional Elevated Wooden Palafita Architecture Adapted to the Seasonal Waltz',
      description:
        "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
      nisarCorrelation:
        "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
      credit: "Supplied credit, unverified: Wikimedia Commons (CC BY 3.0); exact source, date, author and permissions require confirmation."
    }
  ],
  san_joaquin_usa: [
    {
      id: 'photo_ca_subsidence_pole',
      stationId: 'ca_corcoran_bowl',
      locationLabel: 'San Joaquin Valley Historic Benchmark (1925–Present)',
      nepaliLabel: 'Valle de San Joaquín • Hundimiento del Acuífero',
      dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
      coords: "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence.",
      imageUrl: '/incident_photos/california_subsidence_pole.jpg',
      title: 'USGS Hydrologist Dr. Joseph Poland Beside the Iconic San Joaquin Subsidence Pole',
      description:
        "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
      nisarCorrelation:
        "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
      credit: "Supplied credit, unverified: U.S. Geological Survey (USGS) Public Domain Archive; exact source, date, author and permissions require confirmation.",
      isDisasterCapture: true
    },
    {
      id: 'photo_ca_aqueduct_sag',
      stationId: 'ca_aqueduct_levee',
      locationLabel: 'California Aqueduct & Central Valley Cropland',
      nepaliLabel: 'Acueducto de California • Infraestructura Hídrica',
      dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
      coords: "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence.",
      imageUrl: '/incident_photos/california_aqueduct_subsidence.jpg',
      title: 'Concrete-Lined Water Conveyance Canal Crossing Subsiding Agricultural Basins',
      description:
        "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
      nisarCorrelation:
        "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
      credit: "Supplied credit, unverified: Wikimedia Commons (CC BY-SA 3.0); exact source, date, author and permissions require confirmation."
    }
  ],
  hatay_turkiye: [
    {
      id: 'photo_tr_hatay_quake',
      stationId: 'tr_fault_olive',
      locationLabel: 'Hatay–Pazarcık Fault Corridor After Mw 7.8 Rupture',
      nepaliLabel: 'Hatay / Antakya • Doğu Anadolu Fay Hattı',
      dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
      coords: "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence.",
      imageUrl: '/incident_photos/turkiye_hatay_quake_fault.jpg',
      title: 'Post-Earthquake Urban Structural Disruption & Left-Lateral Fault Strain in Hatay',
      description:
        "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
      nisarCorrelation:
        "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
      credit: "Supplied credit, unverified: Voice of America / Wikimedia Commons (Public Domain); exact source, date, author and permissions require confirmation.",
      isDisasterCapture: true
    },
    {
      id: 'photo_tr_antakya_courtyard',
      stationId: 'tr_antakya_havus',
      locationLabel: 'Historic Antakya Carved-Stone Courtyard Street',
      nepaliLabel: 'Tarihi Antakya Sokakları ve Taş Evleri',
      dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
      coords: "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence.",
      imageUrl: '/incident_photos/turkiye_antakya_courtyard.jpg',
      title: 'Traditional Antakya Limestone Architecture & Narrow Heritage Streets',
      description:
        "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
      nisarCorrelation:
        "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
      credit: "Supplied credit, unverified: Wikimedia Commons (CC BY 3.0); exact source, date, author and permissions require confirmation."
    }
  ],
  yukon_alaska: [
    {
      id: 'photo_ak_permafrost_bluff',
      stationId: 'ak_bluff_erosion',
      locationLabel: 'Thawing Ice-Rich Permafrost Coastal Bluff, Alaska',
      nepaliLabel: 'Yup’ik Coast • Permafrost Thermokarst & Bluff Retreat',
      dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
      coords: "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence.",
      imageUrl: '/incident_photos/alaska_permafrost_bluff.jpg',
      title: "Illustrative surface-change investigation",
      description:
        "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
      nisarCorrelation:
        "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
      credit: "Supplied credit, unverified: U.S. Geological Survey (USGS) Public Domain; exact source, date, author and permissions require confirmation.",
      isDisasterCapture: true
    },
    {
      id: 'photo_ak_mertarvik_yupik',
      stationId: 'ak_yupik_boardwalk',
      locationLabel: 'Mertarvik–Newtok Yup’ik Community Relocation Homes on Pilings',
      nepaliLabel: 'Mertarvik / Cev’aq • Yup’ik Resilient Architecture',
      dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
      coords: "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence.",
      imageUrl: '/incident_photos/alaska_yupik_tundra.jpg',
      title: 'Elevated Resilient Homes Built on Stable Bedrock & Permafrost Pilings at Mertarvik',
      description:
        "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
      nisarCorrelation:
        "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
      credit: "Supplied credit, unverified: State of Alaska / Wikimedia Commons (CC BY 2.0); exact source, date, author and permissions require confirmation."
    }
  ]
};

// Helper to create rich Supercomputer Stations & Passes for the 4 new regions
function makeRegionPasses(
  p0: [string, string, string, number, number, number, number, string],
  p1: [string, string, string, number, number, number, number, string],
  p2: [string, string, string, number, number, number, number, string],
  p3: [string, string, string, number, number, number, number, string]
): TimelinePass[] {
  const raw = [
    { d: p0, tag: 'BASELINE' as const, mood: 'welcome' as const },
    { d: p1, tag: 'PRECURSOR' as const, mood: 'radar' as const },
    { d: p2, tag: 'CRITICAL_CREEP' as const, mood: 'warning' as const },
    { d: p3, tag: 'CATASTROPHE' as const, mood: 'somber' as const }
  ];
  return raw.map((item, idx) => ({
    id: `pass_${idx}`,
    index: idx,
    date: `SCENARIO STEP ${idx + 1}`,
    shortLabel: ['Baseline', 'Change', 'Evidence check', 'Discussion'][idx],
    orbitPass: `Simulation step ${idx + 1}`,
    phaseTag: item.tag,
    title: `Simulation: ${['baseline reference', 'illustrative surface change', 'uncertainty check', 'possible community discussion'][idx]}`,
    summary: 'Author-chosen simulation, not a historical satellite acquisition or a measured local hazard.',
    cloudCoverPct: item.d[3],
    puruguCreepMeters: item.d[4],
    insarEastMm: Math.round(item.d[4] * 42),
    insarVertMm: -Math.round(item.d[4] * 65),
    riverDischargeMultiplier: item.d[5],
    soilMoisturePct: item.d[6],
    bridgeIntact: idx < 3,
    hydropowerOperationalPct: idx === 3 ? 38 : idx === 2 ? 72 : 98,
    mentorNarration: 'Simulation: compare surface patterns, check uncertainty and request independent evidence. No operational warning or field validation is established.',
    mentorMood: item.mood
  }));
}

export const GLOBAL_REGIONS_ATLAS: Record<GlobalRegionId, GlobalRegionDefinition> = {
  // ==========================================================================
  // 1. RASUWA–LANGTANG, NEPAL (FLAGSHIP HOME REGION)
  // ==========================================================================
  rasuwa_nepal: {
    id: 'rasuwa_nepal',
    order: 1,
    flag: '🇳🇵',
    name: 'Rasuwa–Langtang Gorge',
    nativeTitle: 'रसुवा–लाङटाङ हिमाली क्षेत्र',
    country: 'Nepal (Central Himalaya)',
    biomeBadge: 'Cryosphere • Monsoon Alpine Gorge (1,436m–7,160m)',
    lat: 28.28,
    lon: 85.38,
    coordsLabel: '28.28°N, 85.38°E',
    gibsDate: '2025-07-08',
    gibsZoom: 7,
    accentColor: '#38bdf8',
    playerPalette: 'player',
    leadScientistName: 'Prof. Dr. Rudra ("Radar Bajey")',
    leadScientistRole: 'DHM–NISAR Himalayan Geomatics Director',
    labBuildingName: 'DHM–NISAR Himalayan Kendra',
    culturalHallName: 'Ama Dolma’s Tamang Tea-House',
    hiddenPhenomenaBadge: 'Slow-Moving Landslides • Glacier Lake Expansion • Dam Siltation',
    secondaryPhenomena: [
      "Illustration / simulation: unverified historical or measurement claim removed",
      'Glacier lake outburst & monsoon soil saturation',
      '111 MW Hydropower intake & border bridge vulnerability'
    ],
    opticalVisibilityPct: 6,
    sarVisibilityPct: 95,
    culturalSummary:
      'Authentic Tamang & Hyolmo mountain corridor: dry-stone slate homes in Chilime, Palpali Dhaka Topi & Bakhu/Pangden attire, woven Doko baskets, Buddhist Stupas & Mani walls, 1855 Rasuwagadhi Fort, and Jholunge Pul suspension bridges.',
    communityStakesSummary:
      "Illustrative planning context: communities and infrastructure may be exposed to surface change. No local casualty count, loss estimate or achieved impact is claimed.",
    scientificIntegrity: {
      dataProvenanceBadge: "SIMULATION: regional radar layers and scenarios. NASA POWER model output / GIBS archived optical context shown separately; no calibrated NISAR product ingested.",
      isForwardScenarioSimulated: true,
      measuredRadarObservable: "Simulated radar quantities: HH/HV backscatter (dB), coherence (0–1) and line-of-sight deformation (m). No direct measurement in these regional layers.",
      physicalInterpretation: "Illustrative hypothesis only. A radar pattern is not a unique physical cause or hazard probability.",
      whyOpticalFails: "Clouds and lighting can constrain passive optical views. Obstruction percentages are author-chosen illustrations, not sensor accuracy or measured coverage.",
      whySarAloneIsInsufficient: 'Radar change is not a unique cause or disaster-timing prediction. Layover, shadow, coherence, phase wrapping and atmospheric effects require quality checks; extra viewing directions do not guarantee coverage. Independent field evidence and qualified review are not integrated here.',
      complementaryNasaDatasets: ['Integrated NASA POWER climatology (model output)', 'Integrated NASA GIBS optical browse (archived observation when loaded)', 'NISAR, GEDI, GRACE-FO, SMAP, ICESat-2 and local sensors: proposed analytical integration, not implemented'],
      groundValidationRequired: "Required, not performed: dated field observations, surveyed locations, local hydrometeorological records, consent and qualified professional review."
    },
    intervention: {
      missionTitle: 'Rasuwa evidence-review & preparedness discussion exercise',
      stakeholderAgency: 'Nepal NDRRMA • DHM • Rasuwagadhi Hydropower Co.',
      challengePrompt:
        "Educational exercise: choose author-defined game controls, acknowledge missing corroboration, and record a hypothetical configuration. No operational action is recommended.",
      complementarySensorRequiredLabel: "Independent field evidence is required, not connected or collected.",
      controls: [
        {
          id: 'creep_mm',
          label: 'Toy evidence-review threshold (simulated LOS change)',
          unit: ' mm',
          min: 5,
          max: 45,
          step: 1,
          defaultValue: 38,
          optimalMin: 14,
          optimalMax: 24,
          helpText: "Author-chosen game range for exploring trade-offs. Not derived from engineering design, calibrated hazard thresholds or field validation."
        },
        {
          id: 'dam_flush_pct',
          label: 'Toy planning effort allocation',
          unit: '%',
          min: 10,
          max: 100,
          step: 5,
          defaultValue: 25,
          optimalMin: 65,
          optimalMax: 90,
          helpText: "Author-chosen game range for exploring trade-offs. Not derived from engineering design, calibrated hazard thresholds or field validation."
        }
      ],
      actionToggleLabel: "Acknowledge the need for independent field evidence (not connected by this app)",
      successHeadline: "Hypothetical scenario only — no achieved outcome or quantified warning time.",
      impactMetrics: {
        peopleProtectedLabel: "People / livelihoods are discussion priorities, not a calculated number protected.",
        economicOrEcoSavedLabel: "Infrastructure / ecosystems are discussion priorities, not calculated savings.",
        actionableAdvisorySummary:
          "Discussion prompt only: request independently checked evidence and qualified local review before considering any real preparedness or infrastructure decision."
      }
    },
    quests: RASUWA_QUESTS,
    photos: REAL_INCIDENT_PHOTOS,
    stations: RASUWA_STATIONS,
    passes: TIMELINE_PASSES,
    riverOrFaultPathUV: [
      [0.74, 0.27],
      [0.58, 0.35],
      [0.44, 0.42],
      [0.41, 0.56],
      [0.39, 0.72],
      [0.36, 0.88]
    ],
    terrainProfile: 'himalayan_gorge'
  },

  // ==========================================================================
  // 2. PANTANAL & SOUTHERN AMAZON, BRAZIL
  // ==========================================================================
  pantanal_brazil: {
    id: 'pantanal_brazil',
    order: 2,
    flag: '🇧🇷',
    name: 'Pantanal & Amazon Frontier',
    nativeTitle: 'Pantanal & Amazônia Meridional (Mato Grosso)',
    country: 'Brazil (South America)',
    biomeBadge: 'Tropical Wetland & Sub-Canopy Gallery Forest (118m)',
    lat: -17.72,
    lon: -57.38,
    coordsLabel: '17.72°S, 57.38°W',
    gibsDate: '2024-09-05',
    gibsZoom: 6,
    accentColor: '#22c55e',
    playerPalette: 'br_ranger',
    leadScientistName: 'Dra. Camila Oliveira',
    leadScientistRole: 'INPE–IBAMA–NISAR Wetland & Forest Radar Lead',
    labBuildingName: 'Estação INPE–NISAR Pantanal',
    culturalHallName: 'Casa Palafita Ribeirinha',
    hiddenPhenomenaBadge: 'Hidden Forest Degradation • Sub-Canopy Wetland Loss • Peat Drainage',
    secondaryPhenomena: [
      'Selective understory logging under "green" optical canopies',
      'Loss of sub-canopy flood pulse (HH double-bounce drop)',
      'Subsurface peatland drying prior to smoldering megafires'
    ],
    opticalVisibilityPct: 14,
    sarVisibilityPct: 93,
    culturalSummary:
      'Authentic Ribeirinho, Pantaneiro & Indigenous Terena/Bororo floodplain culture: wooden Palafita stilt houses over river channels, dugout Canoas, wide-brim straw Chapéu Pantaneiro hats, woven hammocks, and golden Ipê-Amarelo trees.',
    communityStakesSummary:
      "Illustrative planning context: communities and infrastructure may be exposed to surface change. No local casualty count, loss estimate or achieved impact is claimed.",
    scientificIntegrity: {
      dataProvenanceBadge: "SIMULATION: regional radar layers and scenarios. NASA POWER model output / GIBS archived optical context shown separately; no calibrated NISAR product ingested.",
      isForwardScenarioSimulated: true,
      measuredRadarObservable: "Simulated radar quantities: HH/HV backscatter (dB), coherence (0–1) and line-of-sight deformation (m). No direct measurement in these regional layers.",
      physicalInterpretation: "Illustrative hypothesis only. A radar pattern is not a unique physical cause or hazard probability.",
      whyOpticalFails: "Clouds and lighting can constrain passive optical views. Obstruction percentages are author-chosen illustrations, not sensor accuracy or measured coverage.",
      whySarAloneIsInsufficient: 'Radar change is not a unique cause or disaster-timing prediction. Layover, shadow, coherence, phase wrapping and atmospheric effects require quality checks; extra viewing directions do not guarantee coverage. Independent field evidence and qualified review are not integrated here.',
      complementaryNasaDatasets: ['Integrated NASA POWER climatology (model output)', 'Integrated NASA GIBS optical browse (archived observation when loaded)', 'NISAR, GEDI, GRACE-FO, SMAP, ICESat-2 and local sensors: proposed analytical integration, not implemented'],
      groundValidationRequired: "Required, not performed: dated field observations, surveyed locations, local hydrometeorological records, consent and qualified professional review."
    },
    intervention: {
      missionTitle: 'Dispatch Sub-Canopy Ranger Boats & Peatland Re-Wetting Check-Dams',
      stakeholderAgency: 'IBAMA • INPE • Brigada Indígena & Cooperativa Ribeirinha',
      challengePrompt:
        "Educational exercise: choose author-defined game controls, acknowledge missing corroboration, and record a hypothetical configuration. No operational action is recommended.",
      complementarySensorRequiredLabel: "Independent field evidence is required, not connected or collected.",
      controls: [
        {
          id: 'hv_drop_db',
          label: 'L-Band HV Sub-Canopy Biomass Drop Alert',
          unit: ' dB',
          min: 1.0,
          max: 6.5,
          step: 0.5,
          defaultValue: 5.5,
          optimalMin: 2.5,
          optimalMax: 4.0,
          helpText: "Author-chosen game range for exploring trade-offs. Not derived from engineering design, calibrated hazard thresholds or field validation."
        },
        {
          id: 'peat_dams',
          label: 'Community Timber Check-Dams on Drained Peat Channels',
          unit: ' barriers',
          min: 0,
          max: 16,
          step: 2,
          defaultValue: 4,
          optimalMin: 8,
          optimalMax: 14,
          helpText: "Author-chosen game range for exploring trade-offs. Not derived from engineering design, calibrated hazard thresholds or field validation."
        }
      ],
      actionToggleLabel: "Acknowledge the need for independent field evidence (not connected by this app)",
      successHeadline: "Hypothetical scenario only — no achieved outcome or quantified warning time.",
      impactMetrics: {
        peopleProtectedLabel: "People / livelihoods are discussion priorities, not a calculated number protected.",
        economicOrEcoSavedLabel: "Infrastructure / ecosystems are discussion priorities, not calculated savings.",
        actionableAdvisorySummary:
          "Discussion prompt only: request independently checked evidence and qualified local review before considering any real preparedness or infrastructure decision."
      }
    },
    quests: [
      {
        id: 'quest_br_hidden_logging',
        number: 1,
        title: 'Act I • The Green Canopy Illusion',
        nepaliTitle: 'Ato I • Degradação Oculta Sob o Dossel',
        giverNpcId: 'npc_br_camila',
        giverName: 'Dra. Camila (INPE–NISAR)',
        targetStationId: 'br_logging_front',
        targetLocationName: 'Sub-Canopy Logging Scar (NE Gallery Forest)',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Visit NE Gallery Forest Scar, scan [SPACE] Beacon PAN-03 & open 📸 Real Photos.',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_br_peat_witness',
        number: 2,
        title: 'Act II • Voices of the Palafita Floodplain',
        nepaliTitle: 'Ato II • Guardiões do Pantanal',
        giverNpcId: 'npc_br_raoni',
        giverName: 'Guardião Cauã (Monitor Terena)',
        targetStationId: 'br_peat_channel',
        targetLocationName: 'Corixo Peat Channel & Casa Palafita',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Scan Corixo Peat Beacon PAN-02 & talk to Dona Iara inside Casa Palafita.',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_br_hypothesis',
        number: 3,
        title: 'Act III • Sub-Canopy Radar Physics',
        nepaliTitle: 'Ato III • Dedução Física L-Band + GEDI',
        giverNpcId: 'npc_br_camila',
        giverName: 'Dra. Camila (INPE–NISAR)',
        targetStationId: 'br_palafita_vila',
        targetLocationName: 'Any 2 Pantanal Beacons or Observatory Mainframe',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Verify at least 2 Radar Driver Hypotheses at Field Beacons or in the Lab Supercomputer (🧠 Deduce Driver).',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_br_intervention',
        number: 4,
        title: 'Act IV • Restore the Flood-Pulse Waltz',
        nepaliTitle: 'Ato IV • Barragens Comunitárias e Brigada',
        giverNpcId: 'npc_br_camila',
        giverName: 'Dra. Camila (Estação INPE–NISAR)',
        targetStationId: 'br_palafita_vila',
        targetLocationName: 'Estação INPE–NISAR 3D Mainframe & Field Sim',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Open 3D Terrain in the Lab Supercomputer AND complete ⚡ Field Action Sim!',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      }
    ],
    photos: GLOBAL_EXTRA_PHOTOS.pantanal_brazil,
    stations: [
      {
        id: 'br_palafita_vila',
        code: 'PAN-01',
        name: 'Vila Palafita & Estação INPE',
        nepaliSub: 'Comunidade Ribeirinha • 118m',
        lat: -17.74,
        lon: -57.35,
        elevationM: 118,
        u: 0.46,
        v: 0.76,
        iconType: 'village',
        accentColor: '#38bdf8',
        shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
        humanEconomicStory: "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
        nisarInsight: "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
        physicalDriverHypothesis: {
          question: "Simulation question: What should an educator request after noticing a radar change?",
          options: ["Dated independent evidence and qualified review", "An automatic evacuation based only on a color", "A claim that every bright pixel is flooded"],
          correctIndex: 0,
          explanation: "A radar pattern supports a question, not a uniquely established cause. Request corroborating evidence before discussing action."
        },
        npcName: 'Dona Iara',
        npcRole: 'Ribeirinha Fisherwoman',
        npcDialoguePre: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        npcDialoguePost: "Fictional dialogue: With check-dams guided by your sub-canopy radar map, our spawning lagoons stayed wet!",
        baselineMetrics: { hhDb: -4.2, hvDb: -11.4, coherence: 0.78, displacementText: "Simulation: +6.1 dB HH Flood Pulse", surfaceState: 'Healthy Sub-Canopy Flooded Forest' },
        precursorMetrics: { hhDb: -9.8, hvDb: -12.1, coherence: 0.64, displacementText: "Simulation: -5.6 dB HH Water Loss", surfaceState: 'Sub-Canopy Water Recession' },
        catastropheMetrics: { hhDb: -12.4, hvDb: -15.9, coherence: 0.39, displacementText: "Simulation: Peat Drying & Understory Loss", surfaceState: 'High Smoldering Peat Fire Risk' }
      },
      {
        id: 'br_peat_channel',
        code: 'PAN-02',
        name: 'Corixo Peatland Wetland Channel',
        nepaliSub: 'Canal de Turfeira Sub-Dossel • 114m',
        lat: -17.68,
        lon: -57.42,
        elevationM: 114,
        u: 0.32,
        v: 0.48,
        iconType: 'agro',
        accentColor: '#14b8a6',
        shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
        humanEconomicStory: "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
        nisarInsight: "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
        physicalDriverHypothesis: {
          question: "Simulation question: Does a brighter radar return uniquely measure local soil moisture?",
          options: ["No; roughness, vegetation and viewing geometry also matter", "Yes; every bright pixel is saturated soil", "Yes; a color is a direct volumetric moisture measurement"],
          correctIndex: 0,
          explanation: "Radar responds to several surface properties. This toy wetness layer is not a retrieval of volumetric moisture."
        },
        npcName: 'Guardião Cauã',
        npcRole: 'Indigenous Forest & Wetland Monitor',
        npcDialoguePre: "Fictional dialogue: From an airplane the palm tops still look emerald green, yet beneath our boots the black peat soil is cracking dry!",
        npcDialoguePost: "Fictional dialogue: Timber check-dams are holding the late rains right inside the peat basin!",
        baselineMetrics: { hhDb: -3.8, hvDb: -11.0, coherence: 0.74, displacementText: "Simulation: Wet Peat (GWET 0.84)", surfaceState: 'Inundated Sub-Canopy Wetland' },
        precursorMetrics: { hhDb: -10.5, hvDb: -12.6, coherence: 0.58, displacementText: "Simulation: HH Double-Bounce Lost", surfaceState: 'Draining Organic Peat Layer' },
        catastropheMetrics: { hhDb: -13.9, hvDb: -16.2, coherence: 0.31, displacementText: "Simulation: GWET 0.41 (Critical)", surfaceState: 'Desiccated Peat Tinder Zone' }
      },
      {
        id: 'br_logging_front',
        code: 'PAN-03',
        name: 'NE Sub-Canopy Selective Logging Frontier',
        nepaliSub: 'Fronteira de Extração Seletiva • 142m',
        lat: -17.62,
        lon: -57.29,
        elevationM: 142,
        u: 0.74,
        v: 0.26,
        iconType: 'glacier',
        accentColor: '#f97316',
        shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
        humanEconomicStory: "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
        nisarInsight: "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
        physicalDriverHypothesis: {
          question: "Simulation question: Can two radar viewing directions guarantee visibility in a steep gorge?",
          options: ["No; check layover, shadow and quality masks", "Yes; they see every surface", "No quality information is ever necessary"],
          correctIndex: 0,
          explanation: "Additional geometry can help interpretation but does not guarantee complete coverage or remove every ambiguity."
        },
        npcName: 'Dra. Camila',
        npcRole: 'INPE–NISAR Radar Ecologist',
        npcDialoguePre: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        npcDialoguePost: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        baselineMetrics: { hhDb: -6.5, hvDb: -10.8, coherence: 0.81, displacementText: "Simulation: Biomass ~145 Mg/ha", surfaceState: 'Intact Multi-Story Gallery Forest' },
        precursorMetrics: { hhDb: -7.9, hvDb: -13.4, coherence: 0.52, displacementText: "Simulation: -2.6 dB HV Understory Drop", surfaceState: 'Hidden Selective Timber Removal' },
        catastropheMetrics: { hhDb: -9.6, hvDb: -15.1, coherence: 0.28, displacementText: "Simulation: -4.3 dB HV + Edge Drying", surfaceState: 'Hollowed Canopy Vulnerable to Fire' }
      }
    ],
    passes: makeRegionPasses(
      ['Mar 12, 2026', 'Wet Pulse', 'Healthy Flood Pulse & Intact Sub-Canopy Biomass', 78, 0.2, 1.4, 85, "Illustrative scenario: no local sensor measurement, validated prediction or achieved community outcome is established. Check independent evidence."],
      ['Jun 24, 2026', 'Hidden Logging', 'Optical Still Green — L-Band HV Flags Understory Logging', 42, 1.8, 1.0, 62, 'Optical NDVI still reads 0.81 green, but NISAR L-band HV drops -2.8 dB in the NE frontier as selective logging hollows out mid-story hardwood trunks!'],
      ['Aug 19, 2026', 'Peat Drainage', 'HH Double-Bounce Vanishes Under Gallery Palms', 24, 3.6, 0.6, 44, 'Sub-canopy standing water disappears 6 weeks early! HH backscatter plunges -6.4 dB while NASA POWER root-zone wetness drops toward critical peat-fire thresholds.'],
      ['Sep 12, 2026', 'Peat Fire Crisis', 'Dry Peat Smoldering & Canopy Degradation Peak', 68, 5.2, 0.5, 38, 'Smoke and haze obscure optical cameras, while NISAR + VIIRS + GEDI pinpoint smoldering peat channels and guide community check-dam re-wetting!']
    ),
    riverOrFaultPathUV: [
      [0.72, 0.14],
      [0.58, 0.32],
      [0.44, 0.48],
      [0.36, 0.66],
      [0.42, 0.88]
    ],
    terrainProfile: 'flooded_canopy'
  },

  // ==========================================================================
  // 3. SAN JOAQUIN CENTRAL VALLEY, CALIFORNIA, USA
  // ==========================================================================
  san_joaquin_usa: {
    id: 'san_joaquin_usa',
    order: 3,
    flag: '🇺🇸',
    name: 'San Joaquin Central Valley',
    nativeTitle: 'Valle de San Joaquín • Tulare & Corcoran Basin',
    country: 'California, USA (North America)',
    biomeBadge: 'Irrigated Agricultural Aquifer Basin (63m)',
    lat: 36.10,
    lon: -119.55,
    coordsLabel: '36.10°N, 119.55°W',
    gibsDate: '2025-07-08',
    gibsZoom: 7,
    accentColor: '#f59e0b',
    playerPalette: 'ca_hydrologist',
    leadScientistName: 'Dr. Elena Morales',
    leadScientistRole: 'USGS–SGMA–NISAR Aquifer Geodesy Lead',
    labBuildingName: 'USGS–SGMA Valley Hydro-Observatory',
    culturalHallName: 'Cooperativa Campesina Water Hall',
    hiddenPhenomenaBadge: 'Groundwater Depletion • Land Subsidence (-28 cm/yr) • Aqueduct Sag',
    secondaryPhenomena: [
      'Invisible centimeter-per-month sinking over over-pumped aquifers',
      'Concrete irrigation aqueduct & flood-levee freeboard loss',
      'Rural farmworker domestic drinking-well depletion'
    ],
    opticalVisibilityPct: 5,
    sarVisibilityPct: 96,
    culturalSummary:
      'Authentic Central Valley Californian & Mexican-American Campesino agricultural community: blooming almond & citrus orchards, wide sun Sombreros & denim workwear, Cooperativa hall with Papel Picado banners, steel water silos, and the California Aqueduct.',
    communityStakesSummary:
      "Illustrative planning context: communities and infrastructure may be exposed to surface change. No local casualty count, loss estimate or achieved impact is claimed.",
    scientificIntegrity: {
      dataProvenanceBadge: "SIMULATION: regional radar layers and scenarios. NASA POWER model output / GIBS archived optical context shown separately; no calibrated NISAR product ingested.",
      isForwardScenarioSimulated: true,
      measuredRadarObservable: "Simulated radar quantities: HH/HV backscatter (dB), coherence (0–1) and line-of-sight deformation (m). No direct measurement in these regional layers.",
      physicalInterpretation: "Illustrative hypothesis only. A radar pattern is not a unique physical cause or hazard probability.",
      whyOpticalFails: "Clouds and lighting can constrain passive optical views. Obstruction percentages are author-chosen illustrations, not sensor accuracy or measured coverage.",
      whySarAloneIsInsufficient: 'Radar change is not a unique cause or disaster-timing prediction. Layover, shadow, coherence, phase wrapping and atmospheric effects require quality checks; extra viewing directions do not guarantee coverage. Independent field evidence and qualified review are not integrated here.',
      complementaryNasaDatasets: ['Integrated NASA POWER climatology (model output)', 'Integrated NASA GIBS optical browse (archived observation when loaded)', 'NISAR, GEDI, GRACE-FO, SMAP, ICESat-2 and local sensors: proposed analytical integration, not implemented'],
      groundValidationRequired: "Required, not performed: dated field observations, surveyed locations, local hydrometeorological records, consent and qualified professional review."
    },
    intervention: {
      missionTitle: 'Stabilize the Subsidence Bowl: Drip Conversion & Aquifer Recharge (MAR)',
      stakeholderAgency: 'California DWR • SGMA Groundwater Sustainability Agency • Cooperativa Campesina',
      challengePrompt:
        "Educational exercise: choose author-defined game controls, acknowledge missing corroboration, and record a hypothetical configuration. No operational action is recommended.",
      complementarySensorRequiredLabel: "Independent field evidence is required, not connected or collected.",
      controls: [
        {
          id: 'drip_conversion_pct',
          label: 'Orchard Precision Drip & Micro-Irrigation Conversion',
          unit: '%',
          min: 10,
          max: 95,
          step: 5,
          defaultValue: 25,
          optimalMin: 65,
          optimalMax: 90,
          helpText: "Author-chosen game range for exploring trade-offs. Not derived from engineering design, calibrated hazard thresholds or field validation."
        },
        {
          id: 'mar_recharge_taf',
          label: 'Managed Aquifer Recharge (MAR) Percolation Allocation',
          unit: ' TAF',
          min: 0,
          max: 200,
          step: 10,
          defaultValue: 30,
          optimalMin: 110,
          optimalMax: 180,
          helpText: "Author-chosen game range for exploring trade-offs. Not derived from engineering design, calibrated hazard thresholds or field validation."
        }
      ],
      actionToggleLabel: "Acknowledge the need for independent field evidence (not connected by this app)",
      successHeadline: "Hypothetical scenario only — no achieved outcome or quantified warning time.",
      impactMetrics: {
        peopleProtectedLabel: "People / livelihoods are discussion priorities, not a calculated number protected.",
        economicOrEcoSavedLabel: "Infrastructure / ecosystems are discussion priorities, not calculated savings.",
        actionableAdvisorySummary:
          "Discussion prompt only: request independently checked evidence and qualified local review before considering any real preparedness or infrastructure decision."
      }
    },
    quests: [
      {
        id: 'quest_ca_benchmark',
        number: 1,
        title: 'Act I • The Invisible 9-Meter Sink',
        nepaliTitle: 'Acto I • El Hundimiento Invisible',
        giverNpcId: 'npc_ca_elena',
        giverName: 'Dr. Elena Morales (USGS–NISAR)',
        targetStationId: 'ca_corcoran_bowl',
        targetLocationName: 'Corcoran Subsidence Benchmark Pole',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Walk to the Subsidence Benchmark Pole, scan [SPACE] Beacon SJV-02 & open 📸 Real Photos.',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_ca_campesino_wells',
        number: 2,
        title: 'Act II • Aqueduct Sag & Dry Domestic Wells',
        nepaliTitle: 'Acto II • El Acueducto y los Pozos Rurales',
        giverNpcId: 'npc_ca_mateo',
        giverName: 'Don Mateo (Mayordomo de Riego)',
        targetStationId: 'ca_aqueduct_levee',
        targetLocationName: 'California Aqueduct Sag & Cooperativa Hall',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Scan Aqueduct Levee Beacon SJV-03 & interview Doña Rosa inside the Cooperativa Hall.',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_ca_hypothesis',
        number: 3,
        title: 'Act III • Aquifer Geodesy & GRACE-FO Fusion',
        nepaliTitle: 'Acto III • Coherencia L-Band y Gravedad GRACE-FO',
        giverNpcId: 'npc_ca_elena',
        giverName: 'Dr. Elena Morales (USGS–NISAR)',
        targetStationId: 'ca_hydro_station',
        targetLocationName: 'Any 2 San Joaquin Beacons or Hydro-Lab PC',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Verify at least 2 Radar Driver Hypotheses at Field Beacons or in the Lab Supercomputer (🧠 Deduce Driver).',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_ca_intervention',
        number: 4,
        title: 'Act IV • Recharge the Valley Waltz',
        nepaliTitle: 'Acto IV • Recarga MAR y Riego por Goteo',
        giverNpcId: 'npc_ca_elena',
        giverName: 'Dr. Elena Morales (Hydro-Observatory)',
        targetStationId: 'ca_hydro_station',
        targetLocationName: 'USGS–SGMA 3D Mainframe & Field Sim',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Open 3D Terrain in the Lab Supercomputer AND complete ⚡ Field Action Sim!',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      }
    ],
    photos: GLOBAL_EXTRA_PHOTOS.san_joaquin_usa,
    stations: [
      {
        id: 'ca_hydro_station',
        code: 'SJV-01',
        name: 'USGS–SGMA Hydro-Observatory & Cooperativa',
        nepaliSub: 'Centro Comunitario del Agua • 66m',
        lat: 36.12,
        lon: -119.52,
        elevationM: 66,
        u: 0.48,
        v: 0.74,
        iconType: 'village',
        accentColor: '#f59e0b',
        shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
        humanEconomicStory: "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
        nisarInsight: "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
        physicalDriverHypothesis: {
          question: "Simulation question: Can this simulator determine a safe dam-gate setting?",
          options: ["No; qualified engineers and independent records are required", "Yes; the game checklist is an engineering model", "Yes; a checkbox connects the real dam"],
          correctIndex: 0,
          explanation: "The game has no engineering flow model, real gauge integration or validated operational thresholds."
        },
        npcName: 'Doña Rosa',
        npcRole: 'Cooperativa Water Board Chair',
        npcDialoguePre: "Fictional dialogue: Three families on Elm Lane lost tap water last August while deep turbine pumps ran day and night around our town.",
        npcDialoguePost: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        baselineMetrics: { hhDb: -8.1, hvDb: -14.2, coherence: 0.86, displacementText: "Simulation: -1.2 cm/yr (Stable)", surfaceState: 'Balanced Winter Recharge' },
        precursorMetrics: { hhDb: -9.4, hvDb: -15.0, coherence: 0.79, displacementText: "Simulation: -14.5 cm/yr Subsidence", surfaceState: 'Summer Pumping Drawdown' },
        catastropheMetrics: { hhDb: -10.8, hvDb: -16.1, coherence: 0.74, displacementText: "Simulation: -28.4 cm/yr Inelastic Sink", surfaceState: 'Corcoran Clay Compaction Crisis' }
      },
      {
        id: 'ca_corcoran_bowl',
        code: 'SJV-02',
        name: 'Corcoran Subsidence Bowl & Benchmark Pole',
        nepaliSub: 'Cuenca de Subsidencia • 58m',
        lat: 36.10,
        lon: -119.56,
        elevationM: 58,
        u: 0.68,
        v: 0.34,
        iconType: 'agro',
        accentColor: '#ef4444',
        shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
        humanEconomicStory: "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
        nisarInsight: "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
        physicalDriverHypothesis: {
          question: "Simulation question: Does a local photo filename establish the event and acquisition date?",
          options: ["No; verify the original source and metadata", "Yes; filenames are authoritative observations", "Yes; a supplied credit string proves the exact location"],
          correctIndex: 0,
          explanation: "A source link, author, date, location and permissions are required. Unverified assets are illustrations, not ground truth."
        },
        npcName: 'Don Mateo',
        npcRole: 'Orchard Irrigation Mayordomo',
        npcDialoguePre: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        npcDialoguePost: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        baselineMetrics: { hhDb: -7.5, hvDb: -13.6, coherence: 0.84, displacementText: "Simulation: -2.0 cm/yr", surfaceState: 'Elastic Seasonal Fluctuation' },
        precursorMetrics: { hhDb: -8.9, hvDb: -14.4, coherence: 0.77, displacementText: "Simulation: -18.2 cm/yr (1.5 Fringes)", surfaceState: 'Accelerating Bowl Subsidence' },
        catastropheMetrics: { hhDb: -10.2, hvDb: -15.5, coherence: 0.71, displacementText: "Simulation: -28.8 cm/yr (Irreversible)", surfaceState: 'Severe Aquitard Compaction' }
      },
      {
        id: 'ca_aqueduct_levee',
        code: 'SJV-03',
        name: 'California Aqueduct Concrete Sag & Levee',
        nepaliSub: 'Tramo Hundido del Acueducto • 61m',
        lat: 36.06,
        lon: -119.62,
        elevationM: 61,
        u: 0.25,
        v: 0.44,
        iconType: 'bridge',
        accentColor: '#38bdf8',
        shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
        humanEconomicStory: "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
        nisarInsight: "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
        physicalDriverHypothesis: {
          question: "Simulation question: What change does repeat-pass InSAR constrain?",
          options: ["Line-of-sight phase change, subject to geometry and coherence", "Exact earthquake or landslide timing", "A unique East/vertical displacement pair from one viewing direction"],
          correctIndex: 0,
          explanation: "Line-of-sight change is not a unique vector displacement. Phase wrapping, coherence and physical interpretation are distinct issues; a longer wavelength does not guarantee coherence."
        },
        npcName: 'Eng. Marcus',
        npcRole: 'DWR Canal Structural Inspector',
        npcDialoguePre: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        npcDialoguePost: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        baselineMetrics: { hhDb: -3.2, hvDb: -12.8, coherence: 0.93, displacementText: "Simulation: -0.8 cm/yr", surfaceState: 'Design Canal Gradient Intact' },
        precursorMetrics: { hhDb: -3.5, hvDb: -13.0, coherence: 0.91, displacementText: "Simulation: -16.4 cm/yr Trough Sag", surfaceState: 'Freeboard Margin Shrinking' },
        catastropheMetrics: { hhDb: -4.1, hvDb: -13.4, coherence: 0.88, displacementText: "Simulation: -54 cm Cumulative Buckle", surfaceState: '60% Conveyance Throttle Risk' }
      }
    ],
    passes: makeRegionPasses(
      ['Feb 15, 2026', 'Winter Wet', 'Winter Rain & Elastic Aquifer Recovery', 38, 0.3, 1.2, 54, 'Following winter rains (NASA POWER GWETTOP = 0.54), agricultural pumping pauses and NISAR InSAR shows minimal subsidence across the valley.'],
      ['May 28, 2026', 'Pump Surge', 'Spring Irrigation Drawdown Begins Forming Fringe Bowl', 8, 1.9, 0.9, 28, 'Dry Central Valley heat begins (GWETTOP = 0.24). NISAR L-band maintains high coherence over blooming almond rows, revealing a -14 cm/yr subsidence trough!'],
      ['Aug 14, 2026', 'Peak Sink', 'Double InSAR Fringe Bowl (-28 cm/yr) Warps Aqueduct', 4, 3.8, 0.6, 14, 'Optical imagery looks completely unchanged, yet NISAR + GRACE-FO reveal rapid groundwater mass loss and -28 cm/yr sinking buckling the concrete Aqueduct!'],
      ['Oct 02, 2026', 'Well Crisis', 'Inelastic Clay Compaction & Rural Domestic Well Alert', 12, 5.4, 0.5, 18, 'Cumulative subsidence reaches critical freeboard limits on flood levees and rural wells—deploy Drip Conversion + MAR Recharge Basins now!']
    ),
    riverOrFaultPathUV: [
      [0.18, 0.12],
      [0.22, 0.34],
      [0.26, 0.56],
      [0.31, 0.78],
      [0.35, 0.92]
    ],
    terrainProfile: 'subsidence_valley'
  },

  // ==========================================================================
  // 4. ANTAKYA–PAZARCIK FAULT CORRIDOR, HATAY / ANATOLIA, TÜRKIYE
  // ==========================================================================
  hatay_turkiye: {
    id: 'hatay_turkiye',
    order: 4,
    flag: '🇹🇷',
    name: 'Hatay–Pazarcık Fault Corridor',
    nativeTitle: 'Hatay & Doğu Anadolu Fay Koridoru',
    country: 'Türkiye (Eastern Mediterranean / Anatolia)',
    biomeBadge: 'Strike-Slip Tectonic Valley & Stone Heritage (642m)',
    lat: 37.29,
    lon: 37.04,
    coordsLabel: '37.29°N, 37.04°E',
    gibsDate: '2023-02-10',
    gibsZoom: 7,
    accentColor: '#ef4444',
    playerPalette: 'tr_afad_engineer',
    leadScientistName: 'Prof. Dr. Leyla Kaya',
    leadScientistRole: 'Kandilli–AFAD–NISAR Tectonic Geodesy Lead',
    labBuildingName: 'AFAD–Kandilli Tectonic Observatory',
    culturalHallName: 'Antakya Çay Evi (Anatolian Tea House)',
    hiddenPhenomenaBadge: 'Earthquake Deformation • Post-Quake Damage Proxy • Dam Strain',
    secondaryPhenomena: [
      '4.5m left-lateral fault rupture & off-fault ground warping under winter clouds',
      'JPL OPERA SAR Coherence-Drop rapid structural disruption triage',
      'Subtle embankment dam crest deformation & riverbank lateral spreading'
    ],
    opticalVisibilityPct: 12,
    sarVisibilityPct: 91,
    culturalSummary:
      'Authentic Anatolian & Levantine Hatay culture: carved cream-limestone Havuş courtyard houses, centuries-old silver-green olive groves, Anatolian Çay Evi with brass semaver & crimson tulip glasses, Turkish kilim rugs, and AFAD seismic engineers.',
    communityStakesSummary:
      "Illustrative planning context: communities and infrastructure may be exposed to surface change. No local casualty count, loss estimate or achieved impact is claimed.",
    scientificIntegrity: {
      dataProvenanceBadge: "SIMULATION: regional radar layers and scenarios. NASA POWER model output / GIBS archived optical context shown separately; no calibrated NISAR product ingested.",
      isForwardScenarioSimulated: true,
      measuredRadarObservable: "Simulated radar quantities: HH/HV backscatter (dB), coherence (0–1) and line-of-sight deformation (m). No direct measurement in these regional layers.",
      physicalInterpretation: "Illustrative hypothesis only. A radar pattern is not a unique physical cause or hazard probability.",
      whyOpticalFails: "Clouds and lighting can constrain passive optical views. Obstruction percentages are author-chosen illustrations, not sensor accuracy or measured coverage.",
      whySarAloneIsInsufficient: 'Radar change is not a unique cause or disaster-timing prediction. Layover, shadow, coherence, phase wrapping and atmospheric effects require quality checks; extra viewing directions do not guarantee coverage. Independent field evidence and qualified review are not integrated here.',
      complementaryNasaDatasets: ['Integrated NASA POWER climatology (model output)', 'Integrated NASA GIBS optical browse (archived observation when loaded)', 'NISAR, GEDI, GRACE-FO, SMAP, ICESat-2 and local sensors: proposed analytical integration, not implemented'],
      groundValidationRequired: "Required, not performed: dated field observations, surveyed locations, local hydrometeorological records, consent and qualified professional review."
    },
    intervention: {
      missionTitle: 'Coordinate Post-Earthquake Coherence Triage & Reservoir Dam Safety',
      stakeholderAgency: 'AFAD • Kandilli Observatory • DSİ Dam Safety Directorate',
      challengePrompt:
        "Educational exercise: choose author-defined game controls, acknowledge missing corroboration, and record a hypothetical configuration. No operational action is recommended.",
      complementarySensorRequiredLabel: "Independent field evidence is required, not connected or collected.",
      controls: [
        {
          id: 'coherence_drop_thresh',
          label: 'OPERA SAR Coherence-Drop Priority Dispatch Threshold (Δγ)',
          unit: '',
          min: 0.15,
          max: 0.70,
          step: 0.05,
          defaultValue: 0.60,
          optimalMin: 0.25,
          optimalMax: 0.42,
          helpText: "Author-chosen game range for exploring trade-offs. Not derived from engineering design, calibrated hazard thresholds or field validation."
        },
        {
          id: 'dam_drawdown_m',
          label: 'Emergency Reservoir Drawdown at Strained Earthen Dam',
          unit: ' m',
          min: 0,
          max: 12,
          step: 1,
          defaultValue: 1,
          optimalMin: 5,
          optimalMax: 9,
          helpText: "Author-chosen game range for exploring trade-offs. Not derived from engineering design, calibrated hazard thresholds or field validation."
        }
      ],
      actionToggleLabel: "Acknowledge the need for independent field evidence (not connected by this app)",
      successHeadline: "Hypothetical scenario only — no achieved outcome or quantified warning time.",
      impactMetrics: {
        peopleProtectedLabel: "People / livelihoods are discussion priorities, not a calculated number protected.",
        economicOrEcoSavedLabel: "Infrastructure / ecosystems are discussion priorities, not calculated savings.",
        actionableAdvisorySummary:
          "Discussion prompt only: request independently checked evidence and qualified local review before considering any real preparedness or infrastructure decision."
      }
    },
    quests: [
      {
        id: 'quest_tr_olive_fault',
        number: 1,
        title: 'Act I • The Split Olive Grove',
        nepaliTitle: 'Bölüm I • Kırılan Zeytinlik ve Fay Hattı',
        giverNpcId: 'npc_tr_leyla',
        giverName: 'Prof. Leyla Kaya (Kandilli–NISAR)',
        targetStationId: 'tr_fault_olive',
        targetLocationName: 'Displaced Olive Grove & Surface Fault Scarp',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Walk to the Olive Grove Fault Scarp, scan [SPACE] Beacon HAT-02 & open 📸 Real Photos.',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_tr_cay_evi',
        number: 2,
        title: 'Act II • Why Radar Needs Human Engineers',
        nepaliTitle: 'Bölüm II • Çay Evi ve Yapı Denetimi',
        giverNpcId: 'npc_tr_kerem',
        giverName: 'Kerem Amca (Antakya Olive Grower)',
        targetStationId: 'tr_antakya_havus',
        targetLocationName: 'Antakya Courtyard Quarter, Dam Crest & Çay Evi',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Scan Beacon HAT-01 or HAT-03 & talk to Zeynep Teyze inside the Çay Evi Tea House.',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_tr_hypothesis',
        number: 3,
        title: 'Act III • Tectonic Limits & Near-Fault Geodesy',
        nepaliTitle: 'Bölüm III • InSAR Sınırları, GNSS ve Baraj Analizi',
        giverNpcId: 'npc_tr_leyla',
        giverName: 'Prof. Leyla Kaya (Kandilli–AFAD)',
        targetStationId: 'tr_dam_crest',
        targetLocationName: 'Any 2 Hatay Beacons or Observatory Mainframe',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Verify at least 2 Radar Driver Hypotheses at Field Beacons or in the Lab Supercomputer (🧠 Deduce Driver).',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_tr_intervention',
        number: 4,
        title: 'Act IV • Rapid Triage & Dam Safety Protocol',
        nepaliTitle: 'Bölüm IV • AFAD Müdahale ve Baraj Güvenliği',
        giverNpcId: 'npc_tr_leyla',
        giverName: 'Prof. Leyla Kaya (Observatory)',
        targetStationId: 'tr_dam_crest',
        targetLocationName: 'AFAD–Kandilli 3D Mainframe & Field Sim',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Open 3D Terrain in the Lab Supercomputer AND complete ⚡ Field Action Sim!',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      }
    ],
    photos: GLOBAL_EXTRA_PHOTOS.hatay_turkiye,
    stations: [
      {
        id: 'tr_antakya_havus',
        code: 'HAT-01',
        name: 'Antakya Courtyard Quarter & Çay Evi',
        nepaliSub: 'Tarihi Taş Mahalle • 618m',
        lat: 37.26,
        lon: 37.01,
        elevationM: 618,
        u: 0.44,
        v: 0.75,
        iconType: 'village',
        accentColor: '#f59e0b',
        shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
        humanEconomicStory: "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
        nisarInsight: "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
        physicalDriverHypothesis: {
          question: "Simulation question: What should an educator request after noticing a radar change?",
          options: ["Dated independent evidence and qualified review", "An automatic evacuation based only on a color", "A claim that every bright pixel is flooded"],
          correctIndex: 0,
          explanation: "A radar pattern supports a question, not a uniquely established cause. Request corroborating evidence before discussing action."
        },
        npcName: 'Zeynep Teyze',
        npcRole: 'Antakya Courtyard Host',
        npcDialoguePre: "Fictional dialogue: From the sky my neighbor’s tiled roof looked unbroken, yet the ground-floor columns had sheared—thank goodness AFAD engineers checked inside!",
        npcDialoguePost: "Fictional dialogue: Using radar maps to guide engineers block-by-block brought inspection teams to our street on day one!",
        baselineMetrics: { hhDb: -2.4, hvDb: -10.8, coherence: 0.91, displacementText: "Simulation: Interseismic Strain 18 mm/yr", surfaceState: 'Coherent Stone Urban Fabric' },
        precursorMetrics: { hhDb: -2.5, hvDb: -10.9, coherence: 0.89, displacementText: "Simulation: Locked Fault Segment", surfaceState: 'Tectonic Strain Accumulation (≠ Prediction)' },
        catastropheMetrics: { hhDb: -5.8, hvDb: -12.4, coherence: 0.41, displacementText: "Simulation: Δγ = -0.50 Coherence Drop", surfaceState: 'Priority Structural Triage Zone' }
      },
      {
        id: 'tr_fault_olive',
        code: 'HAT-02',
        name: 'Pazarcık Split Olive Grove Fault Scarp',
        nepaliSub: 'Sol Yanal Fay Kırığı • 685m',
        lat: 37.31,
        lon: 37.07,
        elevationM: 685,
        u: 0.66,
        v: 0.36,
        iconType: 'glacier',
        accentColor: '#ef4444',
        shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
        humanEconomicStory: "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
        nisarInsight: "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
        physicalDriverHypothesis: {
          question: "Simulation question: Does a brighter radar return uniquely measure local soil moisture?",
          options: ["No; roughness, vegetation and viewing geometry also matter", "Yes; every bright pixel is saturated soil", "Yes; a color is a direct volumetric moisture measurement"],
          correctIndex: 0,
          explanation: "Radar responds to several surface properties. This toy wetness layer is not a retrieval of volumetric moisture."
        },
        npcName: 'Kerem Amca',
        npcRole: 'Hatay Olive Grower',
        npcDialoguePre: "Fictional dialogue: My grandfather planted these olive rows straight as a plumb line—overnight the earth slid the northern row four paces west!",
        npcDialoguePost: "Fictional dialogue: Your fault-splay map showed the municipality exactly where to route the new welded steel water main!",
        baselineMetrics: { hhDb: -7.2, hvDb: -13.1, coherence: 0.82, displacementText: "Simulation: 0.0 m Co-seismic", surfaceState: 'Aligned Olive Terraces' },
        precursorMetrics: { hhDb: -7.3, hvDb: -13.2, coherence: 0.80, displacementText: "Simulation: Elastic Fault Locking", surfaceState: 'Regional Strain Field' },
        catastropheMetrics: { hhDb: -8.9, hvDb: -14.8, coherence: 0.29, displacementText: "Simulation: 4.5 m Left-Lateral Slip", surfaceState: 'Surface Rupture & Off-Fault Warping' }
      },
      {
        id: 'tr_dam_crest',
        code: 'HAT-03',
        name: 'Earthen Irrigation Dam Crest',
        nepaliSub: 'Toprak Dolgu Baraj Gövdesi • 660m',
        lat: 37.33,
        lon: 37.02,
        elevationM: 660,
        u: 0.28,
        v: 0.28,
        iconType: 'hydro',
        accentColor: '#38bdf8',
        shortDesc: "Illustrative station in a schematic map; local surface-change evidence is not verified.",
        humanEconomicStory: "Illustrative community stakes: access, homes and livelihoods motivate evidence-led preparedness discussions. No local loss estimate or team field survey is established.",
        nisarInsight: "Simulation: radar backscatter and line-of-sight change can motivate a hypothesis. Geometry, coherence, surface conditions and independent evidence are needed; radar does not predict collapse timing.",
        physicalDriverHypothesis: {
          question: "Simulation question: Can two radar viewing directions guarantee visibility in a steep gorge?",
          options: ["No; check layover, shadow and quality masks", "Yes; they see every surface", "No quality information is ever necessary"],
          correctIndex: 0,
          explanation: "Additional geometry can help interpretation but does not guarantee complete coverage or remove every ambiguity."
        },
        npcName: 'Eng. Demir',
        npcRole: 'DSİ Dam Safety Engineer',
        npcDialoguePre: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        npcDialoguePost: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        baselineMetrics: { hhDb: -4.1, hvDb: -12.5, coherence: 0.90, displacementText: "Simulation: 0.2 cm/yr Settlement", surfaceState: 'Stable Embankment Crest' },
        precursorMetrics: { hhDb: -4.1, hvDb: -12.6, coherence: 0.89, displacementText: "Simulation: Nominal Pore Pressure", surfaceState: 'Winter Full Pool' },
        catastropheMetrics: { hhDb: -5.2, hvDb: -13.4, coherence: 0.68, displacementText: "Simulation: -11.2 cm Crest Slump", surfaceState: 'Post-Seismic Embankment Strain' }
      }
    ],
    passes: makeRegionPasses(
      ['Jan 18, 2026', 'Interseismic', 'Pre-Event Coherent Baseline & Tectonic Locking', 64, 0.1, 1.0, 72, 'Winter baseline: NISAR L-band establishes high phase coherence across Antakya stone quarters, olive terraces, and earthen reservoir embankments.'],
      ['Feb 06, 2026', 'Co-Seismic', 'Nighttime Rupture Under 88% Winter Storm Clouds', 88, 4.5, 1.3, 74, 'Freezing winter clouds block optical cameras, but NISAR L-band interferometry + pixel offsets map 4.5 m strike-slip rupture and OPERA flags urban Δγ decorrelation!'],
      ['Feb 18, 2026', 'Dam Strain', 'Post-Seismic Aftershock Creep & 11 cm Dam Crest Slump', 72, 4.9, 1.5, 76, '12-day repeat pass reveals 11.2 cm settlement on the upstream earthen dam embankment and lateral spreading along riverbanks—triggering controlled reservoir drawdown!'],
      ['Apr 05, 2026', 'Safe Rebuild', 'Post-Seismic Fault Relaxation & Setback Planning', 28, 5.2, 1.1, 56, 'Fusing ascending/descending NISAR passes with Kandilli GNSS guides safe fault-setback reconstruction and structural retrofits!']
    ),
    riverOrFaultPathUV: [
      [0.82, 0.14],
      [0.68, 0.34],
      [0.52, 0.52],
      [0.36, 0.70],
      [0.20, 0.88]
    ],
    terrainProfile: 'strike_slip_fault'
  },

  // ==========================================================================
  // 5. YUKON–KUSKOKWIM TUNDRA COAST, ALASKA (YUP'IK HOMELAND)
  // ==========================================================================
  yukon_alaska: {
    id: 'yukon_alaska',
    order: 5,
    flag: '🇺🇸❄️',
    name: 'Yukon–Kuskokwim Yup’ik Coast',
    nativeTitle: 'Yup’ik Nuna • Yukon–Kuskokwim Tundra Delta',
    country: 'Alaska, USA (Arctic / Sub-Arctic Bering Coast)',
    biomeBadge: 'Ice-Rich Permafrost Tundra & Eroding Bluff (14m)',
    lat: 61.20,
    lon: -163.50,
    coordsLabel: '61.20°N, 163.50°W',
    gibsDate: '2025-07-08',
    gibsZoom: 6,
    accentColor: '#a855f7',
    playerPalette: 'ak_scientist',
    leadScientistName: 'Dr. Panigkaq / ABoVE–NISAR Lead',
    leadScientistRole: 'Yup’ik–NASA ABoVE Permafrost Geodesist',
    labBuildingName: 'ABoVE–NISAR Permafrost Observatory',
    culturalHallName: 'Qasgiq Elders & Community Hall',
    hiddenPhenomenaBadge: 'Permafrost Thaw Subsidence • Coastal Erosion • Thermokarst',
    secondaryPhenomena: [
      'Invisible underground ice-wedge melt beneath intact tundra moss (3–9 cm/summer)',
      '15 m/yr Bering storm-surge coastal bluff collapse',
      'Warping boardwalks, tilting fuel headers & community relocation planning'
    ],
    opticalVisibilityPct: 11,
    sarVisibilityPct: 94,
    culturalSummary:
      'Authentic Yup’ik Alaska Native coastal tundra village: colorful patterned Kuspuk (Qaspeq) parkas & fur ruffs, homes elevated on thermosyphon permafrost pilings, raised wooden boardwalk streets (zero asphalt!), and cedar salmon smokehouses.',
    communityStakesSummary:
      "Illustrative planning context: communities and infrastructure may be exposed to surface change. No local casualty count, loss estimate or achieved impact is claimed.",
    scientificIntegrity: {
      dataProvenanceBadge: "SIMULATION: regional radar layers and scenarios. NASA POWER model output / GIBS archived optical context shown separately; no calibrated NISAR product ingested.",
      isForwardScenarioSimulated: true,
      measuredRadarObservable: "Simulated radar quantities: HH/HV backscatter (dB), coherence (0–1) and line-of-sight deformation (m). No direct measurement in these regional layers.",
      physicalInterpretation: "Illustrative hypothesis only. A radar pattern is not a unique physical cause or hazard probability.",
      whyOpticalFails: "Clouds and lighting can constrain passive optical views. Obstruction percentages are author-chosen illustrations, not sensor accuracy or measured coverage.",
      whySarAloneIsInsufficient: 'Radar change is not a unique cause or disaster-timing prediction. Layover, shadow, coherence, phase wrapping and atmospheric effects require quality checks; extra viewing directions do not guarantee coverage. Independent field evidence and qualified review are not integrated here.',
      complementaryNasaDatasets: ['Integrated NASA POWER climatology (model output)', 'Integrated NASA GIBS optical browse (archived observation when loaded)', 'NISAR, GEDI, GRACE-FO, SMAP, ICESat-2 and local sensors: proposed analytical integration, not implemented'],
      groundValidationRequired: "Required, not performed: dated field observations, surveyed locations, local hydrometeorological records, consent and qualified professional review."
    },
    intervention: {
      missionTitle: 'Protect the Yup’ik Village: Thermosyphon Pilings & Stable Relic-Gravel Relocation',
      stakeholderAgency: 'Yup’ik Tribal Council • ANTHC • NASA ABoVE & Denali Commission',
      challengePrompt:
        "Educational exercise: choose author-defined game controls, acknowledge missing corroboration, and record a hypothetical configuration. No operational action is recommended.",
      complementarySensorRequiredLabel: "Independent field evidence is required, not connected or collected.",
      controls: [
        {
          id: 'thermosyphon_units',
          label: 'Passive CO₂ Thermosyphon Cooling Pilings on Critical Tanks/School',
          unit: ' pilings',
          min: 0,
          max: 40,
          step: 4,
          defaultValue: 8,
          optimalMin: 24,
          optimalMax: 36,
          helpText: "Author-chosen game range for exploring trade-offs. Not derived from engineering design, calibrated hazard thresholds or field validation."
        },
        {
          id: 'setback_m',
          label: 'Boardwalk & Housing Relocation Setback Onto Low-Strain Ridge',
          unit: ' m',
          min: 20,
          max: 260,
          step: 20,
          defaultValue: 40,
          optimalMin: 140,
          optimalMax: 220,
          helpText: "Author-chosen game range for exploring trade-offs. Not derived from engineering design, calibrated hazard thresholds or field validation."
        }
      ],
      actionToggleLabel: "Acknowledge the need for independent field evidence (not connected by this app)",
      successHeadline: "Hypothetical scenario only — no achieved outcome or quantified warning time.",
      impactMetrics: {
        peopleProtectedLabel: "People / livelihoods are discussion priorities, not a calculated number protected.",
        economicOrEcoSavedLabel: "Infrastructure / ecosystems are discussion priorities, not calculated savings.",
        actionableAdvisorySummary:
          "Discussion prompt only: request independently checked evidence and qualified local review before considering any real preparedness or infrastructure decision."
      }
    },
    quests: [
      {
        id: 'quest_ak_bluff',
        number: 1,
        title: 'Act I • Melting Ice Beneath Intact Moss',
        nepaliTitle: 'Act I • Permafrost Bluff & Thermokarst',
        giverNpcId: 'npc_ak_panigkaq',
        giverName: 'Dr. Panigkaq (ABoVE–NISAR)',
        targetStationId: 'ak_bluff_erosion',
        targetLocationName: 'Western Eroding Permafrost Bluff',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Walk the boardwalk to the Western Bluff Scar, scan [SPACE] Beacon YKD-02 & open 📸 Real Photos.',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_ak_elder',
        number: 2,
        title: 'Act II • Yup’ik Wisdom & Smokehouse Pilings',
        nepaliTitle: 'Act II • Qasgiq Elders & Mertarvik Lesson',
        giverNpcId: 'npc_ak_wassillie',
        giverName: 'Wassillie (Yup’ik Harvester)',
        targetStationId: 'ak_yupik_boardwalk',
        targetLocationName: 'Salmon Smokehouse & Qasgiq Elders Hall',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Scan Village Beacon YKD-01 & talk to Grandma Elena inside the Qasgiq Hall.',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_ak_hypothesis',
        number: 3,
        title: 'Act III • Cryosphere Phase & Safe Bedrock',
        nepaliTitle: 'Act III • ICESat-2 Fusion & Relic Gravel Physics',
        giverNpcId: 'npc_ak_panigkaq',
        giverName: 'Dr. Panigkaq (ABoVE–NISAR)',
        targetStationId: 'ak_stable_ridge',
        targetLocationName: 'Any 2 Yup’ik Coast Beacons or ABoVE Lab PC',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Verify at least 2 Radar Driver Hypotheses at Field Beacons or in the Lab Supercomputer (🧠 Deduce Driver).',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      },
      {
        id: 'quest_ak_intervention',
        number: 4,
        title: 'Act IV • Anchor the Arctic Waltz',
        nepaliTitle: 'Act IV • Passive Thermosyphons & Safe Ridge Plan',
        giverNpcId: 'npc_ak_panigkaq',
        giverName: 'Dr. Panigkaq (Permafrost Observatory)',
        targetStationId: 'ak_stable_ridge',
        targetLocationName: 'ABoVE–NISAR 3D Mainframe & Field Sim',
        summary: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
        objectiveHint: 'Open 3D Terrain in the Lab Supercomputer AND complete ⚡ Field Action Sim!',
        rewardKnowledge: "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
      }
    ],
    photos: GLOBAL_EXTRA_PHOTOS.yukon_alaska,
    stations: [
      {
        id: 'ak_yupik_boardwalk',
        code: 'YKD-01',
        name: 'Yup’ik Boardwalk Village & Salmon Smokehouse',
        nepaliSub: 'Yup’ik Village Core • 9m',
        lat: 61.20,
        lon: -163.50,
        elevationM: 9,
        u: 0.48,
        v: 0.62,
        iconType: 'village',
        accentColor: '#38bdf8',
        shortDesc: 'Illustrative station in a schematic map; location and elevations are not field-verified.',
        humanEconomicStory: 'Fictional community stakes motivate an evidence-led discussion. No achieved impact is claimed.',
        nisarInsight: 'Simulation: line-of-sight change requires geometry, coherence and independent evidence; it is not a disaster-timing prediction.',
        physicalDriverHypothesis: {
          question: 'What is needed before applying this illustrated permafrost scenario to a real site?',
          options: ['Independent ground observations and qualified, community-consented review', 'A game score alone', 'A bright radar color alone'],
          correctIndex: 0,
          explanation: 'The map is a simulation, not a certified relocation or engineering decision. Local evidence, consent and professional review are not performed by this app.'
        },
        npcName: 'Grandma Elena',
        npcRole: 'Yup’ik Elder & Educator',
        npcDialoguePre: "Fictional dialogue: Our smokehouse stood straight for forty summers—now the south boardwalk dips ankle-deep into meltwater every August.",
        npcDialoguePost: "Fictional dialogue: Thermosyphon pilings kept the ground frozen solid beneath our clinic and community smokehouse!",
        baselineMetrics: { hhDb: -6.2, hvDb: -13.0, coherence: 0.83, displacementText: "Simulation: -2.1 cm Seasonal Thaw", surfaceState: 'Frozen Permafrost Core (-3.2°C)' },
        precursorMetrics: { hhDb: -7.8, hvDb: -14.1, coherence: 0.69, displacementText: "Simulation: -5.8 cm Differential Heave", surfaceState: 'Warming Active Layer (-0.6°C)' },
        catastropheMetrics: { hhDb: -9.5, hvDb: -15.2, coherence: 0.48, displacementText: "Simulation: -8.9 cm Ice-Wedge Slump", surfaceState: 'Boardwalk & Fuel-Line Buckling' }
      },
      {
        id: 'ak_bluff_erosion',
        code: 'YKD-02',
        name: 'Western Permafrost Coastal Bluff',
        nepaliSub: 'Bering Coast Thermokarst • 4m',
        lat: 61.21,
        lon: -163.56,
        elevationM: 4,
        u: 0.22,
        v: 0.42,
        iconType: 'bridge',
        accentColor: '#ef4444',
        shortDesc: 'Illustrative station in a schematic map; location and elevations are not field-verified.',
        humanEconomicStory: 'Fictional community stakes motivate an evidence-led discussion. No achieved impact is claimed.',
        nisarInsight: 'Simulation: line-of-sight change requires geometry, coherence and independent evidence; it is not a disaster-timing prediction.',
        physicalDriverHypothesis: {
          question: 'What is needed before applying this illustrated permafrost scenario to a real site?',
          options: ['Independent ground observations and qualified, community-consented review', 'A game score alone', 'A bright radar color alone'],
          correctIndex: 0,
          explanation: 'The map is a simulation, not a certified relocation or engineering decision. Local evidence, consent and professional review are not performed by this app.'
        },
        npcName: 'Wassillie',
        npcRole: 'Yup’ik Coastal Harvester',
        npcDialoguePre: "Fictional dialogue: Where our boats pulled up ten years ago is now open water fifty yards offshore—autumn storms eat thawed mud like sugar.",
        npcDialoguePost: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        baselineMetrics: { hhDb: -8.4, hvDb: -14.8, coherence: 0.75, displacementText: "Simulation: -2.5 m/yr Historical", surfaceState: 'Sea-Ice Protected Shore' },
        precursorMetrics: { hhDb: -10.1, hvDb: -15.9, coherence: 0.54, displacementText: "Simulation: -8.6 cm Inland Thaw Sink", surfaceState: 'Ice-Wedge Polygon Melting' },
        catastropheMetrics: { hhDb: -13.2, hvDb: -17.4, coherence: 0.26, displacementText: "Simulation: -15.4 m Storm Bluff Loss", surfaceState: 'Block-Collapse Coastal Retreat' }
      },
      {
        id: 'ak_stable_ridge',
        code: 'YKD-03',
        name: 'Eastern Upland Gravel Ridge (Safe Relocation Site)',
        nepaliSub: 'Ice-Poor Stable Bedrock Terrace • 26m',
        lat: 61.22,
        lon: -163.43,
        elevationM: 26,
        u: 0.76,
        v: 0.30,
        iconType: 'agro',
        accentColor: '#22c55e',
        shortDesc: 'Illustrative station in a schematic map; location and elevations are not field-verified.',
        humanEconomicStory: 'Fictional community stakes motivate an evidence-led discussion. No achieved impact is claimed.',
        nisarInsight: 'Simulation: line-of-sight change requires geometry, coherence and independent evidence; it is not a disaster-timing prediction.',
        physicalDriverHypothesis: {
          question: 'What is needed before applying this illustrated permafrost scenario to a real site?',
          options: ['Independent ground observations and qualified, community-consented review', 'A game score alone', 'A bright radar color alone'],
          correctIndex: 0,
          explanation: 'The map is a simulation, not a certified relocation or engineering decision. Local evidence, consent and professional review are not performed by this app.'
        },
        npcName: 'Dr. Panigkaq',
        npcRole: 'ABoVE–NISAR Permafrost Lead',
        npcDialoguePre: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        npcDialoguePost: "Fictional scenario dialogue: compare the illustrated surface change, ask which evidence is missing, and discuss possible responses with qualified specialists. No real warning, interview or intervention has occurred.",
        baselineMetrics: { hhDb: -5.1, hvDb: -11.9, coherence: 0.92, displacementText: "Simulation: -0.9 cm Seasonal", surfaceState: 'Ice-Poor Well-Drained Gravel' },
        precursorMetrics: { hhDb: -5.3, hvDb: -12.0, coherence: 0.91, displacementText: "Simulation: -1.1 cm Seasonal", surfaceState: 'High Geomechanical Stability' },
        catastropheMetrics: { hhDb: -5.4, hvDb: -12.1, coherence: 0.90, displacementText: "Simulation: -1.2 cm (Safe Refuge)", surfaceState: 'Verified Relocation Corridor' }
      }
    ],
    passes: makeRegionPasses(
      ['May 15, 2026', 'Snowmelt', 'Spring Thaw Onset & Intact Frozen Core', 82, 0.4, 1.0, 80, 'Persistent Bering stratus clouds (82%) hide the delta optically, while NISAR L-band establishes the frozen spring reference surface.'],
      ['Jul 20, 2026', 'Active Thaw', 'Active-Layer Thaw Subsidence (-5.8 cm) Beneath Intact Moss', 76, 2.4, 1.2, 84, 'From airplanes the green-gold tundra moss looks unchanged, yet NISAR L-band reveals -5.8 cm of differential thaw sinking around western ice-wedge polygons!'],
      ['Sep 08, 2026', 'Peak Thaw', 'Maximum Thaw Strain (-8.9 cm) vs. Stable Eastern Gravel Ridge', 85, 4.1, 1.4, 88, 'Peak thaw depth reached! Western bluff zones slump -8.9 cm while the Eastern Gravel Ridge holds rock-steady (<1.2 cm)—pinpointing safe ground!'],
      ['Oct 19, 2026', 'Autumn Surge', 'Ice-Free Bering Storm Undercuts Thawed Western Bluff (-15 m)', 94, 5.5, 2.2, 86, 'In polar twilight and 94% storm cloud cover, NISAR + ICESat-2 map 15 m of bluff collapse and guide thermosyphon + boardwalk relocation!']
    ),
    riverOrFaultPathUV: [
      [0.24, 0.08],
      [0.22, 0.30],
      [0.20, 0.52],
      [0.25, 0.74],
      [0.32, 0.94]
    ],
    terrainProfile: 'permafrost_coast'
  }
};

export const ORDERED_GLOBAL_REGIONS: GlobalRegionDefinition[] = [
  GLOBAL_REGIONS_ATLAS.rasuwa_nepal,
  GLOBAL_REGIONS_ATLAS.pantanal_brazil,
  GLOBAL_REGIONS_ATLAS.san_joaquin_usa,
  GLOBAL_REGIONS_ATLAS.hatay_turkiye,
  GLOBAL_REGIONS_ATLAS.yukon_alaska
];

