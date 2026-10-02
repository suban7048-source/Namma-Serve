package com.localfix.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "service_categories")
public class ServiceCategory {

    @Id
    private String id; // e.g. "ac", "electrical"

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String nameTa;

    private String iconName;

    private Integer count = 0;

    @Column(length = 1000)
    private String description;

    private String color;

    private Boolean isEmergency = false;

    public ServiceCategory() {}

    public ServiceCategory(String id, String name, String nameTa, String iconName, Integer count, String description, String color, Boolean isEmergency) {
        this.id = id;
        this.name = name;
        this.nameTa = nameTa;
        this.iconName = iconName;
        this.count = count;
        this.description = description;
        this.color = color;
        this.isEmergency = isEmergency;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNameTa() { return nameTa; }
    public void setNameTa(String nameTa) { this.nameTa = nameTa; }

    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }

    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public Boolean getIsEmergency() { return isEmergency; }
    public void setIsEmergency(Boolean isEmergency) { this.isEmergency = isEmergency; }
}
