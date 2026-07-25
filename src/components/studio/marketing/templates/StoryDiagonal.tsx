import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";
const CHARCOAL = "#2b2b2b";

export default function StoryDiagonal({ view }: { view: StoryProductView }) {
  const bullets = [
    `${view.capacity} & ${view.cranking}`,
    view.warranty,
    "Free Fitment",
  ];

  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        fontFamily: "var(--font-teko), 'Teko', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "45%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#151515",
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
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "70%",
          background: RED,
          clipPath: "polygon(0 18%, 100% -2%, 100% 0, 0 20%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "70%",
          background: CHARCOAL,
          clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 100%)",
          zIndex: 2,
          padding: "200px 72px 54px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <span
            style={{
              background: RED,
              display: "inline-block",
              padding: "6px 30px",
              fontSize: 48,
              textTransform: "uppercase",
              letterSpacing: 3,
              fontWeight: 700,
            }}
          >
            {view.badge}
          </span>
        </div>

        <h2
          style={{
            fontSize: 168,
            lineHeight: 0.9,
            textTransform: "uppercase",
            margin: "0 0 12px",
            fontWeight: 700,
          }}
        >
          {view.brand} {view.sku}
        </h2>

        <div
          style={{
            fontSize: 54,
            color: "#cccccc",
            marginBottom: 36,
            lineHeight: 1,
            fontWeight: 500,
          }}
        >
          {view.tech} Car Battery
        </div>

        <div
          style={{
            fontSize: 168,
            color: RED,
            lineHeight: 0.85,
            marginBottom: 48,
            fontWeight: 700,
          }}
        >
          {view.price}
        </div>

        <ul
          style={{
            listStyle: "none",
            fontSize: 48,
            color: "#ffffff",
            margin: "0 0 auto",
            padding: 0,
            fontWeight: 500,
          }}
        >
          {bullets.map((item) => (
            <li key={item} style={{ marginBottom: 4 }}>
              <span style={{ color: RED, marginRight: 14 }}>/</span>
              {item}
            </li>
          ))}
        </ul>

        <div
          style={{
            borderTop: "6px solid #444444",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 42,
              color: "#aaaaaa",
              lineHeight: 1.1,
              fontWeight: 500,
              maxWidth: "52%",
              textTransform: "uppercase",
            }}
          >
            Fits {view.fits}
          </div>
          <div
            style={{
              fontSize: 72,
              color: "#ffffff",
              lineHeight: 1,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {view.phone}
          </div>
        </div>

        <div
          style={{
            fontSize: 42,
            color: RED,
            marginTop: 16,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          ALBERTON BATTERY MART
        </div>
      </div>
    </div>
  );
}
