import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";
const CHARCOAL = "#2b2b2b";

export default function StoryMesh({ view }: { view: StoryProductView }) {
  const warrantyValue = view.warranty.replace("-Month Warranty", " Months");
  const rows: Array<[string, string]> = [
    ["Type", view.tech],
    ["Power", `${view.capacity} / ${view.cranking}`],
    ["Warranty", warrantyValue],
    ["Fitment", "Free Included"],
  ];

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
        display: "flex",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 135,
          background: RED,
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            transform: "rotate(-90deg)",
            whiteSpace: "nowrap",
            fontWeight: 900,
            fontSize: 42,
            letterSpacing: 9,
          }}
        >
          ALBERTON BATTERY MART
        </div>
      </div>

      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "75px 60px",
          boxSizing: "border-box",
          minWidth: 0,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 168,
            lineHeight: 0.85,
            margin: "0 0 12px",
            fontWeight: 400,
            textTransform: "uppercase",
          }}
        >
          {view.brand} {view.sku}
        </h2>

        <div
          style={{
            fontWeight: 800,
            fontSize: 32,
            color: RED,
            textTransform: "uppercase",
            marginBottom: 54,
          }}
        >
          Now In Stock
        </div>

        <div
          style={{
            height: 600,
            width: "100%",
            marginBottom: 54,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f7f7f7",
          }}
        >
          {view.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={view.imageUrl}
              alt={view.title}
              style={{ width: "90%", height: "90%", objectFit: "contain" }}
            />
          ) : null}
        </div>

        {rows.map(([label, value], index) => (
          <div
            key={label}
            style={{
              borderTop: `6px solid ${CHARCOAL}`,
              borderBottom: index === rows.length - 1 ? `6px solid ${CHARCOAL}` : undefined,
              padding: "22px 0",
              display: "flex",
              justifyContent: "space-between",
              gap: 24,
              fontSize: 34,
              fontWeight: 800,
              textTransform: "uppercase",
              marginBottom: index === rows.length - 1 ? "auto" : 0,
            }}
          >
            <span>{label}</span>
            <span style={{ fontWeight: 400, color: "#666666", textAlign: "right" }}>
              {value}
            </span>
          </div>
        ))}

        <p
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#888888",
            margin: "42px 0",
            textTransform: "uppercase",
            lineHeight: 1.4,
          }}
        >
          Compatible with {view.fits}.
        </p>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 126,
              color: CHARCOAL,
              lineHeight: 1,
              marginBottom: 18,
              fontWeight: 400,
            }}
          >
            {view.price}
          </div>
          <div
            style={{
              background: CHARCOAL,
              color: "#ffffff",
              fontWeight: 800,
              padding: "36px 24px",
              fontSize: 36,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Call {view.phone}
          </div>
        </div>
      </div>
    </div>
  );
}
