import type { CSSProperties, ReactNode } from "react";
import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";
const CHARCOAL = "#2b2b2b";

function WidgetCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 72,
        padding: 54,
        boxShadow: "0 12px 45px rgba(0,0,0,0.03)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function StoryWidget({ view }: { view: StoryProductView }) {
  const warrantyShort = view.warranty.replace("-Month Warranty", " Mo");

  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f5f5f7",
        color: CHARCOAL,
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        padding: 54,
        display: "flex",
        flexDirection: "column",
        gap: 42,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: 640,
          borderRadius: 72,
          padding: 54,
          boxShadow: "0 12px 45px rgba(0,0,0,0.03)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          backgroundColor: CHARCOAL,
        }}
      >
        {view.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={view.imageUrl}
            alt={view.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: 48,
              boxSizing: "border-box",
              opacity: 0.85,
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(43,43,43,0.15), rgba(43,43,43,0.88))",
          }}
        />
        <h3
          style={{
            position: "relative",
            color: "#ffffff",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: -3,
            marginTop: "auto",
            width: "100%",
            textAlign: "left",
            lineHeight: 1.05,
            zIndex: 1,
          }}
        >
          {view.brand}
          <br />
          {view.sku}
        </h3>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 42,
        }}
      >
        <WidgetCard style={{ borderRadius: 60, padding: 42 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: CHARCOAL,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 28,
            }}
          >
            Ah
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: -1.5,
              marginBottom: 8,
            }}
          >
            {view.capacity}
          </div>
          <div style={{ fontSize: 28, color: "#888888", fontWeight: 500 }}>
            {view.cranking} Power
          </div>
        </WidgetCard>

        <WidgetCard style={{ borderRadius: 60, padding: 42 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: RED,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
              marginBottom: 28,
            }}
          >
            OK
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: -1.5,
              marginBottom: 8,
            }}
          >
            {warrantyShort}
          </div>
          <div style={{ fontSize: 28, color: "#888888", fontWeight: 500 }}>
            Full Warranty
          </div>
        </WidgetCard>
      </div>

      <WidgetCard style={{ padding: "42px 54px" }}>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: -1.5,
            marginBottom: 8,
          }}
        >
          Compatibility
        </div>
        <div style={{ fontSize: 28, color: "#888888", fontWeight: 500 }}>
          {view.fits}
        </div>
      </WidgetCard>

      <div
        style={{
          marginTop: "auto",
          background: CHARCOAL,
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 54,
          borderRadius: 72,
          gap: 24,
        }}
      >
        <div>
          <div style={{ fontSize: 28, color: "#aaaaaa", fontWeight: 500 }}>
            Free Fitment
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, marginTop: 8 }}>
            {view.price}
          </div>
        </div>
        <div
          style={{
            background: RED,
            color: "#ffffff",
            padding: "28px 42px",
            borderRadius: 48,
            fontWeight: 600,
            fontSize: 32,
            whiteSpace: "nowrap",
          }}
        >
          {view.phone}
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 26,
          color: "#aaaaaa",
          fontWeight: 600,
          letterSpacing: 2,
        }}
      >
        ALBERTON BATTERY MART
      </div>
    </div>
  );
}
