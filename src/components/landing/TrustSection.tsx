import React from 'react';
import { ShieldCheck, DollarSign, Lock, RotateCcw, Star } from 'lucide-react';

const BENEFITS = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Verified professionals',
    description: 'Background-checked and trusted.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Transparent pricing',
    description: 'Know the expected cost before booking.',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Secure booking',
    description: 'Book your service with confidence.',
    color: 'text-ns-primary bg-brand-50 border-brand-200',
  },
  {
    icon: <RotateCcw className="w-6 h-6" />,
    title: 'Service warranty',
    description: 'Support if something goes wrong.',
    color: 'text-violet-600 bg-violet-50 border-violet-200',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Verified reviews',
    description: 'Hear from real customers.',
    color: 'text-rose-600 bg-rose-50 border-rose-200',
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-white" id="why-nammaserve">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ns-navy tracking-tight font-display">
            Why customers choose NammaServe
          </h2>
          <p className="mt-3 text-base text-ns-text-secondary max-w-xl mx-auto">
            Everything you need for a reliable home service experience.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white border border-ns-border rounded-xl p-6 text-center hover:shadow-card transition-all duration-200"
              id={`benefit-${idx}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mx-auto mb-4 ${benefit.color}`}>
                {benefit.icon}
              </div>
              <h3 className="font-bold text-ns-navy text-[15px] mb-1.5">{benefit.title}</h3>
              <p className="text-sm text-ns-text-secondary leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
