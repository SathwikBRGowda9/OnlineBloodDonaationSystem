package com.example.demo.controller;

import com.example.demo.dto.request.BloodRequestMessageRequest;
import com.example.demo.entity.BloodRequestMessage;
import com.example.demo.service.BloodRequestMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/blood-request")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:8080"})
public class BloodRequestController {

    @Autowired
    private BloodRequestMessageService messageService;

    /////////////////////////////////////////////////////////
    // 🩸 SEND BLOOD REQUEST TO DONOR
    /////////////////////////////////////////////////////////
    @PostMapping("/send")
    public Map<String, Object> sendBloodRequest(@RequestBody BloodRequestMessageRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String result = messageService.sendBloodRequest(request);
            response.put("status", "success");
            response.put("message", result);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Failed to send blood request: " + e.getMessage());
        }
        
        return response;
    }

    /////////////////////////////////////////////////////////
    // 👤 GET MESSAGES FOR DONOR
    /////////////////////////////////////////////////////////
    @GetMapping("/user/{userId}")
    public Map<String, Object> getUserMessages(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<BloodRequestMessage> messages = messageService.getUserMessages(userId);
            response.put("status", "success");
            response.put("messages", messages);
            response.put("count", messages.size());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Failed to fetch messages: " + e.getMessage());
        }
        
        return response;
    }

    /////////////////////////////////////////////////////////
    // 🏥 GET MESSAGES SENT BY HOSPITAL
    /////////////////////////////////////////////////////////
    @GetMapping("/hospital/{hospitalId}")
    public Map<String, Object> getHospitalMessages(@PathVariable Long hospitalId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<BloodRequestMessage> messages = messageService.getHospitalMessages(hospitalId);
            response.put("status", "success");
            response.put("messages", messages);
            response.put("count", messages.size());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Failed to fetch hospital messages: " + e.getMessage());
        }
        
        return response;
    }

    /////////////////////////////////////////////////////////
    // 📋 GET SINGLE MESSAGE
    /////////////////////////////////////////////////////////
    @GetMapping("/{messageId}")
    public Map<String, Object> getMessageById(@PathVariable Long messageId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            BloodRequestMessage message = messageService.getMessageById(messageId);
            if (message != null) {
                response.put("status", "success");
                response.put("message", message);
            } else {
                response.put("status", "error");
                response.put("message", "Message not found");
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error fetching message: " + e.getMessage());
        }
        
        return response;
    }
}
