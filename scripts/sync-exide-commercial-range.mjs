#!/usr/bin/env node
/**
 * Scrape Exide commercial / fleet batteries from battery.co.za
 * https://www.battery.co.za/product-category/commercial-vehicle-batteries/
 *
 * F690C on battery.co.za = Exide 690C Truck Battery (strip leading F from item code).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const productsPath = join(ROOT, "data/products.json");
const productsTsPath = join(ROOT, "src/data/products.ts");
const imageDir = join(ROOT, "public/images/exide-commercial");
const sourcePath = join(ROOT, "data/exide-commercial-source.json");

/** battery.co.za product slugs (F-codes) */
const COMMERCIAL_SLUGS = [
  "f682c",
  "f683c",
  "f685h",
  "f686c",
  "f688c",
  "f688cr",
  "f689c",
  "f690c",
  "f690cp",
  "f692c",
  "f695cz",
  "f696c",
  "f696cz",
];

const KEEP_PRICE_SKUS = new Set(["683C", "689C", "696C"]);
const NO_IMAGE_MARKERS = ["No-Image", "no-image", "placeholder"];

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ABM-catalog-sync/1.0)" },
  });
  if (!response.ok) throw new Error(`${url} -> ${response.status}`);
  return response.text();
}

function specVal(raw, label) {
  const pattern = new RegExp(
    `<strong>${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</strong>\\s*:?\\s*([^<]+)`,
    "i"
  );
  const match = raw.match(pattern);
  if (!match) return null;
  const value = match[1].trim();
  if (/^(n\/a|na|-)$/i.test(value)) return null;
  return value;
}

function parseJsonLdProduct(raw) {
  const block = raw.match(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/
  )?.[1];
  if (!block) return null;
  try {
    const data = JSON.parse(block);
    const graph = data["@graph"] || [data];
    return graph.find((node) => node["@type"] === "Product") || null;
  } catch {
    return null;
  }
}

function itemCodeToSku(itemCode) {
  return String(itemCode || "")
    .trim()
    .toUpperCase()
    .replace(/^F/, "");
}

function slugToSkuFallback(slug) {
  return slug.toUpperCase().replace(/^F/, "");
}

function commercialPopularFits() {
  return "Long-haul trucks, buses, construction and fleet vehicles";
}

function truckDescription(sku, ah, cca, lengthMm, widthMm, heightMm) {
  const dims =
    lengthMm && widthMm && heightMm
      ? ` Case size: ${lengthMm} x ${widthMm} x ${heightMm} mm.`
      : "";
  return `The Exide ${sku} Truck Battery is a maintenance-free 12V commercial battery with ${ah}Ah capacity and ${cca} CCA.${dims} Built for trucks, buses, and heavy-duty fleet applications.`;
}

function parsePage(raw, slug) {
  const itemCode = specVal(raw, "Item code");
  const batteryModel = specVal(raw, "Battery Model");
  const sku =
    itemCodeToSku(itemCode) ||
    (batteryModel ? `${batteryModel}C` : slugToSkuFallback(slug));

  const jsonLd = parseJsonLdProduct(raw);
  const ogImage =
    raw.match(/property="og:image" content="([^"]+)"/)?.[1] ?? null;
  const imageUrl =
    jsonLd?.image?.[0]?.url || jsonLd?.image?.url || ogImage;

  const oaHeight = Number(specVal(raw, "O/A Height (mm)")) || undefined;
  const lengthMm =
    Number(specVal(raw, "Length (mm)")) ||
    Number(jsonLd?.depth?.value) ||
    undefined;
  const widthMm =
    Number(specVal(raw, "Width (mm)")) ||
    Number(jsonLd?.width?.value) ||
    undefined;
  const heightMm =
    oaHeight ||
    Number(specVal(raw, "Height (mm)")) ||
    Number(jsonLd?.height?.value) ||
    undefined;

  return {
    slug,
    sku,
    itemCode,
    batteryModel,
    imageUrl,
    specs: {
      reserveMinutes: Number(specVal(raw, "Reserve Capacity")) || undefined,
      cca: Number(specVal(raw, "IEC*/EN") || specVal(raw, "SAE")) || 0,
      ahCapacity: Number(specVal(raw, "Nominal Capacity")) || 0,
      lengthMm,
      widthMm,
      heightMm,
      weightKg: Number(specVal(raw, "Wet (kg) Max")) || undefined,
      holdDown: specVal(raw, "Hold Down Type"),
      terminalLayout: specVal(raw, "Terminal Layout"),
      terminalType: specVal(raw, "Terminal Type"),
    },
  };
}

async function downloadImage(url, sku) {
  if (!url || NO_IMAGE_MARKERS.some((m) => url.includes(m))) return null;
  mkdirSync(imageDir, { recursive: true });
  const ext = url.split(".").pop()?.split("?")[0]?.toLowerCase() || "png";
  const safeExt = ["png", "jpg", "jpeg", "webp"].includes(ext) ? ext : "png";
  const filename = `exide-${sku.toLowerCase()}-commercial.${safeExt}`;
  const localPath = join(imageDir, filename);
  if (!existsSync(localPath)) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Image ${url} -> ${response.status}`);
    writeFileSync(localPath, Buffer.from(await response.arrayBuffer()));
  }
  return `/images/exide-commercial/${filename}`;
}

function uniformExideTruckProduct(payload) {
  return {
    ...payload,
    name: `Exide ${payload.sku} Truck Battery`,
    seoSubtitle: `Exide Truck Battery (${payload.ahCapacity}Ah)`,
    seoDescription: truckDescription(
      payload.sku,
      payload.ahCapacity,
      payload.cca,
      payload.lengthMm,
      payload.widthMm,
      payload.heightMm
    ),
    popularFits: commercialPopularFits(),
  };
}

function syncProductsTs(products) {
  if (!existsSync(productsTsPath)) return;
  let ts = readFileSync(productsTsPath, "utf8");
  const exideCommercial = products.filter(
    (p) => p.brandName === "Exide" && p.category === "Truck & Commercial"
  );
  for (const product of exideCommercial) {
    const idPattern = new RegExp(
      `(\\{ id: ${product.id},[^}]*imagePath: )'[^']*'`,
      "g"
    );
    if (idPattern.test(ts)) {
      ts = ts.replace(idPattern, `$1'${product.imagePath}'`);
      continue;
    }
    // New products won't be in ts — site reads JSON at runtime
  }
  writeFileSync(productsTsPath, ts);
}

const products = JSON.parse(readFileSync(productsPath, "utf8"));
let nextId = Math.max(...products.map((p) => p.id), 0) + 1;
const scraped = [];

for (const slug of COMMERCIAL_SLUGS) {
  const url = `https://www.battery.co.za/product/${slug}/`;
  try {
    const raw = await fetchText(url);
    const parsed = parsePage(raw, slug);
    if (!parsed.specs.ahCapacity || !parsed.specs.cca) {
      console.warn("warn: missing ah/cca for", slug, parsed.sku);
    }
    parsed.imagePath =
      (await downloadImage(parsed.imageUrl, parsed.sku)) ||
      products.find((p) => p.brandName === "Exide" && p.sku === parsed.sku)
        ?.imagePath ||
      "/images/stock-battery.jpg";
    scraped.push(parsed);
    console.log("scraped", parsed.sku, "<-", slug);
  } catch (error) {
    console.error("failed", slug, error.message);
  }
}

writeFileSync(sourcePath, JSON.stringify(scraped, null, 2) + "\n");

let added = 0;
let updated = 0;

for (const item of scraped) {
  const specs = item.specs;
  const existing = products.find(
    (p) => p.brandName === "Exide" && p.sku === item.sku
  );

  const base = {
    sku: item.sku,
    category: "Truck & Commercial",
    brandName: "Exide",
    ahCapacity: specs.ahCapacity,
    cca: specs.cca,
    warrantyMonths: 24,
    sellingPrice_OUTPUT: KEEP_PRICE_SKUS.has(item.sku)
      ? existing?.sellingPrice_OUTPUT ?? "P.O.A"
      : "P.O.A",
    isAGM: false,
    imagePath: item.imagePath,
    isScrapPrice: existing?.isScrapPrice ?? true,
    lengthMm: specs.lengthMm,
    widthMm: specs.widthMm,
    heightMm: specs.heightMm,
    weightKg: specs.weightKg,
  };

  const payload = uniformExideTruckProduct(base);

  if (existing) {
    Object.assign(existing, payload, { id: existing.id });
    updated++;
    continue;
  }

  products.push({ id: nextId++, ...payload });
  added++;
}

products.sort((a, b) => a.id - b.id);
writeFileSync(productsPath, JSON.stringify(products, null, 2) + "\n");
syncProductsTs(products);

console.log(
  `Exide commercial sync: ${scraped.length} scraped, ${updated} updated, ${added} added`
);
