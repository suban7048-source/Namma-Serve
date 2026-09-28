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
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-850 text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified & Background-Checked Local Professionals</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Find Trusted Local Services, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-300">Anytime.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Book reliable professionals near you for everyday services — quickly, safely, and conveniently.
            </p>

            {/* Interactive Search Card */}
            <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-elevated text-slate-900 max-w-2xl mx-auto lg:mx-0 border border-slate-100/20 mt-8">
              <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-center gap-3">
                
                {/* Service Search Input */}
                <div className="flex-1 flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl w-full border border-slate-200/80 focus-within:border-brand-500 focus-within:bg-white transition-all">
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
                  className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0"
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
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 transition-colors text-[11px] font-medium text-slate-700 shrink-0"
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
                className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors group"
              >
                Are you a skilled professional? 
                <span className="text-brand-400 group-hover:underline font-bold">Become a Provider →</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-800 text-center lg:text-left">
              <div>
                <p className="text-2xl font-extrabold text-white flex items-center justify-center lg:justify-start gap-1">
                  10,000+
                </p>
                <p className="text-xs text-slate-400 font-medium">Verified Local Pros</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white flex items-center justify-center lg:justify-start gap-1">
                  4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                </p>
                <p className="text-xs text-slate-400 font-medium">Average Service Rating</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white flex items-center justify-center lg:justify-start gap-1">
                  15 Mins
                </p>
                <p className="text-xs text-slate-400 font-medium">Average Response Time</p>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative mx-auto max-w-md">
              
              {/* Main Visual Showcase Card — Urban Company Service Style */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 space-y-5 text-white">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-300">Live in Chennai</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white">Top Booked Services Today</h3>
                  <p className="text-xs text-slate-400">Fixed upfront pricing • 30-day warranty</p>
                </div>

                {/* Service Items Mini-List */}
                <div className="space-y-2.5">
                  {[
                    { name: 'AC Master Jet Servicing', cat: 'AC & HVAC', price: '₹499', duration: '45 mins', rating: '4.88' },
                    { name: 'Bathroom Deep Cleaning', cat: 'Cleaning', price: '₹799', duration: '60 mins', rating: '4.92' },
                    { name: 'Switchboard & MCB Repair', cat: 'Electrical', price: '₹199', duration: '30 mins', rating: '4.85' },
                    { name: 'Pipe Leakage & Tap Fix', cat: 'Plumbing', price: '₹249', duration: '30 mins', rating: '4.90' }
                  ].map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/40 hover:bg-white/10 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-extrabold text-white">{srv.name}</p>
                          <span className="text-[9px] bg-slate-700/80 text-slate-300 px-1.5 py-0.2 rounded font-semibold">
                            {srv.cat}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">
                          ★ {srv.rating} • ~{srv.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-black text-emerald-400">{srv.price}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFilters(prev => ({ ...prev, searchQuery: srv.cat }));
                            setPage('discovery');
                          }}
                          className="px-2.5 py-1 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-[10px] font-black transition-colors shadow-2xs"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Safety & Trust Footer */}
                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ID Verified & Insured
                  </span>
                  <span className="text-slate-400">4.9★ from 10k+ users</span>
                </div>
              </div>

              {/* Clean Quick Assurance Pills */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/10 backdrop-blur-md text-white p-3 rounded-2xl border border-white/15 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white leading-tight">Same-Day Service</p>
                    <p className="text-[10px] text-slate-300">Slots open today</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md text-white p-3 rounded-2xl border border-white/15 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white leading-tight">100% Guaranteed</p>
                    <p className="text-[10px] text-slate-300">Free 30-day revisit</p>
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
