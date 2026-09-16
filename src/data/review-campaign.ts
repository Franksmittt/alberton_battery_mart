import { GOOGLE_REVIEW_URL } from "@/lib/review-constants";

export const REVIEW_SMS_COPY = `Hi, thanks for choosing Alberton Battery Mart today. If our team helped with your battery, please leave us a quick Google review: ${GOOGLE_REVIEW_URL}`;

export const REVIEW_WHATSAPP_COPY = `Hi, thank you for trusting Alberton Battery Mart. Your Google review helps other local drivers find honest battery testing and fitment in Alberton.\n\nIf you have 30 seconds, please review us here:\n${GOOGLE_REVIEW_URL}\n\nHelpful details to mention if relevant: your suburb, vehicle, battery size, and whether we helped in-store or with a mobile callout.`;

export const REVIEW_REQUEST_STEPS = [
  {
    title: "Ask at the counter",
    description:
      "After a walk-in test or fitment, ask while they still have the invoice in hand. In-store reviews mention the shop and the suburb they drove from.",
  },
  {
    title: "Send the link before they leave",
    description:
      "WhatsApp or SMS the Google review link at handover. Waiting until later kills conversion.",
  },
  {
    title: "Prompt useful details",
    description:
      "Ask them to mention suburb, vehicle, size, and that they visited 28 St Columb Rd (or that it was a callout).",
  },
  {
    title: "Reply within 24 hours",
    description:
      "Every review gets a human reply that names the service and the area. No canned one-liners.",
  },
];

export const REVIEW_PROMPTS = [
  "Drive-in battery testing at 28 St Columb Rd",
  "Same-day fitment in New Redruth",
  "Willard or Exide battery fitted",
  "AGM coding for BMW or Mercedes",
  "Free Midtronics test before buying",
  "Toyota Hilux, Ford Ranger, or VW battery support",
];
