/**
 * Extract the canonical 3-digit battery size code from a SKU.
 * Examples: 619 → 619, 619CE → 619, 628/9 → 628, 652PS → 652
 */
export function extractBaseSizeCode(sku: string): string | null {
  const cleaned = sku.trim().toUpperCase().replace(/\s+/g, "");
  const slashMatch = cleaned.match(/^(\d{3})\/(\d+)/);
  if (slashMatch) {
    return slashMatch[1];
  }
  const digitMatch = cleaned.match(/^(\d{3})/);
  return digitMatch ? digitMatch[1] : null;
}

export function normalizeSizeCode(sizeCode: string): string {
  const extracted = extractBaseSizeCode(sizeCode);
  return extracted ?? sizeCode.trim().toUpperCase();
}

export function productMatchesSizeCode(sku: string, sizeCode: string): boolean {
  const productSize = extractBaseSizeCode(sku);
  const querySize = normalizeSizeCode(sizeCode);
  if (!productSize || !querySize) return false;
  return productSize === querySize;
}

export function isKnownSizeCode(query: string): boolean {
  return /^\d{3}(\/\d+)?[a-z]*$/i.test(query.trim());
}
