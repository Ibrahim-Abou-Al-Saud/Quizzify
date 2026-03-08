package com.abouals3ood.quizzify_server.entities;

import com.abouals3ood.quizzify_server.dto.QuestionDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    private String answer;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    public QuestionDTO getDto() {
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setId(id);
        questionDTO.setQuestion(question);
        questionDTO.setOptionA(optionA);
        questionDTO.setOptionB(optionB);
        questionDTO.setOptionC(optionC);
        questionDTO.setOptionD(optionD);
        questionDTO.setAnswer(answer);
        return questionDTO;
    }
}
