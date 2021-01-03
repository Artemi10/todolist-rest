package devanmejia.controllers;

import devanmejia.services.user.UserService;
import devanmejia.transfer.LogInBody;
import devanmejia.transfer.SignUpBody;
import devanmejia.models.Tokens;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("/api/auth/**")
public class AuthenticationController {
    @Autowired
    private UserService userService;

    @PostMapping("/logIn")
    public ResponseEntity<Object> logInUser(@RequestBody LogInBody logInBody, HttpServletResponse response){
        try {
            Tokens tokens = userService.logIn(logInBody);
            return new ResponseEntity<>(tokens, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/signUp")
    public ResponseEntity<Object> signUpUser(@RequestBody SignUpBody signUpBody){
        try {
            Tokens tokens = userService.signUp(signUpBody);
            return new ResponseEntity<>(tokens, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Object> refreshTokens(@RequestBody String refreshToken){
        try {
            Tokens tokens = userService.updateTokensByRefreshTokens(refreshToken);
            return new ResponseEntity<>(tokens, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logOut")
    public ResponseEntity<Object> logOut(String refreshToken){
        try {
            userService.deleteRefreshToken(refreshToken);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
