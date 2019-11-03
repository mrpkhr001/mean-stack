import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEnrollment } from '../../src/model/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private _url: string = "api";
  private _url_node: string = "api/enroll/";

  constructor(private http:HttpClient) { }

  getEnrollments(): Observable<IEnrollment[]>{
    return this.http.get<IEnrollment[]>(this._url);
  }

  getEnrollment(id:string): Observable<IEnrollment>{
    console.log(this._url_node.concat(id));
    return this.http.get<IEnrollment>(this._url_node.concat(id));
  }

}
