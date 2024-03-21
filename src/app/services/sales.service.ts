import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Saleproperty } from '../interfaces/saleproperty';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(public http: HttpClient) { }

  public getSales(uri: string): Observable<Saleproperty> {
    return this.http.get<Saleproperty>(uri);
  }
}
