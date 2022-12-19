package com.microservices.microservice.rest;

import com.microservices.microservice.model.entitys.User;
import com.microservices.microservice.model.entitys.UserRepository;
import com.microservices.microservice.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.*;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
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
    public BodyBuilder addUser(@RequestBody User user) {
        User userFinal = new User(user.getName(),user.getEmail(),user.getPassword());
        System.out.println("User added: " + userFinal.getName() + " " + userFinal.getEmail() + " " + userFinal.getPassword());
        userFinal.setPassword(passwordEncoder.encode(userFinal.getPassword()));
        userRepository.save(userFinal);
        return ResponseEntity.status(HttpStatus.OK);
    }
    
    @DeleteMapping("/users/{username}")
    @ResponseBody
    //Solo funciona si el parametro tiene el mismo nombre que la variable
    public BodyBuilder removeUser(@PathVariable String username) {
        userRepository.deleteById(userRepository.findByUsername(username).get().getId());
        return ResponseEntity.status(HttpStatus.OK);
    }
     
    @PutMapping("/users")
    public BodyBuilder modifyUser(@RequestBody User updatedUser) {
        System.out.println("User updated: " + updatedUser.getName() + " " + updatedUser.getEmail() + " " + updatedUser.getPassword());
        User user = userRepository.findById(updatedUser.getId()).orElse(null);
        // This should throw NullPointerException if no user is found with the ID
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        if (updatedUser.getPassword().length() <= 32) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
		}
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void refreshDB() {
        try {
            JwtUtils jwtUtils = new JwtUtils();
            String token = jwtUtils.generateJwtTokenService();

            final String uri = "http://backend-users:8080/users/users";
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            HttpEntity<String> entity = new HttpEntity<>("body", headers);
            //make a get request with this headers using getForObject method
            ResponseEntity<List> response = restTemplate.exchange(uri, HttpMethod.GET, entity, List.class);

            userRepository.deleteAll();
            //create a LinkedHashMap objet
            List listUsers = response.getBody();

            for (Object user : listUsers) {
                LinkedHashMap map = (LinkedHashMap) user;
                User userNew = new User(map.get("name").toString(), map.get("email").toString(), map.get("password").toString());
                userRepository.save(userNew);
            }
        } catch (Exception e) {
            System.out.println("Servicio caido: " + e);
        }
    }

    @PostMapping("/users/refresh")
    public void refreshDbFromUserService(@RequestBody List<User> users) {
        userRepository.deleteAll();
        for (User user : users) {
            userRepository.save(user);
        }
    }
}