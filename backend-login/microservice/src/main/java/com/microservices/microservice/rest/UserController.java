package com.microservices.microservice.rest;

import com.microservices.microservice.model.entitys.User;
import com.microservices.microservice.model.entitys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class UserController {

    // standard constructors
    @Autowired
    private final UserRepository userRepository = null;
    @Autowired
    private PasswordEncoder passwordEncoder;

    /*
    @GetMapping("/users")
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }
    */

    @PostMapping("/users")
    public void addUser(@RequestBody User user) {
        User userFinal = new User(user.getName(),user.getEmail(),user.getPassword());
        System.out.println("User added: " + userFinal.getName() + " " + userFinal.getEmail() + " " + userFinal.getPassword());
        userFinal.setPassword(passwordEncoder.encode(userFinal.getPassword()));
        userRepository.save(userFinal);
    }
    
    @DeleteMapping("/users/{id}")
    @ResponseBody
    //Solo funciona si el parametro tiene el mismo nombre que la variable
    public void removeUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
     
    @PutMapping("/users")
    public void modifyUser(@RequestBody User updatedUser) {
        System.out.println("User updated: " + updatedUser.getName() + " " + updatedUser.getEmail() + " " + updatedUser.getPassword());
        User user = userRepository.findById(updatedUser.getId()).orElse(null);
        // This should throw NullPointerException if no user is found with the ID
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        userRepository.save(user);
    }  
}