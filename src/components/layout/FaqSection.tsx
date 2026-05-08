// src/components/layout/FaqSection.tsx

// Highly relevant, objection-handling questions (8 total)
const faqItems = [
  {
    question: "Is the mobile callout service free?",
    answer: "Our mobile callout includes a service fee for travel time and on-site assistance. **However, the battery testing and fitment service itself are 100% free.** You only pay for the battery and the callout fee, ensuring you get transparent, fixed pricing.",
  },
  {
    question: "How long is your warranty period?",
    answer: "We offer warranties up to 36 months on premium batteries (Willard EFB, Enertec AGM) and a minimum of 12 months on all standard automotive batteries. The specific warranty period is clearly stated on your invoice.",
  },
  {
    question: "Can I get a new battery without an appointment?",
    answer: "Yes, you can visit our storefront directly at 28 St Columb Rd during trading hours for immediate counter sales. For mobile service, please call us first to schedule the fastest dispatch time.",
  },
  {
    question: "Do you only do automotive batteries?",
    answer: "No. We are specialists in both automotive (cars, trucks, 4x4) and deep cycle batteries, including Lithium (LiFePO₄) and AGM models for solar, inverters, and backup power solutions.",
  },
  {
    question: "What is an EFB or AGM battery?",
    answer: "EFB (Enhanced Flooded Battery) and AGM (Absorbed Glass Mat) are advanced batteries required for modern vehicles with Start/Stop systems. Using a standard battery in these cars will void the warranty and lead to premature failure.",
  },
  {
    question: "How do I know if my alternator is faulty?",
    answer: "If your battery keeps dying even after replacement, your alternator is likely the issue. We offer a **free on-site alternator diagnostic test** with every battery fitment to catch this problem early.",
  },
  {
    question: "Which brands do you stock?",
    answer: "We are a multi-brand stockist, guaranteeing the best fit for your budget and vehicle. We officially stock Willard, Enertec, Exide, and high-quality generic batteries for all vehicle makes.",
  },
  {
    question: "Where is your physical store located?",
    answer: "Our physical store is located at **28 St Columb Rd, New Redruth, Alberton, 1450.** We encourage in-store visits for over-the-counter sales and expert service.",
  },
];

const FaqSection = () => {
  const firstColumn = faqItems.slice(0, 4);
  const secondColumn = faqItems.slice(4, 8);

  return (
    <section className="w-full bg-[#121212] border-y border-[#2A2A2A] py-20">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2.2rem,4.5vw,3rem)] font-black tracking-[-1.5px] text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-[#A0A0A0] text-[1.05rem] md:text-[1.15rem] leading-relaxed mt-4 max-w-3xl mx-auto">
            Everything you need to know about our mobile fitment process, warranties, and technical capabilities.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-12 xl:gap-x-20 gap-y-0">
            <div className="w-full">
              {firstColumn.map((item, index) => (
                <details key={`left-${index}`} className="group border-b border-[#2A2A2A] hover:border-[#444444] transition-colors duration-300">
                  <summary className="list-none cursor-pointer py-8 text-[1.1rem] md:text-[1.2rem] font-semibold text-white flex items-center justify-between gap-4 tracking-[-0.3px] group-open:text-[#A0A0A0] group-open:pb-6">
                    <span>{item.question}</span>
                    <span className="relative block h-6 w-6 shrink-0 ml-8">
                      <span className="absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 bg-white group-hover:bg-[#E53935] group-open:bg-[#E53935] transition-colors duration-300" />
                      <span className="absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 bg-white group-hover:bg-[#E53935] group-open:bg-[#E53935] group-open:rotate-45 transition-all duration-300" />
                    </span>
                  </summary>
                  <div className="pb-10 text-[#A0A0A0] text-[1rem] md:text-[1.05rem] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-300">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="w-full">
              {secondColumn.map((item, index) => (
                <details key={`right-${index}`} className="group border-b border-[#2A2A2A] hover:border-[#444444] transition-colors duration-300">
                  <summary className="list-none cursor-pointer py-8 text-[1.1rem] md:text-[1.2rem] font-semibold text-white flex items-center justify-between gap-4 tracking-[-0.3px] group-open:text-[#A0A0A0] group-open:pb-6">
                    <span>{item.question}</span>
                    <span className="relative block h-6 w-6 shrink-0 ml-8">
                      <span className="absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 bg-white group-hover:bg-[#E53935] group-open:bg-[#E53935] transition-colors duration-300" />
                      <span className="absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 bg-white group-hover:bg-[#E53935] group-open:bg-[#E53935] group-open:rotate-45 transition-all duration-300" />
                    </span>
                  </summary>
                  <div className="pb-10 text-[#A0A0A0] text-[1rem] md:text-[1.05rem] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-300">
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