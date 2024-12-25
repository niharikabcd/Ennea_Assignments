package com.finalproject.finalmajorproject.dto;

import java.util.Set;

import com.finalproject.finalmajorproject.model.online_courses;

import lombok.Data;

@Data
public class UserDetailsWithCoursesDTO {
    private String fullName;
    private String email;
    private String discipline;
    private String college;
    private String error;
    private Set<online_courses> enrolledCourses;
}
