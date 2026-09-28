import React from 'react';
import { Search, Scale, CalendarCheck, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Request a Service',
      desc: 'Select the service you need, describe the problem, and add your preferred location.',
      icon: <Search className="w-6 h-6 text-brand-600" />
    },
    {
      num: '02',
      title: 'Compare Local Providers',
      desc: 'Browse verified professional profiles, transparent rates, past photos, and star reviews.',
      icon: <Scale className="w-6 h-6 text-brand-600" />
    },
    {
      num: '03',
      title: 'Choose & Schedule',
      desc: 'Pick your preferred date & time slot. Confirm upfront pricing with zero hidden fees.',
      icon: <CalendarCheck className="w-6 h-6 text-brand-600" />
    },
    {
      num: '04',
      title: 'Get the Job Done',
      desc: 'Track arrival in real time, message your provider directly, and pay safely upon completion.',
      icon: <CheckCircle2 className="w-6 h-6 text-brand-600" />
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white via-indigo-50/20 to-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How LocalFix Works
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Booking top-tier local experts has never been this fast, safe, and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 relative flex flex-col justify-between hover:shadow-card hover:border-brand-300 transition-all shadow-soft"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 shadow-soft border border-brand-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-brand-600/30 font-mono">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 border-t-2 border-dashed border-slate-300 z-10" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
