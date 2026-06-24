#!/usr/bin/env tsx
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllClusterConfigs } from "../src/lib/battery-sizes/clusters";
import { getClusterSuburbs } from "../src/lib/battery-sizes/content";
import { getAllProductsSync } from "../src/lib/battery-sizes/products-sync";
import {
  getProductsBySizeCodeSync,
  searchProducts,
} from "../src/lib/products/by-size";
import { getFittedPriceLabel } from "../src/lib/products/by-size";
import { parsePriceAmount } from "../src/lib/formatting";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function main() {
  const products = getAllProductsSync();
  const clusters = getAllClusterConfigs();
  const lines: string[] = [
    "SIZE CLUSTER QA REPORT",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Per-size summary",
    "─".repeat(72),
  ];

  let totalRoutes = 0;

  for (const cluster of clusters) {
    const sizeProducts = getProductsBySizeCodeSync(products, cluster.code);
    const searchResults = searchProducts(products, cluster.code);
    const searchIds = searchResults.map((p) => p.id).sort().join(",");
    const sizeIds = sizeProducts.map((p) => p.id).sort().join(",");
    const match = searchIds === sizeIds;
    const lowest = getFittedPriceLabel(sizeProducts);
    const brandCount = new Set(sizeProducts.map((p) => p.brandName)).size;
    const suburbCount = getClusterSuburbs(cluster).length;
    const brandPages = cluster.brands.filter((brand) =>
      sizeProducts.some((p) => p.brandName.toLowerCase().includes(brand.replace("_", " ")))
    ).length;
    const routes =
      1 + // hub
      1 + // price
      1 + // specs
      1 + // dimensions
      suburbCount +
      brandPages;

    totalRoutes += routes;

    lines.push(
      `SIZE ${cluster.code}: products=${sizeProducts.length} brands=${brandCount} lowest=${lowest} searchMatch=${match ? "YES" : "NO"} routes≈${routes}`
    );
    lines.push(`  Hub: ${cluster.hubPath}`);
    lines.push(`  Products: ${sizeProducts.map((p) => `${p.name} (${p.sellingPrice_OUTPUT})`).join("; ") || "none"}`);
    if (!match) {
      lines.push("  FAIL: search results differ from size page products");
    }
    for (const product of sizeProducts) {
      if (/^\d+(\.\d+)?$/.test(String(product.sellingPrice_OUTPUT).trim())) {
        lines.push(`  FAIL: raw price on product ${product.id}`);
      }
    }
    lines.push("");
  }

  lines.push(`Estimated cluster routes: ${totalRoutes}`);
  lines.push("");
  lines.push("Indexing URLs (hubs):");
  for (const cluster of clusters) {
    lines.push(`  https://www.albertonbatterymart.co.za${cluster.hubPath}`);
  }

  const out = lines.join("\n");
  writeFileSync(path.join(ROOT, "SIZE_CLUSTER_QA_REPORT.txt"), out, "utf-8");
  console.log(out);
}

main();
