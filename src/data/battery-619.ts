/**
 * @deprecated Use @/lib/battery-sizes/clusters and @/lib/battery-sizes/content instead.
 * Kept for backwards compatibility during migration.
 */
export type { ClusterSuburb as Battery619Suburb } from "@/lib/battery-sizes/types";
export { CLUSTER_SUBURB_SLUGS as BATTERY_619_SUBURB_SLUGS } from "@/lib/battery-sizes/types";
export { getClusterConfig } from "@/lib/battery-sizes/clusters";

import { getClusterConfig } from "@/lib/battery-sizes/clusters";
import {
  getClusterSuburb,
  getClusterSuburbs,
  getHubFaq,
  getPriceRows,
  getSuburbFaqs,
} from "@/lib/battery-sizes/content";

const CLUSTER_619 = getClusterConfig("619")!;

export const BATTERY_619_SPECS = CLUSTER_619.specs;
export const BATTERY_619_VEHICLES = CLUSTER_619.vehicleFitments;

export function getBattery619HubFaq(fittedFromPrice: string) {
  return getHubFaq(CLUSTER_619, fittedFromPrice, "Willard 619 and Exide 619CE");
}

export function getBattery619PriceRows(willardPrice: string, exidePrice: string) {
  return getPriceRows(
    CLUSTER_619,
    [
      { sellingPrice_OUTPUT: willardPrice } as never,
      { sellingPrice_OUTPUT: exidePrice } as never,
    ],
    willardPrice
  );
}

export function getAllBattery619Suburbs() {
  return getClusterSuburbs(CLUSTER_619);
}

export function getBattery619Suburb(slug: string) {
  return getClusterSuburb(CLUSTER_619, slug);
}

export function getBattery619SuburbFaqs(
  suburb: ReturnType<typeof getClusterSuburb>,
  fittedFromPrice: string
) {
  if (!suburb) return [];
  return getSuburbFaqs(
    CLUSTER_619,
    suburb,
    fittedFromPrice,
    "Willard 619 and Exide 619CE"
  );
}
