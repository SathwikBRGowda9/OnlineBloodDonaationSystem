package com.example.demo.dto.request;

public class BloodRequestDTO {

    private String hospitalName;
    private String patientName;
    private String bloodGroup;
    private String city;
    private String contact;

    // GETTERS & SETTERS
    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }
}