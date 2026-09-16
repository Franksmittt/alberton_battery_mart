const SITE_SUFFIX = " | Alberton Battery Mart";
const TRAILING_SITE_SUFFIX = /(?:\s*\|\s*Alberton Battery Mart)+$/i;

/**
 * Collapse duplicated " | Alberton Battery Mart" suffixes and add the brand
 * once when the title does not already name the business.
 */
export function normalizeDocumentTitle(title: string): string {
  const cleaned = title.replace(/\s+/g, " ").trim();
  const withoutTrailing = cleaned.replace(TRAILING_SITE_SUFFIX, "").trim();
  if (/alberton battery mart/i.test(withoutTrailing)) {
    return withoutTrailing;
  }
  return `${withoutTrailing}${SITE_SUFFIX}`;
}

export function metadataTitle(title: string): { absolute: string } {
  return { absolute: normalizeDocumentTitle(title) };
}

/**
 * Returns the exact string used in <title> and WebPage JSON-LD name.
 * Pass the page title without the site suffix when using the root layout template.
 */
export function buildPageTitle(title: string, options?: { withSiteSuffix?: boolean }): string {
  const withSiteSuffix = options?.withSiteSuffix ?? false;
  if (withSiteSuffix) {
    return normalizeDocumentTitle(title);
  }
  return title;
}

/** Strip HTML/markup for JSON-LD name fields */
export function pageTitleForSchema(title: string): string {
  return normalizeDocumentTitle(title.replace(/<[^>]+>/g, ""));
}
