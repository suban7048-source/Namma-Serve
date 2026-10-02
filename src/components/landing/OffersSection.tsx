import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin } from 'lucide-react';

const CHENNAI_LOCATIONS = [
  'Anna Nagar', 'T. Nagar', 'Adyar', 'Velachery', 'Tambaram', 'Porur',
  'OMR', 'Perungudi', 'Chrompet', 'Thiruvanmiyur', 'Sholinganallur', 'Medavakkam'
];

/**
 * Neighbourhood picker. Each chip previously carried its own pastel hue — twelve
 * more colours on a page that already had thirteen. They are one treatment now.
 */
export const OffersSection: React.FC = () => {
  const { setSelectedArea, setFilters, setPage, language } = useApp();

  const handleLocationClick = (location: string) => {
    setSelectedArea(`${location}, Chennai`);
    setFilters(prev => ({ ...prev, location }));
    setPage('discovery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 lg:py-24 bg-kolam-surface" id="chennai-locations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="max-w-2xl mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ns-navy">
            {language === 'ta' ? 'சென்னை முழுவதும்' : 'Working across Chennai'}
          </h2>
          <p className="mt-3 text-[17px] text-ns-text-secondary leading-relaxed">
            {language === 'ta'
              ? 'உங்கள் பகுதியில் சேவை செய்யும் நிபுணர்களைக் கண்டறியுங்கள்.'
              : 'Pick your neighbourhood to see who covers it.'}
          </p>
        </header>

        <div className="flex flex-wrap gap-2.5">
          {CHENNAI_LOCATIONS.map((name) => (
            <button
              key={name}
              onClick={() => handleLocationClick(name)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-ns-border bg-kolam-surface hover:bg-brand-50 hover:border-brand-300 text-ns-navy font-medium text-sm transition-colors"
              id={`location-${name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0 text-kolam-marigold" />
              {name}
            </button>
          ))}
        </div>

        <p className="text-xs text-ns-text-secondary mt-8">
          {language === 'ta'
            ? 'சென்னை மற்றும் சுற்றியுள்ள 50+ பகுதிகளில் சேவை.'
            : 'Serving 50+ neighbourhoods across Chennai and the surrounding areas.'}
        </p>
      </div>
    </section>
  );
};
