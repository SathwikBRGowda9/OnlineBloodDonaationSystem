package com.example.demo.controller;

import com.example.demo.dto.request.AuthRequest;
import com.example.demo.dto.request.GoogleLoginRequest;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.entity.User;
import com.example.demo.repo.UserRepository;
import com.example.demo.service.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthController(UserRepository repo, PasswordEncoder encoder, JwtService jwtService) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        repo.save(user);

        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        User user = repo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Credentials");
        }

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody AuthRequest request) {
        User user = repo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(encoder.encode(request.getPassword()));
        repo.save(user);

        return "Password reset successfully";
    }

    @PostMapping("/google-login")
    public AuthResponse googleLogin(@RequestBody GoogleLoginRequest request) {
        User user = repo.findByGoogleId(request.getGoogleId()).orElse(null);

        if (user == null) {
            // Create new user if Google login is first time
            user = new User();
            user.setGoogleId(request.getGoogleId());
            user.setEmail(request.getEmail());
            user.setName(request.getName());
            user.setProfilePicture(request.getProfilePicture());
            user.setLoginProvider("google");
            user.setPassword(""); // No password for Google login
            repo.save(user);
        }

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
