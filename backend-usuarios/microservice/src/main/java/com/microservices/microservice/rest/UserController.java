package com.microservices.microservice.rest;

import com.google.gson.Gson;
import com.microservices.microservice.model.entitys.User;
import com.microservices.microservice.model.entitys.UserRepository;
import com.microservices.microservice.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {

	// standard constructors
	@Autowired
	private final UserRepository userRepository = null;
	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final Gson gson = new Gson();

	private static final String loginURI = "http://backend-login:8082/auth/users";
	//private static final String loginURI = "http://localhost:8082/auth/users";
	@GetMapping("/users")
	public List<User> getUsers() {
		return (List<User>) userRepository.findAll();
	}

	@PostMapping("/users")
	public ResponseEntity<String> addUser(@RequestBody User user) {
		if (!userRepository.findByUsername(user.getName()).isEmpty()) {
			return ResponseEntity.ok(gson.toJson("Username already exists"));
		} else if (!userRepository.findByEmail(user.getEmail()).isEmpty()) {
			return ResponseEntity.ok(gson.toJson("Email already exists"));
		} else {
			User userFinal = new User(user.getName(), user.getEmail(), user.getPassword());
			User userLogged = new User(user.getName(), user.getEmail(), user.getPassword());
			userFinal.setPassword(passwordEncoder.encode(userFinal.getPassword()));
			userRepository.save(userFinal);
			// Actualizar login
			try {
				RestTemplate restTemplate = new RestTemplate();
				restTemplate.postForObject(loginURI, userLogged, User.class);
				return ResponseEntity.ok(gson.toJson(0));
			} catch (ResourceAccessException e) {
				System.out.println("Server login down");
				return ResponseEntity.ok(gson.toJson(0));
			}
		}
	}

	@DeleteMapping("/users/{username}")
	@ResponseBody
	// Solo funciona si el parametro tiene el mismo nombre que la variable
	public void removeUser(@PathVariable String username) {
		try {
			userRepository.deleteById(userRepository.findByUsername(username).get().getId());
			RestTemplate restTemplate = new RestTemplate();
			// delete user from login
			restTemplate.delete(loginURI + "/" + username);
		} catch (ResourceAccessException e) {
			System.out.println("Server login down");
		} catch (NoSuchElementException e) {
			System.out.println("Cannot find user " + username);
		}
	}

	@PutMapping("/users")
	public ResponseEntity<String> modifyUser(@RequestBody User updatedUser) {
		User user = userRepository.findById(updatedUser.getId()).orElse(null);
		if (!userRepository.findByUsername(updatedUser.getName()).isEmpty()
				&& !user.getName().equals(updatedUser.getName())) {
			return ResponseEntity.ok(gson.toJson("Username already exists"));
		} else if (!userRepository.findByEmail(updatedUser.getEmail()).isEmpty()
				&& !user.getEmail().equals(updatedUser.getEmail())) {
			return ResponseEntity.ok(gson.toJson("Email already exists"));
		} else {
			// This should throw NullPointerException if no user is found with the ID
			User pastUser = new User(user.getName(), user.getEmail(), user.getPassword());
			user.setName(updatedUser.getName());
			user.setEmail(updatedUser.getEmail());
			user.setPassword(updatedUser.getPassword());
			if (updatedUser.getPassword().length() <= 32) {
				user.setPassword(passwordEncoder.encode(user.getPassword()));
			}
			userRepository.save(user);
			// Save in login
			try {
				RestTemplate restTemplate = new RestTemplate();
				ArrayList<User> users = new ArrayList<>();
				users.add(user);
				users.add(pastUser);
				restTemplate.put(loginURI, users, User.class);
				return ResponseEntity.ok(gson.toJson(0));
			} catch (ResourceAccessException e) {
				System.out.println("Server login down");
				return ResponseEntity.ok(gson.toJson(0));
			}
		}
	}

	@EventListener(ApplicationReadyEvent.class)
	public void refreshDBLoginService() {
		try {
			// Actualizar login
			final String uri = "http://backend-login:8082/auth/users/refresh";
			//final String uri = "http://localhost:8082/auth/users/refresh";
			RestTemplate restTemplate = new RestTemplate();
			List<User> listaUsuarios = (List<User>) userRepository.findAll();
			Object result = restTemplate.postForObject(uri, listaUsuarios, User.class);
		} catch (Exception e) {
			System.out.println("Servicio caido: " + e);
		}
	}
}
