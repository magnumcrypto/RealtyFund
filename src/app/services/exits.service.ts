import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exits } from '../interfaces/exits';

@Injectable({
  providedIn: 'root'
})
export class ExitsService {

  constructor(public http: HttpClient) { }

  public getExits(uri: string): Observable<Exits> {
    return this.http.get<Exits>(uri);
  }
}
