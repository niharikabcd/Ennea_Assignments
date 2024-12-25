package com.finalproject.finalmajorproject.model;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class AdminPrincipal implements UserDetails {
    private Admin_details admin_details;
    
    public AdminPrincipal (Admin_details admin_details){
     this.admin_details=admin_details;   
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + admin_details.getRole().toUpperCase()));
    }

    @Override
    public String getPassword() {
        return admin_details.getPassword();
    }

    @Override
    public String getUsername() {
        return admin_details.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
