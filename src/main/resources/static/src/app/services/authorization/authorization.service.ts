import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http:HttpClient) { }

  sendLogInRequest(userLogInForm: FormGroup):void{
    this.http.post(environment.apiUrl + "/logIn", userLogInForm)
      .subscribe(data=>console.log(data));

  }
  sendSignUpRequest(userSignUpForm: FormGroup):void{
    this.http.post(environment.apiUrl +"/signUp", userSignUpForm)
      .subscribe(data=>console.log(data));
  }
}
