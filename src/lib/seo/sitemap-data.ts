import { MetadataRoute } from "next";
import { getAllProducts } from "@/data/products";
import { ALL_POSTS } from "@/data/blog-posts";
import { getAllVehicleSlugs } from "@/data/vehicle-fitment";
import { getAllServicePages } from "@/data/service-pages";
import { getAllLocalAreas } from "@/data/local-areas";
import { BASE_URL } from "@/lib/seo-constants";

type SitemapEntry = MetadataRoute.Sitemap[number];

const now = () => new Date().toISOString();

const buildEntry = (
  route: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
  lastModified: string = now()
): SitemapEntry => ({
  url: `${BASE_URL}${route}`,
  lastModified,
  changeFrequency,
  priority,
});

export function getStaticSitemapEntries(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/contact",
    "/products",
    "/products/all",
    "/faq",
    "/quote",
    "/fitment",
    "/local",
    "/local/alberton-central",
    "/local/meyersdal",
    "/local/new-redruth",
    "/blog",
    "/golf-cart-batteries",
    "/golf-cart-batteries/lithium-conversion",
    "/golf-cart-batteries/lead-acid",
    "/testing",
  ];

  return staticRoutes.map((route) =>
    buildEntry(route, "monthly", route === "/" ? 1.0 : 0.9)
  );
}

export async function getProductSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const allProducts = await getAllProducts();

  const productIdPages = allProducts.map((product) =>
    buildEntry(`/products/id/${product.id}`, "weekly", 0.8)
  );

  const productTypePages = Array.from(new Set(allProducts.map((p) => p.category)))
    .map((category) => {
      let slug = "";
      if (category === "Standard Automotive") slug = "automotive";
      if (category === "Performance AGM/EFB") slug = "performance";
      if (category === "Deep Cycle") slug = "deep-cycle";
      if (category === "Truck & Commercial") slug = "truck-commercial";
      if (category === "Motorcycle") slug = "motorcycle";
      if (!slug) return null;
      return buildEntry(`/products/type/${slug}`, "monthly", 0.9);
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  const productBrandPages = Array.from(new Set(allProducts.map((p) => p.brandName))).map(
    (brand) =>
      buildEntry(
        `/products/brand/${brand.toLowerCase().replace(/\s+/g, "-")}`,
        "monthly",
        0.8
      )
  );

  return [
    ...productIdPages,
    ...productTypePages,
    ...productBrandPages,
  ];
}

export function getBlogSitemapEntries(): MetadataRoute.Sitemap {
  return ALL_POSTS.map((post) =>
    buildEntry(`/blog/${post.slug}`, "weekly", 0.7, new Date(post.date).toISOString())
  );
}

export function getVehicleSitemapEntries(): MetadataRoute.Sitemap {
  return getAllVehicleSlugs().map((slug) => buildEntry(`/vehicles/${slug}`, "monthly", 0.8));
}

export function getServiceSitemapEntries(): MetadataRoute.Sitemap {
  return getAllServicePages().map((service) =>
    buildEntry(`/services/${service.serviceSlug}/${service.areaSlug}`, "monthly", 0.8)
  );
}

export function getLocalSitemapEntries(): MetadataRoute.Sitemap {
  return getAllLocalAreas().map((area) => buildEntry(`/local/${area.slug}`, "monthly", 0.8));
}
