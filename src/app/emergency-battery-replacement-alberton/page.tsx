import { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Clock3, Phone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YMMSearchWidget } from "@/components/content/YMMSearchWidget";
import { buildPageMetadata } from "@/lib/seo/metadata";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  BASE_URL,
  BUSINESS_CONTACT,
  LOCAL_BUSINESS_ID,
  SERVICE_AREAS,
} from "@/lib/seo-constants";
import { ServiceSizeClusterLinks } from "@/components/content/ServiceSizeClusterLinks";
import { getProductsBySizeCode, getFittedPriceLabel } from "@/lib/products/by-size";

const FAQ = [
  {
    question: "Emergency battery replacement in Alberton?",
    answer:
      "Yes. Call 010 109 6211 for urgent dispatch. We stock popular sizes including 619, 628, 646, 652, 668, and 658 for on-site replacement after free diagnostics.",
  },
  {
    question: "Roadside battery assistance near Alberton?",
    answer:
      "Our mobile unit provides roadside battery testing and replacement across Alberton with faster local response than national roadside clubs for battery-specific call-outs.",
  },
  {
    question: "How much does emergency battery replacement cost?",
    answer:
      "Price depends on battery size and brand. We confirm fitted pricing before dispatch — no surprise charges after the job is done.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const products = await getProductsBySizeCode("619");
  const fittedFromPrice = getFittedPriceLabel(products);

  return buildPageMetadata({
    title: "Emergency Battery Replacement Alberton | Roadside Help",
    description: `Emergency battery replacement and roadside assistance in Alberton. Fast mobile dispatch, free diagnostics, popular sizes from ${fittedFromPrice} fitted. Call 010 109 6211.`,
    path: "/emergency-battery-replacement-alberton",
    keywords: [
      "emergency battery replacement alberton",
      "roadside battery assistance",
      "dead battery alberton",
      "619 battery emergency alberton",
    ],
  });
}

export default async function EmergencyAlbertonPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Emergency battery replacement in Alberton",
    provider: {
      "@type": "LocalBusiness",
      "@id": LOCAL_BUSINESS_ID,
      name: "Alberton Battery Mart",
      telephone: BUSINESS_CONTACT.telephone,
      url: BASE_URL,
    },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "Place", name })),
  };

  return (
    <div className="space-y-12 pb-16">
      <JsonLd data={serviceSchema} id="emergency-service" />
      <FaqSchema id="emergency-faq" items={FAQ} />
      <BreadcrumbSchema
        id="emergency-breadcrumb"
        items={[
          { name: "Home", item: "/" },
          { name: "Emergency", item: "/emergency-battery-replacement" },
          { name: "Alberton", item: "/emergency-battery-replacement-alberton" },
        ]}
      />

      <section className="bg-gradient-to-br from-red-950/40 to-background border-b border-border py-16">
        <div className="container max-w-4xl text-center space-y-6">
          <AlertCircle className="h-12 w-12 text-battery mx-auto" />
          <h1 className="text-4xl md:text-5xl font-black text-foreground">
            Emergency Battery Replacement — Alberton
          </h1>
          <p className="text-lg text-muted-foreground">
            Dead battery? We dispatch with popular sizes in stock, test before we sell, and fit on-site across Alberton.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="xl" className="bg-red-600 hover:bg-red-700 text-white font-black">
              <a href="tel:0101096211" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call 010 109 6211
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/emergency-battery-replacement">General emergency page</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container grid md:grid-cols-3 gap-6 max-w-5xl">
        {[
          { icon: Zap, title: "Popular sizes in stock", text: "619, 628, 646, 652, 668, 658 & more" },
          { icon: Clock3, title: "Fast local response", text: "Alberton-based — not a national call centre" },
          { icon: AlertCircle, title: "Test first", text: "Free diagnostics before replacement" },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-border bg-card/50 p-6 space-y-2 text-center">
            <item.icon className="h-6 w-6 text-battery mx-auto" />
            <h2 className="font-bold text-foreground">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="container max-w-4xl">
        <YMMSearchWidget variant="hero" />
      </section>

      <div className="container">
        <ServiceSizeClusterLinks />
      </div>
    </div>
  );
}
