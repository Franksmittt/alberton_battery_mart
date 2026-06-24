import { BATTERY_SIZE_CLUSTERS, getClusterConfig } from "@/lib/battery-sizes/clusters";
import type { ClusterPageKind } from "@/lib/battery-sizes/types";
import {
  brandPageSlug,
  getClusterSuburbs,
} from "@/lib/battery-sizes/content";
import { getProductsBySizeCodeSync } from "@/lib/products/by-size";
import { getAllProductsSync } from "@/lib/battery-sizes/products-sync";
import {
  getPrimaryProductForBrand,
  parseBrandPageSlug,
} from "@/lib/battery-sizes/content";
import type { BatteryBrand } from "@/lib/products/brands";

export function hubSlug(code: string): string {
  return `${code}-car-battery`;
}

export function priceSlug(code: string): string {
  return `${code}-car-battery-price`;
}

export function specsSlug(code: string): string {
  return `${code}-battery-specs`;
}

export function dimensionsSlug(code: string): string {
  return `${code}-battery-dimensions`;
}

export function parseClusterSlug(slug: string): {
  kind: ClusterPageKind;
  code: string;
} | null {
  const hubMatch = slug.match(/^(\d{3})-car-battery$/);
  if (hubMatch) return { kind: "hub", code: hubMatch[1] };

  const priceMatch = slug.match(/^(\d{3})-car-battery-price$/);
  if (priceMatch) return { kind: "price", code: priceMatch[1] };

  const specsMatch = slug.match(/^(\d{3})-battery-specs$/);
  if (specsMatch) return { kind: "specs", code: specsMatch[1] };

  const dimensionsMatch = slug.match(/^(\d{3})-battery-dimensions$/);
  if (dimensionsMatch) return { kind: "dimensions", code: dimensionsMatch[1] };

  return null;
}

export function isHubSlug(slug: string): boolean {
  return /^(\d{3})-car-battery$/.test(slug);
}

export function getTopLevelClusterStaticParams() {
  const params: Array<{ slug: string }> = [];
  for (const cluster of BATTERY_SIZE_CLUSTERS) {
    params.push({ slug: hubSlug(cluster.code) });
    params.push({ slug: priceSlug(cluster.code) });
    params.push({ slug: specsSlug(cluster.code) });
    params.push({ slug: dimensionsSlug(cluster.code) });
  }
  return params;
}

export function getHubSegmentStaticParams() {
  const params: Array<{ slug: string; segment: string }> = [];
  for (const cluster of BATTERY_SIZE_CLUSTERS) {
    const hub = hubSlug(cluster.code);
    for (const suburb of getClusterSuburbs(cluster)) {
      params.push({ slug: hub, segment: suburb.slug });
    }
    const products = getProductsBySizeCodeSync(
      getAllProductsSync(),
      cluster.code
    );
    for (const brand of cluster.brands) {
      const product = getPrimaryProductForBrand(products, brand);
      if (product) {
        params.push({ slug: hub, segment: brandPageSlug(brand, cluster.code) });
      }
    }
  }
  return params;
}

export function resolveHubSegment(
  hubSlugValue: string,
  segment: string
): { type: "suburb"; code: string; suburbSlug: string } | { type: "brand"; code: string; brand: BatteryBrand } | null {
  const parsed = parseClusterSlug(hubSlugValue);
  if (!parsed || parsed.kind !== "hub") return null;
  const cluster = getClusterConfig(parsed.code);
  if (!cluster) return null;

  const suburb = getClusterSuburbs(cluster).find((item) => item.slug === segment);
  if (suburb) {
    return { type: "suburb", code: cluster.code, suburbSlug: suburb.slug };
  }

  const brand = parseBrandPageSlug(segment, cluster.code);
  if (brand && cluster.brands.includes(brand)) {
    const products = getProductsBySizeCodeSync(
      getAllProductsSync(),
      cluster.code
    );
    if (getPrimaryProductForBrand(products, brand)) {
      return { type: "brand", code: cluster.code, brand };
    }
  }

  return null;
}
