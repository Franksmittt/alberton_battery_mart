import { Navigation, Phone, MessageSquare } from "lucide-react";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_DIRECTIONS_URL,
  WHATSAPP_URL,
} from "@/lib/seo-constants";

type StoreVisitCtasProps = {
  trackingPrefix?: string;
  className?: string;
  variant?: "dark" | "light";
};

export function StoreVisitCtas({
  trackingPrefix = "store-visit",
  className = "",
  variant = "dark",
}: StoreVisitCtasProps) {
  const secondary =
    variant === "dark"
      ? "border-2 border-[var(--brand-border)] text-white hover:border-[var(--brand-muted)] hover:bg-white/5"
      : "border-2 border-zinc-300 text-zinc-900 hover:border-zinc-500 hover:bg-zinc-50";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={STORE_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-track-event={`${trackingPrefix}-directions`}
        className="inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-[0.8rem] font-bold uppercase tracking-[0.5px] bg-[var(--brand-accent-solid)] text-white transition-all hover:bg-[var(--brand-accent-hover)] hover:-translate-y-0.5 sm:px-7 sm:py-3.5 sm:text-[0.85rem]"
      >
        <Navigation className="h-4 w-4" aria-hidden="true" />
        Get Directions
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        data-track-event={`${trackingPrefix}-call`}
        className={`inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-[0.8rem] font-bold uppercase tracking-[0.5px] transition-all hover:-translate-y-0.5 sm:px-7 sm:py-3.5 sm:text-[0.85rem] ${secondary}`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call {PHONE_DISPLAY}
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-track-event={`${trackingPrefix}-whatsapp`}
        className="inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-[0.8rem] font-bold uppercase tracking-[0.5px] bg-[var(--brand-success)] text-white transition-all hover:bg-[var(--brand-success-hover)] hover:-translate-y-0.5 sm:px-7 sm:py-3.5 sm:text-[0.85rem]"
      >
        <MessageSquare className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
