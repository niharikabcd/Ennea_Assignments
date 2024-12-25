package com.finalproject.finalmajorproject.serivce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.finalproject.finalmajorproject.JWT.JWTUtil;
import com.finalproject.finalmajorproject.model.User_login;
import com.finalproject.finalmajorproject.repository.User_signup_repo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private User_signup_repo userSignupRepo;

    public String verify(User_login user) {
        try {
            // Authenticate user credentials
            Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            if (authentication.isAuthenticated()) {
                // Fetch user's role from the database
                String role = userSignupRepo.findByEmail(user.getEmail()).getRole();

                // Log successful authentication
                log.info("User {} authenticated successfully with role {}", user.getEmail(), role);

                // Generate JWT token with role information 
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

