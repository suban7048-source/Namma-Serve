import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin } from 'lucide-react';

const CHENNAI_LOCATIONS = [
  { name: 'Anna Nagar', color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
  { name: 'T. Nagar', color: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
  { name: 'Adyar', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  { name: 'Velachery', color: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
  { name: 'Tambaram', color: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' },
  { name: 'Porur', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
  { name: 'OMR', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
  { name: 'Perungudi', color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
  { name: 'Chrompet', color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
  { name: 'Thiruvanmiyur', color: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100' },
  { name: 'Sholinganallur', color: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' },
  { name: 'Medavakkam', color: 'bg-lime-50 text-lime-700 border-lime-200 hover:bg-lime-100' },
];

export const OffersSection: React.FC = () => {
  const { setSelectedArea, setFilters, setPage } = useApp();

  const handleLocationClick = (location: string) => {
    setSelectedArea(`${location}, Chennai`);
    setFilters(prev => ({ ...prev, location: location }));
    setPage('discovery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 lg:py-20 bg-white" id="chennai-locations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ns-navy tracking-tight font-display">
            Local services across Chennai
          </h2>
          <p className="mt-3 text-base text-ns-text-secondary max-w-xl mx-auto">
            Find professionals serving your neighbourhood.
          </p>
        </div>

        {/* Location Chips */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {CHENNAI_LOCATIONS.map((loc) => (
            <button
              key={loc.name}
              onClick={() => handleLocationClick(loc.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm transition-colors ${loc.color}`}
              id={`location-${loc.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <MapPin className="w-4 h-4 shrink-0 opacity-70" />
              {loc.name}
            </button>
          ))}
        </div>

        {/* Subtle bottom text */}
        <p className="text-center text-xs text-ns-text-secondary mt-8">
          Serving 50+ neighbourhoods across Chennai and surrounding areas.
        </p>

      </div>
    </section>
  );
};
