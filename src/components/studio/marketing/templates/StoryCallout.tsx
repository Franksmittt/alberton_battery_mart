import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

export default function StoryCallout({ view }: { view: StoryProductView }) {
  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        background: "linear-gradient(165deg, #052E16 0%, #0B1220 48%, #111827 100%)",
        color: "#fff",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: 56,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          background: "#16A34A",
          color: "#fff",
          fontSize: 26,
          fontWeight: 900,
          padding: "12px 20px",
          borderRadius: 999,
        }}
      >
        MOBILE CALLOUT
      </div>
      <div style={{ marginTop: 28, fontSize: 64, fontWeight: 900, lineHeight: 1.05 }}>
        Dead battery?
        <br />
        We come to you.
      </div>
      <div style={{ marginTop: 18, fontSize: 34, color: "#BBF7D0" }}>
        Alberton · New Redruth · Meyersdal · Alrode
      </div>

      <div
        style={{
          marginTop: 40,
          background: "rgba(255,255,255,0.06)",
          border: "2px solid rgba(255,255,255,0.14)",
          borderRadius: 32,
          padding: 32,
        }}
      >
        <div style={{ fontSize: 28, color: "#94A3B8", fontWeight: 700 }}>{view.brand}</div>
        <div style={{ marginTop: 8, fontSize: 54, fontWeight: 900 }}>{view.title}</div>
        <div style={{ marginTop: 10, fontSize: 30, color: "#CBD5E1" }}>
          {view.sku} · {view.tech} · {view.capacity}
        </div>
        <div
          style={{
            marginTop: 28,
            height: 420,
            borderRadius: 24,
            background: "#0F172A",
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
              style={{ width: "85%", height: "85%", objectFit: "contain" }}
            />
          ) : null}
        </div>
        <div style={{ marginTop: 28, fontSize: 68, fontWeight: 900 }}>{view.price}</div>
        <div style={{ marginTop: 10, fontSize: 30, color: "#E2E8F0" }}>
          {view.warranty} · Free testing before fitment
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          background: "#DC2626",
          borderRadius: 28,
          padding: "28px 32px",
          textAlign: "center",
          fontSize: 38,
          fontWeight: 900,
        }}
      >
        Call {view.phone}
      </div>
    </div>
  );
}
