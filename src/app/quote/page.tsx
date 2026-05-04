// src/app/quote/page.tsx
import { Battery, Mail, Phone, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import ContactForm from "@/components/content/ContactForm"; // <-- IMPORTED
import QuoteTrackingWrapper from "@/components/layout/QuoteTrackingWrapper";
import { headers } from "next/headers";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, BUSINESS_ADDRESS, BUSINESS_CONTACT } from "@/lib/seo-constants";

// Mark route as dynamic since we're using headers()
export const dynamic = 'force-dynamic';

// --- NEW: Page-Specific Metadata for SEO ---
export const metadata: Metadata = {
  title: "Solar & Inverter Quote Alberton | Alberton Battery Mart",
  description: "Request a free quote for solar, inverter, or bulk battery orders in Alberton. Our specialists will design a custom power solution for you.",
  keywords: [
    'solar battery quote Alberton',
    'inverter battery quote',
    'bulk battery order',
    'deep cycle battery quote',
    'solar power solution Alberton'
  ],
  openGraph: {
    title: "Solar & Inverter Quote Alberton | Alberton Battery Mart",
    description: "Request a free quote for solar, inverter, or bulk battery orders in Alberton. Our specialists will design a custom power solution for you.",
    url: `${BASE_URL}/quote`,
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alberton Battery Mart - Solar & Inverter Quote',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Solar & Inverter Quote Alberton | Alberton Battery Mart",
    description: "Request a free quote for solar, inverter, or bulk battery orders in Alberton. Our specialists will design a custom power solution for you.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: `${BASE_URL}/quote`,
  },
};

const EMERGENCY_PHONE = "0101096211";
const EMAIL_ADDRESS = "admin@albertonbatterymart.co.za";

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
  description: "Request a free quote for solar, inverter, or bulk battery orders in Alberton. Our specialists will design a custom power solution for you.",
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
  const bucket = bucketHeader === "variant" ? "variant" : "control";

  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} id="service-schema" />
      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <QuoteTrackingWrapper bucket={bucket} viewEventName="quote_page_view" ctaEventName="quote_page_cta_click">
        {({ trackCta }) => (
          <div className="container py-16 space-y-12 max-w-4xl">
      
      <div className="text-center space-y-4">
        <Battery className="h-16 w-16 text-battery mx-auto" />
        <h1 className="text-5xl font-extrabold text-foreground">Request a Quote</h1>
        <p className="text-2xl text-muted-foreground font-medium">
          For Solar, Inverter, or Bulk Commercial Orders in Alberton.
        </p>
      </div>
      
      {/* --- NEW: Authority & Trust Building Section --- */}
      <div className="bg-card border border-border p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          Expert Solutions for Load Shedding & Commercial Needs
        </h2>
        <p className="text-lg text-muted-foreground">
          Don't just buy a battery; invest in the right power solution. Our specialists will analyze your needs—whether for a home inverter, full solar setup, or a commercial fleet—and provide a detailed, no-obligation quote.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 pt-4">
          <div className="flex items-start space-x-3">
            <Zap className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">AGM & Lithium Experts</h3>
              <p className="text-muted-foreground">We specialize in Deep Cycle AGM and high-performance Lithium (LiFePO₄) batteries for maximum lifespan.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ShieldCheck className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">Multi-Brand Guarantee</h3>
              <p className="text-muted-foreground">We source from Willard, Enertec, and Exide to build the most cost-effective solution for your budget.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- NEW: Replaced placeholder with the actual form --- */}
      <div>
        <h3 className="text-3xl font-bold text-foreground text-center mb-6">Send Us Your Inquiry</h3>
        <ContactForm />
      </div>

      {/* --- Fallback CTA --- */}
      <div className="text-center space-y-4 pt-8">
        <p className="text-lg text-foreground">
          For immediate assistance, please call us directly:
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" variant="battery">
            <a href={`tel:${EMERGENCY_PHONE}`} className="flex items-center space-x-2" onClick={() => trackCta("call")}>
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center space-x-2" onClick={() => trackCta("email")}>
              <Mail className="h-5 w-5" />
              <span>Email Inquiry</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
        )}
      </QuoteTrackingWrapper>
    </>
  );
}