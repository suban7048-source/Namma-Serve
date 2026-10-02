package com.localfix.dto;

public class AdminDashboardStatsDto {

    private long totalCustomers;
    private long totalTechnicians;
    private long verifiedTechnicians;
    private long pendingTechnicians;
    private long totalBookings;
    private long completedBookings;
    private long cancelledBookings;
    private long totalRevenue;
    private long platformCommission; // 15% commission
    private long openComplaints;

    public AdminDashboardStatsDto() {}

    public long getTotalCustomers() { return totalCustomers; }
    public void setTotalCustomers(long totalCustomers) { this.totalCustomers = totalCustomers; }

    public long getTotalTechnicians() { return totalTechnicians; }
    public void setTotalTechnicians(long totalTechnicians) { this.totalTechnicians = totalTechnicians; }

    public long getVerifiedTechnicians() { return verifiedTechnicians; }
    public void setVerifiedTechnicians(long verifiedTechnicians) { this.verifiedTechnicians = verifiedTechnicians; }

    public long getPendingTechnicians() { return pendingTechnicians; }
    public void setPendingTechnicians(long pendingTechnicians) { this.pendingTechnicians = pendingTechnicians; }

    public long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }

    public long getCompletedBookings() { return completedBookings; }
    public void setCompletedBookings(long completedBookings) { this.completedBookings = completedBookings; }

    public long getCancelledBookings() { return cancelledBookings; }
    public void setCancelledBookings(long cancelledBookings) { this.cancelledBookings = cancelledBookings; }

    public long getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(long totalRevenue) { this.totalRevenue = totalRevenue; }

    public long getPlatformCommission() { return platformCommission; }
    public void setPlatformCommission(long platformCommission) { this.platformCommission = platformCommission; }

    public long getOpenComplaints() { return openComplaints; }
    public void setOpenComplaints(long openComplaints) { this.openComplaints = openComplaints; }
}
