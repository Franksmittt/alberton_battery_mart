import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const productsPath = join(ROOT, "data/products.json");
const products = JSON.parse(readFileSync(productsPath, "utf-8"));

const DESCRIPTIONS = {
  "610C":
    "The Exide Gold Range 610C EFB car battery is a powerful and reliable choice for vehicles with basic start-stop systems. With 35Ah capacity and 280 CCA, it delivers consistent starting power, maintenance-free convenience, and spill-resistant EFB technology for everyday driving.",
  "611C":
    "The Exide Gold Range 611C EFB car battery offers dependable performance for entry-level start-stop vehicles. Its 35Ah capacity, 280 CCA rating, and compact 241 x 173 x 215mm footprint make it a practical upgrade for cars with moderate electrical demands.",
  "612CE":
    "The Exide Gold Range 612CE EFB car battery is a maintenance-free 12V solution with 44Ah capacity and 345 CCA. Built for basic start-stop applications, it combines spill-resistant design with improved cycling performance over standard flooded batteries.",
  "615C":
    "The Exide Gold Range 615C EFB car battery delivers compact power for smaller battery trays. With 38Ah capacity, 270 CCA, and a 187 x 127 x 224mm case, it suits vehicles with basic start-stop systems and moderate electrical loads.",
  "616C":
    "The Exide Gold Range 616C EFB car battery is designed for entry-level start-stop vehicles with modest electrical needs. It offers 38Ah capacity, 270 CCA, maintenance-free operation, and durable EFB performance in urban stop-and-go conditions.",
  "616CS":
    "The Exide Gold Range 616CS EFB car battery provides enhanced performance for compact start-stop applications. With 38Ah capacity, 270 CCA, and a wider 136mm case width, it is suited to vehicles needing reliable EFB durability and reserve capacity.",
  "619CE":
    "The Exide Gold Range 619CE EFB car battery is engineered for popular compact cars with basic start-stop systems. It delivers 42Ah capacity, 314 CCA, and maintenance-free EFB technology in a 207 x 175 x 175mm footprint.",
  "621C":
    "The Exide Gold Range 621C EFB car battery is built for vehicles with moderate electrical demands and basic start-stop functionality. It offers 52Ah capacity, 400 CCA, and dependable EFB cycling performance for daily commuting.",
  "622C":
    "The Exide Gold Range 622C EFB car battery combines 52Ah capacity with 400 CCA for cars that need stronger reserve power and start-stop support. Its 241 x 173 x 215mm dimensions suit a wide range of passenger vehicles.",
  "626CE":
    "The Exide Gold Range 626CE EFB car battery delivers high cranking performance with 53Ah capacity and 424 CCA. It is maintenance-free, spill-resistant, and built for reliable starts in demanding heat and cold.",
};

const BATCH = [
  { sku: "610C", slug: "610c" },
  { sku: "611C", slug: "611c" },
  { sku: "612CE", slug: "612c" },
  { sku: "615C", slug: "615c" },
  { sku: "616C", slug: "616c" },
  { sku: "616CS", slug: "616cs" },
  { sku: "619CE", slug: "619ce", updateId: 118, keepPrice: true },
  { sku: "621C", slug: "621c" },
  { sku: "622C", slug: "622c" },
  { sku: "626CE", slug: "626ce" },
];

const scraped = JSON.parse(
  readFileSync(join(ROOT, "data/exide-gold-batch1-source.json"), "utf-8")
);
const scrapedBySku = Object.fromEntries(scraped.map((item) => [item.sku, item]));

let nextId = Math.max(...products.map((p) => p.id)) + 1;

function buildProduct(entry) {
  const source = scrapedBySku[entry.sku];
  const specs = source.specs;
  const apps = source.applications?.join(" ") || "Passenger vehicles with basic start-stop systems.";
  const ah = specs.ahCapacity;
  const title = `Exide ${entry.sku} EFB Car Battery`;

  return {
    id: entry.updateId ?? nextId++,
    name: title,
    sku: entry.sku,
    category: "Performance AGM/EFB",
    brandName: "Exide",
    ahCapacity: ah,
    cca: specs.cca,
    warrantyMonths: 24,
    sellingPrice_OUTPUT: entry.keepPrice
      ? products.find((p) => p.id === entry.updateId)?.sellingPrice_OUTPUT ?? "P.O.A"
      : "P.O.A",
    isAGM: true,
    imagePath: source.localImage,
    popularFits: apps,
    isScrapPrice: false,
    seoSubtitle: `Exide Gold Range EFB (${ah}Ah)`,
    seoDescription: DESCRIPTIONS[entry.sku],
    lengthMm: specs.lengthMm ?? undefined,
    widthMm: specs.widthMm ?? undefined,
    heightMm: specs.overallHeightMm ?? specs.heightMm ?? undefined,
    weightKg: specs.weightKg ?? undefined,
  };
}

const added = [];
const updated = [];

for (const entry of BATCH) {
  const product = buildProduct(entry);
  if (entry.updateId) {
    const idx = products.findIndex((p) => p.id === entry.updateId);
    if (idx === -1) throw new Error(`Missing product id ${entry.updateId}`);
    products[idx] = { ...products[idx], ...product, id: entry.updateId };
    updated.push(product.sku);
    continue;
  }

  const duplicateSku = products.find(
    (p) => p.sku === entry.sku && p.brandName === "Exide"
  );
  if (duplicateSku) {
    Object.assign(duplicateSku, product, { id: duplicateSku.id });
    updated.push(product.sku);
    continue;
  }

  products.push(product);
  added.push(product.sku);
}

products.sort((a, b) => a.id - b.id);
writeFileSync(productsPath, JSON.stringify(products, null, 2) + "\n");
console.log("Added:", added.join(", ") || "none");
console.log("Updated:", updated.join(", ") || "none");
