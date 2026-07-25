import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";
const CHARCOAL = "#2b2b2b";

export default function StoryPro({ view }: { view: StoryProductView }) {
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
        display: "flex",
        flexDirection: "column",
        padding: "90px 60px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 30,
          fontWeight: 600,
          marginBottom: 72,
        }}
      >
        <span>Alberton Battery Mart</span>
        <span style={{ color: RED }}>{view.badge}</span>
      </div>

      <h2
        style={{
          fontSize: 138,
          fontWeight: 800,
          letterSpacing: -4.5,
          lineHeight: 1,
          background: "linear-gradient(180deg, #ffffff 0%, #aaaaaa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: "0 0 18px",
          color: "transparent",
        }}
      >
        Pro power.
      </h2>

      <div
        style={{
          fontSize: 42,
          fontWeight: 400,
          color: "#aaaaaa",
          letterSpacing: -1.5,
          marginBottom: 48,
        }}
      >
        {view.brand} {view.sku} {view.tech} Battery.
      </div>

      <div
        style={{
          height: 720,
          width: "100%",
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
            style={{ width: "88%", height: "88%", objectFit: "contain" }}
          />
        ) : null}
      </div>

      <ul
        style={{
          listStyle: "none",
          color: "#cccccc",
          fontSize: 32,
          margin: "0 0 48px",
          padding: 0,
          lineHeight: 1.55,
        }}
      >
        <li
          style={{
            borderBottom: "2px solid #444444",
            paddingBottom: 14,
            marginBottom: 14,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          {view.capacity} / {view.cranking}
        </li>
        <li
          style={{
            borderBottom: "2px solid #444444",
            paddingBottom: 14,
            marginBottom: 14,
          }}
        >
          {view.warranty}
        </li>
        <li>Fits {view.fits}</li>
      </ul>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: 60,
          padding: 54,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 28,
              color: "#aaaaaa",
              margin: "0 0 12px",
            }}
          >
            Free Fitment Included
          </p>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            {view.price}
          </div>
        </div>
        <div
          style={{
            color: RED,
            fontWeight: 600,
            fontSize: 36,
            whiteSpace: "nowrap",
          }}
        >
          Call Now ›
        </div>
      </div>
    </div>
  );
}
