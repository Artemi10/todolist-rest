package devanmejia.services.note;

import devanmejia.models.Timeline;
import devanmejia.models.entities.Note;
import devanmejia.models.entities.NoteStatus;
import devanmejia.models.entities.User;
import devanmejia.repositories.NoteRepository;
import devanmejia.services.user.UserService;
import devanmejia.transfer.NoteDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BasicNoteServiceImpl implements NoteService {
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private UserService userService;

    @Override
    public List<Note> getNotesByUserLogin(String login) {
        User user = userService.getUser(login);
        return noteRepository.findByUserOwner(user);
    }

    @Override
    public Note getNoteById(Long id) {
        Optional<Note> noteOptional = noteRepository.findById(id);
        return noteOptional.orElseThrow(() -> new IllegalArgumentException("There is not note with id " + id));
    }

    @Override
    public List<Note> getNotesByUserLoginAndTimeline(String login, Timeline timeline) {
        List<Note> userNotes = getNotesByUserLogin(login);
        List<Note> unexpiredUserNotes = new ArrayList<>();
        userNotes.stream().filter(note -> timeline.isDateUnexpired(note.getExpirationDate()))
                .forEach(unexpiredUserNotes::add);
        return unexpiredUserNotes;
    }

    @Override
    public List<Note> getNotesByTimeline(Timeline timeline) {
        List<Note> notes = noteRepository.findAll();
        List<Note> unexpiredUserNotes = new ArrayList<>();
        notes.stream().filter(note -> timeline.isDateUnexpired(note.getExpirationDate()))
                .forEach(unexpiredUserNotes::add);
        return unexpiredUserNotes;
    }

    @Override
    public List<Note> getNotesByExpirationDate(String login, Long expirationDate) {
        List<Note> userNotes = getNotesByUserLogin(login);
        List<Note> unexpiredUserNotes = new ArrayList<>();
        userNotes.stream().filter(note -> note.getExpirationDate().getTime() == expirationDate)
                .forEach(unexpiredUserNotes::add);
        return unexpiredUserNotes;
    }
    @Override
    public List<Note> getNotesByDateAndStatus(String login, Long expirationDate, NoteStatus noteStatus) {
        List<Note> unexpiredUserNotes = getNotesByExpirationDate(login, expirationDate);
        List<Note> result = new ArrayList<>();
        unexpiredUserNotes.stream().filter(note -> note.getNoteStatus().equals(noteStatus))
                .forEach(result::add);
        return result;
    }

    @Override
    public Note saveNewNote(NoteDTO noteDTO, String login) {
        Note note = Note.builder()
                .content(noteDTO.getContent())
                .creationDate(new Date())
                .expirationDate(new Date(noteDTO.getExpirationDate()))
                .userOwner(userService.getUser(login))
                .noteStatus(NoteStatus.ACTIVE)
                .build();
        return noteRepository.save(note);
    }



    @Override
    public void deleteNote(String login, Long id) {
        User user = userService.getUser(login);
        Note note = getNoteById(id);
        if(note.getUserOwner().equals(user)) {
            noteRepository.delete(getNoteById(id));
        }
        else{
            throw new IllegalArgumentException("There is not note with id " + id);
        }
    }

    @Override
    public void updateNote(String login, NoteDTO noteDTO) {
        User user = userService.getUser(login);
        Note note = getNoteById(noteDTO.getId());
        if(note.getUserOwner().equals(user)) {
            note.setContent(noteDTO.getContent());
            note.setNoteStatus(noteDTO.getStatus());
            noteRepository.save(note);
        }
        else{
            throw new IllegalArgumentException("There is not note with id " + noteDTO.getId());
        }
    }
}
