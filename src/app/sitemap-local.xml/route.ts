import { getLocalSitemapEntries } from "@/lib/seo/sitemap-data";
import { sitemapXmlResponse } from "@/lib/seo/sitemap-xml";

export function GET() {
  return sitemapXmlResponse(getLocalSitemapEntries());
}
