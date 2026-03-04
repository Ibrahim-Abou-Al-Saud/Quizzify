package com.abouals3ood.quizzify_server.service.impl;

import com.abouals3ood.quizzify_server.dto.TestDTO;
import com.abouals3ood.quizzify_server.entities.Test;
import com.abouals3ood.quizzify_server.repo.TestRepo;
import com.abouals3ood.quizzify_server.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestServiceImpl implements TestService {

    private final TestRepo testRepo;

    @Autowired
    public TestServiceImpl(TestRepo testRepo) {
        this.testRepo = testRepo;
    }

    @Override
    public TestDTO createTest(TestDTO dto) {
        Test test = new Test();
        test.setTitle(dto.getTitle());
        test.setDescription(dto.getDescription());
        test.setDuration(dto.getDuration());
        return testRepo.save(test).getDto();
    }
}
