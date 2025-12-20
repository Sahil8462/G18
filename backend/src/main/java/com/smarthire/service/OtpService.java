package com.smarthire.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();
    private final Map<String, Long> otpTimestamp = new ConcurrentHashMap<>();
    private final Random random = new Random();
    private static final long OTP_VALIDITY = 10 * 60 * 1000; // 10 minutes

    public String generateAndSendOtp(String email) {
        // Check if OTP was sent recently (rate limiting)
        Long lastSent = otpTimestamp.get(email);
        if (lastSent != null && System.currentTimeMillis() - lastSent < 60000) {
            throw new RuntimeException("Please wait before requesting another OTP");
        }
        
        String otp = String.format("%06d", random.nextInt(1000000));
        otpStorage.put(email, otp);
        otpTimestamp.put(email, System.currentTimeMillis());
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("SmartHire - Verification Code");
            message.setText("Your verification code is: " + otp + "\n\nThis code will expire in 10 minutes.");
            message.setFrom("noreply@smarthire.com");
            
            mailSender.send(message);
            return otp;
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP: " + e.getMessage());
        }
    }

    public boolean verifyOtp(String email, String otp) {
        String storedOtp = otpStorage.get(email);
        Long timestamp = otpTimestamp.get(email);
        
        if (storedOtp != null && timestamp != null && storedOtp.equals(otp)) {
            // Check if OTP is still valid
            if (System.currentTimeMillis() - timestamp <= OTP_VALIDITY) {
                otpStorage.remove(email);
                otpTimestamp.remove(email);
                return true;
            } else {
                // OTP expired
                otpStorage.remove(email);
                otpTimestamp.remove(email);
            }
        }
        return false;
    }
}