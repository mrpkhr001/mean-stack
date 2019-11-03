import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { RegisterUser } from 'src/model/register';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _register_url: string = "api/register";
  private _login_url: string = "api/login";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
    
  constructor(private http:HttpClient, private _router: Router) { }

  registerUser(registerUser: RegisterUser) {
    const body = JSON.stringify(registerUser);
    return this.http.post<any>(this._register_url, body, this.httpOptions);
  }

  doUserLogin(registerUser: RegisterUser) {
    const body = JSON.stringify(registerUser);
    return this.http.post<any>(this._login_url, body, this.httpOptions);
  }

  loggedInUser() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(["login"])
  }

}
