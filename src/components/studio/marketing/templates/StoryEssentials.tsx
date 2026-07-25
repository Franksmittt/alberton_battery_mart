import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";
const CHARCOAL = "#2b2b2b";

export default function StoryEssentials({ view }: { view: StoryProductView }) {
  const warrantyShort = view.warranty.replace("-Month Warranty", "-Months");

  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        color: CHARCOAL,
        fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
        fontWeight: 300,
        display: "flex",
        flexDirection: "column",
        padding: "60px 72px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 28,
          textTransform: "uppercase",
          fontWeight: 700,
          color: CHARCOAL,
          letterSpacing: 6,
          marginBottom: 72,
        }}
      >
        Alberton Battery Mart
      </div>

      <div style={{ marginBottom: -36, zIndex: 2 }}>
        <h1
          style={{
            fontSize: 96,
            fontWeight: 100,
            lineHeight: 1.1,
            margin: "0 0 18px",
          }}
        >
          The Power <strong style={{ fontWeight: 700 }}>Series</strong>
        </h1>
        <p
          style={{
            color: RED,
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 3,
            margin: "0 0 48px",
          }}
        >
          ⬤ {view.badge}
        </p>
      </div>

      <div
        style={{
          height: 720,
          width: "100%",
          marginTop: -60,
          marginBottom: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {view.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={view.imageUrl}
            alt={view.title}
            style={{ width: "92%", height: "92%", objectFit: "contain" }}
          />
        ) : null}
      </div>

      <div
        style={{
          borderTop: "2px solid #eeeeee",
          paddingTop: 42,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 42,
          fontSize: 30,
          marginBottom: 48,
        }}
      >
        <div>
          <strong style={{ display: "block", color: CHARCOAL, fontWeight: 700 }}>
            {view.brand.toUpperCase()} {view.sku}
          </strong>
          <span style={{ color: "#888888" }}>Car Battery</span>
        </div>
        <div>
          <strong style={{ display: "block", color: CHARCOAL, fontWeight: 700 }}>
            {view.tech}
          </strong>
          <span style={{ color: "#888888" }}>Technology</span>
        </div>
        <div>
          <strong style={{ display: "block", color: CHARCOAL, fontWeight: 700 }}>
            {view.capacity} / {view.cranking}
          </strong>
          <span style={{ color: "#888888" }}>Performance</span>
        </div>
        <div>
          <strong style={{ display: "block", color: CHARCOAL, fontWeight: 700 }}>
            {warrantyShort}
          </strong>
          <span style={{ color: "#888888" }}>Warranty</span>
        </div>
      </div>

      <p
        style={{
          fontSize: 28,
          color: "#888888",
          margin: "0 0 48px",
          fontStyle: "italic",
          lineHeight: 1.4,
        }}
      >
        Designed for: {view.fits}. Free fitment included.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>{view.price}</div>
        <div
          style={{
            background: RED,
            color: "#ffffff",
            padding: "28px 48px",
            fontWeight: 700,
            fontSize: 30,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Call {view.phone}
        </div>
      </div>
    </div>
  );
}
