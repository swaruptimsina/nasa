import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Direction,
  getCharacterSprite,
  getPropSprite,
  getTerrainTile
} from '../game/biomePixelArtEngine';
import {
  DoorWarp,
  FastTravelPoint,
  FloodImpactZone,
  GameNpc,
  MapId,
  WorldProp
} from '../game/worldMapData';
import { getRegionalWorldBundle } from '../game/regionalMapsBuilder';
import { GLOBAL_REGIONS_ATLAS } from '../data/globalRegionsAtlas';
import { GlobalRegionId } from '../services/nasaEarthDataService';
import { Station } from '../types';
import { FieldGroundTruthModal } from './FieldGroundTruthModal';
import { retroAudio } from '../audio/retroAudioAndVoice';

interface FieldExpeditionViewportProps {
  regionId: GlobalRegionId;
  initialInsideLab?: boolean;
  scannedBeaconIds: string[];
  onScanBeacon: (stationId: string) => void;
  verifiedHypothesisIds: string[];
  onVerifyHypothesis: (stationId: string) => void;
  interviewedNpcIds: string[];
  onInterviewNpc: (npcId: string) => void;
  acceptedQuestIds: string[];
  completedQuestIds: string[];
  completedInterventions: GlobalRegionId[];
  onAcceptQuest: (questId: string) => void;
  earlyWarningArmed: boolean;
  onOpenWorldAtlas: () => void;
  onOpenIntervention: () => void;
  onOpenLabSupercomputer: (stationFocusId?: string) => void;
  onOpenIncidentPhotos: (stationId?: string) => void;
  voiceOn: boolean;
  onToggleVoice: () => void;
  bgmOn: boolean;
  onToggleBgm: () => void;
}

const TILE = 16;
const VIEW_H = 240;

function centerCoord(tileCoord: number): number {
  return (Number.isInteger(tileCoord) ? tileCoord + 0.5 : tileCoord) * TILE;
}

function getMinimapTileColor(t: string): string {
  switch (t) {
    case 'water':
    case 'rapids':
    case 'corixo_water':
    case 'aqueduct_water':
    case 'asi_water':
    case 'bering_surf':
      return '#38bdf8';
    case 'wetland_marsh':
      return '#0d9488';
    case 'peat_soil':
    case 'coastal_mud':
      return '#57534e';
    case 'bridge_wood':
    case 'boardwalk':
      return '#fbbf24';
    case 'flood_silt':
    case 'river_cobble':
    case 'alpine_scree':
      return '#94a3b8';
    case 'snow':
    case 'glacier_ice':
    case 'permafrost_ice':
      return '#f1f5f9';
    case 'path':
    case 'laterite_path':
    case 'door_sand':
    case 'stairs':
    case 'concrete_canal':
    case 'limestone_paving':
    case 'gravel':
    case 'upland_gravel':
      return '#cbd5e1';
    case 'crop_terrace':
    case 'alfalfa_crop':
      return '#4ade80';
    case 'orchard_soil':
    case 'olive_terrace':
      return '#84cc16';
    case 'valley_loam':
    case 'arid_scrub':
      return '#d97706';
    case 'terra_rossa':
      return '#b45309';
    case 'limestone_ridge':
    case 'cliff_top':
    case 'cliff_face':
      return '#64748b';
    case 'tundra_moss':
      return '#a16207';
    case 'tropical_forest_floor':
      return '#15803d';
    default:
      return '#166534';
  }
}

export const FieldExpeditionViewport: React.FC<FieldExpeditionViewportProps> = ({
  regionId,
  initialInsideLab = false,
  scannedBeaconIds,
  onScanBeacon,
  verifiedHypothesisIds,
  onVerifyHypothesis,
  interviewedNpcIds,
  onInterviewNpc,
  acceptedQuestIds,
  completedQuestIds,
  completedInterventions,
  onAcceptQuest,
  earlyWarningArmed,
  onOpenWorldAtlas,
  onOpenIntervention,
  onOpenLabSupercomputer,
  onOpenIncidentPhotos,
  voiceOn,
  onToggleVoice,
  bgmOn,
  onToggleBgm
}) => {
  const regionDef = GLOBAL_REGIONS_ATLAS[regionId];
  const isRegionInterventionDone =
    completedInterventions.includes(regionId) ||
    (regionId === 'rasuwa_nepal' && earlyWarningArmed);

  const bundle = useMemo(
    () => getRegionalWorldBundle(regionId, isRegionInterventionDone),
    [regionId, isRegionInterventionDone]
  );
  const maps = bundle.maps;
  const regionStations = regionDef.stations;
  const regionQuests = regionDef.quests;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const minimapRef = useRef<HTMLCanvasElement | null>(null);

  const initSpawn = initialInsideLab ? bundle.spawnLab : bundle.spawnOverworld;

  const [currentMapId, setCurrentMapId] = useState<MapId>(
    initialInsideLab ? 'nisar_lab_interior' : 'overworld'
  );
  const playerPosRef = useRef<{ x: number; y: number; dir: Direction }>({
    x: centerCoord(initSpawn.tx),
    y: centerCoord(initSpawn.ty),
    dir: 'up'
  });
  const walkTargetRef = useRef<{ x: number; y: number } | null>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const walkAnimRef = useRef<number>(0);

  // Regional Zone Banner
  const [zoneBanner, setZoneBanner] = useState<{
    title: string;
    nepali?: string;
    sub: string;
  } | null>(initialInsideLab ? bundle.labBanner : bundle.openingBanner);
  const lastZoneTitleRef = useRef<string>(bundle.openingBanner.title);

  // Designated Hazard / Impact Location Detection
  const [activeFloodZone, setActiveFloodZone] = useState<FloodImpactZone | null>(null);
  const lastFloodZoneIdRef = useRef<string | null>(null);

  // Quest Announcement Toast
  const [questToast, setQuestToast] = useState<string | null>(null);

  // Modals: Fast-Travel Flight Chart, Expedition Chronicle & Interactive Ground-Truth Beacon Modal
  const [showNavMap, setShowNavMap] = useState(false);
  const [showQuestJournal, setShowQuestJournal] = useState(false);
  const [groundTruthStation, setGroundTruthStation] = useState<Station | null>(null);

  // Door / Transport Fade Transition
  const [warpFadeText, setWarpFadeText] = useState<string | null>(null);
  const warpingRef = useRef(false);

  // Active NPC Conversation State
  const [activeNpc, setActiveNpc] = useState<GameNpc | null>(null);
  const [npcDirections, setNpcDirections] = useState<Record<string, Direction>>({});
  const [dialogueBox, setDialogueBox] = useState<{
    speaker: string;
    role?: string;
    text: string;
    showTopics: boolean;
  } | null>({
    speaker: bundle.openingRadio.speaker,
    role: bundle.openingRadio.role,
    text: bundle.openingRadio.text,
    showTopics: false
  });
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);

  // Nearby interactable prompt
  const [nearbyPrompt, setNearbyPrompt] = useState<string | null>(null);
  const nearbyTargetRef = useRef<
    | { kind: 'npc'; npc: GameNpc }
    | { kind: 'prop'; prop: WorldProp }
    | { kind: 'door'; warp: DoorWarp }
    | null
  >(null);

  const regionScannedCount = useMemo(
    () => regionStations.filter((s) => scannedBeaconIds.includes(s.id)).length,
    [regionStations, scannedBeaconIds]
  );

  const regionVerifiedHypothesesCount = useMemo(
    () => regionStations.filter((s) => verifiedHypothesisIds.includes(s.id)).length,
    [regionStations, verifiedHypothesisIds]
  );

  const regionCompletedQuestsCount = useMemo(
    () => regionQuests.filter((q) => completedQuestIds.includes(q.id)).length,
    [regionQuests, completedQuestIds]
  );

  // Active Quest shown in HUD Tracker
  const currentTrackedQuest = useMemo(() => {
    const activeIncomplete = regionQuests.find(
      (q) => acceptedQuestIds.includes(q.id) && !completedQuestIds.includes(q.id)
    );
    if (activeIncomplete) return activeIncomplete;
    return regionQuests.find((q) => !completedQuestIds.includes(q.id)) || regionQuests[0];
  }, [regionQuests, acceptedQuestIds, completedQuestIds]);

  // Portrait image URL for active dialogue speaker
  const speakerPortraitUrl = useMemo(() => {
    const palette = activeNpc ? activeNpc.palette : regionDef.playerPalette;
    return getCharacterSprite(palette, 'down', 0).toDataURL();
  }, [activeNpc, regionDef.playerPalette]);

  // Speak initial greeting on mount
  useEffect(() => {
    if (dialogueBox && voiceOn) {
      retroAudio.speakMentor(dialogueBox.text, 'welcome');
    }
  }, []);

  useEffect(() => {
    if (!zoneBanner) return;
    const t = window.setTimeout(() => setZoneBanner(null), 3600);
    return () => clearTimeout(t);
  }, [zoneBanner]);

  useEffect(() => {
    if (!questToast) return;
    const t = window.setTimeout(() => setQuestToast(null), 4200);
    return () => clearTimeout(t);
  }, [questToast]);

  const triggerQuestAccept = (questId: string) => {
    if (!acceptedQuestIds.includes(questId)) {
      retroAudio.playBadgeUnlock();
      onAcceptQuest(questId);
      const q = regionQuests.find((item) => item.id === questId);
      if (q) {
        setQuestToast(`🎯 MISSION LOGGED: #${q.number} ${q.title}`);
      }
    }
  };

  const executeWarp = (
    toMap: MapId,
    destTx: number,
    destTy: number,
    destDir: Direction,
    label: string
  ) => {
    if (warpingRef.current) return;
    warpingRef.current = true;
    walkTargetRef.current = null;
    retroAudio.playUiClick(520);
    setWarpFadeText(label);

    window.setTimeout(() => {
      setCurrentMapId(toMap);
      playerPosRef.current = {
        x: centerCoord(destTx),
        y: centerCoord(destTy),
        dir: destDir
      };
      if (toMap === 'nisar_lab_interior') {
        lastFloodZoneIdRef.current = null;
        setActiveFloodZone(null);
        setZoneBanner(bundle.labBanner);
      } else if (toMap === 'timure_house_interior') {
        lastFloodZoneIdRef.current = null;
        setActiveFloodZone(null);
        setZoneBanner({
          title: regionDef.culturalHallName.toUpperCase(),
          nepali: regionDef.nativeTitle,
          sub: 'Community Heritage & Local Ground-Truth Testimonies'
        });
      } else if (toMap === 'overworld') {
        const wTx = Math.floor(destTx);
        const wTy = Math.floor(destTy);
        const hitZone =
          bundle.impactZones.find(
            (fz) => wTx >= fz.xMin && wTx <= fz.xMax && wTy >= fz.yMin && wTy <= fz.yMax
          ) || null;
        lastFloodZoneIdRef.current = hitZone?.id || null;
        setActiveFloodZone(hitZone);

        const z = bundle.zones.find(
          (zn) => wTx >= zn.xMin && wTx <= zn.xMax && wTy >= zn.yMin && wTy <= zn.yMax
        );
        if (z) {
          lastZoneTitleRef.current = z.title;
          setZoneBanner({
            title: z.title,
            nepali: z.nepaliTitle,
            sub: z.subtitle
          });
        }
      }
    }, 260);

    window.setTimeout(() => {
      setWarpFadeText(null);
      warpingRef.current = false;
    }, 560);
  };

  const triggerInteract = () => {
    if (groundTruthStation) return;

    if (dialogueBox && !dialogueBox.showTopics) {
      retroAudio.playUiClick(620);
      setDialogueBox(null);
      setActiveNpc(null);
      return;
    }
    if (dialogueBox && dialogueBox.showTopics && activeNpc) {
      handleSelectTopic(selectedTopicIdx);
      return;
    }

    const target = nearbyTargetRef.current;
    if (!target) return;

    if (target.kind === 'door') {
      const w = target.warp;
      executeWarp(w.toMap, w.destTx, w.destTy, w.destDir, w.label);
      return;
    }

    if (target.kind === 'npc') {
      const npc = target.npc;
      retroAudio.playUiClick(680);
      const dx = playerPosRef.current.x - (npc.tx + 0.5) * TILE;
      const dy = playerPosRef.current.y - (npc.ty + 0.5) * TILE;
      const faceDir: Direction =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? 'right'
            : 'left'
          : dy > 0
            ? 'down'
            : 'up';
      setNpcDirections((prev) => ({ ...prev, [npc.id]: faceDir }));

      if (!interviewedNpcIds.includes(npc.id)) {
        onInterviewNpc(npc.id);
      }
      if (npc.questIdToGive) {
        triggerQuestAccept(npc.questIdToGive);
      }
      setActiveNpc(npc);
      setSelectedTopicIdx(0);
      setDialogueBox({
        speaker: npc.name,
        role: npc.role,
        text: npc.greeting,
        showTopics: true
      });
      retroAudio.speakMentor(npc.greeting, npc.voiceMood);
    } else if (target.kind === 'prop') {
      const prop = target.prop;
      const finalQuest = regionQuests[regionQuests.length - 1];
      if (prop.opensComputer) {
        retroAudio.playWarpTo3D();
        if (finalQuest) triggerQuestAccept(finalQuest.id);
        onOpenLabSupercomputer();
        return;
      }
      if (prop.opensIntervention) {
        retroAudio.playBadgeUnlock();
        if (finalQuest) triggerQuestAccept(finalQuest.id);
        onOpenIntervention();
        return;
      }
      if (prop.opensPhotosStationId) {
        retroAudio.playUiClick(700);
        onOpenIncidentPhotos(prop.opensPhotosStationId);
        return;
      }
      if (prop.beaconStationId) {
        const st = regionStations.find((s) => s.id === prop.beaconStationId);
        if (!st) return;
        retroAudio.playBadgeUnlock();
        // Auto-accept matching station quest or Act III hypothesis quest
        const matchingQuest = regionQuests.find((q) => q.targetStationId === st.id);
        if (matchingQuest) triggerQuestAccept(matchingQuest.id);
        const hypQuest = regionQuests.find((q) => q.id.endsWith('_hypothesis'));
        if (hypQuest) triggerQuestAccept(hypQuest.id);

        setGroundTruthStation(st);
        retroAudio.speakMentor(st.nisarInsight, 'radar');
        return;
      }
      if (prop.interactText) {
        retroAudio.playUiClick(600);
        setDialogueBox({
          speaker: `${regionDef.flag} ${regionDef.name} — Field Observation`,
          role: regionDef.biomeBadge,
          text: prop.interactText,
          showTopics: false
        });
        retroAudio.speakMentor(prop.interactText, 'welcome');
      }
    }
  };

  const handleSelectTopic = (idx: number) => {
    if (!activeNpc) return;
    if (idx === activeNpc.topics.length) {
      retroAudio.playUiClick(480);
      setDialogueBox(null);
      setActiveNpc(null);
      return;
    }
    const topic = activeNpc.topics[idx];
    if (!topic) return;
    retroAudio.playUiClick(700);

    if (topic.givesQuestId) {
      triggerQuestAccept(topic.givesQuestId);
    }
    if (topic.opensIntervention) {
      const finalQuest = regionQuests[regionQuests.length - 1];
      if (finalQuest) triggerQuestAccept(finalQuest.id);
      setDialogueBox(null);
      setActiveNpc(null);
      onOpenIntervention();
      return;
    }
    if (topic.opensWorldGlobe) {
      setDialogueBox(null);
      setActiveNpc(null);
      onOpenWorldAtlas();
      return;
    }
    if (topic.opensComputer) {
      const finalQuest = regionQuests[regionQuests.length - 1];
      if (finalQuest) triggerQuestAccept(finalQuest.id);
      setDialogueBox(null);
      setActiveNpc(null);
      onOpenLabSupercomputer();
      return;
    }
    if (topic.opensFastTravel) {
      setDialogueBox(null);
      setActiveNpc(null);
      setShowNavMap(true);
      return;
    }
    if (topic.opensPhotosStationId) {
      setDialogueBox(null);
      setActiveNpc(null);
      onOpenIncidentPhotos(topic.opensPhotosStationId);
      return;
    }

    setDialogueBox({
      speaker: activeNpc.name,
      role: activeNpc.role,
      text: topic.answer,
      showTopics: true
    });
    retroAudio.speakMentor(topic.answer, topic.voiceMood || activeNpc.voiceMood);
  };

  // Keyboard Controls
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select, button, a, summary, [contenteditable="true"], [role="dialog"]') || document.querySelector('[role="dialog"]')) {
        keysRef.current = {}; return;
      }
      if (groundTruthStation) return;

      const k = e.key.toLowerCase();
      if (showNavMap) {
        if (k === 'escape' || k === 'm') setShowNavMap(false);
        return;
      }
      if (showQuestJournal) {
        if (k === 'escape' || k === 'q') setShowQuestJournal(false);
        return;
      }

      if (dialogueBox) {
        if (dialogueBox.showTopics && activeNpc) {
          const totalOpts = activeNpc.topics.length + 1;
          if (k === 'arrowup' || k === 'w') {
            e.preventDefault();
            retroAudio.playUiClick(580);
            setSelectedTopicIdx((p) => (p - 1 + totalOpts) % totalOpts);
            return;
          }
          if (k === 'arrowdown' || k === 's') {
            e.preventDefault();
            retroAudio.playUiClick(580);
            setSelectedTopicIdx((p) => (p + 1) % totalOpts);
            return;
          }
        }
        if ([' ', 'enter', 'z', 'e'].includes(k)) {
          e.preventDefault();
          triggerInteract();
          return;
        }
        if (k === 'escape' || k === 'x') {
          e.preventDefault();
          setDialogueBox(null);
          setActiveNpc(null);
          return;
        }
        return;
      }

      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        e.preventDefault();
        keysRef.current[k] = true;
        walkTargetRef.current = null;
      } else if ([' ', 'enter', 'z', 'e'].includes(k)) {
        e.preventDefault();
        triggerInteract();
      } else if (k === 'g') {
        e.preventDefault();
        onOpenWorldAtlas();
      } else if (k === 'i') {
        e.preventDefault();
        onOpenIntervention();
      } else if (k === 'm') {
        e.preventDefault();
        setShowNavMap((v) => !v);
      } else if (k === 'q') {
        e.preventDefault();
        setShowQuestJournal((v) => !v);
      } else if (k === 'p') {
        e.preventDefault();
        onOpenIncidentPhotos(activeFloodZone?.stationId || 'all');
      }
    };
    const onUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  });

  // Main 60fps Field Expedition & Georeferenced Mini-Map Loop
  useEffect(() => {
    let raf = 0;
    let tick = 0;
    let lastFootstep = 0;
    let lastTime = performance.now();

    const canStandAt = (pxX: number, pxY: number, mapObj: typeof maps.overworld) => {
      const corners = [
        [pxX - 4, pxY - 2],
        [pxX + 4, pxY - 2],
        [pxX - 4, pxY + 3],
        [pxX + 4, pxY + 3]
      ];
      for (const [cx, cy] of corners) {
        const tx = Math.floor(cx / TILE);
        const ty = Math.floor(cy / TILE);
        if (tx < 0 || ty < 0 || tx >= mapObj.width || ty >= mapObj.height) return false;
        if (mapObj.solid[ty][tx]) return false;
        const hitNpc = bundle.npcs.some(
          (n) => n.mapId === mapObj.id && n.tx === tx && n.ty === ty
        );
        if (hitNpc) return false;
      }
      return true;
    };

    const loop = (now: number) => {
      const dt = Math.min(0.06, Math.max(0.005, (now - lastTime) / 1000));
      lastTime = now;
      tick++;
      const canvas = canvasRef.current;
      if (!canvas) {
        raf = requestAnimationFrame(loop);
        return;
      }
      const aspect =
        canvas.clientHeight > 0 ? canvas.clientWidth / canvas.clientHeight : 16 / 10;
      const viewW = Math.max(320, Math.min(480, Math.round(VIEW_H * aspect)));
      if (canvas.width !== viewW || canvas.height !== VIEW_H) {
        canvas.width = viewW;
        canvas.height = VIEW_H;
      }
      const ctx = canvas.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;

      const mapObj = maps[currentMapId];
      const animFrame = Math.floor(tick / 18) % 4;

      // 1. Move Player
      let moving = false;
      if (
        !dialogueBox &&
        !document.querySelector('[role="dialog"]') &&
        !groundTruthStation &&
        !warpingRef.current &&
        !showNavMap &&
        !showQuestJournal
      ) {
        let dx = 0;
        let dy = 0;
        const k = keysRef.current;
        if (k['a'] || k['arrowleft']) dx -= 1;
        if (k['d'] || k['arrowright']) dx += 1;
        if (k['w'] || k['arrowup']) dy -= 1;
        if (k['s'] || k['arrowdown']) dy += 1;

        const speed = 102 * dt;
        if (dx !== 0 || dy !== 0) {
          const len = Math.hypot(dx, dy);
          const vx = (dx / len) * speed;
          const vy = (dy / len) * speed;
          if (Math.abs(dx) >= Math.abs(dy)) {
            playerPosRef.current.dir = dx < 0 ? 'left' : 'right';
          } else {
            playerPosRef.current.dir = dy < 0 ? 'up' : 'down';
          }
          if (canStandAt(playerPosRef.current.x + vx, playerPosRef.current.y, mapObj)) {
            playerPosRef.current.x += vx;
            moving = true;
          }
          if (canStandAt(playerPosRef.current.x, playerPosRef.current.y + vy, mapObj)) {
            playerPosRef.current.y += vy;
            moving = true;
          }
        } else if (walkTargetRef.current) {
          const tx = walkTargetRef.current.x - playerPosRef.current.x;
          const ty = walkTargetRef.current.y - playerPosRef.current.y;
          const dist = Math.hypot(tx, ty);
          if (dist < 2.2) {
            walkTargetRef.current = null;
          } else {
            const vx = (tx / dist) * speed;
            const vy = (ty / dist) * speed;
            playerPosRef.current.dir =
              Math.abs(tx) > Math.abs(ty)
                ? tx < 0
                  ? 'left'
                  : 'right'
                : ty < 0
                  ? 'up'
                  : 'down';
            let stepped = false;
            if (canStandAt(playerPosRef.current.x + vx, playerPosRef.current.y, mapObj)) {
              playerPosRef.current.x += vx;
              stepped = true;
            }
            if (canStandAt(playerPosRef.current.x, playerPosRef.current.y + vy, mapObj)) {
              playerPosRef.current.y += vy;
              stepped = true;
            }
            if (!stepped) {
              walkTargetRef.current = null;
            } else {
              moving = true;
            }
          }
        }
      }

      const pTileX = Math.floor(playerPosRef.current.x / TILE);
      const pTileY = Math.floor(playerPosRef.current.y / TILE);

      // Check Designated Hazard / Photo Zone presence
      if (currentMapId === 'overworld' && (tick === 1 || tick % 8 === 0)) {
        const hitZone =
          bundle.impactZones.find(
            (fz) =>
              pTileX >= fz.xMin &&
              pTileX <= fz.xMax &&
              pTileY >= fz.yMin &&
              pTileY <= fz.yMax
          ) || null;
        if ((hitZone?.id || null) !== lastFloodZoneIdRef.current) {
          lastFloodZoneIdRef.current = hitZone?.id || null;
          setActiveFloodZone(hitZone);
        }
      }

      if (moving) {
        walkAnimRef.current += 0.16;
        if (now - lastFootstep > 230) {
          const curTile = mapObj.tiles[pTileY]?.[pTileX];
          const onSnow =
            curTile === 'snow' ||
            curTile === 'permafrost_ice' ||
            curTile === 'upland_gravel';
          retroAudio.playFootstep(onSnow);
          lastFootstep = now;
        }

        // Check Door Warps
        const warp = bundle.doorWarps.find(
          (w) => w.fromMap === currentMapId && w.tx === pTileX && w.ty === pTileY
        );
        if (warp) {
          executeWarp(warp.toMap, warp.destTx, warp.destTy, warp.destDir, warp.label);
        }

        // Check Overworld Zone Banner updates
        if (currentMapId === 'overworld') {
          const z = bundle.zones.find(
            (zn) =>
              pTileX >= zn.xMin &&
              pTileX <= zn.xMax &&
              pTileY >= zn.yMin &&
              pTileY <= zn.yMax
          );
          if (z && z.title !== lastZoneTitleRef.current) {
            lastZoneTitleRef.current = z.title;
            setZoneBanner({
              title: z.title,
              nepali: z.nepaliTitle,
              sub: z.subtitle
            });
          }
        }
      } else {
        walkAnimRef.current = 0;
      }

      // 2. Detect Nearby Interactable NPC or Prop
      {
        const dirOffsets: Record<Direction, [number, number]> = {
          up: [0, -14],
          down: [0, 14],
          left: [-14, 0],
          right: [14, 0]
        };
        const [ox, oy] = dirOffsets[playerPosRef.current.dir];
        const probeX = playerPosRef.current.x + ox;
        const probeY = playerPosRef.current.y + oy;

        let found: typeof nearbyTargetRef.current = null;
        let promptLabel: string | null = null;

        for (const npc of bundle.npcs) {
          if (npc.mapId !== currentMapId) continue;
          const nx = (npc.tx + 0.5) * TILE;
          const ny = (npc.ty + 0.5) * TILE;
          if (
            Math.hypot(nx - probeX, ny - probeY) < 18 ||
            Math.hypot(nx - playerPosRef.current.x, ny - playerPosRef.current.y) < 22
          ) {
            found = { kind: 'npc', npc };
            const hasNewQuest =
              npc.questIdToGive && !acceptedQuestIds.includes(npc.questIdToGive);
            promptLabel = hasNewQuest
              ? `🎯 Receive Field Mission from ${npc.name.split(' ')[0]} [SPACE]`
              : `💬 Interview ${npc.name.split(' ')[0]} [SPACE]`;
            break;
          }
        }

        if (!found) {
          const probeTx = Math.floor(probeX / TILE);
          const probeTy = Math.floor(probeY / TILE);
          const doorAhead = bundle.doorWarps.find(
            (w) => w.fromMap === currentMapId && w.tx === probeTx && w.ty === probeTy
          );
          if (doorAhead) {
            found = { kind: 'door', warp: doorAhead };
            promptLabel = `🚪 ENTER ${regionDef.flag} FACILITY [SPACE / WALK IN]`;
          }
        }

        if (!found) {
          for (const prop of mapObj.props) {
            if (
              !prop.opensComputer &&
              !prop.opensIntervention &&
              !prop.opensPhotosStationId &&
              !prop.beaconStationId &&
              !prop.interactText
            ) {
              continue;
            }
            const minX = prop.tx * TILE - 10;
            const maxX = (prop.tx + prop.wTiles) * TILE + 10;
            const minY = prop.ty * TILE - 8;
            const maxY = (prop.ty + prop.hTiles) * TILE + 14;
            if (probeX >= minX && probeX <= maxX && probeY >= minY && probeY <= maxY) {
              found = { kind: 'prop', prop };
              if (prop.opensComputer) {
                promptLabel = '🖥️ BOOT 2D/3D OBSERVATORY SUPERCOMPUTER [SPACE]';
              } else if (prop.opensIntervention) {
                promptLabel = '⚡ LAUNCH COMMUNITY IMPACT SIMULATOR [SPACE]';
              } else if (prop.opensPhotosStationId) {
                promptLabel = '📷 INSPECT UNVERIFIED ASSET REVIEW [SPACE]';
              } else if (prop.beaconStationId) {
                const done = scannedBeaconIds.includes(prop.beaconStationId);
                promptLabel = done
                  ? '📡 OPEN BEACON TELEMETRY & DRIVER QUIZ [SPACE]'
                  : '📡 CALIBRATE CORNER REFLECTOR & DEDUCE [SPACE]';
              } else {
                promptLabel = `🔍 INSPECT ${regionDef.flag} FIELD SITE [SPACE]`;
              }
              break;
            }
          }
        }

        nearbyTargetRef.current = found;
        if (tick % 6 === 0) {
          setNearbyPrompt(promptLabel);
        }
      }

      // 3. Camera Clamping / Centering
      const mapPxW = mapObj.width * TILE;
      const mapPxH = mapObj.height * TILE;
      let camX = Math.round(playerPosRef.current.x - viewW / 2);
      let camY = Math.round(playerPosRef.current.y - VIEW_H / 2);

      if (mapPxW <= viewW) {
        camX = Math.round((mapPxW - viewW) / 2);
      } else {
        camX = Math.max(0, Math.min(mapPxW - viewW, camX));
      }
      if (mapPxH <= VIEW_H) {
        camY = Math.round((mapPxH - VIEW_H) / 2);
      } else {
        camY = Math.max(0, Math.min(mapPxH - VIEW_H, camY));
      }

      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, viewW, VIEW_H);

      // 4. Draw Seamless Coordinate-Seeded Natural Biome Tiles (tx=c, ty=r)
      const startCol = Math.max(0, Math.floor(camX / TILE));
      const endCol = Math.min(mapObj.width - 1, Math.ceil((camX + viewW) / TILE));
      const startRow = Math.max(0, Math.floor(camY / TILE));
      const endRow = Math.min(mapObj.height - 1, Math.ceil((camY + VIEW_H) / TILE));

      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
          const tileKind = mapObj.tiles[r][c];
          const tileImg = getTerrainTile(tileKind, animFrame, c, r);
          ctx.drawImage(tileImg, c * TILE - camX, r * TILE - camY);
        }
      }

      // 5. Build Y-Sorted Render Queue
      type RenderItem = {
        sortY: number;
        draw: () => void;
      };
      const renderQueue: RenderItem[] = [];

      for (const prop of mapObj.props) {
        const pxX = prop.tx * TILE - camX;
        const pxY = prop.ty * TILE - camY;
        if (
          pxX + prop.wTiles * TILE < -40 ||
          pxX > viewW + 40 ||
          pxY + prop.hTiles * TILE < -40 ||
          pxY > VIEW_H + 40
        ) {
          continue;
        }
        const sprite = getPropSprite(prop.kind, animFrame);
        const drawY = (prop.ty + prop.hTiles) * TILE - sprite.height - camY;
        const drawX = prop.tx * TILE - camX;
        const sortY = (prop.ty + prop.hTiles) * TILE;

        renderQueue.push({
          sortY,
          draw: () => {
            ctx.drawImage(sprite, drawX, drawY);
            if (prop.beaconStationId) {
              const scanned = scannedBeaconIds.includes(prop.beaconStationId);
              const hypDone = verifiedHypothesisIds.includes(prop.beaconStationId);
              const bob = Math.round(Math.sin(tick * 0.12) * 2);
              ctx.fillStyle = hypDone ? '#22c55e' : scanned ? '#38bdf8' : '#facc15';
              ctx.fillRect(drawX + 8, drawY - 7 + bob, 8, 6);
              ctx.fillStyle = '#0f172a';
              ctx.fillRect(drawX + 11, drawY - 6 + bob, 2, 3);
            } else if (prop.opensComputer) {
              const bob = Math.round(Math.sin(tick * 0.1) * 2);
              const cx = drawX + 60;
              const cy = drawY - 7 + bob;
              ctx.fillStyle = '#0f172a';
              ctx.fillRect(cx, cy, 10, 7);
              ctx.fillStyle = '#38bdf8';
              ctx.fillRect(cx + 1, cy + 1, 8, 5);
              ctx.fillStyle = '#facc15';
              ctx.fillRect(cx + 3, cy + 2, 4, 2);
              ctx.fillRect(cx + 4, cy + 4, 2, 1);
            } else if (prop.opensIntervention) {
              const bob = Math.round(Math.sin(tick * 0.13) * 2);
              const cx = drawX + Math.round((prop.wTiles * TILE) / 2) - 5;
              const cy = drawY - 7 + bob;
              ctx.fillStyle = '#052e16';
              ctx.fillRect(cx, cy, 10, 7);
              ctx.fillStyle = '#4ade80';
              ctx.fillRect(cx + 1, cy + 1, 8, 5);
              ctx.fillStyle = '#052e16';
              ctx.fillRect(cx + 4, cy + 2, 2, 3);
            } else if (prop.kind === 'photo_evidence_stand' || prop.opensPhotosStationId) {
              const bob = Math.round(Math.sin(tick * 0.11 + prop.tx) * 1.5);
              const cx = drawX + Math.min(20, Math.round((prop.wTiles * TILE) / 2) - 5);
              const cy = drawY - 6 + bob;
              ctx.fillStyle = '#7f1d1d';
              ctx.fillRect(cx, cy, 10, 7);
              ctx.fillStyle = '#facc15';
              ctx.fillRect(cx + 1, cy + 1, 8, 5);
              ctx.fillStyle = '#0f172a';
              ctx.fillRect(cx + 4, cy + 2, 2, 3);
            }
          }
        });
      }

      // Add Regional NPCs
      for (const npc of bundle.npcs) {
        if (npc.mapId !== currentMapId) continue;
        const dir = npcDirections[npc.id] || npc.dir;
        const spr = getCharacterSprite(npc.palette, dir, 0);
        const nx = (npc.tx + 0.5) * TILE;
        const ny = (npc.ty + 0.8) * TILE;
        renderQueue.push({
          sortY: ny,
          draw: () => {
            const dx = Math.round(nx - 9 - camX);
            const dy = Math.round(ny - 20 - camY);
            ctx.drawImage(spr, dx, dy);

            const hasUnacceptedQuest =
              npc.questIdToGive && !acceptedQuestIds.includes(npc.questIdToGive);
            const bob = Math.round(Math.sin(tick * 0.12 + npc.tx) * 1.8);

            if (hasUnacceptedQuest) {
              ctx.fillStyle = '#0f172a';
              ctx.fillRect(dx + 5, dy - 9 + bob, 8, 8);
              ctx.fillStyle = '#f59e0b';
              ctx.fillRect(dx + 6, dy - 8 + bob, 6, 6);
              ctx.fillStyle = '#0f172a';
              ctx.fillRect(dx + 8, dy - 7 + bob, 2, 3);
              ctx.fillRect(dx + 8, dy - 3 + bob, 2, 1);
            } else if (!interviewedNpcIds.includes(npc.id)) {
              ctx.fillStyle = '#0f172a';
              ctx.fillRect(dx + 4, dy - 8 + bob, 10, 7);
              ctx.fillStyle = '#38bdf8';
              ctx.fillRect(dx + 5, dy - 7 + bob, 8, 5);
              ctx.fillStyle = '#0f172a';
              ctx.fillRect(dx + 8, dy - 5 + bob, 2, 2);
            }
          }
        });
      }

      // Add Player Field Researcher Sprite
      const pFrame: 0 | 1 | 2 = !moving
        ? 0
        : Math.floor(walkAnimRef.current) % 2 === 0
          ? 1
          : 2;
      const pSpr = getCharacterSprite(regionDef.playerPalette, playerPosRef.current.dir, pFrame);
      renderQueue.push({
        sortY: playerPosRef.current.y + 4,
        draw: () => {
          ctx.drawImage(
            pSpr,
            Math.round(playerPosRef.current.x - 9 - camX),
            Math.round(playerPosRef.current.y - 18 - camY)
          );
        }
      });

      renderQueue.sort((a, b) => a.sortY - b.sortY);
      for (const item of renderQueue) {
        item.draw();
      }

      // 6. Regional Atmospheric Micro-Weather (Himalayan Glacier Spindrift / Alaska Bering Fog-Flurries)
      if (
        currentMapId === 'overworld' &&
        ((regionId === 'rasuwa_nepal' &&
          playerPosRef.current.y < 24 * TILE &&
          playerPosRef.current.x > 36 * TILE) ||
          regionId === 'yukon_alaska')
      ) {
        ctx.fillStyle =
          regionId === 'yukon_alaska'
            ? 'rgba(226, 232, 240, 0.5)'
            : 'rgba(255, 255, 255, 0.82)';
        const count = regionId === 'yukon_alaska' ? 16 : 26;
        for (let i = 0; i < count; i++) {
          const sx = (((i * 53 + tick * 0.7) % viewW) + viewW) % viewW;
          const sy = (((i * 37 + tick * 0.9) % VIEW_H) + VIEW_H) % VIEW_H;
          ctx.fillRect(sx, sy, 2, 2);
        }
      }

      // 7. Render Live Georeferenced Regional Mini-Map
      if (minimapRef.current && currentMapId === 'overworld' && (tick === 1 || tick % 8 === 0)) {
        const mc = minimapRef.current;
        const ow = maps.overworld;
        const mw = ow.width * 2;
        const mh = ow.height * 2;
        if (mc.width !== mw || mc.height !== mh) {
          mc.width = mw;
          mc.height = mh;
        }
        const mctx = mc.getContext('2d')!;
        mctx.imageSmoothingEnabled = false;
        for (let ry = 0; ry < ow.height; ry++) {
          for (let rx = 0; rx < ow.width; rx++) {
            mctx.fillStyle = getMinimapTileColor(ow.tiles[ry][rx]);
            mctx.fillRect(rx * 2, ry * 2, 2, 2);
          }
        }
        // Beacon dots on mini-map
        for (const p of ow.props) {
          if (p.beaconStationId) {
            const done = scannedBeaconIds.includes(p.beaconStationId);
            mctx.fillStyle = done ? '#22c55e' : '#f59e0b';
            mctx.fillRect(p.tx * 2 - 1, p.ty * 2 - 1, 4, 4);
          }
        }
        // Player GPS Marker
        const pxM = Math.round((playerPosRef.current.x / TILE) * 2);
        const pyM = Math.round((playerPosRef.current.y / TILE) * 2);
        mctx.fillStyle = '#ffffff';
        mctx.fillRect(pxM - 3, pyM - 3, 6, 6);
        mctx.fillStyle = '#e11d48';
        mctx.fillRect(pxM - 2, pyM - 2, 4, 4);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [
    regionId,
    regionDef.playerPalette,
    regionDef.flag,
    bundle,
    currentMapId,
    dialogueBox,
    groundTruthStation,
    showNavMap,
    showQuestJournal,
    scannedBeaconIds,
    verifiedHypothesisIds,
    interviewedNpcIds,
    acceptedQuestIds,
    npcDirections,
    maps
  ]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (
      dialogueBox ||
      groundTruthStation ||
      showNavMap ||
      showQuestJournal ||
      warpingRef.current
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const viewW = e.currentTarget.width || 384;
    const clickViewX = ((e.clientX - rect.left) / rect.width) * viewW;
    const clickViewY = ((e.clientY - rect.top) / rect.height) * VIEW_H;

    const mapObj = maps[currentMapId];
    const mapPxW = mapObj.width * TILE;
    const mapPxH = mapObj.height * TILE;
    const camX =
      mapPxW <= viewW
        ? Math.round((mapPxW - viewW) / 2)
        : Math.max(0, Math.min(mapPxW - viewW, Math.round(playerPosRef.current.x - viewW / 2)));
    const camY =
      mapPxH <= VIEW_H
        ? Math.round((mapPxH - VIEW_H) / 2)
        : Math.max(0, Math.min(mapPxH - VIEW_H, Math.round(playerPosRef.current.y - VIEW_H / 2)));

    const worldX = clickViewX + camX;
    const worldY = clickViewY + camY;

    const clickedNpc = bundle.npcs.find(
      (n) =>
        n.mapId === currentMapId &&
        Math.hypot((n.tx + 0.5) * TILE - worldX, (n.ty + 0.5) * TILE - worldY) < 16
    );
    if (
      clickedNpc &&
      Math.hypot(
        (clickedNpc.tx + 0.5) * TILE - playerPosRef.current.x,
        (clickedNpc.ty + 0.5) * TILE - playerPosRef.current.y
      ) < 44
    ) {
      nearbyTargetRef.current = { kind: 'npc', npc: clickedNpc };
      triggerInteract();
      return;
    }

    const clickedProp = mapObj.props.find(
      (p) =>
        (p.opensComputer ||
          p.opensIntervention ||
          p.opensPhotosStationId ||
          p.beaconStationId ||
          p.interactText) &&
        worldX >= p.tx * TILE - 6 &&
        worldX <= (p.tx + p.wTiles) * TILE + 6 &&
        worldY >= p.ty * TILE - 6 &&
        worldY <= (p.ty + p.hTiles) * TILE + 10
    );
    if (
      clickedProp &&
      Math.hypot(
        (clickedProp.tx + clickedProp.wTiles / 2) * TILE - playerPosRef.current.x,
        (clickedProp.ty + clickedProp.hTiles / 2) * TILE - playerPosRef.current.y
      ) < 62
    ) {
      nearbyTargetRef.current = { kind: 'prop', prop: clickedProp };
      triggerInteract();
      return;
    }

    walkTargetRef.current = { x: worldX, y: worldY };
  };

  const handleFastTravel = (pt: FastTravelPoint) => {
    setShowNavMap(false);
    setShowQuestJournal(false);
    setDialogueBox(null);
    setActiveNpc(null);
    executeWarp(pt.mapId, pt.tx, pt.ty, pt.dir, `🚁 Transporting to ${pt.name}...`);
  };

  const holdCompass = (key: string, down: boolean) => {
    keysRef.current[key] = down;
    if (down) walkTargetRef.current = null;
  };

  const miniMapHeightPx = Math.round(
    (maps.overworld.height / maps.overworld.width) * 92
  );

  return (
    <div className="expedition-fullscreen-stage">
      <canvas
        ref={canvasRef}
        className="expedition-main-canvas"
        onClick={handleCanvasClick}
      />

      {/* REGIONAL GEOGRAPHIC & CULTURAL ZONE BANNER (TOP-LEFT) */}
      {zoneBanner && (
        <div className="expedition-zone-banner">
          <div className="zone-banner-title">
            {regionDef.flag} {zoneBanner.title}
          </div>
          {zoneBanner.nepali && (
            <div className="zone-banner-nepali">{zoneBanner.nepali}</div>
          )}
          <div className="zone-banner-sub">{zoneBanner.sub}</div>
        </div>
      )}

      {/* MISSION LOGGED TOAST */}
      {questToast && <div className="quest-accepted-toast">{questToast}</div>}

      {/* TOP-RIGHT EXPEDITION HUD */}
      <div className="expedition-top-hud">
        <div className="expedition-telemetry-pill">
          <span title="Reflector exercise progress (simulation)">
            📡 {regionScannedCount}/{regionStations.length}
          </span>
          <span title="Hypothesis quiz progress (simulation, not validation)">
            🧠 {regionVerifiedHypothesesCount}/{regionStations.length}
          </span>
          <span title="Completed fictional field quests">
            📜 {regionCompletedQuestsCount}/{regionQuests.length}
          </span>
          {isRegionInterventionDone && (
            <span className="armed-tag">🧩 Exercise recorded</span>
          )}
        </div>

        <button
          type="button"
          className="fieldnav-btn world-hud-btn"
          onClick={() => {
            retroAudio.playUiClick(690);
            onOpenWorldAtlas();
          }}
          title="Open Global Radar Atlas — Switch Between All 5 Hotspots (Shortcut: G)"
        >
          🌍 ATLAS
        </button>

        <button
          type="button"
          className="fieldnav-btn action-hud-btn"
          onClick={() => {
            retroAudio.playBadgeUnlock();
            onOpenIntervention();
          }}
          title="Open hypothetical community-action exercise (Shortcut: I)"
        >
          ⚡ {isRegionInterventionDone ? 'EXERCISE COMPLETE' : 'FIELD EXERCISE'}
        </button>

        <button
          type="button"
          className="fieldnav-btn photo-hud-btn"
          onClick={() => {
            retroAudio.playUiClick(680);
            onOpenIncidentPhotos(activeFloodZone?.stationId || 'all');
          }}
          title="Review unverified local assets and sourced NASA context (Shortcut: P)"
        >
          📷 ARCHIVE
        </button>

        <button
          type="button"
          className="fieldnav-btn quest-hud-btn"
          onClick={() => {
            retroAudio.playUiClick(640);
            setShowQuestJournal(true);
          }}
          title="Open Expedition Chronicle & Synthesis Logbook (Shortcut: Q)"
        >
          📜 LOGBOOK ({regionCompletedQuestsCount}/{regionQuests.length})
        </button>

        <button
          type="button"
          className="fieldnav-btn map-btn"
          onClick={() => {
            retroAudio.playUiClick(660);
            setShowNavMap(true);
          }}
          title="Open Regional Transport & Survey Sites (Shortcut: M)"
        >
          🚁 SITES
        </button>

        <button
          type="button"
          className="fieldnav-btn lab-shortcut"
          onClick={() => {
            if (currentMapId === 'nisar_lab_interior') {
              onOpenLabSupercomputer();
            } else {
              executeWarp(
                'nisar_lab_interior',
                bundle.spawnLab.tx,
                bundle.spawnLab.ty,
                'up',
                `${regionDef.flag} Entering ${regionDef.labBuildingName}...`
              );
            }
          }}
        >
          {currentMapId === 'nisar_lab_interior' ? '🖥️ 2D/3D PC' : '🏛️ OBSERVATORY'}
        </button>

        <button
          type="button"
          className={`fieldnav-btn ${voiceOn ? 'active' : ''}`}
          onClick={onToggleVoice}
          title="Toggle Field Radio Voice Narration"
        >
          {voiceOn ? '🔊' : '🔇'}
        </button>

        <button
          type="button"
          className={`fieldnav-btn ${bgmOn ? 'active' : ''}`}
          onClick={onToggleBgm}
          title="Toggle Ambient Expedition Soundtrack"
        >
          {bgmOn ? '🎵' : '🔕'}
        </button>
      </div>

      {/* COMPACT ACTIVE MISSION TRACKER CARD */}
      {!dialogueBox &&
        !groundTruthStation &&
        !showNavMap &&
        !showQuestJournal &&
        currentTrackedQuest && (
          <div
            className="active-quest-tracker-card"
            style={{ top: zoneBanner ? 94 : 14 }}
            onClick={() => setShowQuestJournal(true)}
            title="Click to open Expedition Chronicle & Logbook"
          >
            <div className="qt-header">
              <span>
                🎯 {regionDef.flag} MISSION #{currentTrackedQuest.number}
              </span>
              <small>{currentTrackedQuest.nepaliTitle}</small>
            </div>
            <strong>{currentTrackedQuest.title}</strong>
            <p>{currentTrackedQuest.objectiveHint}</p>
          </div>
        )}

      {/* BOTTOM-LEFT DOCK: LIVE GEOREFERENCED SURVEY MAP + HAZARD SITE PHOTO CARD */}
      {!dialogueBox &&
        !groundTruthStation &&
        !showNavMap &&
        !showQuestJournal &&
        currentMapId === 'overworld' && (
          <div className="bottom-left-field-dock">
            <div
              className="rasuwa-minimap-box"
              onClick={() => setShowNavMap(true)}
              title={`${regionDef.name} Georeferenced Survey Map (Click to Jump to Site)`}
            >
              <div className="minimap-title">
                {regionDef.flag}{' '}
                {regionId === 'rasuwa_nepal'
                  ? 'RASUWA'
                  : regionId === 'pantanal_brazil'
                    ? 'PANTANAL'
                    : regionId === 'san_joaquin_usa'
                      ? 'SAN JOAQUIN'
                      : regionId === 'hatay_turkiye'
                        ? 'HATAY'
                        : 'YUKON DELTA'}{' '}
                GPS
              </div>
              <canvas
                ref={minimapRef}
                className="rasuwa-minimap-canvas"
                style={{ height: `${miniMapHeightPx}px` }}
              />
              <div className="minimap-legend">
                <span>🟦 Water</span>
                <span>🟧 Beacon</span>
                <span>🟥 GPS</span>
              </div>
            </div>

            {activeFloodZone && (
              <div className="flood-zone-photo-card">
                <img
                  src={activeFloodZone.previewImageUrl}
                  alt={activeFloodZone.title}
                  className="fz-thumb-img"
                  onClick={() => onOpenIncidentPhotos(activeFloodZone.stationId)}
                />
                <div className="fz-card-copy">
                  <span className="fz-badge">📍 GROUND-TRUTH SITE</span>
                  <strong>{activeFloodZone.title}</strong>
                  <small>{activeFloodZone.caption}</small>
                  <button
                    type="button"
                    className="fz-open-photo-btn"
                    onClick={() => {
                      retroAudio.playUiClick(700);
                      onOpenIncidentPhotos(activeFloodZone.stationId);
                    }}
                  >
                    📷 INSPECT ARCHIVE [P]
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      {/* FLOATING INTERACTION PROMPT PILL */}
      {nearbyPrompt &&
        !dialogueBox &&
        !document.querySelector('[role="dialog"]') &&
        !groundTruthStation &&
        !showNavMap &&
        !showQuestJournal && (
          <button
            type="button"
            className="expedition-interact-toast"
            onClick={triggerInteract}
          >
            {nearbyPrompt}
          </button>
        )}

      {/* TACTILE FIELD SURVEY COMPASS & TRANSCEIVER PAD (TOUCH / MOUSE FRIENDLY) */}
      {!dialogueBox &&
        !groundTruthStation &&
        !showNavMap &&
        !showQuestJournal && (
          <div className="field-survey-pad">
            <div className="compass-grid">
              <span />
              <button
                type="button"
                className="compass-btn"
                onMouseDown={() => holdCompass('w', true)}
                onMouseUp={() => holdCompass('w', false)}
                onMouseLeave={() => holdCompass('w', false)}
                title="Walk North (W / Up)"
              >
                N
              </button>
              <span />
              <button
                type="button"
                className="compass-btn"
                onMouseDown={() => holdCompass('a', true)}
                onMouseUp={() => holdCompass('a', false)}
                onMouseLeave={() => holdCompass('a', false)}
                title="Walk West (A / Left)"
              >
                W
              </button>
              <div className="compass-hub">✦</div>
              <button
                type="button"
                className="compass-btn"
                onMouseDown={() => holdCompass('d', true)}
                onMouseUp={() => holdCompass('d', false)}
                onMouseLeave={() => holdCompass('d', false)}
                title="Walk East (D / Right)"
              >
                E
              </button>
              <span />
              <button
                type="button"
                className="compass-btn"
                onMouseDown={() => holdCompass('s', true)}
                onMouseUp={() => holdCompass('s', false)}
                onMouseLeave={() => holdCompass('s', false)}
                title="Walk South (S / Down)"
              >
                S
              </button>
              <span />
            </div>
            <div className="transceiver-actions">
              <button
                type="button"
                className="transceiver-btn primary"
                onClick={triggerInteract}
              >
                <span>📡</span>
                <small>SCAN / TALK</small>
              </button>
              <button
                type="button"
                className="transceiver-btn secondary"
                onClick={() => onOpenIncidentPhotos(activeFloodZone?.stationId || 'all')}
              >
                <span>📷</span>
                <small>ARCHIVE</small>
              </button>
            </div>
          </div>
        )}

      {/* AUTHENTIC EXPEDITION FIELD RADIO & WITNESS NOTEBOOK DIALOGUE */}
      {dialogueBox && (
        <div className="field-radio-dialogue-layer">
          {dialogueBox.showTopics && activeNpc && (
            <div className="field-radio-choice-menu">
              <div className="choice-menu-title">
                FICTIONAL CONVERSATION &amp; GAME TASKS — {activeNpc.name.toUpperCase()}:
              </div>
              {activeNpc.topics.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`field-radio-choice-row ${selectedTopicIdx === idx ? 'selected' : ''}`}
                  onMouseEnter={() => setSelectedTopicIdx(idx)}
                  onClick={() => handleSelectTopic(idx)}
                >
                  <span className="choice-arrow">{selectedTopicIdx === idx ? '▸' : '·'}</span>
                  <span>{t.question}</span>
                </button>
              ))}
              <button
                type="button"
                className={`field-radio-choice-row ${
                  selectedTopicIdx === activeNpc.topics.length ? 'selected' : ''
                }`}
                onMouseEnter={() => setSelectedTopicIdx(activeNpc.topics.length)}
                onClick={() => handleSelectTopic(activeNpc.topics.length)}
              >
                <span className="choice-arrow">
                  {selectedTopicIdx === activeNpc.topics.length ? '▸' : '·'}
                </span>
                <span>Resume {regionDef.name} field survey →</span>
              </button>
            </div>
          )}

          <div
            className="field-radio-frame"
            onClick={() => {
              if (!dialogueBox.showTopics) {
                setDialogueBox(null);
                setActiveNpc(null);
              }
            }}
          >
            <div className="field-radio-header">
              <img
                src={speakerPortraitUrl}
                alt={dialogueBox.speaker}
                className="field-radio-portrait"
              />
              <div className="field-radio-meta">
                <strong>{dialogueBox.speaker}</strong>
                {dialogueBox.role && <span>{dialogueBox.role}</span>}
              </div>
              <div className="speaker-spacer" />
              <span className="radio-freq-badge">FICTIONAL RADIO • ILLUSTRATION</span>
              <button
                type="button"
                className="field-radio-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setDialogueBox(null);
                  setActiveNpc(null);
                }}
              >
                ✕ Dismiss
              </button>
            </div>
            <p className="field-radio-copy">Fictional scene—not an interview or agency communication. {dialogueBox.text}</p>
            {!dialogueBox.showTopics && (
              <span className="field-radio-continue">▼ PRESS [SPACE] OR CLICK TO CONTINUE</span>
            )}
          </div>
        </div>
      )}

      {/* INTERACTIVE FIELD GROUND-TRUTH & RADAR HYPOTHESIS MODAL */}
      <FieldGroundTruthModal
        station={groundTruthStation}
        region={regionDef}
        isScanned={
          groundTruthStation ? scannedBeaconIds.includes(groundTruthStation.id) : false
        }
        isHypothesisVerified={
          groundTruthStation ? verifiedHypothesisIds.includes(groundTruthStation.id) : false
        }
        interventionDeployed={isRegionInterventionDone}
        onCompleteScan={(stId) => onScanBeacon(stId)}
        onVerifyHypothesis={(stId) => onVerifyHypothesis(stId)}
        onOpenPhotos={(stId) => onOpenIncidentPhotos(stId)}
        onClose={() => setGroundTruthStation(null)}
      />

      {/* EXPEDITION CHRONICLE & SYNTHESIS LOGBOOK MODAL */}
      {showQuestJournal && (
        <div className="fieldnav-modal-backdrop" onClick={() => setShowQuestJournal(false)}>
          <div className="fieldnav-card quest-journal-card" onClick={(e) => e.stopPropagation()}>
            <div className="fieldnav-header">
              <strong>
                📜 {regionDef.flag} {regionDef.name.toUpperCase()} — EXPEDITION CHRONICLE (
                {regionCompletedQuestsCount}/{regionQuests.length} ACTS COMPLETE)
              </strong>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowQuestJournal(false)}
              >
                ✕ CLOSE [Q]
              </button>
            </div>
            <p className="fieldnav-sub">
              Work alongside local communities and <strong>{regionDef.leadScientistName}</strong> to
              investigate <strong>{regionDef.hiddenPhenomenaBadge}</strong> • Beacons Calibrated:{' '}
              <strong>
                {regionScannedCount}/{regionStations.length}
              </strong>{' '}
              • Radar Hypotheses Verified:{' '}
              <strong>
                {regionVerifiedHypothesesCount}/{regionStations.length}
              </strong>
            </p>
            <div className="quest-journal-list">
              {regionQuests.map((q) => {
                const isDone = completedQuestIds.includes(q.id);
                const isAccepted = acceptedQuestIds.includes(q.id);
                const isFinalInterventionQuest =
                  q.id === 'quest_arm_siren' || q.id.endsWith('_intervention');
                const matchingFt = bundle.fastTravelPoints.find((pt) =>
                  isFinalInterventionQuest
                    ? pt.mapId === 'nisar_lab_interior'
                    : pt.stationId === q.targetStationId && pt.mapId === 'overworld'
                );
                return (
                  <div
                    key={q.id}
                    className={`quest-journal-item ${isDone ? 'done' : isAccepted ? 'active' : ''}`}
                  >
                    <div className="qj-top">
                      <div>
                        <span className="qj-badge">
                          {isDone
                            ? 'QUIZ COMPLETE'
                            : isAccepted
                              ? '🎯 ACTIVE FIELD ACT'
                              : '📍 AVAILABLE'}
                        </span>
                        <strong>
                          Mission #{q.number}: {q.title}
                        </strong>
                        <small className="qj-nepali">{q.nepaliTitle}</small>
                      </div>
                      <div className="qj-actions">
                        {matchingFt && (
                          <button
                            type="button"
                            className="qj-btn"
                            onClick={() => {
                              triggerQuestAccept(q.id);
                              handleFastTravel(matchingFt);
                            }}
                          >
                            🚁 Deploy to Site
                          </button>
                        )}
                        {isFinalInterventionQuest ? (
                          <button
                            type="button"
                            className="qj-btn action"
                            onClick={() => {
                              triggerQuestAccept(q.id);
                              setShowQuestJournal(false);
                              onOpenIntervention();
                            }}
                          >
                            ⚡ Field Action
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="qj-btn photo"
                            onClick={() => {
                              setShowQuestJournal(false);
                              onOpenIncidentPhotos(q.targetStationId);
                            }}
                          >
                            📷 Archive Photos
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="qj-desc">{q.summary}</p>
                    <div className="qj-meta">
                      <span>👤 Lead Contact: {q.giverName}</span>
                      <span>📍 {q.targetLocationName}</span>
                    </div>
                    {isDone && <div className="qj-reward">🎓 {q.rewardKnowledge}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* REGIONAL SURVEY TRANSPORT & SITES MODAL */}
      {showNavMap && (
        <div className="fieldnav-modal-backdrop" onClick={() => setShowNavMap(false)}>
          <div className="fieldnav-card" onClick={(e) => e.stopPropagation()}>
            <div className="fieldnav-header">
              <strong>
                {regionDef.flag} {regionDef.name.toUpperCase()} — SURVEY SITES &amp; TRANSPORT
              </strong>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="qj-btn"
                  onClick={() => {
                    setShowNavMap(false);
                    onOpenWorldAtlas();
                  }}
                >
                  🌍 Switch Global Region
                </button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setShowNavMap(false)}
                >
                  ✕ CLOSE [M]
                </button>
              </div>
            </div>
            <p className="fieldnav-sub">
              Explore {regionDef.name} on foot or transport directly to any corner-reflector station,
              community hall, or {regionDef.labBuildingName}:
            </p>
            <div className="fieldnav-grid">
              {bundle.fastTravelPoints.map((pt) => {
                const isDone = scannedBeaconIds.includes(pt.stationId);
                return (
                  <button
                    key={pt.id}
                    type="button"
                    className="fieldnav-dest-btn"
                    onClick={() => handleFastTravel(pt)}
                  >
                    <div className="dest-top">
                      <strong>{pt.name}</strong>
                      {isDone && <span className="beacon-done">📡 Calibrated</span>}
                    </div>
                    <small className="dest-nepali">{pt.nepaliName}</small>
                    <span>{pt.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* DOOR / HELICOPTER TRANSPORT FADE OVERLAY */}
      {warpFadeText && (
        <div className="door-warp-fade">
          <span>{warpFadeText}</span>
        </div>
      )}
    </div>
  );
};

