package com.collegeproject.smarthire.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collegeproject.smarthire.Dto.LoginRequest;
import com.collegeproject.smarthire.Dto.SignUpRequest;
import com.collegeproject.smarthire.Service.AuthService;


@RestController
@RequestMapping("/api/auth") // Base URL for all auth APIs
public class AuthController {

     @Autowired
    private AuthService authService; // Inject AuthService

    // Signup API endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignUpRequest signUpRequest) {
        try {
            authService.signup(signUpRequest);
            return ResponseEntity.ok("User registered successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            String result = authService.login(loginRequest);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
