// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllProducts, ALL_PRODUCTS } from '@/data/products'
import { ALL_POSTS } from '@/data/blog-posts'
import { getAllProductSlugs } from '@/data/product-detail'
import { getAllVehicleSlugs } from '@/data/vehicle-fitment'
import { getAllServicePages } from '@/data/service-pages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // 1. Get the base URL from your layout
  const baseUrl = 'https://www.albertonbatterymart.co.za';

  // 2. Get all products (from JSON if available, otherwise static)
  const allProducts = await getAllProducts();

  // 3. Create entries for your static pages
  const staticPages = [
    '/',
    '/about',
    '/services',
    '/contact',
    '/products',
    '/products/all',
    '/faq',
    '/quote',
    '/testing',
    '/fitment',
    '/deep-cycle', // This is the old deep-cycle page, let's keep it
    '/local/alberton-central',
    '/local/meyersdal',
    '/local/new-redruth',
    '/blog',
    '/golf-cart-batteries',
    '/golf-cart-batteries/lithium-conversion',
    '/golf-cart-batteries/lead-acid',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.9,
  }));

  // 4. Create entries for all dynamic product pages (using getAllProducts)
  const productPages = allProducts.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 5. Create entries for all dynamic blog post pages
  const blogPages = ALL_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 6. Create entries for product category/type silos (using getAllProducts)
  const productTypePages = Array.from(new Set(allProducts.map(p => p.category)))
    .map((category) => {
      let slug = '';
      if (category === 'Standard Automotive') slug = 'automotive';
      if (category === 'Performance AGM/EFB') slug = 'performance';
      if (category === 'Deep Cycle') slug = 'deep-cycle';
      if (category === 'Truck & Commercial') slug = 'truck-commercial';
      if (category === 'Motorcycle') slug = 'motorcycle';
      
      if (slug) {
        return {
          url: `${baseUrl}/products/type/${slug}`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'monthly' as const,
          priority: 0.9,
        };
      }
      return null;
    }).filter(Boolean) as MetadataRoute.Sitemap; // Filter out any nulls

  // 7. Create entries for product brand silos (using getAllProducts)
  const productBrandPages = Array.from(new Set(allProducts.map(p => p.brandName)))
    .map((brand) => ({
      url: `${baseUrl}/products/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  const productDetailPages = getAllProductSlugs().map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const vehiclePages = getAllVehicleSlugs().map((slug) => ({
    url: `${baseUrl}/vehicles/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 8. Create entries for all service pages
  const servicePages = getAllServicePages().map((service) => ({
    url: `${baseUrl}/services/${service.serviceSlug}/${service.areaSlug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...blogPages,
    ...productTypePages,
    ...productBrandPages,
    ...productDetailPages,
    ...vehiclePages,
    ...servicePages,
  ];
}