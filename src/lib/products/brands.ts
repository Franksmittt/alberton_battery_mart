export type BatteryBrand = "willard" | "exide" | "eco_plus" | "power_plus";

const BRAND_DISPLAY: Record<BatteryBrand, string> = {
  willard: "Willard",
  exide: "Exide",
  eco_plus: "Eco Plus",
  power_plus: "Power Plus",
};

const BRAND_ALIASES: Record<string, BatteryBrand> = {
  willard: "willard",
  exide: "exide",
  "eco plus": "eco_plus",
  ecoplus: "eco_plus",
  "eco-plus": "eco_plus",
  "power plus": "power_plus",
  powerplus: "power_plus",
  "power-plus": "power_plus",
};

const BRAND_TIER_ORDER: Record<BatteryBrand, number> = {
  willard: 0,
  exide: 1,
  eco_plus: 2,
  power_plus: 3,
};

export function normalizeBrand(brandName: string): BatteryBrand | null {
  const key = brandName.trim().toLowerCase();
  if (key === "willard") return "willard";
  if (key === "exide") return "exide";
  if (key === "eco plus") return "eco_plus";
  if (key === "power plus") return "power_plus";
  return null;
}

export function brandDisplayName(brand: BatteryBrand): string {
  return BRAND_DISPLAY[brand];
}

export function findBrandFromQuery(query: string): BatteryBrand | null {
  const normalized = query.toLowerCase().trim();
  for (const [alias, brand] of Object.entries(BRAND_ALIASES)) {
    if (normalized.includes(alias)) {
      return brand;
    }
  }
  return null;
}

export function compareBrandTier(a: BatteryBrand, b: BatteryBrand): number {
  return BRAND_TIER_ORDER[a] - BRAND_TIER_ORDER[b];
}
