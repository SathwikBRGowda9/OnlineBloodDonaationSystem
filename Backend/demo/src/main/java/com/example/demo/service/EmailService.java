package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBloodRequestEmail(String toEmail, String hospitalName, String bloodType, 
                                      String urgencyLevel, String message) {
        try {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(toEmail);
            email.setFrom("blooddonation@system.com");
            email.setSubject("🩸 Urgent Blood Request - " + urgencyLevel);
            
            String emailBody = "Dear Donor,\n\n" +
                    "We have an urgent blood donation request:\n\n" +
                    "Hospital: " + hospitalName + "\n" +
                    "Blood Type Needed: " + bloodType + "\n" +
                    "Urgency Level: " + urgencyLevel + "\n\n" +
                    "Message: " + message + "\n\n" +
                    "Please contact the hospital if you can help.\n\n" +
                    "Thank you for saving lives!\n" +
                    "BloodLink System";
            
            email.setText(emailBody);
            mailSender.send(email);
            
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    public void sendNotificationEmail(String toEmail, String subject, String body) {
        try {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(toEmail);
            email.setFrom("blooddonation@system.com");
            email.setSubject(subject);
            email.setText(body);
            mailSender.send(email);
        } catch (Exception e) {
            System.err.println("Failed to send notification email: " + e.getMessage());
        }
    }
}
