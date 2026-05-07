import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, ShieldCheck, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AtomicAnswers from "@/components/seo/AtomicAnswers";
import FaqSection from "@/components/layout/FaqSection";
import ProductSpotlight from "@/components/content/ProductSpotlight";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, BUSINESS_ADDRESS, BUSINESS_CONTACT } from "@/lib/seo-constants";
import { getAllLocalAreas, getLocalAreaBySlug, getNearbyLocalAreas } from "@/data/local-areas";

type Params = {
  area: string;
};

const EMERGENCY_PHONE_LINK = "0101096211";
const EMERGENCY_PHONE_DISPLAY = "010 109 6211";

export async function generateStaticParams() {
  return getAllLocalAreas().map((area) => ({ area: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const area = getLocalAreaBySlug(params.area);
  if (!area) return {};

  const url = `${BASE_URL}/local/${area.slug}`;
  const title = `Mobile Battery Replacement ${area.name} | Alberton Battery Mart`;
  const description = `Fast mobile battery replacement in ${area.name}. ${area.responseWindow} response window, on-site testing, and professional fitment.`;

  return {
    title,
    description,
    keywords: [...area.focusKeywords, `${area.name} car battery`, `battery service ${area.name}`],
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "en_ZA",
      siteName: "Alberton Battery Mart",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Battery replacement ${area.name}`,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function LocalAreaPage({ params }: { params: Params }) {
  const area = getLocalAreaBySlug(params.area);
  if (!area) notFound();
  const nearbyAreas = getNearbyLocalAreas(area.slug);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Alberton Battery Mart - ${area.name} Service`,
    description: `Mobile battery replacement and diagnostics for ${area.name}`,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    telephone: BUSINESS_CONTACT.telephone,
    url: `${BASE_URL}/local/${area.slug}`,
    areaServed: [
      {
        "@type": "City",
        name: area.name,
      },
    ],
    serviceType: "Mobile Battery Replacement",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Mobile battery replacement in ${area.name}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Alberton Battery Mart",
      telephone: BUSINESS_CONTACT.telephone,
      url: BASE_URL,
      address: {
        "@type": "PostalAddress",
        ...BUSINESS_ADDRESS,
      },
    },
    areaServed: [
      {
        "@type": "City",
        name: area.name,
      },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      description: "On-site battery testing, replacement fitment, and charging-system checks",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
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
        name: "Service Areas",
        item: `${BASE_URL}/local`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: area.name,
        item: `${BASE_URL}/local/${area.slug}`,
      },
    ],
  };

  return (
    <div className="space-y-16">
      <JsonLd data={localBusinessSchema} id={`local-schema-${area.slug}`} />
      <JsonLd data={serviceSchema} id={`local-service-schema-${area.slug}`} />
      <JsonLd data={faqSchema} id={`local-faq-schema-${area.slug}`} />
      <JsonLd data={breadcrumbSchema} id={`local-breadcrumb-schema-${area.slug}`} />

      <section className="bg-card border-b border-border py-20">
        <div className="container text-center max-w-4xl space-y-6">
          <span className="text-battery font-bold text-lg uppercase">
            Hyper-Local Service: {area.name}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
            Mobile Battery Replacement in{" "}
            <span className="text-battery">{area.name}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {area.areaSummary} Our dispatch team normally reaches {area.name} in{" "}
            {area.responseWindow} with stocked replacement batteries and diagnostic
            tools.
          </p>
          <Button asChild size="xl" variant="battery" trackingId={`local-${area.slug}-call`}>
            <a href={`tel:${EMERGENCY_PHONE_LINK}`} className="flex items-center gap-3 mx-auto">
              <Phone className="h-6 w-6" />
              <span>Call Now: {EMERGENCY_PHONE_DISPLAY}</span>
            </a>
          </Button>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="secondary" trackingId={`local-${area.slug}-whatsapp`}>
              <a
                href={`https://wa.me/27823046926?text=Hi,%20I%20need%20battery%20help%20in%20${encodeURIComponent(area.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp dispatch
              </a>
            </Button>
            <Button asChild variant="outline" trackingId={`local-${area.slug}-service-page`}>
              <Link href="/services/mobile-battery-replacement/alberton">
                View mobile replacement service
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container grid lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-foreground">
            Why drivers in {area.name} choose us
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              We route quickly through {area.roads.join(" and ")} and operate with
              suburb-aware dispatch planning to reduce breakdown downtime.
            </p>
            <p>
              Typical local landmarks we service include {area.landmarks.join(" and ")}.
            </p>
          </div>
          <div className="bg-secondary/30 rounded-lg border border-border p-5">
            <h3 className="font-semibold text-foreground mb-3">Common vehicles we service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {area.keyVehicles.map((vehicle) => (
                <li key={vehicle} className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-battery mt-0.5" />
                  <span>{vehicle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4 bg-secondary/20 rounded-lg border border-border p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-battery" />
            <h3 className="text-xl font-bold text-foreground">Diagnostics-first process</h3>
          </div>
          <p className="text-muted-foreground">
            Every replacement includes battery testing and alternator validation before
            final fitment.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-battery mt-0.5" />
              <span>Midtronics load testing before replacement</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-battery mt-0.5" />
              <span>Alternator and starter checks to prevent repeat failures</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-battery mt-0.5" />
              <span>On-site card payment and warranty documentation</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Prefer in-store service? Visit us at{" "}
            <Link href="/contact" className="text-battery underline">
              28 St Columb Rd, New Redruth
            </Link>
            .
          </p>
        </div>
      </section>

      <Separator />

      <section className="container">
        <AtomicAnswers
          answers={area.faq.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))}
        />
      </section>

      {nearbyAreas.length > 0 && (
        <>
          <Separator />
          <section className="container space-y-5">
            <h2 className="text-2xl font-bold text-foreground">
              Nearby service areas
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyAreas.map((nearbyArea) => (
                <Link
                  key={nearbyArea.slug}
                  href={`/local/${nearbyArea.slug}`}
                  className="rounded-lg border border-border bg-card p-4 hover:border-battery transition-colors"
                >
                  <p className="font-semibold text-foreground">
                    {nearbyArea.name} battery support
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Typical response window: {nearbyArea.responseWindow}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <Separator />
      <ProductSpotlight count={3} />
      <FaqSection />
    </div>
  );
}
