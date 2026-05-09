"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock3, ShieldCheck } from "lucide-react";

const trustSignals = [
  { icon: ShieldCheck, title: "Up to 36-Month Warranty" },
  { icon: Clock3, title: "60-Minute Average Response" },
  { icon: CheckCircle2, title: "Free On-Site Midtronics Diagnostics" },
];

export default function MobileTrustRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trustSignals.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeSignal = trustSignals[activeIndex];
  const ActiveIcon = activeSignal.icon;

  return (
    <div className="min-[901px]:hidden px-4 py-5">
      <div className="flex items-center justify-center gap-3 text-center text-[var(--brand-muted-3)] font-semibold text-[0.95rem] tracking-[0.3px]">
        <ActiveIcon className="h-6 w-6 text-[var(--brand-success)] shrink-0" strokeWidth={2.5} />
        <span>{activeSignal.title}</span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        {trustSignals.map((signal, index) => (
          <span
            key={signal.title}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-[var(--brand-success)]" : "bg-[var(--brand-border)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
