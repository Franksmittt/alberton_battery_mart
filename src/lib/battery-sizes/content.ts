import { getLocalAreaBySlug } from "@/data/local-areas";
import {
  brandDisplayName,
  type BatteryBrand,
} from "@/lib/products/brands";
import type { ProductCardData } from "@/data/products";
import {
  CLUSTER_SUBURB_SLUGS,
  type BatterySizeClusterConfig,
  type ClusterSuburb,
} from "@/lib/battery-sizes/types";
import { normalizeBrand } from "@/lib/products/brands";
import { getVehicleFitmentsForSize, getProductFitmentLabels } from "@/lib/battery-sizes/fitments";

const SUBURB_NAMES: Record<string, string> = {
  brackenhurst: "Brackenhurst",
  "new-redruth": "New Redruth",
  verwoerdpark: "Verwoerdpark",
  brackendowns: "Brackendowns",
  meyersdal: "Meyersdal",
  alberante: "Alberante",
  "new-market": "New Market",
  randhart: "Randhart",
};

const suburbSizeOverrides: Record<
  string,
  Partial<Pick<ClusterSuburb, "summary" | "roads" | "landmarks" | "vehicles" | "responseWindow">>
> = {
  "new-redruth": {
    responseWindow: "30–45 minutes",
    summary:
      "Our storefront suburb. Fastest dispatch with same-day stock from 28 St Columb Rd.",
    roads: ["St Columb Rd", "Voortrekker Rd", "Ring Road"],
    landmarks: ["Alberton Battery Mart storefront", "New Redruth business strip"],
  },
  meyersdal: {
    responseWindow: "40–55 minutes",
    summary:
      "Premium suburb with mixed commuter and SUV demand. We stock standard and performance batteries for modern vehicles.",
    roads: ["Meyersdal Blvd", "Kliprivier Dr"],
    landmarks: ["Meyersdal Eco Estate", "Local office parks"],
  },
  "new-market": {
    responseWindow: "45–60 minutes",
    summary:
      "Dense Alberton corridor with strong commuter demand for affordable replacements and fast mobile call-outs.",
    roads: ["Voortrekker Rd", "Du Plessis Rd"],
    landmarks: ["New Market area retail strip", "Alberton CBD access routes"],
  },
};

function buildSuburb(
  cluster: BatterySizeClusterConfig,
  slug: string,
  name: string
): ClusterSuburb {
  const local = getLocalAreaBySlug(slug);
  const override = suburbSizeOverrides[slug];
  const csvVehicles = getVehicleFitmentsForSize(cluster.code);
  const vehicles =
    override?.vehicles ||
    (csvVehicles.length
      ? csvVehicles.slice(0, 3)
      : local?.keyVehicles?.length
        ? local.keyVehicles
        : cluster.vehicleFitments.slice(0, 3));

  return {
    slug,
    name,
    responseWindow:
      override?.responseWindow || local?.responseWindow || "45–60 minutes",
    summary:
      override?.summary
        ? `${override.summary} We supply and fit ${cluster.code} batteries across ${name}.`
        : local?.areaSummary
          ? `${local.areaSummary} ${cluster.code} mobile fitment available.`
          : `Mobile ${cluster.code} battery supply and fitment across ${name}, Alberton.`,
    roads: override?.roads || local?.roads || ["Voortrekker Rd"],
    landmarks:
      override?.landmarks || local?.landmarks || [`${name} residential area`],
    vehicles,
  };
}

export function getClusterSuburbs(
  cluster: BatterySizeClusterConfig
): ClusterSuburb[] {
  return CLUSTER_SUBURB_SLUGS.map((slug) =>
    buildSuburb(cluster, slug, SUBURB_NAMES[slug] || slug)
  );
}

export function getClusterSuburb(
  cluster: BatterySizeClusterConfig,
  slug: string
): ClusterSuburb | undefined {
  return getClusterSuburbs(cluster).find((suburb) => suburb.slug === slug);
}

export function brandPageSlug(brand: BatteryBrand, code: string): string {
  const slugMap: Record<BatteryBrand, string> = {
    willard: "willard",
    exide: "exide",
    eco_plus: "eco-plus",
    power_plus: "power-plus",
  };
  return `${slugMap[brand]}-${code}`;
}

export function parseBrandPageSlug(
  segment: string,
  code: string
): BatteryBrand | null {
  const candidates: Array<[string, BatteryBrand]> = [
    [`willard-${code}`, "willard"],
    [`exide-${code}`, "exide"],
    [`eco-plus-${code}`, "eco_plus"],
    [`power-plus-${code}`, "power_plus"],
  ];
  const match = candidates.find(([slug]) => slug === segment);
  return match ? match[1] : null;
}

export function getPrimaryProductForBrand(
  products: ProductCardData[],
  brand: BatteryBrand
): ProductCardData | undefined {
  const standard = products.filter(
    (product) =>
      normalizeBrand(product.brandName) === brand &&
      product.category === "Standard Automotive"
  );
  if (standard.length) return standard[0];
  return products.find((product) => normalizeBrand(product.brandName) === brand);
}

function fitmentExamples(cluster: BatterySizeClusterConfig, count = 3): string {
  const csv = getVehicleFitmentsForSize(cluster.code);
  const examples = csv.length ? csv : cluster.vehicleFitments;
  return examples.slice(0, count).join(", ");
}

export function getHubFaq(
  cluster: BatterySizeClusterConfig,
  fittedFromPrice: string,
  brandSummary: string
) {
  const { code } = cluster;
  return [
    {
      question: `What is a ${code} car battery?`,
      answer: `${code} is a common South African automotive battery code. It is a ${cluster.specs.voltage} maintenance-free battery typically around ${cluster.specs.ahRange} with dimensions of roughly ${cluster.specs.dimensions}, used on vehicles such as ${fitmentExamples(cluster)}.`,
    },
    {
      question: `${code} battery price in Alberton?`,
      answer: `At Alberton Battery Mart, ${code} batteries start from ${fittedFromPrice} with scrap exchange, free fitment, free alternator testing, and warranty registration. In stock: ${brandSummary}.`,
    },
    {
      question: `${code} battery price Midas vs Alberton Battery Mart?`,
      answer:
        "Midas and Goldwagen usually sell shelf-price batteries without mobile fitment or charging-system diagnostics. Our fitted price includes on-site testing, professional installation, warranty registration, and old-battery disposal.",
    },
    {
      question: `Do you stock ${code} batteries near me in Alberton?`,
      answer: `Yes. We keep ${code} batteries in stock at 28 St Columb Rd, New Redruth, and dispatch mobile fitment to Brackenhurst, Meyersdal, Brackendowns, Verwoerdpark, Randhart, and surrounding suburbs.`,
    },
    {
      question: `Do you offer mobile ${code} battery fitment?`,
      answer: `Yes. Our mobile team covers Alberton with typical response in 45–60 minutes. We bring the correct ${code} battery, test alternator and starter health, fit on-site, and register your warranty.`,
    },
    {
      question: `${code} battery trade-in discounts?`,
      answer:
        "Our listed prices include scrap exchange. Bring your old battery and we handle core disposal as part of the replacement — no hidden environmental fees.",
    },
  ];
}

export function getSuburbFaqs(
  cluster: BatterySizeClusterConfig,
  suburb: ClusterSuburb,
  fittedFromPrice: string,
  brandSummary: string
) {
  const { code } = cluster;
  return [
    {
      question: `${code} car battery price in ${suburb.name}?`,
      answer: `${code} batteries start from ${fittedFromPrice} fitted with scrap exchange at Alberton Battery Mart. Mobile fitment to ${suburb.name} is available with typical response in ${suburb.responseWindow}. In stock: ${brandSummary}.`,
    },
    {
      question: `Do you deliver and fit ${code} batteries in ${suburb.name}?`,
      answer: `Yes. We dispatch a mobile technician to ${suburb.name} with the correct ${code} battery, perform free alternator testing, and complete professional fitment on-site.`,
    },
    {
      question: `Cheapest ${code} battery near ${suburb.name}?`,
      answer:
        "Shelf-price batteries can look cheaper but often exclude fitment, diagnostics, and warranty registration. Our fitted price includes testing, installation, and warranty support.",
    },
    {
      question: `Which cars in ${suburb.name} use a ${code} battery?`,
      answer: `Common ${suburb.name} vehicles on ${code} include ${suburb.vehicles.join(", ")}. We confirm fitment before replacement.`,
    },
  ];
}

export function getBrandFaq(
  cluster: BatterySizeClusterConfig,
  product: ProductCardData
) {
  const brand = brandDisplayName(normalizeBrand(product.brandName) || "willard");
  return [
    {
      question: `${brand} ${cluster.code} battery price in Alberton?`,
      answer: `${product.name} is ${product.sellingPrice_OUTPUT} at Alberton Battery Mart with scrap exchange, free fitment, free alternator testing, and a ${product.warrantyMonths}-month warranty.`,
    },
    {
      question: `${brand} ${cluster.code} specifications?`,
      answer: `${product.name} is a ${cluster.specs.voltage} ${product.ahCapacity}Ah maintenance-free battery with ${product.cca} CCA. Tray size ${cluster.specs.dimensions}.`,
    },
    {
      question: `Why choose ${brand} ${cluster.code}?`,
      answer: `${getProductFitmentLabels(product)}. We stock ${product.name} for counter sales and mobile fitment across Alberton.`,
    },
  ];
}

export function getPriceRows(
  cluster: BatterySizeClusterConfig,
  products: ProductCardData[],
  fittedFromPrice: string
) {
  const willard = getPrimaryProductForBrand(products, "willard");
  const exide = getPrimaryProductForBrand(products, "exide");
  const ecoPlus = getPrimaryProductForBrand(products, "eco_plus");
  const powerPlus = getPrimaryProductForBrand(products, "power_plus");
  const ranges = cluster.shelfPriceRanges;

  if (cluster.valueTierOnly) {
    return [
      {
        retailer: "Alberton Battery Mart (fitted)",
        col1: ecoPlus?.sellingPrice_OUTPUT || fittedFromPrice,
        col2: powerPlus?.sellingPrice_OUTPUT || fittedFromPrice,
        col1Label: "Eco Plus",
        col2Label: "Power Plus",
        notes: "Includes free fitment, alternator test, mobile call-out available",
      },
      {
        retailer: "Midas (battery only, shelf)",
        col1: ranges?.midas || "Varies",
        col2: ranges?.midas || "Varies",
        col1Label: "Eco Plus",
        col2Label: "Power Plus",
        notes: "Battery only — fitment and testing extra",
      },
      {
        retailer: "Goldwagen (battery only, shelf)",
        col1: ranges?.goldwagen || "Varies",
        col2: ranges?.goldwagen || "Varies",
        col1Label: "Eco Plus",
        col2Label: "Power Plus",
        notes: "Shelf price varies by branch",
      },
    ];
  }

  return [
    {
      retailer: "Alberton Battery Mart (fitted)",
      col1: willard?.sellingPrice_OUTPUT || fittedFromPrice,
      col2: exide?.sellingPrice_OUTPUT || fittedFromPrice,
      col1Label: `Willard ${cluster.code}`,
      col2Label: `Exide ${cluster.code}`,
      notes: "Includes free fitment, alternator test, mobile call-out available",
    },
    {
      retailer: "Midas (battery only, shelf)",
      col1: ranges?.midas || "Varies",
      col2: ranges?.midas || "Varies",
      col1Label: `Willard ${cluster.code}`,
      col2Label: `Exide ${cluster.code}`,
      notes: "Battery only — fitment, testing, and warranty registration extra",
    },
    {
      retailer: "Goldwagen (battery only, shelf)",
      col1: ranges?.goldwagen || "Varies",
      col2: ranges?.goldwagen || "Varies",
      col1Label: `Willard ${cluster.code}`,
      col2Label: `Exide ${cluster.code}`,
      notes: "Shelf price varies by branch and promotions",
    },
    {
      retailer: "Makro / online retailers",
      col1: ranges?.online || "Varies",
      col2: ranges?.online || "Varies",
      col1Label: `Willard ${cluster.code}`,
      col2Label: `Exide ${cluster.code}`,
      notes: "No local mobile fitment or BMS coding support in Alberton",
    },
  ];
}

export function summarizeBrands(products: ProductCardData[]): string {
  if (!products.length) return "contact us for stock";
  return products.map((product) => product.name).join(", ");
}

export function getSpecsFaq(cluster: BatterySizeClusterConfig) {
  const { code, specs } = cluster;
  return [
    {
      question: `${code} battery capacity (Ah)?`,
      answer: `Most ${code} batteries in our catalog are ${specs.ahRange} depending on brand and technology.`,
    },
    {
      question: `${code} battery CCA rating?`,
      answer: `Typical ${code} batteries offer ${specs.ccaRange} cold cranking amps.`,
    },
    {
      question: `Is ${code} maintenance-free?`,
      answer: `Yes. ${code} batteries sold at Alberton Battery Mart are ${specs.technology} units.`,
    },
  ];
}

export function getDimensionsFaq(cluster: BatterySizeClusterConfig) {
  const { code, specs } = cluster;
  return [
    {
      question: `${code} battery dimensions?`,
      answer: `Standard ${code} tray size is approximately ${specs.dimensions} (length × width × height).`,
    },
    {
      question: `${code} battery terminal layout?`,
      answer: specs.terminalLayout,
    },
    {
      question: `Will ${code} fit my car?`,
      answer: `Fitment depends on tray size, hold-down, and terminal orientation. Common ${code} vehicles in our fitment database include ${fitmentExamples(cluster, 4)}. We confirm before fitment.`,
    },
  ];
}
