import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { MapPin, Search, X, Check, Compass, Sparkles, Loader2, Navigation } from 'lucide-react';
import { CHENNAI_LOCALITIES, findClosestChennaiLocality, ChennaiLocality } from '../../data/chennaiLocations';

type ZoneFilter = 'All' | 'Popular' | 'Central Chennai' | 'South Chennai' | 'OMR IT Corridor' | 'West Chennai' | 'North Chennai' | 'ECR Coastal';

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, selectedArea, setSelectedArea } = useApp();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState<ZoneFilter>('All');
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isLocationModalOpen) return null;

  const filteredAreas = CHENNAI_LOCALITIES.filter(area => {
    const matchesSearch =
      area.name.toLowerCase().includes(search.toLowerCase()) ||
      area.zone.toLowerCase().includes(search.toLowerCase()) ||
      area.pincode.includes(search);

    if (!matchesSearch) return false;

    if (selectedZone === 'All') return true;
    if (selectedZone === 'Popular') return Boolean(area.popular);
    return area.zone === selectedZone;
  });

  const handleSelect = (areaName: string) => {
    const fullLoc = `${areaName}, Chennai`;
    setSelectedArea(fullLoc);
    setIsLocationModalOpen(false);
    showToast(`Location set to ${areaName}`, 'Showing services available near you in Chennai', 'info');
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation Not Supported', 'Your browser does not support GPS auto-detection. Please pick a locality from the list.', 'warning');
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        let detectedName = '';
        let distanceKm = 0;

        // Try fast reverse geocoding via OpenStreetMap Nominatim
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const candidates = [
              addr.suburb,
              addr.neighbourhood,
              addr.residential,
              addr.city_district,
              addr.quarter,
              addr.village
            ].filter(Boolean) as string[];

            for (const cand of candidates) {
              const matched = CHENNAI_LOCALITIES.find(n =>
                n.name.toLowerCase() === cand.toLowerCase() ||
                n.name.toLowerCase().includes(cand.toLowerCase()) ||
                cand.toLowerCase().includes(n.name.toLowerCase())
              );
              if (matched) {
                detectedName = matched.name;
                break;
              }
            }
          }
        } catch {
          // Gracefully continue to geometric coordinate distance calculation
        }

        // Mathematical fallback: compute shortest geometric distance across all 42 Chennai localities
        if (!detectedName) {
          const closestResult = findClosestChennaiLocality(latitude, longitude);
          detectedName = closestResult.locality.name;
          distanceKm = closestResult.distanceKm;
        }

        setIsDetecting(false);
        handleSelect(detectedName);
        showToast(
          'Location Detected!',
          `Automatically set to ${detectedName}, Chennai${distanceKm > 0 ? ` (~${distanceKm} km)` : ''}`,
          'success'
        );
      },
      (err) => {
        setIsDetecting(false);
        if (err.code === 1) {
          showToast('GPS Permission Denied', 'Please allow browser location permissions to auto-detect, or pick your area below.', 'warning');
        } else {
          showToast('GPS Signal Unavailable', 'Unable to retrieve precise GPS coordinates. Please select your locality below.', 'warning');
        }
      },
      { timeout: 8000, enableHighAccuracy: true, maximumAge: 30000 }
    );
  };

  const ZONES: ZoneFilter[] = [
    'All',
    'Popular',
    'Central Chennai',
    'South Chennai',
    'OMR IT Corridor',
    'West Chennai',
    'North Chennai',
    'ECR Coastal'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-elevated border border-slate-100 relative my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold shadow-2xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Select Chennai Locality</h3>
              <p className="text-xs text-slate-500">Serving 40+ areas across Chennai & Greater Chennai</p>
            </div>
          </div>
          {selectedArea ? (
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <div className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black rounded-lg uppercase tracking-wider">
              Required
            </div>
          )}
        </div>

        {/* Search input */}
        <div className="mt-4 relative shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search Chennai area or pincode (e.g. Velachery, 600042)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white text-sm font-semibold rounded-2xl py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-2xs"
            autoFocus
          />
        </div>

        {/* Current Location Quick Option */}
        <button
          onClick={handleUseCurrentLocation}
          disabled={isDetecting}
          className="w-full mt-3 p-3 rounded-2xl border border-dashed border-brand-300 bg-brand-50/70 hover:bg-brand-100/70 text-brand-700 flex items-center justify-between transition-all text-xs font-bold group cursor-pointer shrink-0 disabled:opacity-75"
        >
          <div className="flex items-center gap-2.5">
            {isDetecting ? (
              <Loader2 className="w-4 h-4 text-brand-600 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
            )}
            <span>
              {isDetecting ? 'Detecting your exact locality via GPS...' : 'Auto-Detect Current Location in Chennai'}
            </span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider bg-brand-600 text-white px-2.5 py-1 rounded-lg shadow-2xs">
            {isDetecting ? 'Detecting...' : 'GPS Auto'}
          </span>
        </button>

        {/* Zone Filter Chips */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none shrink-0">
          {ZONES.map(zone => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedZone === zone
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Locality list */}
        <div className="mt-3 flex-1 overflow-y-auto divide-y divide-slate-100 pr-1 space-y-1">
          {filteredAreas.map((area) => {
            const isSelected = selectedArea.startsWith(area.name);
            return (
              <button
                key={area.name}
                onClick={() => handleSelect(area.name)}
                className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-left transition-colors text-xs cursor-pointer ${
                  isSelected ? 'bg-brand-50 font-black text-brand-700' : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-slate-900">{area.name}</p>
                    {area.popular && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {area.zone}, Chennai • {area.pincode}
                  </p>
                </div>
                {isSelected ? (
                  <Check className="w-4 h-4 text-brand-600" />
                ) : (
                  <span className="text-[11px] text-slate-400 font-semibold hover:text-brand-600">Select</span>
                )}
              </button>
            );
          })}

          {filteredAreas.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs font-semibold">
              No matching Chennai localities found for "{search}".
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium shrink-0">
          <span>Showing {filteredAreas.length} of {CHENNAI_LOCALITIES.length} Chennai localities</span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live in Chennai
          </span>
        </div>

      </div>
    </div>
  );
};
