package com.finalproject.finalmajorproject.serivce;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.finalproject.finalmajorproject.constants.CourseConstants;
import com.finalproject.finalmajorproject.model.User_signup;
import com.finalproject.finalmajorproject.repository.Admin_details_repo;
import com.finalproject.finalmajorproject.repository.User_signup_repo;
import com.finalproject.finalmajorproject.utility.CourseUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class User_signup_Service {

    @Autowired
    private User_signup_repo user_signup_repo;

    @Autowired
    private Admin_details_repo admin_details_repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    // Main Signup Method for saving user data while signing up
    public ResponseEntity<String> signup(Map<String, String> requestMap) {
        log.info("Inside signup{}", requestMap); // Displays user information passed
        try {
            if (validateSignupMap(requestMap)) {
                User_signup user_signup = user_signup_repo.findByEmail(requestMap.get("email"));
                if (user_signup == null) {
                    // Save user if no conflicts
                    user_signup_repo.save(getUserFromMap(requestMap));
                    return CourseUtil.getrResponseEntity("Signup Successful", HttpStatus.OK);
                } else {
                    log.warn("Email already exists");
                    return CourseUtil.getrResponseEntity("Email Already exists", HttpStatus.BAD_REQUEST);
                }
            } else {
                return CourseUtil.getrResponseEntity(CourseConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("Exception occurred during signup: {}", e.getMessage());
        }
        return CourseUtil.getrResponseEntity(CourseConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Method for validating the request map
    private boolean validateSignupMap(Map<String, String> requestMap) {
        // Check for missing fields
        if (!requestMap.containsKey("fullname") || 
            !requestMap.containsKey("email") || 
            !requestMap.containsKey("password") || 
            !requestMap.containsKey("discipline") || 
            !requestMap.containsKey("college")) {
            log.warn("Missing required fields in request map");
            return false;
        }

        // Restrict signup for admin emails
        if (admin_details_repo.existsByEmail(requestMap.get("email"))) {
            log.warn("Signup attempt with an admin email: {}", requestMap.get("email"));
            return false;
        }

        return true;
    }

    // Method for creating a User_signup object from requestMap
    private User_signup getUserFromMap(Map<String, String> requestMap) {
        User_signup user_signup = new User_signup();
        user_signup.setFullName(requestMap.get("fullname"));
        user_signup.setEmail(requestMap.get("email"));
        user_signup.setPassword(encoder.encode(requestMap.get("password")));
        user_signup.setDiscipline(requestMap.get("discipline"));
        user_signup.setCollege(requestMap.get("college"));
        user_signup.setRole("Student"); // Default role for all signed-up users
        return user_signup;
    }
}
