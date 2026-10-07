/**
 * Asserts the Unitech back-office pricelist follows the pricing rule
 * (PRICE 5 PLUS ex VAT -> incl. VAT -> ÷ 0.80 -> nearest R50, lifted to hold 20% GP)
 * and that none of these parts have leaked into the public catalogue.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { UNITECH_PRICELIST } from "../src/data/unitech-pricelist";
import { formatZAR } from "../src/lib/formatting";
import {
  centsToRands,
  formatGrossProfit,
  priceUnitechLine,
  ROUNDING_STEP_CENTS,
} from "../src/lib/unitech-pricing";

const ROOT = path.join(__dirname, "..");
const EXPECTED_LINE_COUNT = 38;

let failures = 0;

function assert(condition: unknown, message: string) {
  if (!condition) {
    failures += 1;
    console.error(`FAIL: ${message}`);
    return;
  }
  console.log(`OK: ${message}`);
}

const money = (cents: number) => formatZAR(centsToRands(cents));

function lineFor(partNumber: string) {
  const line = UNITECH_PRICELIST.find((l) => l.partNumber === partNumber);
  if (!line) throw new Error(`Missing Unitech line ${partNumber}`);
  return priceUnitechLine(line.price5PlusExVat);
}

assert(
  UNITECH_PRICELIST.length === EXPECTED_LINE_COUNT,
  `Pricelist has ${EXPECTED_LINE_COUNT} lines (found ${UNITECH_PRICELIST.length})`
);
assert(
  new Set(UNITECH_PRICELIST.map((l) => l.partNumber)).size === UNITECH_PRICELIST.length,
  "Part numbers are unique"
);

const p612 = lineFor("612A 24");
assert(p612.exVatCents === 101000, `612A 24 ex VAT is R 1 010.00 (${money(p612.exVatCents)})`);
assert(p612.costInclVatCents === 116150, `612A 24 cost incl. VAT is R 1 161.50 (${money(p612.costInclVatCents)})`);
assert(p612.nearestStepCents === 145000, `612A 24 nearest R50 is R 1 450.00 (${money(p612.nearestStepCents)})`);
assert(p612.sellingPriceCents === 150000, `612A 24 sells at R 1 500.00 (${money(p612.sellingPriceCents)})`);
assert(p612.profitInclVatCents === 33850, `612A 24 profit is R 338.50 (${money(p612.profitInclVatCents)})`);
assert(formatGrossProfit(p612.grossProfit) === "22.6%", `612A 24 GP is 22.6% (${formatGrossProfit(p612.grossProfit)})`);
assert(p612.raisedToHoldMargin, "612A 24 is flagged as raised to hold 20%");

const p615 = lineFor("615A 24 With lip");
assert(p615.sellingPriceCents === 120000, `615A 24 With lip sells at R 1 200.00 (${money(p615.sellingPriceCents)})`);
assert(!p615.raisedToHoldMargin, "615A 24 With lip does not need a lift");

for (const line of UNITECH_PRICELIST) {
  const p = priceUnitechLine(line.price5PlusExVat);
  const oneStepLower = p.sellingPriceCents - ROUNDING_STEP_CENTS;
  const minimalLift = p.raisedToHoldMargin
    ? 4 * oneStepLower < 5 * p.costInclVatCents
    : p.sellingPriceCents === p.nearestStepCents;
  const ok =
    Number.isInteger(p.sellingPriceCents) &&
    p.sellingPriceCents % ROUNDING_STEP_CENTS === 0 &&
    4 * p.sellingPriceCents >= 5 * p.costInclVatCents &&
    minimalLift;
  assert(
    ok,
    `${line.partNumber.padEnd(22)} ${money(p.sellingPriceCents).padStart(12)}  GP ${formatGrossProfit(p.grossProfit)}  (R50 step, >= 20%)`
  );
}

const unitechParts = UNITECH_PRICELIST.map((l) => l.partNumber);
const PUBLIC_SOURCES = ["data", "public", path.join("src", "data", "products.ts"), path.join("src", "app", "sitemap.ts")];

function filesUnder(rel: string): string[] {
  const abs = path.join(ROOT, rel);
  let stat;
  try {
    stat = statSync(abs);
  } catch {
    return [];
  }
  if (stat.isFile()) return [abs];
  return readdirSync(abs).flatMap((name) => filesUnder(path.join(rel, name)));
}

const publicFiles = PUBLIC_SOURCES.flatMap(filesUnder).filter((f) =>
  /\.(json|ts|tsx|js|mjs|xml|txt|csv)$/i.test(f)
);
const leaks: string[] = [];
for (const file of publicFiles) {
  const text = readFileSync(file, "utf-8");
  if (/unitech/i.test(text)) leaks.push(`${path.relative(ROOT, file)}: mentions Unitech`);
  for (const part of unitechParts) {
    if (text.includes(`"${part}"`)) leaks.push(`${path.relative(ROOT, file)}: contains "${part}"`);
  }
}
assert(leaks.length === 0, `No Unitech parts in public catalogue sources${leaks.length ? `\n  ${leaks.join("\n  ")}` : ""}`);

const allowedImporters = new Set([
  path.join("src", "components", "admin", "UnitechPricelist.tsx"),
  path.join("src", "app", "admin", "page.tsx"),
]);
const importers = filesUnder("src")
  .filter((f) => /\.(ts|tsx)$/.test(f))
  .map((f) => path.relative(ROOT, f))
  .filter((rel) => rel !== path.join("src", "data", "unitech-pricelist.ts"))
  .filter((rel) => /unitech-pricelist/.test(readFileSync(path.join(ROOT, rel), "utf-8")));
const stray = importers.filter((rel) => !allowedImporters.has(rel));
assert(stray.length === 0, `Only admin code imports the Unitech pricelist${stray.length ? ` (also: ${stray.join(", ")})` : ""}`);

if (failures > 0) {
  console.error(`\n${failures} Unitech pricing assertion(s) failed.`);
  process.exit(1);
}
console.log("\nAll Unitech pricing assertions passed.");
