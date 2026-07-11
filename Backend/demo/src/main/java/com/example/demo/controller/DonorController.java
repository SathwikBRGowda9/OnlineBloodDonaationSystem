package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.demo.dto.request.DonorRequest;
import com.example.demo.dto.response.DonorResponse;
import com.example.demo.service.DonorService;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class DonorController {

    @Autowired
    private DonorService service;

    // ✅ CREATE
    @PostMapping
    public DonorResponse create(@RequestBody DonorRequest req) {
        return service.save(req);
    }

    // ✅ GET ALL
    @GetMapping
    public List<DonorResponse> getAll() {
        return service.getAll();
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public DonorResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public DonorResponse update(
            @PathVariable Long id,
            @RequestBody DonorRequest req) {
        return service.update(id, req);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Deleted Successfully";
    }

    // ✅ SEARCH
    @GetMapping("/search")
    public List<DonorResponse> search(@RequestParam String bloodGroup) {
        return service.search(bloodGroup);
    }

    // ✅ NEARBY
    @GetMapping("/nearby")
    public List<DonorResponse> nearby(
            @RequestParam double lat,
            @RequestParam double lon) {
        return service.nearby(lat, lon);
    }
}