import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Clock, ArrowRight } from 'lucide-react';

// Popular services with mixed colors
const POPULAR_SERVICES = [
  {
    id: 'ps-1',
    name: 'AC Service & Repair',
    description: 'Complete AC servicing, gas refill, and compressor repair by certified technicians.',
    price: 499,
    rating: 4.8,
    reviews: 320,
    duration: '45 mins',
    category: 'AC Repair & Service',
    accent: { bg: 'bg-sky-50', border: 'border-sky-200', badge: 'bg-sky-100 text-sky-700', icon: '❄️' },
  },
  {
    id: 'ps-2',
    name: 'Plumbing Repair',
    description: 'Fix leaks, blocked drains, tap replacement, and pipe fitting.',
    price: 349,
    rating: 4.9,
    reviews: 285,
    duration: '30 mins',
    category: 'Plumbing',
    accent: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', icon: '🔧' },
  },
  {
    id: 'ps-3',
    name: 'Deep Home Cleaning',
    description: 'Full home deep clean including kitchen, bathroom, and living areas.',
    price: 1499,
    rating: 4.7,
    reviews: 198,
    duration: '3-4 hrs',
    category: 'Cleaning',
    accent: { bg: 'bg-teal-50', border: 'border-teal-200', badge: 'bg-teal-100 text-teal-700', icon: '✨' },
  },
  {
    id: 'ps-4',
    name: 'Electrical Repair',
    description: 'Switch, socket, MCB, fan installation and wiring solutions.',
    price: 299,
    rating: 4.8,
    reviews: 410,
    duration: '30 mins',
    category: 'Electrical',
    accent: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', icon: '⚡' },
  },
  {
    id: 'ps-5',
    name: 'Interior Painting',
    description: 'Wall painting, texture finish, and waterproof coating.',
    price: 2999,
    rating: 4.6,
    reviews: 142,
    duration: '1-2 days',
    category: 'Painting',
    accent: { bg: 'bg-rose-50', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-700', icon: '🎨' },
  },
  {
    id: 'ps-6',
    name: 'Pest Control',
    description: 'Cockroach, termite, mosquito, and bed bug treatment.',
    price: 799,
    rating: 4.7,
    reviews: 176,
    duration: '1-2 hrs',
    category: 'Pest Control',
    accent: { bg: 'bg-lime-50', border: 'border-lime-200', badge: 'bg-lime-100 text-lime-700', icon: '🛡️' },
  },
  {
    id: 'ps-7',
    name: 'Carpentry Work',
    description: 'Furniture repair, door fixing, cabinet work, and assembly.',
    price: 449,
    rating: 4.5,
    reviews: 133,
    duration: '1-2 hrs',
    category: 'Carpenter',
    accent: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', icon: '🪚' },
  },
  {
    id: 'ps-8',
    name: 'Appliance Repair',
    description: 'Washing machine, refrigerator, microwave, and geyser repair.',
    price: 399,
    rating: 4.8,
    reviews: 267,
    duration: '45 mins',
    category: 'Appliance Repair',
    accent: { bg: 'bg-violet-50', border: 'border-violet-200', badge: 'bg-violet-100 text-violet-700', icon: '🔌' },
  },
];

export const EmergencySection: React.FC = () => {
  const { setFilters, setPage, openDiscoveryWithCategory } = useApp();

  const handleBookService = (category: string) => {
    openDiscoveryWithCategory(category);
  };

  return (
    <section className="py-16 lg:py-20 bg-white" id="popular-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ns-navy tracking-tight font-display">
              Popular services near you
            </h2>
            <p className="mt-2 text-base text-ns-text-secondary">
              Top-rated services customers are booking across Chennai.
            </p>
          </div>
          <button
            onClick={() => setPage('discovery')}
            className="inline-flex items-center gap-2 text-sm font-bold text-ns-primary hover:text-ns-primary-bright transition-colors group self-start md:self-auto"
          >
            View all services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPULAR_SERVICES.map((service) => (
            <div
              key={service.id}
              className={`bg-white border border-ns-border rounded-xl overflow-hidden hover:shadow-card transition-all duration-200 group flex flex-col`}
              id={`service-${service.id}`}
            >
              {/* Top accent strip */}
              <div className={`${service.accent.bg} ${service.accent.border} border-b px-5 py-4 flex items-center justify-between`}>
                <span className="text-2xl">{service.accent.icon}</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${service.accent.badge}`}>
                  {service.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-ns-navy text-[17px] leading-tight group-hover:text-ns-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-ns-text-secondary mt-2 leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Price + Rating */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-ns-border/60">
                  <div>
                    <p className="text-lg font-extrabold text-ns-navy">₹{service.price}</p>
                    <p className="text-[11px] text-ns-text-secondary">starting price</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-ns-navy">{service.rating}</span>
                      <span className="text-xs text-ns-text-secondary">({service.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-ns-text-secondary" />
                      <span className="text-[11px] text-ns-text-secondary">{service.duration}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleBookService(service.category)}
                  className="mt-4 w-full py-2.5 bg-ns-primary hover:bg-ns-primary-bright text-white rounded-lg font-bold text-sm transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
