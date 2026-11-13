import React, { useEffect, useMemo, useState } from 'react';
import { IncidentPhotoRecord } from '../data/rasuwaQuestsAndPhotos';
import {
  GLOBAL_REGIONS_ATLAS,
  ORDERED_GLOBAL_REGIONS
} from '../data/globalRegionsAtlas';
import { GlobalRegionId } from '../services/nasaEarthDataService';
import { retroAudio } from '../audio/retroAudioAndVoice';

interface IncidentPhotoModalProps {
  isOpen: boolean;
  regionId?: GlobalRegionId;
  initialStationFilter?: string | null;
  onClose: () => void;
  onViewedPhotoForStation?: (stationId: string) => void;
}

export const IncidentPhotoModal: React.FC<IncidentPhotoModalProps> = ({
  isOpen,
  regionId = 'rasuwa_nepal',
  initialStationFilter,
  onClose,
  onViewedPhotoForStation
}) => {
  const region = GLOBAL_REGIONS_ATLAS[regionId];
  const [failedImage, setFailedImage] = useState(false);
  useEffect(() => { setFailedImage(false); }, [isOpen, regionId, initialStationFilter]);
  const allGlobalPhotos = useMemo(
    () => ORDERED_GLOBAL_REGIONS.flatMap((r) => r.photos),
    []
  );

  const [filterId, setFilterId] = useState<string>(initialStationFilter || 'all');
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>(region.photos[0].id);

  useEffect(() => {
    if (!isOpen) return;
    const targetFilter = initialStationFilter || 'all';
    setFilterId(targetFilter);
    const matching =
      targetFilter === 'all'
        ? region.photos
        : targetFilter === 'global_all'
          ? allGlobalPhotos
          : region.photos.filter((p) => p.stationId === targetFilter);
    const list = matching.length > 0 ? matching : region.photos;
    if (list.length > 0) {
      setSelectedPhotoId(list[0].id);
      if (onViewedPhotoForStation && targetFilter !== 'all' && targetFilter !== 'global_all') {
        onViewedPhotoForStation(targetFilter);
      }
    }
  }, [isOpen, regionId, initialStationFilter]);

  const filterTabs = useMemo(() => {
    const tabs: Array<{ id: string; label: string }> = [
      { id: 'all', label: `📸 All ${region.name.split(' ')[0]} Photos (${region.photos.length})` }
    ];
    const seen = new Set<string>();
    for (const st of region.stations) {
      if (region.photos.some((p) => p.stationId === st.id) && !seen.has(st.id)) {
        seen.add(st.id);
        tabs.push({ id: st.id, label: `📍 ${st.name.split('&')[0].trim()}` });
      }
    }
    tabs.push({ id: 'global_all', label: `🌍 All 5 Global Regions (${allGlobalPhotos.length})` });
    return tabs;
  }, [region, allGlobalPhotos]);

  const filteredPhotos = useMemo(() => {
    if (filterId === 'global_all') return allGlobalPhotos;
    if (filterId === 'all') return region.photos;
    const m = region.photos.filter((p) => p.stationId === filterId);
    return m.length > 0 ? m : region.photos;
  }, [filterId, region, allGlobalPhotos]);

  const activePhoto: IncidentPhotoRecord = useMemo(() => {
    return (
      filteredPhotos.find((p) => p.id === selectedPhotoId) ||
      filteredPhotos[0] ||
      region.photos[0]
    );
  }, [filteredPhotos, selectedPhotoId, region]);

  useEffect(() => {
    if (isOpen && activePhoto && onViewedPhotoForStation) {
      onViewedPhotoForStation(activePhoto.stationId);
    }
  }, [isOpen, activePhoto?.id]);

  if (!isOpen) return null;

  return (
    <div className="photo-archive-backdrop" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Local asset provenance review" className="photo-archive-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="photo-archive-header">
          <div>
            <span className="photo-kicker">
              {region.flag} UNVERIFIED LOCAL ASSET REVIEW • ILLUSTRATION // {region.name.toUpperCase()}
            </span>
            <h2>
              Review image provenance for {region.name}
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              retroAudio.playUiClick(480);
              onClose();
            }}
          >
            ✕ CLOSE [ESC]
          </button>
        </div>

        {/* Location Filter Strip */}
        <div className="photo-filter-strip">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`photo-filter-chip ${filterId === tab.id ? 'active' : ''}`}
              onClick={() => {
                retroAudio.playUiClick(640);
                setFilterId(tab.id);
                const list =
                  tab.id === 'global_all'
                    ? allGlobalPhotos
                    : tab.id === 'all'
                      ? region.photos
                      : region.photos.filter((p) => p.stationId === tab.id);
                if (list[0]) setSelectedPhotoId(list[0].id);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Viewer + Details Split */}
        <div className="photo-viewer-body">
          <div className="photo-stage-col">
            <div className="photo-frame-wrap">
              {failedImage && <p role="status">Image unavailable. No replacement observation fabricated.</p>}
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="real-incident-img" onError={() => setFailedImage(true)} style={{ display: failedImage ? 'none' : undefined }}
              />
              <div
                className={`photo-date-badge ${
                  activePhoto.isDisasterCapture ? 'disaster' : ''
                }`}
              >
                {activePhoto.dateBadge}
              </div>
              <div className="photo-coords-badge">{activePhoto.coords}</div>
            </div>

            {/* Thumbnail Filmstrip */}
            <div className="photo-thumb-strip">
              {filteredPhotos.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`photo-thumb-btn ${p.id === activePhoto.id ? 'selected' : ''}`}
                  onClick={() => {
                    retroAudio.playUiClick(680);
                    setFailedImage(false); setSelectedPhotoId(p.id);
                  }}
                >
                  <img src={p.imageUrl} alt={p.locationLabel} />
                  <span>{p.locationLabel.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="photo-caption-col">
            <div className="nepali-loc-header">
              <strong>{activePhoto.locationLabel}</strong>
              <span>{activePhoto.nepaliLabel}</span>
            </div>

            <h3 className="photo-headline">Supplied label (unverified): {activePhoto.title}</h3>
            <p className="photo-desc">{activePhoto.description}</p>

            <div className="photo-nisar-box">
              <div className="nisar-box-title">
                🛰️ ILLUSTRATIVE LEARNING PROMPT • NO CO-REGISTERED OBSERVATIONS:
              </div>
              <p>{activePhoto.nisarCorrelation}</p>
            </div>

            <div className="photo-credit-line">
              <span>📷 Supplied credit, not source verification: {activePhoto.credit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
