import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { AuthorityPageShell } from "@/components/store/AuthorityPageShell";
import { ARRIVAL_ROUTES, DRIVE_IN_STEPS, PARKING_COPY, WHAT_TO_BRING } from "@/data/drive-in";
import { PAGE_COPY } from "@/lib/store-positioning";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { createFaqSchema, createHowToSchema } from "@/lib/seo/schema";
import { STORE_ADDRESS_LINE, STORE_MAPS_EMBED } from "@/lib/seo-constants";

const faqs = [
  {
    question: "Do I need an appointment to visit Alberton Battery Mart?",
    answer:
      "No. Walk in at 28 St Columb Rd, New Redruth during trading hours. Phones are answered from 07:30 on weekdays; the shop floor opens at 08:00.",
  },
  {
    question: "How do I get to 28 St Columb Rd from Voortrekker Road?",
    answer:
      "Stay on Voortrekker through New Redruth and turn into St Columb Road. Number 28 is on a quiet side street, about a minute off the main road.",
  },
  {
    question: "Is there parking at the shop?",
    answer:
      "Park on St Columb Road at the shopfront. You are off Voortrekker through-traffic, so you are not hunting for a main-road bay.",
  },
  {
    question: "What if my car will not start?",
    answer:
      "Call 010 109 6211. If the car can be nursed to New Redruth, drive in — that is still the fastest fitment. If it cannot move, we can dispatch a mobile callout.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_COPY.visit.title,
  description: PAGE_COPY.visit.description,
  path: "/visit",
  markdownPath: "/visit.md",
  keywords: [
    "battery shop Alberton",
    "28 St Columb Rd",
    "car battery New Redruth",
    "drive in battery Alberton",
    "battery store near Voortrekker",
  ],
  imageAlt: "Visit Alberton Battery Mart at 28 St Columb Rd, New Redruth",
});

export default function VisitPage() {
  return (
    <>
      <PageJsonLd
        title={PAGE_COPY.visit.title}
        description={PAGE_COPY.visit.description}
        path="/visit"
      />
      <JsonLd
        data={createHowToSchema({
          name: "Drive in for a car battery in Alberton",
          description: `Walk in at ${STORE_ADDRESS_LINE} for a free test and same-day fitment.`,
          url: "/visit",
          steps: DRIVE_IN_STEPS.map((step) => ({ name: step.title, text: step.body })),
        })}
        id="visit-howto-schema"
      />
      <JsonLd data={createFaqSchema(faqs)} id="visit-faq-schema" />
      <AuthorityPageShell
        title="Visit the shop at 28 St Columb Rd"
        intro="Alberton Battery Mart is a walk-in battery shop in New Redruth — not a main-road queue and not a mobile-only van. One turn off Voortrekker Road, park at the door, and we test before we sell."
        trackingPrefix="visit"
        relatedTitle="Stock, suburbs, and warranty"
      >
        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">How to find us</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {PARKING_COPY} The physical counter is {STORE_ADDRESS_LINE}. Google Maps: search
            Alberton Battery Mart or drop a pin on St Columb Road, New Redruth.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {ARRIVAL_ROUTES.map((route) => (
            <article
              key={route.from}
              className="rounded-xl border border-border bg-card p-5 space-y-2"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-battery">
                From {route.from} · {route.minutes}
              </p>
              <h3 className="text-xl font-bold text-foreground">
                <Link href={route.href} className="hover:text-battery">
                  Drive in from {route.from}
                </Link>
              </h3>
              <p className="text-muted-foreground leading-relaxed">{route.directions}</p>
            </article>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-extrabold text-foreground">What to bring</h2>
          <ul className="list-disc space-y-2 pl-6 text-lg text-muted-foreground">
            {WHAT_TO_BRING.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-extrabold text-foreground">On the shop floor</h2>
          <ol className="list-decimal space-y-3 pl-6 text-lg text-muted-foreground">
            {DRIVE_IN_STEPS.map((step) => (
              <li key={step.title}>
                <span className="font-semibold text-foreground">{step.title}.</span> {step.body}
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Map</h2>
          <div className="overflow-hidden rounded-xl border border-border aspect-video">
            <iframe
              src={STORE_MAPS_EMBED}
              width="100%"
              height="100%"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
              title="Map to Alberton Battery Mart at 28 St Columb Rd"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Visit questions</h2>
          {faqs.map((faq) => (
            <details key={faq.question} className="border-b border-border py-4">
              <summary className="cursor-pointer text-lg font-semibold text-foreground">
                {faq.question}
              </summary>
              <p className="pt-3 text-muted-foreground leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </section>

        <p className="text-muted-foreground">
          Need a size before you drive? Check{" "}
          <Link href="/652-car-battery" className="underline">
            652
          </Link>
          ,{" "}
          <Link href="/agm-battery" className="underline">
            AGM
          </Link>
          , or{" "}
          <Link href="/warranty" className="underline">
            warranty cover
          </Link>
          .
        </p>
      </AuthorityPageShell>
    </>
  );
}
