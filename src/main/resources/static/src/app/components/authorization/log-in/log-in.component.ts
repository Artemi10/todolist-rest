import {Component} from '@angular/core';
import {AuthorizationService} from "../../../services/authorization/authorization.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent  {

  public logInForm: FormGroup = new FormGroup({});

  constructor(private authorizationService: AuthorizationService) {
    this.logInForm.addControl('login', new FormControl('', Validators.required))
    this.logInForm.addControl('password', new FormControl('', Validators.required))
  }

  public sendButtonClickListener(){
    this.authorizationService.sendLogInRequest(this.logInForm.value);
  }


}
