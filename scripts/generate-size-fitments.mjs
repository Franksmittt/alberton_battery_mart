#!/usr/bin/env node
/**
 * Build accurate vehicle fitment lists per battery size from Willard CSV.
 * Output: src/data/size-fitments.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SIZE_CODES = ["616", "619", "628", "646", "652", "657", "658", "668"];

/** Willard CSV battery_code values that map to our hub size codes */
const WILLARD_CODE_ALIASES = {
  "618/9": "619",
  "628/9": "628",
  "616B": "616",
};

const LEGACY_MODEL =
  /\b(cortina|granada(?!\s+2\.0\s+tdci)|sierra sapphire|fwd escort|escort range|ikon\b|ka\b|beetle|eos\b|golf\s+[1-4]|jetta\s+[1-4]|passat\s+[1-4]|mustang\s+5\.0|trajet|matrix|tiburon|atos\b|veloster turbo|avensis|spectron|b-max|citi\b|ignis|splash|aygo)\b/i;

const CSV_PATHS = [
  path.join(ROOT, "willard_battery_database_focused.csv"),
  path.join(ROOT, "willard_battery_database.csv"),
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
    if (fs.existsSync(p)) {
      console.log(`Using ${path.basename(p)}`);
      const raw = fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
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
      return { rows, source: path.basename(p) };
    }
  }
  throw new Error("No Willard CSV found");
}

function extractBaseSizeCode(raw) {
  const cleaned = String(raw ?? "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/CE$|C$|PS$|AGM$|EFB$/i, (m) => (m === "AGM" || m === "EFB" ? m : ""));

  const slashMatch = cleaned.match(/^(\d{3})\/(\d+)/);
  if (slashMatch) return slashMatch[1];

  const agmMatch = cleaned.match(/^(\d{3})-AGM$/);
  if (agmMatch) return agmMatch[1];

  const efbMatch = cleaned.match(/^(\d{3})-EFB$/);
  if (efbMatch) return efbMatch[1];

  const digitMatch = cleaned.match(/^(\d{3})/);
  return digitMatch ? digitMatch[1] : null;
}

function mapWillardCodeToSiteSize(rawCode) {
  const code = String(rawCode ?? "").trim();
  if (WILLARD_CODE_ALIASES[code]) return WILLARD_CODE_ALIASES[code];
  const base = extractBaseSizeCode(code);
  return base && SIZE_CODES.includes(base) ? base : null;
}

function fitmentVariantKey(rawCode) {
  const code = String(rawCode ?? "").trim().toUpperCase();
  const base = mapWillardCodeToSiteSize(code);
  if (!base) return null;

  if (code.endsWith("-AGM") || /AGM/.test(code.split(/[-/]/).pop() || "")) {
    return `${base}-AGM`;
  }
  return base;
}

function simplifyLabel(manufacturer, model) {
  const man = manufacturer.trim();
  const m = model.trim();

  const familyPatterns = [
    [/^Polo/i, "Polo"],
    [/^Golf/i, "Golf"],
    [/^T-Cross/i, "T-Cross"],
    [/^Tiguan/i, "Tiguan"],
    [/^Jetta/i, "Jetta"],
    [/^Vivo/i, "Polo Vivo"],
    [/^Grand [iI]10/i, "Grand i10"],
    [/^i10/i, "i10"],
    [/^i20/i, "i20"],
    [/^I 30/i, "i30"],
    [/^i30/i, "i30"],
    [/^Santa Fe/i, "Santa Fe"],
    [/^Santa\b/i, "Santa Fe"],
    [/^Grand Tourneo/i, "Grand Tourneo Connect"],
    [/^Tourneo Custom/i, "Tourneo Custom"],
    [/^Toareg/i, "Touareg"],
    [/^Touareg/i, "Touareg"],
    [/^IX\s*35/i, "ix35"],
    [/^Corolla/i, "Corolla"],
    [/^Yaris/i, "Yaris"],
    [/^Auris/i, "Auris"],
    [/^RAV4/i, "RAV4"],
    [/^GR Yaris/i, "GR Yaris"],
    [/^GR\b/i, "GR Yaris"],
    [/^Fortuner/i, "Fortuner"],
    [/^Hilux/i, "Hilux"],
    [/^Prado/i, "Prado"],
    [/^Fiesta/i, "Fiesta"],
    [/^Focus/i, "Focus"],
    [/^EcoSport/i, "EcoSport"],
    [/^Ecosport/i, "EcoSport"],
    [/^Ranger/i, "Ranger"],
    [/^Kuga/i, "Kuga"],
    [/^Mondeo/i, "Mondeo"],
    [/^Fusion/i, "Fusion"],
    [/^Swift/i, "Swift"],
    [/^Vitara/i, "Vitara"],
    [/^Jimny/i, "Jimny"],
    [/^Dzire/i, "Dzire"],
    [/^Tiggo/i, "Tiggo"],
    [/^H6/i, "H6"],
    [/^H5/i, "H5"],
    [/^C50/i, "C50"],
    [/^J[0-9]/i, (match) => match[0].toUpperCase() + match.slice(1)],
    [/^Elantra/i, "Elantra"],
    [/^Creta/i, "Creta"],
    [/^Tucson/i, "Tucson"],
    [/^XUV/i, "XUV"],
    [/^Scorpio/i, "Scorpio"],
    [/^Amarok/i, "Amarok"],
    [/^Land Cruiser/i, "Land Cruiser"],
    [/^Everest/i, "Everest"],
    [/^Caravelle/i, "Caravelle"],
    [/^T5/i, "T5 Transporter"],
    [/^CC/i, "CC"],
  ];

  for (const [pattern, label] of familyPatterns) {
    const match = m.match(pattern);
    if (match) {
      const family = typeof label === "function" ? label(match[0]) : label;
      return `${man} ${family}`;
    }
  }

  const firstWord = m.split(/\s+/)[0];
  return `${man} ${firstWord}`;
}

function scoreRow(year, vehicleType) {
  const y = parseInt(year, 10) || 0;
  if (y < 2015) return 0;
  let s = 1;
  if (y >= 2020) s += 3;
  else if (y >= 2018) s += 2;
  else s += 1;
  const vt = (vehicleType || "").toLowerCase();
  if (vt.includes("passenger") || vt.includes("suv")) s += 1;
  return s;
}

function buildFitments(rows) {
  /** @type {Record<string, Record<string, { manufacturer: string, model: string, label: string, score: number, years: Set<number> }>>} */
  const byVariant = {};

  for (const row of rows) {
    const manufacturer = (row.manufacturer || "").trim();
    const model = (row.model || "").trim();
    if (!manufacturer || !model || LEGACY_MODEL.test(model)) continue;

    const variant = fitmentVariantKey(row.battery_code);
    if (!variant) continue;

    const score = scoreRow(row.year, row.vehicle_type);
    if (score <= 0) continue;

    const year = parseInt(row.year, 10);
    const label = simplifyLabel(manufacturer, model);
    const key = label.toLowerCase();

    if (!byVariant[variant]) byVariant[variant] = {};
    const bucket = byVariant[variant];
    if (!bucket[key]) {
      bucket[key] = { manufacturer, model, label, score: 0, years: new Set() };
    }
    bucket[key].score += score;
    if (year > 0) bucket[key].years.add(year);
  }

  const result = {};

  for (const sizeCode of SIZE_CODES) {
    const standardKey = sizeCode;
    const agmKey = `${sizeCode}-AGM`;

    for (const variantKey of [standardKey, agmKey]) {
      const entries = Object.values(byVariant[variantKey] || {})
        .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
        .slice(0, 10)
        .map((e) => {
          const years = [...e.years].sort((a, b) => a - b);
          const minY = years[0];
          const maxY = years[years.length - 1];
          const yearRange =
            years.length === 0
              ? ""
              : minY === maxY
                ? String(minY)
                : `${minY}–${maxY}`;
          return {
            manufacturer: e.manufacturer,
            model: e.model,
            label: e.label,
            yearRange,
          };
        });

      if (entries.length) {
        result[variantKey] = {
          vehicles: entries,
          labels: entries.map((v) => v.label),
        };
      }
    }

    // Hub page: merge standard + AGM lists, preferring standard order
    const mergedLabels = [];
    const seen = new Set();
    for (const key of [standardKey, agmKey]) {
      for (const label of result[key]?.labels || []) {
        const norm = label.toLowerCase();
        if (!seen.has(norm)) {
          seen.add(norm);
          mergedLabels.push(label);
        }
      }
    }
    if (mergedLabels.length) {
      const mergedVehicles = [];
      const seenV = new Set();
      for (const key of [standardKey, agmKey]) {
        for (const v of result[key]?.vehicles || []) {
          const norm = v.label.toLowerCase();
          if (!seenV.has(norm)) {
            seenV.add(norm);
            mergedVehicles.push(v);
          }
        }
      }
      result[standardKey] = {
        vehicles: mergedVehicles.slice(0, 12),
        labels: mergedLabels.slice(0, 12),
      };
    }
  }

  return result;
}

function main() {
  const { rows, source } = loadCsv();
  const fitments = buildFitments(rows);
  const outPath = path.join(ROOT, "src/data/size-fitments.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source,
        rowCount: rows.length,
        fitments,
      },
      null,
      2
    )
  );
  console.log(`Wrote ${outPath}`);
  for (const code of SIZE_CODES) {
    const f = fitments[code];
    console.log(`  ${code}: ${f?.labels?.slice(0, 5).join(", ") || "none"}`);
  }
}

main();
