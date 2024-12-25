package com.finalproject.finalmajorproject.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class online_courses {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Short Intro", nullable = true)
    private String shortIntro;

    @Column(name = "Category", nullable = true)
    private String category;

    @Column(name = "Sub-Category", nullable = true)
    private String subCategory;

    @Column(name = "Course Type", nullable = true)
    private String courseType;

    @Column(name = "Language", nullable = true)
    private String language;

    @Column(name = "Subtitle Languages", nullable = true)
    private String subtitleLanguages;

    @Column(name = "Skills", nullable = true)
    private String skills;

    @Column(name = "Instructors", nullable = true)
    private String instructors;

    @Column(name = "Duration", nullable = true)
    private String duration;

    @ManyToMany(mappedBy = "enrolledCourses") 
    private Set<User_signup> enrolledUsers;
}
