package devanmejia.services.user;

import devanmejia.models.entities.User;
import devanmejia.transfer.LogInBody;
import devanmejia.transfer.SignUpBody;
import devanmejia.models.Tokens;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    Tokens logIn(LogInBody logInBody);
    Tokens signUp(SignUpBody signUpBody);
    User getUser(Long id);
    User getUser(String login);
    User createNewActiveUser(SignUpBody signUpBody);
    Tokens updateTokensByRefreshTokens(String refreshToken);
    void deleteRefreshToken(String refreshToken);
}
