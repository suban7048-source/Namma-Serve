package com.localfix.controller;

import com.localfix.dto.ApiResponse;
import com.localfix.entity.TechnicianProfile;
import com.localfix.service.TechnicianService;
import org.springframework.http.ResponseEntity;
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

    @PatchMapping("/{id}/toggle-availability")
    public ResponseEntity<ApiResponse<TechnicianProfile>> toggleAvailability(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Availability updated", technicianService.toggleAvailability(id)));
    }
}
