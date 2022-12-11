package com.microservices.microservice.rest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;

import org.assertj.core.internal.bytebuddy.utility.dispatcher.JavaDispatcher.Container;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.microservices.microservice.model.entitys.User;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
public class UserControllerTest {

	// public static GenericContainer<?> cont = new
	// GenericContainer<>(DockerImageName.parse("backend-login")).withExposedPorts(8082);

	@Autowired
	UserController uc;

	@BeforeAll
	public static void setUp() {
		// cont.start();
	}

	@AfterAll
	public static void shutDown() {
		// cont.stop();
	}

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

	@Test
	public void modifyUser() {
		User modifiedUser = new User("Pepe", "pepe@pepe.com", "1234");
		modifiedUser.setId(1L);
		uc.modifyUser(modifiedUser);
		assertEquals(1, uc.getUsers().size(), "DB should have one admin user on creation");
		assertEquals("Pepe", uc.getUsers().get(0).getName(), "");
		assertEquals("pepe@pepe.com", uc.getUsers().get(0).getEmail(), "");
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Assertions.assertTrue(encoder.matches("1234", uc.getUsers().get(0).getPassword()), "");
		uc.removeUser("Pepe");
	}
}
