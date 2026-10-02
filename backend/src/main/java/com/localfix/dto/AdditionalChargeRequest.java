package com.localfix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AdditionalChargeRequest {

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Parts charge is required")
    private Integer partsCharge;

    @NotNull(message = "Labour charge is required")
    private Integer labourCharge;

    @NotBlank(message = "Reason is required")
    private String reason;

    public AdditionalChargeRequest() {}

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getPartsCharge() { return partsCharge; }
    public void setPartsCharge(Integer partsCharge) { this.partsCharge = partsCharge; }

    public Integer getLabourCharge() { return labourCharge; }
    public void setLabourCharge(Integer labourCharge) { this.labourCharge = labourCharge; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
