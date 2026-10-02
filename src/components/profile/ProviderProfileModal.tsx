import React, { useState } from 'react';
import { Provider } from '../../types';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { Avatar, CoverImage } from '../common/Avatar';
import { 
  ShieldCheck, MapPin, Clock, Heart, Award, 
  Calendar, CheckCircle2, Phone, Mail, X, 
  Sparkles, Star, Image as ImageIcon, Wrench, MessageSquare, User 
} from 'lucide-react';

interface ProviderProfileModalProps {
  provider: Provider | null;
  onClose: () => void;
}

export const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({ provider: p, onClose }) => {
  const { 
    setBookingProvider, favorites, toggleFavorite, 
    cart, addToCart, updateCartQuantity, setReviewProvider, setIsAuthModalOpen, isLoggedIn
  } = useApp();
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews' | 'gallery'>('services');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  if (!p) return null;

  const isFav = favorites.includes(p.id);

  // Quality ratings breakdown calculation
  const avgQuality = p.reviews.length > 0
    ? (p.reviews.reduce((acc, r) => acc + (r.subRatings?.quality || r.rating), 0) / p.reviews.length).toFixed(1)
    : p.rating.toFixed(1);
    
  const avgProfessionalism = p.reviews.length > 0
    ? (p.reviews.reduce((acc, r) => acc + (r.subRatings?.professionalism || r.rating), 0) / p.reviews.length).toFixed(1)
    : p.rating.toFixed(1);

  const avgPunctuality = p.reviews.length > 0
    ? (p.reviews.reduce((acc, r) => acc + (r.subRatings?.punctuality || r.rating), 0) / p.reviews.length).toFixed(1)
    : p.rating.toFixed(1);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-ns-navy/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-kolam-surface rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-elevated border border-kolam-sunk relative my-auto">
        
        {/* Cover photograph. Every provider record carries a coverImage URL and
            nothing rendered it — the banner was a per-category CSS gradient. */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <CoverImage src={p.coverImage} alt={`${p.name} at work`} className="w-full h-full" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-ns-navy/80 via-ns-navy/25 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-4 left-6">
            <span className="bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-ns-navy shadow-sm">{p.category}</span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-ns-text hover:bg-white transition-colors shadow-md z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info Header */}
        <div className="px-6 sm:px-8 relative -mt-16 sm:-mt-20 pb-6 border-b border-kolam-sunk">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            
            <div className="flex items-end gap-5">
              <div className="relative">
                <Avatar name={p.name} src={p.avatar} size="xl" rounded="full" className="!ring-4 !ring-white shadow-card" priority />
                {p.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-kolam-teal text-white p-1.5 rounded-full border-2 border-white shadow" title="Verified Professional">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="space-y-1 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ns-navy">{p.name}</h2>
                  <span className="bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full border border-brand-100">
                    {p.category}
                  </span>
                </div>
                <p className="text-xs font-semibold text-ns-text-secondary">{p.businessName || `${p.name} Services`}</p>

                <div className="flex items-center gap-3 text-xs flex-wrap pt-1">
                  <RatingStars rating={p.rating} reviewCount={p.reviewCount} showNumeric />
                  <span className="text-ns-border">•</span>
                  <span className="text-ns-text-secondary font-semibold">{p.completedJobs} completed jobs</span>
                  <span className="text-ns-border">•</span>
                  <span className="text-ns-text-secondary font-semibold">{p.yearsExperience} yrs exp</span>
                </div>
              </div>
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0">
              <button
                onClick={() => toggleFavorite(p.id)}
                className="p-3 rounded-2xl border border-ns-border text-ns-text-secondary hover:text-kolam-kumkum transition-colors"
                title="Bookmark Provider"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-kolam-kumkum text-kolam-kumkum' : ''}`} />
              </button>

              <button
                onClick={() => {
                  onClose();
                  setBookingProvider(p);
                }}
                className="flex-1 sm:flex-initial bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-md transition-all text-center flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4" /> Book Now
              </button>
            </div>

          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="px-6 sm:px-8 py-4 bg-kolam-wash border-b border-kolam-sunk grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-ns-text-secondary">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
            <div>
              <p className="text-[10px] text-ns-text-secondary uppercase">Service Area</p>
              <p className="text-ns-navy">{p.location} ({p.serviceRadiusKm} km radius)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600 shrink-0" />
            <div>
              <p className="text-[10px] text-ns-text-secondary uppercase">Avg Response</p>
              <p className="text-ns-navy">{p.responseTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-kolam-teal shrink-0" />
            <div>
              <p className="text-[10px] text-ns-text-secondary uppercase">Next Slot</p>
              <p className="text-kolam-teal font-semibold">{p.nextAvailable}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-kolam-marigold shrink-0" />
            <div>
              <p className="text-[10px] text-ns-text-secondary uppercase">Verification</p>
              <p className="text-ns-navy">Licensed & Insured</p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 sm:px-8 border-b border-kolam-sunk flex items-center gap-8 text-sm font-semibold text-ns-text-secondary overflow-x-auto">
          {[
            { id: 'services', label: `Services & Rates (${p.offeredServices.length})` },
            { id: 'about', label: 'About & Bio' },
            { id: 'reviews', label: `Reviews (${p.reviewCount})` },
            { id: 'gallery', label: `Portfolio (${p.portfolio.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-brand-600 text-brand-600 font-semibold'
                  : 'border-transparent hover:text-ns-navy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-ns-navy text-lg">Offered Services & Pricing</h3>
                <span className="text-xs text-ns-text-secondary">Starting from <strong>₹{p.startingPrice}</strong></span>
              </div>

              <div className="space-y-4">
                {p.offeredServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-5 rounded-2xl border border-ns-border/80 bg-kolam-wash/50 hover:bg-kolam-wash flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-semibold text-ns-navy text-base">{service.name}</h4>
                        <span className="text-[11px] font-semibold text-ns-text-secondary bg-white px-2 py-0.5 rounded-md border border-ns-border">
                          ~{service.durationMinutes} mins
                        </span>
                      </div>
                      <p className="text-xs text-ns-text-secondary leading-relaxed max-w-xl">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ns-border">
                      <p className="text-lg font-semibold text-ns-navy">
                        ₹{service.price} <span className="text-xs font-normal text-ns-text-secondary">/{service.priceUnit}</span>
                      </p>

                      {/* Urban Company Cart Counter / Add Button */}
                      {cart.find(c => c.serviceId === service.id) ? (
                        <div className="flex items-center gap-1.5 bg-brand-50 border border-brand-200 rounded-xl px-2 py-1 shadow-2xs">
                          <button
                            onClick={() => updateCartQuantity(service.id, -1)}
                            className="text-brand-600 hover:text-brand-800 font-semibold px-1 text-sm"
                            title="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold text-brand-700 px-1">
                            {cart.find(c => c.serviceId === service.id)?.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(service.id, 1)}
                            className="text-brand-600 hover:text-brand-800 font-semibold px-1 text-sm"
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(p, service)}
                          className="bg-white hover:bg-brand-50 border border-brand-200 hover:border-brand-400 text-brand-600 font-semibold text-xs px-3 py-2 rounded-xl transition-all shadow-2xs"
                        >
                          + Add to Cart
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onClose();
                          setBookingProvider(p);
                        }}
                        className="bg-ns-navy hover:bg-ns-navy text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Availability Overview */}
              <div className="pt-6 border-t border-kolam-sunk">
                <h4 className="font-display font-semibold text-ns-navy text-sm mb-3">Live Weekly Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {p.availabilitySlots.map((slotGroup, idx) => (
                    <div key={idx} className="p-3 bg-kolam-surface border border-ns-border rounded-xl space-y-2">
                      <p className="text-xs font-semibold text-ns-navy border-b pb-1">{slotGroup.day}</p>
                      <div className="flex flex-wrap gap-1">
                        {slotGroup.slots.map((s, i) => (
                          <span key={i} className="text-[10px] font-semibold bg-kolam-teal-soft text-kolam-teal px-2 py-0.5 rounded-md border border-kolam-teal-soft">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-ns-navy text-lg mb-2">About {p.name}</h3>
                <p className="text-sm text-ns-text leading-relaxed font-normal">
                  {p.about}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-kolam-sunk">
                <div className="p-4 rounded-2xl bg-kolam-wash border border-ns-border/80 space-y-2">
                  <h4 className="font-display font-semibold text-xs text-ns-navy uppercase">Licenses & Badges</h4>
                  <ul className="text-xs text-ns-text-secondary space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-kolam-teal" /> Master Trade License #PL-94821
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-kolam-teal" /> ₹2Cr Commercial Liability Insurance
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-kolam-teal" /> Background Checked & ID Verified
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-kolam-wash border border-ns-border/80 space-y-2">
                  <h4 className="font-display font-semibold text-xs text-ns-navy uppercase">Service Specializations</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {p.subCategories.map((sc, i) => (
                      <span key={i} className="text-xs font-semibold bg-kolam-surface border border-ns-border px-2.5 py-1 rounded-lg text-ns-text">
                        {sc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Header with CTA */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-display font-semibold text-ns-navy text-lg">Customer Ratings & Reviews</h3>
                  <p className="text-xs text-ns-text-secondary">Verified reviews from verified Chennai customers</p>
                </div>
                <button
                  onClick={() => {
                    setReviewProvider(p);
                  }}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Star className="w-4 h-4 fill-white" /> Write a Review
                </button>
              </div>

              {/* Detailed Breakdown & Star Distribution */}
              <div className="bg-kolam-wash p-6 rounded-2xl border border-ns-border/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center md:border-r border-ns-border md:pr-4">
                  <p className="text-5xl font-semibold text-ns-navy">{p.rating.toFixed(1)}</p>
                  <div className="flex justify-center my-1.5">
                    <RatingStars rating={p.rating} size={20} />
                  </div>
                  <p className="text-xs text-ns-text-secondary">{p.reviewCount} verified reviews</p>
                </div>

                {/* 5-Star Distribution Bars */}
                <div className="space-y-1.5 md:border-r border-ns-border md:pr-4">
                  {[5, 4, 3, 2, 1].map(stars => {
                    const count = p.reviews.filter(r => Math.round(r.rating) === stars).length;
                    const pct = p.reviews.length > 0 ? (count / p.reviews.length) * 100 : (stars === 5 ? 85 : 10);
                    return (
                      <div key={stars} className="flex items-center gap-2 text-xs font-semibold text-ns-text-secondary">
                        <span className="w-7 text-right">{stars}★</span>
                        <div className="flex-1 bg-ns-border rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-kolam-marigold h-full rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-[10px] text-ns-text-secondary">{count}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Sub-ratings */}
                <div className="space-y-2 text-xs font-semibold text-ns-text">
                  <div className="flex items-center justify-between">
                    <span>Service Quality</span>
                    <span className="font-semibold text-ns-navy">{avgQuality} / 5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Professionalism</span>
                    <span className="font-semibold text-ns-navy">{avgProfessionalism} / 5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Punctuality</span>
                    <span className="font-semibold text-ns-navy">{avgPunctuality} / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Review list */}
              <div className="space-y-4">
                {p.reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl border border-ns-border/80 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0 font-semibold">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-xs text-ns-navy">{rev.authorName}</h4>
                          <span className="text-[10px] text-ns-text-secondary">{rev.date} • Service: {rev.serviceUsed}</span>
                        </div>
                      </div>
                      <RatingStars rating={rev.rating} />
                    </div>

                    <p className="text-xs text-ns-text leading-relaxed italic">
                      "{rev.comment}"
                    </p>

                    {rev.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {rev.tags.map((t, i) => (
                          <span key={i} className="text-[10px] font-semibold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-md">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              {p.portfolio.length === 0 ? (
                <div className="text-center p-8 text-ns-text-secondary text-xs">
                  No portfolio photos added yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.portfolio.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedGalleryImg(item.imageUrl)}
                      className="group relative rounded-2xl overflow-hidden border border-ns-border shadow-soft cursor-pointer h-48"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ns-navy/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                        <h4 className="font-display font-semibold text-sm">{item.title}</h4>
                        <p className="text-[11px] text-ns-border line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Gallery Image Preview Modal */}
      {selectedGalleryImg && (
        <div
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-60 bg-ns-navy/90 flex items-center justify-center p-4"
        >
          <img
            src={selectedGalleryImg}
            alt="Work preview"
            className="max-w-4xl max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
