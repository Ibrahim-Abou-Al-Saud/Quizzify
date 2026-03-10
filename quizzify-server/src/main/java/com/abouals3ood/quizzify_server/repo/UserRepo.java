package com.abouals3ood.quizzify_server.repo;

import com.abouals3ood.quizzify_server.entities.User;
import com.abouals3ood.quizzify_server.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    User findByRole(UserRole userRole);
    User findFirstByEmail(String email);
    Optional<User> findByEmail(String email);
}
