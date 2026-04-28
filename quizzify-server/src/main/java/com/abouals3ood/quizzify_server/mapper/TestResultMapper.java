package com.abouals3ood.quizzify_server.mapper;

import com.abouals3ood.quizzify_server.dto.TestResultDTO;
import com.abouals3ood.quizzify_server.entities.TestResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TestResultMapper {

    @Mapping(target = "testName", source = "test.title")
    @Mapping(target = "userName", source = "user.name")
    TestResultDTO toDto(TestResult testResult);

    @Mapping(target = "test", ignore = true)
    @Mapping(target = "user", ignore = true)
    TestResult toEntity(TestResultDTO testResultDTO);

    List<TestResultDTO> toDtoList(List<TestResult> testResults);
}
