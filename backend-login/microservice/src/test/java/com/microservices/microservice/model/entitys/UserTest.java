package com.microservices.microservice.model.entitys;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.aspectj.lang.annotation.Before;
import org.assertj.core.internal.bytebuddy.utility.dispatcher.JavaDispatcher.Container;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import com.microservices.microservice.model.entitys.User;
import com.microservices.microservice.security.jwt.LoginRequest;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
public class UserTest {

	User user;
    @BeforeEach
    void setUp() {
    	user = new User("nombre","mail","pass");
    }
    

    @Test
    public void idTest() {
    	Long oldId = user.getId();
    	assertNull(oldId);
    	user.setId(1L);
    	assertTrue(user.getId().equals(1L));
    }
    
    @Test
    public void nameTest() {
    	assertEquals("nombre",user.getName());
    	user.setName("modificado");
    	assertEquals("modificado",user.getName());
    }
    
    @Test
    public void emailTest() {
    	assertEquals("mail",user.getEmail());
    	user.setEmail("modificado");
    	assertEquals("modificado",user.getEmail());
    }
    
    @Test
    public void passwordTest() {
    	assertEquals("pass",user.getPassword());
    	user.setPassword("modificado");
    	assertEquals("modificado",user.getPassword());
    }
    
}
