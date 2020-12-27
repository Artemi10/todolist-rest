package devanmejia.services.note;

import devanmejia.models.entities.Note;
import devanmejia.models.Timeline;
import devanmejia.models.entities.NoteStatus;
import devanmejia.transfer.NoteDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface NoteService {
    List<Note> getNotesByUserLogin(String login);
    Note getNoteById(Long id);
    List<Note> getNotesByUserLoginAndTimeline(String login, Timeline timeline);
    List<Note> getNotesByTimeline(Timeline timeline);
    List<Note> getNotesByExpirationDate(String login, Long expirationDate);
    List<Note> getNotesByDateAndStatus(String login, Long expirationDate, NoteStatus noteStatus);
    Note saveNewNote(NoteDTO noteDTO, String login);
    void deleteNote(String login, Long id);
    void updateNote(String login, NoteDTO noteDTO);
}
