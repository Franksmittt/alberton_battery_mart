// src/app/golf-cart-batteries/page.tsx
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Battery, Zap, Truck, ShieldCheck, Phone, MessageSquare, ArrowRight, CheckCircle, Wrench, Clock, MapPin, Users } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

const PAGE_TITLE = "Golf Cart Batteries & Lithium Conversions in Alberton | Alberton Battery Mart";
const PAGE_DESCRIPTION =
  "Professional golf cart battery replacement and lithium conversion services in Alberton, Johannesburg. Trojan and Enertec batteries for Club Car, EZGO, Yamaha golf carts. Free fitment and estate service in Eye of Africa, Meyersdal, and surrounding areas. Expert OBC bypass and regenerative braking setup.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "golf cart batteries Alberton",
    "golf cart battery replacement",
    "lithium golf cart conversion",
    "Trojan golf cart batteries",
    "Enertec golf cart batteries",
    "Club Car battery replacement",
    "EZGO battery replacement",
    "Yamaha golf cart batteries",
    "estate golf cart batteries",
    "golf cart lithium upgrade",
    "Eye of Africa golf cart batteries",
    "Meyersdal golf cart service",
    "golf cart battery installation",
    "48V golf cart batteries",
    "golf cart batteries Johannesburg South",
    "golf cart battery service Alberton",
    "estate golf cart battery replacement",
    "golf cart OBC bypass Alberton",
    "golf cart regenerative braking setup",
    "Brackenhurst golf cart batteries",
    "Bassonia golf cart service",
    "New Redruth golf cart batteries",
  ],
  alternates: {
    canonical: `${BASE_URL}/golf-cart-batteries`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/golf-cart-batteries`,
    type: "website",
    locale: "en_ZA",
    siteName: "Alberton Battery Mart",
    images: [
      {
        url: '/images/golf-cart-batteries-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Cart Batteries & Lithium Conversions - Alberton Battery Mart',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/golf-cart-batteries-hero.jpg'],
  },
};

const PRIMARY_PHONE = "010 109 6211";
const WHATSAPP_NUMBER_LINK = "27823046926";

const FEATURES = [
  {
    icon: Battery,
    title: "Trojan & Enertec Only",
    description: "We stock only the best: Trojan (gold standard) and Enertec (premium value). No cheap alternatives that compromise performance.",
  },
  {
    icon: Zap,
    title: "Lithium Conversions",
    description: "Professional 48V lithium upgrades with Enertec Block systems. 5-year warranty, load shedding ready, zero maintenance.",
  },
  {
    icon: Truck,
    title: "Estate Service",
    description: "Free on-site installation in Eye of Africa, Meyersdal, Brackenhurst, Bassonia. We come to you.",
  },
  {
    icon: ShieldCheck,
    title: "Expert Installation",
    description: "Certified technicians handle OBC bypass, regenerative braking setup, and all vehicle-specific requirements safely.",
  },
];

const SERVICES = [
  {
    title: "Lead-Acid Battery Replacement",
    description: "Trojan T-875 and Enertec GC8 48V systems for Club Car, EZGO, Yamaha. Professional installation with full warranty. Perfect for standard estate carts.",
    href: "/golf-cart-batteries/lead-acid",
    features: ["Trojan T-875 (170Ah)", "Enertec GC8 (170Ah)", "Free installation in Alberton area", "3-5 year lifespan"],
  },
  {
    title: "Lithium Conversion Service",
    description: "Upgrade to Enertec Block 48V 105Ah single-pack systems. Fast charging (2-3 hours), zero maintenance, 130kg weight reduction, perfect for load shedding.",
    href: "/golf-cart-batteries/lithium-conversion",
    features: ["Enertec Block 48V 105Ah", "5-year warranty", "Load shedding optimized", "Zero maintenance"],
  },
  {
    title: "Battery Testing & Diagnostics",
    description: "Free battery health checks and load testing at our Alberton store or on-site at your estate. Identify problems before they leave you stranded.",
    href: "/services/free-battery-testing/alberton",
    features: ["Free testing", "Load testing available", "Voltage diagnostics", "Capacity checks"],
  },
  {
    title: "Estate Service Contracts",
    description: "Monthly maintenance contracts for estates and country clubs. Priority callouts, scheduled maintenance, and bulk pricing available.",
    href: "/contact",
    features: ["Priority service", "Scheduled maintenance", "Bulk pricing", "Dedicated technician"],
  },
];

const VEHICLE_BRANDS = [
  {
    name: "Club Car",
    models: ["Precedent", "Tempo", "Onward", "DS"],
    description: "Expert OBC bypass for pre-2014 models. Proper installation ensures controller compatibility.",
  },
  {
    name: "EZGO",
    models: ["TXT 48V", "RXV", "Valor"],
    description: "Specialized regenerative braking setup for RXV models. Proper BMS programming required.",
  },
  {
    name: "Yamaha",
    models: ["Drive", "Drive2", "G29"],
    description: "Complete battery tray modifications and charging system upgrades available.",
  },
];

const ESTATES_SERVED = [
  "Eye of Africa Golf & Residential Estate",
  "Meyersdal Eco Estate",
  "Brackenhurst",
  "Bassonia",
  "Eikenhof",
  "New Redruth",
];

const FAQ_DATA = [
  {
    question: "What brands of golf cart batteries do you stock?",
    answer: "We stock only Trojan and Enertec batteries - the two best brands for reliability and performance. Trojan is the gold standard, while Enertec offers premium value at a better price point.",
  },
  {
    question: "Do you offer mobile installation for golf cart batteries?",
    answer: "Yes! We provide free on-site installation in Alberton, Eye of Africa, Meyersdal, Brackenhurst, and Bassonia. Our certified technicians come to your estate with all tools and equipment.",
  },
  {
    question: "How long does a lithium conversion take?",
    answer: "A professional lithium conversion typically takes 3-4 hours. This includes battery removal, OBC bypass (if needed), battery installation, wiring, DC-DC converter setup, and system testing.",
  },
  {
    question: "What is the warranty on Enertec Block lithium batteries?",
    answer: "All Enertec Block 48V 105Ah lithium conversions come with a full 5-year warranty. This is significantly longer than lead-acid batteries which typically have 1-2 year warranties.",
  },
  {
    question: "Can you convert any golf cart to lithium?",
    answer: "Yes, we can convert Club Car, EZGO, and Yamaha golf carts to lithium. Each brand has specific requirements (like OBC bypass for Club Car or regenerative braking setup for EZGO RXV) which our technicians handle professionally.",
  },
  {
    question: "Why should I choose lithium over lead-acid for my estate golf cart?",
    answer: "Lithium batteries charge in 2-3 hours vs 8-10 hours for lead-acid, making them perfect for load shedding schedules. They're also maintenance-free, last 10+ years, and provide consistent performance on hilly terrain like Eye of Africa.",
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

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Golf Cart Battery Replacement & Lithium Conversion",
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
    url: BASE_URL,
  },
  areaServed: ESTATES_SERVED.map((estate) => ({
    "@type": "City",
    name: estate,
  })),
  serviceType: "Golf Cart Battery Installation",
  description: PAGE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    priceCurrency: "ZAR",
    availability: "https://schema.org/InStock",
  },
};

export default function GolfCartBatteriesPage() {
  return (
    <main>
      {/* Hero Section with Image */}
      <section className="relative w-full bg-gradient-to-b from-background via-background to-background/95 py-16 md:py-24 overflow-hidden">
        {/* Background image will be added when available */}
        <div className="absolute inset-0 z-0 opacity-5 bg-[url('/images/golf-cart-batteries-hero.jpg')] bg-cover bg-center" style={{ display: 'none' }}></div>
        
        <div className="container relative z-10 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
              Golf Cart Batteries &{" "}
              <span className="text-battery">Lithium Conversions</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Professional battery replacement and lithium upgrades for estate golf carts in Alberton, Johannesburg.
              We stock only Trojan and Enertec - the two best brands for reliability and performance. Free fitment and estate service available.
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
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Why Choose Alberton Battery Mart?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We specialize in golf cart batteries with a focus on quality, safety, and estate-specific solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, idx) => (
              <Card key={idx} className="border-border bg-background hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-battery mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Expanded Content */}
      <section className="py-16">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Our Golf Cart Battery Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From standard lead-acid replacements to advanced lithium conversions, we handle all your golf cart energy needs with professional expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, idx) => (
              <Card key={idx} className="border-border bg-background hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-base leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href={service.href}>
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Compatibility Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              We Service All Major Golf Cart Brands
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our technicians are trained in the specific requirements of each brand and model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VEHICLE_BRANDS.map((brand, idx) => (
              <Card key={idx} className="border-border bg-background">
                <CardHeader>
                  <CardTitle className="text-xl">{brand.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Models:</p>
                    <p className="text-foreground">{brand.models.join(", ")}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{brand.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Expanded */}
      <section className="py-16">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Why Choose Alberton Battery Mart for Golf Cart Batteries?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're the specialists who understand estate living, load shedding, and the specific needs of South African golf cart owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Estate-Specific Expertise</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We understand the unique challenges of South African estates - from load shedding schedules to steep gradients. 
                    Our lithium conversions are specifically engineered for estate living. Whether you're in Eye of Africa dealing 
                    with hilly terrain or Meyersdal needing fast-charging solutions, we've got you covered.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <Wrench className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Vehicle-Specific Solutions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Expert handling of Club Car OBC bypass for pre-2014 models, EZGO RXV regenerative braking system setup, 
                    and Yamaha Drive battery tray modifications. We don't do unsafe 12V series installations that put you at risk. 
                    Every conversion is done right, the first time.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <Zap className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Fast Charging for Load Shedding</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Lithium batteries charge in 2-3 hours vs 8-10 hours for lead-acid. Perfect for Stage 6 load shedding 
                    schedules where you might only have 2-4 hours of power between cuts. Never get caught with a flat battery 
                    again. Charge during any available window and be ready to go.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <Battery className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Zero Maintenance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No more watering batteries every month. No terminal corrosion. No acid fumes. No hydrogen gas venting. 
                    Lithium batteries are completely sealed and maintenance-free for 10+ years. Set it and forget it - perfect 
                    for busy estate residents.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <Truck className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Professional Mobile Installation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Free on-site installation in Alberton, Eye of Africa, Meyersdal, Brackenhurst, and Bassonia. Our certified 
                    technicians come to your estate with all tools and equipment. We handle everything from battery removal to 
                    complete system integration. No need to tow your cart anywhere.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-battery/10 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-battery" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Full Warranty Protection</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All Enertec Block lithium conversions come with a full 5-year warranty. Trojan and Enertec lead-acid batteries 
                    include standard manufacturer warranties. We stand behind every installation with ongoing support and warranty 
                    service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estates Served */}
          <Card className="border-battery/20 bg-battery/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-battery" />
                <span>Estates We Serve</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We provide mobile battery services to all major estates in Johannesburg South:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ESTATES_SERVED.map((estate, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-battery flex-shrink-0" />
                    <span className="text-sm">{estate}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-battery text-white">
        <div className="container px-4 md:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Ready to Upgrade Your Golf Cart?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get a free quote for battery replacement or lithium conversion. We serve all major estates in
            Johannesburg South with professional mobile installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/contact">
                Get A Free Quote <ArrowRight className="h-5 w-5 ml-2 inline" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 border-white/20 bg-white/10 text-white hover:bg-white/20">
              <a href={`tel:${PRIMARY_PHONE.replace(/ /g, '')}`}>
                <Phone className="h-5 w-5 mr-2 inline" />
                Call {PRIMARY_PHONE}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions about golf cart batteries and lithium conversions.
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

      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <JsonLd data={FAQ_SCHEMA} id="faq-schema" />
      <JsonLd data={SERVICE_SCHEMA} id="service-schema" />
    </main>
  );
}
