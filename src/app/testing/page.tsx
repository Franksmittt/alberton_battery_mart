// src/app/testing/page.tsx
import { Gauge, Phone, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, BUSINESS_ADDRESS, BUSINESS_CONTACT } from "@/lib/seo-constants";

// --- NEW: Page-Specific Metadata for SEO ---
export const metadata: Metadata = {
  title: "Free Battery, Starter & Alternator Test in Alberton | Alberton Battery Mart",
  description: "Get a 100% free, no-obligation battery, starter, and alternator test at our Alberton store. We only sell you a battery if you actually need one.",
  keywords: [
    'free battery test Alberton',
    'alternator test',
    'starter test',
    'battery diagnostics',
    'battery health check'
  ],
  openGraph: {
    title: "Free Battery, Starter & Alternator Test in Alberton | Alberton Battery Mart",
    description: "Get a 100% free, no-obligation battery, starter, and alternator test at our Alberton store. We only sell you a battery if you actually need one.",
    url: `${BASE_URL}/testing`,
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Battery Testing - Alberton Battery Mart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Battery, Starter & Alternator Test in Alberton | Alberton Battery Mart",
    description: "Get a 100% free, no-obligation battery, starter, and alternator test at our Alberton store. We only sell you a battery if you actually need one.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: `${BASE_URL}/testing`,
  },
};

const EMERGENCY_PHONE = "0101096211";
const EMERGENCY_PHONE_DISPLAY = "010 109 6211"; // Added for display

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Free Battery, Starter & Alternator Testing",
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
  serviceType: "Battery Diagnostics",
  description: "100% free, no-obligation battery, starter, and alternator test at our Alberton store.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ZAR",
    description: "Free diagnostic testing",
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
      name: "Free Battery Testing",
      item: `${BASE_URL}/testing`,
    },
  ],
};

export default function TestingPage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} id="service-schema" />
      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <div className="container py-16 space-y-12 max-w-4xl">
      <div className="text-center space-y-4">
        <Gauge className="h-16 w-16 text-battery mx-auto" />
        <h1 className="text-5xl font-extrabold text-foreground">
          Get a <span className="text-battery">FREE</span> 3-Point Diagnostic Test
        </h1>
        <p className="text-2xl text-muted-foreground font-medium">
          Don't guess. Know for sure. Visit our Alberton store for an instant, professional diagnostic of your **Battery, Starter, and Alternator.**
        </p>
      </div>
      
      {/* --- NEW: Authority & Trust Building Section --- */}
      <div className="bg-card p-8 rounded-lg border border-border shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-foreground">Why Is It Free? Because We're Honest Experts.</h2>
        <p className="text-lg text-muted-foreground">
          Our business is built on trust, not on upselling. We will **never** sell you a battery you don't need. Our free, advanced diagnostic test gives you a clear, honest answer to your problem.
        </p>
        <ul className="space-y-4 pt-4">
          <li className="flex items-start space-x-3">
            <ShieldCheck className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">Solve the Real Problem</h3>
              <p className="text-muted-foreground">Is it a dead battery, a faulty alternator, or a failing starter? Our test tells you the difference, saving you from replacing a perfectly good battery.</p>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <Zap className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">Instant, On-Site Results</h3>
               <p className="text-muted-foreground">The test takes less than 5 minutes. You get a printout showing your battery's health, charge, your starter's draw, and your alternator's performance.</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="text-center pt-8 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">
          Worried About Your Battery? Visit Us Today.
        </h3>
        <p className="text-lg text-muted-foreground">No appointment needed for in-store testing.</p>
        <Button asChild size="xl" variant="battery" className="shadow-lg">
          <a href={`tel:${EMERGENCY_PHONE}`} className="flex items-center space-x-3 mx-auto">
            <Phone className="h-6 w-6" />
            <span>Call Us for Mobile Testing: {EMERGENCY_PHONE_DISPLAY}</span>
          </a>
        </Button> {/* <-- This was the line with the error. It is now fixed. */}
      </div>
    </div>
    </>
  );
}