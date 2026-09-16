import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { AuthorityPageShell } from "@/components/store/AuthorityPageShell";
import { PAGE_COPY } from "@/lib/store-positioning";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { createFaqSchema } from "@/lib/seo/schema";
import { WARRANTY_PREMIUM_MONTHS, WARRANTY_STANDARD_MONTHS } from "@/lib/seo-constants";

const faqs = [
  {
    question: "How long is the battery warranty at Alberton Battery Mart?",
    answer: `Premium lines carry up to ${WARRANTY_PREMIUM_MONTHS} months (Willard EFB and Enertec AGM). Standard automotive batteries start at ${WARRANTY_STANDARD_MONTHS} months. The period is printed on your invoice.`,
  },
  {
    question: "Do you sell a house-brand battery with a long sticker warranty?",
    answer:
      "We stock named manufacturers — Willard, Exide, and Enertec — plus Power Plus and Eco Plus with the months shown on each product. Cover is registered at fitment, not promised as a slogan.",
  },
  {
    question: "What voids a car battery warranty?",
    answer:
      "A flooded battery in an AGM or EFB tray, a start-stop car that was never coded, or an alternator that was never tested. We test charging first and register BMS when the vehicle requires it.",
  },
  {
    question: "Where is warranty handled?",
    answer:
      "At 28 St Columb Rd, New Redruth. Bring the car and the invoice. We test on the same Midtronics process used at sale.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_COPY.warranty.title,
  description: PAGE_COPY.warranty.description,
  path: "/warranty",
  markdownPath: "/warranty.md",
  keywords: [
    "battery warranty Alberton",
    "36 month battery warranty",
    "Willard warranty Alberton",
    "Enertec AGM warranty",
  ],
  imageAlt: "Car battery warranty at Alberton Battery Mart",
});

export default function WarrantyPage() {
  return (
    <>
      <PageJsonLd
        title={PAGE_COPY.warranty.title}
        description={PAGE_COPY.warranty.description}
        path="/warranty"
      />
      <JsonLd data={createFaqSchema(faqs)} id="warranty-faq-schema" />
      <AuthorityPageShell
        title={`Battery warranty in Alberton — up to ${WARRANTY_PREMIUM_MONTHS} months`}
        intro="Cover is a manufacturer period on a named battery, registered when we fit it — not a marketing number on an unnamed cell. Drive in with the invoice if you ever need a claim."
        trackingPrefix="warranty"
      >
        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">What you actually get</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Willard EFB and Enertec AGM carry up to {WARRANTY_PREMIUM_MONTHS} months when fitted
            here. Other lines show their months on the product page and on the invoice. The floor
            for a standard automotive battery is {WARRANTY_STANDARD_MONTHS} months.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are an independent stockist. That means the recommendation can be Willard, Exide, or
            Enertec for the tray in front of us — not a single house brand we have to push because
            it is the only thing on the shelf.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Registered at the counter</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fitment, Midtronics test results, and the warranty period go on the paperwork before you
            leave 28 St Columb Rd. Keep that invoice. Claims are handled in the same shop, on the
            same test equipment.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Keep the cover valid</h2>
          <ul className="list-disc space-y-2 pl-6 text-lg text-muted-foreground">
            <li>Correct technology: AGM or EFB on start-stop cars, never a cheap flooded substitute.</li>
            <li>BMS coding on BMW, Mercedes-Benz, Audi, and other cars that require registration.</li>
            <li>A healthy alternator — we test it so a charging fault does not eat the new battery.</li>
            <li>
              Drive in for a retest if the car is slow to crank again. Do not jump-start it for weeks
              and hope.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Warranty questions</h2>
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
          See live stock with warranty months on{" "}
          <Link href="/products/brand/willard" className="underline">
            Willard
          </Link>
          ,{" "}
          <Link href="/products/brand/exide" className="underline">
            Exide
          </Link>
          , and{" "}
          <Link href="/products/brand/enertec" className="underline">
            Enertec
          </Link>
          , or the{" "}
          <Link href="/agm-battery" className="underline">
            AGM hub
          </Link>
          .
        </p>
      </AuthorityPageShell>
    </>
  );
}
