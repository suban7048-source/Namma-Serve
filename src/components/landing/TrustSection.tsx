import React from 'react';
import { ShieldCheck, UserCheck, DollarSign, Headset, Award, Lock } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustFeatures = [
    {
      icon: <UserCheck className="w-6 h-6 text-brand-600" />,
      iconBg: 'bg-brand-50 border-brand-200/80',
      title: 'Background Checked Professionals',
      desc: 'Every provider undergoes criminal record checks, license verification, and identity audits before listing.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border-emerald-200/80',
      title: 'Upfront & Transparent Pricing',
      desc: 'No hidden surcharges or surprise costs. See fixed or hourly rates clearly before you confirm.'
    },
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      iconBg: 'bg-amber-50 border-amber-200/80',
      title: '100% Quality Satisfaction Guarantee',
      desc: 'If the completed work does not meet professional standards, we step in to make it right.'
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-purple-50 border-purple-200/80',
      title: 'Secure & Escrow-style Booking',
      desc: 'Payments are held securely and released only after the service is marked complete to your satisfaction.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-brand-50/25 to-white text-slate-900 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Built On Trust & Reliability
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Safety & Peace of Mind Come First
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            LocalFix sets the industry standard for home service safety, provider verification, and booking protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-brand-500/50 shadow-soft hover:shadow-card transition-all space-y-4 group"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.iconBg} border flex items-center justify-center transition-transform group-hover:scale-105`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
