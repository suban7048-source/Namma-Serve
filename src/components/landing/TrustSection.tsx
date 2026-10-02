import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, IndianRupee, KeyRound, RotateCcw, MessageSquareWarning } from 'lucide-react';

/**
 * What the platform actually guarantees. Each promise is tied to a mechanism
 * that exists in the system rather than being a generic reassurance — the
 * completion code, the warranty window, the fixed quote.
 */
const PROMISES = [
  {
    icon: ShieldCheck,
    title: 'Every professional is ID-checked',
    titleTa: 'ஒவ்வொரு நிபுணரும் சரிபார்க்கப்படுகிறார்',
    body: 'Identity and address are verified before anyone appears in search. Verification status is on every profile.',
    bodyTa: 'தேடலில் தோன்றும் முன் அடையாளமும் முகவரியும் சரிபார்க்கப்படுகின்றன.'
  },
  {
    icon: IndianRupee,
    title: 'The quote is the price',
    titleTa: 'மேற்கோளே இறுதி விலை',
    body: 'Extra parts or labour need your approval before they are added. Nothing is charged that you have not seen.',
    bodyTa: 'கூடுதல் கட்டணங்களுக்கு உங்கள் ஒப்புதல் தேவை.'
  },
  {
    icon: KeyRound,
    title: 'Jobs close with your code',
    titleTa: 'உங்கள் குறியீட்டால் வேலை முடிகிறது',
    body: 'A four-digit code known only to you. The job cannot be marked complete until you read it out.',
    bodyTa: 'உங்களுக்கு மட்டும் தெரிந்த நான்கு இலக்க குறியீடு.'
  },
  {
    icon: RotateCcw,
    title: '30 days of warranty',
    titleTa: '30 நாள் உத்தரவாதம்',
    body: 'If the same fault returns inside the window, claim it from your bookings and we arrange the revisit.',
    bodyTa: 'அதே பிரச்சினை திரும்பினால், மறு வருகையை நாங்கள் ஏற்பாடு செய்வோம்.'
  },
  {
    icon: MessageSquareWarning,
    title: 'A real complaints route',
    titleTa: 'உண்மையான புகார் வழி',
    body: 'Raise an issue against a specific booking and it goes to a person, with a status you can follow.',
    bodyTa: 'ஒரு முன்பதிவுக்கு எதிராக புகார் அளிக்கலாம்; நிலையைத் தொடரலாம்.'
  }
];

export const TrustSection: React.FC = () => {
  const { language } = useApp();
  const ta = language === 'ta';

  return (
    <section className="py-16 lg:py-24 bg-ns-bg" id="why-nammaserve">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ns-navy">
            {ta ? 'நாங்கள் உறுதியளிப்பது' : 'What we actually guarantee'}
          </h2>
          <p className="mt-3 text-[17px] text-ns-text-secondary leading-relaxed">
            {ta
              ? 'ஒவ்வொரு உறுதிமொழியும் செயல்படும் ஒரு வழிமுறையுடன் இணைக்கப்பட்டுள்ளது.'
              : 'Five promises, each backed by something the platform actually does.'}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ns-border border border-ns-border rounded-2xl overflow-hidden">
          {PROMISES.map((promise) => (
            <div key={promise.title} className="bg-kolam-surface p-6 lg:p-7">
              <promise.icon className="w-6 h-6 text-ns-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display font-semibold text-ns-navy text-[17px] leading-snug">
                {ta ? promise.titleTa : promise.title}
              </h3>
              <p className="mt-2 text-sm text-ns-text-secondary leading-relaxed">
                {ta ? promise.bodyTa : promise.body}
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
