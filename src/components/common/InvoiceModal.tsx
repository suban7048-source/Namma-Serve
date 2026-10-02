import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { X, Download, FileText, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';

// Global invoice modal trigger
let openInvoiceFn: ((booking: Booking) => void) | null = null;

export const openInvoiceModal = (booking: Booking) => {
  openInvoiceFn?.(booking);
};

export const InvoiceModal: React.FC = () => {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    openInvoiceFn = (b: Booking) => setBooking(b);
    return () => { openInvoiceFn = null; };
  }, []);

  if (!booking) return null;

  const invoiceDate = new Date(booking.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const gstRate = 18;
  const subtotal = booking.servicePrice + booking.visitCharge + booking.partsCharge;
  const gstAmount = booking.gst || Math.round(subtotal * gstRate / 100);
  const discount = booking.discount || 0;
  const total = subtotal + gstAmount - discount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-elevated w-full max-w-xl max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Digital Invoice</h2>
              <p className="text-xs text-slate-400 font-mono">#{booking.bookingNumber}</p>
            </div>
          </div>
          <button onClick={() => setBooking(null)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Invoice Body */}
        <div className="p-6 space-y-6 print:p-8">

          {/* NammaServe Brand Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-600" />
                <span className="text-xl font-extrabold text-slate-900">NammaServe</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Trusted Local Services, Right at Your Doorstep.</p>
              <p className="text-[10px] text-slate-400">Chennai, Tamil Nadu, India | support@nammaserve.in</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900">Invoice Date</p>
              <p className="text-xs text-slate-500">{invoiceDate}</p>
              <div className="mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-extrabold uppercase">
                {booking.paymentStatus === 'SUCCESS' ? '✓ PAID' : 'PENDING'}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Parties */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <p className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Bill To</p>
              <p className="font-extrabold text-slate-900">{booking.customerName}</p>
              <p className="text-slate-500">{booking.customerPhone}</p>
              <p className="text-slate-500 leading-relaxed">{booking.serviceLocation}</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Service By</p>
              <p className="font-extrabold text-slate-900">{booking.providerName}</p>
              <p className="text-slate-500">{booking.providerPhone}</p>
              <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                <ShieldCheck className="w-3 h-3" />
                <span>NammaServe Verified</span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Service Details */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Service Details</p>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden">
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-800">{booking.serviceName}</span>
                  <span className="font-extrabold text-slate-900">₹{booking.servicePrice}</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Scheduled: {booking.scheduledDate} at {booking.scheduledTime} •
                  Category: {booking.providerCategory}
                </p>
              </div>

              {/* Price Rows */}
              <div className="border-t border-slate-200/80 px-4 py-3 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Service Charge</span>
                  <span>₹{booking.servicePrice}</span>
                </div>
                {booking.visitCharge > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Visit / Inspection Charge</span>
                    <span>₹{booking.visitCharge}</span>
                  </div>
                )}
                {booking.partsCharge > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Spare Parts</span>
                    <span>₹{booking.partsCharge}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>−₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>GST ({gstRate}%)</span>
                  <span>₹{gstAmount}</span>
                </div>

                <hr className="border-slate-200" />

                <div className="flex justify-between text-base font-extrabold text-slate-900">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Warranty */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Payment Method</p>
              <p className="font-bold text-slate-900 capitalize">{booking.paymentMethod || 'Pending'}</p>
              <p className={`font-semibold ${booking.paymentStatus === 'SUCCESS' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {booking.paymentStatus || 'PENDING'}
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Service Warranty</p>
              {booking.warrantyDays && booking.warrantyDays > 0 ? (
                <>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="font-bold">{booking.warrantyDays} Days Warranty</span>
                  </div>
                  {booking.warrantyExpiresAt && (
                    <p className="text-[10px] text-slate-400">Expires: {new Date(booking.warrantyExpiresAt).toLocaleDateString('en-IN')}</p>
                  )}
                </>
              ) : (
                <p className="text-slate-500">No warranty on this service</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 text-xs text-brand-700 text-center">
            <p className="font-bold">Thank you for choosing NammaServe!</p>
            <p className="text-brand-600/70 mt-1">For support, contact us at support@nammaserve.in or call 044-NAMMASERVE</p>
          </div>

        </div>

        {/* Action buttons */}
        <div className="px-6 pb-6 flex items-center gap-3">
          <button
            onClick={() => setBooking(null)}
            className="flex-1 py-3 border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

      </div>
    </div>
  );
};
