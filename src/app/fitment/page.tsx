// src/app/fitment/page.tsx
import { Zap, ShieldCheck, Phone, MapPin, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, BUSINESS_ADDRESS, BUSINESS_CONTACT } from "@/lib/seo-constants";

// --- NEW: Page-Specific Metadata for SEO ---
export const metadata: Metadata = {
  title: "Free Battery Fitment & Testing Service in Alberton",
  description: "We offer free, professional battery fitment and alternator testing in Alberton. We ensure your warranty is validated and your car's BMS is correctly calibrated.",
  keywords: [
    'free battery fitment Alberton',
    'battery installation',
    'BMS coding',
    'battery warranty',
    'professional fitment'
  ],
  openGraph: {
    title: "Free Battery Fitment & Testing Service in Alberton",
    description: "We offer free, professional battery fitment and alternator testing in Alberton. We ensure your warranty is validated and your car's BMS is correctly calibrated.",
    url: `${BASE_URL}/fitment`,
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Battery Fitment - Alberton Battery Mart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Battery Fitment & Testing Service in Alberton",
    description: "We offer free, professional battery fitment and alternator testing in Alberton. We ensure your warranty is validated and your car's BMS is correctly calibrated.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: `${BASE_URL}/fitment`,
  },
};

const EMERGENCY_PHONE = "0101096211";

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Free Professional Battery Fitment & Testing",
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
  serviceType: "Battery Installation",
  description: "Free, professional battery fitment and alternator testing in Alberton. We ensure your warranty is validated and your car's BMS is correctly calibrated.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ZAR",
    description: "Free fitment with battery purchase",
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
      name: "Free Battery Fitment",
      item: `${BASE_URL}/fitment`,
    },
  ],
};

export default function FitmentPage() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} id="service-schema" />
      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <div className="container py-16 text-center space-y-8 max-w-3xl">
      <ShieldCheck className="h-12 w-12 text-battery mx-auto" />
      
      {/* --- NEW: SEO-Optimized H1 --- */}
      <h1 className="text-5xl font-extrabold text-foreground">
        Free Professional Battery Fitment & Testing
      </h1>
      
      {/* --- NEW: Local Keyword Injection --- */}
      <p className="text-xl text-muted-foreground">
        When you purchase a battery from our **Alberton** store, the fitment and testing service is **entirely free**. This ensures a professional, warrantied installation every time.
      </p>
      
      <div className="bg-card p-6 rounded-lg border border-border shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-battery">Why Professional Fitment Matters</h2>
        <ul className="text-left text-foreground space-y-2">
            <li className="flex items-start space-x-3"><Zap className="h-5 w-5 text-battery flex-shrink-0 mt-1" /><span>**Warranty Validation:** Manufacturer warranties often require professional installation.</span></li>
            <li className="flex items-start space-x-3"><Zap className="h-5 w-5 text-battery flex-shrink-0 mt-1" /><span>**Start/Stop Systems:** We correctly register and recalibrate the battery to your vehicle's Battery Monitoring System (BMS).</span></li>
            <li className="flex items-start space-x-3"><Zap className="h-5 w-5 text-battery flex-shrink-0 mt-1" /><span>**Corrosion Prevention:** Clean terminals, anti-corrosion spray, and secure mounting guaranteed.</span></li>
        </ul>
      </div>

      <Button asChild size="xl" variant="battery" className="mt-8 shadow-lg">
        <a href={`tel:${EMERGENCY_PHONE}`} className="flex items-center space-x-3 mx-auto">
          <Phone className="h-6 w-6" />
          <span>Call Now to Schedule Free Testing</span>
        </a>
      </Button>
    </div>
    </>
  );
}