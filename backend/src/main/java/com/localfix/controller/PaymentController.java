package com.localfix.controller;

import com.localfix.dto.ApiResponse;
import com.localfix.dto.PaymentRequest;
import com.localfix.entity.Invoice;
import com.localfix.entity.Payment;
import com.localfix.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    public ResponseEntity<ApiResponse<Payment>> processPayment(@Valid @RequestBody PaymentRequest request) {
        Payment payment = paymentService.processPayment(request);
        return ResponseEntity.ok(ApiResponse.success("Payment processed successfully", payment));
    }

    @GetMapping("/invoice/{bookingId}")
    public ResponseEntity<ApiResponse<Invoice>> getInvoice(@PathVariable Long bookingId) {
        return ResponseEntity.ok(ApiResponse.success(paymentService.getInvoiceByBookingId(bookingId)));
    }
}
