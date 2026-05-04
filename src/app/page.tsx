// src/app/page.tsx
import dynamicImport from 'next/dynamic';
import { Metadata } from 'next';
import HeroSection from "@/components/layout/HeroSection";

// Optimized for static generation
export const dynamic = 'auto';

// Lazy-load all components below the fold
const TrustAuthoritySection = dynamicImport(() => import('@/components/layout/TrustAuthoritySection'));
const ServiceGrid = dynamicImport(() => import('@/components/layout/ServiceGrid'));
const ProductSpotlight = dynamicImport(() => import('@/components/content/ProductSpotlight'));
const StorefrontCTA = dynamicImport(() => import('@/components/layout/StorefrontCTA'));
const TestimonialSection = dynamicImport(() => import('@/components/layout/TestimonialSection'));
const FaqSection = dynamicImport(() => import('@/components/layout/FaqSection'));
const ContactForm = dynamicImport(() => import('@/components/content/ContactForm'));
const ThinCta = dynamicImport(() => import('@/components/layout/ThinCta'));
const AtomicAnswers = dynamicImport(() => import('@/components/seo/AtomicAnswers'));

// --- SEO: Homepage Metadata with Open Graph ---
export const metadata: Metadata = {
  title: 'Alberton Battery Mart | Mobile Battery Replacement & Fitment Service',
  description: 'Fast, certified mobile battery replacement service in Alberton, New Redruth, and Meyersdal. We bring the Willard & Exide battery to you. Free fitment, testing, and 24-month warranty. Call 010 109 6211.',
  keywords: [
    'battery replacement Alberton',
    'car battery Alberton',
    'mobile battery service',
    'Willard batteries Alberton',
    'Exide batteries Alberton',
    'battery fitment Alberton',
    'car battery New Redruth',
    'battery testing Alberton',
    'AGM battery Alberton',
    'EFB battery Alberton',
    'mobile callout Alberton',
    'battery specialist Alberton'
  ],
  openGraph: {
    title: 'Alberton Battery Mart | Mobile Battery Replacement & Fitment Service',
    description: 'Fast, certified mobile battery replacement service in Alberton, New Redruth, and Meyersdal. Free fitment, testing, and 24-month warranty.',
    url: 'https://www.albertonbatterymart.co.za',
    siteName: 'Alberton Battery Mart',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alberton Battery Mart - Mobile Battery Replacement Service',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alberton Battery Mart | Mobile Battery Replacement & Fitment Service',
    description: 'Fast, certified mobile battery replacement service in Alberton. Free fitment, testing, and 24-month warranty.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za',
  },
};

export default function Home() {
  return (
    <main>
      
      {/* 1. HERO: Grabs immediate attention & captures urgent leads. */}
      <HeroSection variant="control" />
      
      {/* 2. TRUST & AUTHORITY: Instantly builds trust and authority. Answers "Why you?" */}
      <TrustAuthoritySection />

      {/* 3. CORE SERVICES: Shows what you do. (Car, Truck, Solar, etc.) */}
      <ServiceGrid /> 

      {/* 3b. Atomic answers for AI + Helpful Content */}
      <AtomicAnswers />
      
      {/* 4. PRODUCT SPOTLIGHT: Shows what you sell. (FIXED to 3 products) */}
      <ProductSpotlight count={3} /> 
      
      {/* 5. LOCAL SEO & PHYSICAL PROOF: Cements your local presence. "We are a real store." */}
      <StorefrontCTA />
      
      {/* 6. SOCIAL PROOF: Builds trust with user reviews. */}
      <TestimonialSection /> 

      {/* 7. EXPERTISE & FAQ: Overcomes customer objections and builds expert status. */}
      <FaqSection />

      {/* 8. DIRECT LEAD CAPTURE: A full contact form for non-urgent/bulk inquiries. */}
      <section className="container py-16 max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-10">
            <h2 className="text-4xl font-extrabold text-foreground">
              Have a Specific Inquiry?
            </h2>
            <p className="text-xl text-muted-foreground">
              For bulk orders, solar quotes, or non-urgent questions, send us a message.
            </p>
        </div>
        <ContactForm />
      </section>

      {/* 9. FINAL CTA: The final, unmissable call to action. */}
      <ThinCta />
    </main>
  );
}