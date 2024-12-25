package com.finalproject.finalmajorproject.serivce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.finalproject.finalmajorproject.model.User_signup;
import com.finalproject.finalmajorproject.model.AdminPrincipal;
import com.finalproject.finalmajorproject.model.Admin_details;
import com.finalproject.finalmajorproject.model.UserPrincipal;
import com.finalproject.finalmajorproject.repository.Admin_details_repo;
import com.finalproject.finalmajorproject.repository.User_signup_repo;

@Service
public class MyUserDetailsService implements UserDetailsService{

    @Autowired
    User_signup_repo user_signup_repo;

    @Autowired
    Admin_details_repo admin_details_repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User_signup user_signup = user_signup_repo.findByEmail(email);
        Admin_details admin_details=admin_details_repo.findByEmail(email);
        if (user_signup == null && admin_details== null) {
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("user not found");
        }
        else if (user_signup==null) {
            return new AdminPrincipal(admin_details);
        }      
        return new UserPrincipal(user_signup);
    }

}
