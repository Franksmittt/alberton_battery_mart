import { MetadataRoute } from "next";
import { getServiceSitemapEntries } from "@/lib/seo/sitemap-data";

export default function sitemapServices(): MetadataRoute.Sitemap {
  return getServiceSitemapEntries();
}
