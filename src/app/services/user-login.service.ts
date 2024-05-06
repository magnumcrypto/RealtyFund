import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private user: object = {};
  private userSubject = new Subject<object>();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  setUser(user: object) {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
      this.userSubject.next(user); // Emitir el nuevo valor del usuario
    }
  }

  getUser() {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const userData = localStorage.getItem('user');
      if (userData !== null) {
        this.user = JSON.parse(userData);
        return this.user;
      }
    }
    return this.user;
  }

  // Método para suscribirse a cambios en el usuario
  getUserObservable() {
    return this.userSubject.asObservable();
  }

}
