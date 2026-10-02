import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingStatus, Booking } from '../../types';
import { useToast } from '../../context/ToastContext';
import { ConfirmModal } from '../common/ConfirmModal';
import { RatingStars } from '../common/RatingStars';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { 
  Wrench, CheckCircle2, XCircle, Clock, Calendar, 
  DollarSign, MessageSquare, ShieldCheck, MapPin, User, Settings, AlertCircle,
  PlusCircle, Phone, Navigation, Shield, Wallet, ArrowUpRight, Check,
  AlertTriangle, Flame, FileText, ChevronRight
} from 'lucide-react';

type ProviderTab = 'requests' | 'active' | 'completed' | 'earnings' | 'settings';

export const ProviderDashboard: React.FC = () => {
  const { 
    bookings, 
    updateBookingStatus, 
    setActiveBookingForChat, 
    providers, 
    addAdditionalCharge 
  } = useApp();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<ProviderTab>('active');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [declineBooking, setDeclineBooking] = useState<Booking | null>(null);

  // Additional Charge Modal State
  const [chargeModalBooking, setChargeModalBooking] = useState<Booking | null>(null);
  const [partsDesc, setPartsDesc] = useState('');
  const [partsAmount, setPartsAmount] = useState('');
  const [labourAmount, setLabourAmount] = useState('');
  const [chargeReason, setChargeReason] = useState('');

  // Complete Job OTP Modal State
  const [otpModalBooking, setOtpModalBooking] = useState<Booking | null>(null);
  const [enteredOtp, setEnteredOtp] = useState('');

  // Provider profile: Ravi Kumar (demo technician in Chennai)
  const currentProvider = providers[0] || {
    id: 'p1',
    name: 'Ravi Kumar',
    businessName: 'Ravi Cool & Electricals',
    category: 'AC Repair & Service',
    rating: 4.9,
    reviewCount: 142,
    completedJobs: 380,
    serviceRadiusKm: 15,
    location: 'Velachery, Chennai',
    phone: '+91 98765 43210'
  };

  // Status groupings matching current BookingStatus
  const pendingRequests = bookings.filter(b => b.status === 'PENDING' || b.status === 'TECHNICIAN_ASSIGNED');
  
  const activeJobs = bookings.filter(b => 
    ['TECHNICIAN_ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'SERVICE_STARTED', 'SERVICE_COMPLETED', 'PAYMENT_PENDING'].includes(b.status)
  );

  const completedJobs = bookings.filter(b => b.status === 'COMPLETED');

  const totalEarnings = completedJobs.reduce((acc, b) => acc + (b.totalPrice || b.servicePrice), 0) + 12450; // demo baseline

  const handleAcceptRequest = (b: Booking) => {
    updateBookingStatus(b.id, 'TECHNICIAN_ACCEPTED');
    showToast('Job Accepted!', `Scheduled for ${b.scheduledDate} at ${b.scheduledTime}`, 'success');
  };

  const handleDeclineConfirm = () => {
    if (declineBooking) {
      updateBookingStatus(declineBooking.id, 'CANCELLED');
      showToast('Booking Declined', 'Booking returned to queue.', 'info');
      setDeclineBooking(null);
    }
  };

  const handleStatusTransition = (bookingId: string, nextStatus: BookingStatus, toastTitle: string, toastDesc: string) => {
    updateBookingStatus(bookingId, nextStatus);
    showToast(toastTitle, toastDesc, 'success');
  };

  const handleSubmitAdditionalCharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chargeModalBooking) return;
    const parts = parseFloat(partsAmount) || 0;
    const labour = parseFloat(labourAmount) || 0;
    if (parts + labour <= 0) {
      showToast('Invalid Amount', 'Please enter a valid parts or labour amount.', 'error');
      return;
    }

    addAdditionalCharge(chargeModalBooking.id, {
      description: partsDesc || 'Replacement spare parts & materials',
      partsCharge: parts,
      labourCharge: labour,
      reason: chargeReason || 'On-site component replacement needed'
    });

    showToast('Estimate Sent to Customer', 'Customer must approve the additional charge before billing.', 'info');
    setChargeModalBooking(null);
    setPartsDesc('');
    setPartsAmount('');
    setLabourAmount('');
    setChargeReason('');
  };

  const handleVerifyOtpAndComplete = () => {
    if (!otpModalBooking) return;
    // For demo purposes, accepting any 4-digit code or matching booking id
    if (!enteredOtp || enteredOtp.length < 4) {
      showToast('Invalid OTP', 'Please ask the customer for the 4-digit service completion OTP.', 'error');
      return;
    }

    updateBookingStatus(otpModalBooking.id, 'COMPLETED');
    showToast('Job Completed & Verified!', `₹${otpModalBooking.totalPrice || otpModalBooking.servicePrice} credited to your NammaServe wallet.`, 'success');
    setOtpModalBooking(null);
    setEnteredOtp('');
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'PENDING':
      case 'TECHNICIAN_ASSIGNED':
        return <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">Awaiting Acceptance</span>;
      case 'TECHNICIAN_ACCEPTED':
        return <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">Confirmed / Scheduled</span>;
      case 'ON_THE_WAY':
        return <span className="bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full border border-sky-200 animate-pulse">On The Way</span>;
      case 'ARRIVED':
        return <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full border border-teal-200">At Location</span>;
      case 'SERVICE_STARTED':
        return <span className="bg-violet-100 text-violet-800 text-xs font-bold px-3 py-1 rounded-full border border-violet-200 animate-pulse">Work In Progress</span>;
      case 'SERVICE_COMPLETED':
      case 'PAYMENT_PENDING':
        return <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">Pending OTP Verification</span>;
      case 'COMPLETED':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">Completed</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="py-8 bg-gradient-to-b from-brand-50/40 via-white to-slate-50 text-slate-900 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Provider Portal Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <InitialsAvatar name={currentProvider.name} size="lg" rounded="2xl" className="border-2 border-brand-500 shadow" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{currentProvider.name}</h1>
                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full border border-brand-200">
                  {currentProvider.category} Pro
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Partner
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {currentProvider.businessName} • {currentProvider.location}
              </p>
              
              <div className="flex items-center gap-3 text-xs text-slate-600 pt-1.5 flex-wrap">
                <RatingStars rating={currentProvider.rating} reviewCount={currentProvider.reviewCount} showNumeric />
                <span>•</span>
                <span className="text-emerald-600 font-bold">{currentProvider.completedJobs}+ Chennai Jobs</span>
                <span>•</span>
                <span className="text-slate-500">Service Radius: {currentProvider.serviceRadiusKm || 15} km</span>
              </div>
            </div>
          </div>

          {/* Duty Online / Offline Toggle */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-6 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                <p className="text-xs font-bold text-slate-900">{isOnline ? 'Online & Available' : 'Offline / On Break'}</p>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">{isOnline ? 'Receiving emergency & scheduled bookings' : 'Paused — will not receive new requests'}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
            </label>
          </div>
        </div>

        {/* Performance Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <p className="text-xs font-bold uppercase tracking-wider">Total Earnings</p>
              <Wallet className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-600">₹{totalEarnings.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-slate-400 font-medium">Auto-credited every Monday</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <p className="text-xs font-bold uppercase tracking-wider">New Requests</p>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-amber-600">{pendingRequests.length}</p>
            <p className="text-[10px] text-slate-400 font-medium">Pending acceptance</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <p className="text-xs font-bold uppercase tracking-wider">Active Jobs</p>
              <Clock className="w-4 h-4 text-brand-500" />
            </div>
            <p className="text-2xl font-black text-brand-600">{activeJobs.length}</p>
            <p className="text-[10px] text-slate-400 font-medium">Scheduled & in-progress</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <p className="text-xs font-bold uppercase tracking-wider">Customer Rating</p>
              <Shield className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">{currentProvider.rating} ★</p>
            <p className="text-[10px] text-slate-400 font-medium">Based on {currentProvider.reviewCount} verified reviews</p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'active', label: `Active & In Progress (${activeJobs.length})`, icon: Clock },
            { id: 'requests', label: `New Requests (${pendingRequests.length})`, icon: AlertCircle },
            { id: 'completed', label: `Completed Jobs (${completedJobs.length})`, icon: CheckCircle2 },
            { id: 'earnings', label: 'Earnings & Payouts', icon: Wallet },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ProviderTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ACTIVE & IN PROGRESS JOBS */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" />
                Active Service Jobs ({activeJobs.length})
              </h2>
              <span className="text-xs text-slate-500">Keep customer updated at each step for top ratings</span>
            </div>

            {activeJobs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center space-y-3 shadow-soft">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p className="text-sm font-bold text-slate-700">No active jobs right now</p>
                <p className="text-xs text-slate-400">Check the "New Requests" tab to accept upcoming bookings.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeJobs.map((b) => (
                  <div key={b.id} className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-5">
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-400">#{b.bookingNumber}</span>
                        {getStatusBadge(b.status)}
                        {b.isEmergency && (
                          <span className="bg-red-100 text-red-700 text-xs font-black px-2.5 py-0.5 rounded-full border border-red-200 flex items-center gap-1 animate-pulse">
                            <Flame className="w-3 h-3 text-red-600" /> Emergency (45-Min Callout)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                        <span>Total: <strong className="text-emerald-700 text-sm">₹{b.totalPrice || b.servicePrice}</strong></span>
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg uppercase text-[10px]">
                          Payment: {b.paymentMethod}
                        </span>
                      </div>
                    </div>

                    {/* Service & Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-extrabold text-slate-900 text-lg">{b.serviceName}</h3>
                        <p className="text-xs text-slate-600 flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-400" /> Customer: <strong className="text-slate-800">{b.customerName}</strong>
                        </p>
                        <p className="text-xs text-slate-600 flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-brand-600" /> Phone: <a href={`tel:${b.customerPhone}`} className="text-brand-600 font-bold hover:underline">{b.customerPhone}</a>
                        </p>
                        {b.problemDescription && (
                          <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 text-xs text-amber-900 mt-2">
                            <p className="font-bold text-[11px] text-amber-800 mb-0.5">Problem Reported by Customer:</p>
                            <p className="italic">"{b.problemDescription}"</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-700">
                        <p className="flex items-center gap-2 font-semibold">
                          <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                          <span>Slot: <strong>{b.scheduledDate}</strong> at <strong>{b.scheduledTime}</strong></span>
                        </p>
                        <p className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>Location: <strong>{b.serviceLocation}</strong></span>
                        </p>
                        {b.notes && (
                          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                            <strong>Note:</strong> {b.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Additional Charges requested section */}
                    {b.additionalCharges && b.additionalCharges.length > 0 && (
                      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-indigo-600" /> Additional Parts / Materials Requested
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-indigo-800 border border-indigo-200">
                            Status: {b.additionalCharges[0].status}
                          </span>
                        </div>
                        <p className="text-indigo-800">
                          {b.additionalCharges[0].description}: Parts ₹{b.additionalCharges[0].partsCharge} + Labour ₹{b.additionalCharges[0].labourCharge}
                        </p>
                        {b.additionalCharges[0].status === 'PENDING_APPROVAL' && (
                          <p className="text-[10px] text-amber-700 font-semibold italic">
                            Waiting for customer to approve in their NammaServe app.
                          </p>
                        )}
                        {b.additionalCharges[0].status === 'APPROVED' && (
                          <p className="text-[10px] text-emerald-700 font-bold">
                            ✓ Approved by customer! Added to final bill.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Step-by-Step Execution Action Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveBookingForChat(b)}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-brand-600" /> Message Customer
                        </button>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(b.serviceLocation)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Navigation className="w-3.5 h-3.5 text-blue-600" /> Google Maps
                        </a>
                      </div>

                      {/* Progressive workflow buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {b.status === 'TECHNICIAN_ACCEPTED' && (
                          <button
                            onClick={() => handleStatusTransition(b.id, 'ON_THE_WAY', 'Status: On The Way', 'Customer has been notified that you are heading to their location.')}
                            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <Navigation className="w-3.5 h-3.5" /> Start Trip (On The Way)
                          </button>
                        )}

                        {b.status === 'ON_THE_WAY' && (
                          <button
                            onClick={() => handleStatusTransition(b.id, 'ARRIVED', 'Status: Arrived', 'Customer notified that you have reached the doorstep.')}
                            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <MapPin className="w-3.5 h-3.5" /> Mark as Arrived
                          </button>
                        )}

                        {b.status === 'ARRIVED' && (
                          <button
                            onClick={() => handleStatusTransition(b.id, 'SERVICE_STARTED', 'Service Started', 'Inspection and repair in progress.')}
                            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <Wrench className="w-3.5 h-3.5" /> Start Service Work
                          </button>
                        )}

                        {b.status === 'SERVICE_STARTED' && (
                          <>
                            <button
                              onClick={() => setChargeModalBooking(b)}
                              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <PlusCircle className="w-3.5 h-3.5 text-amber-600" /> Add Parts / Extra Charge
                            </button>
                            <button
                              onClick={() => setOtpModalBooking(b)}
                              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Complete Service (Verify OTP)
                            </button>
                          </>
                        )}

                        {(b.status === 'SERVICE_COMPLETED' || b.status === 'PAYMENT_PENDING') && (
                          <button
                            onClick={() => setOtpModalBooking(b)}
                            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Enter Customer OTP to Settle
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NEW REQUESTS (PENDING) */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Incoming Service Requests ({pendingRequests.length})
              </h2>
              <span className="text-xs text-slate-500">Accept within 15 minutes to maintain 100% acceptance score</span>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center space-y-2 shadow-soft">
                <p className="text-sm font-bold text-slate-700">No new pending requests</p>
                <p className="text-xs text-slate-400">You are all caught up! New requests in Chennai will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingRequests.map((b) => (
                  <div key={b.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 space-y-4 shadow-soft">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-mono text-xs font-bold text-slate-400">#{b.bookingNumber}</span>
                      {b.isEmergency ? (
                        <span className="text-xs font-extrabold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200 animate-pulse">
                          🚨 Emergency Booking
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                          Action Required
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{b.serviceName}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Customer: {b.customerName} ({b.customerPhone})</p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-600 shrink-0" /> {b.scheduledDate} at {b.scheduledTime}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> {b.serviceLocation}
                      </p>
                      {b.problemDescription && (
                        <p className="text-slate-600 italic pt-1.5 border-t border-slate-200/80 text-[11px]">
                          "{b.problemDescription}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-xs text-slate-400">Total Payout</p>
                        <p className="text-lg font-black text-emerald-600">₹{b.totalPrice || b.servicePrice}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDeclineBooking(b)}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200 transition-colors cursor-pointer"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleAcceptRequest(b)}
                          className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
                        >
                          Accept Job
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMPLETED JOBS */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Completed Service History ({completedJobs.length})
            </h2>

            {completedJobs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center text-slate-500 text-xs shadow-soft">
                No completed jobs in this demo session yet.
              </div>
            ) : (
              <div className="space-y-3">
                {completedJobs.map((b) => (
                  <div key={b.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-soft">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-400">#{b.bookingNumber}</span>
                        <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                          Completed & Paid
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{b.serviceName}</h4>
                      <p className="text-xs text-slate-500">
                        {b.customerName} • {b.serviceLocation} • {b.scheduledDate}
                      </p>
                    </div>

                    <div className="text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                      <p className="text-base font-black text-emerald-600">₹{b.totalPrice || b.servicePrice}</p>
                      <p className="text-[10px] text-slate-400">Settled via {b.paymentMethod || 'UPI'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EARNINGS & PAYOUTS */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Wallet Balance</p>
                <p className="text-3xl font-black text-slate-900">₹{totalEarnings.toLocaleString('en-IN')}</p>
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Next payout automatically sent on Monday
                </p>
                <button
                  onClick={() => showToast('Withdrawal Requested', 'Instant transfer to registered bank account initiated.', 'success')}
                  className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer mt-2"
                >
                  Request Instant Payout
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bank & UPI Settlement</p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-800">HDFC Bank •••• 4912</p>
                  <p className="text-slate-500">IFSC: HDFC0001824</p>
                  <p className="text-slate-500 font-mono text-[11px]">UPI: ravitechnician@hdfcbank</p>
                </div>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> KYC Verified by NammaServe Admin
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Commission & Fee Structure</p>
                <div className="text-xs text-slate-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Platform Commission:</span>
                    <strong className="text-slate-800">10% per job</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>GST on Service:</span>
                    <strong className="text-slate-800">18% (Passed to Govt)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Parts & Material Markup:</span>
                    <strong className="text-emerald-600">0% (100% to Pro)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Payout history table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Recent Settlements & Payout History</h3>
              <div className="divide-y divide-slate-100 text-xs">
                {[
                  { date: '21 Sep 2026', ref: 'PAY-CHN-8821', jobs: 12, amount: 8450, status: 'Credited' },
                  { date: '14 Sep 2026', ref: 'PAY-CHN-8419', jobs: 9, amount: 6200, status: 'Credited' },
                  { date: '07 Sep 2026', ref: 'PAY-CHN-8104', jobs: 14, amount: 9800, status: 'Credited' },
                ].map((p, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{p.date}</p>
                      <p className="text-slate-400 font-mono text-[10px]">{p.ref} • {p.jobs} jobs</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900">₹{p.amount.toLocaleString('en-IN')}</p>
                      <span className="text-[10px] text-emerald-600 font-bold">{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Decline Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(declineBooking)}
        title="Decline Service Request?"
        message={`Are you sure you want to decline booking #${declineBooking?.bookingNumber}? It will be reassigned to another verified technician in Chennai.`}
        confirmText="Decline Request"
        cancelText="Go Back"
        variant="warning"
        onConfirm={handleDeclineConfirm}
        onCancel={() => setDeclineBooking(null)}
      />

      {/* Additional Charge Modal */}
      {chargeModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-elevated border border-slate-100 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Add Spare Parts / Extra Charge</h3>
                <p className="text-xs text-slate-400">Booking #{chargeModalBooking.bookingNumber}</p>
              </div>
              <button
                onClick={() => setChargeModalBooking(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitAdditionalCharge} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Spare Parts / Material Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Copper pipe 3m + AC Gas R32 refill (1kg)"
                  value={partsDesc}
                  onChange={(e) => setPartsDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Parts Cost (₹)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 1200"
                    value={partsAmount}
                    onChange={(e) => setPartsAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Extra Labour (₹)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 300"
                    value={labourAmount}
                    onChange={(e) => setLabourAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Reason for Additional Charge</label>
                <textarea
                  rows={2}
                  placeholder="Explain why this replacement is necessary..."
                  value={chargeReason}
                  onChange={(e) => setChargeReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-800 space-y-1">
                <p className="font-bold">⚠️ Customer Approval Policy:</p>
                <p>The customer will receive an instant approval prompt on their dashboard. Work must not begin until customer clicks "Approve".</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setChargeModalBooking(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-extrabold hover:bg-brand-700 shadow-sm"
                >
                  Send to Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Verification Completion Modal */}
      {otpModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-elevated border border-slate-100 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Verify Completion OTP</h3>
              <p className="text-xs text-slate-500">
                Ask <strong>{otpModalBooking.customerName}</strong> for the 4-digit service verification code shown on their booking card.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 text-center">
              <p className="text-slate-400 font-mono text-[11px]">Booking #{otpModalBooking.bookingNumber}</p>
              <p className="font-extrabold text-slate-900">{otpModalBooking.serviceName}</p>
              <p className="text-emerald-700 font-black text-lg">₹{otpModalBooking.totalPrice || otpModalBooking.servicePrice}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block text-center">Enter 4-Digit Customer OTP</label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 4829"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                className="w-full text-center tracking-widest text-2xl font-mono font-black py-3 rounded-2xl border-2 border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
                autoFocus
              />
              <p className="text-[10px] text-slate-400 text-center">
                Demo hint: You can enter any 4 digits (e.g. 1234) to confirm completion.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOtpModalBooking(null)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerifyOtpAndComplete}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all"
              >
                Verify & Settle Job
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
