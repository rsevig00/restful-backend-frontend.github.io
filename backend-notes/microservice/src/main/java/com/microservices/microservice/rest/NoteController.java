package com.microservices.microservice.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.microservices.microservice.model.entitys.Note;
import com.microservices.microservice.model.entitys.NoteRepository;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class NoteController {

    // standard constructors
    @Autowired
    private final NoteRepository noteRepository = null;

    @GetMapping("/notes")
    public List<Note> getNotes() {
        return (List<Note>) noteRepository.findAll();
    }

    @PostMapping("/notes")
    public void addNote(@RequestBody Note note) {
        Note noteFinal = new Note(note.getTitle(),note.getBody(),note.getDate());
        noteRepository.save(noteFinal);
    }
    
    @DeleteMapping("/notes/{id}")
    @ResponseBody
    //Solo funciona si el parametro tiene el mismo nombre que la variable
    public void removeNote(@PathVariable Long id) {
        noteRepository.deleteById(id);
    }
     
    @PutMapping("/notes")
    public void modifyNote(@RequestBody Note updatedNote) {
        Note note = noteRepository.findById(updatedNote.getId()).orElse(null);
        // This should throw NullPointerException if no user is found with the ID
        note.setTitle(updatedNote.getTitle());
        note.setBody(updatedNote.getBody());
        note.setDate(updatedNote.getDate());
        noteRepository.save(note);
    }  
}