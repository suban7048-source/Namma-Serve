package com.localfix.service;

import com.localfix.entity.ServiceCategory;
import com.localfix.entity.ServiceEntity;
import com.localfix.exception.ResourceNotFoundException;
import com.localfix.repository.ServiceCategoryRepository;
import com.localfix.repository.ServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceCatalogService {

    private final ServiceCategoryRepository categoryRepository;
    private final ServiceRepository serviceRepository;

    public ServiceCatalogService(ServiceCategoryRepository categoryRepository, ServiceRepository serviceRepository) {
        this.categoryRepository = categoryRepository;
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<ServiceCategory> getEmergencyCategories() {
        return categoryRepository.findByIsEmergencyTrue();
    }

    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    public List<ServiceEntity> getServicesByCategory(String categoryId) {
        return serviceRepository.findByCategoryId(categoryId);
    }

    public ServiceEntity getServiceById(String id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
    }
}
