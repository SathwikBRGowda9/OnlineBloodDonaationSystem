package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
