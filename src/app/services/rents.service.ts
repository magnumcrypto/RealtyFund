import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rentproperty } from '../interfaces/rentproperty';

@Injectable({
  providedIn: 'root'
})
export class RentsService {

  constructor(public http: HttpClient) { }

  public getRents(uri: string): Observable<Rentproperty> {
    return this.http.get<Rentproperty>(uri);
  }
}
