import React from 'react';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { ShieldCheck, MapPin, Clock, ArrowRight, Heart } from 'lucide-react';

export const FeaturedProviders: React.FC = () => {
  const { providers, setActiveProviderProfile, setBookingProvider, favorites, toggleFavorite, setPage } = useApp();

  // Show top 3 providers for featured display
  const featured = providers.slice(0, 3);

  const getCategoryGradient = (cat: string) => {
    switch (cat) {
      case 'Plumbing': return 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)';
      case 'Electrical': return 'linear-gradient(135deg, #d97706 0%, #b45309 100%)';
      case 'Cleaning': return 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)';
      case 'Appliance Repair': return 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)';
      case 'Painting': return 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)';
      case 'AC & HVAC': return 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)';
      default: return 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-brand-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
              Top Rated Professionals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Featured Local Experts
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Hand-picked professionals with proven track records of quality work and outstanding reviews.
            </p>
          </div>

          <button
            onClick={() => setPage('discovery')}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors group self-start md:self-auto cursor-pointer"
          >
            Explore All Providers
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((p) => {
            const isFav = favorites.includes(p.id);

            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Category banner with vibrant color gradients */}
                  <div className="relative h-24 overflow-hidden" style={{ background: getCategoryGradient(p.category) }}>
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #ffffff 0%, transparent 60%), radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 60%)' }} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(p.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-600 hover:text-rose-500 transition-colors shadow-sm cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                    <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-xs">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-6 relative pt-0">
                    {/* Avatar — initials only */}
                    <div className="relative -mt-8 mb-3 flex items-end justify-between">
                      <div className="relative">
                        <InitialsAvatar name={p.name} size="lg" rounded="2xl" className="border-4 border-white" />
                        {p.isVerified && (
                          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white" title="Verified Professional">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 font-medium">Starting at</span>
                        <p className="text-xl font-extrabold text-slate-900">
                          ₹{p.startingPrice} <span className="text-xs font-normal text-slate-500">/{p.priceUnit}</span>
                        </p>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-brand-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mb-2">{p.businessName}</p>

                    <div className="flex items-center gap-3 text-xs mb-4">
                      <RatingStars rating={p.rating} reviewCount={p.reviewCount} showNumeric />
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-medium">{p.completedJobs} jobs</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {p.bio}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {p.distanceMiles} miles
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {p.responseTime} reply
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveProviderProfile(p)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors text-center"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => setBookingProvider(p)}
                    className="w-full py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition-colors text-center shadow-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
