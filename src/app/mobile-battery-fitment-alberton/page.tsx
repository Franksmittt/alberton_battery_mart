import { Metadata } from "next";
import Link from "next/link";
import { Clock3, MapPin, Phone, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo/metadata";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  BASE_URL,
  BUSINESS_ADDRESS,
  BUSINESS_CONTACT,
  LOCAL_BUSINESS_ID,
  SERVICE_AREAS,
  STORE_COORDINATES,
} from "@/lib/seo-constants";
import { Battery619IntentLinks } from "@/components/content/Battery619Sections";

const FAQ = [
  {
    question: "Mobile 619 battery fitment price in Alberton?",
    answer:
      "619 batteries start from R 1 450 fitted with scrap exchange. Mobile call-out includes free alternator and starter testing. Call-out fees apply for travel — we quote upfront before dispatch.",
  },
  {
    question: "How fast is mobile 619 battery fitment?",
    answer:
      "Average response across Alberton is 45–60 minutes during operating hours. New Redruth and Alberton Central are typically fastest from our St Columb Rd storefront.",
  },
  {
    question: "On-site 619 battery fitment — what is included?",
    answer:
      "We bring the correct 619 battery, test your charging system, professionally install with torque-checked clamps, register warranty, and dispose of your old battery.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Mobile 619 Battery Fitment Alberton | On-Site Installation",
  description:
    "Mobile 619 battery fitment in Alberton. On-site delivery, installation, free alternator testing, and 45–60 min average response. Willard 619 & Exide 619CE in stock.",
  path: "/mobile-battery-fitment-alberton",
  keywords: [
    "mobile 619 battery fitment",
    "619 battery delivery and installation",
    "on-site 619 battery fitment",
    "mobile battery fitment alberton",
  ],
});

export default function MobileBatteryFitmentAlbertonPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile 619 battery fitment in Alberton",
    provider: {
      "@type": "LocalBusiness",
      "@id": LOCAL_BUSINESS_ID,
      name: "Alberton Battery Mart",
      telephone: BUSINESS_CONTACT.telephone,
      url: BASE_URL,
      address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
      geo: {
        "@type": "GeoCoordinates",
        latitude: STORE_COORDINATES.latitude,
        longitude: STORE_COORDINATES.longitude,
      },
    },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "Place", name })),
  };

  return (
    <div className="space-y-12 pb-16">
      <JsonLd data={serviceSchema} id="mobile-619-fitment-service" />
      <FaqSchema id="mobile-619-fitment-faq" items={FAQ} />
      <BreadcrumbSchema
        id="mobile-619-fitment-breadcrumb"
        items={[
          { name: "Home", item: "/" },
          { name: "619 Car Battery", item: "/619-car-battery" },
          { name: "Mobile Fitment", item: "/mobile-battery-fitment-alberton" },
        ]}
      />

      <section className="bg-card border-b border-border py-16">
        <div className="container max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
            Mobile 619 Battery Fitment in <span className="text-battery">Alberton</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            On-site delivery, installation, and diagnostics for 619-size batteries. We come to your home,
            office, or breakdown location across Alberton.
          </p>
          <Button asChild size="xl" variant="battery">
            <a href="tel:0101096211" className="flex items-center gap-2 mx-auto">
              <Phone className="h-5 w-5" />
              Book mobile 619 fitment
            </a>
          </Button>
        </div>
      </section>

      <section className="container grid md:grid-cols-3 gap-6">
        {[
          { icon: Clock3, title: "45–60 min response", text: "Average dispatch across Alberton suburbs" },
          { icon: Wrench, title: "Free diagnostics", text: "Alternator & starter test before replacement" },
          { icon: ShieldCheck, title: "Warranty registered", text: "Up to 25 months on Willard 619" },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-border bg-card/50 p-6 space-y-2">
            <item.icon className="h-6 w-6 text-battery" />
            <h2 className="font-bold text-foreground">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="container max-w-3xl space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Areas we cover</h2>
        <p className="text-muted-foreground flex items-start gap-2">
          <MapPin className="h-5 w-5 text-battery shrink-0 mt-0.5" />
          {SERVICE_AREAS.join(" · ")}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/services/mobile-battery-replacement/alberton">Full mobile service page</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/619-car-battery">619 battery hub</Link>
          </Button>
        </div>
      </section>

      <div className="container">
        <Battery619IntentLinks />
      </div>
    </div>
  );
}
