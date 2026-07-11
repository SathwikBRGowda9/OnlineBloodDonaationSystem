package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.demo.dto.request.PaymentRequest;
import com.example.demo.dto.response.PaymentResponse;
import com.example.demo.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class PaymentController {

    @Autowired
    private PaymentService service;

    @PostMapping
    public PaymentResponse create(@RequestBody PaymentRequest request) {
        return service.save(request);
    }

    @GetMapping
    public List<PaymentResponse> getAll(@RequestParam(required = false) String hospitalName) {
        return service.getAll(hospitalName);
    }
}
