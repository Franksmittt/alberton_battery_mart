/** Alberton Battery Mart — 28 St Columb Rd (verified store coordinates). */
export const STORE: [number, number] = [28.12318092354321, -26.271879483112066];

export const STORE_ADDRESS = '28 St Columb Rd, New Redruth, Alberton, 1450';

export const DIRECTIONS_URL =
  'https://maps.google.com/?daddr=-26.271879483112066,28.12318092354321';

export type LngLat = [number, number];

export type RouteGeometry = {
  type: 'LineString';
  coordinates: number[][];
};

/** Local landmarks — approximate map positions to help customers orient themselves. */
export const LANDMARKS: Array<{ name: string; coords: LngLat }> = [
  { name: 'Alberton City Shopping Centre', coords: [28.122475, -26.266315] },
  { name: "McDonald's", coords: [28.1209, -26.2715] },
  { name: 'Mall at Newmarket', coords: [28.1260753, -26.2782238] },
  { name: 'Raceview Motors', coords: [28.1224305, -26.2746914] },
];

export function createStoreMarker() {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.alignItems = 'center';
  wrap.style.pointerEvents = 'none';
  wrap.style.zIndex = '20';

  const badge = document.createElement('span');
  badge.textContent = 'Alberton Battery Mart';
  badge.style.marginBottom = '8px';
  badge.style.padding = '6px 12px';
  badge.style.borderRadius = '10px';
  badge.style.fontSize = '11px';
  badge.style.fontWeight = '800';
  badge.style.letterSpacing = '0.06em';
  badge.style.textTransform = 'uppercase';
  badge.style.color = '#fff';
  badge.style.background = 'rgba(180, 20, 20, 0.92)';
  badge.style.border = '2px solid #ff4444';
  badge.style.boxShadow = '0 0 18px rgba(255, 68, 68, 0.75)';
  badge.style.whiteSpace = 'nowrap';
  badge.style.maxWidth = '220px';
  badge.style.textAlign = 'center';
  badge.style.lineHeight = '1.3';

  const dotWrap = document.createElement('div');
  dotWrap.style.position = 'relative';
  dotWrap.style.width = '28px';
  dotWrap.style.height = '28px';

  const pulse = document.createElement('div');
  pulse.style.position = 'absolute';
  pulse.style.inset = '-6px';
  pulse.style.borderRadius = '50%';
  pulse.style.background = '#ef4444';
  pulse.style.opacity = '0.55';
  pulse.style.animation = 'abm-store-pulse 1.4s ease-out infinite';

  const pulse2 = document.createElement('div');
  pulse2.style.position = 'absolute';
  pulse2.style.inset = '-2px';
  pulse2.style.borderRadius = '50%';
  pulse2.style.background = '#ef4444';
  pulse2.style.opacity = '0.35';
  pulse2.style.animation = 'abm-store-pulse 1.4s ease-out 0.45s infinite';

  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.inset = '4px';
  dot.style.borderRadius = '50%';
  dot.style.background = '#dc2626';
  dot.style.border = '3px solid #fff';
  dot.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.95), 0 2px 8px rgba(0,0,0,0.5)';

  dotWrap.appendChild(pulse);
  dotWrap.appendChild(pulse2);
  dotWrap.appendChild(dot);
  wrap.appendChild(badge);
  wrap.appendChild(dotWrap);

  return wrap;
}

export function createLandmarkLabel(name: string) {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.alignItems = 'center';
  wrap.style.pointerEvents = 'none';
  wrap.style.zIndex = '8';
  wrap.style.maxWidth = '148px';

  const badge = document.createElement('span');
  badge.textContent = name;
  badge.style.padding = '4px 8px';
  badge.style.borderRadius = '8px';
  badge.style.fontSize = '9px';
  badge.style.fontWeight = '700';
  badge.style.lineHeight = '1.3';
  badge.style.textAlign = 'center';
  badge.style.color = '#fde68a';
  badge.style.background = 'rgba(12, 12, 12, 0.84)';
  badge.style.border = '1px solid rgba(251, 191, 36, 0.4)';
  badge.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.45)';

  const dot = document.createElement('div');
  dot.style.width = '6px';
  dot.style.height = '6px';
  dot.style.marginTop = '4px';
  dot.style.borderRadius = '50%';
  dot.style.background = 'rgba(251, 191, 36, 0.9)';
  dot.style.boxShadow = '0 0 8px rgba(251, 191, 36, 0.55)';

  wrap.appendChild(badge);
  wrap.appendChild(dot);
  return wrap;
}

export function createUserMarker() {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.alignItems = 'center';
  wrap.style.pointerEvents = 'none';
  wrap.style.zIndex = '15';

  const badge = document.createElement('span');
  badge.textContent = 'Your location (approximate)';
  badge.style.marginBottom = '6px';
  badge.style.padding = '4px 10px';
  badge.style.borderRadius = '999px';
  badge.style.fontSize = '10px';
  badge.style.fontWeight = '800';
  badge.style.letterSpacing = '0.12em';
  badge.style.textTransform = 'uppercase';
  badge.style.color = '#0a0a0a';
  badge.style.background = '#e2e8f0';
  badge.style.border = '1px solid #fff';
  badge.style.boxShadow = '0 0 10px rgba(255,255,255,0.35)';
  badge.style.whiteSpace = 'nowrap';

  const dot = document.createElement('div');
  dot.style.width = '16px';
  dot.style.height = '16px';
  dot.style.borderRadius = '50%';
  dot.style.background = '#e2e8f0';
  dot.style.border = '3px solid #14B8A6';
  dot.style.boxShadow = '0 0 12px rgba(20, 184, 166, 0.8)';

  wrap.appendChild(badge);
  wrap.appendChild(dot);
  return wrap;
}

export async function fetchRoute(from: LngLat, to: LngLat): Promise<RouteGeometry | null> {
  const url = `https://router.project-osrm.org/route/v1/driving/${from[0]},${from[1]};${to[0]},${to[1]}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const data = (await res.json()) as {
    routes?: Array<{ geometry: RouteGeometry; distance: number; duration: number }>;
  };

  return data.routes?.[0]?.geometry ?? null;
}

export const MAP_SCOPE_CLASS = 'abm-store-map';

export function mapControlStyles(variant: 'embed' | 'fullscreen') {
  const bottomDesktop = variant === 'fullscreen' ? '200px' : '52px';
  const bottomMobile = variant === 'fullscreen' ? '108px' : '44px';
  const topDesktop = variant === 'fullscreen' ? '72px' : '10px';

  return `
    @keyframes abm-store-pulse {
      0% { transform: scale(0.6); opacity: 0.8; }
      70% { transform: scale(2.4); opacity: 0; }
      100% { transform: scale(2.4); opacity: 0; }
    }
    .${MAP_SCOPE_CLASS} .maplibregl-marker {
      z-index: 10;
    }
    .${MAP_SCOPE_CLASS} .maplibregl-ctrl-top-right {
      top: ${topDesktop};
      right: 10px;
    }
    .${MAP_SCOPE_CLASS} .maplibregl-ctrl-bottom-right {
      bottom: ${bottomDesktop};
      right: 10px;
    }
    @media (max-width: 767px) {
      .${MAP_SCOPE_CLASS} .maplibregl-ctrl-top-right {
        top: 10px;
      }
      .${MAP_SCOPE_CLASS} .maplibregl-ctrl-bottom-right {
        bottom: ${bottomMobile};
      }
    }
    .${MAP_SCOPE_CLASS} .maplibregl-ctrl-group {
      background: rgba(17, 17, 17, 0.88) !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
    }
    .${MAP_SCOPE_CLASS} .maplibregl-ctrl-group button {
      width: 36px !important;
      height: 36px !important;
    }
    .${MAP_SCOPE_CLASS} .maplibregl-ctrl-group button + button {
      border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    .${MAP_SCOPE_CLASS} .maplibregl-ctrl button .maplibregl-ctrl-icon {
      filter: invert(1) brightness(1.2);
    }
    .${MAP_SCOPE_CLASS} .maplibregl-ctrl-scale {
      background: rgba(17, 17, 17, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      color: #e5e5e5;
      font-size: 10px;
      padding: 2px 8px;
    }
  `;
}
