// src/app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductDetail, getAllProductSlugs } from "@/data/product-detail";
import { BASE_URL, ORG_ID, DEFAULT_HERO_IMAGE } from "@/lib/seo-constants";
import { ShieldCheck } from "lucide-react";
import AtomicAnswers from "@/components/seo/AtomicAnswers";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const product = getProductDetail(params.slug);

  if (!product) {
    return {};
  }

  const url = `${BASE_URL}/products/${product.slug}`;

  return {
    title: `${product.title} | Alberton Battery Mart`,
    description: product.description,
    keywords: product.keywords,
    openGraph: {
      title: product.title,
      description: product.description,
      url,
      type: "article",
      images: [
        {
          url: product.heroImage ? `${BASE_URL}${product.heroImage}` : `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ProductDetailPage({ params }: { params: Params }) {
  const product = getProductDetail(params.slug);

  if (!product) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/products/${product.slug}#product`,
    name: product.title,
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    image: product.heroImage || DEFAULT_HERO_IMAGE,
    offers: {
      "@type": "Offer",
      price: product.price.replace(/[^\d.]/g, ""),
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/products/${product.slug}`,
    },
    manufacturer: {
      "@id": ORG_ID,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Ah", value: product.ah },
      { "@type": "PropertyValue", name: "CCA", value: product.cca },
      {
        "@type": "PropertyValue",
        name: "Warranty",
        value: `${product.warrantyMonths} Months`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
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
      <JsonLd data={productSchema} id="product-schema" />
      <JsonLd data={faqSchema} id="product-faq-schema" />

      <section className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
            {product.brand} — {product.chemistry}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
            {product.title}
          </h1>
          <p className="text-xl text-muted-foreground">{product.subtitle}</p>
          <p className="text-lg text-muted-foreground">{product.description}</p>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-3xl font-bold text-foreground">
              {product.price}
            </span>
            <Button asChild size="lg" variant="battery" trackingId={`product-${product.slug}-call`}>
              <a href="tel:0101096211">Book installation</a>
            </Button>
            <Button asChild size="lg" variant="secondary" trackingId={`product-${product.slug}-whatsapp`}>
              <a
                href="https://wa.me/27823046926?text=Battery%20quote"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp the workshop
              </a>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5 border border-border rounded-xl p-6 bg-secondary/20 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Key specs</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <dt className="font-semibold text-foreground">Chemistry</dt>
              <dd>{product.chemistry}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Category</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Capacity</dt>
              <dd>{product.ah} Ah</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">CCA</dt>
              <dd>{product.cca} A</dd>
            </div>
            {product.reserveMinutes && (
              <div>
                <dt className="font-semibold text-foreground">Reserve</dt>
                <dd>{product.reserveMinutes} mins</dd>
              </div>
            )}
            <div>
              <dt className="font-semibold text-foreground">Warranty</dt>
              <dd>{product.warrantyMonths} Months</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Dimensions</dt>
              <dd>{product.dimensions}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">OEM </dt>
              <dd>Verified fitment</dd>
            </div>
          </dl>
        </div>
      </section>

      <Separator className="bg-border" />

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          Ideal vehicles / fitment notes
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-battery">
              Vehicles we recommend this for
            </h3>
            <ul className="list-disc pl-6 text-muted-foreground">
              {product.idealVehicles.map((vehicle) => (
                <li key={vehicle}>{vehicle}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-battery">
              Fitment notes
            </h3>
            <ul className="list-disc pl-6 text-muted-foreground">
              {product.fitmentNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          Why Alberton Battery Mart?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {product.highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="border border-border rounded-lg p-6 bg-card shadow-sm"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {highlight.title}
              </h3>
              <p className="mt-3 text-muted-foreground">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <AtomicAnswers
        variant="custom"
        answers={[
          {
            question: "How long does installation take?",
            answer:
              "Most in-store installs take ±30 minutes, callouts ±60 minutes. We code the battery if your vehicle requires BMS registration.",
          },
          {
            question: "Do you test before replacing?",
            answer:
              "Yes. Every job includes Midtronics load testing plus alternator/starter checks so we only replace once we’ve proved failure.",
          },
          {
            question: "What warranties apply?",
            answer:
              `This battery carries a ${product.warrantyMonths}-month manufacturer warranty. We register it on-site so your proof of purchase and fitment is locked in.`,
          },
        ]}
      />

      <Separator className="bg-border" />

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          Compare with other batteries
        </h2>
        <div className="space-y-4">
          {product.comparisonTargets.map((item) => (
            <div
              key={item.slug}
              className="flex flex-col md:flex-row md:items-center md:justify-between border border-border rounded-lg p-4 bg-secondary/20"
            >
              <p className="text-lg font-semibold text-foreground">
                {item.label}
              </p>
              <Button asChild variant="outline" size="sm">
                <a href={`/products/${item.slug}`}>View specs</a>
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
            FAQs about the {product.title}
          </h2>
        </div>
        <div className="space-y-4">
          {product.faqs.map((faq) => (
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

      {(product.vehicleLinks || product.serviceLinks) && (
        <section className="bg-secondary/20 border border-border rounded-2xl p-10 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Compatible vehicles & services
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {product.vehicleLinks && (
              <div>
                <h3 className="text-xl font-semibold text-battery">
                  Vehicle guides
                </h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {product.vehicleLinks.map((vehicle) => (
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
            {product.serviceLinks && (
              <div>
                <h3 className="text-xl font-semibold text-battery">
                  Book these services
                </h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {product.serviceLinks.map((service) => (
                    <li key={service.href}>
                      <a
                        href={service.href}
                        className="text-foreground hover:text-battery font-medium"
                      >
                        {service.label}
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
          Ready to upgrade?
        </p>
        <h2 className="text-3xl font-bold text-foreground">
          Book professional fitment & diagnostics
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" variant="battery">
            <a href="tel:0101096211">Call 010 109 6211</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a
              href="https://wa.me/27823046926?text=Battery%20quote"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book via WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

