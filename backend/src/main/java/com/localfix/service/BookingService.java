package com.localfix.service;

import com.localfix.dto.AdditionalChargeRequest;
import com.localfix.dto.CreateBookingRequest;
import com.localfix.dto.UpdateStatusRequest;
import com.localfix.entity.*;
import com.localfix.exception.BadRequestException;
import com.localfix.exception.ResourceNotFoundException;
import com.localfix.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class BookingService {

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

    public List<Booking> getCustomerBookings(Long customerId) {
        return bookingRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    public List<Booking> getTechnicianBookings(Long technicianId) {
        return bookingRepository.findByTechnicianIdOrderByCreatedAtDesc(technicianId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    @Transactional
    public Booking createBooking(CreateBookingRequest req, Long customerId) {
        User customer = null;
        if (customerId != null) {
            customer = userRepository.findById(customerId).orElse(null);
        }
        if (customer == null && req.getCustomerEmail() != null && !req.getCustomerEmail().isBlank()) {
            customer = userRepository.findByEmail(req.getCustomerEmail()).orElse(null);
        }
        if (customer == null) {
            // Find default customer or create one
            String email = req.getCustomerEmail() != null && !req.getCustomerEmail().isBlank()
                    ? req.getCustomerEmail()
                    : "aakash@gmail.com";
            customer = userRepository.findByEmail(email).orElse(null);
            if (customer == null) {
                customer = new User(
                        req.getCustomerName() != null ? req.getCustomerName() : "Customer",
                        email,
                        req.getCustomerPhone() != null ? req.getCustomerPhone() : "+91 99999 11122",
                        "password123",
                        Role.ROLE_CUSTOMER,
                        req.getServiceArea() != null ? req.getServiceArea() : "Velachery"
                );
                customer = userRepository.save(customer);
            }
        }

        Booking booking = new Booking();
        String bookingNumber = "LF-CHN-" + (1000 + new Random().nextInt(9000));
        booking.setBookingNumber(bookingNumber);
        booking.setCustomer(customer);

        // Find technician
        TechnicianProfile technician = null;
        if (req.getTechnicianId() != null) {
            technician = technicianRepository.findById(req.getTechnicianId()).orElse(null);
        }
        if (technician == null && req.getProviderName() != null) {
            technician = technicianRepository.findAll().stream()
                    .filter(t -> t.getUser().getName().equalsIgnoreCase(req.getProviderName())
                            || (t.getBusinessName() != null && t.getBusinessName().equalsIgnoreCase(req.getProviderName())))
                    .findFirst().orElse(null);
        }
        if (technician == null && !technicianRepository.findAll().isEmpty()) {
            technician = technicianRepository.findAll().get(0);
        }

        booking.setTechnician(technician);
        booking.setStatus(technician != null ? BookingStatus.TECHNICIAN_ASSIGNED : BookingStatus.PENDING);

        booking.setServiceId(req.getServiceId() != null ? req.getServiceId() : "s101");
        booking.setServiceName(req.getServiceName() != null ? req.getServiceName() : "Home Service");
        booking.setServicePrice(req.getServicePrice() != null ? req.getServicePrice() : 499);
        booking.setVisitCharge(req.getVisitCharge() != null ? req.getVisitCharge() : 199);
        booking.setPartsCharge(req.getPartsCharge() != null ? req.getPartsCharge() : 0);

        int subtotal = booking.getServicePrice() + booking.getVisitCharge();
        int calculatedGst = (int) Math.round(subtotal * 0.18);
        booking.setGst(req.getGst() != null && req.getGst() > 0 ? req.getGst() : calculatedGst);
        booking.setDiscount(req.getDiscount() != null ? req.getDiscount() : 0);
        booking.setTotalPrice(subtotal + booking.getGst() - booking.getDiscount());

        booking.setScheduledDate(req.getScheduledDate() != null ? req.getScheduledDate() : "Tomorrow");
        booking.setScheduledTime(req.getScheduledTime() != null ? req.getScheduledTime() : "10:00 AM");
        booking.setServiceLocation(req.getServiceLocation() != null ? req.getServiceLocation() : "Chennai");
        booking.setServiceArea(req.getServiceArea() != null ? req.getServiceArea() : "Velachery");
        booking.setProblemDescription(req.getProblemDescription());
        booking.setIsEmergency(req.getIsEmergency() != null ? req.getIsEmergency() : false);
        booking.setNotes(req.getNotes());
        booking.setPaymentMethod(req.getPaymentMethod() != null ? req.getPaymentMethod() : "upi");
        booking.setOtpCode(String.format("%04d", new Random().nextInt(10000)));

        Booking saved = bookingRepository.save(booking);

        // Record initial status in history
        BookingStatusHistory history = new BookingStatusHistory(
                saved, saved.getStatus(), "Booking created successfully with booking number " + bookingNumber);
        historyRepository.save(history);

        return saved;
    }

    @Transactional
    public Booking updateStatus(Long bookingId, UpdateStatusRequest req) {
        Booking booking = getBookingById(bookingId);
        BookingStatus newStatus = req.getStatus();

        booking.setStatus(newStatus);
        Booking saved = bookingRepository.save(booking);

        BookingStatusHistory history = new BookingStatusHistory(
                saved, newStatus, req.getNote() != null ? req.getNote() : "Status updated to " + newStatus);
        historyRepository.save(history);

        return saved;
    }

    @Transactional
    public AdditionalCharge requestAdditionalCharge(Long bookingId, AdditionalChargeRequest req) {
        Booking booking = getBookingById(bookingId);
        AdditionalCharge charge = new AdditionalCharge(
                booking, req.getDescription(), req.getPartsCharge(), req.getLabourCharge(), req.getReason());
        return additionalChargeRepository.save(charge);
    }

    @Transactional
    public Booking respondToAdditionalCharge(Long chargeId, boolean approve) {
        AdditionalCharge charge = additionalChargeRepository.findById(chargeId)
                .orElseThrow(() -> new ResourceNotFoundException("Additional charge not found with id: " + chargeId));

        Booking booking = charge.getBooking();

        if (approve) {
            charge.setStatus("APPROVED");
            charge.setRespondedAt(LocalDateTime.now());
            additionalChargeRepository.save(charge);

            int additionalParts = charge.getPartsCharge();
            int additionalLabour = charge.getLabourCharge();
            booking.setPartsCharge(booking.getPartsCharge() + additionalParts);
            booking.setServicePrice(booking.getServicePrice() + additionalLabour);

            int subtotal = booking.getServicePrice() + booking.getVisitCharge() + booking.getPartsCharge();
            int gst = (int) Math.round(subtotal * 0.18);
            booking.setGst(gst);
            booking.setTotalPrice(subtotal + gst - booking.getDiscount());

            bookingRepository.save(booking);

            BookingStatusHistory history = new BookingStatusHistory(
                    booking, booking.getStatus(), "Customer approved additional charge of ₹" + charge.getTotal());
            historyRepository.save(history);
        } else {
            charge.setStatus("REJECTED");
            charge.setRespondedAt(LocalDateTime.now());
            additionalChargeRepository.save(charge);

            BookingStatusHistory history = new BookingStatusHistory(
                    booking, booking.getStatus(), "Customer rejected additional charge: " + charge.getDescription());
            historyRepository.save(history);
        }

        return booking;
    }

    @Transactional
    public Booking verifyOtpAndComplete(Long bookingId, String enteredOtp) {
        Booking booking = getBookingById(bookingId);
        if (!booking.getOtpCode().equals(enteredOtp.trim())) {
            throw new BadRequestException("Invalid completion OTP. Please verify with the customer.");
        }

        booking.setStatus(BookingStatus.SERVICE_COMPLETED);
        Booking saved = bookingRepository.save(booking);

        BookingStatusHistory history = new BookingStatusHistory(
                saved, BookingStatus.SERVICE_COMPLETED, "Service verified by OTP and completed by technician");
        historyRepository.save(history);

        return saved;
    }
}
