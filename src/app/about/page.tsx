// src/app/about/page.tsx
import { MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HubSection } from "@/components/seo/HubSection";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { PAGE_COPY } from "@/lib/store-positioning";
import { BASE_URL } from "@/lib/seo-constants";

// --- NEW: Page-Specific Metadata for SEO with Open Graph ---
export const metadata: Metadata = {
  title: PAGE_COPY.about.title,
  description: PAGE_COPY.about.description,
  keywords: [
    'about Alberton Battery Mart',
    'battery experts Alberton',
    'multi-brand battery specialist',
    'battery store Alberton',
    'local battery shop'
  ],
  openGraph: {
    title: PAGE_COPY.about.title,
    description: PAGE_COPY.about.description,
    url: 'https://www.albertonbatterymart.co.za/about',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alberton Battery Mart - About Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_COPY.about.title,
    description: PAGE_COPY.about.description,
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za/about',
    types: {
      'text/markdown': 'https://www.albertonbatterymart.co.za/about.md',
    },
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
      name: "About",
      item: `${BASE_URL}/about`,
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <PageJsonLd
        title={PAGE_COPY.about.title}
        description={PAGE_COPY.about.description}
        path="/about"
      />
      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <HubSection className="container py-16 space-y-12 max-w-5xl">
      
      {/* --- NEW: SEO-Optimized H1 & Subtitle --- */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-foreground">
          About <span className="text-battery">Alberton Battery Mart</span>
        </h1>
        <p className="text-2xl text-muted-foreground font-medium">
          Alberton's Independent, Multi-Brand Battery Specialists.
        </p>
      </div>
      
      <p className="text-xl text-foreground text-center max-w-3xl mx-auto">
        Founded on the principle of providing honest advice and reliable power, Alberton Battery Mart is not just another parts store. We are a dedicated, local business focused on solving your battery problems with the right solution, not just the most expensive one.
      </p>

      {/* --- NEW: Rewritten Content Blocks (SEO & Authority) --- */}
      <div className="grid md:grid-cols-2 gap-8 pt-8">
        
        {/* Our Mission: The "Local Specialist" Pillar */}
        <div className="space-y-4 bg-card border border-border p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-battery" />
            <h2 className="text-3xl font-bold text-foreground">Our Local Mission</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Our mission is to be the battery shop Alberton drivers actually drive to. The counter is at <strong>28 St Columb Rd, New Redruth</strong>, one quiet turn off Voortrekker Road. Walk in, get a free Midtronics test, and leave with a fitted battery when you need one. Mobile callouts exist if the car cannot reach us.
          </p>
        </div>

        {/* Our Advantage: The "Multi-Brand" Pillar */}
        <div className="space-y-4 bg-card border border-border p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-battery" />
            <h2 className="text-3xl font-bold text-foreground">Our Expert Advantage</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            We are not locked into one brand. As stockists of Willard, Exide, and Enertec, the recommendation matches the tray and the budget. Premium lines carry up to 36 months, registered at fitment. Named manufacturer cover, not a house-brand slogan.
          </p>
        </div>
      </div>

      <div className="pt-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Drive in to 28 St Columb Rd</h2>
        <Button asChild size="xl" variant="battery" className="shadow-lg">
          <Link href="/visit">How to find the shop</Link>
        </Button>
      </div>
    </HubSection>
    <RelatedContent />
    </>
  );
}