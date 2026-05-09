import { MetadataRoute } from "next";
import { getProductSitemapEntries } from "@/lib/seo/sitemap-data";

export default async function sitemapProducts(): Promise<MetadataRoute.Sitemap> {
  return getProductSitemapEntries();
}
