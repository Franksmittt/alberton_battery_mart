// src/components/layout/FaqSection.tsx
import FaqSchema from "@/components/seo/FaqSchema";

// Highly relevant, objection-handling questions (8 total)
const faqItems = [
  {
    question: "Can I get a new battery without an appointment?",
    answer: "Yes, walk in at **28 St Columb Rd** during trading hours. Phones from 07:30 weekdays; shop floor opens 08:00. Saturday 08:00–12:00. Call first only if you need a mobile dispatch.",
  },
  {
    question: "How long is your warranty period?",
    answer: "We offer warranties up to 36 months on premium batteries (Willard EFB, Enertec AGM) and a minimum of 12 months on all standard automotive batteries. The specific warranty period is clearly stated on your invoice.",
  },
  {
    question: "What is an EFB or AGM battery?",
    answer: "EFB (Enhanced Flooded Battery) and AGM (Absorbed Glass Mat) are advanced batteries required for modern vehicles with Start/Stop systems. Using a standard battery in these cars will void the warranty and lead to premature failure.",
  },
  {
    question: "Is the mobile callout service free?",
    answer: "Our mobile callout includes a service fee for travel time and on-site assistance. **However, the battery testing and fitment service itself are 100% free.** You only pay for the battery and the callout fee. Drive-in is still faster if the car can reach New Redruth.",
  },
  {
    question: "How do I know if my alternator is faulty?",
    answer: "If your battery keeps dying even after replacement, your alternator is likely the issue. We offer a **free on-site alternator diagnostic test** with every battery fitment to catch this problem early.",
  },
  {
    question: "Which brands do you stock?",
    answer: "We officially stock Willard, Enertec, Exide, Power Plus, and Eco Plus. Independent stock means we can match the car instead of pushing a single house brand.",
  },
  {
    question: "Do you only do automotive batteries?",
    answer: "No. We are specialists in both automotive (cars, trucks, 4x4) and deep cycle batteries, including Lithium (LiFePO₄) and AGM models for solar, inverters, and backup power solutions.",
  },
  {
    question: "Where is your physical store located?",
    answer: "Our physical store is located at **28 St Columb Rd, New Redruth, Alberton, 1450.** One turn off Voortrekker Road. Park at the shopfront.",
  },
];

const FaqSection = () => {
  const firstColumn = faqItems.slice(0, 4);
  const secondColumn = faqItems.slice(4, 8);

  return (
    <section className="w-full bg-[var(--brand-bg)] border-y border-[var(--brand-border)] py-20">
      <FaqSchema
        id="homepage-faq-schema"
        items={faqItems.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2.2rem,4.5vw,3rem)] font-black tracking-[-1.5px] text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--brand-muted)] text-[1.05rem] md:text-[1.15rem] leading-relaxed mt-4 max-w-3xl mx-auto">
            Everything you need to know about walking in at 28 St Columb Rd, warranties, and AGM fitment.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-12 xl:gap-x-20 gap-y-0">
            <div className="w-full">
              {firstColumn.map((item, index) => (
                <details key={`left-${index}`} className="group border-b border-[var(--brand-border)] hover:border-[var(--brand-muted-3)] transition-colors duration-300">
                  <summary className="list-none cursor-pointer py-8 text-[1.05rem] md:text-[1.2rem] font-semibold text-white flex items-center justify-between gap-3 md:gap-4 tracking-[-0.3px] group-open:text-[var(--brand-muted)] group-open:pb-6">
                    <span>{item.question}</span>
                    <span className="relative block h-6 w-6 shrink-0 ml-3 md:ml-8">
                      <span className="absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 bg-white group-hover:bg-[var(--brand-accent)] group-open:bg-[var(--brand-accent)] transition-colors duration-300" />
                      <span className="absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 bg-white group-hover:bg-[var(--brand-accent)] group-open:bg-[var(--brand-accent)] group-open:rotate-45 transition-all duration-300" />
                    </span>
                  </summary>
                  <div className="pb-10 text-[var(--brand-muted)] text-[1rem] md:text-[1.05rem] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-300">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="w-full">
              {secondColumn.map((item, index) => (
                <details key={`right-${index}`} className="group border-b border-[var(--brand-border)] hover:border-[var(--brand-muted-3)] transition-colors duration-300">
                  <summary className="list-none cursor-pointer py-8 text-[1.05rem] md:text-[1.2rem] font-semibold text-white flex items-center justify-between gap-3 md:gap-4 tracking-[-0.3px] group-open:text-[var(--brand-muted)] group-open:pb-6">
                    <span>{item.question}</span>
                    <span className="relative block h-6 w-6 shrink-0 ml-3 md:ml-8">
                      <span className="absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 bg-white group-hover:bg-[var(--brand-accent)] group-open:bg-[var(--brand-accent)] transition-colors duration-300" />
                      <span className="absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 bg-white group-hover:bg-[var(--brand-accent)] group-open:bg-[var(--brand-accent)] group-open:rotate-45 transition-all duration-300" />
                    </span>
                  </summary>
                  <div className="pb-10 text-[var(--brand-muted)] text-[1rem] md:text-[1.05rem] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-300">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;