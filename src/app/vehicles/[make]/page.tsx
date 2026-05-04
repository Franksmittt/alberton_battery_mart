// src/app/vehicles/[make]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getVehicleFitment,
  getAllVehicleSlugs,
  VEHICLE_FITMENT,
} from "@/data/vehicle-fitment";
import { BASE_URL } from "@/lib/seo-constants";
import { MapPin, Phone, MessageSquare, Car, Battery } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/data/products";

type Params = {
  make: string;
};

// Generate static params for all makes
export async function generateStaticParams() {
  const makes = Array.from(
    new Set(VEHICLE_FITMENT.map((v) => v.make.toLowerCase()))
  );
  return makes.map((make) => ({
    make: make,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const make = params.make.charAt(0).toUpperCase() + params.make.slice(1);
  const url = `${BASE_URL}/vehicles/${params.make.toLowerCase()}`;

  const description = `Find the right battery for your ${make} vehicle. Browse our ${make} battery fitment guides and recommended products. Free fitment and testing in Alberton.`;

  return {
    title: `${make} Battery Replacement in Alberton | Alberton Battery Mart`,
    description,
    keywords: [
      `${make} battery`,
      `${make} battery replacement`,
      `${make} battery Alberton`,
      `${make} battery price`,
      `battery for ${make}`,
    ],
    openGraph: {
      title: `${make} Battery Replacement in Alberton`,
      description,
      url,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${make} Battery Replacement - Alberton Battery Mart`,
        },
      ],
      locale: 'en_ZA',
      siteName: 'Alberton Battery Mart',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${make} Battery Replacement in Alberton | Alberton Battery Mart`,
      description,
      images: [`${BASE_URL}/images/og-image.jpg`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function VehicleMakePage({ params }: { params: Params }) {
  const makeSlug = params.make.toLowerCase();
  const make = params.make.charAt(0).toUpperCase() + params.make.slice(1);

  // Get all vehicles for this make
  const vehicles = VEHICLE_FITMENT.filter(
    (v) => v.make.toLowerCase() === makeSlug
  );

  if (vehicles.length === 0) {
    notFound();
  }

  // Get popular products for this make (from first vehicle's recommended products)
  const allProducts = await getAllProducts();
  const popularProductSlugs = new Set<string>();
  vehicles.forEach((v) => {
    v.recommendedProducts.forEach((p) => {
      popularProductSlugs.add(p.slug);
    });
  });

  const popularProducts = allProducts.filter((p) =>
    Array.from(popularProductSlugs).some((slug) =>
      p.name.toLowerCase().includes(slug.toLowerCase().replace(/-/g, " "))
    )
  ).slice(0, 6);

  const makeSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: make,
    url: `${BASE_URL}/vehicles/${makeSlug}`,
    description: `Battery replacement guides and products for ${make} vehicles in Alberton.`,
  };

  const vehicleCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${make} Vehicle Battery Guides`,
    url: `${BASE_URL}/vehicles/${makeSlug}`,
    numberOfItems: vehicles.length,
    itemListElement: vehicles.map((vehicle, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Vehicle",
        name: vehicle.headline,
        url: `${BASE_URL}/vehicles/${vehicle.slug}`,
      },
    })),
  };

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
        name: `${make} Batteries`,
        item: `${BASE_URL}/vehicles/${makeSlug}`,
      },
    ],
  };

  return (
    <div className="container py-16 space-y-16">
      <JsonLd data={makeSchema} id={`${makeSlug}-make-schema`} />
      <JsonLd
        data={vehicleCollectionSchema}
        id={`${makeSlug}-vehicle-collection-schema`}
      />
      <JsonLd data={breadcrumbSchema} id={`${makeSlug}-breadcrumb-schema`} />

      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Car className="h-8 w-8 text-battery" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
            <span className="text-battery">{make}</span> Battery Replacement
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Find the right battery for your {make} vehicle. Select your model below to see
          recommended batteries, fitment guides, and pricing.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button asChild size="lg" variant="battery">
            <a href="tel:0101096211" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call for {make} fitment
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-green-600 hover:bg-green-700 text-white">
            <a
              href={`https://wa.me/27823046926?text=${encodeURIComponent(make + ' battery quote')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              WhatsApp quote
            </a>
          </Button>
        </div>
        <Separator className="pt-4" />
      </section>

      {/* Select Your Model Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          Select Your {make} Model
        </h2>
        <p className="text-lg text-muted-foreground">
          Choose your specific {make} model to see battery recommendations, fitment
          guides, and service options.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <Link
              key={vehicle.slug}
              href={`/vehicles/${vehicle.slug}`}
              className="group border border-border rounded-xl p-6 bg-card hover:border-battery transition-all hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Battery className="h-5 w-5 text-battery" />
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-battery transition-colors">
                    {vehicle.headline}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{vehicle.years}</p>
                <p className="text-sm text-foreground line-clamp-2">
                  {vehicle.description}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm font-semibold text-battery">
                    View fitment guide →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Best Selling Batteries for Make */}
      {popularProducts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Best Selling Batteries for {make}
          </h2>
          <p className="text-lg text-muted-foreground">
            These are the most commonly installed batteries for {make} vehicles in
            Alberton.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="border border-border rounded-lg p-6 bg-card shadow-sm"
              >
                <h3 className="text-xl font-semibold text-foreground">
                  {product.name}
                </h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-semibold text-foreground">
                      {product.ahCapacity}Ah
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CCA:</span>
                    <span className="font-semibold text-foreground">
                      {product.cca || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warranty:</span>
                    <span className="font-semibold text-foreground">
                      {product.warrantyMonths} months
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="text-xl font-black text-battery">
                      {product.sellingPrice_OUTPUT}
                    </span>
                  </div>
                </div>
                <Button
                  className="mt-4 w-full"
                  size="sm"
                  variant="outline"
                  asChild
                >
                  <a href={`/product/${product.id}`}>View details</a>
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      <Separator className="bg-border" />

      {/* Service Information */}
      <section className="bg-card/40 border border-border rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          {make} Battery Services in Alberton
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3 p-5 rounded-xl bg-background border border-border">
            <h3 className="text-xl font-semibold text-battery">
              Mobile Battery Replacement
            </h3>
            <p className="text-muted-foreground">
              We come to you in Alberton, New Redruth, and Meyersdal with the correct
              {make} battery preloaded. Free fitment and alternator testing included.
            </p>
            <Link
              href="/services"
              className="text-sm font-semibold text-foreground hover:text-battery"
            >
              Learn more →
            </Link>
          </div>
          <div className="space-y-3 p-5 rounded-xl bg-background border border-border">
            <h3 className="text-xl font-semibold text-battery">
              Free Battery Testing
            </h3>
            <p className="text-muted-foreground">
              Confirm your {make}'s alternator and starter health before replacing the
              battery. We test on-site or in-store.
            </p>
            <Link
              href="/testing"
              className="text-sm font-semibold text-foreground hover:text-battery"
            >
              Book a test →
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-4">
          <MapPin className="h-5 w-5 text-battery" />
          <p className="text-sm text-foreground">
            Service area: Alberton, New Redruth, Meyersdal, Brackenhurst, Alrode
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-4 bg-secondary/20 border border-border rounded-2xl p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Need help choosing the right battery?
        </p>
        <h2 className="text-3xl font-bold text-foreground">
          Talk to Alberton's certified battery technicians
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" variant="battery">
            <a href="tel:0101096211">Call 010 109 6211</a>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-green-600 hover:bg-green-700 text-white">
            <a
              href={`https://wa.me/27823046926?text=${encodeURIComponent(make + ' battery quote')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp the workshop
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

