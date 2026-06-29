#!/usr/bin/env node
/**
 * Scrape Enertec AGM motorcycle batteries from enertec.co.za
 * https://enertec.co.za/products/?assoc_apps=motorcycle
 *
 * Excludes: Outdoor/Outdo, lithium, CTEK chargers.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const productsPath = join(ROOT, "data/products.json");
const imageDir = join(ROOT, "public/images/enertec-motorcycle");
const sourcePath = join(ROOT, "data/enertec-motorcycle-source.json");

const BASE = "https://enertec.co.za";
const LISTING =
  "/products/?num_products=72&assoc_apps=motorcycle&pg=";

/** Supplier model code -> catalog SKU */
const CATALOG_SKU = {
  "KT12A-BS": "YT12A-BS",
  KTZ14S: "YTZ14S",
  KTZ10S: "YTZ10S",
  KTZ7S: "YTZ7S",
  KIX30L: "YTX30L",
  "YTX4AH-BS": "YTX14AH-BS", // supplier h1 typo; slug is ytx14ah-bs
  "YTX6-5L-BS": "YTX6.5L-BS",
};

const EXCLUDE_SLUG =
  /outdo|outdoor|bsigel|poweroad|plfp|lithium|ctek|charger|gl-series/i;

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ABM-catalog-sync/1.0)" },
  });
  if (!response.ok) throw new Error(`${url} -> ${response.status}`);
  return response.text();
}

function specMm(raw, label) {
  const match = raw.match(
    new RegExp(`<span>${label}:\\s*</span>\\s*([\\d,]+)mm`, "i")
  );
  if (!match) return undefined;
  return Number(match[1].replace(",", "."));
}

function specWeightKg(raw) {
  const match = raw.match(/<span>Weight:\s*<\/span>\s*([\d,]+)\s*kg/i);
  if (!match) return undefined;
  return Number(match[1].replace(",", "."));
}

function parseAhFromTitle(text) {
  const afterVoltage = text.match(/\d+V\s+(\d+(?:[.,]\d+)?)\s*Ah/i);
  if (afterVoltage) return Number(afterVoltage[1].replace(",", "."));
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*Ah/i);
  if (!match) return undefined;
  return Number(match[1].replace(",", "."));
}

function parseAhFromSlug(slug) {
  const match = slug.match(/-(\d+(?:-\d+)?)ah-/i);
  if (!match) return undefined;
  return Number(match[1].replace("-", "."));
}

function parseSkuFromSlug(slug) {
  const m = slug.match(/^(.+?)-(?:12v|\d+v)-/i);
  if (!m) return null;
  const segments = m[1].split("-");

  if (segments[0] === "ktz" && segments[1]?.match(/^\d+s$/i)) {
    return `KTZ${segments[1].toUpperCase()}`;
  }
  if (segments[0] === "kix" && segments[1]?.match(/^\d+l$/i)) {
    return `KIX${segments[1].toUpperCase()}`;
  }
  if (segments[0]?.match(/^kt\d+a$/i) && segments[1] === "bs") {
    return `${segments[0].toUpperCase()}-BS`;
  }

  return segments.map((s) => s.toUpperCase()).join("-");
}

function parseSkuFromH1(h1) {
  const match = h1.match(/^([A-Z0-9][A-Z0-9\s.-]+?)(?:_|\s+)\d+V/i);
  if (!match) return null;
  return match[1].replace(/\s+/g, "").toUpperCase();
}

function toCatalogSku(supplierSku) {
  return CATALOG_SKU[supplierSku] || supplierSku;
}

function slugFromUrl(url) {
  return url.replace(/^.*\/products\//, "").replace(/\.html$/, "");
}

function isEnertecAgmListing(slug) {
  if (!slug.includes("enertec")) return false;
  if (EXCLUDE_SLUG.test(slug)) return false;
  return true;
}

async function collectListingSlugs() {
  const slugs = new Set();
  for (let page = 1; page <= 5; page++) {
    const raw = await fetchText(`${BASE}${LISTING}${page}`);
    const matches = raw.matchAll(/products\/([^"<>]+\.html)/g);
    let found = 0;
    for (const [, href] of matches) {
      const slug = href.replace(/\.html$/, "");
      if (isEnertecAgmListing(slug)) {
        slugs.add(slug);
        found++;
      }
    }
    if (found === 0 && page > 1) break;
  }
  return [...slugs];
}

function parseProductPage(raw, slug) {
  const h1 = raw.match(/<h1>([^<]+)<\/h1>/i)?.[1]?.trim() ?? "";
  const title = raw.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? h1;
  const supplierSku =
    parseSkuFromSlug(slug) || parseSkuFromH1(h1) || parseSkuFromH1(title);
  const catalogSku = toCatalogSku(supplierSku);

  const imageUrl =
    raw.match(/id="ppvc-l-image"[\s\S]*?<img src="([^"]+)"/i)?.[1] ??
    raw.match(/couch\/uploads\/image\/products\/enertec\/[^"]+/i)?.[0];

  const fullImageUrl = imageUrl?.startsWith("http")
    ? imageUrl
    : imageUrl
      ? `${BASE}/${imageUrl.replace(/^\//, "")}`
      : null;

  const techType = raw.match(/<span>Tech Type:\s*<\/span>\s*([^<]+)/i)?.[1]?.trim();
  if (techType && !/agm/i.test(techType)) return null;

  const ahCapacity =
    parseAhFromTitle(h1) ||
    parseAhFromTitle(title) ||
    parseAhFromSlug(slug);

  return {
    slug,
    supplierSku,
    catalogSku,
    h1,
    imageUrl: fullImageUrl,
    ahCapacity,
    lengthMm: specMm(raw, "Length"),
    widthMm: specMm(raw, "Width"),
    heightMm: specMm(raw, "Height"),
    weightKg: specWeightKg(raw),
    isAGM: !techType || /agm/i.test(techType),
  };
}

async function downloadImage(url, catalogSku) {
  if (!url || !/enertec/i.test(url)) return null;
  mkdirSync(imageDir, { recursive: true });
  const ext = url.split(".").pop()?.split("?")[0]?.toLowerCase() || "jpg";
  const safeExt = ["png", "jpg", "jpeg", "webp"].includes(ext) ? ext : "jpg";
  const filename = `${catalogSku.toLowerCase().replace(/[^a-z0-9.-]+/g, "-")}.${safeExt}`;
  const localPath = join(imageDir, filename);
  if (!existsSync(localPath)) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Image ${url} -> ${response.status}`);
    writeFileSync(localPath, Buffer.from(await response.arrayBuffer()));
  }
  return `/images/enertec-motorcycle/${filename}`;
}

function motorcycleDescription(sku, ah, lengthMm, widthMm, heightMm) {
  const dims =
    lengthMm && widthMm && heightMm
      ? ` Case size: ${lengthMm} x ${widthMm} x ${heightMm} mm.`
      : "";
  return `Enertec ${sku}: AGM Motorcycle Battery. Features ${ah}Ah capacity and a 12-Month Warranty.${dims}`;
}

function uniformEnertecProduct(base) {
  return {
    ...base,
    name: `Enertec ${base.sku}`,
    seoSubtitle: `AGM Enertec Motorcycle Battery (${base.ahCapacity}Ah)`,
    seoDescription: motorcycleDescription(
      base.sku,
      base.ahCapacity,
      base.lengthMm,
      base.widthMm,
      base.heightMm
    ),
    popularFits: "Motorcycle",
  };
}

const products = JSON.parse(readFileSync(productsPath, "utf8"));
let nextId = Math.max(...products.map((p) => p.id), 0) + 1;

const listingSlugs = await collectListingSlugs();
console.log(`Found ${listingSlugs.length} Enertec AGM listing(s)`);

const scraped = [];
for (const slug of listingSlugs) {
  const url = `${BASE}/products/${slug}.html`;
  try {
    const raw = await fetchText(url);
    const parsed = parseProductPage(raw, slug);
    if (!parsed?.catalogSku) {
      console.warn("skip:", slug);
      continue;
    }
    parsed.imagePath =
      (await downloadImage(parsed.imageUrl, parsed.catalogSku)) ||
      products.find(
        (p) => p.brandName === "Enertec" && p.sku === parsed.catalogSku
      )?.imagePath ||
      "/images/stock-battery.jpg";
    scraped.push(parsed);
    console.log("scraped", parsed.catalogSku, "<-", parsed.supplierSku, slug);
  } catch (error) {
    console.error("failed", slug, error.message);
  }
}

writeFileSync(sourcePath, JSON.stringify(scraped, null, 2) + "\n");

let updated = 0;
let added = 0;

for (const item of scraped) {
  const existing = products.find(
    (p) => p.brandName === "Enertec" && p.sku === item.catalogSku
  );

  const base = {
    sku: item.catalogSku,
    category: "Motorcycle",
    brandName: "Enertec",
    ahCapacity: item.ahCapacity ?? existing?.ahCapacity ?? 0,
    cca: 0,
    warrantyMonths: 12,
    sellingPrice_OUTPUT: existing?.sellingPrice_OUTPUT ?? "P.O.A",
    isAGM: true,
    imagePath: item.imagePath,
    isScrapPrice: existing?.isScrapPrice ?? true,
    lengthMm: item.lengthMm,
    widthMm: item.widthMm,
    heightMm: item.heightMm,
    weightKg: item.weightKg,
  };

  const payload = uniformEnertecProduct(base);

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

console.log(
  `Enertec motorcycle sync: ${scraped.length} scraped, ${updated} updated, ${added} added`
);
