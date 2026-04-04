package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.entity.BloodRequest;
import com.example.demo.repo.BloodRequestRepository;
import com.example.demo.dto.request.BloodRequestDTO;
import com.example.demo.dto.response.BloodResponseDTO;

@Service
public class BloodRequestService {

    @Autowired
    private BloodRequestRepository repo;

    /////////////////////////////////////////////////////////
    // ✅ CREATE
    /////////////////////////////////////////////////////////
    public BloodResponseDTO save(BloodRequestDTO dto) {
        BloodRequest entity = new BloodRequest();

        entity.setHospitalName(dto.getHospitalName());
        entity.setPatientName(dto.getPatientName());
        entity.setBloodGroup(dto.getBloodGroup());
        entity.setCity(dto.getCity());
        entity.setContact(dto.getContact());

        BloodRequest saved = repo.save(entity);
        return mapToResponse(saved);
    }

    /////////////////////////////////////////////////////////
    // ✅ GET ALL
    /////////////////////////////////////////////////////////
    public List<BloodResponseDTO> getAll() {
        return repo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /////////////////////////////////////////////////////////
    // 🔍 GET BY ID
    /////////////////////////////////////////////////////////
    public BloodResponseDTO getById(Long id) {
        BloodRequest r = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        return mapToResponse(r);
    }

    /////////////////////////////////////////////////////////
    // 🔥 UPDATE
    /////////////////////////////////////////////////////////
    public BloodResponseDTO update(Long id, BloodRequestDTO dto) {

        BloodRequest existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        existing.setHospitalName(dto.getHospitalName());
        existing.setPatientName(dto.getPatientName());
        existing.setBloodGroup(dto.getBloodGroup());
        existing.setCity(dto.getCity());
        existing.setContact(dto.getContact());

        BloodRequest updated = repo.save(existing);
        return mapToResponse(updated);
    }

    /////////////////////////////////////////////////////////
    // ❌ DELETE
    /////////////////////////////////////////////////////////
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Request not found");
        }
        repo.deleteById(id);
    }

    /////////////////////////////////////////////////////////
    // 🔁 MAPPER
    /////////////////////////////////////////////////////////
    private BloodResponseDTO mapToResponse(BloodRequest r) {
        BloodResponseDTO dto = new BloodResponseDTO();

        dto.setId(r.getId());
        dto.setHospitalName(r.getHospitalName());
        dto.setPatientName(r.getPatientName());
        dto.setBloodGroup(r.getBloodGroup());
        dto.setCity(r.getCity());
        dto.setContact(r.getContact());

        return dto;
    }
}