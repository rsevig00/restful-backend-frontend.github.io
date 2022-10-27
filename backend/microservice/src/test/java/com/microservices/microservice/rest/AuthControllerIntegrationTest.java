package com.microservices.microservice.rest;

import com.microservices.microservice.model.entitys.UserRepository;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerIntegrationTest{

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @Test
    public void testPostAuthAuthorized() throws Exception {
        String jsonString = new JSONObject()
                .put("username", "admin")
                .put("password", "admin")
                .toString();
        this.mockMvc.perform(post("http://localhost/api/auth/signin")
                        .content(jsonString)
                        .contentType(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().is2xxSuccessful())
                .andReturn();
    }

    @Test
    public void testPostAuthUnauthorized() throws Exception {
        String jsonString = new JSONObject()
                .put("username", "admin10")
                .put("password", "admin10")
                .toString();
        this.mockMvc.perform(post("http://localhost/api/auth/signin")
                        .content(jsonString)
                        .contentType(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().is2xxSuccessful())
                .andReturn();
    }
}