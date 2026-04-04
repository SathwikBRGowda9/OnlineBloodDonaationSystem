package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "hospital_admin")
public class HospitalAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String hospitalName;
    private String username;
    private String password;

    public Long getId() { return id; }
    public String getHospitalName() { return hospitalName; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }

    public void setId(Long id) { this.id = id; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
}