package com.localfix.controller;

import com.localfix.dto.ApiResponse;
import com.localfix.entity.ServiceCategory;
import com.localfix.entity.ServiceEntity;
import com.localfix.service.ServiceCatalogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceCatalogService catalogService;

    public ServiceController(ServiceCatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<ServiceCategory>>> getCategories() {
        return ResponseEntity.ok(ApiResponse.success(catalogService.getAllCategories()));
    }

    @GetMapping("/categories/emergency")
    public ResponseEntity<ApiResponse<List<ServiceCategory>>> getEmergencyCategories() {
        return ResponseEntity.ok(ApiResponse.success(catalogService.getEmergencyCategories()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceEntity>>> getAllServices(
            @RequestParam(required = false) String categoryId) {
        if (categoryId != null && !categoryId.isBlank()) {
            return ResponseEntity.ok(ApiResponse.success(catalogService.getServicesByCategory(categoryId)));
        }
        return ResponseEntity.ok(ApiResponse.success(catalogService.getAllServices()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceEntity>> getServiceById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(catalogService.getServiceById(id)));
    }
}
