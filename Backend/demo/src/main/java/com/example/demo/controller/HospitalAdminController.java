package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.HospitalAdminService;
import com.example.demo.dto.request.HospitalLoginRequest;
import com.example.demo.dto.request.HospitalRegisterRequest;
import com.example.demo.dto.response.HospitalLoginResponse;

@RestController
@RequestMapping("/api/hospital")
@CrossOrigin(origins = "http://localhost:5173")
public class HospitalAdminController {

    @Autowired
    private HospitalAdminService service;

    /////////////////////////////////////////////////////////
    // 📝 REGISTER
    /////////////////////////////////////////////////////////
    @PostMapping("/register")
    public String register(@RequestBody HospitalRegisterRequest request) {
        return service.register(request);
    }

    /////////////////////////////////////////////////////////
    // 🔐 LOGIN
    /////////////////////////////////////////////////////////
    @PostMapping("/login")
    public HospitalLoginResponse login(@RequestBody HospitalLoginRequest request) {
        return service.login(request);
    }
}