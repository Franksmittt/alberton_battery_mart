import type { BatteryBrand } from "@/lib/products/brands";

export const TARGET_SIZE_CODES = [
  "619",
  "628",
  "646",
  "652",
  "668",
  "658",
  "657",
  "616",
] as const;

export type TargetSizeCode = (typeof TARGET_SIZE_CODES)[number];

export type BatterySizeConfig = {
  code: TargetSizeCode;
  hubPath?: string;
  brands: BatteryBrand[];
};

import {
  BATTERY_SIZE_CLUSTERS,
  getAllClusterConfigs,
  getClusterConfig,
} from "@/lib/battery-sizes/clusters";

export type {
  BatterySizeClusterConfig,
  BatterySizeSpecs,
  ClusterSuburb,
} from "@/lib/battery-sizes/types";

export { BATTERY_SIZE_CONFIGS } from "@/lib/battery-sizes/legacy-config";

export function getBatterySizeConfig(code: string) {
  const cluster = getClusterConfig(code);
  if (!cluster) return undefined;
  return {
    code: cluster.code,
    hubPath: cluster.hubPath,
    brands: cluster.brands,
  } satisfies BatterySizeConfig;
}

export function hasSeoHub(code: string): boolean {
  return Boolean(getBatterySizeConfig(code)?.hubPath);
}
