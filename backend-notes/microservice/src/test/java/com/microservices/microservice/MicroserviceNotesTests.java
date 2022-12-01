package com.microservices.microservice;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.microservices.microservice.rest.NoteController;

@SpringBootTest
class MicroserviceNotesTests {

    @Autowired
    private NoteController controller;

    @Test
    public void contextLoads() {
        assertThat(controller).isNotNull();
    }

}

	
