// src/app/sitemap.ts
import { MetadataRoute } from "next";
import {
  getBlogSitemapEntries,
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

  return [
    ...staticPages,
    ...productPages,
    ...blogPages,
    ...vehiclePages,
    ...servicePages,
    ...localAreaPages,
  ];
}