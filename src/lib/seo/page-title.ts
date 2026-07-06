const SITE_SUFFIX = " | Alberton Battery Mart";

/**
 * Returns the exact string used in <title> and WebPage JSON-LD name.
 * Pass the page title without the site suffix when using the root layout template.
 */
export function buildPageTitle(title: string, options?: { withSiteSuffix?: boolean }): string {
  const withSiteSuffix = options?.withSiteSuffix ?? false;
  if (withSiteSuffix && !title.includes("Alberton Battery Mart")) {
    return `${title}${SITE_SUFFIX}`;
  }
  return title;
}

/** Strip HTML/markup for JSON-LD name fields */
export function pageTitleForSchema(title: string): string {
  return title.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
