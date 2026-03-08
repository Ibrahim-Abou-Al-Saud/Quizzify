package com.abouals3ood.quizzify_server.service;

import com.abouals3ood.quizzify_server.dto.QuestionDTO;
import com.abouals3ood.quizzify_server.dto.TestDTO;
import com.abouals3ood.quizzify_server.dto.TestDetailsDTO;

import java.util.List;

public interface TestService {

    TestDTO createTest(TestDTO testDTO);
    QuestionDTO createQuestion(QuestionDTO questionDTO);
    List<TestDTO> getTests();
    TestDetailsDTO getAllQuestionsByTestId(Long id);
}
