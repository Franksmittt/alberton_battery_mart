'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Search, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Simplified vehicle data - in production, this would come from ACES database
const YEARS = Array.from({ length: 25 }, (_, i) => 2024 - i);
const MAKES = [
  'Toyota', 'Ford', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi',
  'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Honda', 'Suzuki', 'Opel',
  'Renault', 'Peugeot', 'Land Rover', 'Jeep', 'Mitsubishi', 'Isuzu'
];

// Basic model mapping - in production, this would be a full ACES database
const MODELS_BY_MAKE: Record<string, string[]> = {
  'Toyota': ['Hilux', 'Fortuner', 'Corolla', 'Yaris', 'Land Cruiser', 'Prado', 'Rav4', 'Camry'],
  'Ford': ['Ranger', 'Everest', 'Figo', 'EcoSport', 'Fiesta', 'Focus'],
  'Volkswagen': ['Polo', 'Polo Vivo', 'Amarok', 'Golf', 'Tiguan', 'Passat'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', '1 Series'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class'],
  'Audi': ['A3', 'A4', 'Q3', 'Q5', 'Q7'],
  'Nissan': ['NP200', 'Navara', 'X-Trail', 'Qashqai', 'Almera'],
  'Hyundai': ['Grand i10', 'i20', 'Tucson', 'Creta', 'Kona'],
  'Kia': ['Picanto', 'Rio', 'Sportage', 'Seltos'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'BR-V'],
  'Suzuki': ['Swift', 'Vitara', 'Jimny', 'SX4'],
  'Opel': ['Corsa', 'Astra', 'Crossland'],
  'Renault': ['Clio', 'Sandero', 'Duster', 'Koleos'],
  'Peugeot': ['208', '308', '3008'],
  'Land Rover': ['Discovery', 'Range Rover Sport', 'Defender'],
  'Jeep': ['Wrangler', 'Cherokee', 'Grand Cherokee'],
  'Mitsubishi': ['Triton', 'Pajero', 'Outlander'],
  'Isuzu': ['KB', 'D-Max', 'MU-X']
};

interface YMMSearchWidgetProps {
  variant?: 'hero' | 'compact';
  onVehicleSelect?: (vehicle: { year: string; make: string; model: string }) => void;
}

export function YMMSearchWidget({ variant = 'hero', onVehicleSelect }: YMMSearchWidgetProps) {
  const router = useRouter();
  const [year, setYear] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const handleMakeChange = (selectedMake: string) => {
    setMake(selectedMake);
    setModel(''); // Reset model when make changes
    setAvailableModels(MODELS_BY_MAKE[selectedMake] || []);
  };

  const handleSearch = () => {
    if (year && make && model) {
      const vehicle = { year, make, model };
      
      // Store in sessionStorage for "My Garage" functionality
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
      }
      
      // Call callback if provided
      if (onVehicleSelect) {
        onVehicleSelect(vehicle);
      }
      
      // Navigate to vehicle-specific page or filtered results
      const searchQuery = `${year} ${make} ${model}`;
      router.push(`/products/results?q=${encodeURIComponent(searchQuery)}&vehicle=${encodeURIComponent(`${year}-${make}-${model}`)}`);
    }
  };

  const isComplete = year && make && model;

  if (variant === 'compact') {
    return (
      <Card className="w-full bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border border-white/10 text-white">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label htmlFor="compact-year" className="sr-only">Vehicle Year</label>
              <select
                id="compact-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                aria-label="Select vehicle year"
                className="h-12 px-4 rounded-md border border-white/20 bg-white/5 text-white focus:border-battery focus:outline-none w-full"
              >
                <option value="">Year</option>
                {YEARS.map(y => (
                  <option key={y} value={y.toString()} className="bg-[#060606]">{y}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="compact-make" className="sr-only">Vehicle Make</label>
              <select
                id="compact-make"
                value={make}
                onChange={(e) => handleMakeChange(e.target.value)}
                aria-label="Select vehicle make"
                className="h-12 px-4 rounded-md border border-white/20 bg-white/5 text-white focus:border-battery focus:outline-none w-full"
              >
                <option value="">Make</option>
                {MAKES.map(m => (
                  <option key={m} value={m} className="bg-[#060606]">{m}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="compact-model" className="sr-only">Vehicle Model</label>
              <select
                id="compact-model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!make}
                aria-label="Select vehicle model"
                className="h-12 px-4 rounded-md border border-white/20 bg-white/5 text-white focus:border-battery focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                <option value="">Model</option>
                {availableModels.map(m => (
                  <option key={m} value={m} className="bg-[#060606]">{m}</option>
                ))}
              </select>
            </div>
            
            <Button
              onClick={handleSearch}
              disabled={!isComplete}
              variant="battery"
              size="lg"
              className="w-full h-12 font-bold"
            >
              <Search className="h-5 w-5 mr-2" />
              Find Battery
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Hero variant - full featured
  return (
    <Card className="w-full max-w-4xl mx-auto border border-white/10 bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] text-white shadow-[0_12px_35px_rgba(0,0,0,0.45)]">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Car className="h-8 w-8 text-battery" />
          <CardTitle className="text-3xl md:text-4xl font-black text-white">
            Find the Right Battery. <span className="text-battery">Instantly.</span>
          </CardTitle>
        </div>
        <p className="text-muted-foreground text-lg">
          Enter your vehicle details to see compatible batteries
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="hero-year" className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              Year
            </label>
            <select
              id="hero-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              aria-label="Select vehicle year"
              className="w-full h-14 px-4 rounded-lg border border-white/20 bg-white/5 text-white text-lg font-medium focus:border-battery focus:ring-2 focus:ring-battery/20 focus:outline-none transition-all"
            >
              <option value="" className="bg-[#060606]">Select Year</option>
              {YEARS.map(y => (
                <option key={y} value={y.toString()} className="bg-[#060606]">{y}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="hero-make" className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              Make
            </label>
            <select
              id="hero-make"
              value={make}
              onChange={(e) => handleMakeChange(e.target.value)}
              aria-label="Select vehicle make"
              className="w-full h-14 px-4 rounded-lg border border-white/20 bg-white/5 text-white text-lg font-medium focus:border-battery focus:ring-2 focus:ring-battery/20 focus:outline-none transition-all"
            >
              <option value="" className="bg-[#060606]">Select Make</option>
              {MAKES.map(m => (
                <option key={m} value={m} className="bg-[#060606]">{m}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="hero-model" className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              Model
            </label>
            <select
              id="hero-model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!make}
              aria-label="Select vehicle model"
              className={cn(
                "w-full h-14 px-4 rounded-lg border text-white text-lg font-medium focus:border-battery focus:ring-2 focus:ring-battery/20 focus:outline-none transition-all",
                !make 
                  ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed" 
                  : "border-white/20 bg-white/5"
              )}
            >
              <option value="" className="bg-[#060606]">
                {make ? 'Select Model' : 'Select Make First'}
              </option>
              {availableModels.map(m => (
                <option key={m} value={m} className="bg-[#060606]">{m}</option>
              ))}
            </select>
          </div>
        </div>
        
        <Button
          onClick={handleSearch}
          disabled={!isComplete}
          variant="battery"
          size="xl"
          className="w-full h-16 text-xl font-black shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap className="h-6 w-6 mr-3" />
          Find My Battery
        </Button>
        
        <div className="flex items-center justify-center gap-6 pt-2 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-battery" />
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-battery" />
            <span>Guaranteed Fitment</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

