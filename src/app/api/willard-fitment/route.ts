import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getAllProducts } from "@/data/products";

type FitmentRow = {
  vehicle_type: string;
  manufacturer: string;
  year: string;
  model: string;
  battery_code: string;
  replacement_type: string;
  technology: string;
  description: string;
  image_link: string;
};

type BatteryRecommendation = {
  battery_code: string;
  replacement_type: string;
  technology: string;
  description: string;
  image_link: string;
  brand_options: BrandOption[];
};

type BrandOption = {
  id: number;
  name: string;
  brand_name: string;
  sku: string;
  category: string;
  price: string;
  warranty_months: number;
  ah_capacity: number;
  cca: number;
  technology: string;
  product_url: string;
  image_path: string;
};

type FitmentIndex = {
  vehicleTypes: string[];
  manufacturersByVehicleType: Map<string, string[]>;
  yearsByVehicleTypeManufacturer: Map<string, string[]>;
  modelsByVehicleTypeManufacturerYear: Map<string, string[]>;
  batteriesBySelection: Map<string, BatteryRecommendation[]>;
};

type CacheState = {
  mtimeMs: number;
  index: FitmentIndex;
};

let fitmentCache: CacheState | null = null;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function compositeKey(...parts: string[]) {
  return parts.map((part) => normalize(part)).join("|");
}

function extractTechnology(value: string) {
  const upper = value.toUpperCase();
  if (upper.includes("AGM")) return "AGM";
  if (upper.includes("EFB")) return "EFB";
  return "Standard";
}

function normalizeSlashCode(rawCode: string) {
  const parts = rawCode.split("/");
  if (parts.length !== 2) return rawCode;
  if (parts[0].length >= 3 && parts[1].length >= 3) {
    return parts.sort((a, b) => Number(a) - Number(b)).join("/");
  }
  return rawCode;
}

function toBaseSizeCode(value: string) {
  const cleaned = value.toUpperCase().replace(/\s+/g, "").replace(/-/g, "");
  const matched = cleaned.match(/^\d+(?:\/\d+)?/);
  if (!matched) return cleaned;
  return normalizeSlashCode(matched[0]);
}

function technologyRank(technology: string) {
  if (technology === "Standard") return 0;
  if (technology === "EFB") return 1;
  if (technology === "AGM") return 2;
  return 3;
}

async function getBrandOptionsByBaseCode() {
  const products = await getAllProducts();
  const map = new Map<string, BrandOption[]>();

  for (const product of products) {
    const baseCode = toBaseSizeCode(product.sku);
    if (!baseCode) continue;
    const option: BrandOption = {
      id: product.id,
      name: product.name,
      brand_name: product.brandName,
      sku: product.sku,
      category: product.category,
      price: product.sellingPrice_OUTPUT,
      warranty_months: product.warrantyMonths,
      ah_capacity: product.ahCapacity,
      cca: product.cca,
      technology: extractTechnology(product.sku),
      product_url: `/products/size/${product.sku.toLowerCase()}`,
      image_path: product.imagePath,
    };
    if (!map.has(baseCode)) map.set(baseCode, []);
    map.get(baseCode)?.push(option);
  }

  map.forEach((options, key) => {
    map.set(
      key,
      options.sort((a, b) => {
        const techCompare = technologyRank(a.technology) - technologyRank(b.technology);
        if (techCompare !== 0) return techCompare;
        const brandCompare = a.brand_name.localeCompare(b.brand_name);
        if (brandCompare !== 0) return brandCompare;
        return a.name.localeCompare(b.name);
      })
    );
  });

  return map;
}

function parseCsv(content: string): FitmentRow[] {
  const rows: string[][] = [];
  let currentCell = "";
  let currentRow: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      currentRow.push(currentCell);
      currentCell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }
      currentRow.push(currentCell);
      currentCell = "";
      if (currentRow.some((value) => value.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      continue;
    }

    currentCell += char;
  }

  if (currentCell.length || currentRow.length) {
    currentRow.push(currentCell);
    if (currentRow.some((value) => value.trim().length > 0)) {
      rows.push(currentRow);
    }
  }

  if (!rows.length) return [];

  const [header, ...dataRows] = rows;
  const headerIndex = new Map<string, number>();
  header.forEach((name, idx) => headerIndex.set(name.trim(), idx));

  const requiredFields: Array<keyof FitmentRow> = [
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

  return dataRows
    .map((row) => {
      const entry = {} as FitmentRow;
      requiredFields.forEach((field) => {
        const idx = headerIndex.get(field);
        entry[field] = idx === undefined ? "" : (row[idx] || "").trim();
      });
      return entry;
    })
    .filter(
      (row) =>
        row.vehicle_type && row.manufacturer && row.year && row.model && row.battery_code
    );
}

function sortYearsDesc(values: Set<string>) {
  return Array.from(values).sort((a, b) => Number(b) - Number(a));
}

function sortAlpha(values: Set<string>) {
  return Array.from(values).sort((a, b) => a.localeCompare(b));
}

function buildIndex(
  rows: FitmentRow[],
  brandOptionsByBaseCode: Map<string, BrandOption[]>
): FitmentIndex {
  const vehicleTypeSet = new Set<string>();
  const manufacturersMap = new Map<string, Set<string>>();
  const yearsMap = new Map<string, Set<string>>();
  const modelsMap = new Map<string, Set<string>>();
  const batteriesMap = new Map<string, Map<string, BatteryRecommendation>>();

  for (const row of rows) {
    vehicleTypeSet.add(row.vehicle_type);

    const vtKey = compositeKey(row.vehicle_type);
    const vtManuKey = compositeKey(row.vehicle_type, row.manufacturer);
    const vtManuYearKey = compositeKey(row.vehicle_type, row.manufacturer, row.year);
    const fullKey = compositeKey(row.vehicle_type, row.manufacturer, row.year, row.model);

    if (!manufacturersMap.has(vtKey)) manufacturersMap.set(vtKey, new Set<string>());
    manufacturersMap.get(vtKey)?.add(row.manufacturer);

    if (!yearsMap.has(vtManuKey)) yearsMap.set(vtManuKey, new Set<string>());
    yearsMap.get(vtManuKey)?.add(row.year);

    if (!modelsMap.has(vtManuYearKey)) modelsMap.set(vtManuYearKey, new Set<string>());
    modelsMap.get(vtManuYearKey)?.add(row.model);

    if (!batteriesMap.has(fullKey)) {
      batteriesMap.set(fullKey, new Map<string, BatteryRecommendation>());
    }
    const dedupeKey = compositeKey(
      row.battery_code,
      row.replacement_type,
      row.technology,
      row.image_link
    );
    batteriesMap.get(fullKey)?.set(dedupeKey, {
      battery_code: row.battery_code,
      replacement_type: row.replacement_type,
      technology: row.technology,
      description: row.description,
      image_link: row.image_link,
      brand_options: brandOptionsByBaseCode.get(toBaseSizeCode(row.battery_code)) || [],
    });
  }

  const manufacturersByVehicleType = new Map<string, string[]>();
  manufacturersMap.forEach((values, key) => {
    manufacturersByVehicleType.set(key, sortAlpha(values));
  });

  const yearsByVehicleTypeManufacturer = new Map<string, string[]>();
  yearsMap.forEach((values, key) => {
    yearsByVehicleTypeManufacturer.set(key, sortYearsDesc(values));
  });

  const modelsByVehicleTypeManufacturerYear = new Map<string, string[]>();
  modelsMap.forEach((values, key) => {
    modelsByVehicleTypeManufacturerYear.set(key, sortAlpha(values));
  });

  const batteriesBySelection = new Map<string, BatteryRecommendation[]>();
  batteriesMap.forEach((values, key) => {
    batteriesBySelection.set(
      key,
      Array.from(values.values()).sort((a, b) => a.battery_code.localeCompare(b.battery_code))
    );
  });

  return {
    vehicleTypes: sortAlpha(vehicleTypeSet),
    manufacturersByVehicleType,
    yearsByVehicleTypeManufacturer,
    modelsByVehicleTypeManufacturerYear,
    batteriesBySelection,
  };
}

async function getFitmentIndex() {
  const csvPath = path.join(process.cwd(), "willard_battery_database.csv");
  const stat = await fs.stat(csvPath);

  if (fitmentCache && fitmentCache.mtimeMs === stat.mtimeMs) {
    return fitmentCache.index;
  }

  const content = await fs.readFile(csvPath, "utf-8");
  const parsed = parseCsv(content);
  const brandOptionsByBaseCode = await getBrandOptionsByBaseCode();
  const index = buildIndex(parsed, brandOptionsByBaseCode);
  fitmentCache = { mtimeMs: stat.mtimeMs, index };
  return index;
}

export async function GET(request: NextRequest) {
  try {
    const index = await getFitmentIndex();
    const params = request.nextUrl.searchParams;
    const level = normalize(params.get("level") || "");

    if (level === "vehicle-types") {
      return NextResponse.json({ items: index.vehicleTypes });
    }

    const vt = params.get("vehicleType") || "";
    const manufacturer = params.get("manufacturer") || "";
    const year = params.get("year") || "";
    const model = params.get("model") || "";

    if (level === "manufacturers") {
      const key = compositeKey(vt);
      return NextResponse.json({ items: index.manufacturersByVehicleType.get(key) || [] });
    }

    if (level === "years") {
      const key = compositeKey(vt, manufacturer);
      return NextResponse.json({
        items: index.yearsByVehicleTypeManufacturer.get(key) || [],
      });
    }

    if (level === "models") {
      const key = compositeKey(vt, manufacturer, year);
      return NextResponse.json({
        items: index.modelsByVehicleTypeManufacturerYear.get(key) || [],
      });
    }

    if (level === "batteries") {
      const key = compositeKey(vt, manufacturer, year, model);
      return NextResponse.json({
        items: index.batteriesBySelection.get(key) || [],
      });
    }

    return NextResponse.json(
      {
        error:
          "Invalid level. Use: vehicle-types, manufacturers, years, models, batteries.",
      },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          "Could not load fitment data. Ensure willard_battery_database.csv exists in repo root.",
        detail: error?.message || "unknown error",
      },
      { status: 500 }
    );
  }
}
