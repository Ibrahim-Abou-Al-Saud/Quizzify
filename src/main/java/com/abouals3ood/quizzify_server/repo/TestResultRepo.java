package com.abouals3ood.quizzify_server.repo;

import com.abouals3ood.quizzify_server.entities.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResultRepo extends JpaRepository<TestResult, Integer> {

    List<TestResult> findAllByUserId(Long userId);
}
