import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor() { }

  logout(): void {
    const jwt = localStorage.getItem('jwt');
    if(jwt !== null) {
      localStorage.removeItem('jwt');
    }
  }

}
