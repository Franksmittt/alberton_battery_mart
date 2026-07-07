import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/data/products";
import { HOMEPAGE_CURATED_PRODUCT_IDS } from "@/data/homepage-curated-products";

export async function HomeProductGrid() {
  const allProducts = await getAllProducts();
  const products = HOMEPAGE_CURATED_PRODUCT_IDS.map((id) =>
    allProducts.find((product) => product.id === id)
  ).filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <section className="bg-zinc-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b-2 border-zinc-300 pb-4 max-[1000px]:flex-col max-[1000px]:items-start max-[1000px]:gap-3">
          <div>
            <h2 className="text-[2rem] text-[var(--brand-bg)] tracking-tight font-extrabold mb-2">
              Trending Fitments in Alberton
            </h2>
            <p className="text-zinc-600 text-[0.95rem]">
              Prices indicate complete in-store fitment and old battery core exchange.
            </p>
          </div>
          <Link
            href="/products"
            className="text-[var(--brand-accent-solid)] hover:text-[var(--brand-accent-hover)] text-[0.95rem] font-bold underline underline-offset-2"
          >
            View Full Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {products.map((product, index) => {
            const badge =
              index === 0
                ? { text: "Bestseller", className: "bg-[var(--brand-accent-solid)] text-white" }
                : product.isAGM
                  ? { text: "Start/Stop AGM", className: "bg-[var(--brand-bg)] text-white" }
                  : product.category === "Truck & Commercial"
                    ? { text: "Alrode Fleet", className: "bg-[var(--brand-accent-solid)] text-white" }
                    : null;

            return (
              <article
                key={product.id}
                className="bg-white border border-zinc-200 rounded-lg p-6 relative isolate flex flex-col transition-all hover:border-[var(--brand-bg)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
              >
                {badge ? (
                  <span
                    className={`absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-[0.5px] ${badge.className}`}
                  >
                    {badge.text}
                  </span>
                ) : null}

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
                    loading="lazy"
                  />
                </Link>

                <p className="text-[0.75rem] text-zinc-600 uppercase tracking-[1px] font-semibold mb-1">
                  {product.brandName}
                </p>
                <h3 className="text-[1.1rem] font-bold text-[var(--brand-bg)] leading-snug mb-4 flex-grow">
                  <Link
                    href={`/products/id/${product.id}`}
                    className="hover:text-[var(--brand-accent-hover)] transition-colors underline-offset-2 hover:underline"
                  >
                    {product.name}
                  </Link>
                </h3>

                <div className="mb-6">
                  <span className="text-2xl text-[var(--brand-accent)] font-extrabold tracking-tight">
                    {product.sellingPrice_OUTPUT}
                  </span>
                  <p className="text-xs text-zinc-600 font-medium mt-1">Scrap Required</p>
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
  );
}
