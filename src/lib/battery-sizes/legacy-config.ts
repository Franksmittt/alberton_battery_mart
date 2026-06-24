import type { BatterySizeConfig } from "@/lib/battery-sizes/index";
import { BATTERY_SIZE_CLUSTERS } from "@/lib/battery-sizes/clusters";

/** Back-compat export for catalog report script. */
export const BATTERY_SIZE_CONFIGS: BatterySizeConfig[] = BATTERY_SIZE_CLUSTERS.map(
  (cluster) => ({
    code: cluster.code,
    hubPath: cluster.hubPath,
    brands: cluster.brands,
  })
);
