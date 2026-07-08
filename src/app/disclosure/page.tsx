import Link from "next/link";
import { Metadata } from "next";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_ADDRESS_SHORT,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/seo-constants";

const PAGE_TITLE = "Disclosure | Alberton Battery Mart";
const PAGE_DESCRIPTION =
  "Alberton Battery Mart is an independent motor vehicle battery retailer in New Redruth, Alberton. Factual disclosure about our business, trademarks, and advertising.";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: "/disclosure",
    keywords: [
      "Alberton Battery Mart disclosure",
      "independent battery retailer Alberton",
      "battery shop New Redruth",
    ],
  }),
};

export default function DisclosurePage() {
  return (
    <>
      <PageJsonLd
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/disclosure"
        id="disclosure-page-jsonld"
      />

      <div className="container max-w-3xl py-12 sm:py-16">
        <header className="mb-10 space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Disclosure
          </h1>
          <p className="text-muted-foreground">
            Factual information about Alberton Battery Mart for customers, search engines, and
            advertising transparency.
          </p>
        </header>

        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-p:text-muted-foreground prose-li:text-muted-foreground">
          <section className="space-y-3">
            <h2>Who we are</h2>
            <p>
              Alberton Battery Mart is an independent motor vehicle battery retailer operating from{" "}
              {STORE_ADDRESS_SHORT}. We are a separate business and are not owned by, affiliated
              with, authorised by, or sponsored by any national battery chain or franchise.
            </p>
          </section>

          <section className="space-y-3">
            <h2>Trademarks</h2>
            <p>
              Names such as Global Batteries, Battery Centre, First Battery Centre, and other
              third-party brands mentioned on this page are trademarks of their respective owners.
              We use them only where necessary to identify the market or for factual comparison. No
              endorsement or association is implied.
            </p>
          </section>

          <section className="space-y-3">
            <h2>Comparative information</h2>
            <p>
              Any price or product comparisons on this site are based on our in-store prices at the
              time stated. Competitor pricing changes; we do not guarantee we are the cheapest in
              every case. Visit us in store for current pricing and fitment advice.
            </p>
          </section>

          <section className="space-y-3">
            <h2>Advertising</h2>
            <p>
              Our online advertising may appear when users search for batteries or related services
              in the Alberton area. Search listings and advertisements clearly identify Alberton
              Battery Mart as the advertiser.
            </p>
          </section>

          <section className="space-y-3">
            <h2>Contact</h2>
            <p>
              Questions about this disclosure or our services are welcome.{" "}
              <Link href="/contact" className="text-foreground underline underline-offset-2">
                Contact us online
              </Link>
              , call{" "}
              <a href={`tel:${PHONE_TEL}`} className="text-foreground underline underline-offset-2">
                {PHONE_DISPLAY}
              </a>
              , or WhatsApp{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2"
              >
                {WHATSAPP_DISPLAY}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
