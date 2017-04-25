import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { SharedService } from './../../shared/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector:    'login',
  templateUrl: './login.view.html',
  styleUrls: ['./login.styles.css'],
})
export class LoginComponent {
  loading = false;
  returnUrl: string;
  loginForm: FormGroup;
  userNotFound = false;

  constructor(
    private loginService: LoginService,
    private sharedService: SharedService,
    private fb: FormBuilder) {
       this.loginForm = fb.group({
        'email' : [null, Validators.required],
        'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
      });
    }

  submitLogin(userCred: any): any { // Log user in
    this.loading = true;
    this.loginService.login(userCred)
        .subscribe(
            data => {
                this.userNotFound = false;
                this.sharedService.isUserLogged = true;
            },
            error => {
                console.error(error);
                this.userNotFound = true;
                this.loading = false;
            });
  }
}
