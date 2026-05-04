// src/app/local/new-redruth/page.tsx
import { Metadata } from 'next';
import { Phone, MapPin, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import ProductSpotlight from '@/components/content/ProductSpotlight';
import FaqSection from '@/components/layout/FaqSection';
import { JsonLd } from '@/components/seo/JsonLd';
import AtomicAnswers from '@/components/seo/AtomicAnswers';
import { BASE_URL, BUSINESS_ADDRESS, BUSINESS_CONTACT } from '@/lib/seo-constants';

// --- SEO: Hyper-Local Metadata ---
export const metadata: Metadata = {
  title: 'Mobile Battery Replacement New Redruth | Alberton Battery Mart',
  description: 'Fast, on-site mobile battery replacement for New Redruth. We come to you with Willard & Exide batteries. Free fitment & alternator testing.',
  keywords: [
    'battery replacement New Redruth',
    'mobile battery service New Redruth',
    'car battery St Columb Rd',
    'battery callout New Redruth',
    'battery shop New Redruth',
  ],
  openGraph: {
    title: 'Mobile Battery Replacement New Redruth | Alberton Battery Mart',
    description: 'Fast, on-site mobile battery replacement for New Redruth. We come to you. Free fitment & alternator testing.',
    url: 'https://www.albertonbatterymart.co.za/local/new-redruth',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mobile Battery Service New Redruth - Alberton Battery Mart',
      },
    ],
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile Battery Replacement New Redruth | Alberton Battery Mart',
    description: 'Fast, on-site mobile battery replacement for New Redruth. We come to you. Free fitment & alternator testing.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za/local/new-redruth',
  },
};

// --- CONTACTS ---
const EMERGENCY_PHONE_DISPLAY = "010 109 6211";
const EMERGENCY_PHONE_LINK = "0101096211";

export default function NewRedruthPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Alberton Battery Mart - New Redruth Service",
    description: "Mobile battery replacement and store-based service for New Redruth, St Columb Rd, and surrounding areas",
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    telephone: BUSINESS_CONTACT.telephone,
    url: `${BASE_URL}/local/new-redruth`,
    areaServed: [
      {
        "@type": "City",
        name: "New Redruth",
      },
    ],
    serviceType: "Mobile Battery Replacement & Store-Based Service",
  };

  return (
    <div className="space-y-16">
      <JsonLd data={localBusinessSchema} id="new-redruth-schema" />
      
      {/* --- 1. HYPER-LOCAL HERO --- */}
      <section className="bg-card border-b border-border py-20">
        <div className="container text-center max-w-4xl space-y-6">
          <span className="text-battery font-bold text-lg uppercase">
            Hyper-Local Service: New Redruth
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
            Mobile Battery Replacement in <span className="text-battery">New Redruth</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Stuck at home or the office in New Redruth? Our mobile team brings the store to you. We provide fast, on-site battery testing and expert fitment for your car, truck, or bike.
          </p>
          <Button asChild size="xl" variant="battery" className="shadow-lg" trackingId="local-new-redruth-call">
            <a href={`tel:${EMERGENCY_PHONE_LINK}`} className="flex items-center space-x-3 mx-auto">
              <Phone className="h-6 w-6" />
              <span>Call for Immediate Help in New Redruth</span>
            </a>
          </Button>
        </div>
      </section>

      {/* --- 2. LOCAL PROOF & SERVICES --- */}
      <section className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Local Service Details */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground">
              Your Local <span className="text-battery">On-Site</span> Specialists
            </h2>
            <p className="text-lg text-muted-foreground">
              Why drive to a fitment centre when we can come directly to your address on St Columb Rd, Penzance St, or anywhere in New Redruth? We are based just minutes away.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start space-x-3">
                <Zap className="h-6 w-6 text-battery mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Fast Mobile Dispatch</h3>
                  <p className="text-muted-foreground text-base">Our mobile unit is equipped to handle 99% of battery issues on-site.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <ShieldCheck className="h-6 w-6 text-battery mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Full Warranty & Testing</h3>
                  <p className="text-muted-foreground text-base">All batteries include a full manufacturer warranty, plus our free on-site alternator test to ensure your charging system is healthy.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-battery mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Visit Our Nearby Store</h3>
                  <p className="text-muted-foreground text-base">
                    Prefer to visit? Our main store is just down the road at <Link href="/contact" className="text-battery underline">28 St Columb Rd, New Redruth</Link>.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Right: Local Image (Placeholder) */}
          <div className="w-full h-80 bg-secondary/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <p className="text-muted-foreground">Placeholder: Image of New Redruth suburb or local landmark</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* --- 2.5. ATOMIC ANSWERS FOR AI OVERVIEWS --- */}
      <section className="container">
        <AtomicAnswers
          answers={[
            {
              question: "How fast is mobile battery service in New Redruth?",
              answer: "Our mobile unit typically reaches New Redruth addresses (St Columb Rd, Penzance St, etc.) within 30-45 minutes since we're based here. We carry Willard and Exide batteries in stock for immediate fitment.",
            },
            {
              question: "Can I visit your store in New Redruth instead?",
              answer: "Yes! Our main store is at 28 St Columb Rd, New Redruth. Walk-ins welcome Mon-Fri 8am-5pm, Sat 8am-1pm. We also offer free battery testing and diagnostics at the store.",
            },
            {
              question: "Do you test alternators during mobile callouts in New Redruth?",
              answer: "Yes. Every mobile battery replacement includes a free Midtronics digital alternator test. This prevents repeat failures and ensures your charging system is healthy before we leave.",
            },
          ]}
        />
      </section>

      <Separator />

      {/* --- 3. RE-USED PRODUCT SPOTLIGHT --- */}
      <ProductSpotlight count={3} />

      {/* --- 4. RE-USED FAQ SECTION --- */}
      <FaqSection />

    </div>
  );
}