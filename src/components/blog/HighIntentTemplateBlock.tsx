type HighIntentVariant =
  | "problem-diagnosis"
  | "battery-comparison"
  | "local-emergency-guide";

type HighIntentTemplateBlockProps = {
  variant: HighIntentVariant;
  areaName?: string;
};

const BLOCK_CONTENT: Record<
  HighIntentVariant,
  {
    title: string;
    intro: string;
    bullets: string[];
    close: string;
  }
> = {
  "problem-diagnosis": {
    title: "Fast Diagnosis Checklist Before You Replace",
    intro:
      "Use this practical sequence to avoid replacing the wrong part and wasting money.",
    bullets: [
      "Confirm battery age and recent cranking behavior before deciding on replacement.",
      "Check terminal tightness and corrosion; connection faults can mimic battery failure.",
      "Run a charging-system check to rule out alternator undercharge or overcharge.",
      "Validate starter draw so repeated no-start issues are not misdiagnosed as battery-only.",
    ],
    close:
      "A full battery + alternator + starter check gives the safest replacement decision.",
  },
  "battery-comparison": {
    title: "How To Compare Battery Options Properly",
    intro:
      "Do not compare by price only. Compare by fitment requirements and total lifecycle cost.",
    bullets: [
      "Match required technology first (standard, EFB, AGM) to your vehicle electronics.",
      "Check capacity and CCA against OEM recommendations, not just physical size.",
      "Compare warranty terms and fitment quality, not only shelf price.",
      "Prioritize batteries that align with your driving pattern and electrical load.",
    ],
    close:
      "The right battery is the one that matches vehicle spec and usage profile, then budget.",
  },
  "local-emergency-guide": {
    title: "Local Emergency Playbook",
    intro:
      "If you are stranded, follow this order to get moving quickly and safely.",
    bullets: [
      "Stop in a safe spot, switch hazards on, and avoid repeated crank attempts.",
      "Share your exact pin and vehicle details for faster dispatch and correct stock selection.",
      "Request a diagnostics-first callout so alternator and starter faults are verified on-site.",
      "Confirm warranty documentation and fitment details before leaving the vehicle.",
    ],
    close:
      "For emergencies in and around Alberton, dispatch speed improves when location and vehicle details are shared immediately.",
  },
};

export default function HighIntentTemplateBlock({
  variant,
  areaName = "Alberton",
}: HighIntentTemplateBlockProps) {
  const block = BLOCK_CONTENT[variant];

  return (
    <section className="mt-8 rounded-xl border border-border bg-card p-6">
      <h2 className="text-2xl font-bold text-foreground">{block.title}</h2>
      <p className="mt-3 text-muted-foreground">
        {block.intro} Area focus: {areaName}.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground/90">
        {block.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">{block.close}</p>
    </section>
  );
}
