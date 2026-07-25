import type { ProductCardData } from "@/data/products";

export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

export type StoryTemplateId =
  | "clean"
  | "brand"
  | "cinema"
  | "specs"
  | "callout";

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
    id: "clean",
    name: "Clean Special",
    thesis: "White card · big price · clear specs",
  },
  {
    id: "brand",
    name: "Brand Red",
    thesis: "ABM red field · high urgency · phone CTA",
  },
  {
    id: "cinema",
    name: "Cinema Dark",
    thesis: "Full-bleed product · desire first",
  },
  {
    id: "specs",
    name: "Spec Sheet",
    thesis: "Technical trust · Ah / CCA / warranty",
  },
  {
    id: "callout",
    name: "Mobile Callout",
    thesis: "We come to you · Alberton dispatch",
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
