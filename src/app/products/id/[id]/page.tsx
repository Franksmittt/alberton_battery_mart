import { ALL_PRODUCTS, ProductCardData } from "@/data/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Zap,
  Gauge,
  MapPin,
  Car,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TrackViewItem } from "@/components/analytics/TrackViewItem";

const EMERGENCY_PHONE_DISPLAY = "010 109 6211";
const EMERGENCY_PHONE_LINK = "0101096211";
const WHATSAPP_NUMBER_LINK = "27823046926";

const parsePrice = (price: string): string => {
  try {
    return price.replace("R", "").replace(/,/g, "").trim();
  } catch (e) {
    return "0.00";
  }
};

const getProductById = (id: string): ProductCardData | undefined => {
  return ALL_PRODUCTS.find((p) => p.id.toString() === id);
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = getProductById(params.id);
  if (!product) {
    return { title: "Product Not Found" };
  }
  const title = `Buy ${product.name} (${product.sku}) in Alberton | Alberton Battery Mart`;
  const description = `Get the ${product.name} ${product.seoSubtitle} at Alberton Battery Mart. ${
    product.popularFits ? `Fits: ${product.popularFits}.` : ""
  } Free fitment, testing, and 24-month warranty. Call 010 109 6211.`;

  const url = `https://www.albertonbatterymart.co.za/products/${product.id}`;

  return {
    title,
    description,
    keywords: [
      `${product.name} Alberton`,
      `${product.brandName} battery`,
      `${product.sku} battery`,
      "battery Alberton",
      "car battery",
      product.category.toLowerCase(),
      ...(product.popularFits
        ? product.popularFits
            .split(",")
            .map((fit) => `${fit.trim()} battery`)
        : []),
    ],
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: `https://www.albertonbatterymart.co.za${product.imagePath}`,
          width: 800,
          height: 600,
          alt: `${product.name} - ${product.seoSubtitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://www.albertonbatterymart.co.za${product.imagePath}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);
  if (!product) {
    notFound();
  }

  const specs = [
    { label: "SKU / Code", value: product.sku },
    { label: "Category", value: product.category },
    { label: "Brand", value: product.brandName },
    { label: "Capacity (Ah)", value: `${product.ahCapacity}Ah` },
    { label: "CCA", value: product.cca === 0 ? "N/A" : product.cca },
    { label: "Warranty", value: `${product.warrantyMonths} Months` },
  ];

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: `https://www.albertonbatterymart.co.za${product.imagePath}`,
    description: `Get the ${product.name} ${
      product.seoSubtitle
    } at Alberton Battery Mart. Free fitment, testing, and ${
      product.warrantyMonths
    }-month warranty.`,
    sku: product.sku,
    mpn: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brandName,
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `https://www.albertonbatterymart.co.za/products/${product.id}`,
      priceCurrency: "ZAR",
      price: parsePrice(product.sellingPrice_OUTPUT),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
      seller: {
        "@type": "LocalBusiness",
        name: "Alberton Battery Mart",
        url: "https://www.albertonbatterymart.co.za",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.albertonbatterymart.co.za",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://www.albertonbatterymart.co.za/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://www.albertonbatterymart.co.za/products/${product.id}`,
      },
    ],
  };

  return (
    <div className="container py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
          <div className="relative w-full h-80 bg-secondary/20 rounded">
            <Image
              src={product.imagePath}
              alt={`${product.name} - ${product.seoSubtitle}`}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="p-4"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
              {product.brandName} · {product.category}
            </p>
            <h1 className="text-4xl font-extrabold text-foreground">
              {product.name} — {product.seoSubtitle}
            </h1>
            {product.popularFits && (
              <p className="text-muted-foreground">
                Fits: {product.popularFits}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-3xl font-bold text-foreground">
              {product.sellingPrice_OUTPUT}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" variant="battery">
                <a href={`tel:${EMERGENCY_PHONE_LINK}`}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call {EMERGENCY_PHONE_DISPLAY}
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER_LINK}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  WhatsApp Quote
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-secondary/20 p-4 rounded-lg">
            {specs.map((spec) => (
              <div key={spec.label}>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">
                  {spec.label}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          <TrackViewItem product={product} />
        </div>
      </div>

      <Separator className="my-12" />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-battery" />
            Free Diagnostics
          </h2>
          <p className="text-muted-foreground">
            Every installation includes a full alternator, starter, and parasitic
            drain test so you never replace a battery blindly.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-battery" />
            Same-Day Service
          </h2>
          <p className="text-muted-foreground">
            Mobile fitment available in Alberton, New Redruth, Meyersdal, and
            nearby suburbs. We bring the battery to you.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Gauge className="h-5 w-5 text-battery" />
            24-36 Month Warranty
          </h2>
          <p className="text-muted-foreground">
            Willard & Exide batteries with national support. We register every
            warranty before you leave.
          </p>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
          <MapPin className="h-5 w-5 text-battery" />
          Service Footprint
        </h2>
        <p className="text-muted-foreground">
          We cover Alberton Central, New Redruth, Meyersdal, Brackenhurst,
          Brackendowns, and corporate fleets in Alrode.
        </p>
      </div>

      <Separator className="my-12" />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
          <Car className="h-5 w-5 text-battery" />
          Perfect For
        </h2>
        <p className="text-muted-foreground">
          {product.popularFits ||
            "Passenger cars, SUVs, 4x4s, trucks, and leisure batteries."}
        </p>
      </div>
    </div>
  );
}

