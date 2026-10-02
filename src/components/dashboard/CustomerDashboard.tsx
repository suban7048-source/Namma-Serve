import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingStatus, Booking } from '../../types';
import { RatingStars } from '../common/RatingStars';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { ConfirmModal } from '../common/ConfirmModal';
import { openComplaintModal } from '../common/ComplaintModal';
import { openInvoiceModal } from '../common/InvoiceModal';
import { useToast } from '../../context/ToastContext';
import {
  Calendar, Clock, MapPin, MessageSquare, Star,
  CheckCircle2, AlertCircle, RotateCcw, Heart, ShieldCheck,
  X, FileText, AlertTriangle, ShieldAlert, ChevronRight, Zap,
  Package, Search
} from 'lucide-react';

type DashboardTab = 'bookings' | 'warranties' | 'complaints' | 'saved';

export const CustomerDashboard: React.FC = () => {
  const {
    bookings, updateBookingStatus, favorites, providers,
    setActiveBookingForChat, setReviewBooking, setActiveProviderProfile, setPage,
    resetFilters, warranties, complaints, loggedInUser, approveAdditionalCharge, rejectAdditionalCharge,
    claimWarranty
  } = useApp();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<DashboardTab>('bookings');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);

  const customerBookings = bookings;
  const activeBookings = customerBookings.filter(b =>
    !['COMPLETED', 'CANCELLED'].includes(b.status)
  );
  const completedBookings = customerBookings.filter(b => b.status === 'COMPLETED');
  const savedProvidersList = providers.filter(p => favorites.includes(p.id));

  const filteredBookings = customerBookings.filter(b => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return !['COMPLETED', 'CANCELLED'].includes(b.status);
    if (statusFilter === 'completed') return b.status === 'COMPLETED';
    if (statusFilter === 'cancelled') return b.status === 'CANCELLED';
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    const styles: Partial<Record<BookingStatus, string>> = {
      PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
      TECHNICIAN_ASSIGNED: 'bg-blue-50 text-blue-700 border-blue-200',
      TECHNICIAN_ACCEPTED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      ON_THE_WAY: 'bg-sky-50 text-sky-700 border-sky-200 animate-pulse',
      ARRIVED: 'bg-teal-50 text-teal-700 border-teal-200',
      SERVICE_STARTED: 'bg-violet-50 text-violet-700 border-violet-200 animate-pulse',
      SERVICE_COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      PAYMENT_PENDING: 'bg-orange-50 text-orange-700 border-orange-200',
      COMPLETED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      CANCELLED: 'bg-rose-50 text-rose-700 border-rose-200',
    };

    return (
      <span className={`text-[11px] px-2.5 py-1 rounded-full border font-bold ${styles[status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
        {status.replace(/_/g, ' ')}
      </span>
    );
  };

  const getTimelineStep = (status: BookingStatus): number => {
    const steps: Partial<Record<BookingStatus, number>> = {
      PENDING: 0,
      TECHNICIAN_ASSIGNED: 1,
      TECHNICIAN_ACCEPTED: 2,
      ON_THE_WAY: 3,
      ARRIVED: 4,
      SERVICE_STARTED: 5,
      SERVICE_COMPLETED: 6,
      COMPLETED: 7,
    };
    return steps[status] ?? 0;
  };

  const handleCancelConfirm = () => {
    if (cancelModalBooking) {
      updateBookingStatus(cancelModalBooking.id, 'CANCELLED', 'Cancelled by customer');
      showToast('Booking Cancelled', 'Your booking has been cancelled.', 'info');
      setCancelModalBooking(null);
    }
  };

  const TIMELINE_LABELS = [
    'Booked', 'Technician Assigned', 'Confirmed', 'On The Way', 'Arrived', 'In Progress', 'Done', 'Completed',
  ];

  const TABS: { id: DashboardTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'bookings', label: 'My Bookings', icon: <Calendar className="w-4 h-4" />, count: customerBookings.length },
    { id: 'warranties', label: 'Warranties', icon: <ShieldCheck className="w-4 h-4" />, count: warranties.length },
    { id: 'complaints', label: 'Complaints', icon: <AlertTriangle className="w-4 h-4" />, count: complaints.length },
    { id: 'saved', label: 'Saved Pros', icon: <Heart className="w-4 h-4" />, count: savedProvidersList.length },
  ];

  const userName = loggedInUser?.name || 'Aakash Malhotra';

  return (
    <div className="py-8 bg-gradient-to-b from-brand-50/40 via-white to-slate-50 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                Customer Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {userName.split(' ')[0]}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Track your bookings, warranties, and home service history all in one place.
            </p>
          </div>

          <button
            onClick={() => {
              resetFilters();
              setPage('discovery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-5 py-3 rounded-2xl transition-colors shadow-sm"
          >
            <Zap className="w-4 h-4" />
            Book a Service
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Active Bookings', value: activeBookings.length, color: 'text-brand-600', bg: 'bg-brand-50 border-brand-100' },
            { label: 'Completed', value: completedBookings.length, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
            { label: 'Active Warranties', value: warranties.filter(w => w.status === 'ACTIVE').length, color: 'text-violet-600', bg: 'bg-violet-50 border-violet-100' },
            { label: 'Saved Pros', value: savedProvidersList.length, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100' },
          ].map(stat => (
            <div key={stat.label} className={`rounded-2xl p-4 border ${stat.bg} space-y-1`}>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-soft overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-4 animate-fade-in">
            {/* Status Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['all', 'active', 'completed', 'cancelled'].map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap ${
                    statusFilter === f
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {f === 'active' && activeBookings.length > 0 && (
                    <span className="ml-1 bg-amber-400 text-white rounded-full px-1.5 text-[9px] font-black">
                      {activeBookings.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center space-y-4 shadow-soft">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                  <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-xl">No Bookings Yet</h3>
                <p className="text-xs text-slate-500">Browse 500+ verified professionals in Chennai and book your first service.</p>
                <button
                  onClick={() => { resetFilters(); setPage('discovery'); }}
                  className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  Explore Services <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((b) => {
                  const step = getTimelineStep(b.status);
                  const hasPendingCharge = b.additionalCharges?.some(c => c.status === 'PENDING_APPROVAL');
                  const canCancel = ['PENDING', 'TECHNICIAN_ASSIGNED'].includes(b.status);
                  const canReview = b.status === 'COMPLETED' && !b.hasBeenReviewed;
                  const provider = providers.find(p => p.id === b.providerId);

                  return (
                    <div key={b.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">

                      {/* Additional charge approval banner */}
                      {hasPendingCharge && (
                        <div className="bg-amber-50 border-b border-amber-200 p-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-xs text-amber-800">
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="font-semibold">
                              Technician requested additional charges for extra work. Please review and approve.
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Booking Header */}
                      <div className="p-5 pb-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <InitialsAvatar name={b.providerName} size="md" rounded="2xl" />
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-extrabold text-slate-900 text-base">{b.serviceName}</h3>
                                {b.isEmergency && (
                                  <span className="text-[9px] font-black text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full">
                                    🚨 EMERGENCY
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">
                                <span className="font-semibold text-slate-700">{b.providerName}</span>
                                {' · '}
                                <span className="font-mono text-[10px]">#{b.bookingNumber}</span>
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0">
                            {getStatusBadge(b.status)}
                          </div>
                        </div>

                        {/* Details row */}
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-brand-500" />
                            {b.scheduledDate} at {b.scheduledTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {b.serviceArea || b.serviceLocation.split(',')[0]}
                          </span>
                        </div>

                        {/* Booking status timeline */}
                        {!['COMPLETED', 'CANCELLED'].includes(b.status) && (
                          <div className="mt-4 mb-2">
                            <div className="flex items-center gap-0.5 overflow-x-auto pb-1">
                              {TIMELINE_LABELS.slice(0, 6).map((label, idx) => (
                                <React.Fragment key={idx}>
                                  <div className="flex flex-col items-center min-w-[56px]">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                                      idx < step
                                        ? 'bg-brand-600 border-brand-600 text-white'
                                        : idx === step
                                        ? 'bg-white border-brand-500 text-brand-600 ring-2 ring-brand-200'
                                        : 'bg-slate-100 border-slate-200 text-slate-400'
                                    }`}>
                                      {idx < step ? (
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                      ) : (
                                        <span className="text-[10px] font-black">{idx + 1}</span>
                                      )}
                                    </div>
                                    <p className="text-[9px] text-center text-slate-500 mt-1 leading-tight max-w-[50px]">{label}</p>
                                  </div>
                                  {idx < 5 && (
                                    <div className={`h-0.5 flex-1 min-w-[8px] transition-all ${
                                      idx < step ? 'bg-brand-500' : 'bg-slate-200'
                                    }`} />
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Pricing & Actions footer */}
                      <div className="p-5 pt-3 border-t border-slate-100 mt-4">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          {/* Pricing */}
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <div>
                              <span className="text-[10px] block text-slate-400">Service</span>
                              <span className="font-bold text-slate-800">₹{b.servicePrice}</span>
                            </div>
                            {b.visitCharge > 0 && (
                              <div>
                                <span className="text-[10px] block text-slate-400">Visit</span>
                                <span className="font-bold text-slate-800">₹{b.visitCharge}</span>
                              </div>
                            )}
                            {b.gst > 0 && (
                              <div>
                                <span className="text-[10px] block text-slate-400">GST</span>
                                <span className="font-bold text-slate-800">₹{b.gst}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-[10px] block text-slate-400">Total</span>
                              <span className="font-extrabold text-slate-900 text-sm">₹{b.totalPrice}</span>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Additional charge actions */}
                            {b.additionalCharges?.map(charge => charge.status === 'PENDING_APPROVAL' ? (
                              <div key={charge.id} className="flex items-center gap-2">
                                <div className="text-xs">
                                  <span className="font-bold text-amber-700">+₹{charge.total} extra work</span>
                                  <span className="text-slate-400 ml-1">({charge.description})</span>
                                </div>
                                <button
                                  onClick={() => { approveAdditionalCharge(b.id, charge.id); showToast('Approved', 'Additional charge approved', 'success'); }}
                                  className="px-2.5 py-1.5 bg-emerald-600 text-white text-[10px] font-black rounded-lg"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => { rejectAdditionalCharge(b.id, charge.id); showToast('Rejected', 'Additional charge rejected', 'info'); }}
                                  className="px-2.5 py-1.5 border border-red-300 text-red-600 text-[10px] font-black rounded-lg"
                                >
                                  Reject
                                </button>
                              </div>
                            ) : null)}

                            {/* Chat */}
                            {!['COMPLETED', 'CANCELLED'].includes(b.status) && (
                              <button
                                onClick={() => setActiveBookingForChat(b)}
                                className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
                                Chat
                              </button>
                            )}

                            {/* Invoice */}
                            {['SERVICE_COMPLETED', 'PAYMENT_PENDING', 'COMPLETED'].includes(b.status) && (
                              <button
                                onClick={() => openInvoiceModal(b)}
                                className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5"
                              >
                                <FileText className="w-3.5 h-3.5 text-slate-500" />
                                Invoice
                              </button>
                            )}

                            {/* Review */}
                            {canReview && provider && (
                              <button
                                onClick={() => { setReviewBooking(b); }}
                                className="px-3 py-2 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-100 border border-amber-200 flex items-center gap-1.5"
                              >
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                Rate Service
                              </button>
                            )}

                            {/* Complaint */}
                            {b.status === 'COMPLETED' && (
                              <button
                                onClick={() => openComplaintModal(b.id)}
                                className="px-3 py-2 rounded-xl text-slate-500 font-bold text-xs hover:bg-red-50 hover:text-red-600 border border-slate-200 hover:border-red-200 flex items-center gap-1.5 transition-colors"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" />
                                Issue
                              </button>
                            )}

                            {/* Cancel */}
                            {canCancel && (
                              <button
                                onClick={() => setCancelModalBooking(b)}
                                className="px-3 py-2 rounded-xl text-rose-600 font-bold text-xs hover:bg-rose-50 border border-rose-200 flex items-center gap-1.5"
                              >
                                <X className="w-3.5 h-3.5" />
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* WARRANTIES TAB */}
        {activeTab === 'warranties' && (
          <div className="space-y-4 animate-fade-in">
            {warranties.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center shadow-soft space-y-4">
                <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-extrabold text-slate-900 text-xl">No Active Warranties</h3>
                <p className="text-xs text-slate-500">Services with warranty will appear here after completion.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {warranties.map(w => {
                  const daysLeft = Math.max(0, Math.ceil(
                    (new Date(w.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  ));
                  const isExpired = w.status === 'EXPIRED' || daysLeft === 0;
                  const isClaimed = w.status === 'CLAIMED';

                  return (
                    <div key={w.id} className={`bg-white rounded-2xl border shadow-soft p-5 space-y-4 ${
                      isClaimed ? 'border-amber-200' : isExpired ? 'border-slate-200 opacity-70' : 'border-emerald-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                            isClaimed ? 'bg-amber-50 border-amber-200' :
                            isExpired ? 'bg-slate-100 border-slate-200' :
                            'bg-emerald-50 border-emerald-200'
                          }`}>
                            <ShieldCheck className={`w-4 h-4 ${
                              isClaimed ? 'text-amber-600' : isExpired ? 'text-slate-400' : 'text-emerald-600'
                            }`} />
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-900 text-sm">{w.serviceName}</p>
                            <p className="text-[10px] text-slate-400 font-mono">#{w.bookingNumber}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold ${
                          isClaimed ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          isExpired ? 'bg-slate-100 text-slate-500 border-slate-200' :
                          'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {isClaimed ? 'CLAIMED' : isExpired ? 'EXPIRED' : 'ACTIVE'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                          <p className="text-[10px] text-slate-400">Technician</p>
                          <p className="font-bold text-slate-800">{w.technicianName}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                          <p className="text-[10px] text-slate-400">Expires</p>
                          <p className="font-bold text-slate-800">
                            {new Date(w.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>

                      {!isExpired && !isClaimed && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-500">
                            <span>Warranty Period</span>
                            <span className={`font-bold ${daysLeft < 15 ? 'text-amber-600' : 'text-emerald-600'}`}>
                              {daysLeft} days left
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${daysLeft < 15 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min(100, (daysLeft / w.warrantyDays) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {w.claimReason && (
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5 text-xs text-amber-700">
                          <strong>Claim reason:</strong> {w.claimReason}
                        </div>
                      )}

                      {!isExpired && !isClaimed && (
                        <button
                          onClick={() => {
                            const reason = window.prompt('Describe the issue for your warranty claim:');
                            if (reason) {
                              claimWarranty(w.id, reason);
                              showToast('Warranty Claimed', 'A technician will contact you for a free revisit.', 'success');
                            }
                          }}
                          className="w-full py-2.5 border border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-colors"
                        >
                          Claim Warranty (Free Revisit)
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* COMPLAINTS TAB */}
        {activeTab === 'complaints' && (
          <div className="space-y-4 animate-fade-in">
            {complaints.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center shadow-soft space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-extrabold text-slate-900 text-xl">No Complaints Filed</h3>
                <p className="text-xs text-slate-500">
                  Had an issue? You can raise a complaint from any completed booking.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {complaints.map(c => (
                  <div key={c.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">
                          {c.category.replace(/_/g, ' ')}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">Booking #{c.bookingNumber}</p>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold ${
                        c.status === 'OPEN' ? 'bg-red-50 text-red-700 border-red-200' :
                        c.status === 'UNDER_REVIEW' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        c.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {c.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 border border-slate-100">
                      "{c.description}"
                    </div>

                    {c.adminNote && (
                      <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-xs text-brand-800">
                        <strong>Admin Response:</strong> {c.adminNote}
                      </div>
                    )}

                    <p className="text-[10px] text-slate-400">
                      Filed: {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      {c.resolvedAt && ` • Resolved: ${new Date(c.resolvedAt).toLocaleDateString('en-IN')}`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED PROVIDERS TAB */}
        {activeTab === 'saved' && (
          <div className="animate-fade-in">
            {savedProvidersList.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center shadow-soft space-y-4">
                <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-extrabold text-slate-900 text-xl">No Saved Professionals</h3>
                <p className="text-xs text-slate-500">Tap the heart ♥ on any provider card to save them for quick access.</p>
                <button
                  onClick={() => setPage('discovery')}
                  className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl inline-flex items-center gap-2"
                >
                  Browse Providers <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedProvidersList.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-4 flex items-center gap-4">
                    <InitialsAvatar name={p.name} size="md" rounded="2xl" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 text-sm truncate">{p.name}</h3>
                        {p.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-400">{p.category} • {p.location}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <RatingStars rating={p.rating} showNumeric />
                        <span className="text-[10px] text-slate-400">• {p.completedJobs} jobs</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveProviderProfile(p)}
                      className="px-3 py-2 bg-brand-50 text-brand-700 border border-brand-200 rounded-xl text-xs font-bold hover:bg-brand-100 transition-colors shrink-0"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(cancelModalBooking)}
        title="Cancel Booking?"
        message={`Cancel booking #${cancelModalBooking?.bookingNumber}? This action cannot be undone.`}
        confirmText="Yes, Cancel Booking"
        cancelText="Keep Booking"
        variant="danger"
        onConfirm={handleCancelConfirm}
        onCancel={() => setCancelModalBooking(null)}
      />
    </div>
  );
};
