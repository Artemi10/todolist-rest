package devanmejia.repositories;

import devanmejia.models.entities.Note;
import devanmejia.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserOwner(User user);
}
