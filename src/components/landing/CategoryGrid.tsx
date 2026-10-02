import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockCategories } from '../../data/mockData';
import {
  Wind, Zap, Wrench, Sparkles, Settings, Hammer, Paintbrush,
  Bug, Home, Waves, Thermometer, Droplets, Tv, Grid3x3, ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Wind, Zap, Wrench, Sparkles, Settings, Hammer, Paintbrush,
  Bug, Home, Waves, Thermometer, Droplets, Tv, Grid3x3,
};

// Mixed accent colors for each category
const categoryColors: Record<string, { icon: string; bg: string; border: string }> = {
  'AC Repair & Service': { icon: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200' },
  'Plumbing': { icon: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  'Electrical': { icon: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  'Cleaning': { icon: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' },
  'Painting': { icon: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
  'Carpenter': { icon: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  'Pest Control': { icon: 'text-lime-600', bg: 'bg-lime-50', border: 'border-lime-200' },
  'Home Maintenance': { icon: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
  'Washing Machine Repair': { icon: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  'Refrigerator Repair': { icon: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  'RO/Water Purifier': { icon: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  'TV Repair': { icon: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
  'Appliance Repair': { icon: 'text-fuchsia-600', bg: 'bg-fuchsia-50', border: 'border-fuchsia-200' },
};

const defaultColor = { icon: 'text-ns-primary', bg: 'bg-brand-50', border: 'border-brand-200' };

const descriptions: Record<string, string> = {
  'AC Repair & Service': 'Split & window AC service, gas refill, installation',
  'Plumbing': 'Leak repair, pipe fitting, tap & drain fixes',
  'Electrical': 'Wiring, switches, fan & light installation',
  'Cleaning': 'Deep clean, kitchen, bathroom, move-in/out',
  'Painting': 'Interior, exterior, waterproofing, texture',
  'Carpenter': 'Furniture repair, assembly, door & cabinet',
  'Pest Control': 'Cockroach, termite, mosquito, bed bug',
  'Home Maintenance': 'General repairs, handyman, small fixes',
  'Washing Machine Repair': 'Drum, motor, drainage, installation',
  'Refrigerator Repair': 'Cooling issues, compressor, thermostat',
  'RO/Water Purifier': 'Filter change, servicing, installation',
  'TV Repair': 'Display, sound, smart TV setup & mount',
  'Appliance Repair': 'Microwave, chimney, induction, geyser',
};

export const CategoryGrid: React.FC = () => {
  const { openDiscoveryWithCategory, language } = useApp();

  return (
    <section className="py-16 lg:py-20 bg-ns-bg" id="browse-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ns-navy tracking-tight font-display">
            Browse services
          </h2>
          <p className="mt-3 text-base text-ns-text-secondary max-w-xl mx-auto leading-relaxed">
            Find reliable professionals for everyday home services.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mockCategories.map((cat) => {
            const Icon = iconMap[cat.iconName] || Grid3x3;
            const colors = categoryColors[cat.name] || defaultColor;
            const desc = descriptions[cat.name] || `${cat.count}+ professionals available`;

            return (
              <button
                key={cat.id}
                onClick={() => openDiscoveryWithCategory(cat.name)}
                className="group bg-white border border-ns-border hover:border-ns-primary/30 rounded-xl p-5 text-left transition-all duration-200 hover:shadow-card flex flex-col gap-3"
                id={`category-${cat.id}`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${colors.bg} ${colors.border} ${colors.icon} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="font-bold text-ns-navy text-sm leading-tight group-hover:text-ns-primary transition-colors">
                    {language === 'en' ? cat.name : cat.nameTa}
                  </h3>
                  <p className="text-xs text-ns-text-secondary leading-relaxed line-clamp-2">
                    {desc}
                  </p>
                </div>
              </button>
            );
          })}

          {/* More Services */}
          <button
            onClick={() => openDiscoveryWithCategory('All Categories')}
            className="group bg-ns-navy hover:bg-ns-navy/90 rounded-xl p-5 text-left transition-all duration-200 hover:shadow-card flex flex-col gap-3"
            id="category-view-all"
          >
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm leading-tight">More Services</h3>
              <p className="text-xs text-white/60">View all categories</p>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
