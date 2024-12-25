package com.finalproject.finalmajorproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.finalproject.finalmajorproject.dto.CourseEnrollmentDTO;
import com.finalproject.finalmajorproject.model.online_courses;

import java.util.List;
import java.util.Optional;




@Repository
public interface online_courses_repo extends JpaRepository<online_courses,Integer> {
     Optional<online_courses> findById(Integer id);

    @Query(value = "SELECT c.id AS course_id, c.title AS online_courses_title, COUNT(uc.user_id) AS enrolled_students FROM online_courses c LEFT JOIN user_courses uc ON c.id = uc.course_id GROUP BY c.id, c.title",nativeQuery = true)
    List<CourseEnrollmentDTO> fetchEnrollmentStats();
}
