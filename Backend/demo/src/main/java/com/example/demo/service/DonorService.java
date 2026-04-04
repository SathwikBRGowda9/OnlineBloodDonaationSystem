package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.example.demo.entity.Donor;
import com.example.demo.repo.DonorRepository;
import com.example.demo.dto.request.DonorRequest;
import com.example.demo.dto.response.DonorResponse;

@Service
public class DonorService {

    @Autowired
    private DonorRepository repo;

    // 🔄 Convert Request → Entity
    private Donor mapToEntity(DonorRequest req) {
        Donor d = new Donor();
        d.setName(req.getName());
        d.setBloodGroup(req.getBloodGroup());
        d.setPhone(req.getPhone());
        d.setCity(req.getCity());
        d.setLatitude(req.getLatitude());
        d.setLongitude(req.getLongitude());
        return d;
    }

    // 🔄 Convert Entity → Response
    private DonorResponse mapToResponse(Donor d) {
        return new DonorResponse(
                d.getId(),
                d.getName(),
                d.getBloodGroup(),
                d.getPhone(),
                d.getCity(),
                d.getLatitude(),
                d.getLongitude()
        );
    }

    // ✅ CREATE
    public DonorResponse save(DonorRequest req) {
        Donor donor = mapToEntity(req);
        return mapToResponse(repo.save(donor));
    }

    // ✅ GET ALL
    public List<DonorResponse> getAll() {
        return repo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ✅ GET BY ID
    public DonorResponse getById(Long id) {
        Donor d = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Donor not found"));
        return mapToResponse(d);
    }

    // ✅ UPDATE
    public DonorResponse update(Long id, DonorRequest req) {
        Donor existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        existing.setName(req.getName());
        existing.setBloodGroup(req.getBloodGroup());
        existing.setPhone(req.getPhone());
        existing.setCity(req.getCity());
        existing.setLatitude(req.getLatitude());
        existing.setLongitude(req.getLongitude());

        return mapToResponse(repo.save(existing));
    }

    // ✅ DELETE
    public void delete(Long id) {
        repo.deleteById(id);
    }

    // ✅ SEARCH
    public List<DonorResponse> search(String bloodGroup) {
        return repo.findByBloodGroup(bloodGroup)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ✅ NEARBY
    public List<DonorResponse> nearby(double lat, double lon) {
        return repo.findAll().stream()
                .filter(d -> distance(lat, lon, d.getLatitude(), d.getLongitude()) < 10)
                .map(this::mapToResponse)
                .toList();
    }

    // 📍 Distance Formula
    private double distance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat/2) * Math.sin(dLat/2)
                + Math.cos(Math.toRadians(lat1))
                * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon/2) * Math.sin(dLon/2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }
}