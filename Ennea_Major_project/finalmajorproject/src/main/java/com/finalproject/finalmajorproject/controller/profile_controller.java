package com.finalproject.finalmajorproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalproject.finalmajorproject.dto.UserDetailsWithCoursesDTO;
import com.finalproject.finalmajorproject.serivce.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class profile_controller {

    @Autowired
    ProfileService profileService;

    @GetMapping("/fetchprofiledetails")
    public UserDetailsWithCoursesDTO getUserDetailsWithCourses(@RequestHeader("Authorization") String token) {
        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // Fetch user details and enrolled courses
        return profileService.getUserDetailsWithCourses(token);
    }
}
