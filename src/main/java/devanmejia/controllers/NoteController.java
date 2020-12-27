package devanmejia.controllers;

import devanmejia.configuration.security.jwt.JWTProvider;
import devanmejia.models.Timeline;
import devanmejia.models.entities.Note;
import devanmejia.models.entities.NoteStatus;
import devanmejia.services.note.NoteService;
import devanmejia.transfer.NoteDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/*")
public class NoteController {
    @Autowired
    private NoteService noteService;
    @Autowired
    private JWTProvider jwtProvider;


    @GetMapping("/notes/date/{firstDay}/{lastDay}")
    public ResponseEntity<Object> getAllNotes(@PathVariable Long firstDay, @PathVariable Long lastDay, HttpServletRequest request){
        try {
            String login = jwtProvider.getUserName(request);
            Timeline timeline = new Timeline(new Date(firstDay), new Date(lastDay));
            return new ResponseEntity<>(NoteDTO.form(noteService.getNotesByUserLoginAndTimeline(login, timeline)), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/notes/date/{day}")
    public ResponseEntity<Object> getAllNotes(@PathVariable Long day, HttpServletRequest request ){
        try {
            String login = jwtProvider.getUserName(request);
            return new ResponseEntity<>(NoteDTO.form(noteService.getNotesByExpirationDate(login, day)), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/notes/date/{day}/status/{status}")
    public ResponseEntity<Object> getAllNotes(@PathVariable Long day, @PathVariable Integer status, HttpServletRequest request ){
        try {
            String login = jwtProvider.getUserName(request);
            NoteStatus noteStatus = NoteStatus.values()[status];
            return new ResponseEntity<>(NoteDTO.form(noteService.getNotesByDateAndStatus(login, day, noteStatus)), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/notes/{noteId}")
    public ResponseEntity<Object> deleteNote(@PathVariable Long noteId, HttpServletRequest request ){
        try {
            String login = jwtProvider.getUserName(request);
            noteService.deleteNote(login, noteId);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/notes")
    public ResponseEntity<Object> addNote(@RequestBody NoteDTO noteDTO, HttpServletRequest request){
        try {
            String login = jwtProvider.getUserName(request);
            return new ResponseEntity<>(NoteDTO.form(noteService.saveNewNote(noteDTO, login)), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/notes")
    public ResponseEntity<Object> updateNote(@RequestBody NoteDTO noteDTO, HttpServletRequest request){
        try {
            String login = jwtProvider.getUserName(request);
            noteService.updateNote(login, noteDTO);
            List<Note> note = noteService.getNotesByUserLoginAndTimeline(login, new Timeline(new Date(noteDTO.getExpirationDate())));
            return new ResponseEntity<>(NoteDTO.form(note), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
