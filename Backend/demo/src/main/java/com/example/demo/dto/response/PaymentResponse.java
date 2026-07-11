package com.example.demo.dto.response;

public class PaymentResponse {

    private Long id;
    private Long donorId;
    private String donorName;
    private String hospitalName;
    private double amount;
    private String note;
    private String paidAt;

    public PaymentResponse() {
    }

    public PaymentResponse(Long id, Long donorId, String donorName, String hospitalName, double amount, String note, String paidAt) {
        this.id = id;
        this.donorId = donorId;
        this.donorName = donorName;
        this.hospitalName = hospitalName;
        this.amount = amount;
        this.note = note;
        this.paidAt = paidAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDonorId() {
        return donorId;
    }

    public void setDonorId(Long donorId) {
        this.donorId = donorId;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(String paidAt) {
        this.paidAt = paidAt;
    }
}
