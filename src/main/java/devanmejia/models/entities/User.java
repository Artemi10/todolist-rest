package devanmejia.models.entities;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "users")
@JsonAutoDetect
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String login;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    @OneToMany(mappedBy = "userOwner")
    private List<Note> notes;
    private String refreshToken;

}
