import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private authenticationService:AuthenticationService, private router:Router) {
  }

  canActivate():boolean{
    if(!(this.authenticationService.isCookieExisted()
      &&!this.authenticationService.isTokenExpired())){
      return true;
    }
    else {
      this.router.navigate(['/todolist'])
      return false;
    }
  }


}
