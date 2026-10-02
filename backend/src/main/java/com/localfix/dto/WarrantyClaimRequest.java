package com.localfix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class WarrantyClaimRequest {

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotBlank(message = "Claim reason is required")
    private String reason;

    public WarrantyClaimRequest() {}

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
