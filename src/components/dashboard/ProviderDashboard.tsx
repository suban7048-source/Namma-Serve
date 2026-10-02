import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingStatus, Booking } from '../../types';
import { useToast } from '../../context/ToastContext';
import { ConfirmModal } from '../common/ConfirmModal';
import { RatingStars } from '../common/RatingStars';
import { Avatar } from '../common/Avatar';
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
        return <span className="bg-kolam-marigold-soft text-kolam-marigold text-xs font-semibold px-3 py-1 rounded-full border border-kolam-marigold-line">Awaiting Acceptance</span>;
      case 'TECHNICIAN_ACCEPTED':
        return <span className="bg-brand-100 text-brand-800 text-xs font-semibold px-3 py-1 rounded-full border border-brand-200">Confirmed / Scheduled</span>;
      case 'ON_THE_WAY':
        return <span className="bg-brand-100 text-brand-800 text-xs font-semibold px-3 py-1 rounded-full border border-brand-200 animate-pulse">On The Way</span>;
      case 'ARRIVED':
        return <span className="bg-kolam-teal-soft text-kolam-teal text-xs font-semibold px-3 py-1 rounded-full border border-kolam-teal-line">At Location</span>;
      case 'SERVICE_STARTED':
        return <span className="bg-brand-100 text-brand-800 text-xs font-semibold px-3 py-1 rounded-full border border-brand-200 animate-pulse">Work In Progress</span>;
      case 'SERVICE_COMPLETED':
      case 'PAYMENT_PENDING':
        return <span className="bg-kolam-marigold-soft text-kolam-marigold text-xs font-semibold px-3 py-1 rounded-full border border-kolam-marigold-line">Pending OTP Verification</span>;
      case 'COMPLETED':
        return <span className="bg-kolam-teal-soft text-kolam-teal text-xs font-semibold px-3 py-1 rounded-full border border-kolam-teal-line">Completed</span>;
      default:
        return <span className="bg-kolam-sunk text-ns-navy text-xs font-semibold px-3 py-1 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="py-8 bg-gradient-to-b from-brand-50/40 via-white to-kolam-wash text-ns-navy min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Provider Portal Header */}
        <div className="bg-kolam-surface rounded-2xl p-6 sm:p-8 border border-ns-border/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar name={currentProvider.name} src={currentProvider.avatar} size="lg" rounded="full" className="ring-2 ring-kolam-marigold" priority />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ns-navy">{currentProvider.name}</h1>
                <span className="bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full border border-brand-200">
                  {currentProvider.category} Pro
                </span>
                <span className="bg-kolam-teal-soft text-kolam-teal text-xs font-semibold px-2.5 py-0.5 rounded-full border border-kolam-teal-line flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-kolam-teal" /> Verified Partner
                </span>
              </div>
              <p className="text-xs text-ns-text-secondary font-medium mt-1">
                {currentProvider.businessName} • {currentProvider.location}
              </p>
              
              <div className="flex items-center gap-3 text-xs text-ns-text-secondary pt-1.5 flex-wrap">
                <RatingStars rating={currentProvider.rating} reviewCount={currentProvider.reviewCount} showNumeric />
                <span>•</span>
                <span className="text-kolam-teal font-semibold">{currentProvider.completedJobs}+ Chennai Jobs</span>
                <span>•</span>
                <span className="text-ns-text-secondary">Service Radius: {currentProvider.serviceRadiusKm || 15} km</span>
              </div>
            </div>
          </div>

          {/* Duty Online / Offline Toggle */}
          <div className="bg-kolam-wash p-4 rounded-2xl border border-ns-border flex items-center justify-between gap-6 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-kolam-teal animate-ping' : 'bg-ns-text-secondary'}`} />
                <p className="text-xs font-semibold text-ns-navy">{isOnline ? 'Online & Available' : 'Offline / On Break'}</p>
              </div>
              <p className="text-[10px] text-ns-text-secondary mt-0.5">{isOnline ? 'Receiving emergency & scheduled bookings' : 'Paused — will not receive new requests'}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-ns-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-ns-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kolam-teal" />
            </label>
          </div>
        </div>

        {/* Performance Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-kolam-surface rounded-2xl p-5 border border-ns-border/80 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-ns-text-secondary">
              <p className="text-xs font-semibold uppercase tracking-wider">Total Earnings</p>
              <Wallet className="w-4 h-4 text-kolam-teal" />
            </div>
            <p className="text-2xl font-semibold text-kolam-teal">₹{totalEarnings.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-ns-text-secondary font-medium">Auto-credited every Monday</p>
          </div>
          <div className="bg-kolam-surface rounded-2xl p-5 border border-ns-border/80 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-ns-text-secondary">
              <p className="text-xs font-semibold uppercase tracking-wider">New Requests</p>
              <AlertCircle className="w-4 h-4 text-kolam-marigold" />
            </div>
            <p className="text-2xl font-semibold text-kolam-marigold">{pendingRequests.length}</p>
            <p className="text-[10px] text-ns-text-secondary font-medium">Pending acceptance</p>
          </div>
          <div className="bg-kolam-surface rounded-2xl p-5 border border-ns-border/80 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-ns-text-secondary">
              <p className="text-xs font-semibold uppercase tracking-wider">Active Jobs</p>
              <Clock className="w-4 h-4 text-brand-500" />
            </div>
            <p className="text-2xl font-semibold text-brand-600">{activeJobs.length}</p>
            <p className="text-[10px] text-ns-text-secondary font-medium">Scheduled & in-progress</p>
          </div>
          <div className="bg-kolam-surface rounded-2xl p-5 border border-ns-border/80 shadow-soft space-y-1">
            <div className="flex items-center justify-between text-ns-text-secondary">
              <p className="text-xs font-semibold uppercase tracking-wider">Customer Rating</p>
              <Shield className="w-4 h-4 text-brand-500" />
            </div>
            <p className="text-2xl font-semibold text-ns-navy">{currentProvider.rating} ★</p>
            <p className="text-[10px] text-ns-text-secondary font-medium">Based on {currentProvider.reviewCount} verified reviews</p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-ns-border pb-2 overflow-x-auto">
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
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-ns-navy text-white shadow-sm'
                    : 'bg-white hover:bg-kolam-sunk text-ns-text-secondary border border-ns-border'
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
              <h2 className="font-display text-lg font-semibold text-ns-navy flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" />
                Active Service Jobs ({activeJobs.length})
              </h2>
              <span className="text-xs text-ns-text-secondary">Keep customer updated at each step for top ratings</span>
            </div>

            {activeJobs.length === 0 ? (
              <div className="bg-kolam-surface rounded-2xl p-12 border border-ns-border/80 text-center space-y-3 shadow-soft">
                <CheckCircle2 className="w-10 h-10 text-kolam-teal mx-auto" />
                <p className="text-sm font-semibold text-ns-text">No active jobs right now</p>
                <p className="text-xs text-ns-text-secondary">Check the "New Requests" tab to accept upcoming bookings.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeJobs.map((b) => (
                  <div key={b.id} className="bg-kolam-surface rounded-2xl p-6 sm:p-7 border border-ns-border/80 shadow-soft space-y-5">
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-kolam-sunk pb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-ns-text-secondary">#{b.bookingNumber}</span>
                        {getStatusBadge(b.status)}
                        {b.isEmergency && (
                          <span className="bg-kolam-kumkum-soft text-kolam-kumkum text-xs font-semibold px-2.5 py-0.5 rounded-full border border-kolam-kumkum-line flex items-center gap-1 animate-pulse">
                            <Flame className="w-3 h-3 text-kolam-kumkum" /> Emergency (45-Min Callout)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs font-semibold text-ns-text-secondary">
                        <span>Total: <strong className="text-kolam-teal text-sm">₹{b.totalPrice || b.servicePrice}</strong></span>
                        <span className="bg-kolam-sunk text-ns-text-secondary px-2.5 py-1 rounded-lg uppercase text-[10px]">
                          Payment: {b.paymentMethod}
                        </span>
                      </div>
                    </div>

                    {/* Service & Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-display font-semibold text-ns-navy text-lg">{b.serviceName}</h3>
                        <p className="text-xs text-ns-text-secondary flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-ns-text-secondary" /> Customer: <strong className="text-ns-navy">{b.customerName}</strong>
                        </p>
                        <p className="text-xs text-ns-text-secondary flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-brand-600" /> Phone: <a href={`tel:${b.customerPhone}`} className="text-brand-600 font-semibold hover:underline">{b.customerPhone}</a>
                        </p>
                        {b.problemDescription && (
                          <div className="bg-kolam-marigold-soft/60 p-3 rounded-xl border border-kolam-marigold-line/60 text-xs text-kolam-marigold mt-2">
                            <p className="font-semibold text-[11px] text-kolam-marigold mb-0.5">Problem Reported by Customer:</p>
                            <p className="italic">"{b.problemDescription}"</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 bg-kolam-wash p-4 rounded-2xl border border-ns-border/80 text-xs text-ns-text">
                        <p className="flex items-center gap-2 font-semibold">
                          <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                          <span>Slot: <strong>{b.scheduledDate}</strong> at <strong>{b.scheduledTime}</strong></span>
                        </p>
                        <p className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-kolam-kumkum shrink-0 mt-0.5" />
                          <span>Location: <strong>{b.serviceLocation}</strong></span>
                        </p>
                        {b.notes && (
                          <p className="text-[11px] text-ns-text-secondary pt-1 border-t border-ns-border">
                            <strong>Note:</strong> {b.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Additional Charges requested section */}
                    {b.additionalCharges && b.additionalCharges.length > 0 && (
                      <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-ns-navy flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-brand-600" /> Additional Parts / Materials Requested
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white text-brand-800 border border-brand-200">
                            Status: {b.additionalCharges[0].status}
                          </span>
                        </div>
                        <p className="text-brand-800">
                          {b.additionalCharges[0].description}: Parts ₹{b.additionalCharges[0].partsCharge} + Labour ₹{b.additionalCharges[0].labourCharge}
                        </p>
                        {b.additionalCharges[0].status === 'PENDING_APPROVAL' && (
                          <p className="text-[10px] text-kolam-marigold font-semibold italic">
                            Waiting for customer to approve in their NammaServe app.
                          </p>
                        )}
                        {b.additionalCharges[0].status === 'APPROVED' && (
                          <p className="text-[10px] text-kolam-teal font-semibold">
                            ✓ Approved by customer! Added to final bill.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Step-by-Step Execution Action Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-kolam-sunk">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveBookingForChat(b)}
                          className="px-3.5 py-2 rounded-xl bg-kolam-sunk hover:bg-ns-border text-ns-text font-semibold text-xs border border-ns-border flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-brand-600" /> Message Customer
                        </button>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(b.serviceLocation)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-kolam-sunk hover:bg-ns-border text-ns-text font-semibold text-xs border border-ns-border flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Navigation className="w-3.5 h-3.5 text-brand-600" /> Google Maps
                        </a>
                      </div>

                      {/* Progressive workflow buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {b.status === 'TECHNICIAN_ACCEPTED' && (
                          <button
                            onClick={() => handleStatusTransition(b.id, 'ON_THE_WAY', 'Status: On The Way', 'Customer has been notified that you are heading to their location.')}
                            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <Navigation className="w-3.5 h-3.5" /> Start Trip (On The Way)
                          </button>
                        )}

                        {b.status === 'ON_THE_WAY' && (
                          <button
                            onClick={() => handleStatusTransition(b.id, 'ARRIVED', 'Status: Arrived', 'Customer notified that you have reached the doorstep.')}
                            className="px-4 py-2 rounded-xl bg-kolam-teal hover:bg-kolam-teal text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <MapPin className="w-3.5 h-3.5" /> Mark as Arrived
                          </button>
                        )}

                        {b.status === 'ARRIVED' && (
                          <button
                            onClick={() => handleStatusTransition(b.id, 'SERVICE_STARTED', 'Service Started', 'Inspection and repair in progress.')}
                            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <Wrench className="w-3.5 h-3.5" /> Start Service Work
                          </button>
                        )}

                        {b.status === 'SERVICE_STARTED' && (
                          <>
                            <button
                              onClick={() => setChargeModalBooking(b)}
                              className="px-3.5 py-2 rounded-xl bg-kolam-marigold-soft hover:bg-kolam-marigold-soft text-kolam-marigold border border-kolam-marigold-line font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <PlusCircle className="w-3.5 h-3.5 text-kolam-marigold" /> Add Parts / Extra Charge
                            </button>
                            <button
                              onClick={() => setOtpModalBooking(b)}
                              className="px-5 py-2 rounded-xl bg-kolam-teal hover:bg-kolam-teal text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Complete Service (Verify OTP)
                            </button>
                          </>
                        )}

                        {(b.status === 'SERVICE_COMPLETED' || b.status === 'PAYMENT_PENDING') && (
                          <button
                            onClick={() => setOtpModalBooking(b)}
                            className="px-5 py-2 rounded-xl bg-kolam-teal hover:bg-kolam-teal text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
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
              <h2 className="font-display text-lg font-semibold text-ns-navy flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-kolam-marigold" />
                Incoming Service Requests ({pendingRequests.length})
              </h2>
              <span className="text-xs text-ns-text-secondary">Accept within 15 minutes to maintain 100% acceptance score</span>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="bg-kolam-surface rounded-2xl p-12 border border-ns-border/80 text-center space-y-2 shadow-soft">
                <p className="text-sm font-semibold text-ns-text">No new pending requests</p>
                <p className="text-xs text-ns-text-secondary">You are all caught up! New requests in Chennai will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingRequests.map((b) => (
                  <div key={b.id} className="bg-kolam-surface rounded-2xl p-6 border border-ns-border/80 space-y-4 shadow-soft">
                    <div className="flex items-center justify-between border-b border-kolam-sunk pb-3">
                      <span className="font-mono text-xs font-semibold text-ns-text-secondary">#{b.bookingNumber}</span>
                      {b.isEmergency ? (
                        <span className="text-xs font-semibold text-kolam-kumkum bg-kolam-kumkum-soft px-2.5 py-0.5 rounded-full border border-kolam-kumkum-line animate-pulse">
                          🚨 Emergency Booking
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-kolam-marigold bg-kolam-marigold-soft px-3 py-1 rounded-full border border-kolam-marigold-line">
                          Action Required
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-ns-navy text-base">{b.serviceName}</h3>
                      <p className="text-xs text-ns-text-secondary mt-0.5">Customer: {b.customerName} ({b.customerPhone})</p>
                    </div>

                    <div className="space-y-1.5 text-xs text-ns-text bg-kolam-wash p-3.5 rounded-2xl border border-ns-border/80">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-600 shrink-0" /> {b.scheduledDate} at {b.scheduledTime}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-ns-text-secondary shrink-0" /> {b.serviceLocation}
                      </p>
                      {b.problemDescription && (
                        <p className="text-ns-text-secondary italic pt-1.5 border-t border-ns-border/80 text-[11px]">
                          "{b.problemDescription}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-xs text-ns-text-secondary">Total Payout</p>
                        <p className="text-lg font-semibold text-kolam-teal">₹{b.totalPrice || b.servicePrice}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDeclineBooking(b)}
                          className="px-4 py-2 rounded-xl bg-kolam-sunk hover:bg-kolam-kumkum-soft text-kolam-kumkum font-semibold text-xs border border-kolam-kumkum-line transition-colors cursor-pointer"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleAcceptRequest(b)}
                          className="px-5 py-2 rounded-xl bg-kolam-teal hover:bg-kolam-teal text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
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
            <h2 className="font-display text-lg font-semibold text-ns-navy flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-kolam-teal" />
              Completed Service History ({completedJobs.length})
            </h2>

            {completedJobs.length === 0 ? (
              <div className="bg-kolam-surface rounded-2xl p-12 border border-ns-border/80 text-center text-ns-text-secondary text-xs shadow-soft">
                No completed jobs in this demo session yet.
              </div>
            ) : (
              <div className="space-y-3">
                {completedJobs.map((b) => (
                  <div key={b.id} className="bg-kolam-surface rounded-2xl p-5 border border-ns-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-soft">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-ns-text-secondary">#{b.bookingNumber}</span>
                        <span className="bg-kolam-teal-soft text-kolam-teal text-[11px] font-semibold px-2 py-0.5 rounded-full border border-kolam-teal-line">
                          Completed & Paid
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-ns-navy text-sm">{b.serviceName}</h4>
                      <p className="text-xs text-ns-text-secondary">
                        {b.customerName} • {b.serviceLocation} • {b.scheduledDate}
                      </p>
                    </div>

                    <div className="text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                      <p className="text-base font-semibold text-kolam-teal">₹{b.totalPrice || b.servicePrice}</p>
                      <p className="text-[10px] text-ns-text-secondary">Settled via {b.paymentMethod || 'UPI'}</p>
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
              <div className="bg-kolam-surface rounded-2xl p-6 border border-ns-border/80 shadow-soft space-y-3">
                <p className="text-xs font-semibold text-ns-text-secondary uppercase tracking-wider">Available Wallet Balance</p>
                <p className="text-3xl font-semibold text-ns-navy">₹{totalEarnings.toLocaleString('en-IN')}</p>
                <p className="text-xs text-kolam-teal font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Next payout automatically sent on Monday
                </p>
                <button
                  onClick={() => showToast('Withdrawal Requested', 'Instant transfer to registered bank account initiated.', 'success')}
                  className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer mt-2"
                >
                  Request Instant Payout
                </button>
              </div>

              <div className="bg-kolam-surface rounded-2xl p-6 border border-ns-border/80 shadow-soft space-y-3">
                <p className="text-xs font-semibold text-ns-text-secondary uppercase tracking-wider">Bank & UPI Settlement</p>
                <div className="bg-kolam-wash p-3 rounded-xl border border-ns-border text-xs space-y-1">
                  <p className="font-semibold text-ns-navy">HDFC Bank •••• 4912</p>
                  <p className="text-ns-text-secondary">IFSC: HDFC0001824</p>
                  <p className="text-ns-text-secondary font-mono text-[11px]">UPI: ravitechnician@hdfcbank</p>
                </div>
                <span className="text-[11px] text-kolam-teal font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> KYC Verified by NammaServe Admin
                </span>
              </div>

              <div className="bg-kolam-surface rounded-2xl p-6 border border-ns-border/80 shadow-soft space-y-3">
                <p className="text-xs font-semibold text-ns-text-secondary uppercase tracking-wider">Commission & Fee Structure</p>
                <div className="text-xs text-ns-text-secondary space-y-2">
                  <div className="flex justify-between">
                    <span>Platform Commission:</span>
                    <strong className="text-ns-navy">10% per job</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>GST on Service:</span>
                    <strong className="text-ns-navy">18% (Passed to Govt)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Parts & Material Markup:</span>
                    <strong className="text-kolam-teal">0% (100% to Pro)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Payout history table */}
            <div className="bg-kolam-surface rounded-2xl p-6 border border-ns-border/80 shadow-soft space-y-4">
              <h3 className="font-display font-semibold text-ns-navy text-base">Recent Settlements & Payout History</h3>
              <div className="divide-y divide-kolam-sunk text-xs">
                {[
                  { date: '21 Sep 2026', ref: 'PAY-CHN-8821', jobs: 12, amount: 8450, status: 'Credited' },
                  { date: '14 Sep 2026', ref: 'PAY-CHN-8419', jobs: 9, amount: 6200, status: 'Credited' },
                  { date: '07 Sep 2026', ref: 'PAY-CHN-8104', jobs: 14, amount: 9800, status: 'Credited' },
                ].map((p, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-ns-navy">{p.date}</p>
                      <p className="text-ns-text-secondary font-mono text-[10px]">{p.ref} • {p.jobs} jobs</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-ns-navy">₹{p.amount.toLocaleString('en-IN')}</p>
                      <span className="text-[10px] text-kolam-teal font-semibold">{p.status}</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ns-navy/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-kolam-surface rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-elevated border border-kolam-sunk space-y-5">
            <div className="flex items-center justify-between border-b border-kolam-sunk pb-3">
              <div>
                <h3 className="font-display font-semibold text-ns-navy text-lg">Add Spare Parts / Extra Charge</h3>
                <p className="text-xs text-ns-text-secondary">Booking #{chargeModalBooking.bookingNumber}</p>
              </div>
              <button
                onClick={() => setChargeModalBooking(null)}
                className="p-2 text-ns-text-secondary hover:text-ns-text-secondary rounded-full hover:bg-kolam-sunk"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitAdditionalCharge} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-ns-text">Spare Parts / Material Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Copper pipe 3m + AC Gas R32 refill (1kg)"
                  value={partsDesc}
                  onChange={(e) => setPartsDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ns-border focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-ns-text">Parts Cost (₹)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 1200"
                    value={partsAmount}
                    onChange={(e) => setPartsAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ns-border focus:outline-none focus:border-brand-500 font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-ns-text">Extra Labour (₹)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 300"
                    value={labourAmount}
                    onChange={(e) => setLabourAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ns-border focus:outline-none focus:border-brand-500 font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-ns-text">Reason for Additional Charge</label>
                <textarea
                  rows={2}
                  placeholder="Explain why this replacement is necessary..."
                  value={chargeReason}
                  onChange={(e) => setChargeReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ns-border focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="bg-kolam-marigold-soft p-3 rounded-xl border border-kolam-marigold-line text-[11px] text-kolam-marigold space-y-1">
                <p className="font-semibold">⚠️ Customer Approval Policy:</p>
                <p>The customer will receive an instant approval prompt on their dashboard. Work must not begin until customer clicks "Approve".</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setChargeModalBooking(null)}
                  className="px-4 py-2.5 rounded-xl bg-kolam-sunk text-ns-text font-semibold hover:bg-ns-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ns-navy/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-kolam-surface rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-elevated border border-kolam-sunk space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-kolam-teal-soft text-kolam-teal rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-ns-navy text-lg">Verify Completion OTP</h3>
              <p className="text-xs text-ns-text-secondary">
                Ask <strong>{otpModalBooking.customerName}</strong> for the 4-digit service verification code shown on their booking card.
              </p>
            </div>

            <div className="bg-kolam-wash p-4 rounded-2xl border border-ns-border text-xs space-y-1.5 text-center">
              <p className="text-ns-text-secondary font-mono text-[11px]">Booking #{otpModalBooking.bookingNumber}</p>
              <p className="font-semibold text-ns-navy">{otpModalBooking.serviceName}</p>
              <p className="text-kolam-teal font-semibold text-lg">₹{otpModalBooking.totalPrice || otpModalBooking.servicePrice}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-ns-text block text-center">Enter 4-Digit Customer OTP</label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 4829"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                className="w-full text-center tracking-widest text-2xl font-mono font-semibold py-3 rounded-2xl border-2 border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
                autoFocus
              />
              <p className="text-[10px] text-ns-text-secondary text-center">
                Demo hint: You can enter any 4 digits (e.g. 1234) to confirm completion.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOtpModalBooking(null)}
                className="flex-1 py-3 rounded-2xl bg-kolam-sunk text-ns-text font-semibold text-xs hover:bg-ns-border"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerifyOtpAndComplete}
                className="flex-1 py-3 rounded-2xl bg-kolam-teal hover:bg-kolam-teal text-white font-semibold text-xs shadow-sm transition-all"
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
