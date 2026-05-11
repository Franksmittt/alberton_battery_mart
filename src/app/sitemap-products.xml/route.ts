import { getProductSitemapEntries } from "@/lib/seo/sitemap-data";
import { sitemapXmlResponse } from "@/lib/seo/sitemap-xml";

export async function GET() {
  return sitemapXmlResponse(await getProductSitemapEntries());
}
