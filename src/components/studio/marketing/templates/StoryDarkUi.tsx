import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";
const CHARCOAL = "#2b2b2b";

export default function StoryDarkUi({ view }: { view: StoryProductView }) {
  const warrantyShort = view.warranty.replace("-Month Warranty", "-Mo");

  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        position: "relative",
        overflow: "hidden",
        backgroundColor: CHARCOAL,
        color: "#ffffff",
        fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
        display: "flex",
        flexDirection: "column",
        padding: 72,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 72,
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 3,
            fontWeight: 400,
            color: "#aaaaaa",
            textTransform: "uppercase",
          }}
        >
          Alberton Battery Mart
        </div>
        <div
          style={{
            border: `2px solid ${RED}`,
            color: RED,
            padding: "12px 28px",
            borderRadius: 60,
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {view.badge}
        </div>
      </div>

      <h2
        style={{
          fontSize: 120,
          fontWeight: 100,
          lineHeight: 1,
          margin: "0 0 48px",
        }}
      >
        {view.brand}
        <br />
        <b style={{ fontWeight: 700 }}>{view.sku}</b>
      </h2>

      <div
        style={{
          flexGrow: 1,
          width: "100%",
          marginBottom: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 520,
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
          display: "flex",
          justifyContent: "space-between",
          borderTop: "2px solid #444444",
          padding: "42px 0",
          fontSize: 28,
          color: "#cccccc",
        }}
      >
        <div>
          <b
            style={{
              color: "#ffffff",
              fontWeight: 700,
              display: "block",
              fontSize: 34,
              marginBottom: 8,
            }}
          >
            {view.capacity}
          </b>
          Capacity
        </div>
        <div>
          <b
            style={{
              color: "#ffffff",
              fontWeight: 700,
              display: "block",
              fontSize: 34,
              marginBottom: 8,
            }}
          >
            {view.cranking}
          </b>
          Cold Cranking
        </div>
        <div>
          <b
            style={{
              color: "#ffffff",
              fontWeight: 700,
              display: "block",
              fontSize: 34,
              marginBottom: 8,
            }}
          >
            {warrantyShort}
          </b>
          Warranty
        </div>
      </div>

      <p
        style={{
          fontSize: 26,
          color: "#aaaaaa",
          margin: "24px 0 48px",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        Fits {view.fits}. Free Fitment.
      </p>

      <div
        style={{
          background: RED,
          borderRadius: 24,
          padding: "42px 54px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>{view.price}</div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            whiteSpace: "nowrap",
          }}
        >
          Call {view.phone} ➔
        </div>
      </div>
    </div>
  );
}
