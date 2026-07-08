'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

/** 28 St Columb Rd — matches STORE_COORDINATES in seo-constants (was ~2 km off before). */
const STORE: [number, number] = [28.12132331503201, -26.28291418340356];

const DIRECTIONS_URL =
  'https://maps.google.com/?daddr=28+St+Columb+Rd,+New+Redruth,+Alberton';

type LngLat = [number, number];

function createPulseMarker(color: string, label: string, textColor = '#fff') {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.alignItems = 'center';
  wrap.style.pointerEvents = 'none';

  const badge = document.createElement('span');
  badge.textContent = label;
  badge.style.marginBottom = '6px';
  badge.style.padding = '4px 10px';
  badge.style.borderRadius = '999px';
  badge.style.fontSize = '10px';
  badge.style.fontWeight = '800';
  badge.style.letterSpacing = '0.14em';
  badge.style.textTransform = 'uppercase';
  badge.style.color = textColor;
  badge.style.background = 'rgba(0,0,0,0.75)';
  badge.style.border = `1px solid ${color}`;
  badge.style.boxShadow = `0 0 12px ${color}66`;
  badge.style.whiteSpace = 'nowrap';

  const dotWrap = document.createElement('div');
  dotWrap.style.position = 'relative';
  dotWrap.style.width = '22px';
  dotWrap.style.height = '22px';

  const pulse = document.createElement('div');
  pulse.style.position = 'absolute';
  pulse.style.inset = '0';
  pulse.style.borderRadius = '50%';
  pulse.style.background = color;
  pulse.style.opacity = '0.45';
  pulse.style.animation = 'abm-map-pulse 1.8s ease-out infinite';

  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.inset = '3px';
  dot.style.borderRadius = '50%';
  dot.style.background = color;
  dot.style.border = '2px solid #0a0a0a';
  dot.style.boxShadow = `0 0 16px ${color}bf`;

  dotWrap.appendChild(pulse);
  dotWrap.appendChild(dot);
  wrap.appendChild(badge);
  wrap.appendChild(dotWrap);

  return wrap;
}

type RouteGeometry = {
  type: 'LineString';
  coordinates: number[][];
};

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

  const drawRoute = useCallback((geometry: RouteGeometry) => {
    const map = mapRef.current;
    if (!map) return;

    const sourceId = 'route-line';
    const layerId = 'route-line-layer';

    const feature = {
      type: 'Feature' as const,
      properties: {},
      geometry,
    };

    if (map.getSource(sourceId)) {
      (map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(feature);
    } else {
      map.addSource(sourceId, { type: 'geojson', data: feature });
      map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#14B8A6',
          'line-width': 5,
          'line-opacity': 0.92,
        },
      });
      map.addLayer({
        id: `${layerId}-glow`,
        type: 'line',
        source: sourceId,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#14B8A6',
          'line-width': 12,
          'line-opacity': 0.2,
          'line-blur': 2,
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

    map.fitBounds(bounds, {
      padding: { top: 80, bottom: 220, left: 48, right: 48 },
      pitch: 55,
      bearing: -25,
      duration: 1400,
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
          element: createPulseMarker('#e2e8f0', 'You are here', '#e2e8f0'),
          anchor: 'bottom',
        })
          .setLngLat(lngLat)
          .addTo(map);
      }

      setStatus('routing');
      setStatusMessage('Calculating shortest driving route…');

      try {
        const geometry = await fetchRoute(lngLat, STORE);
        if (!geometry) {
          setStatus('error');
          setStatusMessage('Could not calculate a route. Try GET DIRECTIONS instead.');
          return;
        }

        drawRoute(geometry);
        fitToRoute(lngLat, geometry);

        const url = `https://router.project-osrm.org/route/v1/driving/${lngLat[0]},${lngLat[1]};${STORE[0]},${STORE[1]}?overview=false`;
        const meta = await fetch(url).then((r) => r.json());
        const route = meta.routes?.[0];
        if (route) {
          const km = (route.distance / 1000).toFixed(1);
          const mins = Math.max(1, Math.round(route.duration / 60));
          setRouteSummary(`${km} km · ~${mins} min drive to our door`);
        }

        setStatus('ready');
        setStatusMessage('Route locked in — follow the turquoise line to us.');
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
        const userLngLat: LngLat = [pos.coords.longitude, pos.coords.latitude];
        void showUserLocation(userLngLat);
      },
      () => {
        setStatus('error');
        setStatusMessage(
          'Location blocked. Allow location access, or tap GET DIRECTIONS to navigate from Google Maps.'
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }, [showUserLocation]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/dark',
      center: STORE,
      zoom: 17,
      pitch: 65,
      bearing: -25,
    });

    mapRef.current = map;

    storeMarkerRef.current = new maplibregl.Marker({
      element: createPulseMarker('#14B8A6', 'We are here'),
      anchor: 'bottom',
    })
      .setLngLat(STORE)
      .addTo(map);

    map.on('load', () => {
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
        @keyframes abm-map-pulse {
          0% { transform: scale(1); opacity: 0.55; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <div ref={mapContainerRef} className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-end p-6 sm:p-8">
        <div
          className="pointer-events-auto w-full max-w-sm rounded-[32px] border border-white/10 bg-[#111]/70 p-6 shadow-2xl backdrop-blur-2xl"
          style={{ backdropFilter: 'blur(40px)' }}
        >
          <span className="inline-block rounded-full bg-[#14B8A6]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14B8A6]">
            WALK-IN HQ
          </span>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Alberton Battery Mart
          </h1>

          <p className="mt-2 text-sm text-gray-400">28 St Columb Rd, New Redruth.</p>

          {routeSummary ? (
            <p className="mt-3 text-sm font-semibold text-[#14B8A6]">{routeSummary}</p>
          ) : null}

          {statusMessage ? (
            <p className="mt-2 text-xs text-gray-500">{statusMessage}</p>
          ) : null}

          <button
            type="button"
            onClick={locateAndRoute}
            disabled={status === 'locating' || status === 'routing'}
            className="mt-5 w-full rounded-2xl border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-[#14B8A6] transition-opacity hover:bg-[#14B8A6]/20 disabled:opacity-50"
          >
            {status === 'locating' || status === 'routing'
              ? 'Finding you…'
              : 'Show my route to the shop'}
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
    </div>
  );
}
