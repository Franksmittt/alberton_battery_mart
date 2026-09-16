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
    question: "How do I know which car battery I need in Alberton?",
    answer:
      "Match the case size (often 616, 619, 628, 646, 652, 658, or 668), the technology (standard, EFB, or AGM), and cold-cranking amps. We confirm all three at 28 St Columb Rd before fitment.",
  },
  {
    question: "Can I fit a cheaper standard battery in a start-stop car?",
    answer:
      "No. Start-stop cars need EFB or AGM. A flooded substitute dies early and can void cover. We will not fit the wrong spec.",
  },
  {
    question: "Are website prices fitted prices?",
    answer:
      "Yes. Alberton Battery Mart shows fitted prices with scrap exchange. Confirm live stock when you walk in or call 010 109 6211.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_COPY.guide.title,
  description: PAGE_COPY.guide.description,
  path: "/car-battery-guide",
  markdownPath: "/car-battery-guide.md",
  keywords: [
    "how to choose a car battery",
    "car battery Alberton",
    "AGM vs EFB",
    "battery size Alberton",
  ],
  imageAlt: "How to choose a car battery in Alberton",
});

export default function CarBatteryGuidePage() {
  return (
    <>
      <PageJsonLd
        title={PAGE_COPY.guide.title}
        description={PAGE_COPY.guide.description}
        path="/car-battery-guide"
      />
      <JsonLd data={createFaqSchema(faqs)} id="guide-faq-schema" />
      <AuthorityPageShell
        title="How to choose a car battery in Alberton"
        intro="Ignore the loudest warranty sticker. Match the tray, the technology, and the cranking figure, then fit it somewhere that will test the charging system first."
        trackingPrefix="battery-guide"
      >
        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">1. Read the case size</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            South African passenger cars mostly sit in a handful of DIN/JIS sizes. The stamp on the
            old case is the fastest clue:{" "}
            <Link href="/616-car-battery" className="underline">616</Link>,{" "}
            <Link href="/619-car-battery" className="underline">619</Link>,{" "}
            <Link href="/628-car-battery" className="underline">628</Link>,{" "}
            <Link href="/646-car-battery" className="underline">646</Link>,{" "}
            <Link href="/652-car-battery" className="underline">652</Link>,{" "}
            <Link href="/658-car-battery" className="underline">658</Link>,{" "}
            <Link href="/668-car-battery" className="underline">668</Link>. Length, width, and
            terminal layout still get a tape measure at the shop if the case is missing.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">2. Match the technology</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Standard flooded batteries suit older petrol and diesel cars without idle-stop.{" "}
            <Link href="/efb-battery" className="underline">EFB</Link> is common on Polo, Ranger,
            Tucson, and similar start-stop cars.{" "}
            <Link href="/agm-battery" className="underline">AGM</Link> is the usual spec on BMW,
            Mercedes-Benz, Audi, and many premium SUVs. Wrong technology is the main reason a
            “cheap” battery fails in a few months.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">3. Check CCA for Highveld mornings</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cold-cranking amps still matter on winter mornings in Alberton, even if summer heat is
            what ages the plates. We will not down-spec CCA to win a price argument.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">4. Named brand, written months</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Willard, Exide, and Enertec are on the shelf with the warranty months on the invoice.
            See <Link href="/warranty" className="underline">how cover is registered</Link>. A long
            number on an unnamed cell is not the same thing.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">5. Test the charging system</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A new battery in a car with a weak alternator is a repeat job. Drive in for a free
            three-point test at{" "}
            <Link href="/visit" className="underline">28 St Columb Rd</Link>: battery, starter,
            and alternator, before you pay.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Choosing a battery: questions</h2>
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
