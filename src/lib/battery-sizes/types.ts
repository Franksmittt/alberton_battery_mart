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

export const CLUSTER_SUBURB_SLUGS = [
  "brackenhurst",
  "new-redruth",
  "verwoerdpark",
  "brackendowns",
  "meyersdal",
  "alberante",
  "new-market",
  "randhart",
] as const;

export type ClusterPageKind = "hub" | "price" | "specs" | "dimensions";
