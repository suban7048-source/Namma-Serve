import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, ShieldCheck, Star, Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setFilters, setPage, setIsAuthModalOpen, setAuthMode, isLoggedIn, role, setRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Anna Nagar');

  const handleBecomeProvider = () => {
    if (!isLoggedIn) {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
    } else if (role === 'provider') {
      setPage('provider-dashboard');
    } else {
      // Logged in as customer — switch to provider view
      setRole('provider');
      setPage('provider-dashboard');
    }
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      searchQuery: searchQuery,
      location: selectedLocation !== 'All Locations' ? selectedLocation : 'All Locations'
    }));
    setPage('discovery');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-sky-50/30 to-white text-slate-900 pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-slate-100">
      {/* Subtle Colorful Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-sky-400/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-brand-200/80 text-xs font-bold text-brand-800 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified & Background-Checked Local Professionals</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Find Trusted Local Services, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500">Anytime.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Book reliable professionals near you for everyday services — quickly, safely, and conveniently.
            </p>

            {/* Interactive Search Card */}
            <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-xl text-slate-900 max-w-2xl mx-auto lg:mx-0 border border-slate-200/80 mt-8">
              <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-center gap-3">
                
                {/* Service Search Input */}
                <div className="flex-1 flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl w-full border border-slate-200/80 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-500/10 transition-all">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="What service do you need? (e.g. Plumbing, Cleaning)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm w-full font-medium placeholder-slate-400 focus:outline-none text-slate-900"
                  />
                </div>

                {/* Location Selector */}
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-2xl sm:w-48 w-full border border-slate-200/80 focus-within:border-brand-500 focus-within:bg-white transition-all">
                  <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-slate-800 w-full focus:outline-none cursor-pointer"
                  >
                    <option value="Anna Nagar">Anna Nagar, Chennai</option>
                    <option value="T. Nagar">T. Nagar, Chennai</option>
                    <option value="Adyar">Adyar, Chennai</option>
                    <option value="Velachery">Velachery, Chennai</option>
                    <option value="Ambattur">Ambattur, Chennai</option>
                    <option value="OMR">OMR / Sholinganallur</option>
                    <option value="All Locations">All Locations</option>
                  </select>
                </div>

                {/* Primary CTA */}
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  Find Services
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Popular tags below input */}
              <div className="mt-3 px-2 flex items-center gap-2 text-xs text-slate-500 overflow-x-auto pb-1">
                <span className="font-semibold text-slate-400 shrink-0">Popular:</span>
                {['Plumbing', 'Deep Clean', 'Electrician', 'AC Tuneup', 'Handyman'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      setFilters(prev => ({ ...prev, searchQuery: tag }));
                      setPage('discovery');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 transition-colors text-[11px] font-medium text-slate-700 shrink-0 border border-slate-200/50"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleBecomeProvider}
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-brand-700 flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                Are you a skilled professional? 
                <span className="text-brand-600 group-hover:underline font-bold">Become a Provider →</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-200 text-center lg:text-left">
              <div>
                <p className="text-2xl font-extrabold text-slate-900 flex items-center justify-center lg:justify-start gap-1">
                  10,000+
                </p>
                <p className="text-xs text-slate-500 font-medium">Verified Local Pros</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 flex items-center justify-center lg:justify-start gap-1">
                  4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                </p>
                <p className="text-xs text-slate-500 font-medium">Average Service Rating</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 flex items-center justify-center lg:justify-start gap-1">
                  15 Mins
                </p>
                <p className="text-xs text-slate-500 font-medium">Average Response Time</p>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative mx-auto max-w-md">
              
              {/* Main Visual Showcase Card — White & Color Based Design */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 space-y-5 text-slate-900">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-700">Live in Chennai</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 rounded-full text-[10px] font-black uppercase tracking-wider">
                    Instant Booking
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-slate-900">Top Booked Services Today</h3>
                  <p className="text-xs text-slate-500">Fixed upfront pricing • 30-day warranty</p>
                </div>

                {/* Service Items Mini-List */}
                <div className="space-y-2.5">
                  {[
                    { name: 'AC Master Jet Servicing', cat: 'AC & HVAC', price: '₹499', duration: '45 mins', rating: '4.88', badgeBg: 'bg-sky-50 text-sky-700 border-sky-200' },
                    { name: 'Bathroom Deep Cleaning', cat: 'Cleaning', price: '₹799', duration: '60 mins', rating: '4.92', badgeBg: 'bg-teal-50 text-teal-700 border-teal-200' },
                    { name: 'Switchboard & MCB Repair', cat: 'Electrical', price: '₹199', duration: '30 mins', rating: '4.85', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200' },
                    { name: 'Pipe Leakage & Tap Fix', cat: 'Plumbing', price: '₹249', duration: '30 mins', rating: '4.90', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' }
                  ].map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-brand-500/40 hover:bg-brand-50/20 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-extrabold text-slate-900">{srv.name}</p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${srv.badgeBg}`}>
                            {srv.cat}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">
                          ★ {srv.rating} • ~{srv.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-black text-brand-700">{srv.price}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFilters(prev => ({ ...prev, searchQuery: srv.cat }));
                            setPage('discovery');
                          }}
                          className="px-2.5 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-[10px] font-black transition-colors shadow-xs cursor-pointer"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Safety & Trust Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ID Verified & Insured
                  </span>
                  <span className="text-slate-500">4.9★ from 10k+ users</span>
                </div>
              </div>

              {/* Clean Quick Assurance Pills */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/95 backdrop-blur-md text-slate-900 p-3 rounded-2xl border border-slate-200/90 shadow-soft flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 leading-tight">Same-Day Service</p>
                    <p className="text-[10px] text-slate-500">Slots open today</p>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-md text-slate-900 p-3 rounded-2xl border border-slate-200/90 shadow-soft flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 leading-tight">100% Guaranteed</p>
                    <p className="text-[10px] text-slate-500">Free 30-day revisit</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
