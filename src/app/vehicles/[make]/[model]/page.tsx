// src/app/vehicles/[make]/[model]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getVehicleFitment,
  getAllVehicleSlugs,
} from "@/data/vehicle-fitment";
import { BASE_URL } from "@/lib/seo-constants";
import { MapPin, AlertTriangle, ShieldCheck } from "lucide-react";
import AtomicAnswers from "@/components/seo/AtomicAnswers";

type Params = {
  make: string;
  model: string;
};

function buildSlug(make: string, model: string) {
  return `${make}/${model}`;
}

export async function generateStaticParams() {
  return getAllVehicleSlugs().map((slug) => {
    const [make, model] = slug.split("/");
    return { make, model };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const entry = getVehicleFitment(buildSlug(params.make, params.model));

  if (!entry) {
    return {};
  }

  const url = `${BASE_URL}/vehicles/${entry.slug}`;

  return {
    title: `${entry.headline} | Alberton Battery Mart`,
    description: entry.description,
    keywords: entry.keywords,
    openGraph: {
      title: entry.headline,
      description: entry.description,
      url,
      type: "article",
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: entry.headline,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function VehicleFitmentPage({ params }: { params: Params }) {
  const entry = getVehicleFitment(buildSlug(params.make, params.model));

  if (!entry) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: entry.headline,
    vehicleModelDate: entry.years,
    manufacturer: entry.make,
    description: entry.description,
    offers: entry.recommendedProducts.map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: product.title,
        url: `${BASE_URL}/products/${product.slug}`,
      },
      url: `${BASE_URL}/products/${product.slug}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entry.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="container py-16 space-y-16">
      <JsonLd data={schema} id="vehicle-schema" />
      <JsonLd data={faqSchema} id="vehicle-faq-schema" />

      <section className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
            {entry.make.toUpperCase()} · {entry.years}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
            {entry.headline}
          </h1>
          <p className="text-lg text-muted-foreground">{entry.description}</p>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-battery">
              Common issues we solve
            </h3>
            <ul className="list-disc pl-6 text-muted-foreground">
              {entry.painPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="battery">
              <a href="tel:0101096211">Book fitment</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a
                href="https://wa.me/27823046926?text=Vehicle%20battery%20quote"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp diagnostics
              </a>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5 border border-border rounded-lg p-6 bg-secondary/20 space-y-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-battery" />
            <p className="text-sm uppercase tracking-wide text-muted-foreground">
              Supported engines
            </p>
          </div>
          <ul className="text-muted-foreground list-disc pl-6">
            {entry.engines.map((engine) => (
              <li key={engine}>{engine}</li>
            ))}
          </ul>
          <div className="flex items-center gap-3 pt-4">
            <MapPin className="h-5 w-5 text-battery" />
            <p className="text-sm text-foreground">
              Service area: Alberton, Meyersdal, Brackenhurst, Alrode
            </p>
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          Recommended batteries
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {entry.recommendedProducts.map((product) => (
            <div
              key={product.slug}
              className="border border-border rounded-lg p-6 bg-card shadow-sm"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {product.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{product.reason}</p>
              <Button
                className="mt-4"
                size="sm"
                variant="outline"
                asChild
              >
                <a href={`/products/${product.slug}`}>View specs</a>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border" />

      <AtomicAnswers
        variant="custom"
        answers={[
          {
            question: `What battery size fits the ${entry.headline}?`,
            answer:
              entry.recommendedProducts[0]?.title
                ? `We typically install the ${entry.recommendedProducts[0].title} because it matches the OEM spec and handles accessories like fridges and winches.`
                : "We size the battery based on your accessories and charging system, matching or upgrading the OEM rating.",
          },
          {
            question: "Do you reset the vehicle’s BMS?",
            answer:
              "Yes. After fitment we register the new battery so the ECU charges it correctly and clears Start/Stop warnings.",
          },
          {
            question: "Is the service mobile?",
            answer:
              "Yes. We cover Alberton, Meyersdal, Alrode, and Brackenhurst with mobile callouts, or you can book an in-store slot.",
          },
        ]}
      />

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          Services we recommend
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {entry.services.map((service) => (
            <div
              key={service.href}
              className="border border-border rounded-lg p-6 bg-secondary/20"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {service.label}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {service.description}
              </p>
              <Button className="mt-4" size="sm" asChild>
                <a href={service.href}>Learn more</a>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border" />

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-battery" />
          <h2 className="text-3xl font-bold text-foreground">
            FAQs for {entry.headline}
          </h2>
        </div>
        <div className="space-y-4">
          {entry.faqs.map((faq) => (
            <div
              key={faq.question}
              className="border border-border rounded-lg p-5 bg-card"
            >
              <p className="font-semibold text-lg text-foreground">
                {faq.question}
              </p>
              <p className="mt-2 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center space-y-4 bg-secondary/20 border border-border rounded-2xl p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Not sure which battery you need?
        </p>
        <h2 className="text-3xl font-bold text-foreground">
          Talk to Alberton’s certified battery technicians
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" variant="battery">
            <a href="tel:0101096211">Call 010 109 6211</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a
              href="https://wa.me/27823046926?text=Vehicle%20battery%20quote"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp the workshop
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

