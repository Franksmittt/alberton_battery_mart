'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Search, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type BatteryRecommendation = {
  battery_code: string;
  replacement_type: string;
  technology: string;
  description: string;
  image_link: string;
  brand_options?: BrandOption[];
};

type BrandOption = {
  id: number;
  name: string;
  brand_name: string;
  sku: string;
  category: string;
  price: string;
  warranty_months: number;
  ah_capacity: number;
  cca: number;
  technology: string;
  product_url: string;
  image_path: string;
};

const DEFAULT_VEHICLE_TYPES = [
  'Passenger & SUV',
  'Commercial',
  'Light Commercial',
  'Tractors',
];

interface YMMSearchWidgetProps {
  variant?: 'hero' | 'compact';
  onVehicleSelect?: (vehicle: {
    vehicleType: string;
    manufacturer: string;
    year: string;
    model: string;
  }) => void;
}

export function YMMSearchWidget({ variant = 'hero', onVehicleSelect }: YMMSearchWidgetProps) {
  const [vehicleType, setVehicleType] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<BatteryRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchItems = async (url: string): Promise<string[]> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed request: ${response.status}`);
    const payload = await response.json();
    return payload.items || [];
  };

  useEffect(() => {
    setOptionsLoading(true);
    fetchItems('/api/willard-fitment?level=vehicle-types')
      .then((items) => {
        setVehicleTypes(items.length ? items : DEFAULT_VEHICLE_TYPES);
      })
      .catch(() => {
        setVehicleTypes(DEFAULT_VEHICLE_TYPES);
        setError('Live fitment API failed. Using fallback vehicle types.');
      })
      .finally(() => setOptionsLoading(false));
  }, []);

  const handleVehicleTypeChange = async (value: string) => {
    setVehicleType(value);
    setManufacturer('');
    setYear('');
    setModel('');
    setManufacturers([]);
    setYears([]);
    setModels([]);
    setRecommendations([]);
    setError('');
    if (!value) return;
    try {
      setOptionsLoading(true);
      const items = await fetchItems(
        `/api/willard-fitment?level=manufacturers&vehicleType=${encodeURIComponent(value)}`
      );
      setManufacturers(items);
      if (!items.length) {
        setError(`No manufacturers loaded yet for "${value}".`);
      }
    } catch {
      setError('Could not load manufacturers for the selected vehicle type.');
    } finally {
      setOptionsLoading(false);
    }
  };

  const handleManufacturerChange = async (value: string) => {
    setManufacturer(value);
    setYear('');
    setModel('');
    setYears([]);
    setModels([]);
    setRecommendations([]);
    setError('');
    if (!value || !vehicleType) return;
    try {
      setOptionsLoading(true);
      const items = await fetchItems(
        `/api/willard-fitment?level=years&vehicleType=${encodeURIComponent(
          vehicleType
        )}&manufacturer=${encodeURIComponent(value)}`
      );
      setYears(items);
    } catch {
      setError('Could not load years for the selected manufacturer.');
    } finally {
      setOptionsLoading(false);
    }
  };

  const handleYearChange = async (value: string) => {
    setYear(value);
    setModel('');
    setModels([]);
    setRecommendations([]);
    setError('');
    if (!value || !vehicleType || !manufacturer) return;
    try {
      setOptionsLoading(true);
      const items = await fetchItems(
        `/api/willard-fitment?level=models&vehicleType=${encodeURIComponent(
          vehicleType
        )}&manufacturer=${encodeURIComponent(manufacturer)}&year=${encodeURIComponent(value)}`
      );
      setModels(items);
    } catch {
      setError('Could not load models for the selected year.');
    } finally {
      setOptionsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (vehicleType && manufacturer && year && model) {
      const vehicle = { vehicleType, manufacturer, year, model };
      setLoading(true);
      setError('');
      try {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
        }
        if (onVehicleSelect) {
          onVehicleSelect(vehicle);
        }

        const response = await fetch(
          `/api/willard-fitment?level=batteries&vehicleType=${encodeURIComponent(
            vehicleType
          )}&manufacturer=${encodeURIComponent(manufacturer)}&year=${encodeURIComponent(
            year
          )}&model=${encodeURIComponent(model)}`
        );
        if (!response.ok) throw new Error('Failed to load recommendations');
        const payload = await response.json();
        setRecommendations(payload.items || []);
      } catch {
        setError('Could not load battery recommendations right now.');
      } finally {
        setLoading(false);
      }
    }
  };

  const isComplete = vehicleType && manufacturer && year && model;

  if (variant === 'compact') {
    return (
      <Card className="w-full bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border border-white/10 text-white">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <label htmlFor="compact-vt" className="sr-only">Vehicle Type</label>
              <select
                id="compact-vt"
                value={vehicleType}
                onChange={(e) => handleVehicleTypeChange(e.target.value)}
                aria-label="Select vehicle type"
                className="h-12 px-4 rounded-md border border-white/20 bg-white/5 text-white focus:border-battery focus:outline-none w-full"
              >
                <option value="">Vehicle Type</option>
                {vehicleTypes.map((item) => (
                  <option key={item} value={item} className="bg-[#060606]">{item}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="compact-manufacturer" className="sr-only">Manufacturer</label>
              <select
                id="compact-manufacturer"
                value={manufacturer}
                onChange={(e) => handleManufacturerChange(e.target.value)}
                disabled={!vehicleType}
                aria-label="Select manufacturer"
                className="h-12 px-4 rounded-md border border-white/20 bg-white/5 text-white focus:border-battery focus:outline-none w-full"
              >
                <option value="">
                  {vehicleType ? 'Manufacturer' : 'Select Vehicle Type First'}
                </option>
                {manufacturers.map((item) => (
                  <option key={item} value={item} className="bg-[#060606]">{item}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="compact-year" className="sr-only">Year Model</label>
              <select
                id="compact-year"
                value={year}
                onChange={(e) => handleYearChange(e.target.value)}
                disabled={!manufacturer}
                aria-label="Select year model"
                className="h-12 px-4 rounded-md border border-white/20 bg-white/5 text-white focus:border-battery focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                <option value="">
                  {manufacturer ? 'Year Model' : 'Select Manufacturer First'}
                </option>
                {years.map((item) => (
                  <option key={item} value={item} className="bg-[#060606]">{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="compact-model" className="sr-only">Model</label>
              <select
                id="compact-model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!year}
                aria-label="Select model"
                className="h-12 px-4 rounded-md border border-white/20 bg-white/5 text-white focus:border-battery focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                <option value="">
                  {year ? 'Model' : 'Select Year Model First'}
                </option>
                {models.map((item) => (
                  <option key={item} value={item} className="bg-[#060606]">{item}</option>
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
              {loading ? 'Loading...' : 'Find Battery'}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label htmlFor="hero-vt" className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              Vehicle Type
            </label>
            <select
              id="hero-vt"
              value={vehicleType}
              onChange={(e) => handleVehicleTypeChange(e.target.value)}
              aria-label="Select vehicle type"
              className="w-full h-14 px-4 rounded-lg border border-white/20 bg-white/5 text-white text-lg font-medium focus:border-battery focus:ring-2 focus:ring-battery/20 focus:outline-none transition-all"
            >
              <option value="" className="bg-[#060606]">Select Vehicle Type</option>
              {vehicleTypes.map((item) => (
                <option key={item} value={item} className="bg-[#060606]">{item}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="hero-manufacturer" className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              Manufacturer
            </label>
            <select
              id="hero-manufacturer"
              value={manufacturer}
              onChange={(e) => handleManufacturerChange(e.target.value)}
              aria-label="Select manufacturer"
              disabled={!vehicleType}
              className="w-full h-14 px-4 rounded-lg border border-white/20 bg-white/5 text-white text-lg font-medium focus:border-battery focus:ring-2 focus:ring-battery/20 focus:outline-none transition-all"
            >
              <option value="" className="bg-[#060606]">
                {vehicleType ? 'Select Manufacturer' : 'Select Vehicle Type First'}
              </option>
              {manufacturers.map((item) => (
                <option key={item} value={item} className="bg-[#060606]">{item}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="hero-year" className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              Year Model
            </label>
            <select
              id="hero-year"
              value={year}
              onChange={(e) => handleYearChange(e.target.value)}
              aria-label="Select year model"
              disabled={!manufacturer}
              className="w-full h-14 px-4 rounded-lg border border-white/20 bg-white/5 text-white text-lg font-medium focus:border-battery focus:ring-2 focus:ring-battery/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-[#060606]">
                {manufacturer ? 'Select Year Model' : 'Select Manufacturer First'}
              </option>
              {years.map((item) => (
                <option key={item} value={item} className="bg-[#060606]">{item}</option>
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
              disabled={!year}
              aria-label="Select vehicle model"
              className={cn(
                "w-full h-14 px-4 rounded-lg border text-white text-lg font-medium focus:border-battery focus:ring-2 focus:ring-battery/20 focus:outline-none transition-all",
                !year
                  ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed" 
                  : "border-white/20 bg-white/5"
              )}
            >
              <option value="" className="bg-[#060606]">
                {year ? 'Select Model' : 'Select Year Model First'}
              </option>
              {models.map((item) => (
                <option key={item} value={item} className="bg-[#060606]">{item}</option>
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
          {loading ? 'Finding Batteries...' : 'Find My Battery'}
        </Button>

        {error && (
          <p className="text-red-400 text-sm font-medium">{error}</p>
        )}

        {optionsLoading && (
          <p className="text-white/70 text-sm font-medium">Loading selector options...</p>
        )}

        {recommendations.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-bold text-white">Recommended Size & Brand Options</h3>
            <div className="grid gap-3">
              {recommendations.map((rec) => (
                <div
                  key={`${rec.battery_code}-${rec.replacement_type}-${rec.technology}`}
                  className="rounded-lg border border-white/15 bg-white/5 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block rounded bg-battery/20 px-2 py-1 text-sm font-bold text-battery">
                      {rec.battery_code}
                    </span>
                    {rec.replacement_type && (
                      <span className="inline-block rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white/90">
                        {rec.replacement_type}
                      </span>
                    )}
                    {rec.technology && (
                      <span className="inline-block rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white/90">
                        {rec.technology}
                      </span>
                    )}
                  </div>
                  {rec.description && (
                    <p className="text-sm text-white/80 mt-3">{rec.description}</p>
                  )}

                  {rec.brand_options && rec.brand_options.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-semibold text-white/90">
                        Available brands for size {rec.battery_code}:
                      </p>
                      <div className="grid gap-2">
                        {rec.brand_options.map((option) => (
                          <a
                            key={`${rec.battery_code}-${option.id}`}
                            href={option.product_url}
                            className="block rounded border border-white/15 bg-white/5 px-3 py-2 hover:border-battery/60 transition-colors"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-bold text-battery">{option.brand_name}</span>
                                <span className="text-sm text-white/90">{option.sku}</span>
                                <span className="text-xs text-white/70">{option.technology}</span>
                              </div>
                              <span className="text-sm font-semibold text-white">{option.price}</span>
                            </div>
                            <p className="text-xs text-white/65 mt-1">
                              {option.ah_capacity}Ah | {option.cca} CCA | {option.warranty_months} month warranty
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
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

