package com.abouals3ood.quizzify_server.mapper;

import com.abouals3ood.quizzify_server.dto.TestDTO;
import com.abouals3ood.quizzify_server.entities.Test;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TestMapper {

    TestDTO toDto(Test test);

    Test toEntity(TestDTO testDTO);

    List<TestDTO> toDtoList(List<Test> tests);
}
