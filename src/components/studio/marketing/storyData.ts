import type { ProductCardData } from "@/data/products";
// Type-only import keeps this module client-safe (no products-storage / fs).

export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

export type StoryTemplateId =
  | "industrial"
  | "modern"
  | "editorial"
  | "diagonal"
  | "power"
  | "essentials"
  | "dark-ui"
  | "spec-sheet";

export type StoryProductView = {
  id: number;
  title: string;
  brand: string;
  sku: string;
  category: string;
  price: string;
  capacity: string;
  cranking: string;
  warranty: string;
  tech: string;
  fits: string;
  imageUrl: string;
  badge: string;
  phone: string;
  whatsappLabel: string;
};

export const STORY_TEMPLATES: Array<{
  id: StoryTemplateId;
  name: string;
  thesis: string;
}> = [
  {
    id: "industrial",
    name: "Industrial Beast",
    thesis: "Charcoal wedge · Oswald · red footer CTA",
  },
  {
    id: "modern",
    name: "Modern Tech",
    thesis: "Gradient glass · Montserrat · pill tags",
  },
  {
    id: "editorial",
    name: "Editorial Grid",
    thesis: "Inter · top photo · red price bar",
  },
  {
    id: "diagonal",
    name: "Diagonal Slash",
    thesis: "Teko · red slash · huge price",
  },
  {
    id: "power",
    name: "Power Core",
    thesis: "Poppins · circular product · white price pill",
  },
  {
    id: "essentials",
    name: "Power Essentials",
    thesis: "White premium · light Montserrat · red CTA",
  },
  {
    id: "dark-ui",
    name: "Dark Mode UI",
    thesis: "Charcoal UI · thin title · red action bar",
  },
  {
    id: "spec-sheet",
    name: "Spec Sheet",
    thesis: "White data list · huge thin price",
  },
];

function detectTech(product: ProductCardData): string {
  const sku = product.sku.toUpperCase();
  if (product.isAGM || sku.includes("AGM")) return "AGM";
  if (sku.includes("EFB")) return "EFB";
  if (product.category === "Deep Cycle") return "Deep Cycle";
  if (product.category === "Motorcycle") return "Powersport";
  if (product.category === "Truck & Commercial") return "Commercial";
  return "Lead Acid";
}

function detectBadge(product: ProductCardData): string {
  if (product.category === "Performance AGM/EFB") return "START/STOP READY";
  if (product.category === "Truck & Commercial") return "FLEET / TRUCK";
  if (product.category === "Motorcycle") return "MOTORCYCLE";
  if (product.category === "Deep Cycle") return "SOLAR / INVERTER";
  return "IN STOCK";
}

export function proxiedImageUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return "";
  if (pathOrUrl.startsWith("data:") || pathOrUrl.startsWith("blob:")) {
    return pathOrUrl;
  }
  if (pathOrUrl.startsWith("/")) {
    return pathOrUrl;
  }
  return `/api/proxy-image?url=${encodeURIComponent(pathOrUrl)}`;
}

export function buildStoryView(product: ProductCardData): StoryProductView {
  return {
    id: product.id,
    title: product.name,
    brand: product.brandName,
    sku: product.sku,
    category: product.category,
    price: product.sellingPrice_OUTPUT,
    capacity: `${product.ahCapacity}Ah`,
    cranking: product.cca > 0 ? `${product.cca} CCA` : "N/A",
    warranty: `${product.warrantyMonths}-Month Warranty`,
    tech: detectTech(product),
    fits: product.popularFits || "Ask us to confirm fitment",
    imageUrl: proxiedImageUrl(product.imagePath),
    badge: detectBadge(product),
    phone: "010 109 6211",
    whatsappLabel: "WhatsApp Quote",
  };
}
