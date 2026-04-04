package com.example.demo.dto.response;

public class DonorResponse {

    private Long id;
    private String name;
    private String bloodGroup;
    private String phone;
    private String city;

    private double latitude;
    private double longitude;

    // Constructor
    public DonorResponse(Long id, String name, String bloodGroup,
                         String phone, String city,
                         double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.bloodGroup = bloodGroup;
        this.phone = phone;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getBloodGroup() { return bloodGroup; }
    public String getPhone() { return phone; }
    public String getCity() { return city; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }
}