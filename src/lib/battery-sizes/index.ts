import type { BatteryBrand } from "@/lib/products/brands";

export const TARGET_SIZE_CODES = [
  "619",
  "628",
  "646",
  "652",
  "668",
  "658",
  "657",
  "616",
] as const;

export type TargetSizeCode = (typeof TARGET_SIZE_CODES)[number];

export type BatterySizeConfig = {
  code: TargetSizeCode;
  /** SEO hub path when a size cluster exists, e.g. /619-car-battery */
  hubPath?: string;
  /** Brands we expect to stock for this size (report compares expected vs catalog) */
  brands: BatteryBrand[];
};

export const BATTERY_SIZE_CONFIGS: BatterySizeConfig[] = [
  {
    code: "619",
    hubPath: "/619-car-battery",
    brands: ["willard", "exide", "eco_plus", "power_plus"],
  },
  {
    code: "628",
    brands: ["willard", "exide", "eco_plus", "power_plus"],
  },
  {
    code: "646",
    brands: ["willard", "exide", "eco_plus", "power_plus"],
  },
  {
    code: "652",
    brands: ["willard", "exide", "eco_plus", "power_plus"],
  },
  {
    code: "668",
    brands: ["willard", "exide", "eco_plus", "power_plus"],
  },
  {
    code: "658",
    brands: ["willard", "exide", "eco_plus", "power_plus"],
  },
  {
    code: "657",
    brands: ["eco_plus", "power_plus"],
  },
  {
    code: "616",
    brands: ["eco_plus", "power_plus"],
  },
];

export function getBatterySizeConfig(
  code: string
): BatterySizeConfig | undefined {
  const normalized = code.trim();
  return BATTERY_SIZE_CONFIGS.find((config) => config.code === normalized);
}

export function hasSeoHub(code: string): boolean {
  return Boolean(getBatterySizeConfig(code)?.hubPath);
}
