import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPage, openDiscoveryWithCategory, openAuthModal, isLoggedIn, loggedInUser } = useApp();

  return (
    <footer className="bg-kolam-surface border-t border-ns-border pt-14 pb-24 md:pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-10 border-b border-ns-border/60">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-ns-navy flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 5.5C23 8.5 26.5 12 27 16c-0.5 4-4 7.5-11 10.5C9 23.5 5.5 20 5 16c0.5-4 4-7.5 11-10.5Z"
                        stroke="#F0A830" strokeWidth="1.8" />
                  <circle cx="16" cy="16" r="2.6" fill="#F0A830" />
                </svg>
              </div>
              <span className="font-display font-semibold text-xl text-ns-navy">
                Namma<span className="text-kolam-kumkum">Serve</span>
              </span>
            </div>
            <p className="font-tamil text-sm text-ns-primary mt-1">நம்ம ஊர், நம்ம ஆட்கள்</p>
            <p className="text-sm text-ns-text-secondary leading-relaxed max-w-sm">
              Verified local professionals across Chennai. Fixed prices, a completion
              code only you hold, and 30 days of warranty on every job.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-ns-navy text-sm mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-ns-text-secondary">
              {['AC Services', 'Plumbing', 'Electrical', 'Cleaning', 'Appliance Repair'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => openDiscoveryWithCategory(cat)}
                    className="hover:text-ns-primary transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-ns-navy text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-ns-text-secondary">
              <li><button className="hover:text-ns-primary transition-colors text-left">About</button></li>
              <li>
                <button
                  onClick={() => { setPage('landing'); setTimeout(() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
                  className="hover:text-ns-primary transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setPage('discovery')} className="hover:text-ns-primary transition-colors text-left">
                  Find Professionals
                </button>
              </li>
              <li>
                <button onClick={() => openAuthModal('signup', 'provider')} className="hover:text-ns-primary transition-colors text-left font-semibold">
                  Become a Provider
                </button>
              </li>
              <li><button className="hover:text-ns-primary transition-colors text-left">Contact</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-ns-navy text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm text-ns-text-secondary">
              <li><button className="hover:text-ns-primary transition-colors text-left">Help Center</button></li>
              <li><button className="hover:text-ns-primary transition-colors text-left">Booking Support</button></li>
              <li><button className="hover:text-ns-primary transition-colors text-left">FAQs</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-ns-navy text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-ns-text-secondary">
              <li><a href="#" className="hover:text-ns-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-ns-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-ns-primary transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ns-text-secondary">
          <p className="text-xs">© {new Date().getFullYear()} NammaServe Technologies Pvt. Ltd. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-ns-primary shrink-0" />
              <span>Chennai, Tamil Nadu</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-ns-primary shrink-0" />
              <span>support@nammaserve.in</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
