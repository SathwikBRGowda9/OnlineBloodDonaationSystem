package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import com.example.demo.entity.Payment;
import com.example.demo.entity.Donor;
import com.example.demo.repo.PaymentRepository;
import com.example.demo.repo.DonorRepository;
import com.example.demo.dto.request.PaymentRequest;
import com.example.demo.dto.response.PaymentResponse;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository repo;

    @Autowired
    private DonorRepository donorRepo;

    public PaymentResponse save(PaymentRequest req) {
        Donor donor = donorRepo.findById(req.getDonorId())
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        Payment payment = new Payment();
        payment.setDonorId(donor.getId());
        payment.setDonorName(donor.getName());
        payment.setHospitalName(req.getHospitalName());
        payment.setAmount(req.getAmount());
        payment.setNote(req.getNote());
        payment.setPaidAt(LocalDateTime.now());

        return mapToResponse(repo.save(payment));
    }

    public List<PaymentResponse> getAll(String hospitalName) {
        return repo.findAll().stream()
                .filter(p -> hospitalName == null || hospitalName.isBlank() || p.getHospitalName().equals(hospitalName))
                .map(this::mapToResponse)
                .toList();
    }

    private PaymentResponse mapToResponse(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getDonorId(),
                payment.getDonorName(),
                payment.getHospitalName(),
                payment.getAmount(),
                payment.getNote(),
                payment.getPaidAt().toString()
        );
    }
}
