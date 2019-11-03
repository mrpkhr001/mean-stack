import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEnrollment } from '../../src/model/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private _url: string = "https://localhost:8443/api";
  private _url_node: string = "https://localhost:8443/api/enroll/";

  constructor(private http:HttpClient) { }

  getEnrollments(): Observable<IEnrollment[]>{
    return this.http.get<IEnrollment[]>(this._url);
  }

  getEnrollment(id:string): Observable<IEnrollment>{
    console.log(this._url_node.concat(id));
    return this.http.get<IEnrollment>(this._url_node.concat(id));
  }

}
