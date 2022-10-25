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
public class UserControllerIntegrationTest{

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @Test
    public void testGetUser() throws Exception {
        this.mockMvc.perform(get("http://localhost/api/users")).andDo(print()).andExpect(status().isOk());
    }

    @Test
    public void testPostUser() throws Exception {
        String jsonString = new JSONObject()
                .put("username", "diego")
                .put("email", "diego@domain.es")
                .put("password", "diego")
                .toString();
        this.mockMvc.perform(post("http://localhost/api/users")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().is2xxSuccessful())
                .andReturn();
        this.mockMvc.perform(delete("http://localhost/api/users/2")).andDo(print()).andExpect(status().isOk());
    }

    @Test
    public void testModifyDeleteUser() throws Exception {
        String jsonString = new JSONObject()
                .put("id", 1)
                .put("username", "diego")
                .put("email", "diego@domain.es")
                .put("password", "diego")
                .toString();
        this.mockMvc.perform(post("http://localhost/api/users")
                        .content(jsonString)
                        .contentType(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().is2xxSuccessful())
                .andReturn();
        this.mockMvc.perform(delete("http://localhost/api/users/1")).andDo(print()).andExpect(status().isOk());
    }
}