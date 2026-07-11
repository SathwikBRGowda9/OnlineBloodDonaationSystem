package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.demo.service.BloodRequestService;
import com.example.demo.dto.request.BloodRequestDTO;
import com.example.demo.dto.response.BloodResponseDTO;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class RequestController {

    @Autowired
    private BloodRequestService service;

    /////////////////////////////////////////////////////////
    // ✅ CREATE
    /////////////////////////////////////////////////////////
    @PostMapping
    public BloodResponseDTO create(@RequestBody BloodRequestDTO dto) {
        return service.save(dto);
    }

    /////////////////////////////////////////////////////////
    // ✅ GET ALL
    /////////////////////////////////////////////////////////
    @GetMapping
    public List<BloodResponseDTO> getAll() {
        return service.getAll();
    }

    /////////////////////////////////////////////////////////
    // 🔍 GET BY ID (OPTIONAL)
    /////////////////////////////////////////////////////////
    @GetMapping("/{id}")
    public BloodResponseDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    /////////////////////////////////////////////////////////
    // 🔥 UPDATE (EDIT)
    /////////////////////////////////////////////////////////
    @PutMapping("/{id}")
    public BloodResponseDTO update(
            @PathVariable Long id,
            @RequestBody BloodRequestDTO dto
    ) {
        return service.update(id, dto);
    }

    /////////////////////////////////////////////////////////
    // ❌ DELETE
    /////////////////////////////////////////////////////////
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Deleted Successfully";
    }
}