import { getAllProducts, type ProductCardData } from "@/data/products";
import {
  getFittedPriceLabel,
  getProductsBySizeCode,
} from "@/lib/products/by-size";

export const WILLARD_619_PRODUCT_ID = 101;
export const EXIDE_619CE_PRODUCT_ID = 118;
export const SIZE_619 = "619";

export async function getWillard619(): Promise<ProductCardData | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.id === WILLARD_619_PRODUCT_ID);
}

export async function getExide619CE(): Promise<ProductCardData | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.id === EXIDE_619CE_PRODUCT_ID);
}

/** All catalog products matching battery size 619 (all brands). */
export async function get619CatalogProducts(): Promise<ProductCardData[]> {
  return getProductsBySizeCode(SIZE_619);
}

export function get619FittedPriceLabel(products: ProductCardData[]): string {
  return getFittedPriceLabel(products);
}
