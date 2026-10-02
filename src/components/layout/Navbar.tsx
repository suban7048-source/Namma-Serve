import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NotificationCenter } from '../common/NotificationCenter';
import { Avatar } from '../common/Avatar';
import {
  Search, User, Menu, X, ArrowRight, LogOut, ChevronDown,
  MapPin, ShoppingBag, LayoutDashboard, ShieldCheck, UserCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role, setRole,
    page, setPage,
    setIsAuthModalOpen,
    setAuthMode,
    openAuthModal,
    isLoggedIn, loggedInUser, logout,
    filters, setFilters, openDiscoveryWithCategory,
    cartCount, setIsCartOpen, selectedArea, setIsLocationModalOpen,
    language, setLanguage
  } = useApp();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Jump to a section of the landing page from anywhere in the app.
   *
   * When we're already on the landing page the element is in the DOM and we can
   * scroll immediately. Coming from discovery or a dashboard, the section only
   * exists after React has committed the new page, so we poll briefly rather
   * than guessing a fixed delay.
   */
  const goToLandingSection = (sectionId: string) => {
    const scrollTo = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (page === 'landing' && scrollTo()) return;

    setPage('landing');

    let attempts = 0;
    const tick = () => {
      if (scrollTo() || attempts++ > 20) return;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const handleNavSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      setFilters(prev => ({ ...prev, searchQuery: navSearch }));
      setPage('discovery');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-kolam-surface/95 backdrop-blur-sm border-b border-ns-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8 shrink-0">
            {/* Logo */}
            <button
              onClick={() => setPage('landing')}
              className="flex items-center gap-2 group text-left focus:outline-none shrink-0"
              id="nav-logo"
            >
              <div className="w-9 h-9 rounded-xl bg-ns-navy flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 5.5C23 8.5 26.5 12 27 16c-0.5 4-4 7.5-11 10.5C9 23.5 5.5 20 5 16c0.5-4 4-7.5 11-10.5Z"
                        stroke="#F0A830" strokeWidth="1.8" />
                  <circle cx="16" cy="16" r="2.6" fill="#F0A830" />
                </svg>
              </div>
              <span className="font-display font-semibold text-lg text-ns-navy hidden min-[380px]:block">
                Namma<span className="text-kolam-kumkum">Serve</span>
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-[14px] font-semibold text-ns-navy">
              <button
                onClick={() => goToLandingSection('browse-services')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  page === 'landing'
                    ? 'text-ns-primary bg-brand-50'
                    : 'hover:text-ns-primary hover:bg-kolam-wash'
                }`}
                id="nav-services"
              >
                Services
              </button>
              <button
                onClick={() => setPage('discovery')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  page === 'discovery'
                    ? 'text-ns-primary bg-brand-50'
                    : 'text-ns-navy hover:text-ns-primary hover:bg-kolam-wash'
                }`}
                id="nav-find-professionals"
              >
                Find Professionals
              </button>
              <button
                onClick={() => goToLandingSection('how-it-works')}
                className="px-3 py-1.5 rounded-lg text-ns-navy hover:text-ns-primary hover:bg-kolam-wash transition-colors"
                id="nav-how-it-works"
              >
                How It Works
              </button>
            </nav>
          </div>

          {/* Right: Location + Auth + Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* Chennai Location Selector */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ns-border hover:border-ns-primary/30 hover:bg-kolam-wash text-xs font-semibold text-ns-text-secondary transition-colors"
              id="nav-location"
            >
              <MapPin className="w-3.5 h-3.5 text-ns-primary shrink-0" />
              <span className="text-ns-navy font-semibold max-w-[100px] truncate">{selectedArea.split(',')[0]}</span>
              <ChevronDown className="w-3 h-3 text-ns-text-secondary" />
            </button>

            {/* Language Selector */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="hidden sm:flex items-center justify-center w-9 h-8 rounded-lg border border-ns-border hover:border-ns-primary/30 hover:bg-kolam-wash text-xs font-semibold text-ns-navy transition-colors shrink-0"
              title={language === 'en' ? "Switch to Tamil" : "Switch to English"}
            >
              {language === 'en' ? 'TA' : 'EN'}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg hover:bg-kolam-wash border border-transparent hover:border-ns-border text-ns-text-secondary transition-colors"
              title="View Cart"
              id="nav-cart"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ns-primary text-white text-[10px] font-semibold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Dashboard link when logged in */}
            {isLoggedIn && (
              <div className="hidden md:flex items-center">
                {loggedInUser?.role === 'customer' && (
                  <button
                    onClick={() => { setRole('customer'); setPage('customer-dashboard'); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold border ${
                      page === 'customer-dashboard'
                        ? 'bg-brand-50 text-ns-primary border-brand-200'
                        : 'bg-white hover:bg-kolam-wash text-ns-text-secondary border-ns-border'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                  </button>
                )}
                {loggedInUser?.role === 'provider' && (
                  <button
                    onClick={() => { setRole('provider'); setPage('provider-dashboard'); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold border ${
                      page === 'provider-dashboard'
                        ? 'bg-ns-navy text-white border-ns-navy'
                        : 'bg-white hover:bg-kolam-wash text-ns-text-secondary border-ns-border'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" /> Provider Portal
                  </button>
                )}
                {loggedInUser?.role === 'admin' && (
                  <button
                    onClick={() => { setRole('admin'); setPage('admin-dashboard'); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold border ${
                      page === 'admin-dashboard'
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-white hover:bg-kolam-wash text-ns-text-secondary border-ns-border'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin
                  </button>
                )}
              </div>
            )}

            {/* Notifications */}
            <NotificationCenter />

            {/* Auth Section */}
            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-ns-border hover:bg-kolam-wash transition-colors text-sm font-semibold text-ns-navy"
                  id="nav-user-menu"
                >
                  <Avatar name={loggedInUser?.name ?? 'User'} size="sm" rounded="full" className="!w-7 !h-7 !text-[10px]" />
                  <span className="hidden md:block max-w-[100px] truncate text-xs">{loggedInUser?.name}</span>
                  <ChevronDown className={`w-3 h-3 text-ns-text-secondary transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-kolam-surface rounded-xl border border-ns-border shadow-elevated z-50 overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-ns-border/60">
                      <p className="text-sm font-semibold text-ns-navy truncate">{loggedInUser?.name}</p>
                      <p className="text-xs text-ns-text-secondary truncate mt-0.5">{loggedInUser?.email}</p>
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      <button
                        onClick={() => {
                          if (loggedInUser?.role === 'provider') { setRole('provider'); setPage('provider-dashboard'); }
                          else if (loggedInUser?.role === 'admin') { setRole('admin'); setPage('admin-dashboard'); }
                          else { setRole('customer'); setPage('customer-dashboard'); }
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ns-navy hover:bg-kolam-wash transition-colors text-left"
                      >
                        <LayoutDashboard className="w-4 h-4 text-ns-primary" /> My Dashboard
                      </button>
                      {loggedInUser?.role === 'admin' && (
                        <button
                          onClick={() => { setRole('admin'); setPage('admin-dashboard'); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-brand-700 hover:bg-brand-50 transition-colors text-left"
                        >
                          <ShieldCheck className="w-4 h-4 text-brand-600" /> Admin Console
                        </button>
                      )}
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-kolam-kumkum hover:bg-kolam-kumkum-soft transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                  className="text-sm font-semibold text-ns-navy hover:text-ns-primary transition-colors px-3 py-1.5 hidden sm:block"
                  id="nav-login"
                >
                  Log in
                </button>
                <button
                  onClick={() => openAuthModal('signup', 'customer')}
                  className="bg-ns-primary hover:bg-ns-primary-bright text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5"
                  id="nav-get-started"
                >
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ns-navy hover:bg-kolam-wash rounded-lg"
              id="nav-mobile-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-ns-border bg-white px-4 pt-3 pb-5 space-y-3 animate-fade-in">
          <form onSubmit={handleNavSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-ns-text-secondary absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search services..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full bg-ns-bg border border-ns-border rounded-lg text-sm py-2 pl-9 pr-4 text-ns-navy focus:outline-none focus:border-ns-primary transition-colors"
            />
          </form>

          <button
            onClick={() => { setIsLocationModalOpen(true); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-ns-bg border border-ns-border text-sm text-ns-navy transition-colors"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-ns-primary" />
              <span className="font-semibold">{selectedArea}</span>
            </div>
            <span className="text-xs text-ns-primary font-semibold">Change</span>
          </button>

          {isLoggedIn && (
            <div className="flex items-center gap-3 bg-ns-bg rounded-lg p-3 border border-ns-border">
              <Avatar name={loggedInUser?.name ?? 'User'} size="sm" rounded="full" className="!w-8 !h-8 !text-xs" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ns-navy truncate">{loggedInUser?.name}</p>
                <p className="text-xs text-ns-text-secondary truncate">{loggedInUser?.email}</p>
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-1 text-sm font-medium text-ns-navy">
            <button
              onClick={() => { setMobileMenuOpen(false); goToLandingSection('browse-services'); }}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-kolam-wash"
            >
              Services
            </button>
            <button onClick={() => { setPage('discovery'); setMobileMenuOpen(false); }} className="text-left px-3 py-2.5 rounded-lg hover:bg-kolam-wash">
              Find Professionals
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); goToLandingSection('how-it-works'); }}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-kolam-wash"
            >
              How It Works
            </button>
            {isLoggedIn && (
              <button
                onClick={() => { setPage(role === 'customer' ? 'customer-dashboard' : 'provider-dashboard'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2.5 rounded-lg hover:bg-kolam-wash font-semibold text-ns-primary"
              >
                My Dashboard
              </button>
            )}
          </nav>

          <div className="pt-2 border-t border-ns-border/60">
            {isLoggedIn ? (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-kolam-kumkum-soft border border-kolam-kumkum-line text-kolam-kumkum rounded-lg font-semibold text-sm text-center flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-ns-primary text-white rounded-lg font-semibold text-sm text-center flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> Log In / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
