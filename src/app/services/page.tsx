// src/app/services/page.tsx
import { Phone, MapPin, Zap, ShieldCheck, Clock, Gauge, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import AtomicAnswers from "@/components/seo/AtomicAnswers";

// --- NEW: Page-Specific Metadata for SEO with Open Graph ---
export const metadata: Metadata = {
  title: "Mobile Battery Replacement Service in Alberton | Alberton Battery Mart",
  description: "Fast mobile battery replacement and fitment in Alberton, New Redruth, & Meyersdal. We come to you. Free alternator testing with every callout.",
  keywords: [
    'mobile battery service Alberton',
    'battery callout Alberton',
    'mobile fitment service',
    'battery replacement Alberton',
    'on-site battery service',
    'mobile battery New Redruth',
    'battery service Meyersdal'
  ],
  openGraph: {
    title: "Mobile Battery Replacement Service in Alberton | Alberton Battery Mart",
    description: "Fast mobile battery replacement and fitment in Alberton, New Redruth, & Meyersdal. We come to you. Free alternator testing.",
    url: 'https://www.albertonbatterymart.co.za/services',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mobile Battery Replacement Service - Alberton Battery Mart',
      },
    ],
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mobile Battery Replacement Service in Alberton | Alberton Battery Mart",
    description: "Fast mobile battery replacement and fitment in Alberton, New Redruth, & Meyersdal. We come to you. Free alternator testing with every callout.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za/services',
  },
};

// --- FINAL VERIFIED CONTACT DETAILS & HOURS ---
const EMERGENCY_PHONE_DISPLAY = "010 109 6211";
const EMERGENCY_PHONE_LINK = "0101096211";
const WHATSAPP_NUMBER_LINK = "27823046926";
const WEEKDAY_HOURS = "08:00 AM – 5:00 PM"; 
const SATURDAY_HOURS = "08:00 AM – 12:00 PM";

export default function ServicesPage() {
  // --- Service Schema Markup ---
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Mobile Battery Replacement and Fitment",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Alberton Battery Mart",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "28 St Columb Rd",
        "addressLocality": "New Redruth",
        "addressRegion": "Alberton",
        "postalCode": "1450",
        "addressCountry": "ZA"
      },
      "telephone": "+27101096211",
      "url": "https://www.albertonbatterymart.co.za"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Alberton"
      },
      {
        "@type": "City",
        "name": "New Redruth"
      },
      {
        "@type": "City",
        "name": "Meyersdal"
      }
    ],
    "description": "Fast mobile battery replacement and fitment service in Alberton, New Redruth, and Meyersdal. Free alternator testing with every callout.",
    "offers": {
      "@type": "Offer",
      "description": "Mobile battery replacement service with free fitment and alternator testing"
    }
  };

  return (
    <div className="container py-16 space-y-16">
      {/* --- Add Service Schema --- */}
      <JsonLd data={serviceSchema} id="services-landing-schema" />
      
      {/* SECTION 1: HERO & PRIMARY CTA (H1 Focus) */}
      <div className="text-center space-y-4 border-b border-border pb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
          Mobile Battery <span className="text-battery">Replacement</span> in Alberton
        </h1>
        {/* --- SYNTAX FIX WAS HERE --- */}
         <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          We are the local, certified experts providing complete battery solutions: Fitment, Diagnostics, and Convenient Mobile Service for all vehicle types.
        </p>
        {/* --- It was </pre>, now it's </p> --- */}
        <Button asChild size="xl" variant="battery" className="mt-6 shadow-lg">
          <a href={`tel:${EMERGENCY_PHONE_LINK}`} className="flex items-center space-x-3 mx-auto">
             <Phone className="h-6 w-6" />
            <span>Call Us: {EMERGENCY_PHONE_DISPLAY}</span> 
          </a>
        </Button>
      </div>

      {/* SECTION 2: MOBILE SERVICE LOGISTICS (Logistical USP) */}
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <Zap className="h-12 w-12 text-battery" />
           <h2 className="text-4xl font-bold text-foreground">
            Fast Mobile Battery Callout & Fitment
          </h2>
          <p className="text-lg text-muted-foreground">
            Our specialized callout service ensures minimal vehicle downtime.
 We bring the exact battery your vehicle requires, perform the swap, and get you back on the road—wherever you are in the Alberton area.
          </p>
          
          {/* FINAL CORRECTED HOURS LAYOUT */}
          <div className="space-y-2 pt-2 text-lg text-foreground">
              <h3 className="font-bold text-battery">Trading Hours & Availability</h3>
              <p className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 flex-shrink-0" />
                    <span>Mon – Fri: {WEEKDAY_HOURS}</span>
              </p>
              <p className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 flex-shrink-0" />
                  <span>Saturday: {SATURDAY_HOURS}</span>
              </p>
          </div>

          <div className="flex items-center space-x-3 text-lg font-semibold text-foreground">
            <MapPin className="h-5 w-5 text-battery" />
            <p>Focused Callout Zones: New Redruth, Meyersdal, Alberton Central.</p>
          </div>
          <Button asChild variant="secondary" className="mt-4 bg-green-600 hover:bg-green-700 text-white">
             <a href={`https://wa.me/${WHATSAPP_NUMBER_LINK}`} target="_blank" rel="noopener noreferrer">
              WhatsApp Us for Quick Service Booking
            </a>
          </Button>
        </div>
        
        {/* Mobile Service Card Grid */}
        <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
             <div className="bg-card p-6 rounded-lg border border-border shadow-md">
              <h3 className="text-xl font-bold text-battery">On-Site Convenience</h3>
              <p className="text-sm text-muted-foreground mt-1">We eliminate towing fees and the inconvenience of waiting at a workshop.
 The full service is performed at your location.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border shadow-md">
              <h3 className="text-xl font-bold text-battery">Convenient Service Window</h3>
              <p className="text-sm text-muted-foreground mt-1">We offer our callout service during our standard business hours for your convenience.</p>
            </div>
             <div className="bg-card p-6 rounded-lg border border-border shadow-md">
              <h3 className="text-xl font-bold text-battery">Payment Simplicity</h3>
              <p className="text-sm text-muted-foreground mt-1">Accepting all major credit/debit cards on-site via mobile payment terminals.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border shadow-md">
                 <h3 className="text-xl font-bold text-battery">Multi-Brand Authority</h3>
              <p className="text-sm text-muted-foreground mt-1">We offer the full spectrum of products, from OEM Raylite alternatives to specialized LiFePO₄ solar solutions.</p>
            </div>
        </div>
      </div>

      <Separator className="bg-border" />

      <AtomicAnswers variant="services" />

      {/* SECTION 3: DIAGNOSTICS & WARRANTY (Authority) */}
      <div className="grid lg:grid-cols-12 gap-10">
        
        <div className="lg:col-span-7 space-y-6">
          <ShieldCheck className="h-12 w-12 text-battery" />
          <h2 className="text-4xl font-bold text-foreground">
            Advanced Diagnostics & Guaranteed Warranty
          </h2>
          <p className="text-lg text-muted-foreground">
            A battery swap is only half the job.
 Our process includes comprehensive support to ensure the problem is solved completely, not temporarily.
          </p>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Comprehensive Starting System Checks</h3>
            <ul className="space-y-2 text-lg text-foreground bg-card p-4 rounded-lg border border-border">
              <li className="flex items-start space-x-3">
                <Gauge className="h-5 w-5 text-battery mt-1 flex-shrink-0" />
                 <span>Alternator Testing: This critical post-replacement alternator check is included to prevent underlying charging issues.</span>
              </li>
              <li className="flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-battery mt-1 flex-shrink-0" />
                <span>24 to 36-Month Warranty: Displayed prominently on every product.
 Professional fitment is required for manufacturer warranty adherence.</span>
              </li>
              <li className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-battery mt-1 flex-shrink-0" />
                <span>Battery Monitoring System (BMS) Recalibration: Essential for modern vehicles to ensure the new battery communicates correctly.</span>
               </li>
            </ul>
          </div>
        </div>
        
        {/* Image/Visual Placeholder */}
        <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full h-80 bg-secondary/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                 <p className="text-muted-foreground">Placeholder: Image of Technician Running Diagnostics</p>
            </div>
        </div>
      </div>
      
      {/* --- NEW SECTION 4: SPECIALIST SERVICES (BMW/MERCEDES) --- */}
      <Separator className="bg-border" />

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Image Placeholder */}
        <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full h-80 bg-secondary/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                 <p className="text-muted-foreground">Placeholder: Image of BMS Coding Tool</p>
            </div>
        </div>
        
        <div className="lg:col-span-7 space-y-6">
          <BrainCircuit className="h-12 w-12 text-battery" />
          <h2 className="text-4xl font-bold text-foreground">
            Specialist Vehicle Services (BMS Coding)
          </h2>
          <p className="text-lg text-muted-foreground">
            We are one of the few specialists in Alberton with the advanced diagnostic tools required to service premium vehicles like BMW, Audi, and Mercedes-Benz.
          </p>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Why Does Your BMW/Mercedes Need "Coding"?</h3>
            <ul className="space-y-2 text-lg text-foreground bg-card p-4 rounded-lg border border-border">
              <li className="flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-battery mt-1 flex-shrink-0" />
                <span>**Prevent Damage:** Failing to register (or "code") a new AGM battery to your car's Battery Management System (BMS) will cause the system to overcharge and destroy the new battery, voiding its warranty.</span>
              </li>
              <li className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-battery mt-1 flex-shrink-0" />
                <span>**Ensure Performance:** Our tools correctly calibrate your car's charging profile and ensure all Start/Stop and electronic functions work perfectly from day one.</span>
              </li>
              <li className="flex items-start space-x-3">
                <Gauge className="h-5 w-5 text-battery mt-1 flex-shrink-0" />
                <span>**Auxiliary Battery Faults:** We can also diagnose and replace failing auxiliary batteries that cause "Auxiliary Battery Malfunction" warnings on Mercedes dashboards.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* --- END NEW SECTION 4 --- */}


      {/* Final Conversion Funnel */}
      <div className="w-full text-center pt-10">
        <h3 className="text-3xl font-extrabold text-foreground mb-4">
          Don't Guess Your Battery Needs. Get Expert Help.
        </h3>
        <Button asChild size="xl" variant="battery" className="mt-4 shadow-xl">
          <a href={`tel:${EMERGENCY_PHONE_LINK}`} className="flex items-center justify-center space-x-3 mx-auto">
            <Phone className="h-6 w-6" />
            <span>Call Now: {EMERGENCY_PHONE_DISPLAY}</span>
          </a>
        </Button>
      </div>
    </div>
  );
}