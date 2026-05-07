// src/app/robots.ts
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.albertonbatterymart.co.za';

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
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}