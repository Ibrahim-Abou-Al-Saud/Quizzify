package com.abouals3ood.quizzify_server.service.impl;

import com.abouals3ood.quizzify_server.dto.QuestionDTO;
import com.abouals3ood.quizzify_server.dto.TestDTO;
import com.abouals3ood.quizzify_server.dto.TestDetailsDTO;
import com.abouals3ood.quizzify_server.entities.Question;
import com.abouals3ood.quizzify_server.entities.Test;
import com.abouals3ood.quizzify_server.repo.QuestionRepo;
import com.abouals3ood.quizzify_server.repo.TestRepo;
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
    private final QuestionRepo questionRepo;

    @Autowired
    public TestServiceImpl(TestRepo testRepo, QuestionRepo questionRepo) {
        this.testRepo = testRepo;
        this.questionRepo = questionRepo;
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
}
