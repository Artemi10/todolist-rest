import {Component} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../../../services/authorization/authorization.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public signUpForm: FormGroup = new FormGroup({});

  constructor(private authorizationService: AuthorizationService) {
    this.signUpForm.addControl("firstName", new FormControl("", Validators.required))
    this.signUpForm.addControl("lastName", new FormControl("", Validators.required))
    this.signUpForm.addControl("login", new FormControl("", Validators.required))
    this.signUpForm.addControl("password", new FormControl("", Validators.required))
    this.signUpForm.addControl("rePassword", new FormControl("", [Validators.required, this.rePasswordValidator.bind(this)]))
    this.signUpForm.addControl("email", new FormControl("", [Validators.required, Validators.email]))
  }

  public sendButtonClickListener():void{
    this.authorizationService.sendSignUpRequest(this.signUpForm.value);
  }

  private rePasswordValidator(control: FormControl): {[s:string]:boolean}{
    return control.value === this.signUpForm.get("password").value ? null : {
      NotEqual: true
    };
  }


}
