package com.localfix.repository;

import com.localfix.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByBookingId(Long bookingId);

    List<Review> findByTechnicianIdOrderByCreatedAtDesc(Long technicianId);
    List<Review> findByCustomerId(Long customerId);
}
