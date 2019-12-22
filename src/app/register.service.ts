import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { RegisterUser } from 'src/model/register';
import { IOrganizationId } from 'src/model/organization';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _register_url: string = "api/register";
  private _login_url: string = "api/login";
  private _user_role_url: string = "api/getUserRole";
  private _user_id_url: string = "api/getUserId";
  private _user_secret_url: string = "api/getUserSecret";
  private _validate_token_url: string = "api/validateToken";
  private _organization_id_url: string = "api/getOrgnizationId"

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

  getUserRole() {
    return this.http.get<any>(this._user_role_url, this.httpOptions);
  }

  getOrganizationId() {
    return this.http.get<IOrganizationId>(this._organization_id_url, this.httpOptions);
  }

  getUserId() {
    return this.http.get<any>(this._user_id_url, this.httpOptions);
  }

  getSecret() {
    return this.http.get<any>(this._user_secret_url, this.httpOptions);
  }

  validateToken(token: string) {
    const body = {"token": token};
    return this.http.post<any>(this._validate_token_url, body, this.httpOptions);
  }

  loggedInUser() {
    return !!sessionStorage.getItem('token');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logoutUser() {
    sessionStorage.removeItem('token');
    this._router.navigate(["login"])
  }

}
