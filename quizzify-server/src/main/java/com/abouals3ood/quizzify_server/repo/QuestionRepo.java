package com.abouals3ood.quizzify_server.repo;

import com.abouals3ood.quizzify_server.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Long> {

}
