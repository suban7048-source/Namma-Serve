package com.localfix.repository;

import com.localfix.entity.TechnicianProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TechnicianProfileRepository extends JpaRepository<TechnicianProfile, Long> {
    Optional<TechnicianProfile> findByUserId(Long userId);

    List<TechnicianProfile> findByCategoryIgnoreCase(String category);

    List<TechnicianProfile> findByIsVerifiedTrue();

    @Query("SELECT t FROM TechnicianProfile t WHERE t.isAvailable = true AND (:category IS NULL OR LOWER(t.category) = LOWER(:category))")
    List<TechnicianProfile> findAvailableByCategory(@Param("category") String category);

    @Query("SELECT t FROM TechnicianProfile t WHERE t.emergencyAvailable = true AND t.isAvailable = true")
    List<TechnicianProfile> findEmergencyAvailable();
}
