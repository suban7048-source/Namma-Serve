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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ns-navy/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-kolam-surface rounded-2xl shadow-elevated w-full max-w-xl max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-kolam-sunk">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-ns-navy">Digital Invoice</h2>
              <p className="text-xs text-ns-text-secondary font-mono">#{booking.bookingNumber}</p>
            </div>
          </div>
          <button onClick={() => setBooking(null)} className="p-2 rounded-full hover:bg-kolam-sunk transition-colors">
            <X className="w-5 h-5 text-ns-text-secondary" />
          </button>
        </div>

        {/* Invoice Body */}
        <div className="p-6 space-y-6 print:p-8">

          {/* NammaServe Brand Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-600" />
                <span className="text-xl font-semibold text-ns-navy">NammaServe</span>
              </div>
              <p className="text-xs text-ns-text-secondary mt-0.5">Trusted Local Services, Right at Your Doorstep.</p>
              <p className="text-[10px] text-ns-text-secondary">Chennai, Tamil Nadu, India | support@nammaserve.in</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-ns-navy">Invoice Date</p>
              <p className="text-xs text-ns-text-secondary">{invoiceDate}</p>
              <div className="mt-2 px-3 py-1 bg-kolam-teal-soft text-kolam-teal border border-kolam-teal-line rounded-full text-[10px] font-semibold uppercase">
                {booking.paymentStatus === 'SUCCESS' ? '✓ PAID' : 'PENDING'}
              </div>
            </div>
          </div>

          <hr className="border-kolam-sunk" />

          {/* Parties */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <p className="font-semibold text-ns-text-secondary uppercase tracking-wide text-[10px]">Bill To</p>
              <p className="font-semibold text-ns-navy">{booking.customerName}</p>
              <p className="text-ns-text-secondary">{booking.customerPhone}</p>
              <p className="text-ns-text-secondary leading-relaxed">{booking.serviceLocation}</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-ns-text-secondary uppercase tracking-wide text-[10px]">Service By</p>
              <p className="font-semibold text-ns-navy">{booking.providerName}</p>
              <p className="text-ns-text-secondary">{booking.providerPhone}</p>
              <div className="flex items-center gap-1 text-kolam-teal font-semibold">
                <ShieldCheck className="w-3 h-3" />
                <span>NammaServe Verified</span>
              </div>
            </div>
          </div>

          <hr className="border-kolam-sunk" />

          {/* Service Details */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-ns-text-secondary uppercase tracking-wide">Service Details</p>
            <div className="bg-kolam-wash border border-ns-border/80 rounded-2xl overflow-hidden">
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ns-navy">{booking.serviceName}</span>
                  <span className="font-semibold text-ns-navy">₹{booking.servicePrice}</span>
                </div>
                <p className="text-[10px] text-ns-text-secondary">
                  Scheduled: {booking.scheduledDate} at {booking.scheduledTime} •
                  Category: {booking.providerCategory}
                </p>
              </div>

              {/* Price Rows */}
              <div className="border-t border-ns-border/80 px-4 py-3 space-y-2 text-xs">
                <div className="flex justify-between text-ns-text-secondary">
                  <span>Service Charge</span>
                  <span>₹{booking.servicePrice}</span>
                </div>
                {booking.visitCharge > 0 && (
                  <div className="flex justify-between text-ns-text-secondary">
                    <span>Visit / Inspection Charge</span>
                    <span>₹{booking.visitCharge}</span>
                  </div>
                )}
                {booking.partsCharge > 0 && (
                  <div className="flex justify-between text-ns-text-secondary">
                    <span>Spare Parts</span>
                    <span>₹{booking.partsCharge}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-kolam-teal font-semibold">
                    <span>Discount</span>
                    <span>−₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-ns-text-secondary">
                  <span>GST ({gstRate}%)</span>
                  <span>₹{gstAmount}</span>
                </div>

                <hr className="border-ns-border" />

                <div className="flex justify-between text-base font-semibold text-ns-navy">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Warranty */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-kolam-wash rounded-xl p-3 border border-ns-border/80 space-y-1">
              <p className="text-[10px] font-semibold text-ns-text-secondary uppercase">Payment Method</p>
              <p className="font-semibold text-ns-navy capitalize">{booking.paymentMethod || 'Pending'}</p>
              <p className={`font-semibold ${booking.paymentStatus === 'SUCCESS' ? 'text-kolam-teal' : 'text-kolam-marigold'}`}>
                {booking.paymentStatus || 'PENDING'}
              </p>
            </div>
            <div className="bg-kolam-wash rounded-xl p-3 border border-ns-border/80 space-y-1">
              <p className="text-[10px] font-semibold text-ns-text-secondary uppercase">Service Warranty</p>
              {booking.warrantyDays && booking.warrantyDays > 0 ? (
                <>
                  <div className="flex items-center gap-1 text-kolam-teal">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="font-semibold">{booking.warrantyDays} Days Warranty</span>
                  </div>
                  {booking.warrantyExpiresAt && (
                    <p className="text-[10px] text-ns-text-secondary">Expires: {new Date(booking.warrantyExpiresAt).toLocaleDateString('en-IN')}</p>
                  )}
                </>
              ) : (
                <p className="text-ns-text-secondary">No warranty on this service</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 text-xs text-brand-700 text-center">
            <p className="font-semibold">Thank you for choosing NammaServe!</p>
            <p className="text-brand-600/70 mt-1">For support, contact us at support@nammaserve.in or call 044-NAMMASERVE</p>
          </div>

        </div>

        {/* Action buttons */}
        <div className="px-6 pb-6 flex items-center gap-3">
          <button
            onClick={() => setBooking(null)}
            className="flex-1 py-3 border border-ns-border rounded-2xl font-semibold text-sm text-ns-text hover:bg-kolam-wash transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

      </div>
    </div>
  );
};
