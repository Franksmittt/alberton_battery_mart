// src/app/(main)/product/[productid]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Truck, Users, Clock, Zap, ShieldCheck, BatteryCharging, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAllProducts, ProductCardData, ALL_PRODUCTS } from '@/data/products';
import { BASE_URL } from '@/lib/seo-constants';
import { FitmentBadge } from '@/components/content/FitmentBadge';
import { JsonLd } from '@/components/seo/JsonLd';

// Make this page dynamic so it can read updated prices from JSON
export const dynamic = 'force-dynamic';

// --- Metadata Generation ---
type Props = {
  params: { productid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = parseInt(params.productid);
  const products = await getAllProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  const title = `${product.name} | ${product.seoSubtitle} Price`;
  const description = product.seoDescription || `Buy ${product.name} ${product.category} battery with ${product.warrantyMonths}-month warranty, available in Alberton.`;
  const url = `${BASE_URL}/product/${product.id}`;

  return {
    title: title,
    description: description,
    keywords: [
      `${product.name} Alberton`,
      `${product.brandName} battery`,
      `${product.sku} battery`,
      'battery Alberton',
      product.category.toLowerCase(),
    ],
    openGraph: {
      title: title,
      description: description,
      url,
      type: 'website',
      siteName: 'Alberton Battery Mart',
      locale: 'en_ZA',
      images: [
        {
          url: `${BASE_URL}${product.imagePath}`,
          width: 1200,
          height: 630,
          alt: `${product.name} ${product.brandName} battery - ${product.ahCapacity}Ah, ${product.cca}CCA`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [`${BASE_URL}${product.imagePath}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

// --- Component Rendering ---
export default async function ProductDetailPage({ params }: Props) {
  const productId = parseInt(params.productid);
  const products = await getAllProducts();
  const product: ProductCardData | undefined = products.find(
    (p) => p.id === productId
  );

  if (!product) {
    notFound();
  }

  const isAGM = product.isAGM;
  const PRIMARY_PHONE = "010 109 6211";
  const WHATSAPP_NUMBER_LINK = "27823046926";

  // Product Schema for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/product/${product.id}#product`,
    name: product.name,
    description: product.seoDescription || `Buy ${product.name} ${product.category} battery with ${product.warrantyMonths}-month warranty, available in Alberton.`,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brandName,
    },
    category: product.category,
    image: `${BASE_URL}${product.imagePath}`,
    offers: {
      "@type": "Offer",
      price: product.sellingPrice_OUTPUT.replace(/[^\d.]/g, ''),
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Alberton Battery Mart",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Cold Cranking Amps (CCA)",
        value: product.cca?.toString() || "N/A",
      },
      {
        "@type": "PropertyValue",
        name: "Amp Hour Capacity (Ah)",
        value: product.ahCapacity.toString(),
      },
      {
        "@type": "PropertyValue",
        name: "Warranty Period",
        value: `${product.warrantyMonths} months`,
      },
      {
        "@type": "PropertyValue",
        name: "Battery Type",
        value: isAGM ? "AGM" : "Flooded",
      },
      ...(product.lengthMm ? [{
        "@type": "PropertyValue",
        name: "Length",
        value: `${product.lengthMm}mm`,
      }] : []),
      ...(product.widthMm ? [{
        "@type": "PropertyValue",
        name: "Width",
        value: `${product.widthMm}mm`,
      }] : []),
      ...(product.heightMm ? [{
        "@type": "PropertyValue",
        name: "Height",
        value: `${product.heightMm}mm`,
      }] : []),
      ...(product.weightKg ? [{
        "@type": "PropertyValue",
        name: "Weight",
        value: `${product.weightKg}kg`,
      }] : []),
    ],
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${BASE_URL}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `${BASE_URL}/products/type/${product.category === 'Standard Automotive' ? 'automotive' : product.category === 'Performance AGM/EFB' ? 'performance' : product.category.toLowerCase().replace(/\s+/g, '-')}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `${BASE_URL}/product/${product.id}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} id="product-schema" />
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      {/* Hero Section - Product Header */}
      <div className="border-b border-white/5 bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821]">
        <div className="container py-4 md:py-6">
          {/* Breadcrumb */}
          <div className="mb-4">
            <Link 
              href="/products" 
              className="text-white/60 hover:text-battery transition-colors text-sm flex items-center gap-2 group"
            >
              <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Products</span>
            </Link>
          </div>

          {/* Fitment Badge - Shows if user came from YMM search */}
          <div className="mb-4">
            <FitmentBadge />
          </div>

          {/* Product Header - Compact Layout */}
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left: Product Info */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {/* Brand Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-battery/20 border border-battery/30">
                  <span className="text-sm font-bold text-battery uppercase tracking-wider">
                    {product.brandName}
                  </span>
                  {isAGM && (
                    <>
                      <span className="text-white/40">•</span>
                      <span className="text-xs font-semibold text-white/80 uppercase">AGM</span>
                    </>
                  )}
                </div>
                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Title - H1 for SEO */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2 leading-tight">
                {product.name} - {product.seoSubtitle}
              </h1>
              <p className="text-base md:text-lg text-white/70 font-medium mb-4">
                {product.seoSubtitle}
              </p>

              {/* Price and Quick Specs - Inline */}
              <div className="flex flex-wrap items-baseline gap-4 md:gap-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-semibold text-white/60">Price:</span>
                  <span className="text-3xl md:text-4xl font-black text-battery leading-none">
                    {product.sellingPrice_OUTPUT}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-battery" />
                    <span className="text-white/80 font-bold">{product.cca || 'N/A'}</span>
                    <span className="text-white/50 text-xs">CCA</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BatteryCharging className="h-4 w-4 text-battery" />
                    <span className="text-white/80 font-bold">{product.ahCapacity}Ah</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span className="text-white/80 font-bold">{product.warrantyMonths}</span>
                    <span className="text-white/50 text-xs">Months</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/50 mt-2">
                Includes Scrap Exchange • Subject to availability
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-8 md:py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image and Visual Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Product Image with Enhanced Glow */}
            <div className="relative w-full aspect-square group">
              <div className="absolute inset-0 rounded-2xl bg-battery/30 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-full h-full bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] rounded-2xl border border-white/10 p-8 md:p-12 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.imagePath}
                  alt={`${product.name} ${product.brandName} battery - ${product.ahCapacity}Ah, ${product.cca}CCA - Available in Alberton`}
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Warranty & Type Badge */}
            <Card className="border border-white/10 bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821]">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-battery/20 border border-battery/30">
                    <ShieldCheck className="h-5 w-5 text-battery" />
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      {product.warrantyMonths} Month Warranty
                    </span>
                  </div>
                  <p className="text-sm text-center text-white/70">
                    {isAGM ? "Premium AGM Performance Battery" : `${product.brandName} Standard Automotive Battery`}
                  </p>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <BatteryCharging className="h-4 w-4 text-battery" />
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                      {isAGM ? 'AGM / Start-Stop Compatible' : 'Standard Fitment'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Detailed Specs and CTAs */}
          <div className="lg:col-span-7 space-y-6">

            {/* Detailed Specifications */}
            <Card className="border border-white/10 bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] text-white">
              <CardHeader className="pb-4 border-b border-white/10">
                <CardTitle className="text-xl font-black text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-battery" />
                  Technical Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Primary Specs Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Cold Cranking Amps</p>
                    <div className="flex items-baseline gap-2">
                      <Zap className="h-4 w-4 text-battery" />
                      <p className="text-3xl font-black text-white">{product.cca || 'N/A'}</p>
                    </div>
                    <p className="text-xs text-white/50">Starting power at 0°F</p>
                  </div>

                  <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/10 text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Amp Hour Capacity</p>
                    <p className="text-3xl font-black text-white">{product.ahCapacity}Ah</p>
                    <p className="text-xs text-white/50">Energy storage capacity</p>
                  </div>

                  <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Warranty Period</p>
                    <div className="flex items-baseline gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <p className="text-2xl font-black text-white">
                        {product.warrantyMonths} Months
                      </p>
                    </div>
                    <p className="text-xs text-white/50">Full replacement guarantee</p>
                  </div>

                  <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/10 text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Battery Type</p>
                    <p className="text-xl font-black text-white">{isAGM ? 'AGM' : 'Flooded'}</p>
                    <p className="text-xs text-white/50">{product.brandName} • {product.category}</p>
                  </div>
                </div>
                
                {/* Physical Dimensions */}
                {(product.lengthMm || product.widthMm || product.heightMm || product.weightKg) && (
                  <>
                    <Separator className="border-white/10" />
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Truck className="h-5 w-5 text-battery" />
                        <p className="text-lg font-bold text-white">Physical Dimensions</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {product.lengthMm && (
                          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Length</p>
                            <p className="text-xl font-black text-white">{product.lengthMm}mm</p>
                          </div>
                        )}
                        {product.widthMm && (
                          <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-right">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Width</p>
                            <p className="text-xl font-black text-white">{product.widthMm}mm</p>
                          </div>
                        )}
                        {product.heightMm && (
                          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Height</p>
                            <p className="text-xl font-black text-white">{product.heightMm}mm</p>
                          </div>
                        )}
                        {product.weightKg && (
                          <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-right">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Weight</p>
                            <p className="text-xl font-black text-white">{product.weightKg}kg</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                
                <Separator className="border-white/10" />

                {/* Popular Vehicle Fits */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-battery" />
                    <h3 className="text-lg font-bold text-white">Popular Vehicle Applications</h3>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-base text-white/80 leading-relaxed">
                      {product.popularFits}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Section - CTAs */}
            <Card className="border-2 border-battery/20 bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] text-white shadow-[0_8px_30px_rgba(220,38,38,0.2)]">
              <CardContent className="p-6 space-y-4">
                <div className="text-center space-y-2 mb-6">
                  <h2 className="text-2xl font-black text-white">
                    {product.category === 'Deep Cycle' || product.category.includes('Solar') 
                      ? 'Request Custom Quote'
                      : product.category === 'Truck & Commercial'
                      ? 'Get Fleet Pricing'
                      : 'Ready to Get Started?'}
                  </h2>
                  <p className="text-white/70 text-sm">
                    {product.category === 'Deep Cycle' || product.category.includes('Solar')
                      ? 'Get a personalized quote for your inverter/solar setup'
                      : product.category === 'Truck & Commercial'
                      ? 'Bulk pricing available for commercial vehicles'
                      : 'Call or WhatsApp for immediate mobile service in Alberton'}
                  </p>
                </div>

                {/* Primary CTA - Contextual */}
                <div className="space-y-3">
                  {product.category === 'Deep Cycle' || product.category.includes('Solar') ? (
                    <Button 
                      asChild
                      variant="battery" 
                      size="xl" 
                      className="w-full text-lg h-14 font-black shadow-lg hover:shadow-xl transition-all"
                    >
                      <Link href={`/quote?product=${product.id}`} className="flex items-center justify-center gap-3">
                        <Phone className="h-6 w-6" />
                        <span>Request Custom Quote</span>
                      </Link>
                    </Button>
                  ) : product.category === 'Truck & Commercial' ? (
                    <Button 
                      asChild
                      variant="battery" 
                      size="xl" 
                      className="w-full text-lg h-14 font-black shadow-lg hover:shadow-xl transition-all"
                    >
                      <Link href={`/quote?product=${product.id}&type=fleet`} className="flex items-center justify-center gap-3">
                        <Truck className="h-6 w-6" />
                        <span>Get Fleet Pricing</span>
                      </Link>
                    </Button>
                  ) : (
                    <Button 
                      asChild
                      variant="battery" 
                      size="xl" 
                      className="w-full text-lg h-14 font-black shadow-lg hover:shadow-xl transition-all"
                    >
                      <a href={`tel:${PRIMARY_PHONE.replace(/ /g, '')}`} className="flex items-center justify-center gap-3">
                        <Phone className="h-6 w-6" />
                        <span>Check Store Availability</span>
                      </a>
                    </Button>
                  )}

                  {/* Secondary CTA - WhatsApp */}
                  <Button 
                    asChild
                    variant="secondary" 
                    size="xl" 
                    className="w-full text-lg h-14 font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER_LINK}?text=Hi, I'm interested in the ${product.name} battery. Can you provide a quote?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3"
                    >
                      <MessageSquare className="h-6 w-6" />
                      <span>WhatsApp for Quote</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Service Information */}
            <Card className="border border-white/10 bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] text-white">
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <Clock className="h-5 w-5 text-battery mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white mb-1">Service Areas</p>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Mobile service across Alberton, New Redruth, and Meyersdal. Same-day availability.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white mb-1">What's Included</p>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Free testing, professional fitment, BMS coding, and full warranty coverage.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
