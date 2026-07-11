package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.example.demo.entity.HospitalAdmin;

public interface HospitalAdminRepository extends JpaRepository<HospitalAdmin, Long> {

    Optional<HospitalAdmin> findByEmail(String email);
}