package com.microservices.microservice.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.microservices.microservice.model.entitys.User;
import com.microservices.microservice.model.entitys.UserRepository;
@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class UserController {

    // standard constructors
	@Autowired
    private final UserRepository userRepository = null;

    @GetMapping("/users")
    public List<User> getUsers() {
    	System.out.println(userRepository + " hijo de puta ");
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/users")
    void addUser(@RequestBody User user) {
        userRepository.save(user);
    }
    
    @DeleteMapping("/users")
    void removeUser(@RequestBody Long userID) {
        userRepository.deleteById(userID);
    }
    
    @PutMapping("/users")
    void modifyUser(@RequestBody Long userID, User updatedUser) {
        User user = userRepository.findById(userID).orElse(null);
        // This should throw NullPointerException if no user is found with the ID
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        userRepository.save(user);
    }
}
