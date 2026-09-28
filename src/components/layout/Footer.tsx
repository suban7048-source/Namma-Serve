import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wrench, ShieldCheck, Heart, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPage, openDiscoveryWithCategory, setIsAuthModalOpen, setAuthMode } = useApp();

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200/90 pt-16 pb-24 md:pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold shadow-sm">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
                Local<span className="text-brand-600">Fix</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              LocalFix connects homeowners and businesses with background-checked, top-rated local professionals for plumbing, electrical, cleaning, painting, and everyday home services.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Satisfaction Guarantee
              </span>
            </div>
          </div>

          {/* Col 2: Popular Categories */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Popular Services</h4>
            <ul className="space-y-2.5 text-xs">
              {['Plumbing', 'Electrical', 'Cleaning', 'Appliance Repair', 'Painting', 'AC & HVAC'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => openDiscoveryWithCategory(cat)}
                    className="hover:text-brand-600 transition-colors text-left cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: For Customers & Pros */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setPage('discovery')} className="hover:text-brand-600 transition-colors cursor-pointer">
                  Find Local Professionals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setPage('landing');
                    setTimeout(() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="hover:text-brand-600 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setAuthMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="hover:text-brand-700 transition-colors text-brand-600 font-semibold cursor-pointer"
                >
                  Become a Provider
                </button>
              </li>
              <li>
                <button onClick={() => setPage('customer-dashboard')} className="hover:text-brand-600 transition-colors cursor-pointer">
                  Customer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setPage('provider-dashboard')} className="hover:text-brand-600 transition-colors cursor-pointer">
                  Provider Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Support */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Support & Trust</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span>Serving 50+ Metropolitan Cities</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span>24/7 Customer Support</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span>support@localfix.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LocalFix Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Safety Standard</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
