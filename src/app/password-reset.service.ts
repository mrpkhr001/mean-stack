import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IOrganizationServiceConfig } from 'src/model/organization-service-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private _url: string = "api/password-reset-setup/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http:HttpClient) { }

  updatePasswordResetSetup(passwordResetConfig: IOrganizationServiceConfig): Observable<IOrganizationServiceConfig>{
    const body = JSON.stringify(passwordResetConfig);
    console.log(body);
    return this.http.post<IOrganizationServiceConfig>(this._url, body, this.httpOptions);
  }

  getPasswordResetSetupConfig(_id: string, serviceType: string): Observable<IOrganizationServiceConfig>{
    console.log("Sending request ...")
    return this.http.get<IOrganizationServiceConfig>(this._url.concat(_id).concat("/").concat(serviceType));
  }

}
