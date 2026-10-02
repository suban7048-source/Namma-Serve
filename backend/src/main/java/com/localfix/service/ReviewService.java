package com.localfix.service;

import com.localfix.dto.ReviewRequest;
import com.localfix.entity.Booking;
import com.localfix.entity.BookingStatus;
import com.localfix.entity.Review;
import com.localfix.entity.TechnicianProfile;
import com.localfix.entity.User;
import com.localfix.exception.BadRequestException;
import com.localfix.exception.ResourceNotFoundException;
import com.localfix.repository.BookingRepository;
import com.localfix.repository.ReviewRepository;
import com.localfix.repository.TechnicianProfileRepository;
import com.localfix.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final TechnicianProfileRepository technicianRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         BookingRepository bookingRepository,
                         TechnicianProfileRepository technicianRepository,
                         UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.bookingRepository = bookingRepository;
        this.technicianRepository = technicianRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Review createReview(ReviewRequest req, Long customerId) {
        Booking booking = bookingRepository.findById(req.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + req.getBookingId()));

        // A review permanently moves a professional's public average, so it has
        // to come from the person who actually hired them. Previously any signed-in
        // caller could review any booking id, repeatedly.
        if (booking.getCustomer() == null || !booking.getCustomer().getId().equals(customerId)) {
            throw new AccessDeniedException("You can only review a job you booked.");
        }
        if (booking.getStatus() != BookingStatus.SERVICE_COMPLETED
                && booking.getStatus() != BookingStatus.COMPLETED) {
            throw new BadRequestException("You can review this job once it has been completed.");
        }
        if (reviewRepository.existsByBookingId(booking.getId())) {
            throw new BadRequestException("You have already reviewed this job.");
        }

        double rating = req.getRating() == null ? 0d : req.getRating();
        if (rating < 1d || rating > 5d) {
            throw new BadRequestException("Rating must be between 1 and 5.");
        }

        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found: " + customerId));

        Review review = new Review();
        review.setBooking(booking);
        review.setCustomer(customer);
        review.setTechnician(booking.getTechnician());
        review.setRating(req.getRating());
        review.setQualityRating(req.getQualityRating() != null ? req.getQualityRating() : req.getRating());
        review.setProfessionalismRating(req.getProfessionalismRating() != null ? req.getProfessionalismRating() : req.getRating());
        review.setPunctualityRating(req.getPunctualityRating() != null ? req.getPunctualityRating() : req.getRating());
        review.setComment(req.getComment());
        review.setServiceUsed(booking.getServiceName());

        Review saved = reviewRepository.save(review);

        // Update technician's average rating & reviewCount
        if (booking.getTechnician() != null) {
            TechnicianProfile technician = booking.getTechnician();
            int oldCount = technician.getReviewCount() == null ? 0 : technician.getReviewCount();
            double oldAvg = technician.getRating() == null ? 0.0 : technician.getRating();
            int newCount = oldCount + 1;
            // Seeded profiles start at rating 5.0 with reviewCount 0; folding that
            // placeholder into the mean would invent a review that never happened.
            double newAvg = Math.round(((oldAvg * oldCount + rating) / newCount) * 10.0) / 10.0;
            technician.setRating(newAvg);
            technician.setReviewCount(newCount);
            technicianRepository.save(technician);
        }

        return saved;
    }

    public List<Review> getTechnicianReviews(Long technicianId) {
        return reviewRepository.findByTechnicianIdOrderByCreatedAtDesc(technicianId);
    }
}
