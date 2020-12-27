package devanmejia.services.user;

import devanmejia.configuration.security.jwt.JWTProvider;
import devanmejia.models.entities.User;
import devanmejia.repositories.UserRepository;
import devanmejia.transfer.LogInBody;
import devanmejia.transfer.SignUpBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JWTProvider jwtProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String logIn(LogInBody logInBody){
        User user = getUser(logInBody.getLogin());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(logInBody.getLogin(), logInBody.getPassword()));
        return jwtProvider.createToken(logInBody.getLogin());
    }

    @Override
    public String signUp(SignUpBody signUpBody){
        Optional<User> userCandidate = userRepository.findByLogin(signUpBody.getLogin());
        if(!userCandidate.isPresent()) {
            User user = createNewActiveUser(signUpBody);
            userRepository.save(user);
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signUpBody.getLogin(), signUpBody.getPassword()));
            return jwtProvider.createToken(signUpBody.getLogin());
        }
        throw new IllegalArgumentException("User with login " + signUpBody.getLogin() + " has already been registered");
    }

    @Override
    public User getUser(Long id) {
        Optional<User> userCandidate = userRepository.findById(id);
        return userCandidate.orElseThrow( () -> new IllegalArgumentException("There is not user with id " + id));
    }

    @Override
    public User getUser(String login) {
        Optional<User> userCandidate = userRepository.findByLogin(login);
        return userCandidate.orElseThrow( () -> new IllegalArgumentException("There is not user with login " + login));
    }

    @Override
    public User createNewActiveUser(SignUpBody signUpBody) {
        return User.builder()
                .firstName(signUpBody.getFirstName())
                .lastName(signUpBody.getLastName())
                .password(passwordEncoder.encode(signUpBody.getPassword()))
                .login(signUpBody.getLogin())
                .notes(new ArrayList<>())
                .email(signUpBody.getEmail())
                .build();
    }
}
