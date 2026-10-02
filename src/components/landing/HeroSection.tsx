import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, ArrowRight, CheckCircle2, ShieldCheck, DollarSign, Lock } from 'lucide-react';
import { CHENNAI_LOCALITIES } from '../../data/chennaiLocations';

const CHENNAI_AREAS = CHENNAI_LOCALITIES.map(l => l.name);

export const HeroSection: React.FC = () => {
  const { setFilters, setPage, openAuthModal, isLoggedIn, role, setRole, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Anna Nagar');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      searchQuery,
      location: selectedLocation !== 'All Locations' ? selectedLocation : 'All Locations'
    }));
    setPage('discovery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const popularTags = ['AC Repair', 'Plumbing', 'Cleaning', 'Electrical', 'Appliance Repair'];

  return (
    <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-24" id="hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-ns-navy tracking-tight leading-[1.1] font-display">
                {language === 'ta' 
                  ? 'சரியான நேரத்தில், நம்பகமான சேவை.'
                  : 'Reliable help, right when you need it.'}
              </h1>
              <p className="text-base sm:text-lg text-ns-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {language === 'ta'
                  ? 'சென்னையில் உங்கள் வீட்டுத் தேவைகளுக்கான சிறந்த நிபுணர்களைக் கண்டறியுங்கள். சேவைகளை ஒப்பிட்டு, சில நிமிடங்களில் முன்பதிவு செய்யுங்கள்.'
                  : 'Find trusted professionals for home services across Chennai. Compare services, check availability and book in minutes.'}
              </p>
            </div>

            {/* Search Container */}
            <div className="max-w-xl mx-auto lg:mx-0">
              <form onSubmit={handleHeroSearch} className="bg-white border border-ns-border rounded-2xl p-2 shadow-card">
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Service search */}
                  <div className="flex-1 flex items-center gap-2.5 bg-ns-bg px-4 py-3 rounded-xl">
                    <Search className="w-[18px] h-[18px] text-ns-text-secondary shrink-0" />
                    <input
                      type="text"
                      placeholder={language === 'ta' ? 'உங்களுக்கு என்ன சேவை தேவை?' : 'What service do you need?'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-[15px] w-full font-medium placeholder-slate-400 focus:outline-none text-ns-navy"
                      id="hero-search-input"
                    />
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 bg-ns-bg px-4 py-3 rounded-xl sm:w-44">
                    <MapPin className="w-[18px] h-[18px] text-ns-primary shrink-0" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="bg-transparent text-sm font-semibold text-ns-navy w-full focus:outline-none cursor-pointer"
                      id="hero-location-select"
                    >
                      {CHENNAI_AREAS.map(area => (
                        <option key={area} value={area}>{area}, Chennai</option>
                      ))}
                      <option value="All Locations">{language === 'ta' ? 'சென்னை முழுவதும்' : 'All Chennai'}</option>
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="bg-ns-primary hover:bg-ns-primary-bright text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0"
                    id="hero-search-btn"
                  >
                    {language === 'ta' ? 'சேவைகளை தேடு' : 'Search Services'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Popular tags */}
              <div className="mt-4 flex items-center gap-2 text-sm flex-wrap justify-center lg:justify-start">
                <span className="text-ns-text-secondary font-medium">{language === 'ta' ? 'பிரபலம்:' : 'Popular:'}</span>
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      setFilters(prev => ({ ...prev, searchQuery: tag }));
                      setPage('discovery');
                    }}
                    className="px-3 py-1 rounded-lg bg-ns-bg border border-ns-border hover:border-ns-primary/40 hover:bg-brand-50 text-ns-text-secondary hover:text-ns-primary text-xs font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />, label: language === 'ta' ? 'சரிபார்க்கப்பட்ட நிபுணர்கள்' : 'Verified Professionals', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                { icon: <DollarSign className="w-4 h-4 text-amber-600" />, label: language === 'ta' ? 'தெளிவான விலை' : 'Transparent Pricing', color: 'text-amber-700 bg-amber-50 border-amber-200' },
                { icon: <Lock className="w-4 h-4 text-ns-primary" />, label: language === 'ta' ? 'பாதுகாப்பான முன்பதிவு' : 'Secure Booking', color: 'text-ns-primary bg-brand-50 border-brand-200' },
                { icon: <CheckCircle2 className="w-4 h-4 text-violet-600" />, label: language === 'ta' ? 'சேவைக்கான உத்தரவாதம்' : 'Service Warranty', color: 'text-violet-700 bg-violet-50 border-violet-200' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="text-ns-navy text-[13px]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual / Stats Panel */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main visual card */}
              <div className="bg-emerald-950 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium text-white/80">{language === 'ta' ? 'சென்னையில் நேரலையில்' : 'Live in Chennai'}</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-3xl font-extrabold">500+</p>
                    <p className="text-sm text-white/60 mt-1">{language === 'ta' ? 'சரிபார்க்கப்பட்ட நிபுணர்கள்' : 'Verified Professionals'}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-3xl font-extrabold">4.8<span className="text-amber-400 ml-1">★</span></p>
                    <p className="text-sm text-white/60 mt-1">{language === 'ta' ? 'சராசரி மதிப்பீடு' : 'Average Rating'}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-3xl font-extrabold">15k+</p>
                    <p className="text-sm text-white/60 mt-1">{language === 'ta' ? 'முடிந்த முன்பதிவுகள்' : 'Bookings Completed'}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-3xl font-extrabold">15 min</p>
                    <p className="text-sm text-white/60 mt-1">{language === 'ta' ? 'சராசரி பதில் நேரம்' : 'Avg Response Time'}</p>
                  </div>
                </div>

                {/* Mini provider cards */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-white/50 uppercase tracking-wider">{language === 'ta' ? 'அருகிலுள்ள நிபுணர்கள்' : 'Nearby professionals'}</p>
                  {[
                    { name: 'Ravi Kumar', cat: 'AC Expert', rating: '4.8', price: '₹499', accent: 'bg-emerald-600' },
                    { name: 'Arun S.', cat: 'Plumbing', rating: '4.9', price: '₹349', accent: 'bg-amber-500' },
                    { name: 'Priya M.', cat: 'Cleaning', rating: '4.7', price: '₹599', accent: 'bg-rose-500' },
                  ].map((pro, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${pro.accent} flex items-center justify-center text-white font-bold text-xs`}>
                          {pro.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white flex items-center gap-1.5">
                            {pro.name}
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          </p>
                          <p className="text-xs text-white/50">{pro.cat} · ★ {pro.rating}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{pro.price}</p>
                        <p className="text-[10px] text-white/40">starting</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-4 -left-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 shadow-card flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-emerald-800">{language === 'ta' ? 'பின்னணி சரிபார்க்கப்பட்டது' : 'Background Verified'}</p>
                  <p className="text-[10px] text-emerald-600">{language === 'ta' ? 'அனைத்து நிபுணர்களின் ஐடியும் சரிபார்க்கப்பட்டது' : 'All professionals ID-checked'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
