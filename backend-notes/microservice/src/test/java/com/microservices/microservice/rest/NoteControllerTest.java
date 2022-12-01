package com.microservices.microservice.rest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;

import org.assertj.core.internal.bytebuddy.utility.dispatcher.JavaDispatcher.Container;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.microservices.microservice.model.entitys.Note;
import com.microservices.microservice.rest.NoteController;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
public class NoteControllerTest {

    @Autowired
    NoteController uc;

    @Test
    public void emptyDB() {
        assertEquals(0, uc.getNotes().size(), "DB should't have notes on creation");
    }

    @Test
    public void addUser() {
        Date fecha= new Date(2001, 1, 1);
        uc.addNote(new Note("Titulo", "Cuerpo", fecha));
        assertEquals(1, uc.getNotes().size());
        assertEquals("Titulo",uc.getNotes().get(0).getTitle());
        assertEquals("Cuerpo",uc.getNotes().get(0).getBody());
        assertEquals(fecha,uc.getNotes().get(0).getDate());
        uc.removeNote(uc.getNotes().get(0).getId());
    }

    @Test
    public void removeUser() {
        Date fecha= new Date(2001, 1, 1);
        uc.addNote(new Note("Titulo", "Cuerpo", fecha));
        assertEquals(1, uc.getNotes().size());
        uc.removeNote(uc.getNotes().get(0).getId());
        assertEquals(0, uc.getNotes().size());
    }

    @Test
    public void modifyUser() {
        Date fecha= new Date(2001, 1, 1);
        uc.addNote(new Note("Titulo", "Cuerpo", fecha));
        assertEquals("Titulo",uc.getNotes().get(0).getTitle());
        assertEquals("Cuerpo",uc.getNotes().get(0).getBody());
        assertEquals(fecha,uc.getNotes().get(0).getDate());

        Date fecha2= new Date(2002, 2, 2);
        Note modificada = new Note("Titulo Modificado", "Cuerpo Modificado", fecha2);
        modificada.setId(uc.getNotes().get(0).getId());
        uc.modifyNote(modificada);
        assertEquals(1, uc.getNotes().size());
        assertEquals("Titulo Modificado",uc.getNotes().get(0).getTitle());
        assertEquals("Cuerpo Modificado",uc.getNotes().get(0).getBody());
        assertEquals(fecha2,uc.getNotes().get(0).getDate());
        uc.removeNote(uc.getNotes().get(0).getId());
        assertEquals(0, uc.getNotes().size());
    }
}