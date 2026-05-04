// src/app/about/page.tsx
import { Battery, MapPin, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, BUSINESS_ADDRESS, BUSINESS_CONTACT } from "@/lib/seo-constants";

// --- NEW: Page-Specific Metadata for SEO with Open Graph ---
export const metadata: Metadata = {
  title: "About Alberton Battery Mart | Your Local Battery Experts",
  description: "Learn about Alberton Battery Mart. We are your local, multi-brand battery specialists offering expert advice, free fitment, and mobile callouts in Alberton.",
  keywords: [
    'about Alberton Battery Mart',
    'battery experts Alberton',
    'multi-brand battery specialist',
    'battery store Alberton',
    'local battery shop'
  ],
  openGraph: {
    title: "About Alberton Battery Mart | Your Local Battery Experts",
    description: "Learn about Alberton Battery Mart. We are your local, multi-brand battery specialists offering expert advice, free fitment, and mobile callouts.",
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
    title: "About Alberton Battery Mart | Your Local Battery Experts",
    description: "Learn about Alberton Battery Mart. We are your local, multi-brand battery specialists offering expert advice, free fitment, and mobile callouts.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za/about',
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Alberton Battery Mart",
  description: "Alberton's independent, multi-brand battery specialists offering expert advice, free fitment, and mobile callouts.",
  url: BASE_URL,
  address: {
    "@type": "PostalAddress",
    ...BUSINESS_ADDRESS,
  },
  telephone: BUSINESS_CONTACT.telephone,
  email: "admin@albertonbatterymart.co.za",
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
      <JsonLd data={ORGANIZATION_SCHEMA} id="organization-schema" />
      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <div className="container py-16 space-y-12 max-w-5xl">
      
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
        Founded on the principle of providing **honest advice and reliable power**, Alberton Battery Mart is not just another parts store. We are a dedicated, local business focused on solving your battery problems with the right solution, not just the most expensive one.
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
            Our mission is simple: to be the **#1 trusted battery expert in Alberton**. We win by providing value that online-only stores and generic fitment chains can't match. We are physically here at <strong>28 St Columb Rd</strong>, ready to provide free on-site diagnostics, alternator testing, and professional fitment while you wait.
          </p>
        </div>

        {/* Our Advantage: The "Multi-Brand" Pillar */}
        <div className="space-y-4 bg-card border border-border p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-battery" />
            <h2 className="text-3xl font-bold text-foreground">Our Expert Advantage</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            We are not locked into one brand. As official stockists of **Willard, Exide, and Enertec**, our loyalty is to you, the customer. We provide unbiased, expert advice to ensure you get the *correct* battery for your specific vehicle (Car, Truck, or Motorcycle) and budget, all backed by a full manufacturer warranty.
          </p>
        </div>
      </div>

      <div className="pt-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Ready to Get the Right Battery, First Time?</h3>
        <Button asChild size="xl" variant="battery" className="shadow-lg">
          <Link href="/products">View Our Full Product Range</Link>
        </Button>
      </div>
    </div>
    </>
  );
}