package com.smarthire.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class TwilioService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String fromPhoneNumber;

    private Map<String, String> otpStorage = new HashMap<>();

    public void initTwilio() {
        Twilio.init(accountSid, authToken);
    }

    public String sendOTP(String phoneNumber) {
        try {
            initTwilio();
            String otp = generateOTP();
            otpStorage.put(phoneNumber, otp);

            Message message = Message.creator(
                new PhoneNumber(phoneNumber),
                new PhoneNumber(fromPhoneNumber),
                "Your SmartHire OTP is: " + otp + ". Valid for 5 minutes."
            ).create();

            return otp;
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP: " + e.getMessage());
        }
    }

    public boolean verifyOTP(String phoneNumber, String otp) {
        String storedOtp = otpStorage.get(phoneNumber);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(phoneNumber);
            return true;
        }
        return false;
    }

    private String generateOTP() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }
}