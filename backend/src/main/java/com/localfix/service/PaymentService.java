package com.localfix.service;

import com.localfix.dto.PaymentRequest;
import com.localfix.entity.Booking;
import com.localfix.entity.BookingStatus;
import com.localfix.entity.Invoice;
import com.localfix.entity.Payment;
import com.localfix.exception.BadRequestException;
import com.localfix.exception.ResourceNotFoundException;
import com.localfix.repository.BookingRepository;
import com.localfix.repository.InvoiceRepository;
import com.localfix.repository.PaymentRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Set;
import java.util.UUID;

@Service
public class PaymentService {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final Set<String> SUPPORTED_METHODS = Set.of("upi", "card", "cash", "wallet", "netbanking");

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
    public Payment processPayment(PaymentRequest req, Long userId, boolean isAdmin) {
        Booking booking = bookingRepository.findById(req.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Booking not found with id: " + req.getBookingId()));

        // Only the customer who placed the booking can settle it.
        boolean isCustomer = booking.getCustomer() != null
                && userId != null
                && userId.equals(booking.getCustomer().getId());
        if (!isAdmin && !isCustomer) {
            throw new AccessDeniedException("Only the customer who booked this can pay for it.");
        }

        // Paying twice used to create a second Payment row and a second invoice
        // for the same job. The booking's existing payment is the idempotency key.
        paymentRepository.findByBookingId(booking.getId()).ifPresent(existing -> {
            if ("SUCCESS".equals(existing.getStatus())) {
                throw new BadRequestException("This booking has already been paid.");
            }
        });

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("This booking was cancelled and cannot be paid.");
        }
        // Payment settles completed work. Allowing it earlier let a job be marked
        // COMPLETED before the technician had verified it with the customer.
        if (booking.getStatus() != BookingStatus.SERVICE_COMPLETED
                && booking.getStatus() != BookingStatus.PAYMENT_PENDING) {
            throw new BadRequestException("This job is not ready for payment yet.");
        }

        String method = req.getPaymentMethod() == null ? "" : req.getPaymentMethod().trim().toLowerCase();
        if (!SUPPORTED_METHODS.contains(method)) {
            throw new BadRequestException("Unsupported payment method: " + req.getPaymentMethod());
        }

        // The amount is checked against the booking total rather than trusted.
        // Previously any amount was accepted, so a ₹5,000 job could be settled
        // with a ₹1 request and still be marked SUCCESS / COMPLETED.
        int expected = booking.getTotalPrice() == null ? 0 : booking.getTotalPrice();
        int supplied = req.getAmount() == null ? -1 : req.getAmount();
        if (supplied != expected) {
            throw new BadRequestException(
                    "Payment amount ₹" + supplied + " does not match the amount due of ₹" + expected + ".");
        }

        String txnId = "TXN-CHN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        Payment payment = new Payment(booking, expected, method, txnId, "SUCCESS");
        Payment saved = paymentRepository.save(payment);

        booking.setPaymentStatus("SUCCESS");
        booking.setPaymentMethod(method);
        booking.setStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);

        generateInvoice(booking, method);

        return saved;
    }

    /**
     * One invoice per booking. Re-running payment used to mint a second invoice
     * number for the same job, so the lookup now returns the existing one.
     */
    @Transactional
    public Invoice generateInvoice(Booking booking, String paymentMethod) {
        return invoiceRepository.findByBookingId(booking.getId()).orElseGet(() -> {
            Invoice invoice = new Invoice();
            invoice.setInvoiceNumber(generateInvoiceNumber());
            invoice.setBooking(booking);
            invoice.setCustomerName(booking.getCustomer().getName());
            invoice.setTechnicianName(booking.getTechnician() != null
                    ? booking.getTechnician().getUser().getName()
                    : "NammaServe Professional");
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
            invoice.setWarrantyValidUntil(LocalDate.now()
                    .plusDays(booking.getWarrantyDays())
                    .format(DateTimeFormatter.ISO_DATE));
            return invoiceRepository.save(invoice);
        });
    }

    private String generateInvoiceNumber() {
        for (int attempt = 0; attempt < 5; attempt++) {
            String candidate = "INV-NS-" + (100000 + SECURE_RANDOM.nextInt(900000));
            if (invoiceRepository.findByInvoiceNumber(candidate).isEmpty()) {
                return candidate;
            }
        }
        throw new BadRequestException("Could not allocate an invoice number. Please try again.");
    }

    /** An invoice is readable by the booking's customer, its technician, or an admin. */
    public Invoice getInvoiceByBookingId(Long bookingId, Long userId, boolean isAdmin) {
        Invoice invoice = invoiceRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No invoice has been issued for booking " + bookingId + " yet."));

        if (!isAdmin) {
            Booking booking = invoice.getBooking();
            boolean isCustomer = booking.getCustomer() != null
                    && userId.equals(booking.getCustomer().getId());
            boolean isTechnician = booking.getTechnician() != null
                    && booking.getTechnician().getUser() != null
                    && userId.equals(booking.getTechnician().getUser().getId());
            if (!isCustomer && !isTechnician) {
                throw new AccessDeniedException("This invoice belongs to another booking.");
            }
        }
        return invoice;
    }
}
