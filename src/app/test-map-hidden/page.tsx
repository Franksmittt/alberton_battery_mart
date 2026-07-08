'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

/** Alberton Battery Mart — 28 St Columb Rd (verified store coordinates). */
const STORE: [number, number] = [28.12318092354321, -26.271879483112066];

const STORE_ADDRESS = '28 St Columb Rd, New Redruth, Alberton, 1450';

const DIRECTIONS_URL =
  'https://maps.google.com/?daddr=-26.271879483112066,28.12318092354321';

type LngLat = [number, number];

type RouteGeometry = {
  type: 'LineString';
  coordinates: number[][];
};

function createStoreMarker() {
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

function createUserMarker() {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.alignItems = 'center';
  wrap.style.pointerEvents = 'none';
  wrap.style.zIndex = '15';

  const badge = document.createElement('span');
  badge.textContent = 'You are here';
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

async function fetchRoute(from: LngLat, to: LngLat): Promise<RouteGeometry | null> {
  const url = `https://router.project-osrm.org/route/v1/driving/${from[0]},${from[1]};${to[0]},${to[1]}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const data = (await res.json()) as {
    routes?: Array<{ geometry: RouteGeometry; distance: number; duration: number }>;
  };

  return data.routes?.[0]?.geometry ?? null;
}

export default function TestMapHiddenPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const storeMarkerRef = useRef<maplibregl.Marker | null>(null);
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);

  const [status, setStatus] = useState<'idle' | 'locating' | 'routing' | 'ready' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [routeSummary, setRouteSummary] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const drawRoute = useCallback((geometry: RouteGeometry) => {
    const map = mapRef.current;
    if (!map) return;

    const sourceId = 'route-line';
    const layerId = 'route-line-layer';
    const feature = { type: 'Feature' as const, properties: {}, geometry };

    if (map.getSource(sourceId)) {
      (map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(feature);
    } else {
      map.addSource(sourceId, { type: 'geojson', data: feature });
      map.addLayer({
        id: `${layerId}-glow`,
        type: 'line',
        source: sourceId,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#14B8A6',
          'line-width': 14,
          'line-opacity': 0.25,
          'line-blur': 2,
        },
      });
      map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#14B8A6',
          'line-width': 6,
          'line-opacity': 0.95,
        },
      });
    }
  }, []);

  const fitToRoute = useCallback((userLngLat: LngLat, route: RouteGeometry) => {
    const map = mapRef.current;
    if (!map) return;

    const bounds = new maplibregl.LngLatBounds();
    bounds.extend(userLngLat);
    bounds.extend(STORE);
    route.coordinates.forEach((coord) => bounds.extend(coord as LngLat));

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    map.fitBounds(bounds, {
      padding: {
        top: isMobile ? 56 : 100,
        bottom: isMobile ? 112 : 240,
        left: isMobile ? 32 : 56,
        right: isMobile ? 32 : 56,
      },
      pitch: 50,
      bearing: -20,
      duration: 1600,
    });
  }, []);

  const showUserLocation = useCallback(
    async (lngLat: LngLat) => {
      const map = mapRef.current;
      if (!map) return;

      if (userMarkerRef.current) {
        userMarkerRef.current.setLngLat(lngLat);
      } else {
        userMarkerRef.current = new maplibregl.Marker({
          element: createUserMarker(),
          anchor: 'bottom',
        })
          .setLngLat(lngLat)
          .addTo(map);
      }

      setStatus('routing');
      setStatusMessage('Calculating the best driving route to our shop…');

      try {
        const geometry = await fetchRoute(lngLat, STORE);
        if (!geometry) {
          setStatus('error');
          setStatusMessage('Could not calculate a route. Try GET DIRECTIONS instead.');
          return;
        }

        drawRoute(geometry);
        fitToRoute(lngLat, geometry);

        const meta = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${lngLat[0]},${lngLat[1]};${STORE[0]},${STORE[1]}?overview=false`
        ).then((r) => r.json());
        const route = meta.routes?.[0];
        if (route) {
          const km = (route.distance / 1000).toFixed(1);
          const mins = Math.max(1, Math.round(route.duration / 60));
          setRouteSummary(`${km} km · ~${mins} min drive to Alberton Battery Mart`);
        }

        setStatus('ready');
        setStatusMessage('Turquoise line = best route from you to our red shop pin.');
      } catch {
        setStatus('error');
        setStatusMessage('Route lookup failed. Use GET DIRECTIONS to open Google Maps.');
      }
    },
    [drawRoute, fitToRoute]
  );

  const locateAndRoute = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('error');
      setStatusMessage('Your browser does not support location sharing.');
      return;
    }

    setStatus('locating');
    setStatusMessage('Finding your approximate location…');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        void showUserLocation([pos.coords.longitude, pos.coords.latitude]);
      },
      () => {
        setStatus('error');
        setStatusMessage(
          'Location blocked. Allow location access, or tap GET DIRECTIONS to navigate via Google Maps.'
        );
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 120000 }
    );
  }, [showUserLocation]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/dark',
      center: STORE,
      zoom: 18,
      pitch: 55,
      bearing: -20,
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      }),
      'top-right'
    );

    map.addControl(
      new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }),
      'bottom-right'
    );

    map.dragRotate.enable();
    map.touchZoomRotate.enable();
    map.touchPitch.enable();
    map.keyboard.enable();
    map.doubleClickZoom.enable();

    storeMarkerRef.current = new maplibregl.Marker({
      element: createStoreMarker(),
      anchor: 'bottom',
    })
      .setLngLat(STORE)
      .addTo(map);

    map.on('load', () => {
      map.addSource('store-location', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'Point', coordinates: STORE },
        },
      });

      map.addLayer({
        id: 'store-glow-outer',
        type: 'circle',
        source: 'store-location',
        paint: {
          'circle-radius': 28,
          'circle-color': '#ef4444',
          'circle-opacity': 0.35,
          'circle-blur': 0.8,
        },
      });

      map.addLayer({
        id: 'store-glow-inner',
        type: 'circle',
        source: 'store-location',
        paint: {
          'circle-radius': 12,
          'circle-color': '#dc2626',
          'circle-opacity': 0.9,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff',
        },
      });

      map.flyTo({
        center: STORE,
        zoom: 18,
        pitch: 55,
        bearing: -20,
        duration: 1200,
      });

      if (!map.getSource('openfreemap')) {
        map.addSource('openfreemap', {
          type: 'vector',
          url: 'https://tiles.openfreemap.org/planet',
        });
      }

      if (!map.getLayer('3d-buildings')) {
        map.addLayer({
          id: '3d-buildings',
          source: 'openfreemap',
          'source-layer': 'building',
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#1a1a1a',
            'fill-extrusion-opacity': 0.9,
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'render_height'],
            ],
            'fill-extrusion-base': ['get', 'render_min_height'],
          },
        });
      }
    });

    return () => {
      storeMarkerRef.current?.remove();
      userMarkerRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-screen w-full bg-[#050505]">
      <style>{`
        @keyframes abm-store-pulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .maplibregl-marker {
          z-index: 10;
        }
        .maplibregl-ctrl-top-right {
          top: 72px;
          right: 10px;
        }
        .maplibregl-ctrl-bottom-right {
          bottom: 200px;
          right: 10px;
        }
        @media (max-width: 767px) {
          .maplibregl-ctrl-top-right {
            top: 10px;
          }
          .maplibregl-ctrl-bottom-right {
            bottom: 108px;
          }
        }
        .maplibregl-ctrl-group {
          background: rgba(17, 17, 17, 0.88) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
        }
        .maplibregl-ctrl-group button {
          width: 36px !important;
          height: 36px !important;
        }
        .maplibregl-ctrl-group button + button {
          border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .maplibregl-ctrl button .maplibregl-ctrl-icon {
          filter: invert(1) brightness(1.2);
        }
        .maplibregl-ctrl-scale {
          background: rgba(17, 17, 17, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          color: #e5e5e5;
          font-size: 10px;
          padding: 2px 8px;
        }
      `}</style>

      <div ref={mapContainerRef} className="absolute inset-0 h-full w-full" />

      {/* Desktop — full info card */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden items-end p-6 sm:p-8 md:flex">
        <div
          className="pointer-events-auto w-full max-w-sm rounded-[32px] border border-white/10 bg-[#111]/70 p-6 shadow-2xl backdrop-blur-2xl"
          style={{ backdropFilter: 'blur(40px)' }}
        >
          <span className="inline-block rounded-full bg-red-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
            Our shop · red pin on map
          </span>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Alberton Battery Mart
          </h1>

          <p className="mt-2 text-sm text-gray-400">{STORE_ADDRESS}</p>

          {routeSummary ? (
            <p className="mt-3 text-sm font-semibold text-[#14B8A6]">{routeSummary}</p>
          ) : null}

          {statusMessage ? (
            <p className="mt-2 text-xs text-gray-500">{statusMessage}</p>
          ) : (
            <p className="mt-2 text-xs text-gray-500">
              The flashing red pin marks our shop. Use +/− to zoom, the compass to rotate, or pinch
              and drag on mobile. Tap below to show your location and the best route to us.
            </p>
          )}

          <button
            type="button"
            onClick={locateAndRoute}
            disabled={status === 'locating' || status === 'routing'}
            className="mt-5 w-full rounded-2xl border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-[#14B8A6] transition-opacity hover:bg-[#14B8A6]/20 disabled:opacity-50"
          >
            {status === 'locating' || status === 'routing'
              ? 'Finding you…'
              : 'Show my location & route'}
          </button>

          <button
            type="button"
            onClick={() => window.open(DIRECTIONS_URL, '_blank', 'noopener,noreferrer')}
            className="mt-3 w-full rounded-2xl bg-[#14B8A6] px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
          >
            GET DIRECTIONS
          </button>
        </div>
      </div>

      {/* Mobile — compact bottom dock (collapsed) or sheet (expanded) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 md:hidden">
        {panelOpen ? (
          <div
            className="pointer-events-auto mx-3 mb-3 max-h-[min(72vh,520px)] overflow-y-auto rounded-[24px] border border-white/10 bg-[#111]/90 p-4 shadow-2xl backdrop-blur-2xl"
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="mx-auto mb-3 flex h-1 w-10 rounded-full bg-white/25"
              aria-label="Collapse details"
            />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-red-500/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-red-400">
                  Red pin = our shop
                </span>
                <h2 className="mt-2 text-lg font-bold tracking-tight text-white">
                  Alberton Battery Mart
                </h2>
                <p className="mt-1 text-xs leading-snug text-gray-400">{STORE_ADDRESS}</p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400"
              >
                Less
              </button>
            </div>

            {routeSummary ? (
              <p className="mt-3 text-xs font-semibold text-[#14B8A6]">{routeSummary}</p>
            ) : null}

            {statusMessage ? (
              <p className="mt-2 text-[11px] leading-snug text-gray-500">{statusMessage}</p>
            ) : (
              <p className="mt-2 text-[11px] leading-snug text-gray-500">
                Pinch to zoom and drag to explore. Turquoise line appears after you tap My route.
              </p>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={locateAndRoute}
                disabled={status === 'locating' || status === 'routing'}
                className="rounded-xl border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#14B8A6] disabled:opacity-50"
              >
                {status === 'locating' || status === 'routing' ? 'Finding…' : 'My route'}
              </button>
              <button
                type="button"
                onClick={() => window.open(DIRECTIONS_URL, '_blank', 'noopener,noreferrer')}
                className="rounded-xl bg-[#14B8A6] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-black"
              >
                Directions
              </button>
            </div>
          </div>
        ) : (
          <div
            className="pointer-events-auto border-t border-white/10 bg-[#111]/92 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_40px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            style={{ backdropFilter: 'blur(32px)' }}
          >
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="mx-auto mb-2 flex h-1 w-10 rounded-full bg-white/25"
              aria-label="Show shop details"
            />

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
                Alberton Battery Mart
              </p>
              <button
                type="button"
                onClick={() => setPanelOpen(true)}
                className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-gray-400"
              >
                More
              </button>
            </div>

            <p className="mt-1 truncate text-[11px] text-gray-500">
              {routeSummary ??
                (statusMessage && status !== 'idle'
                  ? statusMessage
                  : 'Red pin on map · tap My route for directions')}
            </p>

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={locateAndRoute}
                disabled={status === 'locating' || status === 'routing'}
                className="rounded-xl border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#14B8A6] disabled:opacity-50"
              >
                {status === 'locating' || status === 'routing' ? 'Finding…' : 'My route'}
              </button>
              <button
                type="button"
                onClick={() => window.open(DIRECTIONS_URL, '_blank', 'noopener,noreferrer')}
                className="rounded-xl bg-[#14B8A6] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-black"
              >
                Directions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
