'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  DIRECTIONS_URL,
  LANDMARKS,
  MAP_SCOPE_CLASS,
  STORE,
  STORE_ADDRESS,
  createLandmarkLabel,
  createStoreMarker,
  createUserMarker,
  fetchRoute,
  mapControlStyles,
  type LngLat,
  type RouteGeometry,
} from '@/components/map/alberton-store-map-shared';

type MapStatus = 'idle' | 'locating' | 'routing' | 'ready' | 'error';

export type AlbertonStoreMapProps = {
  variant?: 'embed' | 'fullscreen';
  className?: string;
};

function getFitPadding(variant: 'embed' | 'fullscreen') {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (variant === 'embed') {
    return {
      top: isMobile ? 20 : 28,
      bottom: isMobile ? 52 : 56,
      left: isMobile ? 20 : 28,
      right: isMobile ? 20 : 28,
    };
  }

  return {
    top: isMobile ? 56 : 100,
    bottom: isMobile ? 112 : 240,
    left: isMobile ? 32 : 56,
    right: isMobile ? 32 : 56,
  };
}

export function AlbertonStoreMap({ variant = 'embed', className = '' }: AlbertonStoreMapProps) {
  const isEmbed = variant === 'embed';

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const storeMarkerRef = useRef<maplibregl.Marker | null>(null);
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  const landmarkMarkerRefs = useRef<maplibregl.Marker[]>([]);

  const [status, setStatus] = useState<MapStatus>('idle');
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

  const fitToRoute = useCallback(
    (userLngLat: LngLat, route: RouteGeometry) => {
      const map = mapRef.current;
      if (!map) return;

      const bounds = new maplibregl.LngLatBounds();
      bounds.extend(userLngLat);
      bounds.extend(STORE);
      route.coordinates.forEach((coord) => bounds.extend(coord as LngLat));

      map.fitBounds(bounds, {
        padding: getFitPadding(variant),
        pitch: isEmbed ? 45 : 50,
        bearing: -20,
        duration: 1600,
      });
    },
    [isEmbed, variant]
  );

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
          setStatusMessage('Could not calculate a route. Try Directions instead.');
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
          setRouteSummary(`${km} km · ~${mins} min drive`);
        }

        setStatus('ready');
        setStatusMessage('Turquoise line = best route from you to our red shop pin.');
      } catch {
        setStatus('error');
        setStatusMessage('Route lookup failed. Use Directions to open Google Maps.');
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
        setStatusMessage('Location blocked. Allow access or tap Directions.');
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
      zoom: isEmbed ? 16.5 : 18,
      pitch: isEmbed ? 48 : 55,
      bearing: -20,
      cooperativeGestures: isEmbed,
    });

    mapRef.current = map;

    if (isEmbed) {
      map.scrollZoom.disable();
    }

    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: !isEmbed,
      }),
      'top-right'
    );

    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-right');

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

    landmarkMarkerRefs.current = LANDMARKS.map((landmark) =>
      new maplibregl.Marker({
        element: createLandmarkLabel(landmark.name),
        anchor: 'bottom',
      })
        .setLngLat(landmark.coords)
        .addTo(map)
    );

    map.on('load', () => {
      const landmarkBounds = new maplibregl.LngLatBounds();
      landmarkBounds.extend(STORE);
      LANDMARKS.forEach((landmark) => landmarkBounds.extend(landmark.coords));

      map.fitBounds(landmarkBounds, {
        padding: getFitPadding(variant),
        pitch: isEmbed ? 45 : 52,
        bearing: -20,
        maxZoom: isEmbed ? 16.2 : 16.8,
        duration: isEmbed ? 0 : 1800,
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
      landmarkMarkerRefs.current.forEach((marker) => marker.remove());
      landmarkMarkerRefs.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [isEmbed, variant]);

  const rootClassName = [
    MAP_SCOPE_CLASS,
    'relative w-full bg-[#050505]',
    isEmbed ? 'h-full min-h-[350px]' : 'h-screen',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const actionButtons = (
    <div className={isEmbed ? 'grid grid-cols-2 gap-2' : 'mt-4 grid grid-cols-2 gap-2'}>
      <button
        type="button"
        onClick={locateAndRoute}
        disabled={status === 'locating' || status === 'routing'}
        className={
          isEmbed
            ? 'rounded-lg border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#14B8A6] disabled:opacity-50'
            : 'rounded-xl border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#14B8A6] disabled:opacity-50'
        }
      >
        {status === 'locating' || status === 'routing' ? 'Finding…' : 'My route'}
      </button>
      <button
        type="button"
        onClick={() => window.open(DIRECTIONS_URL, '_blank', 'noopener,noreferrer')}
        className={
          isEmbed
            ? 'rounded-lg bg-[#14B8A6] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-black'
            : 'rounded-xl bg-[#14B8A6] px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-black'
        }
      >
        Directions
      </button>
    </div>
  );

  return (
    <div className={rootClassName}>
      <style>{mapControlStyles(variant)}</style>

      <div ref={mapContainerRef} className="absolute inset-0 h-full w-full" />

      {isEmbed ? (
        <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center px-3">
          <p className="rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
            Scroll page normally · two fingers to pan · +/− to zoom
          </p>
        </div>
      ) : null}

      {isEmbed ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3">
          <div className="pointer-events-auto rounded-xl border border-white/10 bg-[#111]/90 p-3 shadow-lg backdrop-blur-md">
            {routeSummary ? (
              <p className="mb-2 text-[11px] font-semibold text-[#14B8A6]">{routeSummary}</p>
            ) : statusMessage && status !== 'idle' ? (
              <p className="mb-2 text-[11px] leading-snug text-gray-400">{statusMessage}</p>
            ) : (
              <p className="mb-2 text-[11px] leading-snug text-gray-400">
                Red pin = our shop · gold labels = local landmarks
              </p>
            )}
            {actionButtons}
          </div>
        </div>
      ) : (
        <>
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
                  The flashing red pin marks our shop. Gold labels show nearby landmarks locals know.
                  Tap below to show your approximate location and the best route to us.
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
                    Gold labels = local landmarks. Turquoise line appears after you tap My route.
                  </p>
                )}

                {actionButtons}
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

                {actionButtons}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
