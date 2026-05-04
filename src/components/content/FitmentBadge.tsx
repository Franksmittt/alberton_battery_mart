'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function FitmentBadge() {
  const [vehicle, setVehicle] = React.useState<{ year: string; make: string; model: string } | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('selectedVehicle');
      if (stored) {
        try {
          setVehicle(JSON.parse(stored));
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, []);

  if (!vehicle) return null;

  return (
    <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-2 border-emerald-500/50 flex items-center gap-3">
      <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-bold text-white">
          ✅ This fits your {vehicle.year} {vehicle.make} {vehicle.model}
        </p>
        <p className="text-xs text-white/70 mt-1">
          Verified compatibility. Ready for professional installation.
        </p>
      </div>
    </div>
  );
}

