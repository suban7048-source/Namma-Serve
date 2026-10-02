package com.localfix.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "technician_profiles")
public class TechnicianProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String businessName;

    @Column(nullable = false)
    private String category;

    @Column(length = 1000)
    private String subCategories; // Comma-separated

    private Double rating = 5.0;

    private Integer reviewCount = 0;

    private Integer completedJobs = 0;

    private Integer startingPrice = 199;

    private String priceUnit = "fixed";

    private String location = "Velachery, Chennai";

    private Integer serviceRadiusKm = 15;

    private Boolean isVerified = false;

    private Integer yearsExperience = 3;

    private String responseTime = "15 mins";

    @Column(length = 2000)
    private String bio;

    @Column(length = 3000)
    private String about;

    private Boolean isAvailable = true;

    private Boolean emergencyAvailable = true;

    private String verificationStatus = "PENDING"; // PENDING, UNDER_REVIEW, VERIFIED, REJECTED

    private String languages = "Tamil, English";

    public TechnicianProfile() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubCategories() { return subCategories; }
    public void setSubCategories(String subCategories) { this.subCategories = subCategories; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public Integer getCompletedJobs() { return completedJobs; }
    public void setCompletedJobs(Integer completedJobs) { this.completedJobs = completedJobs; }

    public Integer getStartingPrice() { return startingPrice; }
    public void setStartingPrice(Integer startingPrice) { this.startingPrice = startingPrice; }

    public String getPriceUnit() { return priceUnit; }
    public void setPriceUnit(String priceUnit) { this.priceUnit = priceUnit; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getServiceRadiusKm() { return serviceRadiusKm; }
    public void setServiceRadiusKm(Integer serviceRadiusKm) { this.serviceRadiusKm = serviceRadiusKm; }

    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }

    public Integer getYearsExperience() { return yearsExperience; }
    public void setYearsExperience(Integer yearsExperience) { this.yearsExperience = yearsExperience; }

    public String getResponseTime() { return responseTime; }
    public void setResponseTime(String responseTime) { this.responseTime = responseTime; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }

    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }

    public Boolean getEmergencyAvailable() { return emergencyAvailable; }
    public void setEmergencyAvailable(Boolean emergencyAvailable) { this.emergencyAvailable = emergencyAvailable; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public String getLanguages() { return languages; }
    public void setLanguages(String languages) { this.languages = languages; }
}
