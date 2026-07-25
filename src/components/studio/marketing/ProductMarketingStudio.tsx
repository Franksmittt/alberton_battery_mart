"use client";

import { useMemo, useRef, useState } from "react";
import { domToPng } from "modern-screenshot";
import { Download, Search } from "lucide-react";
import { ALL_PRODUCTS, type ProductCardData } from "@/data/products";
import {
  STORY_HEIGHT,
  STORY_TEMPLATES,
  STORY_WIDTH,
  type StoryTemplateId,
  buildStoryView,
} from "@/components/studio/marketing/storyData";
import StoryClean from "@/components/studio/marketing/templates/StoryClean";
import StoryBrand from "@/components/studio/marketing/templates/StoryBrand";
import StoryCinema from "@/components/studio/marketing/templates/StoryCinema";
import StorySpecs from "@/components/studio/marketing/templates/StorySpecs";
import StoryCallout from "@/components/studio/marketing/templates/StoryCallout";

const PREVIEW_SCALE = 0.38;

function renderTemplate(templateId: StoryTemplateId, product: ProductCardData) {
  const view = buildStoryView(product);
  switch (templateId) {
    case "clean":
      return <StoryClean view={view} />;
    case "brand":
      return <StoryBrand view={view} />;
    case "cinema":
      return <StoryCinema view={view} />;
    case "specs":
      return <StorySpecs view={view} />;
    case "callout":
      return <StoryCallout view={view} />;
    default:
      return <StoryClean view={view} />;
  }
}

export default function ProductMarketingStudio() {
  const [query, setQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [templateId, setTemplateId] = useState<StoryTemplateId>("clean");
  const [selectedId, setSelectedId] = useState(ALL_PRODUCTS[0]?.id ?? 0);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const brands = useMemo(
    () => Array.from(new Set(ALL_PRODUCTS.map((p) => p.brandName))).sort(),
    []
  );
  const categories = useMemo(
    () => Array.from(new Set(ALL_PRODUCTS.map((p) => p.category))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PRODUCTS.filter((product) => {
      if (brandFilter !== "all" && product.brandName !== brandFilter) return false;
      if (categoryFilter !== "all" && product.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        product.name.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.brandName.toLowerCase().includes(q) ||
        product.popularFits.toLowerCase().includes(q)
      );
    });
  }, [brandFilter, categoryFilter, query]);

  const selected =
    filtered.find((product) => product.id === selectedId) ||
    filtered[0] ||
    ALL_PRODUCTS[0];

  const downloadPng = async () => {
    if (!canvasRef.current || !selected) return;
    setDownloading(true);
    try {
      // Wait a tick so proxied/local images can paint before rasterizing.
      await new Promise((resolve) => setTimeout(resolve, 120));
      const dataUrl = await domToPng(canvasRef.current, {
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        scale: 1,
      });
      const link = document.createElement("a");
      const slug = `${selected.brandName}-${selected.sku}-${templateId}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      link.download = `alberton-story-${slug}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Story PNG export failed", error);
      window.alert("PNG export failed. Check the product image and try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-red-300">Studio</p>
            <h1 className="text-2xl font-black">Product Marketing Stories</h1>
            <p className="text-sm text-slate-300">
              Pick a battery · pick a look · download a 1080×1920 Story
            </p>
          </div>
          <a
            href="/studio"
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/5"
          >
            Studio Hub
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 grid xl:grid-cols-[360px_1fr] gap-6">
        <aside className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <label className="block space-y-2">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Search stock
            </span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Willard 652, AGM, Hilux…"
                className="w-full h-11 rounded-md border border-white/15 bg-slate-950 pl-10 pr-3 text-sm"
              />
            </div>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Brand</span>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full h-11 rounded-md border border-white/15 bg-slate-950 px-3 text-sm"
              >
                <option value="all">All brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Category
              </span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full h-11 rounded-md border border-white/15 bg-slate-950 px-3 text-sm"
              >
                <option value="all">All types</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Template
            </span>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value as StoryTemplateId)}
              className="w-full h-11 rounded-md border border-white/15 bg-slate-950 px-3 text-sm"
            >
              {STORY_TEMPLATES.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name} — {template.thesis}
                </option>
              ))}
            </select>
          </label>

          <div className="max-h-[52vh] overflow-y-auto space-y-2 pr-1">
            {filtered.map((product) => {
              const active = product.id === selected?.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setSelectedId(product.id)}
                  className={`w-full text-left rounded-xl border px-3 py-3 transition-colors ${
                    active
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 bg-slate-950/70 hover:border-white/25"
                  }`}
                >
                  <p className="font-bold">{product.name}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {product.brandName} · {product.sku} · {product.sellingPrice_OUTPUT}
                  </p>
                </button>
              );
            })}
            {filtered.length === 0 ? (
              <p className="text-sm text-slate-400 px-1 py-4">No products match that filter.</p>
            ) : null}
          </div>
        </aside>

        <section className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-300">
                Selected: <span className="font-bold text-white">{selected?.name}</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Export canvas is always {STORY_WIDTH}×{STORY_HEIGHT}. Preview is scaled down.
              </p>
            </div>
            <button
              type="button"
              onClick={downloadPng}
              disabled={!selected || downloading}
              className="inline-flex items-center gap-2 rounded-md bg-red-600 hover:bg-red-500 disabled:opacity-50 px-5 h-11 font-bold"
            >
              <Download className="h-4 w-4" />
              {downloading ? "Exporting…" : "Download PNG"}
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 overflow-auto">
            <div
              style={{
                width: STORY_WIDTH * PREVIEW_SCALE,
                height: STORY_HEIGHT * PREVIEW_SCALE,
                margin: "0 auto",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: STORY_WIDTH,
                  height: STORY_HEIGHT,
                  transform: `scale(${PREVIEW_SCALE})`,
                  transformOrigin: "top left",
                }}
              >
                <div ref={canvasRef}>
                  {selected ? renderTemplate(templateId, selected) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
