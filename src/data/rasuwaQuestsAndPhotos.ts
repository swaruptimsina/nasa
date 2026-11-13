export interface IncidentPhotoRecord {
  id: string;
  stationId: string;
  locationLabel: string;
  nepaliLabel: string;
  dateBadge: string;
  coords: string;
  imageUrl: string;
  title: string;
  description: string;
  nisarCorrelation: string;
  credit: string;
  isDisasterCapture?: boolean;
}

export interface RasuwaQuest {
  id: string;
  number: number;
  title: string;
  nepaliTitle: string;
  giverNpcId: string;
  giverName: string;
  targetStationId: string;
  targetLocationName: string;
  summary: string;
  objectiveHint: string;
  rewardKnowledge: string;
}

export const REAL_INCIDENT_PHOTOS: IncidentPhotoRecord[] = [
  {
    id: 'photo_mudslide_border_live',
    stationId: 'miteri_bridge',
    locationLabel: 'Miteri Bridge & Rasuwagadhi–Gyirong Gorge',
    nepaliLabel: 'मितेरी पुल / रसुवागढी भन्सार नाका',
    dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
    coords: "Exact image location, scale and elevation not verified",
    imageUrl: '/incident_photos/gyirong_rasuwagadhi_mudslide_2025.png',
    title: 'Wall of Rock-Ice Mud Engulfing the Rasuwagadhi–Gyirong Border Crossing',
    description:
      "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
    nisarCorrelation:
      "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
    credit: "Supplied credit, unverified: Border Port Surveillance Capture / Wikimedia Commons (Public Domain); exact source, date, author and permissions require confirmation.",
    isDisasterCapture: true
  },
  {
    id: 'photo_landsat_after_2026',
    stationId: 'purugu_glacier',
    locationLabel: 'Purugu Glacier -> Lhende -> Bhote Koshi Corridor',
    nepaliLabel: 'पुरुगु हिमनदी र ल्हेन्दे–भोटेकोशी बाढी मार्ग',
    dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
    coords: "Exact image location, scale and elevation not verified",
    imageUrl: '/incident_photos/landsat_rasuwa_flood_2026_08_26.png',
    title: "Illustrative surface-change investigation",
    description:
      "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
    nisarCorrelation:
      "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
    credit: "Supplied credit, unverified: NASA / USGS Landsat-9 OLI-2 via Wikimedia Commons (Public Domain); exact source, date, author and permissions require confirmation.",
    isDisasterCapture: true
  },
  {
    id: 'photo_optical_before_2026',
    stationId: 'purugu_glacier',
    locationLabel: 'Upper Lhende & Purugu Basin (48h Pre-Disaster)',
    nepaliLabel: 'विपद् पूर्वको ल्हेन्दे र पुरुगु उपत्यका',
    dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
    coords: "Exact image location, scale and elevation not verified",
    imageUrl: '/incident_photos/nepal_flood_2026_before_after.webp',
    title: "Illustrative surface-change investigation",
    description:
      "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
    nisarCorrelation:
      "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
    credit: "Supplied credit, unverified: Copernicus Sentinel-2 / ESA via Wikimedia Commons; exact source, date, author and permissions require confirmation.",
    isDisasterCapture: true
  },
  {
    id: 'photo_rasuwagadhi_fort',
    stationId: 'miteri_bridge',
    locationLabel: 'Historic 1855 Rasuwagadhi Stone Fort & Bridge Piers',
    nepaliLabel: 'ऐतिहासिक रसुवागढी किल्ला र मितेरी पुल क्षेत्र',
    dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
    coords: "Exact image location, scale and elevation not verified",
    imageUrl: '/incident_photos/rasuwagadhi_fort.jpg',
    title: 'Dry-Stacked Stone Ramparts of Rasuwagadhi Fort Overlooking the Lhende Gorge',
    description:
      "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
    nisarCorrelation:
      "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
    credit: "Supplied credit, unverified: Wikimedia Commons (CC BY-SA 3.0); exact source, date, author and permissions require confirmation."
  },
  {
    id: 'photo_timure_customs',
    stationId: 'timure',
    locationLabel: 'Timure Customs Post & Border Highway',
    nepaliLabel: 'टिमुरे भन्सार कार्यालय, रसुवा',
    dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
    coords: "Exact image location, scale and elevation not verified",
    imageUrl: '/incident_photos/timure_customs_office.jpg',
    title: 'Rasuwa Customs Post in Timure Beneath Sheer Himalayan Rock Walls',
    description:
      "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
    nisarCorrelation:
      "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
    credit: "Supplied credit, unverified: Wikimedia Commons (CC BY-SA 3.0); exact source, date, author and permissions require confirmation."
  },
  {
    id: 'photo_hydropower_dam',
    stationId: 'rasuwagadhi_hydro',
    locationLabel: 'Rasuwa Hydropower Headworks & Desanding Basin',
    nepaliLabel: 'रसुवा जलविद्युत आयोजना बाँध क्षेत्र',
    dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
    coords: "Exact image location, scale and elevation not verified",
    imageUrl: '/incident_photos/chilime_hydropower_dam.jpg',
    title: 'Himalayan Run-of-River Hydropower Basin in the Rasuwa Corridor',
    description:
      "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
    nisarCorrelation:
      "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
    credit: "Supplied credit, unverified: Wikimedia Commons (CC BY-SA 3.0); exact source, date, author and permissions require confirmation."
  },
  {
    id: 'photo_chilime_houses',
    stationId: 'chilime',
    locationLabel: 'Chilime & Goljung Tamang Heritage Terraces',
    nepaliLabel: 'चिलिमे र गोल्जुङका परम्परागत तामाङ बस्ती',
    dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
    coords: "Exact image location, scale and elevation not verified",
    imageUrl: '/incident_photos/chilime_village_houses.jpg',
    title: 'Authentic Dry-Stone & Carved-Timber Tamang Houses Above Terraced Fields',
    description:
      "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
    nisarCorrelation:
      "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
    credit: "Supplied credit, unverified: Wikimedia Commons (CC BY-SA 3.0); exact source, date, author and permissions require confirmation."
  },
  {
    id: 'photo_syabrubesi_dobhan',
    stationId: 'syabrubesi',
    locationLabel: 'Syabrubesi Confluence (Langtang Khola + Bhote Koshi)',
    nepaliLabel: 'स्याफ्रुबेसी दोभान (लाङटाङ खोला र भोटेकोशी संगम)',
    dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
    coords: "Exact image location, scale and elevation not verified",
    imageUrl: '/incident_photos/syabrubesi_confluence.jpg',
    title: 'Syabrubesi Bazaar Perched Right Beside the Roaring Himalayan River Confluence',
    description:
      "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
    nisarCorrelation:
      "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
    credit: "Supplied credit, unverified: Wikimedia Commons (CC BY-SA 4.0); exact source, date, author and permissions require confirmation."
  },
  {
    id: 'photo_langtang_lirung',
    stationId: 'purugu_glacier',
    locationLabel: 'Langtang Lirung (7,227m) & Hanging Glaciers',
    nepaliLabel: 'लाङटाङ लिरुङ हिमाल र झुन्डिएका हिमनदीहरू',
    dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
    coords: "Exact image location, scale and elevation not verified",
    imageUrl: '/incident_photos/langtang_lirung_glacier.jpg',
    title: 'Steep Hanging Ice & Permafrost Headwalls Above the Rasuwa–Langtang Basin',
    description:
      "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
    nisarCorrelation:
      "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
    credit: "Supplied credit, unverified: Wikimedia Commons (CC BY-SA 3.0); exact source, date, author and permissions require confirmation."
  },
  {
    id: 'photo_nisar_satellite',
    stationId: 'syabrubesi',
    locationLabel: 'NASA-ISRO NISAR Dual-Band Observatory',
    nepaliLabel: 'नासा–इसरो निसार (NISAR) भू-उपग्रह',
    dateBadge: "ILLUSTRATION • ASSET ORIGIN / DATE UNVERIFIED",
    coords: "Exact image location, scale and elevation not verified",
    imageUrl: '/incident_photos/nisar_spacecraft_cleanroom.jpg',
    title: 'NASA L-Band & ISRO S-Band Radar Payloads Integrated on the NISAR Spacecraft',
    description:
      "Unverified local asset retained for review, not evidence of a particular event, place or acquisition date. Confirm original source, author and reuse permission before public presentation.",
    nisarCorrelation:
      "Illustrative prompt: compare surface patterns with radar and independent evidence. No co-registered NISAR analysis or field validation is performed.",
    credit: "Supplied credit, unverified: NASA / JPL-Caltech / ISRO (Public Domain); exact source, date, author and permissions require confirmation."
  }
];

export const RASUWA_QUESTS: RasuwaQuest[] = [
  {
    id: 'quest_miteri_scar',
    number: 1,
    title: 'The Swept-Away Border Bridge',
    nepaliTitle: 'बगाइएको मितेरी पुल र रसुवागढी अनुगमन',
    giverNpcId: 'npc_rudra_lab',
    giverName: 'Prof. Dr. Rudra ("Radar Bajey")',
    targetStationId: 'miteri_bridge',
    targetLocationName: 'Miteri Bridge & Rasuwagadhi Fort (North Gorge)',
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    objectiveHint: 'Visit Miteri Bridge (North), open Real Incident Photos there & scan Beacon ST-05',
    rewardKnowledge:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
  },
  {
    id: 'quest_timure_witness',
    number: 2,
    title: 'Voices from the Timure Flood Scar',
    nepaliTitle: 'टिमुरेका बाढी पीडित र पुरिएको भन्सार यार्ड',
    giverNpcId: 'npc_sita_syabru',
    giverName: 'Didi Sita (Rasuwa Ward Relief)',
    targetStationId: 'timure',
    targetLocationName: 'Timure Bazaar & Tamang Tea-House Shelter',
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    objectiveHint: 'Enter Timure Tamang Tea-House, talk to Aama Dolma & scan Beacon ST-03',
    rewardKnowledge:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
  },
  {
    id: 'quest_hydro_terrace',
    number: 3,
    title: '111 MW in the Dark & Saturated Slopes',
    nepaliTitle: 'चिलिमेका भिजेका गरा र १११ मेगावाट बाँध',
    giverNpcId: 'npc_maila_chilime',
    giverName: 'Kaka Maila (Chilime Farmer)',
    targetStationId: 'rasuwagadhi_hydro',
    targetLocationName: 'Chilime Terraces & 111 MW Rasuwagadhi Dam',
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    objectiveHint: 'Scan Chilime Terrace Beacon ST-02 & Rasuwagadhi Dam Beacon ST-04',
    rewardKnowledge:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
  },
  {
    id: 'quest_purugu_crown',
    number: 4,
    title: "Illustrative surface-change investigation",
    nepaliTitle: 'बादलमाथि पुरुगु हिमनदीको ५ मिटर चेतावनी',
    giverNpcId: 'npc_dawa_glacier',
    giverName: 'Dawa Sherpa (High-Altitude Guide)',
    targetStationId: 'purugu_glacier',
    targetLocationName: 'Purugu / Langtang Glacier Crown (5,366m East)',
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    objectiveHint: 'Trek East-Northeast to Purugu Glacier Crown & scan Beacon ST-06',
    rewardKnowledge:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
  },
  {
    id: 'quest_arm_siren',
    number: 5,
    title: "Illustrative surface-change investigation",
    nepaliTitle: 'रसुवा पूर्वसूचना साइरन प्रणाली जडान',
    giverNpcId: 'npc_rudra_lab',
    giverName: 'Prof. Dr. Rudra ("Radar Bajey")',
    targetStationId: 'syabrubesi',
    targetLocationName: 'Inside DHM–NISAR Himalayan Kendra (Syabrubesi)',
    summary:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established.",
    objectiveHint: 'Boot Giant Lab PC -> View 3D Terrain -> Arm Early-Warning Sirens in Tab F4',
    rewardKnowledge:
      "Simulation learning step: compare surface patterns, distinguish observation from interpretation, and request independent evidence. No historical measurement, validated forecast or operational action is established."
  }
];
