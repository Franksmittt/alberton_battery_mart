import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

export default function StorySpecs({ view }: { view: StoryProductView }) {
  const rows = [
    ["Brand", view.brand],
    ["Code / SKU", view.sku],
    ["Technology", view.tech],
    ["Capacity", view.capacity],
    ["Cranking", view.cranking],
    ["Warranty", view.warranty],
    ["Category", view.category],
  ];

  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        background: "#0F172A",
        color: "#F8FAFC",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: 56,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2 }}>SPEC SHEET</div>
      <div style={{ marginTop: 18, fontSize: 62, fontWeight: 900, lineHeight: 1.05 }}>{view.title}</div>
      <div style={{ marginTop: 10, fontSize: 32, color: "#94A3B8" }}>{view.badge}</div>

      <div
        style={{
          marginTop: 36,
          height: 420,
          borderRadius: 28,
          background: "#1E293B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {view.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={view.imageUrl}
            alt={view.title}
            style={{ width: "80%", height: "80%", objectFit: "contain" }}
          />
        ) : null}
      </div>

      <div style={{ marginTop: 36, display: "grid", gap: 14 }}>
        {rows.map(([label, value]) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 24,
              borderBottom: "2px solid #334155",
              paddingBottom: 12,
            }}
          >
            <div style={{ fontSize: 28, color: "#94A3B8", fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 30, fontWeight: 800, textAlign: "right" }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "auto" }}>
        <div style={{ fontSize: 64, fontWeight: 900, color: "#F87171" }}>{view.price}</div>
        <div style={{ marginTop: 12, fontSize: 30, color: "#CBD5E1" }}>
          Fits: {view.fits}
        </div>
        <div style={{ marginTop: 18, fontSize: 34, fontWeight: 800 }}>
          Alberton Battery Mart · {view.phone}
        </div>
      </div>
    </div>
  );
}
