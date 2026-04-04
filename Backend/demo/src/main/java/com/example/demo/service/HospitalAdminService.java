package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.HospitalAdmin;
import com.example.demo.repo.HospitalAdminRepository;
import com.example.demo.dto.request.HospitalLoginRequest;
import com.example.demo.dto.request.HospitalRegisterRequest;
import com.example.demo.dto.response.HospitalLoginResponse;

@Service
public class HospitalAdminService {

    @Autowired
    private HospitalAdminRepository repo;

    /////////////////////////////////////////////////////////
    // 📝 REGISTER
    /////////////////////////////////////////////////////////
    public String register(HospitalRegisterRequest request) {

        if (repo.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists ❌";
        }

        HospitalAdmin admin = new HospitalAdmin();
        admin.setHospitalName(request.getHospitalName());
        admin.setUsername(request.getUsername());
        admin.setPassword(request.getPassword());

        repo.save(admin);

        return "Hospital Registered Successfully ✅";
    }

    /////////////////////////////////////////////////////////
    // 🔐 LOGIN
    /////////////////////////////////////////////////////////
    public HospitalLoginResponse login(HospitalLoginRequest request) {

        HospitalAdmin admin = repo.findByUsername(request.getUsername()).orElse(null);

        HospitalLoginResponse response = new HospitalLoginResponse();

        if (admin == null) {
            response.setMessage("User not found ❌");
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
}