package com.localfix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "additional_charges")
public class AdditionalCharge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(nullable = false)
    private String description;

    private Integer partsCharge = 0;
    private Integer labourCharge = 0;
    private Integer total = 0;

    @Column(length = 1000)
    private String reason;

    @Column(nullable = false)
    private String status = "PENDING_APPROVAL"; // PENDING_APPROVAL, APPROVED, REJECTED

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime respondedAt;

    public AdditionalCharge() {}

    public AdditionalCharge(Booking booking, String description, Integer partsCharge, Integer labourCharge, String reason) {
        this.booking = booking;
        this.description = description;
        this.partsCharge = partsCharge != null ? partsCharge : 0;
        this.labourCharge = labourCharge != null ? labourCharge : 0;
        this.total = this.partsCharge + this.labourCharge;
        this.reason = reason;
        this.status = "PENDING_APPROVAL";
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getPartsCharge() { return partsCharge; }
    public void setPartsCharge(Integer partsCharge) { this.partsCharge = partsCharge; }

    public Integer getLabourCharge() { return labourCharge; }
    public void setLabourCharge(Integer labourCharge) { this.labourCharge = labourCharge; }

    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getRespondedAt() { return respondedAt; }
    public void setRespondedAt(LocalDateTime respondedAt) { this.respondedAt = respondedAt; }
}
