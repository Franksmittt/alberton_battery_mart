import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";
const CHARCOAL = "#2b2b2b";
const CHARCOAL_DARK = "#1f1f1f";

export default function StoryIndustrial({ view }: { view: StoryProductView }) {
  const features = [view.capacity, view.cranking, view.warranty, "Free Fitment"];

  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        position: "relative",
        overflow: "hidden",
        backgroundColor: CHARCOAL,
        color: "#ffffff",
        fontFamily: "var(--font-oswald), 'Oswald', sans-serif",
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
          backgroundColor: CHARCOAL_DARK,
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
            style={{
              width: "88%",
              height: "88%",
              objectFit: "contain",
            }}
          />
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "55%",
          background: CHARCOAL,
          padding: "60px 60px 0",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: RED,
            color: "#ffffff",
            padding: "15px 45px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 6,
            fontSize: 36,
            alignSelf: "flex-start",
            marginBottom: 30,
          }}
        >
          {view.badge}
        </div>

        <h1
          style={{
            fontSize: 108,
            lineHeight: 1.05,
            margin: "0 0 18px",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          {view.brand} <span style={{ color: RED }}>{view.sku}</span>
        </h1>

        <p
          style={{
            color: "#cccccc",
            fontSize: 36,
            margin: "0 0 36px",
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontWeight: 400,
            lineHeight: 1.35,
          }}
        >
          {view.sku} · {view.tech} · Fits: {view.fits}
        </p>

        <div
          style={{
            fontSize: 132,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 42,
            lineHeight: 1,
          }}
        >
          {view.price}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: "auto",
          }}
        >
          {features.map((item) => (
            <div
              key={item}
              style={{
                background: CHARCOAL_DARK,
                padding: "22px 18px",
                fontSize: 34,
                textAlign: "center",
                borderLeft: `8px solid ${RED}`,
                color: "#ffffff",
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontWeight: 700,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div
          style={{
            background: RED,
            color: "#ffffff",
            textAlign: "center",
            padding: "42px 60px",
            fontWeight: 700,
            fontSize: 48,
            margin: "36px -60px 0",
            lineHeight: 1.25,
          }}
        >
          CALL {view.phone}
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              marginTop: 10,
              letterSpacing: 3,
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            }}
          >
            ALBERTON BATTERY MART
          </div>
        </div>
      </div>
    </div>
  );
}
