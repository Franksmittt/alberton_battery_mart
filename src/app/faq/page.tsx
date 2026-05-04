// src/app/faq/page.tsx
import FaqPageContent from "@/components/layout/FaqPageContent";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

// --- NEW: Page-Specific Metadata for SEO with Open Graph ---
export const metadata: Metadata = {
  title: "FAQ - Alberton Battery Mart | Free Testing & Fitment",
  description: "Answers to common battery questions in Alberton. Learn about our free callouts, warranty, and AGM/EFB batteries. Get expert advice.",
  keywords: [
    'battery FAQ Alberton',
    'battery questions',
    'AGM battery questions',
    'EFB battery questions',
    'battery warranty',
    'mobile callout service',
    'battery testing Alberton'
  ],
  openGraph: {
    title: "FAQ - Alberton Battery Mart | Free Testing & Fitment",
    description: "Answers to common battery questions in Alberton. Learn about our free callouts, warranty, and AGM/EFB batteries.",
    url: 'https://www.albertonbatterymart.co.za/faq',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FAQ - Alberton Battery Mart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FAQ - Alberton Battery Mart | Free Testing & Fitment",
    description: "Answers to common battery questions in Alberton. Learn about our free callouts, warranty, and AGM/EFB batteries.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za/faq',
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
      name: "FAQ",
      item: `${BASE_URL}/faq`,
    },
  ],
};

// This page serves as the dedicated SEO resource for FAQ keywords
export default function FaqPage() {
  return (
    <>
      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <FaqPageContent />
    </>
  );
}