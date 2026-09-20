import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Role } from '../../types';
import { 
  User, UserCheck, ShieldCheck, Mail, Lock, 
  Phone, ArrowRight, X, CheckCircle2, Wrench 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, setRole, setPage, login } = useApp();
  const { showToast } = useToast();

  const [selectedRole, setSelectedRole] = useState<Role>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Plumbing');

  const [otpStep, setOtpStep] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('4921');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMode === 'signup' && !otpStep) {
      setOtpStep(true);
      showToast('Verification Code Sent', 'Enter code 4921 to complete registration.', 'info');
      return;
    }

    // Success login/signup
    login(fullName || (authMode === 'login' ? 'User' : 'New User'), email, selectedRole);
    setIsAuthModalOpen(false);
    setOtpStep(false);

    if (selectedRole === 'customer') {
      setPage('customer-dashboard');
      showToast(`Welcome ${fullName || 'back'}!`, 'Logged in as Customer', 'success');
    } else {
      setPage('provider-dashboard');
      showToast(`Welcome ${fullName || 'back'}!`, 'Logged in to Provider Portal', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-elevated border border-slate-100 relative my-auto">
        
        <button
          onClick={() => {
            setIsAuthModalOpen(false);
            setOtpStep(false);
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6 space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-xl">
            {otpStep ? 'Verify Email & Phone' : authMode === 'login' ? 'Log in to LocalFix' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-slate-500">
            {otpStep 
              ? 'Enter the 4-digit code sent to your mobile device'
              : authMode === 'login'
              ? 'Access your bookings, messages, and profile'
              : 'Join thousands of customers and verified local service pros'}
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
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3.5 rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Verify & Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Account Type Role Switcher */}
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center justify-between text-xs font-bold">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`flex-1 py-2 rounded-xl text-center transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'customer'
                    ? 'bg-white text-brand-700 shadow-sm font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" /> I'm a Customer
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('provider')}
                className={`flex-1 py-2 rounded-xl text-center transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'provider'
                    ? 'bg-slate-900 text-white shadow-sm font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" /> Service Provider
              </button>
            </div>

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
              {authMode === 'login' ? 'Log In to LocalFix' : 'Continue to Verification'} <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <div className="text-center pt-3 border-t border-slate-100">
              {authMode === 'login' ? (
                <p className="text-xs text-slate-700 font-semibold">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className="text-brand-600 font-extrabold hover:underline ml-1"
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-700 font-semibold">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-brand-600 font-extrabold hover:underline ml-1"
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
