import { BASE_URL } from "@/lib/seo-constants";

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) {
    return BASE_URL;
  }

  if (ABSOLUTE_URL_PATTERN.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${BASE_URL}${normalizedPath}`;
}

export function canonicalFor(pathOrUrl: string): { canonical: string } {
  return {
    canonical: toAbsoluteUrl(pathOrUrl),
  };
}
