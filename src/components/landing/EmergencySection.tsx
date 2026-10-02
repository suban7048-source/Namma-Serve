import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { CategoryIcon } from '../common/Kolam';

/**
 * Popular services. The emoji that previously headed each card
 * (❄️ 🔧 ✨ ⚡ 🎨 🛡️ 🪚 🔌) are replaced by the drawn kolam icon set, which is
 * styleable, renders identically everywhere, and belongs to the brand.
 */
const POPULAR_SERVICES = [
  { id: 'ps-1', name: 'AC Service & Repair', categoryId: 'ac-repair', category: 'AC Repair & Service',
    description: 'Full servicing, gas refill and compressor repair by certified technicians.',
    price: 499, rating: 4.8, reviews: 320, duration: '45 min' },
  { id: 'ps-2', name: 'Plumbing Repair', categoryId: 'plumbing', category: 'Plumbing',
    description: 'Leaks, blocked drains, tap replacement and pipe fitting.',
    price: 349, rating: 4.9, reviews: 285, duration: '30 min' },
  { id: 'ps-3', name: 'Deep Home Cleaning', categoryId: 'cleaning', category: 'Cleaning',
    description: 'Floor to ceiling, including kitchen, bathroom and living areas.',
    price: 1499, rating: 4.7, reviews: 198, duration: '3–4 hrs' },
  { id: 'ps-4', name: 'Electrical Repair', categoryId: 'electrical', category: 'Electrical',
    description: 'Switches, sockets, MCB, fan installation and wiring.',
    price: 299, rating: 4.8, reviews: 410, duration: '30 min' },
  { id: 'ps-5', name: 'Interior Painting', categoryId: 'painting', category: 'Painting',
    description: 'Wall painting, texture finish and waterproof coating.',
    price: 2999, rating: 4.6, reviews: 142, duration: '1–2 days' },
  { id: 'ps-6', name: 'Pest Control', categoryId: 'pest-control', category: 'Pest Control',
    description: 'Cockroach, termite, mosquito and bed bug treatment.',
    price: 799, rating: 4.7, reviews: 176, duration: '1–2 hrs' },
  { id: 'ps-7', name: 'Carpentry Work', categoryId: 'carpenter', category: 'Carpenter',
    description: 'Furniture repair, door fixing, cabinet work and assembly.',
    price: 449, rating: 4.5, reviews: 133, duration: '1–2 hrs' },
  { id: 'ps-8', name: 'Appliance Repair', categoryId: 'appliance-repair', category: 'Appliance Repair',
    description: 'Washing machine, fridge, microwave and geyser repair.',
    price: 399, rating: 4.8, reviews: 267, duration: '45 min' }
];

export const EmergencySection: React.FC = () => {
  const { setPage, openDiscoveryWithCategory, language } = useApp();

  return (
    <section className="py-16 lg:py-24 bg-kolam-surface" id="popular-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ns-navy">
              {language === 'ta' ? 'அருகில் பிரபலமான சேவைகள்' : 'What Chennai is booking'}
            </h2>
            <p className="mt-3 text-[17px] text-ns-text-secondary leading-relaxed">
              {language === 'ta'
                ? 'சென்னை முழுவதும் வாடிக்கையாளர்கள் அதிகம் முன்பதிவு செய்யும் சேவைகள்.'
                : 'The services customers across the city book most often.'}
            </p>
          </div>
          <button
            onClick={() => setPage('discovery')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ns-primary hover:text-kolam-kumkum transition-colors group self-start md:self-auto"
          >
            {language === 'ta' ? 'அனைத்து சேவைகளும்' : 'See all services'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPULAR_SERVICES.map((service) => (
            <article
              key={service.id}
              className="border border-ns-border rounded-2xl overflow-hidden hover:shadow-card transition-all duration-200 group flex flex-col bg-kolam-surface"
              id={`service-${service.id}`}
            >
              <div className="bg-brand-50 border-b border-kolam-indigo-line px-5 py-5 flex items-start justify-between gap-3">
                <CategoryIcon categoryId={service.categoryId} className="w-9 h-9 text-ns-primary" />
                <span className="text-[11px] font-semibold text-ns-primary/75 text-right leading-snug">
                  {service.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-semibold text-ns-navy text-[17px] leading-snug">
                  {service.name}
                </h3>
                <p className="text-[13px] text-ns-text-secondary mt-2 leading-relaxed flex-1">
                  {service.description}
                </p>

                <div className="flex items-center gap-3 mt-4 text-xs text-ns-text-secondary">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-kolam-marigold text-kolam-marigold" />
                    <span className="font-semibold text-ns-navy tnum">{service.rating.toFixed(1)}</span>
                    <span className="tnum">({service.reviews})</span>
                  </span>
                  <span className="text-ns-border">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="tnum">{service.duration}</span>
                  </span>
                </div>

                <div className="flex items-end justify-between mt-4 pt-4 border-t border-ns-border/70">
                  <div>
                    <p className="font-display text-xl font-semibold text-ns-navy tnum">₹{service.price}</p>
                    <p className="text-[11px] text-ns-text-secondary">
                      {language === 'ta' ? 'தொடக்க விலை' : 'starting price'}
                    </p>
                  </div>
                  <button
                    onClick={() => openDiscoveryWithCategory(service.category)}
                    className="px-4 py-2 bg-kolam-teal hover:bg-[#0B5852] text-white rounded-full font-semibold text-xs transition-colors"
                  >
                    {language === 'ta' ? 'முன்பதிவு' : 'Book'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
