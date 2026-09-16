import { DRIVE_IN_STEPS } from "@/data/drive-in";

type DriveInProcessProps = {
  heading?: string;
  intro?: string;
};

export function DriveInProcess({
  heading = "Drive in — fastest way to a fitted battery",
  intro = "Walk-ins welcome during trading hours. Mobile callouts exist if the car cannot reach New Redruth — the shop floor is still the quickest option.",
}: DriveInProcessProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold tracking-tight mb-3">{heading}</h2>
        <p className="text-[var(--brand-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
          {intro}
        </p>
      </div>

      <div className="relative flex justify-between max-[800px]:flex-col max-[800px]:gap-12">
        <div className="absolute top-[30px] left-[8%] right-[8%] h-[2px] bg-[var(--brand-border)] z-0 max-[800px]:top-0 max-[800px]:bottom-0 max-[800px]:left-1/2 max-[800px]:right-auto max-[800px]:h-full max-[800px]:w-[2px] max-[800px]:-translate-x-1/2" />
        {DRIVE_IN_STEPS.map((step, index) => (
          <div key={step.title} className="flex-1 text-center px-3 relative z-10">
            <div className="w-[60px] h-[60px] rounded-full border-2 border-[var(--brand-accent)] bg-[var(--brand-bg)] text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-6 shadow-[0_0_0_10px_var(--brand-bg)]">
              {index + 1}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-[var(--brand-muted)] text-[0.95rem] leading-relaxed">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
