import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

export default function StoryCinema({ view }: { view: StoryProductView }) {
  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        background: "#05070C",
        color: "#fff",
        fontFamily: "Arial, Helvetica, sans-serif",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 28%, rgba(220,38,38,0.35), transparent 55%), linear-gradient(180deg, rgba(5,7,12,0.15) 0%, rgba(5,7,12,0.2) 45%, rgba(5,7,12,0.95) 72%, #05070C 100%)",
          zIndex: 1,
        }}
      />
      {view.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={view.imageUrl}
          alt={view.title}
          style={{
            position: "absolute",
            top: 180,
            left: "50%",
            transform: "translateX(-50%)",
            width: "78%",
            height: 820,
            objectFit: "contain",
            zIndex: 0,
          }}
        />
      ) : null}

      <div style={{ position: "relative", zIndex: 2, height: "100%", padding: 56, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 3, color: "#FCA5A5" }}>
          ALBERTON BATTERY MART
        </div>
        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              display: "inline-block",
              background: "#DC2626",
              padding: "12px 20px",
              borderRadius: 999,
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            {view.badge}
          </div>
          <div style={{ marginTop: 22, fontSize: 70, fontWeight: 900, lineHeight: 1.05 }}>{view.title}</div>
          <div style={{ marginTop: 14, fontSize: 34, color: "#CBD5E1" }}>
            {view.tech} · {view.capacity} · {view.cranking}
          </div>
          <div style={{ marginTop: 28, fontSize: 78, fontWeight: 900 }}>{view.price}</div>
          <div style={{ marginTop: 18, fontSize: 30, color: "#E2E8F0" }}>{view.warranty} · Free diagnostics</div>
          <div style={{ marginTop: 28, fontSize: 34, fontWeight: 800 }}>Call {view.phone}</div>
        </div>
      </div>
    </div>
  );
}
