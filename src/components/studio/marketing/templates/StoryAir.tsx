import type { StoryProductView } from "@/components/studio/marketing/storyData";
import { STORY_HEIGHT, STORY_WIDTH } from "@/components/studio/marketing/storyData";

const RED = "#e61919";
const CHARCOAL = "#2b2b2b";

export default function StoryAir({ view }: { view: StoryProductView }) {
  return (
    <div
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        color: CHARCOAL,
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "120px 60px 90px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: RED,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          marginBottom: 42,
        }}
      >
        Alberton Battery Mart
      </div>

      <h1
        style={{
          fontSize: 132,
          fontWeight: 700,
          letterSpacing: -4.5,
          lineHeight: 1,
          margin: "0 0 24px",
        }}
      >
        {view.brand} {view.sku}.
      </h1>

      <div
        style={{
          fontSize: 48,
          fontWeight: 400,
          color: "#666666",
          letterSpacing: -1.5,
        }}
      >
        {view.tech}. {view.capacity}. {view.cranking}.
      </div>

      <div
        style={{
          flexGrow: 1,
          width: "100%",
          margin: "54px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 560,
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 42,
          marginBottom: 54,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: -1.5,
          }}
        >
          {view.price}
        </div>
        <div
          style={{
            backgroundColor: RED,
            color: "#ffffff",
            padding: "36px 84px",
            borderRadius: 90,
            fontWeight: 600,
            fontSize: 36,
          }}
        >
          Call {view.phone}
        </div>
      </div>

      <div
        style={{
          fontSize: 28,
          color: "#888888",
          lineHeight: 1.45,
        }}
      >
        Includes free fitment and {view.warranty.toLowerCase()}.
        <br />
        Fits {view.fits}.
      </div>
    </div>
  );
}
