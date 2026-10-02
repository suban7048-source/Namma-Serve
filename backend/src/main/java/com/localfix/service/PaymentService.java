package com.localfix.service;

import com.localfix.dto.PaymentRequest;
import com.localfix.entity.Booking;
import com.localfix.entity.BookingStatus;
import com.localfix.entity.Invoice;
import com.localfix.entity.Payment;
import com.localfix.exception.ResourceNotFoundException;
import com.localfix.repository.BookingRepository;
import com.localfix.repository.InvoiceRepository;
import com.localfix.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final InvoiceRepository invoiceRepository;

    public PaymentService(PaymentRepository paymentRepository,
                          BookingRepository bookingRepository,
                          InvoiceRepository invoiceRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
        this.invoiceRepository = invoiceRepository;
    }

    @Transactional
    public Payment processPayment(PaymentRequest req) {
        Booking booking = bookingRepository.findById(req.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + req.getBookingId()));

        String txnId = "TXN-CHN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        Payment payment = new Payment(booking, req.getAmount(), req.getPaymentMethod(), txnId, "SUCCESS");
        Payment saved = paymentRepository.save(payment);

        // Update booking payment status
        booking.setPaymentStatus("SUCCESS");
        booking.setPaymentMethod(req.getPaymentMethod());
        if (booking.getStatus() == BookingStatus.SERVICE_COMPLETED || booking.getStatus() == BookingStatus.PAYMENT_PENDING) {
            booking.setStatus(BookingStatus.COMPLETED);
        }
        bookingRepository.save(booking);

        // Generate digital invoice automatically
        generateInvoice(booking, req.getPaymentMethod());

        return saved;
    }

    @Transactional
    public Invoice generateInvoice(Booking booking, String paymentMethod) {
        Invoice invoice = new Invoice();
        invoice.setInvoiceNumber("INV-LF-" + (10000 + (int)(Math.random() * 90000)));
        invoice.setBooking(booking);
        invoice.setCustomerName(booking.getCustomer().getName());
        invoice.setTechnicianName(booking.getTechnician() != null ? booking.getTechnician().getUser().getName() : "LocalFix Professional");
        invoice.setServiceName(booking.getServiceName());
        invoice.setSubtotal(booking.getServicePrice());
        invoice.setPartsCharge(booking.getPartsCharge());
        invoice.setVisitCharge(booking.getVisitCharge());
        invoice.setGst(booking.getGst());
        invoice.setDiscount(booking.getDiscount());
        invoice.setTotal(booking.getTotalPrice());
        invoice.setPaymentMethod(paymentMethod);
        invoice.setPaymentStatus("SUCCESS");
        invoice.setWarrantyDays(booking.getWarrantyDays());
        invoice.setWarrantyValidUntil(LocalDate.now().plusDays(booking.getWarrantyDays()).format(DateTimeFormatter.ISO_DATE));

        return invoiceRepository.save(invoice);
    }

    public Invoice getInvoiceByBookingId(Long bookingId) {
        return invoiceRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found for booking: " + bookingId));
    }
}
