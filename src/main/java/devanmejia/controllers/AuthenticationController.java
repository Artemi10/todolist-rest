package devanmejia.controllers;

import devanmejia.configuration.security.jwt.JWTProvider;
import devanmejia.models.RefreshTokens;
import devanmejia.services.user.UserService;
import devanmejia.transfer.LogInBody;
import devanmejia.transfer.SignUpBody;
import devanmejia.transfer.TokensDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("/api/auth/**")
public class AuthenticationController {
    @Autowired
    private UserService userService;
    @Autowired
    private RefreshTokens refreshTokens;
    @Autowired
    private JWTProvider jwtProvider;

    @PostMapping("/logIn")
    public ResponseEntity<Object> logInUser(@RequestBody LogInBody logInBody, HttpServletResponse response){
        try {
            String accessToken = userService.logIn(logInBody);
            String refreshToken = refreshTokens.generateNewRefreshToken(logInBody.getLogin());
            return new ResponseEntity<>(new TokensDTO(accessToken, refreshToken), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/signUp")
    public ResponseEntity<Object> signUpUser(@RequestBody SignUpBody signUpBody){
        try {
            String accessToken = userService.signUp(signUpBody);
            String refreshToken = refreshTokens.generateNewRefreshToken(signUpBody.getLogin());
            return new ResponseEntity<>(new TokensDTO(accessToken, refreshToken), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Object> refreshTokens(@RequestBody String refreshToken){
        try {
            String accessToken = jwtProvider.createToken(refreshTokens.getLoginByRefreshToken(refreshToken));
            String newRefreshToken = refreshTokens.generateNewRefreshTokenByOldValue(refreshToken);
            return new ResponseEntity<>(new TokensDTO(accessToken, newRefreshToken), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logOut")
    public ResponseEntity<Object> logOut(String refreshToken){
        try {
            refreshTokens.deleteRefreshToken(refreshToken);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
