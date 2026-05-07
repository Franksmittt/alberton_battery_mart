// src/lib/gtm-constants.ts
// Set NEXT_PUBLIC_GTM_ID in your deployment environment.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

export const hasValidGtmId = GTM_ID !== "GTM-XXXXXXX";