import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

export default function StoryBrand({ view }: { view: StoryProductView }) {
  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        background: "linear-gradient(180deg, #7F1D1D 0%, #DC2626 42%, #111827 100%)",
        color: "#fff",
        fontFamily: "Arial, Helvetica, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: 56,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 3 }}>ALBERTON BATTERY MART</div>
      <div style={{ marginTop: 18, fontSize: 34, fontWeight: 700, opacity: 0.9 }}>{view.badge}</div>
      <div style={{ marginTop: 28, fontSize: 74, fontWeight: 900, lineHeight: 1.02 }}>{view.title}</div>
      <div style={{ marginTop: 12, fontSize: 34, opacity: 0.9 }}>
        {view.brand} · {view.sku} · {view.tech}
      </div>

      <div
        style={{
          marginTop: 40,
          height: 680,
          borderRadius: 32,
          background: "rgba(255,255,255,0.08)",
          border: "2px solid rgba(255,255,255,0.18)",
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
            style={{ width: "88%", height: "88%", objectFit: "contain" }}
          />
        ) : null}
      </div>

      <div style={{ marginTop: 40, fontSize: 84, fontWeight: 900 }}>{view.price}</div>
      <div style={{ marginTop: 16, fontSize: 34, fontWeight: 700 }}>
        {view.capacity} · {view.cranking} · {view.warranty}
      </div>
      <div
        style={{
          marginTop: "auto",
          background: "#fff",
          color: "#111827",
          borderRadius: 28,
          padding: "28px 32px",
          fontSize: 36,
          fontWeight: 900,
          textAlign: "center",
        }}
      >
        Call {view.phone}
      </div>
    </div>
  );
}
