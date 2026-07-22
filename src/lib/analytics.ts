"use client";

import {
  GOOGLE_ADS_CONVERSION_ACTIONS,
  GOOGLE_ADS_ID,
  resolveConversionKindFromHref,
  resolveConversionKindFromTrackingId,
  type GoogleAdsConversionKind,
} from "@/lib/google-ads-conversions";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    gtag?: (...args: unknown[]) => void;
    __abmEnv?: string;
  }
}

export function pushDataLayerEvent(
  eventName: string,
  payload: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    ...payload,
  });
}

function fireGtagConversion(
  sendTo: string,
  extras: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  const params = { send_to: sendTo, ...extras };

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", params);
    return;
  }

  // gtag.js may still be lazy-loading — queue in dataLayer Arguments form
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", "conversion", params]);
}

/**
 * Push a semantic conversion click event for GTM, and optionally fire gtag
 * when a website conversion label is configured.
 */
export function trackMappedConversionClick(options: {
  kind: GoogleAdsConversionKind;
  href?: string;
  trackingId?: string;
}) {
  if (typeof window === "undefined") return;

  const action = GOOGLE_ADS_CONVERSION_ACTIONS[options.kind];
  const payload: Record<string, unknown> = {
    href: options.href || "",
    tracking_id: options.trackingId || "",
    google_ads_id: GOOGLE_ADS_ID,
    page_path: window.location.pathname,
  };

  if (action.actionId) {
    payload.conversion_action_id = action.actionId;
  }

  pushDataLayerEvent(action.eventName, payload);

  if (action.sendTo) {
    fireGtagConversion(action.sendTo, {
      conversion_action_id: action.actionId || undefined,
    });
  }
}

/**
 * Button / AdLandingHero path: always emit `cta_click`, and when the tracking
 * id maps to call / directions / WhatsApp also emit the semantic conversion event.
 */
export function trackCtaButtonClick(trackingId: string, href?: string) {
  if (typeof window === "undefined") return;

  const kindFromId = resolveConversionKindFromTrackingId(trackingId);
  const kindFromHref = resolveConversionKindFromHref(href);
  const kind = kindFromId || kindFromHref;

  const ctaPayload: Record<string, unknown> = {
    tracking_id: trackingId,
    href: href || "",
  };

  if (kind) {
    const action = GOOGLE_ADS_CONVERSION_ACTIONS[kind];
    if (action.actionId) {
      ctaPayload.conversion_action_id = action.actionId;
    }
  }

  pushDataLayerEvent("cta_click", ctaPayload);

  if (kind) {
    trackMappedConversionClick({
      kind,
      href,
      trackingId,
    });
  }

  if (window.__abmEnv === "development") {
    console.info("[button-click]", trackingId, kind || "unmapped");
  }
}
