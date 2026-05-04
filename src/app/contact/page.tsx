// src/app/contact/page.tsx
import { Metadata } from "next";
import { headers } from "next/headers";
import ContactPageContent from "@/components/content/ContactPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, BUSINESS_ADDRESS, BUSINESS_CONTACT } from "@/lib/seo-constants";

// Mark route as dynamic since we're using headers()
export const dynamic = 'force-dynamic';

// --- NEW: Page-Specific Metadata for SEO with Open Graph ---
export const metadata: Metadata = {
  title: "Contact Alberton Battery Mart | Callouts & Store Location",
  description: "Contact us for battery help. Call 010 109 6211, WhatsApp us, or visit our store at 28 St Columb Rd, New Redruth, Alberton for a free battery test.",
  keywords: [
    'contact battery service Alberton',
    'battery store Alberton',
    'battery shop New Redruth',
    'battery callout Alberton',
    'battery testing Alberton'
  ],
  openGraph: {
    title: "Contact Alberton Battery Mart | Callouts & Store Location",
    description: "Contact us for battery help. Call 010 109 6211, WhatsApp us, or visit our store at 28 St Columb Rd, New Redruth, Alberton.",
    url: 'https://www.albertonbatterymart.co.za/contact',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Alberton Battery Mart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Alberton Battery Mart | Callouts & Store Location",
    description: "Contact us for battery help. Call 010 109 6211, WhatsApp us, or visit our store at 28 St Columb Rd, New Redruth, Alberton.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za/contact',
  },
};

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "Alberton Battery Mart",
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    telephone: BUSINESS_CONTACT.telephone,
    email: "admin@albertonbatterymart.co.za",
    url: BASE_URL,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
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
      name: "Contact",
      item: `${BASE_URL}/contact`,
    },
  ],
};

export default function ContactPage() {
  const bucketHeader = headers().get("x-ab-bucket");
  const bucket: "control" | "variant" = bucketHeader === "variant" ? "variant" : "control";

  return (
    <>
      <JsonLd data={CONTACT_SCHEMA} id="contact-schema" />
      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <ContactPageContent bucket={bucket} />
    </>
  );
}