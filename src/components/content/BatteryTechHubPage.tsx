import Link from "next/link";
import { notFound } from "next/navigation";
import { Battery, BrainCircuit, ShieldCheck, Zap } from "lucide-react";
import { AdLandingHero } from "@/components/layout/AdLandingHero";
import { HubSection } from "@/components/seo/HubSection";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import IntentLinks from "@/components/seo/IntentLinks";
import {
  BatterySizeProductCards,
} from "@/components/content/BatterySizeSections";
import { getAllProducts } from "@/data/products";
import { getClusterConfig } from "@/lib/battery-sizes/clusters";
import {
  CLUSTER_SUBURB_SLUGS,
  POPULAR_SIZE_CODES,
  START_STOP_SIZE_CODES,
  sizeHubPath,
} from "@/lib/battery-sizes/types";
import {
  getTechHub,
  localPathFromClusterSlug,
  productsForTechHub,
  type BatteryTechKind,
} from "@/lib/battery-sizes/tech-hubs";
import { getClusterSuburbs } from "@/lib/battery-sizes/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  BASE_URL,
  BUSINESS_ADDRESS,
  BUSINESS_CONTACT,
  LOCAL_BUSINESS_ID,
  STORE_COORDINATES,
  STRUCTURED_AREA_SERVED,
} from "@/lib/seo-constants";

const SUBURB_PREVIEW_SLUGS = [
  "alberton-north",
  "meyersdal",
  "brackenhurst",
  "brackendowns",
  "randhart",
  "alberante",
  "albertsdal",
  "new-redruth",
] as const;

function techFaqs(kind: BatteryTechKind) {
  if (kind === "agm") {
    return [
      {
        question: "What is an AGM battery?",
        answer:
          "AGM (Absorbent Glass Mat) is a sealed lead-acid battery built for high cycling and start-stop systems. It is the usual spec on BMW, Mercedes-Benz, Audi, and many premium SUVs.",
      },
      {
        question: "Do BMW and Mercedes need AGM batteries in Alberton?",
        answer:
          "Most modern BMW and Mercedes models with start-stop need AGM, not a standard flooded battery. We confirm the size (often 652, 658, 668, or 660) and register the new battery with the BMS.",
      },
      {
        question: "Do you do BMS coding with AGM replacements?",
        answer:
          "Yes. Alberton Battery Mart codes BMW, Mercedes, Audi, and similar systems when the vehicle requires it, so start-stop and charging work after fitment.",
      },
      {
        question: "Which AGM sizes do you stock?",
        answer:
          "We keep 646, 652, 658, and 668 AGM batteries in stock at 28 St Columb Rd, New Redruth, with mobile fitment across Alberton North, Meyersdal, Brackenhurst, and nearby suburbs.",
      },
    ];
  }

  if (kind === "efb") {
    return [
      {
        question: "What is an EFB battery?",
        answer:
          "EFB (Enhanced Flooded Battery) is designed for entry-level start-stop. It cycles harder than a standard battery and is common on VW Polo, Ford EcoSport/Ranger, Hyundai Tucson, and Suzuki models.",
      },
      {
        question: "Can I replace an EFB with a cheaper flooded battery?",
        answer:
          "We do not recommend it. A standard flooded battery usually fails early and start-stop stops working. Fit EFB, or upgrade to AGM if the vehicle allows it.",
      },
      {
        question: "Which EFB sizes are most popular in Alberton?",
        answer:
          "646, 652, 658, and 668 EFB cover most Alberton hatchbacks, bakkies, and SUVs. Compact start-stop cars sometimes use 612 or 619 EFB — we confirm from the tray and VIN.",
      },
      {
        question: "Do you fit EFB batteries in Meyersdal and Brackenhurst?",
        answer:
          "Yes. Drive in to New Redruth or request mobile fitment to Meyersdal, Brackenhurst, Brackendowns, Randhart, Alberton North, and Albertsdal.",
      },
    ];
  }

  return [
    {
      question: "What battery does a start-stop car need?",
      answer:
        "Start-stop (also written stop-start) cars need AGM or EFB. A standard flooded battery is the wrong spec and typically causes dashboard warnings and early failure.",
    },
    {
      question: "AGM vs EFB — which start-stop battery do I need?",
      answer:
        "AGM is usual on BMW, Mercedes, Audi, and higher-spec SUVs. EFB is usual on Polo, Ranger, Tucson, and many mass-market start-stop cars. We confirm before fitment.",
    },
    {
      question: "Why did start-stop stop working after a battery change?",
      answer:
        "Usually the replacement was the wrong technology, or BMW/Mercedes BMS was not coded. We stock AGM/EFB and handle registration so start-stop returns.",
    },
    {
      question: "Where can I get a start-stop battery in Alberton?",
      answer:
        "Alberton Battery Mart at 28 St Columb Rd, New Redruth stocks AGM and EFB with same-day fitment. Mobile call-outs cover Alberton North, Meyersdal, Brackenhurst, and surrounding suburbs.",
    },
  ];
}

export function techHubMetadata(kind: BatteryTechKind) {
  const hub = getTechHub(kind);
  return buildPageMetadata({
    title: hub.title,
    description: hub.description,
    path: hub.path,
    keywords: hub.keywords,
    imageAlt: `${hub.h1} - Alberton Battery Mart`,
    markdownPath: `${hub.path}.md`,
  });
}

export async function renderTechHub(kind: BatteryTechKind) {
  const hub = getTechHub(kind);
  if (!hub) notFound();

  const allProducts = await getAllProducts();
  const products = productsForTechHub(allProducts, kind).slice(0, 8);
  const faqs = techFaqs(kind);
  const dummyCluster = getClusterConfig("652");
  if (!dummyCluster) notFound();

  const suburbPreview = getClusterSuburbs(dummyCluster).filter((suburb) =>
    (SUBURB_PREVIEW_SLUGS as readonly string[]).includes(suburb.slug)
  );

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoPartsStore"],
    "@id": LOCAL_BUSINESS_ID,
    name: "Alberton Battery Mart",
    description: hub.description,
    address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
    telephone: BUSINESS_CONTACT.telephone,
    url: `${BASE_URL}${hub.path}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE_COORDINATES.latitude,
      longitude: STORE_COORDINATES.longitude,
    },
    areaServed: STRUCTURED_AREA_SERVED,
    serviceType:
      kind === "agm"
        ? "AGM battery supply, fitment, and BMS coding"
        : kind === "efb"
          ? "EFB start-stop battery supply and fitment"
          : "Start-stop AGM and EFB battery replacement",
  };

  const points =
    kind === "agm"
      ? [
          {
            icon: BrainCircuit,
            title: "BMS coding included",
            text: "BMW, Mercedes, and Audi systems are registered after fitment so start-stop and charging stay healthy.",
          },
          {
            icon: Battery,
            title: "646 / 652 / 658 / 668 AGM in stock",
            text: "The sizes Alberton premium cars actually use, with Exide and Power Plus AGM on the shelf.",
          },
          {
            icon: ShieldCheck,
            title: "Not a flooded substitute",
            text: "We will not fit a cheap SMF into an AGM tray. Wrong spec is the main reason start-stop dies.",
          },
        ]
      : kind === "efb"
        ? [
            {
              icon: Zap,
              title: "Built for start-stop cycling",
              text: "EFB handles idle-stop better than a standard flooded battery on Polo, Ranger, Tucson, and similar cars.",
            },
            {
              icon: Battery,
              title: "Popular EFB sizes on the shelf",
              text: "646, 652, 658, and 668 EFB plus compact 612 EFB for smaller start-stop hatches.",
            },
            {
              icon: ShieldCheck,
              title: "Test before you buy",
              text: "Free Midtronics test at 28 St Columb Rd so we only replace the battery when it is actually finished.",
            },
          ]
        : [
            {
              icon: Zap,
              title: "AGM or EFB — confirmed on the car",
              text: "We read the tray, VIN, and start-stop spec instead of guessing from the old battery brand.",
            },
            {
              icon: BrainCircuit,
              title: "Coding for German cars",
              text: "BMW and Mercedes usually need IBS/BMS registration. That is part of the job, not an extra shop to visit.",
            },
            {
              icon: ShieldCheck,
              title: "Same-day Alberton fitment",
              text: "Drive in to New Redruth or request mobile fitment across Alberton North, Meyersdal, and Brackenhurst.",
            },
          ];

  return (
    <div className="space-y-4 pb-16">
      <PageJsonLd
        title={hub.title}
        description={hub.description}
        path={hub.path}
      />
      <JsonLd data={localBusinessSchema} id={`${kind}-hub-localbusiness`} />
      <FaqSchema id={`${kind}-hub-faq`} items={faqs} />
      <BreadcrumbSchema
        id={`${kind}-hub-breadcrumb`}
        items={[
          { name: "Home", item: "/" },
          { name: hub.h1, item: hub.path },
        ]}
      />

      <HubSection>
        <AdLandingHero
          title={hub.h1}
          subtitle={hub.intro}
          trackingPrefix={hub.trackingPrefix}
        />
      </HubSection>

      <HubSection>
        <section className="container py-10 grid md:grid-cols-3 gap-4">
          {points.map((point) => (
            <div
              key={point.title}
              className="rounded-xl border border-border bg-card/50 p-5 space-y-3"
            >
              <point.icon className="h-6 w-6 text-battery" />
              <h2 className="text-xl font-bold text-foreground">{point.title}</h2>
              <p className="text-sm text-muted-foreground">{point.text}</p>
            </div>
          ))}
        </section>
      </HubSection>

      <HubSection>
        <section className="container py-6 space-y-5">
          <h2 className="text-3xl font-bold text-foreground">
            Popular start-stop sizes
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            Most Alberton start-stop cars use these case sizes. Open a hub for
            flooded, EFB, and AGM options in that tray.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {START_STOP_SIZE_CODES.map((code) => (
              <Link
                key={code}
                href={sizeHubPath(code)}
                className="rounded-lg border border-border bg-card px-4 py-5 text-center hover:border-battery"
              >
                <p className="text-2xl font-black text-battery">{code}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {kind === "efb" ? "EFB & SMF hub" : "AGM / EFB hub"}
                </p>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {POPULAR_SIZE_CODES.filter(
              (code) =>
                !(START_STOP_SIZE_CODES as readonly string[]).includes(code)
            ).map((code) => (
              <Link
                key={code}
                href={sizeHubPath(code)}
                className="text-battery font-semibold underline underline-offset-2"
              >
                {code} car battery
              </Link>
            ))}
          </div>
        </section>
      </HubSection>

      {products.length > 0 ? (
        <HubSection>
          <BatterySizeProductCards
            cluster={dummyCluster}
            products={products}
            heading={
              kind === "agm"
                ? "AGM Batteries In Stock"
                : kind === "efb"
                  ? "EFB Batteries In Stock"
                  : "Start-Stop Batteries In Stock"
            }
          />
        </HubSection>
      ) : null}

      <HubSection>
        <section className="container py-10 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Fitted in Alberton residential suburbs
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            We cover established Alberton suburbs — not a generic “greater
            Ekurhuleni” page. Drive in from these areas or request mobile
            fitment.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suburbPreview.map((suburb) => (
              <Link
                key={suburb.slug}
                href={localPathFromClusterSlug(suburb.slug)}
                className="rounded-xl border border-border bg-card/50 p-4 hover:border-battery"
              >
                <p className="font-bold text-foreground">{suburb.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {kind === "agm" ? "AGM" : kind === "efb" ? "EFB" : "Start-stop"}{" "}
                  batteries · {suburb.responseWindow}
                </p>
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Also covering{" "}
            {CLUSTER_SUBURB_SLUGS.filter(
              (slug) =>
                !(SUBURB_PREVIEW_SLUGS as readonly string[]).includes(slug) &&
                slug !== "new-market"
            )
              .map((slug) =>
                slug
                  .split("-")
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join(" ")
              )
              .join(", ")}
            .
          </p>
        </section>
      </HubSection>

      <HubSection>
        <section className="container py-6">
          <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              {hub.h1.replace(" in Alberton", "")} FAQs
            </h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-bold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </HubSection>

      <div className="container">
        <IntentLinks
          title="BMW, Mercedes, and related start-stop pages"
          description="German cars are the most common AGM jobs in Alberton, but any start-stop vehicle is covered."
          columnsClassName="md:grid-cols-3"
          links={[
            { href: "/vehicles/bmw", label: "BMW battery replacement Alberton" },
            {
              href: "/vehicles/mercedes",
              label: "Mercedes battery replacement Alberton",
            },
            { href: "/vehicles/audi", label: "Audi battery replacement Alberton" },
            { href: "/agm-battery", label: "AGM battery hub" },
            { href: "/efb-battery", label: "EFB battery hub" },
            { href: "/start-stop-battery", label: "Start-stop battery hub" },
            { href: "/products/type/performance", label: "Shop all AGM / EFB stock" },
            {
              href: "/services/battery-fitment/meyersdal",
              label: "Premium AGM fitment Meyersdal",
            },
            { href: "/local", label: "All Alberton suburb pages" },
          ].filter((link) => link.href !== hub.path)}
        />
      </div>

      <RelatedContent
        links={[
          {
            href: "/contact",
            label: "Contact & store hours",
            description: "Visit 28 St Columb Rd, New Redruth.",
          },
          {
            href: "/testing",
            label: "Free battery testing",
            description: "Confirm AGM/EFB health before you buy.",
          },
          {
            href: "/652-car-battery",
            label: "652 car battery hub",
            description: "Popular SUV / bakkie size with AGM options.",
          },
          {
            href: "/658-car-battery",
            label: "658 car battery hub",
            description: "Heavy-duty size common on BMW and Fortuner.",
          },
        ]}
      />
    </div>
  );
}
