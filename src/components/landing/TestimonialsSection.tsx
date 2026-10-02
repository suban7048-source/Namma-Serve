import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { openAuthModal, isLoggedIn, setRole, setPage, role } = useApp();

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
    <>
      {/* Become a Provider CTA */}
      <section className="py-16 lg:py-20 bg-ns-navy" id="become-provider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Grow your local business with NammaServe
            </h2>
            <p className="mt-4 text-base text-white/70 leading-relaxed max-w-xl mx-auto">
              Get discovered by customers in your area, manage bookings and build your professional reputation.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleBecomeProvider}
                className="bg-white text-ns-navy hover:bg-slate-100 font-bold text-[15px] px-8 py-3.5 rounded-xl transition-colors flex items-center gap-2"
                id="cta-become-provider"
              >
                Become a Provider
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/70 hover:text-white font-semibold text-sm transition-colors flex items-center gap-1.5"
              >
                Learn how it works →
              </button>
            </div>

            {/* Provider stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              {[
                { value: '500+', label: 'Active professionals' },
                { value: '15k+', label: 'Bookings completed' },
                { value: '₹2L+', label: 'Avg. monthly earnings' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
