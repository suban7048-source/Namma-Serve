import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { AlertTriangle, X, ChevronDown } from 'lucide-react';
import { ComplaintCategory } from '../../types';

const COMPLAINT_CATEGORIES: { value: ComplaintCategory; label: string }[] = [
  { value: 'SERVICE_QUALITY', label: 'Service Quality Issue' },
  { value: 'TECHNICIAN_BEHAVIOR', label: 'Technician Behavior' },
  { value: 'PRICING_DISPUTE', label: 'Pricing Dispute / Overcharge' },
  { value: 'DELAY', label: 'Service Delay / No Show' },
  { value: 'DAMAGE', label: 'Property Damage' },
  { value: 'OTHER', label: 'Other' },
];

// Global complaint modal context — use a simple global state approach
let openComplaintFn: ((bookingId: string) => void) | null = null;

export const openComplaintModal = (bookingId: string) => {
  openComplaintFn?.(bookingId);
};

export const ComplaintModal: React.FC = () => {
  const { bookings, complaints, addComplaint, loggedInUser } = useApp();
  const { showToast } = useToast();
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [category, setCategory] = useState<ComplaintCategory>('SERVICE_QUALITY');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    openComplaintFn = (id: string) => {
      setBookingId(id);
      setCategory('SERVICE_QUALITY');
      setDescription('');
    };
    return () => { openComplaintFn = null; };
  }, []);

  const targetBooking = bookings.find(b => b.id === bookingId);
  const isOpen = Boolean(bookingId);

  const close = () => {
    setBookingId(null);
    setDescription('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetBooking || description.trim().length < 20) {
      showToast('Description required', 'Please describe the issue in at least 20 characters.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addComplaint({
        bookingId: targetBooking.id,
        bookingNumber: targetBooking.bookingNumber,
        customerId: targetBooking.customerId,
        customerName: targetBooking.customerName,
        technicianId: targetBooking.providerId,
        technicianName: targetBooking.providerName,
        category,
        description: description.trim(),
      });
      showToast('Complaint Registered', 'Your complaint has been submitted. Our team will review within 24 hours.', 'success');
      setIsSubmitting(false);
      close();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-elevated w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Raise a Complaint</h2>
              {targetBooking && (
                <p className="text-xs text-slate-400 font-mono">#{targetBooking.bookingNumber} — {targetBooking.serviceName}</p>
              )}
            </div>
          </div>
          <button onClick={close} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Existing complaints warning */}
          {targetBooking && complaints.some(c => c.bookingId === targetBooking.id) && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-2xl p-3">
              ⚠️ A complaint already exists for this booking and is under review.
            </div>
          )}

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Complaint Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ComplaintCategory)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 rounded-xl p-3 text-sm font-medium text-slate-800 focus:outline-none appearance-none cursor-pointer"
              >
                {COMPLAINT_CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Describe the Issue
              <span className="text-slate-400 font-normal ml-1">(min. 20 characters)</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              placeholder="Please describe what went wrong in detail. The more specific, the faster we can resolve it."
              className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl p-3 text-sm text-slate-800 resize-none focus:outline-none transition-all"
            />
            <div className={`text-[10px] text-right font-semibold ${description.length < 20 && description.length > 0 ? 'text-red-500' : 'text-slate-400'}`}>
              {description.length} / 20 min.
            </div>
          </div>

          {/* Info box */}
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-xs text-brand-700 leading-relaxed">
            <strong>What happens next:</strong> Our support team reviews your complaint within 24 hours and coordinates with the technician and admin. You will be notified of the resolution.
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={close}
              className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || description.trim().length < 20}
              className="flex-1 py-3 rounded-2xl bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
