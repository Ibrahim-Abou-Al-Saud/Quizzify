package com.abouals3ood.quizzify_server.entities;

import com.abouals3ood.quizzify_server.dto.TestDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Long duration;

    public TestDTO getDto() {
        TestDTO testDTO = new TestDTO();
        testDTO.setId(id);
        testDTO.setTitle(title);
        testDTO.setDescription(description);
        testDTO.setDuration(duration);
        return testDTO;
    }
}
