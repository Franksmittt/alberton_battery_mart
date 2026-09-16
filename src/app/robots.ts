// src/app/robots.ts
import { MetadataRoute } from "next";
import { AI_SEARCH_USER_AGENTS } from "@/lib/ai-crawlers";
import { BASE_URL } from "@/lib/seo-constants";

const DISALLOW = [
  "/admin/",
  "/api/admin/",
  "/studio/",
  "/private/",
  "/*?sort=*",
  "/*?filter=*",
  "/*?page=*",
  "/*?utm_*",
];

function allowRule(userAgent: string | string[]) {
  return {
    userAgent,
    allow: ["/", "/llms.txt", "/llms-full.txt"],
    disallow: DISALLOW,
  };
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      allowRule("*"),
      allowRule("Googlebot"),
      allowRule("Bingbot"),
      ...AI_SEARCH_USER_AGENTS.map((agent) => allowRule(agent)),
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap-products.xml`,
      `${BASE_URL}/sitemap-services.xml`,
      `${BASE_URL}/sitemap-local.xml`,
    ],
    host: BASE_URL,
  };
}
