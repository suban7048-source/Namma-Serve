import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NotificationCenter } from '../common/NotificationCenter';
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

  const handleNavSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      setFilters(prev => ({ ...prev, searchQuery: navSearch }));
      setPage('discovery');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-ns-border/60">
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
              <div className="w-8 h-8 rounded-lg bg-ns-navy flex items-center justify-center text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <span className="font-extrabold text-lg text-ns-navy tracking-tight hidden min-[380px]:block">
                Namma<span className="text-ns-primary">Serve</span>
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-[14px] font-semibold text-ns-navy">
              <button
                onClick={() => setPage('discovery')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  page === 'discovery'
                    ? 'text-ns-primary bg-brand-50'
                    : 'hover:text-ns-primary hover:bg-slate-50'
                }`}
                id="nav-services"
              >
                Services
              </button>
              <button
                onClick={() => setPage('discovery')}
                className="px-3 py-1.5 rounded-lg text-ns-navy hover:text-ns-primary hover:bg-slate-50 transition-colors"
                id="nav-find-professionals"
              >
                Find Professionals
              </button>
              <button
                onClick={() => {
                  setPage('landing');
                  setTimeout(() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-3 py-1.5 rounded-lg text-ns-navy hover:text-ns-primary hover:bg-slate-50 transition-colors"
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
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ns-border hover:border-ns-primary/30 hover:bg-slate-50 text-xs font-semibold text-ns-text-secondary transition-colors"
              id="nav-location"
            >
              <MapPin className="w-3.5 h-3.5 text-ns-primary shrink-0" />
              <span className="text-ns-navy font-bold max-w-[100px] truncate">{selectedArea.split(',')[0]}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Language Selector */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="hidden sm:flex items-center justify-center w-9 h-8 rounded-lg border border-ns-border hover:border-ns-primary/30 hover:bg-slate-50 text-xs font-extrabold text-ns-navy transition-colors shrink-0"
              title={language === 'en' ? "Switch to Tamil" : "Switch to English"}
            >
              {language === 'en' ? 'TA' : 'EN'}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-ns-border text-ns-text-secondary transition-colors"
              title="View Cart"
              id="nav-cart"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ns-primary text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
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
                        : 'bg-white hover:bg-slate-50 text-ns-text-secondary border-ns-border'
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
                        : 'bg-white hover:bg-slate-50 text-ns-text-secondary border-ns-border'
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
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white hover:bg-slate-50 text-ns-text-secondary border-ns-border'
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
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-ns-border hover:bg-slate-50 transition-colors text-sm font-semibold text-ns-navy"
                  id="nav-user-menu"
                >
                  <div className="w-7 h-7 rounded-full bg-ns-navy text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {(loggedInUser?.name ?? 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block max-w-[100px] truncate text-xs">{loggedInUser?.name}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-ns-border shadow-elevated z-50 overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-ns-border/60">
                      <p className="text-sm font-bold text-ns-navy truncate">{loggedInUser?.name}</p>
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
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ns-navy hover:bg-slate-50 transition-colors text-left"
                      >
                        <LayoutDashboard className="w-4 h-4 text-ns-primary" /> My Dashboard
                      </button>
                      {loggedInUser?.role === 'admin' && (
                        <button
                          onClick={() => { setRole('admin'); setPage('admin-dashboard'); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-indigo-700 hover:bg-indigo-50 transition-colors text-left"
                        >
                          <ShieldCheck className="w-4 h-4 text-indigo-600" /> Admin Console
                        </button>
                      )}
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
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
                  className="bg-ns-primary hover:bg-ns-primary-bright text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5"
                  id="nav-get-started"
                >
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ns-navy hover:bg-slate-50 rounded-lg"
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
            <span className="text-xs text-ns-primary font-bold">Change</span>
          </button>

          {isLoggedIn && (
            <div className="flex items-center gap-3 bg-ns-bg rounded-lg p-3 border border-ns-border">
              <div className="w-8 h-8 rounded-full bg-ns-navy text-white flex items-center justify-center font-bold text-sm shrink-0">
                {(loggedInUser?.name ?? 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-ns-navy truncate">{loggedInUser?.name}</p>
                <p className="text-xs text-ns-text-secondary truncate">{loggedInUser?.email}</p>
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-1 text-sm font-medium text-ns-navy">
            <button onClick={() => { setPage('discovery'); setMobileMenuOpen(false); }} className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-50">
              Services
            </button>
            <button onClick={() => { setPage('discovery'); setMobileMenuOpen(false); }} className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-50">
              Find Professionals
            </button>
            <button
              onClick={() => { setPage('landing'); setMobileMenuOpen(false); setTimeout(() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-50"
            >
              How It Works
            </button>
            {isLoggedIn && (
              <button
                onClick={() => { setPage(role === 'customer' ? 'customer-dashboard' : 'provider-dashboard'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 font-bold text-ns-primary"
              >
                My Dashboard
              </button>
            )}
          </nav>

          <div className="pt-2 border-t border-ns-border/60">
            {isLoggedIn ? (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-ns-primary text-white rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2"
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
