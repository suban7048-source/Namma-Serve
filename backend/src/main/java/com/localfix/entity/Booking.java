package com.localfix.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String bookingNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "technician_id")
    private TechnicianProfile technician;

    @Column(nullable = false)
    private String serviceId;

    @Column(nullable = false)
    private String serviceName;

    private Integer servicePrice = 0;
    private Integer visitCharge = 199;
    private Integer partsCharge = 0;
    private Integer gst = 0;
    private Integer discount = 0;
    private Integer totalPrice = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;

    private String scheduledDate;
    private String scheduledTime;

    @Column(length = 1000)
    private String serviceLocation;

    private String serviceArea;

    @Column(length = 2000)
    private String problemDescription;

    private Boolean isEmergency = false;

    @Column(length = 1000)
    private String notes;

    private String paymentMethod = "upi"; // upi, card, cash, wallet
    private String paymentStatus = "PENDING"; // PENDING, SUCCESS, FAILED, REFUNDED

    private String otpCode = "4829";

    private Integer warrantyDays = 30;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BookingStatusHistory> statusHistory = new ArrayList<>();

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<AdditionalCharge> additionalCharges = new ArrayList<>();

    public Booking() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBookingNumber() { return bookingNumber; }
    public void setBookingNumber(String bookingNumber) { this.bookingNumber = bookingNumber; }

    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }

    public TechnicianProfile getTechnician() { return technician; }
    public void setTechnician(TechnicianProfile technician) { this.technician = technician; }

    public String getServiceId() { return serviceId; }
    public void setServiceId(String serviceId) { this.serviceId = serviceId; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public Integer getServicePrice() { return servicePrice; }
    public void setServicePrice(Integer servicePrice) { this.servicePrice = servicePrice; }

    public Integer getVisitCharge() { return visitCharge; }
    public void setVisitCharge(Integer visitCharge) { this.visitCharge = visitCharge; }

    public Integer getPartsCharge() { return partsCharge; }
    public void setPartsCharge(Integer partsCharge) { this.partsCharge = partsCharge; }

    public Integer getGst() { return gst; }
    public void setGst(Integer gst) { this.gst = gst; }

    public Integer getDiscount() { return discount; }
    public void setDiscount(Integer discount) { this.discount = discount; }

    public Integer getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Integer totalPrice) { this.totalPrice = totalPrice; }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public String getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(String scheduledDate) { this.scheduledDate = scheduledDate; }

    public String getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(String scheduledTime) { this.scheduledTime = scheduledTime; }

    public String getServiceLocation() { return serviceLocation; }
    public void setServiceLocation(String serviceLocation) { this.serviceLocation = serviceLocation; }

    public String getServiceArea() { return serviceArea; }
    public void setServiceArea(String serviceArea) { this.serviceArea = serviceArea; }

    public String getProblemDescription() { return problemDescription; }
    public void setProblemDescription(String problemDescription) { this.problemDescription = problemDescription; }

    public Boolean getIsEmergency() { return isEmergency; }
    public void setIsEmergency(Boolean isEmergency) { this.isEmergency = isEmergency; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getOtpCode() { return otpCode; }
    public void setOtpCode(String otpCode) { this.otpCode = otpCode; }

    public Integer getWarrantyDays() { return warrantyDays; }
    public void setWarrantyDays(Integer warrantyDays) { this.warrantyDays = warrantyDays; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<BookingStatusHistory> getStatusHistory() { return statusHistory; }
    public void setStatusHistory(List<BookingStatusHistory> statusHistory) { this.statusHistory = statusHistory; }

    public List<AdditionalCharge> getAdditionalCharges() { return additionalCharges; }
    public void setAdditionalCharges(List<AdditionalCharge> additionalCharges) { this.additionalCharges = additionalCharges; }
}
