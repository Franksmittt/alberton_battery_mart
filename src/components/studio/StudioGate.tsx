"use client";

import { FormEvent, useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { STUDIO_SESSION_KEY, STUDIO_SOFT_PASSWORD } from "@/lib/studio-auth";

export default function StudioGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(STUDIO_SESSION_KEY);
      if (saved === "1") setAuthenticated(true);
    } catch {
      // ignore storage failures
    }
    setReady(true);
  }, []);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (password === STUDIO_SOFT_PASSWORD) {
      setAuthenticated(true);
      setError("");
      try {
        window.sessionStorage.setItem(STUDIO_SESSION_KEY, "1");
      } catch {
        // ignore storage failures
      }
      return;
    }
    setError("Invalid password");
  };

  if (!ready) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-300">Loading studio…</p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md border border-white/10 bg-slate-900/80 backdrop-blur rounded-xl p-6 space-y-6 shadow-2xl">
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-red-300">
              Alberton Battery Mart
            </p>
            <h1 className="text-3xl font-black">Studio Login</h1>
            <p className="text-sm text-slate-300">
              Private pitch tools for product Stories and site experiments.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-200">
              Password
              <div className="relative mt-2">
                <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-md border border-white/20 bg-slate-950 px-10 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter studio password"
                />
              </div>
            </label>
            {error ? <p className="text-red-400 text-sm">{error}</p> : null}
            <button
              type="submit"
              className="w-full h-11 rounded-md bg-red-600 hover:bg-red-500 transition-colors font-bold"
            >
              Open Studio
            </button>
          </form>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
