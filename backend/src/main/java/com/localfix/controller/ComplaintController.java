package com.localfix.controller;

import com.localfix.dto.ApiResponse;
import com.localfix.dto.ComplaintRequest;
import com.localfix.entity.Complaint;
import com.localfix.security.UserPrincipal;
import com.localfix.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Complaint>> createComplaint(
            @Valid @RequestBody ComplaintRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Complaint complaint = complaintService.createComplaint(request, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Complaint submitted successfully. Our team will review within 24 hours.", complaint));
    }

    @GetMapping("/my-complaints")
    public ResponseEntity<ApiResponse<List<Complaint>>> getMyComplaints(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(complaintService.getCustomerComplaints(userPrincipal.getId())));
    }

    /** Moderation queue — admin only. This previously returned every customer
     *  complaint in the system to any caller. */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Complaint>>> getAllComplaints() {
        return ResponseEntity.ok(ApiResponse.success(complaintService.getAllComplaints()));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Complaint>> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String status = body.getOrDefault("status", "UNDER_REVIEW");
        String adminNotes = body.getOrDefault("adminNotes", "");
        Complaint complaint = complaintService.updateComplaintStatus(id, status, adminNotes);
        return ResponseEntity.ok(ApiResponse.success("Complaint status updated", complaint));
    }
}
