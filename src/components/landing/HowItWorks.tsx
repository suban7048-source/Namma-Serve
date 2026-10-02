import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Users, CalendarCheck, KeyRound } from 'lucide-react';

/**
 * Numbered because this genuinely is a sequence — a booking moves through these
 * stages in order, and the fourth step (the completion code) is the one most
 * customers have not met before, so it earns its place here.
 */
export const HowItWorks: React.FC = () => {
  const { language } = useApp();

  const steps = [
    {
      icon: Search,
      title: language === 'ta' ? 'சேவையைத் தேடுங்கள்' : 'Tell us what broke',
      desc: language === 'ta'
        ? 'உங்கள் பகுதியைத் தேர்ந்தெடுத்து தேவையான சேவையைத் தேடுங்கள்.'
        : 'Search the trade you need and pick your part of Chennai.'
    },
    {
      icon: Users,
      title: language === 'ta' ? 'நிபுணரைத் தேர்ந்தெடுங்கள்' : 'Choose your professional',
      desc: language === 'ta'
        ? 'மதிப்பீடுகள், விலை மற்றும் அனுபவத்தை ஒப்பிடுங்கள்.'
        : 'Compare ratings, fixed prices and years on the job.'
    },
    {
      icon: CalendarCheck,
      title: language === 'ta' ? 'நேரத்தை உறுதிப்படுத்துங்கள்' : 'Confirm a time',
      desc: language === 'ta'
        ? 'வசதியான நேரத்தைத் தேர்ந்தெடுத்து முன்பதிவு செய்யுங்கள்.'
        : 'Pick a slot. The price you see is the price you pay.'
    },
    {
      icon: KeyRound,
      title: language === 'ta' ? 'குறியீட்டால் முடிக்கவும்' : 'Close with your code',
      desc: language === 'ta'
        ? 'வேலை முடிந்ததும் உங்கள் 4-இலக்க குறியீட்டைச் சொல்லுங்கள்.'
        : 'Read out your 4-digit code only once the work is done.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-kolam-wash">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="max-w-2xl mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ns-navy">
            {language === 'ta' ? 'இது எப்படி வேலை செய்கிறது' : 'How a booking works'}
          </h2>
          <p className="mt-3 text-[17px] text-ns-text-secondary leading-relaxed">
            {language === 'ta'
              ? 'முன்பதிவு முதல் முடிவு வரை நான்கு படிகள்.'
              : 'Four steps from "the AC died" to a job signed off.'}
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
