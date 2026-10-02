package com.localfix.service;

import com.localfix.dto.AdditionalChargeRequest;
import com.localfix.dto.CreateBookingRequest;
import com.localfix.dto.UpdateStatusRequest;
import com.localfix.entity.*;
import com.localfix.exception.BadRequestException;
import com.localfix.exception.ResourceNotFoundException;
import com.localfix.repository.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class BookingService {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final double GST_RATE = 0.18;

    /**
     * Legal forward moves for a booking. Anything not listed is rejected, which
     * stops a caller skipping straight from PENDING to COMPLETED (and so
     * bypassing OTP verification and payment).
     */
    private static final Map<BookingStatus, Set<BookingStatus>> ALLOWED_TRANSITIONS = Map.of(
            BookingStatus.PENDING, EnumSet.of(BookingStatus.TECHNICIAN_ASSIGNED, BookingStatus.CANCELLED),
            BookingStatus.TECHNICIAN_ASSIGNED, EnumSet.of(BookingStatus.TECHNICIAN_ACCEPTED, BookingStatus.CANCELLED),
            BookingStatus.TECHNICIAN_ACCEPTED, EnumSet.of(BookingStatus.ON_THE_WAY, BookingStatus.CANCELLED),
            BookingStatus.ON_THE_WAY, EnumSet.of(BookingStatus.ARRIVED, BookingStatus.CANCELLED),
            BookingStatus.ARRIVED, EnumSet.of(BookingStatus.SERVICE_STARTED, BookingStatus.CANCELLED),
            BookingStatus.SERVICE_STARTED, EnumSet.of(BookingStatus.SERVICE_COMPLETED, BookingStatus.CANCELLED),
            BookingStatus.SERVICE_COMPLETED, EnumSet.of(BookingStatus.PAYMENT_PENDING, BookingStatus.COMPLETED),
            BookingStatus.PAYMENT_PENDING, EnumSet.of(BookingStatus.COMPLETED),
            BookingStatus.COMPLETED, EnumSet.noneOf(BookingStatus.class),
            BookingStatus.CANCELLED, EnumSet.noneOf(BookingStatus.class)
    );

    private final BookingRepository bookingRepository;
    private final BookingStatusHistoryRepository historyRepository;
    private final AdditionalChargeRepository additionalChargeRepository;
    private final TechnicianProfileRepository technicianRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository,
                          BookingStatusHistoryRepository historyRepository,
                          AdditionalChargeRepository additionalChargeRepository,
                          TechnicianProfileRepository technicianRepository,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.historyRepository = historyRepository;
        this.additionalChargeRepository = additionalChargeRepository;
        this.technicianRepository = technicianRepository;
        this.userRepository = userRepository;
    }

    // ---------------------------------------------------------------- reads

    public List<Booking> getCustomerBookings(Long customerId) {
        return bookingRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    public List<Booking> getTechnicianBookings(Long technicianProfileId) {
        return bookingRepository.findByTechnicianIdOrderByCreatedAtDesc(technicianProfileId);
    }

    /**
     * Jobs assigned to the signed-in professional. Callers must not pass a
     * technician id from the URL: that id is a TechnicianProfile id, which is a
     * different number from the user id, so comparing the two to authorise the
     * request would have been both wrong and exploitable.
     */
    public List<Booking> getMyJobs(Long userId) {
        TechnicianProfile profile = technicianRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No professional profile is linked to this account."));
        return bookingRepository.findByTechnicianIdOrderByCreatedAtDesc(profile.getId());
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    /**
     * A booking is visible to the customer who placed it, the technician assigned
     * to it, and admins. Everyone else gets a 403 — previously any caller who
     * could guess a sequential id could read any booking in the system.
     */
    public Booking getBookingForUser(Long bookingId, Long userId, boolean isAdmin) {
        Booking booking = getBookingById(bookingId);
        assertParticipant(booking, userId, isAdmin);
        return booking;
    }

    private void assertParticipant(Booking booking, Long userId, boolean isAdmin) {
        if (isAdmin) return;
        if (userId == null) throw new AccessDeniedException("Not authenticated");

        boolean isCustomer = booking.getCustomer() != null
                && userId.equals(booking.getCustomer().getId());
        boolean isTechnician = booking.getTechnician() != null
                && booking.getTechnician().getUser() != null
                && userId.equals(booking.getTechnician().getUser().getId());

        if (!isCustomer && !isTechnician) {
            throw new AccessDeniedException("This booking belongs to another account.");
        }
    }

    private boolean isAssignedTechnician(Booking booking, Long userId) {
        return booking.getTechnician() != null
                && booking.getTechnician().getUser() != null
                && booking.getTechnician().getUser().getId().equals(userId);
    }

    private boolean isBookingCustomer(Booking booking, Long userId) {
        return booking.getCustomer() != null && booking.getCustomer().getId().equals(userId);
    }

    // --------------------------------------------------------------- create

    @Transactional
    public Booking createBooking(CreateBookingRequest req, Long customerId) {
        // The booking must be attached to a real, signed-in account. The previous
        // version fell back to inventing a User with a plain-text password, which
        // both bypassed bcrypt and let an anonymous caller mint accounts.
        if (customerId == null) {
            throw new AccessDeniedException("Sign in to place a booking.");
        }
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Your account could not be loaded."));

        TechnicianProfile technician = resolveTechnician(req);

        Booking booking = new Booking();
        booking.setBookingNumber(generateBookingNumber());
        booking.setCustomer(customer);
        booking.setTechnician(technician);
        booking.setStatus(technician != null ? BookingStatus.TECHNICIAN_ASSIGNED : BookingStatus.PENDING);

        booking.setServiceId(req.getServiceId() != null ? req.getServiceId() : "s101");
        booking.setServiceName(req.getServiceName() != null ? req.getServiceName() : "Home Service");

        // Money is always taken from non-negative server-side values. GST, discount
        // and the total used to be accepted from the request body, so a crafted
        // payload could book a ₹5,000 job for ₹0.
        booking.setServicePrice(nonNegative(req.getServicePrice(), 499));
        booking.setVisitCharge(nonNegative(req.getVisitCharge(), 199));
        booking.setPartsCharge(nonNegative(req.getPartsCharge(), 0));
        booking.setDiscount(nonNegative(req.getDiscount(), 0));
        recalculateTotals(booking);

        booking.setScheduledDate(req.getScheduledDate() != null ? req.getScheduledDate() : "Tomorrow");
        booking.setScheduledTime(req.getScheduledTime() != null ? req.getScheduledTime() : "10:00 AM");
        booking.setServiceLocation(req.getServiceLocation() != null ? req.getServiceLocation() : "Chennai");
        booking.setServiceArea(req.getServiceArea() != null ? req.getServiceArea() : customer.getArea());
        booking.setProblemDescription(req.getProblemDescription());
        booking.setIsEmergency(req.getIsEmergency() != null ? req.getIsEmergency() : false);
        booking.setNotes(req.getNotes());
        booking.setPaymentMethod(req.getPaymentMethod() != null ? req.getPaymentMethod() : "upi");
        booking.setPaymentStatus("PENDING");

        // This OTP is what lets a technician close a job, so it is generated from
        // SecureRandom rather than java.util.Random.
        booking.setOtpCode(String.format("%04d", SECURE_RANDOM.nextInt(10000)));

        Booking saved = bookingRepository.save(booking);

        historyRepository.save(new BookingStatusHistory(
                saved, saved.getStatus(), "Booking created with number " + saved.getBookingNumber()));

        return saved;
    }

    private TechnicianProfile resolveTechnician(CreateBookingRequest req) {
        if (req.getTechnicianId() != null) {
            // An explicitly requested technician that does not exist is an error,
            // not a cue to silently substitute someone else.
            return technicianRepository.findById(req.getTechnicianId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "No professional found with id: " + req.getTechnicianId()));
        }
        if (req.getProviderName() != null && !req.getProviderName().isBlank()) {
            return technicianRepository.findAll().stream()
                    .filter(t -> t.getUser().getName().equalsIgnoreCase(req.getProviderName())
                            || (t.getBusinessName() != null
                                && t.getBusinessName().equalsIgnoreCase(req.getProviderName())))
                    .findFirst()
                    .orElse(null);
        }
        // No preference expressed: leave unassigned and let dispatch pick one up.
        // Defaulting to "the first technician in the table" sent real jobs to an
        // arbitrary professional.
        return null;
    }

    private String generateBookingNumber() {
        for (int attempt = 0; attempt < 5; attempt++) {
            String candidate = "LF-CHN-" + (100000 + SECURE_RANDOM.nextInt(900000));
            if (!bookingRepository.existsByBookingNumber(candidate)) {
                return candidate;
            }
        }
        throw new BadRequestException("Could not allocate a booking number. Please try again.");
    }

    private int nonNegative(Integer value, int fallback) {
        if (value == null) return fallback;
        return Math.max(0, value);
    }

    /**
     * Single source of truth for booking money. Parts were excluded from the
     * subtotal at creation but included when an additional charge was approved,
     * so GST and the total disagreed with the invoice for any job with parts.
     */
    private void recalculateTotals(Booking booking) {
        int subtotal = booking.getServicePrice() + booking.getVisitCharge() + booking.getPartsCharge();
        int discount = Math.min(booking.getDiscount(), subtotal);
        booking.setDiscount(discount);
        booking.setGst((int) Math.round((subtotal - discount) * GST_RATE));
        booking.setTotalPrice(subtotal - discount + booking.getGst());
    }

    // --------------------------------------------------------------- status

    @Transactional
    public Booking updateStatus(Long bookingId, UpdateStatusRequest req, Long userId, boolean isAdmin) {
        Booking booking = getBookingById(bookingId);
        assertParticipant(booking, userId, isAdmin);

        BookingStatus current = booking.getStatus();
        BookingStatus next = req.getStatus();
        if (next == null) {
            throw new BadRequestException("A target status is required.");
        }
        if (next == current) {
            return booking;
        }

        if (!isAdmin && !ALLOWED_TRANSITIONS.getOrDefault(current, Set.of()).contains(next)) {
            throw new BadRequestException(
                    "A booking that is " + current + " cannot move to " + next + ".");
        }

        // Only the customer may cancel; only the assigned technician may drive the
        // job forward. Without this either side could cancel the other's work.
        if (!isAdmin) {
            if (next == BookingStatus.CANCELLED) {
                if (!isBookingCustomer(booking, userId)) {
                    throw new AccessDeniedException("Only the customer who booked can cancel it.");
                }
            } else if (!isAssignedTechnician(booking, userId)) {
                throw new AccessDeniedException("Only the assigned professional can update job progress.");
            }
        }

        // SERVICE_COMPLETED is reached by verifying the customer's OTP, never by
        // the technician simply declaring the job done.
        if (next == BookingStatus.SERVICE_COMPLETED && !isAdmin) {
            throw new BadRequestException("Confirm completion with the customer's OTP instead.");
        }

        booking.setStatus(next);
        Booking saved = bookingRepository.save(booking);

        historyRepository.save(new BookingStatusHistory(
                saved, next, req.getNote() != null ? req.getNote() : "Status updated to " + next));

        return saved;
    }

    // ---------------------------------------------------- additional charges

    @Transactional
    public AdditionalCharge requestAdditionalCharge(Long bookingId, AdditionalChargeRequest req,
                                                    Long userId, boolean isAdmin) {
        Booking booking = getBookingById(bookingId);

        if (!isAdmin && !isAssignedTechnician(booking, userId)) {
            throw new AccessDeniedException("Only the assigned professional can request extra charges.");
        }
        if (booking.getStatus() == BookingStatus.COMPLETED
                || booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("This job is closed; no further charges can be added.");
        }

        int parts = nonNegative(req.getPartsCharge(), 0);
        int labour = nonNegative(req.getLabourCharge(), 0);
        if (parts + labour <= 0) {
            throw new BadRequestException("An additional charge must be more than ₹0.");
        }

        AdditionalCharge charge = new AdditionalCharge(
                booking, req.getDescription(), parts, labour, req.getReason());
        return additionalChargeRepository.save(charge);
    }

    @Transactional
    public Booking respondToAdditionalCharge(Long chargeId, boolean approve, Long userId, boolean isAdmin) {
        AdditionalCharge charge = additionalChargeRepository.findById(chargeId)
                .orElseThrow(() -> new ResourceNotFoundException("Additional charge not found with id: " + chargeId));

        Booking booking = charge.getBooking();

        // The customer pays it, so only the customer may approve it.
        if (!isAdmin && !isBookingCustomer(booking, userId)) {
            throw new AccessDeniedException("Only the customer can approve an additional charge.");
        }

        // Approving twice used to add the amount to the booking twice.
        if (!"PENDING_APPROVAL".equals(charge.getStatus())) {
            throw new BadRequestException("This charge has already been " + charge.getStatus().toLowerCase() + ".");
        }

        charge.setRespondedAt(LocalDateTime.now());

        if (approve) {
            charge.setStatus("APPROVED");
            additionalChargeRepository.save(charge);

            booking.setPartsCharge(booking.getPartsCharge() + charge.getPartsCharge());
            booking.setServicePrice(booking.getServicePrice() + charge.getLabourCharge());
            recalculateTotals(booking);
            bookingRepository.save(booking);

            historyRepository.save(new BookingStatusHistory(booking, booking.getStatus(),
                    "Customer approved additional charge of ₹" + charge.getTotal()));
        } else {
            charge.setStatus("REJECTED");
            additionalChargeRepository.save(charge);

            historyRepository.save(new BookingStatusHistory(booking, booking.getStatus(),
                    "Customer rejected additional charge: " + charge.getDescription()));
        }

        return booking;
    }

    // ------------------------------------------------------------- complete

    @Transactional
    public Booking verifyOtpAndComplete(Long bookingId, String enteredOtp, Long userId, boolean isAdmin) {
        Booking booking = getBookingById(bookingId);

        if (!isAdmin && !isAssignedTechnician(booking, userId)) {
            throw new AccessDeniedException("Only the assigned professional can close this job.");
        }
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("This booking was cancelled.");
        }
        // Re-running completion used to re-stamp the history on an already-closed job.
        if (booking.getStatus() == BookingStatus.SERVICE_COMPLETED
                || booking.getStatus() == BookingStatus.COMPLETED
                || booking.getStatus() == BookingStatus.PAYMENT_PENDING) {
            throw new BadRequestException("This job has already been marked complete.");
        }

        // Both sides were previously dereferenced without a null check, so a
        // booking with no OTP or a request with no otp field threw a 500.
        String expected = booking.getOtpCode();
        String supplied = enteredOtp == null ? "" : enteredOtp.trim();
        if (expected == null || expected.isBlank()) {
            throw new BadRequestException("No completion code was issued for this booking.");
        }
        if (!expected.equals(supplied)) {
            throw new BadRequestException("Incorrect completion code. Please check with the customer.");
        }

        booking.setStatus(BookingStatus.SERVICE_COMPLETED);
        Booking saved = bookingRepository.save(booking);

        historyRepository.save(new BookingStatusHistory(saved, BookingStatus.SERVICE_COMPLETED,
                "Service verified by OTP and completed by the professional"));

        return saved;
    }
}
