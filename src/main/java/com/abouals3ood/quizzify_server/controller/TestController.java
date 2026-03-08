package com.abouals3ood.quizzify_server.controller;

import com.abouals3ood.quizzify_server.dto.QuestionDTO;
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

    @PostMapping()
    public ResponseEntity<?> createTest(@RequestBody TestDTO testDTO) {
        try {
            return ResponseEntity.ok(testService.createTest(testDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/question")
    public ResponseEntity<?> createQuestion(@RequestBody QuestionDTO questionDTO) {
        try {
            return ResponseEntity.ok(testService.createQuestion(questionDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getTests() {
        try {
            return ResponseEntity.ok(testService.getTests());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllQuestionsByTestId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(testService.getAllQuestionsByTestId(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
