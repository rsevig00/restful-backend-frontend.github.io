package com.microservices.microservice;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import com.microservices.microservice.model.entitys.User;
import com.microservices.microservice.rest.UserController;


class MicroserviceApplicationTests {
	
	UserController uc;
	
	@BeforeAll
	public void setUp() {
		uc = new UserController();
	}

	@Test
	public void emptyDB() {
		assertEquals(1, uc.getUsers().size(), "DB should have one admin user on creation");
	}
	
	@Test
	public void addUser() {
		uc.addUser(new User("Pepe", "pepe@pepe.com", "1234"));
		assertEquals(2, uc.getUsers().size(), "DB should have one admin user on creation");
	}
	
	@Test
	public void removeUser() {
		uc.removeUser(1L);
		assertEquals(0, uc.getUsers().size(), "DB should have one admin user on creation");
	}
	
	@Test
	public void modifyUser() {
		User modifiedUser = new User("Pepe", "pepe@pepe.com", "1234");
		modifiedUser.setId(1L);
		uc.modifyUser(modifiedUser);
		assertEquals(1, uc.getUsers().size(), "DB should have one admin user on creation");
		assertEquals("Pepe", uc.getUsers().get(1).getName(), "");
		assertEquals("pepe@pepe.com", uc.getUsers().get(1).getEmail(), "");
		assertEquals("1234", uc.getUsers().get(1).getPassword(), "");
	}
}

	
