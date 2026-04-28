package com.abouals3ood.quizzify_server.mapper;

import com.abouals3ood.quizzify_server.dto.QuestionDTO;
import com.abouals3ood.quizzify_server.entities.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionsMapper {

    QuestionDTO toDto(Question question);

    Question toEntity(QuestionDTO questionDTO);

    List<QuestionDTO> toDtoList(List<Question> questions);
}
