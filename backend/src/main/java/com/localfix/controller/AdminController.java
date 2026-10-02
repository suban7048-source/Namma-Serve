package com.localfix.controller;

import com.localfix.dto.AdminDashboardStatsDto;
import com.localfix.dto.ApiResponse;
import com.localfix.entity.TechnicianProfile;
import com.localfix.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminDashboardStatsDto>> getStats() {
        return ResponseEntity.ok(ApiResponse.success(adminService.getStats()));
    }

    @PostMapping("/technicians/{id}/verify")
    public ResponseEntity<ApiResponse<TechnicianProfile>> verifyTechnician(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        boolean approve = body.getOrDefault("approve", true);
        TechnicianProfile profile = adminService.verifyTechnician(id, approve);
        return ResponseEntity.ok(ApiResponse.success(
                approve ? "Technician verified successfully" : "Technician verification rejected",
                profile));
    }
}
