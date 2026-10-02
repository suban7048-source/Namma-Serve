import React from 'react';
import { Provider } from '../../types';
import { useApp } from '../../context/AppContext';
import { Avatar, CoverImage } from '../common/Avatar';
import { CategoryIcon } from '../common/Kolam';
import {
  ShieldCheck, MapPin, Clock, Heart, Star, Briefcase, ChevronRight, Plus
} from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider: p }) => {
  const { setActiveProviderProfile, setBookingProvider, favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(p.id);

  // Portfolio photographs were only ever visible inside a modal most people
  // never opened. Two of them now sit on the card as proof of work.
  const proof = (p.portfolio ?? []).slice(0, 2);

  return (
    <article className="bg-kolam-surface rounded-2xl border border-ns-border hover:border-brand-300 hover:shadow-card transition-all duration-200 overflow-hidden flex flex-col group">

      {/* Header */}
      <div className="p-5 pb-4 flex items-start gap-3.5">
        <div className="relative shrink-0">
          <Avatar name={p.name} src={p.avatar} size="md" rounded="full" />
          {p.isVerified && (
            <span
              className="absolute -bottom-0.5 -right-0.5 bg-kolam-teal text-white p-1 rounded-full ring-2 ring-white"
              title="ID verified"
            >
              <ShieldCheck className="w-2.5 h-2.5" />
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-ns-navy text-[17px] leading-tight truncate">
            {p.name}
          </h3>
          {p.businessName && (
            <p className="text-xs text-ns-text-secondary truncate mt-0.5">{p.businessName}</p>
          )}
          <div className="flex items-center gap-1.5 mt-1.5">
            <Star className="w-3.5 h-3.5 fill-kolam-marigold text-kolam-marigold shrink-0" />
            <span className="text-[13px] font-semibold text-ns-navy tnum">{p.rating.toFixed(1)}</span>
            <span className="text-[11px] text-ns-text-secondary tnum">({p.reviewCount})</span>
            <span className="text-ns-border">·</span>
            <span className="text-[11px] text-ns-text-secondary tnum">{p.completedJobs} jobs</span>
          </div>
        </div>

        <button
          onClick={() => toggleFavorite(p.id)}
          className="p-1.5 rounded-full hover:bg-brand-50 transition-colors shrink-0"
          aria-pressed={isFav}
          aria-label={isFav ? `Remove ${p.name} from saved` : `Save ${p.name}`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-kolam-kumkum text-kolam-kumkum' : 'text-ns-text-secondary'}`} />
        </button>
      </div>

      {/* Category + availability */}
      <div className="px-5 flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ns-primary bg-brand-50 border border-kolam-indigo-line px-2.5 py-1 rounded-full">
          <CategoryIcon categoryName={p.category} className="w-3.5 h-3.5" showDot={false} />
          {p.category}
        </span>
        {p.isAvailable ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-kolam-teal bg-kolam-teal-soft border border-kolam-teal-line px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-kolam-teal" />
            Available now
          </span>
        ) : (
          <span className="text-[11px] font-semibold text-ns-text-secondary bg-kolam-sunk border border-ns-border px-2.5 py-1 rounded-full">
            Fully booked
          </span>
        )}
      </div>

      {/* Proof of work */}
      {proof.length > 0 && (
        <div className="mt-4 px-5 grid grid-cols-2 gap-2">
          {proof.map(item => (
            <figure key={item.id} className="relative rounded-xl overflow-hidden">
              <CoverImage src={item.imageUrl} alt={item.title} className="w-full h-20" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ns-navy/85 to-transparent px-2 pt-5 pb-1.5">
                <span className="text-[10px] font-medium text-white line-clamp-1">{item.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="px-5 pt-4 flex-1 flex flex-col">
        <p className="text-[13px] text-ns-text-secondary line-clamp-2 leading-relaxed">{p.bio}</p>

        {/* Facts row */}
        <dl className="flex items-center gap-4 mt-4 text-[11px] text-ns-text-secondary">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-kolam-marigold shrink-0" aria-hidden="true" />
            <dt className="sr-only">Distance</dt>
            <dd className="font-semibold text-ns-navy tnum">{p.distanceKm} km</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-kolam-marigold shrink-0" aria-hidden="true" />
            <dt className="sr-only">Response time</dt>
            <dd className="tnum">~{p.etaMinutes} min</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-kolam-marigold shrink-0" aria-hidden="true" />
            <dt className="sr-only">Experience</dt>
            <dd className="tnum">{p.yearsExperience} yrs</dd>
          </div>
        </dl>

        {/* Services */}
        <ul className="mt-4 space-y-1.5">
          {p.offeredServices.slice(0, 2).map(service => (
            <li
              key={service.id}
              className="flex items-center justify-between gap-2 text-xs py-2.5 px-3 rounded-xl bg-kolam-wash border border-ns-border/70"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ns-navy truncate">{service.name}</p>
                <p className="text-ns-text-secondary text-[10px] mt-0.5 tnum">
                  {service.durationMinutes} min
                  {service.warrantyDays ? ` · ${service.warrantyDays}-day warranty` : ''}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display font-semibold text-ns-navy text-sm tnum">₹{service.price}</p>
                {service.visitCharge > 0 && (
                  <p className="text-[9px] text-ns-text-secondary tnum">+₹{service.visitCharge} visit</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="p-5 pt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setActiveProviderProfile(p)}
          className="py-2.5 rounded-full border border-ns-border hover:border-brand-300 hover:bg-brand-50 text-ns-navy font-semibold text-xs transition-colors flex items-center justify-center gap-1"
        >
          Profile <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setBookingProvider(p)}
          disabled={!p.isAvailable}
          className="py-2.5 rounded-full bg-kolam-teal hover:bg-[#0B5852] disabled:bg-kolam-sunk disabled:text-ns-text-secondary disabled:cursor-not-allowed text-white font-semibold text-xs transition-colors"
        >
          {p.isAvailable ? 'Book now' : 'Unavailable'}
        </button>
      </div>
    </article>
  );
};
