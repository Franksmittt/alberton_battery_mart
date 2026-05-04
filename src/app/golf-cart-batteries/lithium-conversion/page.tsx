// src/app/golf-cart-batteries/lithium-conversion/page.tsx
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Battery, Zap, ShieldCheck, Phone, MessageSquare, ArrowRight, CheckCircle, AlertCircle, Clock, TrendingUp, Wrench, Droplet } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

const PAGE_TITLE = "Golf Cart Lithium Conversion Service - Alberton | Enertec Block 48V";
const PAGE_DESCRIPTION =
  "Professional 48V lithium conversion for golf carts in Alberton. Enertec Block 48V 105Ah installations for Club Car, EZGO, Yamaha. Load shedding ready, 5-year warranty, zero maintenance. Expert OBC bypass and regenerative braking setup.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "golf cart lithium conversion",
    "golf cart lithium upgrade",
    "48V lithium golf cart battery",
    "Enertec Block golf cart",
    "lithium golf cart conversion Alberton",
    "Club Car lithium conversion",
    "EZGO lithium battery",
    "golf cart load shedding solution",
    "Enertec Block 48V 105Ah",
    "golf cart lithium conversion Johannesburg",
    "Eye of Africa lithium golf cart",
    "Meyersdal golf cart lithium upgrade",
    "golf cart OBC bypass Alberton",
    "golf cart regenerative braking setup",
    "golf cart lithium conversion cost",
    "golf cart battery weight reduction",
    "estate golf cart lithium conversion",
  ],
  alternates: {
    canonical: `${BASE_URL}/golf-cart-batteries/lithium-conversion`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/golf-cart-batteries/lithium-conversion`,
    type: "website",
    locale: "en_ZA",
    siteName: "Alberton Battery Mart",
    images: [
      {
        url: '/images/lithium-conversion-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Cart Lithium Conversion - Alberton Battery Mart',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/lithium-conversion-hero.jpg'],
  },
};

const PRIMARY_PHONE = "010 109 6211";
const WHATSAPP_NUMBER_LINK = "27823046926";

const BENEFITS = [
  {
    icon: Zap,
    title: "Fast Charging",
    description: "Charge in 2-3 hours vs 8-10 hours. Perfect for load shedding schedules where time is limited.",
  },
  {
    icon: Battery,
    title: "Zero Maintenance",
    description: "No watering, no terminal corrosion, no monthly checks. Completely sealed and maintenance-free.",
  },
  {
    icon: ShieldCheck,
    title: "5-Year Warranty",
    description: "Full warranty on Enertec Block 48V 105Ah systems. Protected for years to come with ongoing support.",
  },
  {
    icon: TrendingUp,
    title: "Better Performance",
    description: "Faster acceleration, consistent speed on hills, 130kg weight reduction. No Peukert effect voltage sag.",
  },
];

const COMPARISON_DATA = [
  {
    feature: "Charging Time",
    leadAcid: "8-10 hours",
    lithium: "2-3 hours",
    winner: "lithium",
  },
  {
    feature: "Usable Capacity",
    leadAcid: "50% (to prevent damage)",
    lithium: "90% (full discharge safe)",
    winner: "lithium",
  },
  {
    feature: "Lifespan",
    leadAcid: "3-4 years",
    lithium: "10+ years",
    winner: "lithium",
  },
  {
    feature: "Weight",
    leadAcid: "174kg (6 x 29kg)",
    lithium: "45kg (single pack)",
    winner: "lithium",
  },
  {
    feature: "Maintenance",
    leadAcid: "Monthly watering required",
    lithium: "Zero maintenance",
    winner: "lithium",
  },
  {
    feature: "Load Shedding",
    leadAcid: "Vulnerable to undercharging",
    lithium: "Fast charge between cuts",
    winner: "lithium",
  },
];

const FAQ_DATA = [
  {
    question: "How long does a lithium conversion take?",
    answer: "A professional lithium conversion typically takes 3-4 hours. This includes pre-installation health checks, vehicle-specific setup (OBC bypass, regenerative braking configuration), battery installation, wiring, and system testing.",
  },
  {
    question: "What is the warranty on Enertec Block lithium batteries?",
    answer: "All Enertec Block 48V 105Ah lithium conversions come with a full 5-year warranty. This is significantly longer than lead-acid batteries and includes ongoing support from our team.",
  },
  {
    question: "Can you convert any golf cart to lithium?",
    answer: "Yes, we can convert Club Car, EZGO, and Yamaha golf carts to lithium. Each brand has specific requirements which our certified technicians handle professionally. We don't do unsafe 12V series installations.",
  },
  {
    question: "How much does a lithium conversion cost?",
    answer: "A complete lithium conversion with Enertec Block 48V 105Ah typically costs around R35,000-R40,000 including battery, charger, installation, and all components. This is higher upfront than lead-acid but saves money over 5+ years.",
  },
  {
    question: "Why is lithium better for load shedding?",
    answer: "Lithium batteries charge in 2-3 hours vs 8-10 hours for lead-acid. During Stage 6 load shedding, you can fully charge your battery during any 2-4 hour power window, whereas lead-acid often can't complete a full charge cycle.",
  },
  {
    question: "Do I need to modify my golf cart for lithium?",
    answer: "Yes, but we handle all modifications professionally. Club Car models may need OBC bypass, EZGO RXV needs regenerative braking resistor bank setup, and Yamaha may need battery tray modifications. All included in our service.",
  },
  {
    question: "How much weight will I save with lithium?",
    answer: "Lithium conversion removes approximately 130kg of weight (from 174kg lead-acid bank to 45kg single pack). This improves acceleration, efficiency, and reduces wear on tires and suspension.",
  },
  {
    question: "Is it safe to use lithium batteries in golf carts?",
    answer: "Yes, when installed correctly. We only use professional single-pack solutions like Enertec Block 48V 105Ah. We strictly refuse unsafe 12V series installations that can cause power loss at speed.",
  },
];

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
      name: "Golf Cart Batteries",
      item: `${BASE_URL}/golf-cart-batteries`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Lithium Conversion",
      item: `${BASE_URL}/golf-cart-batteries/lithium-conversion`,
    },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Enertec Block 48V 105Ah Lithium Golf Cart Battery",
  description: "Professional-grade single-pack lithium battery system for golf cart conversions. 5-year warranty, load shedding ready, zero maintenance.",
  brand: {
    "@type": "Brand",
    name: "Enertec",
  },
  category: "Golf Cart Battery",
  sku: "ENERtec-Block-48V-105Ah",
  offers: {
    "@type": "Offer",
    priceCurrency: "ZAR",
    price: "35000",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "LocalBusiness",
      name: "Alberton Battery Mart",
      url: BASE_URL,
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Voltage",
      value: "51.2V Nominal (48V)",
    },
    {
      "@type": "PropertyValue",
      name: "Capacity",
      value: "105Ah",
    },
    {
      "@type": "PropertyValue",
      name: "Weight",
      value: "45kg",
    },
    {
      "@type": "PropertyValue",
      name: "Warranty",
      value: "5 Years",
    },
    {
      "@type": "PropertyValue",
      name: "Charging Time",
      value: "2-3 Hours",
    },
  ],
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Golf Cart Lithium Conversion Service",
  provider: {
    "@type": "LocalBusiness",
    name: "Alberton Battery Mart",
    address: {
      "@type": "PostalAddress",
      streetAddress: "28 St Columb Rd, New Redruth",
      addressLocality: "Alberton",
      postalCode: "1450",
      addressCountry: "ZA",
    },
    telephone: PRIMARY_PHONE,
  },
  areaServed: [
    "Alberton",
    "Eye of Africa",
    "Meyersdal",
    "Brackenhurst",
    "Bassonia",
  ],
  serviceType: "Lithium Battery Conversion",
  description: PAGE_DESCRIPTION,
};

export default function LithiumConversionPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-background via-background to-background/95 py-16 md:py-24 overflow-hidden">
        {/* Background image will be added when available */}
        <div className="absolute inset-0 z-0 opacity-5 bg-[url('/images/lithium-conversion-hero.jpg')] bg-cover bg-center" style={{ display: 'none' }}></div>
        
        <div className="container relative z-10 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
              Golf Cart <span className="text-battery">Lithium Conversion</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Professional 48V lithium upgrades for estate golf carts using Enertec Block systems. Load shedding ready,
              maintenance-free, with full 5-year warranty. Expert installation in Alberton area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" variant="battery" className="text-lg px-8">
                <a href={`tel:${PRIMARY_PHONE.replace(/ /g, '')}`}>
                  <Phone className="h-5 w-5 mr-2 inline" />
                  Call {PRIMARY_PHONE}
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 bg-green-600 hover:bg-green-700 text-white">
                <a href={`https://wa.me/${WHATSAPP_NUMBER_LINK}`} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-5 w-5 mr-2 inline" />
                  Get Free Quote
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Why Convert to Lithium?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The perfect solution for South African estate residents dealing with load shedding and demanding terrain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, idx) => (
              <Card key={idx} className="border-border bg-background hover:shadow-lg transition-shadow">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-battery mb-2" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Lithium vs Lead-Acid: The Complete Comparison
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See exactly why estate residents are making the switch to lithium.
            </p>
          </div>

          <Card className="border-border bg-background">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-bold text-foreground">Feature</th>
                      <th className="text-center py-4 px-4 font-bold text-muted-foreground">Lead-Acid</th>
                      <th className="text-center py-4 px-4 font-bold text-battery">Lithium (Enertec)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_DATA.map((row, idx) => (
                      <tr key={idx} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-4 px-4 font-semibold text-foreground">{row.feature}</td>
                        <td className="py-4 px-4 text-center text-muted-foreground">{row.leadAcid}</td>
                        <td className="py-4 px-4 text-center text-battery font-semibold">{row.lithium}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Safety Notice - Expanded */}
      <section className="py-16">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle className="text-yellow-900 dark:text-yellow-100">
                  Safety First: We Don't Do Unsafe Installations
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-yellow-900 dark:text-yellow-100">
              <p className="font-semibold text-lg">
                We strictly refuse to install 12V lithium batteries in series for golf carts.
              </p>
              <p className="leading-relaxed">
                Some competitors or DIY installers attempt to string four 12V 100Ah lithium batteries in series to create 
                a 48V pack. This is dangerous and negligent. Without a central communication bus (CAN Bus) linking the four 
                BMS units, the batteries will inevitably drift out of balance. If one battery reaches its high-voltage cutoff 
                (14.6V) while the others are at 13.8V, it will disconnect the circuit instantly.
              </p>
              <p className="leading-relaxed font-semibold">
                In a golf cart traveling at 30km/h, this results in complete loss of power and braking - a serious safety risk.
              </p>
              <p className="leading-relaxed">
                We only install professional single-pack solutions like the Enertec Block 48V 105Ah or properly configured 
                modular systems with parallel connections that have integrated BMS communication. Safety and reliability are 
                non-negotiable. If you've been quoted a "cheap" conversion using 12V series strings, walk away. Your safety 
                isn't worth the savings.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Convert - Detailed Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              The Complete Guide to Lithium Conversion Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every reason why South African estate residents are choosing lithium over lead-acid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <Zap className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Load Shedding Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Lead-acid batteries need 8-10 hours to fully charge. During Stage 6 load shedding, you often can't
                    complete a full charge cycle between power cuts. This chronic undercharging causes sulfation and 
                    premature failure. Lithium batteries charge in 2-3 hours (0.5C to 1C charge rate), allowing you to 
                    fully charge during any available 2-4 hour window. Never worry about incomplete charges again.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Hilly Estate Performance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Lithium batteries maintain consistent voltage under load (no Peukert effect). Your cart will maintain
                    speed and power on steep gradients like those in Eye of Africa, even at the end of the battery's charge. 
                    Lead-acid batteries suffer voltage sag on hills, causing sluggish performance and reduced range. With lithium, 
                    you get consistent performance throughout the entire charge cycle.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <Clock className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Long-Term Cost Savings</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    While the upfront cost is higher (R35k vs R24k), lithium batteries last 10+ years vs 3-4 years for
                    lead-acid. Over 5 years, you'll save money and never have to worry about replacements. Add in the 
                    maintenance costs (water, terminals, labor) and the time saved, and lithium becomes the clear winner 
                    for long-term value.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <Droplet className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Zero Maintenance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Never check water levels again. No terminal corrosion. No acid fumes. No hydrogen gas venting. No 
                    monthly maintenance routines. Lithium batteries are completely sealed and maintenance-free for 10+ years. 
                    Perfect for busy estate residents who want to use their cart, not maintain it.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <Battery className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Deep Discharge Capability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Lead-acid batteries should only be discharged to 50% to prevent damage. Lithium can safely discharge 
                    to 90%, giving you effectively twice the usable capacity. A 105Ah lithium battery provides similar usable 
                    range to a 170-200Ah lead-acid battery because of this deep discharge capability.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Weight Reduction Benefits</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Lithium conversion removes 130kg of weight (from 174kg lead-acid bank to 45kg single pack). This massive 
                    weight reduction improves acceleration, increases efficiency, reduces tire wear, and extends suspension 
                    life. Your cart will feel more responsive and handle better in all conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enertec Block Specifications */}
      <section className="py-16">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Enertec Block 48V 105Ah - Our Recommended Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The professional-grade lithium battery system we use for all conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-border bg-background">
              <CardHeader>
                <CardTitle className="text-2xl">Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="font-semibold">Voltage</span>
                    <span className="text-battery">51.2V Nominal (48V)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="font-semibold">Capacity</span>
                    <span className="text-battery">105Ah</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="font-semibold">Weight</span>
                    <span className="text-battery">45kg</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="font-semibold">Dimensions</span>
                    <span className="text-battery text-right">460 x 320 x 245 mm</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="font-semibold">Chemistry</span>
                    <span className="text-battery">LiFePO4</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="font-semibold">Warranty</span>
                    <span className="text-battery">5 Years</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">Charging Time</span>
                    <span className="text-battery">2-3 Hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-background">
              <CardHeader>
                <CardTitle className="text-2xl">Key Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                  <span>Single-pack design - no series connection issues</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                  <span>Integrated high-current BMS with Bluetooth monitoring</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                  <span>IP67 waterproof rating - handles all weather conditions</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                  <span>CAN bus communication for advanced monitoring</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                  <span>Drop-in replacement for 6 x 8V lead-acid banks</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                  <span>Counterweights included for vehicle stability</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Our Professional Installation Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every conversion is done right, with attention to safety and vehicle-specific requirements.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-border bg-background">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-battery text-white flex items-center justify-center font-bold">1</div>
                  <CardTitle>Pre-Installation Health Check</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Before touching the batteries, we test drive your cart and check motor, controller, and brakes. 
                  We flag any issues before installation to ensure your new lithium battery isn't blamed for existing problems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-background">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-battery text-white flex items-center justify-center font-bold">2</div>
                  <CardTitle>Vehicle-Specific Setup</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We handle all vehicle-specific requirements:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                    <span><strong>Club Car:</strong> OBC bypass with proper wiring and sense wire connection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                    <span><strong>EZGO RXV:</strong> Regenerative braking resistor bank and BMS programming</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                    <span><strong>Yamaha:</strong> Battery tray modifications and charger receptacle updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-background">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-battery text-white flex items-center justify-center font-bold">3</div>
                  <CardTitle>Professional Installation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Complete installation includes battery mounting, wiring, DC-DC converter setup, SoC meter installation, 
                  and proper torque on all terminals. We ensure everything is secure and ready for years of trouble-free operation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions about lithium conversions for golf carts.
            </p>
          </div>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, idx) => (
              <Card key={idx} className="border-border bg-background">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-battery text-white">
        <div className="container px-4 md:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Ready for a Lithium Upgrade?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get a free quote for your golf cart lithium conversion. Free installation in Alberton area. 
            5-year warranty included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/contact">
                Request Free Quote <ArrowRight className="h-5 w-5 ml-2 inline" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 border-white/20 bg-white/10 text-white hover:bg-white/20">
              <a href={`tel:${PRIMARY_PHONE.replace(/ /g, '')}`}>
                <Phone className="h-5 w-5 mr-2 inline" />
                {PRIMARY_PHONE}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <JsonLd data={FAQ_SCHEMA} id="faq-schema" />
      <JsonLd data={PRODUCT_SCHEMA} id="product-schema" />
      <JsonLd data={SERVICE_SCHEMA} id="service-schema" />
    </main>
  );
}
