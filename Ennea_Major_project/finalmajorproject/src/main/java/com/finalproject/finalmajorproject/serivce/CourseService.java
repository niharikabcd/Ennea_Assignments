package com.finalproject.finalmajorproject.serivce;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalproject.finalmajorproject.JWT.JWTUtil;
import com.finalproject.finalmajorproject.dto.CourseEnrollmentDTO;
import com.finalproject.finalmajorproject.model.User_signup;
import com.finalproject.finalmajorproject.model.online_courses;
import com.finalproject.finalmajorproject.repository.User_signup_repo;
import com.finalproject.finalmajorproject.repository.online_courses_repo;
import com.finalproject.finalmajorproject.utility.CourseUtil;


@Service
public class CourseService {

    @Autowired
    JWTUtil jwtUtil;

    @Autowired
    User_signup_repo user_signup_repo;

    @Autowired
    online_courses_repo online_courses_repo;

    public String enrollcourse(int id, String token) {
        String username = jwtUtil.extractUserName(token);
        String role = jwtUtil.extractUserRole(token);
    
        if (role.equals("Student") && !jwtUtil.isTokenExpired(token)) {
            return processEnrollment(id, username);
        } else {
            return "Cannot Enroll: Unauthorized or Token Expired";
        }
    }
    private String processEnrollment(int courseId, String username) {
        User_signup user = user_signup_repo.findByEmail(username);
        Optional<online_courses> course = online_courses_repo.findById(courseId);
    
        if (user != null && course.isPresent()) {
            user.getEnrolledCourses().add(course.get());
            user_signup_repo.save(user);
            return "Enrolled Successfully";
        } else {
            return "Cannot Enroll: User or Course Not Found";
        }
    }
    public ResponseEntity<String> deleteEnrollment(Integer courseId,String token) {
        String username=jwtUtil.extractUserName(token);
        String role=jwtUtil.extractUserRole(token);

        if (role.equals("Student") && !jwtUtil.isTokenExpired(token)) {
            try{
                user_signup_repo.deleteEnrollmentByEmailAndCourseId(username, courseId);
                return CourseUtil.getrResponseEntity("Successfully Cancelled Enrollment", HttpStatus.OK);
            }
            catch(Exception e){
                e.printStackTrace();
            }
            return CourseUtil.getrResponseEntity("Could not Delete the enrollment", HttpStatus.BAD_REQUEST);
        } else {
            return CourseUtil.getrResponseEntity("Login as a Student to Cancel Enrollment",HttpStatus.BAD_REQUEST);
        }
    }
    public ResponseEntity<String> addCourse(online_courses course, String token) {
        String role=jwtUtil.extractUserRole(token);

        if (role.equals("Admin") && !jwtUtil.isTokenExpired(token)){
        try {
            online_courses_repo.save(course);
            return CourseUtil.getrResponseEntity("Course Added Successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return CourseUtil.getrResponseEntity("Couldn't add the course here", HttpStatus.BAD_GATEWAY);
    }
    else{
        return CourseUtil.getrResponseEntity("Only for logged in Admin", HttpStatus.BAD_REQUEST);
    }

    }
    public ResponseEntity<String> deleteCourse(Integer courseId, String token) {
        String role=jwtUtil.extractUserRole(token);
        if (role.equals("Admin") && !jwtUtil.isTokenExpired(token)){
            try {
                online_courses_repo.deleteById(courseId);
                return CourseUtil.getrResponseEntity("Successfully Deleted Course", HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return CourseUtil.getrResponseEntity("Couldn't Delete Course", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else{
            return CourseUtil.getrResponseEntity("only logged in Admins can Delete a Course", HttpStatus.BAD_REQUEST);
        }

    }
    public ResponseEntity<String> editCourse(Integer courseId, online_courses course, String token) {
        String role=jwtUtil.extractUserRole(token);
        if (role.equals("Admin") && !jwtUtil.isTokenExpired(token)){
            try{
                 online_courses existingCourse = online_courses_repo.findById(courseId)
                 .orElseThrow(() -> new RuntimeException("Course not found"));
                 BeanUtils.copyProperties(course, existingCourse);
                 online_courses_repo.save(existingCourse);
                 return CourseUtil.getrResponseEntity("Updated Successfully", HttpStatus.OK);
            }
            catch(Exception e){
                 e.printStackTrace();
            }
            return CourseUtil.getrResponseEntity("cannot edit the course", HttpStatus.BAD_REQUEST);
        }
        else{
            return CourseUtil.getrResponseEntity("only logged in Admin can edit course", HttpStatus.BAD_REQUEST);
        }
    }
        public ResponseEntity<List<CourseEnrollmentDTO>> getEnrollmentStats(String token) {
            String role=jwtUtil.extractUserRole(token);
            if (role.equals("Admin") && !jwtUtil.isTokenExpired(token)){
            List<CourseEnrollmentDTO> enrollmentStats = online_courses_repo.fetchEnrollmentStats();
            return ResponseEntity.ok(enrollmentStats);
            }
            else{
                return ResponseEntity.noContent().build();
            }
    }
}
