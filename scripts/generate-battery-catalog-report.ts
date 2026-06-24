#!/usr/bin/env tsx
/**
 * Generates BATTERY_CATALOG_COVERAGE_REPORT.txt (+ .csv) comparing expected
 * brand coverage per size against the live product catalog.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  BATTERY_SIZE_CONFIGS,
  type TargetSizeCode,
} from "../src/lib/battery-sizes";
import {
  brandDisplayName,
  normalizeBrand,
  type BatteryBrand,
} from "../src/lib/products/brands";
import {
  getProductsBySizeCodeSync,
  searchProducts,
} from "../src/lib/products/by-size";
import { formatProductPrice, parsePriceAmount } from "../src/lib/formatting";
import type { ProductCardData } from "../src/data/products";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PRODUCTS_FILE = path.join(ROOT, "data", "products.json");

function loadProducts(): ProductCardData[] {
  const raw = readFileSync(PRODUCTS_FILE, "utf-8");
  return JSON.parse(raw) as ProductCardData[];
}

function isPriceFormatted(price: string): boolean {
  return /^R \d{1,3}(?: \d{3})*\.\d{2}$/.test(formatProductPrice(price));
}

function pickPrimaryProductForBrand(
  products: ProductCardData[],
  brand: BatteryBrand
): ProductCardData | undefined {
  const matches = products.filter(
    (product) =>
      normalizeBrand(product.brandName) === brand &&
      product.category === "Standard Automotive"
  );
  if (matches.length) return matches[0];
  return products.find((product) => normalizeBrand(product.brandName) === brand);
}

function yesNo(value: boolean): string {
  return value ? "YES" : "NO";
}

function formatPriceCell(product?: ProductCardData): string {
  if (!product) return "—";
  return parsePriceAmount(product.sellingPrice_OUTPUT).toFixed(2);
}

function formatPriceDisplay(product?: ProductCardData): string {
  if (!product) return "—";
  return formatProductPrice(product.sellingPrice_OUTPUT);
}

function buildSummaryMatrix(
  products: ProductCardData[]
): { lines: string[]; csvRows: string[] } {
  const lines: string[] = [];
  const csvRows: string[] = [
    "Size,Willard,Exide,Eco Plus,Power Plus,Total SKUs,Gaps",
  ];

  lines.push("SUMMARY MATRIX");
  lines.push("═".repeat(72));
  lines.push(
    "Size | Willard | Exide | Eco Plus | Power Plus | Total SKUs | Gaps"
  );
  lines.push("-".repeat(72));

  for (const config of BATTERY_SIZE_CONFIGS) {
    const sizeProducts = getProductsBySizeCodeSync(products, config.code);
    const cells = (["willard", "exide", "eco_plus", "power_plus"] as const).map(
      (brand) => {
        const match = pickPrimaryProductForBrand(sizeProducts, brand);
        if (!config.brands.includes(brand)) {
          return match ? "⚠️ unexpected" : "—";
        }
        return match ? "✅" : "❌";
      }
    );

    const missingBrands = config.brands.filter(
      (brand) => !pickPrimaryProductForBrand(sizeProducts, brand)
    );
    const gaps: string[] = [];
    if (missingBrands.length) {
      gaps.push(
        `${missingBrands.length} missing brand${missingBrands.length === 1 ? "" : "s"}`
      );
    }
    const unformatted = sizeProducts.filter(
      (product) => !isPriceFormatted(product.sellingPrice_OUTPUT)
    );
    if (unformatted.length) {
      gaps.push(`${unformatted.length} price format issue(s)`);
    }

    const gapText = gaps.length ? gaps.join("; ") : "none";
    lines.push(
      `${config.code.padEnd(4)} | ${cells[0].padEnd(7)} | ${cells[1].padEnd(5)} | ${cells[2].padEnd(8)} | ${cells[3].padEnd(10)} | ${String(sizeProducts.length).padEnd(10)} | ${gapText}`
    );
    csvRows.push(
      [
        config.code,
        cells[0],
        cells[1],
        cells[2],
        cells[3],
        sizeProducts.length,
        gapText,
      ].join(",")
    );
  }

  lines.push("");
  return { lines, csvRows };
}

function buildSizeSection(
  products: ProductCardData[],
  code: TargetSizeCode
): { lines: string[]; csvRows: string[] } {
  const config = BATTERY_SIZE_CONFIGS.find((entry) => entry.code === code)!;
  const sizeProducts = getProductsBySizeCodeSync(products, code);
  const searchProductsForSize = searchProducts(products, code);
  const hubProducts = code === "619" ? sizeProducts : [];

  const lines: string[] = [];
  const csvRows: string[] = [
    "Size,Brand,In Catalog,Product ID,Product Name,Price ZAR,On Size Page,On Search,On SEO Hub,Notes",
  ];

  lines.push(`SIZE: ${code}`);
  lines.push("─".repeat(72));
  lines.push(
    "Brand        | In Catalog? | Product ID | Product Name           | Price (ZAR) | On /products/size? | On search?q=? | On SEO hub?"
  );

  const gaps: string[] = [];
  const actions: string[] = [];

  for (const brand of ["willard", "exide", "eco_plus", "power_plus"] as const) {
    const expected = config.brands.includes(brand);
    const product = pickPrimaryProductForBrand(sizeProducts, brand);
    const onSizePage = product
      ? sizeProducts.some((entry) => entry.id === product.id)
      : false;
    const onSearch = product
      ? searchProductsForSize.some((entry) => entry.id === product.id)
      : false;
    const onHub = product
      ? hubProducts.some((entry) => entry.id === product.id)
      : false;

    const inCatalog = Boolean(product);
    const priceOk = product
      ? isPriceFormatted(product.sellingPrice_OUTPUT)
      : true;
    const notes: string[] = [];

    if (expected && !inCatalog) {
      gaps.push(`Missing ${brandDisplayName(brand)} ${code}`);
      actions.push(`Add ${brandDisplayName(brand)} ${code} product`);
    }
    if (inCatalog && !onSizePage) {
      notes.push("not on size page");
      actions.push(`Add ${brandDisplayName(brand)} ${code} to size query`);
    }
    if (inCatalog && !onSearch) {
      notes.push("not on search");
    }
    if (code === "619" && inCatalog && !onHub) {
      notes.push("not on SEO hub");
    }
    if (inCatalog && !priceOk) {
      notes.push("price format issue");
      actions.push(`Fix price format for product ${product?.id}`);
    }

    const displayBrand = brandDisplayName(brand).padEnd(12);
    lines.push(
      `${displayBrand} | ${yesNo(inCatalog).padEnd(11)} | ${String(product?.id ?? "—").padEnd(10)} | ${(product?.name ?? "—").padEnd(22)} | ${formatPriceCell(product).padEnd(11)} | ${yesNo(onSizePage).padEnd(18)} | ${yesNo(onSearch).padEnd(13)} | ${code === "619" ? yesNo(onHub) : "—"}`
    );

    csvRows.push(
      [
        code,
        brandDisplayName(brand),
        inCatalog ? "YES" : "NO",
        product?.id ?? "",
        product?.name ?? "",
        formatPriceCell(product),
        onSizePage ? "YES" : "NO",
        onSearch ? "YES" : "NO",
        code === "619" ? (onHub ? "YES" : "NO") : "",
        notes.join("; "),
      ].join(",")
    );
  }

  lines.push("");
  lines.push(
    `GAP SUMMARY: ${gaps.length ? gaps.join("; ") : "No missing expected brands."}`
  );
  lines.push(
    `ACTION: ${actions.length ? actions.map((action) => `[ ] ${action}`).join("  ") : "[ ] None — catalog complete for expected brands"}`
  );
  lines.push("");
  lines.push(
    `All SKUs for size ${code} (${sizeProducts.length}): ${sizeProducts.map((product) => `${product.brandName} ${product.sku} (${formatPriceDisplay(product)})`).join("; ") || "none"}`
  );
  lines.push("");

  return { lines, csvRows };
}

function main() {
  const products = loadProducts();
  const generatedAt = new Date().toISOString();

  const { lines: summaryLines, csvRows: summaryCsv } =
    buildSummaryMatrix(products);
  const sizeSections: string[] = [];
  const sizeCsvRows: string[] = [];

  for (const config of BATTERY_SIZE_CONFIGS) {
    const { lines, csvRows } = buildSizeSection(products, config.code);
    sizeSections.push(...lines);
    sizeCsvRows.push(...csvRows);
  }

  const report = [
    "BATTERY CATALOG COVERAGE REPORT",
    `Generated: ${generatedAt}`,
    `Source: data/products.json (${products.length} products)`,
    "",
    ...summaryLines,
    ...sizeSections,
  ].join("\n");

  const csv = [summaryCsv[0], ...summaryCsv.slice(1), "", ...sizeCsvRows].join(
    "\n"
  );

  const txtPath = path.join(ROOT, "BATTERY_CATALOG_COVERAGE_REPORT.txt");
  const csvPath = path.join(ROOT, "BATTERY_CATALOG_COVERAGE_REPORT.csv");

  writeFileSync(txtPath, report, "utf-8");
  writeFileSync(csvPath, csv, "utf-8");

  console.log(`Wrote ${txtPath}`);
  console.log(`Wrote ${csvPath}`);
}

main();
