import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

export default function StoryClean({ view }: { view: StoryProductView }) {
  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        background: "#F4F6F8",
        color: "#0B1220",
        fontFamily: "Arial, Helvetica, sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: 56,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2 }}>ALBERTON BATTERY MART</div>
        <div
          style={{
            background: "#DC2626",
            color: "#fff",
            fontSize: 24,
            fontWeight: 800,
            padding: "12px 22px",
            borderRadius: 999,
          }}
        >
          {view.badge}
        </div>
      </div>

      <div
        style={{
          marginTop: 48,
          background: "#fff",
          borderRadius: 36,
          padding: 40,
          boxShadow: "0 24px 60px rgba(11,18,32,0.12)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#64748B" }}>{view.brand}</div>
        <div style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.05, marginTop: 8 }}>{view.title}</div>
        <div style={{ fontSize: 32, color: "#475569", marginTop: 12 }}>{view.sku} · {view.tech}</div>

        <div
          style={{
            marginTop: 36,
            height: 620,
            borderRadius: 28,
            background: "#EEF2F7",
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
              style={{ width: "86%", height: "86%", objectFit: "contain" }}
            />
          ) : null}
        </div>

        <div style={{ marginTop: 36, fontSize: 76, fontWeight: 900, color: "#DC2626" }}>{view.price}</div>
        <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[view.capacity, view.cranking, view.warranty, "Free Fitment"].map((item) => (
            <div
              key={item}
              style={{
                background: "#F8FAFC",
                border: "2px solid #E2E8F0",
                borderRadius: 18,
                padding: "18px 20px",
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", fontSize: 28, color: "#475569" }}>
          Fits: {view.fits}
        </div>
      </div>

      <div style={{ marginTop: 28, fontSize: 34, fontWeight: 800 }}>
        Call {view.phone} · Alberton mobile fitment
      </div>
    </div>
  );
}
