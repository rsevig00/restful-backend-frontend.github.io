package com.microservices.microservice.model.entitys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>{
	Optional<Note> findByTitle(String title);
}