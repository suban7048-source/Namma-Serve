import React from 'react';
import { Provider } from '../../types';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { ShieldCheck, MapPin, Clock, Heart, ArrowRight, Briefcase } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  viewMode?: 'grid' | 'list';
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider: p, viewMode = 'grid' }) => {
  const { 
    setActiveProviderProfile, setBookingProvider, favorites, toggleFavorite, 
    isLoggedIn, setIsAuthModalOpen, setAuthMode,
    cart, addToCart, updateCartQuantity 
  } = useApp();
  const isFav = favorites.includes(p.id);

  const handleBookNow = () => {
    if (!isLoggedIn) {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
    } else {
      setBookingProvider(p);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group">
        <div className="flex items-start gap-4 flex-1">
          {/* List avatar — initials only */}
          <div className="relative shrink-0">
            <InitialsAvatar name={p.name} size="md" rounded="2xl" />
            {p.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white" title="Verified Professional">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-brand-600 transition-colors">
                {p.name}
              </h3>
              <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                {p.category}
              </span>
            </div>
            
            <p className="text-xs text-slate-500 font-medium">{p.businessName || `${p.name} Services`}</p>

            <div className="flex items-center gap-3 text-xs flex-wrap pt-1">
              <RatingStars rating={p.rating} reviewCount={p.reviewCount} showNumeric />
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {p.completedJobs} jobs done
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {p.distanceMiles} miles away
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
              {p.bio}
            </p>
          </div>
        </div>

        {/* Right Info & Actions */}
        <div className="w-full md:w-48 flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 gap-3 shrink-0">
          <div className="text-left md:text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Starting price</span>
            <p className="text-xl font-black text-slate-900">
              ₹{p.startingPrice} <span className="text-xs font-normal text-slate-500">/{p.priceUnit}</span>
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <Clock className="w-3 h-3" /> {p.nextAvailable}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleFavorite(p.id)}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => setActiveProviderProfile(p)}
              className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors whitespace-nowrap"
            >
              Profile
            </button>
            <button
              onClick={handleBookNow}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors shadow-sm whitespace-nowrap"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Category-colored banner header — no photo */}
        <div className="relative h-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #60a5fa 0%, transparent 60%), radial-gradient(circle at 80% 50%, #34d399 0%, transparent 60%)' }} />
          <button
            onClick={() => toggleFavorite(p.id)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:text-rose-500 transition-colors shadow-sm"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900">
            {p.category}
          </span>
        </div>

        <div className="p-5 pt-0 relative">
          {/* Avatar — initials only */}
          <div className="relative -mt-8 mb-3 flex items-end justify-between">
            <div className="relative">
              <InitialsAvatar name={p.name} size="lg" rounded="2xl" className="border-4 border-white" />
              {p.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white" title="Verified Professional">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              )}
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Starting price</span>
              <p className="text-lg font-black text-slate-900">
                ₹{p.startingPrice} <span className="text-xs font-normal text-slate-500">/{p.priceUnit}</span>
              </p>
            </div>
          </div>

          <h3 className="font-extrabold text-slate-900 text-base group-hover:text-brand-600 transition-colors">
            {p.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-2">{p.businessName || `${p.name} Services`}</p>

          <div className="flex items-center gap-2 text-xs mb-3">
            <RatingStars rating={p.rating} reviewCount={p.reviewCount} showNumeric />
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">{p.completedJobs} jobs</span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {p.bio}
          </p>

          {/* Quick Urban Company Services Add-to-cart Preview */}
          {p.offeredServices && p.offeredServices.length > 0 && (
            <div className="space-y-1.5 mb-3 bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Popular Services
              </span>
              {p.offeredServices.slice(0, 2).map((service) => {
                const cartItem = cart.find(c => c.serviceId === service.id);
                return (
                  <div key={service.id} className="flex items-center justify-between gap-2 text-xs">
                    <div className="min-w-0 pr-1">
                      <p className="font-bold text-slate-900 truncate text-[11px]">{service.name}</p>
                      <span className="text-[10px] text-brand-700 font-black">₹{service.price}</span>
                    </div>

                    {cartItem ? (
                      <div className="flex items-center gap-1 bg-white border border-brand-200 rounded-lg px-1.5 py-0.5 shadow-2xs shrink-0">
                        <button
                          onClick={() => updateCartQuantity(service.id, -1)}
                          className="text-brand-600 hover:text-brand-800 font-black px-1"
                          title="Decrease"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-brand-700 px-1">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(service.id, 1)}
                          className="text-brand-600 hover:text-brand-800 font-black px-1"
                          title="Increase"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(p, service)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-brand-600 font-extrabold text-[11px] shadow-2xs transition-all shrink-0"
                      >
                        + Add
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {p.distanceMiles} miles away
            </span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <Clock className="w-3.5 h-3.5" /> {p.nextAvailable}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => setActiveProviderProfile(p)}
          className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors text-center"
        >
          View Profile
        </button>
        <button
          onClick={handleBookNow}
          className="w-full py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition-colors text-center shadow-sm"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};
