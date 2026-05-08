// src/app/page.tsx
import dynamicImport from 'next/dynamic';
import { Metadata } from 'next';
import Link from "next/link";
import { CheckCircle2, Clock3, MapPin, Navigation, Phone, Search, ShieldCheck } from "lucide-react";
import { YMMSearchWidget } from "@/components/content/YMMSearchWidget";
import Image from "next/image";
import { ALL_PRODUCTS, type ProductCardData } from "@/data/products";

// Optimized for static generation
export const dynamic = 'auto';

// Lazy-load all components below the fold
const FaqSection = dynamicImport(() => import('@/components/layout/FaqSection'));

// --- SEO: Homepage Metadata with Open Graph ---
export const metadata: Metadata = {
  title: 'Alberton Battery Mart | Mobile Battery Replacement & Fitment Service',
  description: 'Fast, certified mobile battery replacement service in Alberton, New Redruth, and Meyersdal. We bring the Willard & Exide battery to you. Free fitment, testing, and 24-month warranty. Call 010 109 6211.',
  keywords: [
    'battery replacement Alberton',
    'car battery Alberton',
    'mobile battery service',
    'Willard batteries Alberton',
    'Exide batteries Alberton',
    'battery fitment Alberton',
    'car battery New Redruth',
    'battery testing Alberton',
    'AGM battery Alberton',
    'EFB battery Alberton',
    'mobile callout Alberton',
    'battery specialist Alberton'
  ],
  openGraph: {
    title: 'Alberton Battery Mart | Mobile Battery Replacement & Fitment Service',
    description: 'Fast, certified mobile battery replacement service in Alberton, New Redruth, and Meyersdal. Free fitment, testing, and 24-month warranty.',
    url: 'https://www.albertonbatterymart.co.za',
    siteName: 'Alberton Battery Mart',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alberton Battery Mart - Mobile Battery Replacement Service',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alberton Battery Mart | Mobile Battery Replacement & Fitment Service',
    description: 'Fast, certified mobile battery replacement service in Alberton. Free fitment, testing, and 24-month warranty.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za',
  },
};

export default function Home() {
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
    <main>
      <section className="min-h-[72vh] lg:min-h-[calc(100vh-182px)] bg-[#121212] bg-[radial-gradient(circle_at_50%_0%,rgba(46,125,50,0.08)_0%,transparent_70%)] text-white flex items-center">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
            <h1 className="text-[clamp(2.2rem,4.3vw,3.5rem)] font-extrabold tracking-tight leading-[1.08] mb-4 md:whitespace-nowrap">
              What battery are you looking for?
            </h1>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-[#a0a0a0] max-w-2xl mx-auto leading-relaxed mb-10">
              Enter your vehicle model, battery code (e.g., 652), or brand to instantly check our live Alberton inventory.
            </p>

            <form
              action="/products/results"
              method="get"
              className="w-full max-w-3xl mx-auto bg-white rounded-[50px] p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-300 focus-within:-translate-y-0.5 focus-within:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_0_4px_rgba(46,125,50,0.3)] max-[600px]:rounded-xl max-[600px]:p-2.5 max-[600px]:bg-white/5 max-[600px]:border max-[600px]:border-white/10"
            >
              <div className="flex items-center max-[600px]:flex-col max-[600px]:items-stretch">
                <div className="flex items-center justify-center pl-5 pr-2 text-[#888] max-[600px]:hidden">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="q"
                  placeholder="e.g., 'Ford Ranger battery' or 'Varta 652 AGM'"
                  className="flex-1 h-14 px-3 text-[1.05rem] text-[#333] bg-transparent border-0 outline-none placeholder:text-[#aaa] placeholder:font-normal max-[600px]:bg-white max-[600px]:rounded-md max-[600px]:mb-2.5"
                />
                <button
                  type="submit"
                  className="h-14 px-10 rounded-[40px] bg-[#E53935] hover:bg-[#c62828] text-white font-bold text-lg transition-colors max-[600px]:w-full max-[600px]:rounded-md max-[600px]:h-12"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-10 flex flex-wrap justify-center gap-3 items-center">
              <span className="uppercase tracking-[1px] text-xs font-bold text-[#666] mr-1">Trending:</span>
              {trendingSearches.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[#a0a0a0] text-sm border border-white/10 bg-white/5 px-4 py-2 rounded-[20px] transition-all hover:text-white hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] border-y border-[#e0e0e0] border-b-2">
        <div className="container px-0 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-16 px-8 py-5 max-[900px]:justify-start max-[900px]:gap-10 max-[900px]:overflow-x-auto max-[900px]:whitespace-nowrap max-[900px]:[scrollbar-width:none] max-[900px]:[&::-webkit-scrollbar]:hidden">
            <div className="inline-flex items-center gap-3 text-[#333] font-semibold text-[0.95rem] tracking-[0.3px] whitespace-nowrap">
              <ShieldCheck className="h-6 w-6 text-[#2E7D32] flex-shrink-0" strokeWidth={2.5} />
              Up to 36-Month Warranty
            </div>
            <div className="inline-flex items-center gap-3 text-[#333] font-semibold text-[0.95rem] tracking-[0.3px] whitespace-nowrap">
              <Clock3 className="h-6 w-6 text-[#2E7D32] flex-shrink-0" strokeWidth={2.5} />
              60-Minute Average Response
            </div>
            <div className="inline-flex items-center gap-3 text-[#333] font-semibold text-[0.95rem] tracking-[0.3px] whitespace-nowrap">
              <CheckCircle2 className="h-6 w-6 text-[#2E7D32] flex-shrink-0" strokeWidth={2.5} />
              Free On-Site Midtronics Diagnostics
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[linear-gradient(135deg,#1a1a1a_0%,#0a0a0a_100%)] bg-[radial-gradient(circle_at_15%_50%,rgba(229,57,53,0.15),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(46,125,50,0.15),transparent_25%)]">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-white mb-3">
              Battery Finder: Match the Right Battery Fast
            </h2>
            <p className="text-[#a0a0a0] text-[clamp(1rem,2vw,1.15rem)] max-w-3xl mx-auto">
              Select your vehicle details below to get matched battery results instantly.
            </p>
          </div>
          <YMMSearchWidget variant="compact" />
        </div>
      </section>

      <section className="bg-[#121212] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold tracking-tight mb-3">Seamless Mobile Fitment</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto leading-relaxed">
              Get back on the road safely without the need for a tow truck or expensive dealership fees.
            </p>
          </div>

          <div className="relative flex justify-between max-[800px]:flex-col max-[800px]:gap-12">
            <div className="absolute top-[30px] left-[15%] right-[15%] h-[2px] bg-[#2A2A2A] z-0 max-[800px]:top-0 max-[800px]:bottom-0 max-[800px]:left-1/2 max-[800px]:right-auto max-[800px]:h-full max-[800px]:w-[2px] max-[800px]:-translate-x-1/2" />

            <div className="flex-1 text-center px-4 relative z-10">
              <div className="w-[60px] h-[60px] rounded-full border-2 border-[#E53935] bg-[#121212] text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-6 shadow-[0_0_0_10px_#121212]">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">WhatsApp Location</h3>
              <p className="text-[#A0A0A0] text-[0.95rem] leading-relaxed">
                Send your GPS pin. We dispatch a vetted technician directly to your breakdown site in Alberton.
              </p>
            </div>

            <div className="flex-1 text-center px-4 relative z-10">
              <div className="w-[60px] h-[60px] rounded-full border-2 border-[#E53935] bg-[#121212] text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-6 shadow-[0_0_0_10px_#121212]">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Midtronics Testing</h3>
              <p className="text-[#A0A0A0] text-[0.95rem] leading-relaxed">
                Free diagnostic checks on your alternator and starter to ensure you actually need a new battery.
              </p>
            </div>

            <div className="flex-1 text-center px-4 relative z-10">
              <div className="w-[60px] h-[60px] rounded-full border-2 border-[#E53935] bg-[#121212] text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-6 shadow-[0_0_0_10px_#121212]">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Pay on Success</h3>
              <p className="text-[#A0A0A0] text-[0.95rem] leading-relaxed">
                Secure mobile payments are processed only after the battery is coded and your engine successfully starts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f9f9] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8 border-b-2 border-[#ddd] pb-4 max-[1000px]:flex-col max-[1000px]:items-start max-[1000px]:gap-3">
            <div>
              <h2 className="text-[2rem] text-[#121212] tracking-tight font-extrabold mb-2">
                Trending Fitments in Alberton
              </h2>
              <p className="text-[#777] text-[0.95rem]">
                Prices indicate complete mobile fitment and old battery core exchange.
              </p>
            </div>
            <Link href="/products" className="text-[#E53935] hover:text-[#C62828] text-[0.95rem] font-bold">
              View Full Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {curatedProducts.map((product, index) => {
              const badge =
                index === 0
                  ? { text: "Bestseller", className: "bg-[#E53935] text-white" }
                  : product.isAGM
                  ? { text: "Start/Stop AGM", className: "bg-[#121212] text-white" }
                  : product.category === "Truck & Commercial"
                  ? { text: "Alrode Fleet", className: "bg-[#E53935] text-white" }
                  : null;

              return (
                <article
                  key={product.id}
                  className="bg-white border border-[#E0E0E0] rounded-lg p-6 relative isolate flex flex-col transition-all hover:border-[#121212] hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
                >
                  {badge && (
                    <span className={`absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-[0.5px] ${badge.className}`}>
                      {badge.text}
                    </span>
                  )}

                  <Link
                    href={`/products/id/${product.id}`}
                    className="w-full h-[200px] max-[600px]:h-[250px] bg-[#f9f9f9] border border-dashed border-[#ddd] rounded-md mb-6 relative overflow-hidden z-0 block"
                  >
                    <Image
                      src={product.imagePath || "/images/stock-battery.jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                      className="object-contain p-3"
                    />
                  </Link>

                  <p className="text-[0.75rem] text-[#777] uppercase tracking-[1px] font-semibold mb-1">
                    {product.brandName}
                  </p>
                  <h3 className="text-[1.1rem] font-bold text-[#121212] leading-snug mb-4 flex-grow">
                    <Link href={`/products/id/${product.id}`} className="hover:text-[#C62828] transition-colors">
                      {product.name}
                    </Link>
                  </h3>

                  <div className="mb-6">
                    <span className="text-2xl text-[#E53935] font-extrabold tracking-tight">
                      {product.sellingPrice_OUTPUT}
                    </span>
                    <p className="text-xs text-[#777] font-medium mt-1">
                      Scrap Required
                    </p>
                  </div>

                  <div>
                    <Link
                      href={`/products/id/${product.id}`}
                      className="w-full inline-flex items-center justify-center border-2 border-[#E0E0E0] rounded-md px-3 py-2.5 text-[#121212] text-[0.8rem] font-semibold uppercase tracking-[0.5px] hover:border-[#121212] hover:bg-[#f0f0f0] transition-colors"
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
          <div className="flex border border-[#E0E0E0] rounded-lg overflow-hidden max-[900px]:flex-col">
            <div className="flex-1 bg-white px-16 py-16 flex flex-col justify-center items-start max-[900px]:px-10 max-[900px]:py-10">
              <span className="text-[#E53935] font-extrabold uppercase tracking-[1.5px] text-[0.85rem] mb-4">
                Two-Wheel Power
              </span>
              <h2 className="text-[2.5rem] max-[900px]:text-[2rem] text-[#121212] leading-tight tracking-tight font-extrabold mb-4">
                Enertec Motorcycle Batteries
              </h2>
              <p className="text-[#777] text-[1.1rem] leading-relaxed mb-8 max-w-[500px]">
                Ride with confidence using premium Enertec factory-sealed motorcycle batteries.
                Built for immediate starting power, low maintenance, and reliable performance across urban commuting and weekend touring.
              </p>
              <Link
                href="/products/type/motorcycle"
                className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-[#121212] hover:bg-[#333333] text-white font-bold uppercase text-[0.9rem] tracking-[0.5px] transition-colors"
              >
                Browse Catalog
              </Link>
            </div>

            <div className="flex-1 bg-[#f9f9f9] px-16 py-16 border-l border-[#E0E0E0] flex flex-col justify-center max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:border-[#E0E0E0] max-[900px]:px-10 max-[900px]:py-10">
              <h3 className="m-0 mb-4 text-2xl text-[#121212] font-bold">
                Why choose Enertec AGM bike batteries?
              </h3>
              <ul className="list-none p-0 mt-4 mb-0">
                <li className="py-5 border-b border-[#e0e0e0] flex justify-between items-center text-[1.05rem] max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
                  <span className="font-bold text-[#121212]">Factory Activated</span>
                  <span className="text-[#777] text-right max-w-[60%] max-[500px]:max-w-full max-[500px]:text-left max-[500px]:text-[0.95rem]">
                    Ready to fit instantly with no acid filling needed
                  </span>
                </li>
                <li className="py-5 border-b border-[#e0e0e0] flex justify-between items-center text-[1.05rem] max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
                  <span className="font-bold text-[#121212]">Mounting Angle</span>
                  <span className="text-[#777] text-right max-w-[60%] max-[500px]:max-w-full max-[500px]:text-left max-[500px]:text-[0.95rem]">
                    Spill-proof AGM design supports up to 90° mounting
                  </span>
                </li>
                <li className="py-5 border-b border-[#e0e0e0] flex justify-between items-center text-[1.05rem] max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
                  <span className="font-bold text-[#121212]">Vibration Rating</span>
                  <span className="text-[#777] text-right max-w-[60%] max-[500px]:max-w-full max-[500px]:text-left max-[500px]:text-[0.95rem]">
                    Built for rough-road and off-road riding conditions
                  </span>
                </li>
                <li className="py-5 flex justify-between items-center text-[1.05rem] max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-2">
                  <span className="font-bold text-[#121212]">Self-Discharge</span>
                  <span className="text-[#777] text-right max-w-[60%] max-[500px]:max-w-full max-[500px]:text-left max-[500px]:text-[0.95rem]">
                    Low discharge profile ideal for storage between rides
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#121212] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[2.2rem] font-extrabold tracking-tight text-white mb-3">
              The Standard for Mobile Fitment
            </h2>
            <p className="text-[#A0A0A0] text-[1.1rem] leading-relaxed max-w-3xl mx-auto">
              Real reviews matched directly to our specialized automotive services across Ekurhuleni.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 max-[900px]:grid-cols-1 max-[900px]:gap-6">
            <article className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-[#444]">
              <div className="bg-white/[0.03] border-b border-[#2A2A2A] px-6 py-4 flex items-center justify-between text-[0.95rem] font-bold">
                <span>BMS System Coding</span>
                <span className="text-[#2E7D32] text-[0.85rem] inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={3} />
                  Verified
                </span>
              </div>
              <div className="px-6 py-8 flex-grow flex flex-col justify-between">
                <p className="text-[1.05rem] italic leading-relaxed text-[#d1d1d1] mb-8">
                  "Fitted an AGM battery to my modern SUV and cleared all the dashboard error codes right in my garage.
                  Dealership wanted triple the price and a tow-in for the exact same service."
                </p>
                <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <p className="font-bold text-base mb-1">David C.</p>
                    <p className="text-[0.85rem] uppercase tracking-[0.5px] text-[#A0A0A0]">📍 Meyersdal</p>
                  </div>
                  <p className="text-[#FFB300] text-base tracking-[2px]">★★★★★</p>
                </div>
              </div>
            </article>

            <article className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-[#444]">
              <div className="bg-white/[0.03] border-b border-[#2A2A2A] px-6 py-4 flex items-center justify-between text-[0.95rem] font-bold">
                <span>Midtronics Diagnostics</span>
                <span className="text-[#2E7D32] text-[0.85rem] inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={3} />
                  Verified
                </span>
              </div>
              <div className="px-6 py-8 flex-grow flex flex-col justify-between">
                <p className="text-[1.05rem] italic leading-relaxed text-[#d1d1d1] mb-8">
                  "Car wouldn't start. They came out, tested it, and found it was just a loose terminal.
                  Fixed it for free instead of selling me a battery I didn't need. You don't get honesty like that anymore."
                </p>
                <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <p className="font-bold text-base mb-1">Samantha P.</p>
                    <p className="text-[0.85rem] uppercase tracking-[0.5px] text-[#A0A0A0]">📍 Brackendowns</p>
                  </div>
                  <p className="text-[#FFB300] text-base tracking-[2px]">★★★★★</p>
                </div>
              </div>
            </article>

            <article className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-[#444]">
              <div className="bg-white/[0.03] border-b border-[#2A2A2A] px-6 py-4 flex items-center justify-between text-[0.95rem] font-bold">
                <span>Commercial Fleet Fitment</span>
                <span className="text-[#2E7D32] text-[0.85rem] inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={3} />
                  Verified
                </span>
              </div>
              <div className="px-6 py-8 flex-grow flex flex-col justify-between">
                <p className="text-[1.05rem] italic leading-relaxed text-[#d1d1d1] mb-8">
                  "We run a logistics company with 15 trucks. ABM handles all our heavy-duty battery replacements on-site.
                  The speed of dispatch keeps our trucks moving and minimizes our downtime."
                </p>
                <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <p className="font-bold text-base mb-1">Fleet Ops Mgr</p>
                    <p className="text-[0.85rem] uppercase tracking-[0.5px] text-[#A0A0A0]">📍 Alrode South</p>
                  </div>
                  <p className="text-[#FFB300] text-base tracking-[2px]">★★★★★</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#121212] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] max-[950px]:flex-col">
            <div className="flex-1 px-[4.5rem] py-[4.5rem] flex flex-col justify-center max-[950px]:px-8 max-[950px]:py-12">
              <h2 className="text-[2.4rem] leading-[1.1] tracking-tight font-extrabold mb-4 max-[950px]:text-[2rem]">
                Visit Our Storefront or Talk to an Expert
              </h2>
              <p className="text-[#A0A0A0] text-[1.15rem] leading-relaxed mb-12 max-w-[90%]">
                Need counter service or a large commercial order? Find us in Alberton Central.
                We have the area&apos;s widest selection in stock, ready to go.
              </p>

              <div className="grid gap-8 mb-14">
                <div className="flex items-start gap-5">
                  <div className="text-[#E53935] bg-[rgba(229,57,53,0.1)] p-3 rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="m-0 mb-1.5 text-[1.05rem] text-white tracking-[0.5px] font-bold">
                      Store Location
                    </h4>
                    <p className="m-0 text-[#A0A0A0] text-base leading-relaxed">
                      28 St Columb Rd, New Redruth
                      <br />
                      Alberton, 1450
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="text-[#E53935] bg-[rgba(229,57,53,0.1)] p-3 rounded-lg">
                    <Clock3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="m-0 mb-1.5 text-[1.05rem] text-white tracking-[0.5px] font-bold">
                      Trading Hours
                    </h4>
                    <p className="m-0 text-[#A0A0A0] text-base leading-relaxed">
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
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded font-bold uppercase text-[0.85rem] tracking-[0.5px] bg-[#E53935] text-white transition-all hover:bg-[#C62828] hover:-translate-y-0.5"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </a>
                <a
                  href="tel:0101096211"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded font-bold uppercase text-[0.85rem] tracking-[0.5px] border-2 border-[#2A2A2A] text-white transition-all hover:border-[#A0A0A0] hover:bg-white/5 hover:-translate-y-0.5"
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