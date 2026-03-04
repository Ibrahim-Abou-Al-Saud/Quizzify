package com.abouals3ood.quizzify_server.controller;

import com.abouals3ood.quizzify_server.dto.TestDTO;
import com.abouals3ood.quizzify_server.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
@CrossOrigin("*")
public class TestController {

    private final TestService testService;

    @Autowired
    public TestController(TestService testService) {
        this.testService = testService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTest(@RequestBody TestDTO testDTO) {
        try {
            return ResponseEntity.ok(testService.createTest(testDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
