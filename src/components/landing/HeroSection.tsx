import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, ArrowRight, ShieldCheck, IndianRupee, Clock } from 'lucide-react';
import { CHENNAI_LOCALITIES } from '../../data/chennaiLocations';
import { KolamMark } from '../common/Kolam';

const CHENNAI_AREAS = CHENNAI_LOCALITIES.map(l => l.name);

export const HeroSection: React.FC = () => {
  const { setFilters, setPage, language } = useApp();
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
    <section className="relative bg-ns-navy overflow-hidden" id="hero">
      {/* The kolam dot field runs behind the whole hero rather than sitting in a
          corner as a logo — it is the brand, not an ornament. */}
      <div className="absolute inset-0 kolam-field opacity-[0.22]" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(104deg, #141D44 38%, rgba(20,29,68,0.55) 100%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-center">

          <div className="text-center lg:text-left">
            <p className="font-tamil text-kolam-marigold text-base sm:text-lg tracking-wide">
              நம்ம ஊர், நம்ம ஆட்கள்
            </p>

            <h1 className="mt-3 font-display text-[2.6rem] sm:text-5xl lg:text-[3.6rem] font-semibold text-white leading-[1.06] max-w-[16ch] mx-auto lg:mx-0">
              {language === 'ta' ? (
                <>உங்கள் தெருவில் <span className="text-kolam-marigold">யாரை அழைப்பது</span> என்று தெரியும்</>
              ) : (
                <>Your street already knows <span className="text-kolam-marigold">who to call</span></>
              )}
            </h1>

            <p className="mt-5 text-white/70 text-base sm:text-[17px] leading-relaxed max-w-xl mx-auto lg:mx-0">
              {language === 'ta'
                ? 'சென்னையில் உங்கள் பகுதியில் பணியாற்றும் சரிபார்க்கப்பட்ட பிளம்பர்கள், எலக்ட்ரீஷியன்கள் மற்றும் AC தொழில்நுட்ப வல்லுநர்கள் — இரண்டு நிமிடங்களில் முன்பதிவு.'
                : 'Verified plumbers, electricians and AC technicians working in your part of Chennai — booked in under two minutes.'}
            </p>

            {/* Search */}
            <form
              onSubmit={handleHeroSearch}
              className="mt-8 bg-kolam-surface rounded-2xl sm:rounded-full p-2 shadow-elevated max-w-2xl mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2"
            >
              <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5">
                <Search className="w-[18px] h-[18px] text-ns-text-secondary shrink-0" />
                <input
                  type="text"
                  placeholder={language === 'ta' ? 'என்ன சரிசெய்ய வேண்டும்?' : 'What needs fixing?'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[15px] w-full placeholder-ns-text-secondary/70 focus:outline-none text-ns-navy"
                  id="hero-search-input"
                />
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 sm:w-48 sm:border-l border-ns-border">
                <MapPin className="w-[18px] h-[18px] text-kolam-marigold shrink-0" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-ns-navy w-full focus:outline-none cursor-pointer"
                  id="hero-location-select"
                  aria-label="Service area"
                >
                  {CHENNAI_AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                  <option value="All Locations">{language === 'ta' ? 'சென்னை முழுவதும்' : 'All Chennai'}</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-kolam-kumkum hover:bg-[#9A2824] text-white font-semibold text-sm px-7 py-3 rounded-xl sm:rounded-full transition-colors flex items-center justify-center gap-2 shrink-0"
                id="hero-search-btn"
              >
                {language === 'ta' ? 'தேடு' : 'Search'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex items-center gap-2 text-sm flex-wrap justify-center lg:justify-start">
              <span className="text-white/45 text-xs">{language === 'ta' ? 'பிரபலம்:' : 'Popular:'}</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    setFilters(prev => ({ ...prev, searchQuery: tag }));
                    setPage('discovery');
                  }}
                  className="px-3 py-1 rounded-full border border-white/20 hover:border-kolam-marigold/70 hover:text-kolam-marigold text-white/70 text-xs transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Three promises, not a wall of invented statistics. */}
            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl mx-auto lg:mx-0">
              {[
                { icon: ShieldCheck, label: language === 'ta' ? 'ஐடி சரிபார்க்கப்பட்டது' : 'ID-verified pros',
                  sub: language === 'ta' ? 'ஒவ்வொருவரும் சரிபார்க்கப்பட்டவர்' : 'Every professional checked' },
                { icon: IndianRupee, label: language === 'ta' ? 'நிலையான விலை' : 'Fixed prices',
                  sub: language === 'ta' ? 'முன்பதிவுக்கு முன் தெரியும்' : 'Known before you book' },
                { icon: Clock, label: language === 'ta' ? '30 நாள் உத்தரவாதம்' : '30-day warranty',
                  sub: language === 'ta' ? 'ஒவ்வொரு வேலைக்கும்' : 'On every completed job' }
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-3 text-left">
                  <Icon className="w-[18px] h-[18px] text-kolam-marigold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">{label}</p>
                    <p className="text-white/50 text-xs mt-0.5 leading-snug">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The mark draws itself once, the way a kolam is made. */}
          <div className="hidden lg:block">
            <KolamMark className="w-full h-auto max-w-[320px] mx-auto" />
            <p className="text-center text-[10px] uppercase tracking-[0.18em] text-white/40 mt-5">
              Kolam · drawn in one line
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
