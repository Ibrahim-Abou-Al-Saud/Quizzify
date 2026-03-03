package com.abouals3ood.quizzify_server.service.impl;

import com.abouals3ood.quizzify_server.entities.User;
import com.abouals3ood.quizzify_server.enums.UserRole;
import com.abouals3ood.quizzify_server.repo.UserRepo;
import com.abouals3ood.quizzify_server.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    @Autowired
    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @PostConstruct
    private void createAdminUser() {
        User optionalUser = userRepo.findByRole(UserRole.ADMIN);
        if (optionalUser == null) {
            User user = new User();
            user.setName("Admin");
            user.setEmail("admin@gmail.com");
            user.setPassword("admin");
            user.setRole(UserRole.ADMIN);
            userRepo.save(user);
        }
    }

    public Boolean hasUserWithEmail(String email) {
        return userRepo.findFirstByEmail(email) != null;
    }

    public User createUser(User user) {
        user.setRole(UserRole.USER);
        return userRepo.save(user);
    }

    public User login(User user) {
        Optional<User> optionalUser = userRepo.findByEmail(user.getEmail());
        if (optionalUser.isPresent() && user.getPassword().equals(optionalUser.get().getPassword())) {
            return optionalUser.get();
        }
        return null;
    }
}
