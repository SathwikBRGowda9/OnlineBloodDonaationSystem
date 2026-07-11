package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blood_request_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodRequestMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // Recipient donor
    private Long hospitalId; // Hospital sending request
    private String hospitalName;
    private String bloodType;
    private String urgencyLevel; // LOW, MEDIUM, HIGH, CRITICAL
    private String message;
    private String phoneNumber;
    private String email;
    private String status; // SENT, FAILED, DELIVERED
    private LocalDateTime createdAt;
    private LocalDateTime sentAt;
}
