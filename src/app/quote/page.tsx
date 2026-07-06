// src/app/quote/page.tsx
import { Metadata } from "next";
import { headers } from "next/headers";
import QuotePageContent from "@/components/content/QuotePageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { BASE_URL, BUSINESS_ADDRESS, BUSINESS_CONTACT } from "@/lib/seo-constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Solar & Inverter Quote Alberton | Alberton Battery Mart",
  },
  description:
    "Request a free quote for solar, inverter, or bulk battery orders in Alberton. Our specialists will design a custom power solution for you.",
  keywords: [
    "solar battery quote Alberton",
    "inverter battery quote",
    "bulk battery order",
    "deep cycle battery quote",
    "solar power solution Alberton",
  ],
  openGraph: {
    title: "Solar & Inverter Quote Alberton | Alberton Battery Mart",
    description:
      "Request a free quote for solar, inverter, or bulk battery orders in Alberton. Our specialists will design a custom power solution for you.",
    url: `${BASE_URL}/quote`,
    type: "website",
    locale: "en_ZA",
    siteName: "Alberton Battery Mart",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alberton Battery Mart - Solar & Inverter Quote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar & Inverter Quote Alberton | Alberton Battery Mart",
    description:
      "Request a free quote for solar, inverter, or bulk battery orders in Alberton. Our specialists will design a custom power solution for you.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: `${BASE_URL}/quote`,
  },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Solar & Inverter Battery Quote Service",
  provider: {
    "@type": "LocalBusiness",
    name: "Alberton Battery Mart",
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    telephone: BUSINESS_CONTACT.telephone,
  },
  areaServed: ["Alberton", "New Redruth", "Meyersdal"],
  serviceType: "Battery Consultation",
  description:
    "Request a free quote for solar, inverter, or bulk battery orders in Alberton. Our specialists will design a custom power solution for you.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ZAR",
    description: "Free consultation and quote",
  },
};

const BREADCRUMB_SCHEMA = {
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
      name: "Request Quote",
      item: `${BASE_URL}/quote`,
    },
  ],
};

export default function QuotePage() {
  const bucketHeader = headers().get("x-ab-bucket");
  const bucket: "control" | "variant" =
    bucketHeader === "variant" ? "variant" : "control";

  return (
    <>
      <PageJsonLd
        title="Solar & Inverter Quote Alberton | Alberton Battery Mart"
        description="Request a free quote for solar, inverter, or bulk battery orders in Alberton. Our specialists will design a custom power solution for you."
        path="/quote"
      />
      <JsonLd data={SERVICE_SCHEMA} id="service-schema" />
      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <QuotePageContent bucket={bucket} />
      <RelatedContent />
    </>
  );
}
