import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LHENDE_BHOTE_RIVER_PATH } from '../data/rasuwaStoryData';
import { GLOBAL_REGIONS_ATLAS } from '../data/globalRegionsAtlas';
import { GlobalRegionId } from '../services/nasaEarthDataService';
import { RadarLayerMode, Station, TimelinePass, ViewDimension } from '../types';
import {
  buildRegionalRasterCanvas,
  computeRegionalDeformationM,
  getLayerLegendSpec,
  getRegionalDem,
  sampleRegionalElevationAtUV
} from '../utils/regionalDemGenerator';
import { retroAudio } from '../audio/retroAudioAndVoice';
import { artisticLosHeightKm, uvToSceneXZ } from '../utils/simulatedRadarPhysics';
import { layoutMapBadges, type PlacedMapBadge } from '../utils/mapLabelLayout';

interface TerrainMap3DProps {
  regionId?: GlobalRegionId;
  dimension: ViewDimension;
  onTransitionComplete: (target: '2d' | '3d') => void;
  currentPass: TimelinePass;
  layerMode: RadarLayerMode;
  activeStation: Station;
  onSelectStation: (st: Station) => void;
  playerUV: { u: number; v: number };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface ProjectedPin {
  station: Station;
  screenX: number;
  screenY: number;
  visible: boolean;
  badge?: PlacedMapBadge;
}

function getShort3DPinName(st: Station): string {
  const names: Record<string, string> = {
    syabrubesi: 'Syabrubesi Dobhan',
    chilime: 'Chilime Terraces',
    timure: 'Timure Canyon',
    rasuwagadhi_hydro: 'Hydropower site',
    miteri_bridge: 'Miteri Bridge',
    purugu_glacier: 'Schematic headwall',
    br_palafita_vila: 'Vila Palafita',
    br_peat_channel: 'Corixo Peatland',
    br_logging_front: 'Logging Frontier',
    ca_hydro_station: 'Hydro Cooperativa',
    ca_corcoran_bowl: 'Corcoran Bowl',
    ca_aqueduct_levee: 'Aqueduct Sag',
    tr_antakya_havus: 'Antakya Basin',
    tr_fault_olive: 'Pazarcık Fault',
    tr_dam_crest: 'Dam Crest',
    ak_yupik_boardwalk: 'Yup’ik Village',
    ak_bluff_erosion: 'Coastal Bluff',
    ak_stable_ridge: 'Gravel Ridge'
  };
  return names[st.id] || st.name.split('&')[0].trim();
}

function getSimulationButtonMeta(regionId: GlobalRegionId): {
  icon: string;
  idleLabel: string;
  runningPrefix: string;
  tooltip: string;
} {
  switch (regionId) {
    case 'hatay_turkiye':
      return {
        icon: '⚡',
        idleLabel: 'SIMULATE FAULT RUPTURE',
        runningPrefix: 'SEISMIC WAVE',
        tooltip: 'Visualize left-lateral fault rupture propagation along the East Anatolian Fault & seismic wave arrival across Antakya and the upstream dam.'
      };
    case 'san_joaquin_usa':
      return {
        icon: '💧',
        idleLabel: 'SIMULATE AQUEDUCT & BOWL',
        runningPrefix: 'HYDRO-SUBSIDENCE',
        tooltip: 'Visualize California Aqueduct gravity conveyance through the Corcoran Clay subsidence trough and MAR recharge basin.'
      };
    case 'pantanal_brazil':
      return {
        icon: '🌊',
        idleLabel: 'SIMULATE FLOOD PULSE',
        runningPrefix: 'FLOOD PULSE',
        tooltip: 'Visualize seasonal tropical flood-pulse propagation beneath gallery forest canopy down the Cuiabá-Paraguay corridor.'
      };
    case 'yukon_alaska':
      return {
        icon: '🌊',
        idleLabel: 'SIMULATE STORM SURGE',
        runningPrefix: 'BERING SURGE',
        tooltip: 'Visualize autumn Bering Sea storm-surge wave action impacting thawing coastal permafrost bluffs vs stable upland ridge.'
      };
    case 'rasuwa_nepal':
    default:
      return {
        icon: '🌊',
        idleLabel: 'SIMULATE DEBRIS CASCADE',
        runningPrefix: 'CASCADE',
        tooltip: 'Illustration only: an authored debris cascade along the schematic river corridor. Not a reconstruction or event forecast.'
      };
  }
}

export const TerrainMap3D: React.FC<TerrainMap3DProps> = ({
  regionId = 'rasuwa_nepal',
  dimension,
  onTransitionComplete,
  currentPass,
  layerMode,
  activeStation,
  onSelectStation,
  playerUV
}) => {
  const regionDef = GLOBAL_REGIONS_ATLAS[regionId];
  const regDem = getRegionalDem(regionId);
  const regStations = regionDef.stations;
  const regPath =
    regionId === 'rasuwa_nepal' ? LHENDE_BHOTE_RIVER_PATH : regionDef.riverOrFaultPathUV;

  // Scene units follow the declared illustrative DEM extent, not a surveyed map.
  const WORLD_W = regDem.bounds.widthKm;
  const WORLD_D = regDem.bounds.heightKm;
  const uvToWorldXZ = (u: number, v: number) => uvToSceneXZ(regDem.bounds, u, v);
  const mapCameraScale = Math.max(WORLD_W, WORLD_D) / 25.5;
  const elevSpan = Math.max(55, regDem.maxElev - regDem.minElev);
  const baseVerticalExaggeration = regionId === 'rasuwa_nepal' ? 1 :
    (regionId === 'hatay_turkiye' ? 4.4 : regionId === 'san_joaquin_usa' ? 3.2 : 2.6) / (elevSpan / 1000);
  const elevToUnit = (elevM: number) => ((elevM - regDem.minElev) / 1000) * baseVerticalExaggeration;
  const losHeightExaggeration = regionId === 'san_joaquin_usa' ? 950 :
    regionId === 'hatay_turkiye' ? 420 : regionId === 'yukon_alaska' ? 850 : 350;

  const legend = useMemo(() => getLayerLegendSpec(layerMode, regionId), [layerMode, regionId]);
  const simMeta = useMemo(() => getSimulationButtonMeta(regionId), [regionId]);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const [reliefScale, setReliefScale] = useState<number>(1.4);
  const [showCloudDeck3D, setShowCloudDeck3D] = useState<boolean>(false);
  const [cascadeSimProgress, setCascadeSimProgress] = useState<number | null>(null);
  const [morphPercent, setMorphPercent] = useState<number>(0);
  const [projectedPins, setProjectedPins] = useState<ProjectedPin[]>([]);
  const pinLabelRefs = useRef(new Map<string, HTMLButtonElement>());
  const activeStationIdRef = useRef(activeStation.id);
  activeStationIdRef.current = activeStation.id;

  const sceneObjsRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    terrainGeom: THREE.PlaneGeometry;
    terrainMat: THREE.MeshStandardMaterial;
    wireMat: THREE.MeshBasicMaterial;
    cloudMesh: THREE.Mesh;
    satGroup: THREE.Group;
    swathCone: THREE.Mesh;
    playerBeacon: THREE.Group;
    stationMastsGroup: THREE.Group;
    cascadeGroup: THREE.Group;
    seismicRingsGroup: THREE.Group;
    baseHeightsKm: Float32Array;
    dynamicHeightsKm: Float32Array;
    heightsDirty: boolean;
  } | null>(null);

  const animStateRef = useRef<{
    extrude: number;
    reliefMultiplier: number;
    flyFromPos: THREE.Vector3 | null;
    flyToPos: THREE.Vector3 | null;
    flyFromTarget: THREE.Vector3 | null;
    flyToTarget: THREE.Vector3 | null;
    flyProgress: number;
    flyDurationMs: number;
    flyStartTime: number;
    onFlyDone: (() => void) | null;
  }>({
    extrude: 0,
    reliefMultiplier: 1.4,
    flyFromPos: null,
    flyToPos: null,
    flyFromTarget: null,
    flyToTarget: null,
    flyProgress: 1,
    flyDurationMs: 1600,
    flyStartTime: 0,
    onFlyDone: null
  });

  const getStationCameraPose = (st: Station | null, relief: number) => {
    if (!st) {
      return {
        pos: new THREE.Vector3(-4.2 * mapCameraScale, 14.8 * mapCameraScale, 19.2 * mapCameraScale),
        target: new THREE.Vector3(0.2, 1.6 * relief, -0.3)
      };
    }
    const { x, z } = uvToWorldXZ(st.u, st.v);
    const sampledElev = sampleRegionalElevationAtUV(regionId, st.u, st.v);
    const y = elevToUnit(sampledElev) * relief;
    if (st.id === 'purugu_glacier') {
      return {
        pos: new THREE.Vector3(x - 8.2, y + 6.4, z + 7.8),
        target: new THREE.Vector3(x + 0.6, y - 0.3, z - 0.2)
      };
    }
    return {
      pos: new THREE.Vector3(x - 4.8, Math.max(5.2, y + 5.2), z + 8.2),
      target: new THREE.Vector3(x + 0.6, y + 0.35, z - 0.6)
    };
  };

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    const bgHex =
      regionId === 'hatay_turkiye'
        ? '#08101d'
        : regionId === 'pantanal_brazil'
          ? '#051314'
          : regionId === 'san_joaquin_usa'
            ? '#0c121e'
            : '#050c18';
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.014);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.2, 180);
    camera.position.set(0, 29.0 * mapCameraScale, 0.02);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.maxPolarAngle = Math.PI * 0.47;
    controls.minDistance = 4.2;
    controls.maxDistance = 46;

    const hemi = new THREE.HemisphereLight('#e0f2fe', '#0f172a', 1.2);
    scene.add(hemi);

    const sun = new THREE.DirectionalLight('#fff7ed', 1.65);
    sun.position.set(-16, 25, 14);
    scene.add(sun);

    const rim = new THREE.DirectionalLight('#38bdf8', 0.5);
    rim.position.set(18, 12, -16);
    scene.add(rim);

    const gridHelper = new THREE.GridHelper(44, 44, '#0ea5e9', '#0d2238');
    gridHelper.position.y = -0.12;
    scene.add(gridHelper);

    const segW = regDem.cols - 1;
    const segH = regDem.rows - 1;
    const terrainGeom = new THREE.PlaneGeometry(WORLD_W, WORLD_D, segW, segH);
    terrainGeom.rotateX(-Math.PI / 2);

    const vertCount = regDem.cols * regDem.rows;
    const baseHeightsKm = new Float32Array(vertCount);
    const dynamicHeightsKm = new Float32Array(vertCount);
    for (let r = 0; r < regDem.rows; r++) {
      for (let c = 0; c < regDem.cols; c++) {
        const idx = r * regDem.cols + c;
        const hUnit = elevToUnit(regDem.elevations[r][c]);
        baseHeightsKm[idx] = hUnit;
        dynamicHeightsKm[idx] = hUnit;
      }
    }

    const initialCanvas = buildRegionalRasterCanvas(regionId, layerMode, currentPass, 0, 3);
    const tex = new THREE.CanvasTexture(initialCanvas);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    tex.colorSpace = THREE.SRGBColorSpace;

    const terrainMat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.84,
      metalness: 0.06,
      flatShading: false
    });
    const terrainMesh = new THREE.Mesh(terrainGeom, terrainMat);
    scene.add(terrainMesh);

    const wireMat = new THREE.MeshBasicMaterial({
      color: '#22d3ee',
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireMesh = new THREE.Mesh(terrainGeom, wireMat);
    wireMesh.position.y = 0.02;
    scene.add(wireMesh);

    // Procedural FBM Cloud / Smoke / Fog Deck Plane
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 256;
    cloudCanvas.height = 256;
    const cctx = cloudCanvas.getContext('2d')!;
    const cImg = cctx.createImageData(256, 256);
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        const n =
          Math.sin(x * 0.055) * Math.cos(y * 0.055) * 0.45 +
          Math.sin((x * 1.3 + y * 0.9) * 0.11) * 0.3 +
          Math.cos((x - y * 1.4) * 0.17) * 0.15 +
          0.5;
        const i = (y * 256 + x) * 4;
        const isSmoke = regionId === 'pantanal_brazil';
        cImg.data[i] = isSmoke ? 226 : 238;
        cImg.data[i + 1] = isSmoke ? 208 : 246;
        cImg.data[i + 2] = isSmoke ? 188 : 255;
        cImg.data[i + 3] = n > 0.34 ? Math.min(210, Math.round((n - 0.22) * 235)) : 0;
      }
    }
    cctx.putImageData(cImg, 0, 0);
    const cloudTex = new THREE.CanvasTexture(cloudCanvas);
    const cloudMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(WORLD_W, WORLD_D, 1, 1).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    );
    scene.add(cloudMesh);

    // 3D Orbiting NASA-ISRO NISAR Spacecraft + 12m Gold Mesh Reflector + Radar Swath
    const satGroup = new THREE.Group();
    const bus = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.55, 0.65),
      new THREE.MeshStandardMaterial({ color: '#e2e8f0', metalness: 0.65, roughness: 0.28 })
    );
    satGroup.add(bus);
    const wingMat = new THREE.MeshStandardMaterial({
      color: '#1d4ed8',
      emissive: '#1e3a8a',
      emissiveIntensity: 0.5
    });
    const wingL = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.06, 0.6), wingMat);
    wingL.position.x = -1.6;
    const wingR = wingL.clone();
    wingR.position.x = 1.6;
    satGroup.add(wingL, wingR);

    const boom = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1.4, 8),
      new THREE.MeshBasicMaterial({ color: '#fbbf24' })
    );
    boom.position.set(0, 0.8, 0.5);
    boom.rotation.x = 0.4;
    satGroup.add(boom);

    const goldDrum = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.85, 0.25, 24, 1, false),
      new THREE.MeshStandardMaterial({
        color: '#f59e0b',
        emissive: '#b45309',
        emissiveIntensity: 0.45
      })
    );
    goldDrum.position.set(0, 1.35, 0.85);
    goldDrum.rotation.x = 0.5;
    satGroup.add(goldDrum);

    const swathGeom = new THREE.ConeGeometry(4.8, 15.2, 28, 1, true);
    const swathMat = new THREE.MeshBasicMaterial({
      color: '#38bdf8',
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const swathCone = new THREE.Mesh(swathGeom, swathMat);
    swathCone.position.set(0, -7.6, 0);
    satGroup.add(swathCone);
    satGroup.position.set(0, 16.5, 0);
    scene.add(satGroup);

    // 3D Vertical Station Survey Masts + Trihedral Corner Reflector Diamonds!
    const stationMastsGroup = new THREE.Group();
    regStations.forEach((st) => {
      const g = new THREE.Group();
      g.userData = { u: st.u, v: st.v };
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 0.95, 8),
        new THREE.MeshBasicMaterial({ color: st.accentColor })
      );
      stem.position.y = 0.475;
      const reflector = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.18, 0),
        new THREE.MeshStandardMaterial({
          color: st.accentColor,
          emissive: st.accentColor,
          emissiveIntensity: 0.6,
          metalness: 0.7,
          roughness: 0.2
        })
      );
      reflector.position.y = 0.98;
      const basePad = new THREE.Mesh(
        new THREE.RingGeometry(0.16, 0.3, 18).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: st.accentColor, side: THREE.DoubleSide })
      );
      basePad.position.y = 0.04;
      g.add(stem, reflector, basePad);
      stationMastsGroup.add(g);
    });
    scene.add(stationMastsGroup);

    // 3D Player Field Position Beacon
    const playerBeacon = new THREE.Group();
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 1.8, 12),
      new THREE.MeshBasicMaterial({ color: '#facc15', transparent: true, opacity: 0.85 })
    );
    beam.position.y = 0.9;
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.24, 0.42, 20).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: '#fde047', side: THREE.DoubleSide })
    );
    ring.position.y = 0.05;
    playerBeacon.add(beam, ring);
    scene.add(playerBeacon);

    // 3D Hydrological / Surge / Rupture Particle Group
    const cascadeGroup = new THREE.Group();
    const particleColorA =
      regionId === 'hatay_turkiye'
        ? '#f43f5e'
        : regionId === 'pantanal_brazil'
          ? '#34d399'
          : '#38bdf8';
    const particleColorB =
      regionId === 'hatay_turkiye'
        ? '#facc15'
        : regionId === 'yukon_alaska'
          ? '#bae6fd'
          : '#fb923c';
    for (let i = 0; i < 32; i++) {
      const sphere = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.2 + (i % 3) * 0.08, 0),
        new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? particleColorA : particleColorB
        })
      );
      sphere.visible = false;
      cascadeGroup.add(sphere);
    }
    scene.add(cascadeGroup);

    // 3D Expanding Wavefront Rings (used for Seismic P/S Waves in Hatay & Subsidence/Recharge ripples in California!)
    const seismicRingsGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const waveRing = new THREE.Mesh(
        new THREE.RingGeometry(0.85, 1.0, 48).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? '#f43f5e' : '#facc15',
          transparent: true,
          opacity: 0.75,
          side: THREE.DoubleSide
        })
      );
      waveRing.visible = false;
      seismicRingsGroup.add(waveRing);
    }
    scene.add(seismicRingsGroup);

    sceneObjsRef.current = {
      renderer,
      scene,
      camera,
      controls,
      terrainGeom,
      terrainMat,
      wireMat,
      cloudMesh,
      satGroup,
      swathCone,
      playerBeacon,
      stationMastsGroup,
      cascadeGroup,
      seismicRingsGroup,
      baseHeightsKm,
      dynamicHeightsKm,
      heightsDirty: true
    };

    const handleResize = () => {
      if (!mountRef.current || !sceneObjsRef.current) return;
      const nw = mountRef.current.clientWidth || 800;
      const nh = mountRef.current.clientHeight || 520;
      sceneObjsRef.current.camera.aspect = nw / nh;
      sceneObjsRef.current.camera.updateProjectionMatrix();
      sceneObjsRef.current.renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    let rafId = 0;
    let frameCount = 0;

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate);
      frameCount++;
      const objs = sceneObjsRef.current;
      if (!objs) return;

      const st = animStateRef.current;

      if (st.flyProgress < 1 && st.flyFromPos && st.flyToPos && st.flyFromTarget && st.flyToTarget) {
        const rawT = Math.min(1, (now - st.flyStartTime) / st.flyDurationMs);
        st.flyProgress = rawT;
        const e = easeInOutCubic(rawT);

        objs.camera.position.lerpVectors(st.flyFromPos, st.flyToPos, e);
        objs.controls.target.lerpVectors(st.flyFromTarget, st.flyToTarget, e);

        if (rawT >= 1 && st.onFlyDone) {
          const cb = st.onFlyDone;
          st.onFlyDone = null;
          cb();
        }
      }

      const posAttr = objs.terrainGeom.attributes.position as THREE.BufferAttribute;
      const targetScale = st.extrude * st.reliefMultiplier;
      const sampleIdx = Math.floor(posAttr.count / 2);
      const expectedSampleY = objs.dynamicHeightsKm[sampleIdx] * targetScale;

      if (objs.heightsDirty || Math.abs(posAttr.getY(sampleIdx) - expectedSampleY) > 0.0005) {
        for (let i = 0; i < posAttr.count; i++) {
          posAttr.setY(i, objs.dynamicHeightsKm[i] * targetScale);
        }
        posAttr.needsUpdate = true;
        objs.terrainGeom.computeVertexNormals();
        objs.heightsDirty = false;
      }

      // Sync 3D station masts vertically with terrain extrusion & spin reflectors gently
      objs.stationMastsGroup.visible = st.extrude > 0.35;
      objs.stationMastsGroup.children.forEach((mast, idx) => {
        const u = mast.userData.u as number;
        const v = mast.userData.v as number;
        const { x, z } = uvToWorldXZ(u, v);
        const surfElev = sampleRegionalElevationAtUV(regionId, u, v);
        const y = elevToUnit(surfElev) * targetScale;
        mast.position.set(x, y, z);
        if (mast.children[1]) {
          mast.children[1].rotation.y = now * 0.0018 + idx;
        }
      });

      const orbitAngle = now * 0.00032;
      objs.satGroup.position.set(
        Math.sin(orbitAngle) * 8.5,
        15.2 * Math.max(0.45, st.extrude),
        Math.cos(orbitAngle * 0.8) * 6.8
      );
      objs.satGroup.visible = st.extrude > 0.18;

      objs.cloudMesh.position.y = (regionId === 'rasuwa_nepal' ? 2.8 : 2.1) * targetScale;

      objs.controls.update();
      objs.renderer.render(objs.scene, objs.camera);

      if (frameCount % 2 === 0 && mountRef.current) {
        const cw = mountRef.current.clientWidth;
        const ch = mountRef.current.clientHeight;
        const nextPins: ProjectedPin[] = regStations.map((station) => {
          const { x, z } = uvToWorldXZ(station.u, station.v);
          const surfElev = sampleRegionalElevationAtUV(regionId, station.u, station.v);
          const y = elevToUnit(surfElev) * targetScale + 1.15;
          const v3 = new THREE.Vector3(x, y, z).project(objs.camera);
          return {
            station,
            screenX: (v3.x * 0.5 + 0.5) * cw,
            screenY: (-v3.y * 0.5 + 0.5) * ch,
            visible: Math.abs(v3.x) <= 1 && Math.abs(v3.y) <= 1 && v3.z >= -1 && v3.z < 1 && st.extrude > 0.55
          };
        });
        const badgePositions = new Map(layoutMapBadges(nextPins.flatMap((pin) => {
          if (!pin.visible) return [];
          const rect = pinLabelRefs.current.get(pin.station.id)?.getBoundingClientRect();
          if (!rect || rect.width <= 0 || rect.height <= 0) return [];
          return [{
            id: pin.station.id,
            anchorX: pin.screenX,
            anchorY: pin.screenY,
            width: rect.width,
            height: rect.height,
            selected: pin.station.id === activeStationIdRef.current
          }];
        }), cw, ch).map((badge) => [badge.id, badge]));
        setProjectedPins(nextPins.map((pin) => ({ ...pin, badge: badgePositions.get(pin.station.id) })));
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      sceneObjsRef.current = null;
    };
  }, [regionId]);

  // Update the simulation texture and explicitly artistic height warp.
  useEffect(() => {
    const objs = sceneObjsRef.current;
    if (!objs) return;

    // LOS is not vertical motion. This authored warp is for visual explanation only.
    for (let r = 0; r < regDem.rows; r++) {
      const v = r / (regDem.rows - 1);
      for (let c = 0; c < regDem.cols; c++) {
        const u = c / (regDem.cols - 1);
        const idx = r * regDem.cols + c;
        const def = computeRegionalDeformationM(regionId, u, v, currentPass);
        const visualDeformUnits = artisticLosHeightKm(def.losMeters, losHeightExaggeration);
        objs.dynamicHeightsKm[idx] = Math.max(-0.35, objs.baseHeightsKm[idx] + visualDeformUnits);
      }
    }
    objs.heightsDirty = true;

    const canvas = buildRegionalRasterCanvas(regionId, layerMode, currentPass, 0, 3);
    const newTex = new THREE.CanvasTexture(canvas);
    newTex.magFilter = THREE.LinearFilter;
    newTex.minFilter = THREE.LinearMipmapLinearFilter;
    newTex.anisotropy = Math.min(8, objs.renderer.capabilities.getMaxAnisotropy());
    newTex.colorSpace = THREE.SRGBColorSpace;
    if (objs.terrainMat.map) objs.terrainMat.map.dispose();
    objs.terrainMat.map = newTex;
    objs.terrainMat.needsUpdate = true;

    objs.wireMat.opacity =
      layerMode === 'retro_wireframe' ? 0.55 : layerMode === 'lband_insar' ? 0.12 : 0.04;
    objs.swathCone.material = new THREE.MeshBasicMaterial({
      color: layerMode === 'lband_insar' ? '#e879f9' : '#38bdf8',
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  }, [regionId, layerMode, currentPass, regDem]);

  // Sync Relief Exaggeration, Cloud Deck, and Player Scout 3D Beacon
  useEffect(() => {
    animStateRef.current.reliefMultiplier = reliefScale;
    const objs = sceneObjsRef.current;
    if (!objs) return;
    objs.heightsDirty = true;
    const { x, z } = uvToWorldXZ(playerUV.u, playerUV.v);
    const elev = sampleRegionalElevationAtUV(regionId, playerUV.u, playerUV.v);
    const y = elevToUnit(elev) * reliefScale * animStateRef.current.extrude;
    objs.playerBeacon.position.set(x, y, z);
    (objs.cloudMesh.material as THREE.MeshBasicMaterial).opacity =
      showCloudDeck3D ? Math.max(0.28, (currentPass.cloudCoverPct / 100) * 0.8) : 0.0;
  }, [reliefScale, playerUV, showCloudDeck3D, currentPass, regionId]);

  // Smooth 2D <-> 3D Extrusion Transitions
  useEffect(() => {
    const objs = sceneObjsRef.current;
    if (!objs) return;
    const st = animStateRef.current;

    if (dimension === 'transition-to-3d') {
      objs.controls.enabled = false;
      st.extrude = 0.0;
      objs.camera.position.set(0, 28.5 * mapCameraScale, 0.02);
      objs.controls.target.set(0, 0, 0);
      objs.wireMat.opacity = 0.6;

      const dest = getStationCameraPose(activeStation, reliefScale);
      st.flyFromPos = objs.camera.position.clone();
      st.flyToPos = dest.pos;
      st.flyFromTarget = new THREE.Vector3(0, 0, 0);
      st.flyToTarget = dest.target;
      st.flyDurationMs = 1650;
      st.flyStartTime = performance.now();
      st.flyProgress = 0;

      const start = performance.now();
      const morphInterval = window.setInterval(() => {
        const p = Math.min(1, (performance.now() - start) / 1650);
        const e = easeInOutCubic(p);
        st.extrude = e;
        objs.heightsDirty = true;
        setMorphPercent(Math.round(p * 100));
        objs.wireMat.opacity =
          layerMode === 'retro_wireframe' ? 0.55 : Math.sin(p * Math.PI) * 0.45 + 0.05;
        if (p >= 1) clearInterval(morphInterval);
      }, 16);

      st.onFlyDone = () => {
        clearInterval(morphInterval);
        st.extrude = 1.0;
        objs.heightsDirty = true;
        setMorphPercent(100);
        objs.controls.enabled = true;
        onTransitionComplete('3d');
      };

      return () => clearInterval(morphInterval);
    }

    if (dimension === '3d') {
      st.extrude = 1.0;
      objs.heightsDirty = true;
      objs.controls.enabled = true;
    }

    if (dimension === 'transition-to-2d') {
      objs.controls.enabled = false;
      st.flyFromPos = objs.camera.position.clone();
      st.flyToPos = new THREE.Vector3(0, 28.5 * mapCameraScale, 0.02);
      st.flyFromTarget = objs.controls.target.clone();
      st.flyToTarget = new THREE.Vector3(0, 0, 0);
      st.flyDurationMs = 1150;
      st.flyStartTime = performance.now();
      st.flyProgress = 0;

      const start = performance.now();
      const revInterval = window.setInterval(() => {
        const p = Math.min(1, (performance.now() - start) / 1150);
        st.extrude = 1.0 - easeInOutCubic(p);
        objs.heightsDirty = true;
        setMorphPercent(Math.round((1 - p) * 100));
        objs.wireMat.opacity = Math.sin(p * Math.PI) * 0.5 + 0.08;
        if (p >= 1) clearInterval(revInterval);
      }, 16);

      st.onFlyDone = () => {
        clearInterval(revInterval);
        st.extrude = 0.0;
        onTransitionComplete('2d');
      };

      return () => clearInterval(revInterval);
    }
  }, [dimension]);

  const flyCameraToStation = (station: Station | null) => {
    const objs = sceneObjsRef.current;
    if (!objs || dimension !== '3d') return;
    retroAudio.playUiClick(680);
    if (station) onSelectStation(station);
    const dest = getStationCameraPose(station, reliefScale);
    const st = animStateRef.current;
    st.flyFromPos = objs.camera.position.clone();
    st.flyToPos = dest.pos;
    st.flyFromTarget = objs.controls.target.clone();
    st.flyToTarget = dest.target;
    st.flyDurationMs = 1050;
    st.flyStartTime = performance.now();
    st.flyProgress = 0;
  };

  const startProcessSimulation = () => {
    retroAudio.playSirenAlert();
    flyCameraToStation(null);
    setCascadeSimProgress(0);
  };

  // Region-Specific 3D Geophysical Process Simulation!
  useEffect(() => {
    if (cascadeSimProgress === null) return;
    const objs = sceneObjsRef.current;
    const start = performance.now();
    const duration = 6400;

    const timer = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / duration);
      setCascadeSimProgress(t);

      if (objs) {
        const children = objs.cascadeGroup.children;
        const rings = objs.seismicRingsGroup.children;

        if (regionId === 'yukon_alaska') {
          // Bering Sea storm-surge wave line sweeping Eastward from u=0.04 toward coastal bluff u=0.31!
          children.forEach((mesh, idx) => {
            mesh.visible = true;
            const rowFrac = idx / Math.max(1, children.length - 1);
            const wavePhase = ((t * 2.4 + (idx % 3) * 0.25) % 1);
            const u = 0.04 + wavePhase * 0.275;
            const v = 0.1 + rowFrac * 0.8;
            const { x, z } = uvToWorldXZ(u, v);
            const surfElev = sampleRegionalElevationAtUV(regionId, u, v);
            const y = elevToUnit(surfElev) * reliefScale + 0.22 + Math.sin(wavePhase * Math.PI) * 0.28;
            mesh.position.set(x, y, z);
            mesh.rotation.z += 0.14;
          });
          rings.forEach((r) => (r.visible = false));
        } else {
          // Propagate along primary river / aqueduct / fault rupture trace
          children.forEach((mesh, idx) => {
            const headT = t * 1.18 - idx * 0.02;
            if (headT < 0 || headT > 1) {
              mesh.visible = false;
              return;
            }
            mesh.visible = true;
            const segFloat = headT * (regPath.length - 1);
            const s0 = Math.min(regPath.length - 2, Math.floor(segFloat));
            const frac = segFloat - s0;
            const [u1, v1] = regPath[s0];
            const [u2, v2] = regPath[s0 + 1];
            const u = u1 + (u2 - u1) * frac;
            const v = v1 + (v2 - v1) * frac;
            const { x, z } = uvToWorldXZ(u, v);
            const elev = sampleRegionalElevationAtUV(regionId, u, v);
            const y = elevToUnit(elev) * reliefScale + 0.26;
            mesh.position.set(
              x + Math.sin(idx * 3.1 + t * 22) * 0.16,
              y + Math.abs(Math.sin(t * 26 + idx)) * 0.2,
              z + Math.cos(idx * 2.7 + t * 22) * 0.16
            );
            mesh.rotation.x += 0.14;
            mesh.rotation.z += 0.12;
          });

          // Expanding P/S Seismic Wavefronts in Hatay OR Subsidence/MAR Rings in San Joaquin!
          if (regionId === 'hatay_turkiye' || regionId === 'san_joaquin_usa') {
            const centerUV =
              regionId === 'hatay_turkiye' ? { u: 0.62, v: 0.41 } : { u: 0.62, v: 0.49 };
            const { x: cx, z: cz } = uvToWorldXZ(centerUV.u, centerUV.v);
            const cy =
              elevToUnit(sampleRegionalElevationAtUV(regionId, centerUV.u, centerUV.v)) *
                reliefScale +
              0.35;

            rings.forEach((ring, rIdx) => {
              const rPhase = ((t * 2.2 - rIdx * 0.22) % 1 + 1) % 1;
              ring.visible = true;
              const radius = 0.6 + rPhase * 9.5;
              ring.position.set(cx, cy, cz);
              ring.scale.set(radius, radius, 1);
              ((ring as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
                (1 - rPhase) * 0.78;
            });
          } else {
            rings.forEach((r) => (r.visible = false));
          }
        }
      }

      if (t >= 1) {
        clearInterval(timer);
        window.setTimeout(() => {
          if (sceneObjsRef.current) {
            sceneObjsRef.current.cascadeGroup.children.forEach((m) => (m.visible = false));
            sceneObjsRef.current.seismicRingsGroup.children.forEach((m) => (m.visible = false));
          }
          setCascadeSimProgress(null);
        }, 900);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [cascadeSimProgress !== null, regionId, reliefScale]);

  const isTransitioning =
    dimension === 'transition-to-3d' || dimension === 'transition-to-2d';

  return (
    <div className="terrain-3d-workbench">
      <section className="terrain-3d-wrapper" aria-label="3D simulation viewport">
      <div ref={mountRef} className="terrain-3d-canvas-host" aria-label="Illustrative 3D terrain with simulated radar texture" />

      {/* Dynamic Region-Accurate 3D Geodetic Relief Extrusion Banner */}
      {isTransitioning && (
        <div className="retro-morph-banner">
          <div className="morph-title">
            {dimension === 'transition-to-3d'
              ? `🛰️ 3D GEODETIC DEM EXTRUSION // ${regionDef.name.toUpperCase()} (${Math.round(regDem.minElev)}m → ${Math.round(regDem.maxElev)}m)`
              : `🗺️ ORTHOGRAPHIC REPROJECTION // RETURNING TO ${regionDef.name.toUpperCase()} 2D MONITOR`}
          </div>
          <div className="morph-progress-track">
            <div className="morph-progress-fill" style={{ width: `${morphPercent}%` }} />
          </div>
          <div className="morph-sub">
            SIMULATED RADAR TEXTURE • ILLUSTRATIVE TERRAIN (NOT NISAR DATA) • {morphPercent}%
          </div>
        </div>
      )}

      {/* Keep displaced badge labels connected to their original projected masts. */}
      {!isTransitioning && (
        <svg
          className="pin-3d-leaders"
          aria-hidden="true"
          focusable="false"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 11 }}
        >
          {projectedPins.map(({ station, screenX, screenY, visible, badge }) => visible && badge && (
            <line
              key={station.id}
              x1={screenX}
              y1={screenY}
              x2={Math.max(badge.x, Math.min(screenX, badge.x + badge.width))}
              y2={Math.max(badge.y, Math.min(screenY, badge.y + badge.height))}
              stroke={station.accentColor}
              strokeWidth={1}
            />
          ))}
        </svg>
      )}

      {/* Projected 3D Station Pins anchored to 3D Corner-Reflector Masts */}
      {!isTransitioning &&
        projectedPins.map(
          ({ station, screenX, screenY, visible, badge }) =>
            visible && (
              <button
                key={station.id}
                type="button"
                ref={(element) => {
                  if (element) pinLabelRefs.current.set(station.id, element);
                  else pinLabelRefs.current.delete(station.id);
                }}
                className={`pin-3d-label ${station.id === activeStation.id ? 'selected' : ''}`}
                style={{
                  left: `${badge ? badge.x : screenX}px`,
                  top: `${badge ? badge.y : screenY}px`,
                  transform: 'none',
                  visibility: badge ? 'visible' : 'hidden',
                  borderColor: station.accentColor
                }}
                aria-label={`Select ${station.code}: ${station.name}; illustrated elevation ${station.elevationM}m`}
                aria-pressed={station.id === activeStation.id}
                title={`${getShort3DPinName(station)} • Illustrated ${station.elevationM}m`}
                onClick={() => flyCameraToStation(station)}
              >
                <span className="pin-code" style={{ background: station.accentColor }}>
                  {station.code}
                </span>
              </button>
            )
        )}
      </section>

      <aside className="terrain-3d-instruments" aria-label="3D instruments">
      {/* Instruments stay off the geographic canvas. */}
      <div className="world-overlay-actions top-left-3d">
        <button
          type="button"
          className="retro-chip-btn active-amber"
          onClick={startProcessSimulation}
          disabled={cascadeSimProgress !== null}
          title={simMeta.tooltip}
        >
          {simMeta.icon}{' '}
          {cascadeSimProgress !== null
            ? `${simMeta.runningPrefix} (${Math.round(cascadeSimProgress * 100)}%)`
            : simMeta.idleLabel}
        </button>

        <button
          type="button"
          className={`retro-chip-btn ${showCloudDeck3D ? 'active-cyan' : ''}`}
          onClick={() => {
            retroAudio.playUiClick(620);
            setShowCloudDeck3D((v) => !v);
          }}
        >
          ☁️ {showCloudDeck3D ? 'BLINDSPOT DECK: ON' : '3D CLOUD/HAZE'}
        </button>
      </div>

      {/* One shared layer menu lives above the viewport. */}
      <details className="terrain-settings">
        <summary>Terrain settings</summary>
        <div className="panel-3d-controls top-right">
        <label className="relief-slider-row">
          <span>DISPLAY RELIEF: {(baseVerticalExaggeration * reliefScale).toFixed(1)}×</span>
          <input
            type="range"
            min={0.8}
            max={2.4}
            step={0.1}
            value={reliefScale}
            onChange={(e) => setReliefScale(parseFloat(e.target.value))}
          />
        </label>
        </div>
      </details>
      <small className="illustrative-height-note">
        ARTISTIC LOS→HEIGHT ×{Math.round(losHeightExaggeration * reliefScale)}; not vertical ground motion.
      </small>

      {/* Simulation legend in the instrument rack, never on the map. */}
      {!isTransitioning && (
        <div className="scientific-legend-overlay three-d-legend">
          <div className="sci-legend-head">
            <strong>SIMULATION • {legend.title}</strong>
            <span>{legend.unit}</span>
          </div>
          <div className="sci-legend-bar" style={{ background: legend.gradientCss }} />
          <div className="sci-legend-ticks">
            <span>{legend.minLabel}</span>
            <span>{legend.midLabel}</span>
            <span>{legend.maxLabel}</span>
          </div>
        </div>
      )}

      {/* Bottom Camera Fly-To Waypoint Bar */}
      <div className="flyto-bar-3d">
        <button
          type="button"
          className="flyto-chip"
          onClick={() => flyCameraToStation(null)}
        >
          🦅 Regional Overview
        </button>
        {regStations.map((st) => (
          <button
            key={st.id}
            type="button"
            className={`flyto-chip ${st.id === activeStation.id ? 'active' : ''}`}
            aria-pressed={st.id === activeStation.id}
            aria-label={`Fly to ${st.name} (${st.code})`}
            title={`${st.name} • Illustrated ${st.elevationM}m`}
            onClick={() => flyCameraToStation(st)}
          >
            {st.code}
          </button>
        ))}
      </div>
      <p className="terrain-station-caption"><strong>{activeStation.code} / {activeStation.name}</strong><br />Illustrated elevation: {activeStation.elevationM}m (unverified)</p>
      </aside>
    </div>
  );
};
