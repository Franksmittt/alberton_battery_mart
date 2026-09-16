"use client";

import { useEffect, useState } from "react";
import { getStoreOpenStatus, type StoreOpenStatus } from "@/lib/store-hours";

type OpenNowBadgeProps = {
  className?: string;
  showDetail?: boolean;
};

export function OpenNowBadge({ className = "", showDetail = true }: OpenNowBadgeProps) {
  const [status, setStatus] = useState<StoreOpenStatus>(() => getStoreOpenStatus());

  useEffect(() => {
    const update = () => setStatus(getStoreOpenStatus());
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
        status.isOpen
          ? "bg-[var(--brand-success)] text-white"
          : "bg-white/10 text-white/80"
      } ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? "bg-white" : "bg-white/50"}`}
        aria-hidden="true"
      />
      {status.label}
      {showDetail ? (
        <span className="hidden font-semibold normal-case tracking-normal sm:inline">
          · {status.detail}
        </span>
      ) : null}
    </span>
  );
}
