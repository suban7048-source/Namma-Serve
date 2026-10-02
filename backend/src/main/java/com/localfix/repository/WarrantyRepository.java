package com.localfix.repository;

import com.localfix.entity.Warranty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WarrantyRepository extends JpaRepository<Warranty, Long> {
    Optional<Warranty> findByBookingId(Long bookingId);
    List<Warranty> findByCustomerId(Long customerId);
}
