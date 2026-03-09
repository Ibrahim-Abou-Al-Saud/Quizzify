package com.abouals3ood.quizzify_server.service;

import com.abouals3ood.quizzify_server.dto.*;

import java.util.List;

public interface TestService {

    TestDTO createTest(TestDTO testDTO);
    QuestionDTO createQuestion(QuestionDTO questionDTO);
    List<TestDTO> getTests();
    TestDetailsDTO getAllQuestionsByTestId(Long id);
    TestResultDTO submitTest(SubmitedTestDTO submitedTestDTO);
    List<TestResultDTO> getAllTestResults();
    List<TestResultDTO> getTestResultsByUserId(Long userId);
    void deleteTest(Long id);
}
