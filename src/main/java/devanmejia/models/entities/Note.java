package devanmejia.models.entities;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "notes")
@JsonAutoDetect
@Builder
public class Note {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;
    private String content;
    @ManyToOne
    @JoinColumn(name = "user_owner")
    private User userOwner;
    private Date creationDate;
    private Date expirationDate;
    @Enumerated(EnumType.STRING)
    private NoteStatus noteStatus;
}
