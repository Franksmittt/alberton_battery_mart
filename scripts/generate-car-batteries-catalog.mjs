#!/usr/bin/env node
/**
 * Generate car-batteries-catalog.txt with full vehicle fitments from the
 * Willard battery selection guide CSV (same source as YMMSearchWidget).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const products = JSON.parse(
  readFileSync(join(ROOT, "data/products.json"), "utf8")
);

const BRANDS = [
  { key: "Eco Plus", title: "ECO PLUS" },
  { key: "Power Plus", title: "POWER PLUS" },
  { key: "Exide", title: "EXIDE" },
  { key: "Willard", title: "WILLARD" },
];
const CAR_CATS = new Set(["Standard Automotive", "Performance AGM/EFB"]);

const WILLARD_CODE_ALIASES = {
  "618/9": "619",
  "628/9": "628",
  "616B": "616",
};

/** Product SKUs that share another size's Willard fitment list */
const PRODUCT_SIZE_ALIASES = {
  "618": "619",
  "628/9": "628",
};

const CSV_PATHS = [
  join(ROOT, "willard_battery_database_focused.csv"),
  join(ROOT, "willard_battery_database.csv"),
];

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else cur += c;
  }
  out.push(cur);
  return out;
}

function loadCsv() {
  for (const p of CSV_PATHS) {
    if (!existsSync(p)) continue;
    const raw = readFileSync(p, "utf8").replace(/^\uFEFF/, "");
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const headers = parseCsvLine(lines[0]);
    const rows = lines.slice(1).map((line) => {
      const vals = parseCsvLine(line);
      const row = {};
      headers.forEach((h, i) => {
        row[h.trim()] = (vals[i] ?? "").trim();
      });
      return row;
    });
    return { rows, source: p.split("/").pop() };
  }
  throw new Error("No Willard CSV found");
}

function normalizeSlashCode(rawCode) {
  const parts = rawCode.split("/");
  if (parts.length !== 2) return rawCode;
  if (parts[0].length >= 3 && parts[1].length >= 3) {
    return parts.sort((a, b) => Number(a) - Number(b)).join("/");
  }
  return rawCode;
}

function toBaseSizeCode(value) {
  const cleaned = String(value ?? "")
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "");
  const matched = cleaned.match(/^\d+(?:\/\d+)?/);
  if (!matched) return cleaned;
  return normalizeSlashCode(matched[0]);
}

function normalizeCsvBatteryCode(raw) {
  const code = String(raw ?? "").trim();
  if (WILLARD_CODE_ALIASES[code]) return WILLARD_CODE_ALIASES[code];
  return code;
}

function isAgmVariantCode(batteryCode) {
  const upper = String(batteryCode).toUpperCase();
  return /-AGM|-EFB/.test(upper);
}

function productIsAgm(product) {
  const skuUpper = String(product.sku).toUpperCase();
  return Boolean(
    product.isAGM || skuUpper.includes("AGM") || skuUpper.includes("EFB")
  );
}

function productMatchBase(product) {
  const base = toBaseSizeCode(product.sku);
  return PRODUCT_SIZE_ALIASES[base] ?? PRODUCT_SIZE_ALIASES[product.sku] ?? base;
}

function rowMatchesProduct(row, product) {
  const normalized = normalizeCsvBatteryCode(row.battery_code);
  const rowBase = toBaseSizeCode(normalized);
  const prodBase = productMatchBase(product);
  if (rowBase !== prodBase) return false;

  const rowAgmVariant = isAgmVariantCode(normalized);
  if (rowAgmVariant) return productIsAgm(product);
  return true;
}

function formatVehicle(row) {
  return `${row.year} ${row.manufacturer} ${row.model}`.replace(/\s+/g, " ").trim();
}

function buildFitmentIndex(rows) {
  /** @type {Map<string, Set<string>>} */
  const cache = new Map();

  return {
    getVehicles(product) {
      const cacheKey = `${product.brandName}|${product.sku}|${productIsAgm(product)}`;
      if (cache.has(cacheKey)) return [...cache.get(cacheKey)];

      const seen = new Set();
      const vehicles = [];

      for (const row of rows) {
        if (!rowMatchesProduct(row, product)) continue;
        const line = formatVehicle(row);
        if (seen.has(line)) continue;
        seen.add(line);
        vehicles.push(line);
      }

      vehicles.sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
      cache.set(cacheKey, new Set(vehicles));
      return vehicles;
    },
  };
}

function briefDescription(p) {
  if (p.seoDescription) return p.seoDescription.replace(/\s+/g, " ").trim();
  const type = p.isAGM ? "AGM/EFB" : "standard flooded";
  return `${p.brandName} ${p.sku} ${type} 12V car battery, ${p.ahCapacity}Ah, ${p.cca} CCA, ${p.warrantyMonths}-month warranty.`;
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

const { rows, source } = loadCsv();
const fitmentIndex = buildFitmentIndex(rows);

const lines = [];
lines.push("ALBERTON BATTERY MART — CAR BATTERY CATALOG");
lines.push(`Generated: ${new Date().toISOString().slice(0, 10)}`);
lines.push("Brands: Eco Plus, Power Plus, Exide, Willard");
lines.push("Categories: Standard Automotive & Performance AGM/EFB");
lines.push(
  `Vehicle fitments: exact year / make / model from Willard battery selection guide (${source})`
);
lines.push(
  "Format: YEAR MAKE MODEL (e.g. 2016 Ford Figo Hatch 1.5TDCi Ambiente)"
);
lines.push("");

let total = 0;
let withFitments = 0;

for (const { key, title } of BRANDS) {
  const items = products
    .filter((p) => p.brandName === key && CAR_CATS.has(p.category))
    .sort((a, b) => {
      const [an, as] = sortKey(a);
      const [bn, bs] = sortKey(b);
      return an - bn || as.localeCompare(bs);
    });

  total += items.length;
  lines.push("=".repeat(120));
  lines.push(`${title} CAR BATTERIES (${items.length} products)`);
  lines.push("=".repeat(120));
  lines.push("");

  lines.push(
    pad("SKU", 10) +
      "| " +
      pad("Product Name", 26) +
      "| " +
      pad("Ah", 5) +
      "| " +
      pad("CCA", 5) +
      "| " +
      pad("Price", 14) +
      "| " +
      pad("Vehicles", 8) +
      "| Description"
  );
  lines.push("-".repeat(120));

  for (const p of items) {
    const vehicles = fitmentIndex.getVehicles(p);
    if (vehicles.length) withFitments++;

    lines.push(
      pad(p.sku, 10) +
        "| " +
        pad(p.name, 26) +
        "| " +
        pad(p.ahCapacity, 5) +
        "| " +
        pad(p.cca || "-", 5) +
        "| " +
        pad(p.sellingPrice_OUTPUT, 14) +
        "| " +
        pad(vehicles.length || "-", 8) +
        "| " +
        briefDescription(p)
    );
  }

  lines.push("");
  lines.push(`${title} — VEHICLE FITMENTS`);
  lines.push("-".repeat(120));

  for (const p of items) {
    const vehicles = fitmentIndex.getVehicles(p);
    lines.push("");
    lines.push(
      `[${p.sku}] ${p.name} | ${p.sellingPrice_OUTPUT} | ${p.ahCapacity}Ah | ${p.cca || "-"} CCA`
    );
    lines.push(`Description: ${briefDescription(p)}`);

    if (!vehicles.length) {
      lines.push(
        `Vehicle fits: No Willard selection-guide match for this SKU${p.popularFits ? ` (catalog note: ${p.popularFits})` : ""}`
      );
      continue;
    }

    lines.push(`Vehicle fits (${vehicles.length}):`);
    for (const vehicle of vehicles) {
      lines.push(`  • ${vehicle}`);
    }
  }

  lines.push("");
}

lines.push("=".repeat(120));
lines.push(
  `TOTAL: ${total} car batteries | ${withFitments} with Willard selection-guide fitments`
);
lines.push("=".repeat(120));

const outPath = join(ROOT, "car-batteries-catalog.txt");
writeFileSync(outPath, lines.join("\n") + "\n");
console.log(`Wrote ${outPath} (${total} products, ${withFitments} with fitments)`);
