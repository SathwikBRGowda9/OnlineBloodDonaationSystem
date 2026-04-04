package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "blood_request")
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hospital_name")
    private String hospitalName;

    @Column(name = "patient_name")
    private String patientName;

    @Column(name = "blood_group")
    private String bloodGroup;

    private String city;
    private String contact;

    // GETTERS
    public Long getId() { return id; }
    public String getHospitalName() { return hospitalName; }
    public String getPatientName() { return patientName; }
    public String getBloodGroup() { return bloodGroup; }
    public String getCity() { return city; }
    public String getContact() { return contact; }

    // SETTERS
    public void setId(Long id) { this.id = id; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public void setCity(String city) { this.city = city; }
    public void setContact(String contact) { this.contact = contact; }
}