import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ICompanyEnrollment} from '../model/company-enrollment';

@Injectable({
  providedIn: 'root'
})

export class CompanyEnrollmentService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  private _url: string = "api/enroll-company/";

  constructor(private http:HttpClient) { }

  enrollCompany(_companyEnrollment: ICompanyEnrollment): Observable<ICompanyEnrollment>{
    const body = JSON.stringify(_companyEnrollment);
    return this.http.post<ICompanyEnrollment>(this._url, body, this.httpOptions);
  }

  getEnrolledCompanies(): Observable<ICompanyEnrollment[]>{
    return this.http.get<ICompanyEnrollment[]>(this._url);
  }
  
  getEnrolledCompany(id: string): Observable<ICompanyEnrollment>{
    return this.http.get<ICompanyEnrollment>(this._url + id);
  }

  updateEnrolledCompany(_companyEnrollment: ICompanyEnrollment): Observable<ICompanyEnrollment>{
    const body = JSON.stringify(_companyEnrollment);
    return this.http.put<ICompanyEnrollment>(this._url, body, this.httpOptions);
  }

}
