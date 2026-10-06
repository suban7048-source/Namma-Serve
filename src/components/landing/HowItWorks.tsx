import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Users, CalendarCheck, KeyRound } from 'lucide-react';
import { useTranslation } from '../../i18n';

/**
 * Numbered because this genuinely is a sequence — a booking moves through these
 * stages in order, and the fourth step (the completion code) is the one most
 * customers have not met before, so it earns its place here.
 */
export const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Search,
      title: t('landing.step1Title'),
      desc: t('landing.step1Sub')
    },
    {
      icon: Users,
      title: t('landing.step2Title'),
      desc: t('landing.step2Sub')
    },
    {
      icon: CalendarCheck,
      title: t('landing.step3Title'),
      desc: t('landing.step3Sub')
    },
    {
      icon: KeyRound,
      title: t('landing.step4Title'),
      desc: t('landing.step4Sub')
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-kolam-wash">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="max-w-2xl mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ns-navy">
            {t('landing.howTitle')}
          </h2>
          <p className="mt-3 text-[17px] text-ns-text-secondary leading-relaxed">
            {t('landing.howSub')}
          </p>
        </header>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ns-border border border-ns-border rounded-2xl overflow-hidden">
          {steps.map((step, idx) => (
            <li key={step.title} className="bg-kolam-surface p-6 lg:p-7 flex flex-col">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-brand-50 border border-kolam-indigo-line text-ns-primary font-display font-semibold text-sm flex items-center justify-center tnum shrink-0">
                  {idx + 1}
                </span>
                <step.icon className="w-[18px] h-[18px] text-kolam-marigold" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-[17px] font-semibold text-ns-navy leading-snug">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-ns-text-secondary leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
