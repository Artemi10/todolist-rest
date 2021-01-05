package devanmejia.controllers;

import devanmejia.models.entities.User;
import devanmejia.services.tokens.TokensService;
import devanmejia.services.user.UserService;
import devanmejia.transfer.LogInBody;
import devanmejia.transfer.SignUpBody;
import devanmejia.models.Tokens;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin
@RequestMapping("/api/auth/**")
public class AuthenticationController {
    @Autowired
    private UserService userService;
    @Autowired
    private TokensService tokensService;

    @PostMapping("/logIn")
    public ResponseEntity<Object> logInUser(@RequestBody LogInBody logInBody){
        try {
            User user = userService.logIn(logInBody);
            Tokens tokens = tokensService.generateNewUserTokens(user);
            return new ResponseEntity<>(tokens, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/signUp")
    public ResponseEntity<Object> signUpUser(@RequestBody SignUpBody signUpBody){
        try {
            User user = userService.signUp(signUpBody);
            Tokens tokens = tokensService.generateNewUserTokens(user);
            return new ResponseEntity<>(tokens, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Object> refreshTokens(@RequestBody String refreshToken){
        try {
            Tokens tokens = tokensService.updateTokensByRefreshTokens(refreshToken);
            return new ResponseEntity<>(tokens, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logOut")
    public ResponseEntity<Object> logOut(String refreshToken){
        try {
            tokensService.deleteRefreshToken(refreshToken);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
