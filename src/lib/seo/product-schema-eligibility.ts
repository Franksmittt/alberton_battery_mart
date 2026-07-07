import type { ProductCardData } from "@/data/products";
import { priceForSchema } from "@/lib/formatting";

/** Products need a priced offer for Google Product rich results. */
export function isProductSchemaEligible(
  product: Pick<ProductCardData, "sellingPrice_OUTPUT" | "ahCapacity" | "cca">
): boolean {
  const price = priceForSchema(product.sellingPrice_OUTPUT);
  if (!price || Number.parseFloat(price) <= 0) {
    return false;
  }
  if (product.ahCapacity === 0 && product.cca === 0) {
    return false;
  }
  return true;
}
