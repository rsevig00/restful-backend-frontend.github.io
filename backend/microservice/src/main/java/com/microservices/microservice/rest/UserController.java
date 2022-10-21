package com.microservices.microservice.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservices.microservice.model.entitys.User;
import com.microservices.microservice.model.entitys.UserRepository;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class UserController {

    // standard constructors
    @Autowired
    private final UserRepository userRepository = null;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<User> getUsers() {
    	List<User> listaUsuariosCompleta =  (List<User>) userRepository.findAll();
    	for(User usuario : listaUsuariosCompleta) {
    		
    	}
    	return null;
    }

    @PostMapping("/users")
    void addUser(@RequestBody User user) {
        User userFinal = new User(user.getName(),user.getEmail(),user.getPassword());
        userFinal.setPassword(passwordEncoder.encode(userFinal.getPassword()));
        userRepository.save(userFinal);
    }
    
    @DeleteMapping("/users/{id}")
    @ResponseBody
    //Solo funciona si el parametro tiene el mismo nombre que la variable
    void removeUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
     
    @PutMapping("/users")
    void modifyUser(@RequestBody User updatedUser) {
        User user = userRepository.findById(updatedUser.getId()).orElse(null);
        // This should throw NullPointerException if no user is found with the ID
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
    
    
}