package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin123";

    // 🔐 ADMIN LOGIN
    @PostMapping("/login")
    public Map<String, Object> adminLogin(@RequestBody Map<String, String> loginData) {

        String username = loginData.get("username");
        String password = loginData.get("password");

        Map<String, Object> response = new HashMap<>();

        if (ADMIN_USERNAME.equals(username) && ADMIN_PASSWORD.equals(password)) {
            response.put("status", "success");
            response.put("message", "Admin login successful");
        } else {
            response.put("status", "error");
            response.put("message", "Invalid credentials");
        }

        return response;
    }

    // 📊 DASHBOARD (Protected manually)
    @GetMapping("/dashboard")
    public String dashboard() {
        return "Welcome Admin Dashboard 🚀";
    }
}