package com.localfix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "warranties")
public class Warranty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "technician_id", nullable = false)
    private TechnicianProfile technician;

    @Column(nullable = false)
    private String serviceName;

    private Integer warrantyDays = 30;

    private LocalDate validFrom = LocalDate.now();

    private LocalDate validUntil = LocalDate.now().plusDays(30);

    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE, EXPIRED, CLAIMED

    private String claimReason;

    private String claimStatus; // PENDING, APPROVED, REJECTED

    public Warranty() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }

    public TechnicianProfile getTechnician() { return technician; }
    public void setTechnician(TechnicianProfile technician) { this.technician = technician; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public Integer getWarrantyDays() { return warrantyDays; }
    public void setWarrantyDays(Integer warrantyDays) { this.warrantyDays = warrantyDays; }

    public LocalDate getValidFrom() { return validFrom; }
    public void setValidFrom(LocalDate validFrom) { this.validFrom = validFrom; }

    public LocalDate getValidUntil() { return validUntil; }
    public void setValidUntil(LocalDate validUntil) { this.validUntil = validUntil; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getClaimReason() { return claimReason; }
    public void setClaimReason(String claimReason) { this.claimReason = claimReason; }

    public String getClaimStatus() { return claimStatus; }
    public void setClaimStatus(String claimStatus) { this.claimStatus = claimStatus; }
}
