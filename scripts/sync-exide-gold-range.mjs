import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = process.cwd();
const productsPath = join(ROOT, "data/products.json");
const imageDir = join(ROOT, "public/images/exide-gold");

const GOLD_RANGE = [
  { slug: "610c", sku: "610C" },
  { slug: "611c", sku: "611C" },
  { slug: "612c", sku: "612CE" },
  { slug: "615c", sku: "615C" },
  { slug: "616c", sku: "616C" },
  { slug: "616cs", sku: "616CS" },
  { slug: "619ce", sku: "619CE" },
  { slug: "621c", sku: "621C" },
  { slug: "622c", sku: "622C" },
  { slug: "626ce", sku: "626CE" },
  { slug: "628ce", sku: "628CE" },
  { slug: "630c", sku: "630C" },
  { slug: "631c", sku: "631C" },
  { slug: "634c", sku: "634C" },
  { slug: "636c", sku: "636C" },
  { slug: "636cs", sku: "636CS" },
  { slug: "638c", sku: "638C" },
  { slug: "639c", sku: "639C" },
  { slug: "640ce", sku: "640CE" },
  { slug: "646ce", sku: "646CE" },
  { slug: "650c", sku: "650C" },
  { slug: "650cr", sku: "650CR" },
  { slug: "651c", sku: "651C" },
  { slug: "651cp", sku: "651CP" },
  { slug: "652c", sku: "652C" },
  { slug: "652cp", sku: "652CP" },
  { slug: "654c", sku: "654C" },
  { slug: "657c", sku: "657C" },
  { slug: "658c", sku: "658C" },
  { slug: "668p", sku: "668P" },
  { slug: "669p", sku: "669P" },
];

const KEEP_PRICE_SKUS = new Set(["619CE", "646CE", "658C", "628"]);

function stripMarketingCopy(text) {
  if (!text) return "";
  return text
    .replace(/\bEFB\b/gi, "")
    .replace(/\bstart[- ]?stop\b/gi, "")
    .replace(/\bstop[- ]?and[- ]?go\b/gi, "")
    .replace(/\bGold Range\b/gi, "Exide")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.])/g, "$1")
    .trim();
}

function neutralDescription(sku, ah, cca, lengthMm, widthMm, heightMm) {
  const dims =
    lengthMm && widthMm && heightMm
      ? ` Case size: ${lengthMm} x ${widthMm} x ${heightMm} mm.`
      : "";
  return `The Exide ${sku} car battery is a maintenance-free 12V battery with ${ah}Ah capacity and ${cca} CCA.${dims} Built for dependable cranking power and everyday passenger vehicle use.`;
}

function neutralPopularFits(applications, ah) {
  const defaults =
    ah <= 40
      ? "Compact cars and hatchbacks"
      : ah <= 55
        ? "Hatchbacks, sedans, and light SUVs"
        : "Sedans, SUVs, and light commercial vehicles";

  const cleaned = (applications || [])
    .map((item) =>
      item
        .replace(/^Vehicles?\s+/i, "")
        .replace(/^Cars?\s+/i, "")
        .replace(/\bwith\s+basic\b[^.]*\.?/gi, "")
        .replace(/\b(start[- ]?stop|stop[- ]?and[- ]?go)\b[^.]*\.?/gi, "")
        .replace(/\bEFB\b/gi, "")
        .replace(/\s{2,}/g, " ")
        .replace(/\.$/, "")
        .trim()
    )
    .filter((item) => item.length > 12 && !/^with\b/i.test(item));

  if (!cleaned.length) return defaults;
  return cleaned.slice(0, 2).join(". ") + ".";
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!response.ok) {
    throw new Error(`${url} -> ${response.status}`);
  }
  return response.text();
}

function parsePage(raw, sku) {
  const specVal = (label) => {
    const pattern = new RegExp(
      `<strong>${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</strong>\\s*:\\s*([^<]+)`,
      "i"
    );
    const match = raw.match(pattern);
    if (!match) return null;
    const value = match[1].trim();
    if (/^(n\/a|na|-)$/i.test(value)) return null;
    return value;
  };

  const image =
    raw.match(/property="og:image" content="([^"]+)"/)?.[1] ?? null;
  const applications = [...raw.matchAll(/<li>(Vehicles[^<]{10,140}|Cars[^<]{10,140})<\/li>/g)].map(
    (match) => match[1]
  );

  const specs = {
    reserveMinutes: Number(specVal("Reserve Capacity")) || undefined,
    cca:
      Number(specVal("IEC*/EN") || specVal("IEC/EN") || specVal("SAE")) || 0,
    ahCapacity: Number(specVal("Nominal Capacity")) || 0,
    lengthMm: Number(specVal("Length (mm)")) || undefined,
    widthMm: Number(specVal("Width (mm)")) || undefined,
    heightMm: Number(specVal("Height (mm)")) || undefined,
    overallHeightMm: Number(specVal("O/A Height (mm)")) || undefined,
    weightKg: Number(specVal("Wet (kg) Max")) || undefined,
  };

  return { sku, image, specs, applications };
}

async function downloadImage(url, sku) {
  if (!url) return null;
  mkdirSync(imageDir, { recursive: true });
  const ext = url.split(".").pop()?.split("?")[0]?.toLowerCase() || "png";
  const filename = `exide-${sku.toLowerCase()}-gold.${ext}`;
  const localPath = join(imageDir, filename);
  if (!existsSync(localPath)) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Image ${url} -> ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(localPath, buffer);
  }
  return `/images/exide-gold/${filename}`;
}

function uniformExideName(product) {
  if (product.brandName !== "Exide") return product.name;
  if (product.category === "Truck & Commercial") {
    return `Exide ${product.sku} Truck Battery`;
  }
  if (product.isAGM || product.category === "Performance AGM/EFB") {
    return `Exide ${product.sku} AGM Battery`;
  }
  return `Exide ${product.sku} Car Battery`;
}

function uniformExideSubtitle(product) {
  if (product.brandName !== "Exide") return product.seoSubtitle;
  if (product.category === "Truck & Commercial") {
    return `Exide Truck Battery (${product.ahCapacity}Ah)`;
  }
  if (product.isAGM || product.category === "Performance AGM/EFB") {
    return `Exide AGM Battery (${product.ahCapacity}Ah)`;
  }
  return `Exide Car Battery (${product.ahCapacity}Ah)`;
}

function uniformExideSeoDescription(product) {
  if (product.brandName !== "Exide") return product.seoDescription;
  if (product.isAGM || product.category === "Performance AGM/EFB") {
    return product.seoDescription;
  }
  const dims =
    product.lengthMm && product.widthMm && product.heightMm
      ? ` Case size: ${product.lengthMm} x ${product.widthMm} x ${product.heightMm} mm.`
      : "";
  return `The ${product.name} is a maintenance-free 12V battery with ${product.ahCapacity}Ah capacity and ${product.cca} CCA.${dims} Built for dependable cranking power and everyday passenger vehicle use.`;
}

const products = JSON.parse(readFileSync(productsPath, "utf-8"));
let nextId = Math.max(...products.map((product) => product.id)) + 1;
const scraped = [];

for (const entry of GOLD_RANGE) {
  const url = `https://www.battery.co.za/product/${entry.slug}/`;
  try {
    const raw = await fetchText(url);
    const parsed = parsePage(raw, entry.sku);
    parsed.imagePath = await downloadImage(parsed.image, entry.sku);
    scraped.push(parsed);
    console.log("scraped", entry.sku);
  } catch (error) {
    console.error("failed", entry.sku, error.message);
  }
}

writeFileSync(
  join(ROOT, "data/exide-gold-range-source.json"),
  JSON.stringify(scraped, null, 2) + "\n"
);

for (const item of scraped) {
  const specs = item.specs;
  const height = specs.overallHeightMm ?? specs.heightMm;
  const existing = products.find(
    (product) => product.brandName === "Exide" && product.sku === item.sku
  );

  const payload = {
    name: `Exide ${item.sku} Car Battery`,
    sku: item.sku,
    category: "Standard Automotive",
    brandName: "Exide",
    ahCapacity: specs.ahCapacity,
    cca: specs.cca,
    warrantyMonths: 24,
    sellingPrice_OUTPUT: KEEP_PRICE_SKUS.has(item.sku)
      ? existing?.sellingPrice_OUTPUT ?? "P.O.A"
      : "P.O.A",
    isAGM: false,
    imagePath: item.imagePath || existing?.imagePath,
    popularFits: neutralPopularFits(item.applications, specs.ahCapacity),
    isScrapPrice: existing?.isScrapPrice ?? false,
    seoSubtitle: `Exide Car Battery (${specs.ahCapacity}Ah)`,
    seoDescription: neutralDescription(
      item.sku,
      specs.ahCapacity,
      specs.cca,
      specs.lengthMm,
      specs.widthMm,
      height
    ),
    lengthMm: specs.lengthMm,
    widthMm: specs.widthMm,
    heightMm: height,
    weightKg: specs.weightKg,
  };

  if (existing) {
    Object.assign(existing, payload, { id: existing.id });
    continue;
  }

  products.push({ id: nextId++, ...payload });
}

for (const product of products) {
  if (product.brandName !== "Exide") continue;
  product.name = uniformExideName(product);
  product.seoSubtitle = uniformExideSubtitle(product);
  if (!product.isAGM && product.category === "Standard Automotive") {
    product.seoDescription = uniformExideSeoDescription(product);
    product.popularFits = stripMarketingCopy(product.popularFits || "");
    if (!product.popularFits) {
      product.popularFits = "Passenger cars, hatchbacks, and sedans";
    }
  }
}

products.sort((a, b) => a.id - b.id);
writeFileSync(productsPath, JSON.stringify(products, null, 2) + "\n");
console.log("Exide Gold Range sync complete:", scraped.length, "models");
