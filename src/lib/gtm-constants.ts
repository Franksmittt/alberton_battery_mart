// src/lib/gtm-constants.ts
// Set NEXT_PUBLIC_GTM_ID in your deployment environment.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

export const hasValidGtmId = GTM_ID !== "GTM-XXXXXXX";

export {
  GOOGLE_ADS_ID,
  GOOGLE_ADS_CONVERSION_ACTIONS,
  GTM_CONVERSION_EVENT_NAMES,
} from "@/lib/google-ads-conversions";
