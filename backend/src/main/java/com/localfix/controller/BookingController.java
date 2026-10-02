package com.localfix.controller;

import com.localfix.dto.AdditionalChargeRequest;
import com.localfix.dto.ApiResponse;
import com.localfix.dto.CreateBookingRequest;
import com.localfix.dto.UpdateStatusRequest;
import com.localfix.entity.AdditionalCharge;
import com.localfix.entity.Booking;
import com.localfix.exception.BadRequestException;
import com.localfix.security.UserPrincipal;
import com.localfix.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Every endpoint here now requires a principal (enforced in SecurityConfig) and
 * passes the caller's identity down to the service, which decides whether they
 * are a participant in the booking they are touching.
 */
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
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

    @PostMapping
    public ResponseEntity<ApiResponse<Booking>> createBooking(
            @Valid @RequestBody CreateBookingRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Booking booking = bookingService.createBooking(request, idOf(userPrincipal));
        return ResponseEntity.ok(ApiResponse.success("Booking created successfully", booking));
    }

    /** Full table dump — admin only. This was open to every caller. */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Booking>>> getAllBookings() {
        return ResponseEntity.ok(ApiResponse.success(bookingService.getAllBookings()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Booking>> getBookingById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(
                bookingService.getBookingForUser(id, idOf(userPrincipal), isAdmin(userPrincipal))));
    }

    /**
     * The customer's own bookings. The previous version fell back to a hardcoded
     * {@code customerId = 2L} when no principal was present, handing user #2's
     * history to any anonymous caller.
     */
    @GetMapping("/my-bookings")
    public ResponseEntity<ApiResponse<List<Booking>>> getCustomerBookings(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(
                bookingService.getCustomerBookings(idOf(userPrincipal))));
    }

    /** Jobs assigned to the signed-in professional. */
    @GetMapping("/my-jobs")
    public ResponseEntity<ApiResponse<List<Booking>>> getMyJobs(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(bookingService.getMyJobs(idOf(userPrincipal))));
    }

    /** Any professional's job list, by TechnicianProfile id — admin only. */
    @GetMapping("/technician/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Booking>>> getTechnicianBookings(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(bookingService.getTechnicianBookings(id)));
    }

    /**
     * The completion code, readable only by the customer who placed the booking,
     * who reads it out to the technician on site.
     */
    @GetMapping("/{id}/otp")
    public ResponseEntity<ApiResponse<Map<String, String>>> getCompletionOtp(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Booking booking = bookingService.getBookingById(id);
        Long userId = idOf(userPrincipal);
        boolean isCustomer = booking.getCustomer() != null
                && userId.equals(booking.getCustomer().getId());
        if (!isCustomer) {
            throw new AccessDeniedException("Only the customer can view the completion code.");
        }
        return ResponseEntity.ok(ApiResponse.success(Map.of("otp",
                booking.getOtpCode() == null ? "" : booking.getOtpCode())));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Booking>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success("Status updated",
                bookingService.updateStatus(id, request, idOf(userPrincipal), isAdmin(userPrincipal))));
    }

    @PostMapping("/{id}/additional-charge")
    public ResponseEntity<ApiResponse<AdditionalCharge>> requestAdditionalCharge(
            @PathVariable Long id,
            @Valid @RequestBody AdditionalChargeRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        AdditionalCharge charge = bookingService.requestAdditionalCharge(
                id, request, idOf(userPrincipal), isAdmin(userPrincipal));
        return ResponseEntity.ok(ApiResponse.success(
                "Additional charge requested. Waiting for customer approval.", charge));
    }

    @PatchMapping("/additional-charge/{chargeId}/respond")
    public ResponseEntity<ApiResponse<Booking>> respondToAdditionalCharge(
            @PathVariable Long chargeId,
            @RequestBody Map<String, Boolean> body,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Boolean approve = body.get("approve");
        if (approve == null) {
            throw new BadRequestException("Specify whether the charge is approved.");
        }
        Booking booking = bookingService.respondToAdditionalCharge(
                chargeId, approve, idOf(userPrincipal), isAdmin(userPrincipal));
        return ResponseEntity.ok(ApiResponse.success(
                approve ? "Charge approved" : "Charge rejected", booking));
    }

    @PostMapping("/{id}/verify-otp")
    public ResponseEntity<ApiResponse<Booking>> verifyOtp(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Booking booking = bookingService.verifyOtpAndComplete(
                id, body.get("otp"), idOf(userPrincipal), isAdmin(userPrincipal));
        return ResponseEntity.ok(ApiResponse.success("Job completed successfully!", booking));
    }
}
