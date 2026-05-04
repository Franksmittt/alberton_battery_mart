// src/components/layout/TestimonialSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

// Mock testimonial data (will eventually come from a database or CMS)
const testimonials = [
  {
    quote: "Absolute life-saver! My battery died in Meyersdal and their mobile unit was there in under 30 minutes. Free fitment and alternator test on the spot. Highly recommend!",
    author: "Chris R.",
    source: "Google Review",
    rating: 5,
  },
  {
    quote: "Got a great deal on a Willard EFB battery, much better price than the dealership. The team provided expert advice on why I needed the EFB model for my start/stop car.",
    author: "Nandi M.",
    source: "In-Store Customer",
    rating: 5,
  },
  {
    quote: "Called for a quote on a LiFePO₄ solar battery. The specialist was knowledgeable and didn't push the most expensive option. Excellent service and delivered next day.",
    author: "Zane L.",
    source: "Backup Power Client",
    rating: 4,
  },
];

// Helper component for rating stars
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex space-x-0.5 text-battery">
    {Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'fill-current' : 'fill-muted'}`}
      />
    ))}
  </div>
);

const TestimonialSection = () => {
  return (
    <section className="w-full bg-card py-20">
      <div className="container px-4 md:px-6 lg:px-8 space-y-12">
        
        {/* Section Headline */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
            Trusted by Alberton Drivers and Businesses
          </h2>
           <p className="text-xl text-muted-foreground mt-3">
            What our customers say about our products and service.
          </p>
        </div>

        {/* Grid of Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col h-full p-6 bg-background border-border shadow-lg">
              
              <Quote className="h-6 w-6 text-battery mb-4" />
              
              <CardContent className="flex-grow space-y-4 p-0">
                <StarRating rating={testimonial.rating} />
                
                <p className="text-lg italic text-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </CardContent>
              
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-semibold text-battery">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.source}</p>
              </div>
             </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;