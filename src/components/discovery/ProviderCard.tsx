import React from 'react';
import { Provider } from '../../types';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { InitialsAvatar } from '../common/InitialsAvatar';
import {
  ShieldCheck, MapPin, Clock, CheckCircle2, Heart,
  Star, Zap, ChevronRight, AlertTriangle, BadgeCheck
} from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider: p }) => {
  const { setActiveProviderProfile, setBookingProvider, favorites, toggleFavorite, addToCart } = useApp();
  const isFav = favorites.includes(p.id);

  const getCategoryColor = (cat: string) => {
    const map: Record<string, string> = {
      'AC Repair & Service': 'bg-sky-50 text-sky-700 border-sky-200',
      'Electrical': 'bg-amber-50 text-amber-700 border-amber-200',
      'Plumbing': 'bg-blue-50 text-blue-700 border-blue-200',
      'Cleaning': 'bg-teal-50 text-teal-700 border-teal-200',
      'Appliance Repair': 'bg-purple-50 text-purple-700 border-purple-200',
      'Carpenter': 'bg-orange-50 text-orange-700 border-orange-200',
      'Painting': 'bg-pink-50 text-pink-700 border-pink-200',
      'Pest Control': 'bg-lime-50 text-lime-700 border-lime-200',
      'Home Maintenance': 'bg-slate-100 text-slate-700 border-slate-200',
      'Washing Machine Repair': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'Refrigerator Repair': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'RO/Water Purifier': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'TV Repair': 'bg-violet-50 text-violet-700 border-violet-200',
    };
    return map[cat] || 'bg-brand-50 text-brand-700 border-brand-200';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col group">

      {/* Card Top — Badges row */}
      <div className="flex items-center justify-between p-4 pb-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold ${getCategoryColor(p.category)}`}>
            {p.category}
          </span>
          {p.isVerified && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Verified
            </span>
          )}
          {!p.isAvailable && (
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
              Unavailable
            </span>
          )}
        </div>
        <button
          onClick={() => toggleFavorite(p.id)}
          className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-4 flex-1 flex flex-col gap-3">

        {/* Provider Header */}
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <InitialsAvatar name={p.name} size="md" rounded="xl" />
            {p.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white">
                <ShieldCheck className="w-2.5 h-2.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-brand-700 transition-colors truncate">
              {p.name}
            </h3>
            {p.businessName && (
              <p className="text-xs text-slate-500 font-medium truncate">{p.businessName}</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <RatingStars rating={p.rating} reviewCount={p.reviewCount} showNumeric />
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-slate-500 font-medium">{p.completedJobs} jobs</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{p.bio}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {p.skills.slice(0, 3).map(skill => (
            <span key={skill} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
              {skill}
            </span>
          ))}
        </div>

        {/* Location & ETA row */}
        <div className="flex items-center gap-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            <span className="font-semibold text-slate-700">{p.distanceKm} km</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>ETA <span className="font-semibold text-slate-700">{p.etaMinutes} min</span></span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{p.yearsExperience} yrs</span>
          </span>
        </div>

        {/* Services / pricing */}
        <div className="space-y-2">
          {p.offeredServices.slice(0, 2).map(service => (
            <div
              key={service.id}
              className="flex items-center justify-between gap-2 text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 truncate">{service.name}</p>
                <p className="text-slate-400 text-[10px]">{service.durationMinutes} min
                  {service.warrantyDays && service.warrantyDays > 0 ? ` • ${service.warrantyDays}d warranty` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <p className="font-extrabold text-slate-900">₹{service.price}</p>
                  {service.visitCharge > 0 && (
                    <p className="text-[9px] text-slate-400">+₹{service.visitCharge} visit</p>
                  )}
                </div>
                <button
                  onClick={() => addToCart(p, service)}
                  className="px-2 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-[10px] font-black transition-colors shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Actions Footer */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 border-t border-slate-100">
        <button
          onClick={() => setActiveProviderProfile(p)}
          className="py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1"
        >
          View Profile <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setBookingProvider(p)}
          disabled={!p.isAvailable}
          className="py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs transition-colors shadow-sm"
        >
          {p.isAvailable ? 'Book Now' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};
