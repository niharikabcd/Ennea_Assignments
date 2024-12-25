package com.finalproject.finalmajorproject.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finalproject.finalmajorproject.model.User_signup;
import com.finalproject.finalmajorproject.model.online_courses;

import jakarta.transaction.Transactional;


@Repository
public interface User_signup_repo extends JpaRepository<User_signup,String> {
    User_signup findByEmail(String email);
    
    @Query("SELECT u.enrolledCourses FROM User_signup u WHERE u.email = :email")
    Set<online_courses> findEnrolledCoursesByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM user_courses WHERE user_email = :email AND course_id = :courseId", nativeQuery = true)
    void deleteEnrollmentByEmailAndCourseId(@Param("email") String email, @Param("courseId") Integer courseId);
}
