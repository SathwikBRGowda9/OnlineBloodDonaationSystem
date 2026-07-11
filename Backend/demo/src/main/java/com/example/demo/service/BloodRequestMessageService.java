package com.example.demo.service;

import com.example.demo.dto.request.BloodRequestMessageRequest;
import com.example.demo.entity.BloodRequestMessage;
import com.example.demo.repo.BloodRequestMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BloodRequestMessageService {

    @Autowired
    private BloodRequestMessageRepository messageRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SMSService smsService;

    public String sendBloodRequest(BloodRequestMessageRequest request) {
        try {
            // Create message record
            BloodRequestMessage msg = new BloodRequestMessage();
            msg.setUserId(request.getUserId());
            msg.setHospitalId(request.getHospitalId());
            msg.setHospitalName(request.getHospitalName());
            msg.setBloodType(request.getBloodType());
            msg.setUrgencyLevel(request.getUrgencyLevel());
            msg.setMessage(request.getMessage());
            msg.setPhoneNumber(request.getPhoneNumber());
            msg.setEmail(request.getEmail());
            msg.setCreatedAt(LocalDateTime.now());
            msg.setStatus("PENDING");

            // Send email if requested
            if (request.isSendEmail() && request.getEmail() != null) {
                emailService.sendBloodRequestEmail(
                    request.getEmail(),
                    request.getHospitalName(),
                    request.getBloodType(),
                    request.getUrgencyLevel(),
                    request.getMessage()
                );
                msg.setStatus("EMAIL_SENT");
            }

            // Send SMS if requested
            if (request.isSendSMS() && request.getPhoneNumber() != null) {
                smsService.sendBloodRequestSMS(
                    request.getPhoneNumber(),
                    request.getHospitalName(),
                    request.getBloodType(),
                    request.getUrgencyLevel()
                );
                msg.setStatus("SMS_SENT");
            }

            if (request.isSendEmail() && request.isSendSMS()) {
                msg.setStatus("EMAIL_SMS_SENT");
            }

            msg.setSentAt(LocalDateTime.now());
            messageRepository.save(msg);

            return "Blood request sent successfully via " + msg.getStatus();

        } catch (Exception e) {
            return "Error sending blood request: " + e.getMessage();
        }
    }

    public List<BloodRequestMessage> getUserMessages(Long userId) {
        return messageRepository.findByUserId(userId);
    }

    public List<BloodRequestMessage> getHospitalMessages(Long hospitalId) {
        return messageRepository.findByHospitalId(hospitalId);
    }

    public BloodRequestMessage getMessageById(Long messageId) {
        return messageRepository.findById(messageId).orElse(null);
    }
}
