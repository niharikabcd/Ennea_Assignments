package com.finalproject.finalmajorproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalproject.finalmajorproject.constants.CourseConstants;
import com.finalproject.finalmajorproject.dto.CourseEnrollmentDTO;
import com.finalproject.finalmajorproject.model.online_courses;
import com.finalproject.finalmajorproject.repository.online_courses_repo;
import com.finalproject.finalmajorproject.serivce.CourseService;
import com.finalproject.finalmajorproject.utility.CourseUtil;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;







@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class course_controller {

    @Autowired
    online_courses_repo online_courses_repo;

    @Autowired
    CourseService courseService;
    
    @GetMapping("/fetchcourses")
    public List<online_courses> getAllCourses() {
        return online_courses_repo.findAll();
    }

    //post mapping to enroll in a course
    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<?> enrollCourse(@PathVariable int courseId, @RequestHeader("Authorization") String authHeader) {
    try {
        String token = authHeader.replace("Bearer ", "");
        String response = courseService.enrollcourse(courseId, token);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Enrollment failed: " + e.getMessage());
    }
}
    @DeleteMapping("/delete-enrollment/{courseId}")
    public ResponseEntity<String> deleteEnrollment(@PathVariable Integer courseId,@RequestHeader("Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        try{
            return courseService.deleteEnrollment(courseId,token);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return CourseUtil.getrResponseEntity(CourseConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR );

    }

    @PostMapping("/addCourse")
    public ResponseEntity<String> addCourse(@RequestBody online_courses course,@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        try {
            return courseService.addCourse(course,token);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return CourseUtil.getrResponseEntity(CourseConstants.SOMETHING_WENT_WRONG, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/deleteCourse/{courseId}")
    public ResponseEntity<String> deleteCourse(@PathVariable Integer courseId,@RequestHeader("Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }  
        try {
            return courseService.deleteCourse(courseId,token);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return CourseUtil.getrResponseEntity(CourseConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @PutMapping("/editCourse/{courseId}")
    public ResponseEntity<String> editCourse(@PathVariable Integer courseId, @RequestBody online_courses course,@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        try {
            return courseService.editCourse(courseId,course,token);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return CourseUtil.getrResponseEntity(CourseConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/enrollment-stats")
    public ResponseEntity<List<CourseEnrollmentDTO>> getEnrollmentStats(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        try{
        return courseService.getEnrollmentStats(token);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.noContent().build();
    }
    
}
