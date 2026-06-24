import { getAllProducts, type ProductCardData } from "@/data/products";
import { formatProductPrice, parsePriceAmount } from "@/lib/formatting";

export const WILLARD_619_PRODUCT_ID = 101;
export const EXIDE_619CE_PRODUCT_ID = 118;

export async function getWillard619(): Promise<ProductCardData | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.id === WILLARD_619_PRODUCT_ID);
}

export async function getExide619CE(): Promise<ProductCardData | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.id === EXIDE_619CE_PRODUCT_ID);
}

export async function get619CatalogProducts(): Promise<ProductCardData[]> {
  const products = await getAllProducts();
  return products.filter(
    (product) =>
      product.id === WILLARD_619_PRODUCT_ID || product.id === EXIDE_619CE_PRODUCT_ID
  );
}

export function get619FittedPriceLabel(products: ProductCardData[]): string {
  if (!products.length) return "R 0.00";
  const lowest = Math.min(
    ...products.map((product) => parsePriceAmount(product.sellingPrice_OUTPUT))
  );
  return formatProductPrice(lowest);
}
