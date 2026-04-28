package com.abouals3ood.quizzify_server.entities;

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
}
