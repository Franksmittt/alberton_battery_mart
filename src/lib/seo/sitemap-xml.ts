import type { MetadataRoute } from "next";

type SitemapEntry = MetadataRoute.Sitemap[number];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function createSitemapXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry: SitemapEntry) => {
      const lastModified =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified;

      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        lastModified ? `    <lastmod>${escapeXml(String(lastModified))}</lastmod>` : "",
        entry.changeFrequency
          ? `    <changefreq>${escapeXml(entry.changeFrequency)}</changefreq>`
          : "",
        typeof entry.priority === "number"
          ? `    <priority>${entry.priority.toFixed(2)}</priority>`
          : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function sitemapXmlResponse(entries: MetadataRoute.Sitemap): Response {
  return new Response(createSitemapXml(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
