#!/usr/bin/env node
/**
 * Generate car-batteries-catalog.txt — Eco Plus, Power Plus, Exide, Willard.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const products = JSON.parse(
  readFileSync(join(ROOT, "data/products.json"), "utf8")
);
const sizeFitments = JSON.parse(
  readFileSync(join(ROOT, "src/data/size-fitments.json"), "utf8")
);

const BRANDS = [
  { key: "Eco Plus", title: "ECO PLUS" },
  { key: "Power Plus", title: "POWER PLUS" },
  { key: "Exide", title: "EXIDE" },
  { key: "Willard", title: "WILLARD" },
];
const CAR_CATS = new Set(["Standard Automotive", "Performance AGM/EFB"]);

function extractBaseSizeCode(sku) {
  const cleaned = String(sku).trim().toUpperCase().replace(/\s+/g, "");
  const slashMatch = cleaned.match(/^(\d{3})\/(\d+)/);
  if (slashMatch) return slashMatch[1];
  const digitMatch = cleaned.match(/^(\d{3})/);
  return digitMatch ? digitMatch[1] : null;
}

function productFitmentKey(product) {
  const base = extractBaseSizeCode(product.sku);
  if (!base) return product.sku;
  const skuUpper = String(product.sku).toUpperCase();
  if (product.isAGM || skuUpper.includes("AGM")) return `${base}-AGM`;
  if (skuUpper.includes("EFB")) return `${base}-AGM`;
  return base;
}

function getVehicleFits(product) {
  const key = productFitmentKey(product);
  const base = extractBaseSizeCode(product.sku) || "";
  const entry =
    sizeFitments.fitments[key] ??
    (key.endsWith("-AGM") ? sizeFitments.fitments[base] : undefined);

  if (entry?.labels?.length) {
    return entry.labels.join(", ");
  }
  return product.popularFits || "—";
}

function briefDescription(p) {
  if (p.seoDescription) return p.seoDescription.replace(/\s+/g, " ").trim();
  const type = p.isAGM ? "AGM/EFB" : "standard flooded";
  const dims = [p.lengthMm, p.widthMm, p.heightMm].every(Boolean)
    ? ` Case: ${p.lengthMm}×${p.widthMm}×${p.heightMm} mm.`
    : "";
  const fits = p.popularFits ? ` Fits: ${p.popularFits}.` : "";
  return `${p.brandName} ${p.sku} ${type} 12V car battery, ${p.ahCapacity}Ah, ${p.cca} CCA, ${p.warrantyMonths}-month warranty.${dims}${fits}`;
}

function pad(str, len) {
  str = String(str ?? "");
  if (str.length > len) return str.slice(0, len - 1) + "…";
  return str.padEnd(len);
}

function sortKey(p) {
  const sku = String(p.sku);
  const num = parseInt(sku.replace(/\D/g, ""), 10);
  return [isNaN(num) ? sku : num, sku];
}

const lines = [];
lines.push("ALBERTON BATTERY MART — CAR BATTERY CATALOG");
lines.push(`Generated: ${new Date().toISOString().slice(0, 10)}`);
lines.push("Brands: Eco Plus, Power Plus, Exide, Willard");
lines.push("Categories: Standard Automotive & Performance AGM/EFB");
lines.push(
  "Vehicle fits: from Willard fitment database where available; otherwise popular fits from catalog."
);
lines.push("");

let total = 0;

for (const { key, title } of BRANDS) {
  const items = products
    .filter((p) => p.brandName === key && CAR_CATS.has(p.category))
    .sort((a, b) => {
      const [an, as] = sortKey(a);
      const [bn, bs] = sortKey(b);
      return an - bn || as.localeCompare(bs);
    });

  total += items.length;
  lines.push("=".repeat(140));
  lines.push(`${title} CAR BATTERIES (${items.length} products)`);
  lines.push("=".repeat(140));
  lines.push("");
  lines.push(
    pad("SKU", 10) +
      "| " +
      pad("Product Name", 26) +
      "| " +
      pad("Type", 12) +
      "| " +
      pad("Ah", 5) +
      "| " +
      pad("CCA", 5) +
      "| " +
      pad("Price", 14) +
      "| " +
      pad("Description", 42) +
      "| Vehicle Fits"
  );
  lines.push("-".repeat(140));

  for (const p of items) {
    const desc = briefDescription(p);
    const fits = getVehicleFits(p);
    const type = p.category
      .replace("Performance ", "")
      .replace("Standard ", "")
      .replace("Automotive", "Auto");

    lines.push(
      pad(p.sku, 10) +
        "| " +
        pad(p.name, 26) +
        "| " +
        pad(type, 12) +
        "| " +
        pad(p.ahCapacity, 5) +
        "| " +
        pad(p.cca || "-", 5) +
        "| " +
        pad(p.sellingPrice_OUTPUT, 14) +
        "| " +
        pad(desc, 42) +
        "| " +
        fits
    );
  }
  lines.push("");
}

lines.push("=".repeat(140));
lines.push(`TOTAL: ${total} car batteries across 4 brands`);
lines.push("=".repeat(140));

const outPath = join(ROOT, "car-batteries-catalog.txt");
writeFileSync(outPath, lines.join("\n") + "\n");
console.log(`Wrote ${outPath} (${total} products)`);
