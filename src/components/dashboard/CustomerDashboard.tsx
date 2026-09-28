import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingStatus, Booking } from '../../types';
import { RatingStars } from '../common/RatingStars';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { ConfirmModal } from '../common/ConfirmModal';
import { 
  Calendar, Clock, MapPin, MessageSquare, Star, 
  CheckCircle2, AlertCircle, RotateCcw, Heart, ShieldCheck, Phone, Wrench, X, Filter 
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { 
    bookings, updateBookingStatus, favorites, providers, 
    setActiveBookingForChat, setReviewBooking, setActiveProviderProfile, setPage, resetFilters
  } = useApp();

  const [statusTab, setStatusTab] = useState<string>('all');
  const [activeSubView, setActiveSubView] = useState<'bookings' | 'saved'>('bookings');
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);

  const customerBookings = bookings; // customer bookings

  const activeBookings = customerBookings.filter(b => b.status !== 'Completed' && b.status !== 'Cancelled');
  const completedBookings = customerBookings.filter(b => b.status === 'Completed');

  const filteredBookings = customerBookings.filter(b => {
    if (statusTab === 'all') return true;
    return b.status.toLowerCase().replace(' ', '-') === statusTab;
  });

  const savedProvidersList = providers.filter(p => favorites.includes(p.id));

  const getStatusBadge = (status: BookingStatus) => {
    const styles: Record<BookingStatus, string> = {
      'Requested': 'bg-amber-50 text-amber-700 border-amber-200',
      'Accepted': 'bg-sky-50 text-sky-700 border-sky-200',
      'Scheduled': 'bg-brand-50 text-brand-700 border-brand-200 font-bold',
      'In Progress': 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse',
      'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Cancelled': 'bg-rose-50 text-rose-700 border-rose-200'
    };

    return (
      <span className={`text-[11px] px-3 py-1 rounded-full border font-semibold ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const handleCancelConfirm = () => {
    if (cancelModalBooking) {
      updateBookingStatus(cancelModalBooking.id, 'Cancelled');
      setCancelModalBooking(null);
    }
  };

  return (
    <div className="py-8 bg-gradient-to-b from-brand-50/40 via-white to-slate-50 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Banner Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                Customer Portal
              </span>
              <span className="text-xs text-slate-400 font-medium">Logged in as Aakash Malhotra</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, Aakash! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage your local service requests, track appointments, and chat with providers.
            </p>
          </div>

          <button
            onClick={() => {
              resetFilters();
              setPage('discovery');
            }}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition-all flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <Wrench className="w-4 h-4" /> Book New Service
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Active Requests</p>
            <p className="text-2xl font-black text-slate-900">{activeBookings.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Completed Services</p>
            <p className="text-2xl font-black text-emerald-600">{completedBookings.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Saved Providers</p>
            <p className="text-2xl font-black text-brand-600">{favorites.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Services</p>
            <p className="text-2xl font-black text-slate-900">{customerBookings.length}</p>
          </div>
        </div>

        {/* Tab Selection (My Bookings vs Saved Providers) */}
        <div className="flex items-center gap-4 border-b border-slate-200 text-sm font-bold text-slate-500">
          <button
            onClick={() => setActiveSubView('bookings')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeSubView === 'bookings' ? 'border-brand-600 text-brand-600 font-extrabold' : 'border-transparent hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" /> My Bookings & Requests ({customerBookings.length})
          </button>
          <button
            onClick={() => setActiveSubView('saved')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeSubView === 'saved' ? 'border-brand-600 text-brand-600 font-extrabold' : 'border-transparent hover:text-slate-800'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" /> Saved Providers ({savedProvidersList.length})
          </button>
        </div>

        {/* SUBVIEW 1: BOOKINGS LIST */}
        {activeSubView === 'bookings' && (
          <div className="space-y-6">
            
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
              {[
                { id: 'all', label: 'All Statuses' },
                { id: 'requested', label: 'Requested' },
                { id: 'scheduled', label: 'Scheduled' },
                { id: 'in-progress', label: 'In Progress' },
                { id: 'completed', label: 'Completed' },
                { id: 'cancelled', label: 'Cancelled' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap ${
                    statusTab === tab.id
                      ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Bookings Grid */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-soft text-center space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-base">No bookings match this filter</h3>
                <p className="text-xs text-slate-500">Explore local providers to schedule your first service.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft hover:shadow-card transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <InitialsAvatar name={b.providerName} size="md" rounded="2xl" className="shrink-0" />

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-mono text-xs font-bold text-slate-400">#{b.bookingNumber}</span>
                          {getStatusBadge(b.status)}
                          {b.isEmergency && (
                            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                              Emergency Priority
                            </span>
                          )}
                        </div>

                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {b.serviceName}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-0.5">
                          <span className="font-semibold text-slate-800">Pro: {b.providerName}</span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-brand-600" /> {b.scheduledDate} at {b.scheduledTime}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {b.serviceLocation}
                          </span>
                        </div>

                        {b.problemDescription && (
                          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2">
                            "{b.problemDescription}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Price & Actions */}
                    <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 gap-4 shrink-0">
                      <div className="text-left lg:text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Price</span>
                        <p className="text-xl font-black text-slate-900">₹{b.totalPrice}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Direct Chat */}
                        <button
                          onClick={() => setActiveBookingForChat(b)}
                          className="px-3 py-2 rounded-xl bg-brand-50 text-brand-700 font-bold text-xs hover:bg-brand-100 transition-colors flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> Message
                        </button>

                        {/* Rate & Review if Completed */}
                        {b.status === 'Completed' && !b.hasBeenReviewed && (
                          <button
                            onClick={() => setReviewBooking(b)}
                            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
                          >
                            <Star className="w-3.5 h-3.5 fill-white" /> Rate Job
                          </button>
                        )}

                        {/* Cancel Option */}
                        {b.status !== 'Completed' && b.status !== 'Cancelled' && (
                          <button
                            onClick={() => setCancelModalBooking(b)}
                            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
                          >
                            Cancel
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

        {/* SUBVIEW 2: SAVED PROVIDERS GRID */}
        {activeSubView === 'saved' && (
          <div className="space-y-4">
            {savedProvidersList.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-soft text-center space-y-3">
                <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-base">No saved providers yet</h3>
                <p className="text-xs text-slate-500">Click the heart icon on any provider profile to bookmark them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {savedProvidersList.map((p) => (
                  <div key={p.id} className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-soft space-y-4">
                    <div className="flex items-center gap-3">
                      <InitialsAvatar name={p.name} size="md" rounded="2xl" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">{p.name}</h4>
                        <span className="text-xs text-slate-500 font-medium">{p.category}</span>
                        <RatingStars rating={p.rating} reviewCount={p.reviewCount} showNumeric />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-3 border-t">
                      <span className="font-bold text-slate-900">₹{p.startingPrice}/{p.priceUnit}</span>
                      <button
                        onClick={() => setActiveProviderProfile(p)}
                        className="text-brand-600 font-bold hover:underline"
                      >
                        View Profile →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Confirm Cancel Modal */}
      <ConfirmModal
        isOpen={Boolean(cancelModalBooking)}
        title="Cancel Service Booking?"
        message={`Are you sure you want to cancel booking #${cancelModalBooking?.bookingNumber} with ${cancelModalBooking?.providerName}?`}
        confirmText="Yes, Cancel Booking"
        cancelText="Keep Booking"
        variant="danger"
        onConfirm={handleCancelConfirm}
        onCancel={() => setCancelModalBooking(null)}
      />
    </div>
  );
};
