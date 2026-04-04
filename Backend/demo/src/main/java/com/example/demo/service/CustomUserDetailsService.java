package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repo.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User.UserBuilder;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository repo;

    public CustomUserDetailsService(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = repo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(user.getUsername());

        builder.password(user.getPassword());
        builder.roles(user.getRole()); // ex: "USER" or "ADMIN"

        return builder.build();
    }
}