// src/components/seo/AtomicAnswers.tsx
"use client";

type Variant = "homepage" | "services" | "custom";

interface AtomicAnswersProps {
  variant?: Variant;
  answers?: { question: string; answer: string }[];
}

const ANSWER_PRESETS: Record<Exclude<Variant, "custom">, { question: string; answer: string }[]> =
  {
    homepage: [
      {
        question: "How fast can Alberton Battery Mart replace my battery?",
        answer:
          "Most callouts in Alberton, New Redruth, and Meyersdal wrap in 60 minutes. We run Midtronics diagnostics first, then fit your Willard or Exide battery on-site so you avoid towing.",
      },
      {
        question: "Do you handle Start/Stop and coding?",
        answer:
          "Yes. We stock AGM/EFB batteries and register them to the vehicle’s BMS before handover, preventing charging faults on BMW, Mercedes, Audi, Ford Ranger, and other Start/Stop platforms.",
      },
      {
        question: "Can you test my current battery before I buy?",
        answer:
          "We offer free battery, alternator, and starter testing in-store or as part of the mobile callout. You only pay once we’ve proven the battery is the failure point.",
      },
    ],
    services: [
      {
        question: "Which suburbs do your callouts cover?",
        answer:
          "New Redruth, Alberton Central, Meyersdal, Alrode, and the surrounding estates. We dispatch the closest mobile unit with the exact battery spec you need.",
      },
      {
        question: "What diagnostics are included on-site?",
        answer:
          "Every callout includes Midtronics load testing, alternator ripple checks, starter draw, and BMS scan where needed. We only replace the battery after proving it’s failed.",
      },
      {
        question: "Do you support fleets and trucks?",
        answer:
          "Yes. We carry Willard 658/689, Exide truck ranges, and can rotate or replace multiple fleet batteries during one visit, including recycling the old units.",
      },
    ],
  };

export default function AtomicAnswers({
  variant = "homepage",
  answers,
}: AtomicAnswersProps) {
  const data =
    variant === "custom"
      ? answers ?? []
      : ANSWER_PRESETS[variant] ?? ANSWER_PRESETS.homepage;

  return (
    <section className="bg-card/40 border-t border-b border-border py-16">
      <div className="container space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground text-center">
          Quick answers
        </p>
        <h2 className="text-4xl font-extrabold text-center text-foreground">
          Atomic facts Google and AI can quote instantly
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((item) => (
            <article
              key={item.question}
              className="p-6 bg-background rounded-2xl border border-border shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {item.question}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

