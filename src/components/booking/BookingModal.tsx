import React, { useState } from 'react';
import { Provider, ServiceItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../common/Avatar';
import { KolamEmptyState } from '../common/Kolam';
import { 
  Wrench, Calendar, Clock, MapPin, CheckCircle2, 
  ChevronRight, ArrowLeft, ShieldCheck, CreditCard, X, AlertTriangle 
} from 'lucide-react';

interface BookingModalProps {
  provider: Provider | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ provider, onClose }) => {
  const { createBooking, setPage, setActiveBookingForChat, setActiveProviderProfile, loggedInUser } = useApp();
  const { showToast } = useToast();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdBookingResult, setCreatedBookingResult] = useState<any>(null);

  // Form State
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    provider?.offeredServices[0] || null
  );
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [serviceLocation, setServiceLocation] = useState<string>('12, 4th Cross Street, Anna Nagar, Chennai - 600040');
  const [accessNotes, setAccessNotes] = useState<string>('Gate code #4492. Ring bell on Arrival.');
  const [scheduledDate, setScheduledDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [scheduledTime, setScheduledTime] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pay_later'>('card');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);

  const todayStr = new Date().toISOString().split('T')[0];

  React.useEffect(() => {
    if (provider) {
      setStep(1);
      setCreatedBookingResult(null);
      setSelectedService(provider.offeredServices[0] || null);
      setProblemDescription('');
      setIsEmergency(false);
      setPromoCode('');
      setPromoApplied(false);
      setScheduledTime('');
      setScheduledDate(new Date().toISOString().split('T')[0]);
    }
  }, [provider]);

  if (!provider) return null;

  const visitCharge = selectedService?.visitCharge ?? provider.visitCharge;
  const rawServicePrice = selectedService ? selectedService.price : provider.startingPrice;
  const partsCharge = 0; // No parts initially — technician can request later
  const subtotal = rawServicePrice + visitCharge + partsCharge;
  const promoDiscount = promoApplied ? 100 : 0;
  const gst = Math.round((subtotal - promoDiscount) * 0.18);
  const totalPrice = Math.max(0, subtotal - promoDiscount + gst);
  const warrantyDays = selectedService?.warrantyDays ?? 0;

  const availableTimes = ['9:00 AM', '11:30 AM', '2:30 PM', '4:30 PM', '6:00 PM'];

  // Per-step validation
  const isStepValid = () => {
    if (step === 1) return selectedService !== null;
    if (step === 3) return serviceLocation.trim().length > 0;
    if (step === 4) return scheduledDate !== '' && scheduledTime !== '';
    return true;
  };

  const PROMO_CODES: Record<string, { discount: number; label: string }> = {
    'FIRST100': { discount: 100, label: '₹100 first booking discount' },
    'FESTIVE15': { discount: Math.round(subtotal * 0.15), label: '15% festival discount' },
    'REFER200': { discount: 200, label: '₹200 referral discount' },
    'WEEKEND50': { discount: 50, label: '₹50 weekend deal' },
    'NAMMASERVE15': { discount: 15, label: '₹15 NammaServe welcome discount' },
    'LOCALFIX15': { discount: 15, label: '₹15 welcome discount' },
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoApplied(true);
      showToast('Promo code applied!', PROMO_CODES[code].label, 'success');
    } else {
      showToast('Invalid promo code', 'Try FIRST100, FESTIVE15, or WEEKEND50', 'warning');
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedService) {
      showToast('Select a service first', '', 'error');
      return;
    }

    if (!loggedInUser) {
      // The backend rejects anonymous bookings, so stop here rather than
      // showing a confirmation for a row that will never exist.
      showToast('Sign in to book', 'Your booking needs an account so you can track it.', 'error');
      return;
    }

    setIsSubmitting(true);

    void (async () => {
      const { booking: newBooking, persisted, error } = await createBooking({
        providerId: provider.id,
        providerName: provider.name,
        providerAvatar: provider.avatar,
        providerCategory: provider.category,
        providerPhone: provider.phone,
        customerId: String(loggedInUser?.id ?? ''),
        customerName: loggedInUser?.name ?? '',
        customerPhone: loggedInUser?.phone ?? '',
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        servicePrice: rawServicePrice,
        visitCharge,
        serviceFee: 0,
        partsCharge,
        gst,
        discount: promoDiscount,
        totalPrice,
        scheduledDate,
        scheduledTime,
        serviceLocation,
        serviceArea: serviceLocation.split(',')[1]?.trim() || provider.location.split(',')[0],
        problemDescription: problemDescription || 'No specific description provided.',
        isEmergency,
        notes: accessNotes,
        paymentMethod: paymentMethod as any,
        paymentStatus: 'PENDING',
        warrantyDays,
      });

      setIsSubmitting(false);
      setCreatedBookingResult(newBooking);

      if (persisted) {
        showToast('Booking confirmed', `Reference #${newBooking.bookingNumber}`, 'success');
      } else {
        // Saying "confirmed" when the server rejected it is how bookings went
        // missing without anyone noticing.
        showToast(
          'Saved on this device only',
          error ?? 'We could not reach the booking service. It has not been sent to the professional yet.',
          'warning'
        );
      }
    })();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ns-navy/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-kolam-surface rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated border border-kolam-sunk relative my-auto">
        
        {/* Top Header / Progress indicator */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-kolam-sunk">
          <div className="flex items-center gap-3">
            <Avatar name={provider.name} src={provider.avatar} size="sm" rounded="full" />
            <div>
              <h3 className="font-display font-semibold text-ns-navy text-base">Book {provider.name}</h3>
              <p className="text-xs text-ns-text-secondary font-medium">{provider.category} • Step {step} of 5</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-ns-text-secondary hover:text-ns-text-secondary rounded-full hover:bg-kolam-sunk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP PROGRESS BAR */}
        {!createdBookingResult && (
          <div className="flex items-center justify-between mb-8 gap-2">
            {[1, 2, 3, 4, 5].map((sIdx) => (
              <div key={sIdx} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className={`w-full h-1.5 rounded-full transition-all ${
                    sIdx <= step ? 'bg-brand-600' : 'bg-kolam-sunk'
                  }`}
                />
                <span className={`text-[10px] font-semibold ${sIdx === step ? 'text-brand-600' : 'text-ns-text-secondary'}`}>
                  {sIdx === 1 && 'Service'}
                  {sIdx === 2 && 'Details'}
                  {sIdx === 3 && 'Location'}
                  {sIdx === 4 && 'Schedule'}
                  {sIdx === 5 && 'Confirm'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* SUCCESS CONFIRMATION RECEIPT */}
        {createdBookingResult ? (
          <div className="text-center py-6 space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-kolam-teal-soft text-kolam-teal rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-kolam-teal bg-kolam-teal-soft px-3 py-1 rounded-full border border-kolam-teal-soft">
                Booking Successfully Confirmed
              </span>
              <h2 className="font-display text-2xl font-semibold text-ns-navy">Reference #{createdBookingResult.bookingNumber}</h2>
              <p className="text-xs text-ns-text-secondary">
                We sent a confirmation email & SMS receipt to your registered phone number.
              </p>
            </div>

            <div className="bg-kolam-wash rounded-2xl p-5 border border-ns-border text-xs space-y-2 max-w-md mx-auto text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="text-ns-text-secondary">Service:</span>
                <span className="font-semibold text-ns-navy">{createdBookingResult.serviceName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-ns-text-secondary">Provider:</span>
                <span className="font-semibold text-ns-navy">{createdBookingResult.providerName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-ns-text-secondary">Date & Time:</span>
                <span className="font-semibold text-ns-navy">{createdBookingResult.scheduledDate} at {createdBookingResult.scheduledTime}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-ns-text-secondary">Location:</span>
                <span className="font-semibold text-ns-navy">{createdBookingResult.serviceLocation}</span>
              </div>
              <div className="flex justify-between pt-1 font-semibold text-ns-navy text-sm">
                <span>Total Amount:</span>
                <span className="text-brand-600">₹{createdBookingResult.totalPrice}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  onClose();
                  setPage('customer-dashboard');
                }}
                className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-2xl transition-all shadow-sm"
              >
                Track in Dashboard
              </button>
              <button
                onClick={() => {
                  onClose();
                  setActiveBookingForChat(createdBookingResult);
                }}
                className="w-full sm:w-auto px-6 py-3 border border-ns-border text-ns-navy font-semibold text-xs rounded-2xl hover:bg-kolam-wash transition-colors"
              >
                Message Provider
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* STEP 1 — SELECT SERVICE */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="font-display font-semibold text-ns-navy text-base">Step 1 — Select Service</h4>
                <p className="text-xs text-ns-text-secondary">Choose the specific service you require from {provider.name}'s offered options:</p>

                {provider.offeredServices.length === 0 ? (
                  /* A provider with no services listed used to render an empty
                     panel with a dead "Next Step" button and no explanation. */
                  <KolamEmptyState
                    title="This professional hasn't listed their services yet"
                    description={`${provider.name} is available, but has not published a price list yet. Their profile has contact details and past work so you can reach them directly.`}
                    action={
                      <button
                        type="button"
                        onClick={() => { onClose(); setActiveProviderProfile(provider); }}
                        className="bg-ns-primary hover:bg-ns-primary-bright text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
                      >
                        View {provider.name.split(' ')[0]}'s profile
                      </button>
                    }
                  />
                ) : (
                <div className="space-y-3">
                  {provider.offeredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        selectedService?.id === service.id
                          ? 'border-brand-500 bg-brand-50/50 shadow-sm'
                          : 'border-ns-border hover:border-ns-border bg-white'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h5 className="font-semibold text-sm text-ns-navy">{service.name}</h5>
                        <p className="text-xs text-ns-text-secondary leading-relaxed">{service.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-base font-semibold text-ns-navy">₹{service.price}</p>
                        <span className="text-[10px] text-ns-text-secondary font-medium">{service.durationMinutes} mins</span>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
            )}

            {/* STEP 2 — DETAILS */}
            {step === 2 && (
              <div className="space-y-4">
                <h4 className="font-display font-semibold text-ns-navy text-base">Step 2 — Describe Your Problem</h4>
                <p className="text-xs text-ns-text-secondary">Provide notes or specifics so the provider can bring the right tools:</p>

                <textarea
                  rows={4}
                  placeholder="Describe what needs repair or cleaning (e.g. Kitchen sink pipe leaking under cabinet)..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full bg-kolam-wash border border-ns-border rounded-2xl p-4 text-xs text-ns-navy focus:outline-none focus:border-brand-500"
                />

                <div className="p-4 rounded-2xl bg-kolam-marigold-soft border border-kolam-marigold-line/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-kolam-marigold shrink-0" />
                    <div>
                      <h5 className="font-semibold text-xs text-kolam-marigold">Mark as Emergency Service</h5>
                      <p className="text-[10px] text-kolam-marigold">Notifies provider for immediate priority dispatch</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={(e) => setIsEmergency(e.target.checked)}
                    className="w-5 h-5 accent-brand-600 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* STEP 3 — LOCATION */}
            {step === 3 && (
              <div className="space-y-4">
                <h4 className="font-display font-semibold text-ns-navy text-base">Step 3 — Service Location</h4>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-ns-text">Street Address & Apartment / Suite</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-ns-text-secondary absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={serviceLocation}
                      onChange={(e) => setServiceLocation(e.target.value)}
                      className="w-full bg-kolam-wash border border-ns-border rounded-2xl py-3 pl-9 pr-4 text-xs font-semibold text-ns-navy focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-ns-text">Gate Code & Access Instructions</label>
                  <input
                    type="text"
                    value={accessNotes}
                    onChange={(e) => setAccessNotes(e.target.value)}
                    placeholder="Gate code, parking instructions..."
                    className="w-full bg-kolam-wash border border-ns-border rounded-2xl p-3 text-xs text-ns-navy focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            )}

            {/* STEP 4 — DATE & TIME */}
            {step === 4 && (
              <div className="space-y-4">
                <h4 className="font-display font-semibold text-ns-navy text-base">Step 4 — Select Date & Available Time Slot</h4>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-ns-text">Preferred Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    min={todayStr}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-kolam-wash border border-ns-border rounded-2xl p-3 text-xs font-semibold text-ns-navy focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-ns-text">Select Available Slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((timeStr) => (
                      <button
                        key={timeStr}
                        onClick={() => setScheduledTime(timeStr)}
                        className={`py-3 px-2 rounded-2xl border text-xs font-semibold transition-all ${
                          scheduledTime === timeStr
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-kolam-wash border-ns-border text-ns-text hover:bg-kolam-sunk'
                        }`}
                      >
                        {timeStr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5 — CONFIRMATION & SUMMARY */}
            {step === 5 && (
              <div className="space-y-6">
                <h4 className="font-display font-semibold text-ns-navy text-base">Step 5 — Summary & Final Confirmation</h4>

                <div className="bg-kolam-wash rounded-2xl p-5 border border-ns-border space-y-3 text-xs">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-ns-text-secondary">Service:</span>
                    <span className="font-semibold text-ns-navy">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-ns-text-secondary">Provider:</span>
                    <span className="font-semibold text-ns-navy">{provider.name} ({provider.category})</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-ns-text-secondary">Date & Time:</span>
                    <span className="font-semibold text-ns-navy">{scheduledDate} at {scheduledTime}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-ns-text-secondary">Location:</span>
                    <span className="font-semibold text-ns-navy">{serviceLocation}</span>
                  </div>

                  {/* Promo code */}
                  <div className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. FIRST100)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-kolam-surface border border-ns-border rounded-xl px-3 py-1.5 text-xs flex-1 uppercase"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 bg-ns-navy text-white rounded-xl font-semibold text-xs"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Price breakdown */}
                  <div className="pt-3 border-t border-ns-border space-y-1.5">
                    <div className="flex justify-between text-ns-text-secondary">
                      <span>Service Charge:</span>
                      <span>₹{rawServicePrice}</span>
                    </div>
                    {visitCharge > 0 && (
                      <div className="flex justify-between text-ns-text-secondary">
                        <span>Visit / Inspection Charge:</span>
                        <span>₹{visitCharge}</span>
                      </div>
                    )}
                    {promoApplied && (
                      <div className="flex justify-between text-kolam-teal font-semibold">
                        <span>Promo Discount:</span>
                        <span>−₹{promoDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-ns-text-secondary">
                      <span>GST (18%):</span>
                      <span>₹{gst}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-ns-navy pt-2 border-t border-ns-border">
                      <span>Estimated Total:</span>
                      <span className="text-brand-600 text-base">₹{totalPrice}</span>
                    </div>
                    {warrantyDays > 0 && (
                      <div className="flex items-center gap-1.5 text-kolam-teal text-[10px] font-semibold pt-1 border-t border-kolam-sunk">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{warrantyDays}-day service warranty included</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Option */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-ns-text">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'upi', label: 'UPI / QR Code', icon: '📱' },
                      { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                      { id: 'cash', label: 'Cash on Service', icon: '💵' },
                      { id: 'pay_later', label: 'Pay After Service', icon: '✅' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setPaymentMethod(opt.id as any)}
                        className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                          paymentMethod === opt.id
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-ns-border text-ns-text hover:border-ns-border'
                        }`}
                      >
                        <span>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODAL NAVIGATION BUTTONS */}
            <div className="pt-8 border-t border-kolam-sunk flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 rounded-xl border border-ns-border text-ns-text font-semibold text-xs hover:bg-kolam-wash transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!isStepValid()}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-ns-border disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1 ml-auto"
                >
                  Next Step <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 ml-auto disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Confirm Booking
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
