import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient) { }

  public sendFilters(uri: string, filters: any): Observable<any> {
    return this.http.post(uri, filters);
  }

  public insertInvestor(uri: string, userData: any): Observable<any> {
    return this.http.post(uri, userData);
  }

  public registerUser(uri: string, userData: any): Observable<any> {
    return this.http.post(uri, userData);
  }

  public loginUser(uri: string, userData: any): Observable<any> {
    return this.http.post(uri, userData);
  }
}
