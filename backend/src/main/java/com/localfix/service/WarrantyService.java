package com.localfix.service;

import com.localfix.dto.WarrantyClaimRequest;
import com.localfix.entity.Booking;
import com.localfix.entity.Warranty;
import com.localfix.exception.BadRequestException;
import com.localfix.exception.ResourceNotFoundException;
import com.localfix.repository.BookingRepository;
import com.localfix.repository.WarrantyRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class WarrantyService {

    private final WarrantyRepository warrantyRepository;
    private final BookingRepository bookingRepository;

    public WarrantyService(WarrantyRepository warrantyRepository, BookingRepository bookingRepository) {
        this.warrantyRepository = warrantyRepository;
        this.bookingRepository = bookingRepository;
    }

    @Transactional
    public Warranty createWarrantyForBooking(Booking booking) {
        Warranty warranty = new Warranty();
        warranty.setBooking(booking);
        warranty.setCustomer(booking.getCustomer());
        warranty.setTechnician(booking.getTechnician());
        warranty.setServiceName(booking.getServiceName());
        warranty.setWarrantyDays(booking.getWarrantyDays());
        warranty.setValidFrom(LocalDate.now());
        warranty.setValidUntil(LocalDate.now().plusDays(booking.getWarrantyDays()));
        warranty.setStatus("ACTIVE");

        return warrantyRepository.save(warranty);
    }

    @Transactional
    public Warranty claimWarranty(WarrantyClaimRequest req, Long customerId) {
        Warranty warranty = warrantyRepository.findByBookingId(req.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("No active warranty found for booking: " + req.getBookingId()));

        // This endpoint took no identity at all, so any caller could claim
        // against any booking id.
        if (warranty.getCustomer() == null || !warranty.getCustomer().getId().equals(customerId)) {
            throw new AccessDeniedException("This warranty belongs to another customer.");
        }
        if ("CLAIMED".equals(warranty.getStatus())) {
            throw new BadRequestException("A claim is already open on this warranty.");
        }
        if (warranty.getValidUntil().isBefore(LocalDate.now())) {
            warranty.setStatus("EXPIRED");
            warrantyRepository.save(warranty);
            throw new BadRequestException("Warranty expired on " + warranty.getValidUntil());
        }

        warranty.setStatus("CLAIMED");
        warranty.setClaimReason(req.getReason());
        warranty.setClaimStatus("PENDING");

        return warrantyRepository.save(warranty);
    }

    public List<Warranty> getCustomerWarranties(Long customerId) {
        return warrantyRepository.findByCustomerId(customerId);
    }
}
