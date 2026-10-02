package com.localfix.dto;

public class CreateBookingRequest {

    // NOTE: gst and totalPrice are deliberately absent. They are derived in
    // BookingService from the line items; accepting them from the client let a
    // crafted request set its own total.


    private Long technicianId;
    private String providerId;
    private String providerName;

    private String serviceId;
    private String serviceName;
    private Integer servicePrice;

    private Integer visitCharge = 199;
    private Integer partsCharge = 0;
    private Integer discount = 0;

    private String scheduledDate;
    private String scheduledTime;
    private String serviceLocation;
    private String serviceArea;

    private String problemDescription;
    private Boolean isEmergency = false;
    private String notes;

    private String paymentMethod = "upi";

    private String customerName;
    private String customerPhone;
    private String customerEmail;

    public CreateBookingRequest() {}

    public Long getTechnicianId() { return technicianId; }
    public void setTechnicianId(Long technicianId) { this.technicianId = technicianId; }

    public String getProviderId() { return providerId; }
    public void setProviderId(String providerId) { this.providerId = providerId; }

    public String getProviderName() { return providerName; }
    public void setProviderName(String providerName) { this.providerName = providerName; }

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


    public Integer getDiscount() { return discount; }
    public void setDiscount(Integer discount) { this.discount = discount; }


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

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
}
