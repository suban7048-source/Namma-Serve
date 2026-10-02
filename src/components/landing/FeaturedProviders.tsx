import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { CategoryIcon } from '../common/Kolam';
import { ShieldCheck, MapPin, Star, ArrowRight } from 'lucide-react';

export const FeaturedProviders: React.FC = () => {
  const { providers, setActiveProviderProfile, setBookingProvider, setPage, language } = useApp();

  const featured = providers
    .filter(p => p.isVerified)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-ns-bg" id="find-professionals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ns-navy">
              {language === 'ta' ? 'நம்பகமான நிபுணர்கள்' : 'People, not profiles'}
            </h2>
            <p className="mt-3 text-[17px] text-ns-text-secondary leading-relaxed">
              {language === 'ta'
                ? 'சிறந்த மதிப்பீடுகளுடன் உங்கள் பகுதியில் பணியாற்றும் சரிபார்க்கப்பட்ட நிபுணர்கள்.'
                : 'Verified professionals working near you, rated by the customers who hired them.'}
            </p>
          </div>
          <button
            onClick={() => setPage('discovery')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ns-primary hover:text-kolam-kumkum transition-colors group self-start md:self-auto"
          >
            {language === 'ta' ? 'அனைவரையும் காண்க' : 'See everyone'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <article
              key={p.id}
              className="bg-kolam-surface border border-ns-border rounded-2xl overflow-hidden hover:shadow-card transition-all duration-200 flex flex-col"
              id={`provider-${p.id}`}
            >
              {/* The avatar URL has been in the data all along. */}
              <div className="p-5 pb-0 flex items-start gap-3.5">
                <Avatar name={p.name} src={p.avatar} size="md" rounded="full" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-ns-navy text-[17px] leading-tight truncate">
                    {p.name}
                  </h3>
                  {p.businessName && (
                    <p className="text-xs text-ns-text-secondary truncate mt-0.5">{p.businessName}</p>
                  )}
                  {p.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-kolam-teal mt-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {language === 'ta' ? 'ஐடி சரிபார்க்கப்பட்டது' : 'ID verified'}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-ns-text-secondary">
                  <CategoryIcon categoryName={p.category} className="w-4 h-4 text-ns-primary" showDot={false} />
                  <span>{p.category}</span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Star className="w-4 h-4 fill-kolam-marigold text-kolam-marigold" />
                  <span className="text-sm font-semibold text-ns-navy tnum">{p.rating.toFixed(1)}</span>
                  <span className="text-xs text-ns-text-secondary tnum">
                    ({p.reviewCount} {language === 'ta' ? 'மதிப்புரைகள்' : 'reviews'})
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-ns-text-secondary flex-1">
                  <p className="tnum">
                    {p.yearsExperience} {language === 'ta' ? 'ஆண்டு அனுபவம்' : 'years experience'}
                    {' · '}
                    {p.completedJobs} {language === 'ta' ? 'வேலைகள்' : 'jobs'}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="tnum">{p.distanceKm} km away</span>
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-ns-border/70">
                  <p className="text-xs text-ns-text-secondary">
                    {language === 'ta' ? 'தொடக்கம்' : 'From'}{' '}
                    <span className="font-display text-lg font-semibold text-ns-navy tnum">₹{p.visitCharge}</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button
                      onClick={() => setActiveProviderProfile(p)}
                      className="py-2 rounded-full border border-ns-border hover:border-brand-300 hover:bg-brand-50 text-ns-navy font-semibold text-xs transition-colors"
                    >
                      {language === 'ta' ? 'சுயவிவரம்' : 'Profile'}
                    </button>
                    <button
                      onClick={() => setBookingProvider(p)}
                      className="py-2 rounded-full bg-kolam-teal hover:bg-[#0B5852] text-white font-semibold text-xs transition-colors"
                    >
                      {language === 'ta' ? 'முன்பதிவு' : 'Book'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
