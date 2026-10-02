package com.localfix.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReviewRequest {

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotNull(message = "Rating is required")
    @Min(1)
    @Max(5)
    private Double rating;

    private Double qualityRating;
    private Double professionalismRating;
    private Double punctualityRating;

    @NotBlank(message = "Comment is required")
    private String comment;

    public ReviewRequest() {}

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Double getQualityRating() { return qualityRating; }
    public void setQualityRating(Double qualityRating) { this.qualityRating = qualityRating; }

    public Double getProfessionalismRating() { return professionalismRating; }
    public void setProfessionalismRating(Double professionalismRating) { this.professionalismRating = professionalismRating; }

    public Double getPunctualityRating() { return punctualityRating; }
    public void setPunctualityRating(Double punctualityRating) { this.punctualityRating = punctualityRating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
