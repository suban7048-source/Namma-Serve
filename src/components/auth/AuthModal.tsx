import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Role } from '../../types';
import { 
  User, UserCheck, ShieldCheck, Mail, Lock, 
  Phone, ArrowRight, X, CheckCircle2, Wrench 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen, setIsAuthModalOpen,
    authMode, setAuthMode,
    authRoleLock, setAuthRoleLock,
    setRole, setPage, login
  } = useApp();
  const { showToast } = useToast();

  const [selectedRole, setSelectedRole] = useState<'customer' | 'provider'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Plumbing');

  const [otpStep, setOtpStep] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('4921');

  // Automatically lock role when requested (e.g. clicking "Become a Provider")
  useEffect(() => {
    if (authRoleLock) {
      setSelectedRole(authRoleLock);
    }
  }, [authRoleLock, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setOtpStep(false);
    setAuthRoleLock(null);
  };

  const isProviderSignup = authMode === 'signup' && (authRoleLock === 'provider' || selectedRole === 'provider');

  const getNameFromEmail = (emailStr: string) => {
    if (!emailStr) return 'User';
    const namePart = emailStr.split('@')[0];
    // Capitalize first letter and replace dots/underscores with space
    return namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/[._-]/g, ' ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMode === 'signup' && !otpStep) {
      setOtpStep(true);
      showToast('Verification Code Sent', 'Enter code 4921 to complete registration.', 'info');
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Service Provider Login Flow
    if (selectedRole === 'provider') {
      // Check for Admin credentials accessed via the Service Provider login (supports both admin@nammaserve.in and admin@localfix.in)
      if (trimmedEmail === 'admin@nammaserve.in' || trimmedEmail === 'admin@localfix.in') {
        if (password === 'admin123') {
          // Verified Admin login
          login('NammaServe Administrator', email, 'admin');
          setIsAuthModalOpen(false);
          setOtpStep(false);
          setPage('admin-dashboard');
          showToast('Administrator Access Granted', 'Logged into Admin Console', 'success');
          return;
        } else {
          showToast('Invalid Admin Credentials', 'Incorrect password for admin account', 'error');
          return;
        }
      }

      // Regular Service Provider
      const providerName = fullName || getNameFromEmail(trimmedEmail);
      login(providerName, email, 'provider');
      setIsAuthModalOpen(false);
      setOtpStep(false);
      setPage('provider-dashboard');
      showToast(`Welcome ${providerName}!`, 'Logged in to Provider Portal', 'success');
      return;
    }

    // 2. Customer Login Flow
    if (trimmedEmail === 'admin@nammaserve.in' || trimmedEmail === 'admin@localfix.in') {
      showToast('Restricted Account', 'Admin login must be accessed through the Provider portal.', 'warning');
      setSelectedRole('provider');
      return;
    }

    const customerName = fullName || getNameFromEmail(trimmedEmail);
    login(customerName, email, 'customer');
    setIsAuthModalOpen(false);
    setOtpStep(false);
    setPage('customer-dashboard');
    showToast(`Welcome ${customerName}!`, 'Logged in as Customer', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-elevated border border-slate-100 relative my-auto">
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5 space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
            {authRoleLock === 'provider' || selectedRole === 'provider' ? (
              <UserCheck className="w-6 h-6 text-brand-600" />
            ) : authRoleLock === 'customer' ? (
              <User className="w-6 h-6 text-brand-600" />
            ) : (
              <Wrench className="w-6 h-6" />
            )}
          </div>
          <h3 className="font-extrabold text-slate-900 text-xl">
            {otpStep 
              ? 'Verify Email & Phone' 
              : authMode === 'login' 
                ? (authRoleLock === 'provider' || selectedRole === 'provider'
                    ? 'Service Provider Login'
                    : authRoleLock === 'customer'
                    ? 'Customer Account Login'
                    : 'Log in to NammaServe')
                : (isProviderSignup
                    ? 'Register as Service Provider'
                    : 'Create Customer Account')}
          </h3>
          <p className="text-xs text-slate-500">
            {otpStep 
              ? 'Enter the 4-digit code sent to your mobile device'
              : authMode === 'login'
              ? (authRoleLock === 'provider' || selectedRole === 'provider'
                  ? 'Sign in to access your technician portal, dispatch, and earnings'
                  : authRoleLock === 'customer'
                  ? 'Sign in to access your bookings, saved pros, and service history'
                  : 'Access your bookings, messages, and profile')
              : (isProviderSignup
                  ? 'Register your business to start receiving customer jobs across Chennai'
                  : 'Join thousands of Chennai residents booking verified local services')}
          </p>
        </div>

        {otpStep ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-2">
              <label className="text-xs font-bold text-slate-700">Enter Verification Code</label>
              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-40 text-center tracking-[10px] text-2xl font-black bg-slate-50 border border-slate-200 rounded-2xl py-3 mx-auto focus:outline-none focus:border-brand-500 text-slate-900"
              />
              <p className="text-[11px] text-slate-400">Demo Code: 4921</p>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3.5 rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Verify & Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Account Type Role Switcher — respects role locks */}
            {authRoleLock === 'provider' ? (
              <div className="bg-slate-900 text-white p-2.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-black shadow-sm">
                <UserCheck className="w-4 h-4 text-brand-400" />
                <span>{authMode === 'login' ? 'Service Provider Portal Login' : 'Service Provider Registration'}</span>
              </div>
            ) : authRoleLock === 'customer' ? (
              <div className="bg-brand-50 border border-brand-200 text-brand-800 p-2.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-black shadow-sm">
                <User className="w-4 h-4 text-brand-600" />
                <span>{authMode === 'login' ? 'Customer Account Login' : 'Customer Account Registration'}</span>
              </div>
            ) : (
              <div className="bg-slate-100 p-1 rounded-2xl flex items-center justify-between text-xs font-bold gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedRole('customer')}
                  className={`flex-1 py-2 rounded-xl text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedRole === 'customer'
                      ? 'bg-white text-brand-700 shadow-sm font-extrabold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> Customer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('provider')}
                  className={`flex-1 py-2 rounded-xl text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedRole === 'provider'
                      ? 'bg-slate-900 text-white shadow-sm font-extrabold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" /> Provider
                </button>
              </div>
            )}

            {authMode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Aakash Malhotra"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>

                {selectedRole === 'provider' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Business / Service Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Sharma Plumbing & Drainage"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Primary Trade Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none"
                      >
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Appliance Repair">Appliance Repair</option>
                        <option value="Painting">Painting</option>
                        <option value="AC & HVAC">AC & HVAC</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                required
                placeholder="aakash@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {authMode === 'login' && (
                  <button type="button" className="text-[11px] text-brand-600 hover:underline">
                    Forgot?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-brand-600 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {authMode === 'login'
                ? (selectedRole === 'provider' ? 'Log In to Provider Portal' : 'Log In to Customer Account')
                : isProviderSignup
                ? 'Register as Service Provider'
                : 'Continue to Verification'} <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <div className="text-center pt-3 border-t border-slate-100">
              {authMode === 'login' ? (
                <p className="text-xs text-slate-700 font-semibold">
                  {selectedRole === 'provider' ? 'New service professional? ' : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className="text-brand-600 font-extrabold hover:underline ml-1 cursor-pointer"
                  >
                    {selectedRole === 'provider' ? 'Join as Provider' : 'Create Account'}
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-700 font-semibold">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-brand-600 font-extrabold hover:underline ml-1 cursor-pointer"
                  >
                    Log In
                  </button>
                </p>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
