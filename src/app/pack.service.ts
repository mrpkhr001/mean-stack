import { Injectable } from '@angular/core';
import { IPack } from 'src/model/pack';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PackService {

  private _url: string = "https://localhost:8443/api/pack";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
    
  constructor(private http:HttpClient) { }

  createPack(ipack: IPack): Observable<IPack>{
    const body = JSON.stringify(ipack);
    return this.http.post<IPack>(this._url, body, this.httpOptions);
  }

  getPacks(): Observable<IPack[]>{
    return this.http.get<IPack[]>(this._url);
  }

}
