import React, { useState } from 'react';
import { Provider } from '../../types';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { InitialsAvatar } from '../common/InitialsAvatar';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-elevated border border-slate-100 relative my-auto">
        
        {/* Top banner — vibrant category gradient */}
        <div className="relative h-44 sm:h-52 overflow-hidden" style={{ background: getCategoryGradient(p.category) }}>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(255,255,255,0.2) 0%, transparent 60%), radial-gradient(circle at 85% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute bottom-4 left-6">
            <span className="bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">{p.category}</span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white transition-colors shadow-md z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info Header */}
        <div className="px-6 sm:px-8 relative -mt-16 sm:-mt-20 pb-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            
            <div className="flex items-end gap-5">
              <div className="relative">
                <InitialsAvatar name={p.name} size="xl" rounded="3xl" className="border-4 border-white shadow-card" />
                {p.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white shadow" title="Verified Professional">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="space-y-1 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{p.name}</h2>
                  <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full border border-brand-100">
                    {p.category}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500">{p.businessName || `${p.name} Services`}</p>

                <div className="flex items-center gap-3 text-xs flex-wrap pt-1">
                  <RatingStars rating={p.rating} reviewCount={p.reviewCount} showNumeric />
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-semibold">{p.completedJobs} completed jobs</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-semibold">{p.yearsExperience} yrs exp</span>
                </div>
              </div>
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0">
              <button
                onClick={() => toggleFavorite(p.id)}
                className="p-3 rounded-2xl border border-slate-200 text-slate-600 hover:text-rose-500 transition-colors"
                title="Bookmark Provider"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <button
                onClick={() => {
                  onClose();
                  setBookingProvider(p);
                }}
                className="flex-1 sm:flex-initial bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all text-center flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4" /> Book Now
              </button>
            </div>

          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Service Area</p>
              <p className="text-slate-800">{p.location} ({p.serviceRadiusKm} km radius)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Avg Response</p>
              <p className="text-slate-800">{p.responseTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Next Slot</p>
              <p className="text-emerald-700 font-bold">{p.nextAvailable}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Verification</p>
              <p className="text-slate-800">Licensed & Insured</p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 sm:px-8 border-b border-slate-100 flex items-center gap-8 text-sm font-bold text-slate-500 overflow-x-auto">
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
                  ? 'border-brand-600 text-brand-600 font-extrabold'
                  : 'border-transparent hover:text-slate-800'
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
                <h3 className="font-extrabold text-slate-900 text-lg">Offered Services & Pricing</h3>
                <span className="text-xs text-slate-500">Starting from <strong>₹{p.startingPrice}</strong></span>
              </div>

              <div className="space-y-4">
                {p.offeredServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-base">{service.name}</h4>
                        <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          ~{service.durationMinutes} mins
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <p className="text-lg font-black text-slate-900">
                        ₹{service.price} <span className="text-xs font-normal text-slate-500">/{service.priceUnit}</span>
                      </p>

                      {/* Urban Company Cart Counter / Add Button */}
                      {cart.find(c => c.serviceId === service.id) ? (
                        <div className="flex items-center gap-1.5 bg-brand-50 border border-brand-200 rounded-xl px-2 py-1 shadow-2xs">
                          <button
                            onClick={() => updateCartQuantity(service.id, -1)}
                            className="text-brand-600 hover:text-brand-800 font-black px-1 text-sm"
                            title="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-xs font-black text-brand-700 px-1">
                            {cart.find(c => c.serviceId === service.id)?.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(service.id, 1)}
                            className="text-brand-600 hover:text-brand-800 font-black px-1 text-sm"
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(p, service)}
                          className="bg-white hover:bg-brand-50 border border-brand-200 hover:border-brand-400 text-brand-600 font-extrabold text-xs px-3 py-2 rounded-xl transition-all shadow-2xs"
                        >
                          + Add to Cart
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onClose();
                          setBookingProvider(p);
                        }}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Availability Overview */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-extrabold text-slate-900 text-sm mb-3">Live Weekly Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {p.availabilitySlots.map((slotGroup, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-slate-800 border-b pb-1">{slotGroup.day}</p>
                      <div className="flex flex-wrap gap-1">
                        {slotGroup.slots.map((s, i) => (
                          <span key={i} className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
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
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">About {p.name}</h3>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {p.about}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="font-bold text-xs text-slate-900 uppercase">Licenses & Badges</h4>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Master Trade License #PL-94821
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ₹2Cr Commercial Liability Insurance
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Background Checked & ID Verified
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="font-bold text-xs text-slate-900 uppercase">Service Specializations</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {p.subCategories.map((sc, i) => (
                      <span key={i} className="text-xs font-semibold bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700">
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
                  <h3 className="font-extrabold text-slate-900 text-lg">Customer Ratings & Reviews</h3>
                  <p className="text-xs text-slate-500">Verified reviews from verified Chennai customers</p>
                </div>
                <button
                  onClick={() => {
                    setReviewProvider(p);
                  }}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Star className="w-4 h-4 fill-white" /> Write a Review
                </button>
              </div>

              {/* Detailed Breakdown & Star Distribution */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center md:border-r border-slate-200 md:pr-4">
                  <p className="text-5xl font-black text-slate-900">{p.rating.toFixed(1)}</p>
                  <div className="flex justify-center my-1.5">
                    <RatingStars rating={p.rating} size={20} />
                  </div>
                  <p className="text-xs text-slate-500">{p.reviewCount} verified reviews</p>
                </div>

                {/* 5-Star Distribution Bars */}
                <div className="space-y-1.5 md:border-r border-slate-200 md:pr-4">
                  {[5, 4, 3, 2, 1].map(stars => {
                    const count = p.reviews.filter(r => Math.round(r.rating) === stars).length;
                    const pct = p.reviews.length > 0 ? (count / p.reviews.length) * 100 : (stars === 5 ? 85 : 10);
                    return (
                      <div key={stars} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span className="w-7 text-right">{stars}★</span>
                        <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-amber-400 h-full rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-[10px] text-slate-400">{count}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Sub-ratings */}
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center justify-between">
                    <span>Service Quality</span>
                    <span className="font-bold text-slate-900">{avgQuality} / 5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Professionalism</span>
                    <span className="font-bold text-slate-900">{avgProfessionalism} / 5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Punctuality</span>
                    <span className="font-bold text-slate-900">{avgPunctuality} / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Review list */}
              <div className="space-y-4">
                {p.reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl border border-slate-200/80 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0 font-bold">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{rev.authorName}</h4>
                          <span className="text-[10px] text-slate-400">{rev.date} • Service: {rev.serviceUsed}</span>
                        </div>
                      </div>
                      <RatingStars rating={rev.rating} />
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed italic">
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
                <div className="text-center p-8 text-slate-400 text-xs">
                  No portfolio photos added yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.portfolio.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedGalleryImg(item.imageUrl)}
                      className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-soft cursor-pointer h-48"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <p className="text-[11px] text-slate-300 line-clamp-1">{item.description}</p>
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
          className="fixed inset-0 z-60 bg-slate-950/90 flex items-center justify-center p-4"
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
