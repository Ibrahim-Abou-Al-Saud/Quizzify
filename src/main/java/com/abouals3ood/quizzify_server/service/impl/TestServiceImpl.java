package com.abouals3ood.quizzify_server.service.impl;

import com.abouals3ood.quizzify_server.dto.*;
import com.abouals3ood.quizzify_server.entities.Question;
import com.abouals3ood.quizzify_server.entities.Test;
import com.abouals3ood.quizzify_server.entities.TestResult;
import com.abouals3ood.quizzify_server.entities.User;
import com.abouals3ood.quizzify_server.repo.QuestionRepo;
import com.abouals3ood.quizzify_server.repo.TestRepo;
import com.abouals3ood.quizzify_server.repo.TestResultRepo;
import com.abouals3ood.quizzify_server.repo.UserRepo;
import com.abouals3ood.quizzify_server.service.TestService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestServiceImpl implements TestService {

    private final TestRepo testRepo;
    private final UserRepo userRepo;
    private final QuestionRepo questionRepo;
    private final TestResultRepo testResultRepo;

    @Autowired
    public TestServiceImpl(TestRepo testRepo, QuestionRepo questionRepo, UserRepo userRepo, TestResultRepo testResultRepo) {
        this.testRepo = testRepo;
        this.questionRepo = questionRepo;
        this.userRepo = userRepo;
        this.testResultRepo = testResultRepo;
    }

    @Override
    public TestDTO createTest(TestDTO dto) {
        Test test = new Test();
        test.setTitle(dto.getTitle());
        test.setDescription(dto.getDescription());
        test.setDuration(dto.getDuration());
        return testRepo.save(test).getDto();
    }

    @Override
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Optional<Test> testOptional = testRepo.findById(questionDTO.getId());
        if (testOptional.isPresent()) {
            Question question = new Question();

            question.setTest(testOptional.get());
            question.setQuestion(questionDTO.getQuestion());
            question.setOptionA(questionDTO.getOptionA());
            question.setOptionB(questionDTO.getOptionB());
            question.setOptionC(questionDTO.getOptionC());
            question.setOptionD(questionDTO.getOptionD());
            question.setAnswer(questionDTO.getAnswer());
            return questionRepo.save(question).getDto();
        }
        throw new EntityNotFoundException("Test not found");
    }

    public List<TestDTO> getTests() {
        return testRepo.findAll().stream().peek(test -> test.setDuration(test.getQuestions().size() * test.getDuration())).map(Test::getDto).collect(Collectors.toList());
    }

    public TestDetailsDTO getAllQuestionsByTestId(Long id) {
        Test test = testRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Test not found"));
        TestDTO testDTO = test.getDto();
        testDTO.setDuration(test.getDuration() * test.getQuestions().size());
        TestDetailsDTO testDetails = new TestDetailsDTO();
        testDetails.setTestDTO(testDTO);
        testDetails.setQuestions(test.getQuestions().stream().map(Question::getDto).collect(Collectors.toList()));
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

        int totalQuestions = test.getQuestions().size();
        double percentage = (double) correctAnswers / totalQuestions * 100;

        TestResult testResult = new TestResult();
        testResult.setTest(test);
        testResult.setUser(user);
        testResult.setTotalQuestions(totalQuestions);
        testResult.setCorrectAnswers(correctAnswers);
        testResult.setPercentage(percentage);

        return testResultRepo.save(testResult).getDto();
    }

    public List<TestResultDTO> getAllTestResults() {
        return testResultRepo.findAll().stream().map(TestResult::getDto).collect(Collectors.toList());
    }

    public List<TestResultDTO> getTestResultsByUserId(Long userId) {
        return testResultRepo.findAllByUserId(userId).stream().map(TestResult::getDto).collect(Collectors.toList());
    }

    public void deleteTest(Long id) {
        testRepo.deleteById(id);
    }
}
