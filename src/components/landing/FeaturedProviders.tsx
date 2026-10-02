import React from 'react';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { ShieldCheck, MapPin, Clock, ArrowRight, Star, Briefcase } from 'lucide-react';

// Mixed accent colors per category for provider cards
const categoryAccents: Record<string, string> = {
  'AC Repair & Service': 'border-l-sky-500',
  'Electrical': 'border-l-amber-500',
  'Cleaning': 'border-l-teal-500',
  'Plumbing': 'border-l-blue-500',
  'Painting': 'border-l-rose-500',
  'Carpenter': 'border-l-orange-500',
  'Washing Machine Repair': 'border-l-cyan-500',
  'Refrigerator Repair': 'border-l-indigo-500',
  'Home Maintenance': 'border-l-slate-500',
  'Pest Control': 'border-l-lime-500',
  'RO/Water Purifier': 'border-l-emerald-500',
  'TV Repair': 'border-l-violet-500',
};

export const FeaturedProviders: React.FC = () => {
  const { providers, setActiveProviderProfile, setBookingProvider, setPage } = useApp();

  const featured = providers
    .filter(p => p.isVerified)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="py-16 lg:py-20 bg-ns-bg" id="find-professionals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ns-navy tracking-tight font-display">
              Find trusted professionals
            </h2>
            <p className="mt-2 text-base text-ns-text-secondary">
              Verified experts near you with outstanding reviews and experience.
            </p>
          </div>
          <button
            onClick={() => setPage('discovery')}
            className="inline-flex items-center gap-2 text-sm font-bold text-ns-primary hover:text-ns-primary-bright transition-colors group self-start md:self-auto"
          >
            View all professionals
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => {
            const accentBorder = categoryAccents[p.category] || 'border-l-brand-500';

            return (
              <div
                key={p.id}
                className={`bg-white border border-ns-border border-l-4 ${accentBorder} rounded-xl overflow-hidden hover:shadow-card transition-all duration-200 flex flex-col`}
                id={`provider-${p.id}`}
              >
                <div className="p-5 flex-1 flex flex-col">
                  {/* Avatar + Name */}
                  <div className="flex items-start gap-3 mb-4">
                    <InitialsAvatar name={p.name} size="lg" rounded="xl" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-ns-navy text-base leading-tight truncate">
                        {p.name}
                      </h3>
                      {p.isVerified && (
                        <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold mt-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </div>
                      )}
                      <p className="text-xs text-ns-text-secondary mt-0.5">{p.category}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-ns-navy">{p.rating}</span>
                    </div>
                    <span className="text-xs text-ns-text-secondary">({p.reviewCount} reviews)</span>
                  </div>

                  {/* Meta */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 text-xs text-ns-text-secondary">
                      <Briefcase className="w-3.5 h-3.5 shrink-0" />
                      <span>{p.yearsExperience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ns-text-secondary">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{p.distanceKm} km away · {p.completedJobs} jobs done</span>
                    </div>
                  </div>

                  {/* Price + Actions */}
                  <div className="mt-4 pt-3 border-t border-ns-border/60">
                    <p className="text-sm text-ns-text-secondary">
                      Starting at <span className="text-lg font-extrabold text-ns-navy">₹{p.visitCharge}</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <button
                        onClick={() => setActiveProviderProfile(p)}
                        className="py-2 rounded-lg border border-ns-border hover:bg-slate-50 text-ns-navy font-semibold text-xs transition-colors"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => setBookingProvider(p)}
                        className="py-2 rounded-lg bg-ns-primary hover:bg-ns-primary-bright text-white font-semibold text-xs transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
