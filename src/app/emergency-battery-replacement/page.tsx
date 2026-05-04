// src/app/emergency-battery-replacement/page.tsx
import { Metadata } from "next";
import { YMMSearchWidget } from "@/components/content/YMMSearchWidget";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Zap, MapPin, Clock, AlertCircle } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

export const metadata: Metadata = {
  title: "Emergency Battery Replacement | We Come to You in 30 Mins | Alberton",
  description: "Dead battery? We come to you in Alberton, New Redruth & Meyersdal. Mobile battery replacement in 30 minutes. Call 010 109 6211 now.",
  keywords: [
    'emergency battery replacement',
    'dead battery help',
    'battery replacement near me',
    'mobile battery service',
    'emergency battery callout',
    'dead battery Alberton',
  ],
  openGraph: {
    title: "Emergency Battery Replacement | We Come to You in 30 Mins",
    description: "Dead battery? We come to you in Alberton, New Redruth & Meyersdal. Mobile battery replacement in 30 minutes.",
    url: `${BASE_URL}/emergency-battery-replacement`,
    type: "website",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Emergency Battery Replacement - Alberton Battery Mart',
      },
    ],
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Emergency Battery Replacement | We Come to You in 30 Mins | Alberton",
    description: "Dead battery? We come to you in Alberton, New Redruth & Meyersdal. Mobile battery replacement in 30 minutes. Call 010 109 6211 now.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: `${BASE_URL}/emergency-battery-replacement`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const PRIMARY_PHONE = "010 109 6211";
const PRIMARY_PHONE_LINK = "0101096211";
const WHATSAPP_NUMBER_LINK = "27823046926";

export default function EmergencyBatteryReplacementPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Emergency Mobile Battery Replacement",
    provider: {
      "@type": "LocalBusiness",
      name: "Alberton Battery Mart",
      telephone: "+27101096211",
      address: {
        "@type": "PostalAddress",
        streetAddress: "28 St Columb Rd",
        addressLocality: "New Redruth",
        addressRegion: "Alberton",
        postalCode: "1450",
        addressCountry: "ZA",
      },
    },
    areaServed: ["Alberton", "New Redruth", "Meyersdal"],
    description: "Emergency mobile battery replacement service. We come to you within 30 minutes in Alberton, New Redruth, and Meyersdal.",
    offers: {
      "@type": "Offer",
      description: "Emergency mobile battery replacement with free fitment and testing",
    },
  };

  return (
    <>
      <JsonLd data={serviceSchema} id="emergency-service-schema" />
      
      {/* NO HEADER/NAVIGATION - Stripped down for conversion */}
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
        
        {/* Hero Section - Maximum Impact */}
        <section className="relative w-full min-h-[calc(100vh-2rem)] flex items-center justify-center pt-8 pb-16 px-4">
          <div className="container max-w-4xl mx-auto space-y-8 text-center">
            
            {/* Emergency Alert Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-500/50 text-red-400">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-semibold">EMERGENCY SERVICE AVAILABLE NOW</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
              Dead Battery?<br />
              <span className="text-battery">We Come to You</span><br />
              <span className="text-4xl sm:text-5xl md:text-6xl">in 30 Minutes</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Mobile battery replacement in Alberton, New Redruth & Meyersdal. Free fitment. Free testing. We bring the battery to you.
            </p>

            {/* MASSIVE Call Button */}
            <div className="pt-6 space-y-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto min-w-[300px] h-16 bg-red-600 hover:bg-red-700 text-white font-black text-xl shadow-[0_8px_30px_rgba(239,68,68,0.5)] hover:shadow-[0_12px_40px_rgba(239,68,68,0.6)] transition-all"
              >
                <a href={`tel:${PRIMARY_PHONE_LINK}`} className="flex items-center justify-center gap-3">
                  <Phone className="h-7 w-7" />
                  <span>CALL NOW: {PRIMARY_PHONE}</span>
                </a>
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Available now • Mon-Fri 08:00-17:00 • Sat 08:00-12:00
              </p>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10">
                <Zap className="h-6 w-6 text-battery" />
                <p className="text-sm font-bold text-white">Free Testing</p>
                <p className="text-xs text-white/60">Battery & Alternator</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10">
                <MapPin className="h-6 w-6 text-battery" />
                <p className="text-sm font-bold text-white">Free Fitment</p>
                <p className="text-xs text-white/60">Professional Install</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10">
                <Clock className="h-6 w-6 text-battery" />
                <p className="text-sm font-bold text-white">30 Min Response</p>
                <p className="text-xs text-white/60">Fast Service</p>
              </div>
            </div>
          </div>
        </section>

        {/* YMM Search Widget Section */}
        <section className="container max-w-4xl mx-auto px-4 py-12 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Find Your Battery <span className="text-battery">Instantly</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Enter your vehicle details to see compatible batteries with guaranteed fitment
            </p>
          </div>
          
          <div className="bg-card/40 border border-border rounded-2xl p-6 sm:p-8">
            <YMMSearchWidget variant="hero" />
          </div>
        </section>

        {/* Secondary CTA Section */}
        <section className="container max-w-4xl mx-auto px-4 py-12 space-y-6">
          <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 border-2 border-red-500/50 rounded-2xl p-8 space-y-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Need Help Right Now?
            </h2>
            <p className="text-lg text-white/80">
              Don't wait. Call us now and we'll dispatch a technician to your location immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="h-14 bg-red-600 hover:bg-red-700 text-white font-black text-lg shadow-lg"
              >
                <a href={`tel:${PRIMARY_PHONE_LINK}`} className="flex items-center justify-center gap-2">
                  <Phone className="h-6 w-6" />
                  <span>Call {PRIMARY_PHONE}</span>
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-14 bg-green-600 hover:bg-green-700 text-white font-black text-lg"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER_LINK}?text=${encodeURIComponent('Emergency battery replacement needed')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>WhatsApp Us</span>
                </a>
              </Button>
            </div>
            <p className="text-sm text-white/60">
              Service Areas: Alberton • New Redruth • Meyersdal
            </p>
          </div>
        </section>

        {/* Minimal Footer Info */}
        <footer className="container max-w-4xl mx-auto px-4 py-8 text-center border-t border-border">
          <p className="text-sm text-muted-foreground">
            Alberton Battery Mart • 28 St Columb Rd, New Redruth, Alberton, 1450
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            <a href="/" className="hover:text-battery">Return to Home</a> • 
            <a href="/services" className="hover:text-battery ml-2">View All Services</a>
          </p>
        </footer>
      </main>
    </>
  );
}

