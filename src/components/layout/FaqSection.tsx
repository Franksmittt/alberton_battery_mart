// src/components/layout/FaqSection.tsx
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  // Split the 8 questions into two arrays of 4 each
  const firstColumn = faqItems.slice(0, 4);
  const secondColumn = faqItems.slice(4, 8);

  return (
    // --- THEME FIX: Changed bg-white to bg-card and added border-y for visual separation ---
    <section className="w-full bg-card border-y border-border py-20"> 
      <div className="container px-4 md:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          {/* --- THEME FIX: Changed text-black to text-foreground --- */}
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
            Questions & Answers
          </h2>
          {/* --- THEME FIX: Changed text-gray-700 to text-muted-foreground --- */}
          <p className="text-xl text-muted-foreground mt-3">
            Your instant answers to the most common battery problems.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Grid for 2 Columns (4 rows deep) */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            
            {/* Column 1 */}
            <Accordion type="single" collapsible className="w-full">
             {firstColumn.map((item, index) => (
                // --- THEME FIX: Changed border-gray-300 to border-border ---
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border"> 
                  {/* --- THEME FIX: Changed text-black to text-foreground --- */}
                  <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-battery">
                    {item.question}
                  </AccordionTrigger>
                   {/* --- THEME FIX: Changed text-gray-700 to text-muted-foreground --- */}
                   <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
             
            {/* Column 2 */}
            <Accordion type="single" collapsible className="w-full">
              {secondColumn.map((item, index) => (
                // --- THEME FIX: Changed border-gray-300 to border-border ---
                <AccordionItem key={index} value={`item-${index + 4}`} className="border-b border-border"> 
                  {/* --- THEME FIX: Changed text-black to text-foreground --- */}
                  <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-battery">
                    {item.question}
                  </AccordionTrigger>
                  {/* --- THEME FIX: Changed text-gray-700 to text-muted-foreground --- */}
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                 </AccordionItem>
              ))}
            </Accordion>

          </div>
        </div>
        
        {/* Lead Generation Hook: CTA after FAQ */}
        <div className="text-center pt-10">
          {/* --- THEME FIX: Changed text-black to text-foreground --- */}
          <p className="text-lg text-foreground mb-4">
             Still have questions? Talk directly to a certified technician:
          </p>
          <Button asChild size="lg" variant="battery" className="shadow-lg">
            <a href="tel:0101096211">Call Us Now for Expert Advice</a>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;