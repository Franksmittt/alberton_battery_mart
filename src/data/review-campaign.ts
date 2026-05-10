import { GOOGLE_REVIEW_URL } from "@/lib/review-constants";

export const REVIEW_SMS_COPY = `Hi, thanks for choosing Alberton Battery Mart today. If our team helped with your battery, please leave us a quick Google review: ${GOOGLE_REVIEW_URL}`;

export const REVIEW_WHATSAPP_COPY = `Hi, thank you for trusting Alberton Battery Mart. Your Google review helps other local drivers find honest battery testing and fitment in Alberton.\n\nIf you have 30 seconds, please review us here:\n${GOOGLE_REVIEW_URL}\n\nHelpful details to mention if relevant: your suburb, vehicle, battery size, and whether we helped in-store or with a mobile callout.`;

export const REVIEW_REQUEST_STEPS = [
  {
    title: "Ask at handover",
    description:
      "After payment and warranty registration, ask while the successful fitment is still fresh.",
  },
  {
    title: "Send the link immediately",
    description:
      "Use WhatsApp or SMS before the customer drives away. Reviews drop sharply if you wait.",
  },
  {
    title: "Prompt useful details",
    description:
      "Ask customers to mention suburb, vehicle, service type, and whether diagnostics were included.",
  },
  {
    title: "Reply within 24 hours",
    description:
      "Every review should get a human response that naturally references the service and area.",
  },
];

export const REVIEW_PROMPTS = [
  "Mobile battery replacement in Alberton",
  "Free battery testing in New Redruth",
  "AGM battery coding in Meyersdal",
  "Truck battery fitment in Alrode",
  "Willard or Exide battery fitted",
  "Toyota Hilux, Ford Ranger, BMW, Mercedes, or VW battery support",
];
