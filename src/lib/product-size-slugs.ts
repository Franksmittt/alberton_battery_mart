export function productSizeSlug(sku: string): string {
  return sku
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function productSizeMatchesSlug(sku: string, slug: string): boolean {
  const normalizedSlug = productSizeSlug(slug);

  return productSizeSlug(sku) === normalizedSlug;
}
