import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingStatus, Booking } from '../../types';
import { useToast } from '../../context/ToastContext';
import { ConfirmModal } from '../common/ConfirmModal';
import { RatingStars } from '../common/RatingStars';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { 
  Wrench, CheckCircle2, XCircle, Clock, Calendar, 
  DollarSign, MessageSquare, ShieldCheck, MapPin, User, Settings, AlertCircle 
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const { bookings, updateBookingStatus, setActiveBookingForChat, providers } = useApp();
  const { showToast } = useToast();

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [declineBooking, setDeclineBooking] = useState<Booking | null>(null);

  // Provider profile for Marcus Vance (Demo Provider)
  const currentProvider = providers[0];

  const pendingRequests = bookings.filter(b => b.status === 'Requested');
  const upcomingJobs = bookings.filter(b => b.status === 'Accepted' || b.status === 'Scheduled' || b.status === 'In Progress');
  const completedJobs = bookings.filter(b => b.status === 'Completed');

  const totalEarnings = completedJobs.reduce((acc, b) => acc + b.servicePrice, 0) + 480; // demo baseline

  const handleAcceptRequest = (b: Booking) => {
    updateBookingStatus(b.id, 'Scheduled');
    showToast('Booking Request Accepted', `Scheduled for ${b.scheduledDate} at ${b.scheduledTime}`, 'success');
  };

  const handleDeclineConfirm = () => {
    if (declineBooking) {
      updateBookingStatus(declineBooking.id, 'Cancelled');
      showToast('Booking Declined', 'Customer has been notified.', 'info');
      setDeclineBooking(null);
    }
  };

  const handleMarkCompleted = (b: Booking) => {
    updateBookingStatus(b.id, 'Completed');
    showToast('Job Marked Completed!', `Earned ₹${b.servicePrice}`, 'success');
  };

  const handleStartJob = (b: Booking) => {
    updateBookingStatus(b.id, 'In Progress');
    showToast('Job Started', 'Customer notified that you are working on-site.', 'info');
  };

  return (
    <div className="py-8 bg-gradient-to-b from-brand-50/40 via-white to-slate-50 text-slate-900 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Provider Portal Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <InitialsAvatar name={currentProvider.name} size="lg" rounded="2xl" className="border-2 border-brand-500" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{currentProvider.name}</h1>
                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full border border-brand-200">
                  {currentProvider.category} Pro
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{currentProvider.businessName}</p>
              
              <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                <RatingStars rating={currentProvider.rating} reviewCount={currentProvider.reviewCount} showNumeric />
                <span>•</span>
                <span className="text-emerald-600 font-semibold">{currentProvider.completedJobs} Jobs Completed</span>
              </div>
            </div>
          </div>

          {/* Duty Online / Offline Toggle */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 shrink-0">
            <div>
              <p className="text-xs font-bold text-slate-900">Accepting Requests</p>
              <p className="text-[10px] text-slate-500">{isOnline ? 'Online & Visible on Search' : 'Off Duty / Paused'}</p>
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

        {/* Earnings & Key Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Monthly Earnings</p>
            <p className="text-2xl font-black text-emerald-600">₹{totalEarnings}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">New Requests</p>
            <p className="text-2xl font-black text-amber-600">{pendingRequests.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Upcoming Jobs</p>
            <p className="text-2xl font-black text-brand-600">{upcomingJobs.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Rating Score</p>
            <p className="text-2xl font-black text-slate-900">{currentProvider.rating}★</p>
          </div>
        </div>

        {/* SECTION 1: NEW SERVICE REQUESTS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              New Service Requests ({pendingRequests.length})
            </h2>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 text-center text-slate-500 text-xs shadow-soft">
              No new pending service requests right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map((b) => (
                <div key={b.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 space-y-4 shadow-soft">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono text-xs font-bold text-slate-400">#{b.bookingNumber}</span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      Pending Action
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">{b.serviceName}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Customer: {b.customerName} ({b.customerPhone})</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-600 shrink-0" /> {b.scheduledDate} at {b.scheduledTime}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> {b.serviceLocation}
                    </p>
                    {b.problemDescription && (
                      <p className="text-slate-500 italic pt-1 border-t border-slate-200/80">
                        "{b.problemDescription}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-lg font-black text-emerald-600">₹{b.servicePrice}</p>
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
                        Accept Request
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: SCHEDULED & IN-PROGRESS JOBS */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-600" />
            Active & Scheduled Jobs ({upcomingJobs.length})
          </h2>

          {upcomingJobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 text-center text-slate-500 text-xs shadow-soft">
              No active jobs scheduled today.
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingJobs.map((b) => (
                <div key={b.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-soft">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-400">#{b.bookingNumber}</span>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                        b.status === 'In Progress'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse'
                          : 'bg-brand-50 text-brand-700 border-brand-200'
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-lg">{b.serviceName}</h3>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                      <span>Customer: <strong className="text-slate-800">{b.customerName}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand-600" /> {b.scheduledDate} {b.scheduledTime}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {b.serviceLocation}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <button
                      onClick={() => setActiveBookingForChat(b)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-brand-600" /> Chat
                    </button>

                    {b.status === 'Scheduled' && (
                      <button
                        onClick={() => handleStartJob(b)}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                      >
                        Start Job
                      </button>
                    )}

                    {b.status === 'In Progress' && (
                      <button
                        onClick={() => handleMarkCompleted(b)}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Decline Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(declineBooking)}
        title="Decline Service Request?"
        message={`Are you sure you want to decline booking #${declineBooking?.bookingNumber}?`}
        confirmText="Decline Request"
        cancelText="Go Back"
        variant="warning"
        onConfirm={handleDeclineConfirm}
        onCancel={() => setDeclineBooking(null)}
      />
    </div>
  );
};
