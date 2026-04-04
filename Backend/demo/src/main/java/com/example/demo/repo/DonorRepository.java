package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.demo.entity.Donor;

public interface DonorRepository extends JpaRepository<Donor, Long> {

    List<Donor> findByBloodGroup(String bloodGroup);

}