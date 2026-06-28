import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const INPUT = join(ROOT, "willard_battery_database_focused.csv");
const FIELDS = [
  "vehicle_type",
  "manufacturer",
  "year",
  "model",
  "battery_code",
  "replacement_type",
  "technology",
  "description",
  "image_link",
];

const ALLOWED_BRANDS = new Set([
  "hyundai",
  "ford",
  "volkswagen",
  "suzuki",
  "mahindra",
  "chery",
  "gwm",
  "jetour",
]);

const MIN_YEAR = 2012;
const PASSENGER_VT = "Passenger & SUV";

function parseCsv(content) {
  const lines = content.split(/\r?\n/).filter(Boolean);
  const header = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (char === "," && !inQuotes) {
        values.push(current);
        current = "";
        continue;
      }
      current += char;
    }
    values.push(current);
    return Object.fromEntries(header.map((key, index) => [key, values[index] ?? ""]));
  });
}

function escapeCsv(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function manufacturerAllowed(name) {
  const normalized = name.trim().toLowerCase();
  if (normalized.startsWith("toyota") && !normalized.includes("hino")) {
    return true;
  }
  return ALLOWED_BRANDS.has(normalized);
}

function normalizeManufacturer(name) {
  const normalized = name.trim().toLowerCase();
  if (normalized.startsWith("toyota") && !normalized.includes("hino")) {
    return "Toyota";
  }
  return name.trim();
}

function rowAllowed(row) {
  if (row.vehicle_type !== PASSENGER_VT) return false;
  if (!manufacturerAllowed(row.manufacturer)) return false;
  const year = Number.parseInt(row.year, 10);
  if (!Number.isFinite(year) || year < MIN_YEAR) return false;
  return true;
}

const raw = readFileSync(INPUT, "utf-8");
const rows = parseCsv(raw);
const filtered = [];
const seen = new Set();

for (const row of rows) {
  if (!rowAllowed(row)) continue;
  const normalized = {
    ...row,
    manufacturer: normalizeManufacturer(row.manufacturer),
  };
  const key = FIELDS.map((field) => normalized[field]).join("\0");
  if (seen.has(key)) continue;
  seen.add(key);
  filtered.push(normalized);
}

filtered.sort((a, b) => {
  const brand = a.manufacturer.localeCompare(b.manufacturer);
  if (brand !== 0) return brand;
  const year = Number(b.year) - Number(a.year);
  if (year !== 0) return year;
  return a.model.localeCompare(b.model);
});

const output = [
  FIELDS.join(","),
  ...filtered.map((row) => FIELDS.map((field) => escapeCsv(row[field])).join(",")),
].join("\n") + "\n";

writeFileSync(INPUT, output);
console.log(`Filtered ${rows.length} -> ${filtered.length} rows`);
console.log(
  "Brands:",
  [...new Set(filtered.map((row) => row.manufacturer))].sort().join(", ")
);
