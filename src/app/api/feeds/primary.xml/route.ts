// src/app/api/feeds/primary.xml/route.ts
import { ALL_PRODUCTS } from "@/data/products";
import { NextRequest, NextResponse } from "next/server";

// Helper function to format the price
function formatPrice(priceAnchor: string): string {
  // Input: "R 1,450.00"
  const price = priceAnchor
    .replace("R", "")
    .replace(/,/g, "")
    .trim();
  // Output: "1450.00 ZAR"
  return `${price} ZAR`;
}

export async function GET(request: NextRequest) {
  const baseUrl = "https://www.albertonbatterymart.co.za"; // From your layout.tsx [cite: 2469-2470]
  const products = ALL_PRODUCTS;

  const xmlEntries = products.map(product => {
    // Note: Google's 'description' field has a 5000-character limit.
    // 'seoSubtitle' is concise and perfect for this.
    const description = product.seoSubtitle || `Buy ${product.name} in Alberton.`;
    
    // Create full, absolute URLs as required by Google
    const productUrl = `${baseUrl}/products/${product.id}`;
    const imageUrl = `${baseUrl}${product.imagePath}`;

    return `
    <entry>
      <g:id>${product.id}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>${description}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:availability>in stock</g:availability>
      <g:price>${formatPrice(product.sellingPrice_OUTPUT)}</g:price>
      <g:brand>${product.brandName}</g:brand>
      <g:condition>new</g:condition>
      ${/* GTIN is required by Google but not present in your products.ts.
        We will add 'identifier_exists: no' as a fallback to make the feed valid.
        For a real feed, you would add the product GTINs (barcodes).
      */''}
      <g:identifier_exists>no</g:identifier_exists>
    </entry>`;
  }).join("");

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
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
    },
  });
}