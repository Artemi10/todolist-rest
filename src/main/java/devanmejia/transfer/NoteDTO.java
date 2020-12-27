package devanmejia.transfer;

import devanmejia.models.entities.Note;
import devanmejia.models.entities.NoteStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class NoteDTO {
    private Long id;
    private String content;
    private Long expirationDate;
    private NoteStatus status;

    public static NoteDTO form(Note note){
        return NoteDTO.builder()
                .id(note.getId())
                .content(note.getContent())
                .expirationDate(note.getExpirationDate().getTime())
                .status(note.getNoteStatus()).build();
    }
    
    public static List<NoteDTO> form(List<Note> notes){
        List<NoteDTO> noteDTOList = new ArrayList<>();
        notes.forEach(note -> noteDTOList.add(form(note)));
        return noteDTOList;
    }
}
