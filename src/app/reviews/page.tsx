import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Copy, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import IntentLinks from "@/components/seo/IntentLinks";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BASE_URL } from "@/lib/seo-constants";
import { GOOGLE_REVIEW_URL, REVIEW_QR_COPY } from "@/lib/review-constants";
import {
  REVIEW_PROMPTS,
  REVIEW_REQUEST_STEPS,
  REVIEW_SMS_COPY,
  REVIEW_WHATSAPP_COPY,
} from "@/data/review-campaign";

export const metadata: Metadata = buildPageMetadata({
  title: "Review Alberton Battery Mart | Google Review Link",
  description:
    "Leave a Google review for Alberton Battery Mart or use our ready-made WhatsApp/SMS review request copy after a battery fitment.",
  path: "/reviews",
  keywords: [
    "Alberton Battery Mart reviews",
    "battery fitment reviews Alberton",
    "review battery replacement Alberton",
    "Google review Alberton Battery Mart",
  ],
  imageAlt: "Review Alberton Battery Mart on Google",
});

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Review Alberton Battery Mart",
  url: `${BASE_URL}/reviews`,
  description:
    "Review-generation page for Alberton Battery Mart customers and staff after battery testing, fitment, and mobile callouts.",
  potentialAction: {
    "@type": "ReviewAction",
    target: GOOGLE_REVIEW_URL,
    resultReview: {
      "@type": "Review",
      itemReviewed: {
        "@type": "LocalBusiness",
        name: "Alberton Battery Mart",
        url: BASE_URL,
      },
    },
  },
};

export default function ReviewsPage() {
  const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(
    REVIEW_WHATSAPP_COPY
  )}`;

  return (
    <main className="container py-16 space-y-14">
      <JsonLd data={pageSchema} id="review-page-schema" />
      <BreadcrumbSchema
        id="review-breadcrumb-schema"
        items={[
          { name: "Home", item: "/" },
          { name: "Reviews", item: "/reviews" },
        ]}
      />

      <section className="rounded-3xl border border-border bg-card p-8 md:p-12 text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-battery font-bold">
          Local trust engine
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
          Review Alberton Battery Mart
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Google reviews are one of the strongest local ranking signals. Use
          this page after every fitment, test, callout, and fleet visit.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="xl" variant="battery" trackingId="reviews-google-review-click">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="google_review_click"
            >
              <Star className="mr-2 h-5 w-5" />
              Leave a Google Review
            </a>
          </Button>
          <Button asChild size="xl" variant="secondary" trackingId="reviews-whatsapp-copy-click">
            <a
              href={whatsappShareHref}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="review_whatsapp_share"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Send WhatsApp Request
            </a>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-6 space-y-4">
          <div className="flex items-center gap-3 text-battery">
            <Copy className="h-6 w-6" />
            <h2 className="text-2xl font-bold text-foreground">
              WhatsApp review request
            </h2>
          </div>
          <pre className="whitespace-pre-wrap rounded-lg bg-secondary/40 p-4 text-sm text-muted-foreground">
            {REVIEW_WHATSAPP_COPY}
          </pre>
        </div>
        <div className="rounded-2xl border border-border bg-background p-6 space-y-4">
          <div className="flex items-center gap-3 text-battery">
            <Copy className="h-6 w-6" />
            <h2 className="text-2xl font-bold text-foreground">
              SMS review request
            </h2>
          </div>
          <pre className="whitespace-pre-wrap rounded-lg bg-secondary/40 p-4 text-sm text-muted-foreground">
            {REVIEW_SMS_COPY}
          </pre>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          Review request workflow
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {REVIEW_REQUEST_STEPS.map((step, index) => (
            <div key={step.title} className="rounded-xl border border-border bg-card p-5">
              <p className="text-battery font-black">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          Prompts that make reviews useful
        </h2>
        <p className="text-muted-foreground">
          Never script fake reviews. Give customers helpful prompts so their real
          review includes local and service context.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEW_PROMPTS.map((prompt) => (
            <div key={prompt} className="flex items-start gap-3 rounded-lg bg-background p-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-battery" />
              <span className="text-sm text-foreground">{prompt}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-border bg-secondary/20 p-6 space-y-3">
        <h2 className="text-2xl font-bold text-foreground">QR code sign copy</h2>
        <p className="text-muted-foreground">{REVIEW_QR_COPY}</p>
        <p className="text-sm text-muted-foreground">
          Tip: point any printed QR code at <code>{BASE_URL}/reviews</code> so
          you can update the Google review destination later without reprinting.
        </p>
      </section>

      <IntentLinks
        title="Turn reviews into local proof"
        description="Use these pages to connect reviews, job photos, and high-intent service pages."
        columnsClassName="md:grid-cols-3"
        links={[
          {
            href: "/proof/toyota-hilux-battery-replacement-alberton",
            label: "Toyota Hilux proof page",
            description: "Bakkie battery replacement in Alberton.",
          },
          {
            href: "/proof/bmw-agm-battery-coding-meyersdal",
            label: "BMW AGM coding proof page",
            description: "Premium battery fitment in Meyersdal.",
          },
          {
            href: "/proof/truck-battery-fitment-alrode",
            label: "Truck battery proof page",
            description: "Fleet battery fitment in Alrode.",
          },
        ]}
      />

      <p className="text-center text-sm text-muted-foreground">
        Need battery help now?{" "}
        <Link href="/services/mobile-battery-replacement/alberton" className="text-battery underline">
          Book mobile battery replacement
        </Link>
        .
      </p>
    </main>
  );
}
