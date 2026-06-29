#!/usr/bin/env node
/**
 * Apply product images from Google Drive download folder to catalog.
 * 618 images map to 619 where those SKUs share the same battery size.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DRIVE_DIR = path.join(ROOT, "drive-product-images");
const PRODUCTS_JSON = path.join(ROOT, "data", "products.json");
const PRODUCTS_TS = path.join(ROOT, "src", "data", "products.ts");
const PUBLIC_ECO = path.join(ROOT, "public", "images", "eco-plus");
const PUBLIC_PP = path.join(ROOT, "public", "images", "power-plus");

/** @type {Array<{ source: string, dest: string, brand: string, skus: string[], note?: string }>} */
const IMAGE_MAP = [
  {
    source: "612 ecoplus.png",
    dest: "612.png",
    brand: "Eco Plus",
    skus: ["612"],
  },
  {
    source: "616 ecoplus.png",
    dest: "616.png",
    brand: "Eco Plus",
    skus: ["616"],
  },
  {
    source: "eco-plus-616b.png",
    dest: "616b.png",
    brand: "Eco Plus",
    skus: ["616B"],
    note: "Drive file may be named Gemini_Generated_Image_... — rename to eco-plus-616b.png",
  },
  {
    source: "618 ecoplus.png",
    dest: "618-619.png",
    brand: "Eco Plus",
    skus: ["618"],
    note: "618 = 619 size; no Eco Plus 619 SKU in catalog yet",
  },
  {
    source: "612 powerplus.png",
    dest: "612.png",
    brand: "Power Plus",
    skus: ["612", "615"],
    note: "615 shares 612 Power Plus artwork (no 615 image in Drive)",
  },
  {
    source: "616 powerplus.png",
    dest: "616.png",
    brand: "Power Plus",
    skus: ["616"],
  },
  {
    source: "616B Powerplus.png",
    dest: "616b.png",
    brand: "Power Plus",
    skus: ["616B"],
  },
  {
    source: "618 Powerplus.png",
    dest: "618-619.png",
    brand: "Power Plus",
    skus: ["618"],
    note: "618 = 619 size; no Power Plus 619 SKU in catalog yet",
  },
  {
    source: "612 powerplus efb.png",
    dest: "612-efb.png",
    brand: "Power Plus",
    skus: ["612EFB"],
  },
  {
    source: "639 power plus efb.png",
    dest: "639-efb.png",
    brand: "Power Plus",
    skus: ["639EFB"],
  },
  {
    source: "643 power plus.png",
    dest: "643.png",
    brand: "Power Plus",
    skus: ["643"],
  },
];

const SIZE_ALIASES = {
  "618": ["619"],
  "619": ["618"],
};

function normalizeSku(sku) {
  return sku.trim().toUpperCase().replace(/\s+/g, "");
}

function skuMatches(productSku, targetSkus) {
  const norm = normalizeSku(productSku);
  const expanded = new Set();
  for (const s of targetSkus) {
    expanded.add(normalizeSku(s));
    for (const alias of SIZE_ALIASES[normalizeSku(s)] || []) {
      expanded.add(normalizeSku(alias));
    }
  }
  return expanded.has(norm);
}

function copyImage(sourceName, destDir, destName) {
  const src = path.join(DRIVE_DIR, sourceName);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source image: ${sourceName}`);
  }
  fs.mkdirSync(destDir, { recursive: true });
  const dest = path.join(destDir, destName);
  fs.copyFileSync(src, dest);
  return dest;
}

function main() {
  if (!fs.existsSync(DRIVE_DIR)) {
    console.error("Run gdown first: drive-product-images folder missing");
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON, "utf8"));
  const updated = [];
  const report = { applied: [], unused: [], missingProducts: [] };

  for (const entry of IMAGE_MAP) {
    const publicDir = entry.brand === "Eco Plus" ? PUBLIC_ECO : PUBLIC_PP;
    copyImage(entry.source, publicDir, entry.dest);
    const imagePath = `/images/${entry.brand === "Eco Plus" ? "eco-plus" : "power-plus"}/${entry.dest}`;

    let matchCount = 0;
    for (const product of products) {
      if (product.brandName !== entry.brand) continue;
      if (!skuMatches(product.sku, entry.skus)) continue;
      product.imagePath = imagePath;
      updated.push({ id: product.id, name: product.name, imagePath });
      matchCount++;
    }

    report.applied.push({
      file: entry.source,
      imagePath,
      productsUpdated: matchCount,
      skus: entry.skus,
      note: entry.note,
    });

    if (matchCount === 0) {
      report.missingProducts.push({
        file: entry.source,
        brand: entry.brand,
        skus: entry.skus,
        reason: "No matching catalog products for these SKUs",
      });
    }
  }

  // Unused drive files
  const usedSources = new Set(IMAGE_MAP.map((e) => e.source));
  for (const file of fs.readdirSync(DRIVE_DIR)) {
    if (!usedSources.has(file)) {
      let reason = "Not mapped to any catalog product";
      if (file.toLowerCase().includes("gemini")) {
        reason = "Eco Plus 616B — rename to eco-plus-616b.png and re-run import";
      } else if (file.toLowerCase().includes("612") && file.toLowerCase().includes("efb")) {
        reason = "No Power Plus 612 EFB (or Eco Plus 612 EFB) product in catalog";
      }
      report.unused.push({ file, reason });
    }
  }

  fs.writeFileSync(PRODUCTS_JSON, JSON.stringify(products, null, 2) + "\n");

  // Sync imagePath in products.ts for updated IDs (single-line object format)
  let ts = fs.readFileSync(PRODUCTS_TS, "utf8");
  for (const { id, imagePath } of updated) {
    const idPattern = new RegExp(
      `(\\{ id: ${id},[^}]*imagePath: )'[^']*'`,
      "g"
    );
    ts = ts.replace(idPattern, `$1'${imagePath}'`);
  }
  fs.writeFileSync(PRODUCTS_TS, ts);

  const outPath = path.join(ROOT, "DRIVE_IMAGE_IMPORT_REPORT.json");
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

  console.log("Updated products:", updated.length);
  for (const a of report.applied) {
    console.log(`  ${a.file} -> ${a.imagePath} (${a.productsUpdated} products)`);
  }
  console.log("\nUnused drive files:");
  for (const u of report.unused) {
    console.log(`  ${u.file}: ${u.reason}`);
  }

  return report;
}

main();
