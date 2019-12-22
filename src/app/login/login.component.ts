import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/model/register';
import {Router} from '@angular/router';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';

import { RegisterService } from '../register.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = false ;

  constructor(private snackBar: MatSnackBar, private _registerService : RegisterService, private _router: Router, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    sessionStorage.removeItem('token');
    this.createForm();
  }

  createForm() {
    this.loginForm = this._formBuilder.group({
      _id : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]]
    })  
  }
    
  getEmailErrorMessage() {
    return this.loginForm.get("_id").hasError('required') ? 'You must enter email' :
    this.loginForm.get("password").hasError('email') ? 'Not a valid email' :'';
  }

  getPasswordErrorMessage() {
    return this.loginForm.get("_id").hasError('required') ? 'You must enter password' :'';
  }

  doUserLogin() {
    let registration = new RegisterUser(this.loginForm.value);
    this._registerService.doUserLogin(registration).subscribe(
      response => {
        sessionStorage.setItem('token', response.token)
        let config = new MatSnackBarConfig();
        config.duration = 3000
        config.panelClass = ['mat-toolbar', 'mat-primary']
        config.verticalPosition = 'top'
        config.horizontalPosition = 'center'
        this.snackBar.open("Login Successful", null, config)
        this._router.navigate(['/home']);
      },
      err => {
        let config = new MatSnackBarConfig();
        config.duration = 3000
        config.panelClass = ['mat-toolbar', 'mat-warn']
        config.verticalPosition = 'top'
        config.horizontalPosition = 'center'
        this.snackBar.open("Incorrect Username or Password", null, config)
      }
    );
  }

  errorMessages: { [key: string]: string } = {
    _id: 'Email is required and should be valid',
    password: 'password is a required'
  };

  errors = this.errorMessages;

}
