import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";

export default function StoryModern({ view }: { view: StoryProductView }) {
  const tags = [view.capacity, view.cranking, view.warranty, "Free Fitment"];

  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #383838, #2b2b2b, #1f1f1f)",
        color: "#ffffff",
        fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 60, height: "40%", boxSizing: "border-box" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 45,
            border: `6px solid ${RED}`,
            boxShadow: "0 0 60px rgba(230, 25, 25, 0.4)",
            background: "rgba(0,0,0,0.35)",
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
                width: "86%",
                height: "86%",
                objectFit: "contain",
              }}
            />
          ) : null}
        </div>
      </div>

      <div
        style={{
          padding: "0 72px 60px",
          textAlign: "center",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            color: RED,
            fontWeight: 900,
            letterSpacing: 8,
            fontSize: 34,
            marginBottom: 28,
          }}
        >
          ● {view.badge}
        </div>

        <h2
          style={{
            fontSize: 84,
            fontWeight: 900,
            margin: "0 0 16px",
            color: "#ffffff",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          {view.brand} {view.sku}
        </h2>

        <p
          style={{
            fontSize: 34,
            color: "#cccccc",
            margin: "0 0 48px",
            lineHeight: 1.4,
            fontWeight: 400,
          }}
        >
          Premium {view.tech} Battery
          <br />
          For {view.fits}
        </p>

        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "2px solid rgba(230, 25, 25, 0.5)",
            borderRadius: 30,
            padding: "42px 36px",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: "#ffffff",
              textShadow: "0 0 30px rgba(255,255,255,0.3)",
              lineHeight: 1,
            }}
          >
            {view.price}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(230, 25, 25, 0.15)",
                color: "#ffffff",
                border: `2px solid ${RED}`,
                padding: "14px 28px",
                borderRadius: 60,
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div
          style={{
            background: RED,
            color: "#ffffff",
            padding: "42px 36px",
            borderRadius: 90,
            fontWeight: 900,
            textTransform: "uppercase",
            fontSize: 42,
            marginTop: "auto",
          }}
        >
          Call {view.phone}
        </div>

        <p
          style={{
            marginTop: 36,
            fontSize: 28,
            color: "#cccccc",
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          ALBERTON BATTERY MART
        </p>
      </div>
    </div>
  );
}
