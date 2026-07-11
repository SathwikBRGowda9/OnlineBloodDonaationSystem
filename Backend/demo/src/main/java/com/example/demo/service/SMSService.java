package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class SMSService {

    // For production, add your Twilio credentials
    private static final String TWILIO_ACCOUNT_SID = "YOUR_TWILIO_ACCOUNT_SID";
    private static final String TWILIO_AUTH_TOKEN = "YOUR_TWILIO_AUTH_TOKEN";
    private static final String TWILIO_PHONE_NUMBER = "+1234567890";

    public void sendBloodRequestSMS(String phoneNumber, String hospitalName, String bloodType, String urgencyLevel) {
        try {
            // For production implementation:
            // Twilio.init(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
            // Message message = Message.creator(
            //     new PhoneNumber(TWILIO_PHONE_NUMBER),
            //     new PhoneNumber(phoneNumber),
            //     "🩸 URGENT: " + hospitalName + " needs " + bloodType + " blood (" + urgencyLevel + "). Please contact them if you can donate.")
            //     .create();
            
            System.out.println("SMS would be sent to: " + phoneNumber);
            System.out.println("Message: Hospital " + hospitalName + " needs " + bloodType + " blood (" + urgencyLevel + ")");
            
        } catch (Exception e) {
            System.err.println("Failed to send SMS: " + e.getMessage());
        }
    }

    public void sendNotificationSMS(String phoneNumber, String message) {
        try {
            System.out.println("SMS Notification to: " + phoneNumber);
            System.out.println("Message: " + message);
        } catch (Exception e) {
            System.err.println("Failed to send SMS notification: " + e.getMessage());
        }
    }
}
