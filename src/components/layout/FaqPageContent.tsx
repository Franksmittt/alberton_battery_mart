// src/components/layout/FaqPageContent.tsx
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FaqSchema from "@/components/seo/FaqSchema";

// --- CONTACT DETAILS (Lead Gen) ---
const PRIMARY_PHONE = "0101096211";
const EMAIL_ADDRESS = "info@albertonbatterymart.co.za";

// Highly relevant, objection-handling questions (8 total)
const faqItems = [
  {
    question: "Can I walk in without an appointment?",
    answer: "Yes. Drive in to **28 St Columb Rd, New Redruth** during trading hours. Phones are answered from 07:30 on weekdays; the shop floor opens at 08:00. Saturday 08:00–12:00.",
  },
  {
    question: "How long is the warranty period on your batteries?",
    answer: "Up to **36 months** on premium Willard EFB and Enertec AGM. Standard automotive batteries start at 12 months. The period is on the invoice and registered at fitment.",
  },
  {
    question: "Do you stock batteries for Start/Stop (EFB & AGM) vehicles?",
    answer: "Yes. We stock **EFB and AGM** for start-stop cars and code BMW, Mercedes, and Audi systems when the vehicle requires it.",
  },
  {
    question: "Is the mobile callout service free?",
    answer: "Callout includes a travel fee. **Testing and fitment are free.** You pay for the battery plus the callout. The shop floor is still the fastest option if the car can get to New Redruth.",
  },
  {
    question: "How do I know if my alternator is faulty?",
    answer: "If a battery keeps dying after replacement, the charging system is the suspect. We run a **free Midtronics alternator test** with every job.",
  },
  {
    question: "Which brands do you stock, and why?",
    answer: "Willard, Exide, and Enertec (named manufacturers) plus Power Plus and Eco Plus. We are independent, so the recommendation can match the car instead of a single house brand.",
  },
  {
    question: "Do you take the old battery?",
    answer: "Yes. Scrap exchange is part of a fitted replacement. We recycle the old unit. See the recycle page if you only need drop-off.",
  },
  {
    question: "Where is your physical store located?",
    answer: `**28 St Columb Rd, New Redruth, Alberton, 1450.** One turn off Voortrekker Road. Park at the shopfront.`,
  },
];


const FaqPageContent = () => {
  // Split the 8 questions into two arrays of 4 each for the desktop 2-column view
  const firstColumn = faqItems.slice(0, 4);
  const secondColumn = faqItems.slice(4, 8);

  return (
    // --- THEME FIX: Changed bg-white to bg-background ---
    <section className="w-full bg-background py-16" data-chunk-boundary="true"> 

      <FaqSchema items={faqItems} id="faq-page-schema" />
      
       <div className="container px-4 md:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          {/* --- THEME FIX: Changed text-black to text-foreground --- */}
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions (FAQ)
          </h1>
          {/* --- THEME FIX: Changed text-gray-700 to text-muted-foreground --- */}
          <p className="text-xl text-muted-foreground mt-3">
            Get instant answers from Alberton's battery experts.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Grid for 2 Columns on desktop, stacking on mobile */}
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
        
        {/* --- THEME FIX: Changed bg-gray-300 to bg-border --- */}
        <Separator className="bg-border mt-16 max-w-4xl mx-auto" />

        {/* Lead Generation Hook: Final Contact CTA */}
         <div className="text-center pt-10">
           {/* --- THEME FIX: Changed text-black to text-foreground --- */}
           <h2 className="text-3xl font-extrabold text-foreground mb-4">
            Need Expert Advice or Immediate Service?
           </h2>
          {/* --- THEME FIX: Changed text-gray-700 to text-muted-foreground --- */}
          <p className="text-lg text-muted-foreground mb-6">
            Call us now for a guaranteed quote and fast service booking.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="xl" variant="battery" className="shadow-lg">
              <a href={`tel:${PRIMARY_PHONE}`}>
                <Phone className="h-5 w-5 mr-2" /> Call Now: {PRIMARY_PHONE}
              </a>
            </Button>
           {/* --- THEME FIX: Removed custom black border classes --- */}
             <Button asChild size="xl" variant="outline">
              <a href={`mailto:${EMAIL_ADDRESS}`}>
                <Mail className="h-5 w-5 mr-2" /> Email Inquiry
              </a>
            </Button>
           </div>
        </div>

      </div>
     </section>
  );
};

export default FaqPageContent;