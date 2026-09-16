import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { AuthorityPageShell } from "@/components/store/AuthorityPageShell";
import { PAGE_COPY } from "@/lib/store-positioning";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { createFaqSchema } from "@/lib/seo/schema";

const faqs = [
  {
    question: "Do you take old car batteries in Alberton?",
    answer:
      "Yes. Scrap exchange is part of a fitted replacement at 28 St Columb Rd, New Redruth. We recycle the old unit. You do not leave with a lead-acid case in the boot.",
  },
  {
    question: "Is there a dumping fee?",
    answer:
      "No dumping fee on a fitted job. If you only drop a scrap battery without buying, call 010 109 6211 first so we can confirm take-in.",
  },
  {
    question: "Can I keep the old battery?",
    answer:
      "You can, but fitted website prices assume scrap exchange. Say so at the counter if you need to keep it.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_COPY.recycle.title,
  description: PAGE_COPY.recycle.description,
  path: "/recycle-battery",
  markdownPath: "/recycle-battery.md",
  keywords: [
    "recycle car battery Alberton",
    "scrap battery New Redruth",
    "old battery disposal Alberton",
  ],
  imageAlt: "Recycle a car battery at Alberton Battery Mart",
});

export default function RecycleBatteryPage() {
  return (
    <>
      <PageJsonLd
        title={PAGE_COPY.recycle.title}
        description={PAGE_COPY.recycle.description}
        path="/recycle-battery"
      />
      <JsonLd data={createFaqSchema(faqs)} id="recycle-faq-schema" />
      <AuthorityPageShell
        title="Recycle the old battery in Alberton"
        intro="Lead-acid scrap does not belong in a municipal bin. Drive the old unit to 28 St Columb Rd with the car, or leave it with us when we fit the new one."
        trackingPrefix="recycle"
      >
        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">What happens at the counter</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            On a fitted replacement we take the old battery as scrap exchange. That is already in the
            prices you see on size hubs such as{" "}
            <Link href="/652-car-battery" className="underline">
              652
            </Link>
            . We send scrap through proper recycling, not landfill.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Drop-off only</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            If you already replaced the battery elsewhere and just need the old one gone, call the
            shop first. Walk-in take-in is for customers we can identify at 28 St Columb Rd during
            trading hours.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Recycling questions</h2>
          {faqs.map((faq) => (
            <details key={faq.question} className="border-b border-border py-4">
              <summary className="cursor-pointer text-lg font-semibold text-foreground">
                {faq.question}
              </summary>
              <p className="pt-3 text-muted-foreground leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </section>
      </AuthorityPageShell>
    </>
  );
}
