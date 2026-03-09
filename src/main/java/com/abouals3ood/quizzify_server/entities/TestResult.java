package com.abouals3ood.quizzify_server.entities;

import com.abouals3ood.quizzify_server.dto.TestResultDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int totalQuestions;

    private int correctAnswers;

    private double percentage;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public TestResultDTO getDto() {
        TestResultDTO testResultDTO = new TestResultDTO();
        testResultDTO.setId(id);
        testResultDTO.setTotalQuestions(totalQuestions);
        testResultDTO.setCorrectAnswers(correctAnswers);
        testResultDTO.setPercentage(percentage);
        testResultDTO.setTestName(test.getTitle());
        testResultDTO.setUserName(user.getName());
        return testResultDTO;
    }
}
