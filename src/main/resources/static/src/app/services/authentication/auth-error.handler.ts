import {ErrorHandler, Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
@Injectable()
export class AuthErrorHandler implements ErrorHandler{

  constructor(private authenticationService:AuthenticationService) {
  }

  handleError(error: any): void {
    if(error.status===401||error.status===403) {
      window.location.replace('/logIn')
    }
    if(error.status===200){
      this.authenticationService.setToken(error.error.text)
      window.location.replace('/todolist')
    }
    if(error.status===404) {
      window.location.replace('/signUp')
    }
    else{
      console.log(error);
    }
  }

}
