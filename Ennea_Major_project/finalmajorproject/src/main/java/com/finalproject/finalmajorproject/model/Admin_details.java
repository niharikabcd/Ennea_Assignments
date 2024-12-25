package com.finalproject.finalmajorproject.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admin_details {

    @Id
    private String email;
    private String password;
    private String role="Admin";
 
}
