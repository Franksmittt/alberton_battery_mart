import type { ReactNode } from "react";
import { HubSection } from "@/components/seo/HubSection";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { StoreVisitCtas } from "@/components/store/StoreVisitCtas";
import { OpenNowBadge } from "@/components/store/OpenNowBadge";
import {
  STORE_ADDRESS_LINE,
  STORE_HOURS_DISPLAY,
  STORE_PHONE_HOURS_DISPLAY,
} from "@/lib/seo-constants";

type AuthorityPageShellProps = {
  kicker?: string;
  title: string;
  intro: string;
  children: ReactNode;
  trackingPrefix: string;
  relatedTitle?: string;
};

export function AuthorityPageShell({
  kicker = "Alberton Battery Mart · 28 St Columb Rd",
  title,
  intro,
  children,
  trackingPrefix,
  relatedTitle,
}: AuthorityPageShellProps) {
  return (
    <main className="bg-background">
      <HubSection className="bg-[var(--brand-bg)] text-white">
        <div className="container max-w-5xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
            {kicker}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--brand-muted)]">
            {intro}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <OpenNowBadge />
            <p className="text-sm text-[var(--brand-muted-2)]">{STORE_HOURS_DISPLAY}</p>
          </div>
          <p className="mt-2 text-sm text-[var(--brand-muted-3)]">
            {STORE_PHONE_HOURS_DISPLAY} · {STORE_ADDRESS_LINE}
          </p>
          <StoreVisitCtas trackingPrefix={trackingPrefix} className="mt-8" />
        </div>
      </HubSection>
      <HubSection className="container max-w-5xl space-y-10 px-4 py-14 sm:px-6">
        {children}
      </HubSection>
      <RelatedContent title={relatedTitle} />
    </main>
  );
}
