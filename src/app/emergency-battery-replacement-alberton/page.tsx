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
import { Battery619IntentLinks } from "@/components/content/Battery619Sections";
import {
  get619CatalogProducts,
  get619FittedPriceLabel,
} from "@/lib/products/battery-619";

function getEmergencyFaq(fittedFromPrice: string) {
  return [
    {
      question: "Emergency 619 battery replacement in Alberton?",
      answer:
        "Yes. Call 010 109 6211 for urgent dispatch. We stock Willard 619 and Exide 619CE for compact cars and can replace on-site after free diagnostics.",
    },
    {
      question: "Roadside 619 battery assistance near Alberton?",
      answer:
        "Our mobile unit provides roadside battery testing and replacement across Alberton with faster local response than national roadside clubs for battery-specific call-outs.",
    },
    {
      question: "How much does emergency 619 replacement cost?",
      answer: `619 batteries start from ${fittedFromPrice} fitted plus any applicable call-out fee. We confirm pricing before dispatch — no surprise charges after the job is done.`,
    },
  ];
}

export async function generateMetadata(): Promise<Metadata> {
  const products = await get619CatalogProducts();
  const fittedFromPrice = get619FittedPriceLabel(products);

  return buildPageMetadata({
  title: "Emergency 619 Battery Replacement Alberton | Roadside Help",
  description:
    "Emergency 619 battery replacement and roadside assistance in Alberton. Fast mobile dispatch, free diagnostics, Willard 619 & Exide 619CE in stock. Call 010 109 6211.",
    path: "/emergency-battery-replacement-alberton",
    keywords: [
      "emergency 619 battery replacement",
      "roadside 619 battery assistance",
      "619 battery emergency alberton",
      "dead battery alberton 619",
    ],
  });
}

export default async function Emergency619AlbertonPage() {
  const products = await get619CatalogProducts();
  const fittedFromPrice = get619FittedPriceLabel(products);
  const FAQ = getEmergencyFaq(fittedFromPrice);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Emergency 619 battery replacement in Alberton",
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
      <JsonLd data={serviceSchema} id="emergency-619-service" />
      <FaqSchema id="emergency-619-faq" items={FAQ} />
      <BreadcrumbSchema
        id="emergency-619-breadcrumb"
        items={[
          { name: "Home", item: "/" },
          { name: "619 Car Battery", item: "/619-car-battery" },
          { name: "Emergency 619", item: "/emergency-battery-replacement-alberton" },
        ]}
      />

      <section className="bg-gradient-to-br from-red-950/40 to-background border-b border-border py-16">
        <div className="container max-w-4xl text-center space-y-6">
          <AlertCircle className="h-12 w-12 text-battery mx-auto" />
          <h1 className="text-4xl md:text-5xl font-black text-foreground">
            Emergency 619 Battery Replacement — Alberton
          </h1>
          <p className="text-lg text-muted-foreground">
            Dead battery on a compact car? We dispatch with 619 batteries in stock, test before we sell, and
            fit on-site across Alberton.
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
          { icon: Zap, title: "619 in stock", text: "Willard 619 & Exide 619CE ready for dispatch" },
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
        <Battery619IntentLinks />
      </div>
    </div>
  );
}
