import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { authApi, toUiRole } from '../../services/api';
import {
  User, UserCheck, Mail, Lock, ArrowRight, X, Loader2, AlertCircle
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen, setIsAuthModalOpen,
    authMode, setAuthMode,
    authRoleLock, setAuthRoleLock,
    setPage, login
  } = useApp();
  const { showToast } = useToast();

  const [selectedRole, setSelectedRole] = useState<'customer' | 'provider'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Plumbing');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (authRoleLock) {
      setSelectedRole(authRoleLock);
    }
  }, [authRoleLock, isAuthModalOpen]);

  // A stale error from a previous attempt should not greet the next one.
  useEffect(() => {
    setFormError(null);
  }, [authMode, selectedRole, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setAuthRoleLock(null);
    setFormError(null);
    setPassword('');
  };

  const isProviderSignup = authMode === 'signup' && (authRoleLock === 'provider' || selectedRole === 'provider');

  const landingPageFor = (uiRole: 'customer' | 'provider' | 'admin') =>
    uiRole === 'admin' ? 'admin-dashboard'
      : uiRole === 'provider' ? 'provider-dashboard'
      : 'customer-dashboard';

  /**
   * Both branches go to the backend. The previous implementation never made a
   * network call at all: it accepted any email with any password, derived a
   * display name from the address, and carried a hardcoded admin credential
   * pair in the client bundle. The role shown after sign-in now comes from the
   * server's response, not from which tab the form was on.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setFormError(null);
    setIsSubmitting(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();

      const result = authMode === 'signup'
        ? await authApi.register({
            name: fullName.trim(),
            email: trimmedEmail,
            phone: phone.trim(),
            password,
            role: selectedRole,
            ...(selectedRole === 'provider'
              ? { category, businessName: businessName.trim() || undefined }
              : {})
          })
        : await authApi.login(trimmedEmail, password);

      if (!result.ok || !result.data?.token) {
        setFormError(result.ok ? 'The server did not return a session. Please try again.' : result.error);
        return;
      }

      const auth = result.data;
      const uiRole = toUiRole(auth.role);

      login(auth);
      setPassword('');
      setIsAuthModalOpen(false);
      setAuthRoleLock(null);
      setPage(landingPageFor(uiRole));

      showToast(
        `Welcome${auth.name ? `, ${auth.name}` : ''}`,
        uiRole === 'admin' ? 'Signed in to the admin console'
          : uiRole === 'provider' ? 'Signed in to your professional portal'
          : 'Signed in to your account',
        'success'
      );

      // Signing in as a customer with a technician account (or the reverse) is
      // not an error, but it is worth saying out loud.
      if (authMode === 'login' && uiRole !== 'admin' && uiRole !== selectedRole) {
        showToast(
          'Signed in to your actual account type',
          `This email is registered as a ${uiRole === 'provider' ? 'service professional' : 'customer'}.`,
          'info'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isProviderView = authRoleLock === 'provider' || selectedRole === 'provider';

  const inputClass =
    'w-full bg-kolam-sunk border border-ns-border rounded-xl px-3.5 py-3 text-sm text-ns-navy ' +
    'placeholder-ns-text-secondary/60 focus:outline-none focus:border-brand-400 focus:bg-white transition-colors ' +
    'disabled:opacity-60';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ns-navy/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-kolam-surface rounded-2xl max-w-md w-full shadow-elevated border border-ns-border relative my-auto overflow-hidden max-h-[92vh] flex flex-col">

        {/* Kolam header band */}
        <div className="relative bg-ns-navy px-6 sm:px-8 pt-7 pb-6 shrink-0">
          <div className="absolute inset-0 kolam-field opacity-20" aria-hidden="true" />

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-kolam-marigold">
              {isProviderView ? <UserCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>

            <h3 id="auth-modal-title" className="mt-4 font-display text-xl font-semibold text-white">
              {authMode === 'login'
                ? (isProviderView ? 'Professional sign in' : 'Sign in to NammaServe')
                : (isProviderSignup ? 'Register your business' : 'Create your account')}
            </h3>
            <p className="text-[13px] text-white/60 mt-1.5 leading-relaxed">
              {authMode === 'login'
                ? 'Your bookings, messages and warranty claims, all in one place.'
                : (isProviderSignup
                    ? 'Start receiving jobs from customers across Chennai.'
                    : 'Book verified professionals in your neighbourhood.')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 overflow-y-auto">

          {/* Account type */}
          {authRoleLock ? (
            <div className="bg-brand-50 border border-kolam-indigo-line text-ns-primary px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold">
              {authRoleLock === 'provider' ? <UserCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
              <span>{authRoleLock === 'provider' ? 'Service professional' : 'Customer account'}</span>
            </div>
          ) : (
            <div
              className="bg-kolam-sunk p-1 rounded-full flex items-center gap-1 text-xs font-semibold"
              role="group"
              aria-label="Account type"
            >
              {(['customer', 'provider'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  aria-pressed={selectedRole === r}
                  className={`flex-1 py-2.5 rounded-full text-center transition-all flex items-center justify-center gap-1.5 ${
                    selectedRole === r
                      ? 'bg-ns-primary text-white shadow-soft'
                      : 'text-ns-text-secondary hover:text-ns-navy'
                  }`}
                >
                  {r === 'customer' ? <User className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                  {r === 'customer' ? 'Customer' : 'Professional'}
                </button>
              ))}
            </div>
          )}

          {/* Server-reported failure. Says what went wrong, which the old
              modal could not do because it never contacted the server. */}
          {formError && (
            <div
              role="alert"
              className="flex items-start gap-2.5 bg-kolam-kumkum-soft border border-kolam-kumkum-line text-kolam-kumkum rounded-xl px-3.5 py-3"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-[13px] leading-relaxed font-medium">{formError}</p>
            </div>
          )}

          {authMode === 'signup' && (
            <>
              <div className="space-y-1.5">
                <label htmlFor="auth-name" className="text-xs font-semibold text-ns-navy">Full name</label>
                <input
                  id="auth-name" type="text" required autoComplete="name"
                  placeholder="Aakash Malhotra"
                  value={fullName} onChange={(e) => setFullName(e.target.value)}
                  disabled={isSubmitting} className={inputClass}
                />
              </div>

              {selectedRole === 'provider' && (
                <>
                  <div className="space-y-1.5">
                    <label htmlFor="auth-business" className="text-xs font-semibold text-ns-navy">
                      Business name <span className="font-normal text-ns-text-secondary">(optional)</span>
                    </label>
                    <input
                      id="auth-business" type="text" autoComplete="organization"
                      placeholder="Sharma Plumbing & Drainage"
                      value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                      disabled={isSubmitting} className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="auth-category" className="text-xs font-semibold text-ns-navy">Primary trade</label>
                    <select
                      id="auth-category" value={category} onChange={(e) => setCategory(e.target.value)}
                      disabled={isSubmitting}
                      className={`${inputClass} font-medium cursor-pointer`}
                    >
                      {['AC Repair & Service', 'Plumbing', 'Electrical', 'Cleaning',
                        'Appliance Repair', 'Carpenter', 'Painting', 'Pest Control'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <label htmlFor="auth-phone" className="text-xs font-semibold text-ns-navy">Phone number</label>
                <input
                  id="auth-phone" type="tel" required autoComplete="tel"
                  placeholder="+91 98765 00000"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting} className={inputClass}
                />
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label htmlFor="auth-email" className="text-xs font-semibold text-ns-navy">Email address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ns-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="auth-email" type="email" required
                autoComplete={authMode === 'login' ? 'username' : 'email'}
                placeholder="aakash@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting} className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="auth-password" className="text-xs font-semibold text-ns-navy">Password</label>
              {authMode === 'signup' && (
                <span className="text-[11px] text-ns-text-secondary">At least 8 characters</span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-ns-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="auth-password" type="password" required
                autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                minLength={authMode === 'signup' ? 8 : undefined}
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting} className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ns-primary hover:bg-ns-primary-bright disabled:bg-brand-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-full text-sm transition-colors flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {authMode === 'login' ? 'Signing in…' : 'Creating account…'}
              </>
            ) : (
              <>
                {authMode === 'login' ? 'Sign in' : 'Create account'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-3 border-t border-ns-border/70">
            <p className="text-[13px] text-ns-text-secondary">
              {authMode === 'login' ? "Don't have an account yet? " : 'Already registered? '}
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                disabled={isSubmitting}
                className="text-ns-primary font-semibold hover:underline underline-offset-4 ml-0.5"
              >
                {authMode === 'login' ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
