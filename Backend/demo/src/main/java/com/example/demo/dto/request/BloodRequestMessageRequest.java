package com.example.demo.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodRequestMessageRequest {
    private Long userId;
    private Long hospitalId;
    private String hospitalName;
    private String bloodType;
    private String urgencyLevel; // LOW, MEDIUM, HIGH, CRITICAL
    private String message;
    private String phoneNumber;
    private String email;
    private boolean sendEmail;
    private boolean sendSMS;
}
