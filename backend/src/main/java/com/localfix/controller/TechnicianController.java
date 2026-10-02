package com.localfix.controller;

import com.localfix.dto.ApiResponse;
import com.localfix.entity.TechnicianProfile;
import com.localfix.security.UserPrincipal;
import com.localfix.service.TechnicianService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/technicians")
public class TechnicianController {

    private final TechnicianService technicianService;

    public TechnicianController(TechnicianService technicianService) {
        this.technicianService = technicianService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TechnicianProfile>>> getTechnicians(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean verifiedOnly) {
        if (Boolean.TRUE.equals(verifiedOnly)) {
            return ResponseEntity.ok(ApiResponse.success(technicianService.getVerifiedTechnicians()));
        }
        return ResponseEntity.ok(ApiResponse.success(technicianService.getAllTechnicians()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TechnicianProfile>> getTechnicianById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(technicianService.getTechnicianById(id)));
    }

    @GetMapping("/hyperlocal-match")
    public ResponseEntity<ApiResponse<List<TechnicianProfile>>> hyperlocalMatch(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String area,
            @RequestParam(required = false, defaultValue = "false") Boolean emergency) {
        return ResponseEntity.ok(ApiResponse.success(technicianService.matchTechnicians(category, area, emergency)));
    }

    /**
     * Only the professional who owns the profile (or an admin) may flip their
     * availability. Any signed-in account could previously mark a competitor
     * as unavailable.
     */
    @PatchMapping("/{id}/toggle-availability")
    public ResponseEntity<ApiResponse<TechnicianProfile>> toggleAvailability(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            throw new AccessDeniedException("Sign in to continue.");
        }
        boolean isAdmin = userPrincipal.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));

        TechnicianProfile profile = technicianService.getTechnicianById(id);
        boolean isOwner = profile.getUser() != null
                && userPrincipal.getId().equals(profile.getUser().getId());

        if (!isAdmin && !isOwner) {
            throw new AccessDeniedException("You can only change your own availability.");
        }
        return ResponseEntity.ok(ApiResponse.success("Availability updated", technicianService.toggleAvailability(id)));
    }
}
