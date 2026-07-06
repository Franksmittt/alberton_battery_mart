"use client";

import { useEffect, useRef, useState } from "react";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.683815614464!2d28.12046317541756!3d-26.27192337703497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e951bf317cfb98d%3A0x33408b268a9458a6!2sAlberton%20Battery%20Mart!5e0!3m2!1sen!2sza!4v1778246480882!5m2!1sen!2sza";

export function HomeMapEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-[500px] max-[950px]:min-h-[350px] bg-[var(--brand-bg-elevated)]"
    >
      {shouldLoad ? (
        <iframe
          src={MAP_EMBED_SRC}
          className="h-full w-full min-h-[500px] max-[950px]:min-h-[350px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Alberton Battery Mart map"
        />
      ) : (
        <div
          className="flex h-full min-h-[500px] max-[950px]:min-h-[350px] items-center justify-center text-sm text-[var(--brand-muted)]"
          aria-hidden="true"
        >
          Loading map…
        </div>
      )}
    </div>
  );
}
