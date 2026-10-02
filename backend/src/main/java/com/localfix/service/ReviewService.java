package com.localfix.service;

import com.localfix.dto.ReviewRequest;
import com.localfix.entity.Booking;
import com.localfix.entity.Review;
import com.localfix.entity.TechnicianProfile;
import com.localfix.entity.User;
import com.localfix.exception.ResourceNotFoundException;
import com.localfix.repository.BookingRepository;
import com.localfix.repository.ReviewRepository;
import com.localfix.repository.TechnicianProfileRepository;
import com.localfix.repository.UserRepository;
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
            int newCount = technician.getReviewCount() + 1;
            double newAvg = Math.round(((technician.getRating() * technician.getReviewCount() + req.getRating()) / newCount) * 10.0) / 10.0;
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
