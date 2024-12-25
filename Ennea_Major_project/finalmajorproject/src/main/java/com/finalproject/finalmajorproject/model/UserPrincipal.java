package com.finalproject.finalmajorproject.model;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails {
    private User_signup user_signup;

    public UserPrincipal(User_signup user_signup) {
        this.user_signup= user_signup;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Dynamically assign authorities based on the user's role
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user_signup.getRole().toUpperCase()));
    }

    @Override
    public String getPassword() {
        return user_signup.getPassword();
    }

    @Override
    public String getUsername() {
        return user_signup.getEmail();
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
