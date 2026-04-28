package com.abouals3ood.quizzify_server.service.impl;

import com.abouals3ood.quizzify_server.dto.*;
import com.abouals3ood.quizzify_server.entities.Question;
import com.abouals3ood.quizzify_server.entities.Test;
import com.abouals3ood.quizzify_server.entities.TestResult;
import com.abouals3ood.quizzify_server.entities.User;
import com.abouals3ood.quizzify_server.mapper.QuestionsMapper;
import com.abouals3ood.quizzify_server.mapper.TestMapper;
import com.abouals3ood.quizzify_server.mapper.TestResultMapper;
import com.abouals3ood.quizzify_server.repo.QuestionRepo;
import com.abouals3ood.quizzify_server.repo.TestRepo;
import com.abouals3ood.quizzify_server.repo.TestResultRepo;
import com.abouals3ood.quizzify_server.repo.UserRepo;
import com.abouals3ood.quizzify_server.service.TestService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestService {

    private final TestRepo testRepo;
    private final UserRepo userRepo;
    private final QuestionRepo questionRepo;
    private final TestResultRepo testResultRepo;
    private final TestMapper testMapper;
    private final QuestionsMapper questionsMapper;
    private final TestResultMapper testResultMapper;

    @Autowired
    public TestServiceImpl(TestRepo testRepo, QuestionRepo questionRepo, UserRepo userRepo, TestResultRepo testResultRepo,
                           TestMapper testMapper, QuestionsMapper questionsMapper, TestResultMapper testResultMapper) {
        this.testRepo = testRepo;
        this.questionRepo = questionRepo;
        this.userRepo = userRepo;
        this.testResultRepo = testResultRepo;
        this.testMapper = testMapper;
        this.questionsMapper = questionsMapper;
        this.testResultMapper = testResultMapper;
    }

    @Override
    public TestDTO createTest(TestDTO dto) {
        Test test = testMapper.toEntity(dto);
        return testMapper.toDto(testRepo.save(test));
    }

    @Override
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Test test = testRepo.findById(questionDTO.getId()).orElseThrow(() -> new EntityNotFoundException("Test not found"));

        Question question = questionsMapper.toEntity(questionDTO);
        question.setId(null);
        question.setTest(test);
        return questionsMapper.toDto(questionRepo.save(question));
    }

    public List<TestDTO> getTests() {
        return testRepo.findAll().stream().map(test -> {
            TestDTO testDTO = testMapper.toDto(test);
            testDTO.setDuration(getCalculatedDuration(test));
            return testDTO;
        }).toList();
    }

    public TestDetailsDTO getAllQuestionsByTestId(Long id) {
        Test test = testRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Test not found"));
        TestDTO testDTO = testMapper.toDto(test);
        testDTO.setDuration(getCalculatedDuration(test));
        TestDetailsDTO testDetails = new TestDetailsDTO();
        testDetails.setTestDTO(testDTO);
        testDetails.setQuestions(questionsMapper.toDtoList(test.getQuestions()));
        return testDetails;
    }

    public TestResultDTO submitTest(SubmitedTestDTO submitedTestDTO) {
        Test test = testRepo.findById(submitedTestDTO.getTestId()).orElseThrow(() -> new EntityNotFoundException("Test not found"));
        User user = userRepo.findById(submitedTestDTO.getUserId()).orElseThrow(() -> new EntityNotFoundException("User not found"));

        int correctAnswers = 0;
        for(QuestionResponseDTO response : submitedTestDTO.getResponses()) {
            Question question = questionRepo.findById(response.getQuestionId()).orElseThrow(() -> new EntityNotFoundException("Question not found"));
            if(question.getAnswer().equals(response.getSelectedOption())) {
                correctAnswers++;
            }
        }

        int totalQuestions = getQuestionCount(test);
        double percentage = totalQuestions == 0 ? 0 : (double) correctAnswers / totalQuestions * 100;

        TestResult testResult = new TestResult();
        testResult.setTest(test);
        testResult.setUser(user);
        testResult.setTotalQuestions(totalQuestions);
        testResult.setCorrectAnswers(correctAnswers);
        testResult.setPercentage(percentage);

        return testResultMapper.toDto(testResultRepo.save(testResult));
    }

    public List<TestResultDTO> getAllTestResults() {
        return testResultMapper.toDtoList(testResultRepo.findAll());
    }

    public List<TestResultDTO> getTestResultsByUserId(Long userId) {
        return testResultMapper.toDtoList(testResultRepo.findAllByUserId(userId));
    }

    public void deleteTest(Long id) {
        testRepo.deleteById(id);
    }

    private float getCalculatedDuration(Test test) {
        return test.getDuration() * getQuestionCount(test);
    }

    private int getQuestionCount(Test test) {
        return test.getQuestions() == null ? 0 : test.getQuestions().size();
    }
}
