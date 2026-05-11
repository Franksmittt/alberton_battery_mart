import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Camera, CheckCircle2, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import IntentLinks from "@/components/seo/IntentLinks";
import {
  getAllLocalProofStories,
  getLocalProofStory,
} from "@/data/local-proof";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BASE_URL } from "@/lib/seo-constants";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return getAllLocalProofStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const story = getLocalProofStory(params.slug);

  if (!story) return {};

  return buildPageMetadata({
    title: `${story.title} | Local Proof`,
    description: story.description,
    path: `/proof/${story.slug}`,
    keywords: story.keywords,
    type: "article",
    imageAlt: story.title,
  });
}

export default function LocalProofPage({ params }: { params: Params }) {
  const story = getLocalProofStory(params.slug);

  if (!story) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.description,
    image: `${BASE_URL}/images/og-image.jpg`,
    author: {
      "@type": "Organization",
      name: "Alberton Battery Mart",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Alberton Battery Mart",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo-schema.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/proof/${story.slug}`,
    },
    about: [story.area, story.service, story.vehicleOrUseCase, story.batteryFocus],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: story.service,
    areaServed: {
      "@type": "Place",
      name: story.area,
    },
    provider: {
      "@type": "LocalBusiness",
      name: "Alberton Battery Mart",
      url: BASE_URL,
      telephone: "+27101096211",
    },
    serviceType: story.service,
    description: story.description,
  };

  return (
    <main className="container py-16 space-y-14">
      <JsonLd data={articleSchema} id="local-proof-article-schema" />
      <JsonLd data={serviceSchema} id="local-proof-service-schema" />
      <BreadcrumbSchema
        id="local-proof-breadcrumb-schema"
        items={[
          { name: "Home", item: "/" },
          { name: "Local Proof", item: "/reviews" },
          { name: story.title, item: `/proof/${story.slug}` },
        ]}
      />

      <section className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8 space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-battery font-bold">
            Local proof system
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
            {story.title}
          </h1>
          <p className="text-xl text-muted-foreground">{story.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="battery" trackingId={`proof-${story.slug}-call`}>
              <a href="tel:0101096211">
                <Phone className="mr-2 h-5 w-5" />
                Book This Service
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" trackingId={`proof-${story.slug}-service`}>
              <Link href={story.primaryServiceHref} data-track-event="proof_service_click">
                View Service Page
              </Link>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3 text-battery">
            <MapPin className="h-6 w-6" />
            <h2 className="text-xl font-bold text-foreground">Proof target</h2>
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Area</dt>
              <dd className="font-semibold text-foreground">{story.area}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Service</dt>
              <dd className="font-semibold text-foreground">{story.service}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Vehicle / use case</dt>
              <dd className="font-semibold text-foreground">{story.vehicleOrUseCase}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Battery focus</dt>
              <dd className="font-semibold text-foreground">{story.batteryFocus}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Situation</h2>
          <p className="text-muted-foreground">{story.situation}</p>
          <h3 className="text-xl font-semibold text-foreground">Expected outcome</h3>
          <p className="text-muted-foreground">{story.outcome}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3 text-battery">
            <ShieldCheck className="h-6 w-6" />
            <h2 className="text-2xl font-bold text-foreground">Diagnostic workflow</h2>
          </div>
          <div className="space-y-3">
            {story.diagnosticSteps.map((step, index) => (
              <div key={step} className="flex gap-3">
                <span className="font-black text-battery">0{index + 1}</span>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-border bg-secondary/20 p-6 space-y-5">
        <div className="flex items-center gap-3 text-battery">
          <Camera className="h-6 w-6" />
          <h2 className="text-2xl font-bold text-foreground">
            Real-world proof checklist
          </h2>
        </div>
        <p className="text-muted-foreground">
          Add real job photos and review snippets here after each completed job.
          Do not fabricate reviews or ratings; authentic local proof is the moat.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {story.proofChecklist.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-lg bg-background p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-battery" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <IntentLinks
        title="Related local domination pages"
        description="These routes connect service, suburb, vehicle, and product intent."
        columnsClassName="md:grid-cols-3"
        links={[
          ...story.relatedLinks,
          {
            href: "/reviews",
            label: "Review request system",
            description: "Turn completed jobs into Google reviews.",
          },
          {
            href: story.secondaryHref,
            label: "Secondary fitment page",
            description: "Vehicle or product context for this proof page.",
          },
        ]}
      />
    </main>
  );
}
