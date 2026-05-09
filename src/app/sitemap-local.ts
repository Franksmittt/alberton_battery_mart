import { MetadataRoute } from "next";
import { getLocalSitemapEntries } from "@/lib/seo/sitemap-data";

export default function sitemapLocal(): MetadataRoute.Sitemap {
  return getLocalSitemapEntries();
}
