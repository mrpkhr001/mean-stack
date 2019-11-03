import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { INodePacks } from 'src/model/node-packs';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodePackService {

  private _url: string = "https://localhost:8443/api/node-pack/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http:HttpClient) { }

  updateNodePack(nodePack: INodePacks): Observable<INodePacks>{
    const body = JSON.stringify(nodePack);
    return this.http.post<INodePacks>(this._url, body, this.httpOptions);
  }

  getNodePacks(_id: string): Observable<INodePacks>{
    console.log(_id);
    return this.http.get<INodePacks>(this._url.concat(_id));
  }

}
