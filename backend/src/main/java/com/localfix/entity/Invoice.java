package com.localfix.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String invoiceNumber;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    private String customerName;
    private String technicianName;
    private String serviceName;

    private Integer subtotal;
    private Integer partsCharge;
    private Integer visitCharge;
    private Integer gst;
    private Integer discount;
    private Integer total;

    private String paymentMethod;
    private String paymentStatus;

    private Integer warrantyDays;
    private String warrantyValidUntil;

    private LocalDateTime issuedAt = LocalDateTime.now();

    public Invoice() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getTechnicianName() { return technicianName; }
    public void setTechnicianName(String technicianName) { this.technicianName = technicianName; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public Integer getSubtotal() { return subtotal; }
    public void setSubtotal(Integer subtotal) { this.subtotal = subtotal; }

    public Integer getPartsCharge() { return partsCharge; }
    public void setPartsCharge(Integer partsCharge) { this.partsCharge = partsCharge; }

    public Integer getVisitCharge() { return visitCharge; }
    public void setVisitCharge(Integer visitCharge) { this.visitCharge = visitCharge; }

    public Integer getGst() { return gst; }
    public void setGst(Integer gst) { this.gst = gst; }

    public Integer getDiscount() { return discount; }
    public void setDiscount(Integer discount) { this.discount = discount; }

    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public Integer getWarrantyDays() { return warrantyDays; }
    public void setWarrantyDays(Integer warrantyDays) { this.warrantyDays = warrantyDays; }

    public String getWarrantyValidUntil() { return warrantyValidUntil; }
    public void setWarrantyValidUntil(String warrantyValidUntil) { this.warrantyValidUntil = warrantyValidUntil; }

    public LocalDateTime getIssuedAt() { return issuedAt; }
    public void setIssuedAt(LocalDateTime issuedAt) { this.issuedAt = issuedAt; }
}
