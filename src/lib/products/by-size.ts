import { getAllProducts, type ProductCardData } from "@/data/products";
import { formatProductPrice, parsePriceAmount } from "@/lib/formatting";
import {
  compareBrandTier,
  findBrandFromQuery,
  normalizeBrand,
  type BatteryBrand,
} from "@/lib/products/brands";
import {
  isKnownSizeCode,
  normalizeSizeCode,
  productMatchesSizeCode,
} from "@/lib/products/size-matching";
import { TARGET_SIZE_CODES } from "@/lib/battery-sizes";

export function sortProductsByBrandTier(
  products: ProductCardData[]
): ProductCardData[] {
  return [...products].sort((a, b) => {
    const brandA = normalizeBrand(a.brandName);
    const brandB = normalizeBrand(b.brandName);
    if (brandA && brandB && brandA !== brandB) {
      return compareBrandTier(brandA, brandB);
    }
    const priceA = parsePriceAmount(a.sellingPrice_OUTPUT);
    const priceB = parsePriceAmount(b.sellingPrice_OUTPUT);
    if (priceA !== priceB) return priceA - priceB;
    return a.name.localeCompare(b.name);
  });
}

export function getFittedPriceLabel(products: ProductCardData[]): string {
  if (!products.length) return "R 0.00";
  const lowest = Math.min(
    ...products.map((product) => parsePriceAmount(product.sellingPrice_OUTPUT))
  );
  return formatProductPrice(lowest);
}

export async function getProductsBySizeCode(
  sizeCode: string
): Promise<ProductCardData[]> {
  const products = await getAllProducts();
  const normalized = normalizeSizeCode(sizeCode);
  const matched = products.filter((product) =>
    productMatchesSizeCode(product.sku, normalized)
  );
  return sortProductsByBrandTier(matched);
}

export function getProductsBySizeCodeSync(
  products: ProductCardData[],
  sizeCode: string
): ProductCardData[] {
  const normalized = normalizeSizeCode(sizeCode);
  const matched = products.filter((product) =>
    productMatchesSizeCode(product.sku, normalized)
  );
  return sortProductsByBrandTier(matched);
}

type ParsedSearchQuery = {
  sizeCode?: string;
  brand?: BatteryBrand;
  text?: string;
};

export function parseSearchQuery(query: string): ParsedSearchQuery {
  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();

  if (isKnownSizeCode(trimmed)) {
    return { sizeCode: normalizeSizeCode(trimmed) };
  }

  const brand = findBrandFromQuery(lower);
  const sizeMatch = lower.match(/\b(\d{3})\b/);
  const sizeCode = sizeMatch?.[1];

  if (
    sizeCode &&
    (TARGET_SIZE_CODES as readonly string[]).includes(sizeCode)
  ) {
    return { sizeCode, brand: brand ?? undefined };
  }

  if (brand) {
    return { brand };
  }

  return { text: lower };
}

export function searchProducts(
  allProducts: ProductCardData[],
  query: string
): ProductCardData[] {
  const parsed = parseSearchQuery(query);

  if (parsed.sizeCode) {
    let results = getProductsBySizeCodeSync(allProducts, parsed.sizeCode);
    if (parsed.brand) {
      results = results.filter(
        (product) => normalizeBrand(product.brandName) === parsed.brand
      );
    }
    return results;
  }

  if (parsed.brand) {
    return sortProductsByBrandTier(
      allProducts.filter(
        (product) => normalizeBrand(product.brandName) === parsed.brand
      )
    );
  }

  const text = parsed.text ?? query.toLowerCase().trim();
  return sortProductsByBrandTier(
    allProducts.filter(
      (product) =>
        product.sku.toLowerCase().includes(text) ||
        product.name.toLowerCase().includes(text) ||
        product.brandName.toLowerCase().includes(text)
    )
  );
}
