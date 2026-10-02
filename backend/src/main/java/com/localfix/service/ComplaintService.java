package com.localfix.service;

import com.localfix.dto.ComplaintRequest;
import com.localfix.entity.Booking;
import com.localfix.entity.Complaint;
import com.localfix.entity.User;
import com.localfix.exception.ResourceNotFoundException;
import com.localfix.repository.BookingRepository;
import com.localfix.repository.ComplaintRepository;
import com.localfix.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public ComplaintService(ComplaintRepository complaintRepository,
                            BookingRepository bookingRepository,
                            UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Complaint createComplaint(ComplaintRequest req, Long customerId) {
        Booking booking = bookingRepository.findById(req.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + req.getBookingId()));

        // Complaints are attached to a booking and visible to admins, so only the
        // customer on that booking may raise one.
        if (booking.getCustomer() == null || !booking.getCustomer().getId().equals(customerId)) {
            throw new AccessDeniedException("You can only raise a complaint about your own booking.");
        }

        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found: " + customerId));

        Complaint complaint = new Complaint();
        complaint.setBooking(booking);
        complaint.setCustomer(customer);
        complaint.setTechnician(booking.getTechnician());
        complaint.setCategory(req.getCategory());
        complaint.setDescription(req.getDescription());
        complaint.setStatus("OPEN");

        return complaintRepository.save(complaint);
    }

    public List<Complaint> getCustomerComplaints(Long customerId) {
        return complaintRepository.findByCustomerId(customerId);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Transactional
    public Complaint updateComplaintStatus(Long id, String status, String adminNotes) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with id: " + id));

        complaint.setStatus(status);
        complaint.setAdminNotes(adminNotes);
        if ("RESOLVED".equalsIgnoreCase(status) || "REJECTED".equalsIgnoreCase(status)) {
            complaint.setResolvedAt(LocalDateTime.now());
        }

        return complaintRepository.save(complaint);
    }
}
