import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private helper: JwtHelperService) { }

  public getToken(): string {
    const jwt = localStorage.getItem('jwt');

    if(jwt) {
      return jwt;
    } else {
      return '';
    }
  }

  public setToken(response: HttpResponse<string>): void {
    const jwt = response.toString();
    if(jwt !== null) {
      localStorage.setItem('jwt', jwt);
    }
  }

  public getRoleFromJwt(jwt: string): string {
    const decodedJwt = this.helper.decodeToken(jwt);

    return decodedJwt.role.authority;
  }

  public getUsernameFromJwt(jwt: string): string {
    const decodedJwt = this.helper.decodeToken(jwt);

    return decodedJwt.sub;
  }

  public isAuthenticated(): boolean {
    const jwt = localStorage.getItem('jwt');

    if(jwt !== null) {
      return !this.helper.isTokenExpired(jwt);
    }

    return false;
  }

}
