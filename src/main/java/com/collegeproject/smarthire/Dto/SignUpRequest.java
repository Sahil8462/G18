package com.collegeproject.smarthire.Dto;

import java.time.LocalDate;

public class SignUpRequest {
    private String name;
    private String email;
    private String password;
    private LocalDate dob;
    private String gender;

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public LocalDate getDob() { return dob; }
    public String getGender() { return gender; }
    
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setDob(LocalDate dob) { this.dob = dob; }
    public void setGender(String gender) { this.gender = gender; }
}