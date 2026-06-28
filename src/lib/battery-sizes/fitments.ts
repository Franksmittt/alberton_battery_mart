import sizeFitmentsData from "@/data/size-fitments.json";
import type { ProductCardData } from "@/data/products";
import { extractBaseSizeCode } from "@/lib/products/size-matching";

type FitmentVehicle = {
  manufacturer: string;
  model: string;
  label: string;
  yearRange: string;
};

type SizeFitmentEntry = {
  vehicles: FitmentVehicle[];
  labels: string[];
  note?: string;
};

type SizeFitmentsFile = {
  fitments: Record<string, SizeFitmentEntry>;
};

const data = sizeFitmentsData as SizeFitmentsFile;

function productFitmentKey(product: ProductCardData): string {
  const base = extractBaseSizeCode(product.sku);
  if (!base) return product.sku;

  const skuUpper = product.sku.toUpperCase();
  if (product.isAGM || skuUpper.includes("AGM")) return `${base}-AGM`;
  if (skuUpper.includes("EFB")) return `${base}-AGM`;
  return base;
}

export function getFitmentEntry(key: string): SizeFitmentEntry | undefined {
  return data.fitments[key];
}

export function getVehicleFitmentsForSize(sizeCode: string): string[] {
  const entry = getFitmentEntry(sizeCode);
  if (entry?.labels?.length) return entry.labels;
  return [];
}

export function getVehicleFitmentDetails(sizeCode: string): FitmentVehicle[] {
  const entry = getFitmentEntry(sizeCode);
  return entry?.vehicles ?? [];
}

export function getProductFitmentLabels(product: ProductCardData, limit = 4): string {
  const key = productFitmentKey(product);
  const base = extractBaseSizeCode(product.sku) || "";
  const entry =
    getFitmentEntry(key) ??
    (key.endsWith("-AGM") ? getFitmentEntry(base) : undefined);
  if (entry?.labels?.length) {
    return entry.labels.slice(0, limit).join(", ");
  }
  return product.popularFits;
}

export function formatFitmentList(labels: string[], max = 8): string[] {
  return labels.slice(0, max);
}
