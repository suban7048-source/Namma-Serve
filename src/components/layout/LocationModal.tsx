import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { MapPin, Search, X, Check, Compass, Sparkles } from 'lucide-react';

const CHENNAI_NEIGHBORHOODS = [
  { name: 'Anna Nagar', zone: 'Central Chennai', popular: true },
  { name: 'T. Nagar', zone: 'Central Chennai', popular: true },
  { name: 'Adyar', zone: 'South Chennai', popular: true },
  { name: 'Velachery', zone: 'South Chennai', popular: true },
  { name: 'OMR / Sholinganallur', zone: 'IT Corridor', popular: true },
  { name: 'Mylapore', zone: 'Central Chennai', popular: true },
  { name: 'Alwarpet', zone: 'Central Chennai', popular: false },
  { name: 'Besant Nagar', zone: 'South Chennai', popular: false },
  { name: 'Nungambakkam', zone: 'Central Chennai', popular: false },
  { name: 'Porur', zone: 'West Chennai', popular: true },
  { name: 'Ambattur', zone: 'North-West Chennai', popular: false },
  { name: 'Tambaram', zone: 'South Chennai', popular: false },
  { name: 'Guindy', zone: 'South Chennai', popular: false },
  { name: 'Vadapalani', zone: 'West Chennai', popular: false },
  { name: 'Kilpauk', zone: 'North Chennai', popular: false },
  { name: 'Thiruvanmiyur', zone: 'South Chennai', popular: false }
];

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, selectedArea, setSelectedArea, setPage } = useApp();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');

  if (!isLocationModalOpen) return null;

  const filteredAreas = CHENNAI_NEIGHBORHOODS.filter(area =>
    area.name.toLowerCase().includes(search.toLowerCase()) ||
    area.zone.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (areaName: string) => {
    const fullLoc = `${areaName}, Chennai`;
    setSelectedArea(fullLoc);
    setIsLocationModalOpen(false);
    showToast(`Location set to ${areaName}`, 'Showing services available near you in Chennai', 'info');
  };

  const handleUseCurrentLocation = () => {
    handleSelect('Anna Nagar');
    showToast('Detected Location', 'Using Anna Nagar, Chennai', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-elevated border border-slate-100 relative my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Select Your Location</h3>
              <p className="text-xs text-slate-500">Find verified local professionals in Chennai</p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search Chennai locality (e.g. Adyar, T. Nagar)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white text-sm font-semibold rounded-2xl py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none transition-all"
            autoFocus
          />
        </div>

        {/* Current Location Quick Option */}
        <button
          onClick={handleUseCurrentLocation}
          className="w-full mt-3 p-3 rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 hover:bg-brand-50 text-brand-700 flex items-center justify-between transition-colors text-xs font-bold group"
        >
          <div className="flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-brand-600 group-hover:rotate-45 transition-transform" />
            <span>Detect Current Location in Chennai</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider bg-brand-200/60 text-brand-800 px-2 py-0.5 rounded-md">
            GPS Auto
          </span>
        </button>

        {/* Popular Areas Pills */}
        <div className="mt-5">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular Chennai Neighborhoods
          </p>
          <div className="flex flex-wrap gap-2">
            {CHENNAI_NEIGHBORHOODS.filter(a => a.popular).map(area => {
              const isSelected = selectedArea.startsWith(area.name);
              return (
                <button
                  key={area.name}
                  onClick={() => handleSelect(area.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  {area.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Locality list */}
        <div className="mt-5 max-h-56 overflow-y-auto divide-y divide-slate-100 pr-1 space-y-1">
          {filteredAreas.map((area) => {
            const isSelected = selectedArea.startsWith(area.name);
            return (
              <button
                key={area.name}
                onClick={() => handleSelect(area.name)}
                className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-left transition-colors text-xs ${
                  isSelected ? 'bg-brand-50 font-black text-brand-700' : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div>
                  <p className="font-bold text-slate-900">{area.name}</p>
                  <p className="text-[11px] text-slate-400">{area.zone}, Chennai</p>
                </div>
                {isSelected ? (
                  <Check className="w-4 h-4 text-brand-600" />
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">Select</span>
                )}
              </button>
            );
          })}

          {filteredAreas.length === 0 && (
            <div className="text-center py-6 text-slate-400 text-xs font-semibold">
              No matching Chennai localities found.
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[11px] text-slate-500 font-medium">
          Currently serving all major zones across <strong className="text-slate-800">Chennai, Tamil Nadu</strong>.
        </div>

      </div>
    </div>
  );
};
