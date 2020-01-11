import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IOrganizationServiceConfig } from 'src/model/organization-service-config';
import { Observable } from 'rxjs';
import { ValidationMethod } from 'src/model/validation-method';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private _password_reset_url: string = `${environment.apiHostUrl}/api/password-reset-setup/`;
  private _validation_url: string = `${environment.apiHostUrl}/api/validation-method/`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http:HttpClient) { }

  updatePasswordResetSetup(passwordResetConfig: IOrganizationServiceConfig): Observable<IOrganizationServiceConfig>{
    const body = JSON.stringify(passwordResetConfig);
    return this.http.post<IOrganizationServiceConfig>(this._password_reset_url, body, this.httpOptions);
  }

  getPasswordResetSetupConfig(_id: string, serviceType: string): Observable<IOrganizationServiceConfig>{
    return this.http.get<IOrganizationServiceConfig>(this._password_reset_url.concat(_id).concat("/").concat(serviceType));
  }

  setValidationMethod(validationMethod): Observable<ValidationMethod>{
    const body = JSON.stringify(validationMethod);
    console.log(body);
    return this.http.post<ValidationMethod>(this._validation_url, body, this.httpOptions);
  }

  getValidationMethod() : Observable<ValidationMethod>{
    return this.http.get<ValidationMethod>(this._validation_url);
  }

}
