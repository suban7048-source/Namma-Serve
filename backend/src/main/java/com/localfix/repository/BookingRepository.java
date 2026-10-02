package com.localfix.repository;

import com.localfix.entity.Booking;
import com.localfix.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingNumber(String bookingNumber);

    boolean existsByBookingNumber(String bookingNumber);

    List<Booking> findByCustomerIdOrderByCreatedAtDesc(Long customerId);

    List<Booking> findByTechnicianIdOrderByCreatedAtDesc(Long technicianId);

    List<Booking> findByStatus(BookingStatus status);

    long countByStatus(BookingStatus status);
}
