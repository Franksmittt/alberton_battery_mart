// src/app/page.tsx
import dynamicImport from 'next/dynamic';
import { Metadata } from 'next';
import Link from "next/link";
import { CheckCircle2, Clock3, MapPin, Navigation, Phone, Search, ShieldCheck } from "lucide-react";
import { YMMSearchWidget } from "@/components/content/YMMSearchWidget";
import Image from "next/image";
import { ALL_PRODUCTS, type ProductCardData } from "@/data/products";
import MobileTrustRotator from "@/components/layout/MobileTrustRotator";
import { buildPageMetadata } from "@/lib/seo/metadata";

// Optimized for static generation
export const dynamic = 'auto';

// Lazy-load all components below the fold
const FaqSection = dynamicImport(() => import('@/components/layout/FaqSection'));

// --- SEO: Homepage Metadata with Open Graph ---
export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Alberton Battery Mart | Mobile Battery Replacement & Fitment Service",
    description:
      "Fast, certified mobile battery replacement service in Alberton, New Redruth, and Meyersdal. We bring the Willard & Exide battery to you. Free fitment, testing, and 24-month warranty. Call 010 109 6211.",
    path: "/",
    keywords: [
      "battery replacement Alberton",
      "car battery Alberton",
      "mobile battery service",
      "Willard batteries Alberton",
      "Exide batteries Alberton",
      "battery fitment Alberton",
      "car battery New Redruth",
      "battery testing Alberton",
      "AGM battery Alberton",
      "EFB battery Alberton",
      "mobile callout Alberton",
      "battery specialist Alberton",
    ],
    imageAlt: "Alberton Battery Mart - Mobile Battery Replacement Service",
  }),
};

export default function Home() {
  const heroCopyVariants = {
    control: {
      heading: "What battery are you looking for?",
      subheading:
        "Enter your vehicle model, battery code (e.g., 652), or brand to instantly check our live Alberton inventory.",
    },
    urgency: {
      heading: "Dead battery? Find your exact replacement fast.",
      subheading:
        "Search by vehicle, battery code, or brand and get matched options in seconds with local stock and rapid fitment support.",
    },
    trust: {
      heading: "Find a battery that fits right the first time.",
      subheading:
        "Use live Alberton inventory with diagnostics-first fitment, warranty-backed installs, and trusted local support.",
    },
  } as const;

  const heroVariantKey =
    (process.env.NEXT_PUBLIC_HOMEPAGE_HERO_VARIANT as keyof typeof heroCopyVariants) ||
    "control";
  const heroCopy = heroCopyVariants[heroVariantKey] || heroCopyVariants.control;

  const trendingSearches = [
    { label: "Willard 652", href: "/products/results?q=Willard+652" },
    { label: "Toyota Hilux GD-6", href: "/products/results?q=Toyota+Hilux+GD-6+battery" },
    { label: "AGM Start/Stop", href: "/products/type/performance" },
    { label: "Commercial Truck Batteries", href: "/products/type/truck-commercial" },
  ];
  const pickPowerPlusAgm = () =>
    ALL_PRODUCTS.find(
      (product) =>
        product.brandName.toLowerCase() === "power plus" && product.isAGM
    ) ||
    ALL_PRODUCTS.find(
      (product) =>
        product.brandName.toLowerCase() === "power plus" &&
        product.category === "Performance AGM/EFB"
    );

  const pickAnyExide = () =>
    ALL_PRODUCTS.find((product) => product.brandName.toLowerCase() === "exide");

  const pickEcoPlusTruck = () =>
    ALL_PRODUCTS.find(
      (product) =>
        product.brandName.toLowerCase() === "eco plus" &&
        product.category === "Truck & Commercial"
    ) ||
    ALL_PRODUCTS.find((product) => product.brandName.toLowerCase() === "eco plus");

  const pickWillard646 = () =>
    ALL_PRODUCTS.find(
      (product) =>
        product.brandName.toLowerCase() === "willard" &&
        product.sku.toLowerCase() === "646"
    ) ||
    ALL_PRODUCTS.find((product) => product.brandName.toLowerCase() === "willard");

  const curatedRaw: Array<ProductCardData | undefined> = [
    pickPowerPlusAgm(),
    pickAnyExide(),
    pickEcoPlusTruck(),
    pickWillard646(),
  ];

  const curatedProducts = curatedRaw
    .filter(Boolean)
    .reduce((acc: ProductCardData[], current) => {
      const product = current as ProductCardData;
      if (!acc.some((item) => item.id === product.id)) {
        acc.push(product);
      }
      return acc;
    }, []);

  if (curatedProducts.length < 4) {
    for (const fallback of ALL_PRODUCTS) {
      if (!curatedProducts.some((item) => item.id === fallback.id)) {
        curatedProducts.push(fallback);
      }
      if (curatedProducts.length === 4) break;
    }
  }

  return (
    <main className="overflow-x-clip">
      <section className="min-h-[72vh] lg:min-h-[calc(100vh-182px)] bg-[var(--brand-bg)] bg-[radial-gradient(circle_at_50%_0%,rgba(37,211,102,0.12)_0%,transparent_70%)] text-white flex items-center">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
            <h1 className="text-[clamp(2.2rem,4.3vw,3.5rem)] font-extrabold tracking-tight leading-[1.08] mb-4 md:whitespace-nowrap">
              {heroCopy.heading}
            </h1>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-[var(--brand-muted)] max-w-2xl mx-auto leading-relaxed mb-10">
              {heroCopy.subheading}
            </p>

            <form
              action="/products/results"
              method="get"
              className="w-full max-w-3xl mx-auto bg-white rounded-[50px] p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-300 focus-within:-translate-y-0.5 focus-within:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_0_4px_rgba(46,125,50,0.3)] max-[600px]:rounded-xl max-[600px]:p-3 max-[600px]:bg-white/5 max-[600px]:border max-[600px]:border-white/10"
            >
              <div className="flex items-center max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-2.5">
                <div className="flex items-center justify-center pl-5 pr-2 text-[var(--brand-muted-2)] max-[600px]:hidden">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="q"
                  placeholder="e.g., 'Ford Ranger battery' or 'Varta 652 AGM'"
                  className="flex-1 h-[4.25rem] px-4 text-[1.05rem] text-[var(--brand-muted-3)] bg-transparent border-0 outline-none placeholder:text-[var(--brand-muted)] placeholder:font-normal max-[600px]:h-[5rem] max-[600px]:px-4 max-[600px]:text-base max-[600px]:bg-white max-[600px]:rounded-md"
                />
                <button
                  type="submit"
                  className="h-12 px-8 rounded-[40px] bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white font-bold text-base transition-colors max-[600px]:w-full max-[600px]:rounded-md max-[600px]:h-12"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-semibold text-white/90">
                4.8/5 local customer rating
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-semibold text-white/90">
                Free diagnostics before replacement
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-semibold text-white/90">
                Warranty registered on every fitment
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3 items-center">
              <span className="uppercase tracking-[1px] text-xs font-bold text-[var(--brand-muted-3)] mr-1">Trending:</span>
              {trendingSearches.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[var(--brand-muted)] text-sm border border-white/10 bg-white/5 px-4 py-2 rounded-[20px] transition-all hover:text-white hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-100 border-y border-zinc-200 border-b-2">
        <div className="container px-0 sm:px-6 lg:px-8">
          <div className="max-[900px]:hidden flex items-center justify-center gap-16 px-8 py-5">
            <div className="inline-flex items-center gap-3 text-[var(--brand-muted-3)] font-semibold text-[0.95rem] tracking-[0.3px] whitespace-nowrap">
              <ShieldCheck className="h-6 w-6 text-[var(--brand-success)] flex-shrink-0" strokeWidth={2.5} />
              Up to 36-Month Warranty
            </div>
            <div className="inline-flex items-center gap-3 text-[var(--brand-muted-3)] font-semibold text-[0.95rem] tracking-[0.3px] whitespace-nowrap">
              <Clock3 className="h-6 w-6 text-[var(--brand-success)] flex-shrink-0" strokeWidth={2.5} />
              60-Minute Average Response
            </div>
            <div className="inline-flex items-center gap-3 text-[var(--brand-muted-3)] font-semibold text-[0.95rem] tracking-[0.3px] whitespace-nowrap">
              <CheckCircle2 className="h-6 w-6 text-[var(--brand-success)] flex-shrink-0" strokeWidth={2.5} />
              Free On-Site Midtronics Diagnostics
            </div>
          </div>
          <MobileTrustRotator />
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-[var(--brand-bg-soft)] via-[var(--brand-bg)] to-black bg-[radial-gradient(circle_at_15%_50%,rgba(229,57,53,0.15),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(37,211,102,0.15),transparent_25%)]">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-white mb-3">
              Battery Finder: Match the Right Battery Fast
            </h2>
            <p className="text-[var(--brand-muted)] text-[clamp(1rem,2vw,1.15rem)] max-w-3xl mx-auto">
              Select your vehicle details below to get matched battery results instantly. Compact car? See our{" "}
              <Link href="/619-car-battery" className="text-battery font-semibold hover:underline">
                619 car battery guide
              </Link>
              .
            </p>
          </div>
          <YMMSearchWidget variant="compact" />
        </div>
      </section>

      <section className="bg-[var(--brand-bg)] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold tracking-tight mb-3">Seamless Mobile Fitment</h2>
            <p className="text-[var(--brand-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
              Get back on the road safely without the need for a tow truck or expensive dealership fees.
            </p>
          </div>

          <div className="relative flex justify-between max-[800px]:flex-col max-[800px]:gap-12">
            <div className="absolute top-[30px] left-[15%] right-[15%] h-[2px] bg-[var(--brand-border)] z-0 max-[800px]:top-0 max-[800px]:bottom-0 max-[800px]:left-1/2 max-[800px]:right-auto max-[800px]:h-full max-[800px]:w-[2px] max-[800px]:-translate-x-1/2" />

            <div className="flex-1 text-center px-4 relative z-10">
              <div className="w-[60px] h-[60px] rounded-full border-2 border-[var(--brand-accent)] bg-[var(--brand-bg)] text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-6 shadow-[0_0_0_10px_var(--brand-bg)]">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">WhatsApp Location</h3>
              <p className="text-[var(--brand-muted)] text-[0.95rem] leading-relaxed">
                Send your GPS pin. We dispatch a vetted technician directly to your breakdown site in Alberton.
              </p>
            </div>

            <div className="flex-1 text-center px-4 relative z-10">
              <div className="w-[60px] h-[60px] rounded-full border-2 border-[var(--brand-accent)] bg-[var(--brand-bg)] text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-6 shadow-[0_0_0_10px_var(--brand-bg)]">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Midtronics Testing</h3>
              <p className="text-[var(--brand-muted)] text-[0.95rem] leading-relaxed">
                Free diagnostic checks on your alternator and starter to ensure you actually need a new battery.
              </p>
            </div>

            <div className="flex-1 text-center px-4 relative z-10">
              <div className="w-[60px] h-[60px] rounded-full border-2 border-[var(--brand-accent)] bg-[var(--brand-bg)] text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-6 shadow-[0_0_0_10px_var(--brand-bg)]">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Pay on Success</h3>
              <p className="text-[var(--brand-muted)] text-[0.95rem] leading-relaxed">
                Secure mobile payments are processed only after the battery is coded and your engine successfully starts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8 border-b-2 border-zinc-300 pb-4 max-[1000px]:flex-col max-[1000px]:items-start max-[1000px]:gap-3">
            <div>
              <h2 className="text-[2rem] text-[var(--brand-bg)] tracking-tight font-extrabold mb-2">
                Trending Fitments in Alberton
              </h2>
              <p className="text-zinc-600 text-[0.95rem]">
                Prices indicate complete mobile fitment and old battery core exchange.
              </p>
            </div>
            <Link href="/products" className="text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] text-[0.95rem] font-bold">
              View Full Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {curatedProducts.map((product, index) => {
              const badge =
                index === 0
                  ? { text: "Bestseller", className: "bg-[var(--brand-accent)] text-white" }
                  : product.isAGM
                  ? { text: "Start/Stop AGM", className: "bg-[var(--brand-bg)] text-white" }
                  : product.category === "Truck & Commercial"
                  ? { text: "Alrode Fleet", className: "bg-[var(--brand-accent)] text-white" }
                  : null;

              return (
                <article
                  key={product.id}
                  className="bg-white border border-zinc-200 rounded-lg p-6 relative isolate flex flex-col transition-all hover:border-[var(--brand-bg)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
                >
                  {badge && (
                    <span className={`absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-[0.5px] ${badge.className}`}>
                      {badge.text}
                    </span>
                  )}

                  <Link
                    href={`/products/id/${product.id}`}
                    className="w-full h-[200px] max-[600px]:h-[250px] bg-zinc-50 border border-dashed border-zinc-300 rounded-md mb-6 relative overflow-hidden z-0 block"
                  >
                    <Image
                      src={product.imagePath || "/images/stock-battery.jpg"}
                      alt={product.name}
                      fill
                      quality={75}
                      sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                      className="object-contain p-3"
                    />
                  </Link>

                  <p className="text-[0.75rem] text-zinc-600 uppercase tracking-[1px] font-semibold mb-1">
                    {product.brandName}
                  </p>
                  <h3 className="text-[1.1rem] font-bold text-[var(--brand-bg)] leading-snug mb-4 flex-grow">
                    <Link href={`/products/id/${product.id}`} className="hover:text-[var(--brand-accent-hover)] transition-colors">
                      {product.name}
                    </Link>
                  </h3>

                  <div className="mb-6">
                    <span className="text-2xl text-[var(--brand-accent)] font-extrabold tracking-tight">
                      {product.sellingPrice_OUTPUT}
                    </span>
                    <p className="text-xs text-zinc-600 font-medium mt-1">
                      Scrap Required
                    </p>
                  </div>

                  <div>
                    <Link
                      href={`/products/id/${product.id}`}
                      className="w-full inline-flex items-center justify-center border-2 border-zinc-200 rounded-md px-3 py-2.5 text-[var(--brand-bg)] text-[0.8rem] font-semibold uppercase tracking-[0.5px] hover:border-[var(--brand-bg)] hover:bg-zinc-100 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex border border-zinc-200 rounded-lg overflow-hidden max-[900px]:flex-col">
            <div className="flex-1 bg-white px-16 py-16 flex flex-col justify-center items-start max-[900px]:px-10 max-[900px]:py-10">
              <span className="text-[var(--brand-accent)] font-extrabold uppercase tracking-[1.5px] text-[0.85rem] mb-4">
                Two-Wheel Power
              </span>
              <h2 className="text-[2.5rem] max-[900px]:text-[2rem] text-[var(--brand-bg)] leading-tight tracking-tight font-extrabold mb-4">
                Enertec Motorcycle Batteries
              </h2>
              <p className="text-zinc-600 text-[1.1rem] leading-relaxed mb-8 max-w-[500px]">
                Ride with confidence using premium Enertec factory-sealed motorcycle batteries.
                Built for immediate starting power, low maintenance, and reliable performance across urban commuting and weekend touring.
              </p>
              <Link
                href="/products/type/motorcycle"
                className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-[var(--brand-bg)] hover:bg-[var(--brand-muted-3)] text-white font-bold uppercase text-[0.9rem] tracking-[0.5px] transition-colors"
              >
                Browse Catalog
              </Link>
            </div>

            <div className="flex-1 bg-zinc-50 px-16 py-16 border-l border-zinc-200 flex flex-col justify-center max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:border-zinc-200 max-[900px]:px-10 max-[900px]:py-10">
              <h3 className="m-0 mb-4 text-2xl text-[var(--brand-bg)] font-bold">
                Why choose Enertec AGM bike batteries?
              </h3>
              <ul className="list-none p-0 mt-4 mb-0">
                <li className="py-5 border-b border-zinc-200 flex justify-between items-center text-[1.05rem] max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
                  <span className="font-bold text-[var(--brand-bg)]">Factory Activated</span>
                  <span className="text-zinc-600 text-right max-w-[60%] max-[500px]:max-w-full max-[500px]:text-left max-[500px]:text-[0.95rem]">
                    Ready to fit instantly with no acid filling needed
                  </span>
                </li>
                <li className="py-5 border-b border-zinc-200 flex justify-between items-center text-[1.05rem] max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
                  <span className="font-bold text-[var(--brand-bg)]">Mounting Angle</span>
                  <span className="text-zinc-600 text-right max-w-[60%] max-[500px]:max-w-full max-[500px]:text-left max-[500px]:text-[0.95rem]">
                    Spill-proof AGM design supports up to 90° mounting
                  </span>
                </li>
                <li className="py-5 border-b border-zinc-200 flex justify-between items-center text-[1.05rem] max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
                  <span className="font-bold text-[var(--brand-bg)]">Vibration Rating</span>
                  <span className="text-zinc-600 text-right max-w-[60%] max-[500px]:max-w-full max-[500px]:text-left max-[500px]:text-[0.95rem]">
                    Built for rough-road and off-road riding conditions
                  </span>
                </li>
                <li className="py-5 flex justify-between items-center text-[1.05rem] max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
                  <span className="font-bold text-[var(--brand-bg)]">Self-Discharge</span>
                  <span className="text-zinc-600 text-right max-w-[60%] max-[500px]:max-w-full max-[500px]:text-left max-[500px]:text-[0.95rem]">
                    Low discharge profile ideal for storage between rides
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-bg)] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[2.2rem] font-extrabold tracking-tight text-white mb-3">
              The Standard for Mobile Fitment
            </h2>
            <p className="text-[var(--brand-muted)] text-[1.1rem] leading-relaxed max-w-3xl mx-auto">
              Real reviews matched directly to our specialized automotive services across Ekurhuleni.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 max-[900px]:grid-cols-1 max-[900px]:gap-6">
            <article className="bg-[var(--brand-bg-elevated)] border border-[var(--brand-border)] rounded-lg overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-[var(--brand-muted-3)]">
              <div className="bg-white/[0.03] border-b border-[var(--brand-border)] px-6 py-4 flex items-center justify-between text-[0.95rem] font-bold">
                <span>BMS System Coding</span>
                <span className="text-[var(--brand-success)] text-[0.85rem] inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={3} />
                  Verified
                </span>
              </div>
              <div className="px-6 py-8 flex-grow flex flex-col justify-between">
                <p className="text-[1.05rem] italic leading-relaxed text-zinc-300 mb-8">
                  "Fitted an AGM battery to my modern SUV and cleared all the dashboard error codes right in my garage.
                  Dealership wanted triple the price and a tow-in for the exact same service."
                </p>
                <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <p className="font-bold text-base mb-1">David C.</p>
                    <p className="text-[0.85rem] uppercase tracking-[0.5px] text-[var(--brand-muted)]">📍 Meyersdal</p>
                  </div>
                  <p className="text-amber-400 text-base tracking-[2px]">★★★★★</p>
                </div>
              </div>
            </article>

            <article className="bg-[var(--brand-bg-elevated)] border border-[var(--brand-border)] rounded-lg overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-[var(--brand-muted-3)]">
              <div className="bg-white/[0.03] border-b border-[var(--brand-border)] px-6 py-4 flex items-center justify-between text-[0.95rem] font-bold">
                <span>Midtronics Diagnostics</span>
                <span className="text-[var(--brand-success)] text-[0.85rem] inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={3} />
                  Verified
                </span>
              </div>
              <div className="px-6 py-8 flex-grow flex flex-col justify-between">
                <p className="text-[1.05rem] italic leading-relaxed text-zinc-300 mb-8">
                  "Car wouldn't start. They came out, tested it, and found it was just a loose terminal.
                  Fixed it for free instead of selling me a battery I didn't need. You don't get honesty like that anymore."
                </p>
                <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <p className="font-bold text-base mb-1">Samantha P.</p>
                    <p className="text-[0.85rem] uppercase tracking-[0.5px] text-[var(--brand-muted)]">📍 Brackendowns</p>
                  </div>
                  <p className="text-amber-400 text-base tracking-[2px]">★★★★★</p>
                </div>
              </div>
            </article>

            <article className="bg-[var(--brand-bg-elevated)] border border-[var(--brand-border)] rounded-lg overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-[var(--brand-muted-3)]">
              <div className="bg-white/[0.03] border-b border-[var(--brand-border)] px-6 py-4 flex items-center justify-between text-[0.95rem] font-bold">
                <span>Commercial Fleet Fitment</span>
                <span className="text-[var(--brand-success)] text-[0.85rem] inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={3} />
                  Verified
                </span>
              </div>
              <div className="px-6 py-8 flex-grow flex flex-col justify-between">
                <p className="text-[1.05rem] italic leading-relaxed text-zinc-300 mb-8">
                  "We run a logistics company with 15 trucks. ABM handles all our heavy-duty battery replacements on-site.
                  The speed of dispatch keeps our trucks moving and minimizes our downtime."
                </p>
                <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <p className="font-bold text-base mb-1">Fleet Ops Mgr</p>
                    <p className="text-[0.85rem] uppercase tracking-[0.5px] text-[var(--brand-muted)]">📍 Alrode South</p>
                  </div>
                  <p className="text-amber-400 text-base tracking-[2px]">★★★★★</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-bg)] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex bg-[var(--brand-bg-elevated)] border border-[var(--brand-border)] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] max-[950px]:flex-col">
            <div className="flex-1 px-[4.5rem] py-[4.5rem] flex flex-col justify-center max-[950px]:px-8 max-[950px]:py-12">
              <h2 className="text-[2.4rem] leading-[1.1] tracking-tight font-extrabold mb-4 max-[950px]:text-[2rem]">
                Visit Our Storefront or Talk to an Expert
              </h2>
              <p className="text-[var(--brand-muted)] text-[1.15rem] leading-relaxed mb-12 max-w-[90%]">
                Need counter service or a large commercial order? Find us in Alberton Central.
                We have the area&apos;s widest selection in stock, ready to go.
              </p>

              <div className="grid gap-8 mb-14">
                <div className="flex items-start gap-5">
                  <div className="text-[var(--brand-accent)] bg-[var(--brand-accent)]/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="m-0 mb-1.5 text-[1.05rem] text-white tracking-[0.5px] font-bold">
                      Store Location
                    </h4>
                    <p className="m-0 text-[var(--brand-muted)] text-base leading-relaxed">
                      28 St Columb Rd, New Redruth
                      <br />
                      Alberton, 1450
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="text-[var(--brand-accent)] bg-[var(--brand-accent)]/10 p-3 rounded-lg">
                    <Clock3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="m-0 mb-1.5 text-[1.05rem] text-white tracking-[0.5px] font-bold">
                      Trading Hours
                    </h4>
                    <p className="m-0 text-[var(--brand-muted)] text-base leading-relaxed">
                      Mon - Fri: 08:00 AM - 5:00 PM
                      <br />
                      Sat: 08:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=28+St+Columb+Rd,+New+Redruth,+Alberton,+1450"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded font-bold uppercase text-[0.85rem] tracking-[0.5px] bg-[var(--brand-accent)] text-white transition-all hover:bg-[var(--brand-accent-hover)] hover:-translate-y-0.5"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </a>
                <a
                  href="tel:0101096211"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded font-bold uppercase text-[0.85rem] tracking-[0.5px] border-2 border-[var(--brand-border)] text-white transition-all hover:border-[var(--brand-muted)] hover:bg-white/5 hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4" />
                  Call: 010 109 6211
                </a>
              </div>
            </div>

            <div className="flex-1 min-h-[500px] max-[950px]:min-h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.683815614464!2d28.12046317541756!3d-26.27192337703497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e951bf317cfb98d%3A0x33408b268a9458a6!2sAlberton%20Battery%20Mart!5e0!3m2!1sen!2sza!4v1778246480882!5m2!1sen!2sza"
                className="h-full w-full min-h-[500px] max-[950px]:min-h-[350px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Alberton Battery Mart map"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* 2. EXPERTISE & FAQ: Overcomes customer objections and builds expert status. */}
      <FaqSection />
    </main>
  );
}