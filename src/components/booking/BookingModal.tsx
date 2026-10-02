import React, { useState } from 'react';
import { Provider, ServiceItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { 
  Wrench, Calendar, Clock, MapPin, CheckCircle2, 
  ChevronRight, ArrowLeft, ShieldCheck, CreditCard, X, AlertTriangle 
} from 'lucide-react';

interface BookingModalProps {
  provider: Provider | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ provider, onClose }) => {
  const { createBooking, setPage, setActiveBookingForChat, loggedInUser } = useApp();
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

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = createBooking({
        providerId: provider.id,
        providerName: provider.name,
        providerAvatar: provider.avatar,
        providerCategory: provider.category,
        providerPhone: provider.phone,
        customerId: 'usr_cust_1',
        customerName: loggedInUser?.name || 'Aakash Malhotra',
        customerPhone: '+91 99999 11122',
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
      showToast('Booking Confirmed!', `Booking reference #${newBooking.bookingNumber}`, 'success');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated border border-slate-100 relative my-auto">
        
        {/* Top Header / Progress indicator */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <InitialsAvatar name={provider.name} size="sm" rounded="2xl" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Book {provider.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{provider.category} • Step {step} of 5</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
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
                    sIdx <= step ? 'bg-brand-600' : 'bg-slate-100'
                  }`}
                />
                <span className={`text-[10px] font-bold ${sIdx === step ? 'text-brand-600' : 'text-slate-400'}`}>
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
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Booking Successfully Confirmed
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">Reference #{createdBookingResult.bookingNumber}</h2>
              <p className="text-xs text-slate-500">
                We sent a confirmation email & SMS receipt to your registered phone number.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs space-y-2 max-w-md mx-auto text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{createdBookingResult.serviceName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Provider:</span>
                <span className="font-bold text-slate-900">{createdBookingResult.providerName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-bold text-slate-900">{createdBookingResult.scheduledDate} at {createdBookingResult.scheduledTime}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold text-slate-900">{createdBookingResult.serviceLocation}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-slate-900 text-sm">
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
                className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-2xl transition-all shadow-sm"
              >
                Track in Dashboard
              </button>
              <button
                onClick={() => {
                  onClose();
                  setActiveBookingForChat(createdBookingResult);
                }}
                className="w-full sm:w-auto px-6 py-3 border border-slate-200 text-slate-800 font-bold text-xs rounded-2xl hover:bg-slate-50 transition-colors"
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
                <h4 className="font-extrabold text-slate-900 text-base">Step 1 — Select Service</h4>
                <p className="text-xs text-slate-500">Choose the specific service you require from {provider.name}'s offered options:</p>

                <div className="space-y-3">
                  {provider.offeredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        selectedService?.id === service.id
                          ? 'border-brand-500 bg-brand-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h5 className="font-bold text-sm text-slate-900">{service.name}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed">{service.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-base font-extrabold text-slate-900">₹{service.price}</p>
                        <span className="text-[10px] text-slate-400 font-medium">{service.durationMinutes} mins</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 — DETAILS */}
            {step === 2 && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-900 text-base">Step 2 — Describe Your Problem</h4>
                <p className="text-xs text-slate-500">Provide notes or specifics so the provider can bring the right tools:</p>

                <textarea
                  rows={4}
                  placeholder="Describe what needs repair or cleaning (e.g. Kitchen sink pipe leaking under cabinet)..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                />

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs text-amber-900">Mark as Emergency Service</h5>
                      <p className="text-[10px] text-amber-700">Notifies provider for immediate priority dispatch</p>
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
                <h4 className="font-extrabold text-slate-900 text-base">Step 3 — Service Location</h4>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Street Address & Apartment / Suite</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={serviceLocation}
                      onChange={(e) => setServiceLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-9 pr-4 text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Gate Code & Access Instructions</label>
                  <input
                    type="text"
                    value={accessNotes}
                    onChange={(e) => setAccessNotes(e.target.value)}
                    placeholder="Gate code, parking instructions..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            )}

            {/* STEP 4 — DATE & TIME */}
            {step === 4 && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-900 text-base">Step 4 — Select Date & Available Time Slot</h4>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Preferred Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    min={todayStr}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Select Available Slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((timeStr) => (
                      <button
                        key={timeStr}
                        onClick={() => setScheduledTime(timeStr)}
                        className={`py-3 px-2 rounded-2xl border text-xs font-bold transition-all ${
                          scheduledTime === timeStr
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
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
                <h4 className="font-extrabold text-slate-900 text-base">Step 5 — Summary & Final Confirmation</h4>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-bold text-slate-900">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Provider:</span>
                    <span className="font-bold text-slate-900">{provider.name} ({provider.category})</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Date & Time:</span>
                    <span className="font-bold text-slate-900">{scheduledDate} at {scheduledTime}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Location:</span>
                    <span className="font-bold text-slate-900">{serviceLocation}</span>
                  </div>

                  {/* Promo code */}
                  <div className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. FIRST100)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs flex-1 uppercase"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-xl font-bold text-xs"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Price breakdown */}
                  <div className="pt-3 border-t border-slate-200 space-y-1.5">
                    <div className="flex justify-between text-slate-600">
                      <span>Service Charge:</span>
                      <span>₹{rawServicePrice}</span>
                    </div>
                    {visitCharge > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Visit / Inspection Charge:</span>
                        <span>₹{visitCharge}</span>
                      </div>
                    )}
                    {promoApplied && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Promo Discount:</span>
                        <span>−₹{promoDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>GST (18%):</span>
                      <span>₹{gst}</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                      <span>Estimated Total:</span>
                      <span className="text-brand-600 text-base">₹{totalPrice}</span>
                    </div>
                    {warrantyDays > 0 && (
                      <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold pt-1 border-t border-slate-100">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{warrantyDays}-day service warranty included</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Option */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Payment Method</label>
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
                        className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                          paymentMethod === opt.id
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
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
            <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1"
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
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1 ml-auto"
                >
                  Next Step <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 ml-auto disabled:opacity-50"
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
