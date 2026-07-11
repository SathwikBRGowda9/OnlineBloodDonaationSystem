package com.example.demo.repo;

import com.example.demo.entity.BloodRequestMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BloodRequestMessageRepository extends JpaRepository<BloodRequestMessage, Long> {
    List<BloodRequestMessage> findByUserId(Long userId);
    List<BloodRequestMessage> findByHospitalId(Long hospitalId);
    List<BloodRequestMessage> findByStatus(String status);
}
