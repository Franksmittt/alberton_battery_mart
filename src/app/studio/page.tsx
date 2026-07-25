import Link from "next/link";

export default function StudioHubPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-red-300">Private Studio</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Alberton Battery Mart Studio
          </h1>
          <p className="text-slate-300 max-w-3xl text-lg">
            Pitch tools only. Marketing Stories generate Instagram/WhatsApp cards from live
            catalog products. Site A/B/C pickers can be layered next without changing the public
            homepage until locked.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/studio/marketing"
            className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 hover:border-red-500 transition-colors"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-red-300">Ready</p>
            <h2 className="text-2xl font-black mt-2">Product Marketing Stories</h2>
            <p className="text-slate-300 mt-3">
              Pick a battery, pick a template, download a 1080×1920 PNG for Stories / WhatsApp.
            </p>
          </Link>

          <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/40 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Next</p>
            <h2 className="text-2xl font-black mt-2">Site Studio A/B/C</h2>
            <p className="text-slate-300 mt-3">
              Header / hero / trust / footer pickers with locked.ts for go-live. Marketing Stories
              do not affect the public site.
            </p>
          </div>
        </div>

        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-3">
          <h2 className="text-xl font-bold">Client one-liner</h2>
          <p className="text-slate-300">
            Site studio = choose how the dealership website looks (locked for go-live).
            <br />
            Story studio = pick a battery, pick a look, download a Story, post tonight.
          </p>
        </section>
      </div>
    </main>
  );
}
