import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackDataService {

  private _elastic_data_url: string = "data/searchData";

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  getDataForPack(hostIdentifier: string, pack_query: string) {
    let dataObject = {"hostIdentifier": hostIdentifier, "pack_query": pack_query};
    return this.http.post<any>(this._elastic_data_url, JSON.stringify(dataObject), this.httpOptions);
  }

}
