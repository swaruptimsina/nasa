import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { JudgeBriefing } from './components/JudgeBriefing';
import { ExpeditionLaunchScreen } from './components/ExpeditionLaunchScreen';
import { FieldExpeditionViewport } from './components/FieldExpeditionViewport';
import { ImpactInterventionModal } from './components/ImpactInterventionModal';
import { IncidentPhotoModal } from './components/IncidentPhotoModal';
import { LabSupercomputerScreen } from './components/LabSupercomputerScreen';
import { PixelWorldGlobeScreen } from './components/PixelWorldGlobeScreen';
import {
  GLOBAL_REGIONS_ATLAS,
  ORDERED_GLOBAL_REGIONS
} from './data/globalRegionsAtlas';
import { getRegionalWorldBundle } from './game/regionalMapsBuilder';
import { GlobalRegionId } from './services/nasaEarthDataService';
import { retroAudio } from './audio/retroAudioAndVoice';
import './App.css';
import './judge.css';
import './game-theme.css';
import './observatory.css';

export const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [judgeOpen, setJudgeOpen] = useState(false);
  const closeJudge = useCallback(() => setJudgeOpen(false), []);
  const [activeRegionId, setActiveRegionId] = useState<GlobalRegionId>('rasuwa_nepal');
  const [startInsideLab, setStartInsideLab] = useState(false);
  const [regionLaunchSeq, setRegionLaunchSeq] = useState(0);

  const [worldAtlasOpen, setWorldAtlasOpen] = useState(false);
  const [interventionModalOpen, setInterventionModalOpen] = useState(false);
  const [supercomputerOpen, setSupercomputerOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoModalStation, setPhotoModalStation] = useState<string | null>(null);

  const [scannedBeaconIds, setScannedBeaconIds] = useState<string[]>([]);
  const [verifiedHypothesisIds, setVerifiedHypothesisIds] = useState<string[]>([]);
  const [interviewedNpcIds, setInterviewedNpcIds] = useState<string[]>([]);
  const [acceptedQuestIds, setAcceptedQuestIds] = useState<string[]>([
    'quest_miteri_scar'
  ]);
  const [viewedPhotoStations, setViewedPhotoStations] = useState<string[]>([]);
  const [viewed3DRegions, setViewed3DRegions] = useState<GlobalRegionId[]>([]);
  const [completedInterventions, setCompletedInterventions] = useState<GlobalRegionId[]>([]);
  const [earlyWarningArmed, setEarlyWarningArmed] = useState(false);

  const [voiceOn, setVoiceOn] = useState(false);
  const [bgmOn, setBgmOn] = useState(false);

  const handleVerifyHypothesis = (stationId: string) => {
    setVerifiedHypothesisIds((prev) =>
      prev.includes(stationId) ? prev : [...prev, stationId]
    );
  };

  // Derive Completed Quests dynamically across all 5 global communities!
  const completedQuestIds = useMemo(() => {
    const done: string[] = [];

    const countHypothesesIn = (regId: GlobalRegionId) =>
      GLOBAL_REGIONS_ATLAS[regId].stations.filter((s) =>
        verifiedHypothesisIds.includes(s.id)
      ).length;

    // 1. Rasuwa, Nepal (5 Quests)
    if (
      scannedBeaconIds.includes('miteri_bridge') &&
      viewedPhotoStations.includes('miteri_bridge')
    ) {
      done.push('quest_miteri_scar');
    }
    if (
      scannedBeaconIds.includes('timure') &&
      interviewedNpcIds.includes('npc_dolma')
    ) {
      done.push('quest_timure_witness');
    }
    if (
      scannedBeaconIds.includes('chilime') &&
      scannedBeaconIds.includes('rasuwagadhi_hydro')
    ) {
      done.push('quest_hydro_terrace');
    }
    if (scannedBeaconIds.includes('purugu_glacier')) {
      done.push('quest_purugu_crown');
    }
    if (
      (earlyWarningArmed || completedInterventions.includes('rasuwa_nepal')) &&
      viewed3DRegions.includes('rasuwa_nepal')
    ) {
      done.push('quest_arm_siren');
    }

    // 2. Pantanal & Southern Amazon, Brazil (4 Acts)
    if (
      scannedBeaconIds.includes('br_logging_front') &&
      viewedPhotoStations.includes('br_logging_front')
    ) {
      done.push('quest_br_hidden_logging');
    }
    if (
      scannedBeaconIds.includes('br_peat_channel') &&
      interviewedNpcIds.includes('npc_br_iara')
    ) {
      done.push('quest_br_peat_witness');
    }
    if (countHypothesesIn('pantanal_brazil') >= 2) {
      done.push('quest_br_hypothesis');
    }
    if (
      completedInterventions.includes('pantanal_brazil') &&
      viewed3DRegions.includes('pantanal_brazil')
    ) {
      done.push('quest_br_intervention');
    }

    // 3. San Joaquin Central Valley, California (4 Acts)
    if (
      scannedBeaconIds.includes('ca_corcoran_bowl') &&
      viewedPhotoStations.includes('ca_corcoran_bowl')
    ) {
      done.push('quest_ca_benchmark');
    }
    if (
      scannedBeaconIds.includes('ca_aqueduct_levee') &&
      interviewedNpcIds.includes('npc_ca_rosa')
    ) {
      done.push('quest_ca_campesino_wells');
    }
    if (countHypothesesIn('san_joaquin_usa') >= 2) {
      done.push('quest_ca_hypothesis');
    }
    if (
      completedInterventions.includes('san_joaquin_usa') &&
      viewed3DRegions.includes('san_joaquin_usa')
    ) {
      done.push('quest_ca_intervention');
    }

    // 4. Hatay–Pazarcık Fault Corridor, Türkiye (4 Acts)
    if (
      scannedBeaconIds.includes('tr_fault_olive') &&
      viewedPhotoStations.includes('tr_fault_olive')
    ) {
      done.push('quest_tr_olive_fault');
    }
    if (
      (scannedBeaconIds.includes('tr_antakya_havus') ||
        scannedBeaconIds.includes('tr_dam_crest')) &&
      interviewedNpcIds.includes('npc_tr_zeynep')
    ) {
      done.push('quest_tr_cay_evi');
    }
    if (countHypothesesIn('hatay_turkiye') >= 2) {
      done.push('quest_tr_hypothesis');
    }
    if (
      completedInterventions.includes('hatay_turkiye') &&
      viewed3DRegions.includes('hatay_turkiye')
    ) {
      done.push('quest_tr_intervention');
    }

    // 5. Yukon–Kuskokwim Yup'ik Coast, Alaska (4 Acts)
    if (
      scannedBeaconIds.includes('ak_bluff_erosion') &&
      viewedPhotoStations.includes('ak_bluff_erosion')
    ) {
      done.push('quest_ak_bluff');
    }
    if (
      scannedBeaconIds.includes('ak_yupik_boardwalk') &&
      interviewedNpcIds.includes('npc_ak_elena_elder')
    ) {
      done.push('quest_ak_elder');
    }
    if (countHypothesesIn('yukon_alaska') >= 2) {
      done.push('quest_ak_hypothesis');
    }
    if (
      completedInterventions.includes('yukon_alaska') &&
      viewed3DRegions.includes('yukon_alaska')
    ) {
      done.push('quest_ak_intervention');
    }

    return done;
  }, [
    scannedBeaconIds,
    verifiedHypothesisIds,
    viewedPhotoStations,
    interviewedNpcIds,
    earlyWarningArmed,
    completedInterventions,
    viewed3DRegions
  ]);

  const completedQuestCountByRegion = useMemo(() => {
    const out = {} as Record<GlobalRegionId, { done: number; total: number }>;
    for (const reg of ORDERED_GLOBAL_REGIONS) {
      const doneCount = reg.quests.filter((q) => completedQuestIds.includes(q.id)).length;
      out[reg.id] = { done: doneCount, total: reg.quests.length };
    }
    return out;
  }, [completedQuestIds]);

  const activeRegionStats = useMemo(() => {
    const regDef = GLOBAL_REGIONS_ATLAS[activeRegionId];
    const regBundle = getRegionalWorldBundle(
      activeRegionId,
      completedInterventions.includes(activeRegionId)
    );
    const scannedCount = regDef.stations.filter((s) =>
      scannedBeaconIds.includes(s.id)
    ).length;
    const interviewedCount = regBundle.npcs.filter((n) =>
      interviewedNpcIds.includes(n.id)
    ).length;
    return { scannedCount, interviewedCount };
  }, [activeRegionId, scannedBeaconIds, interviewedNpcIds, completedInterventions]);

  // ESC closes top-most modal cleanly in reverse z-order
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (judgeOpen) return;
        if (photoModalOpen) {
          setPhotoModalOpen(false);
        } else if (interventionModalOpen) {
          setInterventionModalOpen(false);
        } else if (worldAtlasOpen && booted) {
          setWorldAtlasOpen(false);
        } else if (supercomputerOpen) {
          setSupercomputerOpen(false);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [photoModalOpen, interventionModalOpen, worldAtlasOpen, supercomputerOpen, booted, judgeOpen]);

  // Keep keyboard navigation inside the currently open core-path dialog.
  useEffect(() => {
    if (judgeOpen) return; // JudgeBriefing manages its own focus.
    const selector = photoModalOpen ? '.photo-archive-modal:not(.intervention-modal)'
      : interventionModalOpen ? '.intervention-modal'
        : worldAtlasOpen ? '.world-atlas-shell'
          : supercomputerOpen ? '.mainframe-bezel-chassis' : null;
    if (!selector) return;
    const dialog = document.querySelector<HTMLElement>(selector);
    if (!dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const getControls = () => [...dialog.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, summary')].filter(el => el.getClientRects().length > 0);
    getControls()[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const controls = getControls();
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault(); first?.focus();
      }
    };
    window.addEventListener('keydown', keydown, true);
    return () => { window.removeEventListener('keydown', keydown, true); if (previous?.isConnected) previous.focus(); };
  }, [judgeOpen, photoModalOpen, interventionModalOpen, worldAtlasOpen, supercomputerOpen]);

  const seedRegionStarterQuest = (regionId: GlobalRegionId) => {
    const firstQ = GLOBAL_REGIONS_ATLAS[regionId].quests[0]?.id;
    if (firstQ) {
      setAcceptedQuestIds((prev) => (prev.includes(firstQ) ? prev : [...prev, firstQ]));
    }
  };

  const handleStartFromBoot = (
    mode: 'world_atlas' | 'syabrubesi' | 'inside_lab' | 'judge_demo',
    initialRegionId: GlobalRegionId = 'rasuwa_nepal'
  ) => {
    retroAudio.unlock();
    retroAudio.voiceEnabled = voiceOn;
    setBgmOn(retroAudio.toggleBgm(false));
    if (mode === 'judge_demo') {
      setActiveRegionId('rasuwa_nepal');
      setStartInsideLab(true);
      setBooted(true);
      setJudgeOpen(true);
    } else if (mode === 'world_atlas') {
      setStartInsideLab(false);
      setBooted(true);
      setWorldAtlasOpen(true);
    } else {
      setActiveRegionId(initialRegionId);
      seedRegionStarterQuest(initialRegionId);
      setStartInsideLab(mode === 'inside_lab');
      setRegionLaunchSeq((n) => n + 1);
      setBooted(true);
    }
  };

  const handleSelectRegionAndPlay = (regionId: GlobalRegionId, spawnInLab: boolean) => {
    setActiveRegionId(regionId);
    seedRegionStarterQuest(regionId);
    setStartInsideLab(spawnInLab);
    setSupercomputerOpen(false);
    setInterventionModalOpen(false);
    setPhotoModalOpen(false);
    setWorldAtlasOpen(false);
    setRegionLaunchSeq((n) => n + 1);
    setBooted(true);
  };

  const openPhotosFor = (stationId?: string) => {
    setPhotoModalStation(stationId || 'all');
    setPhotoModalOpen(true);
  };

  const handleCompleteIntervention = (regId: GlobalRegionId) => {
    setCompletedInterventions((prev) => (prev.includes(regId) ? prev : [...prev, regId]));
    if (regId === 'rasuwa_nepal') {
      setEarlyWarningArmed(true);
    }
  };

  return (
    <div className="app-shell">
      {booted && <button type="button" className="judge-resume" onClick={() => {
        setSupercomputerOpen(false); setPhotoModalOpen(false); setInterventionModalOpen(false); setWorldAtlasOpen(false); setJudgeOpen(true);
      }}>Evidence trail / sources</button>}
      {booted && <JudgeBriefing isOpen={judgeOpen} onClose={closeJudge}
        onOpenObservatory={() => { setActiveRegionId('rasuwa_nepal'); setJudgeOpen(false); setSupercomputerOpen(true); }}
        onOpenEvidence={() => { setActiveRegionId('rasuwa_nepal'); setJudgeOpen(false); openPhotosFor('all'); }}
        onOpenAction={() => { setActiveRegionId('rasuwa_nepal'); setJudgeOpen(false); setInterventionModalOpen(true); }} />}

      {!booted ? (
        <ExpeditionLaunchScreen onStartGame={handleStartFromBoot} />
      ) : (
        <FieldExpeditionViewport
          key={`${activeRegionId}-${startInsideLab ? 'lab' : 'town'}-${regionLaunchSeq}`}
          regionId={activeRegionId}
          initialInsideLab={startInsideLab}
          scannedBeaconIds={scannedBeaconIds}
          onScanBeacon={(id) =>
            setScannedBeaconIds((p) => (p.includes(id) ? p : [...p, id]))
          }
          verifiedHypothesisIds={verifiedHypothesisIds}
          onVerifyHypothesis={handleVerifyHypothesis}
          interviewedNpcIds={interviewedNpcIds}
          onInterviewNpc={(id) =>
            setInterviewedNpcIds((p) => (p.includes(id) ? p : [...p, id]))
          }
          acceptedQuestIds={acceptedQuestIds}
          completedQuestIds={completedQuestIds}
          completedInterventions={completedInterventions}
          onAcceptQuest={(qId) =>
            setAcceptedQuestIds((p) => (p.includes(qId) ? p : [...p, qId]))
          }
          earlyWarningArmed={earlyWarningArmed}
          onOpenWorldAtlas={() => setWorldAtlasOpen(true)}
          onOpenIntervention={() => setInterventionModalOpen(true)}
          onOpenLabSupercomputer={() => setSupercomputerOpen(true)}
          onOpenIncidentPhotos={openPhotosFor}
          voiceOn={voiceOn}
          onToggleVoice={() => {
            const next = !voiceOn;
            setVoiceOn(next);
            retroAudio.voiceEnabled = next;
            if (!next) retroAudio.stopSpeaking();
          }}
          bgmOn={bgmOn}
          onToggleBgm={() => setBgmOn(retroAudio.toggleBgm())}
        />
      )}

      {/* GLOBAL EARTH SURFACE-CHANGE ATLAS (5 HOTSPOTS + LIVE NASA EONET & POWER) */}
      <PixelWorldGlobeScreen
        isOpen={worldAtlasOpen}
        activeRegionId={activeRegionId}
        completedInterventions={completedInterventions}
        completedQuestCountByRegion={completedQuestCountByRegion}
        onSelectRegionAndPlay={handleSelectRegionAndPlay}
        onClose={booted ? () => setWorldAtlasOpen(false) : undefined}
      />

      {/* DIEGETIC REGIONAL OBSERVATORY SUPERCOMPUTER (HIGH-RES 2D/3D + LIVE NASA GIBS & HYPOTHESES) */}
      <LabSupercomputerScreen
        isOpen={supercomputerOpen}
        initialStationId="miteri_bridge"
        regionId={activeRegionId}
        onStepBackToLab={() => setSupercomputerOpen(false)}
        scannedBeaconIds={scannedBeaconIds}
        interviewedNpcIds={interviewedNpcIds}
        verifiedHypothesisIds={verifiedHypothesisIds}
        onVerifyHypothesis={handleVerifyHypothesis}
        earlyWarningArmed={
          completedInterventions.includes(activeRegionId) ||
          (activeRegionId === 'rasuwa_nepal' && earlyWarningArmed)
        }
        onArmEarlyWarning={() => {
          if (activeRegionId === 'rasuwa_nepal') {
            setEarlyWarningArmed(true);
          }
          handleCompleteIntervention(activeRegionId);
        }}
        onOpenIncidentPhotos={openPhotosFor}
        onOpenIntervention={() => setInterventionModalOpen(true)}
        onOpenWorldAtlas={() => setWorldAtlasOpen(true)}
        onViewed3D={() =>
          setViewed3DRegions((p) =>
            p.includes(activeRegionId) ? p : [...p, activeRegionId]
          )
        }
      />

      {/* HANDS-ON MULTI-SENSOR COMMUNITY IMPACT INTERVENTION SIMULATOR & STAKEHOLDER BRIEF EXPORT */}
      <ImpactInterventionModal
        isOpen={interventionModalOpen}
        regionId={activeRegionId}
        scannedCountInRegion={activeRegionStats.scannedCount}
        interviewedCountInRegion={activeRegionStats.interviewedCount}
        completedInterventions={completedInterventions}
        onCompleteIntervention={handleCompleteIntervention}
        onClose={() => setInterventionModalOpen(false)}
      />

      {/* VERIFIED REAL FIELD PHOTOGRAPHS & NASA IMAGERY MODAL */}
      <IncidentPhotoModal
        isOpen={photoModalOpen}
        regionId={activeRegionId}
        initialStationFilter={photoModalStation}
        onClose={() => setPhotoModalOpen(false)}
        onViewedPhotoForStation={(stId) =>
          setViewedPhotoStations((p) => (p.includes(stId) ? p : [...p, stId]))
        }
      />
    </div>
  );
};

export default App;
