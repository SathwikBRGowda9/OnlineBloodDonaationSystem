package com.example.demo.dto.response;

public class HospitalLoginResponse {

    private String hospitalName;
    private String message;

    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}