// src/app/api/feeds/local.xml/route.ts

import { NextResponse } from 'next/server';
import { ALL_PRODUCTS, ProductCardData } from '@/data/products';

const SITE_URL = 'https://www.yourdomain.co.za'; // TODO: Update this to your live domain

function generateXML(products: ProductCardData[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">\n';
  xml += '<title>Local Product Feed - Alberton</title>\n';
  xml += `<link href="${SITE_URL}/api/feeds/local.xml" rel="self" />\n`;
  xml += `<updated>${new Date().toISOString()}</updated>\n`;

  products.forEach(product => {
    // --- Error fix applied here: Use nullish coalescing (??) to ensure a string is passed ---
    // If the data is missing (undefined), 'N/A' or an empty string is used as fallback.
    const imagePath = product.imagePath ?? 'N/A';
    const productTitle = product.name ?? 'Battery Product';
    const link = `${SITE_URL}/product/${product.id}`;
    const price = product.sellingPrice_OUTPUT.replace('R', 'ZAR').replace(' ', '');

    xml += '<entry>\n';
    xml += `<g:id>${product.id}</g:id>\n`;
    xml += `<g:title>${productTitle}</g:title>\n`;
    xml += `<g:description>${product.seoDescription ?? product.seoSubtitle ?? productTitle}</g:description>\n`;
    xml += `<g:link>${link}</g:link>\n`;
    xml += `<g:image_link>${SITE_URL}${imagePath}</g:image_link>\n`;
    xml += `<g:condition>new</g:condition>\n`;
    xml += `<g:price>${price}</g:price>\n`;
    xml += `<g:availability>in stock</g:availability>\n`;
    xml += `<g:brand>${product.brandName}</g:brand>\n`;
    xml += `<g:gtin>${product.sku}</g:gtin>\n`;
    // Using CCA for MPN as per common practice if a manufacturer part number isn't available
    xml += `<g:mpn>${product.cca || product.sku}</g:mpn>\n`; 
    xml += `<g:product_type>${product.category}</g:product_type>\n`;
    xml += '</entry>\n';
  });

  xml += '</feed>\n';
  return xml;
}

export async function GET() {
  // Filter products for the local feed (e.g., exclude non-standard categories if needed)
  const localProducts = ALL_PRODUCTS.filter(p => 
    p.category !== 'Deep Cycle' // Filter out Deep Cycle if it's not a local service item
  );

  const xmlContent = generateXML(localProducts);

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}