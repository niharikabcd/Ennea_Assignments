package com.finalproject.finalmajorproject.model;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User_signup {
    private String fullName;
    @Id
    private String email;
    private String password;
    private String discipline;
    private String college;
    private String role;

    @ManyToMany
    @JoinTable(
        name = "user_courses", // Name of the join table
        joinColumns = @JoinColumn(name = "user_email", referencedColumnName = "email"),
        inverseJoinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id")
    )
    private Set<online_courses> enrolledCourses; // Tracks courses the user is enrolled in
}
