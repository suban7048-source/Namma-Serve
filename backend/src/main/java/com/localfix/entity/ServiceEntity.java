package com.localfix.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class ServiceEntity {

    @Id
    private String id; // e.g. "s101"

    @Column(nullable = false)
    private String name;

    private String nameTa;

    @Column(nullable = false)
    private String categoryId;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private Integer price;

    private String priceUnit = "fixed";

    private Integer durationMinutes = 60;

    private Integer visitCharge = 199;

    public ServiceEntity() {}

    public ServiceEntity(String id, String name, String nameTa, String categoryId, String description, Integer price, Integer durationMinutes, Integer visitCharge) {
        this.id = id;
        this.name = name;
        this.nameTa = nameTa;
        this.categoryId = categoryId;
        this.description = description;
        this.price = price;
        this.durationMinutes = durationMinutes;
        this.visitCharge = visitCharge;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNameTa() { return nameTa; }
    public void setNameTa(String nameTa) { this.nameTa = nameTa; }

    public String getCategoryId() { return categoryId; }
    public void setCategoryId(String categoryId) { this.categoryId = categoryId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }

    public String getPriceUnit() { return priceUnit; }
    public void setPriceUnit(String priceUnit) { this.priceUnit = priceUnit; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public Integer getVisitCharge() { return visitCharge; }
    public void setVisitCharge(Integer visitCharge) { this.visitCharge = visitCharge; }
}
