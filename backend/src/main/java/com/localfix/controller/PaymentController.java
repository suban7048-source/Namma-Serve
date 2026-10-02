package com.localfix.controller;

import com.localfix.dto.ApiResponse;
import com.localfix.dto.PaymentRequest;
import com.localfix.entity.Invoice;
import com.localfix.entity.Payment;
import com.localfix.security.UserPrincipal;
import com.localfix.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    private Long idOf(UserPrincipal principal) {
        if (principal == null) {
            throw new AccessDeniedException("Sign in to continue.");
        }
        return principal.getId();
    }

    private boolean isAdmin(UserPrincipal principal) {
        return principal != null && principal.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
    }

    @PostMapping("/process")
    public ResponseEntity<ApiResponse<Payment>> processPayment(
            @Valid @RequestBody PaymentRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Payment payment = paymentService.processPayment(
                request, idOf(userPrincipal), isAdmin(userPrincipal));
        return ResponseEntity.ok(ApiResponse.success("Payment processed successfully", payment));
    }

    @GetMapping("/invoice/{bookingId}")
    public ResponseEntity<ApiResponse<Invoice>> getInvoice(
            @PathVariable Long bookingId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(
                paymentService.getInvoiceByBookingId(bookingId, idOf(userPrincipal), isAdmin(userPrincipal))));
    }
}
