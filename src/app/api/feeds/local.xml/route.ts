import { getAllProducts, ProductCardData } from "@/data/products";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SITE_URL = "https://www.albertonbatterymart.co.za";

function generateXML(products: ProductCardData[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">\n';
  xml += "<title>Local Product Feed - Alberton</title>\n";
  xml += `<link href="${SITE_URL}/api/feeds/local.xml" rel="self" />\n`;
  xml += `<updated>${new Date().toISOString()}</updated>\n`;

  products.forEach((product) => {
    const imagePath = product.imagePath ?? "N/A";
    const productTitle = product.name ?? "Battery Product";
    const link = `${SITE_URL}/products/id/${product.id}`;
    const price = product.sellingPrice_OUTPUT.replace("R", "ZAR").replace(" ", "");

    xml += "<entry>\n";
    xml += `<g:id>${product.id}</g:id>\n`;
    xml += `<g:title>${productTitle}</g:title>\n`;
    xml += `<g:description>${product.seoDescription ?? product.seoSubtitle ?? productTitle}</g:description>\n`;
    xml += `<g:link>${link}</g:link>\n`;
    xml += `<g:image_link>${SITE_URL}${imagePath}</g:image_link>\n`;
    xml += "<g:condition>new</g:condition>\n";
    xml += `<g:price>${price}</g:price>\n`;
    xml += "<g:availability>in stock</g:availability>\n";
    xml += `<g:brand>${product.brandName}</g:brand>\n`;
    xml += `<g:gtin>${product.sku}</g:gtin>\n`;
    xml += `<g:mpn>${product.cca || product.sku}</g:mpn>\n`;
    xml += `<g:product_type>${product.category}</g:product_type>\n`;
    xml += "</entry>\n";
  });

  xml += "</feed>\n";
  return xml;
}

export async function GET() {
  const allProducts = await getAllProducts();
  const localProducts = allProducts.filter((product) => product.category !== "Deep Cycle");
  const xmlContent = generateXML(localProducts);

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
