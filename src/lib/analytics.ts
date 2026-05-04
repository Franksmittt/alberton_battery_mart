"use client";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function pushDataLayerEvent(
  eventName: string,
  payload: Record<string, any> = {}
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...payload,
  });
}

