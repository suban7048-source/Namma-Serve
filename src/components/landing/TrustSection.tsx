import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, IndianRupee, KeyRound, RotateCcw, MessageSquareWarning } from 'lucide-react';
import { useTranslation } from '../../i18n';

/**
 * What the platform actually guarantees. Each promise is tied to a mechanism
 * that exists in the system rather than being a generic reassurance — the
 * completion code, the warranty window, the fixed quote.
 */
export const TrustSection: React.FC = () => {
  const { language } = useApp();
  const { t } = useTranslation();

  const PROMISES = [
    {
      icon: ShieldCheck,
      title: t('landing.trust1'),
      body: t('landing.trust1Sub')
    },
    {
      icon: IndianRupee,
      title: t('landing.trust2'),
      body: t('landing.trust2Sub')
    },
    {
      icon: RotateCcw,
      title: t('landing.trust3'),
      body: t('landing.trust3Sub')
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-ns-bg" id="why-nammaserve">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ns-navy">
            {t('landing.trustTitle')}
          </h2>
          <p className="mt-3 text-[17px] text-ns-text-secondary leading-relaxed">
            {language === 'ta'
              ? 'ஒவ்வொரு உறுதிமொழியும் செயல்படும் ஒரு வழிமுறையுடன் இணைக்கப்பட்டுள்ளது.'
              : 'Promises backed by something the platform actually does.'}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ns-border border border-ns-border rounded-2xl overflow-hidden">
          {PROMISES.map((promise) => (
            <div key={promise.title} className="bg-kolam-surface p-6 lg:p-7">
              <promise.icon className="w-6 h-6 text-ns-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display font-semibold text-ns-navy text-[17px] leading-snug">
                {promise.title}
              </h3>
              <p className="mt-2 text-sm text-ns-text-secondary leading-relaxed">
                {promise.body}
              </p>
            </div>
          ))}

          {/* Fills the sixth cell so the grid closes cleanly at three columns. */}
          <div className="bg-ns-navy kolam-field p-6 lg:p-7 flex items-end">
            <p className="font-display text-white text-lg font-medium leading-snug">
              {ta
                ? 'சென்னைக்காக, சென்னையில் உருவாக்கப்பட்டது.'
                : 'Built in Chennai, for Chennai.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
