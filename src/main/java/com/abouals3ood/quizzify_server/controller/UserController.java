package com.abouals3ood.quizzify_server.controller;

import com.abouals3ood.quizzify_server.entities.User;
import com.abouals3ood.quizzify_server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        if (userService.hasUserWithEmail(user.getEmail())) {
            return new ResponseEntity<>("User Already Exists", HttpStatus.NOT_ACCEPTABLE);
        }

        User createdUser = userService.createUser(user);
        if (createdUser == null) {
            return new ResponseEntity<>("User not created, Try again later.", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedInUser = userService.login(user);
        if (loggedInUser == null) {
            return new ResponseEntity<>("Invalid Credentials", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
    }
}
