package com.localfix.controller;

import com.localfix.dto.ApiResponse;
import com.localfix.dto.ReviewRequest;
import com.localfix.entity.Review;
import com.localfix.security.UserPrincipal;
import com.localfix.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Review>> createReview(
            @Valid @RequestBody ReviewRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Review review = reviewService.createReview(request, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Thank you for your review!", review));
    }

    @GetMapping("/technician/{id}")
    public ResponseEntity<ApiResponse<List<Review>>> getTechnicianReviews(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.getTechnicianReviews(id)));
    }
}
