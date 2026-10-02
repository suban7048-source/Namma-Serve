import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';
import { KolamMark } from '../common/Kolam';

/**
 * The "become a provider" call to action, extracted out of
 * TestimonialsSection, where it had been living under a name that promised
 * something else entirely.
 */
export const ProviderCTA: React.FC = () => {
  const { openAuthModal, isLoggedIn, setRole, setPage, role, language } = useApp();

  const handleBecomeProvider = () => {
    if (!isLoggedIn) {
      openAuthModal('signup', 'provider');
    } else if (role === 'provider') {
      setPage('provider-dashboard');
    } else {
      setRole('provider');
      setPage('provider-dashboard');
    }
  };

  return (
    <section className="relative bg-ns-navy overflow-hidden" id="become-provider">
      <div className="absolute inset-0 kolam-field opacity-[0.18]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 items-center">
          <div className="max-w-2xl">
            <p className="font-tamil text-kolam-marigold text-base">உங்கள் தொழிலை வளர்த்துக் கொள்ளுங்கள்</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-white leading-tight">
              {language === 'ta'
                ? 'உங்கள் பகுதியிலேயே அதிக வேலைகள்'
                : 'More work, from the streets you already know'}
            </h2>
            <p className="mt-4 text-white/70 text-[17px] leading-relaxed">
              {language === 'ta'
                ? 'உங்கள் பகுதியில் உள்ள வாடிக்கையாளர்கள் உங்களைக் கண்டறியட்டும். முன்பதிவுகளை நிர்வகித்து, நற்பெயரை உருவாக்குங்கள்.'
                : 'Let customers in your area find you. Manage bookings, set your own prices, and build a public record of work you can point to.'}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={handleBecomeProvider}
                className="bg-kolam-marigold hover:bg-[#DD9826] text-ns-navy font-semibold text-[15px] px-7 py-3.5 rounded-full transition-colors flex items-center gap-2 shadow-marigold"
                id="cta-become-provider"
              >
                {language === 'ta' ? 'நிபுணராக இணையுங்கள்' : 'Register as a professional'}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white/65 hover:text-white font-medium text-sm transition-colors underline underline-offset-4 decoration-white/25"
              >
                {language === 'ta' ? 'இது எப்படி வேலை செய்கிறது' : 'See how it works first'}
              </button>
            </div>

            <p className="mt-6 text-xs text-white/40">
              {language === 'ta'
                ? 'பதிவு இலவசம். சரிபார்ப்புக்குப் பிறகு வேலைகள் வரத் தொடங்கும்.'
                : 'Registration is free. Jobs start arriving once your ID check clears.'}
            </p>
          </div>

          <div className="hidden lg:block">
            <KolamMark className="w-full h-auto max-w-[240px] mx-auto" animate={false} tone="#F0A830" />
          </div>
        </div>
      </div>
    </section>
  );
};
