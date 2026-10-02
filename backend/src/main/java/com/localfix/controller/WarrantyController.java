package com.localfix.controller;

import com.localfix.dto.ApiResponse;
import com.localfix.dto.WarrantyClaimRequest;
import com.localfix.entity.Warranty;
import com.localfix.security.UserPrincipal;
import com.localfix.service.WarrantyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warranty")
public class WarrantyController {

    private final WarrantyService warrantyService;

    public WarrantyController(WarrantyService warrantyService) {
        this.warrantyService = warrantyService;
    }

    @PostMapping("/claim")
    public ResponseEntity<ApiResponse<Warranty>> claimWarranty(@Valid @RequestBody WarrantyClaimRequest request) {
        Warranty warranty = warrantyService.claimWarranty(request);
        return ResponseEntity.ok(ApiResponse.success("Warranty claim registered. Our team will contact you shortly.", warranty));
    }

    @GetMapping("/my-warranties")
    public ResponseEntity<ApiResponse<List<Warranty>>> getMyWarranties(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(warrantyService.getCustomerWarranties(userPrincipal.getId())));
    }
}
