'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const CENTER: [number, number] = [28.1175, -26.265];
const DIRECTIONS_URL =
  'https://maps.google.com/?daddr=28+St+Columb+Rd,+New+Redruth,+Alberton';

export default function TestMapHiddenPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/dark',
      center: CENTER,
      zoom: 16.5,
      pitch: 65,
      bearing: -25,
    });

    mapRef.current = map;

    const markerEl = document.createElement('div');
    markerEl.style.width = '18px';
    markerEl.style.height = '18px';
    markerEl.style.borderRadius = '50%';
    markerEl.style.backgroundColor = '#14B8A6';
    markerEl.style.border = '2px solid #0a0a0a';
    markerEl.style.boxShadow = '0 0 16px rgba(20, 184, 166, 0.75), 0 0 4px rgba(20, 184, 166, 0.4)';

    new maplibregl.Marker({ element: markerEl }).setLngLat(CENTER).addTo(map);

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
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-screen w-full bg-[#050505]">
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

          <button
            type="button"
            onClick={() => window.open(DIRECTIONS_URL, '_blank', 'noopener,noreferrer')}
            className="mt-6 w-full rounded-2xl bg-[#14B8A6] px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
          >
            GET DIRECTIONS
          </button>
        </div>
      </div>
    </div>
  );
}
