package com.abouals3ood.quizzify_server.dto;

import lombok.Data;

import java.util.List;

@Data
public class SubmitedTestDTO {


    private Long testId;

    private Long userId;

    private List<QuestionResponseDTO> responses;
}
