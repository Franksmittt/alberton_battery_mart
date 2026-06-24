#!/usr/bin/env node
/**
 * Asserts Willard 619 (id 101) and Exide 619CE (id 118) prices are
 * consistently formatted across the product catalog JSON — the single
 * source of truth used by 619 SEO pages, search results, and /products/id/[id].
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRODUCTS_FILE = path.join(__dirname, "..", "data", "products.json");

const WILLARD_619_PRODUCT_ID = 101;
const EXIDE_619CE_PRODUCT_ID = 118;
const EXPECTED_AMOUNT = 1450;

function parsePriceAmount(price) {
  if (typeof price === "number") {
    return Number.isFinite(price) ? price : 0;
  }
  const cleaned = String(price).replace(/[^\d.]/g, "");
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

function formatZAR(amount) {
  const value = parsePriceAmount(amount);
  const [integerPart, decimalPart = "00"] = value.toFixed(2).split(".");
  const groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `R ${groupedInteger}.${decimalPart}`;
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`OK: ${message}`);
}

const raw = readFileSync(PRODUCTS_FILE, "utf-8");
const products = JSON.parse(raw);

const willard = products.find((p) => p.id === WILLARD_619_PRODUCT_ID);
const exide = products.find((p) => p.id === EXIDE_619CE_PRODUCT_ID);

assert(willard, `Product id ${WILLARD_619_PRODUCT_ID} (Willard 619) exists in products.json`);
assert(exide, `Product id ${EXIDE_619CE_PRODUCT_ID} (Exide 619CE) exists in products.json`);

const willardFormatted = formatZAR(willard.sellingPrice_OUTPUT);
const exideFormatted = formatZAR(exide.sellingPrice_OUTPUT);

assert(
  willard.sellingPrice_OUTPUT === willardFormatted,
  `Willard 619 price is formatted (${willard.sellingPrice_OUTPUT} === ${willardFormatted})`
);
assert(
  exide.sellingPrice_OUTPUT === exideFormatted,
  `Exide 619CE price is formatted (${exide.sellingPrice_OUTPUT} === ${exideFormatted})`
);
assert(
  parsePriceAmount(willard.sellingPrice_OUTPUT) === EXPECTED_AMOUNT,
  `Willard 619 catalog amount is R ${EXPECTED_AMOUNT.toFixed(2)}`
);
assert(
  parsePriceAmount(exide.sellingPrice_OUTPUT) === EXPECTED_AMOUNT,
  `Exide 619CE catalog amount is R ${EXPECTED_AMOUNT.toFixed(2)}`
);
assert(
  willardFormatted === exideFormatted,
  `Hub fitted-from price matches product detail price (${willardFormatted})`
);

console.log("\nAll 619 pricing assertions passed.");
