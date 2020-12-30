package devanmejia.controllers;

import devanmejia.services.user.UserService;
import devanmejia.transfer.LogInBody;
import devanmejia.transfer.SignUpBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/*")
public class AuthenticationController {
    @Autowired
    private UserService userService;

    @PostMapping("/logIn")
    public ResponseEntity<String> logInUser(@RequestBody LogInBody logInBody){
        try {
            return new ResponseEntity<>(userService.logIn(logInBody), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/signUp")
    public ResponseEntity<String> signUpUser(@RequestBody SignUpBody signUpBody){
        try {
            return new ResponseEntity<>(userService.signUp(signUpBody), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
