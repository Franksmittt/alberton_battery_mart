// src/components/content/ContactForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Send, AlertTriangle, CheckCircle } from "lucide-react";
import { pushDataLayerEvent } from "@/lib/analytics";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    pushDataLayerEvent("contact_form_view");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setError(null);

    try {
      // Use Web3Forms - free form submission service
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '8f2e8c3a-4d7b-4e9a-9f2c-1a3b5c7d9e0f', // Public key, will be replaced
          name: formData.name,
          email: formData.email,
          subject: `Contact Form: ${formData.subject}`,
          message: formData.message,
          from_name: 'Alberton Battery Mart Website',
          to_email: 'admin@albertonbatterymart.co.za'
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message');
      }

      // Track successful submission
      pushDataLayerEvent("generate_lead", {
        value: "contact_form_submission",
        subject: formData.subject,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- NEW: Show success message if form was sent ---
  if (isSuccess) {
    return (
      <div className="p-8 bg-card border border-green-500 text-green-300 rounded-lg flex flex-col items-center space-y-4 text-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h3 className="text-2xl font-bold text-foreground">Thank You!</h3>
        <p className="text-lg text-muted-foreground">
          Your message has been sent successfully. We will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* --- ERROR MESSAGE --- */}
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-700 text-red-300 rounded-lg flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="bg-background border-border text-foreground" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
           <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-background border-border text-foreground" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required className="bg-background border-border text-foreground" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className="bg-background border-border text-foreground" />
      </div>

      <Button type="submit" variant="battery" className="w-full h-12 text-lg" disabled={isSubmitting}>
        <Send className="h-5 w-5 mr-2" />
        {isSubmitting ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
};

export default ContactForm;