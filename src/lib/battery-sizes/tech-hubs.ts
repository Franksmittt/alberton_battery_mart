import type { ProductCardData } from "@/data/products";
import {
  POPULAR_SIZE_CODES,
  START_STOP_SIZE_CODES,
} from "@/lib/battery-sizes/types";

export type BatteryTechKind = "agm" | "efb" | "start-stop";

export type BatteryTechHubConfig = {
  kind: BatteryTechKind;
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  trackingPrefix: string;
};

export const TECH_HUBS: BatteryTechHubConfig[] = [
  {
    kind: "agm",
    path: "/agm-battery",
    title: "AGM Battery Alberton | Start-Stop Fitment & BMS Coding",
    description:
      "AGM batteries in Alberton for BMW, Mercedes and start-stop cars. Stock, BMS coding, and same-day fitment at 28 St Columb Rd, New Redruth.",
    h1: "AGM Batteries in Alberton",
    intro:
      "Absorbent Glass Mat batteries are the correct replacement for most BMW, Mercedes-Benz, Audi, and other start-stop vehicles. We keep 646, 652, 658, and 668 AGM sizes in stock and register the battery with the vehicle’s BMS so start-stop keeps working.",
    keywords: [
      "AGM battery Alberton",
      "AGM battery",
      "start stop AGM battery",
      "BMW AGM battery Alberton",
      "Mercedes AGM battery",
      "AGM battery price Alberton",
    ],
    trackingPrefix: "agm-hub",
  },
  {
    kind: "efb",
    path: "/efb-battery",
    title: "EFB Battery Alberton | Start-Stop Fitment",
    description:
      "EFB batteries in Alberton for Polo, Ranger, Tucson and other start-stop cars. Same-day fitment and testing at 28 St Columb Rd, New Redruth.",
    h1: "EFB Batteries in Alberton",
    intro:
      "Enhanced Flooded Batteries sit between standard SMF and AGM. They are the factory spec on many VW, Ford, Hyundai, and Suzuki start-stop models. Fitting a cheaper flooded battery usually kills start-stop and shortens battery life.",
    keywords: [
      "EFB battery Alberton",
      "EFB battery",
      "start stop EFB battery",
      "VW Polo EFB battery",
      "Ford Ranger EFB battery",
    ],
    trackingPrefix: "efb-hub",
  },
  {
    kind: "start-stop",
    path: "/start-stop-battery",
    title: "Start-Stop Battery Alberton | AGM & EFB",
    description:
      "Start-stop battery replacement in Alberton. AGM and EFB in stock with BMS coding for BMW, Mercedes, VW, and SUVs. Drive in to New Redruth.",
    h1: "Start-Stop Batteries in Alberton",
    intro:
      "If your car has auto start-stop, idle-stop, or a battery warning after a cheap replacement, you almost certainly need AGM or EFB, not a standard flooded battery. We confirm the spec, fit the correct size (often 646, 652, 658, or 668), and code BMW/Mercedes systems when required.",
    keywords: [
      "start stop battery Alberton",
      "stop start battery",
      "start-stop battery",
      "AGM start stop battery",
      "EFB start stop battery",
    ],
    trackingPrefix: "start-stop-hub",
  },
];

export function getTechHub(kind: BatteryTechKind): BatteryTechHubConfig {
  const hub = TECH_HUBS.find((item) => item.kind === kind);
  if (!hub) throw new Error(`Unknown tech hub: ${kind}`);
  return hub;
}

export function getAllTechHubs(): BatteryTechHubConfig[] {
  return TECH_HUBS;
}

export function isCarStartStopProduct(product: ProductCardData): boolean {
  return product.category === "Performance AGM/EFB";
}

export function isCarAgmProduct(product: ProductCardData): boolean {
  return isCarStartStopProduct(product) && product.isAGM;
}

export function isCarEfbProduct(product: ProductCardData): boolean {
  return (
    isCarStartStopProduct(product) &&
    !product.isAGM &&
    /efb/i.test(`${product.sku} ${product.name}`)
  );
}

export function productsForTechHub(
  products: ProductCardData[],
  kind: BatteryTechKind
): ProductCardData[] {
  if (kind === "agm") return products.filter(isCarAgmProduct);
  if (kind === "efb") return products.filter(isCarEfbProduct);
  return products.filter(isCarStartStopProduct);
}

export const PRIORITY_RESIDENTIAL_LINKS = [
  { href: "/local/alberton-north", label: "Alberton North" },
  { href: "/local/meyersdal", label: "Meyersdal" },
  { href: "/local/brackenhurst", label: "Brackenhurst" },
  { href: "/local/brackendowns", label: "Brackendowns" },
  { href: "/local/randhart", label: "Randhart" },
  { href: "/local/alberante", label: "Alberante" },
  { href: "/local/albertsdal", label: "Albertsdal" },
  { href: "/local/new-redruth", label: "New Redruth" },
] as const;

export const TECH_HUB_NAV_LINKS = [
  { href: "/agm-battery", label: "AGM batteries" },
  { href: "/efb-battery", label: "EFB batteries" },
  { href: "/start-stop-battery", label: "Start-stop batteries" },
  { href: "/vehicles/bmw", label: "BMW batteries" },
  { href: "/vehicles/mercedes", label: "Mercedes batteries" },
] as const;

export function localPathFromClusterSlug(slug: string): string {
  if (slug === "new-market") return "/local/newmarket-park";
  return `/local/${slug}`;
}

export { POPULAR_SIZE_CODES, START_STOP_SIZE_CODES };
