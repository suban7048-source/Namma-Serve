package com.localfix.repository;

import com.localfix.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByCustomerId(Long customerId);
    List<Complaint> findByTechnicianId(Long technicianId);
    List<Complaint> findByStatus(String status);
}
