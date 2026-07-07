import { getAllProducts } from "@/data/products";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function formatPrice(priceAnchor: string): string {
  const price = priceAnchor.replace("R", "").replace(/,/g, "").trim();
  return `${price} ZAR`;
}

export async function GET() {
  const baseUrl = "https://www.albertonbatterymart.co.za";
  const products = await getAllProducts();

  const xmlEntries = products
    .map(
      (product) => `
    <entry>
      <g:id>${product.id}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>${product.seoSubtitle || `Buy ${product.name} in Alberton.`}</g:description>
      <g:link>${baseUrl}/products/id/${product.id}</g:link>
      <g:image_link>${baseUrl}${product.imagePath}</g:image_link>
      <g:availability>in stock</g:availability>
      <g:price>${formatPrice(product.sellingPrice_OUTPUT)}</g:price>
      <g:brand>${product.brandName}</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
    </entry>`
    )
    .join("");

  const xmlFeed = `
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">
  <title>Alberton Battery Mart Product Feed</title>
  <link rel="self" href="${baseUrl}/api/feeds/primary.xml" />
  ${xmlEntries}
</feed>
  `.trim();

  return new NextResponse(xmlFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
