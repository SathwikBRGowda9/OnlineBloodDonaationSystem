package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.HospitalAdmin;
import com.example.demo.repo.HospitalAdminRepository;
import com.example.demo.dto.request.HospitalLoginRequest;
import com.example.demo.dto.request.HospitalRegisterRequest;
import com.example.demo.dto.request.HospitalForgotPasswordRequest;
import com.example.demo.dto.response.HospitalLoginResponse;

@Service
public class HospitalAdminService {

    @Autowired
    private HospitalAdminRepository repo;

    /////////////////////////////////////////////////////////
    // 📝 REGISTER
    /////////////////////////////////////////////////////////
    public String register(HospitalRegisterRequest request) {

        if (repo.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists ❌";
        }

        HospitalAdmin admin = new HospitalAdmin();
        admin.setHospitalName(request.getHospitalName());
        admin.setEmail(request.getEmail());
        admin.setPassword(request.getPassword());

        repo.save(admin);

        return "Hospital Registered Successfully ✅";
    }

    /////////////////////////////////////////////////////////
    // 🔐 LOGIN
    /////////////////////////////////////////////////////////
    public HospitalLoginResponse login(HospitalLoginRequest request) {

        HospitalAdmin admin = repo.findByEmail(request.getEmail()).orElse(null);

        HospitalLoginResponse response = new HospitalLoginResponse();

        if (admin == null) {
            response.setMessage("Email not found ❌");
            return response;
        }

        if (admin.getPassword().equals(request.getPassword())) {
            response.setHospitalName(admin.getHospitalName());
            response.setMessage("Login Success ✅");
        } else {
            response.setMessage("Wrong Password ❌");
        }

        return response;
    }

    /////////////////////////////////////////////////////////
    // 🔄 FORGOT PASSWORD
    /////////////////////////////////////////////////////////
    public String forgotPassword(HospitalForgotPasswordRequest request) {
        HospitalAdmin admin = repo.findByEmail(request.getEmail()).orElse(null);

        if (admin == null) {
            return "Hospital email not found ❌";
        }

        if (!admin.getHospitalName().equals(request.getHospitalName())) {
            return "Hospital name does not match our records ❌";
        }

        admin.setPassword(request.getNewPassword());
        repo.save(admin);

        return "Password reset successfully ✅";
    }
}