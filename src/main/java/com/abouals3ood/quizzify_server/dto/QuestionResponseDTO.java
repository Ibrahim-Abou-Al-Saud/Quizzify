package com.abouals3ood.quizzify_server.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionResponseDTO {

    private Long questionId;

    private String selectedOption;

}
