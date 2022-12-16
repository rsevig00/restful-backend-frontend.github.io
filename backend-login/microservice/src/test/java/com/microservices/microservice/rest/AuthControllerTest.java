package com.microservices.microservice.rest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.microservices.microservice.security.jwt.LoginRequest;

import org.springframework.security.authentication.BadCredentialsException;

@SpringBootTest
public class AuthControllerTest {

    @Autowired
    AuthController ac;
    LoginRequest lr = new LoginRequest();
     

    @Test
    public void signInOK() {
    	
    	lr.setPassword("admin");
    	lr.setUsername("admin");
        assertEquals("200 OK", ac.authenticateUser(lr).getStatusCode().toString());
    }
    
    @Test
    public void signInWrongPass() throws BadCredentialsException {
    	
    	lr.setPassword("Alojomora");
    	lr.setUsername("admin");
    	assertThrows(BadCredentialsException.class,()->ac.authenticateUser(lr));
    }
    
    @Test
    public void signInUserNotFound() throws BadCredentialsException {
    	
    	lr.setPassword("admin");
    	lr.setUsername("Schrodinger");
    	assertThrows(BadCredentialsException.class,()->ac.authenticateUser(lr));
    }
    
}