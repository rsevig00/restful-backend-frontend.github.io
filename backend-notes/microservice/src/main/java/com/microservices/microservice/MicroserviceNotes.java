package com.microservices.microservice;

import com.microservices.microservice.model.entitys.Note;
import com.microservices.microservice.model.entitys.NoteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Date;
import java.util.Optional;
import java.util.stream.Stream;

@SpringBootApplication
public class MicroserviceNotes {

    public static void main(String[] args) {
        SpringApplication.run(MicroserviceNotes.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }

    @Bean
    CommandLineRunner init(NoteRepository noteRepository) {
        return args -> {
            Stream.of("admin").forEach(name -> {
                Note note = new Note("hello", "message", new Date(2022, 5, 22));
                Optional<Note> var = noteRepository.findByTitle(name);

                if (var.isEmpty()) {
                    noteRepository.save(note);
                }
            });
            noteRepository.findAll().forEach(System.out::println);
        };
    }
    
    
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .antMatchers("/**");
    }


}
