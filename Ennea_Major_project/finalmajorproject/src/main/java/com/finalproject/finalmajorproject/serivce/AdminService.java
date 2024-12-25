package com.finalproject.finalmajorproject.serivce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.finalproject.finalmajorproject.JWT.JWTUtil;
import com.finalproject.finalmajorproject.model.Admin_details;
import com.finalproject.finalmajorproject.repository.Admin_details_repo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AdminService {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private Admin_details_repo admin_details_repo;

    public String verify(Admin_details user) {
        try {
            // Authenticate user credentials
            Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            if (authentication.isAuthenticated()) {
                // Fetch user's role from the database
                System.out.print("came to authentication");
                String role = admin_details_repo.findByEmail(user.getEmail()).getRole();

                // Log successful authentication
                log.info("User {} authenticated successfully with role {}", user.getEmail(), role);

                // Generate JWT token with role information (if needed)
                return jwtUtil.generateToken(user.getEmail(), role); 
            } else {
                log.warn("Authentication failed for user {}", user.getEmail());
                return "Invalid Credentials";
            }
        } catch (Exception e) {
            log.error("Exception during authentication for user {}: {}", user.getEmail(), e.getMessage());
            return "Authentication Failed";
        }
    }
}

