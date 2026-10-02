import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { 
  ShoppingBag, X, Plus, Minus, Trash2, Calendar, 
  Clock, MapPin, ShieldCheck, Tag, CheckCircle2, ArrowRight 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, isCartOpen, setIsCartOpen, removeFromCart, 
    updateCartQuantity, clearCart, cartTotal, cartCount,
    createBooking, setPage, selectedArea, loggedInUser 
  } = useApp();
  const { showToast } = useToast();

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [slot, setSlot] = useState<string>('11:30 AM');
  const [address, setAddress] = useState<string>(`Plot 42, 2nd Main Road, ${selectedArea}`);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [paymentMode, setPaymentMode] = useState<'pay_after' | 'online'>('pay_after');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isCartOpen) return null;

  const timeSlots = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:30 PM'];
  const platformFee = 49;
  const grandTotal = Math.max(0, cartTotal + platformFee - promoDiscount);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'CHENNAI100' || code === 'NAMMASERVE15' || code === 'LOCALFIX15') {
      setPromoDiscount(100);
      showToast('Promo Code Applied!', '₹100 instant discount deducted from total', 'success');
    } else {
      showToast('Invalid Code', 'Try promo code CHENNAI100 or NAMMASERVE15', 'warning');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (!address.trim()) {
      showToast('Please enter service address', '', 'warning');
      return;
    }

    if (!loggedInUser) {
      showToast('Sign in to check out', 'Your bookings need an account so you can track them.', 'error');
      return;
    }

    setIsSubmitting(true);

    void (async () => {
      // Each cart line becomes its own booking. Awaiting them means we know how
      // many actually reached the database before telling the customer.
      const results = await Promise.all(cart.map((item) =>
        createBooking({
          providerId: item.providerId,
          providerName: item.providerName,
          providerAvatar: '',
          providerCategory: item.providerCategory,
          providerPhone: '+91 98400 12345',
          customerId: String(loggedInUser?.id ?? ''),
          customerName: loggedInUser?.name ?? '',
          customerPhone: loggedInUser?.phone ?? '',
          serviceId: item.serviceId,
          serviceName: item.serviceName,
          servicePrice: item.price * item.quantity,
          visitCharge: 0,
          partsCharge: 0,
          gst: Math.round((item.price * item.quantity) * 0.18),
          discount: promoDiscount > 0 ? Math.round(promoDiscount / cart.length) : 0,
          serviceArea: 'Chennai',
          serviceFee: Math.round(platformFee / cart.length),
          totalPrice: (item.price * item.quantity) + Math.round(platformFee / cart.length) + Math.round((item.price * item.quantity) * 0.18) - (promoDiscount > 0 ? Math.round(promoDiscount / cart.length) : 0),
          scheduledDate: date,
          scheduledTime: slot,
          serviceLocation: address,
          problemDescription: `Booked via Cart. Quantity: ${item.quantity}`,
          isEmergency: false,
          notes: `Payment method: ${paymentMode === 'pay_after' ? 'Pay after service (Cash/UPI)' : 'Online Payment'}`
        })
      ));

      const total = results.length;
      const saved = results.filter(r => r.persisted).length;

      setIsSubmitting(false);
      clearCart();
      setIsCartOpen(false);
      setPage('customer-dashboard');

      if (saved === total) {
        showToast('Bookings confirmed', `${total} ${total === 1 ? 'service' : 'services'} booked. Check your dashboard.`, 'success');
      } else if (saved === 0) {
        showToast(
          'Saved on this device only',
          results.find(r => r.error)?.error ?? 'We could not reach the booking service.',
          'warning'
        );
      } else {
        showToast('Partly confirmed', `${saved} of ${total} bookings reached the server. The rest are saved locally.`, 'warning');
      }
    })();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-ns-navy/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md h-full bg-kolam-surface shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-left relative"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-ns-border bg-white sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-semibold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-ns-navy text-base">Service Cart</h3>
              <p className="text-xs text-ns-text-secondary font-semibold">{cartCount} {cartCount === 1 ? 'item' : 'items'} selected</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-kolam-kumkum hover:text-kolam-kumkum font-semibold px-2 py-1 rounded-lg hover:bg-kolam-kumkum-soft transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-ns-text-secondary hover:text-ns-text-secondary rounded-full hover:bg-kolam-sunk transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 p-5 space-y-6 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-kolam-sunk flex items-center justify-center mx-auto text-ns-text-secondary">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-display font-semibold text-ns-navy text-base">Your cart is empty</h4>
              <p className="text-xs text-ns-text-secondary max-w-xs mx-auto">
                Explore services and add packages to your cart to book verified professionals in Chennai.
              </p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <h4 className="font-display text-xs font-semibold text-ns-text-secondary uppercase tracking-wider">Selected Services</h4>
                {cart.map((item) => (
                  <div
                    key={item.serviceId}
                    className="p-4 rounded-2xl bg-kolam-wash border border-ns-border/80 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <h5 className="font-semibold text-sm text-ns-navy truncate">{item.serviceName}</h5>
                      <p className="text-xs font-semibold text-ns-text-secondary truncate">
                        By {item.providerName} • ~{item.durationMinutes} mins
                      </p>
                      <p className="text-xs font-semibold text-brand-700">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        {item.quantity > 1 && (
                          <span className="text-[10px] font-normal text-ns-text-secondary ml-1">
                            (₹{item.price} each)
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Urban Company Counter Pill */}
                    <div className="flex items-center gap-2 bg-kolam-surface border border-ns-border rounded-xl px-2 py-1 shrink-0 shadow-2xs">
                      <button
                        onClick={() => updateCartQuantity(item.serviceId, -1)}
                        className="p-1 text-ns-text-secondary hover:text-brand-600 font-semibold transition-colors"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-semibold text-ns-navy w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.serviceId, 1)}
                        className="p-1 text-ns-text-secondary hover:text-brand-600 font-semibold transition-colors"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Date & Time Slot Picker */}
              <div className="p-4 rounded-2xl bg-kolam-surface border border-ns-border space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-ns-navy">
                  <Calendar className="w-4 h-4 text-brand-600" />
                  <span>Choose Service Date & Time</span>
                </div>
                
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-kolam-wash border border-ns-border rounded-xl p-2.5 text-xs font-semibold text-ns-navy focus:outline-none focus:border-brand-600"
                />

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {timeSlots.map((ts) => (
                    <button
                      key={ts}
                      type="button"
                      onClick={() => setSlot(ts)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all ${
                        slot === ts
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-kolam-wash border border-ns-border text-ns-text hover:bg-kolam-sunk'
                      }`}
                    >
                      {ts}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Address in Chennai */}
              <div className="p-4 rounded-2xl bg-kolam-surface border border-ns-border space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-ns-navy">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span>Service Address in Chennai</span>
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter house/flat number, street, locality..."
                  className="w-full bg-kolam-wash border border-ns-border rounded-xl p-2.5 text-xs font-semibold text-ns-navy focus:outline-none focus:border-brand-600"
                />
              </div>

              {/* Promo Coupon Box */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-ns-text-secondary absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. CHENNAI100)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-kolam-wash border border-ns-border uppercase rounded-xl py-2 pl-9 pr-2 text-xs font-semibold text-ns-navy placeholder:normal-case focus:outline-none focus:border-brand-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-ns-navy hover:bg-ns-navy text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>

              {/* Bill Breakdown */}
              <div className="p-4 rounded-2xl bg-kolam-wash border border-ns-border space-y-2.5 text-xs">
                <h5 className="font-semibold text-ns-navy uppercase tracking-wide text-[10px]">
                  Bill Breakdown
                </h5>
                <div className="flex justify-between text-ns-text-secondary font-semibold">
                  <span>Item Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-ns-text-secondary font-semibold">
                  <span>Safety & Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-kolam-teal font-semibold">
                    <span>Coupon Discount (CHENNAI100)</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-ns-border flex justify-between font-semibold text-ns-navy text-sm">
                  <span>Total Payable</span>
                  <span className="text-brand-700">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Mode Choice */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-ns-navy">Payment Option</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('pay_after')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      paymentMode === 'pay_after'
                        ? 'border-brand-600 bg-brand-50/60 text-brand-800'
                        : 'border-ns-border bg-white text-ns-text'
                    }`}
                  >
                    <p className="font-semibold">Pay After Service</p>
                    <span className="text-[10px] text-ns-text-secondary font-normal">Cash / UPI to pro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('online')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      paymentMode === 'online'
                        ? 'border-brand-600 bg-brand-50/60 text-brand-800'
                        : 'border-ns-border bg-white text-ns-text'
                    }`}
                  >
                    <p className="font-semibold">Online Payment</p>
                    <span className="text-[10px] text-ns-text-secondary font-normal">UPI / Cards / GPay</span>
                  </button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-3 bg-kolam-teal-soft rounded-xl border border-kolam-teal-soft flex items-center gap-2.5 text-xs text-kolam-teal">
                <ShieldCheck className="w-5 h-5 text-kolam-teal shrink-0" />
                <span className="font-semibold text-[11px] leading-tight">
                  NammaServe Guarantee: Verified Chennai technicians & free 30-day service revisit warranty.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-ns-border bg-white sticky bottom-0 z-10 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-ns-text-secondary uppercase">To Pay</p>
                <p className="text-xl font-semibold text-ns-navy">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="bg-brand-600 hover:bg-brand-500 active:scale-[0.98] text-white font-semibold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Booking...' : 'Book Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
