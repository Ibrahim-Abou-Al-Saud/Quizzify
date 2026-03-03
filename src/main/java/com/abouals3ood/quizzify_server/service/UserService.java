package com.abouals3ood.quizzify_server.service;

import com.abouals3ood.quizzify_server.entities.User;

import java.util.Optional;

public interface UserService {

    Boolean hasUserWithEmail(String email);
    User createUser(User user);
    User login(User user);
}
