package com.localfix.service;

import com.localfix.dto.AdminDashboardStatsDto;
import com.localfix.entity.Booking;
import com.localfix.entity.BookingStatus;
import com.localfix.entity.TechnicianProfile;
import com.localfix.repository.BookingRepository;
import com.localfix.repository.ComplaintRepository;
import com.localfix.repository.TechnicianProfileRepository;
import com.localfix.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final TechnicianProfileRepository technicianRepository;
    private final BookingRepository bookingRepository;
    private final ComplaintRepository complaintRepository;
    private final TechnicianService technicianService;

    public AdminService(UserRepository userRepository,
                        TechnicianProfileRepository technicianRepository,
                        BookingRepository bookingRepository,
                        ComplaintRepository complaintRepository,
                        TechnicianService technicianService) {
        this.userRepository = userRepository;
        this.technicianRepository = technicianRepository;
        this.bookingRepository = bookingRepository;
        this.complaintRepository = complaintRepository;
        this.technicianService = technicianService;
    }

    public AdminDashboardStatsDto getStats() {
        AdminDashboardStatsDto stats = new AdminDashboardStatsDto();
        stats.setTotalCustomers(userRepository.count());
        stats.setTotalTechnicians(technicianRepository.count());
        stats.setVerifiedTechnicians(technicianRepository.findByIsVerifiedTrue().size());
        stats.setPendingTechnicians(technicianRepository.count() - stats.getVerifiedTechnicians());

        List<Booking> allBookings = bookingRepository.findAll();
        stats.setTotalBookings(allBookings.size());
        stats.setCompletedBookings(bookingRepository.countByStatus(BookingStatus.COMPLETED));
        stats.setCancelledBookings(bookingRepository.countByStatus(BookingStatus.CANCELLED));

        long revenue = allBookings.stream()
                .filter(b -> "SUCCESS".equalsIgnoreCase(b.getPaymentStatus()))
                .mapToLong(Booking::getTotalPrice)
                .sum();
        stats.setTotalRevenue(revenue);
        stats.setPlatformCommission(Math.round(revenue * 0.15));

        stats.setOpenComplaints(complaintRepository.findByStatus("OPEN").size());

        return stats;
    }

    public TechnicianProfile verifyTechnician(Long id, boolean approve) {
        return technicianService.verifyTechnician(id, approve ? "VERIFIED" : "REJECTED");
    }
}
