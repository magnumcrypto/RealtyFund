import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {

  constructor(private http: HttpClient) { }

  public getUserData(mail: any): Observable<UserData> {
    const uri = 'http://localhost:8000/user-data';
    return this.http.post<UserData>(uri, mail);
  }
}
