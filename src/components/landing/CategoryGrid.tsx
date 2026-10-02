import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockCategories } from '../../data/mockData';
import { CategoryIcon, IconMore } from '../common/Kolam';

/**
 * Thirteen categories, one visual language.
 *
 * The previous grid gave each category its own pastel trio (sky / blue / amber /
 * teal / rose / orange / lime / slate / cyan / indigo / emerald / violet /
 * fuchsia), which meant nothing was emphasised because everything was. Here the
 * colour is constant and the drawn mark does the distinguishing.
 */
export const CategoryGrid: React.FC = () => {
  const { openDiscoveryWithCategory, language } = useApp();

  const descriptions: Record<string, string> = {
    'ac-repair': 'Servicing, gas refill, installation',
    'plumbing': 'Leaks, taps, drains, pipe fitting',
    'electrical': 'Wiring, switches, fans, MCB',
    'cleaning': 'Deep clean, kitchen, bathroom',
    'appliance-repair': 'Microwave, chimney, geyser',
    'carpenter': 'Furniture, doors, cabinets',
    'painting': 'Interior, exterior, waterproofing',
    'pest-control': 'Cockroach, termite, mosquito',
    'home-maintenance': 'Handyman, mounting, small fixes',
    'washing-machine': 'Drum, motor, drainage',
    'refrigerator': 'Cooling, compressor, thermostat',
    'ro-purifier': 'Filters, servicing, installation',
    'tv-repair': 'Display, sound, wall mounting'
  };

  return (
    <section className="py-16 lg:py-24 bg-ns-bg" id="browse-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ns-navy">
            {language === 'ta' ? 'இன்று உங்களுக்கு என்ன தேவை?' : 'What do you need today?'}
          </h2>
          <p className="mt-3 text-[17px] text-ns-text-secondary leading-relaxed">
            {language === 'ta'
              ? 'பதிமூன்று தொழில்கள், அம்பத்தூர் முதல் சோழிங்கநல்லூர் வரை ஒவ்வொரு பின்கோடிலும்.'
              : 'Thirteen trades, every pincode from Ambattur to Sholinganallur.'}
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {mockCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => openDiscoveryWithCategory(cat.name)}
              className="group bg-kolam-surface border border-ns-border hover:border-brand-300 rounded-2xl p-5 text-left transition-all duration-200 hover:shadow-card focus-ring"
              id={`category-${cat.id}`}
            >
              <CategoryIcon
                categoryId={cat.id}
                className="w-9 h-9 text-ns-primary transition-transform duration-200 group-hover:-translate-y-0.5"
              />
              <h3 className="mt-4 font-display font-semibold text-ns-navy text-[15px] leading-tight">
                {language === 'en' ? cat.name : cat.nameTa}
              </h3>
              <p className="mt-1 text-xs text-ns-text-secondary leading-relaxed">
                {descriptions[cat.id] ?? `${cat.count} professionals`}
              </p>
              <p className="mt-3 text-[11px] text-ns-text-secondary/70 tnum">
                {cat.count} {language === 'ta' ? 'நிபுணர்கள்' : 'professionals'}
              </p>
            </button>
          ))}

          <button
            onClick={() => openDiscoveryWithCategory('All Categories')}
            className="group bg-ns-navy kolam-field rounded-2xl p-5 text-left transition-all duration-200 hover:shadow-elevated focus-ring"
            id="category-view-all"
          >
            <IconMore className="w-9 h-9 text-kolam-marigold transition-transform duration-200 group-hover:translate-x-0.5" />
            <h3 className="mt-4 font-display font-semibold text-white text-[15px] leading-tight">
              {language === 'ta' ? 'அனைத்து சேவைகளும்' : 'Browse everything'}
            </h3>
            <p className="mt-1 text-xs text-white/55 leading-relaxed">
              {language === 'ta' ? 'அனைத்து வகைகளையும் காண்க' : 'All categories and professionals'}
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};
