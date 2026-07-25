import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";
const CHARCOAL = "#2b2b2b";
const CHARCOAL_DARK = "#1f1f1f";

export default function StoryEditorial({ view }: { view: StoryProductView }) {
  const specs = [view.tech, view.capacity, view.cranking, view.warranty];

  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        position: "relative",
        overflow: "hidden",
        backgroundColor: CHARCOAL,
        color: "#ffffff",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 840,
          width: "100%",
          backgroundColor: CHARCOAL_DARK,
          borderBottom: `12px solid ${RED}`,
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
            style={{ width: "88%", height: "88%", objectFit: "contain" }}
          />
        ) : null}
      </div>

      <div
        style={{
          padding: 60,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            color: "#aaaaaa",
            textTransform: "uppercase",
            marginBottom: 16,
            fontWeight: 700,
          }}
        >
          Alberton Battery Mart
        </div>

        <h2
          style={{
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "0 0 24px",
            textTransform: "uppercase",
          }}
        >
          {view.brand} {view.sku}
        </h2>

        <div
          style={{
            color: RED,
            fontWeight: 700,
            fontSize: 34,
            marginBottom: 28,
          }}
        >
          ⬤ {view.badge}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginTop: 12,
          }}
        >
          {specs.map((spec) => (
            <div
              key={spec}
              style={{
                fontSize: 32,
                background: CHARCOAL_DARK,
                padding: "18px 28px",
                borderRadius: 12,
                fontWeight: 700,
              }}
            >
              {spec}
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: 30,
            color: "#aaaaaa",
            marginTop: 42,
            fontStyle: "italic",
            lineHeight: 1.4,
            fontWeight: 400,
          }}
        >
          Fits: {view.fits}. Free fitment included.
        </p>
      </div>

      <div
        style={{
          background: RED,
          padding: "54px 60px",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            marginBottom: 12,
            lineHeight: 1,
          }}
        >
          {view.price}
        </div>
        <div style={{ fontSize: 48, fontWeight: 700 }}>CALL: {view.phone}</div>
      </div>
    </div>
  );
}
