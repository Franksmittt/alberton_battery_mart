// src/app/local/meyersdal/page.tsx
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
  title: 'Mobile Battery Replacement Meyersdal | Alberton Battery Mart',
  description: 'Fast, on-site mobile battery replacement for Meyersdal. We come to you with Willard & Exide batteries. Free fitment & alternator testing.',
  keywords: [
    'battery replacement Meyersdal',
    'mobile battery service Meyersdal',
    'car battery Meyersdal Eco Estate',
    'battery callout Meyersdal',
    'AGM battery fitment Meyersdal',
  ],
  openGraph: {
    title: 'Mobile Battery Replacement Meyersdal | Alberton Battery Mart',
    description: 'Fast, on-site mobile battery replacement for Meyersdal. We come to you. Free fitment & alternator testing.',
    url: 'https://www.albertonbatterymart.co.za/local/meyersdal',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mobile Battery Service Meyersdal - Alberton Battery Mart',
      },
    ],
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile Battery Replacement Meyersdal | Alberton Battery Mart',
    description: 'Fast, on-site mobile battery replacement for Meyersdal. We come to you. Free fitment & alternator testing.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za/local/meyersdal',
  },
};

// --- CONTACTS ---
const EMERGENCY_PHONE_DISPLAY = "010 109 6211";
const EMERGENCY_PHONE_LINK = "0101096211";

export default function MeyersdalPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Alberton Battery Mart - Meyersdal Service",
    description: "Mobile battery replacement and premium AGM fitment service for Meyersdal, Meyersdal Eco Estate, and surrounding areas",
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    telephone: BUSINESS_CONTACT.telephone,
    url: `${BASE_URL}/local/meyersdal`,
    areaServed: [
      {
        "@type": "City",
        name: "Meyersdal",
      },
      {
        "@type": "City",
        name: "Meyersdal Eco Estate",
      },
    ],
    serviceType: "Mobile Battery Replacement & Premium AGM Fitment",
  };

  return (
    <div className="space-y-16">
      <JsonLd data={localBusinessSchema} id="meyersdal-schema" />
      
      {/* --- 1. HYPER-LOCAL HERO --- */}
      <section className="bg-card border-b border-border py-20">
        <div className="container text-center max-w-4xl space-y-6">
          <span className="text-battery font-bold text-lg uppercase">
            Hyper-Local Service: Meyersdal
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
            Mobile Battery Replacement in <span className="text-battery">Meyersdal</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Stuck at home in the Meyersdal Eco Estate or near the Virgin Active? Our mobile team brings the store to you. We provide fast, on-site battery testing and expert fitment.
          </p>
          <Button asChild size="xl" variant="battery" className="shadow-lg" trackingId="local-meyersdal-call">
            <a href={`tel:${EMERGENCY_PHONE_LINK}`} className="flex items-center space-x-3 mx-auto">
              <Phone className="h-6 w-6" />
              <span>Call for Immediate Help in Meyersdal</span>
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
              Your Specialist <span className="text-battery">On-Site</span> Service
            </h2>
            <p className="text-lg text-muted-foreground">
              Why get a jump start just to get stuck again? We are your local Alberton specialists, based minutes away from Meyersdal, ready to dispatch a full-service mobile unit to your location.
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
                    Prefer to visit? Our main store is just a short drive away at <Link href="/contact" className="text-battery underline">28 St Columb Rd, New Redruth</Link>.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Right: Local Image (Placeholder) */}
          <div className="w-full h-80 bg-secondary/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <p className="text-muted-foreground">Placeholder: Image of Meyersdal suburb or landmark</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* --- 2.5. ATOMIC ANSWERS FOR AI OVERVIEWS --- */}
      <section className="container">
        <AtomicAnswers
          answers={[
            {
              question: "How fast is mobile battery service in Meyersdal?",
              answer: "Our mobile unit typically reaches Meyersdal locations (Eco Estate, Virgin Active area) within 45-60 minutes. We stock premium AGM batteries for BMW, Mercedes, and Audi vehicles common in Meyersdal.",
            },
            {
              question: "Do you offer BMS coding for premium vehicles in Meyersdal?",
              answer: "Yes. We're one of the few specialists in Alberton with advanced diagnostic tools for BMW, Mercedes, and Audi BMS registration. This is essential for AGM batteries in modern Start/Stop vehicles.",
            },
            {
              question: "Can I visit your store instead of mobile service?",
              answer: "Absolutely. Our main store at 28 St Columb Rd, New Redruth is just a short drive from Meyersdal. Walk-ins welcome Mon-Fri 8am-5pm, Sat 8am-1pm.",
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