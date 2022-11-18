package com.microservices.microservice.rest;

import com.microservices.microservice.model.entitys.User;
import com.microservices.microservice.model.entitys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/users")
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/users")
    public String addUser(@RequestBody User user) {
        //check if username exists
        System.out.println(user.getName());
        if (!userRepository.findByUsername(user.getName()).isEmpty()) {
            return "Username already exists";
        } else if(!userRepository.findByEmail(user.getEmail()).isEmpty()){
            return "Email already exists";
        } else {
            User userFinal = new User(user.getName(),user.getEmail(),user.getPassword());
            userFinal.setPassword(passwordEncoder.encode(userFinal.getPassword()));
            userRepository.save(userFinal);
            return "User added";
        }
    }
    
    @DeleteMapping("/users/{id}")
    @ResponseBody
    //Solo funciona si el parametro tiene el mismo nombre que la variable
    public void removeUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
     
    @PutMapping("/users")
    public void modifyUser(@RequestBody User updatedUser) {
        User user = userRepository.findById(updatedUser.getId()).orElse(null);
        // This should throw NullPointerException if no user is found with the ID
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }  
}