package com.collegeproject.smarthire.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.collegeproject.smarthire.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Method to find user by email
    Optional<User> findByEmail(String email);
}