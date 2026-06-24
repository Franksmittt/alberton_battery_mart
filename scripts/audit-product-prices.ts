#!/usr/bin/env tsx
/**
 * Audits product prices and cross-surface consistency for target battery sizes.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { BATTERY_SIZE_CONFIGS } from "../src/lib/battery-sizes";
import {
  getProductsBySizeCodeSync,
  searchProducts,
} from "../src/lib/products/by-size";
import { formatProductPrice, parsePriceAmount } from "../src/lib/formatting";
import type { ProductCardData } from "../src/data/products";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRODUCTS_FILE = path.join(__dirname, "..", "data", "products.json");

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`OK: ${message}`);
  }
}

function loadProducts(): ProductCardData[] {
  return JSON.parse(readFileSync(PRODUCTS_FILE, "utf-8")) as ProductCardData[];
}

function sameProductIds(a: ProductCardData[], b: ProductCardData[]): boolean {
  const idsA = a.map((product) => product.id).sort((x, y) => x - y);
  const idsB = b.map((product) => product.id).sort((x, y) => x - y);
  return JSON.stringify(idsA) === JSON.stringify(idsB);
}

function main() {
  const products = loadProducts();
  let failures = 0;

  for (const product of products) {
    const formatted = formatProductPrice(product.sellingPrice_OUTPUT);
    if (product.sellingPrice_OUTPUT !== formatted) {
      console.error(
        `FAIL: Product ${product.id} (${product.name}) price not formatted: ${product.sellingPrice_OUTPUT} → expected ${formatted}`
      );
      failures += 1;
    }
  }
  assert(
    failures === 0,
    `All ${products.length} catalog prices use formatZAR (${failures} issues)`
  );

  for (const config of BATTERY_SIZE_CONFIGS) {
    const sizeProducts = getProductsBySizeCodeSync(products, config.code);
    const searchResults = searchProducts(products, config.code);

    assert(
      sameProductIds(sizeProducts, searchResults),
      `Size ${config.code}: /products/size and search?q=${config.code} return the same ${sizeProducts.length} product(s)`
    );

    for (const product of sizeProducts) {
      const formatted = formatProductPrice(product.sellingPrice_OUTPUT);
      assert(
        !/^\d+(\.\d+)?$/.test(product.sellingPrice_OUTPUT.trim()),
        `Size ${config.code} product ${product.id} has no raw numeric price (${formatted})`
      );
    }
  }

  const willard619 = products.find((product) => product.id === 101);
  assert(Boolean(willard619), "Willard 619 (id 101) exists");
  if (willard619) {
    assert(
      parsePriceAmount(willard619.sellingPrice_OUTPUT) === 1450,
      `Willard 619 catalog price is R 1 450.00 (${willard619.sellingPrice_OUTPUT})`
    );
  }

  if (process.exitCode && process.exitCode !== 0) {
    console.error("\nProduct price audit failed.");
    process.exit(process.exitCode);
  }

  console.log("\nAll product price audits passed.");
}

main();
