import { readFileSync } from "node:fs";
import path from "node:path";
import type { ProductCardData } from "@/data/products";

let cachedProducts: ProductCardData[] | null = null;

/** Sync catalog read for static param generation in build scripts/routes. */
export function getAllProductsSync(): ProductCardData[] {
  if (cachedProducts) return cachedProducts;
  const file = path.join(process.cwd(), "data", "products.json");
  cachedProducts = JSON.parse(readFileSync(file, "utf-8")) as ProductCardData[];
  return cachedProducts;
}
