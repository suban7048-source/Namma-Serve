import React, { useState } from 'react';
import { RatingStars } from '../common/RatingStars';
import { ChevronDown, Quote, CheckCircle2, User } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = [
    {
      quote: "Found Aarav within 10 minutes when our main drain clogged on a Sunday. He arrived fast, solved the issue cleanly, and saved us thousands in water damage!",
      name: "Sunita Rao",
      role: "Homeowner",
      location: "Anna Nagar, Chennai",
      rating: 5,
      service: "Plumbing Emergency"
    },
    {
      quote: "As a small electrical business owner, LocalFix helped me double my bookings in 3 months without expensive ads. The schedule manager is top notch.",
      name: "Rajesh Kumar",
      role: "Master Electrician",
      location: "Adyar, Chennai",
      rating: 5,
      service: "Local Fix Provider"
    },
    {
      quote: "The deep cleaning service before our move-out was immaculate. We got 100% of our rental deposit back! Super easy booking system.",
      name: "Neha Agarwal",
      role: "Tenant",
      location: "T. Nagar, Chennai",
      rating: 5,
      service: "Deep House Clean"
    }
  ];

  const faqs = [
    {
      q: "How does LocalFix verify service providers?",
      a: "Every provider on LocalFix passes a multi-tier screening process including government identity verification, professional license check, insurance documentation, and background review."
    },
    {
      q: "Can I choose my preferred date and time slot?",
      a: "Yes! You can view live real-time availability calendars on each provider profile and choose exact morning, afternoon, or evening time slots that suit your schedule."
    },
    {
      q: "What if I need to reschedule or cancel a booking?",
      a: "You can easily reschedule or cancel your service request directly from your Customer Dashboard with one click up to 2 hours before the scheduled appointment."
    },
    {
      q: "How are payments handled safely?",
      a: "Payments are safely processed using encrypted card processing. Funds are held in escrow and released to the provider only after you confirm the job is completed to your satisfaction."
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Real Stories
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Loved by Thousands of Customers & Pros
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-brand-400/40" />
                <RatingStars rating={item.rating} />
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center gap-3">
                {/* Initials avatar — no photo */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                  {item.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                  <p className="text-[10px] text-slate-500">{item.role} • {item.location}</p>
                  <span className="text-[10px] text-brand-600 font-semibold">{item.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-500 mt-1">Everything you need to know about booking services on LocalFix.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-100/60 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
