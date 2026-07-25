import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";

export default function StoryPowerCore({ view }: { view: StoryProductView }) {
  const pills = [view.capacity, view.cranking, view.warranty, "Free Fitment"];

  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(circle at center, #3a3a3a 0%, #1f1f1f 100%)",
        color: "#ffffff",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        textAlign: "center",
        padding: "90px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textTransform: "uppercase",
          fontWeight: 800,
          fontSize: 48,
          letterSpacing: 3,
          marginBottom: 72,
        }}
      >
        Alberton <span style={{ color: RED }}>Battery Mart</span>
      </div>

      <div
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `12px solid ${RED}`,
          boxShadow: "0 0 75px rgba(230, 25, 25, 0.4)",
          marginBottom: 54,
          background: "rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {view.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={view.imageUrl}
            alt={view.title}
            style={{ width: "78%", height: "78%", objectFit: "contain" }}
          />
        ) : null}
      </div>

      <div
        style={{
          color: RED,
          fontWeight: 700,
          fontSize: 30,
          marginBottom: 14,
          letterSpacing: 2,
        }}
      >
        NOW IN STOCK
      </div>

      <div
        style={{
          fontSize: 84,
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: 14,
          textTransform: "uppercase",
        }}
      >
        {view.brand} {view.sku}
      </div>

      <div
        style={{
          fontSize: 32,
          color: "#cccccc",
          marginBottom: 42,
          fontWeight: 500,
        }}
      >
        {view.tech} • Fits {view.fits}
      </div>

      <div
        style={{
          background: "#ffffff",
          color: "#2b2b2b",
          fontSize: 72,
          fontWeight: 800,
          padding: "18px 72px",
          borderRadius: 150,
          marginBottom: 48,
          lineHeight: 1.1,
        }}
      >
        {view.price}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: "auto",
        }}
      >
        {pills.map((pill) => (
          <div
            key={pill}
            style={{
              border: "2px solid #444444",
              color: "#ffffff",
              fontSize: 30,
              padding: "12px 36px",
              borderRadius: 60,
              fontWeight: 700,
            }}
          >
            {pill}
          </div>
        ))}
      </div>

      <div
        style={{
          background: RED,
          color: "#ffffff",
          width: "100%",
          padding: "42px 36px",
          borderRadius: 30,
          fontWeight: 700,
          fontSize: 42,
          textTransform: "uppercase",
          boxShadow: "0 15px 45px rgba(230,25,25,0.3)",
          marginTop: 54,
        }}
      >
        Call {view.phone}
      </div>
    </div>
  );
}
