import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPage, openDiscoveryWithCategory, openAuthModal, isLoggedIn, loggedInUser } = useApp();

  return (
    <footer className="bg-white border-t border-ns-border pt-14 pb-24 md:pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-10 border-b border-ns-border/60">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-ns-navy flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <span className="font-extrabold text-xl text-ns-navy tracking-tight">
                Namma<span className="text-ns-primary">Serve</span>
              </span>
            </div>
            <p className="text-sm text-ns-text-secondary leading-relaxed max-w-sm">
              Trusted local services, made simple.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-ns-navy text-sm mb-4">Services</h4>
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
            <h4 className="font-bold text-ns-navy text-sm mb-4">Company</h4>
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
            <h4 className="font-bold text-ns-navy text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm text-ns-text-secondary">
              <li><button className="hover:text-ns-primary transition-colors text-left">Help Center</button></li>
              <li><button className="hover:text-ns-primary transition-colors text-left">Booking Support</button></li>
              <li><button className="hover:text-ns-primary transition-colors text-left">FAQs</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-ns-navy text-sm mb-4">Legal</h4>
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
