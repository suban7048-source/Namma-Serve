package com.localfix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "technician_id", nullable = false)
    private TechnicianProfile technician;

    @Column(nullable = false)
    private Double rating;

    private Double qualityRating;
    private Double professionalismRating;
    private Double punctualityRating;

    @Column(length = 2000)
    private String comment;

    private String serviceUsed;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Review() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }

    public TechnicianProfile getTechnician() { return technician; }
    public void setTechnician(TechnicianProfile technician) { this.technician = technician; }

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

    public String getServiceUsed() { return serviceUsed; }
    public void setServiceUsed(String serviceUsed) { this.serviceUsed = serviceUsed; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
