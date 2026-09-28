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
    if (promoCode.trim().toUpperCase() === 'CHENNAI100' || promoCode.trim().toUpperCase() === 'LOCALFIX15') {
      setPromoDiscount(100);
      showToast('Promo Code Applied!', '₹100 instant discount deducted from total', 'success');
    } else {
      showToast('Invalid Code', 'Try promo code CHENNAI100', 'warning');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (!address.trim()) {
      showToast('Please enter service address', '', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Create bookings for all cart items
      cart.forEach((item) => {
        createBooking({
          providerId: item.providerId,
          providerName: item.providerName,
          providerAvatar: '',
          providerCategory: item.providerCategory,
          providerPhone: '+91 98400 12345',
          customerId: 'usr_cust_1',
          customerName: loggedInUser?.name || 'Aakash Malhotra',
          customerPhone: '+91 98401 99887',
          serviceId: item.serviceId,
          serviceName: item.serviceName,
          servicePrice: item.price * item.quantity,
          serviceFee: Math.round(platformFee / cart.length),
          totalPrice: item.price * item.quantity + Math.round(platformFee / cart.length),
          scheduledDate: date,
          scheduledTime: slot,
          serviceLocation: address,
          problemDescription: `Booked via Cart. Quantity: ${item.quantity}`,
          isEmergency: false,
          notes: `Payment method: ${paymentMode === 'pay_after' ? 'Pay after service (Cash/UPI)' : 'Online Payment'}`
        });
      });

      setIsSubmitting(false);
      clearCart();
      setIsCartOpen(false);
      setPage('customer-dashboard');
      showToast('Bookings Confirmed!', `${cart.length} services booked successfully. Check your dashboard.`, 'success');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-left relative"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-slate-200 bg-white sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Service Cart</h3>
              <p className="text-xs text-slate-500 font-semibold">{cartCount} {cartCount === 1 ? 'item' : 'items'} selected</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 p-5 space-y-6 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-slate-800 text-base">Your cart is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore services and add packages to your cart to book verified professionals in Chennai.
              </p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selected Services</h4>
                {cart.map((item) => (
                  <div
                    key={item.serviceId}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <h5 className="font-extrabold text-sm text-slate-900 truncate">{item.serviceName}</h5>
                      <p className="text-xs font-semibold text-slate-500 truncate">
                        By {item.providerName} • ~{item.durationMinutes} mins
                      </p>
                      <p className="text-xs font-black text-brand-700">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        {item.quantity > 1 && (
                          <span className="text-[10px] font-normal text-slate-400 ml-1">
                            (₹{item.price} each)
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Urban Company Counter Pill */}
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-2 py-1 shrink-0 shadow-2xs">
                      <button
                        onClick={() => updateCartQuantity(item.serviceId, -1)}
                        className="p-1 text-slate-600 hover:text-brand-600 font-bold transition-colors"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-extrabold text-slate-900 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.serviceId, 1)}
                        className="p-1 text-slate-600 hover:text-brand-600 font-bold transition-colors"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Date & Time Slot Picker */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Calendar className="w-4 h-4 text-brand-600" />
                  <span>Choose Service Date & Time</span>
                </div>
                
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-600"
                />

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {timeSlots.map((ts) => (
                    <button
                      key={ts}
                      type="button"
                      onClick={() => setSlot(ts)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                        slot === ts
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {ts}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Address in Chennai */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span>Service Address in Chennai</span>
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter house/flat number, street, locality..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-600"
                />
              </div>

              {/* Promo Coupon Box */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. CHENNAI100)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 uppercase rounded-xl py-2 pl-9 pr-2 text-xs font-bold text-slate-800 placeholder:normal-case focus:outline-none focus:border-brand-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>

              {/* Bill Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                <h5 className="font-extrabold text-slate-900 uppercase tracking-wide text-[10px]">
                  Bill Breakdown
                </h5>
                <div className="flex justify-between text-slate-600 font-semibold">
                  <span>Item Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-semibold">
                  <span>Safety & Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount (CHENNAI100)</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-slate-900 text-sm">
                  <span>Total Payable</span>
                  <span className="text-brand-700">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Mode Choice */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-800">Payment Option</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('pay_after')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      paymentMode === 'pay_after'
                        ? 'border-brand-600 bg-brand-50/60 text-brand-800'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <p className="font-black">Pay After Service</p>
                    <span className="text-[10px] text-slate-500 font-normal">Cash / UPI to pro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('online')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      paymentMode === 'online'
                        ? 'border-brand-600 bg-brand-50/60 text-brand-800'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <p className="font-black">Online Payment</p>
                    <span className="text-[10px] text-slate-500 font-normal">UPI / Cards / GPay</span>
                  </button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-semibold text-[11px] leading-tight">
                  LocalFix Guarantee: Verified Chennai technicians & free 30-day service revisit warranty.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-white sticky bottom-0 z-10 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">To Pay</p>
                <p className="text-xl font-black text-slate-900">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="bg-brand-600 hover:bg-brand-500 active:scale-[0.98] text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
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
