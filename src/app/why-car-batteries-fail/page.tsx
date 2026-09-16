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
    question: "How long does a car battery last in Alberton?",
    answer:
      "Three to five years is typical. Highveld heat, short suburban trips, and start-stop cycling shorten that. If the car is slow to crank after standing overnight, drive in for a test.",
  },
  {
    question: "Why did a new battery die so quickly?",
    answer:
      "Usually the wrong technology, no BMS coding on a German car, or an alternator that was never tested. We check all three at 28 St Columb Rd.",
  },
  {
    question: "Is a jump-start a fix?",
    answer:
      "No. It gets you to the shop. If the plates will not hold charge, you need a replacement — and a charging-system test so the next one lasts.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_COPY.fail.title,
  description: PAGE_COPY.fail.description,
  path: "/why-car-batteries-fail",
  markdownPath: "/why-car-batteries-fail.md",
  keywords: [
    "why car batteries fail",
    "car battery Highveld",
    "battery heat Alberton",
    "slow cranking Alberton",
  ],
  imageAlt: "Why car batteries fail in Alberton",
});

export default function WhyBatteriesFailPage() {
  return (
    <>
      <PageJsonLd
        title={PAGE_COPY.fail.title}
        description={PAGE_COPY.fail.description}
        path="/why-car-batteries-fail"
      />
      <JsonLd data={createFaqSchema(faqs)} id="fail-faq-schema" />
      <AuthorityPageShell
        title="Why car batteries fail in Alberton"
        intro="Alberton is hard on batteries: summer heat under the bonnet, short school-run trips that never finish a charge cycle, and start-stop traffic on Voortrekker. Test before you guess."
        trackingPrefix="battery-fail"
      >
        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Heat under the bonnet</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Highveld summers cook the engine bay. Heat evaporates water from flooded cells and ages
            AGM separators faster than a coastal climate. A battery that looks fine in September can
            be sluggish by January. That is why we load-test instead of reading the date stamp alone.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Short trips in the suburbs</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Meyersdal, Brackenhurst, Brackendowns, and Alberton North are full of five-minute hops.
            The alternator never gets a long run to replace what the starter took. Overnight standing
            then shows up as a slow crank. If this is the pattern, come in before you are stranded at
            the school gate.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Start-stop and the wrong spec</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Idle-stop cars cycle the battery at every robot. A standard flooded battery is not built
            for that. Fit{" "}
            <Link href="/start-stop-battery" className="underline">
              AGM or EFB
            </Link>{" "}
            and code BMW/Mercedes systems or start-stop dies and the warning light stays on.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Charging faults dressed up as battery faults</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dim lights and a battery that keeps dying after replacement is often the alternator. The{" "}
            <Link href="/testing" className="underline">
              three-point test
            </Link>{" "}
            at 28 St Columb Rd is free. We would rather send you home with a healthy battery than sell
            you a second one.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground">Failure questions</h2>
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
