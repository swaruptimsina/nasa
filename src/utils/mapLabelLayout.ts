export interface MapBadgeAnchor {
  id: string;
  anchorX: number;
  anchorY: number;
  width: number;
  height: number;
  selected?: boolean;
}

export interface PlacedMapBadge {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Move labels, never geographic anchors; leave crowded sites selectable in the notebook. */
export function layoutMapBadges(
  anchors: MapBadgeAnchor[],
  width: number,
  height: number
): PlacedMapBadge[] {
  const margin = 8;
  const gap = 14;
  const placed: PlacedMapBadge[] = [];
  const ordered = [...anchors].sort((a, b) => Number(!!b.selected) - Number(!!a.selected));

  for (const anchor of ordered) {
    if (anchor.width > width - margin * 2 || anchor.height > height - margin * 2) continue;
    const candidates = [
      { x: anchor.anchorX - anchor.width / 2, y: anchor.anchorY + gap },
      { x: anchor.anchorX - anchor.width / 2, y: anchor.anchorY - anchor.height - gap },
      { x: anchor.anchorX + gap, y: anchor.anchorY - anchor.height / 2 },
      { x: anchor.anchorX - anchor.width - gap, y: anchor.anchorY - anchor.height / 2 },
      // Perspective can compress several sites into one cluster; try adjacent columns.
      { x: anchor.anchorX + anchor.width / 2 + gap, y: anchor.anchorY + gap },
      { x: anchor.anchorX + anchor.width / 2 + gap, y: anchor.anchorY - anchor.height - gap },
      { x: anchor.anchorX - anchor.width * 1.5 - gap, y: anchor.anchorY + gap },
      { x: anchor.anchorX - anchor.width * 1.5 - gap, y: anchor.anchorY - anchor.height - gap }
    ];
    for (const candidate of candidates) {
      const box: PlacedMapBadge = {
        id: anchor.id,
        x: Math.max(margin, Math.min(width - anchor.width - margin, candidate.x)),
        y: Math.max(margin, Math.min(height - anchor.height - margin, candidate.y)),
        width: anchor.width,
        height: anchor.height
      };
      if (placed.some(other => box.x < other.x + other.width && box.x + box.width > other.x && box.y < other.y + other.height && box.y + box.height > other.y)) continue;
      placed.push(box);
      break;
    }
  }
  return placed;
}
