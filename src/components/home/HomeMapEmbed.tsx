"use client";

import { useEffect, useRef, useState } from "react";
import { AlbertonStoreMap } from "@/components/map/AlbertonStoreMap";

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
        <AlbertonStoreMap
          variant="embed"
          className="min-h-[500px] max-[950px]:min-h-[350px]"
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
