package com.microservices.microservice.rest;

import com.google.gson.Gson;
import com.microservices.microservice.model.entitys.User;
import com.microservices.microservice.model.entitys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

    // standard constructors
    @Autowired
    private final UserRepository userRepository = null;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Gson gson = new Gson();

    @GetMapping("/users")
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/users")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        //check if username exists
        System.out.println(user.getName());
        if (!userRepository.findByUsername(user.getName()).isEmpty()) {
            return ResponseEntity.ok(gson.toJson("Username already exists"));
        } else if(!userRepository.findByEmail(user.getEmail()).isEmpty()){
            return ResponseEntity.ok(gson.toJson("Email already exists"));
        } else {
            User userFinal = new User(user.getName(),user.getEmail(),user.getPassword());
            userFinal.setPassword(passwordEncoder.encode(userFinal.getPassword()));
            userRepository.save(userFinal);
            return ResponseEntity.ok(gson.toJson(0));
        }
    }
    
    @DeleteMapping("/users/{id}")
    @ResponseBody
    //Solo funciona si el parametro tiene el mismo nombre que la variable
    public void removeUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
     
    @PutMapping("/users")
    public ResponseEntity<String> modifyUser(@RequestBody User updatedUser) {
        User user = userRepository.findById(updatedUser.getId()).orElse(null);
        if (!userRepository.findByUsername(updatedUser.getName()).isEmpty() && !user.getName().equals(updatedUser.getName())) {
            return ResponseEntity.ok(gson.toJson("Username already exists"));
        } else if(!userRepository.findByEmail(updatedUser.getEmail()).isEmpty() && !user.getEmail().equals(updatedUser.getEmail())){
            return ResponseEntity.ok(gson.toJson("Email already exists"));
        } else {
        	user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return ResponseEntity.ok(gson.toJson(0));
        }
    }  
}