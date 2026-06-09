// src/components/content/ContactForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Send, AlertTriangle, CheckCircle } from "lucide-react";
import { pushDataLayerEvent } from "@/lib/analytics";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    pushDataLayerEvent("contact_form_view");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setIsSuccess(false);
    setError(null);

    if (!WEB3FORMS_ACCESS_KEY) {
      setError("Contact form is not configured. Please call us directly.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(form);
      const subject = String(formData.get("subject") || "Website enquiry");
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.set("subject", `Contact Form: ${subject}`);
      formData.append("from_name", "Alberton Battery Mart Website");
      formData.append("to_email", "admin@albertonbatterymart.co.za");

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message');
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "generate_lead" });

      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-track-skip-form-submit="true" className="space-y-5">
      {error && (
        <div className="flex items-start gap-3 border border-red-500/60 bg-red-950/35 p-4 text-red-100">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em]">Request failed</p>
            <p className="mt-1 text-sm font-medium text-red-100/80">{error}</p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="flex items-start gap-3 border border-[var(--brand-success)]/70 bg-[var(--brand-success)]/12 p-4 text-white">
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-[var(--brand-success)]" />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em]">Request sent</p>
            <p className="mt-1 text-sm font-medium text-white/70">
              We have received your message and will respond shortly.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Full name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="h-14 rounded-none border-white/15 bg-black/30 text-base font-semibold text-white placeholder:text-white/28 focus-visible:ring-[var(--brand-accent)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-14 rounded-none border-white/15 bg-black/30 text-base font-semibold text-white placeholder:text-white/28 focus-visible:ring-[var(--brand-accent)]"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Phone number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="010 109 6211"
          className="h-14 rounded-none border-white/15 bg-black/30 text-base font-semibold text-white placeholder:text-white/28 focus-visible:ring-[var(--brand-accent)]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Subject</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Battery quote, mobile callout, fleet enquiry..."
          className="h-14 rounded-none border-white/15 bg-black/30 text-base font-semibold text-white placeholder:text-white/28 focus-visible:ring-[var(--brand-accent)]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell us your vehicle, battery code, location, and urgency."
          className="rounded-none border-white/15 bg-black/30 text-base font-semibold text-white placeholder:text-white/28 focus-visible:ring-[var(--brand-accent)]"
        />
      </div>

      <Button
        type="submit"
        variant="battery"
        className="h-14 w-full rounded-none bg-[var(--brand-accent)] text-base font-black uppercase tracking-[0.12em] text-white hover:bg-[var(--brand-accent-hover)]"
        disabled={isSubmitting}
      >
        <Send className="h-5 w-5 mr-2" />
        {isSubmitting ? "Sending Request..." : "Send Request"}
      </Button>
    </form>
  );
};

export default ContactForm;