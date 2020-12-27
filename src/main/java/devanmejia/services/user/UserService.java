package devanmejia.services.user;

import devanmejia.models.entities.User;
import devanmejia.transfer.LogInBody;
import devanmejia.transfer.SignUpBody;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    String logIn(LogInBody logInBody);
    String signUp(SignUpBody signUpBody);
    User getUser(Long id);
    User getUser(String login);
    User createNewActiveUser(SignUpBody signUpBody);
}
