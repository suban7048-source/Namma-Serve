package com.localfix.service;

import com.localfix.entity.TechnicianProfile;
import com.localfix.exception.ResourceNotFoundException;
import com.localfix.repository.TechnicianProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TechnicianService {

    private final TechnicianProfileRepository technicianRepository;

    public TechnicianService(TechnicianProfileRepository technicianRepository) {
        this.technicianRepository = technicianRepository;
    }

    public List<TechnicianProfile> getAllTechnicians() {
        return technicianRepository.findAll();
    }

    public List<TechnicianProfile> getVerifiedTechnicians() {
        return technicianRepository.findByIsVerifiedTrue();
    }

    public TechnicianProfile getTechnicianById(Long id) {
        return technicianRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found with id: " + id));
    }

    public List<TechnicianProfile> matchTechnicians(String category, String area, Boolean emergency) {
        List<TechnicianProfile> candidates;

        if (Boolean.TRUE.equals(emergency)) {
            candidates = technicianRepository.findEmergencyAvailable();
        } else {
            candidates = technicianRepository.findAvailableByCategory(category);
        }

        // Hyperlocal scoring algorithm: verified first, then matching area, then highest rating
        return candidates.stream()
                .sorted(Comparator
                        .comparing((TechnicianProfile t) -> !t.getIsVerified()) // Verified first
                        .thenComparing(t -> !matchesArea(t.getLocation(), area)) // Area match first
                        .thenComparing(Comparator.comparing(TechnicianProfile::getRating).reversed()) // Highest rating
                )
                .collect(Collectors.toList());
    }

    private boolean matchesArea(String location, String targetArea) {
        if (location == null || targetArea == null) return false;
        return location.toLowerCase().contains(targetArea.toLowerCase());
    }

    @Transactional
    public TechnicianProfile toggleAvailability(Long technicianId) {
        TechnicianProfile profile = getTechnicianById(technicianId);
        profile.setIsAvailable(!profile.getIsAvailable());
        return technicianRepository.save(profile);
    }

    @Transactional
    public TechnicianProfile verifyTechnician(Long technicianId, String status) {
        TechnicianProfile profile = getTechnicianById(technicianId);
        profile.setVerificationStatus(status);
        profile.setIsVerified("VERIFIED".equalsIgnoreCase(status));
        return technicianRepository.save(profile);
    }
}
