package com.finalproject.finalmajorproject.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalproject.finalmajorproject.constants.CourseConstants;
import com.finalproject.finalmajorproject.model.Admin_details;
import com.finalproject.finalmajorproject.model.User_login;
import com.finalproject.finalmajorproject.serivce.AdminService;
import com.finalproject.finalmajorproject.serivce.UserService;
import com.finalproject.finalmajorproject.serivce.User_signup_Service;
import com.finalproject.finalmajorproject.utility.CourseUtil;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class User_signup_controller {

    @Autowired
    User_signup_Service user_signup_Service;

    @Autowired
    UserService userService;

    @Autowired
    AdminService adminService;
   
    @PostMapping("/signup")
   public ResponseEntity<String> Signup(@RequestBody(required = true) Map<String,String> requestMap){
        try{
            return user_signup_Service.signup(requestMap);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return CourseUtil.getrResponseEntity(CourseConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/login")
    public String login(@RequestBody(required = true) User_login user){
        try{
            System.out.println("came to controller try block");
            return userService.verify(user);
        }
        catch(Exception e){
            System.out.println("controller exception found");
            e.printStackTrace();
        }
        return "Invalid Credentials";
    }

    @PostMapping("/adminlogin")
    public String adminlogin(@RequestBody Admin_details admin_details) {
        try{
            return adminService.verify(admin_details);
        }
        catch(Exception e){
            System.out.println("Contoller exception for adminlogin found");
            e.printStackTrace();
        }
        return "Invalid Admin Credentials";
    }
    
    
}
