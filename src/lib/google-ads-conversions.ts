/**
 * Google Ads conversion mapping for GTM / gtag wiring.
 *
 * dataLayer events carry `conversion_action_id` so GTM Custom Event triggers
 * can look up the matching Google Ads Conversion tag.
 *
 * Optional conversion labels (env) enable direct gtag `send_to` firing when set.
 */

export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-969671559";

export type GoogleAdsConversionKind = "call" | "directions" | "whatsapp";

export type GoogleAdsConversionAction = {
  kind: GoogleAdsConversionKind;
  /** Custom event name pushed to dataLayer / listened for in GTM */
  eventName: "phone_call_click" | "map_directions_click" | "whatsapp_click";
  /** Google Ads Conversion Action ID (API / Ads UI) */
  actionId: string;
  /** Optional website-tag conversion label for gtag send_to */
  label: string;
  /** AW-xxx/label when label is configured */
  sendTo: string | null;
};

function buildAction(
  kind: GoogleAdsConversionKind,
  eventName: GoogleAdsConversionAction["eventName"],
  actionId: string,
  labelEnv: string | undefined
): GoogleAdsConversionAction {
  const label = (labelEnv || "").trim();
  return {
    kind,
    eventName,
    actionId,
    label,
    sendTo: label ? `${GOOGLE_ADS_ID}/${label}` : null,
  };
}

/** Canonical mapping used by layout click tracking + Button CTA tracking */
export const GOOGLE_ADS_CONVERSION_ACTIONS: Record<
  GoogleAdsConversionKind,
  GoogleAdsConversionAction
> = {
  call: buildAction(
    "call",
    "phone_call_click",
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_ACTION_ID || "6560221892",
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL
  ),
  directions: buildAction(
    "directions",
    "map_directions_click",
    process.env.NEXT_PUBLIC_GOOGLE_ADS_DIRECTIONS_CONVERSION_ACTION_ID ||
      "6560221601",
    process.env.NEXT_PUBLIC_GOOGLE_ADS_DIRECTIONS_CONVERSION_LABEL
  ),
  whatsapp: buildAction(
    "whatsapp",
    "whatsapp_click",
    process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION_ACTION_ID || "",
    process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION_LABEL
  ),
};

/** Events GTM should listen for (Custom Event triggers) */
export const GTM_CONVERSION_EVENT_NAMES = [
  "cta_click",
  "phone_call_click",
  "map_directions_click",
  "whatsapp_click",
] as const;

export function resolveConversionKindFromTrackingId(
  trackingId: string | undefined | null
): GoogleAdsConversionKind | null {
  if (!trackingId) return null;
  const id = trackingId.toLowerCase();
  if (id.endsWith("-call") || id.includes("-call-") || id.endsWith("_call")) {
    return "call";
  }
  if (
    id.endsWith("-whatsapp") ||
    id.includes("-whatsapp-") ||
    id.endsWith("_whatsapp")
  ) {
    return "whatsapp";
  }
  if (
    id.endsWith("-directions") ||
    id.includes("-directions-") ||
    id.endsWith("_directions") ||
    id.endsWith("-maps") ||
    id.endsWith("_maps")
  ) {
    return "directions";
  }
  return null;
}

export function resolveConversionKindFromHref(
  href: string | undefined | null
): GoogleAdsConversionKind | null {
  if (!href) return null;
  if (href.indexOf("tel:") === 0) return "call";
  if (
    href.indexOf("https://wa.me/") === 0 ||
    href.indexOf("https://api.whatsapp.com/") === 0
  ) {
    return "whatsapp";
  }
  if (
    href.indexOf("google.com/maps") !== -1 ||
    href.indexOf("maps.google.com") !== -1
  ) {
    return "directions";
  }
  return null;
}

/** Values safe to interpolate into the root-layout inline tracking script */
export function getInlineConversionActionIds(): {
  call: string;
  directions: string;
  whatsapp: string;
} {
  return {
    call: GOOGLE_ADS_CONVERSION_ACTIONS.call.actionId,
    directions: GOOGLE_ADS_CONVERSION_ACTIONS.directions.actionId,
    whatsapp: GOOGLE_ADS_CONVERSION_ACTIONS.whatsapp.actionId,
  };
}

export function getInlineConversionSendTos(): {
  call: string;
  directions: string;
  whatsapp: string;
} {
  return {
    call: GOOGLE_ADS_CONVERSION_ACTIONS.call.sendTo || "",
    directions: GOOGLE_ADS_CONVERSION_ACTIONS.directions.sendTo || "",
    whatsapp: GOOGLE_ADS_CONVERSION_ACTIONS.whatsapp.sendTo || "",
  };
}
