import React from 'react';
import { Search, Users, CalendarCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Find a service',
      desc: 'Search for the service you need.',
      icon: <Search className="w-6 h-6" />,
      color: 'text-ns-primary bg-brand-50 border-brand-200',
    },
    {
      num: '02',
      title: 'Choose a professional',
      desc: 'Compare ratings, pricing and experience.',
      icon: <Users className="w-6 h-6" />,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      num: '03',
      title: 'Book with confidence',
      desc: 'Choose a convenient time and confirm.',
      icon: <CalendarCheck className="w-6 h-6" />,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-20 bg-ns-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ns-navy tracking-tight font-display">
            How it works
          </h2>
          <p className="mt-3 text-base text-ns-text-secondary">
            Book a trusted professional in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-px bg-ns-border" />

          {steps.map((step, idx) => (
            <div key={step.num} className="relative text-center" id={`step-${step.num}`}>
              {/* Step Number */}
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border relative z-10 bg-white ${step.color}`}>
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-ns-text-secondary mt-3 uppercase tracking-wider">
                  Step {step.num}
                </span>
                <h3 className="text-lg font-bold text-ns-navy mt-2">{step.title}</h3>
                <p className="text-sm text-ns-text-secondary mt-1 max-w-[220px]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
