package com.collegeproject.smarthire.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.collegeproject.smarthire.Dto.LoginRequest;
import com.collegeproject.smarthire.Dto.SignUpRequest;
import com.collegeproject.smarthire.Entity.User;
import com.collegeproject.smarthire.Repo.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void signup(SignUpRequest signUpRequest) {
        // Input validation
        if (signUpRequest.getEmail() == null || signUpRequest.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        if (signUpRequest.getPassword() == null || signUpRequest.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }
        
        // Check for duplicate email
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setDob(signUpRequest.getDob());
        user.setGender(signUpRequest.getGender());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);
    }
    
    public String login(LoginRequest loginRequest) {
        // Input validation
        if (loginRequest.getEmail() == null || loginRequest.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        if (loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return "Login Successful!";
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }
}