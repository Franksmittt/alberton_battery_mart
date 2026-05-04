// src/app/golf-cart-batteries/lead-acid/page.tsx
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Battery, Phone, MessageSquare, ArrowRight, CheckCircle, DollarSign, Wrench, Clock, AlertTriangle } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

const PAGE_TITLE = "Golf Cart Lead-Acid Battery Replacement - Alberton | Trojan & Enertec";
const PAGE_DESCRIPTION =
  "Professional Trojan and Enertec lead-acid battery replacement for golf carts in Alberton. 48V systems for Club Car, EZGO, Yamaha. Trojan T-875 and Enertec GC8. Professional installation included with warranty.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "golf cart lead-acid batteries",
    "Trojan golf cart batteries",
    "Enertec golf cart batteries",
    "48V golf cart battery replacement",
    "Trojan T-875",
    "Enertec GC8",
    "golf cart battery Alberton",
    "Club Car battery replacement",
    "EZGO battery replacement",
    "golf cart lead-acid battery Johannesburg",
    "Trojan T-875 price Alberton",
    "Enertec GC8 golf cart battery",
    "golf cart battery maintenance",
    "Eye of Africa golf cart batteries",
    "Meyersdal golf cart battery replacement",
    "golf cart battery watering guide",
    "golf cart battery lifespan",
  ],
  alternates: {
    canonical: `${BASE_URL}/golf-cart-batteries/lead-acid`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/golf-cart-batteries/lead-acid`,
    type: "website",
    locale: "en_ZA",
    siteName: "Alberton Battery Mart",
    images: [
      {
        url: '/images/golf-cart-batteries-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Cart Lead-Acid Batteries - Alberton Battery Mart',
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

const TROJAN_FEATURES = [
  "T2 Technology™ - High-density paste formula",
  "Maxguard® T2 Separator for better performance",
  "Proprietary grid geometry for longevity",
  "3-5 year lifespan with proper maintenance",
  "170Ah capacity - excellent range",
  "Global reference standard for deep-cycle",
];

const ENERtec_FEATURES = [
  "15-25% more affordable than Trojan",
  "170Ah capacity - same as Trojan T-875",
  "Robust casing and vibration resistance",
  "Excellent for budget-conscious owners",
  "Rapid warranty support across South Africa",
  "Same performance at better price point",
];

const MAINTENANCE_TIPS = [
  {
    title: "Watering Schedule",
    description: "Check water levels every 2-4 weeks. In hot weather, check more frequently. Use only distilled water. Fill to just above the plates - don't overfill.",
  },
  {
    title: "Terminal Maintenance",
    description: "Clean terminals monthly to prevent corrosion. Use a wire brush and apply terminal spray or protective grease. Corrosion causes resistance and reduces performance.",
  },
  {
    title: "Charging Best Practices",
    description: "Always charge immediately after use. Never leave batteries in a discharged state. Use a smart charger with equalization mode monthly to prevent sulfation.",
  },
  {
    title: "Storage",
    description: "If storing long-term, charge fully first and check monthly. Store in a cool, dry place. Never store discharged batteries - they will sulfate and lose capacity permanently.",
  },
];

const FAQ_DATA = [
  {
    question: "What's the difference between Trojan and Enertec golf cart batteries?",
    answer: "Trojan is the gold standard with proprietary T2 Technology and Maxguard separators, offering 3-5 year lifespan. Enertec provides similar performance (170Ah capacity) at 15-25% lower cost, making it excellent for budget-conscious owners. Both are excellent choices.",
  },
  {
    question: "How long do lead-acid golf cart batteries last?",
    answer: "With proper maintenance, Trojan batteries last 3-5 years, while Enertec batteries typically last 3-4 years. Maintenance includes regular watering, terminal cleaning, and proper charging practices.",
  },
  {
    question: "How often should I water my golf cart batteries?",
    answer: "Check water levels every 2-4 weeks. In hot South African weather, check more frequently. Use only distilled water and fill to just above the plates - don't overfill as this causes acid boil-over.",
  },
  {
    question: "What happens if I don't maintain my lead-acid batteries?",
    answer: "Neglected batteries will fail prematurely. Low water levels expose plates causing permanent capacity loss. Corroded terminals increase resistance and reduce performance. Chronic undercharging during load shedding causes hard sulfation that cannot be reversed.",
  },
  {
    question: "Should I upgrade to lithium or stick with lead-acid?",
    answer: "Lithium is better if you deal with load shedding (charges in 2-3 hours vs 8-10 hours) or hilly terrain (no voltage sag). Lead-acid is fine for flat courses with reliable power. Consider your usage patterns and we can help you decide.",
  },
  {
    question: "Do you offer mobile installation for lead-acid batteries?",
    answer: "Yes! We provide free on-site installation in Alberton, Eye of Africa, Meyersdal, Brackenhurst, and Bassonia. Our technicians come to your estate with all equipment needed for professional installation.",
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
      name: "Lead-Acid Batteries",
      item: `${BASE_URL}/golf-cart-batteries/lead-acid`,
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

const PRODUCT_COLLECTION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProductCollection",
  name: "Golf Cart Lead-Acid Batteries",
  description: PAGE_DESCRIPTION,
  url: `${BASE_URL}/golf-cart-batteries/lead-acid`,
  hasPart: [
    {
      "@type": "Product",
      name: "Trojan T-875 8V Deep Cycle Battery",
      brand: {
        "@type": "Brand",
        name: "Trojan",
      },
      category: "Golf Cart Battery",
      offers: {
        "@type": "Offer",
        priceCurrency: "ZAR",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Product",
      name: "Enertec GC8 8V Deep Cycle Battery",
      brand: {
        "@type": "Brand",
        name: "Enertec",
      },
      category: "Golf Cart Battery",
      offers: {
        "@type": "Offer",
        priceCurrency: "ZAR",
        availability: "https://schema.org/InStock",
      },
    },
  ],
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Golf Cart Lead-Acid Battery Replacement",
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
  serviceType: "Golf Cart Battery Replacement",
  description: PAGE_DESCRIPTION,
};

export default function LeadAcidBatteriesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-background via-background to-background/95 py-16 md:py-24 overflow-hidden">
        {/* Background image will be added when available */}
        <div className="absolute inset-0 z-0 opacity-5 bg-[url('/images/golf-cart-batteries-hero.jpg')] bg-cover bg-center" style={{ display: 'none' }}></div>
        
        <div className="container relative z-10 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
              Golf Cart <span className="text-battery">Lead-Acid Batteries</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Professional replacement with Trojan and Enertec batteries. The reliable choice for standard estate
              carts and budget-conscious owners. Full installation included.
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
                  Get Quote
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Comparison */}
      <section className="py-16">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Trojan vs Enertec: Which is Right for You?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We stock only the best brands. Both are excellent choices, but they serve different needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Trojan Card */}
            <Card className="border-border bg-background hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <Battery className="h-6 w-6 text-battery" />
                  <span>Trojan Batteries</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">The Gold Standard</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Trojan's maroon-cased batteries serve as the global reference standard for deep-cycle applications. 
                  Their market dominance is built on proprietary engineering features designed to maximize life cycles 
                  under deep discharge conditions.
                </p>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Key Specifications (T-875):</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Voltage:</span>
                      <span className="font-semibold">8V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity (20hr):</span>
                      <span className="font-semibold">170Ah</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-semibold">29kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Configuration:</span>
                      <span className="font-semibold">6 x 8V for 48V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lifespan:</span>
                      <span className="font-semibold">3-5 years</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Features:</h4>
                  <ul className="space-y-2">
                    {TROJAN_FEATURES.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Best for:</strong> Owners who want the absolute best quality and are willing to pay a premium 
                    for maximum reliability and resale value.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Enertec Card */}
            <Card className="border-border bg-background hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <Battery className="h-6 w-6 text-battery" />
                  <span>Enertec Batteries</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Premium Value</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Enertec positions itself as a high-value alternative, leveraging strong relationships with global 
                  manufacturers to source batteries that meet the rigorous demands of the local market at a more 
                  accessible price point. Excellent for budget-conscious owners.
                </p>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Key Specifications (GC8):</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Voltage:</span>
                      <span className="font-semibold">8V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity (20hr):</span>
                      <span className="font-semibold">170Ah</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-semibold">29kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Configuration:</span>
                      <span className="font-semibold">6 x 8V for 48V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lifespan:</span>
                      <span className="font-semibold">3-4 years</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Features:</h4>
                  <ul className="space-y-2">
                    {ENERtec_FEATURES.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-battery flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Best for:</strong> Fleet managers, budget-conscious private owners, and anyone who wants 
                    excellent performance at a better price point without compromising quality.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Comparison Note */}
          <Card className="border-blue-500/20 bg-blue-50 dark:bg-blue-900/10">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-blue-900 dark:text-blue-100">Pricing Insight</h3>
                  <p className="text-blue-900 dark:text-blue-100 leading-relaxed">
                    A full set of 6 x Enertec GC8 batteries typically costs R18,600 - R21,900, while Trojan T-875 sets 
                    range from R21,600 - R29,400. The price difference is significant, but both provide excellent performance. 
                    The choice often comes down to budget and personal preference. We can help you decide which is best for 
                    your specific needs and usage patterns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Maintenance Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Lead-Acid Battery Maintenance Guide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proper maintenance extends battery life to 4-5 years. Follow these guidelines for maximum performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MAINTENANCE_TIPS.map((tip, idx) => (
              <Card key={idx} className="border-border bg-background">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center space-x-2">
                    <Wrench className="h-5 w-5 text-battery" />
                    <span>{tip.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Warning Card */}
          <Card className="mt-8 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle className="text-yellow-900 dark:text-yellow-100">
                  Common Lead-Acid Failure Modes
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-yellow-900 dark:text-yellow-100 space-y-3">
              <p className="font-semibold">To prevent premature failure, avoid these common mistakes:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Chronic Undercharging:</strong> Lead-acid batteries must reach 100% charge regularly. Partial charging during load shedding causes hard sulfation that cannot be reversed.</li>
                <li><strong>Low Water Levels:</strong> Exposed plates permanently lose capacity. Check water levels every 2-4 weeks, especially in hot weather.</li>
                <li><strong>Over-Watering:</strong> Filling batteries above the plates causes acid boil-over during charging, corroding the chassis and creating a safety hazard.</li>
                <li><strong>Terminal Neglect:</strong> Corrosion increases resistance, reduces performance, and can cause fires. Clean terminals monthly.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* When to Replace */}
      <section className="py-16">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              When Should You Replace Your Batteries?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Know the signs that indicate it's time for a replacement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border bg-background">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-battery" />
                  <span>Age</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Batteries older than 3-4 years are typically near the end of their useful life, even if they still 
                  work. Proactive replacement prevents unexpected failures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-background">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Battery className="h-5 w-5 text-battery" />
                  <span>Reduced Range</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  If your cart won't complete your normal routes or dies faster than before, capacity has degraded 
                  significantly. Time for replacement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-background">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-battery" />
                  <span>Visible Issues</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Swollen cases, leaking acid, excessive corrosion, or batteries that won't hold a charge indicate 
                  replacement is needed immediately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upgrade CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Considering an Upgrade to Lithium?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lead-acid batteries work well, but lithium offers significant advantages for estate living - especially 
              if you're dealing with load shedding or hilly terrain. Learn more about the benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" variant="battery">
                <Link href="/golf-cart-batteries/lithium-conversion">
                  Learn About Lithium Conversions <ArrowRight className="h-5 w-5 ml-2 inline" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${PRIMARY_PHONE.replace(/ /g, '')}`}>
                  <Phone className="h-5 w-5 mr-2 inline" />
                  Call to Discuss Options
                </a>
              </Button>
            </div>
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
              Common questions about lead-acid golf cart batteries.
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
      <JsonLd data={PRODUCT_COLLECTION_SCHEMA} id="product-collection-schema" />
      <JsonLd data={SERVICE_SCHEMA} id="service-schema" />
    </main>
  );
}
