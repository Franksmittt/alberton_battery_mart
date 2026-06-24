// src/app/sitemap.ts
import { MetadataRoute } from "next";
import {
  getBattery619SitemapEntries,
  getBlogSitemapEntries,
  getLocalProofSitemapEntries,
  getLocalSitemapEntries,
  getProductSitemapEntries,
  getServiceSitemapEntries,
  getStaticSitemapEntries,
  getVehicleSitemapEntries,
} from "@/lib/seo/sitemap-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productPages] = await Promise.all([getProductSitemapEntries()]);
  const staticPages = getStaticSitemapEntries();
  const blogPages = getBlogSitemapEntries();
  const vehiclePages = getVehicleSitemapEntries();
  const servicePages = getServiceSitemapEntries();
  const localAreaPages = getLocalSitemapEntries();
  const localProofPages = getLocalProofSitemapEntries();
  const battery619Pages = getBattery619SitemapEntries();

  return [
    ...staticPages,
    ...productPages,
    ...blogPages,
    ...vehiclePages,
    ...servicePages,
    ...localAreaPages,
    ...localProofPages,
    ...battery619Pages,
  ];
}