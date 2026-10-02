package com.localfix.controller;

import com.localfix.dto.AdditionalChargeRequest;
import com.localfix.dto.ApiResponse;
import com.localfix.dto.CreateBookingRequest;
import com.localfix.dto.UpdateStatusRequest;
import com.localfix.entity.AdditionalCharge;
import com.localfix.entity.Booking;
import com.localfix.security.UserPrincipal;
import com.localfix.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Booking>> createBooking(
            @RequestBody CreateBookingRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long customerId = userPrincipal != null ? userPrincipal.getId() : null;
        Booking booking = bookingService.createBooking(request, customerId);
        return ResponseEntity.ok(ApiResponse.success("Booking created successfully", booking));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Booking>>> getAllBookings() {
        return ResponseEntity.ok(ApiResponse.success(bookingService.getAllBookings()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Booking>> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(bookingService.getBookingById(id)));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<ApiResponse<List<Booking>>> getCustomerBookings(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long customerId = userPrincipal != null ? userPrincipal.getId() : 2L;
        return ResponseEntity.ok(ApiResponse.success(bookingService.getCustomerBookings(customerId)));
    }

    @GetMapping("/technician/{id}")
    public ResponseEntity<ApiResponse<List<Booking>>> getTechnicianBookings(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(bookingService.getTechnicianBookings(id)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Booking>> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Status updated", bookingService.updateStatus(id, request)));
    }

    @PostMapping("/{id}/additional-charge")
    public ResponseEntity<ApiResponse<AdditionalCharge>> requestAdditionalCharge(
            @PathVariable Long id,
            @RequestBody AdditionalChargeRequest request) {
        AdditionalCharge charge = bookingService.requestAdditionalCharge(id, request);
        return ResponseEntity.ok(ApiResponse.success("Additional charge requested. Waiting for customer approval.", charge));
    }

    @PatchMapping("/additional-charge/{chargeId}/respond")
    public ResponseEntity<ApiResponse<Booking>> respondToAdditionalCharge(
            @PathVariable Long chargeId,
            @RequestBody Map<String, Boolean> body) {
        boolean approve = body.getOrDefault("approve", false);
        Booking booking = bookingService.respondToAdditionalCharge(chargeId, approve);
        return ResponseEntity.ok(ApiResponse.success(approve ? "Charge approved" : "Charge rejected", booking));
    }

    @PostMapping("/{id}/verify-otp")
    public ResponseEntity<ApiResponse<Booking>> verifyOtp(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String otp = body.getOrDefault("otp", "");
        Booking booking = bookingService.verifyOtpAndComplete(id, otp);
        return ResponseEntity.ok(ApiResponse.success("Job completed successfully!", booking));
    }
}
