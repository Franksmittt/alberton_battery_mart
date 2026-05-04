// src/app/services/[service]/[area]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getServicePage,
  getAllServicePages,
} from "@/data/service-pages";
import { BASE_URL, BUSINESS_ADDRESS, BUSINESS_CONTACT } from "@/lib/seo-constants";
import { Phone, MapPin, Zap, ShieldCheck } from "lucide-react";
import AtomicAnswers from "@/components/seo/AtomicAnswers";

type Params = {
  service: string;
  area: string;
};

export async function generateStaticParams() {
  return getAllServicePages().map((service) => ({
    service: service.serviceSlug,
    area: service.areaSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const entry = getServicePage(params.service, params.area);

  if (!entry) {
    return {};
  }

  const url = `${BASE_URL}/services/${entry.serviceSlug}/${entry.areaSlug}`;

  return {
    title: `${entry.title} | Alberton Battery Mart`,
    description: entry.description,
    keywords: entry.keywords,
    openGraph: {
      title: entry.title,
      description: entry.description,
      url,
      type: "article",
      images: [
        {
          url: entry.ogImage || `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: entry.title,
        },
      ],
      locale: 'en_ZA',
      siteName: 'Alberton Battery Mart',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.description,
      images: [entry.ogImage || `${BASE_URL}/images/og-image.jpg`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const entry = getServicePage(params.service, params.area);

  if (!entry) {
    notFound();
  }

  const schema = entry.schema
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: entry.schema.serviceType,
        description: entry.description,
        provider: {
          "@type": "LocalBusiness",
          name: "Alberton Battery Mart",
          address: {
            "@type": "PostalAddress",
            ...BUSINESS_ADDRESS,
          },
          telephone: BUSINESS_CONTACT.telephone,
          url: BASE_URL,
        },
        areaServed: entry.schema.serviceAreas?.map((name) => ({
          "@type": "City",
          name,
        })),
        offers: {
          "@type": "Offer",
          description: entry.schema.offers,
          priceCurrency: "ZAR",
          price: 0,
        },
      }
    : null;

  const faqSchema =
    entry.faqs.length > 0
      ? {
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
        }
      : null;

  const atomicAnswers = [
    {
      question: "How fast can you reach me?",
      answer:
        "Most callouts inside Alberton, New Redruth, Meyersdal, and Alrode arrive within an hour. We dispatch with the exact battery spec matching your VIN and alternator output.",
    },
    {
      question: "What diagnostics are included?",
      answer:
        "Every visit includes Midtronics load testing, alternator ripple checks, starter draw, and BMS scans where needed. We replace the battery only after proving the failure.",
    },
    {
      question: "Do you handle payment and warranties on-site?",
      answer:
        "Yes. We accept card payments via mobile terminals and register the manufacturer warranty immediately, so you leave with documentation in hand.",
    },
  ];

  return (
    <div className="container py-16 space-y-16">
      {schema && <JsonLd data={schema} id="service-schema" />}
      {faqSchema && <JsonLd data={faqSchema} id="service-faq-schema" />}

      <section className="text-center space-y-4">
        {entry.heroEyebrow && (
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
            {entry.heroEyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
          {entry.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {entry.description}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {entry.ctas.map((cta) => (
            <Button
              key={cta.label}
              asChild
              variant={cta.variant === "secondary" ? "secondary" : "battery"}
              size="lg"
            >
              <a href={cta.href}>{cta.label}</a>
            </Button>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 text-battery">
            <Zap className="h-8 w-8" />
            <p className="font-semibold uppercase tracking-wide">
              Service overview
            </p>
          </div>
          <p className="text-lg text-muted-foreground">{entry.intro}</p>
          <div className="space-y-3 bg-card p-6 rounded-lg border border-border">
            {entry.coverage.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-battery mt-1 flex-shrink-0" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 bg-secondary/30 border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Why diagnostics first?
          </h2>
          <p className="text-muted-foreground">
            Replacing a battery without data often masks alternator or starter
            faults. Our workflow uncovers the real failure before you spend a
            cent.
          </p>
          <ul className="space-y-2 text-sm">
            <li>• Midtronics digital load test</li>
            <li>• Alternator ripple & voltage drop</li>
            <li>• Starter draw & cabling check</li>
            <li>• Written report for warranty claims</li>
          </ul>
        </div>
      </section>

      <Separator className="bg-border" />

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-foreground">
          Critical benefits
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {entry.benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="border border-border rounded-lg p-6 bg-card shadow-sm"
            >
              <h3 className="text-xl font-semibold text-battery">
                {benefit.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border" />

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-foreground">Our process</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {entry.process.map((step) => (
            <div
              key={step.title}
              className="p-6 rounded-lg bg-secondary/20 border border-border"
            >
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                {step.title}
              </p>
              <p className="mt-3 text-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <AtomicAnswers variant="custom" answers={atomicAnswers} />

      <Separator className="bg-border" />

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-battery" />
          <h2 className="text-3xl font-bold text-foreground">
            Frequently asked questions
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

      {(entry.relatedVehicles || entry.relatedProducts) && (
        <section className="bg-secondary/20 border border-border rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Related vehicles & batteries
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {entry.relatedVehicles && (
              <div>
                <h3 className="text-xl font-semibold text-battery">
                  Vehicle-specific guides
                </h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {entry.relatedVehicles.map((vehicle) => (
                    <li key={vehicle.slug}>
                      <a
                        href={`/vehicles/${vehicle.slug}`}
                        className="text-foreground hover:text-battery font-medium"
                      >
                        {vehicle.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {entry.relatedProducts && (
              <div>
                <h3 className="text-xl font-semibold text-battery">
                  Recommended batteries
                </h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {entry.relatedProducts.map((product) => (
                    <li key={product.slug}>
                      <a
                        href={`/products/${product.slug}`}
                        className="text-foreground hover:text-battery font-medium"
                      >
                        {product.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="text-center space-y-4 bg-secondary/20 border border-border rounded-2xl p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Ready for answers?
        </p>
        <h2 className="text-3xl font-bold text-foreground">
          Book a diagnostic or ask for a second opinion
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" variant="battery">
            <a href="tel:0101096211" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              010 109 6211
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a
              href="https://wa.me/27823046926"
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

