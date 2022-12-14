package com.microservices.microservice.rest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.microservices.microservice.model.entitys.User;
import com.microservices.microservice.model.entitys.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
public class UserControllerTest {

	@Autowired
	UserController uc;
	
	@Autowired
	UserRepository userRepository;

	@Test
	public void emptyDB() {
		assertEquals(1, uc.getUsers().size(), "DB should have one admin user on creation");
	}

	@Test
	public void addUser() {
		uc.addUser(new User("Pepe", "pepe@pepe.com", "aa11AA##"));
		assertEquals(2, uc.getUsers().size(), "DB should have one admin user on creation");
		uc.removeUser("Pepe");
	}

	@Test
	public void removeUser() {
		User defaultUser = new User("Pepe", "pepe@pepe.com", "1234");
		uc.addUser(defaultUser);
		uc.removeUser("Pepe");
		assertEquals(1, uc.getUsers().size(), "DB should have one admin user on creation");
	}

	/*@Test
	public void modifyUser() {
		User admin = userRepository.findByUsername("admin").get();
		User modifiedUser = new User("Pepe", "pepe@pepe.com", "1234");
		modifiedUser.setId(admin.getId());
		uc.modifyUser(modifiedUser);
		assertEquals(1, uc.getUsers().size(), "DB should have one admin user on creation");
		assertEquals("Pepe", uc.getUsers().get(0).getName(), "");
		assertEquals("pepe@pepe.com", uc.getUsers().get(0).getEmail(), "");
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		assertTrue(encoder.matches("1234", uc.getUsers().get(0).getPassword()), "");
		uc.modifyUser(admin);
	}*/
}
