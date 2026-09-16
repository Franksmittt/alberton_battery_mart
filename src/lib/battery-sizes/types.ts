import type { BatteryBrand } from "@/lib/products/brands";
import type { TargetSizeCode } from "@/lib/battery-sizes/index";

export type BatterySizeSpecs = {
  voltage: string;
  ahRange: string;
  ccaRange: string;
  dimensions: string;
  weight: string;
  terminalLayout: string;
  technology: string;
  warrantyWillard?: string;
  warrantyExide?: string;
  warrantyValue?: string;
};

export type BatterySizeClusterConfig = {
  code: TargetSizeCode;
  hubPath: string;
  displayName: string;
  headTerm: string;
  brands: BatteryBrand[];
  specs: BatterySizeSpecs;
  vehicleFitments: string[];
  /** Value-tier sizes position as budget options */
  valueTierOnly?: boolean;
  hubIntro?: string;
  shelfPriceRanges?: {
    midas: string;
    goldwagen: string;
    online: string;
  };
};

export type ClusterSuburb = {
  slug: string;
  name: string;
  responseWindow: string;
  summary: string;
  roads: string[];
  landmarks: string[];
  vehicles: string[];
};

/** Popular SA battery sizes we need to own in Alberton search. */
export const POPULAR_SIZE_CODES = [
  "616",
  "619",
  "628",
  "646",
  "652",
  "658",
  "668",
] as const;

/** Sizes that commonly have AGM / EFB / start-stop variants. */
export const START_STOP_SIZE_CODES = ["646", "652", "658", "668"] as const;

/**
 * Residential Alberton suburbs for size × suburb cluster pages.
 * Informal settlements (Thokoza, etc.) are intentionally omitted.
 */
export const CLUSTER_SUBURB_SLUGS = [
  "alberton-north",
  "meyersdal",
  "brackenhurst",
  "brackendowns",
  "randhart",
  "alberante",
  "albertsdal",
  "new-redruth",
  "verwoerdpark",
  "florentia",
  "raceview",
  "south-crest",
  "elandshaven",
  "newmarket-park",
  "alberton-central",
  "new-market",
] as const;

export type ClusterSuburbSlug = (typeof CLUSTER_SUBURB_SLUGS)[number];

const CLUSTER_SUBURB_SLUG_SET = new Set<string>(CLUSTER_SUBURB_SLUGS);

export function isClusterSuburbSlug(slug: string): slug is ClusterSuburbSlug {
  return CLUSTER_SUBURB_SLUG_SET.has(slug);
}

export function sizeHubPath(code: string): string {
  return `/${code}-car-battery`;
}

export function sizeSuburbPath(code: string, suburbSlug: string): string {
  return isClusterSuburbSlug(suburbSlug)
    ? `${sizeHubPath(code)}/${suburbSlug}`
    : sizeHubPath(code);
}

export type ClusterPageKind = "hub" | "price" | "specs" | "dimensions";
