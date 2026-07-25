import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";
const CHARCOAL = "#2b2b2b";

export default function StorySpecSheet({ view }: { view: StoryProductView }) {
  const warrantyValue = view.warranty.replace("-Month Warranty", " Months");
  const rows: Array<[string, string]> = [
    ["Type", view.tech],
    ["Specs", `${view.capacity} / ${view.cranking}`],
    ["Compatibility", view.fits],
    ["Warranty", warrantyValue],
    ["Fitment", "Free Installation"],
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
        flexDirection: "column",
        padding: "90px 72px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: `6px solid ${CHARCOAL}`,
          paddingBottom: 28,
          marginBottom: 54,
        }}
      >
        <h3
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {view.brand}
          <br />
          {view.sku}
        </h3>
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: RED,
            letterSpacing: 3,
            paddingBottom: 8,
          }}
        >
          {view.badge}
        </span>
      </div>

      <div
        style={{
          height: 640,
          width: "100%",
          marginBottom: 42,
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
            style={{ width: "90%", height: "90%", objectFit: "contain" }}
          />
        ) : null}
      </div>

      <div
        style={{
          fontSize: 144,
          fontWeight: 100,
          letterSpacing: -6,
          color: CHARCOAL,
          marginBottom: 48,
          lineHeight: 1,
        }}
      >
        {view.price}
      </div>

      <ul
        style={{
          listStyle: "none",
          margin: "0 0 auto",
          padding: 0,
        }}
      >
        {rows.map(([label, value]) => (
          <li
            key={label}
            style={{
              borderBottom: "2px solid #dddddd",
              padding: "28px 0",
              display: "flex",
              justifyContent: "space-between",
              gap: 36,
              fontSize: 32,
            }}
          >
            <span style={{ color: "#888888", flexShrink: 0 }}>{label}</span>
            <span
              style={{
                fontWeight: 700,
                textAlign: "right",
                maxWidth: "62%",
              }}
            >
              {value}
            </span>
          </li>
        ))}
      </ul>

      <div style={{ textAlign: "center", marginTop: 54 }}>
        <div
          style={{
            display: "inline-block",
            color: RED,
            fontSize: 42,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          Call {view.phone}
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 24,
          color: "#aaaaaa",
          marginTop: 28,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        Alberton Battery Mart
      </div>
    </div>
  );
}
