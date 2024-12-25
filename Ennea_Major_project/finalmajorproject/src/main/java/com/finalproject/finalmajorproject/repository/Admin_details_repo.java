package com.finalproject.finalmajorproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finalproject.finalmajorproject.model.Admin_details;

@Repository
public interface Admin_details_repo extends JpaRepository<Admin_details,String> {
    boolean existsByEmail(String email);

    Admin_details findByEmail(String email);

    //admin1@gmail.com password:admin1secret123
    //admin2@gmail.com password:admin2secret456
    //admin3@gmail.com password:admin3secret789
}
