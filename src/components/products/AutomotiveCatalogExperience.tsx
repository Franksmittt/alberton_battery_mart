"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCardData } from "@/data/products";

type AutomotiveCatalogExperienceProps = {
  products: ProductCardData[];
};

type SortOption = "best" | "price-low" | "price-high" | "agm-first" | "name";
type TechFilter = "all" | "standard" | "performance";
type CapacityBucket = "all" | "under-50" | "50-75" | "75-100" | "100-plus";

const INITIAL_VISIBLE = 6;
const LOAD_STEP = 6;

function parsePrice(value: string): number {
  const normalized = value.replace(/[^0-9.]/g, "");
  const amount = Number.parseFloat(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

function capacityBucketFor(ah: number): CapacityBucket {
  if (ah < 50) return "under-50";
  if (ah < 75) return "50-75";
  if (ah < 100) return "75-100";
  return "100-plus";
}

export default function AutomotiveCatalogExperience({
  products,
}: AutomotiveCatalogExperienceProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [techFilter, setTechFilter] = useState<TechFilter>("all");
  const [capacityFilter, setCapacityFilter] = useState<CapacityBucket>("all");
  const [sortBy, setSortBy] = useState<SortOption>("best");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const brandCounts = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((item) => {
      counts.set(item.brandName, (counts.get(item.brandName) || 0) + 1);
    });
    return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((item) => {
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(item.brandName);
      const matchesTech =
        techFilter === "all" ||
        (techFilter === "performance"
          ? item.category === "Performance AGM/EFB"
          : item.category !== "Performance AGM/EFB");
      const matchesCapacity =
        capacityFilter === "all" ||
        capacityBucketFor(item.ahCapacity) === capacityFilter;

      return matchesBrand && matchesTech && matchesCapacity;
    });

    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low":
        sorted.sort(
          (a, b) => parsePrice(a.sellingPrice_OUTPUT) - parsePrice(b.sellingPrice_OUTPUT)
        );
        break;
      case "price-high":
        sorted.sort(
          (a, b) => parsePrice(b.sellingPrice_OUTPUT) - parsePrice(a.sellingPrice_OUTPUT)
        );
        break;
      case "agm-first":
        sorted.sort((a, b) => Number(b.isAGM) - Number(a.isAGM));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "best":
      default:
        break;
    }

    return sorted;
  }, [products, selectedBrands, techFilter, capacityFilter, sortBy]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const canLoadMore = visibleCount < filteredProducts.length;
  const selectedChips = [
    ...selectedBrands.map((brand) => ({ type: "brand" as const, label: brand })),
    ...(techFilter !== "all"
      ? [{ type: "tech" as const, label: techFilter === "performance" ? "AGM/EFB" : "Standard" }]
      : []),
    ...(capacityFilter !== "all" ? [{ type: "capacity" as const, label: capacityFilter }] : []),
  ];

  function toggleBrand(brand: string) {
    setVisibleCount(INITIAL_VISIBLE);
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand]
    );
  }

  function clearAll() {
    setSelectedBrands([]);
    setTechFilter("all");
    setCapacityFilter("all");
    setSortBy("best");
    setVisibleCount(INITIAL_VISIBLE);
  }

  return (
    <section
      id="automotive-grid"
      className="max-w-[1400px] mx-auto border-2 border-[var(--brand-border)] bg-[var(--brand-bg)] grid lg:grid-cols-[300px_1fr] gap-0"
    >
      <aside className="border-r-0 lg:border-r-2 border-[var(--brand-border)] border-b-2 lg:border-b-0 bg-[var(--brand-bg)] p-6 lg:p-8 lg:sticky lg:top-24 self-start space-y-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.8px] font-semibold text-[var(--brand-muted)]">
            Refine results
          </p>
          <h3 className="text-2xl font-black text-white">Automotive Batteries</h3>
          <p className="text-sm text-[var(--brand-muted-2)]">
            Filter by brand, technology, and capacity to find exact-fit options faster.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-[0.7px] text-white">Brand</h4>
          <div className="flex flex-wrap gap-2">
            {brandCounts.map(([brand, count]) => {
              const active = selectedBrands.includes(brand);
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => toggleBrand(brand)}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "border-white bg-white text-[var(--brand-bg-soft)]"
                      : "border-[var(--brand-border)] text-[var(--brand-muted)] hover:border-[var(--brand-muted-3)] hover:text-white"
                  }`}
                >
                  <span>{brand}</span>
                  <span className={active ? "text-[var(--brand-bg-soft)]/70" : "text-[var(--brand-muted-3)]"}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-[0.7px] text-white">Technology</h4>
          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All"],
              ["standard", "Standard"],
              ["performance", "AGM / EFB"],
            ].map(([value, label]) => {
              const active = techFilter === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setVisibleCount(INITIAL_VISIBLE);
                    setTechFilter(value as TechFilter);
                  }}
                  className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "border-white bg-white text-[var(--brand-bg-soft)]"
                      : "border-[var(--brand-border)] text-[var(--brand-muted)] hover:border-[var(--brand-muted-3)] hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-[0.7px] text-white">Capacity</h4>
          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All Ah"],
              ["under-50", "Under 50 Ah"],
              ["50-75", "50-75 Ah"],
              ["75-100", "75-100 Ah"],
              ["100-plus", "100+ Ah"],
            ].map(([value, label]) => {
              const active = capacityFilter === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setVisibleCount(INITIAL_VISIBLE);
                    setCapacityFilter(value as CapacityBucket);
                  }}
                  className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "border-white bg-white text-[var(--brand-bg-soft)]"
                      : "border-[var(--brand-border)] text-[var(--brand-muted)] hover:border-[var(--brand-muted-3)] hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-1">
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)]"
          >
            Clear all filters
          </button>
        </div>
      </aside>

      <main className="flex flex-col bg-[var(--brand-bg)]">
        <div className="border-b-2 border-[var(--brand-border)] px-6 md:px-8 py-6 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <h2 className="text-3xl font-black text-white">All Automotive Batteries</h2>
              <p className="text-[var(--brand-muted-2)] mt-2">
                Showing {Math.min(visibleCount, filteredProducts.length)} of{" "}
                {filteredProducts.length} matched products.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="catalog-sort" className="text-sm text-[var(--brand-muted)]">
                Sort:
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="h-10 rounded-md border border-[var(--brand-border)] bg-[var(--brand-bg-elevated)] px-3 text-sm text-white outline-none"
              >
                <option value="best">Best match</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="agm-first">AGM/EFB first</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {selectedChips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedChips.map((chip) => (
                <span
                  key={`${chip.type}-${chip.label}`}
                  className="inline-flex rounded-full border border-[var(--brand-border)] bg-[var(--brand-bg-elevated)] px-3 py-1 text-xs font-semibold text-[var(--brand-muted)]"
                >
                  {chip.label}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full border border-[var(--brand-border)] bg-[var(--brand-bg-elevated)] px-3 py-1 text-[var(--brand-muted)]">
              Free alternator + starter diagnostics before replacement
            </span>
            <span className="rounded-full border border-[var(--brand-border)] bg-[var(--brand-bg-elevated)] px-3 py-1 text-[var(--brand-muted)]">
              Fitment verified by vehicle model and charging profile
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg-elevated)] p-5 flex flex-col transition-all hover:-translate-y-0.5 hover:border-[var(--brand-muted-3)]"
              >
                <Link
                  href={`/products/id/${product.id}`}
                  className="relative w-full h-[170px] rounded-lg border border-dashed border-[var(--brand-border)] bg-[var(--brand-bg-soft)] overflow-hidden"
                >
                  <Image
                    src={product.imagePath || "/images/stock-battery.jpg"}
                    alt={product.name}
                    fill
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-contain p-3"
                  />
                </Link>

                <div className="mt-4 space-y-2 flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.8px] font-semibold text-[var(--brand-muted)]">
                      {product.brandName}
                    </p>
                    {product.category === "Performance AGM/EFB" && (
                      <span className="rounded-full border border-[var(--brand-accent)]/40 bg-[var(--brand-accent)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.7px] text-[var(--brand-accent)]">
                        Start/Stop Ready
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-black tracking-[-0.2px] text-white">{product.name}</h3>
                  <p className="text-[var(--brand-muted-2)] text-sm leading-relaxed">
                    {product.ahCapacity}Ah battery option with warranty-backed installation and
                    diagnostics-first fitment.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[var(--brand-border)] flex flex-nowrap items-center justify-between gap-2">
                  <p className="text-xl md:text-2xl font-black text-white whitespace-nowrap">
                    {product.sellingPrice_OUTPUT}
                  </p>
                  <Link
                    href={`/products/id/${product.id}`}
                    className="inline-flex shrink-0 whitespace-nowrap items-center justify-center border-2 border-[var(--brand-accent)] px-3 md:px-4 py-2 text-[11px] md:text-xs font-extrabold uppercase tracking-[0.5px] text-[var(--brand-accent)] transition-colors hover:bg-[var(--brand-accent)] hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg-elevated)] p-8 text-center mt-6">
              <h3 className="text-xl font-bold text-white">No batteries match this filter set.</h3>
              <p className="text-[var(--brand-muted-2)] mt-2">
                Clear filters to view the full automotive catalog.
              </p>
            </div>
          )}

          {canLoadMore && (
            <div className="mt-7 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filteredProducts.length))
                }
                className="inline-flex items-center justify-center rounded-lg border-2 border-[var(--brand-accent)] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.5px] text-[var(--brand-accent)] transition-colors hover:bg-[var(--brand-accent)] hover:text-white"
              >
                Show 6 more matched options
              </button>
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
