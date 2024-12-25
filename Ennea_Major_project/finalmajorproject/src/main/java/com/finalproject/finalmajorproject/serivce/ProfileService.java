package com.finalproject.finalmajorproject.serivce;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalproject.finalmajorproject.JWT.JWTUtil;
import com.finalproject.finalmajorproject.dto.UserDetailsWithCoursesDTO;
import com.finalproject.finalmajorproject.model.User_signup;
import com.finalproject.finalmajorproject.model.online_courses;
import com.finalproject.finalmajorproject.repository.User_signup_repo;

@Service
public class ProfileService {
    @Autowired
    User_signup_repo user_signup_repo;

    @Autowired
    JWTUtil jwtUtil;

    public UserDetailsWithCoursesDTO getUserDetailsWithCourses(String token) {
        // Extract email from the JWT token
        String email = jwtUtil.extractUserName(token);
        String role = jwtUtil.extractUserRole(token);

        // Fetch the user details along with their enrolled courses
        if (role.equals("Student") && !jwtUtil.isTokenExpired(token)){
        User_signup user = user_signup_repo.findByEmail(email);
        Set<online_courses> courses=user_signup_repo.findEnrolledCoursesByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found for email: " + email);
        }
        System.out.println("came to if statement of getuserdetailswithcourses");
        // Populate the DTO with user details and enrolled courses
        UserDetailsWithCoursesDTO userDetailsWithCoursesDTO = new UserDetailsWithCoursesDTO();
        userDetailsWithCoursesDTO.setFullName(user.getFullName());
        userDetailsWithCoursesDTO.setEmail(user.getEmail());
        userDetailsWithCoursesDTO.setDiscipline(user.getDiscipline());
        userDetailsWithCoursesDTO.setCollege(user.getCollege());
        userDetailsWithCoursesDTO.setEnrolledCourses(courses);

        return userDetailsWithCoursesDTO;
    }
    else{
        System.out.println("came to else of getuserdetailswithcourse");
        UserDetailsWithCoursesDTO userDetailsWithCoursesDTO = new UserDetailsWithCoursesDTO();
        userDetailsWithCoursesDTO.setError("Invalid token or unauthorized access");
        return userDetailsWithCoursesDTO;
    }
    }
}
