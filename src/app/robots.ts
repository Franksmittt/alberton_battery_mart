// src/app/robots.ts
import { MetadataRoute } from 'next'
import { BASE_URL } from "@/lib/seo-constants";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/admin/',
          '/private/',
          '/*?sort=*',
          '/*?filter=*',
          '/*?page=*',
          '/*?utm_*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/admin/',
          '/private/',
          '/*?sort=*',
          '/*?filter=*',
          '/*?page=*',
          '/*?utm_*',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/admin/',
          '/private/',
          '/*?sort=*',
          '/*?filter=*',
          '/*?page=*',
          '/*?utm_*',
        ],
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap-products.xml`,
      `${BASE_URL}/sitemap-services.xml`,
      `${BASE_URL}/sitemap-local.xml`,
    ],
    host: BASE_URL,
  }
}